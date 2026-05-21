---
title: Business Rules
type: concept
tags: [business-rules, domain, governance, validation]
created: 2026-05-20
updated: 2026-05-20
---

# Business Rules

Business Rules define the operational constraints and decision logic that govern Agent Assistant's behavior. 62 business rules across 7 categories establish everything from command parsing to error propagation, complemented by 15 decision rules, 4 exception categories, and 4 fallback paths. These rules are the explicit specification of how the system behaves in practice.

---

## Definition

Business rules are explicit specifications that constrain or govern the system's behavior. They are distinct from architectural patterns — patterns describe how components interact, while rules describe what the system must and must not do.

- **Total Business Rules**: 62 across 7 categories
- **Decision Rules**: 15 across 5 categories
- **Exception Categories**: 4 with 16 specific handlers
- **Fallback Paths**: 4 with step-by-step recovery procedures
- **Categories (BR)**: Command Parsing, Variant Selection, Skill Resolution, Platform Path Resolution, Agent Selection, Team Coordination, Error Handling
- **Source**: `documents/knowledge-domain/04-business-rules.md:1-285`

---

## Category 1: Command Parsing (BR-001–BR-003)

Rules governing how user commands are parsed and validated.

**BR-001**: Command Format
- Commands follow the format `/command:variant parameter`
- The leading slash (`/`) indicates a command
- Variant is optional (defaults to `fast`)

**BR-002**: Valid Command Detection
- Only 14 commands are recognized: `/cook`, `/code`, `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/deploy`, `/report`, `/wiki`, `/brainstorm`, `/ask`
- Unknown commands return an error message listing valid commands

**BR-003**: Unknown Command Handling
- If the command is unknown, the system responds with a list of valid commands
- Natural language may be mapped to commands (e.g., "fix this bug" → `/fix`)

---

## Category 2: Variant Selection (BR-010–BR-013)

Rules governing which execution variant is used.

**BR-010**: Default Variant
- If no variant is specified, `fast` is the default
- Example: `/cook` is equivalent to `/cook:fast`

**BR-011**: Variant Availability
- All 14 commands support all 3 variants: fast, hard, team
- Each variant provides increasing agent involvement and review depth

**BR-012**: Variant Selection Criteria

| Criterion | Recommended Variant |
|-----------|-------------------|
| Single file, simple change | fast |
| Multiple files, moderate complexity | hard |
| Security-sensitive, architectural, high-stakes | team |

**BR-013**: Variant Escalation
- If a task exceeds the current variant's capacity, escalation to the next tier is recommended
- The system may automatically suggest escalation based on task complexity

---

## Category 3: Skill Resolution (BR-020–BR-023)

Rules governing how skills are selected and injected via HSOL.

**BR-020**: HSOL Injection
- Skills are injected via the Hybrid Skill Orchestration Layer
- Only relevant skills are injected based on task context
- The HSOL algorithm runs 5 steps: Context Analysis → Domain Matching → Priority Calculation → Context Window Fit → Injection

**BR-021**: Tier Priority
- Skills are selected in tier order: foundation → professional → specialized → expert
- Foundation skills are always included
- Higher tiers are added only when matching criteria are met

**BR-022**: Context Window Limits
- The number of injected skills is limited by context window size:
  - Small (<32K): 10–15 skills
  - Medium (32K–64K): 20–30 skills
  - Large (>64K): 50+ skills

**BR-023**: Relevance Scoring
- Skills are ranked by relevance to the task domain
- Required skills score higher than preferred skills
- The highest-priority skills that fit within the context budget are injected

---

## Category 4: Platform Path Resolution (BR-030–BR-033)

Rules governing how platform paths are resolved.

**BR-030**: Path Variables
- Five platform path placeholders are supported:
  - `{{CURSOR_PATH}}` → Cursor platform path
  - `{{COPILOT_PATH}}` → GitHub Copilot path
  - `{{CLAUDE_PATH}}` → Claude Code path
  - `{{ANTIGRAVITY_PATH}}` → Antigravity/Gemini path
  - `{{CODEX_PATH}}` → Codex path

**BR-031**: Placeholder Replacement
- Placeholders are replaced with actual platform paths during installation
- The CLI installer (`cli/install.js`) handles replacement

**BR-032**: Path Validation
- Platform paths are validated for existence and write permissions
- If validation fails, a warning is logged but installation continues

