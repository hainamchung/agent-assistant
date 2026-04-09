---
schema-version: "1.0"
description: 🔍 Deploy Preview — Staging/Preview deployment
version: "1.0"
category: operations
execution-mode: execute
topology: pipeline
---

# /deploy:preview — Preview Deployment

> **MISSION**: Deploy to preview/staging environment for validation.

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

## 🎭 Phase 1: READINESS CHECK

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Quick deployment readiness |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**Standard (default):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Build passes
- [ ] Tests pass
- [ ] No blockers

---

## 🎭 Phase 2: DEPLOY

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Deploy to preview environment |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**Standard (default):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Deployment successful
- [ ] Environment accessible

---

## 🎭 Phase 3: VERIFICATION

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Verify deployment health |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**Standard (default):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Health checks pass
- [ ] Core functionality verified
- [ ] Preview URL accessible

---

## COMPLETION

Present deployment result with:

1. ✅ **Success** — Preview ready for testing
2. 🚀 **Promote** → `/deploy:production`
3. ⏪ **Rollback** → `/deploy:rollback`
