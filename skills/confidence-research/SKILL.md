---
name: confidence-research
description: "Produce confidence-weighted research with explicit source hierarchy and verification discipline. Use for all research outputs to halt hallucination propagation."
---

# Confidence-Weighted Research

Research outputs with explicit confidence levels and source hierarchy. Halts hallucination propagation by tagging unverified claims.

**Core principle:** Every claim tagged with confidence level and source. Investigation, not confirmation.

## Source Hierarchy

| Priority | Source | Confidence | Examples |
|----------|--------|------------|----------|
| 1 | Context7 | HIGH | Official library docs, version-specific |
| 2 | Official Docs | HIGH | Documentation, API references |
| 3 | WebSearch (verified) | MEDIUM | Community patterns, verified claims |
| 4 | WebSearch (unverified) | LOW | Single sources, training data only |
| 5 | Inference | LOW | LLM-generated without sources |

## Research Output Format

```markdown
# Research: [Topic]

## Executive Summary
[2-3 sentence overview]

## Findings

### Finding 1: [Title]
**Claim:** [What was found]
**Confidence:** HIGH | MEDIUM | LOW
**Source:** context7 | official-docs | websearch | inference
**Verified:** YES | NO | PARTIAL
**Evidence:**
- [Source 1 with URL]
- [Source 2 with URL]

### Finding 2: [Title]
...
```

## Verification Protocol

For each finding:

1. **Is this from Context7 or official docs?** → HIGH confidence
2. **Is this from verified WebSearch?** → MEDIUM confidence
3. **Is this from unverified source?** → LOW confidence, flag
4. **Multiple sources agree?** → Increase confidence one level

## Anti-Pattern: Confirmation Bias

**Bad research:** Start with hypothesis, find supporting evidence

**Good research:** Gather evidence, form conclusions from evidence

Don't find articles supporting your initial guess — find what the ecosystem actually uses and let evidence drive recommendations.

## Confidence Levels

| Level | Meaning | When to Use |
|-------|---------|--------------|
| HIGH | Verified by authoritative source | State as fact |
| MEDIUM | Verified by community, unverified by authority | State with attribution |
| LOW | Single source or inference only | Flag as needing validation |

## Research Modes

| Mode | Trigger | Scope |
|------|---------|-------|
| Ecosystem | What exists for X? | Libraries, frameworks, standard stack |
| Feasibility | Can we do X? | Technical achievability, constraints |
| Comparison | Compare A vs B | Features, performance, DX |

## Tool Strategy

### Priority Order

1. **Context7 (highest)** — Authoritative, current, version-aware
2. **Official Docs via WebFetch** — Authoritative sources
3. **WebSearch** — Ecosystem discovery
4. **Inference (lowest)** — Only when other sources unavailable

### For Each Finding

```
Is Context7 available? → YES → HIGH confidence
        ↓ NO
Is official docs available? → YES → HIGH confidence
        ↓ NO
Are multiple credible sources available? → YES → MEDIUM confidence
        ↓ NO
Single source or inference? → LOW confidence, flag for validation
```

## Pre-Research Checklist

- [ ] Scan Context7 for library documentation
- [ ] Check official docs for authoritative sources
- [ ] Use WebSearch for community patterns
- [ ] Verify claims against multiple sources

## Post-Research Checklist

- [ ] All findings tagged with confidence level
- [ ] All findings have source attribution
- [ ] LOW confidence findings flagged for validation
- [ ] Negative claims verified with official docs

## Integration

Use with:
- `/ask:team` — For knowledge synthesis
- `/plan:team` — For architecture decisions
- `/research` commands — For domain research

## Anti-Hallucination Discipline

1. **Verify before asserting** — Check Context7 or official docs
2. **Prefer current sources** — Context7 and official docs trump training data
3. **Flag uncertainty** — LOW confidence when only training data
4. **"I couldn't find X" is valuable** — Investigate differently
5. **Sources contradict** — Surface the ambiguity
