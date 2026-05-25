---
title: Project Overview
type: summary
tags: [project, overview, getting-started]
created: 2026-05-20
updated: 2026-05-20
---

# Project Overview

Agent Assistant transforms a single AI coding assistant into a full engineering team. It provides 14 specialist commands, 21 specialist agents, 18 Golden Triangle teams, and 1400+ skills through a tiered orchestration architecture that scales from simple tasks to complex multi-team projects.

---

## Purpose

The Agent Assistant operates as an intelligent orchestration layer between developers and AI coding assistants across 7 platforms. Rather than relying on a single general-purpose AI agent, it decomposes tasks and routes them to the most appropriate specialist agent or team.

The system is designed around three core principles:

- **Specialization over generalization** — 21 distinct agents with focused skill profiles rather than one general agent
- **Adversarial quality** — every significant output passes through a Golden Triangle review process
- **Platform portability** — a single codebase works across Cursor, GitHub Copilot, Claude Code, Antigravity/Gemini, and Codex

### Vision

> "Every developer deserves the power of a full engineering team in their IDE."

Agent Assistant envisions a world where:
- Single AI assistants become team multipliers
- Complex tasks are handled by coordinated specialist agents
- Domain expertise is systematically injected on-demand
- Quality is maintained through adversarial team review
- Platform lock-in is eliminated through abstraction

### Mission

Deliver a production-ready, multi-agent orchestration framework that:

1. **Works everywhere** — Cursor, GitHub Copilot, Claude Code, Antigravity/Gemini, Codex
2. **Scales complexity** — From simple fixes to complex full-stack implementations
3. **Maintains quality** — Through built-in review, testing, and security gates
4. **Stays current** — With 1400+ skills updated via skill registry
5. **Requires no setup** — One-command installation, works out of the box

### Version

**Current Version**: 4.0.0 (Semantic Release)

See `CHANGELOG.md` for version history.

---

## Architecture

The system uses a 5-layer tiered orchestration architecture:

1. **Command Layer** — parses user commands (`/cook`, `/fix`, `/plan`, etc.) and routes to the appropriate execution path
2. **Rule Layer** — loads orchestration protocols (8 rule files) that govern how agents collaborate
3. **Agent Layer** — executes tasks through 21 specialist agents
4. **Team Layer** — coordinates multi-agent collaboration via 18 Golden Triangle teams for complex tasks
5. **Skill Layer** — injects domain knowledge on demand using HSOL (Hybrid Skill Orchestration Layer)

This layered design ensures each concern is handled by the appropriate abstraction level. See [[Architecture Overview]] for the full architectural description.

---

## Feature System

### Command Variants

Each of the 14 commands supports three execution variants:

| Variant | Agents | Use Case | Quality Gates |
|---------|--------|----------|---------------|
| **fast** | 2-3 | Quick tasks, simple features | Basic review |
| **hard** | 5-8 | Complex features | Full review + testing + security |
| **team** | Golden Triangle | Critical/large tasks | Tech Lead + Executor + Reviewer |

**Example usage**:

```bash
/cooks "Add user authentication"      # Fast: 2-3 agents, basic review
/cook:hard "Build payment system"      # Hard: 5-8 agents, full review
/cook:team "Migrate to microservices" # Team: Golden Triangle review
```

### Agent System

21 specialist agents organized into 5 categories:

**Implementation Agents**:
- `backend-engineer` — Server-side logic, Node.js, Python, databases
- `frontend-engineer` — UI/UX implementation, React, CSS, accessibility
- `mobile-engineer` — Mobile development, React Native, Swift, Kotlin
- `game-engineer` — Game development, Unity, Three.js, WebGL

**Quality Agents**:
- `tester` — Unit, integration, e2e testing
- `reviewer` — Best practices, code patterns review
- `debugger` — Root cause analysis, bug investigation
- `security-engineer` — OWASP, vulnerability assessment
- `performance-engineer` — Profiling, benchmarks, optimization
- `wiki-reviewer` — Documentation quality assurance

