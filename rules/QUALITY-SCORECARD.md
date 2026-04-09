---
id: quality-scorecard
title: Quality Scorecard
description: 5-dimension quality scoring methodology for agent benchmark evaluation
version: 1.0.0
updated: 2026-04-08
scope: evaluation
type: rule
section: quality
---

# Quality Scorecard

On-demand rule defining the 5-dimension scoring system used by `scripts/run-benchmarks.js --scorecard`.

---

## Dimensions

Each dimension scores **0–20 points**. Total: **0–100**.

### 1. Accuracy (0–20 pts)

Did the agent complete all acceptance criteria?

| Points | Condition |
|--------|-----------|
| 20 | All ACs passed |
| 15 | ≥ 75% ACs passed |
| 10 | ≥ 50% ACs passed |
| 5 | ≥ 25% ACs passed |
| 0 | < 25% ACs passed |

**Computation**: `(passedACs / totalACs) × 20`

Source fields in benchmark JSON:
- `evaluationCriteria.structuralCompliance` — maps to AC verification
- Per-benchmark `scores.structuralCompliance` result value

### 2. Efficiency (0–20 pts)

How close to the golden path? Measures phase count, tool calls, and retries.

| Points | Condition |
|--------|-----------|
| 20 | At or below golden path metrics |
| 15 | ≤ 125% of golden path |
| 10 | ≤ 150% of golden path |
| 5 | ≤ 200% of golden path |
| 0 | > 200% of golden path |

**Computation**: `min(1.0, goldenPhases / actualPhases) × 20`

Source fields:
- `evaluationCriteria.workflowAdherence` — phase count adherence
- `scores.workflowAdherence` result value

### 3. Safety (0–20 pts)

Were guardrails respected? Security checks passed, no prohibited patterns.

| Points | Condition |
|--------|-----------|
| 20 | Zero violations |
| 15 | 1 minor violation |
| 10 | 2 minor violations |
| 5 | 1 major violation |
| 0 | Multiple major violations or prohibited patterns detected |

**Computation**: `20 - (violations × deductionPerViolation)`, floor 0

Source fields:
- `evaluationCriteria.outputQuality` — forbidden pattern detection (TODO/FIXME/HACK)
- `scores.outputQuality` result value (1.0 = clean, 0.3 = violations found)

### 4. Completeness (0–20 pts)

Are all deliverables present with valid frontmatter?

| Points | Condition |
|--------|-----------|
| 20 | All deliverables present, all frontmatter valid |
| 15 | All deliverables present, minor frontmatter issues |
| 10 | ≥ 75% deliverables present |
| 5 | ≥ 50% deliverables present |
| 0 | < 50% deliverables present |

**Computation**: `(presentDeliverables / expectedDeliverables) × 20`

Source fields:
- `evaluationCriteria.budgetCompliance` — deliverable completeness
- `scores.budgetCompliance` result value
- Frontmatter checks from `scores.structuralCompliance`

### 5. Communication (0–20 pts)

Quality of phase transitions, handoff messages, and mailbox entries.

| Points | Condition |
|--------|-----------|
| 20 | Clear transitions, proper delegation syntax, complete handoffs |
| 15 | Minor gaps in transition clarity |
| 10 | Some transitions missing or unclear |
| 5 | Most transitions missing |
| 0 | No delegation or handoff evidence |

**Computation**: `average(delegationScore, transitionClarity) × 20`

Source fields:
- `evaluationCriteria.agentDelegation` — handoff table / arrow syntax
- `scores.agentDelegation` result value

---

## Aggregate Scoring

| Metric | Value |
|--------|-------|
| **Total** | Sum of all 5 dimensions (0–100) |
| **Pass threshold** | ≥ 70 |

### Grading Scale

| Grade | Score Range | Meaning |
|-------|-------------|---------|
| **A** | 90–100 | Excellent — production quality |
| **B** | 80–89 | Good — minor improvements needed |
| **C** | 70–79 | Acceptable — passes threshold |
| **D** | 60–69 | Below standard — needs rework |
| **F** | 0–59 | Failing — significant issues |

---

## Computing from Benchmark JSON

Each benchmark fixture produces a `scores` object with these keys:

```
structuralCompliance  → feeds Accuracy + Completeness
workflowAdherence     → feeds Efficiency
outputQuality         → feeds Safety
budgetCompliance      → feeds Completeness
agentDelegation       → feeds Communication
```

### Dimension Mapping

```
accuracy      = structuralCompliance × 20
efficiency    = workflowAdherence × 20
safety        = outputQuality × 20
completeness  = (budgetCompliance × 0.5 + structuralCompliance × 0.5) × 20
communication = agentDelegation × 20
```

---

## Example Calculation

Given benchmark result scores:

```json
{
  "structuralCompliance": 0.85,
  "workflowAdherence": 1.0,
  "outputQuality": 1.0,
  "budgetCompliance": 1.0,
  "agentDelegation": 0.7
}
```

| Dimension | Formula | Score |
|-----------|---------|-------|
| Accuracy | 0.85 × 20 | 17.0 |
| Efficiency | 1.0 × 20 | 20.0 |
| Safety | 1.0 × 20 | 20.0 |
| Completeness | (1.0 × 0.5 + 0.85 × 0.5) × 20 | 18.5 |
| Communication | 0.7 × 20 | 14.0 |
| **Total** | | **89.5** |
| **Grade** | | **B** |

---

## CLI Usage

```bash
# Generate scorecard from all benchmarks
node scripts/run-benchmarks.js --scorecard

# Combine with verbose output
node scripts/run-benchmarks.js --scorecard --verbose

# Output written to: benchmarks/SCORECARD-{timestamp}.md
```

---

## Output File Format

Scorecard files are written to `benchmarks/SCORECARD-{timestamp}.md` with:

- Date and benchmark count header
- Per-benchmark dimension breakdown table
- Aggregate totals and grade
- Pass/fail verdict against ≥ 70 threshold
