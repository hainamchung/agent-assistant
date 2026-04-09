# RUNTIME Reference — DEPRECATED

> ⚠️ **DEPRECATED**: All sections have been consolidated into `REFERENCE.md`.
> This file is retained for archival purposes only. Do NOT reference this file in new code.
> Use `REFERENCE.md` §Phase Recovery Protocol, §Working Memory, §Platform Capabilities instead.

---

_Original content below (archived):_

---

## Phase Recovery Protocol

On phase FAILURE:

| Step | Action |
|:----:|--------|
| 1 | CAPTURE error context: what failed, error description, partial output |
| 2 | RETRY phase once with error context appended to agent instructions |
| 3 | IF retry succeeds → continue to next phase normally |
| 4 | IF retry fails → HALT with `RECOVERY_FAILED` status |

```
RECOVERY_FAILED:
  Phase: {N} — {name}
  Agent: {agent}
  Error: {description}
  Attempted: 1 retry with error context
  Status: HALTED — manual intervention required
  Deliverables so far: {list of completed phase outputs}
```

**Rules**:
- Maximum 1 retry per phase (no retry loops)
- Retry includes error context from first failure
- RECOVERY_FAILED preserves `_checkpoint.md` for later manual resume
- ⚠️ Review `_checkpoint.md` for sensitive data (credentials, tokens, internal paths) before sharing or committing to version control
- RECOVERY_FAILED deletes `_working.md` (cleanup)

---

## Working Memory

- At workflow start: CREATE `_working.md` in report directory (`./reports/{topic}/`)
- At workflow start: CREATE `_trace.md` (append-only execution trace)
- Trace row: `| {#} | {HH:MM:SS} | {agent} | {phase} | {action} | {status} |`
- During phases: agents APPEND entries as `- [{HH:MM}] [{agent-name}]: {content}`
- At workflow end: DELETE `_working.md`
- At workflow end: DELETE `_trace.md` on success; PRESERVE on failure
- Max: 500 lines recommended; summarize oldest entries if exceeded
- On RECOVERY_FAILED: DELETE `_working.md` during cleanup

---

## Platform Capabilities

| Platform | Sub-agent | File I/O | Terminal | Web |
|----------|-----------|----------|----------|-----|
| Cursor | ❌ | ✅ | ✅ | ❌ |
| GitHub Copilot | ✅* | ✅ | ✅ | ✅* |
| Claude Code | ✅ | ✅ | ✅ | ❌ |
| Gemini | ❌ | ✅ | ✅ | ❌ |
| Codex | ❌ | ✅ | ✅ | ❌ |
| Qwen | ❌ | ✅ | ✅ | ❌ |

*Platform-dependent. Check at runtime via Tool Discovery.

### Dynamic Capability Check

Read `platforms.json` → current platform → `capabilities` object.
IF capability is `false`:
  → Use `adapter_hints.tool_alternatives[capability]` for fallback
  → Log: "⚠️ {capability} unavailable — using alternative"
