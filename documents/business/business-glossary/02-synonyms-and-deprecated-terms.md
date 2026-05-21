# Synonyms and Deprecated Terms

> **Section**: Business Glossary | **File**: 02-synonyms-and-deprecated-terms.md
> **Purpose**: Aliases for all 31 terms, 8 explicitly deprecated terms with migration guidance

---

## Synonyms

### Orchestration Synonyms

| Canonical Term | Synonyms | Usage Notes |
|----------------|----------|-------------|
| Orchestrator | Coordinator, Controller, Director | All acceptable in documentation |
| Tier | Execution Tier, Tier Level | TIER is capitalized in rules |
| Phase | Stage, Step | Phase preferred in formal docs |
| Variant | Mode, Modifier, Suffix | Variant is canonical |
| Handoff | Transfer, Delegation, Hand-off | Handoff is canonical (no hyphen) |
| Consensus | Agreement, Alignment | Consensus preferred |

---

### Agent Synonyms

| Canonical Term | Synonyms | Usage Notes |
|----------------|----------|-------------|
| Agent | Specialist, Worker, Performer | Agent is canonical |
| Executor | Builder, Implementer, Developer | Executor is canonical in team context |
| Reviewer | Critic, Validator, Quality Gate | Reviewer is canonical |
| Tech Lead | Lead, Coordinator, Arbiter | Tech Lead is canonical |
| Team | Triangle, Squad | Team preferred; Triangle used in "Golden Triangle" |
| Meta Agent | Coordinator, Planner-type | Meta Agent is canonical |
| Execution Agent | Builder Agent, Impl Agent | Execution Agent is canonical |
| Validation Agent | QA Agent, Checker | Validation Agent is canonical |

---

### Command Synonyms

| Canonical Term | Synonyms | Usage Notes |
|----------------|----------|-------------|
| Command | Slash Command, Directive | Command is canonical |
| Router | Router System, Command Router | Router is canonical |
| Dispatch | Spawn, Invoke, Send | Dispatch is canonical |

---

### Skill Synonyms

| Canonical Term | Synonyms | Usage Notes |
|----------------|----------|-------------|
| Skill | Capability, Expertise, Domain Module | Skill is canonical |
| Matrix | Skill Matrix, Matrix Registry | Matrix is canonical |
| Profile | Agent Profile, Skill Profile | Profile is canonical |
| Resolution | Skill Resolution, Skill Matching | Resolution is canonical |

---

### Platform Synonyms

| Canonical Term | Synonyms | Usage Notes |
|----------------|----------|-------------|
| Platform | AI Tool, IDE, Coding Assistant | Platform is canonical |
| Cursor | Cursor IDE, Cursor AI | Cursor is canonical |
| Claude Code | Claude, Anthropic Code | Claude Code is canonical |
| Codex | OpenAI Codex, Codex CLI | Codex is canonical |

---

### Workflow Synonyms

| Canonical Term | Synonyms | Usage Notes |
|----------------|----------|-------------|
| Workflow | Process, Pipeline, Flow | Workflow is canonical |
| Actor | Participant, Stakeholder | Actor is canonical |
| SLA | Service Level, Performance Target | SLA is canonical |
| Mailbox | Communication Log, Message Log | Mailbox is canonical |

---

### Delivery Synonyms

| Canonical Term | Synonyms | Usage Notes |
|----------------|----------|-------------|
| Deliverable | Output, Artifact, Result | Deliverable is canonical |
| Consensus Stamp | Approval Stamp, Sign-off | Consensus Stamp is canonical |

---

## Deprecated Terms

### D1: "Agentic" (DEPRECATED)

**Status**: Deprecated
**Replacement**: "Orchestrated" or "Agent-coordinated"

**Rationale**: "Agentic" is an overused marketing term lacking precise meaning.

**Migration**:
```markdown
# Before (deprecated)
"This is an agentic workflow."

# After (correct)
"This is an orchestrated workflow."
```

**Reference**: N/A — style guideline

---

### D2: "Sub-Agent" (DEPRECATED in some contexts)

**Status**: Deprecated in favor of "TIER 1 agent"

**Replacement**: "TIER 1 agent" or "isolated agent"

**Rationale**: "Sub-agent" implies hierarchy; TIER 1 is about execution isolation.

**Migration**:
```markdown
# Before (deprecated)
"Use sub-agent for delegation."

# After (correct)
"Use TIER 1 (sub-agent) for delegation."
```

**Reference**: `rules/AGENTS.md` — TIERED EXECUTION

---

### D3: "Task" (Context-dependent)

**Status**: Deprecated in favor of specific terms

**Replacements**:
- Work item: "task" → "deliverable"
- Unit of work: "task" → "assignment"
- To-do item: "task" → "work item"

