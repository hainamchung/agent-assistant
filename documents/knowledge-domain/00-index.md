# Knowledge Domain

> **Purpose**: Domain entities, data models, business rules, and API contracts specific to the Agent Assistant framework.
> **Sub-files**: 4
> **Last Updated**: 2026-04-09

## Quick Summary

Agent Assistant's domain model centers on orchestration entities rather than traditional application data. The core entities are: Agent, Command, Topology, Skill, Guardrail, Rule, Team, Persona, and Platform. There is no database and no HTTP API — all data is stored in Markdown/YAML files on the filesystem. Business rules are enforced through protocol documents, schema validation, and CI checks.

The domain's "contracts" are the agent frontmatter schema (validated by lint-agents.js), the command workflow structure, the skill registry YAML format, and the platform configuration JSON schema.

## Sub-Files

| # | File | Description |
|---|------|-------------|
| 01 | [01-entities.md](./01-entities.md) | Core domain entities with attributes and relationships |
| 02 | [02-data-models.md](./02-data-models.md) | Data schemas, file formats, and storage patterns |
| 03 | [03-api-contracts.md](./03-api-contracts.md) | Inter-component contracts and interface definitions |
| 04 | [04-business-rules.md](./04-business-rules.md) | Business rules, constraints, and validation logic |

## Cross-References

- [knowledge-source-base/](../knowledge-source-base/00-index.md) — WHERE entities are defined (file locations)
- [knowledge-architecture/](../knowledge-architecture/00-index.md) — HOW entities interact (system design)
- [knowledge-standards/](../knowledge-standards/00-index.md) — Conventions for adding new entities

## Known Gaps

- No formal JSON Schema or OpenAPI spec exists; schemas are defined in `schemas/agent-schema.md` (Markdown) and enforced by custom scripts
- The MCP server (`scripts/mcp-server.js`) provides an external integration interface but is supplementary, not the primary API
