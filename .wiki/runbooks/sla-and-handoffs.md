---
title: SLA and Handoffs
description: Service Level Agreements for all 20 workflows, handoff contracts (H1-H5), timing expectations, escalation paths (E1-E4), and breach handling procedures
category: runbook
tags: [sla, handoffs, escalation, timing, contracts, quality-gates, performance]
related:
  - "[[Workflow System]]"
  - "[[Workflow Catalog]]"
  - "[[Detailed Workflows]]"
  - "[[Golden Triangle]]"
  - "[[Command System]]"
  - "[[Actor Map]]"
created: 2026-05-20
updated: 2026-05-20
---

# SLA and Handoffs

This runbook defines the Service Level Agreement (SLA) framework for all workflows in Agent Assistant, the handoff contracts governing transitions between system components, timing expectations for phase and agent execution, and the escalation paths for handling failures at every level. These definitions ensure predictable performance, consistent quality, and clear accountability across the entire system.

The SLA framework applies uniformly across all 20 workflows, from lightweight single-agent operations like `/ask` to complex multi-agent team workflows like `/cook:team`. Every workflow has defined response targets, completion maximums, and quality criteria that must be satisfied before a workflow is considered complete.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:1-6`

---

## Overview

The SLA and Handoffs framework establishes the contract between the system and its users across three dimensions: timing guarantees, quality thresholds, and handoff protocols. Timing guarantees define how quickly the system must respond and complete work. Quality thresholds define what standards the output must meet. Handoff protocols define how work transitions between actors and phases without loss of context or fidelity.

These definitions are not aspirational targets — they are enforced operational standards. Workflows that fail to meet SLA targets trigger escalation procedures defined in the Escalation Paths section. Handoffs that violate contract specifications prevent phase progression until the contract is satisfied. This rigidity ensures that users can rely on consistent system behavior regardless of workload complexity.

The framework distinguishes between three execution modes: single-agent fast, single-agent hard, and multi-agent team. Each mode has proportionally scaled SLAs that reflect the increased coordination overhead and review depth required for more complex execution. Fast variants prioritize speed, hard variants prioritize thoroughness, and team variants prioritize adversarial quality assurance through the [[Golden Triangle]] pattern.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:1-18`

---

## SLA Framework

The SLA Framework defines four core metrics that apply universally across all workflows. These metrics provide the measurement foundation for operational compliance and performance optimization.

### Core Metrics Definitions

| Metric | Definition | Measurement Point |
|--------|------------|-------------------|
| **Response Time** | Time from user input to first output | User interface to first token |
| **Completion Time** | Time from user input to workflow complete | User interface to final deliverable |
| **Success Rate** | Workflows completing without error | Percentage of total executions |
| **Quality Score** | Exit criteria compliance rate | Percentage of criteria satisfied |

**Response Time** measures the system's responsiveness — how quickly users receive initial feedback that their request is being processed. This metric is critical for user experience, as delays in first output create perception of system unresponsiveness even if the final result is delivered on time.

**Completion Time** measures the total elapsed time from request initiation to final deliverable. This metric encompasses all phases, reviews, and handoffs within a workflow. The Completion Time SLA includes both a Target (expected performance) and a Maximum (hard ceiling that should rarely be exceeded).

**Success Rate** measures the percentage of workflow executions that complete without errors. This includes both technical errors (system failures) and quality errors (output rejected by review). Success Rate SLAs vary by variant, with fast variants targeting 99% and team variants targeting 95% due to the increased complexity of multi-agent coordination.

**Quality Score** measures the percentage of exit criteria satisfied for a given workflow execution. Unlike Success Rate (binary complete/failed), Quality Score captures the degree of compliance with quality standards. A workflow that completes on time but fails three of ten exit criteria has a 70% Quality Score.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:10-18`

---

## Workflow SLAs

This section provides complete SLA definitions for all 11 primary workflows across the four workflow categories. Each workflow specifies response targets, completion targets and maximums, and quality criteria that must be satisfied for successful completion.

### Build Workflows

Build workflows create new functionality from requirements. They range from simple code generation to full-stack feature development with comprehensive review. Build workflows account for the highest SLA complexity due to their dependency chains and multi-phase execution.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:21-91`

---

#### /cook SLA

The `/cook` workflow is the primary feature development workflow in Agent Assistant. It supports three variants that scale complexity, agent count, and review depth based on task requirements.

| Variant | Response Target | Completion Target | Completion Maximum | Success Target |
|---------|-----------------|-------------------|--------------------| ---------------|
| `:fast` | 5 seconds | 30 seconds | 2 minutes | 99% |
| `:hard` | 15 seconds | 5 minutes | 15 minutes | 98% |
| `:team` | 30 seconds | 15 minutes | 45 minutes | 95% |

**Quality Criteria** — All four criteria must be satisfied for the workflow to complete:

