---
description: "Wiki Hard — Comprehensive wiki generation with deep analysis"
version: "1.1"
category: documentation
execution-mode: execute
---

# /wiki:hard — Comprehensive Wiki Generation

> **Version History**
> - v1.1: Added deliverable size rule (≤150 lines = single file; >150 lines = chunked)



> **MISSION**: Generate a thorough, multi-layered wiki documenting all aspects of the codebase. Deep analysis across architecture, business logic, patterns, and integration points. Produces 15-25 wiki pages covering the complete knowledge needed to understand, modify, and extend the project without reading source files.
>
> **Target output**: 15-25 wiki pages across 6 types (summaries, entities, concepts, comparisons, decisions, chronicles). Runbooks, Syntheses, and Postmortems are generated only if the project contains relevant content.

<scope>$ARGUMENTS</scope>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution
4. **WIKI.md** — Wiki Awareness evaluation protocol
5. `~/.{TOOL}/skills/llm-wiki/SKILL.md` — Wiki engine commands
6. `agents/scouter.md` — (Phase 1 agent; load if sub-agent tool unavailable)

**⛔ Do not run Phase 1 until all are loaded.**

---

## 🔀 TIERED EXECUTION

| Tier       | When               | Action                           |
| ---------- | ------------------ | -------------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY)     |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK)     |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## 📁 DELIVERABLE FILES

| Agent             | Output                                        |
| ----------------- | -------------------------------------------- |
| `scouter`         | `./.reports/{topic}/scouts/SCOUT-{project}.md` (single ≤150 lines; chunked if >150 lines) |
| `wiki-extractor`  | `./.reports/{topic}/wikis/WIKI-HARD-{project}/` (chunked) |
| `wiki-architect`  | `./.reports/{topic}/plans/PLAN-WIKI-{project}.md` (single ≤150 lines; chunked if >150 lines) |
| `wiki-reviewer`   | `./.reports/{topic}/wikis/WIKI-HARD-{project}/review.md` |

All files in `./.reports/{topic}/` → English only.

---

## 🔗 PHASE DEPENDENCIES

| Phase                      | Requires          | Blocking |
| -------------------------- | ----------------- | -------- |
| P1: Deep Scout             | User request      | No       |
| P2: Extract & Structure    | P1 scout findings | No       |
| P3: Plan Wiki Generation   | P2 extraction     | **YES**  |
| P4: Execute Generation     | P3 plan          | **YES**  |
| P5: Review & Refine        | P4 wiki pages     | **YES**  |

**⛔ Blocking**: If input missing → STOP → Create it first → Resume

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent. Within each phase: announce before doing, output format so user sees what's happening.

---

## 🎭 Phase 1: DEEP SCOUT

| Attribute | Value                          |
| --------- | ------------------------------ |
| **Agent** | `scouter`                      |
| **Goal**  | Full codebase architecture map |
| **Exit**  | Architecture understood, patterns documented, integration points mapped |

### Scout Scope

```
1. PROJECT METADATA
   - Language(s), framework(s), runtime version(s)
   - Package manager, build system, CI/CD
   - Environment requirements (.env, config files)

2. ARCHITECTURE LAYERS
   - Layer 1: Entry points (main, server, CLI, workers)
   - Layer 2: Routing/dispatch (API routes, event handlers)
   - Layer 3: Business logic (services, use cases, workflows)
   - Layer 4: Data access (repositories, models, queries)
   - Layer 5: Infrastructure (DB, cache, queue, external services)

3. DIRECTORY STRUCTURE
   - Each directory's purpose and contents
   - Cross-directory dependencies
   - Shared utilities and their consumers

4. PATTERNS & CONVENTIONS
   - Coding patterns (MVC, DI, event-driven, etc.)
   - Naming conventions
   - Error handling patterns
   - Configuration management

5. API CONTRACT (if web/API project)
   - All endpoints with methods, paths, payloads
   - Authentication/authorization mechanisms
   - Response formats and status codes
   - Error response schemas

6. DATA MODELS
   - Database schema or data structures
   - Entity relationships
   - Key transformations
   - Persistence layer

7. INTEGRATION POINTS
   - External services consumed
   - Event publishers/subscribers
   - Webhook handlers
   - Third-party API clients
```

### Output

Full scout report at `./.reports/{topic}/scouts/SCOUT-{project}.md`

### Exit Criteria
- [ ] Architecture layers mapped
- [ ] All key modules documented
- [ ] Patterns and conventions identified
- [ ] API contracts documented (if applicable)
- [ ] Data models extracted
- [ ] Integration points catalogued
- [ ] Scout report written

---

## 🎭 Phase 2: EXTRACT & STRUCTURE

| Attribute   | Value                         |
| ----------- | ----------------------------- |
| **Agent**   | `wiki-extractor`              |
| **Goal**    | Extract all entities and structure wiki taxonomy |
| **Exit**    | Entity catalog complete, wiki taxonomy defined |

