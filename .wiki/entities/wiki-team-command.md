---
title: Wiki Team Command
type: entity
tags: [command, wiki, team, golden-triangle, documentation, variant]
sources: ["commands/wiki/team.md:1-548"]
confidence: high
created: 2026-05-21
updated: 2026-05-21
---

# Wiki Team Command

The `/wiki:team` command (variant `:team`) is the **maximum quality** wiki generation workflow for the Agent Assistant. It invokes a full **Golden Triangle** of 3 agents (Tech Lead, Executor, Reviewer) across 7 sequential phases, producing a 100% coverage, peer-validated wiki through adversarial collaboration.

**Source**: `commands/wiki/team.md:1-548`

---

## Overview

The `/wiki:team` command targets **100% knowledge coverage** with perfect accuracy. Unlike `/wiki:fast` (speed) or `/wiki:hard` (single-agent quality), the team variant uses structured adversarial debate to find gaps that single-pass approaches miss.

### Scalability Guide

| Codebase Size | Variant | Rationale |
|--------------|---------|-----------|
| < 20 files | `/wiki:fast` | Bootstrap speed |
| 20-100 files | `/wiki:hard` | Full coverage without overhead |
| 100-500 files | `/wiki:team` | Adversarial review finds gaps |
| 500+ files | `/wiki:team` + phased passes | Multiple passes, focus areas |

### Cost Warning

> **Team variant is high-overhead**: 7 phases × 3 agents × multiple debate rounds = significant token cost. Only use when the codebase has enough depth for adversarial review to find meaningful gaps. For small codebases (<20 files), the overhead exceeds the benefit.

**Source**: `commands/wiki/team.md:16-25`

---

## Pre-Flight Requirements

Before Phase 1 runs, the following rules **must** be loaded (in order):

1. **CORE.md** — Identity, Laws, Routing (`rules/CORE.md:1-211`)
2. **PHASES.md** — Phase Execution (`rules/PHASES.md:1-340`)
3. **AGENTS.md** — Tiered Execution (`rules/AGENTS.md:1-263`)
4. **TEAMS.md** — Golden Triangle protocol (`rules/TEAMS.md:1-545`) — **MANDATORY**
5. **WIKI.md** — Wiki Awareness evaluation protocol (`rules/WIKI.md:1-251`)
6. **llm-wiki/SKILL.md** — Wiki engine commands (`~/.cursor/skills/llm-wiki/SKILL.md`)

**Source**: `commands/wiki/team.md:31-42`

> **Rule**: Do not run Phase 1 until all are loaded. All rules in those files override any conflicting instructions in the command file.

---

## Tiered Execution

The `/wiki:team` command uses a two-tier execution model:

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | `runSubagent`/`Agent` tool exists | Orchestrator spawns Tech Lead → Tech Lead spawns Executor + Reviewer |
| **TIER 2** | Tool missing or system error | Orchestrator embodies Tech Lead → Executor → Reviewer → Tech Lead |

**Anti-Lazy Rule**: Never use TIER 2 when TIER 1 is available.

**TIER 2 Golden Triangle Embodiment** (fallback only):
1. EMBODY Tech Lead → decompose task → produce Shared Task List → dispatch
2. EMBODY Executor → implement tasks → post SUBMISSION to Mailbox
3. EMBODY Reviewer → review submission → post REVIEW to Mailbox (PASS/FAIL)
4. IF FAIL → EMBODY Executor again → fix/defend → EMBODY Reviewer → re-check
5. Repeat steps 3-4 max 3 rounds
6. EMBODY Tech Lead → arbitrate if needed → post DECISION → synthesize output

**Source**: `commands/wiki/team.md:46-65`

---

## Mailbox Protocol

All 3 triangle agents communicate through a shared append-only Mailbox file:

**Location**: `./.reports/{topic}/MAILBOX-WIKI-{date}.md`

### Mailbox Size Management

```
- If Mailbox exceeds 200 lines, Tech Lead creates a new segment:
  → ./.reports/{topic}/MAILBOX-WIKI-{date}-P{phase}.md for current phase
- Archive prior phase Mailboxes: rename to MAILBOX-WIKI-{date}-P{phase}-FINAL.md
- Each phase starts with a fresh, focused Mailbox
- Archive files remain readable for full debate history
```

