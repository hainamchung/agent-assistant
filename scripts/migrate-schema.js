#!/usr/bin/env node
'use strict';

/**
 * Schema Migration Script
 * Applies bulk frontmatter modifications to agent/command markdown files.
 *
 * Operations:
 *   add-field    Insert a YAML field after a specified anchor line
 *   set-value    Change a scalar value for an existing field
 *
 * Usage:
 *   node scripts/migrate-schema.js --op add-field --field role-scope --value implementation --after category --targets "agents/*.md"
 *   node scripts/migrate-schema.js --op set-value --field version --value "2.0" --targets "agents/*.md"
 *   node scripts/migrate-schema.js --op add-field --field role-scope --value coordination --after category --targets "agents/tech-lead.md" --dry-run
 *
 * Flags:
 *   --dry-run       Show what would change without writing files
 *   --targets       Glob pattern for target files (simple glob via fs matching)
 *   --backup        Create .bak files before modifying (default: on, use --no-backup to disable)
 *   --op            Operation: "add-field" or "set-value"
 *   --field         Field name to add or modify
 *   --value         Value to set
 *   --after         (add-field only) Insert after this field's line
 */

const fs = require('node:fs');
const path = require('node:path');
const { parseFrontmatter } = require('./lib/parse-frontmatter');

// --- Regex Safety ---

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// --- Argument Parsing ---

function parseArgs(argv) {
  const args = {
    op: null,
    field: null,
    value: null,
    after: null,
    targets: null,
    dryRun: false,
    backup: true,
  };

  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '--op':
        args.op = argv[++i];
        break;
      case '--field':
        args.field = argv[++i];
        break;
      case '--value':
        args.value = argv[++i];
        break;
      case '--after':
        args.after = argv[++i];
        break;
      case '--targets':
        args.targets = argv[++i];
        break;
      case '--dry-run':
        args.dryRun = true;
        break;
      case '--backup':
        args.backup = true;
        break;
      case '--no-backup':
        args.backup = false;
        break;
    }
  }

  return args;
}

// --- Glob Matching ---

function resolveGlob(pattern) {
  const root = path.join(__dirname, '..');
  const parts = pattern.split('/');
  const dirParts = parts.slice(0, -1);
  const filePattern = parts[parts.length - 1];

  // Validate pattern against allowlist to prevent injection
  if (!/^[a-zA-Z0-9_\-\/.*?]+$/.test(pattern)) {
    console.error(`Error: targets pattern contains invalid characters: ${pattern}`);
    return [];
  }

  const dir = path.join(root, ...dirParts);

  // Path traversal check
  const resolvedDir = path.resolve(dir);
  if (!resolvedDir.startsWith(root + path.sep) && resolvedDir !== root) {
    console.error(`Error: targets path escapes project root: ${pattern}`);
    return [];
  }

  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return [];
  }

  // Convert simple glob to regex safely: *.md → ^.*\.md$
  const regexStr = '^' + escapeRegex(filePattern)
    .replace(/\\\*/g, '.*')
    .replace(/\\\?/g, '.') + '$';
  const regex = new RegExp(regexStr);

  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && regex.test(entry.name)) {
      files.push(path.join(dir, entry.name));
    }
  }

  return files.sort();
}

// --- Safety Checks ---

function validateValue(value) {
  if (value && value.includes('\n')) {
    console.error('Error: value must not contain newlines');
    process.exit(1);
  }
}

function verifyFrontmatter(content, filePath) {
  const fields = parseFrontmatter(content);
  if (!fields) {
    console.error(`Error: frontmatter not parseable after modification in ${filePath}`);
    return false;
  }
  return true;
}

// --- Operations ---

