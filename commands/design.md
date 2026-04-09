---
schema-version: "1.0"
description: 🎨 Design Router — Route to design workflows
version: "1.0"
category: design
execution-mode: router
topology: pipeline
---

# /design — Design Router

> **ROUTER DIRECTIVE**: Analyze design need and route to appropriate workflow.

<request>$ARGUMENTS</request>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS EXECUTION)

**LOAD now** (path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. RUNTIME.md — Identity, Laws, Routing, Phase Execution, Agent Protocol

**⛔ Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant workflow, and execute it.

---

## ROUTING LOGIC

```
IF design is simple (component, quick mockup):
  → Route to /design:fast

IF design is complex (full feature, system):
  → Route to /design:hard

IF design is complex AND maximum quality with team collaboration needed:
  → Route to /design:team

IF unsure:
  → Default to /design:fast
```

---

## AVAILABLE ROUTES

| Route           | When to Use                                        |
| --------------- | -------------------------------------------------- |
| `/design:fast`  | Quick component design, simple UI                  |
| `/design:hard`  | Full feature design, system design                 |
| `/design:team`  | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## 🎨 Design Mode Selection

**Request**: [parsed request]

**Choose workflow:**

1. ⚡ **Fast** → `/design:fast` — Quick design
2. ⚡⚡⚡ **Hard** → `/design:hard` — Full design process
3. 👥 **Team** → `/design:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
