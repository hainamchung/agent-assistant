---
schema-version: "1.0"
description: ⚡ Quick Fix — Rapid issue resolution
version: "1.0"
category: debugging
execution-mode: execute
topology: pipeline
---

# /fix:fast — Rapid Issue Fix

> **MISSION**: Quickly diagnose and fix simple issues with minimal overhead.

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

## ⚠️ ESCALATION

| If | Route To |
|----|----------|
| Complex issue | `/fix:hard` |
| Research needed | `/fix:hard` |

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

**Phase Dependencies**: P1 → P2 → P3 (sequential pipeline)

---

## 🎭 Phase 1: DIAGNOSIS

| Agent | `debugger` |
|-------|------------|
| Goal | Identify root cause |
| Exit | Root cause identified, complexity assessed |

---

## 🎭 Phase 2: FIX IMPLEMENTATION

| Agent | Route by domain |
|-------|-----------------|
| Route | UI → `frontend-engineer`, API → `backend-engineer` |
| Goal | Implement fix |
| Exit | Fix implemented, minimal changes, code compiles |

---

## 🎭 Phase 3: VALIDATION

| Agent | `tester` |
|-------|----------|
| Goal | Verify fix |
| Exit | Issue resolved, no regression |

---

## COMPLETION

Present fix with:

1. ✅ **Fixed** — Issue resolved
2. 🧪 **Test more** → `/test`
