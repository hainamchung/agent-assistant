# Knowledge Overview

> **Folder**: `documents/knowledge-overview/`
> **Purpose**: Project-level orientation, tech stack, features, and onboarding
> **Audience**: New developers, project managers, stakeholders

---

## Summary

The **Agent Assistant** is a multi-agent orchestration framework that transforms a single AI coding assistant into a coordinated team of 21 specialist agents with structured workflows and 1400+ domain skills. It operates across seven major AI coding platforms: Cursor, GitHub Copilot, Claude Code, Antigravity/Gemini, Codex, Kiro, and Qwen.

This folder contains the foundational knowledge that every team member needs within their first 60 minutes. Start with `01-project-identity.md` to understand what the project is, then proceed through the tech stack and features.

---

## Sub-Files

| File | Title | Purpose | Read Order |
|------|-------|---------|------------|
| `00-index.md` | Knowledge Overview | This index — navigation and overview | 0 |
| `01-project-identity.md` | Project Identity | Name, version, purpose, vision, mission | 1 |
| `02-tech-stack.md` | Tech Stack | Runtime, frontend, CLI, CI/CD components | 2 |
| `03-features.md` | Key Features | Core capabilities and platform support | 3 |
| `04-getting-started.md` | Getting Started | Prerequisites, installation, first run | 4 |

---

## Quick Facts

| Attribute | Value |
|-----------|-------|
| **Project Name** | Agent Assistant |
| **Version** | 4.0.0 |
| **Type** | Node.js CLI Framework + React Web Documentation |
| **License** | MIT |
| **Author** | NamCH |
| **Runtime** | Node.js >= 18.0.0 |
| **Package** | `@namch/agent-assistant` |
| **Repository** | https://github.com/hainamchung/agent-assistant |

---

## Cross-References

| Reference | Destination | When to Read |
|-----------|-------------|--------------|
| Architecture | `../knowledge-architecture/00-index.md` | After completing overview |
| Domain Model | `../knowledge-domain/00-index.md` | Understanding entities and rules |
| Source Code | `../knowledge-source-base/00-index.md` | Before diving into implementation |
| Standards | `../knowledge-standards/00-index.md` | Before writing code or documentation |

---

## Known Gaps

| Gap | Status | Notes |
|-----|--------|-------|
| Performance benchmarks | Pending | No formal benchmarks documented |
| Security audit | Pending | No third-party security review completed |
| API documentation | N/A | This is a CLI tool, not a REST API |

---

## Evidence Sources

The content in this folder was derived from:

- `README.md` — Primary project documentation
- `package.json` — NPM package metadata
- `CHANGELOG.md` — Version history
- `AGENT.md`, `CLAUDE.md`, `CURSOR.md`, `COPILOT.md`, `GEMINI.md`, `CODEX.md` — Platform instruction files
- `rules/CORE.md` — Core orchestration rules
- `rules/AGENTS.md` — Agent definitions