**BR-033**: Detection Priority
- Platform detection follows this priority: explicit config → environment variable → file markers → default path
- This allows flexible configuration across different environments

---

## Category 5: Agent Selection (BR-040–BR-042)

Rules governing how agents are selected for tasks.

**BR-040**: Default Agent Assignment
- Each command has default agents assigned based on task type
- Example: `/cook` defaults to `frontend-engineer` + `backend-engineer`

**BR-041**: Agent Override
- Users can override the default agent assignment using the `@` syntax: `/cook:team @backend-engineer @database-architect`
- Overridden agents must exist in the agent registry

**BR-042**: Agent Constraints
- Referenced agents must exist in the agent registry
- If a referenced agent is not found, an error is returned listing valid agents

---

## Category 6: Team Coordination (BR-050–BR-052)

Rules governing Golden Triangle team coordination.

**BR-050**: Team Roles
- Every team has 3 roles: Tech Lead (architecture), Executor (implementation), Reviewer (adversarial quality)
- Each role has specific responsibilities and authority levels

**BR-051**: Sequential Execution
- Team execution follows a strict order: Tech Lead → Executor → Reviewer
- Results flow back through the chain
- Debate loops are allowed between Executor and Reviewer

**BR-052**: Iteration Limit
- The debate loop between Executor and Reviewer is limited to 3 rounds
- After 3 rounds without resolution, the dispute is escalated to Tech Lead for arbitration
- Tech Lead's arbitration decision is binding

---

## Category 7: Error Handling (BR-060–BR-062)

Rules governing error classification, retry, and propagation.

**BR-060**: Severity Classification
- Errors are classified by severity: Warning, Error, Critical
- **Warning**: Log only, continue execution
- **Error**: Retry with backoff, up to 3 attempts
- **Critical**: Stop immediately, escalate

**BR-061**: Retry Policy
- Errors retry with exponential backoff: 1s, 2s, then stop
- After 3 failed retries, the error is escalated
- Non-idempotent operations are not automatically retried

**BR-062**: Propagation Chain
- Errors propagate through the execution chain: Agent → Team → Command → User
- Each level can handle or escalate errors
- User-facing errors include actionable messages

---

## Decision Rules (R1–R15)

Decision rules govern orchestration flow, agent behavior, skill injection, and team dynamics. These rules are sourced from `documents/business/business-workflows/04-decision-rules-and-exceptions.md:10-177`.

### R1: Command Routing

| Rule | Condition | Action |
|------|-----------|--------|
| R1.1 | Explicit command detected | Route to command workflow file |
| R1.2 | Natural language detected | Map to equivalent command |
| R1.3 | Unknown command | Return error with suggestions |
| R1.4 | Variant specified | Route to variant-specific file |
| R1.5 | No variant specified | Use default variant |

### R2: Tiered Execution

| Rule | Condition | Action |
|------|-----------|--------|
| R2.1 | runSubagent available | Use TIER 1 (mandatory) |
| R2.2 | runSubagent unavailable | Use TIER 2 (fallback) |
| R2.3 | TIER 1 tool error | Retry once, then TIER 2 |
| R2.4 | Task claimed "too simple" | Still require TIER 1 |
| R2.5 | Token savings claimed | Still require TIER 1 |

### R3: Phase Execution

| Rule | Condition | Action |
|------|-----------|--------|
| R3.1 | Phase N incomplete | Do not start Phase N+1 |
| R3.2 | Exit criteria not met | Phase does not complete |
| R3.3 | Prior deliverable missing | Halt, create, then resume |
| R3.4 | Prior deliverable exists | Lock as immutable constraint |
| R3.5 | Scope creep detected | Reject, return to scope |

### R4: Agent Selection

| Rule | Condition | Action |
|------|-----------|--------|
| R4.1 | Backend task | Select [[Agent System]] backend-engineer |
| R4.2 | Frontend task | Select frontend-engineer |
| R4.3 | Database task | Select database-architect |
| R4.4 | Security task | Select security-engineer |
| R4.5 | Testing task | Select tester |
| R4.6 | Unmapped task | Ask user for clarification |

### R5: Meta Agent Constraints

| Rule | Condition | Action |
|------|-----------|--------|
| R5.1 | Meta agent (tech-lead, planner) | Must delegate, not implement |
| R5.2 | Execution agent | May implement directly |
| R5.3 | Validation agent | May review, not modify code |
| R5.4 | Research agent | May investigate, not implement |

### R6: Context Isolation

