---
schema-version: "1.0"
name: hierarchical
description: Lead delegates to sub-leads who delegate to specialists
status: active
---

# Hierarchical Topology

> Lead delegates to sub-leads who delegate to specialists.

## Semantics

A "lead" agent decomposes the top-level task into sub-tasks. Each sub-task is delegated to a specialist (may use HANDOFF directive). Specialists may further decompose (max 2 levels). Results bubble upward.

## Execution Steps

1. Lead receives full task
2. Lead decomposes into N sub-tasks
3. Lead delegates each sub-task to specialist (via HANDOFF or orchestrator routing)
4. Specialists execute — may further decompose to max depth 2
5. Specialist results returned to lead
6. Lead synthesizes final output

## When to Use

- Large multi-domain features (backend + frontend + database)
- Tasks requiring different expertise areas
- When a single agent can't cover all required domains

## Command Frontmatter

```yaml
topology: hierarchical
```

## When NOT to Use

- Simple single-domain tasks → use `pipeline`
- Fully independent subtasks → use `fan-out` (avoids coordination overhead)
- Tasks where all specialists need equal authority → use `golden-triangle`

## Error Handling

- **Specialist fails**: Lead receives failure context and may reassign to different specialist
- **Sub-specialist fails**: Parent specialist handles retry before escalating to lead
- **Lead fails to synthesize**: Escalate to user with all specialist outputs attached

## Retry Behavior

- Specialists: max **2 retries** before escalating to lead
- Sub-specialists: max **1 retry** before escalating to parent specialist
- Lead synthesis: max **1 retry** — if still fails, deliver raw specialist outputs

## Max Depth

2 levels of delegation (lead → specialist → sub-specialist). Prevents unbounded recursion.
