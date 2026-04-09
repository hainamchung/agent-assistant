---
schema-version: "1.0"
description: ⚡ Quick Review — Fast PR/file review
version: "1.0"
category: validation
execution-mode: execute
topology: pipeline
---

# /review:fast — Quick Code Review

> **MISSION**: Fast review for PRs or specific files.

<scope>$ARGUMENTS</scope>

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

## 🎭 Phase 1: CODE REVIEW

| Agent | `reviewer` |
|-------|------------|
| Goal | Review code quality |
| Exit | Issues categorized by severity (critical/warning/info), each with file:line reference and fix recommendation |

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
