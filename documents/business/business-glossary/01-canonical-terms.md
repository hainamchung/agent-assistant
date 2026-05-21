# Canonical Terms

> **Section**: Business Glossary | **File**: 01-canonical-terms.md
> **Purpose**: All 31 canonical terms with precise definitions

---

## Orchestration Terms

### T1: Orchestrator

**Definition**: The central coordinator that routes commands, delegates to agents, and manages workflow execution. The Orchestrator never writes code directly; it only coordinates.

**Example**: When user types `/cook:fast "add dark mode"`, the Orchestrator routes to the cook workflow, selects the appropriate agent, and manages phase execution.

**Reference**: `rules/CORE.md` — Orchestrator Protocol

---

### T2: Tier

**Definition**: Execution priority level determining how agents are invoked. TIER 1 (sub-agent) is preferred when available; TIER 2 (embody) is the fallback.

**Example**: TIER 1 uses the platform's `runSubagent` tool for isolated execution; TIER 2 shares the parent context.

**Reference**: `rules/CORE.md` — TIERED EXECUTION

---

### T3: Phase

**Definition**: A discrete stage of workflow execution with defined entry criteria, activities, and exit criteria. Phases execute sequentially.

**Example**: `/cook:hard` executes phases: Requirements Intake → Planning → Implementation → Review → Testing → Delivery

**Reference**: `rules/PHASES.md` — PHASE EXECUTION RULES

---

### T4: Variant

**Definition**: A modifier that changes workflow execution characteristics. Variants include :fast (speed priority), :hard (quality priority), and :team (Golden Triangle).

**Example**: `/cook:fast` uses 1 agent; `/cook:hard` uses 1 agent with quality gates; `/cook:team` uses 3 agents with adversarial review.

**Reference**: `rules/CORE.md` — COMMAND ROUTING

---

### T5: Handoff

**Definition**: The transfer of context and control from one agent to another. Handlers include requirements, constraints, and deliverable format requirements.

**Example**: Orchestrator hands off to backend-engineer with requirements for the API endpoint.

**Reference**: `rules/AGENTS.md` — CONTEXT ISOLATION

---

### T6: Consensus

**Definition**: Agreement reached among team members (Tech Lead, Executor, Reviewer) before releasing output. Formally indicated by the consensus stamp.

**Example**: "✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓"

**Reference**: `rules/TEAMS.md` — CONSENSUS PROTOCOL

---

## Agent Terms

### T7: Agent

**Definition**: A specialized AI role with defined capabilities, responsibilities, and behavioral constraints. 21 agents across 5 categories.

**Example**: `backend-engineer` specializes in server-side logic, APIs, and database operations.

**Reference**: `rules/AGENTS.md` — AGENT CATEGORIES

---

### T8: Executor

**Definition**: In Golden Triangle, the agent responsible for building and implementing the deliverable. Owns implementation decisions and must defend work when challenged.

**Example**: `backend-engineer` in a backend team configuration.

**Reference**: `rules/TEAMS.md` — THE THREE ROLES

---

### T9: Reviewer

**Definition**: In Golden Triangle, the agent responsible for quality gatekeeping. Challenges work, validates correctness, and can FAIL submissions.

**Example**: `reviewer` agent in team configuration reviews backend implementation.

**Reference**: `rules/TEAMS.md` — THE THREE ROLES

---

### T10: Tech Lead

**Definition**: In Golden Triangle, the agent responsible for task decomposition, team coordination, and dispute arbitration. Has FINAL authority on decisions.

**Example**: `tech-lead` agent publishes Task List, arbitrates disputes, synthesizes output.

**Reference**: `rules/TEAMS.md` — THE THREE ROLES

---

### T11: Team

**Definition**: A configured set of 3 agents (Tech Lead + Executor + Reviewer) for collaborative work. 18 team configurations exist for different domains.

**Example**: `backend-team` = tech-lead + backend-engineer + reviewer

**Reference**: `rules/TEAMS.md` — GOLDEN TRIANGLE ROSTER

---

### T12: Meta Agent

**Definition**: An agent category that coordinates and plans but never implements directly. Includes tech-lead, planner, and wiki-architect.

