---
platform: claude
source: platforms.json → claude
tier-default: full
last-verified: 2025-04-07
---

# Claude Code — Platform Adaptation Pack

## Capabilities Summary

| Capability | Status |
|-----------|--------|
| Sub-agents | ✅ Supported (`runSubagent`) |
| Terminal | ✅ Full access |
| File edit | ✅ Native |
| Web search | ❌ Not available |
| MCP | ✅ Supported |
| Background tasks | ✅ Supported |
| Max context | ~200k tokens |

## Execution Model

Claude Code supports the **enhanced** execution model:
- Sub-agents dispatch with full context isolation
- Parallel execution via `runSubagent` tool
- Background task management for long-running operations

## Constraints

- **No web search**: Cannot directly browse or search the web
- **Token ceiling**: ~200k context window; monitor with `measure-context.js`

## Recommendations

- Use `full` tier loading — Claude Code has capacity for complete RUNTIME.md
- Leverage sub-agents for `:team` variants (parallel Golden Triangle)
- Use MCP tools for external integrations
- Apply XML tags for structured data (Claude preference)

## Workarounds

| Missing | Workaround |
|---------|-----------|
| Web search | Use terminal with `curl` for HTTP requests |

## Skill Tier Loading

```
tier: full
reason: 200k context supports full RUNTIME.md + all on-demand files
fallback: micro (if context exceeds 80% utilization)
```

## RUNTIME.md Tier Selection

| Tier | When to Use |
|------|-------------|
| nano | Simple, single-step questions or lookups |
| micro | Standard single-agent tasks |
| full | Default — prefer this for multi-phase workflows |
```
