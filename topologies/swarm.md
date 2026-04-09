---
schema-version: "1.0"
name: swarm
description: Autonomous self-organization of agents
status: documented
---

# Swarm Topology

> Autonomous self-organization of agents.

## Status: DOCUMENTED (not in RUNTIME.md dispatch rules)

This topology is documented for reference but not yet active in RUNTIME.md dispatch rules. It requires significant cross-platform validation due to high LLM interpretation complexity.

## Semantics

Agents autonomously claim and work on tasks from a shared task pool. Self-organization with minimal orchestrator intervention.

## When to Use

- Creative exploration and brainstorming
- Tasks where diverse, unstructured approaches are valuable
- When rigid phase ordering is counterproductive

## Execution Steps

1. Define a shared task pool with all pending work items
2. Each agent autonomously claims a task from the pool
3. Agent executes the claimed task independently
4. On completion, agent returns result and claims next available task
5. If task fails or agent is blocked, task returns to the pool for re-claiming
6. Continue until task pool is empty or convergence criteria are met
7. Orchestrator collects all results and synthesizes final output

## Activation Criteria

- Validated on 3+ platforms with consistent behavior
- Shared task pool mechanism defined
- Conflict resolution for task claiming
- Added to RUNTIME.md §COMMAND ROUTING Topology Dispatch table
