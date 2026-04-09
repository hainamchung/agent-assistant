---
schema-version: "1.0"
description: ⚡⚡⚡ Full Design — Complete design process with research
version: "1.0"
category: design
execution-mode: execute
topology: pipeline
---

# /design:hard — Full Design Process

> **MISSION**: Execute complete design process with research, exploration, and iteration.

<request>$ARGUMENTS</request>

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
  researcher: "./reports/{topic}/researchers/RESEARCH-{request}"
  scouter: "./reports/{topic}/scouts/SCOUT-{request}"
  designer: "./reports/{topic}/designs/DESIGN-{request}" # MANDATORY OUTPUT

enforcement:
  - Design phase MUST create design file
  - Design file is the deliverable for implementation phases
```

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

---

## 🎭 Phase 1: REQUIREMENTS DISCOVERY

| Attribute | Value                       |
| --------- | --------------------------- |
| **Agent** | `brainstormer`              |
| **Goal**  | Clarify design requirements |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Requirements clear
- [ ] User needs identified
- [ ] Constraints documented
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol (Socratic questioning, assumption surfacing)

---

## 🎭 Phase 2: RESEARCH

| Attribute | Value                           |
| --------- | ------------------------------- |
| **Agent** | `researcher`                    |
| **Goal**  | Research design patterns and UX |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `researcher`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/researcher.md`
> EMBODY [researcher] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Patterns researched
- [ ] Best practices identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `researcher` Thinking Protocol (sources cited, evidence-based)

---

## 🎭 Phase 3: CODEBASE ANALYSIS

| Attribute | Value                      |
| --------- | -------------------------- |
| **Agent** | `scouter`                  |
| **Goal**  | Map existing design system |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Design system documented
- [ ] Component inventory
- [ ] Integration points
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol (file locations, patterns documented)

---

## 🎭 Phase 4: DESIGN CREATION

| Attribute | Value                  |
| --------- | ---------------------- |
| **Agent** | `designer`             |
| **Goal**  | Full design with specs |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `designer`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/designer.md`
> EMBODY [designer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Design complete
- [ ] All states covered
- [ ] Accessibility verified
- [ ] Specs documented
- [ ] **METHODOLOGY CHECK**: Output aligns with `designer` Thinking Protocol (user empathy, accessibility-first, visual hierarchy)

---

## 🎭 Phase 5: DESIGN REVIEW

| Attribute | Value                 |
| --------- | --------------------- |
| **Agent** | `reviewer`            |
| **Goal**  | Review design quality |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `reviewer`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/reviewer.md`
> EMBODY [reviewer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Design reviewed
- [ ] Standards met
- [ ] Approved
- [ ] **METHODOLOGY CHECK**: Output aligns with `reviewer` Thinking Protocol (specific feedback, priority matrix)

---

## COMPLETION

Present design with:

1. ✅ **Done** — Design complete
2. 💻 **Implement** → `/code:hard`
3. 🔄 **Iterate** — Further refinement
