---
description: "Wiki Fast — Streamlined wiki generation for quick project understanding"
version: "1.0"
category: documentation
execution-mode: execute
---

# /wiki:fast — Streamlined Wiki Generation

> **MISSION**: Generate an essential wiki quickly. Capture the core architecture, key entities, and top-level concepts of the project in 3-5 wiki pages. Ideal for small-to-medium projects or initial wiki bootstrap.
>
> **Target output**: 3-5 wiki pages covering the essential knowledge needed to understand and navigate the codebase.
>
> **NOT for**: Large projects requiring deep analysis — use `/wiki:hard` or `/wiki:team` instead.

<scope>$ARGUMENTS</scope>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution
4. **WIKI.md** — Wiki Awareness evaluation protocol
5. `~/.{TOOL}/skills/llm-wiki/SKILL.md` — Wiki engine commands

**⛔ Do not run Phase 1 until all are loaded.**

---

## 🔀 TIERED EXECUTION

| Tier       | When               | Action                                               |
| ---------- | ------------------ | ---------------------------------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY)                         |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK)                         |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## 📁 DELIVERABLE FILES

| Agent          | Output                                        |
| -------------- | -------------------------------------------- |
| `wiki-extractor` | `./reports/{topic}/wikis/WIKI-FAST-{project}/` (chunked) |

All files in `./reports/{topic}/` → English only.

---

## 🔗 PHASE DEPENDENCIES

| Phase                  | Requires          | Blocking |
| ---------------------- | ----------------- | -------- |
| P1: Quick Scan         | User request      | No       |
| P2: Extract & Compile  | P1 findings       | **YES**  |

**⛔ Blocking**: If input missing → STOP → Create it first → Resume

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time. Within each phase: output in format so user sees what's happening (announce before doing).

---

## 🎭 Phase 1: Quick Scan

| Attribute  | Value                |
| ---------- | -------------------- |
| **Agent**  | `wiki-extractor`     |
| **Goal**   | Rapid project overview |
| **Exit**   | Key files, modules, entities identified |

### What to Identify

```
1. PROJECT METADATA
   - Language(s) and framework(s)
   - Entry points (main, CLI, server)
   - Package manager / build system

2. MODULE STRUCTURE
   - Top-level directories and their purpose
   - Key modules (>20 lines or exported)
   - Configuration files

3. CORE ENTITIES (top 5-10 by importance)
   - Main classes / functions / modules
   - API routes / endpoints
   - Data models / schemas
   - Critical utilities

4. DEPENDENCIES (external)
   - Key libraries with their purpose
   - Database / cache / queue systems
```

### Output

Produce a brief scan summary (inline, ~20-30 lines) as the Phase 1 deliverable, feeding directly into Phase 2. The inline summary is intentional for speed — it is not written to a file, but serves as the shared context between phases.

- **Project type**: web app / API / CLI / library / etc.
- **Stack**: language, framework, key libraries
- **Structure**: top-level modules and their roles
- **Top entities**: 5-10 most important code elements
- **Entry points**: how the application starts

### Exit Criteria
- [ ] Project type identified
- [ ] Stack documented
- [ ] Module structure mapped
- [ ] Top 5-10 entities extracted
- [ ] Entry points located

---

## 🎭 Phase 2: Extract & Compile

| Attribute    | Value                            |
| ------------ | -------------------------------- |
| **Agent**    | `wiki-extractor`                 |
| **Goal**     | Generate essential wiki pages    |
| **Exit**     | Wiki pages created, index updated |

### ⚠️ REVIEW TRADE-OFF

The Fast variant intentionally **omits a dedicated review phase** to maximize speed. This means:
- Wiki pages may contain minor inaccuracies
- Wikilinks may occasionally break
- No peer validation of coverage completeness

If accuracy is critical, use `/wiki:hard` (has Phase 5 review) or `/wiki:team` (has adversarial review across 7 phases).

### Step 1: Initialize Wiki (if not exists)

