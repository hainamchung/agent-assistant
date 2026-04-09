---
schema-version: "1.0"
name: io-pipeline
version: "1.0"
severity: warning
applies-to: [all]
---

# I/O Pipeline Guardrail

## Purpose

Defines a 4-stage pipeline that all agent inputs and outputs pass through. Ensures consistent validation, processing, output formatting, and escalation across the agent-assistant framework.

## Pipeline Overview

```
INPUT → [Stage 1: Validate] → [Stage 2: Process] → [Stage 3: Format] → [Stage 4: Escalate?] → OUTPUT
```

Each stage has three severity levels: **strict**, **standard**, **minimal**. Agents configure levels via the optional `guardrail_levels:` frontmatter field. Default is `standard` for all stages.

---

## Stage 1: Input Validation

Validates incoming data before any agent processing begins.

| Level | Behavior |
|-------|----------|
| **strict** | Reject ambiguous input; require explicit confirmation for destructive operations; verify all referenced files/paths exist |
| **standard** | Flag ambiguous input with clarification prompt; warn on missing references; proceed with best-effort |
| **minimal** | Accept all input; only reject syntactically invalid commands |

### Rules

- **Rule 1.1**: Validate command structure matches expected format before routing
- **Rule 1.2**: Check that referenced file paths exist (strict: halt; standard: warn)
- **Rule 1.3**: Flag conflicting instructions in the same request

---

## Stage 2: Processing Guards

Constraints applied during agent execution.

| Level | Behavior |
|-------|----------|
| **strict** | Enforce scope boundaries — agent refuses out-of-scope tasks; validate every tool output before use |
| **standard** | Warn when scope boundaries approached; sample-check tool outputs |
| **minimal** | Log scope deviations; trust tool outputs |

### Rules

- **Rule 2.1**: Agent must not operate outside its declared `role-scope`
- **Rule 2.2**: External tool outputs (file reads, terminal results) must be sanity-checked before incorporation
- **Rule 2.3**: Large outputs (>50KB) must be summarized before passing to next agent

---

## Stage 3: Output Formatting

Ensures deliverables meet quality and format standards before delivery.

| Level | Behavior |
|-------|----------|
| **strict** | Validate output against schema if applicable; enforce file naming conventions; require exit criteria verification |
| **standard** | Check basic structure (headers, sections, required fields); warn on missing exit criteria |
| **minimal** | Pass through with basic structural check only |

### Rules

- **Rule 3.1**: All file deliverables must include required metadata (frontmatter where applicable)
- **Rule 3.2**: Code output must include language identifiers in fenced blocks
- **Rule 3.3**: Report-type outputs must end with summary section

---

## Stage 4: Escalation

Determines how pipeline violations are handled.

| Level | Behavior |
|-------|----------|
| **auto** | Route violations to appropriate handler: critical → halt + notify user; warning → log + continue; info → silent log |
| **manual** | All violations flagged to user for decision before proceeding |
| **none** | Violations logged only; no interruption |

### Rules

- **Rule 4.1**: Critical violations always halt regardless of escalation level
- **Rule 4.2**: Three or more warnings in a single pipeline pass trigger escalation upgrade to next level
- **Rule 4.3**: Escalation decisions are logged in agent output for auditability

---

## Agent Frontmatter Configuration

```yaml
guardrail_levels:
  input: standard     # strict | standard | minimal
  output: standard    # strict | standard | minimal
  escalation: auto    # auto | manual | none
```

When `guardrail_levels:` is absent, all stages default to `standard` / `auto`.

## Integration with Existing Guardrails

The I/O pipeline runs **in addition to** module-specific guardrails (`injection-defense`, `output-sanitization`). Module guardrails execute within Stage 2 (processing) as specialized checks.

---

## Concrete Examples

| Stage | Trigger | Action (standard level) |
|-------|---------|------------------------|
| 1 — Input | User says "delete everything" with no scope qualifier | Flag: "Destructive operation detected — please specify which files/directories" |
| 1 — Input | `/cook` with empty `$ARGUMENTS` | Prompt: "What feature should I implement?" |
| 2 — Processing | `backend-engineer` asked to write CSS | Warn: "Out of scope — routing to `frontend-engineer`" |
| 2 — Processing | Terminal command returns 200KB output | Summarize to key sections before passing to next phase |
| 3 — Output | Agent produces markdown file without frontmatter | Add required frontmatter before writing |
| 3 — Output | Code block lacks language identifier | Add language tag: ` ```typescript ` |
| 4 — Escalation | 3 warnings accumulated in pipeline pass | Upgrade to next escalation level; notify user |
| 4 — Escalation | Critical: agent attempts to write outside project directory | Halt immediately; notify user with details |