1. **All requirements parsed** — Every requirement from the user's request must be captured in the Requirements Registry with no omissions or misinterpretations.

2. **All phases complete** — Every phase in the workflow variant must execute to completion, including any skipped optional phases (which must be explicitly acknowledged as skipped).

3. **Exit criteria verified** — The output must satisfy all defined exit criteria for the workflow variant, verified through explicit checks rather than assumed compliance.

4. **Review PASS (team) or adequate review (fast/hard)** — Team variants require an explicit PASS verdict from the reviewer agent. Fast and hard variants require adequate review documentation but may use self-verification for straightforward cases.

The :fast variant targets single-domain features with well-understood requirements, executing a minimal 3-phase flow. The :hard variant targets complex features requiring full 6-phase execution with comprehensive review. The :team variant targets critical deliverables requiring adversarial quality assurance through the [[Golden Triangle]] pattern.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:25-37`

---

#### /fix SLA

The `/fix` workflow performs systematic bug investigation and resolution. It follows a three-phase approach: investigate root cause, implement fix, verify solution.

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 10 seconds | 30 seconds |
| Root Cause Identification | 2 minutes | 5 minutes |
| Fix Implementation | 5 minutes | 15 minutes |
| Verification | 1 minute | 3 minutes |
| **Total Completion** | **8 minutes** | **23 minutes** |

**Quality Criteria** — All four criteria must be satisfied:

1. **Root cause identified (not symptom)** — The workflow must identify the actual root cause of the bug, not merely the symptom. A root cause identification that addresses only the symptom fails this criterion.

2. **Fix addresses cause** — The implemented fix must address the identified root cause directly. Workarounds that mask the symptom without fixing the underlying cause fail this criterion.

3. **Existing tests pass** — All pre-existing tests in the codebase must continue to pass after the fix is applied. A fix that breaks existing functionality fails this criterion.

4. **No regressions introduced** — The fix must not introduce new bugs or degrade existing functionality. This is verified through regression testing and code analysis.

The `/fix` workflow is distinguished from `/debug` by its emphasis on implementation and verification. Where `/debug` produces analysis reports, `/fix` produces working solutions.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:41-56`

---

#### /design SLA

The `/design` workflow creates UI/UX and technical design specifications from concept requirements.

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 10 seconds | 30 seconds |
| Design Research | 5 minutes | 10 minutes |
| Specification | 10 minutes | 20 minutes |
| Review | 5 minutes | 10 minutes |
| **Total Completion** | **20 minutes** | **40 minutes** |

**Quality Criteria** — All four criteria must be satisfied:

1. **Design addresses all requirements** — Every requirement from the user's request must be addressed in the design specification, either directly or through explicit trade-off documentation.

2. **Accessibility considered** — The design must explicitly address accessibility requirements, including WCAG compliance targets, keyboard navigation, screen reader support, and color contrast requirements.

3. **Technical feasibility verified** — The design must be verified as technically feasible within the constraints of the target technology stack and infrastructure.

4. **Examples provided** — The design specification must include concrete examples for all non-trivial UI components, data structures, and API contracts.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:59-74`

---

#### /brainstorm SLA

The `/brainstorm` workflow generates multiple solution alternatives with trade-off analysis and recommendations.

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 5 seconds | 15 seconds |
| Exploration | 5 minutes | 10 minutes |
| Documentation | 3 minutes | 5 minutes |
| **Total Completion** | **8 minutes** | **15 minutes** |

**Quality Criteria** — All three criteria must be satisfied:

1. **2+ alternatives generated** — The workflow must produce at least two distinct solution approaches, not merely variations of a single approach.

2. **Trade-offs documented** — Each alternative must include explicit documentation of trade-offs, including complexity, performance, maintainability, and scalability implications.

3. **Recommendation with rationale** — The workflow must include a clear recommendation among the alternatives, supported by documented rationale that justifies the recommendation over other options.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:77-90`

---

### Quality Workflows

Quality workflows validate deliverables and ensure they meet standards before release. These workflows operate on outputs from other workflows and must maintain independence and objectivity in their assessments.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:93-142`

---

#### /test SLA

The `/test` workflow creates comprehensive test suites with defined coverage targets.

| Variant | Response Target | Completion Target | Completion Maximum |
|---------|-----------------|-------------------|--------------------|
| `:fast` | 10 seconds | 5 minutes | 10 minutes |
| `:hard` | 15 seconds | 15 minutes | 30 minutes |

**Quality Criteria** — All four criteria must be satisfied:

1. **Coverage >= 80% (hard) or 60% (fast)** — Test coverage must meet the variant-specific threshold. Hard variants require 80% code coverage, while fast variants require 60% coverage.

2. **Edge cases included** — The test suite must include coverage for edge cases, boundary conditions, error paths, and corner scenarios, not merely happy-path tests.

3. **Tests executable** — All generated tests must be executable in the target environment without modification. Tests that require manual setup or configuration fail this criterion.

4. **Tests deterministic** — All generated tests must produce consistent, deterministic results. Tests that can pass or fail non-deterministically fail this criterion.

The `/test` workflow may be invoked independently or as part of a larger workflow (such as `/cook:hard`). When invoked as part of another workflow, its SLA is subordinated to the parent workflow's timing.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:95-107`

