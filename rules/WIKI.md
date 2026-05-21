# 🗺️ WIKI AWARENESS

> **LOAD**: When performing task assessment | **PURPOSE**: Evaluate whether wiki consultation benefits the current task
>
> **VERSION**: 1.0 | **PURPOSE**: Knowledge localization strategy — use `.wiki/` to bound context, save tokens, and improve output quality for complex tasks

---

## 🔑 CORE PRINCIPLE

> **Wiki consultation is an evaluation step, NOT a requirement.**
>
> Every task should be **evaluated** for wiki relevance. Only consult wiki when the evaluation shows it will meaningfully improve task execution. Small, isolated tasks should skip wiki to conserve resources.

---

## 📊 EVALUATION FLOW

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

---

## ⚖️ COMPLEXITY INDICATORS

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

---

## 🔄 EVALUATION DECISION MATRIX

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

---

## 🎯 STEP 1: CHECK WIKI EXISTENCE

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

> **Stale Threshold**: Pages older than **30 days** are stale. Check the active `llm-wiki.toml` configuration (look for `stale_days` under the `[lint]` section). If the config file does not exist (wiki not initialized), use a 30-day default. If wiki pages are older than that threshold or major source changes have occurred since the last update, validate critical wiki pages against source before trusting them.
```

---

## 🎯 STEP 2: EVALUATE COMPLEXITY

```
Assess task against the complexity indicators above.

OUTPUT:
- COMPLEXITY: HIGH / MEDIUM / LOW
- WIKI_RELEVANCE: HIGH / MEDIUM / LOW / NONE
- RECOMMENDATION: Full consultation / Quick glance / Skip
```

---

## 🎯 STEP 3: CONSULT WIKI (Conditional)

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

---

## 📋 EXECUTION GUIDELINES

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

---

## 🔧 SOURCE INGESTION SECURITY

When ingesting source files into the wiki:

```
SENSITIVE_FILE_PATTERNS (always exclude from ingestion):
  - .env, .env.*, *.env*              → environment variables and secrets
  - credentials.json, secrets.*        → authentication material
  - *.key, *.pem, *.crt              → cryptographic keys and certificates
  - passwords.*, *.password            → credential files
  - id_rsa*, *.private               → SSH/PGP private keys
  - config/local.*, config/secret.*   → local secrets configuration

PATH_SANITIZATION:
  - Project names: alphanumeric + hyphens/underscores only
  - Source file paths: alphanumeric + hyphens/underscores + forward slashes
  - Reject: paths containing "..", absolute paths, special shell characters
```

## 🔧 WIKI MAINTENANCE TRIGGERS

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
- The agent-assistant's `.wiki/` (if any) is for its own documentation purposes and is managed separately.
- When helping a user document their project, write to their project's `.wiki/` directory, not the agent-assistant workspace.
- Be mindful of path traversal: ensure `{project}` names are sanitized (alphanumeric, hyphens, underscores only) to prevent writing outside the intended project directory.

---

## 🔗 AGENT DELEGATION INTEGRATION

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

---

## ✅ SELF-CHECK (Wiki Evaluation)

```
Before deciding on wiki consultation:

□ Task complexity assessed?
□ Wiki relevance evaluated?
□ Resource cost considered (tokens, time)?
□ Decision documented: consult / glance / skip?
□ If consulted: critical pages validated against source?
□ If consulted: new insights added back to wiki?
□ If skipped: reason recorded (simple task / no wiki / source sufficient)?
```
