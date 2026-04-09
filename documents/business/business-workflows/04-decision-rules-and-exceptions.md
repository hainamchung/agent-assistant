# Decision Rules and Exceptions

> **Purpose**: Business rules, exception handling, and fallback paths governing workflow execution.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Decision Rules

### DR-001: Command Routing

| Condition | Rule |
|-----------|------|
| Explicit command (`/cook`, `/fix`, etc.) | Route directly to command router |
| Natural language with HIGH confidence match | Route directly, no confirmation needed |
| Natural language with LOW confidence | Default to `/cook`, announce: "Routing to /cook — use /command to override" |
| Ambiguous requirement | Pause and ask user for clarification (never assume intent) |

### DR-002: Variant Selection

| Condition | Rule |
|-----------|------|
| User specifies `:fast` | Load fast variant (minimal phases, solo execution) |
| User specifies `:hard` | Load hard variant (full phases, thorough analysis) |
| User specifies `:team` | Load team variant (Golden Triangle adversarial collaboration) |
| No variant specified | Default to `:hard` |
| `:team` requested but `team.md` does not exist for command | Fall back to `:hard`, notify user |

### DR-003: Execution Mode Selection

| Agent Category | Mode | Fallback |
|---------------|------|----------|
| execution, meta, investigation, support | EMBODY | N/A (always EMBODY) |
| validation, research | SUB-AGENT | EMBODY + Anti-Bias Protocol (when sub-agent tool unavailable) |

### DR-004: Phase Progression

| Condition | Rule |
|-----------|------|
| All exit criteria met | Proceed to next phase |
| Some exit criteria not met | Agent must address gaps before proceeding |
| Factual error discovered in prior deliverable | L8 escape hatch: prior deliverable may be revised |
| Agent confidence below threshold | Escalate to user with options |

### DR-005: Quality Gate Enforcement

| Gate Type | Trigger | Action |
|-----------|---------|--------|
| Phase gate | Phase completion | Verify exit criteria checklist |
| Quality gate | Review phase | 5-dimension evaluation (D1-D5) |
| Safety gate | Any phase | D4 security override blocks on critical finding |

### DR-006: Tiered Context Loading

| Task Complexity | Tier | Stop Reading |
|-----------------|------|-------------|
| < 50 words, `/ask`, NL question | NANO | Stop at `<!-- TIER: NANO END -->` |
| >= 50 words, standard workflow | MICRO | Stop at `<!-- TIER: MICRO END -->` |
| `:team` or `:hard` variant | FULL | Read entire RUNTIME.md |

---

## Exception Handling

### EX-001: Model Ignores Protocol

**Trigger**: Agent produces output that violates scope or protocol rules.
**Response**: Self-check protocol catches violation → orchestrator re-delegates or escalates to user.
**Prevention**: Explicit prohibition rules, self-check before every response, lint validation in CI.

### EX-002: Context Window Exhaustion

**Trigger**: Workflow exceeds platform context window limit.
**Response**: Context decay detection triggers soft refresh (~200 tokens recap) or hard refresh (~500-800 tokens re-grounding).
**Prevention**: Tiered loading (NANO/MICRO/FULL); handoff compression (70% reduction at minimal tier).

### EX-003: Workflow Interruption

**Trigger**: User session disconnects or context is lost mid-workflow.
**Response**: Checkpoint-resume protocol saves current phase state to JSON.
**Recovery**: User invokes same command; system detects checkpoint and offers resume.
**Constraint**: Checkpoints expire after 24 hours (configurable).

### EX-004: Agent Handoff Failure

**Trigger**: Agent attempts handoff to an agent not in its `handoffs` list.
**Response**: Orchestrator blocks handoff; logs violation; selects valid handoff target or escalates.
**Prevention**: `simulate.js` validates handoff graph integrity at CI time.

### EX-005: Security Finding (D4 Override)

**Trigger**: Reviewer or security-engineer identifies a critical security issue during evaluation.
**Response**: D4 security dimension overrides all other quality scores. Deliverable is blocked. Issue must be resolved before workflow can complete.
**Prevention**: Guardrails (injection-defense, auth-patterns) applied proactively.

### EX-006: Community Skill Quarantine

**Trigger**: Community-submitted skill fails trust verification.
**Response**: Skill placed in quarantine; not loaded by HSOL; contributor notified.
**Prevention**: Trust tiers (core > verified > community); SHA-256 integrity hashes.

### EX-007: Install Failure

**Trigger**: `agent-assistant install {tool}` fails (permissions, disk space, Node version).
**Response**: CLI reports specific error with remediation guidance.
**Prevention**: Prerequisites documented; Node.js version check at startup.

---

## Fallback Paths

| Scenario | Primary Path | Fallback |
|----------|-------------|----------|
| Sub-agent tool available | SUB-AGENT execution | N/A |
| Sub-agent tool unavailable | Blocked | EMBODY + Anti-Bias Protocol |
| :team variant requested | Golden Triangle execution | Fall back to :hard if team.md missing |
| Checkpoint exists | Offer resume | Start fresh if checkpoint stale (>24h) |
| HSOL skill not found | Auto-resolution | Agent operates without skill enhancement |
| CI lint fails | Block merge | Contributor fixes and re-submits |

## Evidence Sources

- [rules/RUNTIME.md](../../../rules/RUNTIME.md) — Orchestration laws, execution model, ambiguity handling
- [rules/CONTEXT-DECAY.md](../../../rules/CONTEXT-DECAY.md) — Context decay detection protocol
- [rules/DURABLE-EXECUTION.md](../../../rules/DURABLE-EXECUTION.md) — Checkpoint-resume protocol
- [rules/EVALUATION.md](../../../rules/EVALUATION.md) — 5-dimension evaluation including D4
- [knowledge-domain/04-business-rules.md](../../knowledge-domain/04-business-rules.md) — Schema and security rules
