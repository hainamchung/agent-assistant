#!/usr/bin/env node
/**
 * Patches vulnerable bundled dependencies inside node_modules/npm.
 *
 * npm bundles its own dependencies, so npm overrides cannot reach them.
 * This script downloads the fixed versions and replaces the vulnerable copies.
 *
 * Vulnerabilities fixed:
 *  - brace-expansion  5.0.4 → 5.0.5  (GHSA-f886-m6hf-6m8v)
 *  - picomatch         4.0.3 → 4.0.4  (GHSA-3v7f-55p6-f55p, GHSA-c2c7-rcm5-vvqj)
 */

'use strict';

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const patches = [
  {
    name: 'brace-expansion',
    fixedVersion: '5.0.5',
    targets: ['node_modules/npm/node_modules/brace-expansion'],
  },
  {
    name: 'picomatch',
    fixedVersion: '4.0.4',
    targets: ['node_modules/npm/node_modules/tinyglobby/node_modules/picomatch'],
  },
];

const root = path.resolve(__dirname, '..');

function getInstalledVersion(targetDir) {
  const pkgPath = path.join(targetDir, 'package.json');
  if (!fs.existsSync(pkgPath)) return null;
  return JSON.parse(fs.readFileSync(pkgPath, 'utf8')).version;
}

function patchPackage({ name, fixedVersion, targets }) {
  const activeTargets = targets
    .map((t) => path.join(root, t))
    .filter((t) => {
      const v = getInstalledVersion(t);
      if (!v) return false;
      if (v === fixedVersion) {
        console.log(`  ✅ ${name}@${v} at ${path.relative(root, t)} — already patched`);
        return false;
      }
      console.log(`  🔧 ${name}@${v} → ${fixedVersion} at ${path.relative(root, t)}`);
      return true;
    });

  if (activeTargets.length === 0) return;

  // Download the fixed version into a temp directory
  const tmpDir = path.join(root, `node_modules/.patch-tmp-${name}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  try {
    execFileSync('npm', ['pack', `${name}@${fixedVersion}`, '--pack-destination', tmpDir], {
      cwd: root,
      stdio: 'pipe',
    });

    // Find the tarball
    const tarball = fs.readdirSync(tmpDir).find((f) => f.endsWith('.tgz'));
    if (!tarball) throw new Error(`Failed to download ${name}@${fixedVersion}`);

    const tarballPath = path.join(tmpDir, tarball);

    for (const target of activeTargets) {
      // Extract over the existing directory (tar strips 'package/' prefix)
      execFileSync('tar', ['xzf', tarballPath, '--strip-components=1', '-C', target], {
        cwd: root,
        stdio: 'pipe',
      });

      // Verify
      const newVersion = getInstalledVersion(target);
      if (newVersion === fixedVersion) {
        console.log(`  ✅ ${name}@${fixedVersion} patched successfully`);
      } else {
        console.error(`  ❌ ${name} patch failed — got ${newVersion}`);
        process.exitCode = 1;
      }
    }
  } finally {
    // Cleanup temp directory
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

console.log('🩹 Patching bundled dependencies...\n');

for (const patch of patches) {
  patchPackage(patch);
}

console.log('\n🩹 Done.');
