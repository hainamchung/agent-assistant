---
title: Project Identity
description: Core identity — name, version, purpose, vision, mission, and First 60 Minutes checklist for Agent Assistant
category: summary
tags: [project, identity, vision, mission, package, onboarding, first-60-minutes]
related:
  - Project Overview
  - Architecture Overview
  - Getting Started
  - CLI Installer
  - Command System
  - Golden Triangle
---

# Project Identity

**Source**: `documents/knowledge-overview/01-project-identity.md:1-130`

---

## Purpose

**Source**: `documents/knowledge-overview/01-project-identity.md:27-37`

Agent Assistant transforms a single AI coding assistant into a **coordinated team of 21 specialist agents** with:

- **Structured workflows** for common development tasks
- **14 commands** with three execution variants (fast, hard, team)
- **18 Golden Triangle teams** for complex multi-phase tasks
- **1400+ domain skills** auto-injected via Hybrid Skill Orchestration Layer (HSOL)
- **Multi-platform support** across 7 AI coding platforms

The framework operates as a **middleware layer** between the user and the underlying AI, providing orchestration logic, skill injection, and team coordination without modifying the AI itself.

---

## Vision Statement

**Source**: `documents/knowledge-overview/01-project-identity.md:41-50`

> "Every developer deserves the power of a full engineering team in their IDE."

Agent Assistant envisions a world where:

- **Single AI assistants become team multipliers** — One AI becomes a coordinated force multiplier, not a solo operator
- **Complex tasks are handled by coordinated specialist agents** — Tasks are decomposed and routed to agents with the right expertise
- **Domain expertise is systematically injected on-demand** — 1400+ skills available through the Hybrid Skill Orchestration Layer (HSOL)
- **Quality is maintained through adversarial team review** — Every significant deliverable passes through the [[Golden Triangle]] review process
- **Platform lock-in is eliminated through abstraction** — A single codebase works across Cursor, GitHub Copilot, Claude Code, Antigravity/Gemini, and Codex

---

## Mission Statement

**Source**: `documents/knowledge-overview/01-project-identity.md:54-62`

Deliver a production-ready, multi-agent orchestration framework that:

1. **Works everywhere** — Cursor, GitHub Copilot, Claude Code, Antigravity/Gemini, Codex
2. **Scales complexity** — From simple fixes to complex full-stack implementations
3. **Maintains quality** — Through built-in review, testing, and security gates
4. **Stays current** — With 1400+ skills updated via skill registry
5. **Requires no setup** — One-command installation, works out of the box

---

## Package Identity

**Source**: `documents/knowledge-overview/01-project-identity.md:104-120`

### Package Metadata

| Attribute | Value |
|-----------|-------|
| **Package Name** | `@namch/agent-assistant` |
| **Current Version** | 4.0.0 |
| **Release Type** | Major (Semantic Release) |
| **License** | MIT |
| **Author** | NamCH |
| **Repository** | `https://github.com/hainamchung/agent-assistant` |
| **Engine Requirements** | Node.js >= 18.0.0 |

### Package Description

> "Multi-agent orchestration framework for AI coding assistants"

**Source**: `documents/knowledge-overview/01-project-identity.md:112`

The package is published to npm under the `@namch` scope, providing the complete orchestration framework including:

- CLI installer (`cli/install.js`) — Single-file Node.js application for platform setup
- 21 specialist agents organized in `agents/` directory
- 8 orchestration rule files in `rules/` directory
- 14 commands with fast, hard, and team variants in `commands/` directory
- 18 Golden Triangle team definitions in `agents/teams/`

**Source**: `documents/knowledge-overview/01-project-identity.md:104-120`, `documents/knowledge-overview/01-project-identity.md:86-88`

### Version History

| Attribute | Value |
|-----------|-------|
| **Initial Version** | Unknown (pre-4.0 history in `CHANGELOG.md`) |
| **Current Version** | 4.0.0 |
| **Changelog Location** | `CHANGELOG.md` |

**Source**: `documents/knowledge-overview/01-project-identity.md:18-23`

---

## Project Name

**Source**: `documents/knowledge-overview/01-project-identity.md:8-12`

| Name Form | Value |
|-----------|-------|
| **Display Name** | Agent Assistant |
| **CLI Name** | `agent-assistant` |
| **NPM Package** | `@namch/agent-assistant` |

Also known as: `agent-assistant`, `@namch/agent-assistant` (npm package name)

---

## Identity Elements

### Name

**Agent Assistant** — The display name reflects the framework's purpose: assisting developers through a team of specialized agents working in concert.

