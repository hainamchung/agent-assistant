---
title: Workflow System
description: Complete reference for all 20 workflows, 16 actors, variant system, SLA framework, and handoff contracts
category: summary
tags: [workflows, actors, slas, handoffs, commands, execution]
related:
  - "[[Actor Map]]"
  - "[[Workflow Catalog]]"
  - "[[Detailed Workflows]]"
  - "[[SLA and Handoffs]]"
  - "[[Golden Triangle]]"
  - "[[Tiered Orchestration]]"
  - "[[Command System]]"
  - "[[Agent System]]"
  - "[[Feature Catalogue]]"
created: 2026-05-20
updated: 2026-05-20
---

# Workflow System

The Workflow System is the execution backbone of Agent Assistant, defining how work flows from user intent through a series of phases, actors, and quality gates to produce validated deliverables. The system encompasses 20 workflows organized into 4 categories, 16 actor types with defined responsibilities and boundaries, a variant system for scaling complexity, SLA guarantees for timing expectations, and 5 handoff contracts ensuring seamless transitions between system components.

---

## Overview

The Workflow System operates on a fundamental principle: every user request follows a structured path through phases, each with explicit entry and exit criteria. This structured approach ensures reproducibility, quality, and accountability throughout the execution lifecycle. The system distinguishes between single-agent workflows (fast, hard) and multi-agent team workflows (team) to match execution complexity to task complexity.

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:8-10`

The system is governed by the [[Tiered Orchestration]] architecture, which enforces strict phase ordering and prevents shortcuts that bypass quality gates. No workflow may skip phases, and no actor may perform actions outside their defined boundaries. This rigidity is intentional — it prevents the kind of ad-hoc execution that leads to quality failures in production systems.

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:4-5`

---

## Workflow Categories

The 20 workflows are organized into 4 categories based on their primary purpose: Build workflows for feature development, Quality workflows for validation, Planning workflows for strategy and research, and Support workflows for infrastructure and team coordination.

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:8-10`

### Category 1: Build Workflows (W1–W5)

Build workflows create new functionality from requirements. They range from simple code generation to full-stack feature development with adversarial review.

#### W1: /cook — Feature Development

The primary feature development workflow. Invoked with `/cook`, `/cook:fast`, `/cook:hard`, or `/cook:team` depending on complexity requirements.

| Attribute | Value |
|-----------|-------|
| **ID** | W1 |
| **Category** | Build |
| **Trigger** | User invokes `/cook` with feature requirements |
| **Outcome** | Production-ready feature implementation |
| **Variants** | :fast (1 agent), :hard (1 agent, 6 phases), :team (3 agents, adversarial) |

The `/cook` workflow is the most complex in the system, capable of producing fully-tested, reviewed code across multiple domains. The :team variant uses the [[Golden Triangle]] pattern for adversarial quality assurance.

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:16-33`

#### W2: /code — Code Generation

Lightweight code generation for snippets and small implementations.

| Attribute | Value |
|-----------|-------|
| **ID** | W2 |
| **Category** | Build |
| **Trigger** | User invokes `/code` |
| **Outcome** | Generated code snippets or files |
| **Complexity** | Low-Medium |
| **Phases** | 2 |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:37-47`

#### W3: /fix — Bug Fix

Systematic bug investigation and resolution with root cause analysis.

| Attribute | Value |
|-----------|-------|
| **ID** | W3 |
| **Category** | Build |
| **Trigger** | User invokes `/fix` with error description |
| **Outcome** | Fixed code with root cause addressed |
| **Complexity** | Medium |
| **Phases** | 3 (investigate, fix, verify) |

The /fix workflow follows the debugging framework: investigate root cause, implement fix, verify solution. The debugger agent traces backward through the call stack to identify the actual cause, not just the symptom.

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:51-61`

#### W4: /design — Design Specification

UI/UX and technical design creation from concept requirements.

