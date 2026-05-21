---
title: Error Handling
type: runbook
tags: [errors, handling, troubleshooting, debugging]
created: 2026-05-20
updated: 2026-05-20
---

# Error Handling

Error handling standards define how Agent Assistant classifies, responds to, and recovers from errors. Errors are classified by severity, each with a defined response. The propagation chain ensures errors reach the appropriate level for resolution.

---

## Error Severity Classification

Errors are classified into 3 severity levels, each with a defined response:

| Severity | Response | Retry Policy | Example |
|----------|----------|-------------|---------|
| **Warning** | Log only, continue execution | No retry | Missing optional dependency |
| **Error** | Retry with backoff, escalate if persistent | 3 attempts (1s, 2s, stop) | Network timeout, file not found |
| **Critical** | Stop immediately, escalate | No retry | Security vulnerability, data corruption |

**Source**: `documents/knowledge-domain/04-business-rules.md:256-285`

---

## Retry Policy

Errors with the Error severity use exponential backoff:

### Backoff Sequence

| Attempt | Delay | Total Wait |
|---------|-------|-----------|
| 1 | 1 second | 1 second |
| 2 | 2 seconds | 3 seconds |
| 3 | 4 seconds | 7 seconds |
| — | Stop | — |

After 3 failed attempts, the error is escalated to the next level.

### Retry Conditions

**Retry when**:
- Network timeouts (transient)
- Temporary file system issues
- Rate limiting responses
- Service unavailable (503)

**Do not retry when**:
- Authentication failures (4xx)
- Validation errors (user input)
- Non-idempotent operations
- Critical severity errors

---

## Error Propagation Chain

Errors propagate through the execution chain, with each level having the opportunity to handle or escalate:

```
Agent
  └─→ Team
        └─→ Command
              └─→ User
```

### Level 1: Agent Level

The agent detects and attempts to handle the error:
- Log the error with context
- Attempt retry if applicable
- If unresolvable, pass to Team level

### Level 2: Team Level

The team coordinates error resolution:
- Check if other agents can help
- Attempt escalation if within retry budget
- If unresolvable, pass to Command level

### Level 3: Command Level

The command layer handles terminal errors:
- Format error for user presentation
- Include actionable remediation steps
- Log for system monitoring

### Level 4: User Level

The user receives a formatted error message:
- Clear explanation of what failed
- Suggested remediation
- Error code for support reference

---

## Error Codes

Error codes follow the `{CATEGORY}-{NUMBER}` format:

| Category | Prefix | Example | Description |
|----------|--------|---------|-------------|
| Installation | `INSTALL` | `INSTALL-001` | CLI installation errors |
| Agent | `AGENT` | `AGENT-001` | Agent loading/execution errors |
| Command | `COMMAND` | `COMMAND-001` | Command parsing/routing errors |
| Skill | `SKILL` | `SKILL-001` | Skill loading/injection errors |
| Team | `TEAM` | `TEAM-001` | Team coordination errors |
| Platform | `PLATFORM` | `PLATFORM-001` | Platform detection/config errors |

### Error Code Format

```
{CATEGORY}-{NUMBER}

Example: INSTALL-001: Platform directory not found
```

---

## Common Error Scenarios

### Installation Errors

| Error Code | Cause | Resolution |
|-----------|-------|-----------|
| INSTALL-001 | Platform directory not found | Create directory or check path |
| INSTALL-002 | Write permission denied | Check directory permissions |
| INSTALL-003 | Path replacement failed | Verify config.toml syntax |

### Agent Errors

| Error Code | Cause | Resolution |
|-----------|-------|-----------|
| AGENT-001 | Agent file not found | Check agent definition exists |
| AGENT-002 | Invalid frontmatter | Fix YAML syntax in agent file |
| AGENT-003 | Circular skill dependency | Remove circular references |

### Command Errors

| Error Code | Cause | Resolution |
|-----------|-------|-----------|
| COMMAND-001 | Unknown command | Use valid command or check spelling |
| COMMAND-002 | Invalid variant | Use fast, hard, or team |
| COMMAND-003 | Missing required parameter | Provide required parameter |

### Skill Errors

| Error Code | Cause | Resolution |
|-----------|-------|-----------|
| SKILL-001 | Skill not found | Check skill identifier |
| SKILL-002 | Context overflow | Reduce number of skills |
| SKILL-003 | Tier not found | Use valid tier name |

---

## Troubleshooting

### Step 1: Identify the Error Code

Error codes are prefixed with the category, making it easy to locate the source.

### Step 2: Check the Category

Each category has specific common causes:
- **INSTALL**: Path issues, permissions, configuration
- **AGENT**: Definition problems, skill issues
- **COMMAND**: Syntax errors, parameter issues
- **SKILL**: Loading problems, context limits
- **TEAM**: Coordination issues, escalation failures
- **PLATFORM**: Detection failures, config issues

### Step 3: Check Logs

Detailed error logs are written for all Error and Critical severity issues. Logs include:
- Error code and message
- Stack trace (if applicable)
- Context (command, agent, platform)
- Retry attempt count (if applicable)

---

## Best Practices

- **Always include error codes** in user-facing messages for support reference
- **Log at the appropriate level** — WARNING for recoverable, ERROR for retry-worthy, CRITICAL for fatal
- **Provide actionable messages** — tell the user what to do, not just what went wrong
- **Preserve error context** — include relevant IDs, paths, and parameters in logs

---

## Related Pages

- [[Rule System]] — The 8 orchestration rules including error handling
- [[Business Rules]] — BR-060 through BR-062 governing error handling
