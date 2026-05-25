# Acceptance, Risks, and Assumptions

> **Section**: Business PRD | **File**: 04-acceptance-risks-assumptions.md
> **Purpose**: 20 acceptance criteria, 8 risks with mitigations, 5 assumptions, 5 open questions

---

## Acceptance Criteria

### AC-1: Command Routing

**Criterion**: All 14 slash commands route correctly with variant support.

**Verification**:
- Test `/cook`, `/cook:fast`, `/cook:hard`, `/cook:team` on each platform
- Test natural language mapping ("implement" → `/cook`)
- Verify error message for invalid commands

### AC-2: TIER 1 Execution

**Criterion**: Sub-agent execution used as primary delegation method.

**Verification**:
- Execute complex task, verify `runSubagent` tool invoked
- Check output includes "Sub-agent" designation
- Confirm isolated context maintained

### AC-3: TIER 2 Fallback

**Criterion**: Embodied execution used only when sub-agent unavailable.

**Verification**:
- Simulate sub-agent tool failure
- Verify TIER 2 fallback activates
- Check "EMBODY" designation in output

### AC-4: Agent Selection

**Criterion**: Correct agent selected for each task type.

**Verification**:
- Test backend task → `backend-engineer`
- Test frontend task → `frontend-engineer`
- Test database task → `database-architect`

### AC-5: Golden Triangle Consensus

**Criterion**: Team phases produce output with consensus stamp.

**Verification**:
- Execute `/cook:team` variant
- Verify "✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓" present
- Confirm debate log in Mailbox file

### AC-6: HSOL Skill Resolution

**Criterion**: Relevant skills injected based on agent profile and task.

**Verification**:
- Execute task with known skill requirements
- Verify skill files loaded before execution
- Check fitness calculation logged

### AC-7: Phase Sequencing

**Criterion**: Phases execute in order, each completing before next starts.

**Verification**:
- Execute multi-phase workflow
- Verify Phase 1 complete before Phase 2 starts
- Confirm exit criteria checked per phase

### AC-8: Context Isolation

**Criterion**: Agent context isolated in TIER 1, shared in TIER 2.

**Verification**:
- Run parallel TIER 1 tasks, verify no cross-contamination
- Run TIER 2 task, verify parent context accessible

### AC-9: Deliverable Size Management

**Criterion**: Large deliverables split into chunked folder structure.

**Verification**:
- Generate large output (>150 lines)
- Verify folder created with 00-index.md
- Confirm section files created sequentially

### AC-10: Multi-Platform Installation

**Criterion**: CLI installer works on all 7 platforms.

**Verification**:
- Install on Windows, macOS, Linux
- Verify platform paths created correctly
- Test uninstall removes all traces

### AC-11: Mailbox Append-Only

**Criterion**: Mailbox file never edited or deleted after creation.

**Verification**:
- Execute team workflow
- Attempt to edit prior exchange
- Verify edit rejected or ignored

### AC-12: Documentation Generation

**Criterion**: Wiki workflows produce navigable documentation from code.

**Verification**:
- Run `/wiki:fast` on project folder
- Verify index created with links
- Confirm entities extracted correctly

### AC-13: Error Recovery

**Criterion**: Errors handled with graceful degradation.

**Verification**:
- Introduce error mid-workflow
- Verify recovery path executes
- Confirm user notified with options

### AC-14: Reporting

**Criterion**: Reports generated with metrics and progress.

**Verification**:
- Run `/report:fast`
- Verify metrics included
- Check format matches template

### AC-15: Design Workflow

**Criterion**: Design specification produced before implementation.

**Verification**:
- Execute `/design`
- Verify specification file created
- Confirm implementation references spec

### AC-16: Brainstorming

**Criterion**: Multiple alternatives generated with trade-offs.

**Verification**:
- Execute `/brainstorm`
- Verify 2+ alternatives
- Check trade-offs documented

### AC-17: Security Standards

**Criterion**: Security review included in quality workflows.

**Verification**:
- Execute `/review` on code with vulnerability
- Verify security findings reported
- Confirm mitigation suggestions provided

### AC-18: Performance Optimization

**Criterion**: Performance review included in quality workflows.

**Verification**:
- Execute `/review` on inefficient code
- Verify performance issues flagged
- Confirm optimization hints provided

### AC-19: Constraint Propagation

**Criterion**: Scouter analysis constrains planner output constrains implementer.

**Verification**:
- Execute full planning → implementation workflow
- Verify planner referenced scouter output
- Confirm implementer referenced planner decisions

### AC-20: Token Efficiency

**Criterion**: Token consumption reduced by skill injection.

**Verification**:
- Measure baseline token usage (no skills)
- Measure optimized usage (with skills)
- Verify 85% reduction target met

---

## Risk Register

### Risk R1: Platform API Changes

**Description**: AI platform vendors (Cursor, Claude Code, etc.) change APIs or remove capabilities (e.g., `runSubagent`).

