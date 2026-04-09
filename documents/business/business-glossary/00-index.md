# Business Glossary

> **Purpose**: Canonical domain terminology, synonyms, deprecated terms, domain entities/events, and API term mappings for Agent Assistant.
> **Sub-files**: 4
> **Last Updated**: 2026-04-09

## Quick Summary

Agent Assistant introduces a specialized vocabulary for AI-assisted engineering orchestration. This glossary establishes canonical definitions for 19 core terms, maps 30+ synonyms and aliases, identifies 4 deprecated terms from prior versions, catalogs domain entities and events, and provides mappings between business terms and their technical representations in the codebase.

Consistent terminology is critical because Agent Assistant is a document-driven framework — agents, commands, and rules are defined in Markdown files that are parsed by AI models. Ambiguous terms lead to incorrect agent behavior. This glossary serves as the single source of truth for term meaning.

## Sub-Files

| File | Description |
|------|-------------|
| [01-canonical-terms.md](./01-canonical-terms.md) | Approved canonical terms and definitions |
| [02-synonyms-and-deprecated-terms.md](./02-synonyms-and-deprecated-terms.md) | Aliases, deprecated terms, and replacement guidance |
| [03-domain-entities-and-events.md](./03-domain-entities-and-events.md) | Entity and event vocabulary with meaning boundaries |
| [04-api-term-mapping.md](./04-api-term-mapping.md) | Mapping between domain terms and technical representations |

## Key Facts

| Key | Value |
|-----|-------|
| Canonical Terms | 19 |
| Synonyms/Aliases | 30+ |
| Deprecated Terms | 4 |
| Domain Entities | 10 |
| Domain Events | 8 |

## Cross-References

- [business-prd](../business-prd/00-index.md) — Requirements using these terms
- [business-features](../business-features/00-index.md) — Features referenced by ID
- [business-workflows](../business-workflows/00-index.md) — Workflows using these terms
- [knowledge-domain/01-entities.md](../../knowledge-domain/01-entities.md) — Technical entity definitions

## Known Gaps and Open Questions

- Community skill terminology may diverge as ecosystem grows; governance process needed
- Some terms (e.g., "topology") have general computing meanings that differ from framework-specific usage
- Localized glossaries for non-English users are not yet defined (personas have locale support but glossary does not)
