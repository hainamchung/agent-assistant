---
description: "Wiki Team — Golden Triangle wiki generation for 100% coverage and perfection"
version: "1.0"
category: documentation
execution-mode: execute
---

# /wiki:team — Golden Triangle Wiki Generation

> **MISSION**: Maximum quality wiki generation through adversarial collaboration. Every phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator), Executor (implementer), Reviewer (devil's advocate). No page is released without debate, defense, and consensus. The result is a 100% complete, peer-validated wiki that serves as a perfect knowledge base for the codebase.
>
> **Target output**: 30+ wiki pages across all types, with every page peer-reviewed and consensus-approved.
>
> **Knowledge Localization Guarantee**: The wiki must contain 100% of the knowledge needed to understand, modify, and extend the codebase without reading source files.

### Scalability Guide

| Codebase Size | Recommended Variant | Rationale |
|--------------|-------------------|-----------|
| < 20 files   | `/wiki:fast`     | Bootstrap speed |
| 20–100 files | `/wiki:hard`   | Full coverage without overhead |
| 100–500 files | `/wiki:team`  | Adversarial review finds gaps |
| 500+ files  | `/wiki:team` + phased passes | Multiple passes, focus areas |

> **⚠️ Team variant is high-overhead**: 7 Golden Triangle phases × 3 agents × multiple debate rounds = significant token cost. Only use when the codebase has enough depth for adversarial review to find meaningful gaps. For small codebases (<20 files), the overhead exceeds the benefit.

<scope>$ARGUMENTS</scope>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution
4. **TEAMS.md** — Golden Triangle protocol (MANDATORY)
5. **WIKI.md** — Wiki Awareness evaluation protocol
6. `~/.{TOOL}/skills/llm-wiki/SKILL.md` — Wiki engine commands

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

---

## 🔀 TIERED EXECUTION

> Reference: AGENTS.md (Tiered Execution) + TEAMS.md (Golden Triangle Protocol)

| Tier       | When                          | Action                                                                      |
| ---------- | ----------------------------- | --------------------------------------------------------------------------- |
| **TIER 1** | runSubagent/Agent Tool EXISTS | Orchestrator spawns Tech Lead → Tech Lead spawns Executor + Reviewer         |
| **TIER 2** | Tool MISSING or SYSTEM error  | EMBODY Tech Lead → EMBODY Executor → EMBODY Reviewer → EMBODY Tech Lead    |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

**TIER 2 Golden Triangle Embodiment** (per TEAMS.md):
```
1. EMBODY Tech Lead → decompose task → produce Shared Task List → dispatch
2. EMBODY Executor → implement assigned tasks → post SUBMISSION to Mailbox
3. EMBODY Reviewer → review submissions → post REVIEW to Mailbox
4. IF FAIL → EMBODY Executor again → fix/defend → EMBODY Reviewer → re-check
5. Repeat steps 3–4 max 3 rounds
6. EMBODY Tech Lead → arbitrate if needed → post DECISION → synthesize output
```

---

## 📬 MAILBOX — Central Communication Hub

**Location**: `./.reports/{topic}/MAILBOX-WIKI-{date}.md`

All 3 triangle agents READ from and APPEND to this file. Never overwrite — append only.

**Size Management**:
```
MAILBOX ROTATION RULE:
  - If Mailbox exceeds 200 lines, Tech Lead creates a new segment:
    → ./.reports/{topic}/MAILBOX-WIKI-{date}-P{phase}.md for current phase
  - Archive prior phase Mailboxes: rename to MAILBOX-WIKI-{date}-P{phase}-FINAL.md
  - Each phase starts with a fresh, focused Mailbox
  - Archive files remain readable for full debate history
```

> **Rationale**: Large Mailboxes slow down all agents. Phase-bounded Mailboxes keep each phase's debate portable and reviewable.

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
| DEFENSE           | Executor  | Reviewer  | Defend implementation against FAIL findings     |
| RESUBMISSION      | Executor  | Reviewer  | Resubmit after fixing FAIL findings             |
| APPROVAL          | Reviewer  | Tech Lead | Confirm task passes all review criteria         |
| ESCALATION        | Any       | Tech Lead | Escalate unresolvable disagreement              |
| ARBITRATION       | Tech Lead | All       | Tech Lead resolves dispute with binding decision|
| DECISION          | Tech Lead | All       | Final phase decision with consensus stamp       |

---

## 📁 DELIVERABLE FILES

| Phase / Team       | Output                                                           |
| ------------------ | ---------------------------------------------------------------- |
| P1: Architecture   | `./.reports/{topic}/scouts/SCOUT-{project}/`                      |
| P2: Extraction    | `./.reports/{topic}/wikis/WIKI-TEAM-{project}/00-catalog.md`     |
| P3: Taxonomy      | `./.reports/{topic}/wikis/WIKI-TEAM-{project}/00-taxonomy.md`    |
| P4: Plan          | `./.reports/{topic}/plans/PLAN-WIKI-{project}/`                  |
| P5: Generation    | `.wiki/` (user's project) + `./.reports/{topic}/wikis/WIKI-TEAM-{project}/generation-log.md` |
| P6: Review        | `./.reports/{topic}/wikis/WIKI-TEAM-{project}/review.md`         |
| P7: Refinement    | `./.reports/{topic}/wikis/WIKI-TEAM-{project}/refinement.md`    |
| ALL Phases         | `./.reports/{topic}/MAILBOX-WIKI-{date}.md`                        |

All files in `./.reports/{topic}/` → English only.
**Size rule**: ≤ 150 lines = single file; > 150 lines or ≥ 4 sections = chunked folder with `00-index.md` + section files.
**Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + section files.

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
│     → Includes: what was done, approach, accuracy confidence        │
│                                                                     │
│  3. Reviewer reviews each SUBMISSION                                │
│     → Posts REVIEW to Mailbox: PASS or FAIL                         │
│     → FAIL includes: findings table, severity, required actions     │
│                                                                     │
│  4. IF FAIL (debate loop, max 3 rounds):                          │
│     → Executor reads findings                                        │
│     → For each finding: Fix (if valid) or DEFENSE (if disputed)     │
│     → Posts RESUBMISSION or DEFENSE to Mailbox                      │
│     → Reviewer re-reviews → back to step 3                          │
│     → After 3 rounds without resolution → ESCALATION to Tech Lead  │
│                                                                     │
│  5. IF PASS:                                                        │
│     → Reviewer posts APPROVAL to Mailbox                            │
│     → Task marked ✅ in Shared Task List                           │
│                                                                     │
│  6. After ALL tasks complete:                                       │
│     → Tech Lead verifies integration/coherence                      │
│     → Tech Lead posts DECISION with consensus stamp                  │
│     → Phase output released                                          │
│                                                                     │
│  OUTPUT: ✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔗 PHASE DEPENDENCIES

| Phase                        | Requires                         | Blocking    |
| ---------------------------- | -------------------------------- | ----------- |
| P1: Architecture Scout       | User request                     | No          |
| P2: Entity Extraction        | P1 scout findings                | **YES**     |
| P3: Wiki Taxonomy Design     | P2 extraction                    | No          |
| P4: Wiki Generation Plan     | P3 taxonomy                     | **YES**     |
| P5: Wiki Page Generation     | P4 plan                         | **YES**     |
| P6: Peer Review              | P5 generated pages               | **YES**     |
| P7: Refinement & Consensus   | P6 review findings               | **YES**     |

**⛔ Blocking**: If input missing → STOP → Create it first → Resume

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

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

---

## 🎭 Phase 1: ARCHITECTURE SCOUT — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                       |
| --------- | ------------------------------------ | ------------------------------------------------------------- |
| Tech Lead | `wiki-architect`                     | Decompose: scout scope, layer coverage, depth requirements    |
| Executor  | `wiki-extractor`                     | Execute: deep codebase analysis across all layers              |
| Reviewer  | `wiki-reviewer` (Devil's Advocate)  | Challenge: find uncovered areas, verify completeness           |

**Triangle Loop**:
1. `wiki-architect` decomposes scout into layers: entry points, routing, business logic, data access, infrastructure
2. `wiki-architect` posts TASK_ASSIGNMENT to Mailbox → dispatches to `wiki-extractor`
3. `wiki-extractor` performs deep analysis → posts SUBMISSION with findings per layer
4. `wiki-reviewer` reviews each SUBMISSION → posts REVIEW:
   - Are all layers thoroughly documented?
   - Are integration points identified?
   - Any architectural patterns missed?
   - Are the entity descriptions accurate?
5. If REVIEW = FAIL → `wiki-extractor` addresses gaps or defends → posts RESUBMISSION/DEFENSE
6. `wiki-reviewer` re-reviews → max 3 rounds → ESCALATION to `wiki-architect` if unresolved
7. `wiki-architect` synthesizes all approved findings into unified scout report

**Deliverable**: `./.reports/{topic}/scouts/SCOUT-{project}/` (chunked: 00-index + per-layer files)
**Exit Criteria**: All architecture layers mapped, patterns identified, entities catalogued, integration points documented
**Consensus**: ✅ CONSENSUS: wiki-architect ✓ | wiki-extractor ✓ | wiki-reviewer ✓

---

## 🎭 Phase 2: ENTITY EXTRACTION — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                       |
| --------- | ------------------------------------ | ------------------------------------------------------------- |
| Tech Lead | `wiki-architect`                     | Decompose: entity categories, extraction priorities, relationships |
| Executor  | `wiki-extractor`                     | Execute: extract all entities with full metadata               |
| Reviewer  | `wiki-reviewer` (Accuracy Validator) | Challenge: verify entity descriptions, source citations       |

**Triangle Loop**:
1. `wiki-architect` decomposes extraction into categories → Shared Task List → Mailbox
2. `wiki-extractor` extracts entities per category → posts SUBMISSION with:
   - Entity name, type, file location (file:line)
   - Purpose description (from code analysis)
   - Parameters/fields/signatures
   - Relationships to other entities
   - Accuracy confidence level (HIGH/MEDIUM/LOW)
3. `wiki-reviewer` reviews each category submission → posts REVIEW:
   - Do descriptions match code behavior?
   - Are source citations correct?
   - Any hallucinated or missing entities?
   - Are relationships accurate?
4. Debate loop if FAIL → fix or defend → max 3 rounds
5. `wiki-architect` synthesizes approved extractions

**Deliverable**: `./.reports/{topic}/wikis/WIKI-TEAM-{project}/00-catalog.md`
**Exit Criteria**: Every entity documented, source references verified, relationships mapped, accuracy HIGH
**Consensus**: ✅ CONSENSUS: wiki-architect ✓ | wiki-extractor ✓ | wiki-reviewer ✓

---

## 🎭 Phase 3: Wiki Taxonomy Design — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                       |
| --------- | ------------------------------------ | ------------------------------------------------------------- |
| Tech Lead | `wiki-architect`                     | Decompose: page types, priorities, cross-references            |
| Executor  | `wiki-extractor`                     | Execute: design wiki structure, map entities to page types     |
| Reviewer  | `wiki-reviewer` (Completeness Check) | Challenge: are all knowledge needs covered? any gaps?          |

**Triangle Loop**:
1. `wiki-architect` designs wiki taxonomy based on entity catalog → Shared Task List
2. `wiki-extractor` proposes page types, page list, generation order → posts SUBMISSION
3. `wiki-reviewer` reviews taxonomy → posts REVIEW:
   - Does each wiki page serve a distinct purpose?
   - Are there pages that should be split or merged?
   - Any knowledge domain without a wiki page?
   - Are cross-references sufficient?
4. Debate loop → refinements → consensus
5. `wiki-architect` finalizes taxonomy

**Deliverable**: `./.reports/{topic}/wikis/WIKI-TEAM-{project}/00-taxonomy.md`
**Exit Criteria**: Every knowledge domain has a page plan, cross-references defined, generation order set
**Consensus**: ✅ CONSENSUS: wiki-architect ✓ | wiki-extractor ✓ | wiki-reviewer ✓

---

## 🎭 Phase 4: Wiki Generation Plan — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                       |
| --------- | ------------------------------------ | ------------------------------------------------------------- |
| Tech Lead | `wiki-architect`                     | Decompose: page generation tasks, sequencing, resource estimation |
| Executor  | `wiki-extractor`                     | Execute: write detailed generation plan per page                |
| Reviewer  | `wiki-reviewer` (Feasibility Check)  | Challenge: can each page be generated from sources? unrealistic plans? |

**Prerequisite**: **READ** SCOUT + CATALOG + TAXONOMY files before starting.

**Triangle Loop**:
1. `wiki-architect` reads all Phase 1-3 deliverables → decomposes into page generation tasks
2. `wiki-extractor` drafts plan per page: source files, content structure, wikilinks → posts SUBMISSION
3. `wiki-reviewer` reviews each plan item → posts REVIEW:
   - Is the source coverage sufficient for this page?
   - Are there circular wikilinks?
   - Is the generation order correct?
   - Any page that can't be generated from sources?
4. Debate loop → refinements → consensus
5. `wiki-architect` synthesizes into final PLAN file

**Deliverable**: `./.reports/{topic}/plans/PLAN-WIKI-{project}/` (chunked)
**Exit Criteria**: Every page has a generation plan, sources mapped, order defined, risks identified
**Consensus**: ✅ CONSENSUS: wiki-architect ✓ | wiki-extractor ✓ | wiki-reviewer ✓

---

## 🎭 Phase 5: WIKI PAGE GENERATION — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                       |
| --------- | ------------------------------------ | ------------------------------------------------------------- |
| Tech Lead | `wiki-architect`                     | Load PLAN → decompose into page tasks → coordinate generation |
| Executor  | `wiki-extractor`                     | Follow plan → generate each wiki page → submit via Mailbox    |
| Reviewer  | `wiki-reviewer`                      | Review EVERY page → check accuracy, completeness, structure   |

**Prerequisite**: **READ and FOLLOW** `./.reports/{topic}/plans/PLAN-WIKI-{project}/`

### GOLDEN TRIANGLE IMPLEMENTATION LOOP

```
╔══════════════════════════════════════════════════════════════════════╗
║  PHASE 5: WIKI PAGE GENERATION LOOP — FOLLOW EXACTLY              ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  STEP 1: Tech Lead reads PLAN-WIKI-{project}                       ║
║  ─────────────────────────────────────────                           ║
║  - Load full plan into working context                               ║
║  - Identify all page generation tasks                                 ║
║  - Determine generation order (foundation → core → support)          ║
║                                                                      ║
║  STEP 2: Tech Lead creates Shared Task List                          ║
║  ─────────────────────────────────────────                           ║
║  - Break plan into atomic page generation tasks                       ║
║  - Format: [ID] [Status] [Page] [Wiki Type] [Priority]             ║
║  - Post Shared Task List in Mailbox as TASK_ASSIGNMENT               ║
║                                                                      ║
║  STEP 3: Tech Lead dispatches tasks to Executor                      ║
║  ─────────────────────────────────────────                           ║
║  - Posts TASK_ASSIGNMENT to Mailbox for each page                    ║
║  - Each assignment includes:                                         ║
║    • Page title and wiki type                                       ║
║    • Source files to reference (file:line citations)                 ║
║    • Content structure (sections, wikilinks)                         ║
║    • Frontmatter template                                            ║
║    • Priority (P0/P1/P2)                                            ║
║                                                                      ║
║  STEP 4: FOR EACH PAGE — Executor generates                         ║
║  ─────────────────────────────────────────                           ║
║  a. Executor reads TASK_ASSIGNMENT from Mailbox                      ║
║  b. Executor reads all mapped source files                           ║
║  c. Executor creates wiki page with:                                 ║
║     - Valid YAML frontmatter (title, type, tags, created, updated)   ║
║     - Content derived from source analysis (NOT assumptions)          ║
║     - [[wikilinks]] to related pages (verified to exist)             ║
║     - Source references: file path + line numbers                   ║
║  d. Executor ingests source to .wiki/sources/development/            ║
║     ⚠️ SKIP sensitive files: .env*, credentials*, secrets*, *.key,          ║
║        *.pem, passwords*, id_rsa*, config/local.*, config/secret.*           ║
║  e. Executor posts SUBMISSION to Mailbox:                            ║
║     ┌──────────────────────────────────────┐                         ║
║     │ SUBMISSION                            │                         ║
║     │ Page: {page title}                    │                         ║
║     │ Wiki Type: {type}                     │                         ║
║     │ Sources used: {list with line ranges} │                         ║
║     │ Accuracy confidence: HIGH/MEDIUM/LOW  │                         ║
║     │ Wikilinks created: {count}            │                         ║
║     │ Self-review notes: {concerns}         │                         ║
║     │ Plan step reference: {which plan step}│                         ║
║     └──────────────────────────────────────┘                         ║
║                                                                      ║
║  STEP 5: Reviewer reviews each SUBMISSION                           ║
║  ─────────────────────────────────────────                           ║
║  f. Reviewer reads SUBMISSION from Mailbox                           ║
║  g. Reviewer verifies ALL 5 dimensions:                             ║
║     ┌──────────────────────────────────────────────────────┐         ║
║     │ 1. ACCURACY — Does description match code?          │         ║
║     │ 2. COMPLETENESS — Any stubs, TODOs, unknowns?       │         ║
║     │ 3. STRUCTURE — Proper frontmatter, scannable?        │         ║
║     │ 4. CITATIONS — Source refs correct (file:line)?       │         ║
║     │ 5. LINKS — Wikilinks valid and helpful?               │         ║
║     └──────────────────────────────────────────────────────┘         ║
║  h. Reviewer posts REVIEW to Mailbox:                                ║
║     ┌──────────────────────────────────────┐                         ║
║     │ REVIEW                                │                         ║
║     │ Page: {page title}                    │                         ║
║     │ Status: PASS or FAIL                  │                         ║
║     │ Findings:                             │                         ║
║     │ | # | Dimension | Finding | Severity | Action |                 ║
║     │ |---|-----------|---------|----------|--------|                 ║
║     │ | 1 | Accuracy  | ...     | CRITICAL | Fix    |                 ║
║     │ | 2 | Links     | ...     | MINOR    | Suggest|                 ║
║     └──────────────────────────────────────┘                         ║
║                                                                      ║
║  STEP 6: IF FAIL — Debate Loop (max 3 rounds)                       ║
║  ─────────────────────────────────────────                           ║
║  i. Executor reads REVIEW findings from Mailbox                       ║
║  j. For EACH finding:                                                ║
║     - If VALID → Fix the page → Note what was fixed                  ║
║     - If DISPUTED → Write DEFENSE with evidence:                     ║
║       "Finding #2 is invalid because source file X lines Y-Z show..." ║
║  k. Executor posts RESUBMISSION or DEFENSE to Mailbox                ║
║  l. Reviewer re-reviews → posts new REVIEW → back to step (g)       ║
║  m. After round 3 without resolution:                               ║
║     → Reviewer posts ESCALATION to Mailbox                           ║
║     → Tech Lead reads all debate history                             ║
║     → Tech Lead posts ARBITRATION with binding resolution            ║
║                                                                      ║
║  STEP 7: IF PASS                                                     ║
║  ─────────────────                                                   ║
║  n. Reviewer posts APPROVAL to Mailbox                               ║
║  o. Tech Lead marks page ✅ in Shared Task List                     ║
║  p. Move to next page → back to step (a)                           ║
║                                                                      ║
║  STEP 8: After ALL pages complete                                    ║
║  ─────────────────────────────                                       ║
║  q. Tech Lead verifies full coverage:                                ║
║     - All planned pages ✅ in Shared Task List                       ║
║     - No orphaned entities (entity without wiki page)                 ║
║  r. Tech Lead runs: python ~/.{TOOL}/skills/llm-wiki/scripts/update-index.py  ║
║  s. Tech Lead posts DECISION to Mailbox:                            ║
║     ┌──────────────────────────────────────┐                         ║
║     │ DECISION                              │                         ║
║     │ Phase: 5 — Wiki Page Generation       │                         ║
║     │ Status: COMPLETE                      │                         ║
║     │ Pages generated: {count}/{total}      │                         ║
║     │ Disputes resolved: {count}            │                         ║
║     │ ✅ CONSENSUS: wiki-architect ✓ |      │                         ║
║     │    wiki-extractor ✓ | wiki-reviewer ✓ │                         ║
║     └──────────────────────────────────────┘                         ║
║  t. Phase output released                                            ║
╚══════════════════════════════════════════════════════════════════════╝
```

**Exit Criteria**: All planned pages generated, all reviews passed, no orphaned entities, index updated
**Consensus**: ✅ CONSENSUS: wiki-architect ✓ | wiki-extractor ✓ | wiki-reviewer ✓

---

## 🎭 Phase 6: PEER REVIEW — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                       |
| --------- | ------------------------------------ | ------------------------------------------------------------- |
| Tech Lead | `wiki-architect`                     | Decompose: coverage check, accuracy verification, gap analysis |
| Executor  | `wiki-extractor`                     | Execute: verify every source file, cross-reference pages       |
| Reviewer  | `wiki-reviewer` (Adversarial)        | Challenge: find every gap, inaccuracy, missing cross-reference |

**Triangle Loop**:
1. `wiki-architect` decomposes review into tasks → Shared Task List
2. `wiki-extractor` verifies each page against sources → posts SUBMISSION with:
   - Coverage percentage per wiki type
   - Accuracy verification per page
   - Cross-reference density
   - Any gaps found
3. `wiki-reviewer` (as Adversarial) reviews with hard criteria → posts REVIEW:
   - Any entity in code not in wiki?
   - Any page with accuracy confidence below HIGH?
   - Any broken wikilinks?
   - Any page that just restates code without explaining WHY?
4. Debate loop → fix or defend → max 3 rounds
5. `wiki-architect` synthesizes final review report

**Deliverable**: `./.reports/{topic}/wikis/WIKI-TEAM-{project}/review.md`
**Exit Criteria**: 100% entity coverage, all pages accuracy HIGH, no broken links, no unexplained code
**Consensus**: ✅ CONSENSUS: wiki-architect ✓ | wiki-extractor ✓ | wiki-reviewer ✓

---

## 🎭 Phase 7: REFINEMENT & CONSENSUS — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                       |
| --------- | ------------------------------------ | ------------------------------------------------------------- |
| Tech Lead | `wiki-architect`                     | Decompose: refinement tasks, final polish, consensus verification |
| Executor  | `wiki-extractor`                     | Execute: address review findings, polish pages                 |
| Reviewer  | `wiki-reviewer`                      | Challenge: verify refinements, confirm 100% quality           |

**Triangle Loop**:
1. `wiki-architect` decomposes refinement based on Phase 6 review → Shared Task List
2. `wiki-extractor` addresses all findings → posts SUBMISSION with refinements made
3. `wiki-reviewer` validates each refinement → posts REVIEW with PASS/FAIL
4. Debate loop → fixes → consensus
5. `wiki-architect` posts final DECISION with full consensus stamp

**Deliverable**: `./.reports/{topic}/wikis/WIKI-TEAM-{project}/refinement.md` + final `.wiki/` state
**Exit Criteria**: All review findings addressed, all pages meet quality bar, full consensus achieved
**Consensus**: ✅ CONSENSUS: wiki-architect ✓ | wiki-extractor ✓ | wiki-reviewer ✓

---

## ✅ COMPLETION

Present Golden Triangle wiki generation report:

```markdown
# 🔺 Golden Triangle Wiki Report: {Project}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Architecture Scout | wiki-architect / wiki-extractor / wiki-reviewer | ✅ | {n} |
| P2: Entity Extraction | wiki-architect / wiki-extractor / wiki-reviewer | ✅ | {n} |
| P3: Taxonomy Design | wiki-architect / wiki-extractor / wiki-reviewer | ✅ | {n} |
| P4: Generation Plan | wiki-architect / wiki-extractor / wiki-reviewer | ✅ | {n} |
| P5: Page Generation | wiki-architect / wiki-extractor / wiki-reviewer | ✅ | {n} |
| P6: Peer Review | wiki-architect / wiki-extractor / wiki-reviewer | ✅ | {n} |
| P7: Refinement | wiki-architect / wiki-extractor / wiki-reviewer | ✅ | {n} |

## Wiki Coverage
| Wiki Type | Pages | Coverage |
|-----------|-------|----------|
| Summaries | {N} | 100% |
| Entities | {N} | 100% |
| Concepts | {N} | 100% |
| Comparisons | {N} | 100% |
| Decisions | {N} | 100% |
| Chronicles | {N} | {N}% (only if workflows exist) |
| Runbooks | {N} | {N}% (only if ops docs exist) |
| Syntheses | {N} | {N}% (only if query feedback exists) |
| Postmortems | {N} | {N}% (only if incidents exist) |
| **Total** | **{N}** | **{N}%** (across present types) |

## Quality Metrics
- **Entity coverage**: {N}/{N} entities documented
- **Source files ingested**: {N}
- **Cross-references**: {N} wikilinks
- **Accuracy**: 100% HIGH confidence

## Mailbox Reference
Full debate history: `./.reports/{topic}/MAILBOX-WIKI-{date}.md`

## Next Actions
1. ✅ **Done** — Wiki complete (triangle-validated across all phases)
2. 🔍 **Verify** → `/wiki status` and `/wiki lint`
3. 🗺️ **Graph** → `/wiki graph`
4. 🔎 **Query** → `/wiki query "..."`
```
