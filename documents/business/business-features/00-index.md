# Business Features — Feature Catalogue and Specifications

> **Folder**: `documents/business/business-features/`
> **Purpose**: Complete feature inventory, prioritization, specifications, dependencies, and success metrics
> **Audience**: Product managers, developers, QA teams, and stakeholders

---

## Summary

The **Agent Assistant Feature System** encompasses all capabilities that deliver value to users. This folder provides a comprehensive catalogue of 20 features organized into five categories: Core Orchestration, Agent Management, Skill Discovery, Platform Integration, and Developer Experience.

Each feature is documented with its user value proposition, technical surface area, dependencies on other features, and evidence linking to implementation artifacts. The prioritization framework uses MoSCoW methodology to ensure development focus aligns with business impact.

The feature system is designed around three core principles: modularity (features can be developed and released independently), dependency awareness (clear sequencing constraints prevent integration failures), and measurable success (every feature has defined KPIs tracked against baselines and targets).

---

## Sub-Files

| File | Title | Purpose | Read Order |
|------|-------|---------|------------|
| `00-index.md` | Business Features Index | This index — navigation and overview | 0 |
| `01-feature-inventory.md` | Feature Inventory | All 20 features with value, surface, dependencies | 1 |
| `02-prioritization-moscow.md` | MoSCoW Prioritization | Must (5), Should (6), Could (6), Won't (3) | 2 |
| `03-feature-specifications.md` | Feature Specifications | Detailed specs for Must/Should features | 3 |
| `04-dependencies-and-release-sequencing.md` | Dependencies and Release Sequencing | Dependency graph and release order | 4 |
| `05-success-metrics.md` | Success Metrics | 20 KPIs with baselines, targets, measurement | 5 |

---

## Quick Facts

| Attribute | Value |
|-----------|-------|
| **Total Features** | 20 |
| **Must Have** | 5 |
| **Should Have** | 6 |
| **Could Have** | 6 |
| **Won't Have (This Release)** | 3 |
| **Feature Categories** | 5 |

---

## Feature Categories

| Category | Count | Examples |
|----------|-------|----------|
| Core Orchestration | 5 | Command routing, Tiered execution, Phase management |
| Agent Management | 4 | Agent profiles, Team formation, Context isolation |
| Skill Discovery | 3 | Matrix resolution, Dynamic discovery, Skill injection |
| Platform Integration | 4 | Cursor, Claude Code, GitHub Copilot, Codex |
| Developer Experience | 4 | CLI installer, Documentation, Wiki generation, Reporting |

---

## Cross-References

| Reference | Destination | When to Read |
|-----------|-------------|--------------|
| PRD | `../business-prd/00-index.md` | Understanding requirements driving features |
| Workflows | `../business-workflows/00-index.md` | Understanding how features integrate |
| Glossary | `../business-glossary/00-index.md` | Understanding feature terminology |
| Architecture | `../../knowledge-architecture/00-index.md` | Technical implementation details |

---

## Known Gaps

| Gap | Status | Notes |
|-----|--------|-------|
| Mobile platform support | Future | React Native/Flutter integration planned |
| Enterprise SSO | Future | Authentication expansion |
| Custom agent templates | Future | User-defined agent patterns |

---

## Evidence Sources

The content in this folder was derived from:

- `README.md` — Feature overview and quick start
- `rules/CORE.md` — Command routing and orchestration laws
- `rules/AGENTS.md` — Agent categories and capabilities
- `rules/TEAMS.md` — Golden Triangle team features
- `rules/SKILLS.md` — HSOL skill discovery system
- `commands/` — Command implementations
- `agents/` — Agent definitions