| Attribute | Value |
|-----------|-------|
| **ID** | W4 |
| **Category** | Build |
| **Trigger** | User invokes `/design` |
| **Outcome** | Design specification document |
| **Complexity** | Medium |
| **Phases** | 2 (research, design) |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:65-75`

#### W5: /brainstorm — Solution Exploration

Generate multiple solution alternatives with trade-off analysis.

| Attribute | Value |
|-----------|-------|
| **ID** | W5 |
| **Category** | Build |
| **Trigger** | User invokes `/brainstorm` |
| **Outcome** | Multiple alternatives with trade-offs |
| **Complexity** | Low-Medium |
| **Phases** | 2 (explore, document) |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:79-89`

### Category 2: Quality Workflows (W6–W9)

Quality workflows validate deliverables and ensure they meet standards before release.

#### W6: /test — Test Generation

Create comprehensive test suites with coverage targets.

| Attribute | Value |
|-----------|-------|
| **ID** | W6 |
| **Category** | Quality |
| **Trigger** | User invokes `/test` or `/test:hard` |
| **Outcome** | Test suite with unit, integration, or E2E tests |
| **Variants** | :fast (60% coverage), :hard (80% coverage) |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:95-105`

#### W7: /review — Code Review

Structured code review against quality and security standards.

| Attribute | Value |
|-----------|-------|
| **ID** | W7 |
| **Category** | Quality |
| **Trigger** | User invokes `/review` |
| **Outcome** | Review report with findings and recommendations |
| **Complexity** | Medium |
| **Phases** | 2 (review, report) |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:109-119`

#### W8: /debug — Debugging

Systematic root cause investigation for errors and failures.

| Attribute | Value |
|-----------|-------|
| **ID** | W8 |
| **Category** | Quality |
| **Trigger** | User invokes `/debug` |
| **Outcome** | Root cause analysis and fix proposal |
| **Complexity** | Medium-High |
| **Phases** | 3 (investigate, analyze, report) |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:123-133`

#### W9: Security Review

Automated or manual security vulnerability assessment.

| Attribute | Value |
|-----------|-------|
| **ID** | W9 |
| **Category** | Quality |
| **Trigger** | Automated or manual invocation |
| **Outcome** | Security audit report with findings |
| **Complexity** | High |
| **Phases** | 3 (scan, analyze, report) |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:137-147`

### Category 3: Planning Workflows (W10–W13)

Planning workflows prepare for execution by gathering context, creating roadmaps, and organizing requirements.

#### W10: /plan — Implementation Planning

Create detailed implementation plans with milestones and estimates.

| Attribute | Value |
|-----------|-------|
| **ID** | W10 |
| **Category** | Planning |
| **Trigger** | User invokes `/plan` |
| **Outcome** | Implementation plan with milestones and estimates |
| **Complexity** | Medium |
| **Phases** | 3 (scout, plan, review) |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:153-163`

#### W11: /ask — Question Answering

Direct question answering or research-based responses.

| Attribute | Value |
|-----------|-------|
| **ID** | W11 |
| **Category** | Planning |
| **Trigger** | User invokes `/ask` |
| **Outcome** | Direct answer or research report |
| **Complexity** | Low |
| **Phases** | 1-2 |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:167-177`

#### W12: /report — Reporting

Generate status reports and project summaries.

| Attribute | Value |
|-----------|-------|
| **ID** | W12 |
| **Category** | Planning |
| **Trigger** | User invokes `/report:fast`, `/report:hard`, or `/report:team` |
| **Outcome** | Status report or project summary |
| **Variants** | :fast (1 agent), :hard (1 agent), :team (3 agents) |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:181-191`

#### W13: /docs — Documentation

Create and maintain project documentation.

| Attribute | Value |
|-----------|-------|
| **ID** | W13 |
| **Category** | Planning |
| **Trigger** | User invokes `/docs` |
| **Outcome** | Project documentation |
| **Complexity** | Medium |
| **Phases** | 2-3 |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:195-205`

