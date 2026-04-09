#!/usr/bin/env node
'use strict';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const { spawn } = require('node:child_process');
const path = require('node:path');

const SERVER_PATH = path.join(__dirname, 'mcp-server.js');

function createServer() {
  const proc = spawn(process.execPath, [SERVER_PATH], {
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: path.join(__dirname, '..'),
  });
  return proc;
}

function sendRequest(proc, request) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Timeout')), 5000);
    const handler = (data) => {
      clearTimeout(timeout);
      proc.stdout.removeListener('data', handler);
      try {
        resolve(JSON.parse(data.toString().trim()));
      } catch (e) {
        reject(new Error(`Invalid JSON: ${data.toString()}`));
      }
    };
    proc.stdout.on('data', handler);
    proc.stdin.write(JSON.stringify(request) + '\n');
  });
}

describe('MCP Server', () => {
  let server;

  before(() => {
    server = createServer();
  });

  after(() => {
    server.kill();
  });

  it('should handle initialize request', async () => {
    const response = await sendRequest(server, {
      jsonrpc: '2.0',
      method: 'initialize',
      id: 1,
    });
    assert.strictEqual(response.jsonrpc, '2.0');
    assert.strictEqual(response.id, 1);
    assert.ok(response.result.protocolVersion);
    assert.ok(response.result.serverInfo);
  });

  it('should list tools', async () => {
    const response = await sendRequest(server, {
      jsonrpc: '2.0',
      method: 'tools/list',
      id: 2,
    });
    assert.strictEqual(response.id, 2);
    assert.ok(Array.isArray(response.result.tools));
    assert.ok(response.result.tools.length > 0);
  });

  it('should list agents via tools/call', async () => {
    const response = await sendRequest(server, {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: { name: 'agent/list', arguments: {} },
      id: 3,
    });
    assert.strictEqual(response.id, 3);
    assert.ok(response.result.content);
    const agents = JSON.parse(response.result.content[0].text);
    assert.ok(Array.isArray(agents));
    assert.ok(agents.length > 0);
    assert.ok(agents[0].slug);
  });

  it('should get a single agent', async () => {
    const response = await sendRequest(server, {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: { name: 'agent/get', arguments: { name: 'backend-engineer' } },
      id: 4,
    });
    assert.strictEqual(response.id, 4);
    const result = JSON.parse(response.result.content[0].text);
    assert.strictEqual(result.slug, 'backend-engineer');
    assert.ok(result.content);
  });

  it('should reject invalid agent slug', async () => {
    const response = await sendRequest(server, {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: { name: 'agent/get', arguments: { name: '../../../etc/passwd' } },
      id: 5,
    });
    assert.strictEqual(response.id, 5);
    assert.ok(response.error);
    assert.strictEqual(response.error.code, -32602);
  });

  it('should reject unknown methods', async () => {
    const response = await sendRequest(server, {
      jsonrpc: '2.0',
      method: 'unknown/method',
      id: 6,
    });
    assert.strictEqual(response.id, 6);
    assert.ok(response.error);
    assert.strictEqual(response.error.code, -32601);
  });

  it('should reject invalid JSON-RPC version', async () => {
    const response = await sendRequest(server, {
      jsonrpc: '1.0',
      method: 'initialize',
      id: 7,
    });
    assert.strictEqual(response.id, 7);
    assert.ok(response.error);
    assert.strictEqual(response.error.code, -32600);
  });

  it('should reject oversized messages', async () => {
    const bigPayload = 'x'.repeat(1048577);
    const response = await sendRequest(server, bigPayload);
    assert.ok(response.error);
  });

  it('should list commands', async () => {
    const response = await sendRequest(server, {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: { name: 'command/list', arguments: {} },
      id: 9,
    });
    assert.strictEqual(response.id, 9);
    const commands = JSON.parse(response.result.content[0].text);
    assert.ok(Array.isArray(commands));
    assert.ok(commands.length > 0);
  });
});
