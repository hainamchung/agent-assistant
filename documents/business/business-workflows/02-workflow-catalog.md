# Workflow Catalog

> **Purpose**: Complete workflow inventory with trigger, outcome, and variant modes.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Workflow Summary

| Workflow ID | Name | Trigger | Primary Actor | Outcome |
|-------------|------|---------|---------------|---------|
| BW-001 | Feature Build | `/cook` + task description | Developer | Implemented feature with review |
| BW-002 | Bug Fix | `/fix` + bug description | Developer | Bug fixed and tested |
| BW-003 | Testing | `/test` + target | Developer | Test suite created and validated |
| BW-004 | Code Review | `/review` + target | Developer | Code review report |
| BW-005 | Documentation | `/docs` + variant | Developer | Documentation folders generated |
| BW-006 | Deployment | `/deploy` + variant | Developer | Deployment executed or checked |
| BW-007 | Planning | `/plan` + objective | Developer | Strategic plan document |
| BW-008 | Framework Install | `agent-assistant install {tool}` | Developer | Framework installed to platform |
| BW-009 | Contribution | PR with changes | Contributor | Validated extension merged |
| BW-010 | Orchestrated Execution | Any command received | Orchestrator | Phased agent execution → deliverable |

---

## Workflow Details

### BW-001: Feature Build (`/cook`)

| Attribute | Value |
|-----------|-------|
| **Variants** | :fast (2-3 agents), :hard (5-8 agents + quality gates), :team (Golden Triangle) |
| **Typical Phases** | Scout → Plan → Implement → Review → Deliver |
| **Key Agents** | scouter, planner, backend-engineer/frontend-engineer, reviewer |
| **Deliverable** | Working code with review stamp |
| **Exception** | :fast skips scouting and review depth |

### BW-002: Bug Fix (`/fix`)

| Attribute | Value |
|-----------|-------|
| **Variants** | :fast, :hard, :team |
| **Typical Phases** | Scout → Debug → Fix → Test → Review |
| **Key Agents** | scouter, debugger, backend-engineer/frontend-engineer, tester, reviewer |
| **Deliverable** | Fixed code with test coverage |
| **Exception** | :fast uses minimal investigation |

### BW-003: Testing (`/test`)

| Attribute | Value |
|-----------|-------|
| **Variants** | :fast, :hard, :team |
| **Typical Phases** | Scout → Design Tests → Write Tests → Validate |
| **Key Agents** | scouter, tester, reviewer |
| **Deliverable** | Test suite with validation report |
| **Exception** | :team adds adversarial test review |

### BW-004: Code Review (`/review`)

| Attribute | Value |
|-----------|-------|
| **Variants** | :fast, :hard, :team |
| **Typical Phases** | Scout → Review → Report |
| **Key Agents** | scouter, reviewer, reporter |
| **Deliverable** | Review report with findings |
| **Exception** | :team adds debate topology |

### BW-005: Documentation (`/docs`)

| Attribute | Value |
|-----------|-------|
| **Variants** | :core, :business, :audit, full (all three) |
| **Typical Phases** | Varies by variant (3-4 phases each) |
| **Key Agents** | scouter, business-analyst, docs-manager, project-manager |
| **Deliverable** | Folder-based documentation (5+4+4 = 13 folders) |
| **Exception** | Sub-commands can run independently |

### BW-006: Deployment (`/deploy`)

| Attribute | Value |
|-----------|-------|
| **Variants** | :check, :preview, :production, :rollback |
| **Typical Phases** | Pre-check → Deploy → Verify |
| **Key Agents** | devops-engineer, security-engineer |
| **Deliverable** | Deployment status report |
| **Exception** | :rollback triggers rollback protocol |

### BW-007: Planning (`/plan`)

| Attribute | Value |
|-----------|-------|
| **Variants** | :fast, :hard, :team |
| **Typical Phases** | Scout → Analyze → Plan → Validate |
| **Key Agents** | scouter, planner, tech-lead, reviewer |
| **Deliverable** | Plan document with task breakdown |
| **Exception** | :team adds multi-agent planning session |

### BW-008: Framework Install

| Attribute | Value |
|-----------|-------|
| **Trigger** | `agent-assistant install {tool}` or `--all` |
| **Phases** | Platform detection → File copy → Verification |
| **Deliverable** | Framework files in `~/.{tool}/skills/agent-assistant/` |
| **Exception** | Interactive fallback if tool not specified |

### BW-009: Contribution

| Attribute | Value |
|-----------|-------|
| **Trigger** | Pull request to repository |
| **Phases** | Author → CI validation → Review → Merge |
| **Deliverable** | Validated extension in main branch |
| **Exception** | CI lint errors block merge |

### BW-010: Orchestrated Execution

| Attribute | Value |
|-----------|-------|
| **Trigger** | Any command or natural language request |
| **Phases** | Route → Load workflow → Execute phases → Synthesize |
| **Deliverable** | Completed workflow output |
| **Exception** | Error → notify user with options (Law 6) |

## Evidence Sources

- [commands/*.md](../../../commands/) — Command router definitions
- [commands/*/](../../../commands/) — Variant workflow files
- [README.md](../../../README.md) — Command surface and quick start
- [cli/install.js](../../../cli/install.js) — Install workflow
