# Canonical Terms

> **Purpose**: Approved canonical terms and definitions for Agent Assistant.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Canonical Term Registry

| # | Term | Definition | Context |
|---|------|-----------|---------|
| 1 | **Agent** | A specialist AI role defined as a Markdown file with YAML frontmatter, having a distinct scope, constraints, expertise area, handoffs, and behavioral protocol. There are 21 agents in the framework. | `agents/*.md` |
| 2 | **Orchestrator** | The coordination layer that routes commands, delegates work to agents, enforces protocol rules, and synthesizes deliverables. The orchestrator never implements directly. | `rules/RUNTIME.md` |
| 3 | **Command** | A user-facing workflow entry point that routes to variant workflow definitions. There are 17 command routers with 50+ variant files. | `commands/*.md` |
| 4 | **Variant** | A workflow execution mode suffix (:fast, :hard, :team) that controls phase depth, agent count, and quality gate level. | `commands/{cmd}/{variant}.md` |
| 5 | **Topology** | An execution coordination pattern defining how multiple agents collaborate during a workflow. There are 12 topologies. | `topologies/*.md` |
| 6 | **Skill** | A domain expertise module auto-resolved for agents via HSOL. Skills provide specialized knowledge for specific domains and tasks. | `matrix-skills/*.yaml`, `skills/*/SKILL.md` |
| 7 | **HSOL** | Hybrid Skill Orchestration Layer — the tag-based skill resolution system that matches agent profiles to domain skill registries. | `rules/SKILLS-LITE.md`, `matrix-skills/` |
| 8 | **Golden Triangle** | An adversarial 3-agent topology consisting of tech-lead (decomposes, arbitrates), executor (builds, defends), and reviewer (challenges, validates). Used via the :team variant. | `topologies/golden-triangle.md`, `agents/teams/` |
| 9 | **EMBODY** | An execution mode where the orchestrator temporarily becomes an agent, following its directive and protocol completely. This is a sanctioned role-shift, not a prohibition violation. | `rules/RUNTIME.md` |
| 10 | **Sub-agent** | An isolated execution mode for validation and research agents, providing independent judgment by separating context from the orchestrator. | `rules/RUNTIME.md` |
| 11 | **Phase** | A sequential step in a workflow, assigned to one primary agent, with defined input, output, and exit criteria. Phases execute in declared order per Law L5. | Command variant files |
| 12 | **Guardrail** | A safety or quality constraint module applied to agent operations. There are 7 guardrail modules covering injection defense, output sanitization, data privacy, auth patterns, resource limits, violation escalation, and I/O pipeline. | `guardrails/*.md` |
| 13 | **Checkpoint** | A saved workflow state (JSON) enabling resumption of interrupted workflows. Checkpoints expire after 24 hours. | `rules/DURABLE-EXECUTION.md` |
| 14 | **Platform** | One of 6 supported AI coding tools: Cursor, GitHub Copilot, Claude Code, Codex, Antigravity (Gemini), Qwen. | `platforms.json` |
| 15 | **Trust Tier** | A security classification for skills: core (SHA-256 verified, maintained by author), verified (reviewed and approved), community (unverified, subject to quarantine). | `rules/SKILL-SECURITY.md` |
| 16 | **D4 Override** | The security evaluation dimension (D4: Security & Safety) that overrides all other quality dimension scores when a critical security finding is identified. | `rules/EVALUATION.md` |
| 17 | **Persona** | An agent personality profile that controls tone, formality, adaptation, and voice consistency across outputs. There are 4 personas: professional, casual, mentor, academic. | `personas/*.yaml` |
| 18 | **Entry Point** | A platform-specific boot file (e.g., CURSOR.md, COPILOT.md, CLAUDE.md) generated from `AGENT.template.md` that loads the framework for a specific AI tool. | `AGENT.template.md`, `scripts/generate-entry-points.js` |
| 19 | **Matrix Skills** | Pre-registered skill entries in domain YAML registries (1430 total across 19 domains) that are resolved by HSOL based on agent profile tags. | `matrix-skills/*.yaml` |

## Evidence Sources

- [agents/*.md](../../../agents/) — Agent definitions
- [rules/RUNTIME.md](../../../rules/RUNTIME.md) — Orchestrator, execution model, laws
- [commands/](../../../commands/) — Command and variant definitions
- [topologies/](../../../topologies/) — Topology definitions
- [guardrails/](../../../guardrails/) — Guardrail modules
- [README.md](../../../README.md) — Product overview and terminology
