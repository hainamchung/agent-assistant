---
title: Feature Catalogue
description: Complete catalogue of all 20 features (F1-F20) organized by category with MoSCoW prioritization, dependency relationships, and 7-layer release sequencing for the Agent Assistant framework.
category: summary
tags: [features, catalogue, moscow, prioritization, dependencies, release-planning]
related:
  - [[Business PMD]]
  - [[Command Routing]]
  - [[Tiered Orchestration]]
  - [[Golden Triangle]]
  - [[HSOL Skill Injection]]
  - [[CLI Installer]]
  - [[Success Metrics]]
  - [[Architecture Overview]]
created: 2026-05-20
updated: 2026-05-20
---

# Feature Catalogue

This catalogue documents all 20 features of the Agent Assistant framework, organized into 5 categories. Each feature is specified with its ID, name, priority, dependencies, description, and acceptance criteria. The features form a dependency graph that determines the 7-layer release sequencing.

**Source**: `documents/business/business-features/01-feature-inventory.md:1-312`

---

## Overview

The Agent Assistant framework comprises 20 features distributed across 5 categories:

| Category | Count | Features |
|----------|-------|----------|
| Core Orchestration | 5 | F1-F5 |
| Agent Management | 4 | F6-F9 |
| Skill Discovery | 3 | F10-F12 |
| Platform Integration | 4 | F13-F16 |
| Developer Experience | 4 | F17-F20 |

**Source**: `documents/business/business-features/01-feature-inventory.md:14-220`

---

## Feature Categories

### Core Orchestration

Core orchestration features provide the fundamental mechanisms for command processing, execution control, and behavioral governance.

| ID | Feature | Priority |
|----|---------|----------|
| F1 | [[Command Routing]] | Must |
| F2 | [[Tiered Orchestration]] | Must |
| F3 | Phase Execution Protocol | Must |
| F4 | Orchestration Laws | Must |
| F5 | Error Handling Framework | Could |

These features are implemented in `rules/CORE.md` and `rules/PHASES.md`.

**Source**: `documents/business/business-features/01-feature-inventory.md:14-75`

### Agent Management

Agent management features enable the selection, coordination, and isolation of specialist agents.

| ID | Feature | Priority |
|----|---------|----------|
| F6 | Agent Profiles | Must |
| F7 | [[Golden Triangle]] | Must |
| F8 | Context Isolation | Must |
| F9 | Recursive Delegation | Could |

These features are implemented in `rules/AGENTS.md` and `rules/TEAMS.md`.

**Source**: `documents/business/business-features/01-feature-inventory.md:78-127`

### Skill Discovery

Skill discovery features provide the mechanisms for matching and injecting domain knowledge into agent execution.

| ID | Feature | Priority |
|----|---------|----------|
| F10 | [[HSOL Skill Injection]] | Must |
| F11 | Dynamic Skill Discovery | Should |
| F12 | Skill Injection | Must |

These features are implemented in `rules/SKILLS.md`.

**Source**: `documents/business/business-features/01-feature-inventory.md:130-167`

### Platform Integration

Platform integration features enable the framework to operate across multiple AI assistant platforms.

| ID | Feature | Priority |
|----|---------|----------|
| F13 | Cursor Integration | Must |
| F14 | Claude Code Integration | Must |
| F15 | GitHub Copilot Integration | Must |
| F16 | Codex/Gemini Integration | Must |

**Source**: `documents/business/business-features/01-feature-inventory.md:170-219`

### Developer Experience

Developer experience features enhance productivity through automation and tooling.

| ID | Feature | Priority |
|----|---------|----------|
| F17 | [[CLI Installer]] | Must |
| F18 | Wiki Generation | Should |
| F19 | Documentation System | Should |
| F20 | Reporting | Could |

**Source**: `documents/business/business-features/01-feature-inventory.md:222-271`

---

## Feature Details

### F1: Command Routing System

| Attribute | Value |
|-----------|-------|
| **ID** | F1 |
| **Category** | Core Orchestration |
| **Priority** | Must |
| **Dependencies** | None |
| **User Value** | Enables single-entry-point access to all capabilities. Users learn one syntax that maps to complex workflows. |
| **Technical Surface** | `rules/CORE.md` — Command routing table, natural language detection |
| **Evidence** | `rules/CORE.md` — Command Routing section |

#### Description

The Command Routing System provides the entry point for all user interactions. It parses explicit commands (`/command` or `/command:variant`) and natural language inputs ("implement build create" maps to `/cook`), then routes to appropriate workflow files.

