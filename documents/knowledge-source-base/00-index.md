# Knowledge Source Base

> **Purpose**: Directory structure, file purposes, entry points, key modules, and code organization for AI agents and developers.
> **Sub-files**: 4
> **Last Updated**: 2026-04-09

## Quick Summary

Agent Assistant is a multi-agent orchestration framework organized as a monorepo with a root Node.js package and a `web/` subproject. The root package contains the CLI tooling, agent definitions, command workflows, protocol rules, execution topologies, guardrails, persona configurations, and a massive skill library (~1400+ domain skills). The `web/` directory houses a React + Vite website for documentation and gallery features.

The project's architecture is entirely file-driven: agents, commands, topologies, guardrails, and rules are all Markdown or YAML files following strict frontmatter schemas. JavaScript is used exclusively for CLI tooling (`cli/`), validation/linting scripts (`scripts/`), and the web UI (`web/`). There is no traditional backend server or database.

The codebase scales by adding new Markdown/YAML files rather than writing new application code, making it a content-heavy framework where the "source code" is primarily protocol documents.

## Sub-Files

| # | File | Description |
|---|------|-------------|
| 01 | [01-directory-structure.md](./01-directory-structure.md) | Complete annotated directory tree with purpose of each top-level directory |
| 02 | [02-entry-points.md](./02-entry-points.md) | CLI entry points, boot sequence, build scripts, and configuration entry points |
| 03 | [03-key-modules.md](./03-key-modules.md) | Detailed breakdown of all major modules and their internal structure |
| 04 | [04-configuration.md](./04-configuration.md) | Configuration files inventory, environment variables, and platform settings |

## Quick Facts

| Key | Value |
|-----|-------|
| Total files (excl. skills/node_modules) | ~456 |
| Total directories (excl. skills/node_modules) | ~180 |
| Primary language | JavaScript (Node.js), Markdown |
| Monorepo | Yes — root package + web/ subproject |
| Package name | @namch/agent-assistant |
| Entry point | cli/install.js |
| Node.js requirement | >=18.0.0 |

## Read Order for New Members

1. **README.md** — Project purpose, installation, command overview
2. **CONTRIBUTING.md** — Development setup and standards
3. **package.json** — Scripts, dependencies, project metadata
4. **rules/RUNTIME.md** — Core orchestration protocol (single source of truth)
5. **agents/** — Browse 2-3 agent files to understand the agent schema
6. **commands/** — Browse a command router + variant to understand workflow structure
7. **cli/install.js** — How the framework gets installed globally
8. **schemas/agent-schema.md** — Formal schema for agent frontmatter

## Cross-References

- [knowledge-overview/](../knowledge-overview/00-index.md) — Project identity and tech stack
- [knowledge-architecture/](../knowledge-architecture/00-index.md) — How components interact and data flows
- [knowledge-standards/](../knowledge-standards/00-index.md) — Naming conventions and coding standards

## Known Gaps and Open Questions

- The `skills/` directory contains ~1400+ subdirectories; a complete inventory is not feasible in this document. See `skills/_summary.yaml` and `matrix-skills/_index.yaml` for the registry.
- The `web/` subproject's full internal structure is documented at a high level; detailed component-by-component analysis is deferred to a potential web-specific knowledge document.
- The `ai-docs/` directory purpose and contents were not deeply explored.
