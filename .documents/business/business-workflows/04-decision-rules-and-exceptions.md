# Decision Rules and Exceptions

> **Section**: Business Workflows | **File**: 04-decision-rules-and-exceptions.md
> **Purpose**: 60+ business rules, exception categories, and fallback paths

---

## Orchestration Rules

### R1: Command Routing

| Rule | Condition | Action |
|------|-----------|--------|
| R1.1 | Explicit command detected | Route to command workflow file |
| R1.2 | Natural language detected | Map to equivalent command |
| R1.3 | Unknown command | Return error with suggestions |
| R1.4 | Variant specified | Route to variant-specific file |
| R1.5 | No variant specified | Use default variant |

### R2: Tiered Execution

| Rule | Condition | Action |
|------|-----------|--------|
| R2.1 | runSubagent available | Use TIER 1 (mandatory) |
| R2.2 | runSubagent unavailable | Use TIER 2 (fallback) |
| R2.3 | TIER 1 tool error | Retry once, then TIER 2 |
| R2.4 | Task claimed "too simple" | Still require TIER 1 |
| R2.5 | Token savings claimed | Still require TIER 1 |

### R3: Phase Execution

| Rule | Condition | Action |
|------|-----------|--------|
| R3.1 | Phase N incomplete | Do not start Phase N+1 |
| R3.2 | Exit criteria not met | Phase does not complete |
| R3.3 | Prior deliverable missing | Halt, create, then resume |
| R3.4 | Prior deliverable exists | Lock as immutable constraint |
| R3.5 | Scope creep detected | Reject, return to scope |

---

## Agent Rules

### R4: Agent Selection

| Rule | Condition | Action |
|------|-----------|--------|
| R4.1 | Backend task | Select backend-engineer |
| R4.2 | Frontend task | Select frontend-engineer |
| R4.3 | Database task | Select database-architect |
| R4.4 | Security task | Select security-engineer |
| R4.5 | Testing task | Select tester |
| R4.6 | Unmapped task | Ask user for clarification |

### R5: Meta Agent Constraints

| Rule | Condition | Action |
|------|-----------|--------|
| R5.1 | Meta agent (tech-lead, planner) | Must delegate, not implement |
| R5.2 | Execution agent | May implement directly |
| R5.3 | Validation agent | May review, not modify code |
| R5.4 | Research agent | May investigate, not implement |

### R6: Context Isolation

| Rule | Condition | Action |
|------|-----------|--------|
| R6.1 | TIER 1 execution | Fresh isolated context |
| R6.2 | TIER 2 execution | Shared parent context |
| R6.3 | Agent handoff | Include requirements, deliverables |
| R6.4 | Agent handoff | Exclude reasoning, failed attempts |

---

## Skill Rules

### R7: HSOL Resolution

| Rule | Condition | Action |
|------|-----------|--------|
| R7.1 | Simple task | Skip skill resolution |
| R7.2 | Complex task | Run resolution algorithm |
| R7.3 | Matrix fitness >= 0.8 | Use matrix skills |
| R7.4 | Matrix fitness 0.75-0.8 | Use matrix + flag discovery |
| R7.5 | Matrix fitness < 0.75 | BLOCKING discovery |
| R7.6 | Discovery unavailable | Proceed with matrix only |

### R8: Skill Injection

| Rule | Condition | Action |
|------|-----------|--------|
| R8.1 | Skills resolved | Load before agent execution |
| R8.2 | No matching skills | Report gap explicitly |
| R8.3 | New skill needed | Ask user confirmation |
| R8.4 | Installation fails | Rollback, report gap |

---

## Team Rules

### R9: Golden Triangle

| Rule | Condition | Action |
|------|-----------|--------|
| R9.1 | :team variant invoked | Spawn Tech Lead + Executor + Reviewer |
| R9.2 | Team phase start | Tech Lead publishes Task List first |
| R9.3 | Executor submits | Reviewer reviews within same phase |
| R9.4 | Review FAIL | Executor fixes or defends |
| R9.5 | Review PASS | Proceed to next task |
| R9.6 | Defense without evidence | Automatic FAIL |
| R9.7 | Round > 3 | Tech Lead arbitrates |

### R10: Consensus

| Rule | Condition | Action |
|------|-----------|--------|
| R10.1 | Clean PASS | Accept submission |
| R10.2 | Resolved PASS | Accept after fixes/defense |
| R10.3 | Max rounds reached | Tech Lead decision binding |
| R10.4 | Output without stamp | Block release |
| R10.5 | Reviewer rubber-stamps | Tech Lead rejects PASS |

### R11: Mailbox

| Rule | Condition | Action |
|------|-----------|--------|
| R11.1 | Team phase active | Use Mailbox for communication |
| R11.2 | Mailbox entry | Append only, no edits |
| R11.3 | Mailbox entry | Include timestamp and type |
| R11.4 | REVIEW type | Include explicit PASS/FAIL |
| R11.5 | DEFENSE type | Include technical evidence |

