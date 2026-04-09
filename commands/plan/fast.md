---
schema-version: "1.0"
description: ⚡ Quick Plan — Fast planning without deep research
version: "1.0"
category: planning
execution-mode: execute
topology: pipeline
---

# /plan:fast — Quick Planning

> **MISSION**: Create quick implementation plan for clear tasks.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. RUNTIME.md — Identity, Laws, Routing, Phase Execution, Agent Protocol

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS-LITE.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

---

## 🔀 EXECUTION MODEL

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **EMBODY**    | Agent category = meta/execution/investigation/support | EMBODY — shared context, continuity critical |
| **SUB-AGENT** | Agent category = validation/research + tool exists     | SUB-AGENT with Context Briefing — independence |

**Deliverables:** All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing). Format: rules/RUNTIME.md § Phase output structure.

**Phase Dependencies**: P1 → P2 (sequential pipeline)

---

## 🎭 Phase 1: CONTEXT SCAN

| Agent | `scouter`                                              |
| ----- | ------------------------------------------------------ |
| Goal  | Quick context gathering                                |
| Exit  | Relevant patterns found, integration points identified |

---

## 🎭 Phase 2: PLAN CREATION

| Agent  | `planner`                          |
| ------ | ---------------------------------- |
| Goal   | Create focused implementation plan |
| Output | `./reports/{topic}/plans/PLAN-{task}`   |
| Exit   | Steps defined, approach clear      |

---

## ESCALATION

| If                   | Route To     |
| -------------------- | ------------ |
| Complex architecture | `/plan:hard` |
| Research needed      | `/plan:hard` |

---

## COMPLETION

Present plan with:

1. ✅ **Plan Ready** — `./reports/{topic}/plans/PLAN-{task}`
2. 🍳 **Implement** → `/cook:fast`
