---
title: Detailed Workflows
description: Complete phase-by-phase execution flows for all agent commands including /cook, /fix, /test, /plan, /review, /debug, /wiki, and /deploy with variant differences and actor assignments.
category: runbook
tags: [workflows, execution, phases, commands, agent-commands]
created: 2026-05-20
updated: 2026-05-20
related:
  - [[Workflow Catalog]]
  - [[Actor Map]]
  - [[SLA and Handoffs]]
  - [[Golden Triangle]]
  - [[Command System]]
  - [[Tiered Orchestration]]
---

# Detailed Workflows

This runbook documents the complete phase-by-phase execution flows for all 14 commands plus 3 implicit workflows supported by Agent Assistant. Each workflow specifies exact steps, exit criteria per phase, variant differences, actor assignments, and routing logic.

---

## Workflow Overview

The command system operates on a tiered execution model where the appropriate workflow is selected based on feature complexity and collaboration requirements. The three primary workflow variants—fast, hard, and team—scale from single-phase execution to full parallel team collaboration.

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:1-5`

### Workflow Selection Matrix

| Command | Fast | Hard | Team | Variants |
|---------|------|------|------|----------|
| `/cook` | 3 phases | 6 phases | 4 phases + team | fast, hard, team |
| `/fix` | 3 phases | — | — | single variant |
| `/test` | 3 phases | — | — | single variant |
| `/plan` | 3 phases | — | — | single variant |
| `/review` | 2 phases | — | — | single variant |
| `/debug` | 3 phases | — | — | single variant |
| `/wiki` | 3 phases | — | — | single variant |
| `/deploy` | 3 phases | — | — | check, preview, production, rollback |

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:8-48`

---

## /cook — Feature Development

The `/cook` command handles feature implementation across three variants that scale in complexity and team involvement. The variant is selected based on feature complexity, with fast for simple features, hard for complex multi-component features, and team for maximum quality with parallel agent collaboration.

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:8-130`

### /cook:fast — Quick Implementation

The fast variant executes feature development in three phases with minimal overhead, suitable for features with clear specifications and low complexity.

#### Phase Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Requirements Intake                                    │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Orchestrator                                             │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse user request                                         │
│ 1.2. Extract feature scope                                      │
│ 1.3. Create Requirements Registry (R1, R2, ...)               │
│ 1.4. Verify requirements completeness                          │
│ 1.5. Lock requirements as immutable                            │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Requirements Registry complete with all R IDs     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Implementation                                         │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Sub-agent (TIER 1) or Orchestrator (TIER 2)             │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Select agent based on task type                            │
│ 2.2. Analyze skills (Complex → resolve, Simple → skip)          │
│ 2.3. Inject relevant skills                                    │
│ 2.4. Delegate to TIER 1 (sub-agent) or TIER 2 (embody)         │
│ 2.5. Implement feature                                          │
│ 2.6. Verify implementation against requirements                 │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Code written, matches requirements                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Delivery                                               │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Orchestrator                                              │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Format output per agent format                             │
│ 3.2. Include deliverable path                                  │
│ 3.3. Verify scope compliance                                   │
│ 3.4. Complete workflow                                          │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Deliverable ready                                │
└─────────────────────────────────────────────────────────────────┘
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:12-48`

#### Phase Details

**Phase 1: Requirements Intake**
- The orchestrator parses the user request to extract the feature scope
- Requirements are created as numbered entries (R1, R2, R3, ...) in the Requirements Registry
- Completeness is verified before locking requirements as immutable
- Exit criteria: All requirements have assigned R IDs and are locked

**Phase 2: Implementation**
- Agent selection follows the tiered execution model: TIER 1 for sub-agent availability, TIER 2 as fallback
- Skills are analyzed and injected only when the task is complex
- Simple tasks skip skill resolution to minimize overhead
- Exit criteria: Implementation complete and verified against requirements

**Phase 3: Delivery**
- Output is formatted according to the agent's format specification
- The deliverable path is included for user reference
- Scope compliance is verified before workflow completion
- Exit criteria: Deliverable is ready for user consumption

---

### /cook:hard — Full Feature Development

