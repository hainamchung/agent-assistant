---
schema-version: "1.0"
name: preflight-templates
category: quality
description: "Category-based preflight self-diagnosis templates for agents"
version: "1.0"
---

# Preflight Templates by Category

> Agents inherit preflight checks from their category template.
> Custom additions are allowed (e.g., security-engineer adds OWASP checks).
> Default behavior: WARN (advisory, proceed with caution).
> Checks marked `[BLOCKING]` cause HALT if failed.

---

## Meta Agents (tech-lead, planner)

- [ ] Task decomposition scope clearly defined
- [ ] Team roster verified (agents available for delegation)
- [ ] Token budget not in CRITICAL zone

## Execution Agents (backend-engineer, frontend-engineer, mobile-engineer, game-engineer, database-architect)

- [ ] Implementation target identified (file paths or module)
- [ ] Prior phase deliverables present (if phases > 1)
- [ ] Token budget not in CRITICAL zone

## Investigation Agents (debugger, performance-engineer)

- [ ] Investigation scope and symptoms defined
- [ ] Prior phase deliverables present (if phases > 1)
- [ ] Relevant logs/traces available for analysis

## Validation Agents (tester, reviewer, security-engineer)

- [ ] Artifact to validate exists and is non-empty
- [ ] Evaluation criteria available (EVALUATION.md or command-specific)
- [ ] No conflicts of interest (didn't produce the artifact being reviewed)

## Research Agents (researcher, scouter, brainstormer, designer)

- [ ] Research scope clearly defined
- [ ] Relevant files/directories identified for exploration
- [ ] Prior research artifacts reviewed (to avoid duplication)

## Support Agents (docs-manager, devops-engineer, business-analyst, project-manager, reporter)

- [ ] Target files/directories identified
- [ ] Project context loaded (documents/, reports/)
- [ ] Output format requirements clear
