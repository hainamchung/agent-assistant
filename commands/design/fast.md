---
schema-version: "1.0"
description: ⚡ Quick Design — Rapid component/UI design
version: "1.0"
category: design
execution-mode: execute
topology: pipeline
---

# /design:fast — Rapid Design

> **MISSION**: Quickly create design for simple components or UI elements.

<request>$ARGUMENTS</request>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. RUNTIME.md — Identity, Laws, Routing, Phase Execution, Agent Protocol

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS-LITE.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

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

## ⚠️ CRITICAL: DELIVERABLE FILE RULES

```yaml
deliverable_files:
  designer: "./reports/{topic}/designs/DESIGN-{request}" # For substantial designs

enforcement:
  - Simple component → Chat output OK
  - Page/feature design → MUST create design file
```

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

**Phase Dependencies**: P1 → P2 (sequential pipeline)

---

## 🎭 Phase 1: CONTEXT ANALYSIS

| Attribute | Value                         |
| --------- | ----------------------------- |
| **Agent** | `scouter`                     |
| **Goal**  | Find existing design patterns |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Existing patterns found
- [ ] Design system understood
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol

---

## 🎭 Phase 2: DESIGN CREATION

| Attribute | Value                  |
| --------- | ---------------------- |
| **Agent** | `designer`             |
| **Goal**  | Create design solution |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `designer`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/designer.md`
> EMBODY [designer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Design created
- [ ] Accessibility considered
- [ ] Specs provided
- [ ] **METHODOLOGY CHECK**: Output aligns with `designer` Thinking Protocol

---

## ESCALATION

| Condition                  | Route To       |
| -------------------------- | -------------- |
| More complex than expected | `/design:hard` |
| Implementation needed      | `/code:fast`   |

---

## COMPLETION

Present design with:

1. ✅ **Done** — Design complete
2. 💻 **Implement** → `/code:fast`
3. 🔄 **Iterate** — Refine design
