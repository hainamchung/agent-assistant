#!/usr/bin/env node

/**
 * Locale Pack Validation — Lint rule for personas/locales/*.yaml
 *
 * Validates:
 *   - Required fields: locale, language, region, formality, communication
 *   - Locale matches filename pattern: {lang}-{REGION}.yaml
 *   - formality.default must be in formality.range
 *   - Communication fields present with correct types
 *   - directness and hierarchy_awareness use 5-point scale
 *   - honorifics is boolean
 *   - greeting_style and feedback_style are non-empty strings
 *   - Valid YAML syntax
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('./yaml-lite');

const LOCALES_DIR = path.join(__dirname, '..', '..', 'personas', 'locales');

const VALID_FIVE_POINT = ['very-high', 'high', 'medium', 'low', 'very-low'];

function validateLocalePack(filePath) {
  const errors = [];
  const warnings = [];
  const filename = path.basename(filePath);

  // Parse YAML
  let data;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    data = yaml.parse(content);
  } catch (err) {
    errors.push(`R400: Invalid YAML syntax: ${err.message}`);
    return { errors, warnings };
  }

  if (!data || typeof data !== 'object') {
    errors.push('R400: Locale pack file is empty or not a valid YAML object');
    return { errors, warnings };
  }

  // R401: Required top-level fields
  const requiredFields = ['locale', 'language', 'region', 'formality', 'communication'];
  for (const field of requiredFields) {
    if (!data[field]) {
      errors.push(`R401: Missing required field "${field}"`);
    }
  }

  // R402: Locale matches filename pattern
  if (data.locale) {
    const expectedFilename = `${data.locale}.yaml`;
    if (filename !== expectedFilename) {
      errors.push(`R402: locale "${data.locale}" does not match filename "${filename}" (expected "${expectedFilename}")`);
    }
    // Validate pattern {lang}-{REGION}
    if (!/^[a-z]{2}-[A-Z]{2}$/.test(data.locale)) {
      warnings.push(`R402: locale "${data.locale}" does not match expected pattern {lang}-{REGION} (e.g., "en-US")`);
    }
  }

  // R403: Formality validation
  if (data.formality && typeof data.formality === 'object') {
    if (!data.formality.default) {
      errors.push('R403: Missing "formality.default"');
    }
    if (!Array.isArray(data.formality.range) || data.formality.range.length === 0) {
      errors.push('R403: "formality.range" must be a non-empty array');
    }
    if (data.formality.default && Array.isArray(data.formality.range)) {
      if (!data.formality.range.includes(data.formality.default)) {
        errors.push(`R403: formality.default "${data.formality.default}" is not in formality.range [${data.formality.range.join(', ')}]`);
      }
    }
  }

  // R404: Communication field validation
  if (data.communication && typeof data.communication === 'object') {
    const comm = data.communication;

    // Required communication fields
    const commFields = ['directness', 'hierarchy_awareness', 'honorifics', 'greeting_style', 'feedback_style'];
    for (const field of commFields) {
      if (comm[field] === undefined || comm[field] === null) {
        errors.push(`R404: Missing communication field "${field}"`);
      }
    }

    // directness: 5-point scale
    if (comm.directness && !VALID_FIVE_POINT.includes(comm.directness)) {
      errors.push(`R404: communication.directness must be one of [${VALID_FIVE_POINT.join(', ')}], got "${comm.directness}"`);
    }

    // hierarchy_awareness: 5-point scale
    if (comm.hierarchy_awareness && !VALID_FIVE_POINT.includes(comm.hierarchy_awareness)) {
      errors.push(`R404: communication.hierarchy_awareness must be one of [${VALID_FIVE_POINT.join(', ')}], got "${comm.hierarchy_awareness}"`);
    }

    // honorifics: boolean
    if (comm.honorifics !== undefined && typeof comm.honorifics !== 'boolean') {
      errors.push(`R404: communication.honorifics must be boolean, got "${typeof comm.honorifics}"`);
    }

    // greeting_style: non-empty string
    if (comm.greeting_style !== undefined && (typeof comm.greeting_style !== 'string' || comm.greeting_style.length === 0)) {
      errors.push('R404: communication.greeting_style must be a non-empty string');
    }

    // feedback_style: non-empty string
    if (comm.feedback_style !== undefined && (typeof comm.feedback_style !== 'string' || comm.feedback_style.length === 0)) {
      errors.push('R404: communication.feedback_style must be a non-empty string');
    }
  }

  return { errors, warnings };
}

/**
 * Validate all locale packs in personas/locales/
 * Returns array of { file, errors, warnings }
 */
function validateAllLocales() {
  const results = [];

  if (!fs.existsSync(LOCALES_DIR)) {
    return results; // No locales directory — nothing to validate
  }

  const files = fs.readdirSync(LOCALES_DIR).filter(f => f.endsWith('.yaml'));

  for (const file of files) {
    const filePath = path.join(LOCALES_DIR, file);
    const { errors, warnings } = validateLocalePack(filePath);
    results.push({ file: filePath, errors, warnings });
  }

  return results;
}

module.exports = { validateLocalePack, validateAllLocales };