The hard variant implements complex multi-component features with enhanced requirements intake, dedicated planning phase, milestone-based implementation, and mandatory review and testing cycles.

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:50-130`

#### Phase Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Requirements Intake (Enhanced)                         │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Orchestrator                                              │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse user request                                         │
│ 1.2. Extract ALL requirements (L2: 100% fidelity)               │
│ 1.3. Create Requirements Registry with priorities               │
│ 1.4. Identify ambiguities → ASK user for clarification          │
│ 1.5. Lock requirements as immutable                             │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: All requirements parsed, ambiguities resolved      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Planning                                                │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Planner Agent                                             │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Delegate to planner agent                                  │
│ 2.2. Scout codebase for relevant patterns                       │
│ 2.3. Create implementation plan with milestones                 │
│ 2.4. Estimate effort per milestone                              │
│ 2.5. Identify dependencies                                      │
│ 2.6. Verify plan covers all requirements                        │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Plan approved, milestones defined                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Implementation                                          │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Specialized Agent (per milestone)                         │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Execute milestones in order                                │
│ 3.2. For each milestone:                                        │
│      3.2.1. Select appropriate agent                            │
│      3.2.2. Inject relevant skills                              │
│      3.2.3. Implement milestone                                 │
│      3.2.4. Self-verify against plan                            │
│ 3.3. Track progress in Requirements Registry                    │
│ 3.4. Lock each milestone upon completion                        │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: All milestones complete, requirements verified    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 4: Review                                                  │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Reviewer Agent                                            │
├─────────────────────────────────────────────────────────────────┤
│ 4.1. Delegate to reviewer agent                                 │
│ 4.2. Review code for:                                           │
│      - Correctness                                              │
│      - Security                                                 │
│      - Performance                                              │
│      - Standards compliance                                      │
│ 4.3. Document findings                                          │
│ 4.4. If FAIL: return to Phase 3 with fixes                      │
│ 4.5. If PASS: proceed                                            │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Review PASS or issues resolved                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 5: Testing                                                 │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Tester Agent                                              │
├─────────────────────────────────────────────────────────────────┤
│ 5.1. Delegate to tester agent                                   │
│ 5.2. Generate tests based on requirements                       │
│ 5.3. Ensure coverage meets threshold                            │
│ 5.4. Run tests                                                  │
│ 5.5. If failures: return to Phase 3                             │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Tests passing, coverage adequate                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 6: Delivery                                                │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Orchestrator                                              │
├─────────────────────────────────────────────────────────────────┤
│ 6.1. Verify all requirements met (trace to evidence)            │
│ 6.2. Verify all acceptance criteria met                         │
│ 6.3. Complete workflow with summary                             │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Workflow complete, all criteria verified          │
└─────────────────────────────────────────────────────────────────┘
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:50-130`

#### Phase Details

**Phase 1: Requirements Intake (Enhanced)**
- Requirements extraction achieves L2 (100%) fidelity, meaning all edge cases and error conditions must be documented
- The Requirements Registry includes priority levels for each requirement
- Ambiguities trigger user clarification before proceeding
- Exit criteria: Zero unresolved ambiguities, all requirements locked

**Phase 2: Planning**
- The planner agent is delegated to create the implementation roadmap
- Codebase scouting identifies existing patterns and dependencies
- Milestones are created with estimated effort and clear dependencies
- Exit criteria: Implementation plan approved, all milestones defined

**Phase 3: Implementation**
- Milestones execute in dependency order
- Each milestone uses a specialized agent appropriate to the component type
- Skills are injected based on the milestone's requirements
- Self-verification confirms alignment with the plan
- The Requirements Registry tracks progress throughout
- Exit criteria: All milestones locked, requirements verified

**Phase 4: Review**
- The reviewer agent evaluates code across four dimensions: correctness, security, performance, and standards compliance
- Findings are documented with severity levels
- Failed reviews return the workflow to Phase 3 for fixes
- Exit criteria: Review passes or all issues are resolved

**Phase 5: Testing**
- The tester agent generates tests based on the requirements
- Coverage thresholds must be met before proceeding
- Test failures return the workflow to Phase 3
- Exit criteria: All tests pass, coverage thresholds met

**Phase 6: Delivery**
- Final verification traces each requirement to implementation evidence
- Acceptance criteria are confirmed against the original requirements
- Exit criteria: Workflow complete with validated deliverable

#### Variant Differences: fast vs hard

