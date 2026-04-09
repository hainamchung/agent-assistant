#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Approximate GPT tokenization: 1 token ≈ 4 chars */
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

/** Read file safely, return empty string on failure */
function readSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
}

/** Recursively collect all files under a directory matching an optional filter */
function walkDir(dir, filter) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(full, filter));
    } else if (!filter || filter(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

/** Measure a list of absolute file paths → { files: [...], count, totalChars, totalTokens } */
function measure(filePaths) {
  const files = filePaths.map((fp) => {
    const content = readSafe(fp);
    const chars = content.length;
    const tokens = estimateTokens(content);
    return { name: path.relative(ROOT, fp), chars, tokens };
  });

  files.sort((a, b) => b.tokens - a.tokens);

  return {
    files,
    count: files.length,
    totalChars: files.reduce((s, f) => s + f.chars, 0),
    totalTokens: files.reduce((s, f) => s + f.tokens, 0),
  };
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

const ENTRY_POINT_NAMES = ['CLAUDE.md', 'CODEX.md', 'COPILOT.md', 'CURSOR.md', 'GEMINI.md', 'AGENT.md'];

function measureEntryPoints() {
  const files = ENTRY_POINT_NAMES
    .map((n) => path.join(ROOT, n))
    .filter((fp) => fs.existsSync(fp));
  return measure(files);
}

function measureRules() {
  const dir = path.join(ROOT, 'rules');
  const files = walkDir(dir, (name) => name.endsWith('.md'));
  return measure(files);
}

function measureCommands() {
  const dir = path.join(ROOT, 'commands');
  const files = walkDir(dir, (name) => name.endsWith('.md'));
  return measure(files);
}

function measureAgents() {
  const dir = path.join(ROOT, 'agents');
  const teamsDir = path.join(dir, 'teams');
  const files = walkDir(dir, (name) => name.endsWith('.md')).filter(
    (fp) => !fp.startsWith(teamsDir + path.sep) && fp !== teamsDir,
  );
  return measure(files);
}

function measureTeams() {
  const dir = path.join(ROOT, 'agents', 'teams');
  const files = walkDir(dir, (name) => name.endsWith('.md'));
  return measure(files);
}

function measureDocuments() {
  const dir = path.join(ROOT, 'documents');
  const files = walkDir(dir);
  return measure(files);
}

function measureSkills() {
  const dir = path.join(ROOT, 'skills');
  if (!fs.existsSync(dir)) return { count: 0, totalChars: 0, totalTokens: 0, files: [], skillDirCount: 0, avgTokens: 0 };

  const skillDirs = fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory());
  const skillMdFiles = [];

  for (const d of skillDirs) {
    const skillMd = path.join(dir, d.name, 'SKILL.md');
    if (fs.existsSync(skillMd)) {
      skillMdFiles.push(skillMd);
    }
  }

  // Sample first 5 for average
  const sampled = skillMdFiles.slice(0, 5);
  const sampledData = measure(sampled);
  const avgTokens = sampled.length > 0 ? Math.round(sampledData.totalTokens / sampled.length) : 0;

  return {
    ...sampledData,
    skillDirCount: skillDirs.length,
    totalSkillMdCount: skillMdFiles.length,
    avgTokens,
  };
}

function measureMatrixSkills() {
  const dir = path.join(ROOT, 'matrix-skills');
  const files = walkDir(dir, (name) => name.endsWith('.yaml') || name.endsWith('.yml'));
  return measure(files);
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

function fmt(n) {
  return n.toLocaleString('en-US');
}

function pad(str, len, alignRight = false) {
  const s = String(str);
  if (alignRight) return s.padStart(len);
  return s.padEnd(len);
}

function top3(files) {
  return files
    .slice(0, 3)
    .map((f) => `${path.basename(f.name)} (${fmt(f.tokens)})`)
    .join(', ');
}

// ---------------------------------------------------------------------------
// Team Workflow Scenario
// ---------------------------------------------------------------------------

function buildTeamScenario(cats) {
  // 1. Largest entry point
  const entryPoint = cats.entryPoints.files[0] || { name: '—', tokens: 0 };

  // 2. Rules loaded for :team — RUNTIME + TEAMS-LITE + SKILLS-LITE
  const teamRuleNames = ['RUNTIME.md', 'TEAMS-LITE.md', 'SKILLS-LITE.md'];
  const rulesLoaded = cats.rules.files.filter((f) => teamRuleNames.includes(path.basename(f.name)));
  const rulesTokens = rulesLoaded.reduce((s, f) => s + f.tokens, 0);

  // 3. Largest command workflow (look for team variants first, fall back to largest)
  const teamCmd =
    cats.commands.files.find((f) => f.name.includes('team')) || cats.commands.files[0] || { name: '—', tokens: 0 };

  // 4. Agents × 3 (average)
  const agentAvg = cats.agents.count > 0 ? Math.round(cats.agents.totalTokens / cats.agents.count) : 0;
  const agentsTotal = agentAvg * 3;

  const total = entryPoint.tokens + rulesTokens + teamCmd.tokens + agentsTotal;

  return { entryPoint, rulesLoaded, rulesTokens, teamCmd, agentAvg, agentsTotal, total };
}

// ---------------------------------------------------------------------------
// Top N Context Consumers (across all categories)
// ---------------------------------------------------------------------------

function topConsumers(cats, n = 5) {
  const all = Object.values(cats).flatMap((c) => c.files || []);
  all.sort((a, b) => b.tokens - a.tokens);
  return all.slice(0, n);
}

// ---------------------------------------------------------------------------
// Compression (--compress support)
// ---------------------------------------------------------------------------

const { parseFrontmatter } = require('./lib/parse-frontmatter');

/** Check if a deliverable is security-sensitive (never compress below Tier 2) */
function isSecuritySensitive(frontmatter) {
  if (!frontmatter) return false;
  if (String(frontmatter.agent || '').toLowerCase() === 'security-engineer') return true;
  if (String(frontmatter.type || '').toLowerCase().includes('security')) return true;
  return false;
}

/** Extract phase number from frontmatter or filename */
function extractPhase(frontmatter, filePath) {
  if (frontmatter && frontmatter.phase != null) {
    const n = parseInt(String(frontmatter.phase), 10);
    if (!isNaN(n)) return n;
  }
  const m = (filePath || '').match(/sprint(\d+)/i);
  return m ? parseInt(m[1], 10) : 0;
}

/** Auto-select tier based on phase proximity */
function selectTier(deliverable, currentPhase) {
  const phase = extractPhase(deliverable.frontmatter, deliverable.filePath);
  if (phase === currentPhase) return 1;
  if (phase === currentPhase - 1) return 2;
  return 3;
}

/** Compress content to Tier 2 digest (~200 tokens) */
function compressToDigest(content) {
  const fm = parseFrontmatter(content);
  if (!fm) return content; // no frontmatter — return as-is

  // Rebuild frontmatter block
  const fmMatch = content.match(/^(---\n[\s\S]*?\n---)/);
  const fmBlock = fmMatch ? fmMatch[1] : '';

  const verdict = fm.verdict || fm.status || 'N/A';
  const agent = fm.agent || 'unknown';
  const date = fm.date || 'unknown';
  const deliverable = fm.deliverable || fm.id || 'N/A';
  const reqs = Array.isArray(fm['depends-on']) ? fm['depends-on'].join(', ') : (fm['depends-on'] || 'N/A');

  const digest = [
    '',
    `**Outcome**: ${verdict}`,
    `**Key Decisions**: See original deliverable`,
    `**Deliverable**: ${deliverable}`,
    `**Reqs Addressed**: ${reqs}`,
    `**Agent**: ${agent} | **Date**: ${date}`,
    '',
  ].join('\n');

  return fmBlock + '\n' + digest;
}

/** Compress content to Tier 3 one-liner (~20 tokens) */
function compressToOneLiner(content, filePath) {
  const fm = parseFrontmatter(content);
  const name = path.basename(filePath, '.md');
  const outcome = (fm && (fm.verdict || fm.status)) || 'done';
  return `${name} → ${outcome} [${filePath}]\n`;
}

/** Run compression on a directory */
function runCompress(dir, forceTier, dryRun) {
  const absDir = path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir);
  if (!fs.existsSync(absDir)) {
    console.error(`Error: directory not found: ${absDir}`);
    process.exit(1);
  }

  const mdFiles = walkDir(absDir, (name) => name.endsWith('.md'));
  if (mdFiles.length === 0) {
    console.log('No .md files found in', absDir);
    return;
  }

  // Determine current phase from the highest phase number found
  let maxPhase = 0;
  const deliverables = mdFiles.map((fp) => {
    const content = readSafe(fp);
    const frontmatter = parseFrontmatter(content);
    const relPath = path.relative(absDir, fp);
    const phase = extractPhase(frontmatter, fp);
    if (phase > maxPhase) maxPhase = phase;
    return { filePath: fp, relPath, content, frontmatter, phase };
  });

  const outDir = path.join(absDir, '.compressed');

  console.log(`\n🗜️  Context Compression — ${deliverables.length} files in ${path.relative(ROOT, absDir) || absDir}`);
  console.log(`   Current phase: ${maxPhase}${forceTier ? ` | Forced tier: ${forceTier}` : ' | Auto-tier'}${dryRun ? ' | DRY RUN' : ''}\n`);

  for (const d of deliverables) {
    let tier = forceTier || selectTier(d, maxPhase);
    if (tier === 3 && isSecuritySensitive(d.frontmatter)) {
      tier = 2; // Security-sensitive: never below Tier 2
    }

    const label = `  ${d.relPath} → Tier ${tier}`;
    if (dryRun) {
      console.log(label + (tier !== (forceTier || selectTier(d, maxPhase)) ? ' (security floor)' : ''));
      continue;
    }

    let output;
    if (tier === 1) {
      output = d.content;
    } else if (tier === 2) {
      output = compressToDigest(d.content);
    } else {
      output = compressToOneLiner(d.content, d.relPath);
    }

    const outPath = path.join(outDir, d.relPath);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, output, 'utf8');

    const origTokens = estimateTokens(d.content);
    const newTokens = estimateTokens(output);
    console.log(`${label} — ${fmt(origTokens)} → ${fmt(newTokens)} tokens`);
  }

  if (!dryRun) {
    console.log(`\n   Output written to: ${path.relative(ROOT, outDir) || outDir}`);
  }
  console.log();
}

// ---------------------------------------------------------------------------
// Main (measurement mode)
// ---------------------------------------------------------------------------

function main() {
  // --- Handle --compress mode ---
  const args = process.argv.slice(2);
  const compressIdx = args.indexOf('--compress');
  if (compressIdx !== -1) {
    const dir = args[compressIdx + 1];
    if (!dir) {
      console.error('Error: --compress requires a directory argument');
      process.exit(1);
    }
    const tierIdx = args.indexOf('--tier');
    const forceTier = tierIdx !== -1 ? parseInt(args[tierIdx + 1], 10) || null : null;
    const dryRun = args.includes('--dry-run');
    runCompress(dir, forceTier, dryRun);
    return;
  }

  // --- Original measurement mode ---
  const cats = {
    entryPoints: measureEntryPoints(),
    rules: measureRules(),
    commands: measureCommands(),
    agents: measureAgents(),
    teams: measureTeams(),
    documents: measureDocuments(),
    skills: measureSkills(),
    matrixSkills: measureMatrixSkills(),
  };

  const rows = [
    { label: 'Entry Points', data: cats.entryPoints },
    { label: 'Rules', data: cats.rules },
    { label: 'Commands', data: cats.commands },
    { label: 'Agents', data: cats.agents },
    { label: 'Teams', data: cats.teams },
    { label: 'Documents', data: cats.documents },
    { label: 'Skills (sample)', data: cats.skills },
    { label: 'Matrix Skills', data: cats.matrixSkills },
  ];

  console.log();
  console.log('📊 Context Token Measurement Report');
  console.log('====================================');
  console.log();

  const colW = [18, 7, 10, 13, 40];
  const header = [
    pad('Category', colW[0]),
    pad('Files', colW[1], true),
    pad('Chars', colW[2], true),
    pad('Est. Tokens', colW[3], true),
    pad('Top 3', colW[4]),
  ].join(' | ');
  const sep = colW.map((w) => '-'.repeat(w)).join('-|-');

  console.log(header);
  console.log(sep);

  for (const { label, data } of rows) {
    const line = [
      pad(label, colW[0]),
      pad(fmt(data.count), colW[1], true),
      pad(fmt(data.totalChars), colW[2], true),
      pad(fmt(data.totalTokens), colW[3], true),
      top3(data.files) || '—',
    ].join(' | ');
    console.log(line);
  }

  // Skills extra info
  if (cats.skills.skillDirCount) {
    console.log();
    console.log(`  ℹ️  Skills: ${cats.skills.skillDirCount} directories, ${cats.skills.totalSkillMdCount} SKILL.md files found`);
    console.log(`      Sampled first 5 → avg ${fmt(cats.skills.avgTokens)} tokens/SKILL.md`);
    console.log(`      Estimated total (all SKILL.md): ~${fmt(cats.skills.avgTokens * cats.skills.totalSkillMdCount)} tokens`);
  }

  // Grand total
  const grandChars = rows.reduce((s, r) => s + r.data.totalChars, 0);
  const grandTokens = rows.reduce((s, r) => s + r.data.totalTokens, 0);
  console.log();
  console.log(`  📦 Grand Total (measured): ${fmt(grandChars)} chars → ~${fmt(grandTokens)} tokens`);

  // -- Team Workflow Scenario --
  const scenario = buildTeamScenario(cats);

  console.log();
  console.log('📋 Team Workflow Scenario (worst case):');
  console.log(`  Entry point:    ~${fmt(scenario.entryPoint.tokens)} tokens (${path.basename(scenario.entryPoint.name)})`);
  console.log(
    `  Rules loaded:   ~${fmt(scenario.rulesTokens)} tokens (${scenario.rulesLoaded.map((f) => path.basename(f.name)).join(' + ')})`,
  );
  console.log(`  Command:        ~${fmt(scenario.teamCmd.tokens)} tokens (${scenario.teamCmd.name})`);
  console.log(`  Agents (×3):    ~${fmt(scenario.agentsTotal)} tokens (avg ${fmt(scenario.agentAvg)} each)`);
  console.log('  ─────────────────────────────');
  console.log(`  TOTAL:          ~${fmt(scenario.total)} tokens`);

  // -- Top 5 Context Consumers --
  const top5 = topConsumers(cats, 5);
  console.log();
  console.log('💡 Top 5 Context Consumers:');
  top5.forEach((f, i) => {
    console.log(`  ${i + 1}. ${f.name} — ${fmt(f.tokens)} tokens`);
  });

  console.log();
}

main();