### Step 1: Entity Extraction

For each layer from Phase 1, extract:

```
ENTITIES:
  - Functions: name, signature, purpose, side effects, dependencies
  - Classes: name, purpose, public methods, relationships
  - Modules: name, exports, responsibilities
  - Constants/Config: name, purpose, valid values
  - Types/Interfaces: name, fields, relationships

CONCEPTS:
  - Key business rules and where they're enforced
  - Cross-cutting concerns (auth, logging, caching)
  - Data flow patterns

RELATIONSHIPS:
  - Entity → Entity: what uses what
  - Module → Module: dependencies
  - API → Handler: which endpoint calls which service
  - Model → Repository: how data is persisted
```

### Step 2: Define Wiki Taxonomy

Based on extracted entities, define which wiki page types to generate. Only include types that apply to this project:

```
WIKI PAGE TYPES (llm-wiki standard — generate only types present in project):
├── summaries/           → Project overview, architecture summaries
├── entities/            → One page per entity (functions, classes, modules)
├── concepts/            → Business rules, patterns, cross-cutting concerns
├── comparisons/         → Technology choices, pattern alternatives
├── decisions/           → Architecture decisions with rationale
├── chronicles/          → Workflows, processes, step-by-step guides
├── runbooks/            → Operations, deployment, troubleshooting (if applicable)
└── postmortems/         → Past incidents and learnings (if applicable)

NOTE: Runbooks, Syntheses, and Postmortems are generated only when the project
contains relevant content. Do not create empty pages for types that don't apply.
```

### Step 3: Entity Catalog

Create `./.reports/{topic}/wikis/WIKI-HARD-{project}/00-catalog.md`:

```markdown
# Entity Catalog: {Project}

## Wiki Page Taxonomy
| Type | Count | Priority |
|------|-------|----------|
| Summaries | 3 | P0 |
| Entities | {N} | P0 |
| Concepts | {M} | P1 |
| Comparisons | {K} | P2 |
| Decisions | {J} | P2 |

## Entity List
### Layer 1: Entry Points
| Entity | Type | File | Complexity |
|--------|------|------|------------|
| {name} | function | {path} | {H/M/L} |

[... all layers ...]
```

### Exit Criteria
- [ ] All entities catalogued
- [ ] Wiki taxonomy defined (only applicable types)
- [ ] Entity catalog written
- [ ] Relationships mapped

---

## 🎭 Phase 3: PLAN WIKI GENERATION

| Attribute   | Value                         |
| ----------- | ----------------------------- |
| **Agent**   | `wiki-architect`              |
| **Goal**    | Create detailed wiki generation plan |
| **Prerequisite** | **READ** SCOUT report + Entity catalog |
| **Exit**    | Plan file created with all pages, priorities, and sequencing |

### Plan Contents

1. **Page List**: Every wiki page to generate, with:
   - Page title
   - Wiki type (summary/entity/concept/etc.)
   - Source files to reference
   - Priority (P0/P1/P2)

2. **Generation Order**:
   - Foundation first (summaries, architecture)
   - Core entities next (most-used modules)
   - Supporting concepts last (comparisons, decisions)

3. **Source Mapping**:
   - Which source files feed which wiki pages
   - Cross-references between wiki pages

### Output

`./.reports/{topic}/plans/PLAN-WIKI-{project}.md`

### Exit Criteria
- [ ] All wiki pages planned
- [ ] Generation order defined
- [ ] Source mappings documented
- [ ] Plan file created

---

## 🎭 Phase 4: EXECUTE GENERATION

| Attribute    | Value                            |
| ------------ | -------------------------------- |
| **Agent**    | `wiki-extractor` + `wiki-architect` |
| **Prerequisite** | **READ** PLAN-WIKI-{project}.md |
| **Goal**     | Generate all wiki pages per plan |
| **Exit**     | All planned pages created, indexed |

### Step 1: Initialize Wiki (if not exists)

```
IF .wiki/ does not exist:
  → RUN: /wiki init [--project "{project}"]
  → VERIFY: .wiki/, .wiki/sources/, .wiki/wiki/ created
  → ENSURE: .wiki/sources/development/ subdirectory exists (create if missing)
```

> **⚠️ Path Sanitization**: `{project}` names must use only alphanumeric, hyphens, and underscores. No `../` or absolute paths.

> **⚠️ Sensitive Files**: Skip ingestion for: `.env*`, `credentials.json`, `secrets.*`, `*.key`, `*.pem`, `passwords.*`, `*.password`, `id_rsa*`, `*.private`, `config/local.*`, `config/secret.*`. Flag skipped files in the log.


### Step 2: Read the Plan

```
READ: ./.reports/{topic}/plans/PLAN-WIKI-{project}.md
→ Identify all page generation tasks
→ Confirm generation order
→ Verify source mappings are correct
```

