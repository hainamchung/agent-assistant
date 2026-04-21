---
description: "🔺 Team Design — Golden Triangle adversarial collaboration for maximum quality design"
version: "2.0"
category: design
execution-mode: execute
---

# /design:team — Golden Triangle Design System Development

> **MISSION**: Maximum quality UI/UX design through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (implementer), Reviewer (devil's advocate). Output is released ONLY
> upon consensus after debate.

<request>$ARGUMENTS</request>

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
| **TIER 1** | runSubagent/Agent Tool EXISTS | Orchestrator spawns Tech Lead → Tech Lead spawns Executor + Reviewer     |
| **TIER 2** | Tool MISSING or SYSTEM error  | EMBODY Tech Lead → EMBODY Executor → EMBODY Reviewer → EMBODY Tech Lead|

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

**TIER 2 Golden Triangle Embodiment** (per TEAMS.md):
```
1. EMBODY Tech Lead → decompose task → produce Shared Task List → dispatch
2. EMBODY Executor → implement assigned tasks → post SUBMISSION to Mailbox
3. EMBODY Reviewer → review submissions → post REVIEW to Mailbox
4. IF FAIL → EMBODY Executor again → fix/defend → EMBODY Reviewer → re-check
5. Repeat steps 3-4 max 3 rounds
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
| DEFENSE           | Executor  | Reviewer  | Defend design decision against FAIL findings    |
| RESUBMISSION      | Executor  | Reviewer  | Resubmit after fixing FAIL findings             |
| APPROVAL          | Reviewer  | Tech Lead | Confirm task passes all review criteria         |
| ESCALATION        | Any       | Tech Lead | Escalate unresolvable disagreement              |
| ARBITRATION       | Tech Lead | All       | Tech Lead resolves dispute with binding decision|
| DECISION          | Tech Lead | All       | Final phase decision with consensus stamp       |

---

## 📁 DELIVERABLE FILES

| Phase / Team       | Output                                            |
| ------------------ | ------------------------------------------------- |
| Phase 1 (Research) | `./reports/{topic}/researchers/RESEARCH-{request}`     |
| Phase 1 (Research) | `./reports/{topic}/scouts/SCOUT-{request}`             |
| Phase 2 (Spec)     | `./reports/{topic}/designs/DESIGN-{request}`           |
| Phase 3 (Impl.)    | `./reports/{topic}/designs/DESIGN-SPEC-{request}`      |
| Phase 4 (Handoff)  | `./reports/{topic}/reviews/REVIEW-{request}`           |
| ALL Phases         | `./reports/{topic}/MAILBOX-{date}.md`                     |

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## 🔗 PHASE DEPENDENCIES

| Phase                           | Requires                          | Blocking    |
| ------------------------------- | --------------------------------- | ----------- |
| P1: Design Research             | User request                      | No          |
| P2: Design Spec & Wireframes    | Research findings from P1         | **YES**     |
| P3: Implementation Spec         | DESIGN from P2                    | **YES**     |
| P4: Review & Handoff            | DESIGN-SPEC from P3               | **YES**     |

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
│     → Publishes Shared Task List                                   │
│     → Posts TASK_ASSIGNMENT to Mailbox for each task               │
│                                                                     │
│  2. Executor works each task                                        │
│     → Posts SUBMISSION to Mailbox per task                         │
│     → Includes: what was done, files/artifacts, approach, notes    │
│                                                                     │
│  3. Reviewer reviews each SUBMISSION                                │
│     → Posts REVIEW to Mailbox: PASS or FAIL                        │
│     → FAIL includes: findings table, severity, required actions    │
│                                                                     │
│  4. IF FAIL (debate loop, max 3 rounds):                            │
│     → Executor reads findings                                      │
│     → For each finding: Fix (if valid) or DEFENSE (if disputed)    │
│     → Posts RESUBMISSION or DEFENSE to Mailbox                     │
│     → Reviewer re-reviews → back to step 3                        │
│     → After 3 rounds without resolution → ESCALATION to Tech Lead │
│                                                                     │
│  5. IF PASS:                                                        │
│     → Reviewer posts APPROVAL to Mailbox                           │
│     → Task marked ✅ in Shared Task List                           │
│                                                                     │
│  6. After ALL tasks complete:                                       │
│     → Tech Lead verifies integration/coherence                     │
│     → Tech Lead posts DECISION with consensus stamp                │
│     → Phase output released                                        │
│                                                                     │
│  OUTPUT: ✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎭 Phase 1: DESIGN RESEARCH — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `designer`                           | Decompose: research areas, user needs analysis, design constraints |
| Executor  | `researcher` + `scouter`             | Execute: audit existing design system, research patterns, competitive analysis |
| Reviewer  | `brainstormer` (Devil's Advocate)    | Challenge: assumptions about users, missing use cases, accessibility concerns |

**Triangle Loop**:
1. `designer` decomposes research into areas: user needs, existing design system audit, competitive analysis, pattern research, accessibility requirements
2. `designer` posts TASK_ASSIGNMENT to Mailbox for each area → dispatches to `researcher` + `scouter`
3. `researcher` researches UX patterns, competitive designs, accessibility standards → posts SUBMISSION with findings per area
4. `scouter` audits existing codebase for design tokens, component inventory, styling patterns → posts SUBMISSION with audit results
5. `brainstormer` reviews each SUBMISSION → posts REVIEW to Mailbox:
   - Are user assumptions validated or just guesses?
   - What personas or use cases are missing?
   - Are accessibility needs (WCAG 2.1 AA) truly covered?
   - Is the competitive analysis shallow or does it reveal actionable insights?
   - What edge cases in user flows are unaccounted for?
6. If REVIEW = FAIL → `researcher`/`scouter` addresses gaps or defends findings → posts RESUBMISSION/DEFENSE
7. `brainstormer` re-reviews → max 3 rounds → ESCALATION to `designer` if unresolved
8. `designer` synthesizes all approved findings into unified design research document

**Deliverable**: `./reports/{topic}/researchers/RESEARCH-{request}` + `./reports/{topic}/scouts/SCOUT-{request}`
**Exit Criteria**: User needs validated, existing design system audited, competitive patterns identified, accessibility constraints mapped, research gaps challenged
**Consensus**: ✅ CONSENSUS: designer ✓ | researcher+scouter ✓ | brainstormer ✓

---

## 🎭 Phase 2: DESIGN SPEC & WIREFRAMES — 🔺 GOLDEN TRIANGLE (CRITICAL)

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.

| Role      | Agent                                         | Mission                                                    |
| --------- | --------------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `designer`                                    | Coordinate: component hierarchy, interaction patterns, design tokens |
| Executor  | `designer` (self-implements)                  | Execute: create detailed design specs, component structures, layout |
| Reviewer  | `frontend-engineer` + `reviewer` lens         | Challenge: technical feasibility, responsive concerns, accessibility (WCAG), performance impact |

**Prerequisite**: **READ** RESEARCH + SCOUT files from P1 before starting.

### GOLDEN TRIANGLE DESIGN LOOP (CRITICAL — Step by Step)

```
╔══════════════════════════════════════════════════════════════════════╗
║  PHASE 2: DESIGN SPEC LOOP — FOLLOW EXACTLY                         ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  STEP 1: Designer reads RESEARCH + SCOUT files                       ║
║  ─────────────────────────────────────────                           ║
║  - Load all research findings into working context                   ║
║  - Identify all design areas (layout, tokens, components, states)    ║
║  - Map user needs → design requirements matrix                      ║
║                                                                      ║
║  STEP 2: Designer creates Shared Task List                           ║
║  ─────────────────────────────────────────                           ║
║  - Break design into atomic areas:                                   ║
║    * Design tokens (colors, typography, spacing, shadows)            ║
║    * Component hierarchy and composition                             ║
║    * Layout structure and grid system                                ║
║    * Interaction patterns and state machines                         ║
║    * Responsive breakpoints and adaptive behavior                    ║
║    * Accessibility specifications                                    ║
║  - Format: [ID] [Status] [Description] [Components] [Acceptance]    ║
║  - Post Shared Task List in Mailbox as TASK_ASSIGNMENT               ║
║                                                                      ║
║  STEP 3: Designer dispatches ALL tasks                               ║
║  ─────────────────────────────────────────                           ║
║  - Posts TASK_ASSIGNMENT to Mailbox for each design area             ║
║  - Each assignment includes:                                         ║
║    * Task ID and design area description                             ║
║    * Components to be designed                                       ║
║    * User research backing (from P1)                                 ║
║    * Acceptance criteria                                             ║
║                                                                      ║
║  STEP 4: FOR EACH TASK — Designer creates specs                      ║
║  ─────────────────────────────────────────                           ║
║  a. Designer reads TASK_ASSIGNMENT from Mailbox                      ║
║  b. Designer creates design spec for the area:                       ║
║     - Visual hierarchy and layout                                    ║
║     - Typography scale and color usage                               ║
║     - Component structure with props/variants                        ║
║     - All interactive states (default, hover, active, disabled,      ║
║       error, loading, empty, focused, selected)                      ║
║     - Micro-interactions and transitions                             ║
║     - Responsive behavior at each breakpoint                         ║
║  c. Designer posts SUBMISSION to Mailbox:                            ║
║     ┌──────────────────────────────────────┐                         ║
║     │ SUBMISSION                            │                         ║
║     │ Task: {task ID}                       │                         ║
║     │ Design area: {description}            │                         ║
║     │ Components: {list of components}      │                         ║
║     │ States covered: {list of states}      │                         ║
║     │ Tokens used: {design tokens}          │                         ║
║     │ Responsive: {breakpoint behavior}     │                         ║
║     │ A11y notes: {accessibility approach}  │                         ║
║     │ Research backing: {P1 reference}      │                         ║
║     └──────────────────────────────────────┘                         ║
║                                                                      ║
║  STEP 5: Frontend Engineer reviews each SUBMISSION                   ║
║  ─────────────────────────────────────────                           ║
║  d. Frontend Engineer reads SUBMISSION from Mailbox                  ║
║  e. Frontend Engineer checks against ALL 5 dimensions:               ║
║     ┌──────────────────────────────────────────────────────┐         ║
║     │ 1. FEASIBILITY — Can this be built with current       │         ║
║     │    framework/component library? Performance cost?     │         ║
║     │ 2. ACCESSIBILITY — WCAG 2.1 AA? ARIA? Keyboard nav?  │         ║
║     │    Screen reader? Color contrast ratios?              │         ║
║     │ 3. RESPONSIVE — All breakpoints addressed? Touch      │         ║
║     │    targets sized? Mobile-first considered?            │         ║
║     │ 4. CONSISTENCY — Matches existing design system?      │         ║
║     │    Token reuse? Component composition patterns?       │         ║
║     │ 5. PERFORMANCE — Render cost? Animation performance?  │         ║
║     │    Asset weight? Lazy-loadable? Bundle impact?        │         ║
║     └──────────────────────────────────────────────────────┘         ║
║  f. Frontend Engineer posts REVIEW to Mailbox:                       ║
║     ┌──────────────────────────────────────┐                         ║
║     │ REVIEW                                │                         ║
║     │ Task: {task ID}                       │                         ║
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
║  ─────────────────────────────────────────                           ║
║  g. Designer reads REVIEW findings from Mailbox                      ║
║  h. For EACH finding:                                                ║
║     - If VALID → Adjust the design → Note what was changed         ║
║     - If DISPUTED → Write DEFENSE with design rationale:            ║
║       "Finding #2 is invalid because [user research says X,          ║
║        accessibility standard Y requires this approach]"             ║
║  i. Designer posts RESUBMISSION or DEFENSE to Mailbox:               ║
║     ┌──────────────────────────────────────┐                         ║
║     │ RESUBMISSION / DEFENSE                │                         ║
║     │ Task: {task ID}                       │                         ║
║     │ Round: {1/2/3}                        │                         ║
║     │ Design changes: {list}                │                         ║
║     │ Defended findings: {list + rationale} │                         ║
║     └──────────────────────────────────────┘                         ║
║  j. Frontend Engineer re-reviews → posts new REVIEW → back to (e)  ║
║  k. After round 3 without resolution:                                ║
║     → Frontend Engineer posts ESCALATION to Mailbox                 ║
║     → Designer (as Tech Lead) reads all debate history              ║
║     → Designer posts ARBITRATION with binding resolution            ║
║     → Arbitration weighs: user need > accessibility > feasibility   ║
║                                                                      ║
║  STEP 7: IF PASS                                                     ║
║  ─────────────                                                       ║
║  l. Frontend Engineer posts APPROVAL to Mailbox                      ║
║  m. Designer marks task ✅ in Shared Task List                       ║
║  n. Move to next task → back to step (a)                            ║
║                                                                      ║
║  STEP 8: After ALL tasks complete                                    ║
║  ────────────────────────────                                        ║
║  o. Designer verifies full design coherence:                         ║
║     - All tasks ✅ in Shared Task List                               ║
║     - No cross-component inconsistencies                             ║
║     - Design tokens consistent across all components                 ║
║     - All interactive states covered for every component             ║
║     - Responsive behavior coherent at all breakpoints                ║
║  p. Designer posts DECISION to Mailbox:                              ║
║     ┌──────────────────────────────────────┐                         ║
║     │ DECISION                              │                         ║
║     │ Phase: 2 — Design Spec & Wireframes   │                         ║
║     │ Status: COMPLETE                      │                         ║
║     │ Tasks completed: {count}/{total}      │                         ║
║     │ Disputes resolved: {count}            │                         ║
║     │ Arbitrations needed: {count}          │                         ║
║     │ ✅ CONSENSUS: designer ✓ |            │                         ║
║     │    designer(exec) ✓ |                 │                         ║
║     │    frontend-engineer ✓                │                         ║
║     └──────────────────────────────────────┘                         ║
║  q. Phase output released                                            ║
╚══════════════════════════════════════════════════════════════════════╝
```

**Deliverable**: `./reports/{topic}/designs/DESIGN-{request}` containing:
- Visual design specs (layout, typography, color, spacing)
- Design token definitions
- Component hierarchy with props, variants, and composition
- Interaction patterns and state diagrams (default, hover, active, disabled, error, loading, empty, focused, selected)
- Micro-interactions and transition specs
- Responsive breakpoints and adaptive behavior
- Accessibility specifications (WCAG 2.1 AA, ARIA roles, keyboard nav, color contrast)
- Technical feasibility notes from frontend engineer

**Exit Criteria**: Design specs complete, all states covered, accessibility verified, feasibility validated, responsive defined, tokens documented
**Consensus**: ✅ CONSENSUS: designer ✓ | designer(exec) ✓ | frontend-engineer ✓

---

## 🎭 Phase 3: IMPLEMENTATION SPEC — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Synthesize: bridge design → code, define component contracts |
| Executor  | `frontend-engineer`                  | Execute: write DESIGN-SPEC-{request}.md with component API, props, states |
| Reviewer  | `designer`                           | Challenge: spec matches design intent? Missing interactions? Visual fidelity? |

**Prerequisite**: **READ** `./reports/{topic}/designs/DESIGN-{request}` before starting.

**Triangle Loop**:
1. `tech-lead` reads DESIGN file → decomposes into implementation specification areas:
   - Component API contracts (props, events, slots)
   - State management approach per component
   - Design token → CSS variable mapping
   - Animation and transition implementation
   - Responsive implementation strategy
   - Accessibility implementation requirements
2. `tech-lead` posts TASK_ASSIGNMENT to Mailbox for each spec area → dispatches to `frontend-engineer`
3. `frontend-engineer` writes implementation spec per area → posts SUBMISSION with:
   - Component API definition (TypeScript interfaces, prop types)
   - State machine definitions for interactive states
   - CSS architecture (token usage, responsive breakpoints, container queries)
   - Animation specs (CSS transitions, keyframes, performance targets)
   - ARIA implementation plan (roles, labels, live regions)
   - Data flow and event contracts between components
4. `designer` reviews each SUBMISSION → posts REVIEW:
   - Does the component API capture all design variants?
   - Are all interaction states from the design represented in state machines?
   - Do responsive breakpoints match the design spec exactly?
   - Are micro-interactions and transitions faithfully translated?
   - Will the implementation preserve visual hierarchy and spacing?
   - Any design nuances lost in the translation to code spec?
5. If REVIEW = FAIL → `frontend-engineer` adjusts spec or defends technical approach → posts RESUBMISSION/DEFENSE
6. `designer` re-reviews → max 3 rounds → ESCALATION to `tech-lead` if unresolved
7. `tech-lead` synthesizes all approved specs into unified implementation specification

**Deliverable**: `./reports/{topic}/designs/DESIGN-SPEC-{request}` containing:
- Component API contracts (TypeScript interfaces)
- State machine definitions
- Design token → code mapping
- CSS architecture plan
- Animation implementation specs
- Accessibility implementation checklist
- Integration points between components

**Exit Criteria**: All components spec'd with APIs, all design states mapped to code, designer confirms fidelity, technical approach sound
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | frontend-engineer ✓ | designer ✓

---

## 🎭 Phase 4: REVIEW & HANDOFF — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `designer`                           | Final review, design system compliance, handoff coordination |
| Executor  | `docs-manager`                       | Execute: write design documentation, component catalog entry |
| Reviewer  | `tech-lead`                          | Challenge: handoff complete? Developer questions addressed? Edge states? |

**Prerequisite**: **READ** `DESIGN-{request}.md` + `DESIGN-SPEC-{request}.md` from previous phases.

**Triangle Loop**:
1. `designer` decomposes handoff into documentation areas: component catalog, usage guidelines, do/don't examples, design token reference, developer FAQ
2. `designer` posts TASK_ASSIGNMENT to Mailbox for each area → dispatches to `docs-manager`
3. `docs-manager` writes documentation per area → posts SUBMISSION with:
   - Component catalog entries (name, purpose, variants, usage)
   - Usage guidelines with do/don't examples
   - Design token reference table
   - Integration guide for developers
   - Edge case documentation (empty states, error states, loading patterns)
   - Migration notes (if updating existing components)
4. `tech-lead` reviews each SUBMISSION → posts REVIEW:
   - Can a developer implement from this documentation alone?
   - Are all edge states and error conditions documented?
   - Are props, events, and slots clearly described with examples?
   - Is the token reference complete and accurate?
   - Any questions a developer would ask that aren't answered?
   - Does documentation match both DESIGN and DESIGN-SPEC files?
5. If REVIEW = FAIL → `docs-manager` addresses gaps or defends → posts RESUBMISSION/DEFENSE
6. `tech-lead` re-reviews → max 3 rounds → ESCALATION to `designer` if unresolved
7. `designer` performs final design system compliance check across all deliverables

**Deliverable**: `./reports/{topic}/reviews/REVIEW-{request}` containing:
- Design system compliance audit results
- Component catalog entries
- Usage guidelines and documentation
- Developer handoff checklist
- Outstanding questions or known limitations

**Exit Criteria**: Documentation complete, developer handoff verified, design system compliance confirmed, all edge states documented
**Consensus**: ✅ CONSENSUS: designer ✓ | docs-manager ✓ | tech-lead ✓

---

## ✅ COMPLETION

Present final design report with consensus stamps from ALL phases:

```markdown
# 🔺 Golden Triangle Design Report: {request}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Design Research | designer / researcher+scouter / brainstormer | ✅ | {n} |
| P2: Design Spec & Wireframes | designer / designer / frontend-engineer | ✅ | {n} |
| P3: Implementation Spec | tech-lead / frontend-engineer / designer | ✅ | {n} |
| P4: Review & Handoff | designer / docs-manager / tech-lead | ✅ | {n} |

## Debate Summary
- Total submissions: {count}
- First-pass approvals: {count}
- Debates triggered: {count}
- Arbitrations needed: {count}

## Mailbox Reference
Full debate history: `./reports/{topic}/MAILBOX-{date}.md`

## Deliverables
- `./reports/{topic}/researchers/RESEARCH-{request}`
- `./reports/{topic}/scouts/SCOUT-{request}`
- `./reports/{topic}/designs/DESIGN-{request}`
- `./reports/{topic}/designs/DESIGN-SPEC-{request}`
- `./reports/{topic}/reviews/REVIEW-{request}`

## Next Actions
1. ✅ **Done** — Design complete (triangle-validated across all phases)
2. 🚀 **Implement** → `/cook:team {request}` — Build from design specs
3. 📋 **Plan first** → `/plan:team {request}` — Create implementation plan
4. 🔄 **Iterate** → Address review feedback and re-run affected phases
```
