---
schema-version: "1.0"
name: FITNESS-ROUTING
description: Multi-dimensional agent fitness scoring for intelligent routing
status: active
---

# 🎯 FITNESS ROUTING

> **LOAD**: When selecting best agent for a sub-task  
> **PREREQUISITE**: Agent frontmatter fields `profile`, `category`, `capabilities`  
> **INTEGRATION**: Called by orchestrator during task decomposition

---

## SCORING MODEL

Rank every candidate agent on **4 dimensions** (0–1 each), then compute weighted total:

| # | Dimension | Weight | Source | Scoring |
|---|-----------|--------|--------|---------|
| 1 | **Skill match** | 0.40 | `profile:` tags vs task keywords | Jaccard similarity of tag set ∩ task keywords |
| 2 | **Category fit** | 0.25 | `category:` vs §EXECUTION_MODEL table | 1.0 if category matches task type; 0.5 partial; 0.0 mismatch |
| 3 | **Capability coverage** | 0.20 | `capabilities:` array vs task requirements | Fraction of required capabilities present |
| 4 | **Handoff alignment** | 0.15 | `handoffs:` array vs downstream needs | 1.0 if handoff targets include next-phase agents; else 0.0 |

**Total** = Σ (dimension × weight) → range [0.0, 1.0]

---

## TAG RESOLUTION

When matching agent `profile:` to task keywords:

1. **SPLIT** profile string on `:` → e.g., `"backend:api"` → `["backend", "api"]`
2. **EXPAND** each tag via `matrix-skills/*.yaml` → collect sub-tags (up to depth 1)
3. **EXTRACT** task keywords from user request (nouns, verbs, tech terms)
4. **COMPUTE** Jaccard: `|agent_tags ∩ task_keywords| / |agent_tags ∪ task_keywords|`
5. **NORMALIZE** to [0, 1]

---

## FALLBACK RULES

1. If **no agent scores > 0.3** → use `tech-lead` as default coordinator
2. If **top 2 agents tie** (within 0.05) → prefer the one with more specific `profile:` tags
3. If **task keywords match no tags** → fall back to category-only ranking (dimension 2 weight → 0.60)

---

## ALGORITHM

```
FUNCTION fitness_route(task, candidates):
  scores = {}

  FOR EACH agent IN candidates:
    skill    = jaccard(agent.profile_tags, task.keywords)       // 0-1
    category = category_fit(agent.category, task.type)          // 0, 0.5, or 1
    caps     = |agent.capabilities ∩ task.requirements| / |task.requirements|  // 0-1
    handoff  = has_downstream_targets(agent.handoffs, task.next_agents) ? 1 : 0

    scores[agent] = 0.40 * skill
                  + 0.25 * category
                  + 0.20 * caps
                  + 0.15 * handoff
  END FOR

  ranked = SORT scores DESC
  IF ranked[0].score < 0.3:
    RETURN tech-lead  // fallback
  IF ranked[0].score - ranked[1].score < 0.05:
    RETURN prefer_more_specific(ranked[0], ranked[1])
  RETURN ranked[0].agent
END FUNCTION
```

---

## WORKED EXAMPLES

### Example 1: REST API Task

**Task**: "Build a REST API for user authentication"  
**Keywords**: `[REST, API, user, authentication, build]`

| Agent | Skill (0.40) | Category (0.25) | Caps (0.20) | Handoff (0.15) | **Total** |
|-------|:---:|:---:|:---:|:---:|:---:|
| backend-engineer | 0.40 × 0.80 = 0.32 | 0.25 × 1.0 = 0.25 | 0.20 × 0.90 = 0.18 | 0.15 × 1.0 = 0.15 | **0.90** |
| frontend-engineer | 0.40 × 0.10 = 0.04 | 0.25 × 0.5 = 0.13 | 0.20 × 0.50 = 0.10 | 0.15 × 0.0 = 0.00 | **0.27** |
| security-engineer | 0.40 × 0.40 = 0.16 | 0.25 × 0.5 = 0.13 | 0.20 × 0.60 = 0.12 | 0.15 × 0.0 = 0.00 | **0.41** |

**Result**: `backend-engineer` (0.90) — clear winner.

### Example 2: Security Audit Task

**Task**: "Audit the payment module for OWASP vulnerabilities"  
**Keywords**: `[audit, payment, OWASP, vulnerabilities, security]`

| Agent | Skill (0.40) | Category (0.25) | Caps (0.20) | Handoff (0.15) | **Total** |
|-------|:---:|:---:|:---:|:---:|:---:|
| security-engineer | 0.40 × 0.85 = 0.34 | 0.25 × 1.0 = 0.25 | 0.20 × 0.90 = 0.18 | 0.15 × 1.0 = 0.15 | **0.92** |
| backend-engineer | 0.40 × 0.30 = 0.12 | 0.25 × 0.5 = 0.13 | 0.20 × 0.70 = 0.14 | 0.15 × 0.0 = 0.00 | **0.39** |
| reviewer | 0.40 × 0.20 = 0.08 | 0.25 × 1.0 = 0.25 | 0.20 × 0.40 = 0.08 | 0.15 × 1.0 = 0.15 | **0.56** |

**Result**: `security-engineer` (0.92) — clear winner.

### Example 3: Ambiguous Task (Tie-Breaking)

**Task**: "Review and refactor the database queries"  
**Keywords**: `[review, refactor, database, queries]`

| Agent | Skill (0.40) | Category (0.25) | Caps (0.20) | Handoff (0.15) | **Total** |
|-------|:---:|:---:|:---:|:---:|:---:|
| database-architect | 0.40 × 0.70 = 0.28 | 0.25 × 1.0 = 0.25 | 0.20 × 0.80 = 0.16 | 0.15 × 0.5 = 0.08 | **0.77** |
| backend-engineer | 0.40 × 0.50 = 0.20 | 0.25 × 1.0 = 0.25 | 0.20 × 0.70 = 0.14 | 0.15 × 1.0 = 0.15 | **0.74** |

**Result**: Scores within 0.05 → prefer `database-architect` (more specific profile for "database queries").

---

## INTEGRATION POINTS

- **RUNTIME.md §EXECUTION_MODEL**: Category fit dimension uses category-to-mode mapping
- **SKILLS-LITE.md**: Profile tags resolved via skill matrix
- **CAPABILITY-BUNDLES.md**: When bundle is active, fitness routing ranks agents within the bundle

---

## SECURITY CONSIDERATIONS

- Scoring inputs come exclusively from agent frontmatter (trusted, pre-curated data)
- No user text is used directly in the scoring formula
- Task keywords are extracted and sanitized before matching
