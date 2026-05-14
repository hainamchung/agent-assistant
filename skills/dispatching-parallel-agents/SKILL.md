---
name: dispatching-parallel-agents
description: "Dispatch multiple specialized agents in parallel for independent tasks. Use when 3+ independent problems can be solved simultaneously."
---

# Dispatching Parallel Agents

When you have multiple unrelated tasks (different test files, different subsystems, different bugs), investigating them sequentially wastes time. Each investigation is independent and can happen in parallel.

**Core principle:** Dispatch one agent per independent problem domain. Let them work concurrently.

## When to Use

```
Multiple independent tasks?
        ↓ YES
Dispatch in parallel (3+ domains)
```

**Use when:**
- 3+ test files failing with different root causes
- Multiple subsystems broken independently
- Each problem can be understood without context from others
- No shared state between investigations

**Don't use when:**
- Failures are related (fix one might fix others)
- Need to understand full system state
- Agents would interfere with each other

## The Pattern

### 1. Identify Independent Domains

Group tasks by what's broken:
- File A: Authentication logic
- File B: Data persistence
- File C: API integration

Each domain is independent.

### 2. Create Focused Agent Tasks

Each agent gets:
- **Specific scope:** One test file or subsystem
- **Clear goal:** What to accomplish
- **Constraints:** What NOT to change
- **Expected output:** What to return

### 3. Dispatch in Parallel

```markdown
Agent 1 → Fix authentication tests
Agent 2 → Fix persistence tests
Agent 3 → Fix API integration tests
// All run concurrently
```

### 4. Review and Integrate

When agents return:
- Read each summary
- Verify fixes don't conflict
- Run full test suite
- Integrate all changes

## Agent Prompt Structure

Good agent prompts are:

1. **Focused** - One clear problem domain
2. **Self-contained** - All context needed to understand the problem
3. **Specific about output** - What should the agent return?

```markdown
Fix the failing tests in src/features/auth/test.ts:

1. "should authenticate valid users" - expects token in response
2. "should reject invalid credentials" - returns 200 instead of 401
3. "should handle expired tokens" - throws uncaught exception

These are logic errors in the auth handler. Your task:

1. Read the test file and understand what each test verifies
2. Identify root cause - logic errors or test errors?
3. Fix by:
   - Correcting auth handler logic if buggy
   - Fixing test expectations if testing changed behavior

Return: Summary of what you found and what you fixed.
```

## Common Mistakes

| Mistake | Problem | Solution |
|---------|---------|----------|
| Too broad | Agent gets lost | Narrow scope |
| No context | Agent doesn't know where | Include error messages, test names |
| No constraints | Agent might refactor everything | Explicit constraints |
| Vague output | Don't know what changed | Specific return format |

## When NOT to Use

- **Related failures:** Fixing one might fix others - investigate together first
- **Need full context:** Understanding requires seeing entire system
- **Exploratory debugging:** You don't know what's broken yet
- **Shared state:** Agents would interfere (editing same files)

## Verification

After agents return:
1. Review each summary - Understand what changed
2. Check for conflicts - Did agents edit same code?
3. Run full suite - Verify all fixes work together
4. Spot check - Agents can make systematic errors

## Key Benefits

1. **Parallelization** - Multiple investigations happen simultaneously
2. **Focus** - Each agent has narrow scope, less context to track
3. **Independence** - Agents don't interfere with each other
4. **Speed** - 3 problems solved in time of 1

## Real-World Impact

From debugging sessions:
- 6 failures across 3 files
- 3 agents dispatched in parallel
- All investigations completed concurrently
- All fixes integrated successfully
- Zero conflicts between agent changes
