---
schema-version: "1.0"
name: SKILL-CONFLICTS
description: Resolution strategies for overlapping or contradicting skills
status: active
---

# ⚔️ SKILL CONFLICTS

> **LOAD**: When ≥2 matched skills have overlapping or contradictory guidance  
> **PREREQUISITE**: `rules/SKILLS-LITE.md` (skill resolution flow)  
> **INTEGRATION**: Between step 3 (SCAN) and step 4 (LOAD) in SKILLS-LITE.md

---

## CONFLICT TYPES

| Type | Description | Example |
|------|-------------|---------|
| **Overlap** | Two skills cover the same task area with compatible guidance | `backend.yaml` and `architecture.yaml` both address API design |
| **Contradiction** | Two skills give opposing recommendations | Skill A says "use REST" vs Skill B says "use GraphQL" |
| **Priority clash** | Two skills claim highest priority for the same aspect | Both `security.yaml` and `performance.yaml` mark auth as P0 |

---

## RESOLUTION STRATEGIES

Apply in order. First matching strategy resolves the conflict.

### Strategy 1: Specificity Wins

The more specific skill takes precedence over the general one.

**Rule**: If skill A matches on a *specific sub-tag* and skill B matches on a *parent tag*, skill A wins for that sub-domain.

**Example**: For "database connection pooling":
- `data.yaml` matches on `data:database:connection-pooling` (specific)
- `backend.yaml` matches on `backend:database` (general)
- → `data.yaml` wins for connection pooling guidance

### Strategy 2: Category Alignment

The skill whose category matches the current agent's category wins.

**Rule**: If the executing agent has `category: execution`, prefer the skill from an execution-aligned matrix file.

**Example**: `backend-engineer` (category: execution) gets conflicting advice from:
- `backend.yaml` (execution-aligned) → wins
- `architecture.yaml` (meta-aligned) → deferred

### Strategy 3: Recency

The most recently updated skill file takes precedence.

**Rule**: Compare `schema-version` or file modification date. Newer content wins.

> Use this strategy only when Strategy 1 and 2 produce no winner.

### Strategy 4: Orchestrator Decision

If no automated strategy resolves the conflict, escalate to the orchestrator.

**Rule**: Present both options with a one-line summary each. The orchestrator (or user) picks.

**Format**:
```
SKILL CONFLICT DETECTED:
  Option A (from backend.yaml): Use connection pooling with max 10 connections
  Option B (from data.yaml): Use connection pooling with max 25 connections
  → Awaiting orchestrator decision
```

---

## CONFLICT DETECTION ALGORITHM

```
FUNCTION detect_conflicts(matched_skills):
  conflicts = []

  FOR EACH pair (skill_a, skill_b) IN matched_skills:
    overlap = tag_overlap(skill_a.tags, skill_b.tags)
    IF overlap > 0.5:  // more than 50% tag overlap
      IF contradicts(skill_a.guidance, skill_b.guidance):
        conflicts.push({type: 'contradiction', skills: [skill_a, skill_b]})
      ELSE:
        conflicts.push({type: 'overlap', skills: [skill_a, skill_b]})
  END FOR

  RETURN conflicts
END FUNCTION

FUNCTION resolve_conflicts(conflicts, current_agent):
  FOR EACH conflict IN conflicts:
    winner = null

    // Strategy 1: Specificity
    IF conflict.skills[0].tag_depth > conflict.skills[1].tag_depth:
      winner = conflict.skills[0]
    ELIF conflict.skills[1].tag_depth > conflict.skills[0].tag_depth:
      winner = conflict.skills[1]

    // Strategy 2: Category alignment
    IF !winner:
      FOR EACH skill IN conflict.skills:
        IF skill.category_alignment == current_agent.category:
          winner = skill
          BREAK

    // Strategy 3: Recency
    IF !winner:
      winner = most_recent(conflict.skills)

    // Strategy 4: Escalate
    IF !winner:
      escalate_to_orchestrator(conflict)

    conflict.resolution = winner
  END FOR
END FUNCTION
```

---

## DEGRADATION INTERACTION

Under skill degradation (SKILL-DEGRADATION.md):

| Tier | Conflict Resolution |
|------|:-------------------:|
| T1 (Full) | Full 4-strategy resolution |
| T2 (Reduced) | Strategy 1 only (specificity) |
| T3 (Minimal) | Skip — use highest-priority skill directly |

---

## SECURITY CONSIDERATIONS

- Conflict resolution uses only pre-curated skill file content (no user input in resolution)
- Escalation (Strategy 4) surfaces options but never auto-executes ambiguous guidance
- No external data sources consulted during resolution
