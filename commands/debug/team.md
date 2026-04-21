---
description: "🔺 Team Debug — Golden Triangle adversarial collaboration for maximum quality investigation"
version: "2.0"
category: debugging
execution-mode: execute
---

# /debug:team — Golden Triangle Bug Investigation

> **MISSION**: Maximum quality debugging through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (investigator), Reviewer (devil's advocate). Findings are released ONLY
> upon consensus after debate. Investigation only — no fixing.

<issue>$ARGUMENTS</issue>

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
1. EMBODY Tech Lead → decompose → Shared Task List → dispatch
2. EMBODY Executor → investigate → post SUBMISSION to Mailbox
3. EMBODY Reviewer → review → post REVIEW to Mailbox
4. IF FAIL → EMBODY Executor → fix/defend → EMBODY Reviewer → re-check (max 3 rounds)
5. EMBODY Tech Lead → arbitrate if needed → post DECISION → synthesize
```

---

## 📬 MAILBOX & DELIVERABLES

**Mailbox Location**: `./reports/{topic}/MAILBOX-{date}.md` — All agents APPEND only, never overwrite.
**Message Types**: TASK_ASSIGNMENT | SUBMISSION | REVIEW | DEFENSE | RESUBMISSION | APPROVAL | ESCALATION | ARBITRATION | DECISION
**Full protocol**: See TEAMS.md § Mailbox Protocol

**Deliverable Files**:

| Phase              | Output                                         |
| ------------------ | ---------------------------------------------- |
| P1: Symptoms       | `./reports/{topic}/debugs/SYMPTOMS-{issue}`         |
| P2: Hypotheses     | `./reports/{topic}/debugs/HYPOTHESES-{issue}`       |
| P3: Evidence       | `./reports/{topic}/debugs/EVIDENCE-{issue}`         |
| P4: Final Report   | `./reports/{topic}/debugs/DEBUG-REPORT-{issue}`     |
| ALL Phases         | `./reports/{topic}/MAILBOX-{date}.md`                  |

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## 🔗 PHASE DEPENDENCIES

| Phase                          | Requires                          | Blocking    |
| ------------------------------ | --------------------------------- | ----------- |
| P1: Symptom Collection         | User issue description            | No          |
| P2: Hypothesis Generation      | Symptoms from P1                  | **YES**     |
| P3: Hypothesis Testing         | Hypotheses from P2                | **YES**     |
| P4: Root Cause Report          | Evidence from P3                  | **YES**     |

**⛔ Blocking**: If input missing → STOP → Create it first → Resume

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

**Deliverable paths = base names.** Small (≤ 150 lines) → `{name}.md`. Large (> 150 lines or ≥ 4 sections) → `{name}/` folder with `00-index.md` + section files.

One phase at a time. Within each phase follow the **Golden Triangle Loop** (per TEAMS.md):

```
1. Tech Lead decomposes → Shared Task List → TASK_ASSIGNMENT to Mailbox
2. Executor investigates → SUBMISSION to Mailbox (evidence, confidence, reasoning)
3. Reviewer critiques → REVIEW to Mailbox (PASS or FAIL with findings)
4. IF FAIL → debate loop: fix/defend → re-review (max 3 rounds → ESCALATION)
5. IF PASS → APPROVAL → Tech Lead posts DECISION with consensus stamp
```

**Consensus Stamp** (required to close each phase):
```
✅ CONSENSUS: {TechLead} ✓ | {Executor} ✓ | {Reviewer} ✓
```

---

## 🎭 Phase 1: SYMPTOM COLLECTION — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                           |
| --------- | ------------------------------------ | ----------------------------------------------------------------- |
| Tech Lead | `debugger`                           | Decompose: categorize symptoms, define investigation areas        |
| Executor  | `scouter`                            | Execute: collect error logs, stack traces, reproduction steps, environment data |
| Reviewer  | `researcher` (Devil's Advocate)      | Challenge: are symptoms complete? Are we looking at the right system? Missing data? |

**Triangle Loop**:
1. `debugger` decomposes into areas: error logs, stack traces, reproduction steps, environment data, user-reported behavior, recent changes
2. `debugger` posts TASK_ASSIGNMENT → dispatches to `scouter`
3. `scouter` collects evidence → posts SUBMISSION per area:
   - Exact error messages and stack traces
   - Steps to reproduce (confirmed or attempted)
   - Environment details (OS, runtime versions, config)
   - Recent code changes in affected area (git log)
   - Related log entries and monitoring data
4. `researcher` reviews each SUBMISSION → posts REVIEW:
   - Are we looking at the right system/component?
   - Are symptoms complete or are we missing data sources?
   - Could these symptoms indicate a different system entirely?
   - Are reproduction steps reliable and deterministic?
5. If FAIL → `scouter` collects additional data or defends → RESUBMISSION/DEFENSE → max 3 rounds
6. `debugger` synthesizes approved symptom data into unified symptom catalog

**Deliverable**: `./reports/{topic}/debugs/SYMPTOMS-{issue}`
**Exit Criteria**: All symptoms documented, reproduction confirmed, environment captured, data sources exhausted
**Consensus**: ✅ CONSENSUS: debugger ✓ | scouter ✓ | researcher ✓

---

## 🎭 Phase 2: HYPOTHESIS GENERATION — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                           |
| --------- | ------------------------------------ | ----------------------------------------------------------------- |
| Tech Lead | `debugger`                           | Coordinate: generate hypothesis tree, prioritize investigation paths |
| Executor  | `researcher`                         | Execute: research similar issues, known bugs, pattern matching    |
| Reviewer  | `brainstormer` (Devil's Advocate)    | Challenge: are hypotheses sufficient? What if root cause is elsewhere? Propose alternatives |

**Prerequisite**: **READ** `./reports/{topic}/debugs/SYMPTOMS-{issue}`

**Triangle Loop**:
1. `debugger` reads symptoms → decomposes into areas: primary suspects, secondary suspects, environmental causes, interaction effects, known bug patterns
2. `debugger` posts TASK_ASSIGNMENT → dispatches to `researcher`
3. `researcher` researches each area → posts SUBMISSION:
   - Similar issues in issue trackers, forums, CVE databases
   - Known bugs in dependencies matching symptom pattern
   - Historical incidents with similar symptoms in this codebase
   - Ranked hypothesis list with confidence levels and reasoning
4. `brainstormer` reviews each SUBMISSION → posts REVIEW:
   - Are we anchored on the obvious? What if root cause is completely elsewhere?
   - Are there hypotheses that explain ALL symptoms, not just some?
   - What about timing-related causes (race conditions, timeouts)?
   - Could this be a combination of multiple smaller issues?
   - Are confidence levels justified or wishful thinking?
   - **MUST propose at least 2 alternative hypotheses not yet considered**
5. If FAIL → `researcher` expands research or defends → RESUBMISSION/DEFENSE → max 3 rounds
6. `debugger` synthesizes approved hypotheses into prioritized hypothesis tree

**Deliverable**: `./reports/{topic}/debugs/HYPOTHESES-{issue}`
**Exit Criteria**: Hypothesis tree complete, alternatives explored, priorities assigned, investigation paths defined
**Consensus**: ✅ CONSENSUS: debugger ✓ | researcher ✓ | brainstormer ✓

---

## 🎭 Phase 3: HYPOTHESIS TESTING — 🔺 GOLDEN TRIANGLE (CRITICAL)

> **THIS IS THE MOST CRITICAL PHASE.** Every piece of evidence is debated. No conclusions without proof.

| Role      | Agent                                           | Mission                                                      |
| --------- | ----------------------------------------------- | ------------------------------------------------------------ |
| Tech Lead | `debugger`                                      | Decompose: assign hypothesis validation tasks, track progress|
| Executor  | `scouter` + `backend-engineer`                  | Execute: trace code paths, add logging, test hypotheses with evidence |
| Reviewer  | `reviewer`                                      | Challenge: is evidence conclusive? Correlation vs causation? Solving the right problem? |

**Prerequisite**: **READ** `./reports/{topic}/debugs/HYPOTHESES-{issue}`

### GOLDEN TRIANGLE EVIDENCE LOOP (CRITICAL — Step by Step)

```
╔══════════════════════════════════════════════════════════════════════╗
║  PHASE 3: EVIDENCE LOOP — FOLLOW EXACTLY                            ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  STEP 1: Tech Lead reads HYPOTHESES-{issue}.md                      ║
║  ──────────────────────────────────────────────                      ║
║  - Load hypothesis tree, identify all needing validation             ║
║  - Determine ordering (highest priority first)                       ║
║                                                                      ║
║  STEP 2: Tech Lead creates Shared Task List                          ║
║  ──────────────────────────────────────────────                      ║
║  - One task per hypothesis                                           ║
║  - Each specifies: what evidence would CONFIRM or REFUTE             ║
║  - Format: [ID] [Status] [Hypothesis] [Evidence Needed] [Method]    ║
║  - Post as TASK_ASSIGNMENT to Mailbox                                ║
║                                                                      ║
║  STEP 3: FOR EACH HYPOTHESIS — Executor investigates                 ║
║  ──────────────────────────────────────────────                      ║
║  a. Executor reads TASK_ASSIGNMENT from Mailbox                      ║
║  b. scouter traces code paths, maps execution flow                   ║
║  c. backend-engineer inspects logic, adds diagnostic logging         ║
║  d. Executor posts SUBMISSION to Mailbox:                            ║
║     ┌──────────────────────────────────────────┐                     ║
║     │ SUBMISSION                                │                     ║
║     │ Hypothesis: {ID} — {statement}            │                     ║
║     │ Verdict: CONFIRMED / REFUTED / INCONCLUSIVE│                    ║
║     │ Evidence collected:                       │                     ║
║     │   - {evidence item 1 with source}         │                     ║
║     │   - {evidence item 2 with source}         │                     ║
║     │ Code paths examined: {list of files:lines}│                     ║
║     │ Reproduction result: {what happened}      │                     ║
║     │ Confidence: {HIGH/MEDIUM/LOW}             │                     ║
║     │ Reasoning: {why this verdict}             │                     ║
║     └──────────────────────────────────────────┘                     ║
║                                                                      ║
║  STEP 4: Reviewer reviews each SUBMISSION                            ║
║  ──────────────────────────────────────────────                      ║
║  e. Reviewer checks against ALL 5 evidence dimensions:               ║
║     ┌──────────────────────────────────────────────────────┐         ║
║     │ 1. CAUSATION — Is this cause or just correlation?     │         ║
║     │ 2. COMPLETENESS — Does evidence cover all symptoms?   │         ║
║     │ 3. REPRODUCIBILITY — Can findings be independently    │         ║
║     │    reproduced? Or one-off observation?                │         ║
║     │ 4. ALTERNATIVE EXPLANATIONS — Could something else    │         ║
║     │    explain the same evidence?                         │         ║
║     │ 5. CONFIDENCE CALIBRATION — Is stated confidence      │         ║
║     │    justified by evidence strength?                    │         ║
║     └──────────────────────────────────────────────────────┘         ║
║  f. Reviewer posts REVIEW: PASS or FAIL with findings table          ║
║                                                                      ║
║  STEP 5: IF FAIL — Evidence Debate Loop (max 3 rounds)               ║
║  ──────────────────────────────────────────────                      ║
║  g. Executor reads findings from Mailbox                             ║
║  h. For EACH finding:                                                ║
║     - If VALID → Collect additional evidence                         ║
║     - If DISPUTED → DEFENSE with counter-evidence                    ║
║  i. Executor posts RESUBMISSION / DEFENSE:                           ║
║     ┌──────────────────────────────────────────┐                     ║
║     │ RESUBMISSION / DEFENSE                    │                     ║
║     │ Hypothesis: {ID} | Round: {1/2/3}         │                     ║
║     │ New evidence collected: {list}            │                     ║
║     │ Defended findings: {list + counter-evidence}│                   ║
║     │ Updated verdict: {CONFIRMED/REFUTED/INCONCLUSIVE}│             ║
║     └──────────────────────────────────────────┘                     ║
║  j. Reviewer re-reviews → back to step (e)                           ║
║  k. After round 3 → ESCALATION → Tech Lead ARBITRATION              ║
║                                                                      ║
║  STEP 6: IF PASS → APPROVAL → mark ✅ → next hypothesis             ║
║                                                                      ║
║  STEP 7: After ALL hypotheses tested                                 ║
║  ─────────────────────────────────                                   ║
║  l. Tech Lead verifies coherence:                                    ║
║     - Do confirmed hypotheses explain ALL symptoms?                  ║
║     - Are refuted hypotheses truly eliminated?                       ║
║     - Any contradictions between evidence sets?                      ║
║  m. Tech Lead posts DECISION:                                        ║
║     ┌──────────────────────────────────────────┐                     ║
║     │ DECISION — Phase 3: Hypothesis Testing    │                     ║
║     │ Hypotheses tested: {count}/{total}        │                     ║
║     │ Confirmed: {list} | Refuted: {list}       │                     ║
║     │ Inconclusive: {list}                      │                     ║
║     │ Debates: {count} | Arbitrations: {count}  │                     ║
║     │ ✅ CONSENSUS: debugger ✓ |                │                     ║
║     │    scouter/backend-engineer ✓ | reviewer ✓│                     ║
║     └──────────────────────────────────────────┘                     ║
╚══════════════════════════════════════════════════════════════════════╝
```

### STRICT EVIDENCE STANDARDS (ENFORCED BY REVIEWER)

```
1. NO CONCLUSIONS WITHOUT EVIDENCE — every verdict MUST cite specific evidence
2. CORRELATION ≠ CAUSATION — Reviewer explicitly challenges:
   "Does this evidence PROVE causation or just show correlation?"
3. REPRODUCTION REQUIRED — CONFIRMED hypotheses must be reproducible
4. ALTERNATIVE EXPLANATIONS — Reviewer must propose at least one alternative
   for each CONFIRMED hypothesis. Executor must address it.
5. Unsupported claims → automatic FAIL:
   Severity: CRITICAL | Action: "Provide evidence or downgrade to INCONCLUSIVE"
```

**Deliverable**: `./reports/{topic}/debugs/EVIDENCE-{issue}`
**Exit Criteria**: All hypotheses tested with evidence, verdicts debated and consensus-approved, root cause identified or narrowed
**Consensus**: ✅ CONSENSUS: debugger ✓ | scouter/backend-engineer ✓ | reviewer ✓

---

## 🎭 Phase 4: ROOT CAUSE REPORT — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                           |
| --------- | ------------------------------------ | ----------------------------------------------------------------- |
| Tech Lead | `debugger`                           | Synthesize: compile root cause analysis, recommend fix approaches |
| Executor  | `reporter`                           | Execute: write formal DEBUG-REPORT-{issue}.md                     |
| Reviewer  | `tech-lead`                          | Challenge: is analysis complete? Is fix recommendation sensible? Impact assessment? |

**Prerequisite**: **READ** SYMPTOMS + HYPOTHESES + EVIDENCE files

**Triangle Loop**:
1. `debugger` reads all prior deliverables → decomposes into: executive summary, symptom timeline, hypothesis tree results, root cause chain, impact analysis, fix recommendations, prevention recommendations
2. `debugger` posts TASK_ASSIGNMENT → dispatches to `reporter`
3. `reporter` writes formal report → posts SUBMISSION per section:
   - Executive summary (2-3 sentences, non-technical)
   - Symptom timeline (chronological, with evidence links)
   - Hypothesis tree (tested, confirmed/refuted, with evidence)
   - Root cause chain (trigger → system propagation → visible symptom)
   - Impact analysis (affected users, data integrity, stability)
   - Recommended fix approaches (ranked by risk/effort/impact)
   - Prevention recommendations (how to avoid recurrence)
4. `tech-lead` reviews each section → posts REVIEW:
   - Is root cause analysis technically sound?
   - Does causal chain account for all observed symptoms?
   - Are fix recommendations feasible within existing architecture?
   - Is impact assessment accurate — not understated or overstated?
   - Would a new engineer understand this without prior context?
5. Debate loop if FAIL → `reporter` revises or defends → max 3 rounds
6. `debugger` synthesizes approved sections into final report

**Deliverable**: `./reports/{topic}/debugs/DEBUG-REPORT-{issue}`
**Exit Criteria**: Root cause documented, evidence chain complete, fix approaches recommended, impact assessed, report validated
**Consensus**: ✅ CONSENSUS: debugger ✓ | reporter ✓ | tech-lead ✓

---

## ✅ COMPLETION

Present final investigation report with consensus stamps from ALL phases:

```markdown
# 🔺 Golden Triangle Debug Report: {issue}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Symptom Collection | debugger / scouter / researcher | ✅ | {n} |
| P2: Hypothesis Generation | debugger / researcher / brainstormer | ✅ | {n} |
| P3: Hypothesis Testing | debugger / scouter+backend-engineer / reviewer | ✅ | {n} |
| P4: Root Cause Report | debugger / reporter / tech-lead | ✅ | {n} |

## Debate Summary
- Total submissions: {count}
- First-pass approvals: {count}
- Debates triggered: {count}
- Arbitrations needed: {count}

## Mailbox Reference
Full debate history: `./reports/{topic}/MAILBOX-{date}.md`

## Next Actions
1. ✅ **Root Cause** — Identified (triangle-validated across all phases)
2. 📊 **Report** — `./reports/{topic}/debugs/DEBUG-REPORT-{issue}`
3. 🔧 **Fix** → `/fix:team` or `/fix:hard`
4. 📝 **Document** → `/docs:core`
```
