'use strict';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');

const { validateFile } = require('./validate-output');

describe('validateFile', () => {
  let tmpDir;

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'validate-output-'));
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function writeTmp(name, content) {
    const filePath = path.join(tmpDir, name);
    fs.writeFileSync(filePath, content);
    return filePath;
  }

  function findResult(results, id) {
    return results.find(r => r.id === id);
  }

  // --- V001: deliverable has sections ---

  it('V001: errors when file has fewer than 2 sections', () => {
    const fp = writeTmp('v001-fail.md', '---\ntitle: test\n---\n# Only One Section\nSome content R001\n');
    const { results } = validateFile(fp);
    const v001 = findResult(results, 'V001');
    assert.ok(v001, 'expected V001 result');
    assert.strictEqual(v001.severity, 'error');
  });

  it('V001: passes when file has 2+ sections', () => {
    const fp = writeTmp('v001-pass.md', '---\ntitle: test\n---\n# Section One\nContent R001\n## Section Two\nMore content\n');
    const { results } = validateFile(fp);
    const v001 = findResult(results, 'V001');
    assert.strictEqual(v001, undefined, 'expected no V001 result');
  });

  it('V001: errors on file with zero headings', () => {
    const fp = writeTmp('v001-zero.md', '---\ntitle: test\n---\nJust a paragraph with R001.\n');
    const { results } = validateFile(fp);
    const v001 = findResult(results, 'V001');
    assert.ok(v001);
    assert.strictEqual(v001.severity, 'error');
  });

  // --- V002: exit criteria checkboxes ---

  it('V002: warns on unchecked checkboxes', () => {
    const fp = writeTmp('v002-warn.md', '---\ntitle: test\n---\n# Section A\n- [x] done R001\n## Section B\n- [ ] not done\n');
    const { results } = validateFile(fp);
    const v002 = findResult(results, 'V002');
    assert.ok(v002, 'expected V002 result');
    assert.strictEqual(v002.severity, 'warning');
    assert.match(v002.message, /1 unchecked/);
  });

  it('V002: passes when all checkboxes are checked', () => {
    const fp = writeTmp('v002-pass.md', '---\ntitle: test\n---\n# Section A\n- [x] done R001\n## Section B\n- [x] also done\n');
    const { results } = validateFile(fp);
    const v002 = findResult(results, 'V002');
    assert.strictEqual(v002, undefined);
  });

  // --- V003: requirement traceability ---

  it('V003: warns when no requirement references exist', () => {
    const fp = writeTmp('v003-warn.md', '---\ntitle: test\n---\n# Section A\nNo refs here.\n## Section B\nStill none.\n');
    const { results } = validateFile(fp);
    const v003 = findResult(results, 'V003');
    assert.ok(v003, 'expected V003 result');
    assert.strictEqual(v003.severity, 'warning');
  });

  it('V003: passes when R-references are present', () => {
    const fp = writeTmp('v003-pass-r.md', '---\ntitle: test\n---\n# Section A\nSee R001 for details.\n## Section B\nMore.\n');
    const { results } = validateFile(fp);
    const v003 = findResult(results, 'V003');
    assert.strictEqual(v003, undefined);
  });

  it('V003: passes when US-references are present', () => {
    const fp = writeTmp('v003-pass-us.md', '---\ntitle: test\n---\n# Section A\nSee US-42 for details.\n## Section B\nMore.\n');
    const { results } = validateFile(fp);
    const v003 = findResult(results, 'V003');
    assert.strictEqual(v003, undefined);
  });

  // --- V004: broken file references ---

  it('V004: warns on broken local file links', () => {
    const fp = writeTmp('v004-warn.md', '---\ntitle: test\n---\n# Section A\nSee [link](./nonexistent-file.md) R001\n## Section B\nMore.\n');
    const { results } = validateFile(fp);
    const v004 = findResult(results, 'V004');
    assert.ok(v004, 'expected V004 result');
    assert.strictEqual(v004.severity, 'warning');
    assert.match(v004.message, /nonexistent-file\.md/);
  });

  it('V004: passes when all local links resolve', () => {
    writeTmp('target.md', '# Target');
    const fp = writeTmp('v004-pass.md', '---\ntitle: test\n---\n# Section A\nSee [link](./target.md) R001\n## Section B\nMore.\n');
    const { results } = validateFile(fp);
    const v004 = findResult(results, 'V004');
    assert.strictEqual(v004, undefined);
  });

  it('V004: ignores external URLs', () => {
    const fp = writeTmp('v004-url.md', '---\ntitle: test\n---\n# Section A\n[ext](https://example.com) R001\n## Section B\nMore.\n');
    const { results } = validateFile(fp);
    const v004 = findResult(results, 'V004');
    assert.strictEqual(v004, undefined);
  });

  // --- V005: frontmatter present ---

  it('V005: errors when frontmatter is missing', () => {
    const fp = writeTmp('v005-fail.md', '# Section A\nNo frontmatter R001.\n## Section B\nMore.\n');
    const { results } = validateFile(fp);
    const v005 = findResult(results, 'V005');
    assert.ok(v005, 'expected V005 result');
    assert.strictEqual(v005.severity, 'error');
  });

  it('V005: passes when frontmatter is present', () => {
    const fp = writeTmp('v005-pass.md', '---\ntitle: hello\n---\n# Section A\nContent R001.\n## Section B\nMore.\n');
    const { results } = validateFile(fp);
    const v005 = findResult(results, 'V005');
    assert.strictEqual(v005, undefined);
  });

  // --- V006: empty sections ---

  it('V006: warns on empty sections (same-level heading immediately follows)', () => {
    const fp = writeTmp('v006-warn.md', '---\ntitle: test\n---\n# Section A\n\n# Section B\nContent R001.\n## Sub\nMore.\n');
    const { results } = validateFile(fp);
    const v006 = findResult(results, 'V006');
    assert.ok(v006, 'expected V006 result');
    assert.strictEqual(v006.severity, 'warning');
    assert.match(v006.message, /Section A/i);
  });

  it('V006: passes when all sections have content', () => {
    const fp = writeTmp('v006-pass.md', '---\ntitle: test\n---\n# Section A\nContent R001.\n## Section B\nMore content.\n');
    const { results } = validateFile(fp);
    const v006 = findResult(results, 'V006');
    assert.strictEqual(v006, undefined);
  });

  // --- File not found ---

  it('returns SCRIPT error for non-existent file', () => {
    const { results } = validateFile(path.join(tmpDir, 'does-not-exist.md'));
    assert.ok(results.some(r => r.id === 'SCRIPT' && r.severity === 'error'));
    assert.ok(results.some(r => r.message.includes('File not found')));
  });

  // --- Combined ---

  it('returns multiple results for file with several issues', () => {
    const fp = writeTmp('multi.md', '# Only Heading\n- [ ] todo\nNo refs no frontmatter.\n');
    const { results } = validateFile(fp);
    const ids = results.map(r => r.id);
    assert.ok(ids.includes('V001'), 'expected V001');
    assert.ok(ids.includes('V005'), 'expected V005');
  });

  it('returns file path in result', () => {
    const fp = writeTmp('path-check.md', '---\ntitle: t\n---\n# A\nR001 content.\n## B\nMore.\n');
    const result = validateFile(fp);
    assert.strictEqual(result.file, path.resolve(fp));
  });
});
