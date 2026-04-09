# Dependencies and Release Sequencing

> **Purpose**: Feature dependencies, rollout order, and sequencing constraints.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Dependency Graph

```
BF-001 (Multi-Agent Orchestration)
  ├── BF-002 (Command System) — requires agents to assign to phases
  │     ├── BF-005 (Golden Triangle) — requires commands + topologies
  │     └── BF-011 (Documentation Suite) — requires commands framework
  ├── BF-003 (HSOL Skill Resolution) — requires agent profiles
  ├── BF-004 (Execution Topologies) — requires agents for role slots
  │     └── BF-005 (Golden Triangle) — requires golden-triangle topology
  ├── BF-007 (Guardrails) — requires agents to apply guardrails to
  ├── BF-008 (Tiered Context Loading) — requires RUNTIME.md structure
  ├── BF-012 (Voice Coherence) — requires agent voice fields
  └── BF-013 (Pattern Extraction) — requires workflow execution data

BF-006 (CLI Global Install) — independent, enables distribution
  └── BF-010 (Cross-Platform Parity) — requires install mechanism + template

BF-009 (Checkpoint-Resume) — independent, enhances workflows

BF-014 (Community Tiers) — independent, enables ecosystem governance
```

## Release Sequencing

All features shipped together in v2.0.0, but the logical build order is:

| Phase | Features | Rationale |
|-------|----------|-----------|
| **Foundation** | BF-001 (Agents), BF-006 (CLI) | Agents are the core entity; CLI is the distribution mechanism |
| **Workflow Layer** | BF-002 (Commands), BF-004 (Topologies), BF-003 (HSOL) | Commands require agents; topologies define coordination; HSOL provides expertise |
| **Quality Layer** | BF-005 (Golden Triangle), BF-007 (Guardrails) | Adversarial teams require commands + topologies; guardrails require agents |
| **Efficiency Layer** | BF-008 (Tiered Loading), BF-009 (Checkpoint), BF-010 (Cross-Platform) | Performance and durability enhancements on top of working workflows |
| **Intelligence Layer** | BF-011 (Docs), BF-012 (Voice), BF-013 (Patterns) | Self-documentation, tone consistency, and learning build on all prior layers |
| **Ecosystem Layer** | BF-014 (Community Tiers) | Governance becomes relevant when external contributions begin |

## Sequencing Constraints

| Constraint | Description |
|------------|-------------|
| BF-001 before all others | Agents are the foundational entity; nothing works without them |
| BF-004 before BF-005 | Golden Triangle is a specific topology; topologies must exist first |
| BF-002 before BF-005 | Teams operate within command workflows |
| BF-006 before BF-010 | Cross-platform parity requires the install mechanism |
| BF-001 before BF-003 | HSOL resolves skills by agent profile; agents define profiles |
| BF-009 independent | Checkpoint-resume is an orthogonal enhancement |

## Evidence Sources

- [CHANGELOG.md](../../../CHANGELOG.md) — Feature release history showing build-up sequence
- [package.json](../../../package.json) — Script dependencies reflecting feature relationships
- [README.md](../../../README.md) — Quick Start order (docs first, then build, then review, then deploy)
