---
description: ✅ Deploy Check — Pre-deployment readiness verification
version: "1.0"
category: operations
execution-mode: execute
---

# /deploy:check — Deployment Readiness Check

> **MISSION**: Verify all deployment prerequisites are met before proceeding.

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):
1. CORE.md — Identity, Laws, Routing  
2. PHASES.md — Phase Execution  
3. AGENTS.md — Tiered Execution  

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

---

## 🔀 TIERED EXECUTION PROTOCOL (MANDATORY)

> **Reference: AGENTS.md (Tiered Execution)`

```yaml
tiered_execution:
  principle: "Sub-agent FIRST (Tier 1). EMBODY ONLY on system failure (Tier 2)."
  for_each_phase:
    TIER_1_MANDATORY: "IF tool exists → MUST use SUB_AGENT_DELEGATION"
    TIER_2_FALLBACK: "ONLY on system error—NOT complexity/preference/speed"
  anti_lazy_fallback:
    - ❌ NEVER use Tier 2 when Tier 1 tool is available
    - ✅ ALWAYS attempt Tier 1 first when tool exists
```

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

---

## 🎭 Phase 1: CODE QUALITY CHECK

| Attribute | Value |
|-----------|-------|
| **Agent** | `reviewer` |
| **Goal** | Verify code quality standards |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `reviewer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/reviewer.md`
> EMBODY [reviewer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] No critical issues
- [ ] Standards met
- [ ] Approved for deploy

---

## 🎭 Phase 2: TEST VERIFICATION

| Attribute | Value |
|-----------|-------|
| **Agent** | `tester` |
| **Goal** | Verify all tests passing |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `tester`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/tester.md`
> EMBODY [tester] — Requires logged system error justification.

**Exit Criteria:**

- [ ] All tests pass
- [ ] Coverage adequate
- [ ] No flaky tests

---

## 🎭 Phase 3: SECURITY SCAN

| Attribute | Value |
|-----------|-------|
| **Agent** | `security-engineer` |
| **Goal** | Security vulnerability check |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `security-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/security-engineer.md`
> EMBODY [security-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] No critical vulnerabilities
- [ ] Dependencies secure
- [ ] Secrets not exposed

---

## 🎭 Phase 4: INFRASTRUCTURE CHECK

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Verify infrastructure readiness |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Build succeeds
- [ ] Environment configured
- [ ] Rollback plan ready

---

## COMPLETION

Present readiness report with:

1. ✅ **Ready** → `/deploy:preview` or `/deploy:production`
2. ❌ **Not Ready** — Issues to address
3. 🔧 **Fix Issues** → Route to appropriate fix workflow
