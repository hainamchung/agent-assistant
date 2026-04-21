---
description: 🔍 Review Router — Route to code review workflows
version: "1.0"
category: validation
execution-mode: router
---

# /review — Code Review Router

> **ROUTER DIRECTIVE**: Analyze review scope and route to appropriate workflow.

<scope>$ARGUMENTS</scope>

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
IF scope is small (PR, few files):
  → Route to /review:fast

IF scope is large (codebase, architecture):
  → Route to /review:hard

IF scope is large AND maximum quality with team collaboration needed:
  → Route to /review:team

IF unsure:
  → Default to /review:fast
```

---

## AVAILABLE ROUTES

| Route          | When to Use            |
| -------------- | ---------------------- |
| `/review:fast` | Quick PR/file review   |
| `/review:hard` | Deep codebase analysis |
| `/review:team` | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## 🔍 Review Mode Selection

**Scope**: [parsed scope]

**Choose workflow:**

1. ⚡ **Fast** → `/review:fast` — Quick review
2. ⚡⚡⚡ **Hard** → `/review:hard` — Deep analysis
3. 👥 **Team** → `/review:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
