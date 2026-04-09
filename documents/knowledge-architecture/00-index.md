# Knowledge Architecture

> **Purpose**: System design, component interactions, data flow, design patterns, and architectural decisions.
> **Sub-files**: 5
> **Last Updated**: 2026-04-09

## Quick Summary

Agent Assistant uses a document-driven multi-agent architecture where Markdown files serve as executable instructions loaded into an AI model's context window at runtime. The architecture contains six primary layers: CLI (install tooling), Content (agents/commands/rules/skills as Markdown/YAML), Orchestration Runtime (the AI model itself), Execution Topologies (coordination patterns), Guardrails (safety constraints), and Web UI (documentation site).

The system has no traditional backend server, database, or HTTP API. Instead, the AI coding model is both the execution engine and the user interface. Files flow into context through a tiered loading protocol, agents coordinate through handoff declarations in their frontmatter, and quality is enforced through behavioral constraints embedded in the document corpus.

## Sub-Files

| # | File | Description |
|---|------|-------------|
| 01 | [01-system-overview.md](./01-system-overview.md) | High-level system topology and component map |
| 02 | [02-components.md](./02-components.md) | Detailed component breakdown with interfaces |
| 03 | [03-data-flow.md](./03-data-flow.md) | Data flow diagrams and request lifecycle |
| 04 | [04-design-patterns.md](./04-design-patterns.md) | Key design patterns and their implementations |
| 05 | [05-decisions.md](./05-decisions.md) | Architectural Decision Records (ADRs) |

## Cross-References

- [knowledge-source-base/](../knowledge-source-base/00-index.md) — WHERE code lives (directory map)
- [knowledge-overview/](../knowledge-overview/00-index.md) — WHAT the project is (identity and tech stack)
- [knowledge-domain/](../knowledge-domain/00-index.md) — Domain entities and data models
- [knowledge-standards/](../knowledge-standards/00-index.md) — Coding standards and conventions
