# Feature Inventory

> **Section**: Business Features | **File**: 01-feature-inventory.md
> **Purpose**: Complete catalogue of all 20 features with user value, technical surface, and dependencies

---

## Overview

This inventory catalogues all 20 features of the Agent Assistant framework. Features are organized by category and documented with their value proposition, technical surface, dependencies, and evidence links.

---

## Core Orchestration Features

### F1: Command Routing System

| Attribute | Value |
|-----------|-------|
| **ID** | F1 |
| **Category** | Core Orchestration |
| **Priority** | Must |
| **User Value** | Enables single-entry-point access to all capabilities. Users learn one syntax that maps to complex workflows. |
| **Technical Surface** | `rules/CORE.md` — Command routing table, natural language detection |
| **Dependencies** | None |
| **Evidence** | `rules/CORE.md` — Command Routing section |

### F2: Tiered Execution Engine

| Attribute | Value |
|-----------|-------|
| **ID** | F2 |
| **Category** | Core Orchestration |
| **Priority** | Must |
| **User Value** | Optimal quality through isolated sub-agent execution, with graceful degradation when unavailable. |
| **Technical Surface** | `rules/CORE.md` — TIERED EXECUTION section, `rules/AGENTS.md` — TIER 1/2 definitions |
| **Dependencies** | F1 (Command Routing) |
| **Evidence** | `rules/CORE.md` — TIERED EXECUTION, `rules/AGENTS.md` — TIERED EXECUTION |

### F3: Phase Execution Protocol

| Attribute | Value |
|-----------|-------|
| **ID** | F3 |
| **Category** | Core Orchestration |
| **Priority** | Must |
| **User Value** | Structured delivery with verifiable milestones. Each phase produces documented, reviewable output. |
| **Technical Surface** | `rules/PHASES.md` — Phase execution, exit criteria, output formats |
| **Dependencies** | F2 (Tiered Execution) |
| **Evidence** | `rules/PHASES.md` — PHASE EXECUTION RULES |

### F4: Orchestration Laws

| Attribute | Value |
|-----------|-------|
| **ID** | F4 |
| **Category** | Core Orchestration |
| **Priority** | Must |
| **User Value** | Consistent behavior across all workflows. 10 fundamental laws govern all agent decisions. |
| **Technical Surface** | `rules/CORE.md` — ORCHESTRATION LAWS (L1-L10) |
| **Dependencies** | None |
| **Evidence** | `rules/CORE.md` — ORCHESTRATION LAWS |

### F5: Error Handling Framework

| Attribute | Value |
|-----------|-------|
| **ID** | F5 |
| **Category** | Core Orchestration |
| **Priority** | Should |
| **User Value** | Graceful degradation when issues occur. Clear recovery paths and user notifications. |
| **Technical Surface** | `rules/ERRORS.md` — Error classification, recovery paths |
| **Dependencies** | F2 (Tiered Execution), F3 (Phase Execution) |
| **Evidence** | `rules/CORE.md` — AMBIGUITY HANDLING, `rules/ERRORS.md` |

---

## Agent Management Features

### F6: Agent Profiles

| Attribute | Value |
|-----------|-------|
| **ID** | F6 |
| **Category** | Agent Management |
| **Priority** | Must |
| **User Value** | Right agent for every task. 21 specialists with defined capabilities and domains. |
| **Technical Surface** | `rules/AGENTS.md` — Agent categories, TASK → AGENT MAPPING, `web/src/data/agents.ts` |
| **Dependencies** | F2 (Tiered Execution) |
| **Evidence** | `rules/AGENTS.md` — AGENT CATEGORIES, `web/src/data/agents.ts` |

### F7: Golden Triangle Teams

| Attribute | Value |
|-----------|-------|
| **ID** | F7 |
| **Category** | Agent Management |
| **Priority** | Must |
| **User Value** | Adversarial collaboration for quality-critical work. 18 team configurations. |
| **Technical Surface** | `rules/TEAMS.md` — Golden Triangle roster, debate mechanism, consensus protocol |
| **Dependencies** | F6 (Agent Profiles) |
| **Evidence** | `rules/TEAMS.md` — GOLDEN TRIANGLE ROSTER |

### F8: Context Isolation

