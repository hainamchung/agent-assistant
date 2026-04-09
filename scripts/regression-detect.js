#!/usr/bin/env node
'use strict';

/**
 * Regression Detection Script
 * Compares current benchmark results against a saved baseline to detect regressions.
 *
 * Usage:
 *   node scripts/regression-detect.js                          # Run + compare vs latest baseline
 *   node scripts/regression-detect.js --save-baseline          # Run + save as new baseline
 *   node scripts/regression-detect.js --baseline <file>        # Compare against specific baseline
 *   node scripts/regression-detect.js --results <file>         # Use pre-computed results
 *
 * Exit codes:
 *   0 = no regression
 *   1 = regression found
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const BASELINES_DIR = path.join(__dirname, '..', 'baselines');
const BENCHMARKS_SCRIPT = path.join(__dirname, 'run-benchmarks.js');

// --- Args ---

const args = process.argv.slice(2);
const saveBaseline = args.includes('--save-baseline');
const baselineIdx = args.indexOf('--baseline');
const resultsIdx = args.indexOf('--results');
const baselineFile = baselineIdx !== -1 ? args[baselineIdx + 1] : null;
const resultsFile = resultsIdx !== -1 ? args[resultsIdx + 1] : null;

// --- Helpers ---

function getLatestBaseline() {
  if (!fs.existsSync(BASELINES_DIR)) return null;
  const files = fs.readdirSync(BASELINES_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();
  if (files.length === 0) return null;
  return path.join(BASELINES_DIR, files[files.length - 1]);
}

function runBenchmarks() {
  try {
    const output = execFileSync(process.execPath, [BENCHMARKS_SCRIPT, '--json'], { encoding: 'utf-8' });
    return JSON.parse(output);
  } catch (err) {
    console.error('Failed to run benchmarks:', err.message);
    process.exit(2);
  }
}

function loadJSON(filePath) {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) {
    console.error(`File not found: ${abs}`);
    process.exit(2);
  }
  return JSON.parse(fs.readFileSync(abs, 'utf-8'));
}

function extractSprintNumber() {
  const pkgPath = path.join(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  // Derive sprint from existing baselines count + 1
  if (!fs.existsSync(BASELINES_DIR)) return 1;
  const existing = fs.readdirSync(BASELINES_DIR).filter(f => f.endsWith('.json'));
  return existing.length + 1;
}

// --- Save baseline ---

function doSaveBaseline() {
  const results = runBenchmarks();
  const sprint = extractSprintNumber();
  const baseline = {
    sprint,
    timestamp: new Date().toISOString(),
    scores: results,
  };

  if (!fs.existsSync(BASELINES_DIR)) fs.mkdirSync(BASELINES_DIR, { recursive: true });
  const outPath = path.join(BASELINES_DIR, `sprint${sprint}.json`);
  fs.writeFileSync(outPath, JSON.stringify(baseline, null, 2));
  console.log(`✅ Baseline saved: ${outPath}`);
  process.exit(0);
}

// --- Compare ---

function flattenScores(data) {
  // Handle both { results: [...] } and direct array formats
  const results = data.results || data;
  if (!Array.isArray(results)) return {};

  const map = {};
  for (const item of results) {
    map[item.id] = item.score;
  }
  return map;
}

function doCompare() {
  // Load baseline
  const bPath = baselineFile ? path.resolve(baselineFile) : getLatestBaseline();
  if (!bPath) {
    console.log('ℹ️  No baseline found — nothing to compare against. Run with --save-baseline first.');
    process.exit(0);
  }

  const baseline = loadJSON(bPath);
  const baselineScores = flattenScores(baseline.scores);

  // Load or run current results
  let current;
  if (resultsFile) {
    current = loadJSON(resultsFile);
  } else {
    current = runBenchmarks();
  }
  const currentScores = flattenScores(current);

  // Warn if baseline is stale
  if (baseline.sprint) {
    const currentSprint = extractSprintNumber();
    if (currentSprint - baseline.sprint > 1) {
      console.warn(`⚠️  Baseline is from sprint ${baseline.sprint} (current: ~${currentSprint}) — consider updating baseline`);
    }
  }

  // Compare
  console.log('\n📊 Regression Detection Report');
  console.log('─'.repeat(70));
  console.log(`${'Benchmark'.padEnd(20)} ${'Baseline'.padStart(10)} ${'Current'.padStart(10)} ${'Delta'.padStart(10)} ${'Status'.padStart(10)}`);
  console.log('─'.repeat(70));

  let hasRegression = false;

  for (const id of Object.keys(currentScores)) {
    const curr = currentScores[id];
    const base = baselineScores[id];

    if (base === undefined) {
      console.log(`${id.padEnd(20)} ${'—'.padStart(10)} ${curr.toFixed(3).padStart(10)} ${'—'.padStart(10)} ${'SKIP'.padStart(10)}`);
      continue;
    }

    const delta = curr - base;
    let status = 'OK';
    if (delta < -0.25) {
      status = 'FAIL';
      hasRegression = true;
    } else if (delta < -0.10) {
      status = 'WARN';
    }

    const deltaStr = (delta >= 0 ? '+' : '') + delta.toFixed(3);
    console.log(`${id.padEnd(20)} ${base.toFixed(3).padStart(10)} ${curr.toFixed(3).padStart(10)} ${deltaStr.padStart(10)} ${status.padStart(10)}`);
  }

  console.log('─'.repeat(70));

  if (hasRegression) {
    console.log('Result: ❌ Regression detected (delta < -0.25)');
    process.exit(1);
  } else {
    console.log('Result: ✅ No regression');
    process.exit(0);
  }
}

// --- Entry ---

if (saveBaseline) {
  doSaveBaseline();
} else {
  doCompare();
}
