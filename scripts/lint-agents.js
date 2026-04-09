#!/usr/bin/env node

/**
 * Agent & Command Frontmatter Linter
 * Validates all agent and command files against the v1.0 schema.
 *
 * Usage:
 *   node scripts/lint-agents.js [--strict] [--agents-only] [--commands-only]
 *
 * Exit codes:
 *   0 = all validations pass
 *   1 = validation errors found
 *   2 = script execution error
 */

'use strict';

const fs = require('fs');
const path = require('path');

// --- Configuration ---

const { parseFrontmatter } = require('./lib/parse-frontmatter');
const { checkRoleScope, checkManifest, checkQuarantine } = require('./lint-rules/security-checks');
const { validateAllLocales } = require('./lint-rules/locale-validation');
const { validateTopologyOverrides } = require('./lint-rules/topology-validation');
const { validateContributorManifest } = require('./lint-rules/tier-validation');
const { validateComposition } = require('./lint-rules/composition-validation');

const AGENTS_DIR = path.join(__dirname, '..', 'agents');
const COMMANDS_DIR = path.join(__dirname, '..', 'commands');
const GUARDRAILS_DIR = path.join(__dirname, '..', 'guardrails');
const TOPOLOGIES_DIR = path.join(__dirname, '..', 'topologies');
const REPORTS_DIR = path.join(__dirname, '..', 'reports');
const LINT_RULES_DIR = path.join(__dirname, 'lint-rules');

const VALID_CATEGORIES = ['meta', 'execution', 'investigation', 'validation', 'research', 'support', 'team-role'];
const VALID_TONES = ['formal', 'casual', 'direct', 'warm', 'technical'];
const VALID_VERBOSITY = ['concise', 'balanced', 'detailed'];
const VALID_STYLES = ['analytical', 'creative', 'pragmatic', 'methodical', 'narrative'];
const VALID_HUMOR = ['none', 'subtle', 'present'];
const VALID_TOPOLOGIES = ['pipeline', 'fan-out', 'hierarchical', 'round-robin', 'swarm'];
const VALID_EXEC_MODES = ['router', 'execute'];

const SEMVER_LIGHT = /^\d+\.\d+$/;

// --- Directory Walker ---

function walkDir(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else if (entry.name.endsWith('.md') && entry.name !== 'README.md') {
      results.push(fullPath);
    }
  }
  return results;
}

// --- Frontmatter Parser (shared module) ---
// parseFrontmatter imported from './lib/parse-frontmatter'

// --- Validation Rules ---

