# SLA and Handoffs

> **Section**: Business Workflows | **File**: 05-sla-and-handoffs.md
> **Purpose**: SLA definitions per workflow, handoff contracts, timing expectations, escalation paths

---

## SLA Definitions

### SLA Framework

| Metric | Definition |
|--------|------------|
| **Response Time** | Time from user input to first output |
| **Completion Time** | Time from user input to workflow complete |
| **Success Rate** | Workflows completing without error |
| **Quality Score** | Exit criteria compliance rate |

---

## Workflow SLAs

### Build Workflows

#### /cook SLA

| Variant | Response | Completion Target | Completion Max | Success Target |
|---------|----------|-------------------|---------------|---------------|
| :fast | 5s | 30s | 2min | 99% |
| :hard | 15s | 5min | 15min | 98% |
| :team | 30s | 15min | 45min | 95% |

**Quality Criteria**:
- All requirements parsed
- All phases complete
- Exit criteria verified
- Review PASS (team) or adequate review (fast/hard)

---

#### /fix SLA

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 10s | 30s |
| Root Cause Identification | 2min | 5min |
| Fix Implementation | 5min | 15min |
| Verification | 1min | 3min |
| **Total Completion** | 8min | 23min |

**Quality Criteria**:
- Root cause identified (not symptom)
- Fix addresses cause
- Existing tests pass
- No regressions introduced

---

#### /design SLA

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 10s | 30s |
| Design Research | 5min | 10min |
| Specification | 10min | 20min |
| Review | 5min | 10min |
| **Total Completion** | 20min | 40min |

**Quality Criteria**:
- Design addresses all requirements
- Accessibility considered
- Technical feasibility verified
- Examples provided

---

#### /brainstorm SLA

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 5s | 15s |
| Exploration | 5min | 10min |
| Documentation | 3min | 5min |
| **Total Completion** | 8min | 15min |

**Quality Criteria**:
- 2+ alternatives generated
- Trade-offs documented
- Recommendation with rationale

---

### Quality Workflows

#### /test SLA

| Variant | Response | Completion Target | Completion Max |
|---------|----------|-------------------|----------------|
| :fast | 10s | 5min | 10min |
| :hard | 15s | 15min | 30min |

**Quality Criteria**:
- Coverage >= 80% (hard) or 60% (fast)
- Edge cases included
- Tests executable
- Tests deterministic

---

#### /review SLA

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 10s | 30s |
| Review | 10min | 20min |
| Report | 2min | 5min |
| **Total Completion** | 12min | 25min |

**Quality Criteria**:
- Correctness reviewed
- Security reviewed
- Performance reviewed
- Standards compliance checked

---

#### /debug SLA

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 10s | 30s |
| Investigation | 5min | 10min |
| Analysis | 5min | 10min |
| Report | 2min | 5min |
| **Total Completion** | 12min | 25min |

**Quality Criteria**:
- Root cause identified
- Evidence provided
- Fix proposal included
- Prevention suggestions

---

### Planning Workflows

#### /plan SLA

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 10s | 30s |
| Scouting | 10min | 20min |
| Planning | 15min | 30min |
| Review | 5min | 10min |
| **Total Completion** | 30min | 60min |

**Quality Criteria**:
- All requirements addressed
- Milestones defined
- Dependencies identified
- Estimates provided

---

#### /ask SLA

| Metric | Target | Maximum |
|--------|--------|---------|
| Response Time | 3s | 10s |
| Answer/Research | 5min | 10min |
| **Total Completion** | 5min | 10min |

**Quality Criteria**:
- Question answered or researched
- Sources cited
- Examples provided

---

### Support Workflows

#### /deploy SLA

| Variant | Response | Completion Target | Completion Max |
|---------|----------|-------------------|----------------|
| :check | 5s | 30s | 1min |
| :preview | 10s | 5min | 15min |
| :production | 15s | 15min | 30min |

**Quality Criteria**:
- Pre-deployment checks pass
- Deployment successful
- Smoke tests passing
- Monitoring active

---

#### /wiki SLA

| Variant | Response | Completion Target | Completion Max |
|---------|----------|-------------------|----------------|
| :fast | 10s | 10min | 20min |
| :hard | 15s | 30min | 60min |
| :team | 30s | 45min | 90min |

**Quality Criteria**:
- Entities extracted
- Relationships mapped
- Navigation functional
- Cross-references valid

---

## Handoff Contracts

### H1: Orchestrator → Agent

```yaml
Handoff: Orchestrator to Agent
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
    - timeout: Per workflow SLA
  
  failure:
    - retry: One retry with same context
    - escalate: Report to Orchestrator
```

### H2: Agent → Reviewer

```yaml
Handoff: Agent to Reviewer
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

### H3: Executor → Reviewer (Team)

```yaml
Handoff: Executor to Reviewer (Team)
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

### H4: Reviewer → Tech Lead (Team)

```yaml
Handoff: Reviewer to Tech Lead
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

### H5: Phase → Phase

```yaml
Handoff: Phase N to Phase N+1
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

---

## Timing Expectations

### Phase Timing

| Phase | Typical Duration | Maximum Duration |
|-------|-----------------|------------------|
| Requirements Intake | 1-5 min | 10 min |
| Planning | 5-15 min | 30 min |
| Implementation | 5-30 min | 60 min |
| Review | 5-15 min | 30 min |
| Testing | 5-20 min | 40 min |
| Delivery | 1-5 min | 10 min |

### Agent Timing

| Agent Category | Typical Response | Typical Execution |
|----------------|------------------|-------------------|
| Meta (tech-lead, planner) | 5-10s | 5-30 min |
| Execution (engineers) | 5-10s | 5-45 min |
| Validation (tester, reviewer) | 5-10s | 5-20 min |
| Research (researcher, scouter) | 5-10s | 5-15 min |

---

## Escalation Paths

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

## Evidence Sources

- `rules/CORE.md` — Orchestration timing
- `rules/PHASES.md` — Phase timing, exit criteria
- `rules/TEAMS.md` — Team timing, escalation
- `README.md` — Quick results, command reference
