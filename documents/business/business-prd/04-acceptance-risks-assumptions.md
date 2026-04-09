# Acceptance Criteria, Risks, and Assumptions

> **Purpose**: Acceptance criteria for v2.0.0, identified risks, assumptions, and open questions.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Acceptance Criteria (v2.0.0)

| AC ID | Criterion | Verification Method |
|-------|-----------|---------------------|
| AC-001 | All 21 agent definitions pass lint rules R001-R302 | `node scripts/lint-agents.js` — 0 errors |
| AC-002 | All 21 agents pass static simulation | `node scripts/simulate.js` — all PASS |
| AC-003 | CLI installs framework to all 6 platforms | `agent-assistant install --all` succeeds on clean system |
| AC-004 | RUNTIME.md is within 3200 word budget | `npm run wordcount` — passes |
| AC-005 | Entry points match template source of truth | `npm run lint:drift` — 0 drift |
| AC-006 | Trust manifest hashes verify | `npm run trust:verify` — passes |
| AC-007 | All 17 command routers route to expected variants | Manual verification or `validate:workflow` |
| AC-008 | Golden Triangle teams have 3 roles each | Verified by team directory structure in agents/teams/ |
| AC-009 | npm audit passes at moderate level | `npm audit --audit-level=moderate` in CI |
| AC-010 | Documentation commands produce folder-based output | /docs:core creates 5 folders; /docs:business creates 4; /docs:audit creates 4 |

## Risks

| Risk ID | Risk | Probability | Impact | Mitigation |
|---------|------|-------------|--------|------------|
| RK-001 | Context window limits prevent full RUNTIME.md loading on certain platforms | Medium | High | Tiered loading (NANO/MICRO/FULL) with platform-specific thresholds; RUNTIME.md word budget enforced |
| RK-002 | AI model ignores or misinterprets orchestrator protocol | Medium | High | Structured command routing, explicit prohibition rules, self-check protocol, lint validation |
| RK-003 | Community skills introduce security vulnerabilities | Low | High | Trust tiers (core/verified/community), SHA-256 integrity verification, quarantine process, D4 security override |
| RK-004 | Platform API changes break entry point compatibility | Medium | Medium | Generated entry points from single template; lint:drift CI check detects breakage |
| RK-005 | HSOL skill resolution produces incorrect matches | Low | Medium | Tag-based lookup is deterministic; simulation validates skill references |
| RK-006 | Checkpoint files become stale or corrupted | Low | Low | 24-hour TTL, prune command, schema versioning |
| RK-007 | Contributor PRs introduce incompatible agent schemas | Medium | Medium | Lint-agents.js in CI blocks merge on schema violations; R001-R302 rules |
| RK-008 | Cross-platform behavioral differences cause inconsistent results | Medium | Medium | Platform-packs provide optimization profiles; entry point generation ensures structural parity |

## Assumptions

| ID | Assumption | Impact If Wrong |
|----|-----------|-----------------|
| AS-001 | Developers have Node.js 18+ installed | CLI install fails; documented in prerequisites |
| AS-002 | AI coding tools load Markdown files from tool home directory | Framework files are not discovered; requires platform-specific adapter |
| AS-003 | Users interact via text-based AI interfaces (no GUI required) | Framework is unusable on platforms that require GUI interaction |
| AS-004 | Single-user usage model is sufficient | Multi-user concurrency conflicts are not handled |
| AS-005 | The AI model can follow multi-step protocols from document-based instructions | Orchestration fails if model cannot maintain protocol adherence over long contexts |
| AS-006 | npm is available as the distribution channel | Alternative distribution would require significant rework |
| AS-007 | Guardrails are behavioral suggestions, not hard sandbox boundaries | Security guarantees depend on model compliance, not enforcement |

## Open Questions

| OQ ID | Question | Status | Impact |
|-------|----------|--------|--------|
| OQ-001 | Should the framework support real-time multi-user collaboration? | Open | Would require concurrency model, conflict resolution |
| OQ-002 | How should telemetry/analytics be implemented without compromising privacy? | Open | Cannot measure adoption or feature usage without telemetry |
| OQ-003 | Should the project offer a paid tier or remain fully open-source MIT? | Open | Affects sustainability and feature roadmap |
| OQ-004 | How to validate AI model compliance with orchestrator protocol at scale? | Open | Current validation is static (lint, simulate); runtime compliance is not measured |
| OQ-005 | Should the companion website evolve into an interactive playground? | Open | Could improve onboarding but adds maintenance scope |

## Evidence Sources

- [CHANGELOG.md](../../../CHANGELOG.md) — Version history, breaking changes, risk indicators
- [package.json](../../../package.json) — CI scripts, dependency management
- [knowledge-domain/04-business-rules.md](../../knowledge-domain/04-business-rules.md) — Validation rules, security constraints
- [README.md](../../../README.md) — Installation prerequisites, security advisory
