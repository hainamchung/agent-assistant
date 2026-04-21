---
description: "🔺 Team Brainstorm — Golden Triangle adversarial collaboration for maximum quality ideation"
version: "2.0"
category: ideation
execution-mode: execute
---

# /brainstorm:team — Golden Triangle Creative Brainstorming

> **MISSION**: Maximum quality ideation through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (generator/analyst), Reviewer (devil's advocate). Ideas are released
> ONLY upon consensus after debate.
>
> **KEY DIFFERENCE**: In brainstorming, the adversarial loop EXPANDS thinking
> before CONVERGING. Phase 1 Reviewer pushes for MORE ideas. Phase 2 Reviewer
> challenges evaluation fairness. Debate is generative here.

<topic>$ARGUMENTS</topic>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):
1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution
4. **TEAMS.md** — Golden Triangle protocol (MANDATORY)

**⛔ Do not run Phase 1 until all are loaded.**

---

## 🔀 TIERED EXECUTION

| Tier       | When                          | Action                                                                    |
| ---------- | ----------------------------- | ------------------------------------------------------------------------- |
| **TIER 1** | runSubagent/Agent Tool EXISTS | Orchestrator spawns Tech Lead → Tech Lead spawns Executor + Reviewer      |
| **TIER 2** | Tool MISSING or SYSTEM error  | EMBODY Tech Lead → EMBODY Executor → EMBODY Reviewer → EMBODY Tech Lead  |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## 📬 MAILBOX — Central Communication Hub

**Location**: `./reports/{topic}/MAILBOX-{date}.md` — Append only, never overwrite.

| Type              | Sender    | Receiver  | Purpose                                        |
| ----------------- | --------- | --------- | ---------------------------------------------- |
| TASK_ASSIGNMENT   | Tech Lead | Executor  | Assign task with requirements and context       |
| SUBMISSION        | Executor  | Reviewer  | Submit completed work for review                |
| REVIEW            | Reviewer  | Executor  | PASS or FAIL with findings table                |
| DEFENSE           | Executor  | Reviewer  | Defend work against FAIL findings               |
| RESUBMISSION      | Executor  | Reviewer  | Resubmit after addressing findings              |
| APPROVAL          | Reviewer  | Tech Lead | Confirm task passes review criteria             |
| ESCALATION        | Any       | Tech Lead | Escalate unresolvable disagreement              |
| ARBITRATION       | Tech Lead | All       | Binding resolution of dispute                   |
| DECISION          | Tech Lead | All       | Final phase decision with consensus stamp       |

---

## 📁 DELIVERABLE FILES

| Phase              | Output                                          |
| ------------------ | ----------------------------------------------- |
| P1: Diverge        | `./reports/{topic}/brainstorms/IDEAS-{topic}`        |
| P2: Converge       | `./reports/{topic}/brainstorms/ANALYSIS-{topic}`     |
| P3: Synthesize     | `./reports/{topic}/brainstorms/BRAINSTORM-{topic}`   |
| ALL Phases         | `./reports/{topic}/MAILBOX-{date}.md`                   |

**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## 🔗 PHASE DEPENDENCIES

| Phase                              | Requires                    | Blocking    |
| ---------------------------------- | --------------------------- | ----------- |
| P1: Divergent Thinking             | User request / topic        | No          |
| P2: Convergent Analysis            | IDEAS-{topic}.md from P1    | **YES**     |
| P3: Synthesis & Recommendation     | ANALYSIS-{topic}.md from P2 | **YES**     |

**⛔ Blocking**: If input missing → STOP → Create it first → Resume

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

**Deliverable paths = base names.** Small (≤ 150 lines) → `{name}.md`. Large (> 150 lines or ≥ 4 sections) → `{name}/` folder with `00-index.md` + section files.

One phase at a time. Per phase: Spawn Triangle → Decompose → Execute → Review → Debate → Consensus → Release.

**Consensus Stamp** (required per phase): `✅ CONSENSUS: {TechLead} ✓ | {Executor} ✓ | {Reviewer} ✓`

---

## 🎭 Phase 1: DIVERGENT THINKING — 🔺 GOLDEN TRIANGLE

