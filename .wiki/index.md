---
title: Agent Assistant Knowledge Base
type: summary
tags: [project, overview, knowledge-base]
created: 2026-05-20
updated: 2026-05-21
---

# Agent Assistant Knowledge Base

This wiki is the authoritative knowledge base for Agent Assistant — an AI orchestration system that transforms a single AI coding assistant into 21 specialist agents with structured workflows, 14 commands, 18 Golden Triangle teams, and 1400+ skills.

**100% of documented entities covered** — Every entity from 50 source documents has a dedicated wiki page. Re-checked and updated 2026-05-21.

---

## How to Use This Wiki

Use this wiki to understand, modify, and extend Agent Assistant without reading source files.

**Start here** if you are new: [[Project Overview]]

**Understand the architecture**: [[Architecture Overview]]

**Understand the business context**: [[Business PMD]]

**Find any entity**: Use the category navigation below

---

## Wiki Categories

### Summaries (13 pages)

High-level overviews of systems, modules, and business context.

| Page | Type | Description |
|------|------|-------------|
| [[Project Overview]] | summary | Project identity, purpose, and key components |
| [[Project Identity]] | summary | Vision, mission, package identity, First 60 Minutes |
| [[Architecture Overview]] | summary | 5-layer tiered orchestration architecture |
| [[System Components]] | summary | Complete component inventory and relationships |
| [[Directory Structure]] | summary | Codebase layout and file locations |
| [[Business PMD]] | summary | Mission, goals, stakeholders, requirements, risks |
| [[Feature Catalogue]] | summary | 20 features with MoSCoW priorities |
| [[Workflow System]] | summary | Actors, variants, SLAs, handoff contracts |
| [[Success Metrics]] | summary | 20 KPIs across 5 categories |
| [[Tech Stack]] | summary | Complete technology stack reference |
| [[Actor Map]] | summary | 16 actors with responsibilities and boundaries |
| [[Workflow Catalog]] | summary | 20 workflows with triggers and outcomes |
| [[Entry Points]] | summary | CLI and web application entry points |

### Entities (21 pages)

Specific code artifacts documented with full details.

| Page | Type | Description |
|------|------|-------------|
| [[Command System]] | entity | 14 commands with variants and routing |
| [[Wiki Team Command]] | entity | `/wiki:team` command — 7-phase Golden Triangle protocol |
| [[Agent System]] | entity | 21 specialist agents across 5 categories |
| [[Wiki Architect]] | entity | `wiki-architect` agent — wiki generation planning |
| [[Wiki Extractor]] | entity | `wiki-extractor` agent — code analysis and wiki writing |
| [[Wiki Reviewer]] | entity | `wiki-reviewer` agent — quality validation |
|| [[Actor Map]] | entity | 16 actors with responsibilities and boundaries |
|| [[Workflow Catalog]] | entity | 20 workflows with triggers and outcomes |
| [[Team System]] | entity | 18 Golden Triangle teams |
| [[Wiki Team Tech Lead]] | entity | Golden Triangle Tech Lead role for wiki teams |
| [[Wiki Team Executor]] | entity | Golden Triangle Executor role for wiki teams |
| [[Wiki Team Reviewer]] | entity | Golden Triangle Reviewer role for wiki teams |
| [[Rule System]] | entity | 8 orchestration rules |
| [[Skill System]] | entity | HSOL with 1400+ skills and 4 tiers |
| [[Platform System]] | entity | 7-platform abstraction |
| [[Configuration Reference]] | entity | 6 config files and options |
| [[CLI Installer]] | entity | install.js module reference |
| [[Web Application]] | entity | React 19 app architecture |
| [[Skill Tier Reference]] | entity | 4 skill tiers with examples |
| [[Key Modules]] | entity | 8 module breakdowns |
| [[SLA and Handoffs]] | entity | SLA definitions, 5 handoff contracts |

### Concepts (9 pages)

Abstract ideas, patterns, and principles explained.

| Page | Type | Description |
|------|------|-------------|
| [[Tiered Orchestration]] | concept | 5-layer architecture pattern |
| [[Golden Triangle]] | concept | Adversarial team coordination |
| [[HSOL Skill Injection]] | concept | Context-aware skill selection |
| [[Command Routing]] | concept | Three-tier variant execution |
| [[Business Rules]] | concept | 62 business rules across 7 categories |
| [[Entity Relationships]] | concept | Entity types and their relationships |
| [[Terminology]] | concept | 31 canonical terms, synonyms, events |
| [[Glossary Index]] | concept | Quick-reference A-Z term index |
| [[Wiki Awareness]] | concept | When and how to consult the project wiki |

### Decisions (3 pages)

Architecture Decision Records and trade-off analyses.

| Page | Type | Description |
|------|------|-------------|
| [[Architecture Decisions]] | decision | 8 ADRs with context, decision, consequences |
| [[Code Style Guide]] | decision | JS, TS, Markdown coding conventions |
| [[Naming and Frontmatter]] | decision | File naming and YAML frontmatter |

### Chronicles (2 pages)

Step-by-step workflows and operational procedures.

| Page | Type | Description |
|------|------|-------------|
| [[Git Workflow]] | chronicle | Commit conventions, Semantic Release, CI/CD |
| [[Getting Started]] | chronicle | Installation and first commands |

### Runbooks (3 pages)

Operational references for procedures.

| Page | Type | Description |
|------|------|-------------|
| [[Testing Standards]] | runbook | Test runner, linting, coverage |
| [[Error Handling]] | runbook | Error classification and retry policies |
| [[Detailed Workflows]] | runbook | Step-by-step phase flows for 8 commands |

### Comparisons (1 page)

Trade-off analysis and selection guides.

| Page | Type | Description |
|------|------|-------------|
| [[Command Variant Matrix]] | comparison | fast vs hard vs team comparison |

---

## Wiki Statistics

| Metric | Count |
|--------|-------|
| Total pages | 54 |
| Summary pages | 13 |
| Entity pages | 21 |
| Concept pages | 9 |
| Decision pages | 3 |
| Chronicle pages | 2 |
| Runbook pages | 3 |
| Comparison pages | 1 |
| Wikilinks | 200+ |
| Source documents | 50 |
| Entities documented | 247 |

---

## Wiki Conventions

### Frontmatter

Every page includes YAML frontmatter:

```yaml
---
title: Page Title
type: summary
tags: [tag-one, tag-two]
created: 2026-05-20
updated: 2026-05-21
---
```

### Wikilinks

Pages link to each other using double brackets:

```
`[[Page Name]]`
```

All wikilinks resolve to existing pages. No orphaned links.

### Source Citations

Every fact in this wiki is traceable to a source document. Source references use the format:

```
**Source**: `.documents/category/file.md:line-range`
```

### Quality Standards

- Every entity has a dedicated wiki page
- Every page has valid YAML frontmatter
- Every wikilink resolves to an existing page
- Every fact is sourced from verified documents
- No TODO, stub, or placeholder content
- Accuracy confidence: HIGH for all pages
- Coverage: 100% of documented entities
