'use strict';

/**
 * Community Tier Validation — Lint rule for .agent-assistant/contributors.json
 *
 * Validates:
 *   - Valid JSON schema (required fields, valid tier values)
 *   - No duplicate contributor IDs
 *   - Dates are ISO-8601 format (when present)
 *   - Graceful skip if manifest doesn't exist
 */

const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = path.join(__dirname, '..', '..', '.agent-assistant', 'contributors.json');
const VALID_TIERS = ['newcomer', 'contributor', 'trusted', 'maintainer'];
const ISO_8601_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

/**
 * Validate the contributor manifest.
 * Returns { errors, warnings } or null if manifest doesn't exist.
 */
function validateContributorManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return null;

  const errors = [];
  const warnings = [];

  let data;
  try {
    data = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch (err) {
    errors.push(`CT01: Invalid JSON in contributors.json: ${err.message}`);
    return { file: MANIFEST_PATH, errors, warnings };
  }

  // Version check
  if (!data.version) {
    warnings.push('CT02: Missing "version" field');
  }

  // Contributors array
  if (!Array.isArray(data.contributors)) {
    errors.push('CT03: "contributors" must be an array');
    return { file: MANIFEST_PATH, errors, warnings };
  }

  const seenIds = new Set();
  for (let i = 0; i < data.contributors.length; i++) {
    const c = data.contributors[i];
    const prefix = `contributors[${i}]`;

    // Required fields
    if (!c.id || typeof c.id !== 'string') {
      errors.push(`CT04: ${prefix} missing or invalid "id" field`);
    }
    if (!c.tier || !VALID_TIERS.includes(c.tier)) {
      errors.push(`CT05: ${prefix} "tier" must be one of [${VALID_TIERS.join(', ')}], got "${c.tier}"`);
    }
    if (!c.joined) {
      errors.push(`CT06: ${prefix} missing "joined" field`);
    } else if (!ISO_8601_RE.test(c.joined)) {
      errors.push(`CT06: ${prefix} "joined" must be ISO-8601 format, got "${c.joined}"`);
    }

    // Duplicate check
    if (c.id) {
      if (seenIds.has(c.id)) {
        errors.push(`CT07: Duplicate contributor ID "${c.id}"`);
      }
      seenIds.add(c.id);
    }

    // Optional date validation
    if (c.promoted_at && c.promoted_at !== null && !ISO_8601_RE.test(c.promoted_at)) {
      warnings.push(`CT08: ${prefix} "promoted_at" should be ISO-8601 format, got "${c.promoted_at}"`);
    }
  }

  return { file: MANIFEST_PATH, errors, warnings };
}

module.exports = { validateContributorManifest };
