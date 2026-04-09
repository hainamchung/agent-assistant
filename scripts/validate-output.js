#!/usr/bin/env node
'use strict';

/**
 * Deliverable Validation Script
 * Validates markdown deliverables against rules/VALIDATION-RULES.md (V001-V006).
 *
 * Usage:
 *   node scripts/validate-output.js <file...>
 *   node scripts/validate-output.js --dir <directory>
 *   node scripts/validate-output.js <file> --json
 *
 * Exit codes:
 *   0 = all pass
 *   1 = errors found
 *   2 = script error
 */

const fs = require('fs');
const path = require('path');
const { parseFrontmatter } = require('./lib/parse-frontmatter');
const { findBrokenLinks } = require('./lib/link-resolver');

// --- Rule implementations ---

function checkV001_deliverableHasSections(content) {
  const headingRegex = /^#{1,3}\s+(.+)$/gm;
  const sections = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    sections.push(match[1].trim());
  }
  if (sections.length < 2) {
    return { id: 'V001', severity: 'error', message: `Only ${sections.length} section(s) found — at least 2 required` };
  }
  return null;
}

function checkV002_exitCriteriaComplete(content) {
  const unchecked = content.match(/- \[ \]/g);
  if (unchecked && unchecked.length > 0) {
    return { id: 'V002', severity: 'warning', message: `${unchecked.length} unchecked checkbox(es) found` };
  }
  return null;
}

function checkV003_requirementTraceability(content) {
  const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)/);
  const body = bodyMatch ? bodyMatch[1] : content;
  const refs = body.match(/R\d+|US-\d+/g);
  if (!refs || refs.length === 0) {
    return { id: 'V003', severity: 'warning', message: 'No requirement references (R{n} or US-{n}) found' };
  }
  return null;
}

function checkV004_fileReferencesValid(content, filePath) {
  // Note: This is an internal validation tool; path resolution is intentional.
  const broken = findBrokenLinks(content, filePath);

  if (broken.length > 0) {
    return { id: 'V004', severity: 'warning', message: `Broken file reference(s): ${broken.join(', ')}` };
  }
  return null;
}

function checkV005_frontmatterPresent(content, _filePath, frontmatter) {
  const fm = frontmatter || parseFrontmatter(content);
  if (!fm) {
    return { id: 'V005', severity: 'error', message: 'No valid YAML frontmatter found' };
  }
  return null;
}

function checkV006_noEmptySections(content) {
  const lines = content.split('\n');
  const emptyHeadings = [];

  for (let i = 0; i < lines.length; i++) {
    const currentMatch = lines[i].match(/^(#{1,6})\s+/);
    if (!currentMatch) continue;

    const currentLevel = currentMatch[1].length;

    // Look ahead: skip blank lines, check if next non-blank is also a heading
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') j++;

    if (j < lines.length) {
      const nextMatch = lines[j].match(/^(#{1,6})\s+/);
      if (nextMatch) {
        const nextLevel = nextMatch[1].length;
        // Only flag if next heading is same or higher level (not a sub-heading)
        if (nextLevel <= currentLevel) {
          emptyHeadings.push(lines[i].trim());
        }
      }
    }
  }

  if (emptyHeadings.length > 0) {
    return { id: 'V006', severity: 'warning', message: `Empty section(s): ${emptyHeadings.join('; ')}` };
  }
  return null;
}

// --- Core validation function (exported for reuse) ---

function validateFile(filePath) {
  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) {
    return { file: absPath, results: [{ id: 'SCRIPT', severity: 'error', message: `File not found: ${absPath}` }] };
  }

  const content = fs.readFileSync(absPath, 'utf-8');
  const results = [];

  const checks = [
    checkV001_deliverableHasSections,
    checkV002_exitCriteriaComplete,
    checkV003_requirementTraceability,
    checkV004_fileReferencesValid,
    checkV005_frontmatterPresent,
    checkV006_noEmptySections,
  ];

  for (const check of checks) {
    const result = check(content, absPath);
    if (result) results.push(result);
  }

  return { file: absPath, results };
}

// --- CLI ---

function collectFiles(args) {
  const dirIdx = args.indexOf('--dir');
  if (dirIdx !== -1 && args[dirIdx + 1]) {
    const dir = path.resolve(args[dirIdx + 1]);
    if (!fs.existsSync(dir)) {
      console.error(`Directory not found: ${dir}`);
      process.exit(2);
    }
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.md') && !f.startsWith('_'))
      .map(f => path.join(dir, f));
  }

  return args.filter(a => !a.startsWith('--')).map(f => path.resolve(f));
}

function main() {
  const args = process.argv.slice(2);
  const jsonMode = args.includes('--json');
  const files = collectFiles(args);

  if (files.length === 0) {
    console.error('Usage: validate-output.js <file...> | --dir <directory> [--json]');
    process.exit(2);
  }

  const allResults = files.map(f => validateFile(f));
  let hasErrors = false;

  if (jsonMode) {
    console.log(JSON.stringify(allResults, null, 2));
  } else {
    for (const { file, results } of allResults) {
      const rel = path.relative(process.cwd(), file);
      const errors = results.filter(r => r.severity === 'error');
      const warnings = results.filter(r => r.severity === 'warning');

      if (errors.length === 0 && warnings.length === 0) {
        console.log(`✅ ${rel} — all checks passed`);
      } else {
        const icon = errors.length > 0 ? '❌' : '⚠️';
        console.log(`${icon} ${rel} — ${errors.length} error(s), ${warnings.length} warning(s)`);
        for (const r of results) {
          const tag = r.severity === 'error' ? 'ERR ' : 'WARN';
          console.log(`   ${tag} [${r.id}] ${r.message}`);
        }
      }

      if (errors.length > 0) hasErrors = true;
    }
  }

  process.exit(hasErrors ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { validateFile };
