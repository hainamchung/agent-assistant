---
schema-version: "1.0"
description: ⚡⚡⚡ Full Review — Deep code analysis with architecture review
version: "1.0"
category: validation
execution-mode: execute
topology: pipeline
---

# /review:hard — Deep Code Review

> **MISSION**: Comprehensive code and architecture review.

<scope>$ARGUMENTS</scope>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):
1. RUNTIME.md — Identity, Laws, Routing, Phase Execution, Agent Protocol

**LOAD on-demand** (when entering relevant phase):
- `VALIDATION-GATES.md` — Phase gates block progression until exit criteria pass
- `AGENT-JOURNALS.md` — Agents record decisions/observations inline (max 3/phase)
- `CONDITIONAL-HANDOFFS.md` — Guard expressions route work dynamically on errors/complexity

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS-LITE.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

---

## 🔀 EXECUTION MODEL

| Tier | When | Action |
|------|------|--------|
| **EMBODY**    | Agent category = meta/execution/investigation/support | EMBODY — shared context, continuity critical |
| **SUB-AGENT** | Agent category = validation/research + tool exists     | SUB-AGENT with Context Briefing — independence |

---

## 📁 PLAN COMPLIANCE CHECK

```
IF ./reports/{topic}/plans/PLAN-{scope} exists (.md file or folder):
  - Verify code implements plan specification
  - Check for unauthorized deviations
  - Ensure all phases reflected in code
```

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

---

## 🎭 Phase 1: ARCHITECTURE REVIEW

| Agent | `tech-lead` |
|-------|-------------|
| Goal | Review architecture decisions |
| Exit | Architecture assessed, patterns validated |

---

## 🎭 Phase 2: CODE REVIEW

| Agent | `reviewer` |
|-------|------------|
| Prerequisite | READ PLAN file if exists |
| Goal | Deep code analysis |
| Exit | Code quality assessed, issues documented |

---

## 🎭 Phase 3: SECURITY REVIEW

| Agent | `security-engineer` |
|-------|----------------------|
| Goal | Security assessment |
| Exit | Security reviewed, vulnerabilities documented |

---

## 🎭 Phase 4: PERFORMANCE REVIEW

| Agent | `performance-engineer` |
|-------|------------------------|
| Goal | Performance assessment |
| Exit | Performance issues identified |

---

## COMPLETION

Present review with:

1. ✅ **Approved** — Code ready
2. 🔧 **Fix** → `/fix`
3. 🧪 **Test** → `/test`
