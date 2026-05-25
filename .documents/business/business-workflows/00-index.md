# Business Workflows — Workflow System and Actor Map

> **Folder**: `.documents/business/business-workflows/`
> **Purpose**: Complete workflow catalogue, actor definitions, decision rules, and SLA definitions
> **Audience**: Developers, operations teams, QA, and process designers

---

## Summary

The **Agent Assistant Workflow System** defines how work moves through the orchestration framework. Workflows are the operational manifestation of features — they describe the step-by-step processes by which agents collaborate to accomplish user goals.

The workflow system encompasses 20 workflows organized into four categories: Build Workflows (feature creation), Quality Workflows (testing and review), Planning Workflows (strategy and estimation), and Support Workflows (deployment, documentation, reporting). Each workflow specifies its triggering conditions, expected outcomes, agent participation, and failure handling.

The actor map identifies 16 distinct roles that interact with the system, from end-users invoking commands through the orchestrator to specialized agents performing implementation, validation, and coordination tasks. Understanding actor boundaries and handoff points is essential for designing reliable workflows.

---

## Sub-Files

| File | Title | Purpose | Read Order |
|------|-------|---------|------------|
| `00-index.md` | Business Workflows Index | This index — navigation and overview | 0 |
| `01-actor-map.md` | Actor Map | 16 actors with responsibilities and touchpoints | 1 |
| `02-workflow-catalog.md` | Workflow Catalogue | All 20 workflows with triggers and outcomes | 2 |
| `03-detailed-workflows.md` | Detailed Workflows | Step-by-step flows for all commands | 3 |
| `04-decision-rules-and-exceptions.md` | Decision Rules and Exceptions | 60+ business rules, exception handling | 4 |
| `05-sla-and-handoffs.md` | SLA and Handoffs | SLA definitions, handoff contracts, escalation | 5 |

---

## Quick Facts

| Attribute | Value |
|-----------|-------|
| **Total Workflows** | 20 |
| **Total Actors** | 16 |
| **Workflow Categories** | 4 |
| **Business Rules** | 60+ |
| **SLA Definitions** | 20+ |

---

## Workflow Categories

| Category | Count | Description |
|----------|-------|-------------|
| Build | 5 | /cook, /code, /fix, /design, /brainstorm |
| Quality | 4 | /test, /review, /debug, /security |
| Planning | 4 | /plan, /ask, /report, /docs |
| Support | 7 | /deploy, /wiki, CLI operations, Installation |

---

## Actor Categories

| Category | Count | Examples |
|----------|-------|----------|
| Meta | 2 | Orchestrator, Tech Lead |
| Execution | 4 | Backend Engineer, Frontend Engineer, Mobile Engineer, Game Engineer |
| Validation | 4 | Tester, Reviewer, Debugger, Security Engineer |
| Research | 3 | Researcher, Scouter, Designer |
| Support | 3 | Docs Manager, DevOps Engineer, Reporter |

---

## Cross-References

| Reference | Destination | When to Read |
|-----------|-------------|--------------|
| Features | `../business-features/00-index.md` | Understanding capability requirements |
| Glossary | `../business-glossary/00-index.md` | Understanding workflow terminology |
| Architecture | `../../knowledge-architecture/00-index.md` | Technical workflow implementation |
| Phases | `../../knowledge-architecture/03-data-flow.md` | Phase execution details |

---

## Known Gaps

| Gap | Status | Notes |
|-----|--------|-------|
| Real-time monitoring | Planned | Workflow execution observability |
| Workflow analytics | Future | Performance trending |
| Custom workflow templates | Future | User-defined workflow patterns |

---

## Evidence Sources

The content in this folder was derived from:

- `rules/CORE.md` — Orchestration laws and execution loop
- `rules/AGENTS.md` — Agent categories and team definitions
- `rules/TEAMS.md` — Golden Triangle communication protocol
- `rules/PHASES.md` — Phase execution and output formats
- `commands/` — Command workflow definitions
- `agents/` — Agent role definitions
