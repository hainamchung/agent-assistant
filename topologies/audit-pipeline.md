---
schema-version: "1.0"
name: audit-pipeline
description: Security and quality audit workflow (scouter → security-engineer → reviewer → reporter)
status: active
---

# Security & Quality Audit — Pipeline

> Template for comprehensive security and quality audit workflow. Based on `pipeline.md`.

## Agent Slots

| Phase | Agent | Role |
|-------|-------|------|
| 1 | scouter | Reconnaissance and surface-level scanning |
| 2 | security-engineer | Deep security analysis and vulnerability assessment |
| 3 | reviewer | Code quality and best-practices review |
| 4 | reporter | Consolidated audit report generation |

## Phase Structure

### Phase 1: Reconnaissance
- Entry: Target codebase or system scope defined
- Agent: scouter
- Exit: Attack surface map, dependency inventory, initial risk indicators

### Phase 2: Security Analysis
- Entry: Phase 1 reconnaissance report
- Agent: security-engineer
- Exit: Vulnerability report with severity ratings (CVSS), exploit scenarios, remediation guidance

### Phase 3: Quality Review
- Entry: Phase 1 reconnaissance + Phase 2 security findings
- Agent: reviewer
- Exit: Code quality assessment, technical debt inventory, standards compliance check

### Phase 4: Audit Report
- Entry: All prior phase outputs
- Agent: reporter
- Exit: Consolidated audit report with executive summary, detailed findings, and prioritized action plan

## Exit Criteria

- [ ] Full attack surface mapped and dependency inventory complete
- [ ] All identified vulnerabilities classified by severity
- [ ] Code quality findings documented with remediation priority
- [ ] Consolidated audit report delivered with executive summary

## Command Frontmatter

```yaml
topology: pipeline
topology_template: audit-pipeline
```
