# Workflow Catalogue

> **Section**: Business Workflows | **File**: 02-workflow-catalog.md
> **Purpose**: Complete catalogue of all 20 workflows with triggers and outcomes

---

## Workflow Overview

This catalogue documents all workflows in the Agent Assistant framework. Each workflow is defined with its trigger, outcome, complexity, and agent count.

---

## Build Workflows

### W1: /cook — Feature Development

| Attribute | Value |
|-----------|-------|
| **ID** | W1 |
| **Category** | Build |
| **Trigger** | User invokes `/cook`, `/cook:fast`, `/cook:hard`, or `/cook:team` |
| **Outcome** | Production-ready feature implementation |
| **Complexity** | Varies by variant |
| **Agent Count** | 1 (:fast), 1 (:hard), 3 (:team) |
| **Phases** | 4-6 depending on variant |

**Variants**:
| Variant | Agents | Typical Use |
|---------|--------|-------------|
| :fast | 1 | Simple features, single domain |
| :hard | 1 | Complex features, multiple domains |
| :team | 3 | Critical features, adversarial review |

---

### W2: /code — Code Generation

| Attribute | Value |
|-----------|-------|
| **ID** | W2 |
| **Category** | Build |
| **Trigger** | User invokes `/code` or `/code:variant` |
| **Outcome** | Generated code snippets or files |
| **Complexity** | Low-Medium |
| **Agent Count** | 1 |
| **Phases** | 2 |

---

### W3: /fix — Bug Fix

| Attribute | Value |
|-----------|-------|
| **ID** | W3 |
| **Category** | Build |
| **Trigger** | User invokes `/fix` with error description |
| **Outcome** | Fixed code with root cause addressed |
| **Complexity** | Medium |
| **Agent Count** | 1-2 |
| **Phases** | 3 (investigate, fix, verify) |

---

### W4: /design — Design Specification

| Attribute | Value |
|-----------|-------|
| **ID** | W4 |
| **Category** | Build |
| **Trigger** | User invokes `/design` with feature concept |
| **Outcome** | Design specification document |
| **Complexity** | Medium |
| **Agent Count** | 1 |
| **Phases** | 2 (research, design) |

---

### W5: /brainstorm — Solution Exploration

| Attribute | Value |
|-----------|-------|
| **ID** | W5 |
| **Category** | Build |
| **Trigger** | User invokes `/brainstorm` with problem statement |
| **Outcome** | Multiple solution alternatives with trade-offs |
| **Complexity** | Low-Medium |
| **Agent Count** | 1 |
| **Phases** | 2 (explore, document) |

---

## Quality Workflows

### W6: /test — Test Generation

| Attribute | Value |
|-----------|-------|
| **ID** | W6 |
| **Category** | Quality |
| **Trigger** | User invokes `/test` or `/test:hard` with feature context |
| **Outcome** | Test suite with unit, integration, or E2E tests |
| **Complexity** | Medium |
| **Agent Count** | 1-2 |
| **Phases** | 3 (analyze, generate, review) |

---

### W7: /review — Code Review

| Attribute | Value |
|-----------|-------|
| **ID** | W7 |
| **Category** | Quality |
| **Trigger** | User invokes `/review` with code to review |
| **Outcome** | Review report with findings and recommendations |
| **Complexity** | Medium |
| **Agent Count** | 1 |
| **Phases** | 2 (review, report) |

---

### W8: /debug — Debugging

| Attribute | Value |
|-----------|-------|
| **ID** | W8 |
| **Category** | Quality |
| **Trigger** | User invokes `/debug` with error description |
| **Outcome** | Root cause analysis and fix proposal |
| **Complexity** | Medium-High |
| **Agent Count** | 1-2 |
| **Phases** | 3 (investigate, analyze, report) |

---

### W9: Security Review

| Attribute | Value |
|-----------|-------|
| **ID** | W9 |
| **Category** | Quality |
| **Trigger** | Automated or manual invocation |
| **Outcome** | Security audit report with findings |
| **Complexity** | High |
| **Agent Count** | 1-2 |
| **Phases** | 3 (scan, analyze, report) |

---

## Planning Workflows

### W10: /plan — Implementation Planning

| Attribute | Value |
|-----------|-------|
| **ID** | W10 |
| **Category** | Planning |
| **Trigger** | User invokes `/plan` with feature concept |
| **Outcome** | Implementation plan with milestones and estimates |
| **Complexity** | Medium |
| **Agent Count** | 1 |
| **Phases** | 3 (scout, plan, review) |

---

### W11: /ask — Question Answering

| Attribute | Value |
|-----------|-------|
| **ID** | W11 |
| **Category** | Planning |
| **Trigger** | User invokes `/ask` with question |
| **Outcome** | Direct answer or research report |
| **Complexity** | Low |
| **Agent Count** | 1 |
| **Phases** | 1-2 |

---

### W12: /report — Reporting

