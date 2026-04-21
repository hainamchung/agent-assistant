# Knowledge Source Base

> **Purpose**: Comprehensive technical knowledge base for the @namch/agent-assistant project — a multi-agent orchestration framework for AI coding assistants
> **Sub-files**: 4
> **Last Updated**: 2026-03-26

---

## Quick Summary

Agent Assistant is a plugin-based orchestration framework (v1.3.0) that installs Markdown and YAML configuration files into AI coding tool directories (Cursor, GitHub Copilot, Antigravity/Gemini, Claude Code, and Codex). The framework implements a Hybrid Skill Orchestration Layer (HSOL) that dynamically resolves and injects skills from a matrix of 1,430 skill definitions across 19 domains. It operates as a pure CLI tool built on Node.js >=18.0.0 using only built-in modules (fs, path, os, readline) with zero production dependencies.

The core architecture centers on an Orchestrator pattern: an AI coding assistant reads the platform entry point file (CURSOR.md, COPILOT.md, CLAUDE.md, CODEX.md, or GEMINI.md), which bootstraps it into the Orchestrator role. The Orchestrator then delegates work to 21 specialist agents (plus 51 team agents across 17 teams) using 14 command workflows with 47 variant strategies. Skills are resolved through the matrix-skills YAML registry and optionally enhanced by dynamic discovery via the find-skills mechanism.

The project also includes a separate React 19 + Vite + Tailwind marketing website under the `web/` directory, deployed to Vercel, and uses semantic-release with conventional commits for automated versioning and npm publishing.

---

## Table of Contents

1. [Quick Summary](#quick-summary)
2. [Sub-Files](#sub-files)
3. [Quick Facts](#quick-facts)
4. [Cross-References](#cross-references)
5. [Known Gaps and Open Questions](#known-gaps-and-open-questions)

---

## Sub-Files

| File | Description |
|------|-------------|
| [01-directory-structure.md](./01-directory-structure.md) | Complete annotated directory tree (depth 3-4) with purpose of every top-level directory |
| [02-entry-points.md](./02-entry-points.md) | Application entry files, CLI boot sequence, build entry points, and config entry points |
| [03-key-modules.md](./03-key-modules.md) | Per-module breakdown: purpose, exports, dependencies, and internal structure for all major modules |
| [04-configuration.md](./04-configuration.md) | Configuration files inventory, environment variables, secrets management, and platform-specific configs |

---

## Quick Facts

| Key | Value |
|-----|-------|
| Package Name | `@namch/agent-assistant` |
| Version | 1.3.0 |
| License | MIT |
| Author | NamCH |
| Runtime | Node.js >=18.0.0 |
| Module System | CommonJS (CLI), ESM (web) |
| Production Dependencies | 0 (zero) |
| Dev Dependencies | 10 (semantic-release ecosystem + husky) |
| CLI Entry Point | `cli/install.js` |
| Supported Platforms | Cursor, GitHub Copilot, Antigravity (Gemini), Claude Code, Codex |
| Solo Agents | 21 Markdown files |
| Team Directories | 17 teams × 3 roles (executor, reviewer, techlead) = 51 team agents |
| Total Agent Files | 72 |
| Commands | 14 router files + 47 variant files = 61 total |
| Matrix Skill Domains | 19 YAML registries + _index.yaml + _dynamic.yaml |
| Total Skills | 1,430 skill folders (each containing SKILL.md) |
| Rule Files | 7 (CORE, PHASES, AGENTS, SKILLS, TEAMS, ERRORS, REFERENCE) |
| Code Assistant Templates | 5 (cursor, copilot, antigravity, claude, codex) |
| Web Framework | React 19 + Vite + Tailwind CSS 4 |
| Web Deployment | Vercel |
| Release Automation | semantic-release with conventional commits |
| Branch Strategy | `main` (single release branch) |

---

## Read Order for New Members

1. **Start here** — Read this index to understand scope and structure
2. **[01-directory-structure.md](./01-directory-structure.md)** — Get oriented with where everything lives
3. **[02-entry-points.md](./02-entry-points.md)** — Understand how the system boots and what runs
4. **[03-key-modules.md](./03-key-modules.md)** — Deep dive into each module's internals
5. **[04-configuration.md](./04-configuration.md)** — Learn the configuration landscape
6. **`rules/CORE.md`** — Read the Orchestrator protocol (the "operating system" for agents)
7. **`AGENT-TEMPLATE.md`** — Understand how agents are structured with Matrix Skill Discovery
8. **`matrix-skills/_index.yaml`** — See how HSOL skill resolution works

---

## Cross-References

- **HSOL Architecture**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md` — Full design document for the Hybrid Skill Orchestration Layer
- **HSOL Assessment**: `documents/HSOL-ASSESSMENT.md` — Evaluation and analysis of the HSOL system
- **CLI Documentation**: `cli/README.md` — CLI-specific usage guide and examples
- **Orchestrator Rules**: `rules/CORE.md` — The core protocol that governs how the Orchestrator operates
- **Phase Execution**: `rules/PHASES.md` — How command phases are structured and executed
- **Agent Definitions**: `rules/AGENTS.md` — Tiered execution model (sub-agent vs. embodiment)
- **Skill Resolution**: `rules/SKILLS.md` — How skills are discovered and injected
- **Team Protocol**: `rules/TEAMS.md` — How multi-agent teams coordinate
- **Error Recovery**: `rules/ERRORS.md` — Error handling and recovery procedures
- **Agent Template**: `AGENT-TEMPLATE.md` — Standard structure for all agent files with Matrix Skill Discovery frontmatter
- **Changelog**: `CHANGELOG.md` — Version history and release notes
- **Web Site README**: `web/README.md` — Marketing site documentation

---

## Known Gaps and Open Questions

1. **No automated test suite**: `cli/install.test.js.example` exists as an example but no actual test file is committed; the `npm test` script (`node --test cli/*.test.js`) would find no tests to run unless the example is renamed
2. **Web app environment variables**: The Vercel-hosted marketing site may use environment variables, but none are documented in the repository (`.env` is gitignored)
3. **Skill SKILL.md format specification**: While `AGENT-TEMPLATE.md` documents the agent file format, there is no equivalent template for skill SKILL.md files
4. **Dynamic skill manifest**: `matrix-skills/_dynamic.yaml` exists for community-installed skills but its exact schema and lifecycle are defined only in the `_index.yaml` header comments
5. **Platform-specific differences**: Each code-assistant template (cursor, copilot, etc.) handles installation slightly differently with unique assets and path structures, but there is no unified comparison document
6. **Husky hooks**: The `.husky/` directory contains only a `_/` subfolder; the actual git hook scripts are not visible in the directory listing, suggesting they may be generated or missing
7. **Web app deployment pipeline**: `web/vercel.json` exists with rewrite rules, but the CI/CD pipeline for the web app (separate from the CLI semantic-release) is not documented in the repository