**Planning Agents**:
- `planner` — Implementation blueprints, task breakdown
- `brainstormer` — Creative thinking, alternatives
- `business-analyst` — Requirements, user stories, priorities

**Support Agents**:
- `designer` — UI/UX design, Figma, components
- `devops-engineer` — CI/CD, containers, infrastructure
- `docs-manager` — Technical writing, documentation
- `project-manager` — Agile planning, project coordination
- `reporter` — Metrics analysis, insights
- `researcher` — Investigation, research synthesis
- `scouter` — Code exploration, pattern discovery
- `wiki-architect` — Knowledge organization, wiki structure
- `wiki-extractor` — JSDoc, docstrings, code documentation
- `database-architect` — Schema design, queries

**Architecture Agents**:
- `tech-lead` — System design, technical decisions, trade-offs

### Team System

18 Golden Triangle teams follow the pattern:

- **Tech Lead** — Architecture, decisions, coordination
- **Executor** — Implementation
- **Reviewer** — Quality assurance

| Team | Primary Domain |
|------|----------------|
| `backend-team` | Backend development |
| `frontend-team` | Frontend development |
| `fullstack-team` | Full-stack development |
| `database-team` | Database design |
| `debug-team` | Debugging |
| `design-team` | UI/UX design |
| `devops-team` | DevOps/infrastructure |
| `docs-team` | Documentation |
| `game-team` | Game development |
| `mobile-team` | Mobile development |
| `performance-team` | Performance |
| `planning-team` | Planning |
| `project-team` | Project management |
| `qa-team` | Testing/QA |
| `report-team` | Reporting |
| `research-team` | Research |
| `security-team` | Security |
| `wiki-team` | Wiki generation |

### Skill System

1400+ domain skills organized in 4 tiers:

| Tier | Count | Purpose | Examples |
|------|-------|---------|----------|
| **foundation** | ~200 | Core skills | JavaScript basics, git |
| **professional** | ~400 | Industry standard | React patterns, SQL |
| **specialized** | ~500 | Domain expertise | Kubernetes, TensorFlow |
| **expert** | ~300 | Advanced topics | Distributed systems, ML ops |

Skills are automatically injected via HSOL based on task context, agent specialization, and file type.

---

## Multi-Platform Support

Agent Assistant works across 7 AI coding platforms:

| Platform | Configuration | Instructions |
|----------|---------------|--------------|
| **Cursor** | `code-assistants/cursor/` | See platform setup docs |
| **GitHub Copilot** | `code-assistants/copilot/` | See platform setup docs |
| **Claude Code** | `code-assistants/claude/` | See platform setup docs |
| **Antigravity/Gemini** | `code-assistants/antigravity/` | See platform setup docs |
| **Codex** | `code-assistants/codex/` | See platform setup docs |

Platform abstraction provides:
- Unified command interface across platforms
- Automatic path translation
- Configuration portability

---

## Key Components

| Component | Count | Description |
|-----------|-------|-------------|
| Commands | 14 | `/cook`, `/code`, `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/deploy`, `/report`, `/wiki`, `/brainstorm`, `/ask` |
| Agents | 21 | Specialist agents across 5 categories |
| Teams | 18 | Golden Triangle teams for adversarial collaboration |
| Rules | 8 | CORE, PHASES, AGENTS, SKILLS, TEAMS, ERRORS, REFERENCE, WIKI |
| Skills | 1400+ | Organized in 4 tiers |
| Platforms | 7 | Cursor, GitHub Copilot, Claude Code, Antigravity/Gemini, Codex, Kiro, Qwen |

---

## Entry Points

### CLI Installer

The CLI installer (`cli/install.js`) is a single-file Node.js application that sets up Agent Assistant across all configured platforms.

**Commands**:
- `node cli/install.js` — install to all configured platforms
- `node cli/install.js --list` — list currently installed platforms
- `node cli/install.js --uninstall` — remove from all platforms

**Source**: `cli/install.js` (1716 lines)

See [[CLI Installer]] for the full module reference.

### Web Application

