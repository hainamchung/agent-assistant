---
description: 💡 Brainstorm Router — Route to ideation workflows
version: "1.0"
category: planning
execution-mode: router
---

# /brainstorm — Ideation Router

> **ROUTER DIRECTIVE**: Analyze ideation need and route to appropriate brainstorming workflow.

<topic>$ARGUMENTS</topic>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):
1. CORE.md — Identity, Laws, Routing  
2. PHASES.md — Phase Execution  
3. AGENTS.md — Tiered Execution  

**⛔ Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant workflow, and execute it.

---

## ROUTING LOGIC

```
IF topic is clear (quick ideas, simple exploration):
  → Route to /brainstorm:fast

IF topic is complex (research needed, deep analysis):
  → Route to /brainstorm:hard

IF topic is complex AND maximum quality with team collaboration needed:
  → Route to /brainstorm:team

IF unsure:
  → Default to /brainstorm:fast
```

---

## AVAILABLE ROUTES

| Route              | When to Use                            |
| ------------------ | -------------------------------------- |
| `/brainstorm:fast` | Quick ideation, simple exploration     |
| `/brainstorm:hard` | Research-backed ideation with analysis |
| `/brainstorm:team` | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## 💡 Brainstorm Mode Selection

**Topic**: [parsed topic]

**Choose workflow:**

1. ⚡ **Fast** → `/brainstorm:fast` — Quick ideation
2. ⚡⚡⚡ **Hard** → `/brainstorm:hard` — Deep exploration
3. 👥 **Team** → `/brainstorm:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
