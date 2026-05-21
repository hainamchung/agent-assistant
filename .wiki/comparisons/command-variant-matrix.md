---
title: Command Variant Matrix
type: comparison
tags: [command, variants, matrix, comparison, routing]
created: 2026-05-20
updated: 2026-05-20
---

# Command Variant Matrix

The Command Variant Matrix provides a side-by-side comparison of the three execution variants — fast, hard, and team — across all 14 commands. Use this matrix to select the appropriate variant for your task.

---

## Overview

Every command in Agent Assistant supports three execution variants. The variant determines how many agents participate, how much review occurs, and how long execution takes.

| Variant | Agents | Review Depth | Speed | Best For |
|---------|--------|-------------|-------|----------|
| **fast** | 2–3 | Self-review | Fastest | Quick wins, low-risk changes |
| **hard** | 5–8 | Standard review | Moderate | Complex work, multiple components |
| **team** | Tech Lead + Executor + Reviewer | Adversarial (3 rounds max) | Slowest | High-stakes, architectural, critical |

---

## Variant Comparison Table

| Command | fast | hard | team |
|---------|------|------|------|
| `/cook` | 2 agents, self-review | 5 agents, standard review | Golden Triangle adversarial |
| `/code` | 2 agents, self-review | 5 agents, standard review | Golden Triangle adversarial |
| `/fix` | 2 agents, self-review | 5 agents, standard review | Golden Triangle adversarial |
| `/plan` | 2 agents, self-review | 5 agents, standard review | Golden Triangle adversarial |
| `/debug` | 1–2 agents, self-review | 4 agents, standard review | Golden Triangle adversarial |
| `/test` | 1 agent, self-review | 3 agents, standard review | Golden Triangle adversarial |
| `/review` | 1 agent, self-review | 3 agents, standard review | Golden Triangle adversarial |
| `/docs` | 1 agent, self-review | 3 agents, standard review | Golden Triangle adversarial |
| `/design` | 1–2 agents, self-review | 4 agents, standard review | Golden Triangle adversarial |
| `/deploy` | 2 agents, self-review | 5 agents, standard review | Golden Triangle adversarial |
| `/report` | 1 agent, self-review | 3 agents, standard review | Golden Triangle adversarial |
| `/wiki` | 2 agents, self-review | 4 agents, standard review | Golden Triangle adversarial |
| `/brainstorm` | 1 agent, self-review | 3 agents, standard review | Golden Triangle adversarial |
| `/ask` | 1 agent, self-review | 2 agents, standard review | Golden Triangle adversarial |

**Source**: `documents/knowledge-architecture/03-data-flow.md:72-79`, `documents/knowledge-overview/03-features.md`

---

## Detailed Variant Comparison

### fast (Default)

**When to use**:
- Documentation fixes and typo corrections
- Simple feature additions (single file)
- Quick bug patches with clear root cause
- Low-risk changes that are easily reversible

**When to avoid**:
- Multi-file changes
- Changes affecting shared components
- Security-sensitive code
- Architectural decisions

**Example scenarios**:
```
/fix "correct typo in error message"
/docs "add missing parameter documentation"
/code "add console.log for debugging"
```

### hard

**When to use**:
- Features spanning multiple files or components
- Changes to shared utilities or libraries
- Refactoring that affects multiple modules
- Work requiring multiple specializations

**When to avoid**:
- Single-file changes (overhead not justified)
- Security-critical changes (use team)
- Architectural decisions (use team)

**Example scenarios**:
```
/cook:hard "implement user authentication with JWT"
/fix:hard "resolve memory leak in data processing pipeline"
/plan:hard "redesign the database schema for scalability"
```

### team (Golden Triangle)

**When to use**:
- Security-sensitive changes (authentication, authorization, encryption)
- Architectural decisions (API design, data model changes)
- Changes to critical path code
- Any work where quality failures have significant impact
- When the cost of bugs is high

**When to avoid**:
- Simple, reversible changes (overhead not justified)
- Time-critical fixes (adversarial review takes longer)
- Exploratory work or spike solutions

**Example scenarios**:
```
/cook:team "redesign the authentication system"
/fix:team "patch critical security vulnerability in payment processing"
/deploy:team "migrate production database to new infrastructure"
```

---

## Variant Selection Guide

Use this decision tree to select the appropriate variant:

```
Is this a single-file, simple, low-risk change?
├─ YES → Use fast
└─ NO ↓

Does this involve multiple files or components?
├─ YES → Use hard
└─ NO ↓

Is this security-sensitive, architectural, or high-stakes?
├─ YES → Use team
└─ NO → Use hard
```

---

## Escalation Path

When complexity exceeds the current variant:

```
fast → hard
  └─→ hard → team
        └─→ team → Tech Lead arbitration (if debate exceeds 3 rounds)
```

### When to Escalate Mid-Task

- Task complexity was underestimated
- Quality gates failing at current level
- Architectural issues discovered during implementation
- Security concerns raised by reviewer

---

## Quality Gates by Variant

| Gate | fast | hard | team |
|------|------|------|------|
| Linting | Required | Required | Required |
| Type check | Required | Required | Required |
| Basic review | Self | Peer | Adversarial |
| Security check | None | Basic | OWASP Top 10 |
| Performance check | None | Basic | <200ms target |
| Coverage check | None | Recommended | >80% target |

---

## Related Pages

- [[Command System]] — All 14 commands with details
- [[Command Routing]] — The variant execution pattern
