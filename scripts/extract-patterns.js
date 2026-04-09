#!/usr/bin/env node

/**
 * Pattern Extraction Script — Extract reusable patterns from completed workflows
 *
 * Usage:
 *   node scripts/extract-patterns.js [options]
 *
 * Examples:
 *   node scripts/extract-patterns.js                     # extract from latest workflow
 *   node scripts/extract-patterns.js --all               # extract from all checkpoints
 *   node scripts/extract-patterns.js --category agent    # agent patterns only
 *   node scripts/extract-patterns.js --limit 50          # limit to 50 patterns
 *   node scripts/extract-patterns.js --dry-run           # preview without writing
 *
 * Options:
 *   --all                 Process all workflow checkpoints
 *   --category <type>     Filter: agent-selection|topology|error-recovery|performance
 *   --limit <n>           Maximum patterns per run (default: 100)
 *   --dry-run             Show what would be extracted without writing
 *   --json                Output as JSON to stdout
 */

'use strict';

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const CONFIG_PATH = path.join(PROJECT_ROOT, '.agent-assistant', 'config.json');
const PATTERNS_PATH = path.join(PROJECT_ROOT, 'global-patterns.json');
const CHECKPOINTS_DIR = path.join(PROJECT_ROOT, '.agent-assistant', 'checkpoints');
const REPORTS_DIR = path.join(PROJECT_ROOT, 'reports');

const VALID_CATEGORIES = ['agent-selection', 'topology', 'error-recovery', 'performance'];
const MAX_FILE_SIZE = 1024 * 1024; // 1MB limit for global-patterns.json

// --- Arg Parsing ---

function parseArgs(argv) {
  const args = { all: false, category: null, limit: 100, dryRun: false, json: false };

  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--all') args.all = true;
    else if (argv[i] === '--dry-run') args.dryRun = true;
    else if (argv[i] === '--json') args.json = true;
    else if (argv[i] === '--category' && argv[i + 1]) {
      args.category = argv[++i];
      if (!VALID_CATEGORIES.includes(args.category)) {
        console.error(`Error: Invalid category "${args.category}". Valid: [${VALID_CATEGORIES.join(', ')}]`);
        process.exit(1);
      }
    } else if (argv[i] === '--limit' && argv[i + 1]) {
      args.limit = parseInt(argv[++i], 10);
    }
  }

  return args;
}

// --- Opt-in Check ---

function checkOptIn() {
  if (!fs.existsSync(CONFIG_PATH)) return false;
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    return config.extract_patterns === true;
  } catch {
    return false;
  }
}

// --- Checkpoint Scanning ---

function findCheckpoints(all) {
  const checkpoints = [];

  // Scan .agent-assistant/checkpoints/
  if (fs.existsSync(CHECKPOINTS_DIR)) {
    const files = fs.readdirSync(CHECKPOINTS_DIR).filter(f => f.endsWith('.json'));
    for (const file of files) {
      checkpoints.push(path.join(CHECKPOINTS_DIR, file));
    }
  }

  if (!all && checkpoints.length > 1) {
    // Return only the most recent checkpoint
    checkpoints.sort((a, b) => {
      return fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime();
    });
    return [checkpoints[0]];
  }

  return checkpoints;
}

// --- Pattern Extraction ---

function extractFromCheckpoint(cpPath) {
  const patterns = [];
  let data;
  try {
    data = JSON.parse(fs.readFileSync(cpPath, 'utf8'));
  } catch {
    return patterns;
  }

  const timestamp = new Date().toISOString();
  const project = data.project || path.basename(PROJECT_ROOT);

  // Extract agent selection patterns
  if (data.phases) {
    for (const phase of data.phases) {
      if (phase.agent && phase.task_type) {
        patterns.push({
          id: `PAT-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          category: 'agent-selection',
          project,
          data: {
            task_type: phase.task_type,
            agent: phase.agent,
            outcome: phase.status === 'complete' ? 'success' : 'failure',
            rounds: phase.rounds || 1,
          },
          confidence: 0.6,
          extracted_at: timestamp,
        });
      }

      // Extract topology effectiveness
      if (phase.topology) {
        patterns.push({
          id: `PAT-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          category: 'topology',
          project,
          data: {
            workflow_type: data.command || 'unknown',
            topology: phase.topology,
            phases: (data.phases || []).length,
            success: phase.status === 'complete',
          },
          confidence: 0.5,
          extracted_at: timestamp,
        });
      }
    }
  }

  // Extract performance data
  if (data.tokens) {
    patterns.push({
      id: `PAT-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      category: 'performance',
      project,
      data: {
        workflow_type: data.command || 'unknown',
        variant: data.variant || 'unknown',
        predicted_tokens: data.tokens.predicted || 0,
        actual_tokens: data.tokens.actual || 0,
      },
      confidence: 0.8,
      extracted_at: timestamp,
    });
  }

  return patterns;
}

// --- Storage ---

function loadPatterns() {
  if (!fs.existsSync(PATTERNS_PATH)) {
    return { version: '1.0', patterns: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(PATTERNS_PATH, 'utf8'));
  } catch {
    return { version: '1.0', patterns: [] };
  }
}

function savePatterns(store) {
  const content = JSON.stringify(store, null, 2) + '\n';
  if (Buffer.byteLength(content, 'utf8') > MAX_FILE_SIZE) {
    console.error('Error: global-patterns.json would exceed 1MB limit. Prune old patterns first.');
    process.exit(1);
  }
  fs.writeFileSync(PATTERNS_PATH, content, 'utf8');
}

// --- Main ---

function main() {
  const args = parseArgs(process.argv);

  if (!checkOptIn()) {
    console.log('Pattern extraction is disabled.');
    console.log('Enable it in .agent-assistant/config.json: { "extract_patterns": true }');
    process.exit(0);
  }

  const checkpoints = findCheckpoints(args.all);
  if (checkpoints.length === 0) {
    console.log('No workflow checkpoints found in .agent-assistant/checkpoints/');
    process.exit(0);
  }

  let patterns = [];
  for (const cp of checkpoints) {
    patterns.push(...extractFromCheckpoint(cp));
  }

  // Filter by category
  if (args.category) {
    patterns = patterns.filter(p => p.category === args.category);
  }

  // Apply limit
  if (patterns.length > args.limit) {
    patterns = patterns.slice(0, args.limit);
  }

  if (args.json) {
    console.log(JSON.stringify(patterns, null, 2));
    return;
  }

  if (args.dryRun) {
    console.log(`\n  Dry Run: ${patterns.length} patterns would be extracted`);
    console.log('  ' + '─'.repeat(40));
    const byCat = {};
    for (const p of patterns) {
      byCat[p.category] = (byCat[p.category] || 0) + 1;
    }
    for (const [cat, count] of Object.entries(byCat)) {
      console.log(`  ${cat}: ${count}`);
    }
    console.log();
    return;
  }

  // Save patterns
  const store = loadPatterns();
  store.patterns.push(...patterns);
  savePatterns(store);

  console.log(`\n  Extracted ${patterns.length} patterns from ${checkpoints.length} checkpoint(s)`);
  console.log(`  Stored in global-patterns.json (total: ${store.patterns.length} patterns)`);
  console.log();
}

main();
