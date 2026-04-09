'use strict';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const {
  checkRoleScope,
  checkManifest,
  checkQuarantine,
  VALID_ROLE_SCOPES,
  RULE_ID_SCOPE,
  RULE_ID_MANIFEST,
  RULE_ID_QUARANTINE,
} = require('./security-checks');

describe('security-checks exports', () => {
  it('exports all expected functions', () => {
    assert.strictEqual(typeof checkRoleScope, 'function');
    assert.strictEqual(typeof checkManifest, 'function');
    assert.strictEqual(typeof checkQuarantine, 'function');
  });

  it('exports expected constants', () => {
    assert.ok(Array.isArray(VALID_ROLE_SCOPES));
    assert.ok(VALID_ROLE_SCOPES.length > 0);
    assert.strictEqual(typeof RULE_ID_SCOPE, 'string');
    assert.strictEqual(typeof RULE_ID_MANIFEST, 'string');
    assert.strictEqual(typeof RULE_ID_QUARANTINE, 'string');
  });
});

describe('checkRoleScope', () => {
  it('returns no warnings for valid role-scope', () => {
    for (const scope of VALID_ROLE_SCOPES) {
      const result = checkRoleScope('agent.md', { 'role-scope': scope });
      assert.strictEqual(result.warnings.length, 0, `expected no warnings for scope "${scope}"`);
      assert.strictEqual(result.errors.length, 0);
    }
  });

  it('warns when role-scope is missing', () => {
    const result = checkRoleScope('agent.md', {});
    assert.strictEqual(result.warnings.length, 1);
    assert.match(result.warnings[0], /missing.*role-scope/i);
  });

  it('warns when role-scope is invalid', () => {
    const result = checkRoleScope('agent.md', { 'role-scope': 'banana' });
    assert.strictEqual(result.warnings.length, 1);
    assert.match(result.warnings[0], /must be one of/);
  });
});