---

## Requirement Rules

### R12: Requirements Intake

| Rule | Condition | Action |
|------|-----------|--------|
| R12.1 | Ambiguous requirement | ASK user before proceeding |
| R12.2 | Missing requirement | Report gap |
| R12.3 | Contradicting requirements | Report conflict |
| R12.4 | All requirements parsed | Create Requirements Registry |

### R13: Deliverable Rules

| Rule | Condition | Action |
|------|-----------|--------|
| R13.1 | Output <= 150 lines | Single file |
| R13.2 | Output > 150 lines | Chunked folder with index |
| R13.3 | Output >= 4 sections | Chunked folder |
| R13.4 | Chunked creation | Create index first |
| R13.5 | Chunked update | Update index after each section |

---

## Error Handling Rules

### R14: Error Detection

| Rule | Condition | Action |
|------|-----------|--------|
| R14.1 | Ambiguity detected | STOP, ASK user |
| R14.2 | Missing context | STOP, request context |
| R14.3 | Code not finalized | STOP, wait for code |
| R14.4 | Assumption detected | Challenge assumption |

### R15: Error Recovery

| Rule | Condition | Action |
|------|-----------|--------|
| R15.1 | TIER 1 spawn fails | Fall back to TIER 2 |
| R15.2 | Sub-agent error | Retry once, then fallback |
| R15.3 | Agent timeout | Extend timeout, then fail |
| R15.4 | Mailbox write fails | Use inline communication |

---

## Exception Categories

### E1: Input Exceptions

| Exception | Trigger | Recovery |
|-----------|---------|----------|
| E1.1 | Empty input | Prompt for clarification |
| E1.2 | Invalid command | Show valid commands |
| E1.3 | Invalid variant | Show valid variants |
| E1.4 | Missing required param | Request missing param |

### E2: Execution Exceptions

| Exception | Trigger | Recovery |
|-----------|---------|----------|
| E2.1 | TIER 1 unavailable | Fall back to TIER 2 |
| E2.2 | Agent not found | Ask user for agent |
| E2.3 | Skill not found | Trigger discovery |
| E2.4 | Phase timeout | Extend or abort |

### E3: Quality Exceptions

| Exception | Trigger | Recovery |
|-----------|---------|----------|
| E3.1 | Review FAIL | Return to implementation |
| E3.2 | Test failure | Debug and fix |
| E3.3 | Coverage below target | Add more tests |
| E3.4 | Security vulnerability | Fix before delivery |

### E4: Team Exceptions

| Exception | Trigger | Recovery |
|-----------|---------|----------|
| E4.1 | Consensus impossible | Tech Lead arbitration |
| E4.2 | Reviewer too strict | Re-invoke with checklist |
| E4.3 | Executor silent | Tech Lead creates minimal |
| E4.4 | Mailbox corrupted | Inline communication mode |

---

## Fallback Paths

### F1: TIER 1 Fallback

```
TIER 1 failure:
  1. Log: "⚠️ TIER 1 FAILED: {reason}"
  2. Retry TIER 1 once
  3. If still fails → TIER 2 fallback
  4. Log: "⚠️ TIER 2: {reason}"
  5. Embody agent
  6. Continue execution
```

### F2: Agent Fallback

```
Agent unavailable:
  1. Log: "⚠️ AGENT UNAVAILABLE: {agent}"
  2. Check agent category
  3. Try category default (execution → backend-engineer)
  4. Ask user if default unacceptable
  5. Continue with selected agent
```

### F3: Skill Fallback

```
Skill resolution failure:
  1. Log: "⚠️ SKILL RESOLUTION FAILED"
  2. Proceed with base knowledge
  3. Flag: "Skill gap: {domain}"
  4. Notify user of limitation
  5. Continue without skill injection
```

### F4: Phase Fallback

```
Phase cannot complete:
  1. Log: "⚠️ PHASE BLOCKED: {reason}"
  2. Attempt recovery action
  3. If unrecoverable:
     a. Create minimal viable output
     b. Flag issue
     c. Proceed to next phase
  4. Report limitation to user
```

---

## Decision Matrix

| Scenario | Primary Path | Fallback Path |
|----------|--------------|---------------|
| Command routing | Route to file | Error message |
| Agent selection | Map to correct agent | Ask user |
| TIER 1 execution | Sub-agent spawn | Embodied execution |
| Skill resolution | Matrix skills | Dynamic discovery |
| Team consensus | Debate until agreement | Tech Lead arbitration |
| Phase completion | All criteria met | Create minimal output |

---

## Evidence Sources

- `rules/CORE.md` — R1, R2, R3, R14, R15, E1, E2, F1-F4
- `rules/AGENTS.md` — R4, R5, R6
- `rules/TEAMS.md` — R9, R10, R11, E4
- `rules/PHASES.md` — R3, R13
- `rules/SKILLS.md` — R7, R8, E3, F3
- `rules/CORE.md` — L1-L10 Orchestration Laws