### Category 4: Support Workflows (W14–W20)

Support workflows handle deployment, team coordination, and system maintenance.

#### W14: /deploy — Deployment

Deployment execution and verification across environments.

| Attribute | Value |
|-----------|-------|
| **ID** | W14 |
| **Category** | Support |
| **Trigger** | User invokes `/deploy:check`, `/deploy:preview`, `/deploy:production` |
| **Outcome** | Deployment verification, preview, or execution |
| **Complexity** | Medium-High |
| **Phases** | 3-4 |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:211-221`

#### W15: /wiki — Wiki Generation

Generate project wikis from source code and documentation.

| Attribute | Value |
|-----------|-------|
| **ID** | W15 |
| **Category** | Support |
| **Trigger** | User invokes `/wiki`, `/wiki:fast`, `/wiki:hard`, or `/wiki:team` |
| **Outcome** | Project wiki with documentation |
| **Variants** | :fast (1 agent), :hard (1 agent), :team (3 agents) |
| **Phases** | 3-5 |

The wiki workflow extracts entities, relationships, and API contracts from source code, organizing them into a navigable wiki structure with cross-references.

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:225-235`

#### W16–W20: Automated Workflows

| ID | Workflow | Trigger | Outcome |
|----|----------|---------|---------|
| W16 | CLI Installation | User runs `agent-assistant install` | Configured Agent Assistant |
| W17 | CLI Uninstallation | User runs `agent-assistant uninstall` | Removed configuration |
| W18 | Skill Discovery | Matrix fitness < 0.75 | Relevant skills identified |
| W19 | Phase Transition | Previous phase completes | Next phase begins |
| W20 | Team Consensus | Team debate completes | Agreed output with consensus stamp |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:239-305`

---

## Actor System

The Actor System defines 16 entity types that interact within the workflow system. Each actor has specific responsibilities, boundaries, communication patterns, and touchpoints. Actors are categorized into 5 types: Primary, System, Meta, Execution, Validation, Research, and Support.

**Source**: `documents/business/business-workflows/01-actor-map.md:8-10`

### Actor Summary Table

| ID | Actor | Type | Primary Responsibility |
|----|-------|------|----------------------|
| A1 | End User | Primary | Issue commands, review outputs |
| A2 | Orchestrator | System | Route commands, delegate to agents |
| A3 | Tech Lead | Meta | Decompose tasks, coordinate teams |
| A4 | Planner | Meta | Create implementation plans |
| A5 | Backend Engineer | Execution | Server-side development |
| A6 | Frontend Engineer | Execution | UI implementation |
| A7 | Mobile Engineer | Execution | Mobile development |
| A8 | Game Engineer | Execution | Game development |
| A9 | Tester | Validation | Test generation |
| A10 | Reviewer | Validation | Code review |
| A11 | Debugger | Validation | Root cause analysis |
| A12 | Security Engineer | Validation | Security audits |
| A13 | Researcher | Research | Investigation and synthesis |
| A14 | Scouter | Research | Codebase exploration |
| A15 | Designer | Research | UI/UX design |
| A16 | Docs Manager | Support | Technical writing |

**Source**: `documents/business/business-workflows/01-actor-map.md:14-210`

### Actor Communication Matrix

| Actor | Initiates With | Receives From | Via |
|-------|---------------|---------------|-----|
| A1: End User | A2: Orchestrator | A2: Orchestrator | User Interface |
| A2: Orchestrator | A3-A16 | A1, A3-A16 | Commands, Handoffs |
| A3: Tech Lead | A5-A15 | A2, A5-A15 | Mailbox, Task List |
| A4: Planner | A5-A8 | A2, A13-A15 | PLAN deliverables |
| A5-A8: Engineers | A3, A10 | A3, A10, A2 | Mailbox, CODE |
| A9-A12: Validators | A3 | A2, A5-A8 | REVIEW, TEST, DEBUG |
| A13-A15: Researchers | A4 | A2, A4 | RESEARCH, SCOUT, DESIGN |
| A16: Docs Manager | A2 | A2, A5-A8 | DOC deliverables |

**Source**: `documents/business/business-workflows/01-actor-map.md:214-225`

### Actor Boundaries Enforcement

| Boundary | Enforcement Rule |
|----------|------------------|
| Meta agents delegate | L7: Meta agents coordinate, NEVER implement |
| Validators report only | Cannot write code; only review/fix suggestions |
| Engineers implement only | Cannot change requirements; must follow specs |
| Orchestrator delegates | L1: Single Point of Truth; Orchestrator routes only |

**Source**: `documents/business/business-workflows/01-actor-map.md:229-236`

---

## Variant System

Commands support three variants that scale complexity, agent count, and review depth based on task requirements. The variant system ensures resources are proportional to task complexity while maintaining consistent quality gates.

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:28-33`