function validateAgent(filePath, fields) {
  const errors = [];
  const warnings = [];
  const isTeamRole = filePath.includes(path.join('agents', 'teams'));

  if (!fields.name) errors.push('R001: missing "name" field');
  if (!fields.description) errors.push('R002: missing "description" field');
  if (!fields.profile) {
    if (!isTeamRole) errors.push('R003: missing "profile" field');
  } else if (typeof fields.profile === 'string' && !/^[\w][\w-]*:[\w][\w-]*$/.test(fields.profile)) {
    errors.push(`R003: "profile" must match {domain}:{category} pattern, got "${fields.profile}"`);
  }
  if (!fields.handoffs) {
    if (!isTeamRole) errors.push('R004: missing "handoffs" field');
  } else if (Array.isArray(fields.handoffs)) {
    const agentFiles = getAgentFileNames();
    const META_REFS = ['all-agents', 'any-agent'];
    for (const h of fields.handoffs) {
      if (!agentFiles.includes(h) && !META_REFS.includes(h)) {
        errors.push(`R004: handoff target "${h}" does not match any agent file`);
      }
    }
  }
  if (!fields.version) {
    errors.push('R005: missing "version" field');
  } else if (!SEMVER_LIGHT.test(fields.version)) {
    errors.push(`R005: "version" must be semver-light (e.g., "1.0"), got "${fields.version}"`);
  }
  if (!fields.category) {
    errors.push('R006: missing "category" field');
  } else if (!VALID_CATEGORIES.includes(fields.category)) {
    errors.push(`R006: "category" must be one of [${VALID_CATEGORIES.join(', ')}], got "${fields.category}"`);
  }
  if (!fields['schema-version']) {
    warnings.push('R007: missing "schema-version" field');
  } else if (!SEMVER_LIGHT.test(fields['schema-version'])) {
    warnings.push(`R007: "schema-version" must be semver-light, got "${fields['schema-version']}"`);
  }
  if (fields.personality && typeof fields.personality === 'object') {
    if (fields.personality.tone && !VALID_TONES.includes(fields.personality.tone)) {
      warnings.push(`R008: personality.tone must be one of [${VALID_TONES.join(', ')}], got "${fields.personality.tone}"`);
    }
    if (fields.personality.verbosity && !VALID_VERBOSITY.includes(fields.personality.verbosity)) {
      warnings.push(`R008: personality.verbosity must be one of [${VALID_VERBOSITY.join(', ')}], got "${fields.personality.verbosity}"`);
    }
    if (fields.personality.style && !VALID_STYLES.includes(fields.personality.style)) {
      warnings.push(`R008: personality.style must be one of [${VALID_STYLES.join(', ')}], got "${fields.personality.style}"`);
    }
    if (fields.personality.humor && !VALID_HUMOR.includes(fields.personality.humor)) {
      warnings.push(`R008: personality.humor must be one of [${VALID_HUMOR.join(', ')}], got "${fields.personality.humor}"`);
    }
  }
  if (fields.capabilities) {
    if (!Array.isArray(fields.capabilities) || fields.capabilities.length === 0) {
      warnings.push('R009: "capabilities" should be a non-empty array of strings');
    }
  }
  if (fields.scope && typeof fields.scope === 'object' && fields.scope.files) {
    if (!Array.isArray(fields.scope.files)) {
      warnings.push('R010: "scope.files" should be an array of glob patterns');
    }
  }
  if (fields.guardrails && Array.isArray(fields.guardrails)) {
    for (const g of fields.guardrails) {
      const guardFile = path.join(GUARDRAILS_DIR, `${g}.md`);
      if (!fs.existsSync(guardFile)) {
        warnings.push(`R011: guardrail "${g}" does not match a file in guardrails/ directory`);
      }
    }
  }
  // skill-profile: optional string field for task-scoped skill profiles
  if (fields['skill-profile'] && typeof fields['skill-profile'] !== 'string') {
    warnings.push('R016: "skill-profile" should be a string (e.g., "REST API", "React UI")');
  }
  // voice: optional object with adaptation (bool) and deviation_tolerance (number)
  if (fields.voice && typeof fields.voice === 'object') {
    if (typeof fields.voice.adaptation !== 'boolean') {
      warnings.push('R019: "voice.adaptation" should be a boolean');
    }
    if (fields.voice.deviation_tolerance != null && (typeof fields.voice.deviation_tolerance !== 'number' || fields.voice.deviation_tolerance < 0 || fields.voice.deviation_tolerance > 3)) {
      warnings.push('R020: "voice.deviation_tolerance" should be a number 0-3');
    }
  }
  // guardrail_levels: optional object with input/output/escalation
  if (fields.guardrail_levels && typeof fields.guardrail_levels === 'object') {
    const validIO = ['strict', 'standard', 'minimal'];
    const validEsc = ['auto', 'manual', 'none'];
    if (fields.guardrail_levels.input && !validIO.includes(fields.guardrail_levels.input)) {
      warnings.push(`R021: "guardrail_levels.input" must be one of [${validIO.join(', ')}], got "${fields.guardrail_levels.input}"`);
    }
    if (fields.guardrail_levels.output && !validIO.includes(fields.guardrail_levels.output)) {
      warnings.push(`R022: "guardrail_levels.output" must be one of [${validIO.join(', ')}], got "${fields.guardrail_levels.output}"`);
    }
    if (fields.guardrail_levels.escalation && !validEsc.includes(fields.guardrail_levels.escalation)) {
      warnings.push(`R023: "guardrail_levels.escalation" must be one of [${validEsc.join(', ')}], got "${fields.guardrail_levels.escalation}"`);
    }
  }
  // preflight: optional array of preflight check identifiers (team roles inherit from base-agent)
  if (!isTeamRole && (!fields.preflight || (Array.isArray(fields.preflight) && fields.preflight.length === 0))) {
    warnings.push('R018: missing or empty "preflight:" field');
  }

  // role-scope: required scalar field for domain boundaries (delegated to security-checks.js)
  if (!isTeamRole) {
    const scopeResult = checkRoleScope(filePath, fields);
    warnings.push(...scopeResult.warnings);
  }

  return { errors, warnings };
}

