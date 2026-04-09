#!/usr/bin/env node
'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const AGENTS_DIR = path.join(PROJECT_ROOT, 'agents');
const COMMANDS_DIR = path.join(PROJECT_ROOT, 'commands');
const PLATFORMS_PATH = path.join(PROJECT_ROOT, 'platforms.json');

// ─── Entry Point Generation ──────────────────────────────────────────────────

describe('Entry point generation', () => {
  const platforms = JSON.parse(fs.readFileSync(PLATFORMS_PATH, 'utf8'));
  const platformEntries = Object.entries(platforms);

  it('generate-entry-points.js runs successfully', () => {
    const stdout = execFileSync(
      process.execPath,
      [path.join(__dirname, 'generate-entry-points.js')],
      { encoding: 'utf-8', cwd: PROJECT_ROOT }
    );
    assert.ok(stdout.includes('Generated'));
    assert.ok(stdout.includes('entry points'));
  });

  it('all platform entry files exist after generation', () => {
    for (const [, vars] of platformEntries) {
      const filePath = path.join(PROJECT_ROOT, vars.BOOT_FILE);
      assert.ok(fs.existsSync(filePath), `Missing entry point: ${vars.BOOT_FILE}`);
    }
  });

  it('entry files contain no unresolved {{PLACEHOLDER}} tokens', () => {
    for (const [key, vars] of platformEntries) {
      if (key === 'agent') continue; // generic AGENT.md may have {TOOL} by design
      const content = fs.readFileSync(path.join(PROJECT_ROOT, vars.BOOT_FILE), 'utf8');
      const match = content.match(/\{\{[A-Z_]+\}\}/);
      assert.ok(!match, `${vars.BOOT_FILE} has unresolved placeholder: ${match?.[0]}`);
    }
  });

  it('entry files contain no literal backslash-n strings in first line', () => {
    for (const [, vars] of platformEntries) {
      const content = fs.readFileSync(path.join(PROJECT_ROOT, vars.BOOT_FILE), 'utf8');
      const firstLine = content.split('\n')[0];
      assert.ok(!firstLine.includes('\\n'), `${vars.BOOT_FILE} line 1 has literal \\n`);
    }
  });

  it('each entry file references the correct platform name', () => {
    for (const [key, vars] of platformEntries) {
      if (key === 'agent') continue;
      const content = fs.readFileSync(path.join(PROJECT_ROOT, vars.BOOT_FILE), 'utf8');
      assert.ok(
        content.includes(vars.PLATFORM_NAME),
        `${vars.BOOT_FILE} does not mention "${vars.PLATFORM_NAME}"`
      );
    }
  });
});

// ─── Command → Agent Availability ────────────────────────────────────────────

describe('Command-agent availability', () => {
  const agentFiles = fs.readdirSync(AGENTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));

  it('all agent files referenced in agents/ are valid markdown', () => {
    for (const agent of agentFiles) {
      const content = fs.readFileSync(path.join(AGENTS_DIR, agent + '.md'), 'utf8');
      assert.ok(content.length > 50, `${agent}.md is suspiciously short (${content.length} chars)`);
    }
  });

  it('command router files exist for all top-level commands', () => {
    const commandRouters = fs.readdirSync(COMMANDS_DIR)
      .filter(f => f.endsWith('.md'));
    assert.ok(commandRouters.length >= 10, `Expected 10+ command routers, found ${commandRouters.length}`);
  });

  it('team command variants reference existing domain teams', () => {
    const teamsDir = path.join(AGENTS_DIR, 'teams');
    if (!fs.existsSync(teamsDir)) return; // skip if no teams

    const teamDirs = fs.readdirSync(teamsDir).filter(d =>
      fs.statSync(path.join(teamsDir, d)).isDirectory()
    );
    assert.ok(teamDirs.length >= 10, `Expected 10+ team dirs, found ${teamDirs.length}`);

    // Each team dir should have techlead.md, executor.md, reviewer.md
    for (const team of teamDirs) {
      const teamPath = path.join(teamsDir, team);
      const files = fs.readdirSync(teamPath);
      for (const role of ['techlead.md', 'executor.md', 'reviewer.md']) {
        assert.ok(files.includes(role), `Team ${team} missing ${role}`);
      }
    }
  });

  it('a2a cards have matching agent files', () => {
    const a2aDir = path.join(PROJECT_ROOT, 'a2a-cards');
    if (!fs.existsSync(a2aDir)) return;
    const cards = fs.readdirSync(a2aDir).filter(f => f.endsWith('.json'));
    for (const card of cards) {
      const slug = card.replace('.json', '');
      assert.ok(
        agentFiles.includes(slug),
        `a2a-card "${card}" has no matching agent file agents/${slug}.md`
      );
    }
  });
});
