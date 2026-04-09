# COMMUNITY-TIERS — Contributor Trust & Publishing Model

> **Loaded by**: §REFERENCE.md RULES FILES — load when contributor validation needed
> **Version**: 1.0

---

## 4-Tier Trust Model

### Tier 1: `newcomer` 🌱

- **Privileges**: Submit agents/skills to sandbox only; PRs require 2 reviews
- **Publishing scope**: sandbox/ directory (quarantined)
- **Promotion to `contributor`**: 3 accepted PRs + 30 days active
- **Note**: The sandbox/, community/, verified/ directories are conceptual scopes for future implementation. Sprint 6 defines the tier model and manifest schema; directory enforcement is deferred to Sprint 7+.

### Tier 2: `contributor` 🤝

- **Privileges**: Submit to community/ directory; PRs require 1 review
- **Publishing scope**: community/ + sandbox/
- **Promotion to `trusted`**: 10 accepted PRs + 90 days active + 1 peer endorsement

### Tier 3: `trusted` ⭐

- **Privileges**: Submit to verified/ directory; can review newcomer PRs
- **Publishing scope**: verified/ + community/ + sandbox/
- **Promotion to `maintainer`**: Invited by existing maintainer

### Tier 4: `maintainer` 🛡️

- **Privileges**: Full access; can modify core/; can promote contributors
- **Publishing scope**: all directories

---

## Contributor Manifest Schema

Location: `.agent-assistant/contributors.json`

```json
{
  "version": "1.0",
  "schema": "community-tiers-v1",
  "contributors": [
    {
      "id": "github-username",
      "tier": "newcomer|contributor|trusted|maintainer",
      "joined": "ISO-8601",
      "promoted_at": "ISO-8601 or null",
      "contributions": 0,
      "endorsements": [],
      "promoted_by": "username or null"
    }
  ],
  "settings": {
    "auto_promote": false,
    "require_endorsement_for_trusted": true,
    "quarantine_newcomer_submissions": true
  }
}
```

> **Integrity note**: This manifest is project-local and not cryptographically signed in Sprint 6. It relies on repository access controls (branch protection, PR reviews) for integrity.

---

## Tier Enforcement Points

1. **Lint pipeline**: `lint:agents` checks contributor tier for publishing scope
2. **Gallery display**: Badge shown next to agent author name
3. **Skill security**: Quarantine check uses tier (newcomer → always quarantine)

---

## Default for Existing Contributors

- All current contributors default to `contributor` tier (grandfathered)
- Project creator defaults to `maintainer`
