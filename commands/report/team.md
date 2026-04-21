---
description: "🔺 Team Report — Golden Triangle adversarial collaboration for maximum quality reporting"
version: "2.0"
category: reporting
execution-mode: execute
---

# /report:team — Golden Triangle Report Generation

> **MISSION**: Maximum quality reporting through adversarial collaboration.
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

**Location**: `./reports/{topic}/MAILBOX-{date}.md`

All 3 triangle agents READ from and APPEND to this file. Never overwrite — append only.

**Message Format**:
```markdown
---
## [{TIMESTAMP}] {MESSAGE_TYPE} | {AGENT} → {TARGET}
**Phase**: {phase number}
**Task**: {task ID from Shared Task List}
**Content**:
{message body}
---
```

**Message Types**:

| Type              | Sender    | Receiver  | Purpose                                        |
| ----------------- | --------- | --------- | ---------------------------------------------- |
| TASK_ASSIGNMENT   | Tech Lead | Executor  | Assign task with requirements and context       |
| SUBMISSION        | Executor  | Reviewer  | Submit completed work for review                |
| REVIEW            | Reviewer  | Executor  | Review result: PASS or FAIL with findings       |
| DEFENSE           | Executor  | Reviewer  | Defend work against FAIL findings               |
| RESUBMISSION      | Executor  | Reviewer  | Resubmit after fixing FAIL findings             |
| APPROVAL          | Reviewer  | Tech Lead | Confirm task passes all review criteria         |
| ESCALATION        | Any       | Tech Lead | Escalate unresolvable disagreement              |
| ARBITRATION       | Tech Lead | All       | Tech Lead resolves dispute with binding decision|
| DECISION          | Tech Lead | All       | Final phase decision with consensus stamp       |

---

## 📁 DELIVERABLE FILES

| Phase / Agent    | Output                                           |
| ---------------- | ------------------------------------------------ |
| Phase 1 (Data)   | `./reports/{topic}/scouts/SCOUT-{topic}`              |
| Phase 1 (Data)   | `./reports/{topic}/researchers/RESEARCH-{topic}`      |
| Phase 2 (Draft)  | `./reports/{topic}/general/REPORT-{topic}-{date}`     |
| Phase 3 (Final)  | `./reports/{topic}/general/REPORT-{topic}-{date}` (polished) |
| ALL Phases       | `./reports/{topic}/MAILBOX-{date}.md`                    |

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## 🔗 PHASE DEPENDENCIES

| Phase                          | Requires                        | Blocking    |
| ------------------------------ | ------------------------------- | ----------- |
| P1: Data Collection & Analysis | User request                    | No          |
| P2: Report Drafting            | Findings from P1                | **YES**     |
| P3: Review & Delivery          | Draft report from P2            | **YES**     |

**⛔ Blocking**: If input missing → STOP → Create it first → Resume

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

**Deliverable paths = base names.** Small (≤ 150 lines) → `{name}.md`. Large (> 150 lines or ≥ 4 sections) → `{name}/` folder with `00-index.md` + section files.

One phase at a time. Within each phase:

```
1. Spawn Golden Triangle (Tech Lead + Executor + Reviewer)
2. Tech Lead decomposes → publishes Shared Task List
3. Executor implements → posts SUBMISSION to Mailbox
4. Reviewer critiques → posts REVIEW to Mailbox
5. Debate loop: fix/defend → re-review (max 3 rounds)
6. Consensus reached → Tech Lead posts DECISION → Phase output released
```

**Consensus Stamp Format** (required to close each phase):
```
✅ CONSENSUS: {TechLead} ✓ | {Executor} ✓ | {Reviewer} ✓
```

Format: rules/PHASES.md § Phase output structure + rules/TEAMS.md § Golden Triangle Phase Output Format.

---

## 🔺 GOLDEN TRIANGLE LOOP — Universal Protocol

> Every phase below follows this exact loop. Deviations are PROHIBITED.

