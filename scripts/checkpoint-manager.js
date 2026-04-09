#!/usr/bin/env node
'use strict';

/**
 * Checkpoint Manager — CLI utility for managing workflow checkpoints
 *
 * Commands:
 *   list   — List active checkpoints
 *   view   — View specific checkpoint
 *   prune  — Remove expired checkpoints
 *   clear  — Archive all checkpoints
 */

const fs = require('node:fs');
const path = require('node:path');

const CHECKPOINT_DIR = path.join(process.cwd(), '.agent-assistant', 'checkpoints');
const ARCHIVE_DIR = path.join(CHECKPOINT_DIR, 'archive');
const MAX_ARCHIVE_ENTRIES = 5;
const DEFAULT_TTL = 86400; // 24 hours in seconds

// Path traversal protection: ensure resolved path stays within CHECKPOINT_DIR
function safePath(filePath) {
  const resolved = path.resolve(filePath);
  const checkpointRoot = path.resolve(CHECKPOINT_DIR);
  const archiveRoot = path.resolve(ARCHIVE_DIR);
  if (!resolved.startsWith(checkpointRoot) && !resolved.startsWith(archiveRoot)) {
    throw new Error(`Path traversal rejected: ${filePath}`);
  }
  return resolved;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readCheckpoint(filePath) {
  try {
    const safe = safePath(filePath);
    const data = JSON.parse(fs.readFileSync(safe, 'utf8'));
    if (!data.schema_version || !data.command) {
      console.warn(`⚠️  Skipping malformed checkpoint: ${path.basename(filePath)}`);
      return null;
    }
    return data;
  } catch (err) {
    console.warn(`⚠️  Skipping corrupted file: ${path.basename(filePath)} — ${err.message}`);
    return null;
  }
}

function isExpired(checkpoint) {
  const ttl = checkpoint.ttl_seconds || DEFAULT_TTL;
  const updatedAt = new Date(checkpoint.updated_at || checkpoint.created_at).getTime();
  return Date.now() - updatedAt > ttl * 1000;
}

function getCheckpointFiles() {
  ensureDir(CHECKPOINT_DIR);
  return fs.readdirSync(CHECKPOINT_DIR)
    .filter(f => f.endsWith('.checkpoint.json'))
    .map(f => path.join(CHECKPOINT_DIR, f));
}

function cmdList() {
  const files = getCheckpointFiles();
  if (files.length === 0) {
    console.log('📋 No active checkpoints found.');
    return;
  }

  console.log('📋 Active Checkpoints:\n');
  console.log('| Command | Task | Phase | Status | Created | Expired |');
  console.log('|---------|------|-------|--------|---------|---------|');

  for (const file of files) {
    const cp = readCheckpoint(file);
    if (!cp) continue;
    const expired = isExpired(cp) ? '⏰ YES' : '✅ NO';
    const phase = cp.current_phase || '?';
    const created = cp.created_at ? new Date(cp.created_at).toLocaleDateString() : '?';
    console.log(`| ${cp.command} | ${cp.task || '—'} | ${phase} | ${cp.status || '?'} | ${created} | ${expired} |`);
  }
  console.log(`\nTotal: ${files.length} checkpoint(s)`);
}

function cmdView(id) {
  if (!id) {
    console.error('❌ Usage: checkpoint-manager.js view <filename>');
    process.exit(1);
  }

  const filePath = path.join(CHECKPOINT_DIR, id.endsWith('.checkpoint.json') ? id : `${id}.checkpoint.json`);
  const cp = readCheckpoint(filePath);
  if (!cp) {
    console.error(`❌ Checkpoint not found or corrupted: ${id}`);
    process.exit(1);
  }

  console.log(JSON.stringify(cp, null, 2));
}

function cmdPrune() {
  ensureDir(ARCHIVE_DIR);
  const files = getCheckpointFiles();
  let pruned = 0;

  for (const file of files) {
    const cp = readCheckpoint(file);
    if (!cp || !isExpired(cp)) continue;

    const archiveName = `${path.basename(file, '.checkpoint.json')}.${Date.now()}.json`;
    const archivePath = safePath(path.join(ARCHIVE_DIR, archiveName));
    fs.renameSync(safePath(file), archivePath);
    pruned++;
    console.log(`📦 Archived: ${path.basename(file)}`);
  }

  // Prune old archive entries (keep last MAX_ARCHIVE_ENTRIES per command)
  const archiveFiles = fs.readdirSync(ARCHIVE_DIR)
    .filter(f => f.endsWith('.json'))
    .sort()
    .reverse();

  const byCommand = {};
  for (const f of archiveFiles) {
    // Extract command name from checkpoint filename (supports hyphenated names like cook-team)
    // Format: {command}-{timestamp}.json — extract everything before the last numeric segment
    const match = f.match(/^(.+?)(?:\.\d+)?\.json$/);
    const cmd = match ? match[1].replace(/\.\d+$/, '').split('.')[0] : 'unknown';
    byCommand[cmd] = byCommand[cmd] || [];
    byCommand[cmd].push(f);
  }

  for (const [cmd, files] of Object.entries(byCommand)) {
    if (files.length > MAX_ARCHIVE_ENTRIES) {
      for (const old of files.slice(MAX_ARCHIVE_ENTRIES)) {
        fs.unlinkSync(safePath(path.join(ARCHIVE_DIR, old)));
        console.log(`🗑️  Pruned archive: ${old}`);
      }
    }
  }

  console.log(`\n✅ Pruned ${pruned} expired checkpoint(s).`);
}

function cmdClear() {
  ensureDir(ARCHIVE_DIR);
  const files = getCheckpointFiles();

  for (const file of files) {
    const archiveName = `${path.basename(file, '.checkpoint.json')}.${Date.now()}.json`;
    const archivePath = safePath(path.join(ARCHIVE_DIR, archiveName));
    fs.renameSync(safePath(file), archivePath);
    console.log(`📦 Archived: ${path.basename(file)}`);
  }

  console.log(`\n✅ Archived ${files.length} checkpoint(s).`);
}

// Main
const [command, ...args] = process.argv.slice(2);

switch (command) {
  case 'list':
    cmdList();
    break;
  case 'view':
    cmdView(args[0]);
    break;
  case 'prune':
    cmdPrune();
    break;
  case 'clear':
    cmdClear();
    break;
  default:
    console.log(`
Checkpoint Manager — Manage workflow checkpoints

Usage:
  node scripts/checkpoint-manager.js <command>

Commands:
  list     List active checkpoints
  view ID  View specific checkpoint details
  prune    Archive expired checkpoints
  clear    Archive all checkpoints
`);
    process.exit(command ? 1 : 0);
}
