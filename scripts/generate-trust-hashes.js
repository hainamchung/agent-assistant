#!/usr/bin/env node
'use strict';

/**
 * Generate SHA256 hashes for all matrix-skill files listed in trust-manifest.json.
 *
 * Usage:
 *   node scripts/generate-trust-hashes.js              # Update trust-manifest.json
 *   node scripts/generate-trust-hashes.js --verify     # Verify current hashes match files
 *   node scripts/generate-trust-hashes.js --dry-run    # Show what would change without writing
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = path.join(__dirname, '..');
const MANIFEST_PATH = path.join(PROJECT_ROOT, 'skills', 'trust-manifest.json');

function computeSHA256(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function main() {
  const args = process.argv.slice(2);
  const verify = args.includes('--verify');
  const dryRun = args.includes('--dry-run');

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('❌ trust-manifest.json not found at', MANIFEST_PATH);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  if (!manifest.skills) {
    console.error('❌ trust-manifest.json missing "skills" object');
    process.exit(1);
  }

  let updated = 0;
  let verified = 0;
  let mismatches = 0;
  let missing = 0;

  for (const [key, entry] of Object.entries(manifest.skills)) {
    const filePath = path.join(PROJECT_ROOT, key);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${key}`);
      missing++;
      continue;
    }

    const hash = computeSHA256(filePath);

    if (verify) {
      if (entry.sha256 === hash) {
        verified++;
      } else {
        console.error(`❌ Hash mismatch: ${key}`);
        console.error(`   Expected: ${entry.sha256}`);
        console.error(`   Actual:   ${hash}`);
        mismatches++;
      }
    } else {
      if (entry.sha256 !== hash) {
        if (dryRun) {
          console.log(`  Would update: ${key}`);
          console.log(`    ${entry.sha256 || 'null'} → ${hash}`);
        }
        entry.sha256 = hash;
        updated++;
      }
    }
  }

  // Update timestamp
  if (!verify && !dryRun && updated > 0) {
    manifest.metadata.generatedAt = new Date().toISOString();
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  }

  // Report
  if (verify) {
    console.log(`\n📋 Trust Manifest Verification`);
    console.log(`  ✅ Verified: ${verified}`);
    if (mismatches > 0) console.log(`  ❌ Mismatches: ${mismatches}`);
    if (missing > 0) console.log(`  ⚠️  Missing files: ${missing}`);
    process.exit(mismatches > 0 ? 1 : 0);
  } else if (dryRun) {
    console.log(`\n📋 Dry Run: ${updated} hash(es) would be updated`);
  } else {
    console.log(`\n📋 Trust Manifest Updated`);
    console.log(`  ✅ Updated: ${updated} hash(es)`);
    if (missing > 0) console.log(`  ⚠️  Missing files: ${missing}`);
  }
}

main();
