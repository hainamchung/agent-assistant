# Problem, Goals, and Scope

> **Purpose**: Problem statement, business goals, non-goals, and scope boundaries.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Problem Statement

Most AI coding workflows break the moment the task becomes real. A single AI assistant writes code, reviews its own code, explains its own decisions, and ships with no meaningful opposition. This creates six structural weaknesses:

1. **Single-voice problem**: No independent challenge to generated code — self-review disguised as rigor
2. **Per-project ceremony**: Every new repo requires the same setup, knowledge injection, and prompt engineering
3. **Context tax**: Domain expertise must be re-taught through prompt repetition; complex tasks exhaust context windows
4. **Self-review theater**: Reviews lack independent opposition — the same model approves its own work
5. **Restart-from-zero**: Interrupted workflows lose all progress with no recovery mechanism
6. **Platform fragmentation**: Different AI tools require different approaches, preventing unified workflows

These are not individual bugs. They are structural deficiencies in AI-assisted development that cannot be solved by better prompts alone.

## Business Goals

| Goal ID | Goal | KPI | Priority |
|---------|------|-----|----------|
| BG-001 | Replace single-voice AI with governed multi-agent orchestration | 21 agents passing lint and simulation; agent utilization across workflows | Must |
| BG-002 | Eliminate per-project setup ceremony | Global install success rate; zero repo-level configuration required | Must |
| BG-003 | Enable adversarial quality assurance via Golden Triangle | Review rejection rate > 0%; consensus-stamped deliverables | Must |
| BG-004 | Provide cross-platform parity across 6 AI coding tools | Consistent command surface across all 6 platforms | Must |
| BG-005 | Auto-resolve domain expertise via HSOL | Skill match accuracy; reduced manual prompt injection | Should |
| BG-006 | Support interrupted workflow recovery | Checkpoint creation rate; successful resume rate | Should |
| BG-007 | Enforce security guardrails in every workflow | Zero guardrail bypasses; D4 override enforcement | Must |
| BG-008 | Enable community extension of agents, skills, and guardrails | Contributor pull requests; community skill count | Could |

## Non-Goals

| ID | Non-Goal | Rationale |
|----|----------|-----------|
| NG-001 | Replace the AI model itself | Agent Assistant orchestrates model behavior, it does not replace the model |
| NG-002 | Provide a GUI/IDE plugin | The framework operates through document-driven orchestration within existing AI tool interfaces |
| NG-003 | Manage infrastructure or cloud resources directly | Deployment commands generate instructions and validations, not infrastructure-as-code |
| NG-004 | Guarantee correctness of AI outputs | Guardrails reduce risk and adversarial review improves quality, but AI model output is inherently probabilistic |
| NG-005 | Support non-coding AI workflows | The framework is scoped to software engineering tasks only |

## Scope

### In-Scope

| Area | Description |
|------|-------------|
| Agent orchestration | 21 specialist agents with role isolation, handoffs, and scope constraints |
| Command workflows | 17 command routers with :fast/:hard/:team variants |
| Skill resolution | HSOL with 1430 matrix skills across 19 domains |
| Execution topologies | 12 patterns including pipeline, fan-out, golden-triangle, debate |
| CLI tooling | Global install, uninstall, list, create (agent, command, topology) |
| Security guardrails | 7 guardrail modules with trust tiers and D4 override |
| Documentation generation | /docs:core, /docs:business, /docs:audit self-documenting workflows |
| Cross-platform support | Cursor, Copilot, Claude Code, Codex, Antigravity (Gemini), Qwen |
| Quality enforcement | 5-dimension evaluation, validation gates, lint rules R001-R302 |

### Out-of-Scope

| Area | Reason |
|------|--------|
| Model training or fine-tuning | Framework is model-agnostic; orchestrates behavior, not weights |
| Payment/billing systems | Open-source MIT project with no monetization layer |
| User authentication | No user accounts; operates within the host AI tool's auth context |
| Real-time collaboration | Single-user orchestration; no multi-user concurrency model |
| Mobile/web application | Companion Vercel site is documentation only, not a product interface |

## Evidence Sources

- [README.md](../../../README.md) — Problem statement, scope overview
- [knowledge-overview/01-project-identity.md](../../knowledge-overview/01-project-identity.md) — Problem, solution, key benefits
- [CHANGELOG.md](../../../CHANGELOG.md) — Feature evolution and scope changes