```
┌─────────────────────────────────────────────────────────────────────┐
│  GOLDEN TRIANGLE LOOP                                               │
│                                                                     │
│  1. Tech Lead decomposes phase goal into tasks                      │
│     → Publishes Shared Task List                                    │
│     → Posts TASK_ASSIGNMENT to Mailbox for each task                │
│                                                                     │
│  2. Executor works each task                                        │
│     → Posts SUBMISSION to Mailbox per task                          │
│     → Includes: what was done, artifacts, approach, notes           │
│                                                                     │
│  3. Reviewer reviews each SUBMISSION                                │
│     → Posts REVIEW to Mailbox: PASS or FAIL                         │
│     → FAIL includes: findings table, severity, required actions     │
│                                                                     │
│  4. IF FAIL (debate loop, max 3 rounds):                            │
│     → Executor reads findings                                       │
│     → For each finding: Fix (if valid) or DEFENSE (if disputed)     │
│     → Posts RESUBMISSION or DEFENSE to Mailbox                      │
│     → Reviewer re-reviews → back to step 3                          │
│     → After 3 rounds without resolution → ESCALATION to Tech Lead  │
│                                                                     │
│  5. IF PASS:                                                        │
│     → Reviewer posts APPROVAL to Mailbox                            │
│     → Task marked ✅ in Shared Task List                            │
│                                                                     │
│  6. After ALL tasks complete:                                       │
│     → Tech Lead verifies coherence across all tasks                 │
│     → Tech Lead posts DECISION with consensus stamp                 │
│     → Phase output released                                         │
│                                                                     │
│  OUTPUT: ✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎭 Phase 1: DATA COLLECTION & ANALYSIS — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                    | Mission                                                    |
| --------- | ---------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `reporter`                               | Decompose: report scope, data sources, analysis dimensions |
| Executor  | `scouter` + `researcher`                 | Execute: collect data from codebase, analyze metrics, gather facts |
| Reviewer  | `business-analyst` (Devil's Advocate)    | Challenge: data complete? Metrics meaningful? Missing context? Bias in collection? |

**Triangle Loop**:
1. `reporter` decomposes data collection into areas: report scope, target audience, data sources, analysis dimensions, success metrics
2. `reporter` posts TASK_ASSIGNMENT to Mailbox for each area → dispatches to `scouter` + `researcher`
3. `scouter` deep-scans codebase for relevant evidence → posts SUBMISSION to Mailbox with:
   - File structure and architecture relevant to topic
   - Code metrics, complexity scores, dependency maps
   - Recent changes, commit history patterns, contributor activity
   - Raw data points with exact file paths and line references
4. `researcher` analyzes patterns and gathers contextual facts → posts SUBMISSION with:
   - Industry benchmarks and best practices for comparison
   - Historical trends and prior art
   - Cross-reference analysis between data sources
   - Quantified metrics with methodology notes
5. `business-analyst` reviews EACH SUBMISSION → posts REVIEW to Mailbox:
   - Is the data collection complete or are there blind spots?
   - Are the metrics actually meaningful for the report's audience?
   - Is there selection bias in what was collected vs. what was ignored?
   - Are data sources reliable? Any contradictions between sources?
   - What context is missing that stakeholders would expect?
6. If REVIEW = FAIL → `scouter`/`researcher` addresses gaps or defends findings → posts RESUBMISSION/DEFENSE
7. `business-analyst` re-reviews → max 3 rounds → ESCALATION to `reporter` if unresolved
8. `reporter` synthesizes all approved findings into unified data package

**Deliverable**: `./reports/{topic}/scouts/SCOUT-{topic}` + `./reports/{topic}/researchers/RESEARCH-{topic}`
**Exit Criteria**: All data sources tapped, metrics collected, patterns identified, gaps acknowledged, analysis dimensions defined
**Consensus**: ✅ CONSENSUS: reporter ✓ | scouter/researcher ✓ | business-analyst ✓

---

## 🎭 Phase 2: REPORT DRAFTING — 🔺 GOLDEN TRIANGLE (CRITICAL)

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.

| Role      | Agent                                    | Mission                                                    |
| --------- | ---------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `reporter`                               | Coordinate: report structure, key findings, recommendations |
| Executor  | `reporter` (self-implements)             | Execute: write REPORT-{topic}.md with findings, analysis, recommendations |
| Reviewer  | `tech-lead` + `reviewer` lens            | Challenge: conclusions supported by data? Recommendations actionable? Missing risks? |

**Prerequisite**: **READ** SCOUT + RESEARCH outputs from Phase 1.

### GOLDEN TRIANGLE REPORT DRAFTING LOOP (CRITICAL — Step by Step)

```
╔══════════════════════════════════════════════════════════════════════╗
║  PHASE 2: REPORT DRAFTING LOOP — FOLLOW EXACTLY                     ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  STEP 1: Reporter reads Phase 1 deliverables                        ║
║  ───────────────────────────────────────────                         ║
║  - Load SCOUT-{topic}.md and RESEARCH-{topic}.md into context        ║
║  - Identify all key data points, metrics, and patterns               ║
║  - Determine report type: status | analysis | audit | assessment     ║
║                                                                      ║
║  STEP 2: Reporter creates Shared Task List                           ║
║  ───────────────────────────────────────────                         ║
║  - Break report into sections as atomic tasks                        ║
║  - Order by logical flow: summary → findings → analysis → recs       ║
║  - Format: [ID] [Status] [Section] [Data Sources] [Acceptance]      ║
║  - Post Shared Task List in Mailbox as TASK_ASSIGNMENT               ║
║                                                                      ║
║  STEP 3: Reporter dispatches ALL section tasks                       ║
║  ───────────────────────────────────────────                         ║
║  - Posts TASK_ASSIGNMENT to Mailbox for each section                 ║
║  - Each assignment includes:                                         ║
║    • Section ID and title                                            ║
║    • Data sources to synthesize                                      ║
║    • Key points to cover                                             ║
║    • Acceptance criteria for section quality                         ║
║                                                                      ║
║  STEP 4: FOR EACH SECTION — Reporter drafts                         ║
║  ───────────────────────────────────────────                         ║
║  a. Reporter reads TASK_ASSIGNMENT from Mailbox                      ║
║  b. Reporter writes section with evidence-backed claims              ║
║  c. Reporter posts SUBMISSION to Mailbox:                            ║
║     ┌──────────────────────────────────────┐                         ║
║     │ SUBMISSION                            │                         ║
║     │ Section: {section ID}                 │                         ║
║     │ Content drafted: {section title}      │                         ║
║     │ Data sources used: {list}             │                         ║
║     │ Key claims made: {list}               │                         ║
║     │ Evidence for each claim: {references} │                         ║
║     │ Self-review notes: {any concerns}     │                         ║
║     └──────────────────────────────────────┘                         ║
║                                                                      ║
║  STEP 5: Reviewer reviews each SUBMISSION                            ║
║  ───────────────────────────────────────────                         ║
║  d. Reviewer reads SUBMISSION from Mailbox                           ║
║  e. Reviewer checks against ALL 5 dimensions:                        ║
║     ┌──────────────────────────────────────────────────────┐         ║
║     │ 1. EVIDENCE — Every claim backed by data?             │         ║
║     │ 2. ACCURACY — No misrepresented metrics or cherry-    │         ║
║     │    picked data? Conclusions follow from evidence?     │         ║
║     │ 3. COMPLETENESS — Missing risks, counterarguments,    │         ║
║     │    or perspectives the audience expects?              │         ║
║     │ 4. ACTIONABILITY — Recommendations specific, feasible,│         ║
║     │    prioritized, and within audience's control?        │         ║
║     │ 5. CLARITY — Language appropriate for audience?        │         ║
║     │    Jargon minimized? Structure logical?               │         ║
║     └──────────────────────────────────────────────────────┘         ║
║  f. Reviewer posts REVIEW to Mailbox:                                ║
║     ┌──────────────────────────────────────┐                         ║
║     │ REVIEW                                │                         ║
║     │ Section: {section ID}                 │                         ║
║     │ Status: PASS or FAIL                  │                         ║
║     │ Findings:                             │                         ║
║     │ | # | Finding | Severity | Action |   │                         ║
║     │ |---|---------|----------|--------|   │                         ║
║     │ | 1 | ...     | CRITICAL | Fix    |   │                         ║
║     │ | 2 | ...     | MINOR    | Suggest|   │                         ║
║     │ Required actions: {list}              │                         ║
║     └──────────────────────────────────────┘                         ║
║                                                                      ║
║  STEP 6: IF FAIL — Debate Loop (max 3 rounds)                       ║
║  ───────────────────────────────────────────                         ║
║  g. Reporter reads REVIEW findings from Mailbox                      ║
║  h. For EACH finding:                                                ║
║     - If VALID → Revise the section → Note what was changed          ║
║     - If DISPUTED → Write DEFENSE with evidence:                     ║
║       "Finding #2 is invalid because [evidence/reasoning]"           ║
║  i. Reporter posts RESUBMISSION or DEFENSE to Mailbox:               ║
║     ┌──────────────────────────────────────┐                         ║
║     │ RESUBMISSION / DEFENSE                │                         ║
║     │ Section: {section ID}                 │                         ║
║     │ Round: {1/2/3}                        │                         ║
║     │ Fixes applied: {list}                 │                         ║
║     │ Defended findings: {list + evidence}  │                         ║
║     └──────────────────────────────────────┘                         ║
║  j. Reviewer re-reviews → posts new REVIEW → back to step (e)        ║
║  k. After round 3 without resolution:                                ║
║     → Reviewer posts ESCALATION to Mailbox                           ║
║     → Reporter (Tech Lead) reads all debate history                  ║
║     → Reporter posts ARBITRATION with binding resolution             ║
║                                                                      ║
║  STEP 7: IF PASS                                                     ║
║  ─────────────────                                                   ║
║  l. Reviewer posts APPROVAL to Mailbox                               ║
║  m. Reporter marks section ✅ in Shared Task List                    ║
║  n. Move to next section → back to step (a)                          ║
║                                                                      ║
║  STEP 8: After ALL sections complete                                 ║
║  ─────────────────────────────────                                   ║
║  o. Reporter verifies full report coherence:                         ║
║     - All sections ✅ in Shared Task List                            ║
║     - Executive summary accurately reflects all findings             ║
║     - No contradictions between sections                             ║
║     - Recommendations flow logically from analysis                   ║
║     - Report reads as a unified document, not disjointed sections    ║
║  p. Reporter posts DECISION to Mailbox:                              ║
║     ┌──────────────────────────────────────┐                         ║
║     │ DECISION                              │                         ║
║     │ Phase: 2 — Report Drafting            │                         ║
║     │ Status: COMPLETE                      │                         ║
║     │ Sections completed: {count}/{total}   │                         ║
║     │ Disputes resolved: {count}            │                         ║
║     │ Arbitrations needed: {count}          │                         ║
║     │ ✅ CONSENSUS: reporter ✓ |            │                         ║
║     │    reporter(exec) ✓ | reviewer ✓      │                         ║
║     └──────────────────────────────────────┘                         ║
║  q. Phase output released                                            ║
╚══════════════════════════════════════════════════════════════════════╝
```

### REPORT STRUCTURE (produced by `reporter`)

```markdown
# Report: {topic}
**Date**: {date} | **Type**: {status|analysis|audit|assessment}
**Author**: report:team (Golden Triangle) | **Audience**: {target}

