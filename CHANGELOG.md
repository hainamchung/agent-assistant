# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.2] - 2026-03-30

### Removed
- **Focus workflow variant deprecation (complete)**:
  - Removed remaining focus workflow files and command-level focus routing references.
  - Removed focus variant mentions from active command metadata and workflow documentation.
  - Removed stale focus references from business analysis docs that still listed `fast/hard/focus/team`.

### Changed
- **Changelog and docs normalization after focus cleanup**:
  - Updated changelog wording to avoid legacy focus workflow terminology in active release notes.
  - Kept accessibility/UI focus semantics (e.g., `:focus`, `:focus-visible`) untouched where they are unrelated to command variants.

## [1.3.1] - 2026-03-26

### Changed
- **Documentation Workflows — Folder-Based Architecture**: Migrated all 3 `/docs` sub-command workflows from single-file to folder-based structure for greater detail and maintainability
  - **`/docs:core` (v3.0)**: 5 knowledge folders, each with `00-index.md` + numbered sub-files. Added MIGRATE mode for legacy flat-file-to-folder conversion, Thinking Protocol (7-question pre-write checklist), Anti-Shallow Guardrails, and Mode Detection table with per-folder CREATE/UPDATE/MIGRATE resolution
  - **`/docs:business` (v4.0)**: 4 business folders with folder-based structure. Added MIGRATE mode, Thinking Protocol (5-question checklist), Anti-Shallow Guardrails, and Business Evidence Ledger
  - **`/docs:audit` (v4.0)**: 4 audit folders with folder-based structure. Added MIGRATE mode, Thinking Protocol (5-question security-focused checklist), and Signal Precision Rules
  - **`/docs` router (v2.0)**: Updated sequential execution flow references to match new folder-based deliverables and corrected version references
- **Cross-Workflow Consistency**: Harmonized agent roles (`docs-manager` for generation phase), mode rules (CREATE/UPDATE/MIGRATE), quality mechanisms (Thinking Protocol, Evidence Ledger), and exit criteria across all 3 workflows

## [1.3.0] - 2026-03-23

### Added
- **1400+ Domain Skills**: Massive expansion from 310+ to 1400+ skills across 19 domains
  - Added 1000+ new skill definitions covering broader technology stacks and specialized domains
  - Updated matrix-skills registries with new skill entries
  - All existing agents benefit automatically via Matrix Skill Discovery (HSOL)

## [1.2.2] - 2026-03-12

### Fixed
- **Context Gate Enforcement**: Remove context gate because it was causing more issues than it solved (complexity, maintenance, AI bypass). Instead, rely on agent-specific blocking checkpoints within the Golden Triangle protocol for guaranteed input validation and clean execution.
  - Removed `rules/CONTEXT-GATE.md` and all references to it in command files
  - Updated all team command files to rely solely on phase-specific blocking checkpoints (P2–P7) for input validation
  - Updated documentation to reflect removal of context gate and new reliance on phase checkpoints for clean execution

## [1.2.1] - 2026-03-12

### Fixed
- **Agents tool**: Remove constant definition of `{TOOL}` in agent files. Use tool:all for dynamic resolution instead of hardcoding specific tools. This allows for proper placeholder replacement and multi-platform support.
  - Updated all agent files in `agents/` to remove `{TOOL}` constant and use `tool:all` for platform resolution.

## [1.2.0] - 2026-03-09

### Added

- **Agent Teams — Golden Triangle Architecture**: Adversarial collaboration system with 17 specialized domain teams
  - **17 Domain Teams**: backend, frontend, fullstack, database, research, planning, qa, design, debug, devops, security, game, mobile, performance, docs, project, report
  - **51 Team Agent Files**: Each team has 3 role-specific agents (`techlead.md`, `executor.md`, `reviewer.md`) under `agents/teams/{domain}-team/`
  - **Golden Triangle Protocol**: Structured debate mechanism — Tech Lead decomposes, Executor builds & defends, Reviewer challenges & validates
  - **Mailbox Communication**: Append-only `./reports/{topic}/MAILBOX-{date}.md` for traceable inter-agent communication (TASK_ASSIGNMENT, SUBMISSION, REVIEW, DEFENSE, ARBITRATION, DECISION)
  - **Consensus Protocol**: Three resolution paths — Clean Pass, Resolved Pass (after defense/fix), Arbitrated Pass (Tech Lead binding decision after max 3 rounds)
  - **`:team` Command Variants**: 9 team-enabled commands — `/cook:team`, `/fix:team`, `/debug:team`, `/test:team`, `/review:team`, `/plan:team`, `/design:team`, `/report:team`, `/deploy:team`
  - **Rules**: `rules/TEAMS.md` (530 lines) — complete Golden Triangle protocol, team roster, debate mechanism, consensus stamp format
  - **Rules Updates**: `rules/PHASES.md` and `rules/AGENTS.md` updated with Golden Triangle phase output format and team execution support
  - **Web**: New `/features/agent-teams` page showcasing the Golden Triangle architecture, 17 teams roster, debate mechanism, and consensus protocol. Added route, navigation, and SEO config.

