#!/usr/bin/env node
'use strict';

/**
 * generate-gallery-data.js
 *
 * Reads agent and command markdown files, extracts frontmatter,
 * and generates a consolidated gallery JSON for the web UI.
 *
 * Output: web/src/data/generated/gallery.json
 */

const fs = require('fs');
const path = require('path');
const { parseFrontmatter: parseSharedFrontmatter } = require('./lib/parse-frontmatter');

const ROOT = path.join(__dirname, '..');
const AGENTS_DIR = path.join(ROOT, 'agents');
const COMMANDS_DIR = path.join(ROOT, 'commands');
const OUTPUT_FILE = path.join(ROOT, 'web', 'src', 'data', 'generated', 'gallery.json');

function parseFrontmatter(content) {
  // Delegate to shared parser; return {} instead of null for backward compat
  return parseSharedFrontmatter(content) || {};
}

function extractDescription(content) {
  // Get first paragraph after frontmatter
  const afterFm = content.replace(/^---[\s\S]*?---\n*/, '');
  const lines = afterFm.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('>') && !trimmed.startsWith('---')) {
      return trimmed.slice(0, 120);
    }
  }
  return '';
}

function buildAgentEntries() {
  const files = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(AGENTS_DIR, file), 'utf8');
    const fm = parseFrontmatter(content);
    return {
      id: file.replace('.md', ''),
      name: fm.name || file.replace('.md', ''),
      description: fm.description || extractDescription(content),
      category: fm.category || 'unknown',
      profile: fm.profile || null,
      roleScope: fm['role-scope'] || null,
      voice: fm.voice || null,
      guardrails: Array.isArray(fm.guardrails) ? fm.guardrails : [],
      guardrailLevels: fm.guardrail_levels || null,
      handoffs: Array.isArray(fm.handoffs) ? fm.handoffs : [],
    };
  });
}

function buildCommandEntries() {
  const dirs = fs.readdirSync(COMMANDS_DIR).filter(f => {
    const p = path.join(COMMANDS_DIR, f);
    return fs.statSync(p).isDirectory();
  });

  return dirs.map(dir => {
    const routerFile = path.join(COMMANDS_DIR, `${dir}.md`);
    const routerContent = fs.existsSync(routerFile) ? fs.readFileSync(routerFile, 'utf8') : '';
    const routerFm = parseFrontmatter(routerContent);

    const variantDir = path.join(COMMANDS_DIR, dir);
    const variants = fs.readdirSync(variantDir)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''));

    return {
      name: dir,
      description: routerFm.description || '',
      category: routerFm.category || 'general',
      variants,
    };
  });
}

function main() {
  const gallery = {
    generated: new Date().toISOString(),
    agents: buildAgentEntries(),
    commands: buildCommandEntries(),
    stats: {},
  };

  // Compute stats
  gallery.stats = {
    totalAgents: gallery.agents.length,
    totalCommands: gallery.commands.length,
    totalVariants: gallery.commands.reduce((sum, c) => sum + c.variants.length, 0),
    categories: [...new Set(gallery.agents.map(a => a.category))],
    voiceEnabled: gallery.agents.filter(a => a.voice && a.voice.adaptation).length,
    guardrailCoverage: gallery.agents.filter(a => a.guardrails.length > 0).length,
  };

  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(gallery, null, 2) + '\n');

  console.log(`✅ Gallery data generated: ${path.relative(ROOT, OUTPUT_FILE)}`);
  console.log(`   ${gallery.stats.totalAgents} agents, ${gallery.stats.totalCommands} commands, ${gallery.stats.totalVariants} variants`);
  console.log(`   Voice-enabled: ${gallery.stats.voiceEnabled}/${gallery.stats.totalAgents}`);
  console.log(`   Guardrail coverage: ${gallery.stats.guardrailCoverage}/${gallery.stats.totalAgents}`);
}

main();