## Executive Summary
- Overall assessment (1-2 paragraphs)
- Critical findings (top 3-5, bullet points)
- Key recommendations (prioritized)
- Risk level: {LOW | MEDIUM | HIGH | CRITICAL}

## Scope & Methodology
- What was analyzed and why
- Data sources consulted
- Analysis methods applied
- Known limitations and caveats

## Findings
### Finding 1: {title}
- **Evidence**: {code refs, metrics, raw data}
- **Analysis**: {interpretation of evidence}
- **Impact**: {business/technical impact assessment}
- **Confidence**: {HIGH | MEDIUM | LOW} — {justification}

### Finding 2: {title}
{same structure...}

## Analysis
- Cross-cutting patterns across findings
- Root cause analysis (where applicable)
- Trend identification and projections
- Comparison against benchmarks/standards

## Recommendations
| # | Recommendation | Priority | Effort | Impact | Owner |
|---|---------------|----------|--------|--------|-------|
| 1 | {specific action} | P0 | {S/M/L} | {H/M/L} | {team} |
| 2 | {specific action} | P1 | {S/M/L} | {H/M/L} | {team} |

## Risk Assessment
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| {risk if no action} | H/M/L | H/M/L | {recommended action} |

## Appendix
- Raw data tables
- Additional code references
- Methodology details
- Glossary (if audience needs it)
```

### STRICT EVIDENCE ADHERENCE (ENFORCED BY REVIEWER)

```
1. READ Phase 1 DATA FIRST — every claim MUST trace to collected evidence
2. IF data insufficient → STOP → Reporter posts ESCALATION to Mailbox
   → Request additional data collection or acknowledge limitation
