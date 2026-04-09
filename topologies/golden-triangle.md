---
schema-version: "1.0"
name: golden-triangle
description: "3-agent adversarial collaboration — Tech Lead + Executor + Reviewer with debate rounds"
status: active
---

# Golden Triangle Topology

> 3-agent adversarial collaboration for maximum quality. Tech Lead (coordinator),
> Executor (implementer), Reviewer (devil's advocate). Output is released ONLY
> upon consensus after debate.

## Semantics

Each workflow phase spawns a triangle of 3 agents with distinct roles:
- **Tech Lead** (meta): Decomposes task, dispatches work, arbitrates disputes
- **Executor** (execution): Implements assigned tasks, defends decisions
- **Reviewer** (validation): Independent review, devil's advocate, quality gate

## Execution Model

| Tier | When | Action |
|------|------|--------|
| **EMBODY** | Tech Lead (meta) + Executor (execution) | EMBODY — these need accumulated project context |
| **SUB-AGENT** | Reviewer (validation) + tool exists | SUB-AGENT with Context Briefing — independent evaluation |
| **EMBODY (fallback)** | Sub-agent tool unavailable | All EMBODY + Anti-Bias Protocol for Reviewer |

**Anti-Lazy Rule**: Never use SUB-AGENT for Tech Lead/Executor. Never skip Anti-Bias Protocol when Reviewer uses EMBODY.

## Execution Steps

```
1. EMBODY Tech Lead → decompose task → produce Shared Task List → dispatch
2. EMBODY Executor → implement assigned tasks → post SUBMISSION to Mailbox
3. SUB-AGENT Reviewer (or EMBODY + Anti-Bias) → review submissions → post REVIEW to Mailbox
4. IF FAIL → EMBODY Executor again → fix/defend → Reviewer re-checks
5. Repeat steps 3–4 max 3 rounds
6. EMBODY Tech Lead → arbitrate if needed → post DECISION → synthesize output
```

## Mailbox — Central Communication Hub

**Location**: `./reports/{topic}/MAILBOX-{date}.md`

All 3 triangle agents READ from and APPEND to this file. Never overwrite — append only.

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
| TASK_ASSIGNMENT | Tech Lead | Executor | Assign task with requirements and context |
| SUBMISSION | Executor | Reviewer | Submit completed work for review |
| REVIEW | Reviewer | Executor | Review result: PASS or FAIL with findings |
| DEFENSE | Executor | Reviewer | Defend implementation against FAIL findings |
| RESUBMISSION | Executor | Reviewer | Resubmit after fixing FAIL findings |
| APPROVAL | Reviewer | Tech Lead | Confirm task passes all review criteria |
| ESCALATION | Any | Tech Lead | Escalate unresolvable disagreement |
| ARBITRATION | Tech Lead | All | Tech Lead resolves dispute with binding decision |
| DECISION | Tech Lead | All | Final phase decision with consensus stamp |

## When to Use

- `:team` variant of any command workflow
- Tasks requiring maximum quality with adversarial review
- Complex multi-phase work where independent validation prevents blind spots

## Role Assignment

The specific agents filling Tech Lead / Executor / Reviewer roles vary by command and phase.
Each command's `:team` variant file is the **sole authority** for role assignments.
See `commands/{cmd}/team.md` for the mapping used by each command.
