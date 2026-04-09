# Feature Inventory

> **Purpose**: Complete feature list with business value for Agent Assistant v2.0.0.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Feature Inventory

| Feature ID | Feature | Description | Business Value | Technical Surface |
|------------|---------|-------------|----------------|-------------------|
| BF-001 | Multi-Agent Orchestration | 21 specialist agents with distinct roles, scopes, constraints, and behavioral protocols | Replaces single generalist AI with specialized expertise; enables role isolation and accountability | `agents/*.md` (21 files), `AGENT-TEMPLATE.md`, `scripts/lint-agents.js`, `scripts/simulate.js` |
| BF-002 | Command System | 17 command routers with 50+ workflow variant files across :fast, :hard, :team modes | Structured task entry replaces ad-hoc prompting; consistent workflow execution | `commands/*.md` (17 routers), `commands/*/` (variant directories) |
| BF-003 | HSOL Skill Resolution | 1430 matrix skills across 19 domains auto-resolved by agent profile and task context | Automated domain expertise injection eliminates manual prompt engineering | `matrix-skills/*.yaml`, `skills/*/SKILL.md`, `rules/SKILLS-LITE.md` |
| BF-004 | Execution Topologies | 12 coordination patterns (pipeline, fan-out, golden-triangle, debate, swarm, etc.) | Workflows match the shape of the problem; supports sequential, parallel, and adversarial execution | `topologies/*.md` (12 files) |
| BF-005 | Golden Triangle Teams | 17 domain-specific 3-agent teams (tech-lead + executor + reviewer) with adversarial review | Independent challenge prevents self-review theater; consensus-stamped deliverables | `agents/teams/*/` (17 directories), `topologies/golden-triangle.md` |
| BF-006 | CLI Global Install | Install once globally via npm; framework available in every project for each platform | Eliminates per-project setup ceremony; zero repo-level configuration needed | `cli/install.js`, `cli/lib/platforms/`, `cli/create.js` |
| BF-007 | Guardrails & Security | 7 guardrail modules with trust tiers, D4 security override, OWASP-aligned checks | Safety enforcement in every workflow; risk reduction for AI-generated code | `guardrails/*.md` (7 files), `rules/SKILL-SECURITY.md`, `rules/EVALUATION.md` |
| BF-008 | Tiered Context Loading | NANO/MICRO/FULL loading tiers based on task complexity | Reduces token spend per task; keeps orchestrator responsive on context-limited platforms | `rules/RUNTIME.md` (tier markers), `scripts/measure-context.js` |
| BF-009 | Checkpoint-Resume Execution | Checkpoint JSON saves workflow state; resume restores interrupted workflows | Prevents restart-from-zero on interrupted long-running workflows | `rules/DURABLE-EXECUTION.md`, `scripts/checkpoint-manager.js` |
| BF-010 | Cross-Platform Parity | Same orchestration model across 6 AI coding tools generated from single template | Consistent experience regardless of AI tool choice; reduces platform fragmentation | `AGENT.template.md`, `platforms.json`, `scripts/generate-entry-points.js`, `code-assistants/` |
| BF-011 | Documentation Suite | /docs:core, /docs:business, /docs:audit generate folder-based project documentation | Self-documenting projects; agents receive rich context for better decisions | `commands/docs.md`, `commands/docs/core.md`, `commands/docs/business.md`, `commands/docs/audit.md` |
| BF-012 | Voice Coherence System | 5-level tone scale with command-type-to-formality mapping and agent adaptation | Consistent output tone across agents and workflows; professional delivery | `rules/VOICE-COHERENCE.md`, `personas/*.yaml` |
| BF-013 | Pattern Extraction | Post-workflow learning extracts reusable patterns across agent selection, topology, error recovery | Cross-workflow intelligence improves future task routing | `rules/PATTERN-EXTRACTION.md`, `scripts/extract-patterns.js`, `global-patterns.json` |
| BF-014 | Community Extension Tiers | 4-tier progressive trust model (newcomer, contributor, trusted, maintainer) | Controlled ecosystem growth with graduated trust and permissions | `rules/COMMUNITY-TIERS.md`, `.agent-assistant/contributors.json` |

## Evidence Sources

- [README.md](../../../README.md) — Feature descriptions and metrics
- [knowledge-overview/03-features.md](../../knowledge-overview/03-features.md) — Technical feature details
- [CHANGELOG.md](../../../CHANGELOG.md) — Feature changelog by version
- [package.json](../../../package.json) — CLI scripts surface
