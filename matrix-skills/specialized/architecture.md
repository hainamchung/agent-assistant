# architecture — Specialized Skill

> **TIER**: 3 | **TRIGGER**: New system, major refactor, cross-cutting changes
> **PURPOSE**: Design systems that are maintainable, scalable, and cost-effective

---

## Trigger Conditions

```
APPLY WHEN:
  □ Creating new service or application from scratch
  □ Major architectural refactor (>30% of codebase)
  □ Adding cross-cutting concerns (auth, caching, observability)
  □ Decomposing monolith into services
  □ Selecting major technology stack
  □ Database migration between paradigms

SKIP WHEN:
  □ Single-service optimization (→ professional/feature-design)
  □ Simple CRUD (→ professional/feature-design)
  □ Known pattern fits (→ use established pattern)
  □ Research-needed novel approach (→ expert/research)
```

---

## Actions

### Step 1: Define Success Criteria

```
□ What does "good architecture" mean for THIS system?
□ What are the HARD constraints? (budget, timeline, team size, existing tech)
□ What are the SOFT constraints? (preferred language, existing infra)
□ What scale must this handle? (users, data, requests)
□ What is the failure tolerance? (SLA, RTO, RPO)
□ What is the OPERATIONAL complexity budget?
```

### Step 2: Identify Forces

```
□ Functional requirements (what it must DO)
□ Non-functional requirements (how it must BE)
□ Constraints (what we CAN'T do)
□ Risks (what might go WRONG)
□ Assumptions (what we're BETTING on)
□ Dependencies (what we MUST use)
□ Team capabilities (what can we actually BUILD)
```

### Step 3: Generate Options

```
□ Always generate 2-3 ARCHITECTURALLY DIFFERENT options
□ Don't just vary implementation details
□ Consider: monolith vs services, sync vs async, SQL vs NoSQL, etc.
□ Each option should be VIABLE, not strawman
□ Each option should have explicit trade-offs
```

### Step 4: Evaluate Trade-offs

```
For each option:
□ What does this optimize for? (performance, simplicity, flexibility)
□ What does this sacrifice? (the opposite)
□ What is the COST over 2 years? (development, operations, scaling)
□ What is the RISK if wrong? (can we migrate?)
□ What does OPERATIONS look like? (deployment, monitoring, debugging)
□ What does TESTING look like? (unit, integration, e2e)
```

### Step 5: Decide and Document

```
□ Decision: which option with what modifications
□ Rationale: WHY this option over others
□ Trade-offs accepted: what we gave up
□ Trade-offs rejected: what we avoided
□ Consequences: what this decision forces on us
□ Known limitations: what this architecture is bad at
□ Migration path: how to get here from current state
```

---

## Outputs

```
## Architecture Decision Record (ADR)

### Status
[ACCEPTED | PROPOSED | DEPRECATED]

### Context
```
[What is the situation? What is the problem?]
```

### Forces
```
[Functional requirements]
[Non-functional requirements]
[Constraints]
[Risks]
[Assumptions]
```

### Options Considered

#### Option 1: [Name]
```
[Description]
Pros: [List]
Cons: [List]
Estimated cost: [Time, money, complexity]
Risk if wrong: [Reversibility, migration cost]
```

#### Option 2: [Name]
[Same structure]

### Decision
```
[Which option, with what modifications]
```

### Rationale
```
[Why this over others - specific reasoning]
```

### Consequences
```
[What this forces on us]
[Positive consequences]
[Negative consequences]
[Known limitations]
```

### Migration
```
[How to get here from current state]
[Phases if multi-step]
```
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Options | 2-3 VIABLE options generated | Reject strawman options |
| Trade-offs | Each option's pros/cons are specific | Make trade-offs concrete |
| Cost | 2-year total cost estimated | Include ops + dev cost |
| Risk | Migration path if wrong | Reject irreversible decisions |
| Forces | All forces identified | Identify missing forces |

---

## Common Mistakes

```
❌ Not generating real alternatives (picking first idea)
❌ Cherry-picking evidence for preferred option
❌ Ignoring operations cost
❌ Underestimating team capability gap
❌ Over-engineering for "future scale"
❌ Not documenting trade-offs rejected
❌ Not thinking about failure modes
❌ Treating architecture as final (should be ADRs, living docs)
```
