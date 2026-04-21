---
description: ⚡ Quick Fix — Rapid issue resolution
version: "1.0"
category: debugging
execution-mode: execute
---

# /fix:fast — Rapid Issue Fix

> **MISSION**: Quickly diagnose and fix simple issues with minimal overhead.

<issue>$ARGUMENTS</issue>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):
1. CORE.md — Identity, Laws, Routing  
2. PHASES.md — Phase Execution  
3. AGENTS.md — Tiered Execution  

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

---

## 🔀 TIERED EXECUTION

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING | EMBODY agent file (FALLBACK) |

---

## ⚠️ ESCALATION

| If | Route To |
|----|----------|
| Complex issue | `/fix:hard` |
| Research needed | `/fix:hard` |

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

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
