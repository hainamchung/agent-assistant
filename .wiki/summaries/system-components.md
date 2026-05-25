---
title: System Components
type: summary
tags: [architecture, components, inventory]
created: 2026-05-20
updated: 2026-05-20
---

# System Components

The Agent Assistant consists of 7 major component categories that work together to provide end-to-end AI-assisted development. Each component is self-contained but participates in the tiered orchestration architecture through well-defined interfaces.

---

## Component Overview

| Component | Count | Location | Description |
|-----------|-------|----------|-------------|
| Commands | 14 | `commands/` | User-facing commands with fast/hard/team variants |
| Rules | 8 | `rules/` | Orchestration protocols governing agent behavior |
| Agents | 21 | `agents/` | Specialist agents across 5 categories |
| Teams | 18 | `agents/teams/` | Golden Triangle teams for adversarial collaboration |
| Skills | 1400+ | `skills/`, `matrix-skills/` | Domain knowledge organized in 4 tiers |
| CLI | 1 | `cli/install.js` | Single-file Node.js installer (1716 lines) |
| Web | 1 | `web/` | React 19 documentation site |

---

## Command Layer

The Command Layer routes user intent to the appropriate execution path. 14 commands are available, each with 3 variants:

| Command | Purpose | Default Agents |
|---------|---------|----------------|
| `/cook` | Feature implementation | frontend-engineer, backend-engineer |
| `/code` | Code generation | frontend-engineer, backend-engineer |
| `/fix` | Bug fixing | debugger, reviewer |
| `/plan` | Planning and blueprints | planner, brainstormer |
| `/debug` | Root cause analysis | debugger |
| `/test` | Test creation | tester |
| `/review` | Code review | reviewer |
| `/docs` | Documentation | docs-manager |
| `/design` | UI/UX design | designer |
| `/deploy` | Deployment | devops-engineer |
| `/report` | Data analysis | reporter |
| `/wiki` | Wiki generation | wiki-architect, wiki-extractor, wiki-reviewer |
| `/brainstorm` | Ideation | brainstormer |
| `/ask` | Questions and research | researcher |

Each command variant scales the agent count and review depth:
- **fast**: 2–3 agents, minimal review
- **hard**: 5–8 agents, standard review
- **team**: Golden Triangle (Tech Lead + Executor + Reviewer), adversarial review

**Source**: `.documents/knowledge-overview/03-features.md:16-36`, `.documents/knowledge-architecture/03-data-flow.md:60-79`

See [[Command System]] for the full command reference.

---

## Rule Layer

The Rule Layer loads orchestration protocols in a specific order that governs how agents work together. 8 rule files define the behavior of the entire system:

| Rule | File | Purpose |
|------|------|---------|
| CORE | `rules/CORE.md` | Core orchestration principles and 10 laws |
| PHASES | `rules/PHASES.md` | Phase definitions for task execution |
| AGENTS | `rules/AGENTS.md` | Agent handling and tiered execution |
| SKILLS | `rules/SKILLS.md` | Skill orchestration via HSOL |
| TEAMS | `rules/TEAMS.md` | Golden Triangle team coordination |
| ERRORS | `rules/ERRORS.md` | Error classification and handling |
| REFERENCE | `rules/REFERENCE.md` | Quick reference for common operations |
| WIKI | `rules/WIKI.md` | Wiki documentation standards |

The Rule Layer is loaded in order (CORE → PHASES → AGENTS → SKILLS → TEAMS → ERRORS → REFERENCE → WIKI) for every command invocation, ensuring consistent orchestration behavior.

**Source**: `.documents/knowledge-architecture/02-components.md:88-99`

See [[Rule System]] for the full rule reference.

---

## Agent Layer

21 specialist agents execute tasks across 5 categories:

### Implementation (4 agents)

| Agent | Purpose | Required Skills | Preferred Skills |
|-------|---------|----------------|-----------------|
| backend-engineer | Server-side development, API design | nodejs, python, databases | docker, redis |
| frontend-engineer | Frontend development, React, CSS, accessibility | react, css, typescript | accessibility, testing |
| mobile-engineer | React Native, Swift, Kotlin development | react-native, swift, kotlin | — |
| game-engineer | Unity, Three.js, WebGL game development | unity, threejs, webgl | — |

### Architecture (1 agent)

| Agent | Purpose | Skills |
|-------|---------|--------|
| tech-lead | Technical leadership, system design, trade-off analysis | system-design, architecture, trade-offs |

### Quality (6 agents)

| Agent | Purpose |
|-------|---------|
| tester | Unit, integration, and e2e test creation |
| reviewer | Code review against best practices and patterns |
| debugger | Bug investigation and root cause analysis |
| security-engineer | Security audit, OWASP Top 10 vulnerability assessment |
| performance-engineer | Profiling, benchmarking, optimization |
| wiki-reviewer | Documentation clarity and accuracy review |

### Planning (3 agents)