function addField(content, field, value, after) {
  const fmMatch = content.match(/^(---\n)([\s\S]*?)(\n---)/);
  if (!fmMatch) return null;

  const lines = fmMatch[2].split('\n');
  const anchorRegex = new RegExp(`^${escapeRegex(after)}\\s*:`);
  let insertIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    if (anchorRegex.test(lines[i])) {
      insertIdx = i;
      break;
    }
  }

  if (insertIdx === -1) {
    console.warn(`  Warning: anchor field "${after}" not found — appending to end of frontmatter`);
    insertIdx = lines.length - 1;
  }

  const newLine = `${field}: ${value}`;

  // Check if field already exists
  const fieldRegex = new RegExp(`^${escapeRegex(field)}\\s*:`);
  for (const line of lines) {
    if (fieldRegex.test(line)) {
      return null; // Already exists, skip
    }
  }

  lines.splice(insertIdx + 1, 0, newLine);
  return fmMatch[1] + lines.join('\n') + fmMatch[3] + content.slice(fmMatch[0].length);
}

function setValue(content, field, value) {
  const fmMatch = content.match(/^(---\n)([\s\S]*?)(\n---)/);
  if (!fmMatch) return null;

  const lines = fmMatch[2].split('\n');
  const fieldRegex = new RegExp(`^${escapeRegex(field)}\\s*:`);
  let found = false;

  for (let i = 0; i < lines.length; i++) {
    if (fieldRegex.test(lines[i])) {
      // Preserve quoting style if present
      const existingMatch = lines[i].match(/^(\w[\w-]*\s*:\s*)(["']?).*\2\s*$/);
      if (existingMatch && existingMatch[2]) {
        lines[i] = `${field}: ${existingMatch[2]}${value}${existingMatch[2]}`;
      } else {
        lines[i] = `${field}: ${value}`;
      }
      found = true;
      break;
    }
  }

  if (!found) return null;
  return fmMatch[1] + lines.join('\n') + fmMatch[3] + content.slice(fmMatch[0].length);
}

// --- Main ---

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.op || !args.field || args.value === null || !args.targets) {
    console.error('Usage: node scripts/migrate-schema.js --op <add-field|set-value> --field <name> --value <val> --targets <glob> [--after <field>] [--dry-run] [--no-backup]');
    process.exit(1);
  }

  if (!['add-field', 'set-value'].includes(args.op)) {
    console.error(`Unknown operation: "${args.op}". Must be "add-field" or "set-value".`);
    process.exit(1);
  }

  if (args.op === 'add-field' && !args.after) {
    console.error('add-field operation requires --after <field> to specify insertion point.');
    process.exit(1);
  }

  validateValue(args.value);

  const files = resolveGlob(args.targets);
  if (files.length === 0) {
    console.error(`No files matched pattern: ${args.targets}`);
    process.exit(1);
  }

  console.log(`migrate-schema: ${args.op} "${args.field}" = "${args.value}" on ${files.length} file(s)${args.dryRun ? ' [DRY RUN]' : ''}\n`);

  let modified = 0;
  let skipped = 0;
  let failed = 0;

  for (const filePath of files) {
    const rel = path.relative(path.join(__dirname, '..'), filePath);
    const content = fs.readFileSync(filePath, 'utf8');

    let result;
    if (args.op === 'add-field') {
      result = addField(content, args.field, args.value, args.after);
    } else {
      result = setValue(content, args.field, args.value);
    }

    if (result === null) {
      console.log(`  SKIP ${rel} (field already exists or anchor not found)`);
      skipped++;
      continue;
    }

    // Verify frontmatter is still parseable
    if (!verifyFrontmatter(result, rel)) {
      console.log(`  FAIL ${rel} (frontmatter broken after modification)`);
      failed++;
      continue;
    }

    if (args.dryRun) {
      console.log(`  WOULD MODIFY ${rel}`);
      modified++;
    } else {
      if (args.backup) {
        fs.writeFileSync(filePath + '.bak', content, 'utf8');
      }
      fs.writeFileSync(filePath, result, 'utf8');
      console.log(`  MODIFIED ${rel}`);
      modified++;
    }
  }

  console.log(`\n---`);
  console.log(`Summary: ${modified} modified, ${skipped} skipped, ${failed} failed`);

  if (failed > 0) process.exit(1);
}

main();
