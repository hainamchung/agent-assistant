# Feature Prioritization (MoSCoW)

> **Purpose**: MoSCoW prioritization of all features with rationale.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Prioritization Summary

| Priority | Count | Features |
|----------|-------|----------|
| **Must** | 7 | BF-001, BF-002, BF-003, BF-004, BF-005, BF-006, BF-007 |
| **Should** | 4 | BF-008, BF-009, BF-010, BF-011 |
| **Could** | 3 | BF-012, BF-013, BF-014 |
| **Won't** | 0 | — |

---

## Must-Have Features

These features constitute the core value proposition. Without them, Agent Assistant is not differentiated from ad-hoc prompting.

| Feature ID | Feature | Rationale |
|------------|---------|-----------|
| BF-001 | Multi-Agent Orchestration | The foundational architecture — without specialist agents, the framework has no purpose |
| BF-002 | Command System | User-facing entry point — without commands, there is no structured way to invoke workflows |
| BF-003 | HSOL Skill Resolution | Automated expertise is the efficiency multiplier — without it, agents are generic |
| BF-004 | Execution Topologies | Coordination patterns define how agents collaborate — without them, only sequential execution is possible |
| BF-005 | Golden Triangle Teams | Adversarial quality assurance is the primary differentiator from self-review AI tools |
| BF-006 | CLI Global Install | Distribution mechanism — without global install, per-project setup ceremony returns |
| BF-007 | Guardrails & Security | Safety enforcement is non-negotiable for production usage; D4 override is a trust foundation |

## Should-Have Features

These features significantly improve the experience but the framework can function at a basic level without them.

| Feature ID | Feature | Rationale |
|------------|---------|-----------|
| BF-008 | Tiered Context Loading | Context efficiency matters on token-limited platforms, but framework works (less efficiently) without tiers |
| BF-009 | Checkpoint-Resume | Durability is important for long workflows, but shorter workflows complete without it |
| BF-010 | Cross-Platform Parity | Parity improves consistency, but framework can operate on individual platforms independently |
| BF-011 | Documentation Suite | Self-documenting projects improve agent context, but agents can work with manual documentation |

## Could-Have Features

These features enable future growth and refinement but are not required for current operational value.

| Feature ID | Feature | Rationale |
|------------|---------|-----------|
| BF-012 | Voice Coherence | Tone consistency is a polish feature; agents function correctly without it |
| BF-013 | Pattern Extraction | Cross-workflow learning improves over time but is not required for individual workflow success |
| BF-014 | Community Extension Tiers | Ecosystem governance becomes important at scale; not critical while core team maintains all content |

## Evidence Sources

- [README.md](../../../README.md) — Feature positioning and comparison table
- [business-prd/02-problem-goals-and-scope.md](../business-prd/02-problem-goals-and-scope.md) — Goals informing priority