| Agent | Purpose |
|-------|---------|
| planner | Implementation blueprints, breakdown, estimation |
| brainstormer | Ideas and alternatives, creative thinking |
| business-analyst | Requirements analysis, user stories, priorities |

### Support (8 agents)

| Agent | Purpose |
|-------|---------|
| designer | UI/UX design, Figma, component design |
| devops-engineer | CI/CD, containers, infrastructure |
| docs-manager | Technical writing and documentation |
| project-manager | Agile planning, project coordination |
| reporter | Metrics analysis, data insights |
| researcher | Investigation, research, synthesis |
| scouter | Code exploration, pattern discovery |
| wiki-architect | Wiki structure, knowledge organization |
| wiki-extractor | Code documentation, JSDoc, docstrings |
| database-architect | Data layer design, schema, queries |

**Source**: `.documents/knowledge-overview/03-features.md:48-99`, `.documents/knowledge-domain/01-entities.md:140-208`

See [[Agent System]] for the full agent reference.

---

## Team Layer

18 Golden Triangle teams coordinate multi-agent work for complex tasks. Each team follows the adversarial review pattern:

| Team | Domain | Tech Lead | Executor | Reviewer |
|------|--------|-----------|----------|----------|
| backend-team | Backend | tech-lead | backend-engineer | reviewer |
| frontend-team | Frontend | tech-lead | frontend-engineer | reviewer |
| fullstack-team | Full-stack | tech-lead | frontend+backend | reviewer |
| database-team | Database | tech-lead | database-architect | reviewer |
| debug-team | Debugging | tech-lead | debugger | reviewer |
| design-team | Design | tech-lead | designer | reviewer |
| devops-team | DevOps | tech-lead | devops-engineer | reviewer |
| docs-team | Docs | tech-lead | docs-manager | reviewer |
| game-team | Games | tech-lead | game-engineer | reviewer |
| mobile-team | Mobile | tech-lead | mobile-engineer | reviewer |
| performance-team | Performance | tech-lead | performance-engineer | reviewer |
| planning-team | Planning | tech-lead | planner | reviewer |
| project-team | Project | tech-lead | project-manager | reviewer |
| qa-team | Quality | tech-lead | tester | reviewer |
| report-team | Reporting | tech-lead | reporter | reviewer |
| research-team | Research | tech-lead | researcher | reviewer |
| security-team | Security | tech-lead | security-engineer | reviewer |
| wiki-team | Wiki | wiki-architect | wiki-extractor | wiki-reviewer |

**Source**: `.documents/knowledge-domain/01-entities.md:266-288`

See [[Team System]] and [[Golden Triangle]].

---

## Skill Layer

The Skill Layer uses HSOL (Hybrid Skill Orchestration Layer) to inject domain knowledge on demand. 1400+ skills are organized in 4 tiers:

| Tier | Count | Description | When Loaded |
|------|-------|-------------|-------------|
| foundation | ~200 | Universal skills | Always (always loaded first) |
| professional | ~400 | Domain-general skills | When domain matches task |
| specialized | ~500 | Technology-specific skills | When explicitly matched |
| expert | ~300 | Advanced/niche skills | Only when requested |

Skill selection follows priority: foundation → professional → specialized → expert. Context window limits determine how many skills can be injected:

| Context Size | Skill Count |
|-------------|-------------|
| Small (<32K) | 10–15 skills |
| Medium (32K–64K) | 20–30 skills |
| Large (>64K) | 50+ skills |

**Source**: `.documents/knowledge-architecture/04-design-patterns.md:141-216`, `.documents/knowledge-domain/04-business-rules.md:96-138`

See [[Skill System]] and [[HSOL Skill Injection]].

---

## Infrastructure Components

### CLI Installer

Single-file Node.js application (`cli/install.js`, 1716 lines) with no framework dependencies.

**Functions**: `main()`, `install()`, `uninstall()`, `list()`, `replacePaths()`, `copyFiles()`

Installs to all 7 configured platforms by copying files and replacing path placeholders. Progress tracking and fsync reliability ensure consistent installation.

**Source**: `.documents/knowledge-overview/02-tech-stack.md:30-40`, `.documents/knowledge-source-base/02-entry-points.md:16-80`

### Web Application

React 19 documentation site with four routes. Built with Vite 6, TypeScript, Tailwind CSS 4, React Router 7, Framer Motion 12, and ReactFlow 12.

**Routes**: `/` (HomePage), `/docs` (Docs), `/installation` (Installation), `/features/agent-teams` (AgentTeams)

**Source**: `.documents/knowledge-overview/02-tech-stack.md:213-226`, `.documents/knowledge-source-base/02-entry-points.md:82-140`

See [[CLI Installer]] and [[Web Application]].

---

## Related Pages

- [[Command System]] — All 14 commands with variants
- [[Agent System]] — All 21 specialist agents
- [[Team System]] — All 18 Golden Triangle teams
- [[Rule System]] — All 8 orchestration rules
- [[Skill System]] — HSOL and skill tier system
- [[Platform System]] — Multi-platform abstraction