### Variant Comparison Table

| Aspect | :fast | :hard | :team |
|--------|-------|-------|-------|
| **Agent Count** | 1 | 1 | 3 (Golden Triangle) |
| **Review Depth** | Minimal | Standard | Adversarial |
| **Phase Count** | 3-4 | 5-6 | 4 + consensus |
| **Quality Gates** | Basic | Full | Adversarial + arbitration |
| **Typical Duration** | 30s-2min | 5-15min | 15-45min |
| **Use Case** | Simple features | Complex features | Critical features |
| **Skill Injection** | Minimal | Standard | Enhanced context |

### Variant Selection Guidelines

- **:fast** — Single domain, well-understood requirements, minimal review needed
- **:hard** — Multiple domains, complex dependencies, full review required
- **:team** — Critical deliverables, high stakes, adversarial quality assurance required

---

## /cook Workflow Variants in Detail

The /cook command demonstrates the variant system most clearly, with dramatically different execution patterns across variants.

### /cook:fast Flow (3 Phases)

```
Phase 1: Requirements Intake
  → Parse user request, extract scope, create Requirements Registry
  → EXIT: Requirements locked

Phase 2: Implementation  
  → Select agent, analyze skills, delegate, implement, verify
  → EXIT: Code written, matches requirements

Phase 3: Delivery
  → Format output, include path, verify compliance, complete
  → EXIT: Deliverable ready
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:10-47`

### /cook:hard Flow (6 Phases)

```
Phase 1: Enhanced Requirements Intake
  → Parse ALL requirements (L2: 100% fidelity), resolve ambiguities
  → EXIT: All requirements parsed, ambiguities resolved

Phase 2: Planning
  → Delegate to planner, scout codebase, create plan with milestones
  → EXIT: Plan approved, milestones defined

Phase 3: Implementation
  → Execute milestones in order with verification per milestone
  → EXIT: All milestones complete

Phase 4: Review
  → Delegate to reviewer, check correctness/security/performance
  → EXIT: Review PASS or issues resolved

Phase 5: Testing
  → Generate tests, ensure coverage, run tests
  → EXIT: Tests passing, coverage adequate

Phase 6: Delivery
  → Verify all requirements met, complete workflow
  → EXIT: All criteria verified
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:50-129`

### /cook:team Flow (4 Phases with Golden Triangle)

```
Phase 1: Requirements Intake + Team Setup
  → Parse requirements, select team config, initialize Mailbox
  → Spawn Golden Triangle: Tech Lead + Executor + Reviewer
  → EXIT: Requirements locked, team spawned

Phase 2: Tech Lead Decomposition
  → Decompose into tasks, publish Shared Task List
  → Post TASK_ASSIGNMENT to Mailbox
  → EXIT: Task list published

Phase 3: Executor + Reviewer Cycle (up to 3 rounds per task)
  → Executor implements → posts SUBMISSION
  → Reviewer posts REVIEW (PASS/FAIL)
  → If FAIL: Executor fixes or defends with evidence
  → If Round 3 without agreement: Tech Lead arbitrates
  → EXIT: All tasks PASS or arbitrated

Phase 4: Consensus + Delivery
  → Tech Lead synthesizes output
  → Posts DECISION with consensus stamp
  → EXIT: Consensus stamp present
```

