---
title: Wiki Awareness
type: concept
tags: [wiki, awareness, knowledge, consultation, localization, context]
sources: ["rules/WIKI.md:1-251"]
confidence: high
created: 2026-05-21
updated: 2026-05-21
---

# Wiki Awareness

Wiki Awareness is the **evaluation step** in task execution that determines whether consulting the project wiki meaningfully improves output. Rather than always loading the wiki or never loading it, the system evaluates each task against complexity indicators and makes an evidence-based decision.

**Core Principle**: Wiki consultation is an **evaluation step**, not a requirement. Only consult the wiki when the evaluation shows it will meaningfully improve task execution. Small, isolated tasks should skip wiki to conserve resources.

**Source**: `rules/WIKI.md:1-251`

---

## Evaluation Flow

```
ON TASK RECEIPT:

1. ASSESS task complexity (see § Complexity Indicators)
2. CHECK .wiki/ existence
3. EVALUATE: Does wiki consultation make the task better?
   - YES → Consult relevant wiki pages (Step 3)
   - NO  → Proceed with source analysis, skip wiki

❌ NEVER: Blindly load wiki for every task regardless of size
✅ ALWAYS: Evaluate first, then decide
```

**Source**: `rules/WIKI.md:17-30`

---

## Complexity Indicators

### High Complexity → Wiki Recommended

| Indicator | Example |
|-----------|---------|
| Multi-layer scope | Task spans API, business logic, data layer |
| Architecture impact | Changes to core structures or patterns |
| Business logic | Requires understanding domain rules |
| Cross-cutting concerns | Auth, caching, logging, middleware |
| Integration points | External services, webhooks, events |
| Large codebase | >20 files, multiple modules |
| Onboarding context | New team member, unfamiliar domain |
| Context bounding needed | Token budget for large projects |

### Low Complexity → Wiki Optional

| Indicator | Example |
|-----------|---------|
| Single file | One isolated file change |
| Obvious root cause | Trivial bug with clear fix |
| Well-scoped feature | Small, contained addition |
| Cosmetic change | UI styling, copy text |
| Routine task | Standard CRUD, simple refactor |
| Already familiar | Well-known area, recent work |

**Source**: `rules/WIKI.md:34-59`

---

## Evaluation Decision Matrix

```
.wiki/ exists?
├─ NO
│   └─ → No wiki to consult. Proceed with source analysis.
│
└─ YES
    └─ Task complexity HIGH?
        ├─ NO (simple task)
        │   └─ → Wiki unnecessary. Source analysis is faster and sufficient.
        │
        └─ YES (complex task)
            └─ Would wiki consultation meaningfully improve output?
                ├─ NO (task is focused, well-bounded)
                │   └─ → Quick wiki glance (index only) for context, skip deep dive.
                │
                └─ YES (task benefits from project context)
                    └─ → Full wiki consultation. Load relevant pages, validate, use.
```

**Source**: `rules/WIKI.md:62-81`

---

## 3-Step Evaluation Process

### Step 1: Check Wiki Existence

```
1. CHECK for .wiki/ directory in project root
2. IF exists:
   a. READ .wiki/index.md for page catalog
   b. CHECK .wiki/log.md for last update timestamp
   c. ASSESS freshness:
      - Recent update → wiki is current
      - Stale (>30 days or major changes since) → wiki may be unreliable
3. IF not exists:
   → Proceed without wiki (no wiki to consult — just skip)

> Stale Threshold: Pages older than 30 days are stale. If wiki pages are older than
  that threshold or major source changes have occurred since the last update,
  validate critical wiki pages against source before trusting them.
```

### Step 2: Evaluate Complexity

```
Assess task against the complexity indicators above.

OUTPUT:
- COMPLEXITY: HIGH / MEDIUM / LOW
- WIKI_RELEVANCE: HIGH / MEDIUM / LOW / NONE
- RECOMMENDATION: Full consultation / Quick glance / Skip
```

### Step 3: Consult Wiki (Conditional)

**Only execute this step if Step 2 recommends consultation.**