**Source**: `documents/business/business-features/01-feature-inventory.md:16-27`

#### Supported Commands

| Command | Variants |
|---------|----------|
| `/cook` | fast, hard, team |
| `/fix` | — |
| `/code` | — |
| `/plan` | — |
| `/debug` | — |
| `/test` | — |
| `/review` | — |
| `/docs` | core, business, audit |
| `/design` | — |
| `/brainstorm` | — |
| `/ask` | — |
| `/report` | fast, hard, team |
| `/deploy` | check, preview, production |
| `/wiki` | fast, hard, team |

**Source**: `documents/business/business-features/03-feature-specifications.md:30-38`

#### Acceptance Criteria

- [ ] Explicit command syntax parses correctly
- [ ] Variant suffix routes to correct workflow file
- [ ] Natural language detection maps to equivalent command
- [ ] Invalid command returns helpful error message

**Source**: `documents/business/business-features/03-feature-specifications.md:40-46`

---

### F2: Tiered Execution Engine

| Attribute | Value |
|-----------|-------|
| **ID** | F2 |
| **Category** | Core Orchestration |
| **Priority** | Must |
| **Dependencies** | F1 (Command Routing) |
| **User Value** | Optimal quality through isolated sub-agent execution, with graceful degradation when unavailable. |
| **Technical Surface** | `rules/CORE.md` — TIERED EXECUTION section, `rules/AGENTS.md` — TIER 1/2 definitions |
| **Evidence** | `rules/CORE.md` — TIERED EXECUTION, `rules/AGENTS.md` — TIERED EXECUTION |

#### Description

The Tiered Execution Engine implements a two-tier execution model:

| Tier | Name | Trigger | Context | Priority |
|------|------|--------|---------|----------|
| 1 | Sub-agent | runSubagent tool available | Isolated (fresh) | PRIMARY |
| 2 | Embody | runSubagent unavailable or failed | Shared with parent | FALLBACK |

TIER 1 is always attempted first. TIER 2 is only used as fallback.

**Source**: `documents/business/business-features/03-feature-specifications.md:64-92`

#### Acceptance Criteria

- [ ] TIER 1 attempted before TIER 2 for all delegations
- [ ] TIER 2 fallback only when TIER 1 unavailable or fails
- [ ] Execution tier logged in output
- [ ] Anti-lazy fallback detection prevents improper TIER 2 use

**Source**: `documents/business/business-features/03-feature-specifications.md:93-99`

---

### F3: Phase Execution Protocol

| Attribute | Value |
|-----------|-------|
| **ID** | F3 |
| **Category** | Core Orchestration |
| **Priority** | Must |
| **Dependencies** | F2 (Tiered Execution) |
| **User Value** | Structured delivery with verifiable milestones. Each phase produces documented, reviewable output. |
| **Technical Surface** | `rules/PHASES.md` — Phase execution, exit criteria, output formats |
| **Evidence** | `rules/PHASES.md` — PHASE EXECUTION RULES |

#### Description

The Phase Execution Protocol ensures structured, verifiable delivery:

- Execute one phase at a time (no batching)
- Complete Phase N before Phase N+1
- Verify exit criteria before phase completion
- Prior deliverables locked as immutable constraints

**Source**: `documents/business/business-features/03-feature-specifications.md:118-145`

#### Deliverable Size Management

| Size | Format |
|------|--------|
| ≤150 lines | Single file |
| >150 lines OR ≥4 sections | Chunked folder |

**Source**: `documents/business/business-features/03-feature-specifications.md:140-143`

#### Acceptance Criteria

- [ ] Phase N completes before Phase N+1 starts
- [ ] Exit criteria verified before phase completion
- [ ] Prior deliverables treated as immutable
- [ ] Deliverable size management enforced

**Source**: `documents/business/business-features/03-feature-specifications.md:146-152`

---

### F4: Orchestration Laws

| Attribute | Value |
|-----------|-------|
| **ID** | F4 |
| **Category** | Core Orchestration |
| **Priority** | Must |
| **Dependencies** | None |
| **User Value** | Consistent behavior across all workflows. 10 fundamental laws govern all agent decisions. |
| **Technical Surface** | `rules/CORE.md` — ORCHESTRATION LAWS (L1-L10) |
| **Evidence** | `rules/CORE.md` — ORCHESTRATION LAWS |

#### Description

The 10 Orchestration Laws define the behavioral contract for all agent operations:

