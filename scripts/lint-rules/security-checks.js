#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RULE_ID_SCOPE = 'R300';
const RULE_ID_MANIFEST = 'R301';
const RULE_ID_QUARANTINE = 'R302';

const VALID_ROLE_SCOPES = ['coordination', 'implementation', 'analysis', 'evaluation', 'discovery', 'operations'];

function checkRoleScope(filePath, fields) {
  const warnings = [];
  if (!fields['role-scope']) {
    warnings.push(`${RULE_ID_SCOPE}: agent missing "role-scope:" field`);
  } else if (!VALID_ROLE_SCOPES.includes(fields['role-scope'])) {
    warnings.push(`${RULE_ID_SCOPE}: "role-scope" must be one of [${VALID_ROLE_SCOPES.join(', ')}], got "${fields['role-scope']}"`);
  }
  return { errors: [], warnings };
}

/**
 * R301: Verify trust-manifest.json lists all matrix-skill files and has valid structure.
 */
function checkManifest(projectRoot) {
  const errors = [];
  const warnings = [];
  const manifestPath = path.join(projectRoot, 'skills', 'trust-manifest.json');

  if (!fs.existsSync(manifestPath)) {
    errors.push(`${RULE_ID_MANIFEST}: trust-manifest.json not found at skills/trust-manifest.json`);
    return { errors, warnings };
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    errors.push(`${RULE_ID_MANIFEST}: trust-manifest.json is not valid JSON — ${e.message}`);
    return { errors, warnings };
  }

  if (!manifest.skills || typeof manifest.skills !== 'object') {
    errors.push(`${RULE_ID_MANIFEST}: trust-manifest.json missing "skills" object`);
    return { errors, warnings };
  }

  // Verify every matrix-skills/*.yaml file is listed in the manifest
  const matrixDir = path.join(projectRoot, 'matrix-skills');
  if (fs.existsSync(matrixDir)) {
    const yamlFiles = fs.readdirSync(matrixDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
    for (const yamlFile of yamlFiles) {
      const key = `matrix-skills/${yamlFile}`;
      if (!manifest.skills[key]) {
        warnings.push(`${RULE_ID_MANIFEST}: matrix-skills/${yamlFile} not listed in trust-manifest.json`);
      }
    }
  }

  // Verify each manifest entry has valid trust level and SHA256 hash
  const VALID_TRUST = ['core', 'verified', 'community'];
  const SHA256_PATTERN = /^[a-f0-9]{64}$/i;
  for (const [key, entry] of Object.entries(manifest.skills)) {
    if (!entry || typeof entry !== 'object') {
      warnings.push(`${RULE_ID_MANIFEST}: manifest entry "${key}" is not a valid object`);
      continue;
    }
    if (!VALID_TRUST.includes(entry.trust)) {
      warnings.push(`${RULE_ID_MANIFEST}: manifest entry "${key}" has invalid trust level "${entry.trust}" (must be one of: ${VALID_TRUST.join(', ')})`);
    }

    // SHA256 integrity validation
    if (!entry.sha256) {
      errors.push(`${RULE_ID_MANIFEST}: manifest entry "${key}" has null/missing sha256 — run "node scripts/generate-trust-hashes.js" to populate`);
    } else if (!SHA256_PATTERN.test(entry.sha256)) {
      errors.push(`${RULE_ID_MANIFEST}: manifest entry "${key}" has invalid sha256 format (expected 64 hex chars)`);
    } else {
      // Verify hash matches actual file content
      const filePath = path.join(projectRoot, key);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath);
        const actual = crypto.createHash('sha256').update(content).digest('hex');
        if (actual !== entry.sha256) {
          errors.push(`${RULE_ID_MANIFEST}: manifest entry "${key}" sha256 mismatch (file changed? run "node scripts/generate-trust-hashes.js")`);
        }
      }
    }
  }

  return { errors, warnings };
}

/**
 * R302: Verify quarantine directory exists and check for unapproved community skills.
 */
function checkQuarantine(projectRoot) {
  const errors = [];
  const warnings = [];
  const quarantineDir = path.join(projectRoot, 'skills', 'quarantine');

  if (!fs.existsSync(quarantineDir)) {
    warnings.push(`${RULE_ID_QUARANTINE}: skills/quarantine/ directory not found`);
    return { errors, warnings };
  }

  // Check if quarantine has any skill files (non-README) that need review
  const entries = fs.readdirSync(quarantineDir).filter(f => f !== 'README.md' && f !== '.DS_Store');
  if (entries.length > 0) {
    warnings.push(`${RULE_ID_QUARANTINE}: ${entries.length} item(s) in quarantine awaiting review: ${entries.join(', ')}`);
  }

  return { errors, warnings };
}

module.exports = { checkRoleScope, checkManifest, checkQuarantine, VALID_ROLE_SCOPES, RULE_ID_SCOPE, RULE_ID_MANIFEST, RULE_ID_QUARANTINE };
