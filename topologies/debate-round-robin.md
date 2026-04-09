---
schema-version: "1.0"
name: debate-round-robin
description: Multi-perspective rotating debate and analysis (brainstormer → researcher → reviewer rotating)
status: active
---

# Multi-Perspective Analysis — Round-Robin

> Template for rotating multi-perspective debate and analysis. Based on `round-robin.md`.

## Agent Slots

| Phase | Agent | Role |
|-------|-------|------|
| 1 | brainstormer | Generate initial perspectives and hypotheses |
| 2 | researcher | Validate claims with evidence and data |
| 3 | reviewer | Critique reasoning, identify gaps and biases |
| 4+ | (rotate 1→2→3) | Iterative refinement until convergence |

## Phase Structure

### Phase 1: Perspective Generation
- Entry: Problem statement or decision to analyze
- Agent: brainstormer
- Exit: Set of distinct perspectives, hypotheses, or options with initial reasoning

### Phase 2: Evidence Gathering
- Entry: Phase 1 perspectives
- Agent: researcher
- Exit: Evidence-backed assessment of each perspective, data points collected

### Phase 3: Critical Review
- Entry: Phase 1 perspectives + Phase 2 evidence
- Agent: reviewer
- Exit: Critique report identifying logical gaps, biases, and unresolved questions

### Phase 4+: Rotation (if needed)
- Entry: Accumulated analysis from prior phases
- Agent: Rotate brainstormer → researcher → reviewer
- Exit: Convergence reached (no new substantive objections) or max 2 rotations

## Exit Criteria

- [ ] Minimum one full rotation completed (all 3 agents contributed)
- [ ] Key perspectives backed by evidence or explicitly flagged as speculative
- [ ] Critical gaps identified and either resolved or documented
- [ ] Final recommendation or ranked options delivered

## Command Frontmatter

```yaml
topology: round-robin
topology_template: debate-round-robin
```
