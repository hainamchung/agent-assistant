# Contributing to Agent Assistant

Thank you for your interest in contributing to Agent Assistant! This project grows through community contributions, and there are several ways to participate — from a 5-minute documentation fix to a 30-minute new agent definition.

---

## Quick Wins (5-30 Minutes)

### 1. Add a Matrix Skill (~10 min)

The fastest way to contribute. Drop a skill file into the appropriate domain folder.

```bash
skills/<domain>/
```

Create a file named `<your-skill>.md` with this structure:

```markdown
---
name: your-skill-name
description: One-sentence description of what this skill covers
domains: ["backend", "architecture"]
priority: 10
---

# Your Skill Name

[Your skill content here — best practices, patterns, gotchas]
```

Your skill is instantly available to every relevant agent. No code review needed for v1 — trust by default, report by issue.

### 2. Improve Documentation (~5 min)

Every wiki page and README section is fair game. Found a typo? Better phrasing? A missing example? Open a PR.

### 3. Fix a Bug

Find an issue tagged `good-first-issue` and submit a fix.

---

## Moderate Contributions (30-60 Minutes)

### 4. Create a New Agent (~20 min)

Define an agent in the `agents/` directory with a profile and responsibilities:

```bash
agents/
├── teams/           # Team definitions (techlead, executor, reviewer)
├── wiki-architect.md
├── wiki-extractor.md
└── wiki-reviewer.md
```

An agent file looks like:

```markdown
# Your Agent Name

**Role**: One-line description of this agent's role

**Profile**: `domain:capability` (e.g., `backend:execution`)

**Responsibilities**:
- What this agent does
- What it owns
- What it delegates

**Trigger**: Which commands invoke this agent

**Skills injected**: Which skill domains apply
```

### 5. Add a Command Variant (~30 min)

Extend an existing command with a new `:variant`. Create a new file in the commands directory:

```bash
commands/<command>/<variant>.md
```

Each variant file defines the execution phases and agent assignments for that variant.

---

## Showcase Contributions

### 6. Submit an Agent Story

Run Agent Assistant on a real project and share the results. Create a JSON file in `showcase/`:

```json
{
  "title": "Stripe Billing in 90 Minutes",
  "agents": ["tech-lead", "backend-engineer", "reviewer", "docs-manager"],
  "command": "/cook:hard 'implement Stripe billing with usage-based pricing'",
  "outcome": "3 files written, 42 tests generated, full API docs created",
  "time_saved": "2.5 days",
  "contributor": "your-github-username"
}
```

### 7. Share Your Wiki Output

Run `/wiki:team` on your project and share the generated wiki as a PR to the showcase gallery. This helps future users see real-world examples.

---

## Process

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/your-contribution`
3. **Make your changes** following the project's conventions
4. **Test** if applicable — run `/wiki lint` to validate wiki quality
5. **Commit** using conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`
6. **Open a Pull Request** with a clear description

---

## Ideas for Contributions

Not sure where to start? Here are ideas ranked by impact:

| Priority | Idea | Why it matters |
|----------|------|----------------|
| High | Add skills for under-represented domains (Rust, Go, Swift) | Expands agent capabilities |
| High | Create showcase agent stories | Social proof + test coverage |
| Medium | Build a new team definition (e.g., `data-engineering-team`) | Demonstrates extensibility |
| Medium | Add real user testimonials | Builds trust for new users |
| Low | Internationalization | Expands global reach |
| Low | Video walkthroughs | Converts more visitors to users |

---

## Getting Help

- **Issues**: [Open a GitHub issue](https://github.com/hainamchung/agent-assistant/issues)
- **Discussions**: [Start a GitHub Discussion](https://github.com/hainamchung/agent-assistant/discussions)
- **Discord/Slack**: (link coming soon)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
