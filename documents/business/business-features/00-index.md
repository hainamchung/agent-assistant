# Business Features

> **Purpose**: Complete feature inventory, MoSCoW prioritization, specifications, dependencies, and success metrics for Agent Assistant.
> **Sub-files**: 5
> **Last Updated**: 2026-04-09

## Quick Summary

Agent Assistant v2.0.0 ships with 14 distinct features spanning multi-agent orchestration, command workflows, skill resolution, execution topologies, adversarial collaboration, security guardrails, CLI tooling, and cross-platform support. Features are prioritized using MoSCoW — 7 Must-Have features form the core value proposition, 4 Should-Have features enhance the experience, and 3 Could-Have features enable future growth.

The feature set is designed around a single principle: structure for AI-assisted engineering. Every feature either introduces specialization, enforces quality, or reduces operational overhead.

## Sub-Files

| File | Description |
|------|-------------|
| [01-feature-inventory.md](./01-feature-inventory.md) | Complete feature list with business value |
| [02-prioritization-moscow.md](./02-prioritization-moscow.md) | MoSCoW prioritization with rationale |
| [03-feature-specifications.md](./03-feature-specifications.md) | Feature-level specifications and acceptance checks |
| [04-dependencies-and-release-sequencing.md](./04-dependencies-and-release-sequencing.md) | Dependencies, rollout order, and sequencing constraints |
| [05-success-metrics.md](./05-success-metrics.md) | KPIs, baselines, targets, and measurement approach |

## Key Facts

| Key | Value |
|-----|-------|
| Total Features | 14 |
| Must-Have | 7 |
| Should-Have | 4 |
| Could-Have | 3 |
| Agents | 21 specialist + 17 Golden Triangle teams |
| Skills | 1430 matrix entries across 19 domains |
| Commands | 17 routers, 50+ variants |
| Topologies | 12 execution patterns |

## Cross-References

- [business-prd](../business-prd/00-index.md) — Goals, requirements, acceptance criteria
- [business-workflows](../business-workflows/00-index.md) — How features are used in workflows
- [knowledge-overview/03-features.md](../../knowledge-overview/03-features.md) — Technical feature details
- [knowledge-architecture](../../knowledge-architecture/00-index.md) — System design supporting features

## Known Gaps and Open Questions

- Success metrics lack baseline measurements — telemetry is not implemented
- Community extension features (BF-013, BF-014) are defined but not yet widely adopted
- Feature usage analytics are not tracked; prioritization is based on architectural analysis, not user data