function validateCommand(filePath, fields) {
  const errors = [];
  const warnings = [];

  if (!fields.description) errors.push('R012: missing "description" field');
  if (!fields['execution-mode']) {
    errors.push('R013: missing "execution-mode" field');
  } else if (!VALID_EXEC_MODES.includes(fields['execution-mode'])) {
    errors.push(`R013: "execution-mode" must be one of [${VALID_EXEC_MODES.join(', ')}], got "${fields['execution-mode']}"`);
  }
  if (!fields['schema-version']) {
    warnings.push('R007: missing "schema-version" field');
  }
  if (fields.topology && !VALID_TOPOLOGIES.includes(fields.topology)) {
    warnings.push(`R014: "topology" must be one of [${VALID_TOPOLOGIES.join(', ')}], got "${fields.topology}"`);
  }
  if (fields['topology_template']) {
    const templateFile = path.join(TOPOLOGIES_DIR, `${fields['topology_template']}.md`);
    if (!fs.existsSync(templateFile)) {
      warnings.push(`R015: topology_template "${fields['topology_template']}" not found in topologies/`);
    }
  }

  // Validate topology-overrides (Sprint 6)
  const topoResult = validateTopologyOverrides(fields);
  errors.push(...topoResult.errors);
  warnings.push(...topoResult.warnings);

  return { errors, warnings };
}

// --- Helpers ---

let _agentFileNames = null;
function getAgentFileNames() {
  if (_agentFileNames) return _agentFileNames;
  try {
    _agentFileNames = fs.readdirSync(AGENTS_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''));
  } catch {
    _agentFileNames = [];
  }
  return _agentFileNames;
}

// ============================================================
// Extension Rules R100+ (Sprint 2 — Frontmatter Integrity)
// ============================================================

function validateIntegrityRules(filePath, fields) {
  const errors = [];
  const warnings = [];

  // R100: schema-version must match semver-light pattern (x.y) consistent with R007
  if (fields['schema-version']) {
    const version = String(fields['schema-version']);
    if (!/^\d+\.\d+$/.test(version)) {
      warnings.push(`R100: schema-version "${version}" does not match semver-light pattern (x.y)`);
    }
  }

  // R101: category must be valid enum (agent files only)
  const isAgentFile = filePath.includes(path.sep + 'agents' + path.sep) || filePath.includes('/agents/');
  if (isAgentFile && fields.category && !VALID_CATEGORIES.includes(fields.category)) {
    warnings.push(`R101: category "${fields.category}" is not a recognized value. Valid: ${VALID_CATEGORIES.join(', ')}`);
  }

  // R102: handoffs entries must reference existing agent files (Blocking — errors not warnings)
  if (fields.handoffs && Array.isArray(fields.handoffs)) {
    const META_REFS = ['all-agents', 'any-agent'];
    for (const target of fields.handoffs) {
      if (META_REFS.includes(target)) continue;
      const agentFile = path.join(AGENTS_DIR, `${target}.md`);
      if (!fs.existsSync(agentFile)) {
        errors.push(`R102: handoff target "${target}" → agents/${target}.md not found`);
      }
    }
  }

  // R103: deprecated field (if present) must match deprecation schema
  if (fields.deprecated) {
    const dep = fields.deprecated;
    if (typeof dep !== 'object' || !dep.field || !dep.since) {
      warnings.push('R103: deprecated field missing required keys: "field" and "since" are mandatory');
    }
  }

  return { errors, warnings };
}

// --- Modular Rule Loader ---

function loadDeliverableRules() {
  const rulesFile = path.join(LINT_RULES_DIR, 'deliverable-schemas.js');
  if (!fs.existsSync(rulesFile)) {
    console.warn('⚠️  deliverable-schemas.js not found in lint-rules/; skipping deliverable linting');
    return null;
  }
  return require(rulesFile);
}