| Law | Name | Description |
|-----|------|-------------|
| L1 | Single Point of Truth | Entry file loads CORE; rest loaded on-demand |
| L2 | Requirement Integrity | 100% fidelity extraction; zero loss |
| L3 | Explicit Loading | State what you loaded before using |
| L4 | Deep Embodiment | Follow agent's Directive + Protocol + Constraints |
| L5 | Sequential Execution | Phase N completes before N+1 |
| L6 | Language Compliance | Respond in user's language; files/code in English |
| L7 | Recursive Delegation | Meta agents coordinate, NEVER implement |
| L8 | Stateful Handoff | Prior deliverables = IMMUTABLE constraints |
| L9 | Constraint Propagation | scouter→planner→implementer chain locked |
| L10 | Deliverable Integrity | Files created by agent define standard |

**Source**: `documents/business/business-features/03-feature-specifications.md:170-212`

#### Acceptance Criteria

- [ ] All 10 laws implemented
- [ ] Law violations detected and prevented
- [ ] Self-check prompts remind of laws

**Source**: `documents/business/business-features/03-feature-specifications.md:213-218`

---

### F5: Error Handling Framework

| Attribute | Value |
|-----------|-------|
| **ID** | F5 |
| **Category** | Core Orchestration |
| **Priority** | Should |
| **Dependencies** | F2 (Tiered Execution), F3 (Phase Execution) |
| **User Value** | Graceful degradation when issues occur. Clear recovery paths and user notifications. |
| **Technical Surface** | `rules/ERRORS.md` — Error classification, recovery paths |
| **Evidence** | `rules/CORE.md` — AMBIGUITY HANDLING, `rules/ERRORS.md` |

#### Description

The Error Handling Framework provides graceful degradation when issues occur. Errors are classified by severity (Warning, Error, Critical) and propagated through the chain with recovery paths.

**Source**: `documents/business/business-features/01-feature-inventory.md:64-75`

#### Acceptance Criteria

- [ ] Errors handled gracefully
- [ ] Recovery paths clear
- [ ] User notifications helpful

**Source**: `documents/business/business-features/02-prioritization-moscow.md:117-123`

---

### F6: Agent Profiles

| Attribute | Value |
|-----------|-------|
| **ID** | F6 |
| **Category** | Agent Management |
| **Priority** | Must |
| **Dependencies** | F2 (Tiered Execution) |
| **User Value** | Right agent for every task. 21 specialists with defined capabilities and domains. |
| **Technical Surface** | `rules/AGENTS.md` — Agent categories, TASK → AGENT MAPPING, `web/src/data/agents.ts` |
| **Evidence** | `rules/AGENTS.md` — AGENT CATEGORIES, `web/src/data/agents.ts` |

#### Description

Agent Profiles define 21 specialist agents organized into 5 categories:

| Category | Agents | Purpose |
|----------|--------|---------|
| Implementation | backend-engineer, frontend-engineer, mobile-engineer, game-engineer | Production-quality code |
| Architecture | tech-lead, database-architect | System design and structure |
| Quality | tester, reviewer, debugger, security-engineer | Code quality assurance |
| Planning | planner, brainstormer, business-analyst | Strategy and task planning |
| Support | designer, devops-engineer, docs-manager, performance-engineer, researcher, scouter, project-manager, reporter, business-analyst | Specialized capabilities |

**Source**: `documents/business/business-features/03-feature-specifications.md:231-270`

#### Task Mapping

| Task Type | Agent |
|-----------|-------|
| backend logic | backend-engineer |
| UI components | frontend-engineer |
| database schema | database-architect |
| security | security-engineer |
| testing | tester |
| code review | reviewer |
| debugging | debugger |
| planning | planner |

**Source**: `documents/business/business-features/03-feature-specifications.md:260-269`

#### Acceptance Criteria

- [ ] All 21 agents defined with categories
- [ ] Task → Agent mapping produces correct agent
- [ ] Category purposes enforced

**Source**: `documents/business/business-features/03-feature-specifications.md:271-276`

---

### F7: Golden Triangle Teams

| Attribute | Value |
|-----------|-------|
| **ID** | F7 |
| **Category** | Agent Management |
| **Priority** | Must |
| **Dependencies** | F6 (Agent Profiles) |
| **User Value** | Adversarial collaboration for quality-critical work. 18 team configurations. |
| **Technical Surface** | `rules/TEAMS.md` — Golden Triangle roster, debate mechanism, consensus protocol |
| **Evidence** | `rules/TEAMS.md` — GOLDEN TRIANGLE ROSTER |

#### Description

The [[Golden Triangle]] implements adversarial 3-role team coordination:

