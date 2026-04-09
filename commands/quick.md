---
schema-version: "1.0"
description: "Quick command — single-phase execution for simple tasks"
version: "1.0"
category: execution
execution-mode: router
topology: pipeline
tier: nano
---

# /quick — Quick Execution

> **ROUTER DIRECTIVE**: Route quick tasks to single-phase specialists

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT

**LOAD now**: RUNTIME.md (Nano tier only)

---

## ROUTING LOGIC

| Condition | Route |
|-----------|-------|
| Task mentions "fix", "bug", "error", "broken" | → `commands/quick/fix.md` |
| Task mentions "review", "check", "audit" | → `commands/quick/review.md` |
| Default (create, implement, code) | → `commands/quick/code.md` |

**Ambiguity**: If task could map to 2+ variants → Ask: "Is this a fix, new code, or a review?"
**Default**: When no keyword match is found → `/quick:code`

---

## AVAILABLE ROUTES

| Route | When to Use |
|-------|-------------|
| `/quick:fix` | Quick fix — analyze + fix + verify |
| `/quick:code` | Quick code — implement + self-review |
| `/quick:review` | Quick review — review + findings |