| Role      | Agent                          | Mission                                                                   |
| --------- | ------------------------------ | ------------------------------------------------------------------------- |
| Tech Lead | `brainstormer`                 | Decompose: brainstorming dimensions, seed ideas, define exploration space |
| Executor  | `researcher` + `scouter`       | Execute: generate ideas, research prior art, explore possibilities        |
| Reviewer  | `tech-lead` (Devil's Advocate) | Challenge: ideas feasible? Missing categories? Thinking too narrow?       |

> **⚡ REVIEWER MINDSET**: GENERATIVE, not reductive. FAIL = "you stopped too soon"
> or "you missed an entire category." Push for MORE ideas, not fewer.

**Triangle Loop**:
1. `brainstormer` defines exploration dimensions → Shared Task List:
   - Dimension mapping (technical, UX, business, unconventional angles)
   - Seed ideas per dimension to prime generation
   - Constraint identification: boundaries of the exploration space
2. `brainstormer` posts TASK_ASSIGNMENT → dispatches to `researcher` + `scouter`
3. `researcher` + `scouter` execute per dimension → post SUBMISSION:
   - `scouter`: codebase patterns, integration points, prior attempts
   - `researcher`: industry prior art, analogous solutions, competitor analysis
   - Both: ideas per dimension with rationale and feasibility signal
4. `tech-lead` reviews → posts REVIEW:
   - Entire categories unexplored? Constrained by current architecture?
   - Missing 10x "crazy" approaches? Hidden assumptions?
5. If FAIL → expand or defend → max 3 rounds → ESCALATION if unresolved
6. `brainstormer` synthesizes approved explorations into unified idea catalog

**Deliverable**: `./reports/{topic}/brainstorms/IDEAS-{topic}`
- Raw idea catalog (minimum 8-12 distinct ideas across dimensions)
- Prior art references, codebase context, assumptions stated
- Each idea tagged: possible / stretch / moonshot

**Exit Criteria**:
- [ ] No dimension gaps (Reviewer confirmed)
- [ ] Prior art researched with sources
- [ ] Minimum 8 distinct ideas across multiple dimensions
- [ ] `IDEAS-{topic}.md` created

**Consensus**: ✅ CONSENSUS: brainstormer ✓ | researcher+scouter ✓ | tech-lead ✓

---

## 🎭 Phase 2: CONVERGENT ANALYSIS — 🔺 GOLDEN TRIANGLE (CRITICAL)

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.
> Raw ideas become ranked, evidence-backed candidates here.

| Role      | Agent                                | Mission                                                                        |
| --------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| Tech Lead | `brainstormer`                       | Coordinate: define evaluation criteria, filter and group ideas, manage ranking  |
| Executor  | `researcher`                         | Execute: deep analysis of top candidates, pros/cons, feasibility scoring       |
| Reviewer  | `reviewer` + `business-analyst` lens | Challenge: evaluation fair? Bias in ranking? Hidden risks? Missing trade-offs? |

**Prerequisite**: **READ** `./reports/{topic}/brainstorms/IDEAS-{topic}`

### GOLDEN TRIANGLE CONVERGENT ANALYSIS LOOP (Step by Step)

```
╔══════════════════════════════════════════════════════════════════════╗
║  PHASE 2: CONVERGENT ANALYSIS — FOLLOW EXACTLY                      ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  STEP 1: Tech Lead reads IDEAS-{topic}.md                            ║
║  - Load full idea catalog, group by theme, define criteria + weights ║
║                                                                      ║
║  STEP 2: Tech Lead creates Shared Task List                          ║
║  - Task per idea cluster: deep-dive analysis                         ║
║  - Task: cross-cutting trade-off comparison                          ║
║  - Task: feasibility scoring matrix                                  ║
║  - Post to Mailbox as TASK_ASSIGNMENT                                ║
║                                                                      ║
║  STEP 3: Dispatch — each assignment includes:                        ║
║  • Idea cluster to analyze + evaluation criteria + weights           ║
║  • Required evidence depth + comparison requirements                 ║
║                                                                      ║
║  STEP 4: FOR EACH TASK — Executor analyzes                           ║
║  a. Read TASK_ASSIGNMENT from Mailbox                                ║
║  b. Deep analysis: pros/cons, feasibility, impact, dependencies      ║
║  c. Post SUBMISSION:                                                 ║
║     ┌──────────────────────────────────────┐                         ║
║     │ Idea cluster | Feasibility {1-10}     │                         ║
║     │ Impact {1-10} | Effort {S/M/L/XL}     │                         ║
║     │ Pros + Cons (with evidence)           │                         ║
║     │ Dependencies | Risks | Open questions │                         ║
║     └──────────────────────────────────────┘                         ║
║                                                                      ║
║  STEP 5: Reviewer checks 5 dimensions per SUBMISSION                 ║
║     ┌──────────────────────────────────────────────────────┐         ║
║     │ 1. FAIRNESS — Criteria applied consistently?          │         ║
║     │ 2. EVIDENCE — Claims backed by data/research?         │         ║
║     │ 3. BIAS — Anchoring? Confirmation? Sunk cost?         │         ║
║     │ 4. TRADE-OFFS — Hidden costs? Missed downsides?       │         ║
║     │ 5. RISKS — Tail risks? Second-order effects?          │         ║
║     └──────────────────────────────────────────────────────┘         ║
║  Posts REVIEW: PASS or FAIL with findings table + required actions    ║
║                                                                      ║
║  STEP 6: IF FAIL — Debate Loop (max 3 rounds)                       ║
║  g. Executor reads findings                                          ║
║  h. For each: Revise (if valid) or DEFENSE with evidence             ║
║  i. Post RESUBMISSION/DEFENSE → Reviewer re-reviews                  ║
║  j. Round 3 without resolution → ESCALATION → Tech Lead ARBITRATES   ║
║                                                                      ║
║  STEP 7: IF PASS → APPROVAL → mark ✅ → next task                   ║
║                                                                      ║
║  STEP 8: ALL tasks complete                                          ║
║  o. Tech Lead verifies cross-cluster coherence:                      ║
║     - No grading drift, consistent comparisons, defensible rankings  ║
║  p. Posts DECISION with consensus stamp → Phase output released      ║
╚══════════════════════════════════════════════════════════════════════╝
```

**Deliverable**: `./reports/{topic}/brainstorms/ANALYSIS-{topic}`
- Evaluation criteria and weights
- Per-idea deep analysis (feasibility, impact, effort, risks)
- Cross-idea comparison matrix
- Ranked shortlist of top 3-5 candidates
- Debate record summary

**Exit Criteria**:
- [ ] All ideas evaluated against defined criteria
- [ ] Evaluation fairness validated (no bias detected or addressed)
- [ ] Each top candidate has evidence-backed pros/cons
- [ ] Trade-offs documented — no hidden costs
- [ ] Rankings defensible — Reviewer confirmed
- [ ] `ANALYSIS-{topic}.md` created

**Consensus**: ✅ CONSENSUS: brainstormer ✓ | researcher ✓ | reviewer ✓

---

## 🎭 Phase 3: SYNTHESIS & RECOMMENDATION — 🔺 GOLDEN TRIANGLE

| Role      | Agent          | Mission                                                                    |
| --------- | -------------- | -------------------------------------------------------------------------- |
| Tech Lead | `brainstormer` | Synthesize: compile final recommendation from analysis                     |
| Executor  | `reporter`     | Execute: write BRAINSTORM-{topic}.md with ideas, analysis, recommendations |
| Reviewer  | `tech-lead`    | Challenge: recommendation sound? Options fairly presented? Decision-ready? |

**Prerequisite**: **READ** `./reports/{topic}/brainstorms/ANALYSIS-{topic}`

**Triangle Loop**:
1. `brainstormer` reads analysis → decomposes synthesis → Shared Task List:
   - Executive summary with top recommendation
   - Full idea catalog (all explored, not just winners)
   - Analysis summary per top candidate + comparison matrix
   - Risk assessment and recommended next steps
2. `brainstormer` posts TASK_ASSIGNMENT → dispatches to `reporter`
3. `reporter` writes each section → posts SUBMISSION:
   - Decision-ready prose, not raw data dumps
   - Recommendation with rationale tracing to evidence
   - Alternatives presented fairly (not straw-manned)
   - Actionable next steps per option
4. `tech-lead` reviews → posts REVIEW:
   - Recommendation supported by analysis or cherry-picked?
   - Alternatives fairly presented? Decision-maker has full context?
   - Risks clearly communicated, not buried?
5. If FAIL → revise or defend → max 3 rounds → ESCALATION if unresolved
6. `brainstormer` synthesizes approved sections into final document

**Deliverable**: `./reports/{topic}/brainstorms/BRAINSTORM-{topic}`
- Executive summary and top recommendation
- Complete idea catalog (explored / shortlisted / recommended)
- Evidence-backed analysis with comparison matrix
- Risk assessment and concrete next steps per option

**Exit Criteria**:
- [ ] Recommendation clearly stated with rationale
- [ ] All options fairly presented (Reviewer confirmed)
- [ ] Document is decision-ready — no ambiguity
- [ ] Next steps actionable per option
- [ ] `BRAINSTORM-{topic}.md` created

**Consensus**: ✅ CONSENSUS: brainstormer ✓ | reporter ✓ | tech-lead ✓

---

## ✅ COMPLETION

```markdown
# 🔺 Golden Triangle Brainstorm Report: {topic}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Divergent Thinking | brainstormer / researcher+scouter / tech-lead | ✅ | {n} |
| P2: Convergent Analysis | brainstormer / researcher / reviewer | ✅ | {n} |
| P3: Synthesis | brainstormer / reporter / tech-lead | ✅ | {n} |

## Debate Summary
- Total submissions: {count} | First-pass approvals: {count}
- Debates triggered: {count} | Arbitrations: {count}
- Ideas generated: {count} | Ideas shortlisted: {count}

## Mailbox: `./reports/{topic}/MAILBOX-{date}.md`

## Next Actions
1. ✅ **Done** — Brainstorm complete (triangle-validated)
2. 📋 `/plan:team` → Plan implementation of top recommendation
3. 🏗️ `/cook:team` → Build chosen approach
4. 🔄 `/brainstorm:team` → Iterate with refined scope
```
