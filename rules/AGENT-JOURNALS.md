# Agent Journals

> Load when: Agents need to record decisions, observations, or lessons within a workflow.
> Purpose: Provide a lightweight per-agent memory system that persists within a single workflow execution.

---

## Overview

Agent journals capture an agent's reasoning, observations, and decisions during workflow execution. Unlike checkpoints (which track workflow state), journals track **agent-level insights** that may inform later phases or post-workflow analysis.

---

## Journal Entry Format

```markdown
### [{agent-name}] {timestamp} — {entry-type}

{Free-form content: observation, decision rationale, warning, or recommendation}

**Context**: Phase {N}, Step {description}
**Confidence**: {high|medium|low}
```

### Entry Types

| Type | When to Write |
|------|--------------|
| `DECISION` | Agent chose between alternatives — record rationale |
| `OBSERVATION` | Agent noticed something relevant but outside current scope |
| `WARNING` | Agent flagged a potential issue for later phases |
| `RECOMMENDATION` | Agent suggests action for a different agent or future sprint |

---

## Journal Protocol

### Writing Entries

1. Agents write journal entries **inline in their phase output** using the format above
2. Entries are collected by the orchestrator at phase boundaries
3. Maximum 3 entries per agent per phase (conciseness constraint)
4. Each entry must be ≤100 words (excluding metadata lines)

### Reading Entries

1. At phase start, orchestrator may surface relevant prior entries to the current agent
2. Relevance is determined by: same topic, same file scope, or explicit cross-reference
3. Agents should **not** assume prior journal entries exist — treat as optional context

### Lifecycle

- Journals exist for the **duration of a single workflow execution**
- They are NOT persisted to disk unless the workflow includes a report phase
- Report-type commands (`/report`, `/review`) include journal summaries in their deliverable
- Checkpoint files may reference journal entry counts but not full content

---

## Storage

Journals are held in-context (not written to files) during execution. For workflows with a report phase, the reporter agent includes a **Journal Summary** section:

```markdown
## Journal Summary

| Agent | Phase | Type | Key Insight |
|-------|-------|------|-------------|
| backend-engineer | 2 | DECISION | Chose Strategy Pattern over if/else chain for extensibility |
| reviewer | 3 | WARNING | Missing error handling in auth middleware |
| tester | 3 | OBSERVATION | Edge case: empty array input not covered by specs |
```

---

## Integration Points

- **DURABLE-EXECUTION.md**: Checkpoint files record `journal_entry_count` per phase but not content
- **VALIDATION-GATES.md**: Quality gates may check that journal warnings were addressed
- **TEAMS-LITE.md**: Team lead can reference team member journal entries in consensus stamp
- **CONDITIONAL-HANDOFFS.md**: Journal warning count can influence handoff guards (`warnings > N`)

---

## Constraints

- Journals are **advisory only** — they do not block workflow progression
- Agents must not fabricate journal entries for phases they did not participate in
- Journal entries from validation/research agents carry higher weight in post-analysis
- No sensitive data (credentials, PII) in journal entries
