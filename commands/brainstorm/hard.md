---
description: ⚡⚡⚡ Deep Ideation — Research-backed exploration
version: "1.0"
category: planning
execution-mode: execute
---

# /brainstorm:hard — Deep Ideation

> **MISSION**: Generate comprehensive ideas through research, analysis, and systematic exploration.

<topic>$ARGUMENTS</topic>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

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

## ⚠️ CRITICAL: DELIVERABLE FILE RULES

```yaml
deliverable_files:
  brainstormer_clarify: # Chat output OK for questions
  researcher: "./reports/{topic}/researchers/RESEARCH-{topic}"
  scouter: "./reports/{topic}/scouts/SCOUT-{topic}"
  brainstormer_synthesis: "./reports/{topic}/brainstorms/BRAINSTORM-{topic}" # MANDATORY OUTPUT

enforcement:
  - Research phase MUST create file
  - Final synthesis MUST create file
  - Synthesis file is the deliverable for downstream phases
```

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

---

## 🎭 Phase 1: REQUIREMENTS DISCOVERY

| Attribute | Value                           |
| --------- | ------------------------------- |
| **Agent** | `brainstormer`                  |
| **Goal**  | Deep requirements clarification |

### ⚡ ADAPTIVE EXECUTION

**IF platform supports subagents:**

> Delegate to `brainstormer` subagent. Do NOT read agent file directly.

**ELSE (EMBODY fallback):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] — Apply methodology from agent file.

**Exit Criteria:**

- [ ] Requirements fully understood
- [ ] Stakeholders identified
- [ ] Constraints documented
- [ ] Success metrics defined
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol (Socratic questioning, assumption surfacing)

---

## 🎭 Phase 2: RESEARCH

| Attribute | Value                                |
| --------- | ------------------------------------ |
| **Agent** | `researcher`                         |
| **Goal**  | Research best practices and patterns |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `researcher`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/researcher.md`
> EMBODY [researcher] — Requires logged system error justification.

**MANDATORY**: CREATE `./reports/{topic}/researchers/RESEARCH-{topic}`

**Exit Criteria:**

- [ ] Research file created
- [ ] Industry patterns researched
- [ ] Best practices documented
- [ ] Sources cited
- [ ] **METHODOLOGY CHECK**: Output aligns with `researcher` Thinking Protocol (sources cited, cross-referenced, evidence-based)

---

## 🎭 Phase 3: CODEBASE ANALYSIS

| Attribute | Value                                  |
| --------- | -------------------------------------- |
| **Agent** | `scouter`                              |
| **Goal**  | Map existing architecture and patterns |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Architecture understood
- [ ] Existing patterns documented
- [ ] Integration points identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol (file locations, patterns as constraints)

---

## 🎭 Phase 4: SOLUTION SYNTHESIS

| Attribute        | Value                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------- |
| **Agent**        | `brainstormer`                                                                         |
| **Goal**         | Synthesize ideas with trade-off analysis                                               |
| **Prerequisite** | READ `./reports/{topic}/researchers/RESEARCH-{topic}` + `./reports/{topic}/scouts/SCOUT-{topic}` |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] — Requires logged system error justification.

**MANDATORY**:

- READ all prior phase deliverables
- CREATE `./reports/{topic}/brainstorms/BRAINSTORM-{topic}`

**Exit Criteria:**

- [ ] Brainstorm file created at `./reports/{topic}/brainstorms/BRAINSTORM-{topic}`
- [ ] Ideas synthesized incorporating research
- [ ] Trade-offs analyzed
- [ ] Recommendations provided
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol (structured analysis, trade-off documentation)

---

## COMPLETION

Present comprehensive analysis with:

1. ✅ **Analysis Complete** — Proceed with recommendation
2. 📋 **Plan** → `/plan:hard` for detailed planning
3. 🔄 **Iterate** — Refine based on feedback
