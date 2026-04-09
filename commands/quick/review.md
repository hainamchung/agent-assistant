---
schema-version: "1.0"
description: "Quick review — review + findings"
version: "1.0"
category: execution
execution-mode: execute
topology: pipeline
---

# /quick:review — Quick Review

> **MISSION**: Rapidly review code and produce a concise findings report.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT

**LOAD now**: RUNTIME.md (Nano tier only)

---

## PHASES

### Phase 1: Review Code
| Field | Value |
|-------|-------|
| Agent | `reviewer` |
| Entry | User specifies code/files to review |
| Exit | Review complete — issues, risks, and improvements identified |
| Deliverable | Review notes (issues found, severity, suggestions) |

### Phase 2: Generate Findings Report
| Field | Value |
|-------|-------|
| Agent | `reviewer` |
| Entry | Review notes from Phase 1 |
| Exit | Structured findings delivered to user |
| Deliverable | Findings summary: issues, recommendations, verdict |
