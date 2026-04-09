# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-04-09

> Major release: unified entry point generation, 6-platform parity, security hardening,
> and intelligence features. Changes grouped by development phase below.

### Refinement & Future-Proofing

#### Added
- **Cultural Localization** (Phase 1): `personas/locales/` directory with 3 locale packs (`en-US`, `vi-VN`, `ja-JP`) — cultural communication patterns, formality levels, domain glossaries
- **Localization Rules** (Phase 1): `rules/LOCALIZATION.md` — resolution protocol, domain glossary application, fallback chain
- **Rollback Protocol** (Phase 1): `rules/ROLLBACK.md` — pre-workflow snapshot capture, stash-based rollback, audit logging
- **Rollback Script** (Phase 1): `scripts/rollback.js` — git-first rollback with non-git fallback, `npm run rollback`
- **Handoff Compression** (Phase 2): `rules/HANDOFF-COMPRESSION.md` — 3-tier compression algorithm (minimal ~70%, standard ~40%, full 0%) with CRITICAL preservation
- **Token Prediction** (Phase 2): `rules/TOKEN-PREDICTION.md` — pre-execution cost estimation formula, base cost constants, warning thresholds, calibration protocol
- **Prediction Script** (Phase 2): `scripts/predict-cost.js` — token cost estimation with `--verbose` and `--json` modes, `npm run predict:cost`
- **Topology Override** (Phase 3): Per-phase topology override syntax in command YAML frontmatter (`topology-overrides:` field)
- **Pattern Extraction** (Phase 3): `rules/PATTERN-EXTRACTION.md` — 4 pattern categories (agent-selection, topology, error-recovery, performance), privacy controls, opt-in mechanism
- **Extraction Script** (Phase 3): `scripts/extract-patterns.js` — post-workflow pattern learning with `--dry-run`, `--category`, `--limit` flags
- **Community Tiers** (Phase 4): `rules/COMMUNITY-TIERS.md` — 4-tier progressive trust model (newcomer→contributor→trusted→maintainer) with badges and promotion criteria
- **Contributor Manifest** (Phase 4): `.agent-assistant/contributors.json` — template with schema versioning and configurable settings
- **Locale Lint Validation**: `scripts/lint-rules/locale-validation.js` + `yaml-lite.js` — validates locale pack schema, field types, filename patterns
- **Topology Lint Validation**: `scripts/lint-rules/topology-validation.js` — validates topology-overrides against actual `topologies/` directory
- **Community Tier Lint Validation**: `scripts/lint-rules/tier-validation.js` — validates contributor manifest schema, duplicate IDs, ISO-8601 dates
- **Pattern Storage**: `global-patterns.json` — initial schema for cross-workflow pattern storage
- **Project Config**: `.agent-assistant/config.json` — opt-in settings for pattern extraction

#### Changed
- **Persona System**: All 4 persona YAML files (`professional`, `casual`, `mentor`, `academic`) now include `locale: "en-US"` field for cultural adaptation
- **RUNTIME.md**: Added 3 new §LOAD ON DEMAND entries (localization, rollback, handoff compression) within word budget
- **lint-agents.js**: Integrated locale pack, topology override, and contributor tier validation rules
- **package.json**: Added `rollback`, `predict:cost`, `extract:patterns`, `extract:patterns:dry` npm scripts
- **personas/README.md**: Documented locale field, locales/ directory, locale pack schema
- **topologies/README.md**: Added per-phase topology override syntax, resolution protocol, mixed-topology example
- **rules/REFERENCE.md**: Added references to 6 new rules files

### Intelligence & Resilience — Polish to Production