### Tagline

> "Every developer deserves the power of a full engineering team in their IDE."

**Source**: `documents/knowledge-overview/01-project-identity.md:43`

### Logo Concept

The logo concept reflects the orchestration nature of the framework — a central hub coordinating multiple specialized nodes. The visual identity should convey:

- **Coordination** — Multiple elements working together under unified direction
- **Intelligence** — AI-powered agent orchestration
- **Teamwork** — Specialist collaboration through the [[Golden Triangle]] pattern

*Note: Specific logo assets and color codes are defined in the brand guidelines.*

### Color Palette

*Color palette follows the brand identity defined in project design files.*

### Typography

*Typography follows the brand identity defined in project design files.*

---

## First 60 Minutes

**Source**: `documents/knowledge-overview/01-project-identity.md:66-101`

New to the project? Complete these steps in order to go from zero knowledge to first contribution:

### Minute 0-10: Understand the Project

**Source**: `documents/knowledge-overview/01-project-identity.md:70-73`

- [ ] Read `README.md` (5 minutes)
- [ ] Review this Project Identity document (5 minutes)

These documents establish the foundational context needed for all subsequent steps. The README provides an executive overview while this document captures the core identity elements.

### Minute 10-20: Set Up Environment

**Source**: `documents/knowledge-overview/01-project-identity.md:75-79`

- [ ] Verify Node.js >= 18.0.0 (`node --version`)
- [ ] Clone repository (if not already)
- [ ] Review `package.json` scripts

The environment check ensures compatibility with the CLI runtime requirements. Reviewing `package.json` scripts reveals the available npm commands for development, testing, and deployment.

**Source**: `documents/knowledge-overview/01-project-identity.md:77`

### Minute 20-35: Install and Explore

**Source**: `documents/knowledge-overview/01-project-identity.md:81-88`

- [ ] Run `npm install` in project root
- [ ] Explore directory structure (see [[Getting Started]])
- [ ] Review key files:
  - `cli/install.js` — CLI entry point
  - `rules/CORE.md` — Core orchestration rules
  - `agents/` — 21 specialist agents

After installation, the directory exploration phase helps mental model building. Understanding the structure before diving into code accelerates subsequent learning.

**Source**: `documents/knowledge-overview/01-project-identity.md:83-88`

### Minute 35-50: Understand the Architecture

**Source**: `documents/knowledge-overview/01-project-identity.md:90-94`

- [ ] Read [[Architecture Overview]]
- [ ] Review design patterns documentation
- [ ] Understand command routing: `commands/` folder

The architecture understanding phase connects the directory structure to the system's orchestration layers. Understanding how commands route through the tiered architecture (Command → Rule → Agent → Team → Skill) is essential for effective contribution.

**Source**: `documents/knowledge-overview/01-project-identity.md:90-94`

### Minute 50-60: Make Your First Contribution

**Source**: `documents/knowledge-overview/01-project-identity.md:96-100`

- [ ] Pick a command variant to understand (e.g., `/fix`)
- [ ] Review the corresponding agent files
- [ ] Make a small documentation update

The first contribution should be low-risk and high-learning. Documentation updates provide familiarity with the contribution workflow without the complexity of code changes.

**Source**: `documents/knowledge-overview/01-project-identity.md:96-100`

---

## Quick Reference Card

### Installation

```bash
git clone <repository>
cd agent-assistant
npm install
node cli/install.js
```

**Source**: `documents/knowledge-overview/01-project-identity.md:83`

### Key Commands

| Command | Purpose |
|---------|--------|
| `node cli/install.js` | Install to all configured platforms |
| `node cli/install.js --list` | List currently installed platforms |
| `node cli/install.js --uninstall` | Remove from all platforms |

**Source**: `cli/install.js` (see [[CLI Installer]] for full reference)

### Key Paths

| Path | Purpose |
|------|---------|
| `cli/install.js` | CLI installer (1716 lines) |
| `rules/CORE.md` | Core orchestration rules |
| `agents/` | 21 specialist agents |
| `commands/` | 14 commands with variants |
| `agents/teams/` | 18 Golden Triangle team definitions |

**Source**: `documents/knowledge-overview/01-project-identity.md:86-88`

---

## Related Pages

- [[Project Overview]] — Executive summary and architecture
- [[Architecture Overview]] — Full system architecture
- [[Getting Started]] — Installation and first steps
- [[CLI Installer]] — CLI module reference
- [[Command System]] — Commands and routing
- [[Golden Triangle]] — Adversarial team coordination pattern
