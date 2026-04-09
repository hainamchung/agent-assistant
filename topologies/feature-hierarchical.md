---
schema-version: "1.0"
name: feature-hierarchical
description: Full-stack feature build with tech-lead coordination (tech-lead → backend + frontend + database)
status: active
---

# Full-Stack Feature Build — Hierarchical

> Template for multi-domain feature implementation with lead coordination. Based on `hierarchical.md`.

## Agent Slots

| Phase | Agent | Role |
|-------|-------|------|
| 1 | tech-lead | Decompose feature, define interfaces, coordinate |
| 2a | backend-engineer | API and business logic implementation |
| 2b | frontend-engineer | UI components and client-side logic |
| 2c | database-architect | Schema design and data layer |
| 3 | tech-lead | Integration review, conflict resolution, final assembly |

## Phase Structure

### Phase 1: Decomposition & Interface Design
- Entry: Feature spec or user story provided
- Agent: tech-lead
- Exit: Task breakdown with interface contracts (API schemas, data models, component specs)

### Phase 2a: Backend Implementation
- Entry: Phase 1 task breakdown + API contracts
- Agent: backend-engineer
- Exit: API endpoints, business logic, and service layer implemented

### Phase 2b: Frontend Implementation
- Entry: Phase 1 task breakdown + component specs + API contracts
- Agent: frontend-engineer
- Exit: UI components, state management, and API integration implemented

### Phase 2c: Database Layer
- Entry: Phase 1 task breakdown + data models
- Agent: database-architect
- Exit: Schema migrations, queries, and data access layer implemented

### Phase 3: Integration & Assembly
- Entry: All Phase 2 outputs
- Agent: tech-lead
- Exit: Integrated feature with cross-layer consistency verified

## Exit Criteria

- [ ] All sub-tasks from Phase 1 decomposition completed
- [ ] Interface contracts honored across all layers
- [ ] No integration conflicts between backend, frontend, and database
- [ ] Tech-lead has verified end-to-end feature coherence

## Command Frontmatter

```yaml
topology: hierarchical
topology_template: feature-hierarchical
```