---

#### /review SLA

The `/review` workflow performs structured code review against quality and security standards.

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 10 seconds | 30 seconds |
| Review | 10 minutes | 20 minutes |
| Report | 2 minutes | 5 minutes |
| **Total Completion** | **12 minutes** | **25 minutes** |

**Quality Criteria** — All four criteria must be satisfied:

1. **Correctness reviewed** — The review must explicitly assess code correctness, including logic errors, edge case handling, and data consistency.

2. **Security reviewed** — The review must explicitly assess security considerations, including input validation, authentication, authorization, and data protection.

3. **Performance reviewed** — The review must explicitly assess performance characteristics, including algorithmic efficiency, resource usage, and scalability implications.

4. **Standards compliance checked** — The review must explicitly verify compliance with applicable coding standards, style guides, and architectural conventions.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:110-124`

---

#### /debug SLA

The `/debug` workflow performs systematic root cause investigation for errors and failures.

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 10 seconds | 30 seconds |
| Investigation | 5 minutes | 10 minutes |
| Analysis | 5 minutes | 10 minutes |
| Report | 2 minutes | 5 minutes |
| **Total Completion** | **12 minutes** | **25 minutes** |

**Quality Criteria** — All four criteria must be satisfied:

1. **Root cause identified** — The investigation must identify the actual root cause, not merely symptoms or contributing factors.

2. **Evidence provided** — All findings must be supported by evidence, including logs, stack traces, code references, and reproduction steps.

3. **Fix proposal included** — The report must include a concrete fix proposal, not merely analysis of the problem.

4. **Prevention suggestions** — The report must include suggestions for preventing similar issues in the future, addressing both immediate fixes and long-term prevention.

The `/debug` workflow is distinguished from `/fix` by its emphasis on investigation and analysis. `/debug` produces diagnostic reports; `/fix` produces working solutions.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:127-142`

---

### Planning Workflows

Planning workflows prepare for execution by gathering context, creating roadmaps, and organizing requirements. These workflows establish the foundation for subsequent execution workflows.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:145-177`

---

#### /plan SLA

The `/plan` workflow creates detailed implementation plans with milestones and estimates.

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 10 seconds | 30 seconds |
| Scouting | 10 minutes | 20 minutes |
| Planning | 15 minutes | 30 minutes |
| Review | 5 minutes | 10 minutes |
| **Total Completion** | **30 minutes** | **60 minutes** |

**Quality Criteria** — All four criteria must be satisfied:

1. **All requirements addressed** — The plan must address every requirement from the user's request, with explicit acknowledgment of any requirements that cannot be addressed.

2. **Milestones defined** — The plan must include clearly defined milestones with specific deliverables and completion criteria.

3. **Dependencies identified** — The plan must identify all dependencies between tasks, including external dependencies, internal dependencies, and sequencing constraints.

4. **Estimates provided** — The plan must include time estimates for each task and milestone, with appropriate confidence levels and assumption documentation.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:147-162`

---

#### /ask SLA

The `/ask` workflow provides direct question answering or research-based responses.

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 3 seconds | 10 seconds |
| Answer/Research | 5 minutes | 10 minutes |
| **Total Completion** | **5 minutes** | **10 minutes** |

**Quality Criteria** — All three criteria must be satisfied:

1. **Question answered or researched** — The workflow must provide a direct answer to the question or a comprehensive research synthesis if the question requires investigation.

2. **Sources cited** — All factual claims must be supported by citations to authoritative sources.

3. **Examples provided** — The answer must include concrete examples where appropriate to illustrate concepts or demonstrate solutions.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:165-177`

---

### Support Workflows

Support workflows handle deployment, team coordination, and system maintenance. These workflows operate on completed deliverables and infrastructure.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:180-211`

---

#### /deploy SLA

The `/deploy` workflow executes deployment and verification across environments. It supports three specialized variants for different deployment scenarios.

| Variant | Response Target | Completion Target | Completion Maximum |
|---------|-----------------|-------------------|--------------------|
| `:check` | 5 seconds | 30 seconds | 1 minute |
| `:preview` | 10 seconds | 5 minutes | 15 minutes |
| `:production` | 15 seconds | 15 minutes | 30 minutes |

**Quality Criteria** — All four criteria must be satisfied:

1. **Pre-deployment checks pass** — All pre-deployment validation checks must pass, including dependency verification, configuration validation, and environment readiness.

2. **Deployment successful** — The deployment operation must complete without errors, with all resources correctly provisioned and configured.

3. **Smoke tests passing** — Post-deployment smoke tests must pass, verifying basic functionality without exhaustive testing.

