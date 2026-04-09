---
schema-version: "1.0"
description: "Quick code — implement + self-review"
version: "1.0"
category: execution
execution-mode: execute
topology: pipeline
---

# /quick:code — Quick Code

> **MISSION**: Rapidly implement a small code task with a self-review pass.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT

**LOAD now**: RUNTIME.md (Nano tier only)

---

## PHASES

### Phase 1: Implement Code
| Field | Value |
|-------|-------|
| Agent | `backend-engineer` or `frontend-engineer` |
| Entry | User describes a code task (create, implement, add) |
| Exit | Code implemented, compiles/runs successfully |
| Deliverable | New or modified file(s) |

### Phase 2: Self-Review
| Field | Value |
|-------|-------|
| Agent | Same as Phase 1 |
| Entry | Code implemented from Phase 1 |
| Exit | Code verified for correctness + security basics |
| Deliverable | Confirmation: code is correct, secure, complete |
