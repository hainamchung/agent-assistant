#!/usr/bin/env node

/**
 * Lint Rule R018: Preflight field presence check
 * Warns if agent frontmatter is missing `preflight:` field.
 *
 * Severity: warning (allows gradual adoption)
 */

'use strict';

const RULE_ID = 'R018';

function checkPreflight(filePath, fields) {
  const warnings = [];

  if (!fields.preflight || (Array.isArray(fields.preflight) && fields.preflight.length === 0)) {
    warnings.push(`${RULE_ID}: agent missing "preflight:" field or field is empty`);
  }

  return { errors: [], warnings };
}

module.exports = { checkPreflight, RULE_ID };