#### Added
- **Durable Execution** (Phase 1): `rules/DURABLE-EXECUTION.md` — checkpoint-resume protocol with JSON schema v1.0, write/resume protocols, stale management (24h TTL), opt-in per command variant
- **Context Decay Detection** (Phase 1): `rules/CONTEXT-DECAY.md` — platform-specific thresholds, two-tier refresh (soft ~200 tokens, hard ~500-800 tokens), phase boundary integration
- **Checkpoint Manager** (Phase 1): `scripts/checkpoint-manager.js` — CLI utility (list/view/prune/clear) with path traversal protection
- **Voice Coherence System** (Phase 2): `rules/VOICE-COHERENCE.md` — 5-level tone scale, command-type→formality mapping, agent adaptation protocol, objective voice markers
- **I/O Pipeline Guardrail** (Phase 2): `guardrails/io-pipeline.md` — 4-stage pipeline (validate→process→format→escalate) with strict/standard/minimal severity levels
- **Validation Gates** (Phase 3): `rules/VALIDATION-GATES.md` — 3 gate types (phase, quality, safety) with structured evaluation protocol
- **Conditional Handoffs** (Phase 3): `rules/CONDITIONAL-HANDOFFS.md` — guard expressions for dynamic agent routing based on errors, complexity, and context
- **Agent Journals** (Phase 3): `rules/AGENT-JOURNALS.md` — per-agent memory system with 4 entry types (decision, observation, warning, recommendation)
- **Gallery Data Generator** (Phase 4): `scripts/generate-gallery-data.js` — extracts agent/command metadata into `web/src/data/generated/gallery.json`
- **Gallery UI Page** (Phase 4): `web/src/pages/features/Gallery.tsx` — filterable agent/command catalog with stats
- **Cross-Project Sharing** (Phase 4): `rules/CROSS-PROJECT.md` — 3 sharing modes (single, monorepo, org-wide) with isolation rules and override protocol
- **Lint Rules**: R019 (voice.adaptation boolean), R020 (voice.deviation_tolerance 0-3), R021-R023 (guardrail_levels validation)
- **npm Scripts**: `checkpoint:list`, `checkpoint:prune`, `generate:gallery`

#### Changed
- `rules/RUNTIME.md` §LOAD ON DEMAND: +6 new rows (checkpoint/resume, context decay, I/O pipeline, validation gates, conditional handoffs, agent journals), existing rows trimmed — word count 3178→3200 (within ≤3200 budget)
- `rules/TEAMS-LITE.md`: Voice Coherence section added at end
- `AGENT-TEMPLATE.md`: `voice:` and `guardrail_levels:` frontmatter fields added
- All 21 agent files: `voice:` field added (adaptation: true, deviation_tolerance: 1 default; reviewer/security-engineer: 0; brainstormer: 2)
- All 4 persona files: `formality_adaptation`, `base_formality`, `override_commands` fields added
- `guardrails/README.md`: io-pipeline module listed
- `scripts/lint-agents.js`: R019-R023 validation rules for voice and guardrail_levels
- `commands/cook/team.md`: On-demand load references for VALIDATION-GATES, AGENT-JOURNALS, CONDITIONAL-HANDOFFS
- `commands/cook/hard.md`: On-demand load references for VALIDATION-GATES, AGENT-JOURNALS
- `commands/fix/hard.md`: On-demand load references for VALIDATION-GATES, CONDITIONAL-HANDOFFS
- `.gitignore`: `.agent-assistant/` entry added
- `web/src/App.tsx`: Gallery route registered at `/features/gallery`

#### Candidates
- **Telemetry & Observability**: Structured logging for workflow metrics, token usage tracking, phase duration analytics
- **Plugin Architecture**: Third-party skill/guardrail registration, community contribution pipeline
- **Interactive Gallery**: Agent detail panels, command playground, live workflow visualization
- **Performance Budgets**: Per-phase token limits, automatic context pruning, lazy skill loading
- **Multi-language Personas**: Persona files with i18n support for non-English team communication

### Maturity — Validate, Diagnose, Discover

#### Added
- **Agent & Workflow Validation Framework** (9.2+9.3): `validate-output.js`, `workflow-regression.js`, `VALIDATION-RULES.md` with 6 mechanical rules (V001-V006)
- **Regression Detection** (16.5): `regression-detect.js`, `baselines/` system with delta thresholds
- **Contextual Help System** (6.2): `/help` command with `overview`, `command`, `agents` variants
- **Agent Debugging Trace Mode** (21.3): `_trace.md` append-only execution log in Working Memory
- **Observable Execution Summary**: Enhanced workflow completion reporting template in REFERENCE.md
- **Self-Diagnosing Agent Preamble** (1.2): `PREFLIGHT-TEMPLATES.md` with 6 category templates, `preflight:` field on all 21 agents
- **Skill Security & Privileges** (10.2+10.3): `SKILL-SECURITY.md`, `trust-manifest.json`, `role-scope:` field on all 21 agents
- **Dynamic Team Assembly** (2.1): Signal keywords in `TEAMS-LITE.md` for all 12 team domains
- **Smart Defaults** (6.3): `PROJECT-DETECTION.md` with 16 detection heuristics and 12 smart default profiles
- **Migration Script** (20.3): `migrate-schema.js` with `add-field` and `set-value` operations
- **Lint Rules**: R017 (validation-rules existence), R018 (preflight field), R300 (role-scope validation), R301 (trust-manifest completeness), R302 (quarantine check)
- **Test Fixtures**: 8 workflow test fixtures for validation testing

