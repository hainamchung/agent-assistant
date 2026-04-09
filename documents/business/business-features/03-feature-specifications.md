# Feature Specifications

> **Purpose**: Feature-level specifications with acceptance checks for each feature.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## BF-001: Multi-Agent Orchestration

**Description**: 21 specialist agents defined as Markdown files with YAML frontmatter. Each agent has a distinct role, category, scope, handoffs, guardrails, and behavioral constraints.

**Specification**:
- Agent categories: execution, meta, investigation, validation, research, support
- Each agent declares: name, profile, handoffs, capabilities, scope.files, scope.tasks, scope.restrictions
- Handoffs form a directed graph; all handoff targets must reference existing agents
- Agents are validated by `lint-agents.js` (rules R001-R302) and `simulate.js`

**Acceptance Checks**:
- [ ] All 21 agents pass `lint-agents.js` with 0 errors
- [ ] All 21 agents pass `simulate.js` with PASS status
- [ ] Handoff graph is connected (no orphaned agents)

---

## BF-002: Command System

**Description**: 17 top-level command routers dispatch to variant workflow files. Variants include :fast (minimal phases), :hard (default full phases), and :team (Golden Triangle adversarial collaboration).

**Specification**:
- Routing: explicit `/command` prefix or natural language detection
- Variants stored in `commands/{cmd}/{variant}.md`
- Each variant file defines phases with agent assignments, exit criteria, and deliverables
- NL tiebreaker: ambiguous input defaults to `/cook`

**Acceptance Checks**:
- [ ] All 17 routers route to correct variant files
- [ ] :fast, :hard, :team variants exist where documented
- [ ] Natural language detection maps correctly for core verbs

---

## BF-003: HSOL Skill Resolution

**Description**: Hybrid Skill Orchestration Layer resolves domain skills based on agent profile tags and task context. 1430 entries across 19 domain registries.

**Specification**:
- Skills stored in `matrix-skills/{domain}.yaml` with `_index.yaml` registration
- Resolution: agent `profile` field (e.g., `backend:execution`) matched against domain registry
- Library skills in `skills/*/SKILL.md` provide deep skill definitions
- Lookup protocol defined in `rules/SKILLS-LITE.md`

**Acceptance Checks**:
- [ ] All 19 domain registries have valid YAML structure
- [ ] `_index.yaml` registration covers all domains
- [ ] Agent profile fields match registered domains

---

## BF-004: Execution Topologies

**Description**: 12 execution coordination patterns defining how agents collaborate during workflows.

**Specification**:
- Topologies: pipeline, fan-out, hierarchical, feature-hierarchical, parallel-branch, swarm, round-robin, debate-round-robin, review-pipeline, audit-pipeline, research-fan-out, golden-triangle
- Each topology defines: pattern type, agent role slots, ordering rules, synthesis method, exit criteria
- Per-phase topology overrides supported via command YAML frontmatter

**Acceptance Checks**:
- [ ] All 12 topology files exist in `topologies/`
- [ ] Each topology defines roles, ordering, and exit criteria
- [ ] Topology overrides resolve correctly

---

## BF-005: Golden Triangle Teams

**Description**: 17 domain-specific 3-agent teams using adversarial golden-triangle topology. Each team: tech-lead (decomposes, coordinates, arbitrates) + executor (builds, defends) + reviewer (challenges, validates).

**Specification**:
- Teams stored in `agents/teams/{domain}-team/`
- Consensus paths: clean pass, resolved pass, arbitrated pass
- Communication via append-only mailbox: `reports/{topic}/MAILBOX-{date}.md`
- Supported via `:team` variant on 10 commands

**Acceptance Checks**:
- [ ] All 17 team directories have 3 role definitions
- [ ] :team variants exist for documented commands
- [ ] Mailbox protocol produces traceable debate records

---

## BF-006: CLI Global Install

**Description**: Node.js CLI installs framework globally via npm. Supports install, uninstall, list, and create operations for all 6 platforms.

**Specification**:
- Entry: `cli/install.js` with `bin.agent-assistant` mapping
- Platforms: cursor, copilot, claude, codex, antigravity, qwen
- Install copies agents, commands, rules, skills, guardrails, topologies to `~/.{tool}/skills/agent-assistant/`
- Verification phase confirms all files written
- Interactive mode with platform selection menu

**Acceptance Checks**:
- [ ] `agent-assistant install {tool}` succeeds for all 6 platforms
- [ ] `agent-assistant install --all` installs to all platforms
- [ ] `agent-assistant list` shows installed platforms
- [ ] Install produces verification summary

---

## BF-007: Guardrails & Security

**Description**: 7 guardrail modules providing safety constraints, trust tiers, and OWASP-aligned security checks.

**Specification**:
- Guardrails: injection-defense, output-sanitization, data-privacy, auth-patterns, resource-limits, violation-escalation, io-pipeline
- Trust tiers: core (SHA-256 verified) > verified > community
- D4 security dimension in evaluation overrides all other quality scores
- Quarantine process for community extensions

**Acceptance Checks**:
- [ ] All 7 guardrail files exist and have valid structure
- [ ] Trust manifest hashes verify via `trust:verify`
- [ ] D4 override documented in EVALUATION.md

---

## BF-008 through BF-014

Specifications for Should-Have and Could-Have features follow the same pattern. Key acceptance checks:

| Feature | Primary Check |
|---------|---------------|
| BF-008 Tiered Loading | RUNTIME.md tier markers present; `measure-context.js` reports tier sizes |
| BF-009 Checkpoint-Resume | Checkpoint JSON schema v1.0 validated; `checkpoint:list` works |
| BF-010 Cross-Platform | Entry points generated from template; `lint:drift` reports 0 drift |
| BF-011 Documentation Suite | /docs:core creates 5 folders; /docs:business creates 4; /docs:audit creates 4 |
| BF-012 Voice Coherence | Voice fields on all 21 agents; persona formality mapping defined |
| BF-013 Pattern Extraction | `extract-patterns.js` runs; patterns stored in `global-patterns.json` |
| BF-014 Community Tiers | `COMMUNITY-TIERS.md` defines 4 tiers; contributor manifest schema validated |

## Evidence Sources

- [agents/*.md](../../../agents/) — Agent definitions and frontmatter
- [commands/](../../../commands/) — Command routers and variants
- [topologies/](../../../topologies/) — Topology definitions
- [guardrails/](../../../guardrails/) — Guardrail modules
- [cli/install.js](../../../cli/install.js) — CLI implementation
- [knowledge-overview/03-features.md](../../knowledge-overview/03-features.md) — Feature metrics