function lintDeliverables(deliverableModule) {
  const results = [];
  if (!fs.existsSync(REPORTS_DIR)) return results;

  const files = walkDir(REPORTS_DIR);
  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    const schemaKey = deliverableModule.detectSchema(filePath, frontmatter);
    if (!schemaKey) continue;

    const { errors, warnings } = deliverableModule.validateDeliverable(content, schemaKey);
    results.push({ file: filePath, errors, warnings });
  }
  return results;
}

// --- MCP Tool Validation (Sprint 7) ---

const MCP_ALLOWED_METHODS = new Set([
  'agent/list', 'agent/get',
  'skill/list', 'skill/get',
  'command/list',
  'benchmark/run'
]);

function validateMcpTools(filePath, fields) {
  const errors = [];
  if (!fields.mcp_tools) return { errors, warnings: [] };
  const tools = Array.isArray(fields.mcp_tools) ? fields.mcp_tools : [fields.mcp_tools];
  for (const tool of tools) {
    if (!MCP_ALLOWED_METHODS.has(tool)) {
      errors.push(`R500: mcp_tools entry "${tool}" is not in MCP server ALLOWED_METHODS`);
    }
  }
  return { errors, warnings: [] };
}

// --- Liaison Validation (Sprint 7) ---

const VALID_LIAISON_TARGETS = ['human', 'ci', 'monitoring', 'ticketing', 'chat'];

function validateLiaison(filePath, fields) {
  const errors = [];
  const liaisonVal = fields.liaison === true || fields.liaison === 'true';

  // R600: If liaison: true, liaison_targets must be a non-empty array
  if (liaisonVal) {
    if (!fields.liaison_targets || !Array.isArray(fields.liaison_targets) || fields.liaison_targets.length === 0) {
      errors.push('R600: liaison is true but "liaison_targets" is missing or empty — must be a non-empty array');
    }
  }

  // R601: Each liaison_target must be from allowed types
  if (Array.isArray(fields.liaison_targets)) {
    for (const target of fields.liaison_targets) {
      if (!VALID_LIAISON_TARGETS.includes(target)) {
        errors.push(`R601: liaison_target "${target}" is not valid. Allowed: [${VALID_LIAISON_TARGETS.join(', ')}]`);
      }
    }
  }

  // R602: If liaison is false or absent, liaison_targets must not be present
  if (!liaisonVal) {
    if (fields.liaison_targets != null) {
      errors.push('R602: "liaison_targets" must not be present when liaison is false or absent');
    }
  }

  return { errors, warnings: [] };
}

// --- Main ---