3. NO unsupported claims — Reviewer explicitly checks for this:
   "Does this claim have evidence in Phase 1 deliverables? Source cited?"
4. Unsupported claims found by Reviewer → automatic FAIL with:
   Severity: CRITICAL | Action: "Add evidence or remove claim"
```

**Deliverable**: `./reports/{topic}/general/REPORT-{topic}-{date}`
**Exit Criteria**: All sections drafted, every claim evidence-backed, recommendations actionable, report coherent
**Consensus**: ✅ CONSENSUS: reporter ✓ | reporter(exec) ✓ | reviewer ✓

---

## 🎭 Phase 3: REVIEW & DELIVERY — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                    | Mission                                                    |
| --------- | ---------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                              | Final review, quality gate, release authorization          |
| Executor  | `docs-manager`                           | Execute: format, polish, executive summary refinement      |
| Reviewer  | `business-analyst` (Devil's Advocate)    | Challenge: stakeholder-ready? Clear for audience? Actionable next steps? |

**Triangle Loop**:
1. `tech-lead` reads draft REPORT-{topic}-{date}.md → decomposes final review into tasks:
   - Executive summary quality check
   - Formatting and presentation polish
   - Audience appropriateness verification
   - Actionability and completeness audit
2. `tech-lead` posts TASK_ASSIGNMENT to Mailbox → dispatches to `docs-manager`
3. `docs-manager` polishes the report → posts SUBMISSION to Mailbox with:
   - Formatting improvements applied (headings, tables, visual hierarchy)
   - Executive summary refined for clarity and impact
   - Language adjusted for target audience
   - Table of contents / navigation aids added
   - Consistent terminology and style throughout
4. `business-analyst` reviews polished report → posts REVIEW:
   - Would a stakeholder understand this without additional context?
   - Are next steps clear enough that someone can act on them Monday morning?
   - Is the executive summary a standalone artifact for busy executives?
   - Are priorities and severity levels calibrated correctly?
   - Does the report tell a coherent story from findings to recommendations?
5. If REVIEW = FAIL → `docs-manager` revises or defends → posts RESUBMISSION/DEFENSE
6. `business-analyst` re-reviews → max 3 rounds → ESCALATION to `tech-lead` if unresolved
7. `tech-lead` performs final quality gate:
   - All Phase 2 consensus items preserved
   - No content distortion from formatting changes
   - Report ready for distribution

**DELIVERY CHECKLIST** (executed by `tech-lead`):
```
- [ ] Executive summary is standalone and actionable
- [ ] All claims supported by evidence (preserved from Phase 2)
- [ ] Recommendations prioritized with clear ownership
- [ ] Language appropriate for target audience
- [ ] Formatting professional and consistent
- [ ] No contradictions between sections
- [ ] Risk assessment complete with mitigations
- [ ] Appendix contains supporting raw data
```

**Deliverable**: `./reports/{topic}/general/REPORT-{topic}-{date}` (final polished version)
**Exit Criteria**: Report stakeholder-ready, professionally formatted, actionable recommendations, quality gate passed
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | docs-manager ✓ | business-analyst ✓

---

## ✅ COMPLETION

Present final report with consensus stamps from ALL phases:

```markdown
# 🔺 Golden Triangle Report: {topic}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Data Collection | reporter / scouter+researcher / business-analyst | ✅ | {n} |
| P2: Report Drafting | reporter / reporter / reviewer | ✅ | {n} |
| P3: Review & Delivery | tech-lead / docs-manager / business-analyst | ✅ | {n} |

## Debate Summary
- Total submissions: {count}
- First-pass approvals: {count}
- Debates triggered: {count}
- Arbitrations needed: {count}

## Mailbox Reference
Full debate history: `./reports/{topic}/MAILBOX-{date}.md`

## Next Actions
1. ✅ **Done** — Report complete (triangle-validated across all phases)
2. 📝 **Update existing** — Apply findings to related docs → `/docs:core`
3. 📢 **Share** → `/internal-comms` (distribute to stakeholders)
4. 🔄 **Iterate** — Revise specific sections → `/report:team` with narrower scope
```
