---
schema-version: "1.0"
name: review-pipeline
description: Multi-stage code review workflow (reviewer → security-engineer → tech-lead)
status: active
---

# Code Review — Pipeline

> Template for multi-stage code review workflow. Based on `pipeline.md`.
>
> **Relationship to `/review:hard`**: This topology template defines the _agent pipeline structure_ (reviewer → security-engineer → tech-lead). The `/review:hard` command variant uses this template via `topology_template: review-pipeline` in its frontmatter. Edit this file to change the review pipeline structure; edit `commands/review/hard.md` to change the review command's phases, pre-flight, and deliverables.

## Agent Slots

| Phase | Agent | Role |
|-------|-------|------|
| 1 | reviewer | Initial code review and quality check |
| 2 | security-engineer | Security vulnerability analysis |
| 3 | tech-lead | Final architectural approval and sign-off |

## Phase Structure

### Phase 1: Code Review
- Entry: Code diff or PR reference provided
- Agent: reviewer
- Exit: Review report with findings categorized (critical, major, minor)

### Phase 2: Security Audit
- Entry: Phase 1 review report + original code diff
- Agent: security-engineer
- Exit: Security assessment with vulnerability classification (CVE references where applicable)

### Phase 3: Architectural Sign-Off
- Entry: Phase 1 review report + Phase 2 security assessment
- Agent: tech-lead
- Exit: Final verdict (approve / request-changes) with consolidated action items

> Verdict format: See `rules/TEAMS-LITE.md` §Consensus Stamps.

## Exit Criteria

- [ ] All critical and major findings addressed or acknowledged
- [ ] No unresolved security vulnerabilities rated high or above
- [ ] Tech-lead has issued final verdict
- [ ] Consolidated action items documented

## Command Frontmatter

```yaml
topology: pipeline
topology_template: review-pipeline
```