describe('checkManifest', () => {
  let tmpDir;

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sec-checks-'));
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('errors when trust-manifest.json is missing', () => {
    const result = checkManifest(tmpDir);
    assert.ok(result.errors.some(e => e.includes('not found')));
  });

  it('errors when trust-manifest.json is invalid JSON', () => {
    const skillsDir = path.join(tmpDir, 'skills');
    fs.mkdirSync(skillsDir, { recursive: true });
    fs.writeFileSync(path.join(skillsDir, 'trust-manifest.json'), '{ bad json');
    const result = checkManifest(tmpDir);
    assert.ok(result.errors.some(e => e.includes('not valid JSON')));
    fs.unlinkSync(path.join(skillsDir, 'trust-manifest.json'));
  });

  it('errors when "skills" key is missing from manifest', () => {
    const skillsDir = path.join(tmpDir, 'skills');
    fs.mkdirSync(skillsDir, { recursive: true });
    fs.writeFileSync(path.join(skillsDir, 'trust-manifest.json'), JSON.stringify({ metadata: {} }));
    const result = checkManifest(tmpDir);
    assert.ok(result.errors.some(e => e.includes('missing "skills"')));
    fs.unlinkSync(path.join(skillsDir, 'trust-manifest.json'));
  });

  it('errors on null/missing sha256', () => {
    const skillsDir = path.join(tmpDir, 'skills');
    fs.mkdirSync(skillsDir, { recursive: true });
    const manifest = {
      skills: {
        'test-file.yaml': { trust: 'core', sha256: null },
      },
    };
    fs.writeFileSync(path.join(skillsDir, 'trust-manifest.json'), JSON.stringify(manifest));
    const result = checkManifest(tmpDir);
    assert.ok(result.errors.some(e => e.includes('null/missing sha256')));
    fs.unlinkSync(path.join(skillsDir, 'trust-manifest.json'));
  });

  it('errors on malformed sha256 (wrong length)', () => {
    const skillsDir = path.join(tmpDir, 'skills');
    fs.mkdirSync(skillsDir, { recursive: true });
    const manifest = {
      skills: {
        'test-file.yaml': { trust: 'core', sha256: 'abc123' },
      },
    };
    fs.writeFileSync(path.join(skillsDir, 'trust-manifest.json'), JSON.stringify(manifest));
    const result = checkManifest(tmpDir);
    assert.ok(result.errors.some(e => e.includes('invalid sha256 format')));
    fs.unlinkSync(path.join(skillsDir, 'trust-manifest.json'));
  });

  it('errors on malformed sha256 (non-hex chars)', () => {
    const skillsDir = path.join(tmpDir, 'skills');
    fs.mkdirSync(skillsDir, { recursive: true });
    const badHash = 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
    const manifest = {
      skills: {
        'test-file.yaml': { trust: 'core', sha256: badHash },
      },
    };
    fs.writeFileSync(path.join(skillsDir, 'trust-manifest.json'), JSON.stringify(manifest));
    const result = checkManifest(tmpDir);
    assert.ok(result.errors.some(e => e.includes('invalid sha256 format')));
    fs.unlinkSync(path.join(skillsDir, 'trust-manifest.json'));
  });

  it('passes with valid manifest and matching sha256', () => {
    const skillsDir = path.join(tmpDir, 'skills');
    fs.mkdirSync(skillsDir, { recursive: true });

    const fileContent = 'name: test-skill\n';
    const filePath = path.join(tmpDir, 'matrix-skills', 'test.yaml');
    fs.mkdirSync(path.join(tmpDir, 'matrix-skills'), { recursive: true });
    fs.writeFileSync(filePath, fileContent);

    const hash = crypto.createHash('sha256').update(Buffer.from(fileContent)).digest('hex');
    const manifest = {
      skills: {
        'matrix-skills/test.yaml': { trust: 'core', sha256: hash },
      },
    };
    fs.writeFileSync(path.join(skillsDir, 'trust-manifest.json'), JSON.stringify(manifest));

    const result = checkManifest(tmpDir);
    const sha256Errors = result.errors.filter(e => e.includes('sha256'));
    assert.strictEqual(sha256Errors.length, 0, `unexpected sha256 errors: ${sha256Errors.join(', ')}`);
  });

  it('errors when sha256 does not match file content', () => {
    const skillsDir = path.join(tmpDir, 'skills');
    fs.mkdirSync(skillsDir, { recursive: true });

    const filePath = path.join(tmpDir, 'matrix-skills', 'mismatch.yaml');
    fs.mkdirSync(path.join(tmpDir, 'matrix-skills'), { recursive: true });
    fs.writeFileSync(filePath, 'original content');

    const fakeHash = 'a'.repeat(64);
    const manifest = {
      skills: {
        'matrix-skills/mismatch.yaml': { trust: 'verified', sha256: fakeHash },
      },
    };
    fs.writeFileSync(path.join(skillsDir, 'trust-manifest.json'), JSON.stringify(manifest));

    const result = checkManifest(tmpDir);
    assert.ok(result.errors.some(e => e.includes('sha256 mismatch')));
  });

  it('warns on invalid trust level', () => {
    const skillsDir = path.join(tmpDir, 'skills');
    fs.mkdirSync(skillsDir, { recursive: true });
    const manifest = {
      skills: {
        'test.yaml': { trust: 'untrusted', sha256: 'a'.repeat(64) },
      },
    };
    fs.writeFileSync(path.join(skillsDir, 'trust-manifest.json'), JSON.stringify(manifest));
    const result = checkManifest(tmpDir);
    assert.ok(result.warnings.some(w => w.includes('invalid trust level')));
  });

  it('warns when matrix-skills file is not listed in manifest', () => {
    const skillsDir = path.join(tmpDir, 'skills');
    fs.mkdirSync(skillsDir, { recursive: true });
    fs.mkdirSync(path.join(tmpDir, 'matrix-skills'), { recursive: true });
    fs.writeFileSync(path.join(tmpDir, 'matrix-skills', 'unlisted.yaml'), 'content');

    const manifest = { skills: {} };
    fs.writeFileSync(path.join(skillsDir, 'trust-manifest.json'), JSON.stringify(manifest));

    const result = checkManifest(tmpDir);
    assert.ok(result.warnings.some(w => w.includes('unlisted.yaml') && w.includes('not listed')));
  });
});

describe('checkQuarantine', () => {
  let tmpDir;

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sec-quarantine-'));
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('warns when quarantine directory does not exist', () => {
    const result = checkQuarantine(tmpDir);
    assert.ok(result.warnings.some(w => w.includes('not found')));
    assert.strictEqual(result.errors.length, 0);
  });

  it('returns no warnings for empty quarantine', () => {
    const quarantineDir = path.join(tmpDir, 'skills', 'quarantine');
    fs.mkdirSync(quarantineDir, { recursive: true });
    fs.writeFileSync(path.join(quarantineDir, 'README.md'), '# Quarantine');

    const result = checkQuarantine(tmpDir);
    assert.strictEqual(result.warnings.length, 0);
    assert.strictEqual(result.errors.length, 0);
  });

  it('warns when quarantine has items awaiting review', () => {
    const quarantineDir = path.join(tmpDir, 'skills', 'quarantine');
    fs.mkdirSync(quarantineDir, { recursive: true });
    fs.writeFileSync(path.join(quarantineDir, 'suspicious-skill.yaml'), 'content');

    const result = checkQuarantine(tmpDir);
    assert.ok(result.warnings.some(w => w.includes('awaiting review')));
  });
});
