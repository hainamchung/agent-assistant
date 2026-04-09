#!/usr/bin/env node

/**
 * Token Cost Prediction — Pre-execution cost estimation for workflows
 *
 * Usage:
 *   node scripts/predict-cost.js <command> [options]
 *
 * Examples:
 *   node scripts/predict-cost.js cook:team
 *   node scripts/predict-cost.js fix:hard --phases 3
 *   node scripts/predict-cost.js plan:team --verbose
 *   node scripts/predict-cost.js cook:fast --json
 *
 * Options:
 *   --phases <n>  Override phase count (default: auto-detect from command)
 *   --verbose     Show per-phase breakdown
 *   --json        Output as JSON
 */

'use strict';

const fs = require('fs');
const path = require('path');

const COMMANDS_DIR = path.join(__dirname, '..', 'commands');

// --- Base Cost Constants (from rules/TOKEN-PREDICTION.md) ---

const BASE_COSTS = {
  fast: { base: 1500, agentMultiplier: 1.0, contextFactor: 1.0 },
  hard: { base: 4000, agentMultiplier: 1.2, contextFactor: 1.5 },
  team: { base: 8000, agentMultiplier: 1.5, contextFactor: 2.0 },
};

const VARIANT_DEFAULTS = {
  fast: { agents: 1, phases: 1 },
  hard: { agents: 1, phases: 3 },
  team: { agents: 3, phases: 5 },
};

const OVERHEAD = {
  systemPrompt: 900,
  agentProtocol: 500,
  routing: 200,
  phaseBoundary: 300,
};

// --- Warning Thresholds ---

const THRESHOLDS = [
  { level: 'ALERT', min: 100001, message: 'Very high token usage — confirm before proceeding' },
  { level: 'WARNING', min: 50000, message: 'High token usage — consider :fast variant' },
  { level: 'NOTICE', min: 10000, message: 'Moderate token usage expected' },
  { level: 'INFO', min: 0, message: 'Low token usage' },
];

// --- Helpers ---

function parseArgs(argv) {
  const args = { command: null, phases: null, verbose: false, json: false };

  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--phases' && argv[i + 1]) {
      args.phases = parseInt(argv[i + 1], 10);
      i++;
    } else if (argv[i] === '--verbose') {
      args.verbose = true;
    } else if (argv[i] === '--json') {
      args.json = true;
    } else if (!argv[i].startsWith('-') && !args.command) {
      args.command = argv[i];
    }
  }

  return args;
}

function parseCommand(command) {
  const parts = command.replace(/^\//, '').split(':');
  const name = parts[0];
  const variant = parts[1] || 'fast';

  if (!BASE_COSTS[variant]) {
    console.error(`Error: Unknown variant ":${variant}". Use :fast, :hard, or :team.`);
    process.exit(1);
  }

  return { name, variant };
}

function detectPhaseCount(name, variant) {
  // Try to read the command variant file and count phases
  const variantPath = path.join(COMMANDS_DIR, name, `${variant}.md`);
  if (fs.existsSync(variantPath)) {
    const content = fs.readFileSync(variantPath, 'utf8');
    // Count phase headers (P1, P2, Phase 1, Phase 2, etc.)
    const phaseMatches = content.match(/^#+\s*(?:P\d|Phase\s+\d)/gim);
    if (phaseMatches && phaseMatches.length > 0) {
      return phaseMatches.length;
    }
  }

  // Fallback to variant defaults
  return VARIANT_DEFAULTS[variant].phases;
}

function getWarning(tokens) {
  for (const t of THRESHOLDS) {
    if (tokens >= t.min) return t;
  }
  return THRESHOLDS[THRESHOLDS.length - 1];
}

function calculate(variant, phaseCount, agentCount) {
  const costs = BASE_COSTS[variant];
  const phaseCost = costs.base * costs.agentMultiplier * costs.contextFactor;
  const totalPhaseCost = phaseCost * phaseCount;

  const overhead =
    OVERHEAD.systemPrompt +
    agentCount * OVERHEAD.agentProtocol +
    OVERHEAD.routing +
    phaseCount * OVERHEAD.phaseBoundary;

  const total = totalPhaseCost + overhead;

  return {
    perPhase: Math.round(phaseCost),
    totalPhases: Math.round(totalPhaseCost),
    overhead: Math.round(overhead),
    total: Math.round(total),
  };
}

// --- Main ---

function main() {
  const args = parseArgs(process.argv);

  if (!args.command) {
    console.error('Usage: node scripts/predict-cost.js <command> [--phases <n>] [--verbose] [--json]');
    console.error('Example: node scripts/predict-cost.js cook:team');
    process.exit(1);
  }

  const { name, variant } = parseCommand(args.command);
  const agentCount = VARIANT_DEFAULTS[variant].agents;
  const phaseCount = args.phases || detectPhaseCount(name, variant);
  const result = calculate(variant, phaseCount, agentCount);
  const warning = getWarning(result.total);

  if (args.json) {
    const output = {
      command: args.command,
      variant,
      phases: phaseCount,
      agents: agentCount,
      estimate: result,
      warning: { level: warning.level, message: warning.message },
    };
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  // Human-readable output
  console.log(`\n  Token Cost Estimate: ${args.command}`);
  console.log('  ' + '─'.repeat(40));
  console.log(`  Variant:      :${variant}`);
  console.log(`  Phases:       ${phaseCount}`);
  console.log(`  Agents:       ${agentCount}`);
  console.log('  ' + '─'.repeat(40));

  if (args.verbose) {
    console.log(`  Per phase:    ${result.perPhase.toLocaleString()} tokens`);
    console.log(`  All phases:   ${result.totalPhases.toLocaleString()} tokens`);
    console.log(`  Overhead:     ${result.overhead.toLocaleString()} tokens`);
    console.log('  ' + '─'.repeat(40));
  }

  console.log(`  Estimated:    ~${result.total.toLocaleString()} tokens`);
  console.log(`  [${warning.level}] ${warning.message}`);
  console.log();
}

main();