**Probability**: Medium (3/5)
**Impact**: High (4/5)
**Risk Score**: 12

**Mitigation**:
- Implement fallback detection for tool availability
- Maintain TIER 2 as always-available fallback
- Monitor platform changelogs for breaking changes
- Maintain relationships with platform teams

### Risk R2: Skill Staleness

**Description**: Matrix skills become outdated as technologies evolve.

**Probability**: High (4/5)
**Impact**: Medium (3/5)
**Risk Score**: 12

**Mitigation**:
- Implement freshness scoring in HSOL
- Quarterly skill review process
- Community contribution pathway for skill updates
- Automated testing of skill accuracy

### Risk R3: Context Isolation Failure

**Description**: TIER 1 sub-agents share context accidentally.

**Probability**: Low (2/5)
**Impact**: High (4/5)
**Risk Score**: 8

**Mitigation**:
- Platform-level isolation verification
- Session state monitoring
- Isolated execution environment validation

### Risk R4: Golden Triangle Deadlock

**Description**: Debate loop exceeds 3 rounds without resolution.

**Probability**: Medium (3/5)
**Impact**: Medium (3/5)
**Risk Score**: 9

**Mitigation**:
- Tech Lead arbitration mechanism in place
- Clear escalation criteria defined
- Consensus stamp format documented

### Risk R5: Documentation Drift

**Description**: Generated documentation becomes stale as code changes.

**Probability**: High (4/5)
**Impact**: Low (2/5)
**Risk Score**: 8

**Mitigation**:
- Version-stamped documentation
- CI integration for regeneration triggers
- Clear ownership for documentation updates

### Risk R6: Onboarding Complexity

**Description**: New users struggle with command syntax and variants.

**Probability**: Medium (3/5)
**Impact**: Medium (3/5)
**Risk Score**: 9

**Mitigation**:
- Comprehensive quick-start guide
- Natural language command support
- Interactive onboarding flow

### Risk R7: Token Cost Unpredictability

**Description**: Token costs vary unpredictably with task complexity.

**Probability**: Medium (3/5)
**Impact**: Low (2/5)
**Risk Score**: 6

**Mitigation**:
- Token usage reporting per workflow
- Cost estimation before execution (future)
- Skill optimization to reduce overhead

### Risk R8: Multi-Platform Inconsistency

**Description**: Behavior differs subtly between platforms.

**Probability**: Medium (3/5)
**Impact**: Medium (3/5)
**Risk Score**: 9

**Mitigation**:
- Cross-platform test suite
- Platform-specific documentation
- Platform capability matrix maintained

---

## Assumptions

### Assumption A1: Sub-Agent Tool Stability

**Assumption**: Platforms continue to provide `runSubagent` or equivalent functionality.

**Impact if False**: TIER 1 becomes unavailable; TIER 2 must handle all delegation.

### Assumption A2: Token Cost Model

**Assumption**: Token-based pricing remains dominant; new pricing models do not disrupt efficiency calculations.

**Impact if False**: Efficiency metrics (85% token savings) become irrelevant.

### Assumption A3: Open Extensibility

**Assumption**: Platforms continue to allow skill injection and rule modification.

**Impact if False**: Framework becomes read-only; custom skill addition restricted.

### Assumption A4: Developer Adoption

**Assumption**: Developers will adopt structured workflows despite learning curve.

**Impact if False**: Low adoption undermines business case.

### Assumption A5: Documentation Value

**Assumption**: Auto-generated documentation provides sufficient accuracy for AI consumption.

**Impact if False**: Generated docs require heavy manual correction; value proposition weakened.

---

## Open Questions

### Question O1: Enterprise Pricing Model

**Question**: Should enterprise features (SSO, audit logs, custom agents) be priced separately?

**Status**: Undecided
**Input Needed**: Market research, competitive analysis

### Question O2: Custom Agent Support Timeline

**Question**: When should user-defined agents be supported?

**Status**: Phase 2 candidate
**Input Needed**: User demand assessment

### Question O3: Workflow Analytics

**Question**: Should workflow execution data be collected for aggregate analytics?

**Status**: Privacy consideration
**Input Needed**: Legal review, opt-in mechanism design

### Question O4: Mobile IDE Timeline

**Question**: Should mobile platform support (iOS/Android IDEs) be prioritized in Phase 2 or 3?

**Status**: Undecided
**Input Needed**: Market demand, engineering capacity

### Question O5: Community Governance

**Question**: How should community-contributed skills and agents be governed?

**Status**: Process undefined
**Input Needed**: Contribution guidelines, quality standards

---

## Evidence Sources

- `rules/CORE.md` — Acceptance criteria encoded in self-check rules
- `rules/TEAMS.md` — Golden Triangle consensus requirements
- `rules/PHASES.md` — Phase exit criteria specifications
- `rules/SKILLS.md` — HSOL fitness and freshness requirements
- `README.md` — Command verification baseline
