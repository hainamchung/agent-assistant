#!/usr/bin/env node
/**
 * sync-data.mjs — Build-time sync from canonical sources to web SPA data.
 *
 * Reads agents/*.md, commands/, matrix-skills/ from the project root
 * and generates JSON files into web/src/data/generated/.
 *
 * Usage: node web/scripts/sync-data.mjs   (from project root)
 *    or: node scripts/sync-data.mjs       (from web/)
 */

import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Resolve paths — works from project root or from web/
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const webDir = join(__dirname, '..');
const projectRoot = join(webDir, '..');
const outDir = join(webDir, 'src', 'data', 'generated');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Read YAML-ish frontmatter between --- fences and return key/value map. */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const map = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    map[key] = val;
  }
  return map;
}

/** List files in a directory matching a filter, returns basenames. */
function listFiles(dir, ext) {
  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter(d => d.isFile() && d.name.endsWith(ext) && !d.name.startsWith('.'))
      .map(d => d.name);
  } catch { return []; }
}

/** List subdirectories in a directory, returns basenames. */
function listDirs(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter(d => d.isDirectory() && !d.name.startsWith('.'))
      .map(d => d.name);
  } catch { return []; }
}

// ---------------------------------------------------------------------------
// 1. Agents
// ---------------------------------------------------------------------------
function buildAgents() {
  const agentsDir = join(projectRoot, 'agents');
  const files = listFiles(agentsDir, '.md');
  const agents = files.map(f => {
    const id = basename(f, '.md');
    const content = readFileSync(join(agentsDir, f), 'utf-8');
    const fm = parseFrontmatter(content);
    return {
      id,
      name: fm.name || id,
      category: fm.category || 'unknown',
    };
  }).sort((a, b) => a.id.localeCompare(b.id));
  return agents;
}

// ---------------------------------------------------------------------------
// 2. Commands
// ---------------------------------------------------------------------------
function buildCommands() {
  const cmdsDir = join(projectRoot, 'commands');
  // Router .md files at top level (excluding hidden / non-md)
  const routerFiles = listFiles(cmdsDir, '.md').filter(f => f !== 'auto.md');
  const commands = routerFiles.map(f => {
    const name = basename(f, '.md');
    const variantDir = join(cmdsDir, name);
    const variantFiles = listFiles(variantDir, '.md');
    return {
      name,
      variants: variantFiles.map(v => basename(v, '.md')).sort(),
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
  return commands;
}

// ---------------------------------------------------------------------------
// 3. Skills summary — no YAML parser, just pattern matching
// ---------------------------------------------------------------------------
function buildSkillsSummary() {
  const matrixDir = join(projectRoot, 'matrix-skills');
  const domainFiles = listFiles(matrixDir, '.yaml')
    .filter(f => f !== '_index.yaml' && f !== '_dynamic.yaml');

  const categories = domainFiles.map(f => {
    const content = readFileSync(join(matrixDir, f), 'utf-8');
    // Try to extract skill_count from header, fall back to counting skill_id lines
    const countMatch = content.match(/^skill_count:\s*(\d+)/m);
    const count = countMatch
      ? Number(countMatch[1])
      : (content.match(/skill_id:/g) || []).length;
    // Extract human-readable domain name
    const nameMatch = content.match(/^name:\s*["']?(.+?)["']?\s*$/m);
    const name = nameMatch ? nameMatch[1] : basename(f, '.yaml');
    return { name, count };
  }).sort((a, b) => a.name.localeCompare(b.name));

  const totalSkills = categories.reduce((sum, c) => sum + c.count, 0);
  return { totalSkills, categories };
}

// ---------------------------------------------------------------------------
// 4. Metrics
// ---------------------------------------------------------------------------
function buildMetrics(agents, commands, skillsSummary) {
  const teamsDir = join(projectRoot, 'agents', 'teams');
  const teamCount = listDirs(teamsDir).length;
  const rulesDir = join(projectRoot, 'rules');
  const ruleCount = listFiles(rulesDir, '.md').length;

  return {
    agentCount: agents.length,
    commandCount: commands.length,
    skillCount: skillsSummary.totalSkills,
    teamCount,
    ruleCount,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
console.log('📦 Syncing canonical data to web/src/data/generated/...');

mkdirSync(outDir, { recursive: true });

const agents = buildAgents();
writeFileSync(join(outDir, 'agents.json'), JSON.stringify(agents, null, 2) + '\n');
console.log(`  ✅ agents.json — ${agents.length} agents`);

const commands = buildCommands();
const totalVariants = commands.reduce((s, c) => s + c.variants.length, 0);
writeFileSync(join(outDir, 'commands.json'), JSON.stringify(commands, null, 2) + '\n');
console.log(`  ✅ commands.json — ${commands.length} commands, ${totalVariants} variants`);

const skillsSummary = buildSkillsSummary();
writeFileSync(join(outDir, 'skills-summary.json'), JSON.stringify(skillsSummary, null, 2) + '\n');
console.log(`  ✅ skills-summary.json — ${skillsSummary.totalSkills} skills, ${skillsSummary.categories.length} categories`);

const metrics = buildMetrics(agents, commands, skillsSummary);
writeFileSync(join(outDir, 'metrics.json'), JSON.stringify(metrics, null, 2) + '\n');
console.log('  ✅ metrics.json');

console.log('Done!');
