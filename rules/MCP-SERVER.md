---
id: mcp-server
title: MCP Server Specification
description: Defines the MCP stdio server architecture, security model, and exposed tools
version: "1.0"
updated: "2026-04-08"
scope: integration
type: rule
section: integration
---

# MCP-SERVER — Server Specification

> On-demand rule defining the MCP Server for agent-assistant.

---

## Transport

- **Protocol**: JSON-RPC 2.0 over **stdio** (stdin/stdout)
- **No HTTP, no WebSocket** — reduces attack surface to a single process boundary
- **Single process** — no child spawning, no `exec`, no `spawn`
- Line-delimited JSON: one JSON object per line on stdout

---

## 6-Layer Security Model (ADR-8)

All layers are mandatory and enforced in order:

| # | Layer | Description |
|---|-------|-------------|
| 1 | **Input validation** | JSON Schema validation on all incoming messages — must have `jsonrpc: "2.0"`, `method: string`, optional `params`, optional `id` |
| 2 | **Method allowlist** | Only whitelisted methods accepted — reject unknown methods with `-32601` |
| 3 | **Path sanitization** | `safePath` on all file path parameters — no traversal outside PROJECT_ROOT |
| 4 | **Rate limiting** | Max 100 requests/minute per method — sliding window, in-memory |
| 5 | **Output sanitization** | Dual-layer redaction (per TRACE-SCHEMA.md) on all responses — no secrets |
| 6 | **Audit logging** | All requests logged to stderr as JSON — never log parameter values |

---

## Exposed MCP Tools

All tools are **read-only** operations:

| Tool | Description | Parameters |
|------|-------------|------------|
| `agent/list` | List all agents with metadata | _(none)_ |
| `agent/get` | Get single agent definition | `name: string` (slug) |
| `skill/list` | List all matrix skills | _(none)_ |
| `skill/get` | Get single skill definition | `name: string` (slug) |
| `command/list` | List available commands | _(none)_ |
| `benchmark/run` | Run benchmarks (read-only, returns results) | _(none)_ |

---

## Injection Defense

- JSON-RPC method names validated against strict regex: `/^[a-z]+\/[a-z]+$/`
- MCP protocol methods (`initialize`, `initialized`, `tools/list`, `tools/call`) also allowed
- Parameters sanitized before use — slugs must match `/^[a-z0-9-]+$/`
- **Forbidden**: `eval()`, `new Function()`, `child_process`, any dynamic code execution
- File reads restricted to PROJECT_ROOT via safePath

---

## Error Responses

Standard JSON-RPC error codes:

| Code | Meaning |
|------|---------|
| `-32700` | Parse error — invalid JSON |
| `-32600` | Invalid request — missing required fields |
| `-32601` | Method not found — not in allowlist |
| `-32602` | Invalid params — validation failed |
| `-32603` | Internal error — handler failure |

Error messages must **never** expose file system paths — use generic "Not found" or "Internal error".

---

## Implementation

- Entry point: `scripts/mcp-server.js`
- npm script: `npm run mcp:start`
- CommonJS only (`require()`, `'use strict'`)
- No external dependencies
