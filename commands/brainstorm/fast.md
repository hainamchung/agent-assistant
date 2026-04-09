---
schema-version: "1.0"
description: ⚡ Quick Ideation — Rapid idea generation
version: "1.0"
category: planning
execution-mode: execute
topology: pipeline
---

# /brainstorm:fast — Rapid Ideation

> **MISSION**: Generate ideas quickly through focused exploration without external research.

<topic>$ARGUMENTS</topic>

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
  brainstormer: "./reports/{topic}/brainstorms/BRAINSTORM-{topic}" # MANDATORY for substantial synthesis

enforcement:
  - Clarification questions → Chat OK
  - Idea synthesis/analysis → MUST create file
```

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

**Phase Dependencies**: P1 → P2 → P3 (sequential pipeline)

---

## 🎭 Phase 1: TOPIC CLARIFICATION

| Attribute | Value                                |
| --------- | ------------------------------------ |
| **Agent** | `brainstormer`                       |
| **Goal**  | Clarify requirements and constraints |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Topic understood
- [ ] Constraints identified
- [ ] Success criteria defined
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol

---

## 🎭 Phase 2: IDEA GENERATION

| Attribute | Value                  |
| --------- | ---------------------- |
| **Agent** | `brainstormer`         |
| **Goal**  | Generate diverse ideas |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] — Requires logged system error justification.

**MANDATORY**: CREATE `./reports/{topic}/brainstorms/BRAINSTORM-{topic}` for synthesis

**Exit Criteria:**

- [ ] Brainstorm file created at `./reports/{topic}/brainstorms/BRAINSTORM-{topic}`
- [ ] Multiple ideas generated
- [ ] Ideas categorized
- [ ] Trade-offs noted
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol

---

## 🎭 Phase 3: CODEBASE CONTEXT (CONDITIONAL)

| Attribute   | Value                                |
| ----------- | ------------------------------------ |
| **Agent**   | `scouter`                            |
| **Goal**    | Find relevant existing patterns      |
| **Trigger** | If ideas relate to existing codebase |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Existing patterns found
- [ ] Integration points identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol

---

## ESCALATION

| Condition          | Route To           |
| ------------------ | ------------------ |
| Research needed    | `/brainstorm:hard` |
| Ready to plan      | `/plan:fast`       |
| Ready to implement | `/code:fast`       |

---

## COMPLETION

Present ideas with:

1. ✅ **Ideas Ready** — Select preferred approach
2. 🔬 **Research** → `/brainstorm:hard` for deeper analysis
3. 📋 **Plan** → `/plan:fast` to formalize
