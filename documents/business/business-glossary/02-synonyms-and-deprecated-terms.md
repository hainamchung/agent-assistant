# Synonyms and Deprecated Terms

> **Purpose**: Aliases, deprecated terms, and replacement guidance.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Synonym Registry

These terms are acceptable aliases in informal usage but the canonical term should be preferred in all documentation and formal artifacts.

| Canonical Term | Accepted Synonyms | Notes |
|----------------|-------------------|-------|
| Agent | Specialist, Role, AI Agent | "Role" is less precise; "Specialist" is common in README |
| Orchestrator | Conductor, Coordinator | "Conductor" used metaphorically in README and RUNTIME.md |
| Command | Workflow Command | "Command" is preferred; "workflow" can be ambiguous |
| Variant | Mode, Execution Mode | "Mode" is acceptable in casual context |
| Topology | Execution Pattern, Coordination Pattern | "Pattern" is generic; prefer "topology" in framework context |
| Skill | Capability, Domain Skill, Expertise | "Capability" overlaps with agent `capabilities` field |
| HSOL | Skill Framework, Matrix Skills | "Matrix Skills" refers to the registry, not the resolution layer |
| Golden Triangle | Team Mode, :team, Adversarial Team | ":team" is the variant suffix, not the topology itself |
| EMBODY | Role-Shift, Embody Mode | Always capitalize EMBODY when referring to the execution mode |
| Sub-agent | Independent Execution, Isolated Mode | "Sub-agent" is the official term |
| Phase | Step, Stage | "Phase" is canonical in all command files |
| Guardrail | Constraint, Safety Rule, Safety Module | "Guardrail" is the official term |
| Checkpoint | Snapshot, Save Point | "Checkpoint" is the canonical term per DURABLE-EXECUTION.md |
| Platform | Tool, AI Tool, Coding Tool | "Platform" is preferred in formal docs; "tool" is acceptable |
| Trust Tier | Trust Level, Security Level | "Trust Tier" matches SKILL-SECURITY.md terminology |
| D4 Override | Security Veto, Security Override | "D4 Override" references the specific evaluation dimension |
| Persona | Voice Profile, Personality | "Persona" is the file-level term; "voice" is the agent field |
| Entry Point | Boot File, Platform File | "Entry point" is the term used in generation scripts |
| Matrix Skills | Skill Registry, Domain Registry | "Matrix skills" refers to the YAML-based entries |

---

## Deprecated Terms

These terms were used in prior versions and should **not** be used in new documentation or code.

| Deprecated Term | Replacement | Deprecated Since | Reason |
|-----------------|-------------|------------------|--------|
| **Focus** (variant) | Removed entirely | v1.3.2 | Focus workflow variant was deprecated and removed; use :fast/:hard/:team |
| **Standard Execution** | EMBODY | v2.0.0 | Renamed during execution model overhaul; "Standard" was misleading |
| **Enhanced Execution** | Sub-agent | v2.0.0 | Renamed during execution model overhaul; "Enhanced" implied superiority |
| **Tier 1 / Tier 2** (execution) | EMBODY / Sub-agent | v2.0.0 | Tier numbering implied hierarchy; renamed to descriptive terms |

---

## Usage Guidelines

1. **In documentation** (`documents/`, `README.md`): Always use canonical terms
2. **In agent files** (`agents/*.md`): Use canonical terms in body text; frontmatter field names follow schema
3. **In casual interaction**: Synonyms are acceptable but canonical terms are preferred
4. **In new code/scripts**: Use canonical terms in variable names and comments
5. **When encountering deprecated terms**: Flag and replace during documentation updates

## Evidence Sources

- [CHANGELOG.md](../../../CHANGELOG.md) — Version history documenting term changes
- [README.md](../../../README.md) — Current terminology usage
- [rules/RUNTIME.md](../../../rules/RUNTIME.md) — Canonical execution model terms
