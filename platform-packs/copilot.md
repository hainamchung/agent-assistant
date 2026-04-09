---
platform: copilot
source: platforms.json → copilot
tier-default: full
last-verified: 2025-04-07
---

# GitHub Copilot — Platform Adaptation Pack

## Capabilities Summary

| Capability | Status |
|-----------|--------|
| Sub-agents | ✅ Supported (`runSubagent`) |
| Terminal | ✅ Full access |
| File edit | ✅ Native |
| Web search | ⚠️ Via tool (fetch_webpage) |
| MCP | ✅ Supported |
| Background tasks | ✅ Supported |
| Max context | ~200k tokens |

## Execution Model

GitHub Copilot supports the **enhanced** execution model:
- Sub-agents dispatch via `runSubagent` tool
- Parallel execution for `:team` workflows
- Background terminal processes supported
- MCP server integration for extended capabilities

## Constraints

- **Web search limited**: Only via `fetch_webpage` tool, not native browsing
- **Token ceiling**: ~200k context window; monitor utilization
- **Tool availability**: Some tools are deferred and must be loaded via search

## Recommendations

- Use `full` tier loading — Copilot has capacity for complete RUNTIME.md
- Leverage sub-agents for `:team` variants (parallel Golden Triangle)
- Use MCP integrations for Git operations and external services
- Prefer `fetch_webpage` for targeted URL retrieval (not general search)

## Workarounds

| Missing | Workaround |
|---------|-----------|
| Native web search | Use `fetch_webpage` tool for specific URLs |
| General search | Use terminal with `curl` or MCP search tools |

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
