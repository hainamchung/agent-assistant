---
description: ❓ Ask Router — Route questions to appropriate answer workflow
version: "1.0"
category: knowledge
execution-mode: router
---

# /ask — Question Answering Router

> **ROUTER DIRECTIVE**: Analyze question complexity and route to appropriate workflow.

<question>$ARGUMENTS</question>

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
IF question is factual (single answer, codebase lookup):
  → Route to /ask:fast

IF question requires research (multiple sources, analysis):
  → Route to /ask:hard

IF unsure:
  → Default to /ask:fast (escalate if insufficient)
```

---

## AVAILABLE ROUTES

| Route       | When to Use                                 |
| ----------- | ------------------------------------------- |
| `/ask:fast` | Quick factual answers, codebase lookups     |
| `/ask:hard` | Research-backed analysis, complex questions |

---

## PRESENT OPTIONS

```markdown
## ❓ Question Mode Selection

**Question**: [parsed question]

**Choose workflow:**

1. ⚡ **Fast** → `/ask:fast` — Quick answer
2. ⚡⚡⚡ **Hard** → `/ask:hard` — Research-backed answer

⏳ Awaiting selection...
```