### Step 3: Generate Pages in Order

Follow PLAN-WIKI exactly:

```
FOR each page in plan (in generation order):
  a. READ source files mapped to this page
  b. EXTRACT relevant information
  c. CREATE wiki page with:
     - Proper frontmatter (title, type, tags, created, updated)
     - Content derived from source analysis
     - [[wikilinks]] to related pages
     - Source references with file:line citations
  d. APPEND source to .wiki/sources/development/
  e. LOG: record page creation in plan tracker
```

### Step 4: Update Index

```
→ RUN: python ~/.{TOOL}/skills/llm-wiki/scripts/update-index.py
→ APPEND: All new pages to .wiki/index.md
```

### Exit Criteria
- [ ] Wiki initialized (if needed)
- [ ] Plan read and understood
- [ ] All P0 pages generated
- [ ] All P1 pages generated
- [ ] All P2 pages generated
- [ ] Index updated
- [ ] All sources ingested

---

## 🎭 Phase 5: REVIEW & REFINE

| Attribute  | Value                          |
| ---------- | ------------------------------ |
| **Agent**  | `wiki-reviewer`               |
| **Goal**   | Validate wiki quality, coverage, and accuracy |
| **Exit**   | Wiki validated, gaps identified, refinements documented |

### ⚠️ REVIEW TRADE-OFF

The hard variant uses a single-pass review (Phase 5). For adversarial, multi-round review with debate, use `/wiki:team` (7 phases, Golden Triangle on every phase).

### Review Checklist

```
1. COVERAGE CHECK
   □ All planned pages generated?
   □ All key entities documented?
   □ All architecture layers covered?
   □ Integration points explained?

2. ACCURACY CHECK
   □ Source references correct (file:line)?
   □ Entity descriptions match code behavior?
   □ No hallucinated facts?
   □ Wikilinks valid?

3. COMPLETENESS CHECK
   □ Are there pages with just stubs?
   □ Any entity with description "TODO" or "Unknown"?
   □ Missing cross-references between related pages?

4. QUALITY CHECK
   □ Frontmatter complete on all pages?
   □ Content structured and scannable?
   □ Code examples compile / make sense?
```

### Output

`./.reports/{topic}/wikis/WIKI-HARD-{project}/review.md`

```markdown
# Wiki Review: {Project}

## Coverage
- Pages planned: {N}
- Pages generated: {M}
- Coverage: {percentage}%

## Quality
| Dimension | Status |
|-----------|--------|
| Accuracy  | Pass/Fail |
| Completeness | Pass/Fail |
| Structure | Pass/Fail |
| Links     | Pass/Fail |

## Findings
### Critical
- {issue}

### Minor
- {issue}

## Recommendations
1. {action}
```

### Exit Criteria
- [ ] Coverage verified (all planned pages exist)
- [ ] Accuracy checked (source references valid)
- [ ] Completeness verified (no stubs)
- [ ] Review report written
- [ ] Recommendations documented

---

## ✅ COMPLETION

Present comprehensive wiki generation report:

```markdown
## ✅ Wiki Generation Complete — Hard Mode

### 📁 Wiki Created
**Location**: `.wiki/`

| Wiki Type | Pages | Status |
| --------- | ----- |--------|
| Summaries | {N}   | ✅ |
| Entities  | {N}   | ✅ |
| Concepts  | {N}   | ✅ |
| Comparisons | {N} | ✅ |
| Decisions | {N}   | ✅ |
| Chronicles| {N}   | ✅ |
| Runbooks  | {N}   | ⚠️ only if operations docs exist |
| Syntheses | {N}   | ⚠️ only if query feedback exists |
| Postmortems | {N} | ⚠️ only if incidents exist |

**Total**: {N} wiki pages across 6 primary types. Run `/wiki status` for per-type coverage counts.

### 📊 Coverage Metrics
- **Entities documented**: {N}/{M} ({percentage}%)
- **Source files ingested**: {N}
- **Cross-references**: {N}

### 🔍 Verify
- Run `/wiki status` for quality score
- Run `/wiki lint` for health check and quality score
- Run `/wiki graph` to visualize knowledge graph
- Run `/wiki query "..."` to test retrieval
```

---

## 🚀 NEXT STEPS

Before running, verify:
- [ ] CORE.md, PHASES.md, AGENTS.md, WIKI.md, `~/.{TOOL}/skills/llm-wiki/SKILL.md` all loaded
- [ ] Project scope assessed — is hard the right variant for this codebase?

| Action                  | Command                      |
| ----------------------- | ---------------------------- |
| Coverage check          | `/wiki status`              |
| Health check           | `/wiki lint`               |
| Knowledge graph         | `/wiki graph`               |
| Test retrieval          | `/wiki query <question>`     |
| Golden Triangle quality | `/wiki:team` (if perfection needed) |