| Attribute | Value |
|-----------|-------|
| **ID** | F8 |
| **Category** | Agent Management |
| **Priority** | Must |
| **User Value** | Clean handoffs without context pollution. Each agent receives only relevant context. |
| **Technical Surface** | `rules/AGENTS.md` — CONTEXT ISOLATION section, deliverable size directive |
| **Dependencies** | F6 (Agent Profiles) |
| **Evidence** | `rules/AGENTS.md` — CONTEXT ISOLATION |

### F9: Recursive Delegation

| Attribute | Value |
|-----------|-------|
| **ID** | F9 |
| **Category** | Agent Management |
| **Priority** | Should |
| **User Value** | Meta agents delegate to specialists, never implement directly. Ensures expertise matching. |
| **Technical Surface** | `rules/AGENTS.md` — RECURSIVE DELEGATION section |
| **Dependencies** | F6 (Agent Profiles) |
| **Evidence** | `rules/AGENTS.md` — RECURSIVE DELEGATION |

---

## Skill Discovery Features

### F10: HSOL Matrix Resolution

| Attribute | Value |
|-----------|-------|
| **ID** | F10 |
| **Category** | Skill Discovery |
| **Priority** | Must |
| **User Value** | 1400+ pre-loaded skills automatically match to tasks. No manual discovery needed. |
| **Technical Surface** | `rules/SKILLS.md` — RESOLUTION ALGORITHM, fitness calculation, trust progression |
| **Dependencies** | F6 (Agent Profiles) |
| **Evidence** | `rules/SKILLS.md` — RESOLUTION ALGORITHM |

### F11: Dynamic Skill Discovery

| Attribute | Value |
|-----------|-------|
| **ID** | F11 |
| **Category** | Skill Discovery |
| **Priority** | Should |
| **User Value** | On-demand discovery for specialized domains. Matrix fitness < 0.75 triggers discovery. |
| **Technical Surface** | `rules/SKILLS.md` — Dynamic Discovery section, find-skills protocol |
| **Dependencies** | F10 (HSOL Matrix Resolution) |
| **Evidence** | `rules/SKILLS.md` — DYNAMIC DISCOVERY |

### F12: Skill Injection

| Attribute | Value |
|-----------|-------|
| **ID** | F12 |
| **Category** | Skill Discovery |
| **Priority** | Must |
| **User Value** | Skills automatically loaded before agent execution. Zero manual skill management. |
| **Technical Surface** | `rules/SKILLS.md` — AGENT SKILLS SECTION FORMAT, matrix-skills integration |
| **Dependencies** | F10 (HSOL Matrix Resolution) |
| **Evidence** | `rules/SKILLS.md` — AGENT SKILLS SECTION FORMAT |

---

## Platform Integration Features

### F13: Cursor Integration

| Attribute | Value |
|-----------|-------|
| **ID** | F13 |
| **Category** | Platform Integration |
| **Priority** | Must |
| **User Value** | Full Agent Assistant capabilities in Cursor IDE. |
| **Technical Surface** | `~/.{TOOL}/skills/agent-assistant/` — installation path, platform detection |
| **Dependencies** | F1 (Command Routing), F2 (Tiered Execution) |
| **Evidence** | `README.md` — Supported Tools section |

### F14: Claude Code Integration

| Attribute | Value |
|-----------|-------|
| **ID** | F14 |
| **Category** | Platform Integration |
| **Priority** | Must |
| **User Value** | Full Agent Assistant capabilities in Claude Code CLI. |
| **Technical Surface** | `~/.claude/skills/agent-assistant/` — installation path, CLI interface |
| **Dependencies** | F1 (Command Routing), F2 (Tiered Execution) |
| **Evidence** | `README.md` — Supported Tools section |

### F15: GitHub Copilot Integration

| Attribute | Value |
|-----------|-------|
| **ID** | F15 |
| **Category** | Platform Integration |
| **Priority** | Must |
| **User Value** | Agent Assistant workflows in GitHub Copilot. |
| **Technical Surface** | `~/.copilot/skills/agent-assistant/` — installation path |
| **Dependencies** | F1 (Command Routing), F2 (Tiered Execution) |
| **Evidence** | `README.md` — Supported Tools section |

### F16: Codex and Antigravity/Gemini Integration

