# Domain Entities and Events

> **Purpose**: Entity and event vocabulary with meaning boundaries.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Domain Entities

| Entity | Storage Format | Instance Count | Primary Key | Lifecycle |
|--------|---------------|----------------|-------------|-----------|
| **Agent** | Markdown + YAML frontmatter | 21 | `name` field | Static — defined once, updated via PR |
| **Command** | Markdown router + variant files | 17 routers, 50+ variants | command name | Static — defined once, extended via PR |
| **Topology** | Markdown | 12 | filename | Static |
| **Skill (Matrix)** | YAML entries in domain registries | 1430 | skill name | Static — added via registry update |
| **Skill (Library)** | Directory with SKILL.md | 1400+ | directory name | Static — added via PR |
| **Guardrail** | Markdown | 7 | filename | Static |
| **Rule** | Markdown | 41 | filename | Static — updated via PR |
| **Team** | Directory with role files | 17 | directory name | Static |
| **Persona** | YAML | 4 | filename | Static |
| **Platform** | JSON entry in platforms.json | 6 | platform key | Static |

### Entity Relationships

```
Agent ──handoffs──→ Agent (directed graph)
Agent ──guardrails──→ Guardrail (references)
Agent ──profile──→ Skill (resolved by HSOL)
Agent ──belongs to──→ Team (optional)
Command ──assigns──→ Agent (per phase)
Command ──uses──→ Topology (coordination pattern)
Team ──uses──→ Topology (golden-triangle)
Platform ──loads──→ Entry Point (boot file)
Entry Point ──references──→ Rule (RUNTIME.md)
```

### Meaning Boundaries

| Entity | Is | Is NOT |
|--------|----|--------|
| Agent | A behavioral definition with constraints | A running process or service |
| Command | A workflow routing entry point | A shell command or API endpoint |
| Topology | A coordination pattern template | A running execution instance |
| Skill | A domain expertise definition | Executable code or a library |
| Guardrail | A constraint specification | A runtime enforcement mechanism |

---

## Domain Events

Events in Agent Assistant are conceptual workflow state transitions, not pub/sub events.

| Event | Trigger | Producer | Consumer | Effect |
|-------|---------|----------|----------|--------|
| **CommandReceived** | User invokes command or NL | User | Orchestrator | Route to command variant, begin workflow |
| **PhaseStarted** | Prior phase completed or workflow beginning | Orchestrator | Agent | Agent executes assigned work |
| **PhaseCompleted** | Exit criteria met | Agent | Orchestrator | Proceed to next phase or deliver |
| **ReviewSubmitted** | Reviewer produces findings | Reviewer (agent) | Orchestrator/Executor | Accept, fix, or arbitrate |
| **D4SecurityFinding** | Critical security issue found | Reviewer/Security-engineer | Orchestrator | Block deliverable, escalate |
| **CheckpointSaved** | Phase boundary reached in durable workflow | Orchestrator | Filesystem | Checkpoint JSON persisted |
| **WorkflowCompleted** | All phases finished, deliverable synthesized | Orchestrator | User | Final deliverable presented |
| **InstallCompleted** | CLI install finishes | CLI | Filesystem/User | Framework files written, summary displayed |

### Event Ordering (Typical Workflow)

```
CommandReceived
  → PhaseStarted (Phase 1)
    → PhaseCompleted (Phase 1)
      → [CheckpointSaved] (optional)
  → PhaseStarted (Phase 2)
    → PhaseCompleted (Phase 2)
  → ...
  → PhaseStarted (Review)
    → ReviewSubmitted
      → [D4SecurityFinding] (if critical)
    → PhaseCompleted (Review)
  → WorkflowCompleted
```

## Evidence Sources

- [knowledge-domain/01-entities.md](../../knowledge-domain/01-entities.md) — Technical entity definitions
- [knowledge-domain/03-api-contracts.md](../../knowledge-domain/03-api-contracts.md) — Inter-component contracts
- [rules/RUNTIME.md](../../../rules/RUNTIME.md) — Phase execution model
- [rules/DURABLE-EXECUTION.md](../../../rules/DURABLE-EXECUTION.md) — Checkpoint events
