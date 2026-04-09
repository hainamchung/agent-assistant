# TRACE-SCHEMA — Execution Trace Format

> On-demand rule defining the structured trace format for workflow executions.

---

## Overview

Traces capture a complete record of a workflow execution: which command ran, what phases executed, which agents participated, and what deliverables were produced. Traces use **YAML frontmatter + Markdown body** format, consistent with all other project artifacts.

---

## Trace File Format

### YAML Frontmatter — Structured Fields

```yaml
---
type: trace
command: "<command>:<variant>"       # e.g. "plan:team", "cook:fast", "review"
topic: "<topic-directory-name>"      # e.g. "improve-project-v2"
started: "2026-04-08T10:00:00Z"     # ISO 8601 — earliest deliverable timestamp
completed: "2026-04-08T10:45:00Z"   # ISO 8601 — latest deliverable timestamp
total_phases: 3                      # integer count of phases executed
total_deliverables: 7                # integer count of deliverables found
agents_involved:                     # list of unique agent names
  - planner
  - researcher
  - tech-lead
phases:                              # ordered array of phase records
  - name: "Phase 1 — Research"
    agent: "researcher"
    deliverables:
      - path: "researchers/RESEARCH-topic.md"
        status: "complete"
  - name: "Phase 2 — Planning"
    agent: "planner"
    deliverables:
      - path: "plans/PLAN-sprint7.md"
        status: "complete"
---
```

### Markdown Body

The body contains a human-readable execution summary:

```markdown
# Trace: plan:team — improve-project-v2

**Generated**: 2026-04-08T10:45:00Z

## Phases

### Phase 1 — Research
- **Agent**: researcher
- **Deliverables**: researchers/RESEARCH-topic.md (complete)

### Phase 2 — Planning
- **Agent**: planner
- **Deliverables**: plans/PLAN-sprint7.md (complete)

## Summary
- Total phases: 2
- Total deliverables: 2
- Agents involved: researcher, planner
```

---

## Field Definitions

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| `type` | string | literal | Always `"trace"` |
| `command` | string | CLI arg | Command and optional variant |
| `topic` | string | CLI arg | Topic directory name |
| `started` | string | deliverable frontmatter | Earliest timestamp across deliverables |
| `completed` | string | deliverable frontmatter | Latest timestamp or generation time |
| `total_phases` | integer | phase output sections | Count of distinct phases |
| `total_deliverables` | integer | deliverable scan | Count of .md files with frontmatter |
| `agents_involved` | array | deliverable frontmatter | Unique agent names from `agent` fields |
| `phases` | array | MAILBOX + deliverables | Ordered phase records |

---

## Input Source Matrix

| Data Element | Primary Source | Fallback |
|-------------|---------------|----------|
| Command name | CLI argument | — |
| Topic name | CLI argument (directory name) | — |
| Deliverable metadata | Frontmatter fields (`agent`, `status`, `date`) | Filename convention |
| Phase names/order | MAILBOX files (`## [TIMESTAMP] MESSAGE_TYPE \| AGENT`) | Directory structure order |
| Timestamps | Frontmatter `date` field | File `mtime` |
| Agent names | Frontmatter `agent` field | MAILBOX sender field |
| Checkpoint data | `_checkpoint.md` frontmatter | — |

---

## Dual-Layer Redaction Specification

All trace generation **MUST** apply dual-layer redaction before writing any output.

### Layer 1 — Field-Name Redaction

**Pattern**: `/key|secret|token|password|credential|api[_-]?key/i`

Any frontmatter field whose **name** matches this pattern is omitted entirely from the trace output. The field and its value are stripped — neither appears in the generated trace.

**Examples of redacted field names**:
- `api_key`, `apiKey`, `api-key`
- `secret`, `client_secret`
- `token`, `auth_token`
- `password`, `db_password`
- `credential`, `credentials`

### Layer 2 — Value-Level Redaction

**Pattern**: `/(ghp_|sk-|AKIA|xox[bpas]-|glpat-)[A-Za-z0-9_\-]{10,}|[A-Za-z0-9+\/]{40,}={0,2}/g`

Any string **value** matching this pattern is replaced with `[REDACTED]`. This catches:

| Prefix | Service |
|--------|---------|
| `ghp_` | GitHub personal access tokens |
| `sk-` | OpenAI / Stripe secret keys |
| `AKIA` | AWS access key IDs |
| `xoxb-`, `xoxp-`, `xoxa-`, `xoxs-` | Slack tokens |
| `glpat-` | GitLab personal access tokens |
| _(no prefix, 40+ base64 chars)_ | Generic long secrets |

**Redaction order**: Layer 1 runs first (field-name filtering), then Layer 2 runs on all remaining string values.

---

## File Output Location

Traces are written to:

```
reports/{topic}/traces/TRACE-{command}-{timestamp}.md
```

- `{command}`: Command name with `:` replaced by `-` (e.g., `plan-team`)
- `{timestamp}`: ISO 8601 compact format `YYYYMMDDTHHMMSS`
- The `traces/` subdirectory is created automatically if absent

---

## .gitignore Recommendation

Add `traces/` to `.gitignore` to prevent accidental commit of trace files which may contain execution metadata:

```gitignore
# Execution traces (generated, may contain sensitive metadata)
traces/
**/traces/
```

---

## Validation Rules

1. Trace frontmatter **MUST** include all required fields: `type`, `command`, `topic`, `started`, `completed`, `total_phases`, `total_deliverables`, `agents_involved`, `phases`
2. All timestamps **MUST** be valid ISO 8601
3. `total_phases` **MUST** equal `phases.length`
4. `total_deliverables` **MUST** equal the sum of deliverables across all phases
5. Dual-layer redaction **MUST** be applied before write — no exceptions
6. File paths **MUST** pass safePath validation (no traversal)
