---
description: 🚀 Deploy Router — Route to deployment workflows
version: "1.0"
category: operations
execution-mode: router
---

# /deploy — Deployment Router

> **ROUTER DIRECTIVE**: Analyze deployment target and route to appropriate workflow.

<target>$ARGUMENTS</target>

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
IF target is "check" or "status":
  → Route to /deploy:check

IF target is "preview" or "staging":
  → Route to /deploy:preview

IF target is "production" or "prod":
  → Route to /deploy:production

IF target is "rollback":
  → Route to /deploy:rollback
```

---

## AVAILABLE ROUTES

| Route                | When to Use                    |
| -------------------- | ------------------------------ |
| `/deploy:check`      | Pre-deployment readiness check |
| `/deploy:preview`    | Deploy to preview/staging      |
| `/deploy:production` | Deploy to production           |
| `/deploy:rollback`   | Rollback deployment            |

---

## PRESENT OPTIONS

```markdown
## 🚀 Deployment Mode Selection

**Target**: [parsed target]

**Choose workflow:**

1. ✅ **Check** → `/deploy:check` — Readiness verification
2. 🔍 **Preview** → `/deploy:preview` — Staging deployment
3. 🚀 **Production** → `/deploy:production` — Production release
4. ⏪ **Rollback** → `/deploy:rollback` — Revert deployment

⏳ Awaiting selection...
```
