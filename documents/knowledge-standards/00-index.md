# Knowledge Standards

> **Purpose**: Coding standards, naming conventions, git workflow, and testing standards.
> **Sub-files**: 4
> **Last Updated**: 2026-04-09

## Quick Summary

Agent Assistant follows a set of coding standards, conventions, and workflows designed for a document-heavy framework. Since most of the codebase is Markdown and YAML rather than traditional application code, the standards focus on: agent/command schema compliance, YAML frontmatter conventions, Markdown structure patterns, commit message formatting, and CI validation gates.

The project uses conventional commits enforced by Husky, semantic-release for automated publishing, and a multi-step CI pipeline that validates schema compliance, handoff integrity, word budgets, and security audits.

## Sub-Files

| # | File | Description |
|---|------|-------------|
| 01 | [01-code-style.md](./01-code-style.md) | Code style for JavaScript, Markdown, and YAML |
| 02 | [02-conventions.md](./02-conventions.md) | Naming conventions, file organization, and patterns |
| 03 | [03-git-workflow.md](./03-git-workflow.md) | Branching strategy, commit format, PR process |
| 04 | [04-testing-standards.md](./04-testing-standards.md) | Testing approach, tools, and coverage expectations |

## Cross-References

- [knowledge-source-base/](../knowledge-source-base/00-index.md) — WHERE files live (directory map)
- [knowledge-domain/](../knowledge-domain/00-index.md) — Schema definitions and business rules
- [knowledge-architecture/](../knowledge-architecture/00-index.md) — Design patterns and decisions
