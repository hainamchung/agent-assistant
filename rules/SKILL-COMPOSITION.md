---
id: skill-composition
title: Skill Composition Specification
description: Rules for combining and chaining skills between agents
version: "1.0"
updated: "2026-04-08"
scope: matrix-skills
type: rule
section: composition
schema-version: "1.0"
---

# 🔗 SKILL COMPOSITION

> **LOAD**: When orchestrating multi-agent skill chains or cross-agent skill invocation  
> **PREREQUISITE**: `rules/SKILLS-LITE.md` (skill resolution flow)

---

## OVERVIEW

Skill composition allows an agent to invoke skills from a compatible agent when it lacks the required capability. The `composes_with` field in matrix-skills YAML files declares which agents a domain's skills can compose with.

---

## `composes_with` FIELD SPECIFICATION

| Property | Value |
|----------|-------|
| **Location** | Top-level field in `matrix-skills/{domain}.yaml` |
| **Type** | Array of agent identifiers |
| **Format** | `composes_with: [agent-id-1, agent-id-2]` |
| **Limit** | Maximum 6 entries per domain file |

### Example

```yaml
domain: backend
name: "Backend Development"
composes_with: [database-architect, devops-engineer, security-engineer]
```

---

## COMPOSITION RULES

### 1. Directionality

Composition is **unidirectional**. If A declares `composes_with: [B]`, that does NOT imply B composes with A.

```
backend.yaml composes_with: [security-engineer]
  → backend skills CAN invoke security-engineer skills
  → security-engineer skills CANNOT invoke backend skills (unless declared)
```

### 2. No Self-Composition

A domain file's `composes_with` MUST NOT reference its own primary agents.

```yaml
# ❌ INVALID — self-composition
domain: backend
composes_with: [backend-engineer]

# ✅ VALID
domain: backend
composes_with: [database-architect, devops-engineer]
```

### 3. Category Compatibility

Agent categories determine composition eligibility. Only compatible categories may compose.

| Source ↓ / Target → | meta | execution | validation | research | investigation | support |
|---------------------|:----:|:---------:|:----------:|:--------:|:-------------:|:-------:|
| **meta**            | ✅   | ✅        | ✅         | ✅       | ✅            | ✅      |
| **execution**       | ✅   | ✅        | ✅         | ✅       | ✅            | ✅      |
| **validation**      | ✅   | ✅        | ❌         | ✅       | ✅            | ✅      |
| **research**        | ✅   | ✅        | ✅         | ✅       | ✅            | ✅      |
| **investigation**   | ✅   | ✅        | ✅         | ✅       | ✅            | ✅      |
| **support**         | ✅   | ✅        | ✅         | ✅       | ✅            | ✅      |

**Key restriction**: `validation ↔ validation` is **NOT allowed** — prevents circular review loops.

### 4. Chain Length Limit

Maximum composition chain depth: **5**.

```
A → B → C → D → E   ✅ (depth 5)
A → B → C → D → E → F   ❌ (depth 6, exceeds limit)
```

### 5. No Cycles

The composition graph MUST be a DAG. Cycles are forbidden.

```
A → B → C → A   ❌ CYCLE DETECTED
```

### 6. Security Constraint

`security-engineer` skills MUST NOT be composed away from a security context. When `security-engineer` appears in a `composes_with` array, the invoking agent receives security skills but CANNOT re-delegate them further.

```
backend → security-engineer   ✅ (direct composition)
backend → security-engineer → tester   ❌ (security skills cannot chain further)
```

---

## USAGE IN ORCHESTRATION

When an agent needs a skill it does not possess:

1. **Check** the agent's domain file for `composes_with` targets
2. **Verify** category compatibility between source and target agents
3. **Load** the composed skill from the target domain
4. **Execute** within the invoking agent's context
5. **Return** results to the invoking agent (skill does not persist)

---

## EXAMPLE COMPOSITION CHAINS

### API Development with Security Review

```
backend (execution)
  → database-architect (execution)  — schema design
  → security-engineer (validation)  — auth patterns
Chain depth: 2 ✅
```

### Full-Stack Feature

```
frontend (execution)
  → designer (research)       — UI patterns
  → backend-engineer (execution)  — API integration
    → database-architect (execution)  — data model
Chain depth: 3 ✅
```

### Planning Pipeline

```
planner (meta)
  → tech-lead (meta)          — architecture review
  → researcher (research)     — technology analysis
  → business-analyst (support) — requirements validation
Chain depth: 3 ✅
```

---

## VALIDATION

The linter (`scripts/lint-agents.js`) validates all composition rules:

- **R400**: Referenced agent in `composes_with` must exist in `agents/`
- **R401**: No self-composition (domain's primary agents excluded)
- **R402**: Category compatibility verified per matrix above
- **R403**: No cycles detected in composition graph
- **R404**: Chain depth ≤ 5

---

## REFERENCE

- `rules/SKILLS-LITE.md` — Skill resolution flow
- `rules/SKILL-CONFLICTS.md` — Conflict resolution when composed skills overlap
- `matrix-skills/_index.yaml` — HSOL configuration
