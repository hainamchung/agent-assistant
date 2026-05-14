# system-design — Expert Skill

> **TIER**: 4 | **TRIGGER**: Novel systems, no prior art, research-grade complexity
> **PURPOSE**: Design systems where no established pattern reliably applies

---

## Trigger Conditions

```
APPLY WHEN:
  □ No existing system in the codebase solves this problem
  □ Requires combining 3+ architectural paradigms
  □ Cross-service data consistency is a core concern
  □ Need to make irreversible infrastructure decisions
  □ Regulatory/compliance constraints dominate design
  □ Scale requirements exceed tested boundaries

SKIP WHEN:
  □ Pattern exists that solves 80%+ of the problem (→ specialized/architecture)
  □ This is a variation of an existing system (→ specialized/architecture)
  □ Risk is low and migration is easy (→ professional/feature-design)
```

---

## Actions

### Step 1: Scope the System Boundary

```
□ What IS this system? Write a one-paragraph definition.
□ What is explicitly OUTSIDE this system's scope?
□ Who are the stakeholders? (users, operators, auditors)
□ What are the HARD constraints? (budget, time, team, existing infra)
□ What scale must this handle? (users, data volume, requests/sec)
□ What is the failure budget? (SLA, RTO, RPO)
```

### Step 2: Identify the Hard Problems

```
□ Where does data consistency break down across service boundaries?
□ What happens when a service goes down mid-operation?
□ What is the minimum viable system that proves this works?
□ What is the most expensive assumption we're making?
□ What would make us scrap this entirely and do something else?
□ Where do we have ZERO evidence for our approach?
```

### Step 3: Research the Unknowns

```
□ Find 5+ real-world systems that solved SIMILAR problems
□ Interview or read accounts from people who built these systems
□ Document what FAILED in those systems
□ What did the post-mortems reveal?
□ How long did it take to stabilize? (not just ship)
□ What would an expert in this domain say we're wrong about?
```

### Step 4: Generate Architecturally Different Options

```
□ Never present 1 option. Always 2-3 that are GENUINELY different.
□ Each option should optimize for DIFFERENT non-functional requirements
□ Options should differ at the paradigm level, not just implementation
□ Document: What does this option sacrifice?
□ Estimate: Total cost over 2 years (dev + ops + scaling + failures)
```

### Step 5: Evaluate with Evidence

```
For each option:
□ What evidence do we have that this works at scale?
□ What is the failure mode and can we recover?
□ What does the operational burden look like day-to-day?
□ What is the team's learning curve?
□ What happens to this system in 5 years?
□ Is this option resilient to requirement changes?
```

### Step 6: Decision and Documentation

```
□ ADR: Architecture Decision Record (required for Expert tier)
□ Decision: which option and WHY (not "we chose this")
□ Consequences: what this forces on future decisions
□ Known limitations: what this is explicitly bad at
□ Migration path: how to evolve from current state
□ Monitoring strategy: what metrics prove this is working
□ Rollback: what does a full rollback look like?
```

---

## Outputs

```
## Architecture Assessment — Expert Tier

### System Definition
[What this system IS and IS NOT]

### Stakeholders
[Users, operators, auditors, with their concerns]

### Hard Problems Identified
[Top 3-5 problems that have no easy answers]

### Research Summary
[Real-world systems studied, what worked, what failed]

### Options Considered

#### Option A: [Name]
[Paradigm-level description]
**Optimizes for**: [NFR]
**Sacrifices**: [What this gives up]
**Evidence**: [Real-world examples, not theory]
**Estimated cost**: [2-year total: dev + ops + failure]
**Risk if wrong**: [Reversibility, migration cost]
**Failure modes**: [Top 3]
**Monitoring**: [Key metrics]

#### Option B: [Name]
[Same structure]

### Decision
[Which option, with what modifications, WHY over alternatives]

### Consequences
```
POSITIVE:
[N] things this enables

NEGATIVE:
[N] things this costs

CONSTRAINTS:
[N] things this locks in

RISKS:
[N] things that might go wrong
```

### Migration Path
[How to get from current state to target state]

### Known Limitations
[What this architecture is explicitly bad at]

### Post-Implementation Checklist
□ Load tested at [X]% above projected peak?
□ Chaos engineering tested failure modes?
□ Runbooks for all failure modes?
□ Cost model validated against actual usage?
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Research | 5+ real-world systems studied | Stop, do more research |
| Options | 2-3 genuinely different paradigms | Reject strawman options |
| Evidence | Every major claim has real-world backing | No theoretical claims |
| Cost | 2-year total cost estimated (dev + ops + failure) | Include hidden costs |
| Reversibility | Migration path exists for irreversible decisions | Cannot proceed without |
| Stakeholders | All stakeholder concerns addressed | Add missing stakeholders |

---

## Common Mistakes

```
❌ Researching only success stories (ignoring failures)
❌ Presenting one option as "the right answer"
❌ Ignoring operational burden (ship != done)
❌ Over-engineering for hypothetical scale
❌ Not validating assumptions with stakeholders
❌ Skipping the rollback plan
❌ Treating the decision as final (ADRs are living documents)
❌ Ignoring regulatory/compliance constraints
```