| Aspect | Fast | Hard |
|--------|------|------|
| Phases | 3 | 6 |
| Requirements | Basic extraction | L2 (100%) fidelity with clarification |
| Planning | Implicit | Dedicated planner agent |
| Milestones | None | Required with dependencies |
| Review | Implicit | Mandatory reviewer agent |
| Testing | Implicit | Mandatory tester agent |
| Skill Resolution | Skip for simple | Always analyze |
| Loop Handling | None | Review failures return to Phase 3 |
| Coverage Tracking | None | Required thresholds |

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:50-130`

---

### /cook:team — Team Collaboration

The team variant executes feature development with the Golden Triangle team structure (Tech Lead, Executor, Reviewer) in parallel, using the Mailbox protocol for coordination. This variant provides maximum quality through adversarial review and consensus building.

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:132-187`

#### Golden Triangle Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    GOLDEN TRIANGLE TEAM                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│  │  TECH LEAD   │────▶│   EXECUTOR   │◀────│   REVIEWER   │    │
│  └──────────────┘     └──────────────┘     └──────────────┘    │
│        │                    │                    │              │
│        └────────────────────┴────────────────────┘              │
│                              │                                   │
│                       Mailbox Protocol                          │
│                  ./reports/{topic}/MAILBOX-{date}.md            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Source**: `rules/TEAMS.md` — Golden Triangle communication protocol

#### Phase Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Requirements Intake + Team Setup                        │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Orchestrator (initiates team spawning)                   │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse requirements (as /cook:hard)                         │
│ 1.2. Select team configuration (backend, frontend, fullstack)    │
│ 1.3. Initialize Mailbox: ./reports/{topic}/MAILBOX-{date}.md   │
│ 1.4. Spawn Golden Triangle: Tech Lead + Executor + Reviewer      │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Requirements locked, team spawned, Mailbox ready │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Tech Lead Decomposition                                 │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Tech Lead                                                │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Tech Lead reads all requirements                           │
│ 2.2. Decompose into tasks (T1, T2, ...)                         │
│ 2.3. Publish Shared Task List                                   │
│ 2.4. Post TASK_ASSIGNMENT to Mailbox                            │
│ 2.5. Assign tasks to Executor                                   │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Task list published, assignments clear           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Executor Implementation + Review Cycle                  │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Executor (implements) + Reviewer (reviews)               │
├─────────────────────────────────────────────────────────────────┤
│ FOR each task:                                                  │
│ 3.1. Executor implements task                                   │
│ 3.2. Executor posts SUBMISSION to Mailbox                       │
│ 3.3. Reviewer reads submission                                  │
│ 3.4. Reviewer posts REVIEW (PASS/FAIL) to Mailbox              │
│ 3.5. IF FAIL:                                                  │
│      3.5.1. Executor reads findings                            │
│      3.5.2. Executor FIXES or DEFENDS (with evidence)           │
│      3.5.3. Reviewer re-checks                                  │
│      3.5.4. Repeat until PASS or Round 3                       │
│ 3.6. IF Round 3 without agreement: Tech Lead arbitrates        │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: All tasks PASS or arbitrated                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 4: Consensus + Delivery                                    │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Tech Lead (synthesizes)                                  │
├─────────────────────────────────────────────────────────────────┤
│ 4.1. Tech Lead reads ALL Mailbox exchanges                      │
│ 4.2. Tech Lead synthesizes approved output                       │
│ 4.3. Tech Lead posts DECISION with consensus stamp:             │
│      "✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓"       │
│ 4.4. Complete workflow with validated deliverable                 │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Consensus stamp present, output validated         │
└─────────────────────────────────────────────────────────────────┘
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:132-187`

#### Phase Details

**Phase 1: Requirements Intake + Team Setup**
- Requirements are parsed at the enhanced level (same as /cook:hard)
- Team configuration is selected based on the feature type: backend, frontend, or fullstack
- The Mailbox is initialized at `./reports/{topic}/MAILBOX-{date}.md`
- Three agents are spawned: Tech Lead (decomposition + arbitration), Executor (implementation), Reviewer (adversarial review)
- Exit criteria: Requirements locked, all three agents active, Mailbox initialized

**Phase 2: Tech Lead Decomposition**
- The Tech Lead reviews all requirements and decomposes them into numbered tasks (T1, T2, T3, ...)
- The Shared Task List is published to the Mailbox
- TASK_ASSIGNMENT messages are posted to assign tasks to the Executor
- Exit criteria: All tasks defined, dependencies mapped, Executor has clear assignments

**Phase 3: Executor Implementation + Review Cycle**
- The Executor implements each task in assignment order
- After implementation, the Executor posts a SUBMISSION message to the Mailbox
- The Reviewer reads the submission and posts a REVIEW message with PASS or FAIL status
- If FAIL: The Executor either fixes the issue or defends the implementation with evidence
- The Reviewer re-checks after each fix or defense
- The cycle repeats until PASS or Round 3 (maximum)
- At Round 3 without agreement, the Tech Lead arbitrates
- Exit criteria: All tasks have PASS status or Tech Lead arbitration

**Phase 4: Consensus + Delivery**
- The Tech Lead reviews all Mailbox exchanges to understand the full history
- Approved outputs are synthesized into the final deliverable
- A DECISION message with consensus stamp is posted: "✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓"
- The workflow completes with the validated deliverable
- Exit criteria: Consensus stamp present, output validated by Tech Lead

#### Review Cycle Protocol

```
┌─────────────┐     SUBMISSION      ┌─────────────┐
│  EXECUTOR   │────────────────────▶│  REVIEWER   │
└─────────────┘                     └─────────────┘
      ▲                                    │
      │          REVIEW (FAIL)             │
      │◀───────────────────────────────────┘
      │
      │  FIX / DEFEND
      │
      ▼
