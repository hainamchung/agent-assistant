---
schema-version: "1.0"
description: ⚡ Quick Debug — Fast diagnosis for simple bugs
version: "1.0"
category: debugging
execution-mode: execute
topology: pipeline
---

# /debug:fast — Quick Diagnosis

> **MISSION**: Fast diagnosis for clear, reproducible issues.

<issue>$ARGUMENTS</issue>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):
1. RUNTIME.md — Identity, Laws, Routing, Phase Execution, Agent Protocol

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS-LITE.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

---

## 🔀 EXECUTION MODEL

| Tier | When | Action |
|------|------|--------|
| **EMBODY**    | Agent category = meta/execution/investigation/support | EMBODY — shared context, continuity critical |
| **SUB-AGENT** | Agent category = validation/research + tool exists     | SUB-AGENT with Context Briefing — independence |

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

**Phase Dependencies**: P1 (single phase)

---

## 🎭 Phase 1: QUICK DIAGNOSIS

| Agent | `debugger` |
|-------|------------|
| Goal | Fast root cause identification |
| Exit | Root cause identified |

---

## ESCALATION

| If | Route To |
|----|----------|
| Complex/intermittent | `/debug:hard` |
| Multiple causes | `/debug:hard` |

---

## COMPLETION

Present findings with:

1. ✅ **Root Cause** — Identified
2. 🔧 **Fix** → `/fix:fast`
