---
title: Git Workflow
type: chronicle
tags: [git, workflow, commit, release, ci]
created: 2026-05-20
updated: 2026-05-20
---

# Git Workflow

The Agent Assistant Git workflow uses Semantic Release with Conventional Commits and Husky v8 for automated versioning, changelog generation, and pre-commit validation.

---

## Branch Strategy

```
main (protected)
  └── develop (optional integration)
       └── feature/*, fix/*, docs/*, etc.
```

| Branch | Purpose | Protection |
|--------|---------|-----------|
| `main` | Production-ready code | Protected (PR required, reviews) |
| `develop` | Integration branch (optional) | Protected |
| `feature/*` | New features | Open |
| `fix/*` | Bug fixes | Open |
| `docs/*` | Documentation | Open |

**Source**: `documents/knowledge-standards/03-git-workflow.md:1-337`

---

## Commit Message Format

Commit messages follow the Conventional Commits specification:

```
type(scope): description

[optional body]

[optional footer]
```

### Commit Types

| Type | Description | Included in Changelog | SemVer Impact |
|------|-------------|----------------------|---------------|
| feat | New feature | Yes | minor |
| fix | Bug fix | Yes | patch |
| docs | Documentation only | No | patch |
| style | Formatting, white-space | No | patch |
| refactor | Code change (no fix/feature) | No | patch |
| perf | Performance improvement | No | patch |
| test | Adding or updating tests | No | patch |
| chore | Build, tooling, dependencies | No | patch |
| build | Build system changes | No | patch |
| ci | CI/CD configuration | No | patch |
| revert | Reverting a previous commit | No | patch |

### Examples

```
feat(auth): add JWT token generation
fix(api): handle null response from external service
docs(readme): update installation instructions
refactor(cli): extract path resolution to separate module
```

### Rules

- Use imperative mood: "add" not "added" or "adds"
- Keep subject line under 72 characters
- Reference issues in footer: `Closes #123` or `Fixes #456`

---

## Semantic Release

Semantic Release automates versioning and changelog generation based on commit messages.

### Configuration

`.releaserc.json` defines the release process:

```json
{
  "preset": "conventionalcommits",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/github",
    "@semantic-release/npm"
  ]
}
```

### Version Calculation

| Commit Pattern | Version Bump |
|---------------|-------------|
| `feat: ...` | minor (e.g., 4.0.0 → 4.1.0) |
| `fix: ...` | patch (e.g., 4.0.0 → 4.0.1) |
| `feat: ...` with `BREAKING CHANGE` | major (e.g., 4.0.0 → 5.0.0) |

### Release Process

```
1. Merge feature branch to main
2. Semantic Release analyzes commits since last release
3. Version is calculated based on commit types
4. CHANGELOG.md is regenerated
5. GitHub release is created with release notes
6. npm package is published (if applicable)
```

---

## Husky v8 Hooks

Husky v8 provides Git hooks for pre-commit and commit-msg validation.

### pre-commit Hook

Runs before every commit:

```bash
npm test
npm run lint
```

If either fails, the commit is rejected.

### commit-msg Hook

Validates commit message format:

- Must match Conventional Commits format
- Must have valid type
- Must have non-empty description

---

## CI Pipeline

The CI pipeline runs on every pull request and merge:

```yaml
steps:
  - checkout
  - setup-node (node >= 18.0.0)
  - npm install
  - node --check (CLI syntax validation)
  - npm test (unit tests)
  - npm run lint (ESLint)
  - npm run build (web production build)
```

| Step | Purpose | Fail Behavior |
|------|---------|--------------|
| `node --check` | Validate CLI JavaScript syntax | Blocks commit |
| `npm test` | Run unit tests | Blocks commit |
| `npm run lint` | ESLint validation | Blocks commit |
| `npm run build` | Production build | Blocks commit |

---

## Pull Request Checklist

Before merging a PR:

- [ ] Title follows Conventional Commits format
- [ ] Description summarizes changes
- [ ] All CI checks pass
- [ ] Changes are tested
- [ ] Documentation updated (if applicable)
- [ ] No merge conflicts

---

## Related Pages

- [[Testing Standards]] — Test runner, linting, and coverage