4. **Monitoring active** — Post-deployment monitoring must be active and configured to alert on failures.

The `:check` variant performs pre-deployment validation without executing deployment. The `:preview` variant deploys to a preview environment for review. The `:production` variant executes full production deployment.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:182-195`

---

#### /wiki SLA

The `/wiki` workflow generates project wikis from source code and documentation.

| Variant | Response Target | Completion Target | Completion Maximum |
|---------|-----------------|-------------------|--------------------|
| `:fast` | 10 seconds | 10 minutes | 20 minutes |
| `:hard` | 15 seconds | 30 minutes | 60 minutes |
| `:team` | 30 seconds | 45 minutes | 90 minutes |

**Quality Criteria** — All four criteria must be satisfied:

1. **Entities extracted** — All significant entities (concepts, components, processes) must be identified and documented.

2. **Relationships mapped** — Relationships between entities must be identified and documented with appropriate navigation links.

3. **Navigation functional** — The wiki structure must support effective navigation, including breadcrumb trails, cross-references, and search functionality.

4. **Cross-references valid** — All cross-references between wiki pages must be valid links that resolve correctly.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:198-211`

---

## Handoff Contracts

Handoff contracts define the precise inputs, outputs, timing, and failure modes for each transition point in the workflow system. These contracts ensure that information is preserved across boundaries and that failures are handled consistently. Violation of any handoff contract prevents workflow progression until the contract is satisfied.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:214-216`

---

### H1: Orchestrator → Agent

The H1 contract governs the handoff from the Orchestrator to a delegated agent. This is the primary execution handoff in single-agent workflows.

```yaml
Handoff: H1 - Orchestrator to Agent
Trigger: Agent delegation
Contract:
  inputs:
    - requirements: "Original user requirements (verbatim)"
    - task: "Specific task for this agent"
    - constraints: "Prior decisions locked as constraints"
    - deliverable_format: "Single file or chunked"
  
  outputs:
    - deliverable: "Agent's output"
    - status: "Complete, partial, blocked"
    - evidence: "Trace to requirements"
  
  timing:
    - start: "Immediate upon handoff"
    - timeout: "Per workflow SLA (see Workflow SLAs section)"
  
  failure:
    - retry: "One retry with same context"
    - escalate: "Report to Orchestrator after retry failure"
```

**Input Requirements**:
- The `requirements` field must contain the original user request verbatim, not paraphrased or interpreted.
- The `task` field must specify the exact task for the agent, including any variant or phase context.
- The `constraints` field must include all prior decisions that are locked and must not be violated.
- The `deliverable_format` field must specify whether the output is a single file or multiple chunked files.

**Output Requirements**:
- The `deliverable` field must contain the agent's complete output.
- The `status` field must indicate whether the output is complete, partial (with explanation), or blocked (with reason).
- The `evidence` field must provide trace documentation linking the output to specific requirements.

**Failure Handling**:
- On first failure, the agent retries with the same context for idempotent operations.
- On retry failure, the agent escalates to the Orchestrator with full context and error documentation.
- The Orchestrator may reassign to a different agent of the same type or abort the workflow.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:216-240`

---

### H2: Agent → Reviewer

The H2 contract governs the handoff from an agent to a reviewer for quality validation. This contract applies to single-agent workflows with review phases.

```yaml
Handoff: H2 - Agent to Reviewer
Trigger: Agent submission complete
Contract:
  inputs:
    - submission: "Agent's deliverable"
    - criteria: "Review checklist"
    - evidence: "Trace to requirements"
  
  outputs:
    - verdict: "PASS or FAIL"
    - findings: "List of issues if FAIL"
    - severity: "HIGH, MEDIUM, LOW"
  
  timing:
    - start: "Immediate upon submission"
    - timeout: "30 seconds to 5 minutes"
  
  failure:
    - incomplete_review: "Tech Lead rejects rubber-stamp"
```

**Input Requirements**:
- The `submission` field must contain the complete agent deliverable.
- The `criteria` field must contain the specific checklist for this review type.
- The `evidence` field must contain the trace documentation linking the deliverable to requirements.

**Output Requirements**:
- The `verdict` field must be either PASS (all criteria satisfied) or FAIL (one or more criteria not satisfied).
- The `findings` field must contain a specific, actionable list of issues if the verdict is FAIL.
- The `severity` field must classify each finding as HIGH, MEDIUM, or LOW.

**Failure Handling**:
- Incomplete reviews (rubber-stamp approvals without genuine assessment) are rejected by Tech Lead.
- The reviewer must provide specific evidence for every finding, not merely subjective impressions.
- Reviews that fail to identify obvious issues trigger review of the reviewer's effectiveness.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:242-264`

---

### H3: Executor → Reviewer (Team)

The H3 contract governs the handoff from an Executor to a Reviewer in team workflows using the [[Golden Triangle]] pattern. This contract includes round-based iteration for handling failed reviews.

