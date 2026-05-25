# Knowledge Source Base

> **Folder**: `.documents/knowledge-source-base/`
> **Purpose**: Source code structure, entry points, and configuration
> **Audience**: Developers, contributors, anyone modifying the codebase

---

## Summary

The Agent Assistant source base is organized into distinct functional areas: CLI tooling, agent definitions, command system, rules engine, skill registry, and web application. Understanding the source base structure is essential for contributing, debugging, or extending the framework.

This folder provides the complete source code documentation including directory structure, entry points, key modules, and configuration.

---

## Sub-Files

| File | Title | Purpose | Audience |
|------|-------|---------|----------|
| `00-index.md` | Source Base Index | Navigation and overview | All |
| `01-directory-structure.md` | Directory Structure | Annotated project tree | Developers |
| `02-entry-points.md` | Entry Points | CLI and web entry files | Developers |
| `03-key-modules.md` | Key Modules | Per-module breakdown | Developers |
| `04-configuration.md` | Configuration | Config files and options | Developers |

---

## Quick Facts

| Attribute | Value |
|-----------|-------|
| **CLI Language** | JavaScript ES2022+ |
| **Web Language** | TypeScript |
| **CLI Entry** | `cli/install.js` (1716 lines) |
| **Web Entry** | `web/src/main.tsx` |
| **Agent Count** | 24 files |
| **Command Count** | 14 + variants |
| **Rule Count** | 8 files |

---

## Read Order for New Members

If you're new to the project, follow this order:

| Step | File | Time | Purpose |
|------|------|------|---------|
| 1 | `01-directory-structure.md` | 10 min | Understand layout |
| 2 | `02-entry-points.md` | 15 min | Know where to start |
| 3 | `04-configuration.md` | 10 min | Understand config |
| 4 | `03-key-modules.md` | 30 min | Deep dive modules |
| 5 | Start exploring | — | Actual code |

---

## Cross-References

| Reference | Destination | Relationship |
|-----------|-------------|--------------|
| Architecture | `../knowledge-architecture/00-index.md` | System design |
| Domain | `../knowledge-domain/00-index.md` | Entities and rules |
| Standards | `../knowledge-standards/00-index.md` | Conventions |

---

## Known Gaps

| Gap | Status | Notes |
|-----|--------|-------|
| Module API docs | Pending | Code-level docs |
| JSDoc comments | Partial | Some files need docs |
| TypeScript types | Pending | Missing type definitions |

---

## Evidence Sources

- `cli/install.js` — CLI implementation
- `agents/` — Agent definitions
- `commands/` — Command definitions
- `rules/` — Rule definitions
- `skills/` — Skill registry
- `matrix-skills/` — Skill tiers
- `code-assistants/` — Platform configs
- `web/` — React application