| Role | Function | Authority |
|------|---------|-----------|
| tech-lead | Decompose, coordinate, arbitrate | FINAL on all decisions |
| executor | Build, implement, defend | Owns implementation decisions |
| reviewer | Challenge, validate, quality gate | Can FAIL submissions |

**Source**: `documents/business/business-features/03-feature-specifications.md:286-318`

#### Team Configuration

- **Team count**: 18 configurations
- **Debate rounds**: 3 (max)
- **Consensus stamp**: "✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓"

**Source**: `documents/business/business-features/03-feature-specifications.md:308-317`

#### Acceptance Criteria

- [ ] Exactly 3 agents per team phase
- [ ] Debate capped at 3 rounds
- [ ] Consensus stamp present before output release
- [ ] All 18 team configurations available

**Source**: `documents/business/business-features/03-feature-specifications.md:319-325`

---

### F8: Context Isolation

| Attribute | Value |
|-----------|-------|
| **ID** | F8 |
| **Category** | Agent Management |
| **Priority** | Must |
| **Dependencies** | F6 (Agent Profiles) |
| **User Value** | Clean handoffs without context pollution. Each agent receives only relevant context. |
| **Technical Surface** | `rules/AGENTS.md` — CONTEXT ISOLATION section, deliverable size directive |
| **Evidence** | `rules/AGENTS.md` — CONTEXT ISOLATION |

#### Description

Context Isolation ensures clean handoffs between agents. TIER 1 agents receive isolated (fresh) context, while TIER 2 agents share context with the parent. This prevents cross-contamination between agents.

**Source**: `documents/business/business-features/01-feature-inventory.md:104-115`

#### Acceptance Criteria

- [ ] TIER 1 isolated; TIER 2 shares appropriately
- [ ] Cross-contamination prevented

**Source**: `documents/business/business-features/02-prioritization-moscow.md:73-80`

---

### F9: Recursive Delegation

| Attribute | Value |
|-----------|-------|
| **ID** | F9 |
| **Category** | Agent Management |
| **Priority** | Should |
| **Dependencies** | F6 (Agent Profiles) |
| **User Value** | Meta agents delegate to specialists, never implement directly. Ensures expertise matching. |
| **Technical Surface** | `rules/AGENTS.md` — RECURSIVE DELEGATION section |
| **Evidence** | `rules/AGENTS.md` — RECURSIVE DELEGATION |

#### Description

Recursive Delegation enforces that meta agents (tech-lead, planner) coordinate and delegate to specialists rather than implementing directly. This ensures expertise matching and prevents meta agents from bypassing quality gates.

**Source**: `documents/business/business-features/01-feature-inventory.md:116-127`

#### Acceptance Criteria

- [ ] Meta agents delegate to specialists

**Source**: `documents/business/business-features/02-prioritization-moscow.md:125-132`

---

### F10: HSOL Matrix Resolution

| Attribute | Value |
|-----------|-------|
| **ID** | F10 |
| **Category** | Skill Discovery |
| **Priority** | Must |
| **Dependencies** | F6 (Agent Profiles) |
| **User Value** | 1400+ pre-loaded skills automatically match to tasks. No manual discovery needed. |
| **Technical Surface** | `rules/SKILLS.md` — RESOLUTION ALGORITHM, fitness calculation, trust progression |
| **Evidence** | `rules/SKILLS.md` — RESOLUTION ALGORITHM |

#### Description

The [[HSOL Skill Injection]] system provides the Hybrid Skill Orchestration Layer that solves the context overflow problem:

| Resolution Step | Description |
|----------------|-------------|
| 1 | Parse agent profile from frontmatter |
| 2 | Load inherited domains from _index.yaml |
| 3 | Filter skills by relevance_mapping |
| 4 | Apply priority thresholds (critical≥9, core≥7) |
| 5 | Calculate fitness scores |
| 6 | Return sorted skill set |

**Source**: `documents/business/business-features/03-feature-specifications.md:345-377`

#### Fitness Calculation

```
fitness = 0.35 × SEMANTIC_MATCH
        + 0.25 × SPECIFICITY
        + 0.20 × TRUST_LEVEL
        + 0.10 × FRESHNESS_SCORE
        + 0.10 × SUCCESS_RATE
```

#### Fitness Thresholds

| Threshold | Action |
|-----------|--------|
| ≥0.8 | Execute with matrix (skip discovery) |
| 0.75-0.8 | Execute + flag for discovery |
| <0.75 | BLOCKING discovery |

**Source**: `documents/business/business-features/03-feature-specifications.md:372-376`