**Source**: `documents/business/business-workflows/03-detailed-workflows.md:132-186`

---

## SLA Framework

The SLA Framework defines timing expectations and quality criteria for every workflow. SLAs ensure predictable performance and provide measurable targets for system optimization.

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:8-18`

### SLA Metrics Definitions

| Metric | Definition |
|--------|------------|
| **Response Time** | Time from user input to first output |
| **Completion Time** | Time from user input to workflow complete |
| **Success Rate** | Workflows completing without error |
| **Quality Score** | Exit criteria compliance rate |

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:10-18`

### Key Workflow SLAs

#### /cook SLA Targets

| Variant | Response Target | Completion Target | Completion Max | Success Target |
|---------|-----------------|-------------------|----------------|----------------|
| :fast | 5s | 30s | 2min | 99% |
| :hard | 15s | 5min | 15min | 98% |
| :team | 30s | 15min | 45min | 95% |

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:25-31`

#### /fix SLA Targets

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 10s | 30s |
| Root Cause Identification | 2min | 5min |
| Fix Implementation | 5min | 15min |
| Verification | 1min | 3min |
| **Total Completion** | 8min | 23min |

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:41-49`

#### /test SLA Targets

| Variant | Response | Completion Target | Completion Max |
|---------|----------|-------------------|----------------|
| :fast | 10s | 5min | 10min |
| :hard | 15s | 15min | 30min |

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:95-100`

### Phase Timing Reference

| Phase | Typical Duration | Maximum Duration |
|-------|------------------|-------------------|
| Requirements Intake | 1-5 min | 10 min |
| Planning | 5-15 min | 30 min |
| Implementation | 5-30 min | 60 min |
| Review | 5-15 min | 30 min |
| Testing | 5-20 min | 40 min |
| Delivery | 1-5 min | 10 min |

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:337-346`

---

## Handoff Contracts

Handoff contracts define the precise inputs, outputs, timing, and failure modes for each transition point in the workflow system. These contracts ensure that information is preserved across boundaries and that failures are handled consistently.

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:214-216`

### H1: Orchestrator → Agent

**Trigger**: Agent delegation

**Contract Inputs**:
- requirements: Original user requirements (verbatim)
- task: Specific task for this agent
- constraints: Prior decisions locked as constraints
- deliverable_format: Single file or chunked

**Contract Outputs**:
- deliverable: Agent's output
- status: Complete, partial, blocked
- evidence: Trace to requirements

**Timing**: Start immediate, timeout per workflow SLA

**Failure Mode**: One retry with same context, then escalate to Orchestrator

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:216-240`

### H2: Agent → Reviewer

**Trigger**: Agent submission complete

**Contract Inputs**:
- submission: Agent's deliverable
- criteria: Review checklist
- evidence: Trace to requirements

**Contract Outputs**:
- verdict: PASS or FAIL
- findings: List of issues if FAIL
- severity: HIGH, MEDIUM, LOW

**Timing**: 30 seconds to 5 minutes

**Failure Mode**: Tech Lead rejects rubber-stamp reviews

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:242-264`

### H3: Executor → Reviewer (Team)

**Trigger**: SUBMISSION posted to Mailbox

**Contract Inputs**:
- submission: What was built
- files_changed: List of files
- approach: Implementation approach

**Contract Outputs**:
- verdict: PASS or FAIL
- findings: Specific issues if FAIL
- evidence_required: For defenses

**Timing**: Round 1, 2, or 3

**Failure Mode**: Executor posts DEFENSE with evidence; Round 3 without agreement escalates to Tech Lead

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:266-289`

### H4: Reviewer → Tech Lead (Team)

**Trigger**: Reviewer escalates or round limit reached

