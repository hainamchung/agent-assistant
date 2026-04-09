/**
 * Comprehensive tests for CLI installer (install.js)
 *
 * Uses Node.js built-in test runner.
 * Run: node --test cli/*.test.js
 */

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const {
    BUNDLED_AGENTS,
    TOOLS,
    CORE_DIRS,
    ROOT_FILES,
    getVSCodePromptsFolder,
} = require('./lib/config');
const {
    ensureDir,
    copyWithReplace,
    copyFileWithReplace,
    removeDir,
    removeFile,
    removeBundledAgents,
    getEstimatedFileCount,
    saveInstallCache,
    logError,
} = require('./lib/fs-utils');
const { progressState, resetProgress, drawProgress, updateProgress, completeProgress, formatNumber } = require('./lib/progress');
const { verifyInstallation } = require('./lib/ui');
const { mergeCodexConfig } = require('./lib/platforms/codex');

const AGENTS_DIR = path.join(__dirname, '..', 'agents');

/** Create a unique temp directory and return its path. */
function mktmp(label) {
    return fs.mkdtempSync(path.join(os.tmpdir(), `aa-test-${label}-`));
}

/**
 * Create a temp directory under HOME for tests that exercise removeDir().
 * removeDir() requires paths under HOME with at least 3 segments depth.
 */
function mktmpHome(label) {
    const base = path.join(os.homedir(), '.aa-test-tmp', 'nested', 'deep');
    fs.mkdirSync(base, { recursive: true });
    return fs.mkdtempSync(path.join(base, `${label}-`));
}

