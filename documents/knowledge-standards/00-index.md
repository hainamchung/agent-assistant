# Knowledge Standards

> **Folder**: `documents/knowledge-standards/`
> **Purpose**: Code style, conventions, git workflow, and testing standards
> **Audience**: All contributors, developers, anyone writing code or documentation

---

## Summary

This folder contains the coding standards and conventions that all contributors must follow. These standards ensure consistency across the codebase, maintain quality, and enable smooth collaboration.

---

## Sub-Files

| File | Title | Purpose | Audience |
|------|-------|---------|----------|
| `00-index.md` | Standards Index | Navigation and overview | All |
| `01-code-style.md` | Code Style | JavaScript, TypeScript, Markdown styles | Developers |
| `02-conventions.md` | Conventions | Naming, file structure, patterns | All |
| `03-git-workflow.md` | Git Workflow | Commits, branches, releases | All |
| `04-testing-standards.md` | Testing Standards | Testing practices and patterns | Developers |

---

## Quick Facts

| Attribute | Value |
|-----------|-------|
| **Language** | JavaScript ES2022+, TypeScript |
| **Format** | Markdown files |
| **CI/CD** | Semantic Release + Husky |
| **Commit Format** | Conventional Commits |
| **Testing** | node --test |
| **Linting** | node --check |

---

## Naming Convention Quick Reference

| Type | Convention | Example |
|------|------------|---------|
| Files (JS) | kebab-case | `my-file.js` |
| Files (TS) | kebab-case | `my-file.ts` |
| Files (React) | PascalCase | `MyComponent.tsx` |
| Agent files | kebab-case | `agent-backend-engineer.md` |
| Command files | kebab-case | `cook.md` |
| Team folders | kebab-case | `backend-team/` |
| Directories | kebab-case | `my-directory/` |
| Variables | camelCase | `myVariable` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |
| Classes | PascalCase | `MyClass` |
| React Components | PascalCase | `MyComponent` |
| TypeScript Types | PascalCase | `MyType` |

---

## Cross-References

| Reference | Destination | Relationship |
|-----------|-------------|--------------|
| Architecture | `../knowledge-architecture/00-index.md` | System design |
| Domain | `../knowledge-domain/00-index.md` | Entities and rules |
| Source | `../knowledge-source-base/00-index.md` | Code structure |

---

## Evidence Sources

- `package.json` — NPM configuration
- `.releaserc.json` — Release configuration
- `cli/install.js` — Code style examples
- `web/` — TypeScript/React examples
- `rules/` — Markdown conventions
