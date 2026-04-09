#!/usr/bin/env node
'use strict';

/**
 * Workflow Regression Checker
 * Validates workflow health across a report directory by checking
 * checkpoint status, deliverable quality, and cross-phase references.
 *
 * Usage:
 *   node scripts/workflow-regression.js --dir <report-directory>
 *
 * Exit codes:
 *   0 = healthy
 *   1 = issues found
 */

const fs = require('fs');
const path = require('path');
const { validateFile } = require('./validate-output');
const { parseFrontmatter } = require('./lib/parse-frontmatter');
const { findBrokenLinks } = require('./lib/link-resolver');

// --- Checkpoint parsing ---

function parseCheckpoint(checkpointPath) {
  if (!fs.existsSync(checkpointPath)) return null;

  const content = fs.readFileSync(checkpointPath, 'utf-8');
  const frontmatter = parseFrontmatter(content);
  const phases = [];

  const phaseRegex = /^##\s+Phase\s+(\d+):\s+(.+?)\s+—\s+(✅|❌.*)/gm;
  let match;
  while ((match = phaseRegex.exec(content)) !== null) {
    phases.push({
      number: parseInt(match[1], 10),
      name: match[2].trim(),
      status: match[3].startsWith('✅') ? 'complete' : 'incomplete',
      raw: match[3].trim(),
    });
  }

  return { frontmatter, phases };
}

// --- Cross-phase reference check ---

function checkCrossReferences(dir, files) {
  const issues = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const broken = findBrokenLinks(content, file);

    for (const target of broken) {
      issues.push({
        file: path.relative(dir, file),
        target,
        message: `Broken cross-reference: ${target}`,
      });
    }
  }

  return issues;
}

// --- Main ---

function main() {
  const args = process.argv.slice(2);
  const dirIdx = args.indexOf('--dir');

  if (dirIdx === -1 || !args[dirIdx + 1]) {
    console.error('Usage: workflow-regression.js --dir <report-directory>');
    process.exit(2);
  }

  const dir = path.resolve(args[dirIdx + 1]);
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exit(2);
  }

  let hasIssues = false;

  // 1. Parse checkpoint
  const checkpointPath = path.join(dir, '_checkpoint.md');
  const checkpoint = parseCheckpoint(checkpointPath);

  console.log(`\n📋 Workflow Health Report: ${path.basename(dir)}`);
  console.log('─'.repeat(50));

  if (checkpoint) {
    console.log(`\nCheckpoint: ${checkpoint.frontmatter ? checkpoint.frontmatter.workflow || 'unknown' : 'unknown'}`);
    for (const phase of checkpoint.phases) {
      const icon = phase.status === 'complete' ? '✅' : '❌';
      console.log(`  Phase ${phase.number}: ${phase.name} — ${icon}`);
      if (phase.status === 'incomplete') hasIssues = true;
    }
  } else {
    console.log('\n⚠️  No _checkpoint.md found');
    hasIssues = true;
  }

  // 2. Validate deliverable files
  const deliverableFiles = fs.readdirSync(dir)
    .filter(f => f.endsWith('.md') && !f.startsWith('_'))
    .map(f => path.join(dir, f));

  // Also scan subdirectories
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const subdir = path.join(dir, entry.name);
      const subFiles = fs.readdirSync(subdir)
        .filter(f => f.endsWith('.md') && !f.startsWith('_'))
        .map(f => path.join(subdir, f));
      deliverableFiles.push(...subFiles);
    }
  }

  console.log(`\nDeliverables (${deliverableFiles.length} files):`);

  for (const file of deliverableFiles) {
    const result = validateFile(file);
    const rel = path.relative(dir, file);
    const errors = result.results.filter(r => r.severity === 'error');
    const warnings = result.results.filter(r => r.severity === 'warning');

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`  ✅ ${rel} — all checks passed`);
    } else {
      const icon = errors.length > 0 ? '❌' : '⚠️';
      console.log(`  ${icon} ${rel} — ${errors.length} error(s), ${warnings.length} warning(s)`);
      for (const r of result.results) {
        const tag = r.severity === 'error' ? 'ERR ' : 'WARN';
        console.log(`     ${tag} [${r.id}] ${r.message}`);
      }
      if (errors.length > 0) hasIssues = true;
    }
  }

  // 3. Cross-phase reference check
  const crossRefIssues = checkCrossReferences(dir, deliverableFiles);
  if (crossRefIssues.length > 0) {
    console.log(`\nCross-references:`);
    for (const issue of crossRefIssues) {
      console.log(`  ❌ ${issue.file}: ${issue.message}`);
    }
    hasIssues = true;
  } else {
    console.log(`\nCross-references: ✅ all valid`);
  }

  // Summary
  console.log('\n' + '─'.repeat(50));
  if (hasIssues) {
    console.log('Result: ❌ Issues found');
    process.exit(1);
  } else {
    console.log('Result: ✅ Workflow healthy');
    process.exit(0);
  }
}

main();
