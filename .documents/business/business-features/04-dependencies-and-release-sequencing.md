# Dependencies and Release Sequencing

> **Section**: Business Features | **File**: 04-dependencies-and-release-sequencing.md
> **Purpose**: Dependency graph for all 20 features and release order

---

## Dependency Graph

### Layer 1: Foundation (No Dependencies)

These features have no dependencies and can be developed in any order:

| Feature | ID | Rationale |
|---------|-----|----------|
| Orchestration Laws | F4 | Defines core behavioral contract |
| Command Routing | F1 | Entry point to system |

### Layer 2: Core Execution

These features depend on Layer 1:

| Feature | ID | Depends On |
|---------|-----|------------|
| Tiered Execution | F2 | F1 (routing to execution) |
| Agent Profiles | F6 | F2 (profiles used in execution) |

### Layer 3: Structured Delivery

These features depend on Layer 2:

| Feature | ID | Depends On |
|---------|-----|------------|
| Phase Execution | F3 | F2 (phases wrap execution) |
| HSOL Matrix | F10 | F6 (profile-based resolution) |
| Skill Injection | F12 | F10 (matrix delivers skills) |

### Layer 4: Quality and Teams

These features depend on Layer 3:

| Feature | ID | Depends On |
|---------|-----|------------|
| Golden Triangle | F7 | F6 (team uses agents) |
| Context Isolation | F8 | F6 (isolation between agents) |
| Dynamic Discovery | F11 | F10 (extends matrix) |

### Layer 5: Error and Meta

These features depend on multiple lower layers:

| Feature | ID | Depends On |
|---------|-----|------------|
| Error Handling | F5 | F2, F3 |
| Recursive Delegation | F9 | F6 |
| Wiki Generation | F18 | F6, F7 |
| Documentation System | F19 | F6 |
| Reporting | F20 | F3 |

### Layer 6: Platform Integration

These features depend on multiple layers and platform-specific paths:

| Feature | ID | Depends On |
|---------|-----|------------|
| Cursor Integration | F13 | F1, F2 |
| Claude Code Integration | F14 | F1, F2 |
| Copilot Integration | F15 | F1, F2 |
| Codex/Gemini Integration | F16 | F1, F2 |

### Layer 7: Installer

This feature depends on all platform integrations:

| Feature | ID | Depends On |
|---------|-----|------------|
| CLI Installer | F17 | F13, F14, F15, F16 |

---

## Dependency Matrix

| Feature | F1 | F2 | F3 | F4 | F5 | F6 | F7 | F8 | F9 | F10 | F11 | F12 | F13-F16 | F17 | F18 | F19 | F20 |
|---------|----|----|----|----|----|----|----|----|----|-----|-----|-----|---------|-----|-----|-----|-----|
| F1 | - | | | | | | | | | | | | | | | | |
| F2 | X | - | | | | | | | | | | | | | | | |
| F3 | | X | - | | | | | | | | | | | | | | |
| F4 | - | - | - | - | | | | | | | | | | | | | |
| F5 | | X | X | | - | | | | | | | | | | | | |
| F6 | | X | | | | - | | | | | | | | | | | |
| F7 | | | | | | X | - | | | | | | | | | | |
| F8 | | | | | | X | | - | | | | | | | | | |
| F9 | | | | | | X | | | - | | | | | | | | |
| F10 | | | | | | X | | | | - | | X | | | | | |
| F11 | | | | | | | | | | X | - | | | | | | |
| F12 | | | | | | | | | | X | | - | | | | | |
| F13 | X | X | | | | | | | | | | | - | | | | |
| F14 | X | X | | | | | | | | | | | - | | | | |
| F15 | X | X | | | | | | | | | | | - | | | | |
| F16 | X | X | | | | | | | | | | | - | | | | |
| F17 | | | | | | | | | | | | | X | - | | | |
| F18 | | | | | | X | X | | | | | | | | - | | |
| F19 | | | | | | X | | | | | | | | | | - | |
| F20 | | | X | | | | | | | | | | | | | | - |

X = Dependency

---

## Release Sequence

### Release 1: Foundation

**Goal**: Core execution capability

| Order | Feature | ID | Duration |
|-------|---------|-----|----------|
| 1 | Orchestration Laws | F4 | 1 week |
| 2 | Command Routing | F1 | 2 weeks |
| 3 | Tiered Execution | F2 | 2 weeks |
| 4 | Agent Profiles | F6 | 1 week |

**Milestone**: Basic command routing and agent selection working.

### Release 2: Structured Delivery

**Goal**: Quality delivery with phases

| Order | Feature | ID | Duration |
|-------|---------|-----|----------|
| 5 | Phase Execution | F3 | 2 weeks |
| 6 | HSOL Matrix Resolution | F10 | 2 weeks |
| 7 | Skill Injection | F12 | 1 week |

**Milestone**: Structured workflows with skill injection.

### Release 3: Quality and Teams

**Goal**: Adversarial quality gates

| Order | Feature | ID | Duration |
|-------|---------|-----|----------|
| 8 | Golden Triangle | F7 | 3 weeks |
| 9 | Context Isolation | F8 | 1 week |
| 10 | Dynamic Discovery | F11 | 2 weeks |

**Milestone**: Team-based quality workflow functional.

### Release 4: Error Handling

**Goal**: Resilience

| Order | Feature | ID | Duration |
|-------|---------|-----|----------|
| 11 | Error Handling | F5 | 1 week |
| 12 | Recursive Delegation | F9 | 1 week |

**Milestone**: Graceful degradation on failures.

### Release 5: Platform Integration

**Goal**: Multi-platform support

| Order | Feature | ID | Duration |
|-------|---------|-----|----------|
| 13 | Cursor Integration | F13 | 2 weeks |
| 14 | Claude Code Integration | F14 | 2 weeks |
| 15 | Copilot Integration | F15 | 2 weeks |
| 16 | Codex/Gemini Integration | F16 | 2 weeks |

**Milestone**: All 7 platforms supported.

### Release 6: Installer and Documentation

**Goal**: Complete user experience

| Order | Feature | ID | Duration |
|-------|---------|-----|----------|
| 17 | CLI Installer | F17 | 2 weeks |
| 18 | Wiki Generation | F18 | 2 weeks |
| 19 | Documentation System | F19 | 1 week |
| 20 | Reporting | F20 | 1 week |

**Milestone**: Full product ready for GA.

---

## Sequencing Constraints

### Hard Constraints

| Constraint | Rule |
|------------|------|
| F1 before F2 | Commands must route before executing |
| F2 before F3 | Phases wrap execution |
| F6 before F7 | Teams use agents |
| F13-F16 before F17 | Installer needs platform paths |
| F1+F2 before F13-F16 | Platform integration needs routing and execution |

### Soft Constraints

| Constraint | Rule |
|------------|------|
| F6 before F8 | Context isolation builds on agent profiles |
| F10 before F11 | Dynamic discovery extends matrix |
| F3 before F20 | Reporting uses phase outputs |

---

## Evidence Sources

- `rules/CORE.md` — F1, F2, F4 dependencies
- `rules/AGENTS.md` — F6, F7, F8, F9 dependencies
- `rules/PHASES.md` — F3 dependency
- `rules/SKILLS.md` — F10, F11, F12 dependencies
- `README.md` — F13-F17 platform dependencies
