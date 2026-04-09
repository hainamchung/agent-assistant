#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const PROJECT_ROOT = path.resolve(__dirname, '..');

const ENTRY_FILES = [
  'CLAUDE.md',
  'CODEX.md',
  'COPILOT.md',
  'CURSOR.md',
  'GEMINI.md',
  'AGENT.md',
];

/**
 * Sections to compare.
 *   header   – regex that matches the section opening line
 *   endToken – what terminates the section ('---' or 'next-heading')
 */
const SECTIONS = [
  {
    name: 'IDENTITY',
    header: /^## 🆔 IDENTITY/,
    endToken: '---',
  },
  {
    name: 'PROHIBITIONS',
    header: /^## ⛔ PROHIBITIONS/,
    endToken: '---',
  },
  {
    name: 'SELF-CHECK',
    header: /^## ✅ SELF-CHECK/,
    endToken: '---',
  },
  {
    name: 'COMMAND ROUTING',
    header: /^## 🎯 COMMAND ROUTING/,
    endToken: 'next-heading',
  },
];

// ---------------------------------------------------------------------------
// Normalization helpers
// ---------------------------------------------------------------------------

/**
 * Build a single regex that matches all platform-specific tokens so they can
 * be replaced with a generic placeholder during comparison.
 */
function buildNormalizationRules() {
  // Path prefixes (order matters – longer first to avoid partial matches)
  const pathPrefixes = [
    '~/.gemini/antigravity',
    '~/.cursor',
    '~/.copilot',
    '~/.claude',
    '~/.gemini',
    '~/.codex',
    '~/\\.\\{TOOL\\}',  // AGENT.md uses ~/.{TOOL}
  ];

  // Platform / product names (case-insensitive, longer first)
  const toolNames = [
    'Claude Code',
    'OpenAI Codex',
    'Google Gemini',
    'GitHub Copilot',
    'antigravity',
    'cursor',
    'copilot',
    'claude',
    'gemini',
    'codex',
    '\\{TOOL\\}',       // AGENT.md template variable
  ];

  // Tier-1 tool name variations
  const tierToolNames = [
    'runSubagent',
    'Agent Tool',
    'native sub-agent/task delegation tool',
    'native sub-agent\\/task delegation tool',
  ];

  return { pathPrefixes, toolNames, tierToolNames };
}

/**
 * Strip platform-specific tokens so structurally-identical content compares
 * as equal regardless of which entry point it came from.
 */
function normalize(text) {
  const { pathPrefixes, toolNames, tierToolNames } = buildNormalizationRules();

  let out = text;

  // Replace path prefixes with placeholder
  for (const p of pathPrefixes) {
    out = out.replace(new RegExp(p, 'gi'), '{{PATH}}');
  }

  // Replace tier-1 tool names (before generic tool names to avoid partial)
  for (const t of tierToolNames) {
    out = out.replace(new RegExp(escapeRegex(t), 'gi'), '{{TIER1_TOOL}}');
  }

  // Replace product / tool names
  for (const t of toolNames) {
    out = out.replace(new RegExp(t, 'gi'), '{{TOOL}}');
  }

  // Collapse whitespace differences (trailing spaces, multiple blank lines)
  out = out.replace(/[ \t]+$/gm, '');
  out = out.replace(/\n{3,}/g, '\n\n');
  out = out.trim();

  return out;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// Section extraction
// ---------------------------------------------------------------------------

/**
 * Extract a section from raw markdown.
 * Returns null if the section header is not found.
 */
function extractSection(content, section) {
  const lines = content.split('\n');
  let startIdx = -1;

  // Find the header line
  for (let i = 0; i < lines.length; i++) {
    if (section.header.test(lines[i])) {
      startIdx = i;
      break;
    }
  }

  if (startIdx === -1) return null;

  // Find the end of the section
  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (section.endToken === '---' && lines[i].trim() === '---') {
      endIdx = i;
      break;
    }
    if (section.endToken === 'next-heading' && /^## /.test(lines[i])) {
      endIdx = i;
      break;
    }
  }

  return lines.slice(startIdx, endIdx).join('\n');
}

// ---------------------------------------------------------------------------
// Diff helper – produce a concise description of what diverges
// ---------------------------------------------------------------------------

/**
 * Given two normalized section texts, return a short human-readable summary
 * of the first few differences.
 */
function describeDiff(baseLines, otherLines) {
  const diffs = [];
  const maxLines = Math.max(baseLines.length, otherLines.length);
  const MAX_DIFFS = 3;

  for (let i = 0; i < maxLines && diffs.length < MAX_DIFFS; i++) {
    const a = (baseLines[i] || '').trim();
    const b = (otherLines[i] || '').trim();
    if (a !== b) {
      if (!b && a) {
        diffs.push(`missing line: "${truncate(a, 60)}"`);
      } else if (!a && b) {
        diffs.push(`extra line: "${truncate(b, 60)}"`);
      } else {
        diffs.push(`line ${i + 1} differs`);
      }
    }
  }

  return diffs.length > 0 ? diffs.join('; ') : 'content differs';
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log(`\n🔍 Checking entry point drift across ${ENTRY_FILES.length} files...\n`);

  // 1. Read all files --------------------------------------------------
  const fileContents = {};
  const missing = [];

  for (const file of ENTRY_FILES) {
    const filePath = path.join(PROJECT_ROOT, file);
    if (!fs.existsSync(filePath)) {
      missing.push(file);
      continue;
    }
    fileContents[file] = fs.readFileSync(filePath, 'utf-8');
  }

  if (missing.length > 0) {
    console.error(`❌ Missing files: ${missing.join(', ')}`);
    process.exit(2);
  }

  // 2. Extract & normalise sections ------------------------------------
  let totalDrifts = 0;

  for (const section of SECTIONS) {
    const extracted = {};  // file → raw section text
    const normalized = {}; // file → normalised section text
    const missingSections = [];

    for (const file of ENTRY_FILES) {
      const raw = extractSection(fileContents[file], section);
      if (raw === null) {
        missingSections.push(file);
      } else {
        extracted[file] = raw;
        normalized[file] = normalize(raw);
      }
    }

    // Report missing sections
    if (missingSections.length > 0) {
      console.log(`❌ ${section.name}: Section missing in ${missingSections.join(', ')}`);
      totalDrifts++;
      continue;
    }

    // 3. Compare against the first file as baseline --------------------
    const baseline = ENTRY_FILES[0];
    const baseNorm = normalized[baseline];
    const baseLines = baseNorm.split('\n');
    const divergent = [];

    for (const file of ENTRY_FILES.slice(1)) {
      if (normalized[file] !== baseNorm) {
        const otherLines = normalized[file].split('\n');
        const detail = describeDiff(baseLines, otherLines);
        divergent.push({ file, detail });
      }
    }

    if (divergent.length === 0) {
      console.log(`✅ ${section.name}: All ${ENTRY_FILES.length} files consistent`);
    } else {
      totalDrifts++;
      console.log(`❌ ${section.name}: Drift detected`);
      for (const d of divergent) {
        console.log(`   - ${d.file}: ${d.detail}`);
      }
    }
  }

  // 4. Summary ---------------------------------------------------------
  console.log('');
  if (totalDrifts === 0) {
    console.log(`Result: ✅ All sections consistent across all ${ENTRY_FILES.length} files`);
  } else {
    console.log(`Result: ${totalDrifts} drift(s) detected`);
  }

  process.exit(totalDrifts > 0 ? 1 : 0);
}

main();