```yaml
Handoff: H3 - Executor to Reviewer (Team)
Trigger: SUBMISSION posted to Mailbox
Contract:
  inputs:
    - submission: "What was built"
    - files_changed: "List of files"
    - approach: "Implementation approach"
  
  outputs:
    - verdict: "PASS or FAIL"
    - findings: "Specific issues if FAIL"
    - evidence_required: "For defenses"
  
  timing:
    - start: "Upon Mailbox post"
    - round: "Round 1, 2, or 3"
  
  failure:
    - defense: "Executor posts DEFENSE with evidence"
    - escalation: "Round 3 without agreement → Tech Lead"
```

**Input Requirements**:
- The `submission` field must contain a complete description of what was built.
- The `files_changed` field must list all files modified or created.
- The `approach` field must document the implementation approach and rationale.

**Output Requirements**:
- The `verdict` field must be either PASS or FAIL.
- The `findings` field must contain specific, actionable issues if the verdict is FAIL.
- The `evidence_required` field specifies what evidence the Executor must provide to defend against findings.

**Round-Based Iteration**:
- Round 1: Initial submission and review. If FAIL, proceed to Round 2.
- Round 2: Executor addresses issues or provides defense. If FAIL, proceed to Round 3.
- Round 3: Final review. If FAIL, escalate to Tech Lead for binding arbitration.

**Failure Handling**:
- When the Executor disagrees with findings, they post a DEFENSE with evidence to the Mailbox.
- Round 3 without agreement triggers automatic escalation to Tech Lead.
- The Tech Lead's decision is binding and not subject to further appeal.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:266-289`

---

### H4: Reviewer → Tech Lead (Team)

The H4 contract governs the handoff from a Reviewer to Tech Lead for arbitration in team workflows. This contract is triggered when review debates reach an impasse.

```yaml
Handoff: H4 - Reviewer to Tech Lead
Trigger: Reviewer escalates or round limit reached
Contract:
  inputs:
    - mail_summary: "Summary of debate"
    - evidence: "Both sides' positions"
    - round_count: "Current round"
  
  outputs:
    - decision: "Binding resolution"
    - reasoning: "Decision rationale"
    - stamp: "✅ CONSENSUS: TechLead ✓ ..."
  
  timing:
    - start: "Upon escalation or round 3 end"
    - completion: "Single response"
```

**Input Requirements**:
- The `mail_summary` field must provide an unbiased summary of the debate.
- The `evidence` field must document both sides' positions with supporting evidence.
- The `round_count` field must indicate the current round (3 in normal escalation scenarios).

**Output Requirements**:
- The `decision` field must contain a binding resolution that concludes the dispute.
- The `reasoning` field must document the rationale for the decision.
- The `stamp` field must contain the consensus stamp format: `✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓`

**Binding Nature**:
- The Tech Lead's decision is final and binding on all team members.
- The consensus stamp confirms that all parties accept the decision.
- Workflow progression is only permitted with a valid consensus stamp.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:291-310`

---

### H5: Phase → Phase

The H5 contract governs the handoff between consecutive phases within a workflow. This contract ensures that each phase's exit criteria are verified before the next phase begins.

```yaml
Handoff: H5 - Phase N to Phase N+1
Trigger: Phase N exit criteria verified
Contract:
  inputs:
    - prior_deliverable: "Phase N output"
    - requirements_registry: "Updated with progress"
    - locked_constraints: "Immutable prior decisions"
  
  outputs:
    - next_deliverable: "Phase N+1 output"
  
  timing:
    - gap: "Zero — immediate transition"
  
  failure:
    - criteria_not_met: "Phase N does not complete"
```

**Input Requirements**:
- The `prior_deliverable` field must contain the complete output from Phase N.
- The `requirements_registry` field must be updated with Phase N's progress and any new requirements discovered.
- The `locked_constraints` field must document decisions from prior phases that cannot be changed.

**Output Requirements**:
- The `next_deliverable` field must contain the output from Phase N+1.

**Zero-Gap Timing**:
- There must be no delay between phase completion and next phase initiation.
- The gap timing is zero because phase transitions are immediate upon exit criteria verification.
- Any delay indicates that exit criteria verification was incomplete or that there is a system issue.

**Failure Handling**:
- If Phase N's exit criteria are not met, Phase N does not complete.
- The workflow cannot proceed to Phase N+1 until Phase N criteria are satisfied.
- Persistent failure triggers the E3: Phase Escalation path.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:312-331`

---

## Timing Expectations

