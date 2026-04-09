#!/usr/bin/env node

/**
 * Skill Summarization Script
 * Traverses skills/{name}/SKILL.md, extracts frontmatter, outputs categorized summary.
 *
 * Usage:
 *   node scripts/summarize-skills.js
 *
 * Output:
 *   skills/_summary.yaml
 *
 * Exit codes:
 *   0 = success
 *   1 = errors encountered (partial output may still be generated)
 *   2 = script execution error
 */

'use strict';

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '..', 'skills');
const OUTPUT_FILE = path.join(SKILLS_DIR, '_summary.yaml');

const { parseFrontmatter } = require('./lib/parse-frontmatter');

// --- YAML Escaping ---

function yamlEscape(str) {
  if (!str) return '""';
  if (/[:#\[\]{}&*!|>%@`]/.test(str) || str.includes('"') || str.includes("'")) {
    return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return str;
}

// --- Main ---

function main() {
  let skillDirs;
  try {
    skillDirs = fs.readdirSync(SKILLS_DIR)
      .filter(d => {
        const fullPath = path.join(SKILLS_DIR, d);
        return fs.statSync(fullPath).isDirectory() && !d.startsWith('_');
      })
      .sort();
  } catch (err) {
    console.error(`Error reading skills directory: ${err.message}`);
    process.exit(2);
  }

  const skills = [];
  let errors = 0;

  for (const dir of skillDirs) {
    const skillFile = path.join(SKILLS_DIR, dir, 'SKILL.md');
    if (!fs.existsSync(skillFile)) continue;

    try {
      const content = fs.readFileSync(skillFile, 'utf8');
      const fields = parseFrontmatter(content);

      if (fields) {
        skills.push({
          name: fields.name || dir,
          description: fields.description || '',
          tags: fields.tags || [],
          category: fields.category || 'uncategorized',
          dir: dir
        });
      } else {
        skills.push({ name: dir, description: '', tags: [], category: 'uncategorized', dir });
      }
    } catch (err) {
      console.error(`Warning: Could not read ${skillFile}: ${err.message}`);
      errors++;
    }
  }

  // Categorize
  const categories = {};
  for (const skill of skills) {
    const cat = skill.category || 'uncategorized';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(skill);
  }

  // Generate YAML output
  const lines = [];
  lines.push('# Auto-generated skill summary');
  lines.push(`# Generated: ${new Date().toISOString().split('T')[0]}`);
  lines.push(`# Total skills: ${skills.length}`);
  lines.push(`# Categories: ${Object.keys(categories).length}`);
  lines.push('');
  lines.push(`total: ${skills.length}`);
  lines.push(`generated: "${new Date().toISOString().split('T')[0]}"`);
  lines.push('categories:');

  const sortedCats = Object.keys(categories).sort();
  for (const cat of sortedCats) {
    const catSkills = categories[cat];
    lines.push(`  ${cat}:`);
    lines.push(`    count: ${catSkills.length}`);
    lines.push(`    skills:`);
    for (const skill of catSkills) {
      lines.push(`      - name: ${yamlEscape(skill.name)}`);
      if (skill.description) {
        lines.push(`        description: ${yamlEscape(skill.description)}`);
      }
      if (Array.isArray(skill.tags) && skill.tags.length > 0) {
        lines.push(`        tags: [${skill.tags.map(t => yamlEscape(t)).join(', ')}]`);
      }
    }
  }

  try {
    fs.writeFileSync(OUTPUT_FILE, lines.join('\n') + '\n', 'utf8');
    console.log(`✅ Summary generated: ${path.relative(process.cwd(), OUTPUT_FILE)}`);
    console.log(`   Skills: ${skills.length}`);
    console.log(`   Categories: ${Object.keys(categories).length}`);
    if (errors > 0) {
      console.log(`   Warnings: ${errors} files could not be read`);
    }
  } catch (err) {
    console.error(`Error writing summary: ${err.message}`);
    process.exit(2);
  }

  process.exit(errors > 0 ? 1 : 0);
}

main();
