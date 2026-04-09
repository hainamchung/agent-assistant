'use strict';

/**
 * Lint Rule R017 — Validation Rules Integrity
 * Checks that rules/VALIDATION-RULES.md exists and has valid frontmatter.
 *
 * Loaded by: scripts/lint-agents.js (modular rule loading)
 */

const fs = require('fs');
const path = require('path');
const { parseFrontmatter } = require('../lib/parse-frontmatter');

const VALIDATION_RULES_PATH = path.join(__dirname, '..', '..', 'rules', 'VALIDATION-RULES.md');

function check() {
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(VALIDATION_RULES_PATH)) {
    errors.push('R017: rules/VALIDATION-RULES.md not found');
    return { errors, warnings };
  }

  const content = fs.readFileSync(VALIDATION_RULES_PATH, 'utf-8');
  const fm = parseFrontmatter(content);

  if (!fm) {
    errors.push('R017: rules/VALIDATION-RULES.md has no valid YAML frontmatter');
    return { errors, warnings };
  }

  if (!fm.name) {
    warnings.push('R017: VALIDATION-RULES.md frontmatter missing "name" field');
  }

  if (!fm.version) {
    warnings.push('R017: VALIDATION-RULES.md frontmatter missing "version" field');
  }

  return { errors, warnings };
}

module.exports = { check, ruleId: 'R017' };
