# SLA and Handoffs

> **Purpose**: Timing expectations, handoff contracts, and SLA/SLO context for workflows.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## SLA Context

Agent Assistant operates within AI model sessions — there are no traditional server-side SLAs. Timing expectations are relative to model session context and platform capabilities, not wall-clock guarantees.

### Session-Level Expectations

| Aspect | Expectation | Constraint |
|--------|-------------|------------|
| Single phase execution | Within one model turn | Platform context window limit |
| Full :fast workflow | 2-3 model turns | Minimal phase count |
| Full :hard workflow | 5-8 model turns | Full phase sequence |
| Full :team workflow | 10-20+ model turns | Golden Triangle debate rounds |
| Checkpoint TTL | 24 hours | After TTL, checkpoint is stale and pruned |
| Context decay detection | Continuous | Soft refresh at ~200 tokens; hard refresh at ~500-800 tokens |

### Quality SLOs (Internal)

| SLO | Target | Measurement |
|-----|--------|-------------|
| Agent lint pass rate | 100% | `lint-agents.js` in CI |
| Simulation pass rate | 100% | `simulate.js` in CI |
| Entry point drift | 0 | `lint:drift` in CI |
| RUNTIME.md word budget | ≤ 3200 words | `npm run wordcount` |
| Trust hash integrity | 100% pass | `trust:verify` in CI |

---

## Handoff Contracts

### Orchestrator → Agent Handoff

| Attribute | Contract |
|-----------|----------|
| **What is passed** | Phase assignment, scope, constraints, prior phase deliverables (immutable) |
| **Protocol** | EMBODY: orchestrator reads agent file, follows directive. SUB-AGENT: isolated context briefing. |
| **Immutability** | Prior deliverables cannot be modified (L8 escape: factual errors only) |
| **Exit** | Agent produces deliverable meeting exit criteria; control returns to orchestrator |

### Agent → Agent Handoff (via Orchestrator)

Agents do not communicate directly. All handoffs are mediated by the orchestrator.

| Attribute | Contract |
|-----------|----------|
| **Routing** | Agent can only handoff to agents in its `handoffs` list |
| **Data** | Prior agent's deliverable becomes input for next agent |
| **Validation** | `simulate.js` validates handoff graph connectivity |
| **Constraint** | No circular handoffs; orchestrator enforces sequential progression |

### Golden Triangle Handoff Protocol

Within :team variants, the Golden Triangle has a structured handoff cycle:

```
Tech Lead → Executor (task assignment)
Executor → Reviewer (work submission)
Reviewer → Executor (findings / request for changes)
Executor → Tech Lead (escalation if disagreement)
Tech Lead → Final (arbitrated decision)
```

**Communication Channel**: Append-only mailbox at `reports/{topic}/MAILBOX-{date}.md`

| Mailbox Rule | Description |
|-------------|-------------|
| Append-only | Messages cannot be edited or deleted |
| Traceable | Each message has sender, timestamp, content |
| Complete | Final decision recorded with rationale |

### Phase-to-Phase Handoff

| From Phase | To Phase | Handoff Content |
|------------|----------|-----------------|
| Reconnaissance | Planning/Structuring | Evidence report with file references |
| Planning | Implementation | Task plan with agent assignments and acceptance criteria |
| Implementation | Review | Working code with test results |
| Review | Delivery | Review report with pass/fail stamps |

---

## Handoff Compression

For large handoff payloads, the framework supports compression tiers:

| Tier | Compression | Use Case |
|------|-------------|----------|
| Minimal | ~70% reduction | Cross-phase within simple workflows |
| Standard | ~40% reduction | Default for most handoffs |
| Full | 0% (no compression) | Critical handoffs where nothing can be lost |

**Rule**: CRITICAL information is always preserved regardless of compression tier.

---

## Timing Constraints

| Constraint | Value | Enforcement |
|------------|-------|-------------|
| Phase ordering | Sequential (L5) | Orchestrator blocks phase N+1 until phase N exit criteria met |
| Checkpoint expiry | 24 hours TTL | `checkpoint-manager.js prune` removes stale checkpoints |
| Context window | Platform-specific | Context decay detection + tiered loading |
| CI pipeline | Per-commit | Blocks merge on failure; no manual override |

## Evidence Sources

- [rules/RUNTIME.md](../../../rules/RUNTIME.md) — Phase ordering, handoff protocol
- [rules/HANDOFF-COMPRESSION.md](../../../rules/HANDOFF-COMPRESSION.md) — Compression tiers
- [rules/DURABLE-EXECUTION.md](../../../rules/DURABLE-EXECUTION.md) — Checkpoint TTL
- [rules/CONTEXT-DECAY.md](../../../rules/CONTEXT-DECAY.md) — Context refresh thresholds
- [topologies/golden-triangle.md](../../../topologies/golden-triangle.md) — Golden Triangle communication