| Rule | Condition | Action |
|------|-----------|--------|
| R6.1 | TIER 1 execution | Fresh isolated context |
| R6.2 | TIER 2 execution | Shared parent context |
| R6.3 | Agent handoff | Include requirements, deliverables |
| R6.4 | Agent handoff | Exclude reasoning, failed attempts |

### R7: HSOL Resolution

| Rule | Condition | Action |
|------|-----------|--------|
| R7.1 | Simple task | Skip skill resolution |
| R7.2 | Complex task | Run resolution algorithm |
| R7.3 | Matrix fitness >= 0.8 | Use matrix skills |
| R7.4 | Matrix fitness 0.75-0.8 | Use matrix + flag discovery |
| R7.5 | Matrix fitness < 0.75 | BLOCKING discovery |
| R7.6 | Discovery unavailable | Proceed with matrix only |

### R8: Skill Injection

| Rule | Condition | Action |
|------|-----------|--------|
| R8.1 | Skills resolved | Load before agent execution |
| R8.2 | No matching skills | Report gap explicitly |
| R8.3 | New skill needed | Ask user confirmation |
| R8.4 | Installation fails | Rollback, report gap |

### R9: Golden Triangle

| Rule | Condition | Action |
|------|-----------|--------|
| R9.1 | :team variant invoked | Spawn Tech Lead + Executor + Reviewer |
| R9.2 | Team phase start | Tech Lead publishes Task List first |
| R9.3 | Executor submits | Reviewer reviews within same phase |
| R9.4 | Review FAIL | Executor fixes or defends |
| R9.5 | Review PASS | Proceed to next task |
| R9.6 | Defense without evidence | Automatic FAIL |
| R9.7 | Round > 3 | Tech Lead arbitrates |

### R10: Consensus

| Rule | Condition | Action |
|------|-----------|--------|
| R10.1 | Clean PASS | Accept submission |
| R10.2 | Resolved PASS | Accept after fixes/defense |
| R10.3 | Max rounds reached | Tech Lead decision binding |
| R10.4 | Output without stamp | Block release |
| R10.5 | Reviewer rubber-stamps | Tech Lead rejects PASS |

### R11: Mailbox

| Rule | Condition | Action |
|------|-----------|--------|
| R11.1 | Team phase active | Use Mailbox for communication |
| R11.2 | Mailbox entry | Append only, no edits |
| R11.3 | Mailbox entry | Include timestamp and type |
| R11.4 | REVIEW type | Include explicit PASS/FAIL |
| R11.5 | DEFENSE type | Include technical evidence |

### R12: Requirements Intake

| Rule | Condition | Action |
|------|-----------|--------|
| R12.1 | Ambiguous requirement | ASK user before proceeding |
| R12.2 | Missing requirement | Report gap |
| R12.3 | Contradicting requirements | Report conflict |
| R12.4 | All requirements parsed | Create Requirements Registry |

### R13: Deliverable Rules

| Rule | Condition | Action |
|------|-----------|--------|
| R13.1 | Output <= 150 lines | Single file |
| R13.2 | Output > 150 lines | Chunked folder with index |
| R13.3 | Output >= 4 sections | Chunked folder |
| R13.4 | Chunked creation | Create index first |
| R13.5 | Chunked update | Update index after each section |

### R14: Error Detection

| Rule | Condition | Action |
|------|-----------|--------|
| R14.1 | Ambiguity detected | STOP, ASK user |
| R14.2 | Missing context | STOP, request context |
| R14.3 | Code not finalized | STOP, wait for code |
| R14.4 | Assumption detected | Challenge assumption |

### R15: Error Recovery

| Rule | Condition | Action |
|------|-----------|--------|
| R15.1 | TIER 1 spawn fails | Fall back to TIER 2 |
| R15.2 | Sub-agent error | Retry once, then fallback |
| R15.3 | Agent timeout | Extend timeout, then fail |
| R15.4 | Mailbox write fails | Use inline communication |

---

## Exception Categories

Exception categories define specific failure scenarios and their recovery procedures. See [[Error Handling]] for related policies.

**Source**: `documents/business/business-workflows/04-decision-rules-and-exceptions.md:180-217`

### E1: Input Exceptions

| Exception | Trigger | Recovery |
|-----------|---------|----------|
| E1.1 | Empty input | Prompt for clarification |
| E1.2 | Invalid command | Show valid commands |
| E1.3 | Invalid variant | Show valid variants |
| E1.4 | Missing required param | Request missing param |