┌─────────────┐                     ┌─────────────┐
│  EXECUTOR   │────────────────────▶│  REVIEWER   │
└─────────────┘                     └─────────────┘
      ▲                                    │
      │       (Repeat up to Round 3)       │
      │                                    ▼
      │                           ┌─────────────┐
      └───────────────────────────│  TECH LEAD  │
         Round 3 Arbitration       │ ARBITRATES  │
                                   └─────────────┘
```

**Source**: `rules/TEAMS.md` — Review cycle with escalation

#### Variant Differences: hard vs team

| Aspect | Hard | Team |
|--------|------|------|
| Phases | 6 | 4 + team coordination |
| Agents | Single agent (orchestrated) | 3 specialized agents |
| Communication | Direct delegation | Mailbox protocol |
| Review | Single pass | Multi-round with escalation |
| Consensus | Implicit | Explicit (consensus stamp) |
| Loop Handling | Return to Phase 3 | Tech Lead arbitration |
| Task Decomposition | Milestones | Tasks with dependencies |
| Skill Resolution | Per milestone | Per task |

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:132-187`

---

## /fix — Bug Fix

The `/fix` command handles bug resolution through a streamlined three-phase workflow that focuses on root cause investigation, fix implementation, and verification.

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:191-226`

### Phase Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Issue Investigation                                    │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Orchestrator + Debugger Agent                            │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse error description                                    │
│ 1.2. Gather error context (logs, reproduction steps)             │
│ 1.3. Delegate to debugger agent                                 │
│ 1.4. Investigate root cause                                     │
│ 1.5. Document findings                                          │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Root cause identified                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Fix Implementation                                     │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Backend Engineer or Frontend Engineer                     │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Propose fix based on root cause                           │
│ 2.2. Implement fix                                              │
│ 2.3. Verify fix addresses root cause                           │
│ 2.4. Check for side effects                                     │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Fix implemented, root cause addressed            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Verification                                           │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Tester Agent (verifies)                                  │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Verify original issue resolved                             │
│ 3.2. Run existing tests                                        │
│ 3.3. Complete workflow                                          │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Issue resolved, tests passing                     │
└─────────────────────────────────────────────────────────────────┘
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:191-226`

### Phase Details

**Phase 1: Issue Investigation**
- The error description is parsed to extract the bug's symptoms and scope
- Error context is gathered including logs, stack traces, and reproduction steps
- The debugger agent is delegated to perform systematic root cause analysis
- Findings are documented with evidence from the investigation
- Exit criteria: Root cause identified and documented

**Phase 2: Fix Implementation**
- A fix is proposed based on the confirmed root cause
- The fix is implemented with attention to avoiding side effects
- Verification confirms the fix addresses the root cause (not just symptoms)
- Side effect analysis checks for impacts on related functionality
- Exit criteria: Fix implemented, root cause eliminated

**Phase 3: Verification**
- The original issue is verified as resolved through manual or automated testing
- Existing tests are run to confirm no regressions
- The workflow is completed with the fix documented
- Exit criteria: Issue resolved, all existing tests passing

### Actor Assignment

