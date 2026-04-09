# Business PRD

> **Purpose**: Product Requirements Document for Agent Assistant — mission, scope, stakeholders, requirements, and risk assessment.
> **Sub-files**: 4
> **Last Updated**: 2026-04-09

## Quick Summary

Agent Assistant is a global multi-agent orchestration framework for AI coding tools, published as `@namch/agent-assistant` on npm. It transforms a single AI assistant into a governed engineering organization with 21 specialist agents, 1430+ domain skills, structured workflows, adversarial review via Golden Triangle teams, quality gates, and resumable execution across 6 supported platforms.

The product addresses fundamental weaknesses in current AI-assisted development: single-voice self-review, per-project setup ceremony, lost context on interruption, and platform fragmentation. The solution is an install-once global framework that brings specialization, structured opposition, and operational rigor to every project.

Version 2.0.0 represents a major release with unified entry point generation, 6-platform parity, security hardening, intelligence features (durable execution, context decay detection, voice coherence), and the Hybrid Skill Orchestration Layer (HSOL).

## Sub-Files

| File | Description |
|------|-------------|
| [01-executive-summary.md](./01-executive-summary.md) | Mission, value proposition, and target outcomes |
| [02-problem-goals-and-scope.md](./02-problem-goals-and-scope.md) | Problem statement, goals, non-goals, and scope boundaries |
| [03-stakeholders-and-requirements.md](./03-stakeholders-and-requirements.md) | Stakeholder map, functional and non-functional requirements, traceability |
| [04-acceptance-risks-assumptions.md](./04-acceptance-risks-assumptions.md) | Acceptance criteria, risks, assumptions, and open questions |

## Key Facts

| Key | Value |
|-----|-------|
| Product Name | @namch/agent-assistant |
| Version | 2.0.0 |
| License | MIT |
| Author | NamCH |
| Target Users | Developers using AI coding tools |
| Platforms | Cursor, Copilot, Claude Code, Codex, Antigravity (Gemini), Qwen |
| Agent Count | 21 specialists + 17 Golden Triangle teams |
| Skill Count | 1430 matrix skills across 19 domains |
| Command Count | 17 routers with 50+ workflow variants |

## Cross-References

- [knowledge-overview](../../knowledge-overview/00-index.md) — Project identity and tech stack
- [knowledge-domain](../../knowledge-domain/00-index.md) — Domain entities and business rules
- [knowledge-architecture](../../knowledge-architecture/00-index.md) — System design and components
- [business-features](../business-features/00-index.md) — Feature inventory and prioritization
- [business-workflows](../business-workflows/00-index.md) — Workflow catalog and actor map

## Known Gaps and Open Questions

- Pricing and monetization model is not defined — currently MIT open source
- User analytics and telemetry are not implemented; adoption metrics are not tracked
- Performance benchmarks are based on internal testing; community benchmarks are not yet published
- The companion documentation website (Vercel) evolves independently from the core framework
