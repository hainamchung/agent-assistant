# Knowledge Domain

> **Folder**: `documents/knowledge-domain/`
> **Purpose**: Core entities, business rules, and domain model
> **Audience**: Developers, architects, anyone implementing the domain

---

## Summary

The Agent Assistant domain consists of seven core entity types: Agents, Commands, Rules, Skills, Matrix Skills, Teams, and Platform Configs. These entities are orchestrated through a set of business rules that govern routing, variant selection, skill resolution, and platform path resolution.

This folder documents the domain model, entities, and business rules that govern how the system operates.

---

## Sub-Files

| File | Title | Purpose | Audience |
|------|-------|---------|----------|
| `00-index.md` | Domain Index | Navigation and overview | All |
| `01-entities.md` | Entities | Core entity definitions | Developers |
| `02-database-schema.md` | Database Schema | N/A — file-based system | N/A |
| `03-api-contracts.md` | API Contracts | N/A — command-based CLI | N/A |
| `04-business-rules.md` | Business Rules | Validation and routing rules | Developers |

---

## Quick Facts

| Attribute | Value |
|-----------|-------|
| **Entity Count** | 7 core types |
| **Agent Count** | 21 specialists |
| **Command Count** | 14 commands |
| **Team Count** | 18 teams |
| **Skill Count** | 1400+ |
| **Platforms** | 5 |

---

## Entity Overview

| Entity | Description | Location |
|--------|-------------|----------|
| **Agent** | Specialist task executor | `agents/` |
| **Command** | User-requested action | `commands/` |
| **Rule** | Orchestration protocol | `rules/` |
| **Skill** | Domain knowledge | `skills/` |
| **Matrix Skill** | Skill tier classification | `matrix-skills/` |
| **Team** | Coordinated agent group | `agents/teams/` |
| **Platform Config** | Platform-specific settings | `code-assistants/` |

---

## Cross-References

| Reference | Destination | Relationship |
|-----------|-------------|--------------|
| Architecture | `../knowledge-architecture/00-index.md` | System design |
| Source Code | `../knowledge-source-base/00-index.md` | Implementation |
| Standards | `../knowledge-standards/00-index.md` | Conventions |

---

## Known Gaps

| Gap | Status | Notes |
|-----|--------|-------|
| Entity validation schema | Pending | No formal JSON schema |
| Relationship diagram | Pending | Text-based only |
| Domain events | Pending | Not modeled |

---

## Evidence Sources

- `agents/` — 21 agent files
- `commands/` — 14 command files
- `rules/` — 8 rule files
- `skills/` — Skill registry
- `matrix-skills/` — Skill tiers
- `agents/teams/` — Team definitions
- `code-assistants/` — Platform configs
