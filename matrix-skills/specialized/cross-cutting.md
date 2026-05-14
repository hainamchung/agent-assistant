# cross-cutting — Specialized Skill

> **TIER**: 3 | **TRIGGER**: Logging, observability, auth, caching, error handling across system layers
> **PURPOSE**: Design features that touch everything without creating a tangled mess

---

## Trigger Conditions

```
APPLY WHEN:
  □ Adding auth, logging, caching, or observability that touches all layers
  □ Designing middleware or interceptors
  □ Cross-cutting concerns must be added to existing code
  □ Feature that should be "invisible" to business logic
  □ Need to add tracing, metrics, or health checks
  □ Dependency injection or IoC pattern needed
  □ Feature that affects multiple services

SKIP WHEN:
  □ New architectural pattern (→ specialized/architecture)
  □ Business logic in one layer (→ professional/feature-design)
  □ Simple utility function (→ foundation/debugging)
  □ Distributed tracing (→ expert/distributed-systems)
```

---

## Actions

### Step 1: Map the Affected Layers

```
□ What layers does this feature touch? (API, service, data, infra)
□ What is the entry point? (HTTP handler, message consumer, scheduled job)
□ What existing code is affected?
□ What are the boundaries? (what doesn't this feature touch)
□ What is the principle of least intrusion?
□ How does this feature compose with existing patterns?
□ Is this feature needed in all environments? (dev, staging, prod)
```

### Step 2: Choose the Integration Pattern

```
PATTERNS:
□ MIDDLEWARE: Good when [request/response interception, stateless]
□ DECORATOR: Good when [behavior wrapping, object-level]
□ HOOK/LIFECYCLE: Good when [structured phases, plugin system]
□ AOP (Aspect-Oriented Programming): Good when [cross-method concerns]
□ CENTRALIZED: Good when [config-based, convention over code]
□ SERVICE MESH: Good when [infrastructure-level, no code changes]

For each option:
□ What does this require from the existing codebase?
□ How easy is it to add and remove?
□ How does it compose with other cross-cutting features?
□ What is the failure mode if this feature breaks?
□ Can this be toggled per environment?
□ How does it handle async/queued operations?
```

### Step 3: Design the Contract

```
□ What is the interface this feature requires?
□ What assumptions does it make about the host code?
□ What does the host code need to know about this feature?
□ What state, if any, does this feature maintain?
□ How does this feature handle configuration?
□ What are the extension points?
□ What happens if the host code doesn't follow the contract?
□ Can this feature be composed with other cross-cutting features?
```

### Step 4: Implement Without Intrusion

```
GOAL: Business logic should be UNAWARE of cross-cutting features.

BAD: business logic calls logging directly
GOOD: business logic is wrapped by logging middleware

□ Can this be done without modifying business logic?
□ Is there a convention or annotation that enables this automatically?
□ Does the host code need to opt-in or opt-out?
□ How do you avoid the "hidden dependency" problem?
□ Can this be tested without the host code?
□ Can this be disabled without breaking the host code?
□ Does this introduce coupling between layers?
```

### Step 5: Error Handling Strategy

```
□ What happens when the cross-cutting feature fails?
□ Does it fail open (continue without feature) or fail closed (halt)?
□ How does failure propagate to the host?
□ Is failure visible to operators?
□ Does the feature have its own health check?
□ Can the feature degrade gracefully?
□ What is the blast radius of a failure?
□ Does failure in one request affect other requests?
□ How does this work during startup and shutdown?
```

### Step 6: Testing Strategy

```
□ Can the cross-cutting feature be tested in isolation?
□ Can it be tested with mock host code?
□ Does it require integration testing?
□ What are the failure injection tests?
□ How do you test the interaction between multiple cross-cutting features?
□ Does it work with the existing test framework?
□ Can you test at the boundary without the host code?
□ What are the edge cases? (startup, shutdown, errors, timeouts)
```

---

## Outputs

```
## Cross-Cutting Feature Design

### Affected Layers
|| Layer | Entry Point | Impact | Intrusion |
||-------|-------------|--------|----------|
|| [layer] | [entry] | [impact] | [none/minor/major] |

### Integration Pattern
|| Pattern | Chosen | Rationale | Alternatives Considered |
||---------|--------|-----------|------------------------|
|| [pattern] | [Y/N] | [why] | [rejected alternatives] |

### Feature Contract
```
Interface: [what host must provide]
Assumptions: [what feature assumes about host]
State: [any persistent state]
Configuration: [how it's configured]
Extension points: [what can be customized]
```

### Failure Mode
|| Scenario | Behavior | Impact | Recovery |
||----------|----------|--------|---------|
|| [scenario] | [open/closed] | [blast radius] | [strategy] |

### Testing Approach
|| Test Type | Scope | Coverage |
||-----------|--------|----------|
|| [type] | [what it tests] | [%] |

### Implementation Checklist
□ Feature can be added without modifying host code
□ Feature can be tested in isolation
□ Feature fails gracefully (fail open or closed, documented)
□ Feature has health check
□ Feature is configurable per environment
□ Feature has no hidden dependencies on host code
□ Feature can be composed with other cross-cutting features
□ Feature has observability (metrics, logs)
□ Feature is documented for future developers
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Intrusion | Business logic unaware of feature | Redesign |
| Isolation | Feature testable without host | Add integration tests |
| Failure | Failure mode is intentional and tested | Document and test |
| Composition | Multiple features compose without conflict | Test together |
| Observability | Feature has its own metrics/logs | Add monitoring |
| Configuration | Feature controllable per environment | Add config |
| Documentation | Host developers understand integration | Add docs |

---

## Common Mistakes

```
❌ Cross-cutting code that knows too much about business logic
❌ Tight coupling between layers via cross-cutting features
❌ Failure modes that aren't intentional (fail silently)
❌ Testing cross-cutting features only in integration
❌ Adding cross-cutting features that can't be disabled
❌ Over-engineering (middleware for a simple hook)
❌ Not documenting the integration contract
❌ Making cross-cutting features stateful when they should be stateless
❌ Hidden dependencies (host code assumes feature is present)
❌ Multiple cross-cutting features that conflict or overlap
```
