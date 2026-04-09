#!/usr/bin/env node

/**
 * Golden Benchmark Runner
 * Loads JSON fixtures from benchmarks/ and evaluates agent output structure
 * against the 5-dimension evaluation rubric.
 *
 * Usage:
 *   node scripts/run-benchmarks.js [--json] [--verbose]
 *
 * Exit codes:
 *   0 = all benchmarks pass (score >= 0.7)
 *   1 = one or more benchmarks fail
 *   2 = script execution error
 */

'use strict';

const fs = require('fs');
const path = require('path');

const BENCHMARKS_DIR = path.join(__dirname, '..', 'benchmarks');
const COMMANDS_DIR = path.join(__dirname, '..', 'commands');
const PASS_THRESHOLD = 0.7;

const args = process.argv.slice(2);
const jsonOnly = args.includes('--json');
const verbose = args.includes('--verbose');
const scorecardMode = args.includes('--scorecard');

function loadFixtures() {
  const files = fs.readdirSync(BENCHMARKS_DIR).filter(f => f.startsWith('bench-') && f.endsWith('.json'));
  return files.map(f => {
    const raw = fs.readFileSync(path.join(BENCHMARKS_DIR, f), 'utf-8');
    return JSON.parse(raw);
  });
}

function loadCommandFile(command, variant) {
  const variantPath = path.join(COMMANDS_DIR, command, `${variant}.md`);
  const basePath = path.join(COMMANDS_DIR, `${command}.md`);
  if (fs.existsSync(variantPath)) return fs.readFileSync(variantPath, 'utf-8');
  if (fs.existsSync(basePath)) return fs.readFileSync(basePath, 'utf-8');
  return null;
}

function hasFrontmatter(content) {
  return content.trimStart().startsWith('---');
}

function extractSections(content) {
  const headingRegex = /^#{1,3}\s+(.+)$/gm;
  const sections = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    sections.push(match[1].trim());
  }
  return sections;
}

