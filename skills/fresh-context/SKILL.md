---
name: fresh-context
description: "Subagent context isolation pattern for quality maintenance. Use when dispatching subagents to prevent context pollution and maintain consistent quality throughout session."
---

# Fresh Context Subagent Pattern

**Problem**: Context rot degrades quality as session accumulates history.

**Solution**: Fresh isolated context per subagent dispatch.

---

## When to Use

```
Dispatching subagent for implementation task?
        ↓ YES
FRESH CONTEXT PROTOCOL ← APPLY
```

**Use when:**
- Implementation tasks requiring isolated focus
- Multi-file changes where context pollution risk exists
- Quality-critical tasks requiring consistent reasoning
- Tasks where parent session history could mislead

**Don't use when:**
- Simple single-file edits (copy, rename, trivial changes)
- Quick lookups (read-only, no implementation)
- Context-independent tasks (no dependencies on session state)

---

## Context Budget

| Task Type | Thinking Budget | Context Budget | Purpose |
|-----------|-----------------|---------------|---------|
| Implementation | ~20k tokens | ~200k tokens | Pure code generation |
| Review | ~15k tokens | ~50k tokens | Focused quality check |
| Research | ~10k tokens | ~100k tokens | Investigation tasks |
| Debug | ~15k tokens | ~80k tokens | Root cause analysis |

---

## Dispatch Protocol

### Pre-Dispatch Checklist

> **Canonical reference**: See `rules/AGENTS.md` — **DELEGATION QUALITY CHECKLIST**
>
> This is the authoritative checklist. For quick reference:
> ```
> □ Is runSubagent/Agent tool available? → TIER 1 (MANDATORY)
> □ Task complexity assessed? → Simple/Standard/Complex
> □ Specific file/directory boundaries assigned?
> □ Acceptance criteria explicit in spawn prompt?
> □ Subagent has MINIMAL context (not everything)?
> □ Reviewer is DIFFERENT from executor?
> □ File ownership is EXCLUSIVE (no conflicts)?
> □ Wave grouping planned if multiple parallel tasks?
> □ Token budget estimated for this phase?
> □ Mailbox path confirmed and writable?
> □ Confidence self-assessment completed?
> ```

### Context Block Template

```markdown
## SUBAGENT DISPATCH: {task_name}

### ISOLATED CONTEXT
{self-contained task description — what to do, NOT why}

### TARGET FILES
{file paths — exact locations to modify}

### ACCEPTANCE CRITERIA
1. {criterion_1 — verifiable outcome}
2. {criterion_2}
3. {criterion_n}

### CONTEXT ISOLATION
- NO parent session history
- NO previous attempts
- NO reasoning traces
- NO failed attempts
- Fresh context ONLY

### VERIFICATION STEPS
{how to verify task completion}
```

### Post-Dispatch Verification

```
□ Task completed within budget?
□ Context not polluted by parent session?
□ Quality maintained at consistent level?
□ Isolation protocol followed?
```

---

## Fresh-Context Implementation Pattern

### In Skills/Commands

When dispatching subagents, ALWAYS follow this pattern:

```markdown
## SUBAGENT DISPATCH

### Context Isolation
[TECH LEAD INSTRUCTION]
When spawning this subagent:
1. Create NEW context block (do not inherit parent)
2. Include ONLY: task, files, acceptance criteria
3. Exclude: session history, reasoning, attempts

### Task Requirements
{task description}

### Target Files
{file list}

### Acceptance Criteria
{checklist}
```

### In Agent Definitions

```yaml
---
name: executor
description: "Implementation agent with fresh context isolation"
context_rules:
  isolation: mandatory
  max_history: 0  # No parent history
  budget: 200k tokens
---
```

---

## Context Budget Enforcement

### Thinking Token Limits

| Tier | Model | Thinking Budget | Compaction Threshold |
|------|-------|-----------------|---------------------|
| A (Capable) | Opus-class | 20,000 | 60% |
| B (Standard) | Sonnet-class | 10,000 | 50% |
| C (Fast) | Haiku-class | 5,000 | 40% |

### Per-Phase Budget Allocation

```
TOTAL THINKING BUDGET: {tier_budget}

Allocation:
├── Requirements capture: 10%
├── Implementation: 60%
├── Review: 20%
└── Buffer: 10%
```

### Budget Tracking

```markdown
## TOKEN BUDGET TRACKING

Task: {task_name}
Tier: {tier}
Budget: {tokens}
Used: {tokens}
Remaining: {tokens}
Status: WITHIN BUDGET / OVER BUDGET

If OVER BUDGET:
□ Compact context
□ Request budget increase
□ Defer low-priority requirements
```

---

## Anti-Patterns to Avoid

### ❌ CONTEXT POLLUTION

```markdown
BAD: "Based on our previous discussion about X..."
     "As we tried before in the session..."
     "Recall that the bug was caused by Y..."

GOOD: "Task requires fixing Z in file X"
      "Acceptance criteria: Z must work when..."
      "Test verification: run X and confirm Y"
```

### ❌ EXCESSIVE CONTEXT

```markdown
BAD: "The entire codebase history, all failed attempts, 
      every file ever touched, complete session transcript..."

GOOD: "Fix bug in auth/token.ts — validate JWT expiration"
      "Test: POST /api/auth/login with expired token → 401"
```

### ❌ NO ACCEPTANCE CRITERIA

```markdown
BAD: "Implement the feature" (vague)

GOOD: "Implement user registration:
       1. POST /api/users with email/password
       2. Return 201 with user object
       3. Validate email format, password min 8 chars
       4. Hash password with bcrypt
       5. Test: create user → verify password hashed"
```

---

## Integration with Other Skills

### With wave-execution

When dispatching parallel tasks:
```
Wave 1 tasks dispatch with FRESH CONTEXT
├── Task 1.1: fresh context → executor
├── Task 1.2: fresh context → executor
└── Task 1.3: fresh context → executor
```

### With safety-guardrails

When debugging with freeze active:
```
Fresh context + restricted scope = safe implementation
```

---

## Quality Metrics

| Metric | Target | Measurement |
|--------|--------|------------|
| Context isolation | 100% | No parent history in dispatch |
| Budget adherence | <100% | Token usage per task |
| Quality consistency | Stable | Output quality across session |
| Context pollution | 0 incidents | Review findings |

---

## Success Criteria

- [ ] Context isolation protocol documented
- [ ] Token budgets configured per tier
- [ ] Dispatch template implemented
- [ ] Anti-patterns avoided
- [ ] Quality metrics tracked
- [ ] Integration with wave-execution verified

---

## DELEGATION QUALITY CHECKLIST

See `rules/AGENTS.md § DELEGATION QUALITY CHECKLIST` for the canonical 14-item checklist.

This skill follows that canonical checklist. Key highlights:
- Tool discovery: TIER 1 mandatory
- File ownership: exclusive per agent
- Context: minimal, not everything
- Reviewer: different from executor
- Token budget: per-phase estimates
