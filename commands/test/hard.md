---
description: ⚡⚡⚡ Full Test — Comprehensive QA with quality gates
version: "1.0"
category: validation
execution-mode: execute
---

# /test:hard — Comprehensive Testing

> **MISSION**: Full QA workflow with quality gates and coverage reporting.

<scope>$ARGUMENTS</scope>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

---

## 🔀 TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

---

## 📁 PLAN CHECKPOINT VERIFICATION

```
IF ./reports/{topic}/plans/PLAN-{scope} exists (.md file or folder):
  1. READ plan completely
  2. EXTRACT all checkpoints
  3. FOR EACH checkpoint → Create test
  4. OUTPUT: "Checkpoint Coverage: X/Y"
```

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

---

## 🎭 Phase 1: TEST STRATEGY

| Agent | `tester`                                |
| ----- | --------------------------------------- |
| Goal  | Design test strategy                    |
| Exit  | Strategy defined, test types identified |

---

---

## 🎭 Phase 2: DEPENDENCY MAPPING

| Agent | `scouter`                              |
| ----- | -------------------------------------- |
| Goal  | Map test dependencies                  |
| Exit  | Dependencies mapped, environment ready |

---

## 🎭 Phase 3: TEST EXECUTION

| Agent        | `tester`                                                        |
| ------------ | --------------------------------------------------------------- |
| Prerequisite | READ PLAN file if exists                                        |
| Goal         | Run full test suite                                             |
| Exit         | All tests run, coverage measured, checkpoint mapping documented |

---

## 🎭 Phase 4: FAILURE ANALYSIS (IF FAILURES)

| Agent   | `debugger`             |
| ------- | ---------------------- |
| Trigger | If failures exist      |
| Goal    | Analyze failures       |
| Exit    | Root causes identified |

---

## 🎭 Phase 5: QUALITY GATES

| Agent | `tester`                          |
| ----- | --------------------------------- |
| Goal  | Verify quality gates              |
| Exit  | All gates pass, coverage adequate |

---

## COMPLETION

Present test report with:

1. ✅ **Pass** — All tests green
2. 🔧 **Fix** → `/fix:fast`
3. 📝 **Review** → `/review`