#### Acceptance Criteria

- [ ] Skills resolved by agent profile
- [ ] Fitness calculated correctly
- [ ] Discovery triggered at correct threshold
- [ ] 1400+ skills available in matrix

**Source**: `documents/business/business-features/03-feature-specifications.md:378-384`

---

### F11: Dynamic Skill Discovery

| Attribute | Value |
|-----------|-------|
| **ID** | F11 |
| **Category** | Skill Discovery |
| **Priority** | Should |
| **Dependencies** | F10 (HSOL Matrix Resolution) |
| **User Value** | On-demand discovery for specialized domains. Matrix fitness < 0.75 triggers discovery. |
| **Technical Surface** | `rules/SKILLS.md` — Dynamic Discovery section, find-skills protocol |
| **Evidence** | `rules/SKILLS.md` — DYNAMIC DISCOVERY |

#### Description

Dynamic Skill Discovery enables on-demand skill loading when the matrix fitness falls below 0.75. This extends the skill set beyond the 1400+ pre-loaded skills.

**Source**: `documents/business/business-features/01-feature-inventory.md:144-155`

#### Acceptance Criteria

- [ ] Discovery triggers when fitness < 0.75

**Source**: `documents/business/business-features/02-prioritization-moscow.md:133-140`

---

### F12: Skill Injection

| Attribute | Value |
|-----------|-------|
| **ID** | F12 |
| **Category** | Skill Discovery |
| **Priority** | Must |
| **Dependencies** | F10 (HSOL Matrix Resolution) |
| **User Value** | Skills automatically loaded before agent execution. Zero manual skill management. |
| **Technical Surface** | `rules/SKILLS.md` — AGENT SKILLS SECTION FORMAT, matrix-skills integration |
| **Evidence** | `rules/SKILLS.md` — AGENT SKILLS SECTION FORMAT |

#### Description

Skill Injection automatically loads relevant skills before agent execution. The skills are resolved via the HSOL Matrix Resolution algorithm and injected into the agent context.

**Source**: `documents/business/business-features/01-feature-inventory.md:156-167`

#### Acceptance Criteria

- [ ] Skills loaded before agent execution

**Source**: `documents/business/business-features/02-prioritization-moscow.md:89-96`

---

### F13: Cursor Integration

| Attribute | Value |
|-----------|-------|
| **ID** | F13 |
| **Category** | Platform Integration |
| **Priority** | Must |
| **Dependencies** | F1 (Command Routing), F2 (Tiered Execution) |
| **User Value** | Full Agent Assistant capabilities in Cursor IDE. |
| **Technical Surface** | `~/.cursor/skills/agent-assistant/` — installation path, platform detection |
| **Evidence** | `README.md` — Supported Tools section |

#### Description

Cursor Integration provides the Agent Assistant capabilities within the Cursor IDE, utilizing the platform-specific path `~/.cursor/skills/agent-assistant/`.

**Source**: `documents/business/business-features/01-feature-inventory.md:172-183`

---

### F14: Claude Code Integration

| Attribute | Value |
|-----------|-------|
| **ID** | F14 |
| **Category** | Platform Integration |
| **Priority** | Must |
| **Dependencies** | F1 (Command Routing), F2 (Tiered Execution) |
| **User Value** | Full Agent Assistant capabilities in Claude Code CLI. |
| **Technical Surface** | `~/.claude/skills/agent-assistant/` — installation path, CLI interface |
| **Evidence** | `README.md` — Supported Tools section |

#### Description

Claude Code Integration provides the Agent Assistant capabilities within the Claude Code CLI, utilizing the platform-specific path `~/.claude/skills/agent-assistant/`.

**Source**: `documents/business/business-features/01-feature-inventory.md:184-195`

---

### F15: GitHub Copilot Integration

| Attribute | Value |
|-----------|-------|
| **ID** | F15 |
| **Category** | Platform Integration |
| **Priority** | Must |
| **Dependencies** | F1 (Command Routing), F2 (Tiered Execution) |
| **User Value** | Agent Assistant workflows in GitHub Copilot. |
| **Technical Surface** | `~/.copilot/skills/agent-assistant/` — installation path |
| **Evidence** | `README.md` — Supported Tools section |

#### Description

GitHub Copilot Integration provides the Agent Assistant capabilities within GitHub Copilot, utilizing the platform-specific path `~/.copilot/skills/agent-assistant/`.

**Source**: `documents/business/business-features/01-feature-inventory.md:196-207`

---

### F16: Codex and Antigravity/Gemini Integration