**Example**: `planner` agent creates implementation plans but does not write code.

**Reference**: `rules/AGENTS.md` — AGENT CATEGORIES

---

### T13: Execution Agent

**Definition**: An agent category that directly implements code. Includes backend-engineer, frontend-engineer, mobile-engineer, and game-engineer.

**Example**: `frontend-engineer` implements UI components and client-side logic.

**Reference**: `rules/AGENTS.md` — AGENT CATEGORIES

---

### T14: Validation Agent

**Definition**: An agent category that reviews, tests, and ensures quality. Includes tester, reviewer, debugger, security-engineer, performance-engineer, and wiki-reviewer.

**Example**: `security-engineer` audits code for vulnerabilities.

**Reference**: `rules/AGENTS.md` — AGENT CATEGORIES

---

## Command Terms

### T15: Command

**Definition**: A slash-prefixed invocation that triggers a workflow. 14 commands including /cook, /fix, /plan, /test, /review, /debug, /docs, /design, /deploy, /report, /wiki, /brainstorm, /ask, /code.

**Example**: `/cook:hard "implement OAuth 2.0"`

**Reference**: `rules/CORE.md` — COMMAND ROUTING

---

### T16: Router

**Definition**: The system component that maps user input to command workflows. Handles both explicit commands and natural language.

**Example**: Router maps "implement dark mode" to `/cook`.

**Reference**: `rules/CORE.md` — COMMAND ROUTING

---

### T17: Dispatch

**Definition**: The act of sending work to an agent. Dispatch can be direct (single agent) or distributed (multiple agents in parallel).

**Example**: Orchestrator dispatches to `backend-engineer` for API implementation.

**Reference**: `rules/AGENTS.md` — TIERED EXECUTION

---

## Skill Terms

### T18: Skill

**Definition**: A domain knowledge module that provides specialized capabilities to agents. Skills are resolved by agent profile and injected before execution.

**Example**: `fastapi-expert` skill provides FastAPI patterns to backend agents.

**Reference**: `rules/SKILLS.md` — OVERVIEW

---

### T19: Matrix

**Definition**: The pre-curated collection of skills in `~/.{TOOL}/skills/agent-assistant/matrix-skills/`. Matrix skills are trusted (fitness = 1.0) and fast to resolve.

**Example**: Skills in `matrix-skills/backend.yaml` are matrix skills.

**Reference**: `rules/SKILLS.md` — RESOLUTION ALGORITHM

---

### T20: Profile

**Definition**: The declared domain and category of an agent, used to resolve relevant skills. Example: `profile: "backend:execution"`.

**Example**: `backend-engineer` declares `profile: "backend:execution"` which resolves to backend skills.

**Reference**: `rules/SKILLS.md` — RESOLUTION ALGORITHM

---

### T21: Resolution

**Definition**: The process of determining which skills are relevant for a given agent profile and task context.

**Example**: Resolution scans matrix for skills matching `backend:execution` profile.

**Reference**: `rules/SKILLS.md` — RESOLUTION ALGORITHM

---

## Platform Terms

### T22: Platform

**Definition**: The AI coding tool where Agent Assistant operates. 7 supported platforms: Cursor, Claude Code, GitHub Copilot, Antigravity/Gemini, Codex, Kiro, Qwen.

**Example**: Cursor platform installs to `~/.cursor/skills/agent-assistant/`

**Reference**: `README.md` — Supported Tools

---

### T23: Cursor

**Definition**: One of 7 supported platforms. Cursor IDE with Agent Assistant installed at `~/.cursor/`.

**Reference**: `README.md` — Supported Tools

---

### T24: Claude Code

**Definition**: One of 7 supported platforms. Anthropic's CLI tool with Agent Assistant installed at `~/.claude/`.

**Reference**: `README.md` — Supported Tools

---

### T25: Codex

**Definition**: One of 7 supported platforms. OpenAI's Codex with Agent Assistant installed at `~/.codex/`.

**Reference**: `README.md` — Supported Tools

---

### T26: Kiro

**Definition**: One of 7 supported platforms. Kiro AI Editor with Agent Assistant installed at `~/.kiro/`.

