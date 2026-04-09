#!/usr/bin/env node
'use strict';

/**
 * Deliverable Schema Lint Rules (R200-R299)
 * Validates command output structures against expected deliverable schemas.
 *
 * Loaded by: scripts/lint-agents.js (modular rule loading)
 *
 * Schemas defined:
 *   - cook: implementation deliverable
 *   - fix: bug-fix deliverable
 *   - plan: planning deliverable
 *   - review: code review deliverable
 *   - test: test suite deliverable
 */

const DELIVERABLE_SCHEMAS = {
  cook: {
    ruleId: 'R200',
    command: 'cook',
    requiredSections: [
      'Implementation Summary',
      'Files Changed',
      'Testing'
    ],
    optionalSections: [
      'Dependencies Added',
      'Migration Notes',
      'Rollback Plan'
    ],
    description: 'Implementation deliverable must include summary, files changed, and testing notes'
  },
  fix: {
    ruleId: 'R201',
    command: 'fix',
    requiredSections: [
      'Root Cause',
      'Fix Applied',
      'Verification'
    ],
    optionalSections: [
      'Related Issues',
      'Regression Risk',
      'Prevention'
    ],
    description: 'Bug-fix deliverable must include root cause, fix description, and verification steps'
  },
  plan: {
    ruleId: 'R202',
    command: 'plan',
    requiredSections: [
      'Objective',
      'Tasks',
      'Acceptance Criteria'
    ],
    optionalSections: [
      'Dependencies',
      'Risks',
      'Timeline',
      'Rollback Plan'
    ],
    description: 'Plan deliverable must include objective, task breakdown, and acceptance criteria'
  },
  review: {
    ruleId: 'R203',
    command: 'review',
    requiredSections: [
      'Summary',
      'Findings',
      'Verdict'
    ],
    optionalSections: [
      'Severity Breakdown',
      'Recommendations',
      'Positive Notes'
    ],
    description: 'Review deliverable must include summary, findings list, and pass/fail verdict'
  },
  test: {
    ruleId: 'R204',
    command: 'test',
    requiredSections: [
      'Test Plan',
      'Test Cases',
      'Results'
    ],
    optionalSections: [
      'Coverage',
      'Edge Cases',
      'Performance Notes'
    ],
    description: 'Test deliverable must include plan, test cases, and execution results'
  }
};

// --- Schema Validation Functions ---

/**
 * Validate a deliverable file against its schema.
 * @param {string} content - The markdown content of the deliverable
 * @param {string} schemaKey - One of: cook, fix, plan, review, test
 * @returns {{ errors: string[], warnings: string[] }}
 */
function validateDeliverable(content, schemaKey) {
  const errors = [];
  const warnings = [];
  const schema = DELIVERABLE_SCHEMAS[schemaKey];

  if (!schema) {
    errors.push(`R299: unknown deliverable schema "${schemaKey}"`);
    return { errors, warnings };
  }

  // Extract all headings (## or ###) from the content
  const headings = [];
  for (const line of content.split('\n')) {
    const hMatch = line.match(/^#{2,3}\s+(.+)/);
    if (hMatch) headings.push(hMatch[1].trim());
  }

  // Check required sections
  for (const section of schema.requiredSections) {
    const found = headings.some(h =>
      h.toLowerCase().includes(section.toLowerCase())
    );
    if (!found) {
      errors.push(`${schema.ruleId}: missing required section "${section}" in ${schemaKey} deliverable`);
    }
  }

  // Warn on missing optional sections
  for (const section of schema.optionalSections) {
    const found = headings.some(h =>
      h.toLowerCase().includes(section.toLowerCase())
    );
    if (!found) {
      warnings.push(`${schema.ruleId}: optional section "${section}" not found in ${schemaKey} deliverable`);
    }
  }

  // R210: Deliverable must have at least one heading
  if (headings.length === 0) {
    errors.push('R210: deliverable has no headings (## or ###)');
  }

  // R211: Deliverable must not be empty
  if (content.trim().length < 50) {
    errors.push('R211: deliverable content appears too short (< 50 characters)');
  }

  return { errors, warnings };
}

/**
 * Detect which schema applies to a file based on path or frontmatter.
 * @param {string} filePath - Path to the deliverable file
 * @param {object|null} frontmatter - Parsed frontmatter (if any)
 * @returns {string|null} - Schema key or null if not a deliverable
 */
function detectSchema(filePath, frontmatter) {
  // Check frontmatter for explicit deliverable-type
  if (frontmatter && frontmatter['deliverable-type']) {
    const dt = frontmatter['deliverable-type'];
    if (DELIVERABLE_SCHEMAS[dt]) return dt;
  }

  // Infer from file path: reports/**/cook-*, fix-*, plan-*, review-*, test-*
  const basename = require('path').basename(filePath).toLowerCase();
  for (const key of Object.keys(DELIVERABLE_SCHEMAS)) {
    if (basename.startsWith(`${key}-`) || basename.startsWith(`${key}_`)) {
      return key;
    }
  }

  return null;
}

// --- Exports ---

module.exports = {
  DELIVERABLE_SCHEMAS,
  validateDeliverable,
  detectSchema
};
