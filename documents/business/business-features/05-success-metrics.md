# Success Metrics

> **Purpose**: KPIs, baselines, targets, and measurement approach for each feature.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Metrics Overview

| Feature ID | KPI | Baseline | Target | Measurement |
|------------|-----|----------|--------|-------------|
| BF-001 | Agent lint pass rate | 0% (pre-framework) | 100% (all 21 agents) | `node scripts/lint-agents.js` — 0 errors |
| BF-001 | Agent simulation pass rate | 0% | 100% | `node scripts/simulate.js` — all PASS |
| BF-002 | Command routing accuracy | N/A | 100% correct routing | `validate:workflow` regression test |
| BF-003 | Skill resolution coverage | 0 skills | 1430 matrix entries | `summarize:skills` count |
| BF-004 | Topology coverage | 0 | 12 defined patterns | File count in `topologies/` |
| BF-005 | Team coverage | 0 | 17 domain teams | Directory count in `agents/teams/` |
| BF-006 | Install success rate | N/A | 100% on supported platforms | `agent-assistant install --all` exit code 0 |
| BF-007 | Guardrail coverage | 0 | 7 modules | File count in `guardrails/` |
| BF-007 | Trust hash verification | N/A | 100% pass | `npm run trust:verify` |
| BF-008 | Context token reduction | Full load | NANO <50 lines, MICRO <200 lines | `scripts/measure-context.js` |
| BF-009 | Checkpoint schema validity | N/A | v1.0 schema | `checkpoint:list` returns valid JSON |
| BF-010 | Entry point drift | Unknown | 0 drift | `npm run lint:drift` |
| BF-011 | Documentation completeness | 0 folders | 13 folders (5+4+4) | Folder existence check after /docs execution |
| BF-012 | Voice field coverage | 0 agents | 21 agents | `lint-agents.js` R019, R020 |
| BF-013 | Pattern storage | Empty | Populated after workflows | `global-patterns.json` non-empty |
| BF-014 | Community tier definition | 0 | 4 tiers | `COMMUNITY-TIERS.md` existence + schema |

## Measurement Approach

### Automated (CI-Enforced)

These metrics are validated automatically in the CI pipeline:

| Metric | CI Step | Script |
|--------|---------|--------|
| Agent lint | `lint:agents` | `node scripts/lint-agents.js` |
| Entry point drift | `lint:drift` | `node scripts/lint-entry-points.js` |
| RUNTIME.md word budget | `wordcount` | `wc -w rules/RUNTIME.md` <= 3200 |
| Schema validation | `validate:schemas` | `node scripts/lint-rules/deliverable-schemas.js` |
| A2A card validation | `validate:a2a` | `node scripts/generate-a2a-cards.js --validate` |
| Trust hash verification | `trust:verify` | `node scripts/generate-trust-hashes.js --verify` |
| Simulation | `simulate` | `node scripts/simulate.js` |

### Manual (Periodic)

These metrics require manual measurement or are measured at release time:

| Metric | Frequency | Method |
|--------|-----------|--------|
| Install success across platforms | Per release | Run `agent-assistant install --all` on clean systems |
| Skill count | Per skill update | `npm run summarize:skills` |
| Documentation completeness | After /docs execution | Verify folder structure |
| Context token measurements | Per RUNTIME.md change | `npm run measure:context` |

### Not Yet Measurable

These metrics require telemetry implementation (not currently in scope):

| Metric | Blocked By |
|--------|------------|
| Adoption count (npm downloads) | npm analytics (external) |
| Feature usage frequency | No runtime telemetry |
| Workflow completion rate | No session tracking |
| Time-to-completion improvement | No baseline measurement system |

## Evidence Sources

- [package.json](../../../package.json) — CI scripts and measurement commands
- [.github/workflows/ci.yml](../../../.github/workflows/ci.yml) — CI pipeline definition (if accessible)
- [CONTRIBUTING.md](../../../CONTRIBUTING.md) — Verification commands for contributors
