#!/usr/bin/env node

/**
 * simulate.js — Static Agent Simulation for agent-assistant
 *
 * Validates all agent configurations through static analysis:
 * 1. Frontmatter completeness and validity
 * 2. Handoff reference integrity (all targets exist)
 * 3. Required markdown sections present
 * 4. Skill references exist in matrix-skills/
 *
 * Usage: node scripts/simulate.js [--agent=name] [--verbose]
 * Exit code: 0 = all pass, 1 = failures exist
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const AGENTS_DIR = path.join(__dirname, '..', 'agents');
const META_REFS = ['all-agents', 'any-agent'];

// Check 1: Frontmatter exists and has required fields
function checkFrontmatter(content) {
  const results = [];
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    results.push({ level: 'FAIL', check: 'frontmatter', message: 'No frontmatter block found' });
    return results;
  }

  const fm = {};
  fmMatch[1].split('\n').forEach(line => {
    const match = line.match(/^(\w[\w-]*)\s*:\s*(.+)/);
    if (match) fm[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
  });

  const required = ['name', 'description', 'category'];
  for (const field of required) {
    if (!fm[field]) {
      results.push({ level: 'WARN', check: 'frontmatter', message: `Missing recommended field: ${field}` });
    }
  }

  if (fm['schema-version'] && !/^\d+\.\d+(\.\d+)?$/.test(fm['schema-version'])) {
    results.push({ level: 'WARN', check: 'frontmatter', message: `schema-version "${fm['schema-version']}" invalid semver` });
  }

  if (results.length === 0) {
    results.push({ level: 'PASS', check: 'frontmatter', message: 'Frontmatter structure valid' });
  }
  return results;
}

// Check 2: Handoff references point to existing agents
function checkHandoffs(content) {
  const results = [];
  // Match both YAML list format and inline array format
  const handoffMatch = content.match(/handoffs?:\s*\n((?:\s*-\s*.+\n?)*)/) ||
                       content.match(/handoffs?:\s*\[([^\]]+)\]/);
  if (!handoffMatch) {
    results.push({ level: 'PASS', check: 'handoffs', message: 'No handoffs declared' });
    return results;
  }

  let targets;
  if (handoffMatch[0].includes('[')) {
    // Inline format: handoffs: [agent1, agent2]
    targets = handoffMatch[1].split(',').map(s => s.trim()).filter(Boolean).map(s => `- ${s}`);
  } else {
    targets = handoffMatch[1].match(/-\s*(.+)/g) || [];
  }
  let valid = 0;
  for (const t of targets) {
    const name = t.replace(/^-\s*/, '').trim();
    if (META_REFS.includes(name)) { valid++; continue; }
    const targetFile = path.join(AGENTS_DIR, `${name}.md`);
    if (!fs.existsSync(targetFile)) {
      results.push({ level: 'FAIL', check: 'handoffs', message: `Handoff target "${name}" → agents/${name}.md not found` });
    } else {
      valid++;
    }
  }

  if (!results.some(r => r.level === 'FAIL')) {
    results.push({ level: 'PASS', check: 'handoffs', message: `All ${valid} handoff targets valid` });
  }
  return results;
}

// Check 3: Required markdown sections exist
function checkSections(content) {
  const results = [];
  const requiredSections = ['Protocol', 'Mindset|Directive'];

  for (const section of requiredSections) {
    const regex = new RegExp(`^#+\\s+.*${section}`, 'mi');
    if (!regex.test(content)) {
      results.push({ level: 'WARN', check: 'sections', message: `Missing expected section: "${section}"` });
    }
  }

  if (!results.some(r => r.level === 'WARN')) {
    results.push({ level: 'PASS', check: 'sections', message: 'Required sections present' });
  }
  return results;
}

// Check 4: Referenced skills exist in matrix-skills/
function checkSkills(content) {
  const results = [];
  const skillRefs = content.match(/matrix-skills\/([\w-]+)\.yaml/g) || [];

  for (const ref of skillRefs) {
    const skillFile = path.join(__dirname, '..', ref);
    if (!fs.existsSync(skillFile)) {
      results.push({ level: 'WARN', check: 'skills', message: `Referenced skill ${ref} not found` });
    }
  }

  results.push({ level: 'PASS', check: 'skills', message: `Skill references valid (${skillRefs.length} checked)` });
  return results;
}

// Main runner
function simulateAgent(agentFile) {
  const content = fs.readFileSync(agentFile, 'utf8');
  const name = path.basename(agentFile, '.md');

  const checks = [
    ...checkFrontmatter(content),
    ...checkHandoffs(content),
    ...checkSections(content),
    ...checkSkills(content)
  ];

  const fails = checks.filter(c => c.level === 'FAIL').length;
  const warns = checks.filter(c => c.level === 'WARN').length;
  const status = fails > 0 ? 'FAIL' : (warns > 0 ? 'WARN' : 'PASS');

  return { name, status, checks, fails, warns };
}

function main() {
  const args = process.argv.slice(2);
  const verbose = args.includes('--verbose');
  const agentFilter = args.find(a => a.startsWith('--agent='));

  let agentFiles;
  if (agentFilter) {
    const name = agentFilter.split('=')[1];
    if (/[\/\\]|\.\./.test(name)) {
      console.error(`❌ Invalid agent name: ${name}`);
      process.exit(1);
    }
    const filePath = path.join(AGENTS_DIR, `${name}.md`);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Agent not found: ${filePath}`);
      process.exit(1);
    }
    agentFiles = [filePath];
  } else {
    agentFiles = fs.readdirSync(AGENTS_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => path.join(AGENTS_DIR, f));
  }

  console.log(`\n🔬 Agent Simulation — ${agentFiles.length} agents\n`);

  let totalPass = 0, totalFail = 0, totalWarn = 0;

  for (const file of agentFiles) {
    const result = simulateAgent(file);
    const icon = result.status === 'PASS' ? '✅' : result.status === 'WARN' ? '⚠️' : '❌';
    console.log(`  ${icon} ${result.name}: ${result.status} (${result.fails} fails, ${result.warns} warns)`);

    if (verbose || result.status === 'FAIL') {
      for (const check of result.checks) {
        if (check.level !== 'PASS' || verbose) {
          console.log(`      ${check.level}: [${check.check}] ${check.message}`);
        }
      }
    }

    if (result.status === 'PASS') totalPass++;
    else if (result.status === 'FAIL') totalFail++;
    else totalWarn++;
  }

  console.log(`\n📊 Results: ${totalPass} pass, ${totalWarn} warn, ${totalFail} fail / ${agentFiles.length} total`);
  console.log(`   Status: ${totalFail === 0 ? '✅ ALL PASS' : '❌ FAILURES DETECTED'}\n`);

  process.exit(totalFail > 0 ? 1 : 0);
}

main();