```
IF WIKI_RELEVANCE >= MEDIUM AND .wiki/ exists:

1. LOAD relevant wiki pages:
   - Project overview → .wiki/wiki/summaries/project-overview.md
   - Architecture → .wiki/wiki/summaries/architecture-overview.md
   - Relevant entity pages → .wiki/wiki/entities/{entity}.md
   - Relevant concept pages → .wiki/wiki/concepts/{concept}.md

2. USE wiki as FOUNDATIONAL CONTEXT:
   - Understand project structure from summaries
   - Identify key entities and their relationships
   - Learn architecture patterns and conventions
   - Verify understanding against wiki before diving into source

3. VALIDATE against SOURCE (spot-check critical pages):
   - Select 1-2 critical entities from wiki
   - Read corresponding source files
   - Confirm wiki accuracy
   - If wiki is WRONG, FLAG discrepancy and prefer source

4. INCORPORATE into TASK:
   - Reference wiki pages in planning
   - Use entity relationships to trace code paths
   - Cite wiki in reports/deliverables
   - Update wiki with new insights if significant
```

**Source**: `rules/WIKI.md:85-146`

---

## Execution Guidelines

```
WHEN wiki consultation is BENEFICIAL:
  ✅ DO: Load wiki for complex, multi-layer tasks
  ✅ DO: Use wiki to understand project context quickly
  ✅ DO: Cite wiki pages in deliverables
  ✅ DO: Update wiki with genuine new insights
  ✅ DO: Flag wiki inaccuracies when found

WHEN wiki consultation is WASTEFUL:
  ❌ DON'T: Load wiki for trivial single-file changes
  ❌ DON'T: Force wiki usage when source analysis is faster
  ❌ DON'T: Load entire wiki when task is well-bounded
  ❌ DON'T: Treat wiki as required overhead for every task
```

**Source**: `rules/WIKI.md:149-165`

---

## Source Ingestion Security

When ingesting source files into the wiki:

**Sensitive File Exclusion** — Do NOT ingest these patterns:

```
- .env, .env.*, *.env*              → environment secrets
- credentials.json, secrets.*        → authentication material
- *.key, *.pem, *.crt              → cryptographic keys/certs
- passwords.*, *.password            → credential files
- id_rsa*, *.private               → SSH/PGP private keys
- config/local.*, config/secret.*   → local secrets

IF a file matches any pattern:
  → SKIP ingestion (do NOT write to .wiki/sources/)
  → LOG: "SKIPPED (sensitive): {filename}"
  → Document the exclusion in the wiki page's related entities section
```

**Path Sanitization**: Project names and source file paths use only alphanumeric, hyphens, underscores, and forward slashes. Paths containing `..` or absolute paths are rejected.

**Source**: `rules/WIKI.md:168-187`

---

## Wiki Maintenance Triggers

```
After completing tasks, evaluate if wiki needs update:

STRONG TRIGGER (update wiki immediately):
  - New architecture layer or module added
  - New integration points with external services
  - New business rules or domain concepts
  - Schema changes to data models
  - New patterns introduced

MODERATE TRIGGER (update wiki in next session):
  - Refactored significant code paths
  - Changed entity relationships
  - Modified API contracts

SUGGEST WIKI REGENERATION:
  - >30% of source files changed since last wiki update
  - Major version upgrade (language, framework, runtime)
  - Wiki reported as outdated by team
```

### Self-Project Exception

The `/wiki` commands generate wiki documentation for **end-user projects**, not for the agent-assistant project itself. When running from within the agent-assistant workspace:

- Do NOT generate a wiki for the agent-assistant's own commands, agents, or rules.
- The agent-assistant's `.wiki/` (if any) is for its own documentation purposes.
- When helping a user document their project, write to their project's `.wiki/` directory.
- Be mindful of path traversal: ensure project names are sanitized (alphanumeric, hyphens, underscores only).

**Source**: `rules/WIKI.md:188-219`

---

## Agent Delegation Integration

```
WHEN delegating to wiki agents:
  → USE: wiki-architect (for planning wiki structure)
  → USE: wiki-extractor (for code analysis and page creation)
  → USE: wiki-reviewer (for quality validation)

WHEN delegating to other agents:
  → INCLUDE: wiki page references in context IF wiki consultation was beneficial
  → INCLUDE: relevant wiki entity relationships IF applicable
  → EXCLUDE: "must consult .wiki/" from task brief unless evaluation recommends it
```

**Source**: `rules/WIKI.md:221-235`

---

## Related Pages

- [[Wiki Team Command]] — The `/wiki:team` command that generates wikis
- [[Wiki Architect]] — Plans wiki structure and knowledge organization
- [[Wiki Extractor]] — Extracts and documents code entities
- [[Wiki Reviewer]] — Validates wiki accuracy and completeness
- [[Rule System]] — All 8 orchestration rules
- [[Tiered Orchestration]] — The 5-layer orchestration architecture