| Attribute | Value |
|-----------|-------|
| **ID** | F16 |
| **Category** | Platform Integration |
| **Priority** | Must |
| **Dependencies** | F1 (Command Routing), F2 (Tiered Execution) |
| **User Value** | Consistent experience across remaining supported platforms. |
| **Technical Surface** | `~/.codex/skills/agent-assistant/`, `~/.gemini/skills/agent-assistant/` |
| **Evidence** | `README.md` — Supported Tools section |

#### Description

Codex and Antigravity/Gemini Integration provides the Agent Assistant capabilities across these platforms, utilizing platform-specific paths.

**Source**: `documents/business/business-features/01-feature-inventory.md:208-219`

---

### F17: CLI Installer

| Attribute | Value |
|-----------|-------|
| **ID** | F17 |
| **Category** | Developer Experience |
| **Priority** | Must |
| **Dependencies** | F13-F16 (Platform Integrations) |
| **User Value** | One-time global setup. Works across all projects and platforms. |
| **Technical Surface** | `cli/install.js` — cross-platform installation, configuration management |
| **Evidence** | `README.md` — Installation section, `cli/install.js` |

#### Description

The [[CLI Installer]] provides a one-command installation that sets up the Agent Assistant globally across all supported platforms. It handles cross-platform installation and configuration management.

**Source**: `documents/business/business-features/01-feature-inventory.md:224-235`

#### Acceptance Criteria

- [ ] One-command install per platform
- [ ] Uninstall clean
- [ ] Cross-platform support

**Source**: `documents/business/business-features/02-prioritization-moscow.md:105-112`

---

### F18: Wiki Generation

| Attribute | Value |
|-----------|-------|
| **ID** | F18 |
| **Category** | Developer Experience |
| **Priority** | Should |
| **Dependencies** | F6 (Agent Profiles), F7 (Golden Triangle) |
| **User Value** | Auto-generated project documentation from code analysis. |
| **Technical Surface** | `commands/wiki.md`, `agents/wiki-architect.md`, `agents/wiki-extractor.md` |
| **Evidence** | `rules/WIKI.md` — Wiki Awareness |

#### Description

Wiki Generation automatically produces navigable project documentation through code analysis, utilizing the wiki-architect and wiki-extractor agents.

**Source**: `documents/business/business-features/01-feature-inventory.md:236-247`

#### Acceptance Criteria

- [ ] Code analysis produces navigable documentation

**Source**: `documents/business/business-features/02-prioritization-moscow.md:141-148`

---

### F19: Documentation System

| Attribute | Value |
|-----------|-------|
| **ID** | F19 |
| **Category** | Developer Experience |
| **Priority** | Should |
| **Dependencies** | F6 (Agent Profiles) |
| **User Value** | Structured documentation following knowledge-architecture pattern. |
| **Technical Surface** | `documents/` — knowledge folders with 00-index.md pattern |
| **Evidence** | `documents/knowledge-*/00-index.md` |

#### Description

The Documentation System provides structured documentation following the knowledge-architecture pattern, with knowledge folders following the 00-index.md convention.

**Source**: `documents/business/business-features/01-feature-inventory.md:248-259`

#### Acceptance Criteria

- [ ] Knowledge folders follow 00-index.md pattern

**Source**: `documents/business/business-features/02-prioritization-moscow.md:149-156`

---

### F20: Reporting

| Attribute | Value |
|-----------|-------|
| **ID** | F20 |
| **Category** | Developer Experience |
| **Priority** | Could |
| **Dependencies** | F3 (Phase Execution) |
| **User Value** | Status reports and project summaries on demand. |
| **Technical Surface** | `commands/report.md` — report variants, template-based output |
| **Evidence** | `rules/CORE.md` — DELIVERABLES section |

#### Description

Reporting provides on-demand status reports and project summaries, utilizing phase outputs and template-based generation.

**Source**: `documents/business/business-features/01-feature-inventory.md:260-271`

#### Acceptance Criteria

- [ ] Reports generated with metrics

**Source**: `documents/business/business-features/02-prioritization-moscow.md:157-164`

---

## MoSCoW Prioritization

The MoSCoW methodology categorizes features by criticality:

| Priority | Count | Features |
|----------|-------|----------|
| **Must** | 5 | F1, F2, F3, F4, F6 |
| **Should** | 9 | F7, F8, F10, F12, F13, F14, F15, F16, F17 |
| **Could** | 6 | F5, F9, F11, F18, F19, F20 |
| **Won't** | 3 | F21, F22, F23 |

**Source**: `documents/business/business-features/02-prioritization-moscow.md:195-203`