function main() {
  const args = process.argv.slice(2);
  const strict = args.includes('--strict');
  const agentsOnly = args.includes('--agents-only');
  const commandsOnly = args.includes('--commands-only');
  const lintDeliverableFlag = args.includes('--deliverables');

  let totalErrors = 0;
  let totalWarnings = 0;
  let totalFiles = 0;
  const results = [];

  if (!commandsOnly) {
    try {
      const agentFiles = walkDir(AGENTS_DIR);

      for (const filePath of agentFiles) {
        totalFiles++;
        const content = fs.readFileSync(filePath, 'utf8');
        const fields = parseFrontmatter(content);

        if (!fields) {
          results.push({ file: filePath, errors: ['No YAML frontmatter found'], warnings: [] });
          totalErrors++;
          continue;
        }

        const agentResult = validateAgent(filePath, fields);
        const integrityResult = validateIntegrityRules(filePath, fields);
        const mcpResult = validateMcpTools(filePath, fields);
        const liaisonResult = validateLiaison(filePath, fields);
        const errors = [...agentResult.errors, ...integrityResult.errors, ...mcpResult.errors, ...liaisonResult.errors];
        const warnings = [...agentResult.warnings, ...integrityResult.warnings];
        totalErrors += errors.length;
        totalWarnings += warnings.length;
        results.push({ file: filePath, errors, warnings });
      }
    } catch (err) {
      console.error(`Error reading agents directory: ${err.message}`);
      process.exit(2);
    }
  }

  if (!agentsOnly) {
    try {
      const cmdFiles = walkDir(COMMANDS_DIR);

      for (const filePath of cmdFiles) {
        totalFiles++;
        const content = fs.readFileSync(filePath, 'utf8');
        const fields = parseFrontmatter(content);

        if (!fields) {
          results.push({ file: filePath, errors: ['No YAML frontmatter found'], warnings: [] });
          totalErrors++;
          continue;
        }

        const cmdResult = validateCommand(filePath, fields);
        const integrityResult = validateIntegrityRules(filePath, fields);
        const errors = [...cmdResult.errors, ...integrityResult.errors];
        const warnings = [...cmdResult.warnings, ...integrityResult.warnings];
        totalErrors += errors.length;
        totalWarnings += warnings.length;
        results.push({ file: filePath, errors, warnings });
      }
    } catch (err) {
      console.error(`Error reading commands directory: ${err.message}`);
      process.exit(2);
    }
  }

  // --- Security checks R301-R302 (project-level) ---
  const projectRoot = path.join(__dirname, '..');
  const manifestResult = checkManifest(projectRoot);
  if (manifestResult.errors.length || manifestResult.warnings.length) {
    totalErrors += manifestResult.errors.length;
    totalWarnings += manifestResult.warnings.length;
    results.push({ file: path.join(projectRoot, 'skills', 'trust-manifest.json'), errors: manifestResult.errors, warnings: manifestResult.warnings });
  }
  const quarantineResult = checkQuarantine(projectRoot);
  if (quarantineResult.errors.length || quarantineResult.warnings.length) {
    totalErrors += quarantineResult.errors.length;
    totalWarnings += quarantineResult.warnings.length;
    results.push({ file: path.join(projectRoot, 'skills', 'quarantine'), errors: quarantineResult.errors, warnings: quarantineResult.warnings });
  }

  // --- Locale pack validation (Sprint 6) ---
  const localeResults = validateAllLocales();
  for (const r of localeResults) {
    totalFiles++;
    totalErrors += r.errors.length;
    totalWarnings += r.warnings.length;
    results.push(r);
  }

  // --- Contributor manifest validation (Sprint 6) ---
  const tierResult = validateContributorManifest();
  if (tierResult) {
    totalFiles++;
    totalErrors += tierResult.errors.length;
    totalWarnings += tierResult.warnings.length;
    results.push(tierResult);
  }

  // --- Skill composition validation (Sprint 7) ---
  const compositionResult = validateComposition();
  if (compositionResult.errors.length || compositionResult.warnings.length) {
    totalFiles++;
    totalErrors += compositionResult.errors.length;
    totalWarnings += compositionResult.warnings.length;
    results.push({ file: path.join(__dirname, '..', 'matrix-skills', '(composition)'), errors: compositionResult.errors, warnings: compositionResult.warnings });
  }

  // --- Deliverable linting (opt-in) ---
  if (lintDeliverableFlag) {
    const deliverableModule = loadDeliverableRules();
    if (deliverableModule) {
      const deliverableResults = lintDeliverables(deliverableModule);
      for (const r of deliverableResults) {
        totalFiles++;
        totalErrors += r.errors.length;
        totalWarnings += r.warnings.length;
        results.push(r);
      }
    }
  }

  console.log(`lint-agents: Checking ${totalFiles} files...\n`);

  for (const r of results) {
    const rel = path.relative(path.join(__dirname, '..'), r.file);
    if (r.errors.length === 0 && r.warnings.length === 0) {
      console.log(`✅ ${rel} — 0 errors, 0 warnings`);
    } else if (r.errors.length === 0) {
      console.log(`⚠️  ${rel} — 0 errors, ${r.warnings.length} warning(s)`);
      for (const w of r.warnings) console.log(`   WARN ${w}`);
    } else {
      console.log(`❌ ${rel} — ${r.errors.length} error(s), ${r.warnings.length} warning(s)`);
      for (const e of r.errors) console.log(`   ERR  ${e}`);
      for (const w of r.warnings) console.log(`   WARN ${w}`);
    }
  }

  console.log(`\n---`);
  console.log(`Summary: ${totalFiles} files, ${totalErrors} errors, ${totalWarnings} warnings`);

  if (totalErrors > 0) {
    process.exit(1);
  } else if (strict && totalWarnings > 0) {
    console.log(`(--strict mode: treating ${totalWarnings} warnings as errors)`);
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main();