### Message Format

```markdown
---
## [{TIMESTAMP}] {MESSAGE_TYPE} | {AGENT} → {TARGET}
**Phase**: {phase number}
**Task**: {task ID from Shared Task List}
**Content**:
{message body}
---
```

### Message Types

| Type | Sender | Receiver | Purpose |
|------|--------|----------|---------|
| `TASK_ASSIGNMENT` | Tech Lead | Executor | Assign task with requirements and context |
| `SUBMISSION` | Executor | Reviewer | Submit completed work for review |
| `REVIEW` | Reviewer | Executor | Review result: PASS or FAIL with findings |
| `DEFENSE` | Executor | Reviewer | Defend implementation against FAIL findings |
| `RESUBMISSION` | Executor | Reviewer | Resubmit after fixing FAIL findings |
| `APPROVAL` | Reviewer | Tech Lead | Confirm task passes all review criteria |
| `ESCALATION` | Any | Tech Lead | Escalate unresolvable disagreement |
| `ARBITRATION` | Tech Lead | All | Tech Lead resolves dispute with binding decision |
| `DECISION` | Tech Lead | All | Final phase decision with consensus stamp |

**Source**: `commands/wiki/team.md:69-111`

---

## Deliverable Files

| Phase | Output |
|-------|--------|
| P1: Architecture Scout | `./.reports/{topic}/scouts/SCOUT-{project}/` |
| P2: Entity Extraction | `./.reports/{topic}/wikis/WIKI-TEAM-{project}/00-catalog.md` |
| P3: Wiki Taxonomy Design | `./.reports/{topic}/wikis/WIKI-TEAM-{project}/00-taxonomy.md` |
| P4: Wiki Generation Plan | `./.reports/{topic}/plans/PLAN-WIKI-{project}/` |
| P5: Wiki Page Generation | `.wiki/` + `./.reports/{topic}/wikis/WIKI-TEAM-{project}/generation-log.md` |
| P6: Peer Review | `./.reports/{topic}/wikis/WIKI-TEAM-{project}/review.md` |
| P7: Refinement & Consensus | `./.reports/{topic}/wikis/WIKI-TEAM-{project}/refinement.md` |
| ALL Phases | `./.reports/{topic}/MAILBOX-WIKI-{date}.md` |

**Source**: `commands/wiki/team.md:114-129`

---

## Golden Triangle Loop (Universal Protocol)

Every phase follows this exact loop:

```
1. Tech Lead decomposes phase goal into tasks
   → Publishes Shared Task List
   → Posts TASK_ASSIGNMENT to Mailbox for each task

2. Executor works each task
   → Posts SUBMISSION to Mailbox per task
   → Includes: what was done, approach, accuracy confidence

3. Reviewer reviews each SUBMISSION
   → Posts REVIEW to Mailbox: PASS or FAIL
   → FAIL includes: findings table, severity, required actions

4. IF FAIL (debate loop, max 3 rounds):
   → Executor reads findings
   → For each finding: Fix (if valid) or DEFENSE (if disputed)
   → Posts RESUBMISSION or DEFENSE to Mailbox
   → Reviewer re-reviews → back to step 3
   → After 3 rounds without resolution → ESCALATION to Tech Lead

5. IF PASS:
   → Reviewer posts APPROVAL to Mailbox
   → Task marked ✅ in Shared Task List

6. After ALL tasks complete:
   → Tech Lead verifies integration/coherence
   → Tech Lead posts DECISION with consensus stamp
   → Phase output released

OUTPUT: ✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓
```

**Source**: `commands/wiki/team.md:133-172`

---

## Phase Dependencies

| Phase | Requires | Blocking? |
|-------|----------|----------|
| P1: Architecture Scout | User request | No |
| P2: Entity Extraction | P1 scout findings | **YES** |
| P3: Wiki Taxonomy Design | P2 extraction | No |
| P4: Wiki Generation Plan | P3 taxonomy | **YES** |
| P5: Wiki Page Generation | P4 plan | **YES** |
| P6: Peer Review | P5 generated pages | **YES** |
| P7: Refinement & Consensus | P6 review findings | **YES** |

