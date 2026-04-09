'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { parseFrontmatter } = require('./parse-frontmatter');

describe('parseFrontmatter', () => {
  it('returns null for content with no frontmatter', () => {
    assert.strictEqual(parseFrontmatter('Hello world'), null);
    assert.strictEqual(parseFrontmatter(''), null);
    assert.strictEqual(parseFrontmatter('# Just a heading'), null);
  });

  it('parses basic key-value pairs', () => {
    const input = '---\nname: test-agent\nversion: "1.0"\n---\nBody content';
    const result = parseFrontmatter(input);
    assert.deepStrictEqual(result, { name: 'test-agent', version: '1.0' });
  });

  it('handles boolean coercion correctly', () => {
    const input = '---\nenabled: true\ndisabled: false\n---\n';
    const result = parseFrontmatter(input);
    assert.strictEqual(result.enabled, true);
    assert.strictEqual(result.disabled, false);
  });

  it('handles integer coercion correctly', () => {
    const input = '---\ncount: 42\nzero: 0\n---\n';
    const result = parseFrontmatter(input);
    assert.strictEqual(result.count, 42);
    assert.strictEqual(result.zero, 0);
  });

  it('parses inline arrays', () => {
    const input = '---\ntags: [alpha, beta, gamma]\n---\n';
    const result = parseFrontmatter(input);
    assert.deepStrictEqual(result.tags, ['alpha', 'beta', 'gamma']);
  });

  it('parses inline arrays with quoted values', () => {
    const input = '---\ntags: ["hello world", \'foo bar\']\n---\n';
    const result = parseFrontmatter(input);
    assert.deepStrictEqual(result.tags, ['hello world', 'foo bar']);
  });

  it('parses array items with dash notation', () => {
    const input = '---\nskills:\n  - javascript\n  - python\n  - rust\n---\n';
    const result = parseFrontmatter(input);
    assert.deepStrictEqual(result.skills, ['javascript', 'python', 'rust']);
  });

  it('parses nested objects', () => {
    const input = '---\nconfig:\n  timeout: 30\n  retries: 3\n  verbose: true\n---\n';
    const result = parseFrontmatter(input);
    assert.deepStrictEqual(result.config, { timeout: 30, retries: 3, verbose: true });
  });

  it('parses nested objects with inline arrays', () => {
    const input = '---\nconfig:\n  modes: [fast, slow]\n---\n';
    const result = parseFrontmatter(input);
    assert.deepStrictEqual(result.config, { modes: ['fast', 'slow'] });
  });

  it('handles empty value as empty string', () => {
    const input = '---\ndescription:\n---\n';
    const result = parseFrontmatter(input);
    assert.strictEqual(result.description, '');
  });

  it('handles {} value as empty object', () => {
    const input = '---\nmetadata: {}\n---\n';
    const result = parseFrontmatter(input);
    assert.deepStrictEqual(result.metadata, {});
  });

  it('ignores YAML comments', () => {
    const input = '---\n# This is a comment\nname: test\n---\n';
    const result = parseFrontmatter(input);
    assert.deepStrictEqual(result, { name: 'test' });
  });

  it('strips surrounding quotes from values', () => {
    const input = '---\nname: "quoted-value"\nother: \'single-quoted\'\n---\n';
    const result = parseFrontmatter(input);
    assert.strictEqual(result.name, 'quoted-value');
    assert.strictEqual(result.other, 'single-quoted');
  });

  it('does not match --- in middle of content (^ anchor)', () => {
    const input = '---\ntitle: test\n---\n\nSome content\n\n---\n\nfake: frontmatter\n---\n';
    const result = parseFrontmatter(input);
    assert.deepStrictEqual(result, { title: 'test' });
  });

  it('handles real agent frontmatter', () => {
    const input = `---
schema-version: "1.0"
name: backend-engineer
description: "Backend implementation specialist"
version: "2.0"
category: execution
role-scope: implementation
execution-mode: embody
tags: [backend, api, database]
---

# Backend Engineer`;
    const result = parseFrontmatter(input);
    assert.strictEqual(result['schema-version'], '1.0');
    assert.strictEqual(result.name, 'backend-engineer');
    assert.strictEqual(result.category, 'execution');
    assert.deepStrictEqual(result.tags, ['backend', 'api', 'database']);
  });

  it('handles multiple top-level keys correctly', () => {
    const input = '---\na: 1\nb: 2\nc: 3\n---\n';
    const result = parseFrontmatter(input);
    assert.deepStrictEqual(result, { a: 1, b: 2, c: 3 });
  });

  it('handles string values that look like numbers but are quoted', () => {
    // Note: parser strips quotes before type coercion, so "8080" becomes 8080
    // Only non-integer numeric strings like "1.0" remain strings
    const input = '---\nversion: "1.0"\nport: "8080"\n---\n';
    const result = parseFrontmatter(input);
    assert.strictEqual(result.version, '1.0');
    assert.strictEqual(result.port, 8080);
  });

  it('handles null-like values', () => {
    const input = '---\nvalue: null\n---\n';
    const result = parseFrontmatter(input);
    assert.strictEqual(result.value, 'null');
  });
});