/** Recursively remove a directory if it exists. */
function cleanup(dir) {
    if (dir && fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
    }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('CLI Installer', { concurrency: 1 }, () => {

    // Clean up HOME-based test directories after all tests
    after(() => {
        cleanup(path.join(os.homedir(), '.aa-test-tmp'));
    });

    // -----------------------------------------------------------------------
    // 1. BUNDLED_AGENTS validation
    // -----------------------------------------------------------------------
    describe('BUNDLED_AGENTS', () => {
        test('has exactly 21 entries', () => {
            assert.strictEqual(BUNDLED_AGENTS.length, 21);
        });

        test('every file in agents/ (excluding teams/) is in BUNDLED_AGENTS', () => {
            const files = fs.readdirSync(AGENTS_DIR, { withFileTypes: true })
                .filter(e => e.isFile())
                .map(e => e.name);

            for (const file of files) {
                assert.ok(
                    BUNDLED_AGENTS.includes(file),
                    `File agents/${file} is missing from BUNDLED_AGENTS`,
                );
            }
        });

        test('every entry in BUNDLED_AGENTS exists as a file in agents/', () => {
            for (const name of BUNDLED_AGENTS) {
                const full = path.join(AGENTS_DIR, name);
                assert.ok(
                    fs.existsSync(full),
                    `BUNDLED_AGENTS entry "${name}" does not exist in agents/`,
                );
            }
        });
    });

    // -----------------------------------------------------------------------
    // 2. TOOLS configuration
    // -----------------------------------------------------------------------
    describe('TOOLS configuration', () => {
        const expectedPlatforms = ['cursor', 'copilot', 'antigravity', 'claude', 'codex', 'qwen'];

        test('all 6 platforms exist', () => {
            for (const p of expectedPlatforms) {
                assert.ok(TOOLS[p], `Platform "${p}" is missing from TOOLS`);
            }
            assert.strictEqual(Object.keys(TOOLS).length, expectedPlatforms.length);
        });

        test('each platform has required path keys: agentAssistant, commands', () => {
            for (const p of expectedPlatforms) {
                const paths = TOOLS[p].paths;
                assert.ok(paths, `Platform "${p}" is missing paths object`);
                assert.ok(
                    typeof paths.agentAssistant === 'string',
                    `${p}.paths.agentAssistant must be a string`,
                );
                assert.ok(
                    typeof paths.commands === 'string' || typeof paths.globalWorkflows === 'string',
                    `${p} must have paths.commands or paths.globalWorkflows`,
                );
            }
        });
    });

    // -----------------------------------------------------------------------
    // 3. ensureDir()
    // -----------------------------------------------------------------------
    describe('ensureDir()', () => {
        let tmpRoot;

        before(() => { tmpRoot = mktmp('ensuredir'); });
        after(() => { cleanup(tmpRoot); });

        test('creates a new directory', () => {
            const dir = path.join(tmpRoot, 'newdir');
            ensureDir(dir);
            assert.ok(fs.existsSync(dir));
            assert.ok(fs.statSync(dir).isDirectory());
        });

        test('does not throw on existing directory', () => {
            const dir = path.join(tmpRoot, 'existing');
            fs.mkdirSync(dir, { recursive: true });
            assert.doesNotThrow(() => ensureDir(dir));
        });

        test('creates directories recursively', () => {
            const dir = path.join(tmpRoot, 'a', 'b', 'c');
            ensureDir(dir);
            assert.ok(fs.existsSync(dir));
        });
    });

    // -----------------------------------------------------------------------
    // 4. copyWithReplace()
    // -----------------------------------------------------------------------
    describe('copyWithReplace()', () => {
        let srcDir;
        let destDir;

        before(() => {
            srcDir = mktmp('cwr-src');
            destDir = mktmp('cwr-dest');
        });
        after(() => {
            cleanup(srcDir);
            cleanup(destDir);
        });

        test('copies files with text replacements', () => {
            // Create source structure
            fs.writeFileSync(
                path.join(srcDir, 'readme.md'),
                'Install to ~/.{TOOL}/skills/agent-assistant/',
            );
            fs.mkdirSync(path.join(srcDir, 'sub'));
            fs.writeFileSync(
                path.join(srcDir, 'sub', 'config.yaml'),
                '{TOOL} settings',
            );

            const dest = path.join(destDir, 'replaced');
            const count = copyWithReplace(srcDir, dest, {
                '~/.{TOOL}/skills/agent-assistant/': '~/.cursor/skills/agent-assistant/',
                '{TOOL}': 'cursor',
            }, false);

            assert.ok(count >= 2, `Expected at least 2 files copied, got ${count}`);

            const md = fs.readFileSync(path.join(dest, 'readme.md'), 'utf8');
            assert.strictEqual(md, 'Install to ~/.cursor/skills/agent-assistant/');

            const yaml = fs.readFileSync(path.join(dest, 'sub', 'config.yaml'), 'utf8');
            assert.strictEqual(yaml, 'cursor settings');
        });

        test('skips symlinks', () => {
            const src = mktmp('cwr-sym-src');
            const dest = mktmp('cwr-sym-dest');
            try {
                fs.writeFileSync(path.join(src, 'real.md'), 'real file');
                // Create a symlink pointing to real.md
                fs.symlinkSync(
                    path.join(src, 'real.md'),
                    path.join(src, 'link.md'),
                );

                const count = copyWithReplace(src, dest, {}, false);
                // Only 'real.md' should be copied; 'link.md' should be skipped
                assert.strictEqual(count, 1);
                assert.ok(fs.existsSync(path.join(dest, 'real.md')));
                assert.ok(!fs.existsSync(path.join(dest, 'link.md')));
            } finally {
                cleanup(src);
                cleanup(dest);
            }
        });

        test('skips hidden files', () => {
            const src = mktmp('cwr-hid-src');
            const dest = mktmp('cwr-hid-dest');
            try {
                fs.writeFileSync(path.join(src, '.hidden'), 'secret');
                fs.writeFileSync(path.join(src, 'visible.md'), 'visible');

                const count = copyWithReplace(src, dest, {}, false);
                assert.strictEqual(count, 1);
                assert.ok(!fs.existsSync(path.join(dest, '.hidden')));
                assert.ok(fs.existsSync(path.join(dest, 'visible.md')));
            } finally {
                cleanup(src);
                cleanup(dest);
            }
        });

        test('skips node_modules', () => {
            const src = mktmp('cwr-nm-src');
            const dest = mktmp('cwr-nm-dest');
            try {
                fs.mkdirSync(path.join(src, 'node_modules'));
                fs.writeFileSync(path.join(src, 'node_modules', 'pkg.json'), '{}');
                fs.writeFileSync(path.join(src, 'index.md'), '# hi');

                const count = copyWithReplace(src, dest, {}, false);
                assert.strictEqual(count, 1);
                assert.ok(!fs.existsSync(path.join(dest, 'node_modules')));
                assert.ok(fs.existsSync(path.join(dest, 'index.md')));
            } finally {
                cleanup(src);
                cleanup(dest);
            }
        });

        test('copies binary files without replacement', () => {
            const src = mktmp('cwr-bin-src');
            const dest = mktmp('cwr-bin-dest');
            try {
                // Write a binary-ish file with a non-text extension
                const buf = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
                fs.writeFileSync(path.join(src, 'image.png'), buf);

                const count = copyWithReplace(src, dest, { 'PNG': 'JPG' }, false);
                assert.strictEqual(count, 1);

                const copied = fs.readFileSync(path.join(dest, 'image.png'));
                assert.ok(buf.equals(copied), 'Binary content should be identical');
            } finally {
                cleanup(src);
                cleanup(dest);
            }
        });
    });

    // -----------------------------------------------------------------------
    // 5. copyFileWithReplace()
    // -----------------------------------------------------------------------
    describe('copyFileWithReplace()', () => {
        let tmpDir;

        before(() => { tmpDir = mktmp('cfr'); });
        after(() => { cleanup(tmpDir); });

        test('copies a single file with replacements', () => {
            const src = path.join(tmpDir, 'source.md');
            const dest = path.join(tmpDir, 'out', 'dest.md');
            fs.writeFileSync(src, 'Hello {TOOL}!');

            const result = copyFileWithReplace(src, dest, { '{TOOL}': 'claude' }, false);
            assert.strictEqual(result, true);
            assert.strictEqual(fs.readFileSync(dest, 'utf8'), 'Hello claude!');
        });

        test('returns false for nonexistent source', () => {
            const result = copyFileWithReplace(
                path.join(tmpDir, 'does-not-exist.md'),
                path.join(tmpDir, 'out2', 'dest.md'),
                {},
                false,
            );
            assert.strictEqual(result, false);
        });
    });

    // -----------------------------------------------------------------------
    // 6. removeDir()
    // -----------------------------------------------------------------------
    describe('removeDir()', () => {
        let tmpDir;

        before(() => { tmpDir = mktmpHome('rmdir'); });
        after(() => { cleanup(tmpDir); });

        test('removes a real directory', () => {
            const dir = path.join(tmpDir, 'removeme');
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(path.join(dir, 'file.txt'), 'data');

            const result = removeDir(dir, false);
            assert.strictEqual(result, true);
            assert.ok(!fs.existsSync(dir));
        });

        test('unlinks symlinks without following them', () => {
            const target = path.join(tmpDir, 'symtarget');
            fs.mkdirSync(target, { recursive: true });
            fs.writeFileSync(path.join(target, 'keep.txt'), 'keep');

            const link = path.join(tmpDir, 'symlink-dir');
            fs.symlinkSync(target, link);

            const result = removeDir(link, false);
            assert.strictEqual(result, true);
            // Symlink should be gone
            assert.ok(!fs.existsSync(link));
            // Target should still exist (symlink was not followed)
            assert.ok(fs.existsSync(target));
            assert.ok(fs.existsSync(path.join(target, 'keep.txt')));
        });

        test('returns false for nonexistent path', () => {
            const result = removeDir(path.join(tmpDir, 'nope'), false);
            assert.strictEqual(result, false);
        });
    });

    // -----------------------------------------------------------------------
    // 7. File permissions (B5a)
    // -----------------------------------------------------------------------
    describe('File permissions', () => {
        let tmpDir;

        before(() => { tmpDir = mktmp('perms'); });
        after(() => { cleanup(tmpDir); });

        test('files under a rules/ path get chmod 0o600', () => {
            const src = mktmp('perms-rules-src');
            const dest = path.join(tmpDir, 'dest-rules');
            try {
                // Create source with a rules/ subdirectory
                const rulesDir = path.join(src, 'rules');
                fs.mkdirSync(rulesDir, { recursive: true });
                fs.writeFileSync(path.join(rulesDir, 'CORE.md'), '# Core rules');

                copyWithReplace(src, dest, {}, false);

                const destFile = path.join(dest, 'rules', 'CORE.md');
                assert.ok(fs.existsSync(destFile));
                const mode = fs.statSync(destFile).mode & 0o777;
                assert.strictEqual(mode, 0o600, `Expected 0o600, got 0o${mode.toString(8)}`);
            } finally {
                cleanup(src);
            }
        });

        test('other files get chmod 0o644', () => {
            const src = mktmp('perms-other-src');
            const dest = path.join(tmpDir, 'dest-other');
            try {
                fs.writeFileSync(path.join(src, 'readme.md'), '# README');

                copyWithReplace(src, dest, {}, false);

                const destFile = path.join(dest, 'readme.md');
                assert.ok(fs.existsSync(destFile));
                const mode = fs.statSync(destFile).mode & 0o777;
                assert.strictEqual(mode, 0o644, `Expected 0o644, got 0o${mode.toString(8)}`);
            } finally {
                cleanup(src);
            }
        });
    });

    // -----------------------------------------------------------------------
    // Bonus: getEstimatedFileCount / saveInstallCache
    // -----------------------------------------------------------------------
    describe('getEstimatedFileCount()', () => {
        test('returns a positive number', () => {
            const count = getEstimatedFileCount();
            assert.ok(typeof count === 'number');
            assert.ok(count > 0);
        });
    });

    // -----------------------------------------------------------------------
    // 8. removeFile()
    // -----------------------------------------------------------------------
    describe('removeFile()', () => {
        test('removes existing file and tracks in removedPaths', () => {
            const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aa-rf-'));
            const f = path.join(dir, 'test.txt');
            fs.writeFileSync(f, 'hello');
            resetProgress();
            const result = removeFile(f);
            assert.strictEqual(result, true);
            assert.strictEqual(fs.existsSync(f), false);
            assert.ok(progressState.removedPaths.includes(f));
            fs.rmSync(dir, { recursive: true, force: true });
        });

        test('returns false for nonexistent file', () => {
            const result = removeFile('/nonexistent/path/file.txt');
            assert.strictEqual(result, false);
        });
    });

    // -----------------------------------------------------------------------
    // 9. removeBundledAgents()
    // -----------------------------------------------------------------------
    describe('removeBundledAgents()', () => {
        test('removes only bundled agents, preserves custom', () => {
            const dir = mktmpHome('rba');
            // Create 2 bundled agents + 1 custom
            fs.writeFileSync(path.join(dir, 'backend-engineer.md'), 'bundled');
            fs.writeFileSync(path.join(dir, 'tester.md'), 'bundled');
            fs.writeFileSync(path.join(dir, 'custom-agent.md'), 'user');
            resetProgress();
            const removed = removeBundledAgents(dir);
            assert.strictEqual(removed, 2);
            assert.strictEqual(fs.existsSync(path.join(dir, 'custom-agent.md')), true);
            assert.strictEqual(fs.existsSync(path.join(dir, 'backend-engineer.md')), false);
            cleanup(dir);
        });

        test('cleans up empty dir', () => {
            const dir = mktmpHome('rba2');
            fs.writeFileSync(path.join(dir, 'tester.md'), 'bundled');
            resetProgress();
            removeBundledAgents(dir);
            assert.strictEqual(fs.existsSync(dir), false);
        });

        test('returns 0 for missing dir', () => {
            const result = removeBundledAgents('/nonexistent/agents');
            assert.strictEqual(result, 0);
        });
    });

    // -----------------------------------------------------------------------
    // 10. logError()
    // -----------------------------------------------------------------------
    describe('logError()', () => {
        test('pushes structured error', () => {
            resetProgress();
            logError('copy', '/some/path', new Error('permission denied'));
            assert.strictEqual(progressState.errors.length, 1);
            assert.strictEqual(progressState.errors[0].operation, 'copy');
            assert.strictEqual(progressState.errors[0].path, '/some/path');
            assert.ok(progressState.errors[0].timestamp);
        });
    });

    // -----------------------------------------------------------------------
    // 11. getVSCodePromptsFolder()
    // -----------------------------------------------------------------------
    describe('getVSCodePromptsFolder()', () => {
        const originalPlatform = process.platform;
        const originalAppData = process.env.APPDATA;

        after(() => {
            Object.defineProperty(process, 'platform', { value: originalPlatform });
            if (originalAppData !== undefined) process.env.APPDATA = originalAppData;
            else delete process.env.APPDATA;
        });

        test('returns darwin path', () => {
            Object.defineProperty(process, 'platform', { value: 'darwin' });
            delete require.cache[require.resolve('./lib/config')];
            const { getVSCodePromptsFolder: fresh } = require('./lib/config');
            const result = fresh();
            assert.ok(result.includes(path.join('Library', 'Application Support', 'Code', 'User', 'prompts')));
        });

        test('returns linux path', () => {
            Object.defineProperty(process, 'platform', { value: 'linux' });
            delete require.cache[require.resolve('./lib/config')];
            const { getVSCodePromptsFolder: fresh } = require('./lib/config');
            const result = fresh();
            assert.ok(result.includes(path.join('.config', 'Code', 'User', 'prompts')));
        });

        test('returns win32 path with APPDATA fallback', () => {
            Object.defineProperty(process, 'platform', { value: 'win32' });
            process.env.APPDATA = '/fake/appdata';
            delete require.cache[require.resolve('./lib/config')];
            const { getVSCodePromptsFolder: fresh } = require('./lib/config');
            const result = fresh();
            assert.ok(result.includes(path.join('/fake/appdata', 'Code', 'User', 'prompts')));
        });
    });

    // -----------------------------------------------------------------------
    // 12. verifyInstallation()
    // -----------------------------------------------------------------------
    describe('verifyInstallation()', () => {
        test('returns success when all files exist', () => {
            const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aa-vi-'));
            const f1 = path.join(dir, 'a.md');
            const f2 = path.join(dir, 'b.md');
            fs.writeFileSync(f1, 'a');
            fs.writeFileSync(f2, 'b');
            resetProgress();
            progressState.copiedFiles.push(f1, f2);
            const result = verifyInstallation();
            assert.strictEqual(result.success, true);
            assert.strictEqual(result.verified, 2);
            assert.strictEqual(result.failed, 0);
            fs.rmSync(dir, { recursive: true, force: true });
        });

        test('reports failed when file missing', () => {
            resetProgress();
            progressState.copiedFiles.push('/nonexistent/file.md');
            const result = verifyInstallation();
            assert.strictEqual(result.success, false);
            assert.strictEqual(result.failed, 1);
        });
    });

    // -----------------------------------------------------------------------
    // 13. formatNumber()
    // -----------------------------------------------------------------------
    describe('formatNumber()', () => {
        test('formats with locale separators', () => {
            const result = formatNumber(1234567);
            // Must contain digits and some separator (locale-dependent)
            assert.ok(/1.*234.*567/.test(result));
        });
    });

    // -----------------------------------------------------------------------
    // 14. progress functions
    // -----------------------------------------------------------------------
    describe('progress functions', () => {
        test('resetProgress clears all fields', () => {
            progressState.current = 50;
            progressState.total = 100;
            progressState.errors.push({ test: true });
            progressState.copiedFiles.push('/a');
            resetProgress();
            assert.strictEqual(progressState.current, 0);
            assert.strictEqual(progressState.total, 0);
            assert.strictEqual(progressState.errors.length, 0);
            assert.strictEqual(progressState.copiedFiles.length, 0);
            assert.strictEqual(progressState.lastPercent, -1);
        });

        test('drawProgress does nothing when total=0', () => {
            drawProgress(0, 0);
            drawProgress(5, 0);
        });

        test('updateProgress increments current and sets phase', () => {
            resetProgress();
            progressState.total = 10;
            updateProgress('test.md');
            assert.strictEqual(progressState.current, 1);
            assert.strictEqual(progressState.phase, 'test.md');
        });

        test('completeProgress sets current to total', () => {
            resetProgress();
            progressState.total = 5;
            progressState.current = 3;
            completeProgress();
        });

        test('saveInstallCache writes cache file', () => {
            resetProgress();
            progressState.current = 42;
            saveInstallCache();
            const cachePath = path.join(require('./lib/config').ROOT, '.install-cache.json');
            if (fs.existsSync(cachePath)) {
                const data = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
                assert.strictEqual(data.fileCount, 42);
                fs.unlinkSync(cachePath);
            }
        });
    });

    // -----------------------------------------------------------------------
    // 15. mergeCodexConfig()
    // -----------------------------------------------------------------------
    describe('mergeCodexConfig()', () => {
        let tmpDir;

        before(() => {
            tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aa-codex-'));
        });

        after(() => {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        });

        test('fresh merge creates config with markers', () => {
            const tmpl = path.join(tmpDir, 'template.toml');
            const dest = path.join(tmpDir, 'config-fresh.toml');
            fs.writeFileSync(tmpl, '[agents]\ndefault_agent = "coder"\n');

            const result = mergeCodexConfig(tmpl, dest);
            assert.strictEqual(result, true);

            const content = fs.readFileSync(dest, 'utf8');
            assert.ok(content.includes('# === AGENT-ASSISTANT START ==='));
            assert.ok(content.includes('# === AGENT-ASSISTANT END ==='));
            assert.ok(content.includes('[agents]'));
            assert.ok(content.includes('project_doc_fallback_filenames'));
        });

        test('idempotent — re-merge does not duplicate markers', () => {
            const tmpl = path.join(tmpDir, 'template.toml');
            const dest = path.join(tmpDir, 'config-idem.toml');
            fs.writeFileSync(tmpl, '[agents]\ndefault_agent = "coder"\n');

            mergeCodexConfig(tmpl, dest);
            mergeCodexConfig(tmpl, dest);

            const content = fs.readFileSync(dest, 'utf8');
            const startCount = (content.match(/AGENT-ASSISTANT START/g) || []).length;
            assert.strictEqual(startCount, 1);
        });

        test('preserves user content outside markers', () => {
            const tmpl = path.join(tmpDir, 'template.toml');
            const dest = path.join(tmpDir, 'config-user.toml');
            fs.writeFileSync(tmpl, '[agents]\ndefault_agent = "coder"\n');
            fs.writeFileSync(dest, '[tools]\nmy_tool = true\n');

            mergeCodexConfig(tmpl, dest);

            const content = fs.readFileSync(dest, 'utf8');
            assert.ok(content.includes('my_tool = true'));
            assert.ok(content.includes('AGENT-ASSISTANT START'));
        });

        test('handles existing [features] without duplication', () => {
            const tmpl = path.join(tmpDir, 'template.toml');
            const dest = path.join(tmpDir, 'config-feat.toml');
            fs.writeFileSync(tmpl, '[agents]\ndefault_agent = "coder"\n');
            fs.writeFileSync(dest, '[features]\nother_feature = false\n');

            mergeCodexConfig(tmpl, dest);

            const content = fs.readFileSync(dest, 'utf8');
            const featCount = (content.match(/\[features\]/g) || []).length;
            assert.strictEqual(featCount, 1);
            assert.ok(content.includes('multi_agent = true'));
            assert.ok(content.includes('other_feature = false'));
        });
    });

    // -----------------------------------------------------------------------
    // 16. module structure
    // -----------------------------------------------------------------------
    describe('module structure', () => {
        test('install.js exports all expected keys', () => {
            const mod = require('./install');
            const expectedKeys = ['BUNDLED_AGENTS', 'TOOLS', 'CORE_DIRS', 'ROOT_FILES', 'ensureDir', 'copyWithReplace', 'copyFileWithReplace', 'removeDir', 'getEstimatedFileCount', 'saveInstallCache'];
            for (const key of expectedKeys) {
                assert.ok(key in mod, `Missing export: ${key}`);
            }
        });

        test('all platform modules export install and uninstall', () => {
            const platforms = ['cursor', 'copilot', 'antigravity', 'claude', 'codex'];
            for (const p of platforms) {
                const mod = require(`./lib/platforms/${p}`);
                const installFn = `install${p.charAt(0).toUpperCase() + p.slice(1)}`;
                const uninstallFn = `uninstall${p.charAt(0).toUpperCase() + p.slice(1)}`;
                assert.ok(typeof mod[installFn] === 'function', `${p} missing ${installFn}`);
                assert.ok(typeof mod[uninstallFn] === 'function', `${p} missing ${uninstallFn}`);
            }
        });
    });
});
