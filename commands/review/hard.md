---
description: ⚡⚡⚡ Full Review — Deep code analysis with architecture review
version: "1.0"
category: validation
execution-mode: execute
---

# /review:hard — Deep Code Review

> **MISSION**: Comprehensive code and architecture review.

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

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING | EMBODY agent file (FALLBACK) |

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