#### Changed
- `rules/RUNTIME.md`: Persona Override extracted to REFERENCE.md, trace mode added, `/help` routing added (net: 3178 words, under 3200 cap)
- `rules/REFERENCE.md`: Persona Override section, Execution Summary template added
- `rules/TEAMS-LITE.md`: Dynamic Team Assembly signal keywords section added
- `AGENT-TEMPLATE.md`: Pre-flight Self-Diagnosis section and `preflight:` field added
- All 21 agent files: `preflight:` and `role-scope:` fields added
- `scripts/lint-agents.js`: R018 and R300 rules integrated
- `package.json`: 7 new npm scripts (`validate:output`, `validate:workflow`, `benchmarks:baseline`, `benchmarks:regression`, `migrate`, `verify:sprint4`)

#### Security
- Skill trust levels (core/verified/community) with SHA-256 integrity verification
- Agent `role-scope:` domain boundaries (coordination, implementation, analysis, evaluation, discovery, operations)
- Quarantine process for community skills
- Lint rules R300 (role-scope validation), R301 (trust-manifest completeness), R302 (quarantine check) for security compliance

### BREAKING CHANGES
- **Execution model replaced**: "Sub-agent PRIMARY / EMBODY FALLBACK" → **Role-Based Hybrid** — execution mode determined by agent category, not a fixed rule.
- **New agent category**: `investigation` added (debugger, performance-engineer) — split from `validation`. These agents need shared context (EMBODY), not independence.
- **Category→Mode mapping**: `meta`/`execution`/`investigation`/`support` → EMBODY | `validation`/`research` → SUB-AGENT. Replaces the universal "Sub-agent first" rule.

### Added
- **Context Briefing Template**: Structured context package for SUB-AGENT delegations — facts only, no opinions.
- **Anti-Bias Protocol**: 5-step protocol when validation/research agents must fall back to EMBODY — prevents confirmation bias.
- **Platform Degradation Strategy**: Graceful handling when sub-agent tools unavailable — all EMBODY + Anti-Bias for evaluators.
- **FORBIDDEN Execution Patterns**: 4-rule matrix preventing wrong mode assignments (e.g., SUB-AGENT for Tech Lead, EMBODY for Reviewer without Anti-Bias).

### Changed
- `rules/RUNTIME.md` — §EXECUTION MODEL completely rewritten: Role-Based Hybrid with category-based mode selection, pseudocode logic, Context Briefing, Anti-Bias Protocol.
- `rules/REFERENCE.md` — Agent table now includes "Execution Mode" column; Quick Check rewritten for hybrid model.
- `rules/TEAMS-LITE.md` — §SUB-AGENT EXECUTION updated: Tech Lead + Executor → EMBODY, Reviewer → SUB-AGENT.
- All 7 root entry points — Execution model tables updated to 3-row hybrid; EMBODY Exception renamed to "Sanctioned Role-Shift".
- All 7 code-assistant files — Execution model sections updated to Role-Based Hybrid.
- All 42 command variant files — Tier tables and YAML blocks updated to category-based model.
- `agents/debugger.md` — `category: validation` → `category: investigation`.
- `agents/performance-engineer.md` — `category: validation` → `category: investigation`.
- `scripts/lint-agents.js` — `VALID_CATEGORIES` updated to include `investigation`.
- `AGENT-TEMPLATE.md` — Category enum and profile values table updated to current 6 categories.
- `README.md` — Execution Model table updated.
- `topologies/fan-out.md`, `topologies/round-robin.md` — Removed "(primary)"/"(fallback)" labels.
- `rules/ERRORS.md` — Fallback language updated to mention Anti-Bias Protocol.