### Must Have (5 Features)

Critical for MVP launch. Blockers without workarounds.

| ID | Feature | Blocking If Missing |
|----|---------|---------------------|
| F1 | Command Routing | No user interaction possible |
| F2 | Tiered Execution | No delegation mechanism |
| F3 | Phase Execution | Unstructured execution |
| F4 | Orchestration Laws | Unpredictable behavior |
| F6 | Agent Profiles | No task-to-agent mapping |

**Source**: `documents/business/business-features/02-prioritization-moscow.md:19-60`

### Should Have (9 Features)

Important for initial release. Significant impact if missing.

| ID | Feature | Impact If Missing |
|----|---------|-------------------|
| F7 | Golden Triangle | Lower quality on complex deliverables |
| F8 | Context Isolation | Cross-contamination between agents |
| F10 | HSOL Matrix | Higher token costs |
| F12 | Skill Injection | Efficiency gains lost |
| F13 | Cursor Integration | Single-platform product |
| F14 | Claude Code Integration | Single-platform product |
| F15 | Copilot Integration | Single-platform product |
| F16 | Codex/Gemini Integration | Single-platform product |
| F17 | CLI Installer | Manual setup required |

**Source**: `documents/business/business-features/02-prioritization-moscow.md:63-112`

### Could Have (6 Features)

Desirable but not critical. Enhances user experience.

| ID | Feature | Impact If Missing |
|----|---------|-------------------|
| F5 | Error Handling | Unhelpful error messages |
| F9 | Recursive Delegation | Expertise mismatch possible |
| F11 | Dynamic Discovery | Fixed skill set only |
| F18 | Wiki Generation | Manual documentation required |
| F19 | Documentation System | Unstructured documentation |
| F20 | Reporting | Manual status tracking |

**Source**: `documents/business/business-features/02-prioritization-moscow.md:115-164`

### Won't Have (This Release) (3 Features)

Explicitly deferred. May revisit in future phases.

| ID | Feature | Target Phase | Deferred Reason |
|----|---------|--------------|----------------|
| F21 | Enterprise SSO | Phase 2 | Authentication complexity |
| F22 | Custom Agent Templates | Phase 2 | Template system design needed |
| F23 | Mobile IDE Integration | Phase 3 | iOS/Android SDK differences |

**Source**: `documents/business/business-features/02-prioritization-moscow.md:167-192`

---

## Dependency Graph

The following dependency graph shows how features relate to each other:

```
F4 (Orchestration Laws) ──┐
                         ├── No dependencies (Layer 1)
F1 (Command Routing) ────┘

F2 (Tiered Execution) ←── F1
F6 (Agent Profiles) ←── F2

F3 (Phase Execution) ←── F2
F10 (HSOL Matrix) ←── F6
F12 (Skill Injection) ←── F10

F7 (Golden Triangle) ←── F6
F8 (Context Isolation) ←── F6
F11 (Dynamic Discovery) ←── F10

F5 (Error Handling) ←── F2, F3
F9 (Recursive Delegation) ←── F6
F18 (Wiki Generation) ←── F6, F7
F19 (Documentation) ←── F6
F20 (Reporting) ←── F3

F13 (Cursor) ←── F1, F2
F14 (Claude Code) ←── F1, F2
F15 (Copilot) ←── F1, F2
F16 (Codex/Gemini) ←── F1, F2

F17 (CLI Installer) ←── F13, F14, F15, F16
```

**Source**: `documents/business/business-features/04-dependencies-and-release-sequencing.md:8-79`

### Hard Constraints

| Constraint | Rule |
|------------|------|
| F1 before F2 | Commands must route before executing |
| F2 before F3 | Phases wrap execution |
| F6 before F7 | Teams use agents |
| F13-F16 before F17 | Installer needs platform paths |
| F1+F2 before F13-F16 | Platform integration needs routing and execution |

**Source**: `documents/business/business-features/04-dependencies-and-release-sequencing.md:188-199`

### Soft Constraints

| Constraint | Rule |
|------------|------|
| F6 before F8 | Context isolation builds on agent profiles |
| F10 before F11 | Dynamic discovery extends matrix |
| F3 before F20 | Reporting uses phase outputs |

**Source**: `documents/business/business-features/04-dependencies-and-release-sequencing.md:200-207`

---

## Release Layers

The 7-layer release sequence ensures features are released in dependency order:

**Source**: `documents/business/business-features/04-dependencies-and-release-sequencing.md:8-106`

### Layer 1: Foundation (No Dependencies)

