'use strict';

/**
 * Topology Override Validation — Lint rule for topology-overrides in command frontmatter
 *
 * Validates:
 *   - Every topology name in topology-overrides matches a file in topologies/ directory
 *   - Phase names follow pattern phase-N where N is a positive integer
 *   - Warns if more phases are overridden than typical for the command
 */

const fs = require('fs');
const path = require('path');

const TOPOLOGIES_DIR = path.join(__dirname, '..', '..', 'topologies');
const RULE_ID_INVALID_TOPO = 'T501';
const RULE_ID_INVALID_PHASE = 'T502';
const RULE_ID_EXCESS_PHASES = 'T503';

/**
 * Get available topology names from the topologies/ directory at lint time.
 * Does NOT use the hardcoded VALID_TOPOLOGIES array.
 */
function getAvailableTopologies() {
  if (!fs.existsSync(TOPOLOGIES_DIR)) return [];
  return fs.readdirSync(TOPOLOGIES_DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .map(f => f.replace('.md', ''));
}

/**
 * Validate topology-overrides from a command's parsed frontmatter.
 * @param {object} frontmatter - Parsed frontmatter with topology-overrides
 * @returns {{ errors: string[], warnings: string[] }}
 */
function validateTopologyOverrides(frontmatter) {
  const errors = [];
  const warnings = [];

  const overrides = frontmatter['topology-overrides'];
  if (!overrides || typeof overrides !== 'object') return { errors, warnings };

  const available = getAvailableTopologies();

  const entries = Object.entries(overrides);
  for (const [phaseKey, topoName] of entries) {
    // Validate phase name format: phase-N
    if (!/^phase-\d+$/.test(phaseKey)) {
      errors.push(`${RULE_ID_INVALID_PHASE}: Invalid phase key "${phaseKey}" — must match pattern "phase-N" (e.g., "phase-1")`);
      continue;
    }

    const phaseNum = parseInt(phaseKey.split('-')[1], 10);
    if (phaseNum < 1) {
      errors.push(`${RULE_ID_INVALID_PHASE}: Phase number must be positive, got "${phaseKey}"`);
    }

    // Validate topology name against actual directory
    if (typeof topoName === 'string' && !available.includes(topoName)) {
      errors.push(`${RULE_ID_INVALID_TOPO}: Topology "${topoName}" in ${phaseKey} not found in topologies/ directory. Available: [${available.join(', ')}]`);
    }
  }

  // Warn if unusually many overrides (> 7 phases)
  if (entries.length > 7) {
    warnings.push(`${RULE_ID_EXCESS_PHASES}: ${entries.length} phase overrides defined — verify this is intentional`);
  }

  return { errors, warnings };
}

module.exports = { validateTopologyOverrides, getAvailableTopologies };
