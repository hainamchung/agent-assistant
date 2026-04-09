---
platform: cursor
source: platforms.json → cursor
tier-default: micro
last-verified: 2025-04-07
---

# Cursor — Platform Adaptation Pack

## Capabilities Summary

| Capability | Status |
|-----------|--------|
| Sub-agents | ❌ Not supported |
| Terminal | ✅ Full access |
| File edit | ✅ Native |
| Web search | ✅ Supported |
| MCP | ✅ Supported |
| Background tasks | ❌ Not supported |
| Max context | ~128k tokens |

## Execution Model

Cursor uses the **standard** execution model:
- No sub-agent dispatch — all agents execute via EMBODY mode
- Sequential execution only; no parallel agent dispatch
- Context isolation maintained via Anti-Bias Protocol for evaluators

## Constraints

- **No sub-agents**: All `:team` workflows must use EMBODY fallback
- **No background tasks**: Long-running operations block the session
- **Context limit**: ~128k tokens; more aggressive budget management needed

## Recommendations

- Use `micro` tier loading — conserve context for task execution
- For `:team` variants, apply EMBODY + Anti-Bias Protocol
- Leverage web search for research tasks (native capability)
- Prefer MCP integrations for external data

## Workarounds

| Missing | Workaround |
|---------|-----------|
| Sub-agents | EMBODY mode with strict context isolation |
| Background tasks | Break long tasks into sequential phases |

## Skill Tier Loading

```
tier: micro
reason: 128k context requires conservative loading; load RUNTIME.md §NANO + §MICRO only
fallback: nano (if context exceeds 70% utilization)
```

## RUNTIME.md Tier Selection

| Tier | When to Use |
|------|-------------|
| nano | Simple, single-step questions or lookups |
| micro | Default — standard single-agent tasks |
| full | Only when explicitly needed and context allows |
```