| Attribute | Value |
|-----------|-------|
| **ID** | W12 |
| **Category** | Planning |
| **Trigger** | User invokes `/report:fast`, `/report:hard`, or `/report:team` |
| **Outcome** | Status report or project summary |
| **Complexity** | Varies by variant |
| **Agent Count** | 1 (:fast), 1 (:hard), 3 (:team) |
| **Phases** | 2-3 |

---

### W13: /docs — Documentation

| Attribute | Value |
|-----------|-------|
| **ID** | W13 |
| **Category** | Planning |
| **Trigger** | User invokes `/docs` or `/docs:variant` |
| **Outcome** | Project documentation |
| **Complexity** | Medium |
| **Agent Count** | 1 |
| **Phases** | 2-3 |

---

## Support Workflows

### W14: /deploy — Deployment

| Attribute | Value |
|-----------|-------|
| **ID** | W14 |
| **Category** | Support |
| **Trigger** | User invokes `/deploy:check`, `/deploy:preview`, `/deploy:production` |
| **Outcome** | Deployment verification, preview, or execution |
| **Complexity** | Medium-High |
| **Agent Count** | 1-2 |
| **Phases** | 3-4 |

---

### W15: /wiki — Wiki Generation

| Attribute | Value |
|-----------|-------|
| **ID** | W15 |
| **Category** | Support |
| **Trigger** | User invokes `/wiki`, `/wiki:fast`, `/wiki:hard`, or `/wiki:team` |
| **Outcome** | Project wiki with documentation |
| **Complexity** | Varies by variant |
| **Agent Count** | 1 (:fast), 1 (:hard), 3 (:team) |
| **Phases** | 3-5 |

---

### W16: CLI Installation

| Attribute | Value |
|-----------|-------|
| **ID** | W16 |
| **Category** | Support |
| **Trigger** | User runs `agent-assistant install` |
| **Outcome** | Configured Agent Assistant for target platform |
| **Complexity** | Low |
| **Agent Count** | 0 (automated) |
| **Phases** | 2 (detect, configure) |

---

### W17: CLI Uninstallation

| Attribute | Value |
|-----------|-------|
| **ID** | W17 |
| **Category** | Support |
| **Trigger** | User runs `agent-assistant uninstall` |
| **Outcome** | Removed Agent Assistant configuration |
| **Complexity** | Low |
| **Agent Count** | 0 (automated) |
| **Phases** | 2 (detect, remove) |

---

### W18: Skill Discovery

| Attribute | Value |
|-----------|-------|
| **ID** | W18 |
| **Category** | Support |
| **Trigger** | Automated when matrix fitness < 0.75 |
| **Outcome** | Relevant skills identified and installed |
| **Complexity** | Medium |
| **Agent Count** | 0 (automated) |
| **Phases** | 2 (search, install) |

---

### W19: Phase Transition

| Attribute | Value |
|-----------|-------|
| **ID** | W19 |
| **Category** | Support |
| **Trigger** | Previous phase completes |
| **Outcome** | Next phase begins with locked context |
| **Complexity** | Low |
| **Agent Count** | 1 (Orchestrator) |
| **Phases** | 1 (transition) |

---

### W20: Team Consensus

| Attribute | Value |
|-----------|-------|
| **ID** | W20 |
| **Category** | Support |
| **Trigger** | Team debate completes |
| **Outcome** | Agreed output with consensus stamp |
| **Complexity** | Medium |
| **Agent Count** | 3 (Golden Triangle) |
| **Phases** | 1-3 rounds |

---

## Workflow Summary Table

| ID | Workflow | Category | Complexity | Agents | Trigger |
|----|----------|----------|------------|--------|---------|
| W1 | /cook | Build | Varies | 1-3 | Command |
| W2 | /code | Build | Low-Med | 1 | Command |
| W3 | /fix | Build | Med | 1-2 | Command |
| W4 | /design | Build | Med | 1 | Command |
| W5 | /brainstorm | Build | Low-Med | 1 | Command |
| W6 | /test | Quality | Med | 1-2 | Command |
| W7 | /review | Quality | Med | 1 | Command |
| W8 | /debug | Quality | Med-Hi | 1-2 | Command |
| W9 | Security Review | Quality | High | 1-2 | Auto/Manual |
| W10 | /plan | Planning | Med | 1 | Command |
| W11 | /ask | Planning | Low | 1 | Command |
| W12 | /report | Planning | Varies | 1-3 | Command |
| W13 | /docs | Planning | Med | 1 | Command |
| W14 | /deploy | Support | Med-Hi | 1-2 | Command |
| W15 | /wiki | Support | Varies | 1-3 | Command |
| W16 | CLI Install | Support | Low | 0 | CLI |
| W17 | CLI Uninstall | Support | Low | 0 | CLI |
| W18 | Skill Discovery | Support | Med | 0 | Auto |
| W19 | Phase Transition | Support | Low | 1 | Auto |
| W20 | Team Consensus | Support | Med | 3 | Auto |

---

## Evidence Sources

- `rules/CORE.md` — Command routing, workflow triggers
- `rules/PHASES.md` — Phase execution patterns
- `rules/TEAMS.md` — Team workflow patterns
- `commands/` — Command workflow definitions
- `README.md` — Command reference