This section provides detailed timing expectations for phase execution and agent categories. These expectations inform capacity planning, performance optimization, and SLA compliance monitoring.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:335-356`

---

### Phase Timing Reference

The following table provides typical and maximum timing for each phase type across all workflows. Phase timing aggregates agent execution time, handoff overhead, and verification time.

| Phase | Typical Duration | Maximum Duration | Notes |
|-------|-----------------|------------------|-------|
| Requirements Intake | 1-5 minutes | 10 minutes | Varies with requirement complexity |
| Planning | 5-15 minutes | 30 minutes | Includes scout and plan sub-phases |
| Implementation | 5-30 minutes | 60 minutes | Varies most with task complexity |
| Review | 5-15 minutes | 30 minutes | Single-agent review; team reviews longer |
| Testing | 5-20 minutes | 40 minutes | Varies with coverage targets |
| Delivery | 1-5 minutes | 10 minutes | Output formatting and verification |

**Requirements Intake** phase timing is dominated by ambiguity resolution. Simple, well-defined requirements resolve quickly. Complex requirements with ambiguities require extended clarification.

**Planning** phase timing depends on codebase familiarity. The scout sub-phase is faster for well-documented codebases and longer for poorly documented or complex codebases.

**Implementation** phase timing varies most widely based on task complexity. Simple implementations may complete in minutes; complex implementations may approach the 60-minute maximum.

**Review** phase timing depends on review depth. Fast reviews may complete in 5 minutes; comprehensive reviews may require the full 30 minutes.

**Testing** phase timing depends on coverage targets. Fast variants targeting 60% coverage complete faster than hard variants targeting 80% coverage.

**Delivery** phase timing is consistently short as it primarily involves output formatting and final verification.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:337-346`

---

### Agent Category Timing

The following table provides typical timing for each agent category by execution phase.

| Agent Category | Typical Response | Typical Execution | Profile |
|----------------|-----------------|-------------------|---------|
| Meta (tech-lead, planner) | 5-10 seconds | 5-30 minutes | Coordination overhead, complex reasoning |
| Execution (engineers) | 5-10 seconds | 5-45 minutes | Implementation, varies with complexity |
| Validation (tester, reviewer) | 5-10 seconds | 5-20 minutes | Systematic analysis, deterministic |
| Research (researcher, scouter) | 5-10 seconds | 5-15 minutes | Exploration, synthesis |

**Response Time** for all agent categories falls within a consistent 5-10 second range. This consistency reflects uniform system design for agent initialization and skill injection.

**Execution Time** varies significantly by category:
- Meta agents have higher execution times due to coordination overhead and complex reasoning requirements.
- Execution agents have the widest execution time range due to task complexity variability.
- Validation agents have moderate execution times with systematic analysis patterns.
- Research agents have lower execution times due to the exploratory nature of their work.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:348-356`

---

## Escalation Paths

The system defines four escalation paths for handling failures at different levels. Each path has defined trigger conditions, escalation levels, and termination conditions. Escalation is never optional — when a trigger condition is met, the system must escalate following the defined path.

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:359-397`

---

### E1: Execution Escalation

E1 handles failures in task execution, including agent failures, timeout exceeded, and output quality issues at the execution level.

```
E1: Execution Escalation
┌─────────────────────────────────────────────────────────┐
│ Level 1: Agent tries again                               │
│   → Retry with same context, same agent                 │
│   → Trigger: First execution failure                    │
│                                                         │
│ Level 2: Different agent of same type                   │
│   → Assign to fresh agent instance                     │
│   → Trigger: Level 1 retry failure                      │
│                                                         │
│ Level 3: Orchestrator takes over                         │
│   → Orchestrator handles execution directly             │
│   → Trigger: Level 2 failure with no alternative agents  │
│                                                         │
│ Level 4: User intervention                               │
│   → Workflow paused, user notified                      │
│   → Trigger: All prior levels exhausted                │
└─────────────────────────────────────────────────────────┘
```

**Trigger Conditions**:
- Level 1: Any execution failure including timeout, error, or output quality issue
- Level 2: Same failure recurs with identical or different manifestation
- Level 3: No alternative agents available or all alternatives have failed
- Level 4: Orchestrator cannot resolve and escalation to user is the only option

**Escalation Criteria**:
- Each level must be attempted before escalating to the next level
- Document the reason for escalation at each level
- Preserve all context for potential Level 4 user intervention

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:361-368`

---

### E2: Quality Escalation

E2 handles failures in quality validation, including review failures, standards violations, and disputes about quality criteria.

```
E2: Quality Escalation
┌─────────────────────────────────────────────────────────┐
│ Level 1: Reviewer requests fix                          │
│   → Specific, actionable feedback to executor          │
│   → Trigger: Review FAIL verdict                        │
│                                                         │
│ Level 2: Executor defends with evidence                 │
│   → Executor provides counter-evidence                  │
│   → Trigger: Executor disagrees with findings           │
│                                                         │
│ Level 3: Tech Lead arbitration (team)                   │
│   → Tech Lead reviews both positions                    │
│   → Trigger: Team workflow, unresolved disagreement    │
│                                                         │
│ Level 4: User decision (non-team)                       │
│   → User makes final call on disputed quality          │
│   → Trigger: Non-team workflow, unresolved dispute    │
└─────────────────────────────────────────────────────────┘
```

**Trigger Conditions**:
- Level 1: Any review FAIL verdict from validation agents
- Level 2: Executor explicitly disagrees with findings and provides counter-evidence
- Level 3: Team workflow with disagreement after Round 3 or explicit escalation
- Level 4: Non-team workflow where executor and reviewer cannot agree

**Evidence Requirements**:
- Level 1 findings must include specific evidence, not subjective impressions
- Level 2 defenses must include counter-evidence that addresses each finding
- Level 3 arbitration considers both evidence sets impartially
- Level 4 user decision is final and not subject to appeal

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:370-377`

