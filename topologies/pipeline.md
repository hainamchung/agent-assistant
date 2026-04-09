---
schema-version: "1.0"
name: pipeline
description: Sequential phase execution — the default topology
status: active
---

# Pipeline Topology

> Sequential phase execution — the default.

## Semantics

Phases execute one at a time in declared order. Each phase's output becomes input to the next.

## Execution Steps

1. Start Phase 1 → assign agent → execute → verify exit criteria
2. Phase 1 output becomes immutable context (L8)
3. Start Phase 2 → agent reads Phase 1 output → execute → verify
4. Repeat until all phases complete
5. Deliver final result

## When to Use

- Most workflows (default)
- Clear sequential dependencies between phases
- When phase N output informs phase N+1

## When NOT to Use

- Tasks with independent, parallelizable subtasks → use `fan-out`
- Multi-domain work requiring different expertise per branch → use `hierarchical`
- Review/debate workflows requiring back-and-forth → use `golden-triangle`

## Error Handling

- **Phase fails exit criteria**: Retry same phase (max 2 retries) before escalating to user
- **Agent produces no output**: Treat as phase failure — invoke fallback agent per RUNTIME.md §Degradation
- **Context overflow mid-pipeline**: Compress prior phase outputs per CONTEXT-COMPRESSION.md, then continue

## Retry Behavior

- Max **2 retries per phase** with the same agent
- On 3rd failure: escalate to user with diagnostic context
- Each retry MUST include the previous failure reason as input

## Command Frontmatter

```yaml
topology: pipeline  # or omit — pipeline is the default
```
