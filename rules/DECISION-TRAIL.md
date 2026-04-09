---
schema-version: "1.0"
name: decision-trail
description: Lightweight decision audit trail format for team workflow transparency
category: meta
---

# Decision Audit Trail

## Purpose
Provides a lightweight, inline format for recording significant decisions during multi-agent workflows.
Loaded via RUNTIME.md §LOAD ON DEMAND → "Decision auditing".

Unlike full ADRs (which live in reports/), decision trails are embedded inline within deliverable files to maintain context adjacency.

## When to Record

Record a decision trail entry when:
1. Choosing between 2+ viable alternatives
2. Overriding a default behavior or convention
3. Deferring a feature or requirement to a later sprint
4. Accepting a known risk or trade-off
5. Disagreeing with a reviewer finding (and proceeding anyway)

Do NOT record:
- Obvious or uncontested choices
- Implementation details with only one reasonable approach
- Conformance to existing established conventions
- Minor editorial or formatting changes
- Reverting to a previous state without new analysis

## Decision Trail Format

### Inline Format (within deliverable files)
```
> 📋 DECISION: {title}
> **Context**: {why this decision was needed — 1-2 sentences}
> **Options**: {A vs B vs C — brief}
> **Chosen**: {selected option}
> **Rationale**: {why — 1-2 sentences}
> **Trade-off**: {what was sacrificed — explicit}
> **Reversibility**: {easy | medium | hard}
```

### Example 1: Architecture Choice
```
> 📋 DECISION: Extraction target for budget recovery
> **Context**: Need to remove ~300 words from RUNTIME.md. Multiple sections eligible.
> **Options**: A) Extract Agent Categories table | B) Extract Context Briefing Template | C) Extract FORBIDDEN patterns
> **Chosen**: A (Agent Categories table — 131 words, largest single extraction)
> **Rationale**: Highest word-count reduction per extraction. Referenced infrequently at runtime.
> **Trade-off**: REFERENCE.md grows; agents must load on-demand for category lookup
> **Reversibility**: Easy — git checkout restores original
```

### Example 2: Deferral Decision
```
> 📋 DECISION: Defer runtime simulation to Sprint 3
> **Context**: simulate.js originally planned for runtime execution testing.
> **Options**: A) Full runtime simulation | B) Static analysis only | C) Skip simulation entirely
> **Chosen**: B (Static analysis only)
> **Rationale**: Runtime would require spawning LLM calls — too expensive and non-deterministic for CI.
> **Trade-off**: Missing runtime behavior coverage. Phase 3 tests structure, not behavior.
> **Reversibility**: Medium — extending to runtime requires additional infrastructure
```

### Example 3: Convention Conflict Resolution
```
> 📋 DECISION: Guardrail severity naming convention
> **Context**: Requirements use warn/block/escalate-to-user. Plan proposes Advisory/Blocking/Critical.
> **Options**: A) Keep requirements naming | B) Use plan naming | C) Support both with aliases
> **Chosen**: B (Plan naming with numbered severity)
> **Rationale**: Numbered severity (1/2/3) enables programmatic escalation logic. Requirements updated to match.
> **Trade-off**: Requirements amended post-planning. Original naming preserved in AC8.1 rationale.
> **Reversibility**: Easy — naming is cosmetic; behavior identical
```

## Collection Protocol

### During `:team` Workflows
Each evaluator/reviewer agent should flag decisions they encounter. The orchestrator collects these into a `## Decision Trail` section at the bottom of the deliverable file.

### Stand-alone Decision Logs
For sprints, create `reports/{sprint}/decisions.md` with all decision trail entries for the sprint.

## Searchability
Decision trails use the `📋 DECISION:` prefix for grepability:
```bash
grep -r "📋 DECISION:" reports/ rules/
```

## Integration with ADRs
- **Decision trail**: Lightweight, inline, for workflow-level choices
- **ADR**: Heavyweight, standalone, for architecture-level decisions
- **Rule**: If a decision trail entry affects 3+ files or creates precedent → promote to ADR