**Rationale**: "Task" is too generic; specific terms convey intent.

**Migration**:
```markdown
# Before (ambiguous)
"Assign the task to the agent."

# After (clear)
"Assign the deliverable to the executor."
```

**Reference**: N/A — terminology guideline

---

### D4: "Team Lead" (DEPRECATED)

**Status**: Deprecated
**Replacement**: "Tech Lead"

**Rationale**: "Team Lead" implies management; "Tech Lead" is technically precise.

**Migration**:
```markdown
# Before (deprecated)
"The team lead coordinates the work."

# After (correct)
"The Tech Lead coordinates the work."
```

**Reference**: `rules/TEAMS.md` — THE THREE ROLES

---

### D5: "Worker" (DEPRECATED)

**Status**: Deprecated
**Replacement**: "Agent" or "Executor"

**Rationale**: "Worker" is too generic; agent conveys specialization.

**Migration**:
```markdown
# Before (deprecated)
"Workers process the queue."

# After (correct)
"Agents process the delegation queue."
```

**Reference**: `rules/AGENTS.md` — AGENT CATEGORIES

---

### D6: "Slot" (DEPRECATED in skill context)

**Status**: Deprecated
**Replacement**: "Profile" or "Skill Profile"

**Rationale**: "Slot" was used in early HSOL drafts; replaced with "Profile".

**Migration**:
```markdown
# Before (deprecated)
"The agent declares its slot."

# After (correct)
"The agent declares its profile."
```

**Reference**: `rules/SKILLS.md` — RESOLUTION ALGORITHM

---

### D7: "Master Prompt" (DEPRECATED)

**Status**: Deprecated
**Replacement**: "Orchestration Rules" or "CORE rules"

**Rationale**: "Master Prompt" implies single instruction; Agent Assistant uses modular rules.

**Migration**:
```markdown
# Before (deprecated)
"Load the master prompt first."

# After (correct)
"Load CORE.md first — the single source of truth."
```

**Reference**: `rules/CORE.md` — Single Point of Truth (L1)

---

### D8: "Fast Path" (DEPRECATED)

**Status**: Deprecated
**Replacement**: ":fast variant"

**Rationale**: "Fast path" implies optimization; variant syntax is more precise.

**Migration**:
```markdown
# Before (deprecated)
"Use the fast path for simple tasks."

# After (correct)
"Use the :fast variant for simple tasks."
```

**Reference**: `rules/CORE.md` — COMMAND ROUTING

---

## Term Migration Guide

### When Updating Documentation

| Old Term | New Term | Action Required |
|----------|----------|-----------------|
| "Agentic" | "Orchestrated" | Find and replace all instances |
| "Sub-agent" | "TIER 1 agent" | Update rules documentation |
| Generic "Task" | Specific term | Review context, use appropriate term |
| "Team Lead" | "Tech Lead" | Find and replace in team docs |
| "Worker" | "Agent" or "Executor" | Update agent category docs |
| "Slot" | "Profile" | Update HSOL documentation |
| "Master Prompt" | "CORE rules" | Update onboarding docs |
| "Fast path" | ":fast variant" | Update command documentation |

---

## Alias Reference Table

| Canonical | Aliases | Deprecated |
|-----------|---------|------------|
| Orchestrator | Coordinator, Controller | — |
| Tier | Execution Tier | — |
| Phase | Stage, Step | — |
| Variant | Mode, Modifier | "Fast path" |
| Handoff | Transfer, Delegation | — |
| Consensus | Agreement, Alignment | — |
| Agent | Specialist, Worker | "Worker" |
| Executor | Builder, Implementer | — |
| Reviewer | Critic, Validator | — |
| Tech Lead | Lead, Coordinator | "Team Lead" |
| Team | Triangle, Squad | — |
| Meta Agent | Coordinator-type | — |
| Command | Slash Command, Directive | — |
| Router | Command Router | — |
| Dispatch | Spawn, Invoke | — |
| Skill | Capability, Expertise | — |
| Matrix | Skill Matrix | — |
| Profile | Skill Profile | "Slot" |
| Resolution | Skill Resolution | — |
| Platform | AI Tool, IDE | — |
| Workflow | Process, Pipeline | — |
| Actor | Participant, Stakeholder | — |
| SLA | Service Level | — |
| Mailbox | Communication Log | — |
| Deliverable | Output, Artifact | — |
| Consensus Stamp | Approval Stamp | — |

---

## Evidence Sources

- `rules/CORE.md` — Canonical orchestration terminology
- `rules/AGENTS.md` — Canonical agent terminology
- `rules/TEAMS.md` — Canonical team terminology (deprecates "Team Lead")
- `rules/SKILLS.md` — Canonical skill terminology (deprecates "Slot")
