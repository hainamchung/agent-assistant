#!/usr/bin/env node

/**
 * A2A Agent Card Generator
 * Reads agent frontmatter and generates A2A-compatible JSON cards.
 *
 * Usage:
 *   node scripts/generate-a2a-cards.js [--validate]
 *
 * Modes:
 *   default   — Generate cards to a2a-cards/ directory
 *   --validate — Validate existing cards match agent frontmatter (no writes)
 *
 * Exit codes:
 *   0 = success
 *   1 = validation errors
 *   2 = script execution error
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { parseFrontmatter } = require('./lib/parse-frontmatter');

const AGENTS_DIR = path.join(__dirname, '..', 'agents');
const OUTPUT_DIR = path.join(__dirname, '..', 'a2a-cards');

const args = process.argv.slice(2);
const validateOnly = args.includes('--validate');

function mapToA2ACard(agentName, fields, filename, generatedAt) {
  const skills = [];
  if (fields.profile && typeof fields.profile === 'string') {
    const parts = fields.profile.split(':');
    skills.push(...parts.filter(Boolean));
  }

  const handoffs = Array.isArray(fields.handoffs)
    ? fields.handoffs
    : typeof fields.handoffs === 'string' && fields.handoffs
      ? fields.handoffs.replace(/[\[\]]/g, '').split(',').map(s => s.trim()).filter(Boolean)
      : [];

  const capabilities = Array.isArray(fields.capabilities) ? fields.capabilities : [];
  const preflight = Array.isArray(fields.preflight) ? fields.preflight : [];
  const roleScope = fields['role-scope'] || null;

  return {
    '$schema': 'https://google.github.io/A2A/schema/agent-card.json',
    name: fields.name || agentName,
    description: fields.description || '',
    version: fields.version || '1.0',
    capabilities,
    skills,
    dependencies: handoffs,
    preflight,
    roleScope,
    provider: {
      organization: '@namch/agent-assistant',
      classification: fields.category || 'unknown'
    },
    metadata: {
      generatedAt,
      sourceFile: `agents/${filename}`,
      schemaVersion: fields['schema-version'] || '1.0'
    }
  };
}

function generateCards() {
  const agentFiles = fs.readdirSync(AGENTS_DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Path traversal guard
  const resolvedOutput = fs.realpathSync(OUTPUT_DIR);

  const generatedAt = new Date().toISOString();
  let generated = 0;
  for (const file of agentFiles) {
    const agentName = file.replace('.md', '');
    const content = fs.readFileSync(path.join(AGENTS_DIR, file), 'utf8');
    const fields = parseFrontmatter(content);

    if (!fields) {
      console.warn(`⚠️  ${file}: no frontmatter found, skipping`);
      continue;
    }

    const card = mapToA2ACard(agentName, fields, file, generatedAt);
    const outputPath = path.join(OUTPUT_DIR, `${agentName}.json`);

    // Path traversal guard
    const resolvedPath = path.resolve(outputPath);
    if (!resolvedPath.startsWith(resolvedOutput)) {
      console.error(`❌ Path traversal detected for ${agentName}, skipping`);
      continue;
    }

    fs.writeFileSync(outputPath, JSON.stringify(card, null, 2) + '\n', 'utf8');
    generated++;
  }

  console.log(`✅ Generated ${generated} A2A cards in a2a-cards/`);
  return generated;
}

function validateCards() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    console.error('❌ a2a-cards/ directory not found. Run without --validate first.');
    process.exit(1);
  }

  const agentFiles = fs.readdirSync(AGENTS_DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md');

  const cardFiles = fs.readdirSync(OUTPUT_DIR)
    .filter(f => f.endsWith('.json'));

  let errors = 0;

  // Check all agents have cards
  for (const file of agentFiles) {
    const agentName = file.replace('.md', '');
    const cardFile = `${agentName}.json`;
    if (!cardFiles.includes(cardFile)) {
      console.error(`❌ Missing card: ${cardFile}`);
      errors++;
      continue;
    }

    // Validate card structure
    const cardPath = path.join(OUTPUT_DIR, cardFile);
    const card = JSON.parse(fs.readFileSync(cardPath, 'utf8'));
    const required = ['$schema', 'name', 'description', 'version', 'capabilities', 'skills', 'dependencies', 'provider', 'metadata'];
    for (const field of required) {
      if (!(field in card)) {
        console.error(`❌ ${cardFile}: missing field "${field}"`);
        errors++;
      }
    }
    if (card.provider && !card.provider.classification) {
      console.error(`❌ ${cardFile}: missing provider.classification`);
      errors++;
    }
    if (card.metadata && !card.metadata.sourceFile) {
      console.error(`❌ ${cardFile}: missing metadata.sourceFile`);
      errors++;
    }
  }

  // Check no orphan cards
  for (const cardFile of cardFiles) {
    const agentName = cardFile.replace('.json', '');
    const agentFile = `${agentName}.md`;
    if (!agentFiles.includes(agentFile)) {
      console.warn(`⚠️  Orphan card: ${cardFile} (no matching agent)`);
    }
  }

  if (errors > 0) {
    console.error(`\n❌ Validation failed: ${errors} error(s)`);
    process.exit(1);
  } else {
    console.log(`✅ All ${agentFiles.length} cards validated successfully`);
  }
}

// --- Main ---
try {
  if (validateOnly) {
    validateCards();
  } else {
    generateCards();
  }
} catch (err) {
  console.error(`A2A card generator error: ${err.message}`);
  process.exit(2);
}
