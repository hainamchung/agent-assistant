---
schema-version: "1.0"
description: "Quick fix — analyze + fix + verify"
version: "1.0"
category: execution
execution-mode: execute
topology: pipeline
---

# /quick:fix — Quick Fix

> **MISSION**: Rapidly analyze, fix, and verify a single issue with minimal ceremony.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT

**LOAD now**: RUNTIME.md (Nano tier only)

---

## PHASES

### Phase 1: Analyze Issue
| Field | Value |
|-------|-------|
| Agent | `debugger` or `backend-engineer` |
| Entry | User describes a bug, error, or broken behavior |
| Exit | Root cause identified, fix strategy determined |
| Deliverable | Brief analysis (cause + proposed fix) |

### Phase 2: Implement Fix
| Field | Value |
|-------|-------|
| Agent | `backend-engineer` or `frontend-engineer` |
| Entry | Root cause and fix strategy from Phase 1 |
| Exit | Fix applied, code compiles/runs |
| Deliverable | Modified file(s) with fix applied |

### Phase 3: Self-Review
| Field | Value |
|-------|-------|
| Agent | Same as Phase 2 |
| Entry | Fix implemented |
| Exit | Fix verified correct, no regressions introduced |
| Deliverable | Confirmation: fix works, no side effects |
