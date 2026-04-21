---
description: 🐛 Debug Router — Route to debugging workflows
version: "1.0"
category: debugging
execution-mode: router
---

# /debug — Debug Router

> **ROUTER DIRECTIVE**: Analyze issue complexity and route to appropriate debugging workflow.

<issue>$ARGUMENTS</issue>

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
IF issue is simple (clear error, reproducible):
  → Route to /debug:fast

IF issue is complex (intermittent, unclear cause):
  → Route to /debug:hard

IF issue is complex AND maximum quality with team collaboration needed:
  → Route to /debug:team

IF unsure:
  → Default to /debug:fast (escalate if needed)
```

---

## AVAILABLE ROUTES

| Route           | When to Use                                          |
| --------------- | ---------------------------------------------------- |
| `/debug:fast`   | Quick diagnosis for simple bugs                      |
| `/debug:hard`   | Deep investigation for complex issues                |
| `/debug:team`  | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## 🐛 Debug Mode Selection

**Issue**: [parsed issue]

**Choose workflow:**

1. ⚡ **Fast** → `/debug:fast` — Quick diagnosis
2. ⚡⚡⚡ **Hard** → `/debug:hard` — Deep investigation
3. 👥 **Team** → `/debug:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
