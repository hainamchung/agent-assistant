# Knowledge Overview

> **Purpose**: Project introduction, goals, technology stack, and getting started guide.
> **Sub-files**: 4
> **Last Updated**: 2026-04-09

## Quick Summary

Agent Assistant is a global multi-agent orchestration framework for AI coding tools. It transforms a single AI assistant into a governed engineering organization with 21 specialist agents, 1400+ domain skills, structured workflows, adversarial review, quality gates, and resumable execution. The framework installs once globally and becomes available for every project across 6 supported platforms: Cursor, GitHub Copilot, Claude Code, Codex, Antigravity (Gemini), and Qwen.

The project is authored by NamCH, published as `@namch/agent-assistant` on npm, and licensed under MIT. It is a Node.js CLI package (>=18.0.0) with a companion React documentation website. The framework operates via document-driven orchestration — agents, commands, rules, and skills are all Markdown/YAML files loaded by the AI model at runtime.

Version 2.0.0 introduced unified entry point generation, 6-platform parity, security hardening, intelligence features (durable execution, context decay detection, voice coherence), and the Hybrid Skill Orchestration Layer (HSOL) with 1430 matrix skills across 19 domains.

## Sub-Files

| # | File | Description |
|---|------|-------------|
| 01 | [01-project-identity.md](./01-project-identity.md) | Name, version, purpose, vision, mission, and First 60 Minutes onboarding |
| 02 | [02-tech-stack.md](./02-tech-stack.md) | Categorized technology stack with versions and evidence |
| 03 | [03-features.md](./03-features.md) | Key features, metrics, and capabilities |
| 04 | [04-getting-started.md](./04-getting-started.md) | Prerequisites, installation, first run, and testing |

## Quick Facts

| Key | Value |
|-----|-------|
| Name | @namch/agent-assistant |
| Version | 2.0.0 |
| Type | CLI + Orchestration Framework |
| Language | JavaScript (Node.js) + Markdown |
| License | MIT |
| Author | NamCH |
| Platforms | 6 (Cursor, Copilot, Claude, Codex, Antigravity, Qwen) |
| Agents | 21 specialists + 17 Golden Triangle teams |
| Skills | 1430 matrix skills across 19 domains |
| Commands | 17 routers with 50+ workflow variants |

## Cross-References

- [knowledge-source-base/](../knowledge-source-base/00-index.md) — Directory structure and code organization
- [knowledge-architecture/](../knowledge-architecture/00-index.md) — System design and component interactions
- [knowledge-domain/](../knowledge-domain/00-index.md) — Domain entities and data models
- [knowledge-standards/](../knowledge-standards/00-index.md) — Coding standards and conventions

## Known Gaps and Open Questions

- Exact skill count varies as the community skill library grows; 1430 is the current matrix count from `_index.yaml`
- The web documentation site at `agent-assistant-ten.vercel.app` is a companion project; its feature set may evolve independently
- Performance benchmarks referenced in README are based on internal testing; community benchmarks are not yet published
