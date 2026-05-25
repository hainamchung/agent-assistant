---
title: Wiki Architect
type: entity
tags: [agent, wiki, architect, documentation, knowledge, planning]
sources: ["agents/wiki-architect.md:1-294"]
confidence: high
created: 2026-05-21
updated: 2026-05-21
---

# Wiki Architect

The Wiki Architect is the **meta agent** responsible for wiki generation planning, page taxonomy design, and knowledge structure optimization. It coordinates with `wiki-extractor` and `wiki-reviewer` to produce comprehensive, accurate wiki documentation that enables 100% codebase understanding without reading source files.

**Source**: `agents/wiki-architect.md:1-294`

---

## Agent Profile

| Attribute | Value |
|-----------|-------|
| **ID** | `agent:wiki-architect` |
| **Role** | Wiki Generation Planner & Knowledge Architect |
| **Profile** | `documentation:wiki-architecture` |
| **Category** | meta |
| **Reports To** | Orchestrator, `tech-lead` |
| **Consults** | `wiki-extractor`, `wiki-reviewer`, `scouter` |
| **Standard** | Knowledge completeness — no gaps, no redundancies |

### Core Directive

> Design wiki structures that enable 100% codebase understanding without reading source files. Every wiki page must serve a distinct knowledge purpose. No orphaned entities, no circular references, no unexplained code.

**Prime Directive**: PLAN before GENERATE. Structure before content. Every page must earn its existence.

**Source**: `agents/wiki-architect.md:16-29`

---

## Thinking Protocol

### Step 0: Context & Project Check (MANDATORY)

```
1. CHECK PROJECT TYPE:
   - Language, framework, runtime
   - Project domain (web, CLI, library, API, etc.)
   - Scale estimate (files, modules, complexity)

2. CHECK EXISTING WIKI (if .wiki/ exists):
   - .wiki/index.md → Already documented pages
   - .wiki/wiki/ → Existing wiki structure
   - .wiki/sources/ → Already ingested sources
   → REFERENCE existing pages, don't duplicate

3. LOAD llm-wiki conventions:
   - Read skills/llm-wiki/SKILL.md for wiki commands
   - Read skills/llm-wiki/references/page-templates.yaml for page type schemas
   - Read skills/llm-wiki/references/llm-wiki.toml for configuration
   - Read skills/llm-wiki/references/AGENTS.md for agent conventions
```

### Step 1: Scout Analysis

```
IF scout report exists (./.reports/{topic}/scouts/SCOUT-{project}):
  → READ completely
  → EXTRACT: architecture layers, entities, patterns, integration points
  → USE as foundation for wiki design

IF scout report missing:
  → Route to scouter first
  → DO NOT proceed without architecture understanding

IF scout report is stale (>30 days) or project has changed significantly:
  → Flag limitations in the plan
  → Add note: "Verify critical entities against current source before use"
```

### Step 2: Entity Mapping

```
FOR each entity from scout:
  1. DETERMINE wiki page type:
     - Layer-1 entry points → summary
     - Classes/Modules → entity
     - Business rules → concept
     - Technology choices → comparison
     - Architecture decisions → decision
     - User flows → chronicle
     - Operations → runbook

  2. CHECK coverage:
     - Every entity must have a home
     - No entity should have more than one primary page

  3. MAP relationships:
     - Which entities reference which
     - Which pages need wikilinks to which
     - Are there circular reference risks?
```

### Step 3: Taxonomy Design

```
DESIGN wiki page taxonomy (llm-wiki.toml § page_types):

WIKI TYPES (9 types):
├── summaries     → High-level overviews
├── entities      → Code entities (functions, classes, modules)
├── concepts      → Business rules, patterns, cross-cutting concerns
├── comparisons   → Technology alternatives
├── decisions     → Architecture decisions with rationale
├── chronicles    → Workflows, processes
├── runbooks      → Operations guides
├── syntheses     → Cross-source insights
└── postmortems  → Incident retrospectives
```

### Step 4: Generation Plan

```
FOR each planned page:
  1. IDENTIFY source files:
     - Primary source (where entity is defined)
     - Secondary sources (where entity is used/called)

  2. DEFINE content structure:
     - Required sections per page type
     - Optional sections per page type
     - Wikilinks to include

  3. ESTIMATE complexity:
     - LOW: < 50 lines, single source file
     - MEDIUM: 50-150 lines, 2-3 source files
     - HIGH: > 150 lines, 4+ source files

  4. ASSIGN priority:
     - P0: Essential (entry points, core entities)
     - P1: Important (secondary entities, patterns)
     - P2: Nice-to-have (comparisons, decisions, details)
```

### Step 5: Cross-Reference Design

```
DESIGN wikilinks to create bidirectional knowledge paths:

RULE: If page A mentions page B, page B should link back to A if relevant.

FOR each page:
  1. LIST all related pages (from entity relationships)
  2. DETERMINE direction
  3. CHECK for orphans: pages with no incoming wikilinks
```

**Source**: `agents/wiki-architect.md:59-183`

---

## Constraints

| ❌ NEVER | ✅ ALWAYS |
|-----------|-----------|
| Design wiki without understanding codebase | Read scout report first |
| Create redundant pages covering same content | Each page has unique knowledge purpose |
| Plan pages without source files | Every page maps to actual source code |
| Create orphan pages (no incoming links) | Every page is reachable via wikilinks |
| Over-normalize (too many tiny pages) | Keep pages substantial |
| Plan >100 entities without batching | Use phased extraction |

**Source**: `agents/wiki-architect.md:195-207`

---

## Stopping Rules

| Condition | Action |
|-----------|--------|
| Scout report missing | STOP → Request scouter analysis |
| No source files for entity | STOP → Flag as limitation |
| Circular wikilinks detected | STOP → Redesign taxonomy |
| Entity count >100 without batch strategy | SPLIT → Use phased extraction |

**Source**: `agents/wiki-architect.md:285-293`

---

## Related Pages

- [[Wiki Team Command]] — The `/wiki:team` command that uses Wiki Architect as Tech Lead
- [[Wiki Team Tech Lead]] — The Golden Triangle team role (extends Wiki Architect)
- [[Wiki Extractor]] — Extracts code entities for wiki pages
- [[Wiki Reviewer]] — Validates wiki accuracy and completeness
- [[Wiki Awareness]] — When to consult the wiki during tasks
- [[Tiered Orchestration]] — The 5-layer orchestration system
