---
platform: qwen
source: platforms.json → qwen
tier-default: micro
last-verified: 2025-04-08
---

# Qwen — Platform Adaptation Pack

## Capabilities Summary

| Capability | Status |
|-----------|--------|
| Sub-agents | ❌ Not supported |
| Terminal | ✅ Full access |
| File edit | ✅ Native |
| Web search | ❌ Not supported |
| MCP | ❌ Not supported |
| Background tasks | ❌ Not supported |
| Max context | ~128k tokens |

## Execution Model

Qwen uses the **standard** execution model:
- No sub-agent dispatch — all agents execute via EMBODY mode
- Sequential execution only; no parallel agent dispatch
- Context isolation maintained via Anti-Bias Protocol for evaluators

## Constraints

- **No sub-agents**: All `:team` workflows must use EMBODY fallback
- **No background tasks**: Long-running operations block the session
- **No web search**: Use terminal with curl for web requests
- **No MCP**: External integrations via terminal only
- **Context limit**: ~128k tokens; aggressive budget management needed

## Recommendations

- Use `micro` tier loading — conserve context for task execution
- For `:team` variants, apply EMBODY + Anti-Bias Protocol
- Use terminal with curl/wget for any web-based research
- Keep prompts concise to maximize available context budget