| Phase | Primary Actor | Supporting Actor |
|-------|--------------|------------------|
| 1: Investigation | Debugger Agent | Orchestrator |
| 2: Implementation | Backend/Frontend Engineer | — |
| 3: Verification | Tester Agent | — |

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:191-226`

---

## /test — Test Generation

The `/test` command generates and executes tests based on feature context, following a three-phase workflow focused on planning, generation, and verification.

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:230-265`

### Phase Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Test Planning                                          │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Tester Agent                                             │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse feature context                                     │
│ 1.2. Identify test scenarios                                    │
│ 1.3. Determine test types (unit, integration, E2E)              │
│ 1.4. Set coverage targets                                       │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Test plan defined                                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Test Generation                                        │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Tester Agent                                             │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Generate tests per plan                                    │
│ 2.2. Include edge cases                                        │
│ 2.3. Document test rationale                                    │
│ 2.4. Verify test syntax                                         │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Tests generated                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Review + Execution                                     │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Tester Agent + CI Pipeline                               │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Execute tests                                              │
│ 3.2. Review coverage report                                    │
│ 3.3. If coverage < target: add tests                            │
│ 3.4. Complete workflow                                          │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Tests passing, coverage adequate                  │
└─────────────────────────────────────────────────────────────────┘
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:230-265`

### Phase Details

**Phase 1: Test Planning**
- The feature context is parsed to understand the functionality under test
- Test scenarios are identified covering happy path, edge cases, and error conditions
- Test types are determined based on the feature: unit tests for individual functions, integration tests for component interactions, E2E tests for user flows
- Coverage targets are set according to the testing standards
- Exit criteria: Test plan defined with scenarios, types, and targets

**Phase 2: Test Generation**
- Tests are generated for each scenario in the plan
- Edge cases receive special attention including boundary values, null inputs, and extreme values
- Test rationale is documented explaining why each test exists
- Test syntax is verified to ensure the tests are valid
- Exit criteria: All tests written with documented rationale

**Phase 3: Review + Execution**
- Tests are executed against the codebase
- Coverage reports are reviewed to verify targets are met
- If coverage is below target, additional tests are added
- The workflow completes when tests pass and coverage is adequate
- Exit criteria: All tests passing, coverage thresholds met

### Coverage Requirements

| Component | Target | Source |
|-----------|--------|--------|
| CLI functions | 80% | `documents/knowledge-standards/04-testing-standards.md` |
| Web critical paths | 100% | `documents/knowledge-standards/04-testing-standards.md` |
| Web utilities | 70% | `documents/knowledge-standards/04-testing-standards.md` |
| Web components | 70% | `documents/knowledge-standards/04-testing-standards.md` |

**Source**: `documents/knowledge-standards/04-testing-standards.md:99-107`

---

## /plan — Implementation Planning

The `/plan` command creates detailed implementation plans through a three-phase workflow focused on scouting, planning, and review.

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:269-306`

### Phase Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Scouting                                               │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Scouter Agent                                            │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse feature concept                                     │
│ 1.2. Delegate to scouter agent                                 │
│ 1.3. Explore codebase for relevant patterns                     │
│ 1.4. Map dependencies                                          │
│ 1.5. Document findings                                          │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Codebase context understood                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Planning                                               │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Planner Agent                                            │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Create implementation plan                                 │
│ 2.2. Break into milestones with dependencies                   │
│ 2.3. Estimate effort per milestone                             │
│ 2.4. Identify risks and mitigations                            │
│ 2.5. Define acceptance criteria per milestone                   │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Plan complete with milestones                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Review                                                 │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Orchestrator                                             │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Review plan against requirements                           │
│ 3.2. Verify feasibility                                        │
│ 3.3. Refine if needed                                          │
│ 3.4. Complete workflow                                          │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Plan approved                                    │
└─────────────────────────────────────────────────────────────────┘
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:269-306`

### Phase Details

**Phase 1: Scouting**
- The feature concept is parsed to understand the scope and objectives
- The scouter agent is delegated to explore the codebase
- Relevant patterns are identified in existing code that can inform implementation
- Dependencies are mapped including external services, libraries, and internal modules
- Findings are documented for use in planning
- Exit criteria: Complete understanding of the codebase context

**Phase 2: Planning**
- An implementation plan is created with a structured approach to the feature
- The plan is broken into milestones with clear dependencies between them
- Effort is estimated for each milestone to provide timeline visibility
- Risks are identified with proposed mitigations
- Acceptance criteria are defined for each milestone as success indicators
- Exit criteria: Complete plan with milestones, estimates, and criteria

**Phase 3: Review**
- The plan is reviewed against the original requirements to ensure alignment
- Feasibility is verified considering available resources and constraints
- The plan is refined if gaps or issues are identified
- The workflow completes with an approved plan
- Exit criteria: Plan approved and ready for execution

### Output Format

The `/plan` command produces a milestone-based implementation plan:

```markdown
# Implementation Plan: {feature-name}

