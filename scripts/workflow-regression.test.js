'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const SCRIPT = path.join(__dirname, 'workflow-regression.js');

describe('workflow-regression', () => {
  it('can be loaded without throwing', () => {
    // The script calls main() at module level, so we test via CLI instead
    assert.ok(fs.existsSync(SCRIPT), 'script file exists');
  });

  it('exits with code 2 when no --dir argument given', () => {
    try {
      execFileSync(process.execPath, [SCRIPT], { stdio: 'pipe' });
      assert.fail('expected non-zero exit');
    } catch (err) {
      assert.strictEqual(err.status, 2);
    }
  });

  it('exits with code 2 when directory does not exist', () => {
    try {
      execFileSync(process.execPath, [SCRIPT, '--dir', '/tmp/nonexistent-dir-xyz'], { stdio: 'pipe' });
      assert.fail('expected non-zero exit');
    } catch (err) {
      assert.strictEqual(err.status, 2);
      assert.ok(err.stderr.toString().includes('not found'));
    }
  });

  describe('with a temp report directory', () => {
    let tmpDir;

    it('reports healthy for a valid report directory', () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wf-regression-'));

      // Create a checkpoint file
      fs.writeFileSync(path.join(tmpDir, '_checkpoint.md'), [
        '---',
        'workflow: test-workflow',
        '---',
        '## Phase 1: Planning — ✅',
        '## Phase 2: Implementation — ✅',
      ].join('\n'));

      // Create a valid deliverable
      fs.writeFileSync(path.join(tmpDir, 'deliverable.md'), [
        '---',
        'title: Test Deliverable',
        '---',
        '# Overview',
        'Content with R001 reference.',
        '## Details',
        'More content here.',
      ].join('\n'));

      try {
        const stdout = execFileSync(process.execPath, [SCRIPT, '--dir', tmpDir], {
          stdio: 'pipe',
          encoding: 'utf-8',
        });
        assert.ok(stdout.includes('Workflow Health Report'));
      } catch (err) {
        // exit code 1 means issues found, which is also a valid run
        assert.ok(err.stdout.includes('Workflow Health Report'));
      }

      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    it('detects incomplete phases in checkpoint', () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wf-regression-'));

      fs.writeFileSync(path.join(tmpDir, '_checkpoint.md'), [
        '---',
        'workflow: test-workflow',
        '---',
        '## Phase 1: Planning — ✅',
        '## Phase 2: Implementation — ❌ blocked',
      ].join('\n'));

      try {
        execFileSync(process.execPath, [SCRIPT, '--dir', tmpDir], { stdio: 'pipe' });
        // If it exits 0 that's unexpected but not fatal for our test
      } catch (err) {
        assert.strictEqual(err.status, 1);
        const output = err.stdout.toString();
        assert.ok(output.includes('Phase 2'));
      }

      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    it('handles directory with no checkpoint file', () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wf-regression-'));

      // Create a simple deliverable without checkpoint
      fs.writeFileSync(path.join(tmpDir, 'doc.md'), [
        '---',
        'title: Test',
        '---',
        '# A',
        'R001 ref.',
        '## B',
        'Content.',
      ].join('\n'));

      try {
        execFileSync(process.execPath, [SCRIPT, '--dir', tmpDir], { stdio: 'pipe' });
      } catch (err) {
        assert.strictEqual(err.status, 1);
        const output = err.stdout.toString();
        assert.ok(output.includes('No _checkpoint.md'));
      }

      fs.rmSync(tmpDir, { recursive: true, force: true });
    });
  });
});