- **Codex Support**: Full integration of OpenAI Codex as supported platform (`~/.codex/`)
  - **CLI**: `installCodex()` / `uninstallCodex()` functions, `install:codex` / `uninstall:codex` npm scripts
  - **Entry Points**: `~/.codex/AGENTS.md` (primary discovery), `CODEX.md` (compat), and `code-assistants/codex-assistant/CODEX.md` (source template)
  - **Codex Assistant**: Full `code-assistants/codex-assistant/` with `config.toml`, 21 agent TOML files, and skill TOML configs
  - **Platform Resolution**: Added `codex → .codex` in `rules/CORE.md` and `AGENT.md`
  - **Web**: Platform data, comparison features, SEO config, and metrics updated
- **Codex Support**: Full integration of OpenAI Codex as 5th supported platform (`~/.codex/`)
  - **CLI**: `installCodex()` / `uninstallCodex()` functions, `install:codex` / `uninstall:codex` npm scripts
  - **Entry Points**: `~/.codex/AGENTS.md` (primary discovery), `CODEX.md` (compat), and `code-assistants/codex-assistant/CODEX.md` (source template)
  - **Platform Resolution**: Added `codex → .codex` in `rules/CORE.md` and `AGENT.md`
  - **Web**: Platform data, comparison features, SEO config, and metrics updated
  - **Documentation**: README, CLI README, knowledge docs, architecture docs, and HSOL blueprint updated

## [1.1.1] - 2026-02-05

### Fixed

- **Path Placeholder Resolution**: Fixed critical issue where `{TOOL}`, `{TOOL}`, `~/.{TOOL}/` placeholders were not properly replaced during installation
  - Added missing replacement patterns to all tools in `cli/install.js`
  - Paths now correctly resolve to `~/.copilot/`, `~/.cursor/`, `~/.claude/`, `~/.gemini/antigravity/`
- **Agent File Formats**: Fixed corrupted YAML frontmatter in agent entry files
  - Removed invalid code fence wrappers from Copilot and Antigravity agent files
  - Files now parse correctly as proper YAML + Markdown
- **Claude Install**: Added missing `AGENT.md` copy (was only copying `CLAUDE.md`)
- **Enforcement Language**: Strengthened all entry point files with mandatory boot sequence
  - Added `⛔ MANDATORY BOOT SEQUENCE` block that BLOCKS execution until CORE.md is loaded
  - Changed passive "should load" to active "MUST load IMMEDIATELY"
  - Added explicit prohibition statements (NEVER, FORBIDDEN, ABSOLUTE BINDING)

### Changed

- **CORE.md v4.1**: Updated paths section with platform resolution table and clearer examples
- **Entry Files**: Rewrote COPILOT.md, CLAUDE.md, AGENT.md, GEMINI.md with stronger enforcement
- **Replacement Order**: Sorted replacement keys by length (longest first) to prevent partial replacements

## [1.1.0] - 2026-02-03

### Added

- **Context Gate Centralization**: Eliminated ~1,200 lines of duplicate Context Gate logic across command files by centralizing into single source of truth
  - **`rules/CONTEXT-GATE.md`**: 362-line comprehensive protocol file with FOCUS MODE (automatic) and HARD MODE (user choice)
  - **3-Layer Enforcement**: BLOCKING directive + sequential flow placement + verification checklist to prevent AI skip
  - **5-step RELOAD_ESSENTIAL_CONTEXT**: User Request → Acceptance Criteria → Plan/Strategy → Remaining Phases → Implementation Rules
  - **Variant-aware execution**: Special handling for debug (OUTPUT_ESSENTIAL_CONTEXT handoff), design (review phase), test (strategy source)
