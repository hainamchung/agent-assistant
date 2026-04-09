---
id: liaison-protocol
title: Liaison Protocol
description: Defines how agents hand off work to external teams and systems
version: "1.0"
updated: "2026-04-08"
scope: integration
type: rule
section: integration
---

# LIAISON-PROTOCOL — External System Communication Bridge

> On-demand rule defining how designated agents communicate with external systems.

---

## Concept

A **liaison agent** is an agent that serves as a communication bridge between the orchestrator ecosystem and external systems (humans, CI pipelines, monitoring, ticketing, chat). Liaison agents translate internal workflow events into external-facing messages and relay external responses back into the orchestration flow.

Only agents explicitly designated as liaisons may initiate external communication.

---

## Liaison Triggers

An agent becomes a liaison when its frontmatter declares:

```yaml
liaison: true
liaison_targets: [human, ci, monitoring, ticketing, chat]
```

- `liaison: true` — enables the agent as an external communication bridge
- `liaison_targets` — non-empty array of external system types this agent may contact

If `liaison` is absent or `false`, the agent MUST NOT have `liaison_targets`.

---

## External System Types

| Type | Description | Examples |
|------|-------------|----------|
| `human` | Human stakeholder | Product owner, client, end user |
| `ci` | CI/CD pipeline | GitHub Actions, GitLab CI, Jenkins |
| `monitoring` | Monitoring/alerting system | Datadog, PagerDuty, Grafana |
| `ticketing` | Issue tracker | Jira, Linear, GitHub Issues |
| `chat` | Chat platform | Slack, Teams, Discord |

---

## Message Format

All liaison handoffs use this structured format:

```yaml
liaison_message:
  from: {agent_name}
  to: {external_system}
  type: {notification|request|escalation}
  priority: {low|medium|high|critical}
  summary: {one-line summary}
  details: {detailed message}
  requires_response: {boolean}
  timeout: {duration, e.g., "24h"}
```

| Field | Required | Description |
|-------|----------|-------------|
| `from` | Yes | Agent name initiating the message |
| `to` | Yes | External system type from allowed list |
| `type` | Yes | `notification` (FYI), `request` (action needed), `escalation` (urgent) |
| `priority` | Yes | `low`, `medium`, `high`, `critical` |
| `summary` | Yes | One-line summary of the message |
| `details` | Yes | Full message body |
| `requires_response` | Yes | Whether the external system must respond |
| `timeout` | If `requires_response: true` | Duration before escalation (e.g., `"24h"`, `"1h"`) |

---

## Security Constraints

1. **Redaction**: Liaison messages undergo the same dual-layer redaction as traces (see `TRACE-SCHEMA.md`):
   - Layer 1: Field-name redaction — `/key|secret|token|password|credential|api[_-]?key/i`
   - Layer 2: Value-level redaction — known secret prefixes and long base64 strings
2. **No credentials**: Messages MUST NOT contain passwords, API keys, tokens, or secrets
3. **No URLs**: External system identifiers only — URLs are configured separately in environment/deployment configuration, never embedded in messages

---

## Escalation Rules

If a liaison message with `requires_response: true` does not receive a response within the specified `timeout`:

1. **Agent** → retries once with `type: escalation`, `priority` bumped one level
2. **tech-lead** → if agent retry fails, escalate to tech-lead
3. **project-manager** → if tech-lead cannot resolve, escalate to project-manager
4. **human** → final escalation to human stakeholder

Escalation chain: `agent → tech-lead → project-manager → human`

Each escalation step inherits the original message context and appends the escalation reason.

---

## Audit

All liaison messages MUST be logged to:

```
reports/{topic}/liaison/
```

Log entries include the full `liaison_message` (post-redaction), timestamp, and response status. This directory is append-only during a workflow run.
