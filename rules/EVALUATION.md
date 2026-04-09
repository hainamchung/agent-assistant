---
schema-version: "1.0"
name: evaluation-protocol
description: 5-dimension LLM-as-Judge evaluation rubric with 2-pass anchor-citing methodology
category: quality
---

# Evaluation Protocol

## Purpose
Structured quality evaluation protocol for assessing agent outputs in multi-agent workflows.
Loaded via RUNTIME.md §LOAD ON DEMAND → "Evaluation".

> **Scope**: This 5-dimension rubric is the **formal evaluation standard** for `:team` review phases
> and multi-pass quality assessments. For quick deliverable scoring in non-team workflows,
> use RUNTIME.md §Quality Scorecard (3-dimension) instead.

Replaces informal "looks good" reviews with anchor-cited, dimension-based assessment.

## Evaluation Dimensions

| Dim | Name | Weight | Description |
|:---:|------|:------:|-------------|
| D1 | **Correctness** | 30% | Factual accuracy, no hallucinations, code compiles/runs |
| D2 | **Completeness** | 25% | All acceptance criteria addressed, no gaps |
| D3 | **Format Compliance** | 15% | Follows prescribed format, frontmatter valid, structure correct |
| D4 | **Security & Safety** | 20% | No OWASP violations, guardrail compliant, no data leakage |
| D5 | **Actionability** | 10% | Output is directly usable, clear next steps, no ambiguity |

**Total**: 100%. Weighted score = Σ(dimension_score × weight).

### D1: Correctness (30%)

| Score | Anchor Definition |
|:-----:|-------------------|
| 5 | All facts verified. Code compiles and passes tests. No hallucinations. |
| 4 | Minor inaccuracies that don't affect functionality. Code compiles with warnings. |
| 3 | Some factual errors that need correction. Code has fixable bugs. |
| 2 | Significant errors. Code doesn't compile. Multiple incorrect claims. |
| 1 | Fundamentally wrong. Major hallucinations. Code is nonfunctional. |

### D2: Completeness (25%)

| Score | Anchor Definition |
|:-----:|-------------------|
| 5 | All acceptance criteria fully addressed. No gaps or missing elements. |
| 4 | 90%+ criteria addressed. Minor omissions that are easy to add. |
| 3 | 70-89% criteria addressed. Notable gaps requiring follow-up. |
| 2 | 50-69% criteria addressed. Major sections missing. |
| 1 | <50% criteria addressed. Most requirements unmet. |

### D3: Format Compliance (15%)

| Score | Anchor Definition |
|:-----:|-------------------|
| 5 | Perfect format. Frontmatter valid. All sections present. Markdown renders correctly. |
| 4 | Minor formatting issues (e.g., inconsistent heading levels). No structural problems. |
| 3 | Some structural issues (missing sections, wrong heading hierarchy). |
| 2 | Significant format violations. Missing frontmatter. Broken markdown. |
| 1 | No format compliance. Free-form text where structured output expected. |

### D4: Security & Safety (20%)

| Score | Anchor Definition |
|:-----:|-------------------|
| 5 | No security concerns. Guardrail compliant. OWASP clean. Input validated. |
| 4 | Minor security style issues. No actual vulnerabilities. |
| 3 | Potential vulnerability identified but mitigated. Guardrail boundary case. |
| 2 | Unmitigated vulnerability. Guardrail violation at Severity 2. |
| 1 | Critical security issue. Injection risk. Data exposure. Severity 3 violation. |

### D5: Actionability (10%)

| Score | Anchor Definition |
|:-----:|-------------------|
| 5 | Output immediately usable. Copy-paste ready. Clear next steps documented. |
| 4 | Minor clarifications needed. Mostly usable as-is. |
| 3 | Needs interpretation or context to use. Some ambiguous instructions. |
| 2 | Requires significant rework before usable. Unclear deliverable. |
| 1 | Not usable. Vague output. No clear action items. |

## 2-Pass Evaluation Methodology

### Why 2-Pass?
Single-pass evaluation risks anchoring bias (first impression dominates). 2-pass with different focus masks prevents this.

### Pass 1: Dimension Scoring
**Focus**: Score each dimension independently.
**Instruction**: Read the output once. For each dimension D1-D5, assign a score 1-5 using the anchor definitions above. Write a 1-sentence justification citing specific evidence from the output.

**Output format**:
```
### Pass 1: Dimension Scoring

| Dim | Score | Evidence |
|:---:|:-----:|----------|
| D1 | {1-5} | "{quoted text or specific fact}" — {why this score} |
| D2 | {1-5} | "{quoted text or specific fact}" — {why this score} |
| D3 | {1-5} | "{quoted text or specific fact}" — {why this score} |
| D4 | {1-5} | "{quoted text or specific fact}" — {why this score} |
| D5 | {1-5} | "{quoted text or specific fact}" — {why this score} |
```

### Pass 2: Holistic Reassessment
**Focus**: After scoring all dimensions, re-read the output holistically. Look for cross-cutting issues that individual dimensions might miss.

**Check for**:
1. **Score consistency**: Does a D1=5 (perfect correctness) make sense if D2=2 (incomplete)?
2. **Missing context**: Did Pass 1 miss something that holistic reading reveals?
3. **Severity calibration**: Are scores consistent with calibration samples?

**Adjust**: If any score changes, document the adjustment:
```
### Pass 2: Adjustments

| Dim | Pass 1 | Pass 2 | Reason for Change |
|:---:|:------:|:------:|-------------------|
| D2 | 4 | 3 | "Missing section X noticed in holistic read" |
```

### Final Verdict
```
### Verdict

**Weighted Score**: {calculated: Σ(score_i × weight_i), range 1.0–5.0}
**Rating**: {EXCELLENT (≥4.5) | GOOD (3.5-4.4) | ACCEPTABLE (2.5-3.4) | NEEDS-WORK (<2.5)}
**D4 Override**: {D4 ≤ 2 → automatic REJECT regardless of score — applied: yes/no}
**Decision**: {APPROVE | APPROVE-WITH-CONDITIONS | REVISE | REJECT}
**Key Strengths**: {1-2 bullet points}
**Key Issues**: {1-2 bullet points, if any}
```

### Rating→Decision Mapping

| Rating | Score Range | Default Decision |
|--------|:----------:|:----------------:|
| EXCELLENT | ≥ 4.5 | APPROVE |
| GOOD | 3.5 - 4.4 | APPROVE-WITH-CONDITIONS |
| ACCEPTABLE | 2.5 - 3.4 | REVISE |
| NEEDS-WORK | < 2.5 | REJECT |

**Override rule**: If D4 (Security) ≤ 2 → automatic REJECT regardless of overall score.

## Calibration

Calibration samples establish ground truth for consistent scoring across evaluators.
Located in: `reports/evaluation-calibration/`

Each calibration sample includes:
- Input (what was asked)
- Output (what was produced)
- Expected scores per dimension with justifications
- Known issues to catch