function countCodeBlocks(content) {
  const matches = content.match(/^```/gm);
  return matches ? Math.floor(matches.length / 2) : 0;
}

function countWords(content) {
  return content.split(/\s+/).filter(Boolean).length;
}

function evaluateBenchmark(fixture) {
  const { command, variant, expectedStructure, evaluationCriteria } = fixture;
  const content = loadCommandFile(command, variant);
  const scores = {};

  if (!content) {
    return { id: fixture.id, name: fixture.name, score: 0, passed: false, scores: {}, error: `Command file not found: ${command}/${variant}` };
  }

  // 1. Structural compliance
  const checks = { frontmatter: false, sections: false, codeBlocks: false, wordCount: false };
  if (expectedStructure.hasFrontmatter) {
    checks.frontmatter = hasFrontmatter(content);
  } else {
    checks.frontmatter = true;
  }
  const sections = extractSections(content);
  const requiredFound = expectedStructure.requiredSections.filter(s =>
    sections.some(sec => sec.toLowerCase().includes(s.toLowerCase()))
  );
  checks.sections = requiredFound.length === expectedStructure.requiredSections.length;
  checks.codeBlocks = countCodeBlocks(content) >= (expectedStructure.minCodeBlocks || 0);
  checks.wordCount = !expectedStructure.maxWordCount || countWords(content) <= expectedStructure.maxWordCount;
  const passed = Object.values(checks).filter(Boolean).length;
  scores.structuralCompliance = passed / Object.keys(checks).length;

  // 2. Agent delegation — handoff table or → agent-name pattern
  const handoffTable = /\|\s*agent\s*\|.*\n(\|.*\n)+/gi.test(content);
  const arrowHandoffs = (content.match(/→\s*`[a-z-]+`/g) || []).length;
  scores.agentDelegation = Math.min(1.0, (handoffTable ? 0.5 : 0) + (arrowHandoffs * 0.1));

  // 3. Workflow adherence — numbered phases or steps present
  const phaseRegex = /(?:phase|step)\s*\d/gi;
  scores.workflowAdherence = phaseRegex.test(content) ? 1.0 : 0.5;

  // 4. Output quality — no TODO/FIXME/placeholder
  const forbidden = /\b(TODO|FIXME|PLACEHOLDER|TBD|HACK)\b/gi;
  scores.outputQuality = forbidden.test(content) ? 0.3 : 1.0;

  // 5. Budget compliance — within word count limits
  scores.budgetCompliance = checks.wordCount ? 1.0 : 0.2;

  // Weighted sum
  let totalScore = 0;
  let totalWeight = 0;
  for (const [dim, cfg] of Object.entries(evaluationCriteria)) {
    const weight = cfg.weight || 0;
    totalWeight += weight;
    totalScore += (scores[dim] || 0) * weight;
  }
  const finalScore = totalWeight > 0 ? totalScore / totalWeight : 0;

  return {
    id: fixture.id,
    name: fixture.name,
    score: Math.round(finalScore * 1000) / 1000,
    passed: finalScore >= PASS_THRESHOLD,
    scores,
    details: verbose ? checks : undefined
  };
}

function formatMarkdown(results) {
  const lines = ['# Benchmark Results', '', `**Date**: ${new Date().toISOString()}`, `**Threshold**: ${PASS_THRESHOLD}`, ''];
  lines.push('| Benchmark | Score | Status |', '|-----------|-------|--------|');
  for (const r of results) {
    const status = r.passed ? '✅ PASS' : '❌ FAIL';
    lines.push(`| ${r.name} | ${r.score} | ${status} |`);
  }
  const passCount = results.filter(r => r.passed).length;
  lines.push('', `**Summary**: ${passCount}/${results.length} passed`);
  return lines.join('\n');
}

// --- Scorecard ---

const DIMENSIONS = ['accuracy', 'efficiency', 'safety', 'completeness', 'communication'];

function computeDimensionScores(scores) {
  const sc = scores.structuralCompliance || 0;
  const wa = scores.workflowAdherence || 0;
  const oq = scores.outputQuality || 0;
  const bc = scores.budgetCompliance || 0;
  const ad = scores.agentDelegation || 0;

  return {
    accuracy: Math.round(sc * 20 * 10) / 10,
    efficiency: Math.round(wa * 20 * 10) / 10,
    safety: Math.round(oq * 20 * 10) / 10,
    completeness: Math.round((bc * 0.5 + sc * 0.5) * 20 * 10) / 10,
    communication: Math.round(ad * 20 * 10) / 10
  };
}

function getGrade(total) {
  if (total >= 90) return 'A';
  if (total >= 80) return 'B';
  if (total >= 70) return 'C';
  if (total >= 60) return 'D';
  return 'F';
}

function generateScorecard(results) {
  const entries = results.map(function (r) {
    const dims = computeDimensionScores(r.scores || {});
    const total = Math.round(DIMENSIONS.reduce(function (sum, d) { return sum + dims[d]; }, 0) * 10) / 10;
    const grade = getGrade(total);
    return {
      id: r.id,
      name: r.name,
      dimensions: dims,
      total: total,
      grade: grade,
      passed: total >= 70
    };
  });

  const avgTotal = entries.length > 0
    ? Math.round(entries.reduce(function (s, e) { return s + e.total; }, 0) / entries.length * 10) / 10
    : 0;

  return {
    date: new Date().toISOString(),
    benchmarkCount: entries.length,
    entries: entries,
    aggregate: {
      averageTotal: avgTotal,
      grade: getGrade(avgTotal),
      passed: avgTotal >= 70
    }
  };
}

function formatScorecard(scorecard) {
  var lines = [
    '# Quality Scorecard',
    '',
    '**Date**: ' + scorecard.date,
    '**Benchmarks**: ' + scorecard.benchmarkCount,
    '**Pass threshold**: ≥ 70',
    '',
    '## Per-Benchmark Breakdown',
    '',
    '| Benchmark | Accuracy | Efficiency | Safety | Completeness | Communication | Total | Grade |',
    '|-----------|----------|------------|--------|--------------|---------------|-------|-------|'
  ];

  scorecard.entries.forEach(function (e) {
    var d = e.dimensions;
    lines.push(
      '| ' + e.name +
      ' | ' + d.accuracy +
      ' | ' + d.efficiency +
      ' | ' + d.safety +
      ' | ' + d.completeness +
      ' | ' + d.communication +
      ' | ' + e.total +
      ' | ' + e.grade + ' |'
    );
  });

  lines.push('');
  lines.push('## Aggregate');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('|--------|-------|');
  lines.push('| Average Total | ' + scorecard.aggregate.averageTotal + ' |');
  lines.push('| Grade | ' + scorecard.aggregate.grade + ' |');
  lines.push('| Verdict | ' + (scorecard.aggregate.passed ? '✅ PASS' : '❌ FAIL') + ' |');

  return lines.join('\n');
}

function writeScorecardFile(content) {
  var ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  var filename = 'SCORECARD-' + ts + '.md';
  var filepath = path.join(BENCHMARKS_DIR, filename);
  fs.writeFileSync(filepath, content, 'utf-8');
  return filepath;
}

// --- Main ---
try {
  const fixtures = loadFixtures();
  if (fixtures.length === 0) {
    console.error('No benchmark fixtures found in benchmarks/');
    process.exit(2);
  }
  const results = fixtures.map(evaluateBenchmark);
  const allPassed = results.every(r => r.passed);

  if (scorecardMode) {
    const scorecard = generateScorecard(results);
    const formatted = formatScorecard(scorecard);
    console.log(formatted);
    const outPath = writeScorecardFile(formatted);
    console.error('Scorecard written to: ' + outPath);
    process.exit(scorecard.aggregate.passed ? 0 : 1);
  } else if (jsonOnly) {
    process.stdout.write(JSON.stringify({ results, allPassed }, null, 2) + '\n');
  } else {
    console.log(formatMarkdown(results));
    if (!jsonOnly && verbose) {
      console.log('\n--- JSON Detail ---\n');
      console.log(JSON.stringify(results, null, 2));
    }
  }
  process.exit(allPassed ? 0 : 1);
} catch (err) {
  console.error(`Benchmark runner error: ${err.message}`);
  process.exit(2);
}