| Attribute | Value |
|-----------|-------|
| **ID** | F16 |
| **Category** | Platform Integration |
| **Priority** | Must |
| **User Value** | Consistent experience across remaining supported platforms. |
| **Technical Surface** | `~/.codex/skills/agent-assistant/`, `~/.gemini/skills/agent-assistant/` |
| **Dependencies** | F1 (Command Routing), F2 (Tiered Execution) |
| **Evidence** | `README.md` — Supported Tools section |

---

## Developer Experience Features

### F17: CLI Installer

| Attribute | Value |
|-----------|-------|
| **ID** | F17 |
| **Category** | Developer Experience |
| **Priority** | Must |
| **User Value** | One-time global setup. Works across all projects and platforms. |
| **Technical Surface** | `cli/install.js` — cross-platform installation, configuration management |
| **Dependencies** | F13-F16 (Platform Integrations) |
| **Evidence** | `README.md` — Installation section, `cli/install.js` |

### F18: Wiki Generation

| Attribute | Value |
|-----------|-------|
| **ID** | F18 |
| **Category** | Developer Experience |
| **Priority** | Should |
| **User Value** | Auto-generated project documentation from code analysis. |
| **Technical Surface** | `commands/wiki.md`, `agents/wiki-architect.md`, `agents/wiki-extractor.md` |
| **Dependencies** | F6 (Agent Profiles), F7 (Golden Triangle) |
| **Evidence** | `rules/WIKI.md` — Wiki Awareness |

### F19: Documentation System

| Attribute | Value |
|-----------|-------|
| **ID** | F19 |
| **Category** | Developer Experience |
| **Priority** | Should |
| **User Value** | Structured documentation following knowledge-architecture pattern. |
| **Technical Surface** | `.documents/` — knowledge folders with 00-index.md pattern |
| **Dependencies** | F6 (Agent Profiles) |
| **Evidence** | `.documents/knowledge-*/00-index.md` |

### F20: Reporting

| Attribute | Value |
|-----------|-------|
| **ID** | F20 |
| **Category** | Developer Experience |
| **Priority** | Could |
| **User Value** | Status reports and project summaries on demand. |
| **Technical Surface** | `commands/report.md` — report variants, template-based output |
| **Dependencies** | F3 (Phase Execution) |
| **Evidence** | `rules/CORE.md` — DELIVERABLES section |

---

## Feature Summary Table

| ID | Feature | Category | Priority | Dependencies |
|----|---------|----------|----------|--------------|
| F1 | Command Routing | Core Orchestration | Must | None |
| F2 | Tiered Execution | Core Orchestration | Must | F1 |
| F3 | Phase Execution | Core Orchestration | Must | F2 |
| F4 | Orchestration Laws | Core Orchestration | Must | None |
| F5 | Error Handling | Core Orchestration | Should | F2, F3 |
| F6 | Agent Profiles | Agent Management | Must | F2 |
| F7 | Golden Triangle | Agent Management | Must | F6 |
| F8 | Context Isolation | Agent Management | Must | F6 |
| F9 | Recursive Delegation | Agent Management | Should | F6 |
| F10 | HSOL Matrix | Skill Discovery | Must | F6 |
| F11 | Dynamic Discovery | Skill Discovery | Should | F10 |
| F12 | Skill Injection | Skill Discovery | Must | F10 |
| F13 | Cursor Integration | Platform | Must | F1, F2 |
| F14 | Claude Code Integration | Platform | Must | F1, F2 |
| F15 | Copilot Integration | Platform | Must | F1, F2 |
| F16 | Codex/Gemini Integration | Platform | Must | F1, F2 |
| F17 | CLI Installer | Dev Experience | Must | F13-F16 |
| F18 | Wiki Generation | Dev Experience | Should | F6, F7 |
| F19 | Documentation System | Dev Experience | Should | F6 |
| F20 | Reporting | Dev Experience | Could | F3 |

---

## Evidence Sources

- `README.md` — Feature overview, platform list, installation
- `rules/CORE.md` — F1, F2, F3, F4, F5
- `rules/AGENTS.md` — F6, F7, F8, F9
- `rules/TEAMS.md` — F7
- `rules/PHASES.md` — F3
- `rules/SKILLS.md` — F10, F11, F12
- `rules/WIKI.md` — F18
- `web/src/data/agents.ts` — F6 agent definitions
- `cli/install.js` — F17 installer
