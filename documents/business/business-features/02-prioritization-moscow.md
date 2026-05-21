# MoSCoW Prioritization

> **Section**: Business Features | **File**: 02-prioritization-moscow.md
> **Purpose**: Feature prioritization using MoSCoW methodology

---

## Prioritization Framework

Features are prioritized using MoSCoW methodology:

- **Must Have**: Critical for MVP launch. Blockers without workarounds.
- **Should Have**: Important for initial release. Significant impact if missing.
- **Could Have**: Desirable but not critical. Enhances user experience.
- **Won't Have (This Release)**: Explicitly deferred. May revisit in future phases.

---

## Must Have (5 Features)

### F1: Command Routing System

**Rationale**: Foundation of entire system. Without command routing, no other features accessible.

**Blocking If Missing**: No user interaction possible.

**Acceptance Criteria**: All 14 commands route correctly with variant support.

### F2: Tiered Execution Engine

**Rationale**: Core quality mechanism. TIER 1 provides context isolation; TIER 2 ensures availability.

**Blocking If Missing**: No delegation mechanism; agents cannot coordinate.

**Acceptance Criteria**: TIER 1 attempted first; TIER 2 fallback functional.

### F3: Phase Execution Protocol

**Rationale**: Structured delivery mechanism. Phases ensure verifiable progress.

**Blocking If Missing**: Unstructured execution; no exit criteria enforcement.

**Acceptance Criteria**: Phases execute sequentially; exit criteria checked per phase.

### F4: Orchestration Laws

**Rationale**: Behavioral contract. 10 laws ensure consistent agent behavior.

**Blocking If Missing**: Unpredictable behavior; no enforcement of best practices.

**Acceptance Criteria**: All 10 laws implemented and enforced.

### F6: Agent Profiles

**Rationale**: Agent selection mechanism. 21 specialists must be correctly selected.

**Blocking If Missing**: No task-to-agent mapping; users cannot access specialists.

**Acceptance Criteria**: Correct agent selected per task type.

---

## Should Have (6 Features)

### F7: Golden Triangle Teams

**Rationale**: Quality mechanism for complex tasks. Adversarial review catches defects.

**Impact If Missing**: Lower quality on complex deliverables; manual review required.

**Acceptance Criteria**: 18 team configurations functional; consensus stamp present.

### F8: Context Isolation

**Rationale**: Quality mechanism for delegation. Prevents context pollution.

**Impact If Missing**: Cross-contamination between agents; unpredictable outputs.

**Acceptance Criteria**: TIER 1 isolated; TIER 2 shares appropriately.

### F10: HSOL Matrix Resolution

**Rationale**: Efficiency mechanism. 1400+ skills reduce token consumption.

**Impact If Missing**: Repeated context explanations; higher token costs.

**Acceptance Criteria**: Skills resolved by profile; fitness calculated correctly.

### F12: Skill Injection

**Rationale**: Skill delivery mechanism. Skills must be loaded before execution.

**Impact If Missing**: Skills not available to agents; efficiency gains lost.

**Acceptance Criteria**: Skills loaded before agent execution.

### F13-F16: Platform Integrations

**Rationale**: Multi-platform value proposition. All 7 platforms must be supported.

**Impact If Missing**: Single-platform product; limited audience reach.

**Acceptance Criteria**: All platforms functional with consistent behavior.

### F17: CLI Installer

**Rationale**: Deployment mechanism. Users need simple installation.

**Impact If Missing**: Manual setup required; adoption barrier.

**Acceptance Criteria**: One-command install per platform; uninstall clean.

---

## Could Have (6 Features)

### F5: Error Handling Framework

**Rationale**: Resilience mechanism. Improves user experience on failures.

**Impact If Missing**: Errors produce unhelpful messages; users stuck.

**Acceptance Criteria**: Errors handled gracefully; recovery paths clear.

### F9: Recursive Delegation

**Rationale**: Architectural enforcement. Ensures meta agents delegate properly.

**Impact If Missing**: Meta agents may implement directly; expertise mismatch.

**Acceptance Criteria**: Meta agents delegate to specialists.

### F11: Dynamic Skill Discovery

**Rationale**: Skill extensibility. Enables on-demand skill loading.

**Impact If Missing**: Fixed skill set only; limited extensibility.

**Acceptance Criteria**: Discovery triggers when fitness < 0.75.

### F18: Wiki Generation

**Rationale**: Documentation automation. Reduces documentation debt.

**Impact If Missing**: Manual documentation required; drifts over time.

**Acceptance Criteria**: Code analysis produces navigable documentation.

### F19: Documentation System

**Rationale**: Knowledge organization. Provides structured documentation pattern.

**Impact If Missing**: Unstructured documentation; harder to navigate.

**Acceptance Criteria**: Knowledge folders follow 00-index.md pattern.

### F20: Reporting

**Rationale**: Visibility mechanism. Provides project status visibility.

**Impact If Missing**: Manual status tracking required.

**Acceptance Criteria**: Reports generated with metrics.

---

## Won't Have (This Release) (3 Features)

### F21: Enterprise SSO (Future)

**Rationale**: Nice-to-have for large teams but adds significant complexity.

**Deferred Reason**: Authentication complexity; user management scope creep.

**Target Phase**: Phase 2

### F22: Custom Agent Templates (Future)

**Rationale**: Advanced extensibility; not required for core value proposition.

**Deferred Reason**: Template system design needed; not MVP-critical.

**Target Phase**: Phase 2

### F23: Mobile IDE Integration (Future)

**Rationale**: Extends reach but significant platform-specific work.

**Deferred Reason**: iOS/Android SDK differences; not primary platform.

**Target Phase**: Phase 3

---

## Prioritization Summary

| Priority | Count | Features |
|----------|-------|----------|
| **Must** | 5 | F1, F2, F3, F4, F6 |
| **Should** | 9 | F7, F8, F10, F12, F13, F14, F15, F16, F17 |
| **Could** | 6 | F5, F9, F11, F18, F19, F20 |
| **Won't** | 3 | F21, F22, F23 |

---

## Release Criteria

### MVP Release (Must Have Only)

- [ ] F1: Command routing functional
- [ ] F2: TIER 1/2 execution working
- [ ] F3: Phase execution with exit criteria
- [ ] F4: All 10 orchestration laws enforced
- [ ] F6: 21 agents with correct selection

### Enhanced Release (Should Have Added)

- [ ] F7: Golden Triangle teams
- [ ] F8: Context isolation verified
- [ ] F10: HSOL matrix resolution
- [ ] F12: Skill injection
- [ ] F13-F16: All 7 platforms
- [ ] F17: CLI installer

### Full Release (Could Have Added)

- [ ] F5: Error handling framework
- [ ] F9: Recursive delegation
- [ ] F11: Dynamic discovery
- [ ] F18: Wiki generation
- [ ] F19: Documentation system
- [ ] F20: Reporting

---

## Evidence Sources

- `rules/CORE.md` — Core features (F1-F4)
- `rules/AGENTS.md` — Agent management (F6, F8, F9)
- `rules/TEAMS.md` — Golden Triangle (F7)
- `rules/SKILLS.md` — Skill discovery (F10-F12)
- `README.md` — Platform support (F13-F16), Installation (F17)
