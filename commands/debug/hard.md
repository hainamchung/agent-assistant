---
description: ⚡⚡⚡ Full Debug — Deep investigation for complex issues
version: "1.0"
category: debugging
execution-mode: execute
---

# /debug:hard — Deep Investigation

> **MISSION**: Thorough investigation for complex or intermittent issues.

<issue>$ARGUMENTS</issue>

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

## 📁 DELIVERABLE FILES

| Agent    | Output                              |
| -------- | ----------------------------------- |
| debugger | `./reports/{topic}/debugs/DEBUG-{issue}` |

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

---

## 🎭 Phase 1: INFORMATION GATHERING

| Agent | `scouter`                                 |
| ----- | ----------------------------------------- |
| Goal  | Gather context and reproduction steps     |
| Exit  | Context gathered, reproduction documented |

---

## 🎭 Phase 2: HYPOTHESIS FORMATION

| Agent | `debugger`                          |
| ----- | ----------------------------------- |
| Goal  | Form and rank hypotheses            |
| Exit  | Hypotheses documented with evidence |

---

## 🎭 Phase 3: ROOT CAUSE ANALYSIS

| Agent  | `debugger`                                      |
| ------ | ----------------------------------------------- |
| Goal   | Deep investigation                              |
| Output | `./reports/{topic}/debugs/DEBUG-{issue}`             |
| Exit   | Root cause identified, failure chain documented |

---

## 🎭 Phase 4: SOLUTION DESIGN

| Agent | `planner`                               |
| ----- | --------------------------------------- |
| Goal  | Design fix strategy                     |
| Exit  | Fix approach defined with rollback plan |

---

---

## COMPLETION

Present findings with:

1. ✅ **Root Cause** — Identified
2. 🔧 **Fix** → `/fix:hard`
3. 📝 **Document** → `/docs:core`