- **HSOL Documentation**: Added comprehensive Hybrid Skill Orchestration Layer planning documents
  - **Blueprint**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md` — architecture for dynamic skill resolution
  - **Assessment**: `documents/HSOL-ASSESSMENT.md` — production readiness evaluation
  - **Manifest**: `matrix-skills/_dynamic.yaml` — tracking for dynamically installed community skills
  - **Knowledge base**: Updated `documents/knowledge-architecture/` folder, `documents/knowledge-source-base/` folder with HSOL references

### Changed

- **All command variants**: Updated 12 command files (6 focus + 6 hard) to reference centralized Context Gate protocol
  - **Focus variants** (`/code:focus`, `/cook:focus`, `/fix:focus`, `/debug:focus`, `/design:focus`, `/test:focus`): Replaced ~80-100 lines of inline Context Gate logic with ~19-line minimal reference
  - **Hard variants** (`/code:hard`, `/cook:hard`, `/fix:hard`, `/debug:hard`, `/design:hard`, `/test:hard`): Replaced ~100 lines of verification checkpoint logic with ~19-line minimal reference
  - **Pattern**: Each file now loads `rules/CONTEXT-GATE.md` with BLOCKING directive and variant-specific adjustments
- **Code reduction**: 52% less code (~1,200 lines → ~580 lines references + 362 lines centralized)
- **Maintenance**: Reduced from updating 12 files manually to updating 1 centralized file (92% easier maintenance)

## [1.0.4] - 2026-01-30

### Added

- **Plan-already-provided short-circuit**: `/code:hard` and `/code:focus` now detect when the user references an existing plan (`@plan`, `@PLAN-...`, path to `PLAN-*.md`, or phrases like "according to plan" / "follow the plan"). When a valid plan exists, **research, scout, and brainstorm phases are skipped** and execution goes straight to context optimization → implementation → test → review.

### Changed

- **`commands/code.md`**: Routing logic updated so that when the user references an existing plan, the router directs to `/code:hard` or `/code:focus` (workflow then skips redundant phases).
- **`commands/code/hard.md`** and **`commands/code/focus.md`**: New section "PLAN-ALREADY-PROVIDED: SKIP REDUNDANT PHASES" with detection rules and resolution (skip Phase 1–3 when plan provided).

## [1.0.3] - 2026-01-30

### Added

- **Reporter Agent**: New `reporter` agent for documentation and reporting (create/update reports, template-based output).
- **Report Command**: `/report` with variants `auto`, `fast`, `hard`, `focus` — status updates, deep analysis, and focus mode with context optimization.
- **Focus Variant**: For all applicable commands (`cook`, `code`, `fix`, `debug`, `design`, `plan`, `test`) — **Clear context** and **auto-run phases** for guaranteed clean execution without context rot.
- **Matrix-Skills**: Updated `matrix-skills/_index.yaml` with reporter profile and domain mappings.

### Changed

- **Commands**: Router workflows now support **Clear context** and **focus** variant (force clear context, auto run phase) across cook, code, fix, debug, design, plan, test.
- **Documentation**: README, AGENT.md, CLAUDE.md, CURSOR.md, COPILOT.md, GEMINI.md, rules, code-assistants, web data, and documents updated for reporter, `/report`, and focus variants.

## [1.0.2] - 2026-01-30

### Added

- **Web Integration**: Added `web` directory content and resources.
- **Documentation**: Updated `README.md` with comprehensive usage instructions and project details.

## [1.0.1] - 2026-01-29

### Added

- **Matrix Skills Integration**: Implemented a massive library of 2000+ specialized skills (`matrix-skills`) to enhance agent capabilities.
- Improved skill discovery and routing mechanisms.

## [1.0.0] - 2026-01-26

### Added

- **Initial Release**: First stable release of `@namch/agent-assistant`.
- **Core Orchestration**: Framework for managing multi-agent workflows.
- **CLI Tool**: `agent-assistant` CLI for easy installation and management.
- **Multi-Assistant Support**: Compatibility with Cursor, GitHub Copilot, Claude Code, Codex, and Antigravity.
