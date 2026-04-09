---
schema-version: "1.0"
name: skill-security
category: security
description: "Trust levels, quarantine process, and integrity verification for skills"
version: "1.0"
---

# Skill Security — Trust & Integrity

> Defines trust levels, quarantine process, and integrity verification for all skills
> loaded by the agent-assistant framework.

---

## Trust Levels

| Level | Auto-Load | Restrictions | Integrity Check |
|-------|-----------|-------------|-----------------|
| **core** | Yes | None — full access | Trusted by default (framework-authored) |
| **verified** | Yes | None after verification | SHA-256 checksum verified after manual review |
| **community** | No — quarantined | Loaded with warning banner; sandboxed | SHA-256 checksum required; quarantined by default |

### Core Skills
- Auto-loaded with no restrictions.
- Authored and maintained by framework maintainers only.
- Listed in `skills/trust-manifest.json` with `"trust": "core"`.
- No checksum required — trust is implicit from source control.

### Verified Skills
- Reviewed by a maintainer and promoted from community or added directly.
- Checksum recorded in `skills/trust-manifest.json` with `"trust": "verified"`.
- SHA-256 checksum MUST match before loading. Mismatch = reject + alert.
- Re-verification required after any modification.

### Community Skills
- Untrusted by default. Placed in `skills/quarantine/` on arrival.
- Loaded ONLY with explicit user consent and a visible warning banner:
  ```
  ⚠️ COMMUNITY SKILL — Unverified. Use at your own risk.
  ```
- SHA-256 checksum recorded for tamper detection, but trust is NOT implied.
- Must go through the quarantine process before promotion.

---

## Quarantine Process

```
1. Community skill submitted → placed in skills/quarantine/
2. Maintainer reviews:
   a. Code audit for security (injection, data exfiltration, scope violations)
   b. Functionality verification against declared capabilities
   c. Compliance with skill schema and naming conventions
3. SHA-256 checksum computed and recorded
4. Promotion decision:
   - APPROVE → Move to skills/, update trust-manifest.json with "verified" + sha256
   - REJECT  → Remove from quarantine, document reason
   - HOLD    → Remains in quarantine pending changes
```

### Quarantine Directory
- Path: `skills/quarantine/`
- All community submissions land here first.
- Skills in quarantine are NEVER auto-loaded.
- Each quarantined skill should have a companion `_review.md` note (optional).

---

## Integrity Verification

### Algorithm
- **Hash**: SHA-256
- **Scope**: Entire file content (including frontmatter)
- **Storage**: `skills/trust-manifest.json` → `sha256` field per skill entry

### Verification Rules

| Trust Level | Checksum Required | Behavior on Mismatch |
|-------------|-------------------|----------------------|
| core | No (`null`) | Trusted — no check performed |
| verified | Yes | **REJECT** — do not load. Alert user. |
| community | Yes | **REJECT** — do not load. Alert user. |

### Computing Checksums
```bash
shasum -a 256 skills/my-skill.yaml | awk '{print $1}'
```

---

## Loading Rules

### Per Trust Level Behavior

1. **Core**: Load immediately. No user prompt. No checksum verification.
2. **Verified**: Compute SHA-256. Compare against manifest. Load if match; reject if mismatch.
3. **Community**: Must be explicitly requested by user. Show warning banner. Compute SHA-256. Compare against manifest. Load if match; reject if mismatch.

### Load Order
1. Core skills (auto)
2. Verified skills (auto)
3. Community skills (on-demand only)

### Rejection Handling
When a skill fails integrity verification:
```
❌ SKILL REJECTED — Integrity check failed for "{skill-name}"
   Expected SHA-256: {expected}
   Actual SHA-256:   {actual}
   Action: Skill NOT loaded. Re-verify or re-download.
```

---

## Ownership & Governance

- **Trust manifest** (`skills/trust-manifest.json`) is **framework-authored ONLY**.
- Skills **cannot** self-declare their trust level.
- Only entries in the trust manifest determine a skill's trust level.
- Any skill NOT listed in the manifest is treated as `community` (quarantined).
- Modifications to the trust manifest require maintainer review (PR approval).
