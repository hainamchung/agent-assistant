---
description: ⚡ Quick Review — Fast PR/file review
version: "1.0"
category: validation
execution-mode: execute
---

# /review:fast — Quick Code Review

> **MISSION**: Fast review for PRs or specific files.

<scope>$ARGUMENTS</scope>

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

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

---

## 🎭 Phase 1: CODE REVIEW

| Agent | `reviewer` |
|-------|------------|
| Goal | Review code quality |
| Exit | Issues documented, recommendations provided |

---

## ESCALATION

| If | Route To |
|----|----------|
| Architecture concerns | `/review:hard` |
| Security concerns | `security-engineer` |

---

## COMPLETION

Present review with:

1. ✅ **Approved** — Code ready
2. 🔧 **Fix needed** → `/fix:fast`