---

### E3: Phase Escalation

E3 handles failures in phase execution, including exit criteria not met and phase timeout exceeded.

```
E3: Phase Escalation
┌─────────────────────────────────────────────────────────┐
│ Level 1: Retry phase with same agent                    │
│   → Same agent attempts phase completion               │
│   → Trigger: Phase exit criteria not met             │
│                                                         │
│ Level 2: Retry with different agent                     │
│   → Different agent instance attempts phase            │
│   → Trigger: Level 1 retry failure                    │
│                                                         │
│ Level 3: Create minimal viable output                 │
│   → Produce acceptable output at reduced scope        │
│   → Trigger: Both retry levels failed                 │
│                                                         │
│ Level 4: Abort workflow, report issue                 │
│   → Terminate workflow, document failure              │
│   → Trigger: All prior levels exhausted              │
└─────────────────────────────────────────────────────────┘
```

**Trigger Conditions**:
- Level 1: Phase execution completes but exit criteria not satisfied
- Level 2: Same failure recurs with identical or different manifestation
- Level 3: Fundamental blocker prevents full completion, minimal viable output possible
- Level 4: Fundamental blocker prevents any meaningful output

**Minimal Viable Output**:
- Level 3 output must still satisfy core requirements even if peripheral requirements are dropped
- The scope reduction must be explicitly documented and acknowledged
- Level 3 output is only acceptable when full completion is demonstrably impossible

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:379-386`

---

### E4: Team Escalation

E4 handles the round-based escalation within team workflows using the [[Golden Triangle]] pattern. This is the most structured escalation path with explicit round limits.

```
E4: Team Escalation
┌─────────────────────────────────────────────────────────┐
│ Round 1: Review PASS → proceed to next task            │
│ Round 1: Review FAIL → proceed to Round 2              │
│                                                         │
│ Round 2: Review PASS → proceed to next task           │
│ Round 2: Review FAIL → proceed to Round 3              │
│                                                         │
│ Round 3: Review PASS → proceed to next task           │
│ Round 3: Review FAIL → Tech Lead arbitration          │
│                                                         │
│ Tech Lead: Binding decision, consensus stamp          │
└─────────────────────────────────────────────────────────┘
```

**Round Progression Rules**:
- Each round consists of Executor submission and Reviewer review
- A PASS verdict immediately proceeds to the next task
- A FAIL verdict proceeds to the next round (if rounds remaining)
- Round 3 FAIL triggers mandatory Tech Lead arbitration

**Arbitration**:
- Tech Lead reviews the complete debate record including all rounds
- Tech Lead issues a binding decision with documented rationale
- Tech Lead issues consensus stamp confirming all parties accept the decision
- Workflow cannot proceed without valid consensus stamp

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:388-397`

---

## SLA Breach Handling

This section defines procedures for handling SLA breaches — situations where workflow execution exceeds defined SLA targets.

### Breach Classification

| Breach Type | Definition | Response |
|-------------|------------|----------|
| **Warning** | Execution approaching SLA maximum (>80% of target) | Log warning, continue monitoring |
| **Minor** | SLA target exceeded but maximum not reached | Document, analyze root cause |
| **Major** | SLA maximum exceeded | Trigger E1: Execution Escalation |
| **Critical** | SLA maximum significantly exceeded (>150%) | Immediate escalation, user notification |

### Breach Response Procedures

**Warning Response**:
1. Log the warning with current timing and projected completion
2. Continue execution without intervention
3. If projection exceeds maximum, prepare for escalation

**Minor Breach Response**:
1. Document the breach with timing data and contributing factors
2. Complete the workflow without escalation
3. Analyze root cause for optimization opportunities
4. Update SLA targets if systemic issues identified

**Major Breach Response**:
1. Trigger E1: Execution Escalation at appropriate level
2. Attempt to complete the workflow despite breach
3. Document the breach with escalation trail
4. Review SLA targets for appropriateness

**Critical Breach Response**:
1. Immediately notify user of significant delay
2. Trigger E1: Execution Escalation at highest applicable level
3. Consider workflow termination if completion is no longer valuable
4. Document the breach with full timeline and contributing factors

### Breach Documentation Requirements

