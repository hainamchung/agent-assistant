---
name: subagent-driven-development
description: "Execute implementation plans with fresh subagent per task + two-stage review (spec compliance then code quality). Use when implementing multi-task plans with independent tasks."
---

# Subagent-Driven Development

Execute plan by dispatching fresh subagent per task, with two-stage review after each: spec compliance review first, then code quality review.

**Why subagents:** You delegate tasks to specialized agents with isolated context. By precisely crafting their instructions and context, you ensure they stay focused and succeed at their task. They should never inherit your session's context or history.

**Core principle:** Fresh subagent per task + two-stage review (spec then quality) = high quality, fast iteration

## When to Use

```
Have implementation plan?
        ↓
Tasks mostly independent?
        ↓
subagent-driven-development ← YES to both
```

**vs. Manual execution:**
- Subagents follow TDD naturally
- Fresh context per task (no confusion)
- Review checkpoints automatic

## Model Selection

Use the least powerful model that can handle each role:

| Task Type | Model | Examples |
|-----------|-------|----------|
| Mechanical | Cheap/Fast | Isolated functions, clear specs, 1-2 files |
| Standard | Standard | Multi-file coordination, pattern matching |
| Architecture | Capable | Design judgment, broad codebase understanding |

**Task complexity signals:**
- Touches 1-2 files with complete spec → cheap model
- Touches multiple files with integration → standard model
- Requires design judgment → most capable model

## The Process

```
Per Task:
1. Dispatch implementer subagent
2. Implementer asks questions? → Answer + re-dispatch
3. Implementer implements, tests, commits, self-reviews
4. Dispatch spec compliance reviewer
5. Spec reviewer approves? → NO → Implementer fixes → re-review
6. Dispatch code quality reviewer
7. Code reviewer approves? → NO → Implementer fixes → re-review
8. Mark task complete

After all tasks:
- Dispatch final code reviewer
- Use finishing-a-development-branch
```

## Implementer Status

**DONE:** Proceed to spec compliance review.

**DONE_WITH_CONCERNS:** Read concerns. If correctness/scope issues, address before review.

**NEEDS_CONTEXT:** Provide missing context and re-dispatch.

**BLOCKED:** Assess blocker:
1. Context problem → provide more context, re-dispatch
2. Needs more reasoning → re-dispatch with capable model
3. Task too large → break into smaller pieces
4. Plan wrong → escalate to human

## Two-Stage Review

### Stage 1: Spec Compliance Review

Verify implementation matches specification:
- All requirements met?
- Nothing extra added?
- Scope creep?
- Edge cases handled?

### Stage 2: Code Quality Review

Verify implementation quality:
- Naming, structure, DRY?
- Security concerns?
- Performance issues?
- Error handling?

## Status Reporting

After each subagent task, report:

```markdown
## Status: [DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED]
**Task:** {task ID}
**Summary:** {what was done}
**Concerns:** {if any}
**Blocked by:** {if blocked}
```

## Red Flags

**Never:**
- Start implementation without design approval
- Skip spec compliance review
- Skip code quality review
- Proceed with unfixed issues
- Dispatch multiple implementers in parallel
- Start code quality review before spec compliance passes
- Ignore subagent questions

## Integration

Use with:
- `/cook:team` — For building features
- `/plan:team` — For creating plans to execute
- `brainstorming` skill — For design approval before implementation
