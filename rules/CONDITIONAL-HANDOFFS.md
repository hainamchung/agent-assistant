# Conditional Handoffs

> Load when: Multi-agent workflows require dynamic routing based on context.
> Purpose: Define guard expressions that control when and how work transfers between agents.

---

## Overview

Standard handoffs are static — agent A always passes to agent B. Conditional handoffs add **guard expressions** that evaluate context before routing, enabling dynamic workflows.

---

## Guard Expression Syntax

Guards are evaluated as simple boolean conditions against the current workflow state.

```
HANDOFF: {source-agent} → {target-agent}
  WHEN: {guard-expression}
  OTHERWISE: {fallback-agent | SKIP | HALT}
```

### Supported Guard Variables

| Variable | Type | Description |
|----------|------|-------------|
| `phase` | number | Current workflow phase number |
| `errors` | number | Count of errors in current phase |
| `warnings` | number | Count of warnings in current phase |
| `file_count` | number | Number of files modified in current phase |
| `has_tests` | boolean | Whether test files exist for the deliverable |
| `complexity` | string | Task complexity: `low`, `medium`, `high` |
| `agent_category` | string | Current agent's category field |
| `command` | string | Active command name (e.g., `cook`, `fix`) |
| `variant` | string | Command variant (e.g., `fast`, `hard`, `team`) |

### Guard Operators

| Operator | Example |
|----------|---------|
| `==`, `!=` | `complexity == "high"` |
| `>`, `<`, `>=`, `<=` | `errors > 0` |
| `AND`, `OR`, `NOT` | `errors > 0 AND has_tests` |

---

## Standard Conditional Patterns

### Pattern 1: Error-Triggered Debugging

```
HANDOFF: backend-engineer → debugger
  WHEN: errors > 0
  OTHERWISE: SKIP
```

When implementation produces errors, route to debugger instead of proceeding.

### Pattern 2: Complexity-Based Review

```
HANDOFF: tech-lead → reviewer
  WHEN: complexity == "high" OR file_count > 5
  OTHERWISE: SKIP
```

Only invoke full review for high-complexity tasks or large changesets.

### Pattern 3: Test-Required Gate

```
HANDOFF: backend-engineer → tester
  WHEN: has_tests == false AND command != "fix"
  OTHERWISE: SKIP
```

Skip test creation if tests already exist or if the command is a quick fix.

### Pattern 4: Security Escalation

```
HANDOFF: reviewer → security-engineer
  WHEN: warnings > 2 AND agent_category == "validation"
  OTHERWISE: SKIP
```

Escalate to security review when multiple warnings are flagged.

---

## Handoff Protocol

1. **EVALUATE** guard expression against current workflow state
2. **LOG** the evaluation result: `GUARD {expression} → {true|false}`
3. **ROUTE** accordingly:
   - Guard TRUE → execute handoff to target agent
   - Guard FALSE → execute OTHERWISE action (SKIP, fallback, or HALT)
4. **CONTINUE** workflow from the resolved destination

### OTHERWISE Actions

| Action | Behavior |
|--------|----------|
| `SKIP` | Skip the handoff entirely, continue to next step |
| `HALT` | Stop workflow, present situation to user |
| `{agent-name}` | Route to the specified fallback agent instead |

---

## Defining Conditional Handoffs in Commands

Command workflow files can specify conditional handoffs in their phase definitions:

```yaml
phases:
  - name: Implementation
    agent: backend-engineer
    handoffs:
      - to: debugger
        when: "errors > 0"
      - to: tester
        when: "has_tests == false"
        otherwise: SKIP
```

When no `when:` clause is present, the handoff is unconditional (standard behavior).

---

## Constraints

- Guard expressions must be **simple and deterministic** — no side effects
- Maximum 3 chained conditions per guard (readability limit)
- Guards are evaluated by the orchestrator, not by individual agents
- Fallback to unconditional handoff if guard variables are unavailable