Every SLA breach must be documented with:
- Workflow ID and variant
- SLA metric that was breached
- Target value and actual value
- Timing at breach detection
- Root cause analysis
- Corrective actions taken
- Systemic implications for SLA targets

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:8-18` (SLA Framework), `.documents/business/business-workflows/05-sla-and-handoffs.md:337-356` (Timing Expectations)

---

## Escalation Triggers

Escalation triggers are specific conditions that initiate escalation procedures. Every trigger is associated with a specific escalation path.

### Trigger Registry

| Trigger | Condition | Escalation Path |
|---------|-----------|-----------------|
| T1: Execution Failure | Agent returns error or timeout | E1: Level 1 |
| T2: Retry Failure | Same execution fails twice | E1: Level 2 |
| T3: No Alternative | No agents available for retry | E1: Level 3 |
| T4: Review FAIL | Reviewer returns FAIL verdict | E2: Level 1 |
| T5: Disputed Finding | Executor disagrees with findings | E2: Level 2 |
| T6: Team Disagreement | Team member dispute unresolved | E2: Level 3 |
| T7: Non-team Dispute | Single-agent dispute unresolved | E2: Level 4 |
| T8: Phase Incomplete | Phase exit criteria not met | E3: Level 1 |
| T9: Phase Blocked | Phase fundamentally blocked | E3: Level 4 |
| T10: Round Limit | Round 3 review FAIL | E4: Tech Lead |
| T11: SLA Warning | >80% of SLA maximum | Monitor |
| T12: SLA Major | SLA maximum exceeded | E1: Level 2 |
| T13: SLA Critical | >150% of SLA maximum | E1: Level 3, User |

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:359-397` (Escalation Paths)

---

## Handoff Validation Rules

Every handoff must pass validation before the receiving entity accepts the handoff. Validation failures prevent workflow progression.

### Validation Checkpoints

**H1 Validation (Orchestrator → Agent)**:
- [ ] Requirements are present and verbatim
- [ ] Task is specific and actionable
- [ ] Constraints are documented and consistent
- [ ] Deliverable format is specified

**H2 Validation (Agent → Reviewer)**:
- [ ] Submission is complete
- [ ] Review criteria are specified
- [ ] Evidence trace is documented
- [ ] No obvious quality issues

**H3 Validation (Executor → Reviewer, Team)**:
- [ ] Submission is complete
- [ ] Files changed list is accurate
- [ ] Approach is documented
- [ ] Round number is specified

**H4 Validation (Reviewer → Tech Lead)**:
- [ ] Mail summary is unbiased
- [ ] Both positions documented
- [ ] Round count is accurate
- [ ] No prior consensus

**H5 Validation (Phase → Phase)**:
- [ ] Prior deliverable is complete
- [ ] Requirements registry is updated
- [ ] Constraints are locked
- [ ] Exit criteria verified

### Validation Failure Response

| Validation | Response |
|------------|----------|
| H1 failure | Orchestrator must correct before delegation |
| H2 failure | Agent must supplement before review |
| H3 failure | Executor must complete before review |
| H4 failure | Reviewer must complete summary before arbitration |
| H5 failure | Prior phase must complete before transition |

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:214-331` (Handoff Contracts)

---

## Complete Workflow SLA Reference

| Workflow | Variant | Response | Completion Target | Completion Max |
|----------|---------|----------|-------------------|----------------|
| `/cook` | :fast | 5s | 30s | 2min |
| `/cook` | :hard | 15s | 5min | 15min |
| `/cook` | :team | 30s | 15min | 45min |
| `/fix` | — | 10s | 8min | 23min |
| `/design` | — | 10s | 20min | 40min |
| `/brainstorm` | — | 5s | 8min | 15min |
| `/test` | :fast | 10s | 5min | 10min |
| `/test` | :hard | 15s | 15min | 30min |
| `/review` | — | 10s | 12min | 25min |
| `/debug` | — | 10s | 12min | 25min |
| `/plan` | — | 10s | 30min | 60min |
| `/ask` | — | 3s | 5min | 10min |
| `/deploy` | :check | 5s | 30s | 1min |
| `/deploy` | :preview | 10s | 5min | 15min |
| `/deploy` | :production | 15s | 15min | 30min |
| `/wiki` | :fast | 10s | 10min | 20min |
| `/wiki` | :hard | 15s | 30min | 60min |
| `/wiki` | :team | 30s | 45min | 90min |

**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:21-211` (Workflow SLAs)

---

## Related Pages

- [[Workflow System]] — Complete workflow system reference including SLAs and handoffs
- [[Workflow Catalog]] — Complete workflow catalogue with triggers and outcomes
- [[Detailed Workflows]] — Step-by-step flows for all commands including timing
- [[Golden Triangle]] — Adversarial team coordination pattern with round-based escalation
- [[Command System]] — All commands with variant specifications and SLA alignment
- [[Actor Map]] — Actor definitions including escalation responsibilities