The web application (`web/src/main.tsx`) is a React 19 documentation site with four routes:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Landing page |
| `/docs` | Docs | Documentation browser |
| `/installation` | Installation | Installation guide |
| `/features/agent-teams` | AgentTeams | Agent and team visualization |

**Tech Stack**: React 19, Vite 6, TypeScript, Tailwind CSS 4, React Router 7, Framer Motion 12, ReactFlow 12.

See [[Web Application]] for the full architecture description.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js >= 18.0.0, npm |
| CLI | Plain JavaScript ES2022+ (no framework) |
| Web | React 19, Vite 6, TypeScript |
| Styles | Tailwind CSS 4 |
| Routing | React Router 7 |
| Animations | Framer Motion 12 |
| Diagrams | ReactFlow 12 |
| CI/CD | Semantic Release, Conventional Commits, Husky v8 |
| Documentation | Markdown, Mermaid diagrams, YAML frontmatter |

---

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm (latest recommended)
- git
- macOS, Linux, or Windows

### Installation

```bash
git clone <repository>
cd agent-assistant
npm install
node cli/install.js
```

For the web application:

```bash
cd web
npm install
npm run dev
```

### First 60 Minutes Checklist

New to the project? Complete these steps in order:

**Minute 0-10: Understand the Project**
- [ ] Read `README.md` (5 minutes)
- [ ] Review this file (5 minutes)

**Minute 10-20: Set Up Environment**
- [ ] Verify Node.js >= 18.0.0 (`node --version`)
- [ ] Clone repository (if not already)
- [ ] Review `package.json` scripts

**Minute 20-35: Install and Explore**
- [ ] Run `npm install` in project root
- [ ] Explore directory structure
- [ ] Review key files:
  - `cli/install.js` — CLI entry point
  - `rules/CORE.md` — Core orchestration rules
  - `agents/` — 21 specialist agents

**Minute 35-50: Understand the Architecture**
- [ ] Read [[Architecture Overview]]
- [ ] Review design patterns
- [ ] Understand command routing: `commands/` folder

**Minute 50-60: Make Your First Contribution**
- [ ] Pick a command variant to understand (e.g., `/fix`)
- [ ] Review the corresponding agent files
- [ ] Make a small documentation update

---

## Quick Reference

### Common Commands

| Task | Command | Variant |
|------|---------|---------|
| Implement a feature | `/cook` | fast/hard/team |
| Fix a bug | `/fix` | fast/hard/team |
| Plan a feature | `/plan` | fast/hard/team |
| Debug an issue | `/debug` | fast/hard/team |
| Write tests | `/test` | fast/hard/team |
| Review code | `/review` | fast/hard/team |
| Generate docs | `/docs` | fast/hard/team |
| Design UI | `/design` | fast/hard/team |
| Deploy | `/deploy` | check/preview/production |
| Generate wiki | `/wiki` | fast/hard/team |

### Agent Quick Lookup

| Need | Use Agent |
|------|-----------|
| Backend code | `backend-engineer` |
| Frontend code | `frontend-engineer` |
| Tests | `tester` |
| Security review | `security-engineer` |
| Performance | `performance-engineer` |
| Documentation | `docs-manager` |
| Planning | `planner` |
| Research | `researcher` |

---

## Related Pages

- [[Architecture Overview]] — Full system architecture
- [[Getting Started]] — Installation and first steps
- [[CLI Installer]] — CLI module reference
- [[Web Application]] — Web app architecture
- [[System Components]] — Complete component inventory
- [[Feature Catalogue]] — Detailed feature specifications

---

## Evidence

| Source | Content |
|--------|---------|
| `.documents/knowledge-overview/01-project-identity.md` | Project name, version, vision, mission |
| `.documents/knowledge-overview/03-features.md` | Complete feature system documentation |
| `package.json` | NPM package metadata (v4.0.0) |
| `rules/CORE.md` | Core orchestration rules |
| `agents/` | 21 agent definition files |
| `agents/teams/` | 18 team definitions |
| `commands/` | 14 command files |
| `cli/install.js` | CLI implementation |
| `web/` | React documentation site |
