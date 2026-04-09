# Stakeholders and Requirements

> **Purpose**: Stakeholder map, functional and non-functional requirements, and traceability.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Stakeholder Map

| Actor | Role | Goal | Touchpoints | Influence |
|-------|------|------|-------------|-----------|
| **Developer (End User)** | Primary user | Use AI coding tools with structured workflows, specialist agents, and quality gates | CLI install, /cook /fix /test /review /docs commands, daily coding | High — drives feature priorities |
| **Author (NamCH)** | Creator and maintainer | Provide a global orchestration framework across 6 platforms | npm publishing, CI, entry point generation, versioning | High — sets architecture and standards |
| **Contributor** | Open-source participant | Extend agents, commands, skills, guardrails via pull requests | Git workflow, lint-agents.js, simulate.js, CONTRIBUTING.md | Medium — expands ecosystem |
| **Orchestrator (AI Model)** | Runtime execution engine | Coordinate agent delegation, enforce protocol rules | RUNTIME.md, command routing, agent embodiment | High — executes all workflows |
| **Platform Vendor** | AI tool provider | Host the framework within their tool ecosystem | Entry point files, platform-packs/, code-assistants/ | Low — framework adapts to platforms |

## Functional Requirements

| Req ID | Requirement | Business Value | Acceptance Criteria | Traces To |
|--------|-------------|----------------|---------------------|-----------|
| BR-001 | System installs globally via npm and symlinks framework to tool home directories | Eliminates per-repo setup | `agent-assistant install {tool}` succeeds; files appear in `~/.{tool}/skills/agent-assistant/` | BG-002, BF-006 |
| BR-002 | 21 specialist agents with distinct roles, scopes, and constraints | Specialization replaces generalist | Each agent has frontmatter passing lint R001-R302; handoffs form a connected graph | BG-001, BF-001 |
| BR-003 | Commands route via explicit prefixes or natural language detection | Structured task entry | `/cook`, `/fix`, `/test` etc. route correctly; NL fallback to /cook | BG-001, BF-002 |
| BR-004 | Golden Triangle topology with tech-lead + executor + reviewer | Adversarial quality | 17 domain teams defined; debate, consensus, stamp protocol enforced | BG-003, BF-005 |
| BR-005 | HSOL resolves skills by agent profile + task context | Automated expertise | matrix-skills/*.yaml parsed; skill resolution returns matching entries | BG-005, BF-003 |
| BR-006 | Tiered context loading (NANO/MICRO/FULL) reduces token usage | Context efficiency | NANO loads <50 lines; MICRO loads <200 lines; measured by `measure-context.js` | BG-001, BF-008 |
| BR-007 | Checkpoint-resume protocol saves workflow state | Workflow durability | Checkpoint JSON written; `checkpoint:list` shows active; resume restores phase | BG-006, BF-009 |
| BR-008 | Security guardrails applied per agent scope | Safety enforcement | Guardrail files loaded; D4 security override enforced in evaluation | BG-007, BF-007 |
| BR-009 | CLI supports install/uninstall/list for all 6 platforms | Platform management | `agent-assistant install --all` works; `list` shows installed platforms | BG-002, BG-004, BF-006 |
| BR-010 | Documentation suite generates folder-based docs | Self-documenting | /docs:core creates 5 folders; /docs:business creates 4 folders; /docs:audit creates 4 folders | BG-001, BF-011 |

## Non-Functional Requirements

| NFR ID | Requirement | Category | Acceptance Criteria |
|--------|-------------|----------|---------------------|
| NFR-001 | RUNTIME.md must stay within 3200 word budget | Performance | `wc -w rules/RUNTIME.md` <= 3200; validated by `npm run wordcount` |
| NFR-002 | All agent definitions must pass schema validation | Reliability | `lint-agents.js` reports 0 errors for all 21 agents |
| NFR-003 | CLI install must complete without errors on Node.js 18+ | Compatibility | CI matrix tests Node 18 and 20 |
| NFR-004 | Security-critical dependencies must be pinned | Security | `npm audit --audit-level=moderate` passes in CI |
| NFR-005 | Generated entry points must match template source of truth | Consistency | `lint:drift` reports 0 drift between template and generated files |
| NFR-006 | All files in documents/ must be written in English | Compliance | Core Law 6 (Language Compliance) enforced |
| NFR-007 | Trust manifest integrity verified via SHA-256 hashes | Security | `trust:verify` passes in CI |

## Evidence Sources

- [README.md](../../../README.md) — Stakeholder descriptions, feature list
- [CONTRIBUTING.md](../../../CONTRIBUTING.md) — Contributor workflow and expectations
- [package.json](../../../package.json) — Scripts, dependencies, platform support
- [knowledge-domain/04-business-rules.md](../../knowledge-domain/04-business-rules.md) — Schema validation rules, security rules
- [knowledge-overview/03-features.md](../../knowledge-overview/03-features.md) — Feature metrics