| Feature | Duration |
|---------|----------|
| F4: Orchestration Laws | 1 week |
| F1: Command Routing | 2 weeks |

**Milestone**: Core behavioral contract and entry point established.

### Layer 2: Core Execution

| Feature | Duration |
|---------|----------|
| F2: Tiered Execution | 2 weeks |
| F6: Agent Profiles | 1 week |

**Milestone**: Basic command routing and agent selection working.

### Layer 3: Structured Delivery

| Feature | Duration |
|---------|----------|
| F3: Phase Execution | 2 weeks |
| F10: HSOL Matrix Resolution | 2 weeks |
| F12: Skill Injection | 1 week |

**Milestone**: Structured workflows with skill injection.

### Layer 4: Quality and Teams

| Feature | Duration |
|---------|----------|
| F7: Golden Triangle | 3 weeks |
| F8: Context Isolation | 1 week |
| F11: Dynamic Discovery | 2 weeks |

**Milestone**: Team-based quality workflow functional.

### Layer 5: Error and Meta

| Feature | Duration |
|---------|----------|
| F5: Error Handling | 1 week |
| F9: Recursive Delegation | 1 week |
| F18: Wiki Generation | 2 weeks |
| F19: Documentation System | 1 week |
| F20: Reporting | 1 week |

**Milestone**: Graceful degradation on failures.

### Layer 6: Platform Integration

| Feature | Duration |
|---------|----------|
| F13: Cursor Integration | 2 weeks |
| F14: Claude Code Integration | 2 weeks |
| F15: Copilot Integration | 2 weeks |
| F16: Codex/Gemini Integration | 2 weeks |

**Milestone**: All 7 platforms supported.

### Layer 7: Installer

| Feature | Duration |
|---------|----------|
| F17: CLI Installer | 2 weeks |

**Milestone**: Full product ready for GA.

---

## Orchestration Laws

All features operate under the 10 Orchestration Laws defined in F4:

| Law | Name | Application |
|-----|------|-------------|
| L1 | Single Point of Truth | Entry file loads CORE; rest loaded on-demand |
| L2 | Requirement Integrity | 100% fidelity extraction from all requirements |
| L3 | Explicit Loading | State what you loaded before using |
| L4 | Deep Embodiment | Follow agent's Directive + Protocol + Constraints |
| L5 | Sequential Execution | Phase N completes before N+1 |
| L6 | Language Compliance | Respond in user's language; files/code in English |
| L7 | Recursive Delegation | Meta agents coordinate, NEVER implement |
| L8 | Stateful Handoff | Prior deliverables = IMMUTABLE constraints |
| L9 | Constraint Propagation | scouter→planner→implementer chain locked |
| L10 | Deliverable Integrity | Files created by agent define standard |

**Source**: `documents/business/business-features/03-feature-specifications.md:170-212`

---

## Release Criteria

### MVP Release (Must Have Only)

- [ ] F1: Command routing functional
- [ ] F2: TIER 1/2 execution working
- [ ] F3: Phase execution with exit criteria
- [ ] F4: All 10 orchestration laws enforced
- [ ] F6: 21 agents with correct selection

**Source**: `documents/business/business-features/02-prioritization-moscow.md:206-215`

### Enhanced Release (Should Have Added)

- [ ] F7: Golden Triangle teams
- [ ] F8: Context isolation verified
- [ ] F10: HSOL matrix resolution
- [ ] F12: Skill injection
- [ ] F13-F16: All 7 platforms
- [ ] F17: CLI installer

**Source**: `documents/business/business-features/02-prioritization-moscow.md:216-224`

### Full Release (Could Have Added)

- [ ] F5: Error handling framework
- [ ] F9: Recursive delegation
- [ ] F11: Dynamic discovery
- [ ] F18: Wiki generation
- [ ] F19: Documentation system
- [ ] F20: Reporting

**Source**: `documents/business/business-features/02-prioritization-moscow.md:225-233`

---

## Evidence Sources

| Source | Features |
|--------|----------|
| `rules/CORE.md` | F1, F2, F3, F4, F5 |
| `rules/AGENTS.md` | F6, F7, F8, F9 |
| `rules/TEAMS.md` | F7 |
| `rules/PHASES.md` | F3 |
| `rules/SKILLS.md` | F10, F11, F12 |
| `rules/WIKI.md` | F18 |
| `web/src/data/agents.ts` | F6 |
| `cli/install.js` | F17 |
| `README.md` | F13-F17 |

**Source**: `documents/business/business-features/01-feature-inventory.md:301-312`
