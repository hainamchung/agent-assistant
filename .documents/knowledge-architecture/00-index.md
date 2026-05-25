# Knowledge Architecture

> **Folder**: `.documents/knowledge-architecture/`
> **Purpose**: System design, components, patterns, and decisions
> **Audience**: Architects, senior developers, technical leads

---

## Summary

The Agent Assistant architecture follows a **Tiered Orchestration Pattern** that transforms a single AI into a coordinated multi-agent system. The architecture spans five layers: Commands, Rules, Agents, Teams, and Skills.

This folder contains the complete architectural documentation including system overview, component breakdown, data flow, design patterns, and architecture decision records.

---

## Sub-Files

| File | Title | Purpose | Audience |
|------|-------|---------|----------|
| `00-index.md` | Architecture Index | Navigation and overview | All |
| `01-system-overview.md` | System Overview | High-level diagram and architecture style | Architects |
| `02-components.md` | Components | Per-component breakdown | Developers |
| `03-data-flow.md` | Data Flow | Request lifecycle and flow diagrams | Developers |
| `04-design-patterns.md` | Design Patterns | Core patterns explained | All |
| `05-decisions.md` | Architecture Decisions | ADR table and rationale | Architects |

---

## Quick Facts

| Attribute | Value |
|-----------|-------|
| **Architecture Style** | Tiered Orchestration |
| **Primary Pattern** | Golden Triangle (3-agent teams) |
| **Skill Injection** | HSOL (Hybrid Skill Orchestration Layer) |
| **Command Variants** | 3 (fast, hard, team) |
| **Agent Count** | 21 specialists |
| **Team Count** | 18 Golden Triangles |
| **Skill Count** | 1400+ domain skills |

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INPUT LAYER                         │
│         Natural Language → Command Routing                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    COMMAND LAYER                            │
│         14 Commands × 3 Variants = 42 Execution Paths       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    RULE LAYER                               │
│         CORE, PHASES, AGENTS, SKILLS, TEAMS, ERRORS        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    AGENT LAYER                              │
│              24 Specialist Agents + HSOL                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    TEAM LAYER                               │
│            18 Golden Triangle Teams                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SKILL LAYER                              │
│         4 Tiers × 1400+ Domain Skills                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Cross-References

| Reference | Destination | Relationship |
|-----------|-------------|--------------|
| Domain Model | `../knowledge-domain/00-index.md` | Entities and business rules |
| Source Code | `../knowledge-source-base/00-index.md` | Implementation details |
| Standards | `../knowledge-standards/00-index.md` | Code conventions |
| Overview | `../knowledge-overview/00-index.md` | Project context |

---

## Known Gaps

| Gap | Status | Impact |
|-----|--------|--------|
| Sequence diagrams for all commands | Pending | Documentation incomplete |
| Performance benchmarks | Pending | No SLA defined |
| Scalability testing | Pending | Unknown agent limit |

---

## Evidence Sources

- `rules/CORE.md` — Core orchestration rules
- `rules/PHASES.md` — Phase definitions
- `rules/AGENTS.md` — Agent definitions
- `rules/TEAMS.md` — Team definitions
- `rules/SKILLS.md` — Skill orchestration
- `agents/` — 21 agent files
- `agents/teams/` — 18 team definitions
