---
description: 📝 Report Router — Multi-purpose reporting (create report, update docs, or generate from template)
version: "1.0"
category: documentation
execution-mode: router
---

# /report — Reporting Router

> **ROUTER DIRECTIVE**: Analyze reporting needs and route to appropriate reporting workflow.
>
> **MULTI-PURPOSE**: Report supports any topic and three output modes — create new report, update existing files, or generate from user template/format.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant workflow, and execute it.

---

## OUTPUT MODES (infer from user request)

Reporter **infers** the mode from what the user asks for — no fixed phrase list. Choose by **intent**:

| Mode | User intent | Reporter action |
|------|-------------|-----------------|
| **Create report** | User wants a **new** deliverable (report, summary, analysis, documentation). | Scout/synthesize → write **new** file under `./reports/{topic}/` or path user specifies. |
| **Update existing** | User wants **changes reflected in existing** files (docs, README, specs, etc.). | Scout → identify related files → **edit** those files. Do not create a new report unless also asked. |
| **From template** | User provides a **format, template, or structure** to follow. | Use that format/structure → generate file(s) matching it (e.g. after scouting source). |

**Topic-agnostic**: Subject is whatever the user asks for — infer from the request; not limited to status or technical only.

---

## ROUTING LOGIC

```
IF task is simple status update OR summary:
  → Route to /report:fast

IF task is comprehensive analysis OR deep dive OR any non-trivial topic (infer from request):
  → Route to /report:hard

IF user explicitly asks to UPDATE existing files (not create report):
  → Use /report:hard or /report:team; reporter OUTPUT MODE = update existing files

IF task is complex AND maximum quality with team collaboration needed:
  → Route to /report:team

IF unsure:
  → Default to /report:fast (escalate if needed)
```

---

## AVAILABLE ROUTES

| Route           | When to Use                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `/report:fast`  | Quick status updates, daily summaries                                       |
| `/report:hard`  | Detailed analysis, any topic (algorithms, docs, changes), template-based  |
| `/report:team`  | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## 📝 Reporting Mode Selection

**Task**: [parsed task]

**Choose workflow:**

1. ⚡ **Fast** → `/report:fast` — Quick summary
2. ⚡⚡⚡ **Hard** → `/report:hard` — Full analysis, any topic; create report **or** update existing files / use template
3. 👥 **Team** → `/report:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
