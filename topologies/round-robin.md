---
schema-version: "1.0"
name: round-robin
description: Rotating assignment of tasks across agents
status: documented
---

# Round-Robin Topology

> Rotating assignment of tasks across agents.

## Status: DOCUMENTED (not in RUNTIME.md dispatch rules)

This topology is documented for reference but not yet active in RUNTIME.md dispatch rules. It requires cross-platform validation before activation.

## Semantics

Tasks are assigned to agents in rotation order. Each agent gets tasks in turn, distributing workload evenly.

## When to Use

- Distributing code review across multiple reviewers
- Load balancing parallel analysis tasks
- Getting diverse perspectives on the same artifact

## Execution Steps

1. Define the agent rotation order (e.g., agent-A → agent-B → agent-C)
2. Assign the first task to the first agent in rotation
3. For each subsequent task, advance to the next agent in order
4. After the last agent, cycle back to the first (round-robin wrap)
5. In EMBODY Execution: orchestrator EMBODIES each agent in rotation order
6. In Sub-agent Execution: dispatch each task to the next agent in rotation
7. Collect all results and synthesize

## Activation Criteria

- Validated on 3+ platforms
- Clear rotation semantics for EMBODY Execution
- Added to RUNTIME.md §COMMAND ROUTING Topology Dispatch table