### E2: Execution Exceptions

| Exception | Trigger | Recovery |
|-----------|---------|----------|
| E2.1 | TIER 1 unavailable | Fall back to TIER 2 |
| E2.2 | Agent not found | Ask user for agent |
| E2.3 | Skill not found | Trigger discovery |
| E2.4 | Phase timeout | Extend or abort |

### E3: Quality Exceptions

| Exception | Trigger | Recovery |
|-----------|---------|----------|
| E3.1 | Review FAIL | Return to implementation |
| E3.2 | Test failure | Debug and fix |
| E3.3 | Coverage below target | Add more tests |
| E3.4 | Security vulnerability | Fix before delivery |

### E4: Team Exceptions

| Exception | Trigger | Recovery |
|-----------|---------|----------|
| E4.1 | Consensus impossible | Tech Lead arbitration |
| E4.2 | Reviewer too strict | Re-invoke with checklist |
| E4.3 | Executor silent | Tech Lead creates minimal |
| E4.4 | Mailbox corrupted | Inline communication mode |

---

## Fallback Paths

Fallback paths provide step-by-step recovery procedures when primary paths fail.

**Source**: `documents/business/business-workflows/04-decision-rules-and-exceptions.md:220-267`

### F1: TIER 1 Fallback

```
TIER 1 failure:
  1. Log: "⚠️ TIER 1 FAILED: {reason}"
  2. Retry TIER 1 once
  3. If still fails → TIER 2 fallback
  4. Log: "⚠️ TIER 2: {reason}"
  5. Embody agent
  6. Continue execution
```

### F2: Agent Fallback

```
Agent unavailable:
  1. Log: "⚠️ AGENT UNAVAILABLE: {agent}"
  2. Check agent category
  3. Try category default (execution → backend-engineer)
  4. Ask user if default unacceptable
  5. Continue with selected agent
```

### F3: Skill Fallback

```
Skill resolution failure:
  1. Log: "⚠️ SKILL RESOLUTION FAILED"
  2. Proceed with base knowledge
  3. Flag: "Skill gap: {domain}"
  4. Notify user of limitation
  5. Continue without skill injection
```

### F4: Phase Fallback

```
Phase cannot complete:
  1. Log: "⚠️ PHASE BLOCKED: {reason}"
  2. Attempt recovery action
  3. If unrecoverable:
     a. Create minimal viable output
     b. Flag issue
     c. Proceed to next phase
  4. Report limitation to user
```

---

## Decision Matrix

The decision matrix provides a quick reference for primary and fallback paths across scenarios.

**Source**: `documents/business/business-workflows/04-decision-rules-and-exceptions.md:271-281`

| Scenario | Primary Path | Fallback Path |
|----------|--------------|---------------|
| [[Command System]] routing | Route to file | Error message |
| [[Agent System]] selection | Map to correct agent | Ask user |
| [[Tiered Orchestration]] execution | Sub-agent spawn | Embodied execution |
| Skill resolution | Matrix skills | Dynamic discovery |
| Team consensus | Debate until agreement | Tech Lead arbitration |
| Phase completion | All criteria met | Create minimal output |

---

## Evidence Sources

### Business Rules (BR-001–BR-062)
- `documents/knowledge-domain/04-business-rules.md:1-285`

### Decision Rules (R1–R15)
- `documents/business/business-workflows/04-decision-rules-and-exceptions.md:10-177`
- `rules/CORE.md` — R1, R2, R3, R14, R15
- `rules/AGENTS.md` — R4, R5, R6
- `rules/TEAMS.md` — R9, R10, R11
- `rules/PHASES.md` — R3, R13
- `rules/SKILLS.md` — R7, R8

### Exception Categories (E1–E4)
- `documents/business/business-workflows/04-decision-rules-and-exceptions.md:180-217`
- `rules/CORE.md` — E1, E2
- `rules/SKILLS.md` — E3
- `rules/TEAMS.md` — E4

### Fallback Paths (F1–F4)
- `documents/business/business-workflows/04-decision-rules-and-exceptions.md:220-267`
- `rules/CORE.md` — F1-F4

---

## Related Pages

- [[Rule System]] — The 8 orchestration rule files
- [[Error Handling]] — Error classification and retry policies
- [[Command System]] — Command parsing and routing
- [[Agent System]] — Agent selection and constraints
- [[Tiered Orchestration]] — TIER 1 vs TIER 2 execution
