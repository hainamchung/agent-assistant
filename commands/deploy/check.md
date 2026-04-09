---
schema-version: "1.0"
description: ✅ Deploy Check — Pre-deployment readiness verification
version: "1.0"
category: operations
execution-mode: execute
topology: pipeline
---

# /deploy:check — Deployment Readiness Check

> **MISSION**: Verify all deployment prerequisites are met before proceeding.

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):
1. RUNTIME.md — Identity, Laws, Routing, Phase Execution, Agent Protocol

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

---

## 🔀 EXECUTION MODEL

> **Reference: RUNTIME.md (Execution Model)`

```yaml
execution_model:
  principle: "Role-Based Hybrid — EMBODY for context-dependent agents, SUB-AGENT for independence-dependent agents."
  for_each_phase:
    EMBODY_MODE: "IF agent.category IN [meta, execution, investigation, support] → EMBODY (shared context)"
    SUB_AGENT_MODE: "IF agent.category IN [validation, research] → SUB-AGENT with Context Briefing"
  rules:
    - ❌ NEVER use SUB-AGENT for context-dependent agents (execution/meta/investigation/support)
    - ✅ ALWAYS use SUB-AGENT for independence-dependent agents (validation/research) when tool exists
    - ⚠️ FALLBACK: All EMBODY + Anti-Bias Protocol when sub-agent tool unavailable
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

### ⚡ EXECUTION MODEL

**Enhanced (when available):**
> Invoke runSubagent for `reviewer`. Context: ISOLATED.

**Standard (default):**
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

### ⚡ EXECUTION MODEL

**Enhanced (when available):**
> Invoke runSubagent for `tester`. Context: ISOLATED.

**Standard (default):**
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

### ⚡ EXECUTION MODEL

**Enhanced (when available):**
> Invoke runSubagent for `security-engineer`. Context: ISOLATED.

**Standard (default):**
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

### ⚡ EXECUTION MODEL

**Enhanced (when available):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**Standard (default):**
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