## Milestones

### M1: {milestone-name}
- **Dependencies**: None (or list of dependencies)
- **Effort**: {estimated effort}
- **Acceptance Criteria**:
  - [ ] {criterion 1}
  - [ ] {criterion 2}

### M2: {milestone-name}
- **Dependencies**: M1
- **Effort**: {estimated effort}
- **Acceptance Criteria**:
  - [ ] {criterion 1}

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| {risk} | {impact} | {mitigation} |
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:269-306`

---

## /review — Code Review

The `/review` command evaluates code quality through a two-phase workflow focused on thorough analysis and structured reporting.

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:310-338`

### Phase Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Review                                                 │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Reviewer Agent                                           │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse code to review                                       │
│ 1.2. Analyze for:                                               │
│      - Correctness                                              │
│      - Security vulnerabilities                                 │
│      - Performance issues                                       │
│      - Standards compliance                                      │
│      - Edge cases                                               │
│ 1.3. Document findings                                          │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Review complete, findings documented              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Report                                                  │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Reviewer Agent                                           │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Compile findings                                           │
│ 2.2. Prioritize by severity                                     │
│ 2.3. Provide recommendations                                    │
│ 2.4. Complete workflow                                          │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Report complete                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:310-338`

### Phase Details

**Phase 1: Review**
- The code under review is parsed to understand its structure and intent
- Analysis covers five dimensions:
  - **Correctness**: Does the code do what it's supposed to do?
  - **Security**: Are there vulnerabilities such as injection, authentication bypass, or data exposure?
  - **Performance**: Are there inefficient algorithms, unnecessary allocations, or N+1 queries?
  - **Standards compliance**: Does the code follow project conventions and best practices?
  - **Edge cases**: How does the code handle null, empty, boundary values, and error conditions?
- Findings are documented with file locations and line references
- Exit criteria: Complete review with all findings documented

**Phase 2: Report**
- Findings are compiled into a structured report
- Severity is assigned to each finding: Critical, High, Medium, Low
- Recommendations are provided for addressing each finding
- The workflow completes with the review report
- Exit criteria: Report complete with prioritized recommendations

### Finding Severity Levels

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| Critical | Security vulnerability or data corruption risk | Immediate fix required |
| High | Major functional issue or significant performance impact | Fix before merge |
| Medium | Code quality issue or minor functional gap | Address in next sprint |
| Low | Style violation or minor improvement opportunity | Address when convenient |

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:310-338`

---

## /debug — Debugging

The `/debug` command performs systematic root cause analysis through a three-phase workflow that prioritizes evidence gathering over speculation.

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:342-377`

### Phase Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Investigation                                          │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Debugger Agent                                           │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse error description                                    │
│ 1.2. Gather context (stack traces, logs, reproduction)          │
│ 1.3. Reproduce error if possible                                │
│ 1.4. Trace execution flow                                       │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Error reproducible or context gathered           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Analysis                                               │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Debugger Agent                                           │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Identify root cause                                        │
│ 2.2. Trace backward to source                                   │
│ 2.3. Document failure chain                                     │
│ 2.4. Propose fix strategy                                       │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Root cause identified                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Report                                                  │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Debugger Agent                                           │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Document root cause                                        │
│ 3.2. Provide fix proposal                                       │
│ 3.3. Suggest prevention measures                               │
│ 3.4. Complete workflow                                          │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Report complete with fix proposal                 │
└─────────────────────────────────────────────────────────────────┘
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:342-377`

### Phase Details

**Phase 1: Investigation**
- The error description is parsed to understand the symptoms
- Context is gathered including stack traces, logs, and any available reproduction steps
- If possible, the error is reproduced in a controlled environment
- The execution flow is traced from entry point to failure point
- Exit criteria: Error reproducible or complete context gathered

