---
description: "Wiki Generation - AI-powered wiki documentation suite (fast, hard, team variants)"
version: "1.0"
category: documentation
execution-mode: execute
---

# /wiki — Wiki Generation Suite

> **MISSION**: Generate a comprehensive, AI-consumable `.wiki` documentation suite from a codebase. Uses the `llm-wiki` skill as the foundation engine. Three quality tiers: fast (essential), hard (comprehensive), team (Golden Triangle perfection).

<scope>$ARGUMENTS</scope>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS ALL VARIANTS)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution
4. TEAMS.md — Golden Triangle (for `:team` variant)
5. **WIKI.md** — Wiki Awareness evaluation protocol
6. `~/.{TOOL}/skills/llm-wiki/SKILL.md` — Wiki engine commands

**⛔ Do not run any wiki variant until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions.

**Wiki Engine**: All wiki generation is powered by `@skills/llm-wiki/`. The skill's scripts handle source ingestion, page compilation, index management, and knowledge graph generation. Read `~/.{TOOL}/skills/llm-wiki/SKILL.md` before any wiki operation.

---

## 🔀 VARIANT SELECTION

Upon receiving a `/wiki` command, assess scope and select the appropriate variant:

### Fast: `/wiki:fast`

> **When to use**: Small-to-medium projects (< 20 source files), new codebase, or initial wiki bootstrap.

**Triage:**
- Quick codebase scan
- Essential entity extraction (functions, classes, modules)
- Summary pages only
- 3-5 page wiki output

**Phases**: 2 (Extract → Compile)

### Hard: `/wiki:hard`

> **When to use**: Medium-to-large projects, existing codebase needing thorough documentation, or when completeness is required.

**Triage:**
- Deep codebase analysis (architecture, patterns, integration points)
- Comprehensive entity extraction across all layers
- All wiki page types (summaries, entities, concepts, comparisons, decisions)
- 15-25 page wiki output

**Phases**: 5 (Deep Scout → Extract & Structure → Plan Wiki Generation → Execute Generation → Review & Refine)

### Team: `/wiki:team`

> **When to use**: Mission-critical projects, large codebases, or when 100% documentation coverage is non-negotiable. Every phase uses Golden Triangle (Tech Lead + Executor + Reviewer).

**Triage:**
- Full codebase analysis with adversarial review
- Every business logic path documented
- Peer-review validation at each phase
- 30+ page wiki output

**Phases**: 7 (all Golden Triangle)

> **Scope Guard**: `/wiki:team` is designed for large, complex projects. For small projects (<20 files), use `/wiki:hard`. For quick bootstraps, use `/wiki:fast`. The Golden Triangle incurs significant overhead — only worth it when the codebase has enough depth for adversarial review to find meaningful gaps.

---

## ⚙️ WIKI OUTPUT CONVENTIONS

All wiki content follows the llm-wiki standard:

```
.wiki/                    # Root wiki directory
├── AGENTS.md             # Wiki conventions (auto-generated)
├── index.md              # Master catalog of all pages
├── log.md                # Change log
├── llm-wiki.toml         # Configuration
├── sources/              # Ingested source documents (8 categories)
│   ├── product/
│   ├── design/
│   ├── architecture/
│   ├── development/
│   ├── operations/
│   ├── meetings/
│   ├── references/
│   └── data/
└── wiki/                 # Generated wiki pages (9 types)
    ├── summaries/
    ├── entities/
    ├── concepts/
    ├── comparisons/
    ├── syntheses/
    ├── chronicles/
    ├── decisions/
    ├── runbooks/
    └── postmortems/
```

**Knowledge Localization Goal**: The wiki must contain 100% of the knowledge needed to understand, modify, and extend the codebase — without reading source files directly.

---

## 🔄 ROUTING LOGIC

```
IF user requests /wiki:fast  → LOAD commands/wiki/fast.md  → EXECUTE
IF user requests /wiki:hard  → LOAD commands/wiki/hard.md  → EXECUTE
IF user requests /wiki:team  → LOAD commands/wiki/team.md  → EXECUTE
IF user requests /wiki only  → Assess scope → Route to appropriate variant
```

---

## 📋 COMMON WIKI OPERATIONS

Regardless of variant, these llm-wiki skill commands are available:

| Command | Purpose |
|---------|---------|
| `/wiki setup` | First-time wiki initialization in a project |
| `/wiki init` | Initialize wiki structure |
| `/wiki ingest <file>` | Parse a document into wiki source |
| `/wiki compile` | AI-generate wiki pages from sources |
| `/wiki query <question>` | Search wiki and answer questions |
| `/wiki lint` | Health check on wiki quality |
| `/wiki status` | Wiki statistics and coverage report |
| `/wiki graph` | Generate knowledge graph |

---

## 📝 IMPLEMENTATION TARGETS

Per the mission: **This command suite generates the wiki FOR end-user projects, not for the agent-assistant project itself.**

- Wiki outputs are written to the **end-user's project directory** (current working directory when `/wiki` is invoked).
- The agent-assistant's own `.wiki/` (if any) is NOT modified by these commands.
- Each variant specifies where wiki content is placed.

---

## ✅ SELF-CHECK (Before Running Any Variant)

```
□ CORE.md loaded
□ PHASES.md loaded
□ AGENTS.md loaded
□ TEAMS.md loaded (for :team variant)
□ WIKI.md loaded
□ ~/.{TOOL}/skills/llm-wiki/SKILL.md loaded
□ Variant selected correctly based on project scope
□ Wiki engine (llm-wiki) verified available
```

---

## 🔗 VARIANT FILES

| Variant | File | Phases | Quality | Notes |
|---------|------|--------|---------|-------|
| Fast | `commands/wiki/fast.md` | 2 | Essential | ⚠️ No dedicated review phase — speed prioritized |
| Hard | `commands/wiki/hard.md` | 5 | Comprehensive | ✅ Single-pass review (Phase 5) |
| Team | `commands/wiki/team.md` | 7 | Golden Triangle | ✅ Adversarial review (7 phases) |

> **Quality vs Speed**: Fast mode skips review for speed. Use Hard or Team when accuracy is critical.

**Size rule**: Deliverables ≤150 lines → single file; >150 lines or ≥4 sections → chunked folder.

---

## 📌 NEXT STEPS

After wiki generation completes:

1. **Review** the generated wiki — verify coverage with `/wiki status`
2. **Query** the wiki with `/wiki query <your-question>` to test knowledge retrieval
3. **Graph** the knowledge base with `/wiki graph` for visual overview
4. **Lint** for health checks with `/wiki lint`
5. **Iterate** — use `/wiki ingest+compile` to add new sources
