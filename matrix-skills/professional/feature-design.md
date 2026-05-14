# feature-design — Professional Skill

> **TIER**: 2 | **TRIGGER**: New feature, feature addition, API extension
> **PURPOSE**: Design features that integrate cleanly, scale reasonably, and don't create technical debt

---

## Trigger Conditions

```
APPLY WHEN:
  □ Adding new functionality to existing codebase
  □ Creating new API endpoints
  □ Extending existing data models
  □ Adding user-facing features
  □ Creating new services/modules

SKIP WHEN:
  □ Requires new architecture (→ specialized/architecture)
  □ Cross-cutting concerns (auth, logging) (→ specialized/cross-cutting)
  □ Performance-critical path (→ specialized/performance)
  □ Multi-service coordination (→ expert/distributed-systems)
```

---

## Actions

### Step 1: Understand the WHY

```
□ Why does this feature need to exist? (not "user asked")
□ What PROBLEM does this solve?
□ What is the COST of NOT building this?
□ What existing solution is this better than?
□ Is there a SIMPLER way to solve the same problem?
□ What happens if we don't build this? (kill test)
```

### Step 2: Map the Interface

```
□ What is the EXTERNAL interface? (API, UI, CLI)
□ What changes are VISIBLE to existing consumers?
□ What changes are INTERNAL only?
□ Is this ADDITIVE or BREAKING?
□ Can this be backwards-compatible?
□ What is the MINIMAL interface needed?
```

### Step 3: Design Data Model

```
□ What data needs to be stored?
□ What is the MINIMAL schema?
□ What are the access patterns?
□ What are the retention requirements?
□ Is normalization appropriate? (often denormalize for performance)
□ What indexes are needed? (add when proven needed, not preemptively)
```

### Step 4: Handle Edge Cases

```
□ Null/missing inputs?
□ Empty results?
□ Maximum data size?
□ Concurrent access?
□ Partial failures (what if it crashes mid-operation)?
□ Rollback strategy?
□ What happens to existing data when feature is not used?
```

### Step 5: Design for Testability

```
□ Can this be tested WITHOUT database?
□ Can this be tested WITHOUT network?
□ Can this be tested WITHOUT filesystem?
□ What are the key behaviors to test?
□ What are the edge cases to test?
□ What would FAIL the feature? (design tests that would catch this)
```

### Step 6: Consider Integration

```
□ What does this connect to?
□ What happens when dependency is slow?
□ What happens when dependency fails?
□ What happens when dependency returns unexpected data?
□ Is this synchronous or asynchronous?
□ What is the timeout strategy?
□ What is the retry strategy?
□ What is the circuit breaker strategy?
```

---

## Outputs

```
## Feature Design Document

### Purpose
```
[What problem does this solve? WHY does this exist?]
```

### Interface
```
[Public API/UI surface area]
[Parameters, types, return values]
```

### Data Model
```
[Schema, relationships, indexes]
```

### Behavior
```
[Core behavior in words, not code]
[Edge cases explicitly listed]
```

### Integration Points
```
[Dependencies, error handling, timeouts]
```

### Acceptance Criteria
```
[Specific, testable conditions]
[Each criterion is independently verifiable]
```

### Out of Scope
```
[Explicitly what is NOT included]
```

### Open Questions
```
[Unresolved decisions with owners]
```
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Why | Purpose is specific, not generic | Redesign purpose |
| Interface | Changes are explicitly ADDITIVE | Redesign interface |
| Edge Cases | At least 5 edge cases listed | Add edge cases |
| Testability | Can be tested without external deps | Refactor for testability |
| Integration | Error handling for all dependencies | Add error handling |

---

## Common Mistakes

```
❌ Building features no one asked for (requirements problem)
❌ Over-engineering for "future" (YAGNI)
❌ Ignoring backwards compatibility
❌ Not thinking about partial failures
❌ Not thinking about migration of existing data
❌ Not documenting out-of-scope
❌ Adding indexes "just in case"
❌ Premature optimization
```
