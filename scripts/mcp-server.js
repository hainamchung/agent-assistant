#!/usr/bin/env node
/**
 * Agent Assistant MCP Server
 *
 * JSON-RPC 2.0 server exposing agent, skill, command, and benchmark data
 * via the Model Context Protocol (MCP).
 *
 * Security model:
 * - Method allowlist: only explicitly listed methods are accepted
 * - Input validation: slug patterns, request format, message size limits
 * - Rate limiting: per-method (100/min) and global (500/min)
 * - Output redaction: sensitive field names and token patterns are stripped
 * - Path traversal prevention: all file access validated against base directories
 * - Audit logging: all requests logged to stderr
 *
 * Authentication:
 * - This server is designed for local stdio transport (launched by the IDE)
 * - No network auth is required for local stdio mode
 * - If exposing over HTTP/SSE, add authentication middleware before deployment
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const { parseFrontmatter } = require('./lib/parse-frontmatter');

// ─── Constants ───────────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, '..');
const AGENTS_DIR = path.join(PROJECT_ROOT, 'agents');
const SKILLS_DIR = path.join(PROJECT_ROOT, 'matrix-skills');
const COMMANDS_DIR = path.join(PROJECT_ROOT, 'commands');
const BENCHMARKS_DIR = path.join(PROJECT_ROOT, 'benchmarks');

const SERVER_INFO = {
  name: 'agent-assistant-mcp',
  version: '1.0.0'
};

// ─── Security: Method Allowlist ──────────────────────────────────────────────

const ALLOWED_METHODS = new Set([
  'agent/list', 'agent/get',
  'skill/list', 'skill/get',
  'command/list',
  'benchmark/run',
  'initialize', 'initialized',
  'tools/list', 'tools/call'
]);

const SLUG_PATTERN = /^[a-z0-9-]+$/;

// ─── Security: Rate Limiting ─────────────────────────────────────────────────

const RATE_WINDOW_MS = 60000;
const RATE_LIMIT = 100;
const GLOBAL_RATE_LIMIT = 500;
const rateBuckets = new Map();
let globalRequestCount = 0;
let globalWindowStart = Date.now();

function checkRateLimit(method) {
  const now = Date.now();

  // Global rate limit across all methods
  if (now - globalWindowStart > RATE_WINDOW_MS) {
    globalRequestCount = 0;
    globalWindowStart = now;
  }
  globalRequestCount++;
  if (globalRequestCount > GLOBAL_RATE_LIMIT) return false;

  // Per-method rate limit
  if (!rateBuckets.has(method)) {
    rateBuckets.set(method, [now]);
    return true;
  }
  const timestamps = rateBuckets.get(method).filter(t => now - t < RATE_WINDOW_MS);
  timestamps.push(now);
  rateBuckets.set(method, timestamps);
  return timestamps.length <= RATE_LIMIT;
}

// ─── Security: Path Sanitization ─────────────────────────────────────────────

function safePath(baseDir, slug) {
  const resolved = path.resolve(baseDir, slug);
  if (!resolved.startsWith(baseDir + path.sep) && resolved !== baseDir) {
    return null;
  }
  return resolved;
}

// ─── Security: Output Redaction (TRACE-SCHEMA.md dual-layer) ─────────────────

const FIELD_NAME_PATTERN = /key|secret|token|password|credential|api[_-]?key/i;
const VALUE_PATTERN = /(ghp_|sk-|AKIA|xox[bpas]-|glpat-|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})[A-Za-z0-9_\-]{10,}|[A-Za-z0-9+/]{40,}={0,2}/g;

function redactValue(str) {
  if (typeof str !== 'string') return str;
  return str.replace(VALUE_PATTERN, '[REDACTED]');
}

function redactObject(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') return redactValue(obj);
  if (Array.isArray(obj)) return obj.map(redactObject);
  if (typeof obj === 'object') {
    const cleaned = {};
    for (const [k, v] of Object.entries(obj)) {
      if (FIELD_NAME_PATTERN.test(k)) continue; // Layer 1: strip sensitive field names
      cleaned[k] = redactObject(v);             // Layer 2: redact values
    }
    return cleaned;
  }
  return obj;
}

// ─── Security: Audit Logging ─────────────────────────────────────────────────

function auditLog(method, params, resultType) {
  const entry = {
    timestamp: new Date().toISOString(),
    method,
    params_keys: params && typeof params === 'object' ? Object.keys(params) : [],
    result_type: resultType
  };
  process.stderr.write(JSON.stringify(entry) + '\n');
}

// ─── Tool Definitions ────────────────────────────────────────────────────────

const TOOL_DEFINITIONS = [
  {
    name: 'agent/list',
    description: 'List all agents with metadata',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'agent/get',
    description: 'Get a single agent definition by name',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string', description: 'Agent slug (e.g. backend-engineer)' } },
      required: ['name']
    }
  },
  {
    name: 'skill/list',
    description: 'List all matrix skills',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'skill/get',
    description: 'Get a single skill definition by name',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string', description: 'Skill slug (e.g. backend)' } },
      required: ['name']
    }
  },
  {
    name: 'command/list',
    description: 'List available commands',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'benchmark/run',
    description: 'Run benchmarks and return results (read-only)',
    inputSchema: { type: 'object', properties: {} }
  }
];

// ─── Response Caching ────────────────────────────────────────────────────────

const CACHE_TTL_MS = 30000; // 30 seconds
const MAX_CACHE_SIZE = 100;
const responseCache = new Map();

function getCached(key) {
  const entry = responseCache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL_MS) return entry.data;
  responseCache.delete(key);
  return null;
}

function setCache(key, data) {
  // Evict oldest entries if cache exceeds max size
  if (responseCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = responseCache.keys().next().value;
    responseCache.delete(oldestKey);
  }
  responseCache.set(key, { data, timestamp: Date.now() });
}

// Periodic cleanup of expired cache entries and stale rate buckets
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of responseCache) {
    if (now - entry.timestamp >= CACHE_TTL_MS) responseCache.delete(key);
  }
  for (const [method, timestamps] of rateBuckets) {
    const fresh = timestamps.filter(t => now - t < RATE_WINDOW_MS);
    if (fresh.length === 0) rateBuckets.delete(method);
    else rateBuckets.set(method, fresh);
  }
}, 60000).unref();

// ─── Tool Handlers ───────────────────────────────────────────────────────────

function listAgents() {
  const cached = getCached('agent/list');
  if (cached) return cached;
  const files = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md') && f !== 'README.md');
  const result = files.map(f => {
    const content = fs.readFileSync(path.join(AGENTS_DIR, f), 'utf8');
    const meta = parseFrontmatter(content);
    return {
      slug: f.replace('.md', ''),
      name: meta ? meta.name : f.replace('.md', ''),
      description: meta ? meta.description : '',
      category: meta ? meta.category : ''
    };
  });
  setCache('agent/list', result);
  return result;
}

function getAgent(name) {
  if (!name || !SLUG_PATTERN.test(name)) {
    return { error: { code: -32602, message: 'Invalid params' } };
  }
  const filePath = safePath(AGENTS_DIR, name + '.md');
  if (!filePath || !fs.existsSync(filePath)) {
    return { error: { code: -32602, message: 'Not found' } };
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const meta = parseFrontmatter(content);
  return { slug: name, frontmatter: meta || {}, content };
}

function listSkills() {
  const cached = getCached('skill/list');
  if (cached) return cached;
  const files = fs.readdirSync(SKILLS_DIR).filter(f => f.endsWith('.yaml'));
  const result = files.map(f => {
    const content = fs.readFileSync(path.join(SKILLS_DIR, f), 'utf8');
    return { slug: f.replace('.yaml', ''), preview: content.slice(0, 200) };
  });
  setCache('skill/list', result);
  return result;
}

function getSkill(name) {
  if (!name || !SLUG_PATTERN.test(name)) {
    return { error: { code: -32602, message: 'Invalid params' } };
  }
  const filePath = safePath(SKILLS_DIR, name + '.yaml');
  if (!filePath || !fs.existsSync(filePath)) {
    return { error: { code: -32602, message: 'Not found' } };
  }
  const content = fs.readFileSync(filePath, 'utf8');
  return { slug: name, content };
}

function listCommands() {
  const cached = getCached('command/list');
  if (cached) return cached;
  const files = fs.readdirSync(COMMANDS_DIR).filter(f => f.endsWith('.md') && f !== 'README.md');
  const result = files.map(f => {
    const content = fs.readFileSync(path.join(COMMANDS_DIR, f), 'utf8');
    const meta = parseFrontmatter(content);
    return {
      slug: f.replace('.md', ''),
      description: meta ? meta.description : ''
    };
  });
  setCache('command/list', result);
  return result;
}

function runBenchmarks() {
  if (!fs.existsSync(BENCHMARKS_DIR)) return { benchmarks: [], message: 'No benchmarks directory' };
  const files = fs.readdirSync(BENCHMARKS_DIR).filter(f => f.startsWith('bench-') && f.endsWith('.json'));
  return {
    count: files.length,
    benchmarks: files.map(f => {
      const raw = fs.readFileSync(path.join(BENCHMARKS_DIR, f), 'utf8');
      try { return { file: f, data: JSON.parse(raw) }; }
      catch { return { file: f, error: 'Parse error' }; }
    })
  };
}

const toolHandlers = {
  'agent/list': () => listAgents(),
  'agent/get': (params) => getAgent(params.name),
  'skill/list': () => listSkills(),
  'skill/get': (params) => getSkill(params.name),
  'command/list': () => listCommands(),
  'benchmark/run': () => runBenchmarks()
};

// ─── MCP Protocol Handlers ───────────────────────────────────────────────────

function handleInitialize() {
  return {
    protocolVersion: '2024-11-05',
    capabilities: { tools: {} },
    serverInfo: SERVER_INFO
  };
}

function handleToolsList() {
  return { tools: TOOL_DEFINITIONS };
}

function handleToolsCall(params) {
  const toolName = params && params.name;
  const toolArgs = (params && params.arguments) || {};

  if (!toolName || !toolHandlers[toolName]) {
    return { error: { code: -32601, message: 'Method not found' } };
  }

  const result = toolHandlers[toolName](toolArgs);

  if (result && result.error) {
    return { error: result.error };
  }

  return {
    content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
  };
}

// ─── Request Handling ────────────────────────────────────────────────────────

function validateRequest(request) {
  if (!request || typeof request !== 'object') {
    return { code: -32600, message: 'Invalid request' };
  }
  if (request.jsonrpc !== '2.0') {
    return { code: -32600, message: 'Invalid request' };
  }
  if (typeof request.method !== 'string') {
    return { code: -32600, message: 'Invalid request' };
  }
  if (request.params !== undefined && typeof request.params !== 'object') {
    return { code: -32600, message: 'Invalid params' };
  }
  return null;
}

function isMethodAllowed(method) {
  if (ALLOWED_METHODS.has(method)) return true;
  // Also allow methods matching the strict pattern that are in the allowlist
  return false;
}

async function handleRequest(request) {
  // Layer 1: Input validation
  const validationError = validateRequest(request);
  if (validationError) {
    auditLog(request.method || 'unknown', null, 'error');
    return makeError(request.id, validationError.code, validationError.message);
  }

  const { method, params, id } = request;

  // Layer 2: Method allowlist
  if (!isMethodAllowed(method)) {
    auditLog(method, params, 'rejected');
    return makeError(id, -32601, 'Method not found');
  }

  // Layer 4: Rate limiting (before handler execution)
  if (!checkRateLimit(method)) {
    auditLog(method, params, 'rate-limited');
    return makeError(id, -32603, 'Rate limit exceeded');
  }

  let result;
  try {
    if (method === 'initialize') {
      result = handleInitialize();
    } else if (method === 'initialized') {
      // Notification — no response needed
      auditLog(method, params, 'notification');
      return null;
    } else if (method === 'tools/list') {
      result = handleToolsList();
    } else if (method === 'tools/call') {
      result = handleToolsCall(params);
      if (result && result.error) {
        auditLog(method, params, 'error');
        return makeError(id, result.error.code, result.error.message);
      }
    } else if (toolHandlers[method]) {
      // Direct tool invocation
      const handlerResult = toolHandlers[method](params || {});
      if (handlerResult && handlerResult.error) {
        auditLog(method, params, 'error');
        return makeError(id, handlerResult.error.code, handlerResult.error.message);
      }
      result = handlerResult;
    } else {
      auditLog(method, params, 'not-found');
      return makeError(id, -32601, 'Method not found');
    }
  } catch (err) {
    auditLog(method, params, 'internal-error');
    return makeError(id, -32603, 'Internal error');
  }

  // Layer 5: Output redaction
  const safeResult = redactObject(result);

  // Layer 6: Audit log
  auditLog(method, params, 'success');

  return makeResponse(id, safeResult);
}

// ─── JSON-RPC Response Helpers ───────────────────────────────────────────────

function makeResponse(id, result) {
  return { jsonrpc: '2.0', result, id: id != null ? id : null };
}

function makeError(id, code, message) {
  return { jsonrpc: '2.0', error: { code, message }, id: id != null ? id : null };
}

// ─── Security: Message Size Limit ────────────────────────────────────────────

const MAX_MESSAGE_SIZE = 1048576; // 1 MB

// ─── I/O: stdio line-delimited JSON-RPC ──────────────────────────────────────

const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on('line', (line) => {
  if (!line.trim()) return;

  if (line.length > MAX_MESSAGE_SIZE) {
    const errorResp = makeError(null, -32600, 'Invalid request');
    process.stdout.write(JSON.stringify(errorResp) + '\n');
    return;
  }

  let request;
  try {
    request = JSON.parse(line);
  } catch (e) {
    const errorResp = makeError(null, -32700, 'Parse error');
    process.stdout.write(JSON.stringify(errorResp) + '\n');
    return;
  }

  handleRequest(request).then(response => {
    if (response) {
      process.stdout.write(JSON.stringify(response) + '\n');
    }
  }).catch(() => {
    const errorResp = makeError(request.id || null, -32603, 'Internal error');
    process.stdout.write(JSON.stringify(errorResp) + '\n');
  });
});

rl.on('close', () => {
  process.exit(0);
});
