---
name: agent-tool-builder
description: "Design and implement tools for LLM agents with clear schemas, descriptive documentation, and robust error handling. Use when creating function-calling tools, MCP servers, tool validation logic, or debugging agent tool invocation failures. Covers JSON Schema design, input validation, error messages that help agents recover, and tool composition patterns."
risk: unknown
source: "vibeship-spawner-skills (Apache 2.0)"
date_added: "2026-02-27"
---

# Agent Tool Builder

Create tools that LLM agents can reliably discover, understand, and invoke — focusing on schema clarity over implementation complexity.

## Core Principle

The LLM never sees your code. It only sees the schema and description. A perfectly implemented tool with a vague description will fail. A simple tool with crystal-clear documentation will succeed.

## Workflow

1. **Define the tool's purpose** — write the description first, as if explaining to someone who can only read the schema
2. **Design the JSON Schema** — use descriptive field names, add `description` to every parameter, constrain types and enums
3. **Implement with explicit errors** — return structured error messages that tell the agent what went wrong and how to fix it
4. **Test with the LLM** — verify the agent can invoke the tool correctly from natural language across edge cases
5. **Iterate on the schema** — if the agent misuses the tool, improve the description before adding code guards

## Tool Schema Design

```json
{
  "name": "search_documents",
  "description": "Search indexed documents by semantic query. Returns top-k results ranked by relevance. Use when the user asks about specific topics, needs citations, or references past content.",
  "parameters": {
    "query": {
      "type": "string",
      "description": "Natural language search query. Be specific — 'Python async error handling' works better than 'Python'."
    },
    "limit": {
      "type": "integer",
      "description": "Maximum results to return (1-20). Default: 5.",
      "default": 5,
      "minimum": 1,
      "maximum": 20
    },
    "filter_topic": {
      "type": "string",
      "enum": ["backend", "frontend", "infra", "docs"],
      "description": "Optional topic filter to narrow results."
    }
  },
  "required": ["query"]
}
```

## Error Handling Pattern

Return errors that help the agent self-correct:

```
BAD:  {"error": "Invalid input"}
GOOD: {"error": "Parameter 'date' must be ISO 8601 format (YYYY-MM-DD). Received: 'March 5'. Try: '2026-03-05'"}
```

## Anti-Patterns

- **Vague descriptions** — "Does stuff with data" forces the agent to guess. Be specific about what the tool does, when to use it, and what it returns.
- **Silent failures** — returning empty results without explanation causes the agent to retry or hallucinate. Always return a clear status.
- **Too many tools** — agents perform worse with 20+ tools. Group related operations into fewer tools with mode parameters.

## When to Use

Use when creating tools for function-calling agents, building MCP servers, designing API interfaces that LLMs consume, or debugging cases where agents invoke tools incorrectly.

## Related Skills

Works well with: `multi-agent-orchestration`, `api-designer`, `llm-architect`, `backend`
