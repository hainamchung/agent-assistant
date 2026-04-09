---
schema-version: "1.0"
description: 🚀 Deploy Production — Production release with safety gates
version: "1.0"
category: operations
execution-mode: execute
topology: pipeline
---

# /deploy:production — Production Deployment

> **MISSION**: Safely deploy to production with full verification and rollback readiness.

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

## 🎭 Phase 1: FULL READINESS CHECK

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Complete pre-production verification |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**Standard (default):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] All tests pass
- [ ] Security scan clean
- [ ] Rollback plan documented
- [ ] Monitoring ready

---

## 🎭 Phase 2: SECURITY GATE

| Attribute | Value |
|-----------|-------|
| **Agent** | `security-engineer` |
| **Goal** | Final security verification |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**
> Invoke runSubagent for `security-engineer`. Context: ISOLATED.

**Standard (default):**
> Load `{AGENTS_PATH}/security-engineer.md`
> EMBODY [security-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] No critical vulnerabilities
- [ ] Secrets secured
- [ ] Approved for production

---

## 🎭 Phase 3: PRODUCTION DEPLOY

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Execute production deployment |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**Standard (default):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Deployment successful
- [ ] Zero-downtime achieved (if applicable)

---

## 🎭 Phase 4: POST-DEPLOY VERIFICATION

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Production health verification |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**Standard (default):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Health checks pass
- [ ] Core paths verified
- [ ] Monitoring normal

---

## ESCALATION

| Condition          | Route To            |
| ------------------ | ------------------- |
| Deploy fails       | `/deploy:rollback`  |
| Health check fails | `/deploy:rollback`  |
| Security issue     | `security-engineer` |

---

## COMPLETION

Present deployment result with:

1. ✅ **Success** — Production deployed
2. ⏪ **Rollback** → `/deploy:rollback` if issues
3. 📊 **Monitor** — Watch dashboards