**Source**: `commands/wiki/team.md:175-187`

---

## The 7 Phases

### Phase 1: Architecture Scout

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `wiki-architect` | Decompose: scout scope, layer coverage, depth requirements |
| Executor | `wiki-extractor` | Execute: deep codebase analysis across all layers |
| Reviewer | `wiki-reviewer` (Devil's Advocate) | Challenge: find uncovered areas, verify completeness |

**Deliverable**: `./.reports/{topic}/scouts/SCOUT-{project}/`
**Exit Criteria**: All architecture layers mapped, patterns identified, entities catalogued, integration points documented

### Phase 2: Entity Extraction

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `wiki-architect` | Decompose: entity categories, extraction priorities, relationships |
| Executor | `wiki-extractor` | Execute: extract all entities with full metadata |
| Reviewer | `wiki-reviewer` (Accuracy Validator) | Challenge: verify entity descriptions, source citations |

**Deliverable**: `./.reports/{topic}/wikis/WIKI-TEAM-{project}/00-catalog.md`
**Exit Criteria**: Every entity documented, source references verified, relationships mapped, accuracy HIGH

### Phase 3: Wiki Taxonomy Design

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `wiki-architect` | Decompose: page types, priorities, cross-references |
| Executor | `wiki-extractor` | Execute: design wiki structure, map entities to page types |
| Reviewer | `wiki-reviewer` (Completeness Check) | Challenge: are all knowledge needs covered? any gaps? |

**Deliverable**: `./.reports/{topic}/wikis/WIKI-TEAM-{project}/00-taxonomy.md`
**Exit Criteria**: Every knowledge domain has a page plan, cross-references defined, generation order set

### Phase 4: Wiki Generation Plan

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `wiki-architect` | Decompose: page generation tasks, sequencing, resource estimation |
| Executor | `wiki-extractor` | Execute: write detailed generation plan per page |
| Reviewer | `wiki-reviewer` (Feasibility Check) | Challenge: can each page be generated from sources? unrealistic plans? |

**Deliverable**: `./.reports/{topic}/plans/PLAN-WIKI-{project}/`
**Exit Criteria**: Every page has a generation plan, sources mapped, order defined, risks identified

### Phase 5: Wiki Page Generation

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `wiki-architect` | Load PLAN → decompose into page tasks → coordinate generation |
| Executor | `wiki-extractor` | Follow plan → generate each wiki page → submit via Mailbox |
| Reviewer | `wiki-reviewer` | Review EVERY page → check accuracy, completeness, structure |

**Exit Criteria**: All planned pages generated, all reviews passed, no orphaned entities, index updated

### Phase 6: Peer Review

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `wiki-architect` | Decompose: coverage check, accuracy verification, gap analysis |
| Executor | `wiki-extractor` | Execute: verify every source file, cross-reference pages |
| Reviewer | `wiki-reviewer` (Adversarial) | Challenge: find every gap, inaccuracy, missing cross-reference |

**Deliverable**: `./.reports/{topic}/wikis/WIKI-TEAM-{project}/review.md`
**Exit Criteria**: 100% entity coverage, all pages accuracy HIGH, no broken links, no unexplained code

### Phase 7: Refinement & Consensus

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `wiki-architect` | Decompose: refinement tasks, final polish, consensus verification |
| Executor | `wiki-extractor` | Execute: address review findings, polish pages |
| Reviewer | `wiki-reviewer` | Challenge: verify refinements, confirm 100% quality |

**Deliverable**: `./.reports/{topic}/wikis/WIKI-TEAM-{project}/refinement.md` + final `.wiki/` state
**Exit Criteria**: All review findings addressed, all pages meet quality bar, full consensus achieved

**Source**: `commands/wiki/team.md:211-498`

---

## Related Pages

- [[Command System]] — All 14 commands including wiki variants
- [[Golden Triangle]] — The adversarial 3-agent collaboration pattern
- [[Team System]] — All 18 Golden Triangle teams
- [[Wiki Awareness]] — When and how to consult the wiki
- [[Wiki Architect]] — The Tech Lead role for wiki generation
- [[Wiki Extractor]] — The Executor role for wiki generation
- [[Wiki Reviewer]] — The Reviewer role for wiki generation
