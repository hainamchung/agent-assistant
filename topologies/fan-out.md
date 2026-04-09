---
schema-version: "1.0"
name: fan-out
description: Parallel dispatch of independent tasks with result synthesis
status: active
---

# Fan-Out Topology

> Parallel dispatch of independent tasks.

## Semantics

Orchestrator identifies N independent tasks from the workflow. Each task is assigned to an agent. Tasks execute without results dependency. After all complete, results are synthesized.

## Execution Steps

1. Decompose workflow into N independent tasks
2. Assign each task to an agent (may be same or different agents)
3. In EMBODY Execution: execute tasks sequentially but independently
4. In Sub-agent Execution: dispatch as parallel sub-agents
5. Collect all results
6. Synthesize into unified output

## When to Use

- Parallel research on multiple topics
- Concurrent file analysis
- Independent subtasks with no cross-dependency

## When NOT to Use

- Tasks with sequential dependencies (output of A feeds B) → use `pipeline`
- Subtasks requiring shared mutable state or coordination → use `hierarchical`
- Fewer than 2 independent tasks (overhead not justified)

## Error Handling

- **One task fails**: Other tasks continue. Failed task result marked as `FAILED` in synthesis
- **Majority of tasks fail**: Abort remaining, escalate to user
- **Synthesis conflict**: If task results contradict, flag conflicts and let orchestrator resolve

## Retry Behavior

- Failed tasks retry independently (max **1 retry per task**)
- Retry does NOT block other tasks
- If retry also fails: include partial result with `[INCOMPLETE]` marker in synthesis

## Command Frontmatter

```yaml
topology: fan-out
```

## Example

Research 3 competing libraries:
- Task A: researcher analyzes Library X
- Task B: researcher analyzes Library Y
- Task C: researcher analyzes Library Z
- Synthesis: compare findings, recommend