```
IF .wiki/ does not exist:
  → RUN: /wiki init [--project "{project}"]
  → VERIFY: .wiki/, .wiki/sources/, .wiki/wiki/ created
  → ENSURE: .wiki/sources/development/ subdirectory exists
    (the init command may not create it — create it if missing:
     RUN: mkdir -p .wiki/sources/development/)
```

> **⚠️ Path Sanitization**: The `{project}` name is derived from the working directory or user argument. Only use alphanumeric characters, hyphens, and underscores. Do NOT use `../` or absolute paths as project names. If the directory name contains special characters, sanitize before ingestion.
>
> **⚠️ Sensitive Files**: Never ingest files matching these patterns into the wiki sources:
> - `.env`, `.env.*`, `*.env*` — environment secrets
> - `credentials.json`, `secrets.*`, `*.key`, `*.pem` — authentication material
> - `passwords.*`, `*.password` — credential files
> - `id_rsa*`, `*.private` — private keys
> - `config/local.*`, `config/secret.*` — local configuration
>
> If a source file is suspected to contain secrets, skip ingestion and note the exclusion in the log.

### Step 2: Ingest Key Sources

For each identified entity category, ingest the relevant source files and extract entity knowledge:

```
FOR each key module/entry point identified in Phase 1:
  → RUN: /wiki ingest {source-file} --category development
  → VERIFY: file appears in .wiki/sources/development/
  → READ the source file
  → EXTRACT: function signatures, class definitions, key logic
  → CREATE wiki pages in .wiki/wiki/ (entities/, summaries/)
    - Frontmatter: title, type, tags, language
    - Content: extracted entities with code references
    - Wikilinks to related entities
```

### Step 3: Generate Wiki Pages

Create the essential wiki pages:

```
1. PROJECT SUMMARY (.wiki/wiki/summaries/project-overview.md)
   - What the project does
   - Key technologies
   - Top-level architecture
   - Entry points

2. ENTITY PAGES (.wiki/wiki/entities/)
   - One page per key entity (class/module/function)
   - Purpose, parameters, return values, relationships
   - Source file reference with line numbers

3. MODULE MAP (.wiki/wiki/summaries/module-map.md)
   - Directory structure
   - Each module's purpose
   - Dependencies between modules
```

### Step 4: Update Index

```
→ RUN: python ~/.{TOOL}/skills/llm-wiki/scripts/update-index.py
→ APPEND: Entry to .wiki/log.md
→ VERIFY: index.md includes new pages
```

### Exit Criteria
- [ ] Wiki initialized (if needed)
- [ ] Sources ingested (development category)
- [ ] Project summary page created
- [ ] Module map created
- [ ] Top entity pages created (5-10)
- [ ] Index updated
- [ ] Log entry added

---

## ✅ COMPLETION

Present wiki generation report:

```markdown
## ✅ Wiki Generation Complete — Fast Mode

### 📁 Wiki Created
**Location**: `.wiki/`

| Page Type | Count | Location |
| --------- | ----- | -------- |
| Summaries | 2     | wiki/summaries/ (project-overview + module-map) |
| Entities  | {N}   | wiki/entities/ |

**Total**: {N} wiki pages generated

### 📊 Coverage
- **Entities documented**: {N} (from {M} identified in scan)
- **Modules mapped**: {N}
- **Sources ingested**: {N}

### 🔍 Verify
- Run `/wiki status` to check coverage
- Run `/wiki graph` to visualize knowledge graph
- Run `/wiki query "..."` to test retrieval
```

---

## 🚀 NEXT STEPS

Before running, verify:
- [ ] CORE.md, PHASES.md, AGENTS.md, WIKI.md, `~/.{TOOL}/skills/llm-wiki/SKILL.md` all loaded

| Action             | Command                      |
| ------------------ | ---------------------------- |
| Check coverage     | `/wiki status`               |
| Visualize knowledge | `/wiki graph`                |
| Test retrieval     | `/wiki query <question>`     |
| Health check       | `/wiki lint`                 |
| Full wiki          | `/wiki:hard` (if more needed) |