**Phase 2: Analysis**
- The root cause is identified through systematic backward tracing from the failure point
- The failure chain is documented showing how the root cause propagates to the visible symptoms
- A fix strategy is proposed that addresses the root cause, not just the symptoms
- Exit criteria: Root cause confirmed and fix strategy defined

**Phase 3: Report**
- The root cause is documented with supporting evidence
- A fix proposal is provided that addresses the root cause
- Prevention measures are suggested to avoid similar issues in the future
- The workflow completes with the debug report
- Exit criteria: Report complete with fix proposal

### Debugging Principles

1. **Root cause before fix**: Never propose a fix without confirming the root cause
2. **Evidence over speculation**: Every finding must be backed by evidence
3. **Backward tracing**: Start from the failure and work backward to the source
4. **Prevention focus**: Always suggest how to prevent similar issues
5. **Reproduce first**: Attempt to reproduce the error before analyzing

**Source**: `skills/debugging/SKILL.md` — Systematic debugging framework

---

## /wiki — Wiki Generation

The `/wiki` command generates project documentation through a three-phase workflow focused on extraction, organization, and generation.

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:381-417`

### Phase Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Extraction                                             │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Wiki Extractor Agent                                     │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse project structure                                     │
│ 1.2. Analyze code for entities                                  │
│ 1.3. Extract relationships                                      │
│ 1.4. Map API contracts                                          │
│ 1.5. Document findings                                          │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Project entities extracted                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Organization                                           │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Wiki Architect Agent                                      │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Design wiki structure                                       │
│ 2.2. Create folder hierarchy                                     │
│ 2.3. Define navigation                                          │
│ 2.4. Plan content per section                                   │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Wiki structure defined                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Generation                                             │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Wiki Team (Extractor + Architect)                         │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Generate index pages (00-index.md pattern)                │
│ 3.2. Generate content pages                                      │
│ 3.3. Ensure cross-references valid                             │
│ 3.4. Verify links and navigation                                │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Wiki pages generated                             │
└─────────────────────────────────────────────────────────────────┘
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:381-417`

### Phase Details

**Phase 1: Extraction**
- The project structure is parsed to understand directories, files, and organization
- Code is analyzed to identify entities: classes, functions, modules, components
- Relationships between entities are extracted: dependencies, imports, compositions
- API contracts are mapped including endpoints, parameters, and return types
- Findings are documented for use in wiki generation
- Exit criteria: All project entities identified with relationships documented

**Phase 2: Organization**
- The wiki structure is designed based on the extracted entities and relationships
- A folder hierarchy is created following the wiki conventions (summaries/, concepts/, entities/, etc.)
- Navigation is defined including index pages and cross-page links
- Content is planned for each section based on the entity types
- Exit criteria: Complete wiki structure with navigation defined

**Phase 3: Generation**
- Index pages are generated following the 00-index.md naming convention
- Content pages are generated for each entity and concept
- Cross-references are ensured to be valid ``[[wikilinks]]``
- Links and navigation are verified to work correctly
- Exit criteria: All wiki pages generated with valid links

### Wiki Structure Convention

```
.wiki/
├── 00-index.md           # Wiki root index
├── summaries/           # High-level overviews
│   ├── 00-index.md
│   ├── architecture-overview.md
│   └── directory-structure.md
├── concepts/            # Conceptual documentation
│   ├── 00-index.md
│   ├── golden-triangle.md
│   └── tiered-orchestration.md
├── entities/            # Entity documentation
│   ├── 00-index.md
│   ├── agent-system.md
│   └── command-system.md
├── runbooks/            # Operational runbooks
│   ├── 00-index.md
│   └── error-handling.md
└── decisions/           # Architecture decision records
    ├── 00-index.md
    └── architecture-decisions.md
```

**Source**: `documents/knowledge-architecture/01-system-overview.md` — Wiki conventions

---

## /deploy — Deployment