**Reference**: `README.md` — Supported Tools

---

### T27: Qwen

**Definition**: One of 7 supported platforms. Alibaba Qwen Code CLI with Agent Assistant installed at `~/.qwen/`.

**Reference**: `README.md` — Supported Tools

**Definition**: One of 7 supported platforms. OpenAI's Codex with Agent Assistant installed at `~/.codex/`.

**Reference**: `README.md` — Supported Tools

---

## Workflow Terms

### T28: Workflow

**Definition**: A defined sequence of phases that accomplish a specific goal. 20 workflows catalogued including /cook, /test, /review, /wiki.

**Example**: `/cook:hard` workflow has 6 phases: Requirements → Planning → Implementation → Review → Testing → Delivery.

**Reference**: `business-workflows/02-workflow-catalog.md`

---

### T29: Actor

**Definition**: An entity that interacts with the Agent Assistant system. 16 actors including end users, orchestrator, agents, and support systems.

**Example**: `A5: Backend Engineer` is an execution actor.

**Reference**: `business-workflows/01-actor-map.md`

---

### T30: SLA

**Definition**: Service Level Agreement defining expected timing and quality for workflows. Includes response time, completion time, and success rate targets.

**Example**: `/cook:fast` SLA: Response <5s, Completion <30s, Success 99%

**Reference**: `business-workflows/05-sla-and-handoffs.md`

---

### T31: Mailbox

**Definition**: The append-only communication log for Golden Triangle team phases. Located at `./reports/{topic}/MAILBOX-{date}.md`.

**Example**: Executor posts SUBMISSION to Mailbox; Reviewer posts REVIEW (PASS/FAIL).

**Reference**: `rules/TEAMS.md` — COMMUNICATION VIA SHARED FILES

---

## Delivery Terms

### T32: Deliverable

**Definition**: The output produced by an agent or phase. Must follow defined format and include evidence of requirements fulfillment.

**Example**: `backend-engineer` produces `API_ENDPOINT.md` deliverable.

**Reference**: `rules/PHASES.md` — DELIVERABLE SIZE MANAGEMENT

---

### T33: Consensus Stamp

**Definition**: The formal indicator that Golden Triangle team members have agreed on output. Format: "✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓"

**Example**: Output released only with consensus stamp present.

**Reference**: `rules/TEAMS.md` — CONSENSUS PROTOCOL

---

## Term Index

| ID | Term | Category |
|----|------|----------|
| T1 | Orchestrator | Orchestration |
| T2 | Tier | Orchestration |
| T3 | Phase | Orchestration |
| T4 | Variant | Orchestration |
| T5 | Handoff | Orchestration |
| T6 | Consensus | Orchestration |
| T7 | Agent | Agent |
| T8 | Executor | Agent |
| T9 | Reviewer | Agent |
| T10 | Tech Lead | Agent |
| T11 | Team | Agent |
| T12 | Meta Agent | Agent |
| T13 | Execution Agent | Agent |
| T14 | Validation Agent | Agent |
| T15 | Command | Command |
| T16 | Router | Command |
| T17 | Dispatch | Command |
| T18 | Skill | Skill |
| T19 | Matrix | Skill |
| T20 | Profile | Skill |
| T21 | Resolution | Skill |
| T22 | Platform | Platform |
| T23 | Cursor | Platform |
| T24 | Claude Code | Platform |
| T25 | Codex | Platform |
| T26 | Workflow | Workflow |
| T27 | Actor | Workflow |
| T28 | SLA | Workflow |
| T29 | Mailbox | Workflow |
| T30 | Deliverable | Delivery |
| T31 | Consensus Stamp | Delivery |

---

## Evidence Sources

- `rules/CORE.md` — Orchestration terms (T1-T6)
- `rules/AGENTS.md` — Agent terms (T7-T14)
- `rules/TEAMS.md` — Team terms (T8-T11, T29, T31)
- `rules/SKILLS.md` — Skill terms (T18-T21)
- `rules/PHASES.md` — Phase and deliverable terms (T3, T30)
- `README.md` — Platform terms (T22-T25)
- `business-workflows/` — Workflow terms (T26-T28)
