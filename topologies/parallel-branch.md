---
schema-version: "1.0"
name: parallel-branch
description: Branch task into parallel sub-tasks with structured merge
status: active
---

# Parallel-Branch Topology

> Split → Execute in parallel → Merge results.

## Semantics

Orchestrator decomposes a task into N independent branches (max 3). Each branch executes the same or different agents on its sub-task. Branches have **no cross-dependency** — they cannot read each other's outputs. After all branches complete, a merge step combines results using a declared strategy.

## Constraints

- **3-branch cap**: Maximum 3 parallel branches per split (ADR-S3-006)
- **Static only**: Branches are declared upfront; no dynamic spawning at runtime
- **No cross-talk**: Branch outputs are isolated until merge phase
- **Single merge**: One merge step per branch group; no cascading merges

## Branch/Merge Protocol

### 1. SPLIT Phase
```yaml
split:
  task: "{parent task description}"
  branches:
    - id: B1
      agent: {agent-name}
      sub-task: "{description of branch 1 work}"
    - id: B2
      agent: {agent-name}
      sub-task: "{description of branch 2 work}"
    - id: B3                    # Optional — max 3
      agent: {agent-name}
      sub-task: "{description of branch 3 work}"
```

### 2. EXECUTE Phase
```yaml
execute:
  mode: auto    # Resolves per §EXECUTION_MODEL in RUNTIME.md
  # Platforms with sub-agent support → parallel dispatch
  # Platforms without → sequential EMBODY with context isolation
  isolation: strict   # Each branch sees only its own sub-task + shared context
```

### 3. MERGE Phase
```yaml
merge:
  strategy: concatenate | vote | synthesize
  agent: {merge-agent}          # Agent performing the merge (optional for concatenate)
  output: "{description of expected merged output}"
```

## Merge Strategies

| Strategy | Mechanism | Best For |
|----------|-----------|----------|
| **concatenate** | Append branch outputs in declared order (B1 → B2 → B3) | Research, documentation, data gathering |
| **vote** | Majority agreement across branches; discard outliers | Decisions, pass/fail checks, yes/no questions |
| **synthesize** | Merge agent combines outputs into unified result via LLM | Plans, designs, complex deliverables |

### Conflict Handling

| Strategy | On Conflict |
|----------|-------------|
| **concatenate** | Mark with `⚠️ CONFLICT: B{n} and B{m} disagree on {topic}` markers; preserve both |
| **vote** | No majority → escalate to `tech-lead` with all branch outputs |
| **synthesize** | Merge agent must acknowledge divergence and state resolution rationale |

## Execution Model Integration

Resolves via `§EXECUTION_MODEL` in `rules/RUNTIME.md`:

- **Sub-agent available**: Dispatch branches as parallel sub-agents. Merge agent runs after all complete.
- **Sub-agent unavailable**: Sequential EMBODY execution. Orchestrator EMBODIES each branch agent in order (B1 → B2 → B3), maintaining strict context isolation — each branch sees only shared context + its sub-task, never prior branch outputs. After all branches complete, orchestrator EMBODIES merge agent with all outputs.

```
PARALLEL_BRANCH(task, branches, strategy):
  VALIDATE branches.length <= 3
  FOR EACH branch IN branches:
    IF platform.sub_agent_available:
      DISPATCH branch.agent(branch.sub_task)   # parallel
    ELSE:
      EMBODY branch.agent                       # sequential
      ISOLATE context to [shared + branch.sub_task]
      EXECUTE → store branch.output
      EXIT EMBODY
  AWAIT all branches
  MERGE(strategy, branch_outputs)
```

## When to Use

- Multiple independent perspectives needed on the same problem
- Research across different domains or sources
- Parallel review of code, docs, or designs
- Any task decomposable into ≤3 independent sub-tasks

## When NOT to Use

- Tasks with sequential dependencies (use `pipeline`)
- More than 3 sub-tasks needed (use `fan-out` with synthesis)
- Sub-tasks that need to read each other's outputs (use `pipeline` or `hierarchical`)

## Command Frontmatter

```yaml
topology: parallel-branch
merge-strategy: synthesize    # concatenate | vote | synthesize
```

## Relationship to Existing Topologies

| Topology | Difference |
|----------|-----------|
| `fan-out` | Fan-out is unbounded dispatch; parallel-branch enforces 3-cap + formal merge strategies |
| `pipeline` | Pipeline is sequential; parallel-branch executes branches concurrently |
| `hierarchical` | Hierarchical has delegator→worker tree; parallel-branch is flat split→merge |

## Worked Example: Research Phase with 3 Parallel Researchers

**Scenario**: Evaluate 3 database options for a new microservice.

```yaml
split:
  task: "Evaluate database options for user-events microservice"
  branches:
    - id: B1
      agent: researcher
      sub-task: "Analyze PostgreSQL: scalability, JSON support, ecosystem, operational cost"
    - id: B2
      agent: researcher
      sub-task: "Analyze MongoDB: scalability, schema flexibility, ecosystem, operational cost"
    - id: B3
      agent: researcher
      sub-task: "Analyze DynamoDB: scalability, serverless fit, ecosystem, operational cost"

execute:
  mode: auto
  isolation: strict

merge:
  strategy: synthesize
  agent: tech-lead
  output: "Comparative analysis with recommendation and trade-off matrix"
```

**Branch outputs** (isolated):
- B1: PostgreSQL analysis (strengths, weaknesses, scores)
- B2: MongoDB analysis (strengths, weaknesses, scores)
- B3: DynamoDB analysis (strengths, weaknesses, scores)

**Merge (synthesize)**: tech-lead receives all three, produces:
- Side-by-side comparison matrix
- Weighted scoring across dimensions
- Final recommendation with rationale
- Dissent acknowledgment if branches conflict
