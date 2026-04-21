---
description: 🧪 Test Router — Route to testing workflows
version: "1.0"
category: validation
execution-mode: router
---

# /test — Testing Router

> **ROUTER DIRECTIVE**: Analyze testing need and route to appropriate workflow.

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
IF scope is limited (unit tests, quick check):
  → Route to /test:fast

IF scope is comprehensive (full suite, E2E):
  → Route to /test:hard

IF scope is comprehensive AND maximum quality with team collaboration needed:
  → Route to /test:team

IF unsure:
  → Default to /test:fast
```

---

## AVAILABLE ROUTES

| Route          | When to Use                                        |
| -------------- | -------------------------------------------------- |
| `/test:fast`   | Quick tests, unit tests                            |
| `/test:hard`   | Full test suite, E2E                               |
| `/test:team`  | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## 🧪 Test Mode Selection

**Scope**: [parsed scope]

**Choose workflow:**

1. ⚡ **Fast** → `/test:fast` — Quick tests
2. ⚡⚡⚡ **Hard** → `/test:hard` — Comprehensive testing
3. 👥 **Team** → `/test:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
