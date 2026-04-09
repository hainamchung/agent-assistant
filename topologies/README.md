# Orchestration Topologies

> Execution patterns for workflow orchestration. Commands declare `topology:` in frontmatter.

## Available Topologies

| Topology | Status | Description |
|----------|:------:|-------------|
| `pipeline` | **Active** | Sequential phase execution (default) |
| `fan-out` | **Active** | Parallel independent task dispatch |
| `hierarchical` | **Active** | Delegated tree-structured execution |
| `golden-triangle` | **Active** | 3-agent adversarial collaboration (:team variants) |
| `parallel-branch` | **Active** | Branch into parallel sub-tasks with structured merge |
| `round-robin` | Documented | Rotating agent assignment (future activation) |
| `swarm` | Documented | Autonomous self-organization (future activation) |

### Templates (Use-Case Specific)

| Template | Base Topology | Description |
|----------|:------------:|-------------|
| `review-pipeline` | pipeline | Code review workflow (reviewer → security-engineer → tech-lead) |
| `research-fan-out` | fan-out | Multi-source research (researcher ×N → brainstormer synthesis) |
| `debate-round-robin` | round-robin | Multi-perspective analysis (brainstormer → researcher → reviewer rotating) |
| `feature-hierarchical` | hierarchical | Full-stack feature build (tech-lead → backend + frontend + database) |
| `audit-pipeline` | pipeline | Security/quality audit (scouter → security-engineer → reviewer → reporter) |

## Usage

Add `topology:` field to command frontmatter:

```yaml
---
topology: fan-out
---
```

Commands without `topology:` default to `pipeline`.

## Active vs Documented

- **Active**: Dispatch rules in RUNTIME.md §COMMAND ROUTING. Orchestrator follows these automatically.
- **Documented**: Protocol files in this directory. Loaded on-demand when referenced. Not yet in RUNTIME.md dispatch rules — requires manual orchestrator guidance.

## When to Use Each

| Situation | Recommended Topology |
|-----------|---------------------|
| Standard linear workflow (default) | `pipeline` |
| Multiple independent research tasks | `fan-out` |
| Complex multi-domain features | `hierarchical` |
| Adversarial team collaboration | `golden-triangle` |
| Parallel sub-tasks with merge | `parallel-branch` |
| Distributing review across reviewers | `round-robin` (future) |
| Creative exploration | `swarm` (future) |

## Decision Matrix

Use this matrix to select the optimal topology for a given task:

| Criterion | pipeline | fan-out | hierarchical | golden-triangle | parallel-branch |
|-----------|:--------:|:-------:|:------------:|:---------------:|:---------------:|
| Sequential dependencies | ✅ Best | ❌ | ⚠️ | ⚠️ | ❌ |
| Independent subtasks | ❌ | ✅ Best | ✅ | ❌ | ✅ |
| Quality-critical output | ⚠️ | ❌ | ⚠️ | ✅ Best | ⚠️ |
| Multi-domain coordination | ❌ | ⚠️ | ✅ Best | ⚠️ | ⚠️ |
| Context efficiency | ✅ | ⚠️ | ⚠️ | ❌ (3x agents) | ⚠️ |
| Conflict resolution built-in | ❌ | ❌ | ✅ | ✅ Best | ❌ |

**✅** = Optimal | **⚠️** = Usable with trade-offs | **❌** = Poor fit

### Quick Selection Guide

```
Is this a :team variant? → golden-triangle
Are tasks independent and ≥ 4? → fan-out
Are tasks independent and ≤ 3 with merge? → parallel-branch
Does work need multi-level delegation? → hierarchical
Default / linear workflow → pipeline
```

### Fan-Out vs Parallel-Branch

These topologies both dispatch work concurrently but differ in structure:

| Aspect | `fan-out` | `parallel-branch` |
|--------|-----------|-------------------|
| **Branch limit** | Unbounded (N tasks) | Max 3 branches (ADR-S3-006) |
| **Merge strategy** | Simple synthesis | Formal merge (concatenate / vote / synthesize) |
| **Use case** | Many independent research tasks, file scans | Structured parallel work with combined deliverable |
| **Cross-talk** | Results collected then synthesized | Strict isolation until merge phase |

**Rule of thumb**: Use `fan-out` for ≥ 4 independent tasks or when formal merging isn't needed. Use `parallel-branch` for ≤ 3 tasks requiring structured result combination.

## Advanced: Per-Phase Topology Override

Commands can use different topologies for different phases by adding `topology-overrides` to the YAML frontmatter:

```yaml
---
topology: pipeline              # default topology for all phases
topology-overrides:             # optional per-phase overrides
  phase-1: fan-out              # phase 1 uses fan-out instead of pipeline
  phase-3: review-pipeline      # phase 3 uses review-pipeline
  # phase-2 and phase-4 use default topology (pipeline)
---
```

### Resolution Protocol

1. Read command frontmatter `topology-overrides:` field
2. For the current phase:
   - IF `topology-overrides[phase-N]` exists → use that topology
   - ELSE IF command has `topology:` default → use default
   - ELSE → use system default (`pipeline`)
3. Validate: topology file must exist in `topologies/` directory
4. Backward compatible — commands without `topology-overrides` work as before

### Example: Research-to-Implementation Workflow

A workflow that combines exploration, debate, sequential implementation, and staged review:

```yaml
---
topology: pipeline
topology-overrides:
  phase-1: research-fan-out     # multiple researchers explore in parallel
  phase-2: debate-round-robin   # agents debate findings in rotation
  phase-4: review-pipeline      # staged review chain
  # phase-3 uses default pipeline for sequential implementation
---
```

**Rationale**:
- **Phase 1** (`research-fan-out`): Discovery benefits from parallel exploration across multiple sources
- **Phase 2** (`debate-round-robin`): Analysis benefits from diverse perspectives in rotation
- **Phase 3** (`pipeline`): Implementation is sequential by nature — each step builds on the previous
- **Phase 4** (`review-pipeline`): Staged review ensures quality at each gate