**Contract Inputs**:
- mail_summary: Summary of debate
- evidence: Both sides' positions
- round_count: Current round

**Contract Outputs**:
- decision: Binding resolution
- reasoning: Decision rationale
- stamp: ✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:291-310`

### H5: Phase → Phase

**Trigger**: Phase N exit criteria verified

**Contract Inputs**:
- prior_deliverable: Phase N output
- requirements_registry: Updated with progress
- locked_constraints: Immutable prior decisions

**Contract Outputs**:
- next_deliverable: Phase N+1 output

**Timing**: Zero gap — immediate transition

**Failure Mode**: Phase N does not complete if criteria not met

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:312-331`

---

## Escalation Paths

The system defines 4 escalation paths for handling failures at different levels.

**Source**: `documents/business/business-workflows/05-sla-and-handoffs.md:359-397`

### E1: Execution Escalation

```
Level 1: Agent tries again
Level 2: Different agent of same type
Level 3: Orchestrator takes over
Level 4: User intervention
```

### E2: Quality Escalation

```
Level 1: Reviewer requests fix
Level 2: Executor defends with evidence
Level 3: Tech Lead arbitration (team)
Level 4: User decision (non-team)
```

### E3: Phase Escalation

```
Level 1: Retry phase with same agent
Level 2: Retry with different agent
Level 3: Create minimal viable output
Level 4: Abort workflow, report issue
```

### E4: Team Escalation

```
Round 1: Review PASS → proceed
Round 1: Review FAIL → Round 2
Round 2: Review PASS → proceed
Round 2: Review FAIL → Round 3
Round 3: Review PASS → proceed
Round 3: Review FAIL → Tech Lead arbitration (binding)
```

---

## Complete Workflow Summary

| ID | Workflow | Category | Complexity | Agents | Trigger |
|----|----------|----------|------------|--------|---------|
| W1 | /cook | Build | Varies | 1-3 | Command |
| W2 | /code | Build | Low-Med | 1 | Command |
| W3 | /fix | Build | Med | 1-2 | Command |
| W4 | /design | Build | Med | 1 | Command |
| W5 | /brainstorm | Build | Low-Med | 1 | Command |
| W6 | /test | Quality | Med | 1-2 | Command |
| W7 | /review | Quality | Med | 1 | Command |
| W8 | /debug | Quality | Med-Hi | 1-2 | Command |
| W9 | Security Review | Quality | High | 1-2 | Auto/Manual |
| W10 | /plan | Planning | Med | 1 | Command |
| W11 | /ask | Planning | Low | 1 | Command |
| W12 | /report | Planning | Varies | 1-3 | Command |
| W13 | /docs | Planning | Med | 1 | Command |
| W14 | /deploy | Support | Med-Hi | 1-2 | Command |
| W15 | /wiki | Support | Varies | 1-3 | Command |
| W16 | CLI Install | Support | Low | 0 | CLI |
| W17 | CLI Uninstall | Support | Low | 0 | CLI |
| W18 | Skill Discovery | Support | Med | 0 | Auto |
| W19 | Phase Transition | Support | Low | 1 | Auto |
| W20 | Team Consensus | Support | Med | 3 | Auto |

**Source**: `documents/business/business-workflows/02-workflow-catalog.md:309-332`

---

## Related Pages

- [[Actor Map]] — Full actor definitions with responsibilities and boundaries
- [[Workflow Catalog]] — Complete workflow catalogue with triggers and outcomes
- [[Detailed Workflows]] — Step-by-step flows for all commands
- [[SLA and Handoffs]] — SLA definitions and handoff contract details
- [[Golden Triangle]] — Adversarial team coordination pattern
- [[Tiered Orchestration]] — Phase ordering and quality gate enforcement
- [[Command System]] — All 14 commands with variant specifications
- [[Agent System]] — All 21 specialist agents
- [[Feature Catalogue]] — Feature inventory and prioritization
