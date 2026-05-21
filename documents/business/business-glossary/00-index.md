# Business Glossary — Terminology and Domain Model

> **Folder**: `documents/business/business-glossary/`
> **Purpose**: Canonical terminology, synonyms, domain entities, and API mappings
> **Audience**: All team members, stakeholders, and integration partners

---

## Summary

The **Agent Assistant Glossary** establishes consistent terminology across all documentation, code, and communication. Terminology inconsistency creates confusion, integration errors, and onboarding friction. This glossary resolves ambiguity by defining precise meanings for all domain terms, mapping synonyms to canonical forms, and documenting the relationships between domain entities and API artifacts.

The glossary covers 31 canonical terms organized into four sections: core terminology (orchestrator, agent, command, skill, matrix), synonyms and deprecated terms (legacy aliases and migration guidance), domain entities and events (the data model), and API term mapping (connecting domain language to implementation).

The glossary serves as the authoritative reference for documentation authors, developers integrating with the framework, and anyone contributing to the codebase. When terminology conflicts arise, this document is the final arbiter.

---

## Sub-Files

| File | Title | Purpose | Read Order |
|------|-------|---------|------------|
| `00-index.md` | Business Glossary Index | This index — navigation and overview | 0 |
| `01-canonical-terms.md` | Canonical Terms | All 31 terms with precise definitions | 1 |
| `02-synonyms-and-deprecated-terms.md` | Synonyms and Deprecated Terms | Aliases and migration guidance | 2 |
| `03-domain-entities-and-events.md` | Domain Entities and Events | 7 entity types, 5 event types | 3 |
| `04-api-term-mapping.md` | API Term Mapping | Domain terms to API fields and endpoints | 4 |

---

## Quick Facts

| Attribute | Value |
|-----------|-------|
| **Canonical Terms** | 31 |
| **Synonyms** | 40+ |
| **Deprecated Terms** | 8 |
| **Domain Entities** | 7 |
| **Event Types** | 5 |
| **API Mappings** | 25+ |

---

## Term Categories

| Category | Count | Examples |
|----------|-------|----------|
| Orchestration | 6 | Orchestrator, Tier, Phase, Variant, Handoff, Consensus |
| Agents | 8 | Agent, Executor, Reviewer, Tech Lead, Team |
| Commands | 5 | Command, Router, Variant, Trigger, Dispatch |
| Skills | 4 | Skill, Matrix, Profile, Resolution |
| Platform | 4 | Platform, Cursor, Claude Code, Codex |
| Workflow | 4 | Workflow, Actor, SLA, Handoff |

---

## Cross-References

| Reference | Destination | When to Read |
|-----------|-------------|--------------|
| Features | `../business-features/00-index.md` | Understanding feature terminology |
| Workflows | `../business-workflows/00-index.md` | Understanding workflow terminology |
| Architecture | `../../knowledge-architecture/00-index.md` | Technical terminology |
| Domain | `../../knowledge-domain/00-index.md` | Technical domain model |

---

## Known Gaps

| Gap | Status | Notes |
|-----|--------|-------|
| Internationalization terms | Future | Multi-language glossary |
| Legacy migration guide | Draft | Term evolution history |
| Platform-specific jargon | Future | Per-platform terminology |

---

## Evidence Sources

The content in this folder was derived from:

- `rules/CORE.md` — Core terminology and orchestration laws
- `rules/AGENTS.md` — Agent and team terminology
- `rules/TEAMS.md` — Golden Triangle terminology
- `rules/SKILLS.md` — HSOL and skill terminology
- `rules/PHASES.md` — Phase and workflow terminology
- `web/src/data/agents.ts` — Agent entity definitions
- `commands/` — Command definitions
