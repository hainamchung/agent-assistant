#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { parse } = require('./yaml-lite');

const MATRIX_SKILLS_DIR = path.join(__dirname, '..', '..', 'matrix-skills');
const AGENTS_DIR = path.join(__dirname, '..', '..', 'agents');

// Agent category lookup (mirrors agents/*.md frontmatter)
const AGENT_CATEGORY_CACHE = {};

/**
 * Map of which domain files map to which primary agents.
 * Used for self-composition detection.
 */
const DOMAIN_PRIMARY_AGENTS = {
  backend: ['backend-engineer'],
  frontend: ['frontend-engineer'],
  design: ['designer'],
  quality: ['tester', 'debugger', 'reviewer'],
  security: ['security-engineer'],
  devops: ['devops-engineer'],
  data: ['database-architect'],
  research: ['researcher', 'docs-manager', 'scouter'],
  planning: ['planner', 'brainstormer'],
  architecture: ['tech-lead'],
  performance: ['performance-engineer'],
  management: ['project-manager', 'business-analyst'],
  mobile: ['mobile-engineer'],
  gaming: ['game-engineer'],
  cloud: ['devops-engineer'],
  'ai-ml': ['researcher'],
  languages: [],
  tools: [],
  mcp: [],
};

/**
 * Category compatibility matrix.
 * Key = source category, value = set of disallowed target categories.
 * validation → validation is the only disallowed pair.
 */
const INCOMPATIBLE_PAIRS = {
  validation: new Set(['validation']),
};

const MAX_CHAIN_DEPTH = 5;

/**
 * Read an agent's category from its frontmatter.
 */
function getAgentCategory(agentId) {
  if (AGENT_CATEGORY_CACHE[agentId]) return AGENT_CATEGORY_CACHE[agentId];

  const agentFile = path.join(AGENTS_DIR, `${agentId}.md`);
  if (!fs.existsSync(agentFile)) return null;

  const content = fs.readFileSync(agentFile, 'utf8');
  const match = content.match(/^category:\s*(\S+)/m);
  if (match) {
    AGENT_CATEGORY_CACHE[agentId] = match[1];
    return match[1];
  }
  return null;
}

/**
 * Load all matrix-skills YAML files (excluding _index.yaml and _dynamic.yaml).
 */
function loadMatrixSkills() {
  const skills = {};
  if (!fs.existsSync(MATRIX_SKILLS_DIR)) return skills;

  const files = fs.readdirSync(MATRIX_SKILLS_DIR)
    .filter(f => f.endsWith('.yaml') && !f.startsWith('_'));

  for (const file of files) {
    const filePath = path.join(MATRIX_SKILLS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = parse(content);
    const domain = parsed.domain || file.replace('.yaml', '');
    skills[domain] = {
      file: filePath,
      domain,
      composes_with: parsed.composes_with || null,
      parsed,
    };
  }
  return skills;
}

/**
 * Build adjacency list from domain composition declarations.
 * Returns Map<domain, string[]> of domains this domain composes with.
 */
function buildCompositionGraph(skills) {
  const graph = new Map();
  for (const [domain, info] of Object.entries(skills)) {
    if (info.composes_with && Array.isArray(info.composes_with)) {
      graph.set(domain, info.composes_with);
    }
  }
  return graph;
}

/**
 * Detect cycles in the composition graph using DFS.
 * Returns array of cycle descriptions.
 */
function detectCycles(graph) {
  const cycles = [];
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = {};
  const parent = {};

  for (const node of graph.keys()) {
    color[node] = WHITE;
  }

  function dfs(u, pathStack) {
    color[u] = GRAY;
    pathStack.push(u);

    const neighbors = graph.get(u) || [];
    for (const v of neighbors) {
      if (!graph.has(v)) continue; // v has no compositions — leaf node
      if (color[v] === GRAY) {
        const cycleStart = pathStack.indexOf(v);
        const cycle = pathStack.slice(cycleStart).concat(v);
        cycles.push(cycle.join(' → '));
      } else if (color[v] === WHITE) {
        parent[v] = u;
        dfs(v, pathStack);
      }
    }

    pathStack.pop();
    color[u] = BLACK;
  }

  for (const node of graph.keys()) {
    if (color[node] === WHITE) {
      dfs(node, []);
    }
  }

  return cycles;
}

/**
 * Check maximum chain depth using BFS from each node.
 * Returns array of warnings for chains exceeding MAX_CHAIN_DEPTH.
 */
function checkChainDepth(graph) {
  const warnings = [];

  for (const startNode of graph.keys()) {
    const visited = new Set();
    const queue = [{ node: startNode, depth: 0 }];

    while (queue.length > 0) {
      const { node, depth } = queue.shift();
      if (depth > MAX_CHAIN_DEPTH) {
        warnings.push(`R404: composition chain from "${startNode}" exceeds max depth ${MAX_CHAIN_DEPTH}`);
        break;
      }
      const neighbors = graph.get(node) || [];
      for (const n of neighbors) {
        if (!visited.has(n) && graph.has(n)) {
          visited.add(n);
          queue.push({ node: n, depth: depth + 1 });
        }
      }
    }
  }

  return warnings;
}

/**
 * Validate all composition declarations in matrix-skills YAML files.
 * Returns { errors: string[], warnings: string[] }
 */
function validateComposition() {
  const errors = [];
  const warnings = [];
  const skills = loadMatrixSkills();

  // Get list of valid agent names
  let validAgents = [];
  try {
    validAgents = fs.readdirSync(AGENTS_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''));
  } catch {
    warnings.push('R400: could not read agents/ directory');
    return { errors, warnings };
  }

  for (const [domain, info] of Object.entries(skills)) {
    if (!info.composes_with) continue;

    const rel = path.relative(path.join(__dirname, '..', '..'), info.file);

    if (!Array.isArray(info.composes_with)) {
      errors.push(`R400: ${rel} — "composes_with" must be an array`);
      continue;
    }

    const primaryAgents = DOMAIN_PRIMARY_AGENTS[domain] || [];

    for (const target of info.composes_with) {
      // R400: Referenced agent must exist
      if (!validAgents.includes(target)) {
        errors.push(`R400: ${rel} — composes_with target "${target}" does not match any agent in agents/`);
        continue;
      }

      // R401: No self-composition
      if (primaryAgents.includes(target)) {
        errors.push(`R401: ${rel} — self-composition: "${target}" is a primary agent of domain "${domain}"`);
      }

      // R402: Category compatibility
      const targetCategory = getAgentCategory(target);
      if (targetCategory) {
        // Determine source category from domain's primary agents
        for (const srcAgent of primaryAgents) {
          const srcCategory = getAgentCategory(srcAgent);
          if (srcCategory && INCOMPATIBLE_PAIRS[srcCategory] && INCOMPATIBLE_PAIRS[srcCategory].has(targetCategory)) {
            errors.push(`R402: ${rel} — category incompatible: ${srcAgent} (${srcCategory}) → ${target} (${targetCategory})`);
          }
        }
      }
    }
  }

  // R403: Cycle detection on the composition graph
  const graph = buildCompositionGraph(skills);
  const cycles = detectCycles(graph);
  for (const cycle of cycles) {
    errors.push(`R403: composition cycle detected: ${cycle}`);
  }

  // R404: Chain depth check
  const depthWarnings = checkChainDepth(graph);
  warnings.push(...depthWarnings);

  return { errors, warnings };
}

module.exports = { validateComposition };
