# Business Workflows

> **Purpose**: Actor map, workflow catalog, detailed workflows, decision rules, and SLA/handoff contracts for Agent Assistant.
> **Sub-files**: 5
> **Last Updated**: 2026-04-09

## Quick Summary

Agent Assistant workflows are command-driven, phase-sequential interactions between developers and the orchestrator. The developer invokes a command (explicitly via `/command` or implicitly via natural language), the orchestrator loads the appropriate workflow variant, and delegates each phase to a specialist agent. Workflows vary in depth — :fast for minimal phases, :hard for full analysis, :team for adversarial Golden Triangle collaboration.

The system defines 10 primary business workflows spanning feature building, bug fixing, testing, code review, documentation generation, deployment, planning, framework installation, community contribution, and orchestrated execution. Each workflow has clear triggers, actors, outcomes, and exception handling paths.

## Sub-Files

| File | Description |
|------|-------------|
| [01-actor-map.md](./01-actor-map.md) | Actor definitions, responsibilities, and boundaries |
| [02-workflow-catalog.md](./02-workflow-catalog.md) | Workflow inventory with trigger/outcome |
| [03-detailed-workflows.md](./03-detailed-workflows.md) | Step-by-step flows with decision points |
| [04-decision-rules-and-exceptions.md](./04-decision-rules-and-exceptions.md) | Business rules, exceptions, and fallback paths |
| [05-sla-and-handoffs.md](./05-sla-and-handoffs.md) | Timing expectations, handoff contracts, SLA context |

## Key Facts

| Key | Value |
|-----|-------|
| Primary Workflows | 10 |
| Execution Modes | 3 (:fast, :hard, :team) |
| Command Routers | 17 |
| Workflow Variants | 50+ |
| Agent Categories | 6 (execution, meta, investigation, validation, research, support) |

## Cross-References

- [business-features](../business-features/00-index.md) — Features that workflows execute
- [business-prd](../business-prd/00-index.md) — Requirements driving workflow design
- [knowledge-architecture/03-data-flow.md](../../knowledge-architecture/03-data-flow.md) — System-level data flow
- [knowledge-domain/04-business-rules.md](../../knowledge-domain/04-business-rules.md) — Rules enforced during workflows

## Known Gaps and Open Questions

- Workflow timing metrics are not measured — no telemetry for phase duration or total workflow time
- Error recovery paths are documented at protocol level but not validated via automated regression tests
- The :team variant mailbox protocol produces audit trails, but no tooling exists to analyze them