The `/deploy` command handles deployment operations through a three-phase workflow with variant-specific Phase 2 execution.

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:421-455`

### Phase Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Pre-deployment Check                                    │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Orchestrator                                             │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Verify build passes                                        │
│ 1.2. Run security scan                                          │
│ 1.3. Check dependencies                                        │
│ 1.4. Validate configuration                                      │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Pre-deployment checks pass                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Deployment (varies by variant)                         │
├─────────────────────────────────────────────────────────────────┤
│ Actor: DevOps Engineer or CI Pipeline                           │
├─────────────────────────────────────────────────────────────────┤
│ :check   → Verify deployment readiness                          │
│ :preview → Deploy to preview environment                        │
│ :production → Deploy to production                              │
│ :rollback → Revert deployment                                    │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Deployment variant complete                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Verification                                           │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Tester Agent + Monitoring                                 │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Verify deployment successful                               │
│ 3.2. Run smoke tests                                            │
│ 3.3. Monitor for errors                                         │
│ 3.4. Complete workflow                                          │
├─────────────────────────────────────────────────────────────────┤
│ EXIT CRITERIA: Deployment verified                              │
└─────────────────────────────────────────────────────────────────┘
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:421-455`

### Phase Details

**Phase 1: Pre-deployment Check**
- The build is verified to pass all compilation and linting checks
- A security scan is run to identify any vulnerabilities in the build
- Dependencies are checked to ensure all required packages are available
- Configuration is validated against the target environment
- Exit criteria: All pre-deployment checks pass

**Phase 2: Deployment (Variant-specific)**
- `:check` variant verifies deployment readiness without making changes
- `:preview` variant deploys to the preview/staging environment
- `:production` variant deploys to the production environment with full verification
- `:rollback` variant reverts to the previous deployment if issues are detected
- Exit criteria: Deployment variant-specific action completed

**Phase 3: Verification**
- The deployment is verified as successful through health checks
- Smoke tests are run to confirm basic functionality
- Monitoring is checked for any errors or anomalies
- The workflow completes with verified deployment
- Exit criteria: Deployment verified with no critical issues

### Variant Differences

| Variant | Action | Rollback Available |
|---------|--------|-------------------|
| `:check` | Verify readiness only | N/A |
| `:preview` | Deploy to staging | Yes |
| `:production` | Deploy to production | Yes |
| `:rollback` | Revert to previous | N/A |

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:421-455`

### Actor Assignment

| Phase | Primary Actor | Supporting Actor |
|-------|--------------|------------------|
| 1: Pre-deployment | Orchestrator | — |
| 2: Deployment | DevOps Engineer / CI Pipeline | — |
| 3: Verification | Tester Agent | Monitoring System |

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:421-455`

---

## Implicit Workflows

Beyond the explicit commands, three implicit workflows operate without direct user invocation:

### Workflow 1: Tiered Execution

```
User Request → Tier 1 (Sub-agent Available) → Execute via Sub-agent
                    ↓ (Fallback)
              Tier 2 (Sub-agent Unavailable) → Execute via Embodiment
```

**Source**: `rules/AGENTS.md` — Tiered Execution Model

### Workflow 2: Error Propagation

```
Error Detected → Agent Level (Retry if applicable)
                       ↓ (If unresolved)
                 Team Level (Coordinate resolution)
                       ↓ (If unresolved)
                 Command Level (Format for user)
                       ↓
                 User Level (Receive formatted error)
```

**Source**: `documents/knowledge-domain/04-business-rules.md:256-285`

### Workflow 3: Skill Resolution

```
Complex Task Detected → Analyze Required Skills
                              ↓
                        Check Skill Registry
                              ↓
                        Inject Relevant Skills
                              ↓
                        Execute with Enhanced Context
```

**Source**: `rules/CORE.md` — Skill Resolution Protocol

---

## Evidence Sources

All workflow definitions in this runbook are sourced from the following documents:

- `documents/business/business-workflows/03-detailed-workflows.md:1-465` — Primary source for all workflow phase flows
- `rules/CORE.md` — Command routing, execution loop, skill resolution
- `rules/PHASES.md` — Phase execution patterns, output formats
- `rules/TEAMS.md` — Golden Triangle communication, Mailbox protocol
- `commands/` — Command workflow implementations
- `documents/knowledge-standards/04-testing-standards.md:1-200` — Testing standards and coverage requirements
- `documents/knowledge-domain/04-business-rules.md:256-285` — Error propagation chain
- `skills/debugging/SKILL.md` — Systematic debugging framework

---

## Related Pages

- [[Workflow Catalog]] — Overview of all 14 commands plus 3 implicit workflows
- [[Actor Map]] — Actor definitions and responsibilities per workflow
- [[SLA and Handoffs]] — Service level agreements and handoff criteria
- [[Golden Triangle]] — Team structure for /cook:team variant
- [[Command System]] — Command routing and variant selection
- [[Tiered Orchestration]] — TIER 1 and TIER 2 execution model
