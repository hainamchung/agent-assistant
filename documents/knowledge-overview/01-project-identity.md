# Project Identity

> **File**: `documents/knowledge-overview/01-project-identity.md`
> **Purpose**: Core identity — name, version, purpose, vision, mission, and First 60 Minutes checklist

---

## Project Name

**Agent Assistant**

Also known as: `agent-assistant`, `@namch/agent-assistant` (npm package name)

---

## Version Information

| Attribute | Value |
|-----------|-------|
| **Current Version** | 4.0.0 |
| **Release Type** | Major (Semantic Release) |
| **Initial Version** | Unknown (pre-4.0 history in CHANGELOG.md) |
| **Changelog** | See `CHANGELOG.md` |

---

## Purpose

Agent Assistant transforms a single AI coding assistant into a **coordinated team of 21 specialist agents** with:

- **Structured workflows** for common development tasks
- **14 commands** with three execution variants (fast, hard, team)
- **18 Golden Triangle teams** for complex multi-phase tasks
- **1400+ domain skills** auto-injected via Hybrid Skill Orchestration Layer (HSOL)
- **Multi-platform support** across 7 AI coding platforms

The framework operates as a **middleware layer** between the user and the underlying AI, providing orchestration logic, skill injection, and team coordination without modifying the AI itself.

---

## Vision

> "Every developer deserves the power of a full engineering team in their IDE."

Agent Assistant envisions a world where:
- Single AI assistants become team multipliers
- Complex tasks are handled by coordinated specialist agents
- Domain expertise is systematically injected on-demand
- Quality is maintained through adversarial team review
- Platform lock-in is eliminated through abstraction

---

## Mission

Deliver a production-ready, multi-agent orchestration framework that:

1. **Works everywhere** — Cursor, GitHub Copilot, Claude Code, Antigravity/Gemini, Codex
2. **Scales complexity** — From simple fixes to complex full-stack implementations
3. **Maintains quality** — Through built-in review, testing, and security gates
4. **Stays current** — With 1400+ skills updated via skill registry
5. **Requires no setup** — One-command installation, works out of the box

---

## First 60 Minutes Checklist

New to the project? Complete these steps in order:

### Minute 0-10: Understand the Project

- [ ] Read `README.md` (5 minutes)
- [ ] Review this file (5 minutes)

### Minute 10-20: Set Up Environment

- [ ] Verify Node.js >= 18.0.0 (`node --version`)
- [ ] Clone repository (if not already)
- [ ] Review `package.json` scripts

### Minute 20-35: Install and Explore

- [ ] Run `npm install` in project root
- [ ] Explore directory structure (see `../knowledge-source-base/01-directory-structure.md`)
- [ ] Review key files:
  - `cli/install.js` — CLI entry point
  - `rules/CORE.md` — Core orchestration rules
  - `agents/` — 21 specialist agents

### Minute 35-50: Understand the Architecture

- [ ] Read `../knowledge-architecture/01-system-overview.md`
- [ ] Review `../knowledge-architecture/04-design-patterns.md`
- [ ] Understand command routing: `commands/` folder

### Minute 50-60: Make Your First Contribution

- [ ] Pick a command variant to understand (e.g., `/fix`)
- [ ] Review the corresponding agent files
- [ ] Make a small documentation update

---

## Package Metadata

From `package.json`:

```json
{
  "name": "@namch/agent-assistant",
  "version": "4.0.0",
  "description": "Multi-agent orchestration framework for AI coding assistants",
  "license": "MIT",
  "author": "NamCH",
  "repository": "https://github.com/hainamchung/agent-assistant",
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## Evidence Sources

- `package.json` — NPM package metadata
- `README.md` — Project overview
- `CHANGELOG.md` — Version history
- `rules/CORE.md` — Core orchestration rules
