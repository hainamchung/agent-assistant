---
schema-version: "1.0"
name: research-fan-out
description: Parallel multi-source research with brainstormer synthesis
status: active
---

# Multi-Source Research — Fan-Out

> Template for parallel multi-source research with synthesis. Based on `fan-out.md`.

## Agent Slots

| Phase | Agent | Role |
|-------|-------|------|
| 1a–1N | researcher (×N) | Independent source/topic research |
| 2 | brainstormer | Synthesis of research findings into actionable insights |

## Phase Structure

### Phase 1: Parallel Research (Fan-Out)
- Entry: Research brief with N defined topics or sources
- Agent: researcher (one instance per topic)
- Exit: Each researcher delivers a structured findings report

### Phase 2: Synthesis
- Entry: All Phase 1 findings reports collected
- Agent: brainstormer
- Exit: Unified synthesis with patterns, contradictions, and recommendations

## Exit Criteria

- [ ] All N research tasks completed with structured findings
- [ ] Synthesis identifies cross-source patterns and contradictions
- [ ] Actionable recommendations provided with source citations
- [ ] Knowledge gaps explicitly noted

## Command Frontmatter

```yaml
topology: fan-out
topology_template: research-fan-out
```