### BREAKING CHANGES
- **Execution model priority inverted**: Sub-agent is now **PRIMARY** (mandatory when tool exists), EMBODY is **FALLBACK ONLY** (when sub-agent tool unavailable). Previous naming "Standard (default) = EMBODY" / "Enhanced = Sub-agent" replaced with explicit "Sub-agent (PRIMARY)" / "EMBODY (FALLBACK)" across all 15+ files.
- **EMBODY Exception renamed**: "Standard Execution" → "Fallback Execution" in identity section across all entry points.
- **FORBIDDEN rule added**: Explicit prohibition against using EMBODY when sub-agent tool is available, enforced in all entry points and RUNTIME.md.

### Changed
- `rules/RUNTIME.md` — §EXECUTION MODEL completely rewritten: Sub-agent first, EMBODY fallback, forbidden patterns table added.
- `AGENT.template.md` — Template updated with Priority column, sub-agent first row, FORBIDDEN line.
- All 6 root entry points (`AGENT.md`, `COPILOT.md`, `CLAUDE.md`, `CURSOR.md`, `GEMINI.md`, `CODEX.md`) — Execution model tables inverted.
- All 5 code-assistant files — Naming standardized to Sub-agent/EMBODY (removing Enhanced/Standard).
- `rules/REFERENCE.md` — Quick check updated: Sub-agent MANDATORY, EMBODY FALLBACK, FORBIDDEN line.
- `README.md` — Execution model table updated.

### Added
- `documents/CHIEN-LUOC-THUC-THI.md` — Vietnamese strategy document explaining the philosophy behind Sub-agent vs EMBODY prioritization.

### BREAKING CHANGES
- **Rule file consolidation**: `CORE.md` + `PHASES.md` + `AGENTS.md` merged into single `RUNTIME.md` (~387 lines, ~40% reduction from 646 combined lines). Originals archived in `rules/archive/`.
- **Execution model renamed**: `TIER 1` → `Enhanced Execution`, `TIER 2` → `Standard Execution (EMBODY)`. Standard is documented as the default; Enhanced activates when sub-agent tools are available.
- **Skill resolution simplified**: `SKILLS.md` (HSOL fitness scoring) → `SKILLS-LITE.md` (tag-based lookup, 38 lines). No fitness scores, no promotion lifecycle, no governance metadata.
- **Team protocol streamlined**: `TEAMS.md` (340-line Golden Triangle debate) → `TEAMS-LITE.md` (101-line review protocol). 5-dimension checklist replaces multi-round debate for Standard Execution.
- **Entry points regenerated**: All 6 entry points now reference `RUNTIME.md` instead of `CORE.md`.

### Added
- **EMBODY Exception**: Identity section now includes sanctioned role-shift clause for Standard Execution — resolves "never implement" vs "EMBODY agent" contradiction.
- **Codegen system**: `AGENT.template.md` (source of truth) + `platforms.json` (platform overrides) + `scripts/generate-entry-points.js` — generates all 6 entry points from single template.
- **Platform capability matrix**: Added to `RUNTIME.md` — documents sub-agent, file I/O, terminal, and web capabilities per platform.
- **NL tiebreaker**: Ambiguous natural language defaults to `/cook`.
- **L8 escape hatch**: Prior deliverables may be revised if later phases reveal factual errors.
- **Max embodiment depth**: Explicit limit of 1 — no recursive orchestrator invocation.

### Fixed
- **8 agent category mismatches**: tech-lead (`execution`→`meta`), planner (`planning`→`meta`), debugger (`debugging`→`validation`), designer (`design`→`research`), devops-engineer (`execution`→`support`), business-analyst (`research`→`support`), project-manager (`orchestration`→`support`), reporter (`documentation`→`support`).
- **Self-check standardized**: Consolidated 5 different versions (3/4/6/7/12 items) into canonical 3-item check across all files.

### Removed
- **Anti-lazy detection blocks**: Removed from all command files and rule files — replaced by cleaner execution model documentation.
- **HSOL fitness scoring**: Fitness calculation, trust progression lifecycle, dynamic manifest governance, promotion gates — all replaced by tag-based lookup.
- **Debate ceremony for Standard Execution**: Multi-round debate, mailbox protocol, consensus stamps — replaced by 5-dimension review checklist.

### Changed
- **REFERENCE.md**: Updated rules table, self-check, tier decision quick check to match new architecture.
- **53 command files**: Updated PRE-FLIGHT sections (3-line loading → 1-line RUNTIME.md), execution model tables, skill references.
- Version bump: 1.3.2 → 2.0.0 (semver major for breaking rule file changes).

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
