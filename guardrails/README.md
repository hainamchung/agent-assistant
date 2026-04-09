# Guardrails Framework

> Composable safety modules that agents reference via frontmatter.
> **Enforcement model**: Prompt-level — guardrails are instructions to the LLM, not deterministic runtime checks.

## Purpose

Guardrails define reusable safety constraints that agents follow during execution. Each guardrail is a standalone markdown file in this directory. Agents opt-in by listing guardrail names in their `guardrails:` frontmatter field.

## How It Works

1. Agent frontmatter declares: `guardrails: [injection-defense, ...]`
2. RUNTIME.md §LOAD ON DEMAND triggers loading: `guardrails/{module-name}.md`
3. Orchestrator loads referenced guardrail files when embodying the agent
4. Agent follows guardrail rules as additional constraints during execution

## Module File Format

Each guardrail module uses this structure:

```yaml
---
name: {module-name}
version: "1.0"
severity: {critical|warning|info}
applies-to: [all]  # or specific agent categories: [execution, validation]
---
```

### Sections

- **Purpose**: 1–2 sentences explaining why this guardrail exists
- **Rules**: Numbered rules with Trigger, Severity, Action, and Examples
- **Severity Scale**: Table defining critical/warning/info actions

## Severity Scale

| Level | Meaning | Agent Action |
|-------|---------|:------------:|
| **critical** | Security threat, data loss risk | **HALT** — refuse to proceed, explain why |
| **warning** | Potential issue, not confirmed | **FLAG** — warn user, proceed with documented caution |
| **info** | Best practice reminder | **LOG** — note in output, proceed normally |

## Agent Frontmatter Integration

Add optional `guardrails:` field to agent YAML frontmatter:

```yaml
guardrails:
  - injection-defense
  - {other-module-name}
```

Each entry must match a filename (without `.md`) in this directory.

## Available Modules

| Module | Severity | Applies To | Description |
|--------|----------|------------|-------------|
| `injection-defense` | critical | all | Protects against prompt injection, secrets leakage, command injection, and path traversal |
| `output-sanitization` | critical | all | Scans generated code for hardcoded secrets, SQL/XSS/command injection patterns, insecure crypto, and debug leftovers |
| `io-pipeline` | warning | all | 4-stage I/O pipeline (validate → process → format → escalate) with configurable severity levels |
| `data-privacy` | critical | all | Prevents PII exposure, credential leakage, and unauthorized data transmission |
| `auth-patterns` | critical | execution | Enforces secure authentication/authorization patterns in generated code |
| `violation-escalation` | critical | all | 3-stage violation detection, mitigation, and escalation protocol |

## Creating a New Guardrail Module

1. Copy the template above
2. Save as `guardrails/{module-name}.md`
3. Define rules following the format
4. Reference from agent frontmatter

## Enforcement Model: Advisory-Only

> **Guardrails are advisory, not deterministic.** They are prompt-level instructions, not runtime checks.

- Guardrails are **best-effort, prompt-level** safety layers
- Enforcement depends on LLM compliance — there is no runtime validation engine
- LLMs may not consistently follow complex guardrail rules across all platforms
- Guardrails are NOT deterministic runtime enforcement
- Do not rely on guardrails as the sole line of defense for critical security
- **Recommendation**: Pair guardrails with external tooling (linters, SAST, pre-commit hooks) for defense-in-depth
