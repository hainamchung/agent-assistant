---
description: "🔺 Team Plan — Golden Triangle adversarial collaboration for maximum quality planning"
version: "2.0"
category: planning
execution-mode: execute
---

# /plan:team — Golden Triangle Planning & Architecture

> **MISSION**: Maximum quality technical planning through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (implementer), Reviewer (devil's advocate). Output is released ONLY
> upon consensus after debate.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution
4. **TEAMS.md** — Golden Triangle protocol (MANDATORY)

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: Load `SKILLS.md` on-demand for fitness calculation and dynamic discovery.

---

## 🔀 TIERED EXECUTION

> Reference: AGENTS.md (Tiered Execution) + TEAMS.md (Golden Triangle Protocol)

| Tier       | When                          | Action                                                                    |
| ---------- | ----------------------------- | ------------------------------------------------------------------------- |
| **TIER 1** | runSubagent/Agent Tool EXISTS | Orchestrator spawns Tech Lead → Tech Lead spawns Executor + Reviewer      |
| **TIER 2** | Tool MISSING or SYSTEM error  | EMBODY Tech Lead → EMBODY Executor → EMBODY Reviewer → EMBODY Tech Lead  |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

**TIER 2 Golden Triangle Embodiment** (per TEAMS.md):
```
1. EMBODY Tech Lead → decompose task → produce Shared Task List → dispatch
2. EMBODY Executor → execute assigned tasks → post SUBMISSION to Mailbox
3. EMBODY Reviewer → review submissions → post REVIEW to Mailbox
4. IF FAIL → EMBODY Executor again → fix/defend → EMBODY Reviewer → re-check
5. Repeat steps 3–4 max 3 rounds
6. EMBODY Tech Lead → arbitrate if needed → post DECISION → synthesize output
```

---

## 📬 MAILBOX — Central Communication Hub

**Location**: `./reports/{topic}/MAILBOX-{date}.md` — Append only, never overwrite.

| Type              | Sender    | Receiver  | Purpose                                        |
| ----------------- | --------- | --------- | ---------------------------------------------- |
| TASK_ASSIGNMENT   | Tech Lead | Executor  | Assign task with requirements and context       |
| SUBMISSION        | Executor  | Reviewer  | Submit completed work for review                |
| REVIEW            | Reviewer  | Executor  | Review result: PASS or FAIL with findings       |
| DEFENSE           | Executor  | Reviewer  | Defend approach against FAIL findings           |
| RESUBMISSION      | Executor  | Reviewer  | Resubmit after fixing FAIL findings             |
| APPROVAL          | Reviewer  | Tech Lead | Confirm task passes all review criteria         |
| ESCALATION        | Any       | Tech Lead | Escalate unresolvable disagreement              |
| ARBITRATION       | Tech Lead | All       | Tech Lead resolves dispute with binding decision|
| DECISION          | Tech Lead | All       | Final phase decision with consensus stamp       |

---

## 📁 DELIVERABLE FILES

| Phase / Team     | Output                                          |
| ---------------- | ----------------------------------------------- |
| Phase 1 (Disc.)  | `./reports/{topic}/brainstorms/BRAINSTORM-{task}` + `./reports/{topic}/scouts/SCOUT-{task}` |
| Phase 2 (Arch.)  | `./reports/{topic}/researchers/RESEARCH-{task}` + `./reports/{topic}/designs/ADR-{task}` |
| Phase 3 (Plan)   | `./reports/{topic}/plans/PLAN-{task}` (or `PLAN-{task}-phase1`, …) |
| Phase 4 (Review) | `./reports/{topic}/qa/QA-PLAN-{task}`                |
| ALL Phases        | `./reports/{topic}/MAILBOX-{date}.md`                  |

All files in `./reports/{topic}/` → English only. If plan has **> 3 phases** or **> 3 days** effort → produce **multiple plan files** (one per phase/milestone), each executable in sequence.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## 🔗 PHASE DEPENDENCIES

| Phase                           | Requires                          | Blocking    |
| ------------------------------- | --------------------------------- | ----------- |
| P1: Requirements Discovery      | User request                      | No          |
| P2: Architecture & Research     | P1 requirements + codebase map    | **YES**     |
| P3: Plan Creation               | RESEARCH + ADRs + SCOUT           | **YES**     |
| P4: Review & Finalization       | **PLAN file(s)**                  | **YES**     |

**⛔ Blocking**: If input missing → STOP → Create it first → Resume

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

**Deliverable paths = base names.** Small (≤ 150 lines) → `{name}.md`. Large (> 150 lines or ≥ 4 sections) → `{name}/` folder with `00-index.md` + section files.

One phase at a time. Within each phase follow the Golden Triangle Loop below.

**Consensus Stamp Format** (required to close each phase):
```
✅ CONSENSUS: {TechLead} ✓ | {Executor} ✓ | {Reviewer} ✓
```

---

## 🔺 GOLDEN TRIANGLE LOOP — Universal Protocol

> Every phase below follows this exact loop. Deviations are PROHIBITED.

```
┌─────────────────────────────────────────────────────────────────────┐
│  1. Tech Lead decomposes phase goal → Shared Task List → Mailbox    │
│  2. Executor works each task → SUBMISSION to Mailbox                │
│  3. Reviewer reviews → REVIEW (PASS/FAIL) to Mailbox               │
│  4. IF FAIL (max 3 rounds): Fix or DEFENSE → re-review             │
│     → After 3 rounds → ESCALATION to Tech Lead                     │
│  5. IF PASS: APPROVAL → task ✅                                     │
│  6. All tasks done → Tech Lead verifies → DECISION + consensus      │
│  OUTPUT: ✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎭 Phase 1: REQUIREMENTS DISCOVERY — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `researcher`                         | Decompose: requirement areas, stakeholder analysis, scope boundaries |
| Executor  | `scouter` + `business-analyst`       | Execute: codebase analysis, business requirements extraction |
| Reviewer  | `brainstormer` (Devil's Advocate)    | Challenge: missed requirements, unstated assumptions |

**Triangle Loop**:
1. `researcher` decomposes into: functional reqs, non-functional reqs, codebase context, stakeholder needs → TASK_ASSIGNMENT to Mailbox
2. `scouter` surveys codebase → posts SUBMISSION: architecture map, dependency graph, existing patterns, constraints
3. `business-analyst` extracts business reqs → posts SUBMISSION: user stories, business rules, priorities, success metrics
4. `brainstormer` reviews EACH SUBMISSION → posts REVIEW:
   - Requirements complete? Edge cases missed? Assumptions validated?
   - Conflicting requirements? Adversarial scenarios?
5. If FAIL → executors address gaps or defend → RESUBMISSION/DEFENSE → max 3 rounds
6. `researcher` synthesizes all approved findings into unified artifacts

**Deliverable**: `./reports/{topic}/brainstorms/BRAINSTORM-{task}` + `./reports/{topic}/scouts/SCOUT-{task}`
**Exit Criteria**: All requirements captured, codebase mapped, business context validated, assumptions challenged
**Consensus**: ✅ CONSENSUS: researcher ✓ | scouter+business-analyst ✓ | brainstormer ✓

---

## 🎭 Phase 2: ARCHITECTURE & RESEARCH — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Decompose: architecture decisions, pattern selection |
| Executor  | `researcher`                         | Execute: research patterns, evaluate technologies, draft ADRs |
| Reviewer  | `reviewer` (feasibility critic)      | Challenge: over-engineering, complexity, scalability concerns |

**Prerequisite**: **READ** BRAINSTORM + SCOUT files from Phase 1.

**Triangle Loop**:
1. `tech-lead` reads Phase 1 artifacts → decomposes: pattern selection, tech evaluation, data model, API contracts, NFR architecture → TASK_ASSIGNMENT to Mailbox
2. `researcher` deep-dives each area → posts SUBMISSION: trade-off matrix, evaluation pros/cons, draft ADR per decision, evidence (benchmarks, case studies)
3. `reviewer` reviews with feasibility lens → posts REVIEW:
   - Does this pattern fit our codebase? Complexity justified?
   - Simpler alternatives? Maintenance burden? Evidence-backed?
4. Debate loop if FAIL → `researcher` defends or pivots → max 3 rounds
5. `tech-lead` arbitrates disputes → DECISION → synthesizes deliverables

**CONSTRAINT INHERITANCE**: Architecture decisions MUST reference Phase 1 ("Based on requirement R1...", "Codebase constraint from SCOUT...", "Business rule from BA...")

**Deliverable**: `./reports/{topic}/researchers/RESEARCH-{task}` + `./reports/{topic}/designs/ADR-{task}`
**Exit Criteria**: Patterns researched, alternatives documented, ADRs drafted, feasibility validated
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | researcher ✓ | reviewer ✓

---

## 🎭 Phase 3: PLAN CREATION — 🔺 GOLDEN TRIANGLE

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.

| Role      | Agent                                         | Mission                                                    |
| --------- | --------------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `planner`                                     | Decompose: plan structure, task breakdown, dependencies |
| Executor  | `planner` (self-implements)                   | Execute: write detailed PLAN-{task}.md |
| Reviewer  | `tech-lead` + `security-engineer` lens        | Challenge: missing tasks, wrong estimates, security gaps, unfeasible steps |

**Prerequisite**: **READ** BRAINSTORM + SCOUT + RESEARCH + ADR files from Phases 1–2.

### GOLDEN TRIANGLE PLAN CREATION LOOP (CRITICAL — Step by Step)

```
╔══════════════════════════════════════════════════════════════════════╗
║  PHASE 3: PLAN CREATION LOOP — FOLLOW EXACTLY                       ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  STEP 1: Planner reads ALL prior deliverables                        ║
║  ─────────────────────────────────────────                           ║
║  - Load BRAINSTORM → requirements + acceptance criteria              ║
║  - Load SCOUT → codebase map + constraints                          ║
║  - Load RESEARCH → patterns + trade-offs                            ║
║  - Load ADR → architecture decisions                                ║
║                                                                      ║
║  STEP 2: Planner creates Shared Task List for plan sections          ║
║  ─────────────────────────────────────────                           ║
║  - Sections: overview, prerequisites, phases, tasks, risks, rollback ║
║  - Format: [ID] [Status] [Section] [Dependencies] [Acceptance]      ║
║  - Post to Mailbox as TASK_ASSIGNMENT                                ║
║                                                                      ║
║  STEP 3: FOR EACH SECTION — Planner writes                          ║
║  ─────────────────────────────────────────                           ║
║  a. Write plan section with FULL detail:                             ║
║     - Every task: description, agent, file paths, acceptance         ║
║     - Every phase: entry criteria, exit criteria, dependencies       ║
║     - Risk table: probability, impact, mitigation, rollback         ║
║  b. Post SUBMISSION to Mailbox with content + traceability links     ║
║                                                                      ║
║  STEP 4: Reviewer reviews each SUBMISSION                            ║
║  ─────────────────────────────────────────                           ║
║  Checks against ALL 6 dimensions:                                    ║
║  ┌──────────────────────────────────────────────────────┐            ║
║  │ 1. COMPLETENESS — All tasks covered? Nothing missing? │            ║
║  │ 2. FEASIBILITY — Can each task actually be done?      │            ║
║  │ 3. SECURITY — OWASP Top 10? Auth? Input validation?   │            ║
║  │ 4. ESTIMATES — Realistic or optimistic? Evidence?     │            ║
║  │ 5. DEPENDENCIES — All explicit? Circular risks?       │            ║
║  │ 6. TRACEABILITY — Every task traces to a requirement? │            ║
║  └──────────────────────────────────────────────────────┘            ║
║  Posts REVIEW: PASS or FAIL with findings table                      ║
║                                                                      ║
║  STEP 5: IF FAIL — Debate Loop (max 3 rounds)                       ║
║  ─────────────────────────────────────────                           ║
║  - For EACH finding: Fix (if valid) or DEFENSE (if disputed)         ║
║  - Post RESUBMISSION/DEFENSE to Mailbox                              ║
║  - Reviewer re-reviews → back to step 4                              ║
║  - After round 3 → ESCALATION → Planner ARBITRATES                  ║
║                                                                      ║
║  STEP 6: IF PASS → APPROVAL → section ✅ → next section             ║
║                                                                      ║
║  STEP 7: After ALL sections complete                                 ║
║  ─────────────────────────────                                       ║
║  Planner verifies full plan coherence:                               ║
║  - All sections ✅, no conflicts, acyclic dependencies               ║
║  - Every Phase 1 requirement has ≥1 task                             ║
║  - Every Phase 2 ADR is reflected in plan                            ║
║  Posts DECISION with consensus stamp → Phase output released         ║
╚══════════════════════════════════════════════════════════════════════╝
```

### PLAN QUALITY ENFORCEMENT (ENFORCED BY REVIEWER)

```
1. Every task MUST trace to a requirement or ADR — orphans = automatic FAIL
2. Every external input path must have validation planned
3. Every phase must have a rollback strategy
4. Deviations from prior phase findings require explicit justification
```

**Deliverable**: `./reports/{topic}/plans/PLAN-{task}` (single) or `PLAN-{task}-phase1`, … (multi-phase)
**Exit Criteria**: Plan complete, all sections reviewed, security validated, estimates challenged, traceability verified
**Consensus**: ✅ CONSENSUS: planner ✓ | planner(exec) ✓ | tech-lead+security ✓

---

## 🎭 Phase 4: REVIEW & FINALIZATION — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Final review, integration check |
| Executor  | `reviewer`                           | Execute: comprehensive plan review |
| Reviewer  | `business-analyst`                   | Challenge: business alignment, acceptance criteria coverage |

**Prerequisite**: **READ** PLAN file(s) + all Phase 1–2 artifacts.

**Triangle Loop**:
1. `tech-lead` decomposes into: technical coherence, cross-phase traceability, risk adequacy, testability → TASK_ASSIGNMENT to Mailbox
2. `reviewer` audits plan → posts SUBMISSION: structure assessment, completeness vs Phase 1 reqs, ADR alignment, security posture, executability score
3. `business-analyst` reviews with business lens → posts REVIEW:
   - Acceptance criteria cover all business requirements?
   - Success metrics testable? Priority aligned with value?
   - Stakeholders would approve as-is?
4. Debate loop if FAIL → `reviewer` addresses gaps or defends → max 3 rounds
5. `tech-lead` synthesizes final validation report

**FINAL QUALITY GATE**:
```
FOR EACH requirement in BRAINSTORM-{task}.md:
  → reviewer: Verify ≥1 plan task addresses this requirement
  → business-analyst: Confirm AC matches business intent
  → Document: "REQ-{id} → Task: {ref} → AC: {criteria} → ✓/✗"
```

**Deliverable**: `./reports/{topic}/qa/QA-PLAN-{task}` — includes: PASS/REVISE verdict, traceability matrix, security summary, business confirmation
**Exit Criteria**: Plan validated, technically coherent, security reviewed, business-aligned
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | reviewer ✓ | business-analyst ✓

**⚠️ IF VERDICT = NEEDS REVISION:**
```
1. QA-PLAN lists specific amendments
2. RETURN to Phase 3 → planner addresses amendments
3. RE-RUN Phase 4 → max 2 revision cycles → then escalate to user
```

---

## ✅ COMPLETION

```markdown
# 🔺 Golden Triangle Planning Report: {task}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Requirements | researcher / scouter+BA / brainstormer | ✅ | {n} |
| P2: Architecture | tech-lead / researcher / reviewer | ✅ | {n} |
| P3: Plan Creation | planner / planner / tech-lead+security | ✅ | {n} |
| P4: Review | tech-lead / reviewer / business-analyst | ✅ | {n} |

## Debate Summary
- Total submissions: {count} | First-pass: {count} | Debates: {count} | Arbitrations: {count}

## Deliverables
1. ✅ **Plan** — `./reports/{topic}/plans/PLAN-{task}` (or multi-phase files)
2. ✅ **QA** — `./reports/{topic}/qa/QA-PLAN-{task}` confirms PASS
3. 📬 **Debate** — `./reports/{topic}/MAILBOX-{date}.md`

## Next Actions
1. 🍳 **Implement** → `/cook:team` or `/cook:hard`
2. 📝 **Docs** → `/docs:core`
3. 🔄 **Revise** → Re-run Phase 3 with updated requirements
```
