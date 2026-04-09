#!/usr/bin/env node

/**
 * Agent Test Harness
 * Structural behavior tests for agent markdown files.
 * Tests configuration, routing, delegation, structure, and negative patterns.
 * NO LLM invocation — pure static analysis.
 *
 * Usage:
 *   node scripts/test-agent.js [--json] [--verbose]
 *
 * Exit codes:
 *   0 = all tests pass
 *   1 = one or more tests fail
 *   2 = script execution error
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { parseFrontmatter } = require('./lib/parse-frontmatter');

const FIXTURES_DIR = path.join(__dirname, '..', 'tests', 'agent-fixtures');
const AGENTS_DIR = path.join(__dirname, '..', 'agents');
const COMMANDS_DIR = path.join(__dirname, '..', 'commands');

const args = process.argv.slice(2);
const jsonOnly = args.includes('--json');
const verbose = args.includes('--verbose');

const REQUIRED_FRONTMATTER = ['schema-version', 'name', 'description', 'category', 'version', 'handoffs'];

function loadFixtures() {
  const files = fs.readdirSync(FIXTURES_DIR).filter(f => f.endsWith('.json'));
  return files.map(f => {
    const raw = fs.readFileSync(path.join(FIXTURES_DIR, f), 'utf-8');
    return JSON.parse(raw);
  });
}

function loadAgent(agentName) {
  const filePath = path.join(AGENTS_DIR, `${agentName}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf-8');
}

function extractSections(content) {
  const regex = /^#{1,4}\s+(.+)$/gm;
  const sections = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    sections.push(match[1].trim());
  }
  return sections;
}

function findCommandRoutes(agentName) {
  const routes = [];
  const entries = fs.readdirSync(COMMANDS_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      const content = fs.readFileSync(path.join(COMMANDS_DIR, entry.name), 'utf-8');
      if (content.includes(agentName)) {
        routes.push(entry.name.replace('.md', ''));
      }
    }
    if (entry.isDirectory()) {
      const subDir = path.join(COMMANDS_DIR, entry.name);
      const subFiles = fs.readdirSync(subDir).filter(f => f.endsWith('.md'));
      for (const sf of subFiles) {
        const content = fs.readFileSync(path.join(subDir, sf), 'utf-8');
        if (content.includes(agentName)) {
          routes.push(entry.name);
          break;
        }
      }
    }
  }
  return [...new Set(routes)];
}

function runTest(fixture) {
  const { id, agent, scenario, expectations } = fixture;
  const failures = [];
  const content = loadAgent(agent);

  if (!content) {
    return { id, agent, scenario, passed: false, failures: [`Agent file not found: ${agent}.md`] };
  }

  const frontmatter = parseFrontmatter(content);
  const sections = extractSections(content);

  // Category 1: Configuration — required frontmatter fields
  for (const field of REQUIRED_FRONTMATTER) {
    if (!frontmatter[field]) {
      failures.push(`[CONFIG] Missing frontmatter field: ${field}`);
    }
  }

  // Category 2: Routing — agent appears in expected command files
  if (expectations.expectedCommands && expectations.expectedCommands.length > 0) {
    const routes = findCommandRoutes(agent);
    for (const cmd of expectations.expectedCommands) {
      if (!routes.includes(cmd)) {
        failures.push(`[ROUTING] Agent not referenced in command: ${cmd}`);
      }
    }
  }

  // Category 3: Delegation — handoff targets match expectations
  if (expectations.expectedHandoffs && expectations.expectedHandoffs.length > 0) {
    const handoffsRaw = frontmatter['handoffs'] || '';
    let handoffs;
    if (Array.isArray(handoffsRaw)) {
      handoffs = handoffsRaw.map(s => s.trim());
    } else {
      handoffs = String(handoffsRaw).replace(/[\[\]]/g, '').split(',').map(s => s.trim()).filter(Boolean);
    }
    for (const h of expectations.expectedHandoffs) {
      if (!handoffs.includes(h)) {
        failures.push(`[DELEGATION] Expected handoff target missing: ${h}`);
      }
    }
  }

  // Category 4: Structural — required sections in agent body
  if (expectations.requiredSections && expectations.requiredSections.length > 0) {
    for (const sec of expectations.requiredSections) {
      const found = sections.some(s => s.toLowerCase().includes(sec.toLowerCase()));
      if (!found) {
        failures.push(`[STRUCTURAL] Missing required section: ${sec}`);
      }
    }
  }

  // Category 5: Negative — forbidden patterns must be absent
  if (expectations.forbiddenPatterns && expectations.forbiddenPatterns.length > 0) {
    for (const pattern of expectations.forbiddenPatterns) {
      const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(content)) {
        failures.push(`[NEGATIVE] Forbidden pattern found: ${pattern}`);
      }
    }
  }

  // Keyword presence check
  if (expectations.mustContainKeywords && expectations.mustContainKeywords.length > 0) {
    for (const kw of expectations.mustContainKeywords) {
      if (!content.toLowerCase().includes(kw.toLowerCase())) {
        failures.push(`[STRUCTURAL] Missing expected keyword: ${kw}`);
      }
    }
  }

  return { id, agent, scenario, passed: failures.length === 0, failures };
}

function formatMarkdown(results) {
  const lines = ['# Agent Test Results', '', `**Date**: ${new Date().toISOString()}`, ''];
  lines.push('| Test | Agent | Status | Failures |', '|------|-------|--------|----------|');
  for (const r of results) {
    const status = r.passed ? '✅ PASS' : '❌ FAIL';
    const fails = r.failures.length > 0 ? r.failures.join('; ') : '—';
    lines.push(`| ${r.id} | ${r.agent} | ${status} | ${fails} |`);
  }
  const passCount = results.filter(r => r.passed).length;
  lines.push('', `**Summary**: ${passCount}/${results.length} passed`);
  return lines.join('\n');
}

// --- Main ---
try {
  const fixtures = loadFixtures();
  if (fixtures.length === 0) {
    console.error('No test fixtures found in tests/agent-fixtures/');
    process.exit(2);
  }
  const results = fixtures.map(runTest);
  const allPassed = results.every(r => r.passed);

  if (jsonOnly) {
    process.stdout.write(JSON.stringify({ results, allPassed }, null, 2) + '\n');
  } else {
    console.log(formatMarkdown(results));
    if (verbose) {
      console.log('\n--- JSON Detail ---\n');
      console.log(JSON.stringify(results, null, 2));
    }
  }
  process.exit(allPassed ? 0 : 1);
} catch (err) {
  console.error(`Agent test harness error: ${err.message}`);
  process.exit(2);
}
