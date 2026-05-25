---
title: Terminology
description: Complete reference of all 31 canonical terms, deprecated terms, event types, and domain-to-code mappings for Agent Assistant.
category: concept
tags: [terminology, glossary, reference, canonical-terms, events]
related:
  - Agent System
  - Command System
  - Team System
  - Skill System
  - Golden Triangle
  - Tiered Orchestration
  - Command Routing
  - Entity Relationships
created: 2026-05-20
updated: 2026-05-20
---

# Terminology

This page serves as the authoritative reference for all terminology used in Agent Assistant. It establishes a shared vocabulary across all documentation, rules, and communications, ensuring consistent usage of terms throughout the system. The terminology is organized into 7 categories covering all 31 canonical terms, supplemented by deprecated synonyms, event type definitions, and domain-to-code mapping references.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:1-373`, `.documents/business/business-glossary/02-synonyms-and-deprecated-terms.md:1-313`, `.documents/business/business-glossary/03-domain-entities-and-events.md:1-337`, `.documents/business/business-glossary/04-api-term-mapping.md:1-457`

---

## Orchestration Terms (T1-T6)

These terms govern how the system coordinates work across agents and phases.

### T1: Orchestrator

**Definition**: The central coordinator that routes commands, delegates to agents, and manages workflow execution. The Orchestrator never writes code directly; it only coordinates. It is the conductor that ensures all other agents play their parts correctly.

**Key Responsibilities**:
- Route commands to appropriate workflows
- Select and dispatch agents based on task requirements
- Manage phase execution and transitions
- Enforce rule compliance
- Synthesize results from multiple agents

**Example**: When user types `/cook:fast "add dark mode"`, the Orchestrator routes to the cook workflow, selects the appropriate agent, and manages phase execution. It coordinates the entire pipeline from input to deliverable without directly implementing any code.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:10-18`

---

### T2: Tier

**Definition**: Execution priority level determining how agents are invoked. TIER 1 (sub-agent) is preferred when available; TIER 2 (embody) is the fallback. The tier system ensures consistent agent invocation patterns across all operations.

**TIER 1 — Sub-agent Execution**:
- Uses the platform's `runSubagent` tool for isolated execution
- Agent runs in a fresh context, isolated from parent
- Preferred for complex tasks requiring dedicated focus
- Higher resource cost but better isolation

**TIER 2 — Embody Execution**:
- Shares the parent context
- Direct execution within current session
- Fallback when TIER 1 is unavailable
- Lower resource cost but context pollution risk

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:20-27`

---

### T3: Phase

**Definition**: A discrete stage of workflow execution with defined entry criteria, activities, and exit criteria. Phases execute sequentially, ensuring each stage completes before the next begins. This structured approach guarantees quality gates are enforced at appropriate checkpoints.

**Standard Phase Sequence** (for `/cook:hard`):
1. Requirements Intake — Extract and validate requirements
2. Planning — Create implementation approach
3. Implementation — Build the deliverable
4. Review — Validate against requirements
5. Testing — Verify functionality
6. Delivery — Produce final output

**Phase Characteristics**:
- Entry criteria must be met before phase begins
- Activities are defined for consistent execution
- Exit criteria must be satisfied before phase completion
- Deliverable is produced at phase conclusion

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:30-37`

---

### T4: Variant

**Definition**: A modifier that changes workflow execution characteristics. Variants include `:fast` (speed priority), `:hard` (quality priority), and `:team` (Golden Triangle). The variant system allows the same command to serve different quality/speed trade-offs.

**Variant Comparison**:

| Variant | Agents | Quality Gates | Speed | Use Case |
|---------|--------|---------------|-------|----------|
| `:fast` | 1 | Minimal | Fastest | Simple, well-understood tasks |
| `:hard` | 1 | Full review | Medium | Standard implementation tasks |
| `:team` | 3 (triangle) | Adversarial review | Slowest | Critical, complex deliverables |

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:40-47`

---

### T5: Handoff

**Definition**: The transfer of context and control from one agent to another. Handlers include requirements, constraints, and deliverable format requirements. The handoff system ensures context is preserved when work transfers between agents.

**Handoff Components**:
- Requirements — What must be delivered
- Constraints — Boundaries and limitations
- Deliverable format — Expected output structure
- Prior context — Relevant previous work

**Example**: Orchestrator hands off to `backend-engineer` with requirements for the API endpoint, including input/output specifications, error handling requirements, and the expected deliverable format.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:50-57`

---

### T6: Consensus

**Definition**: Agreement reached among team members (Tech Lead, Executor, Reviewer) before releasing output. Formally indicated by the consensus stamp. Consensus ensures all stakeholders approve deliverables before release.

**Consensus Requirements**:
- All three Golden Triangle roles must agree
- Disputes are escalated to Tech Lead for arbitration
- Maximum 3 debate rounds before arbitration
- Output is only released with formal stamp

**Consensus Stamp Format**:
```
✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓
```

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:60-67`

---

## Agent Terms (T7-T14)

These terms define the specialized roles that execute work within the system.

### T7: Agent

**Definition**: A specialized AI role with defined capabilities, responsibilities, and behavioral constraints. Agent Assistant includes 21 agents across 5 categories. Each agent is designed for a specific domain and follows strict behavioral guidelines.

**Agent Categories**:
- **Implementation Agents** — Production-quality code across all platforms
- **Architecture Agents** — System design and data architecture
- **Quality Agents** — Testing, code review, debugging, security
- **Planning Agents** — Strategy, estimation, requirements analysis
- **Support Agents** — UI/UX, DevOps, documentation, research, coordination

**Example**: `backend-engineer` specializes in server-side logic, APIs, and database operations. It declares a profile of `backend:execution` which resolves relevant skills for backend development.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:72-79`

---

### T8: Executor

**Definition**: In Golden Triangle, the agent responsible for building and implementing the deliverable. Owns implementation decisions and must defend work when challenged. The Executor is the builder who creates tangible outputs.

**Executor Responsibilities**:
- Build and implement deliverables
- Make implementation decisions
- Respond to review feedback
- Defend choices with evidence
- Deliver completed work to Reviewer

**Protocol**: Build → Defend → Deliver

**Example**: `backend-engineer` in a backend team configuration acts as the Executor, implementing API endpoints, database schemas, and server logic according to requirements.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:82-89`

---

### T9: Reviewer

**Definition**: In Golden Triangle, the agent responsible for quality gatekeeping. Challenges work, validates correctness, and can FAIL submissions. The Reviewer ensures quality standards are met before release.

**Reviewer Responsibilities**:
- Challenge implementation choices
- Validate correctness against requirements
- Identify defects and issues
- Issue PASS or FAIL verdicts
- Escalate disputes to Tech Lead

**Protocol**: Challenge → Validate → FAIL/PASS

**Example**: `reviewer` agent in team configuration reviews backend implementation, checking for security vulnerabilities, performance issues, and requirement compliance.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:92-99`

---

### T10: Tech Lead

**Definition**: In Golden Triangle, the agent responsible for task decomposition, team coordination, and dispute arbitration. Has FINAL authority on decisions. The Tech Lead orchestrates the team and resolves conflicts.

**Tech Lead Responsibilities**:
- Decompose tasks into assignments
- Coordinate team activities
- Monitor progress across phases
- Arbitrate disputes between Executor and Reviewer
- Provide final authority on contested decisions

**Protocol**: Decompose → Coordinate → Arbitrate

**Example**: `tech-lead` agent publishes Task List, arbitrates disputes, and synthesizes output. When Executor and Reviewer disagree, Tech Lead makes the final call.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:102-109`

---

### T11: Team

**Definition**: A configured set of 3 agents (Tech Lead + Executor + Reviewer) for collaborative work. 18 team configurations exist for different domains. Teams enable complex work through structured collaboration.

**Team Structure**:
- **Tech Lead** — Coordination and arbitration
- **Executor** — Implementation
- **Reviewer** — Quality gatekeeping

**Example Team Configurations**:
- `backend-team` = tech-lead + backend-engineer + reviewer
- `frontend-team` = tech-lead + frontend-engineer + reviewer
- `database-team` = tech-lead + database-architect + reviewer
- `fullstack-team` = tech-lead + fullstack-engineer + reviewer

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:112-119`

---

### T12: Meta Agent

**Definition**: An agent category that coordinates and plans but never implements directly. Includes `tech-lead`, `planner`, and `wiki-architect`. Meta agents set direction without building.

**Meta Agent Characteristics**:
- Specializes in coordination and planning
- Never directly implements code or deliverables
- Delegates implementation to Execution agents
- Focuses on strategy and decomposition

**Example**: `planner` agent creates implementation plans but does not write code. `wiki-architect` designs documentation structure without creating content.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:122-129`

---

### T13: Execution Agent

**Definition**: An agent category that directly implements code. Includes `backend-engineer`, `frontend-engineer`, `mobile-engineer`, and `game-engineer`. Execution agents are the builders of the system.

**Execution Agent Characteristics**:
- Directly creates deliverables
- Follows implementation plans
- Produces tangible outputs
- Subject to Reviewer validation
- Receives skills via HSOL injection

**Example**: `frontend-engineer` implements UI components and client-side logic, producing React components, styles, and interactions.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:132-139`

---

### T14: Validation Agent

**Definition**: An agent category that reviews, tests, and ensures quality. Includes `tester`, `reviewer`, `debugger`, `security-engineer`, `performance-engineer`, and `wiki-reviewer`. Validation agents enforce quality standards.

**Validation Agent Types**:
- **Testers** — Verify functionality works correctly
- **Reviewers** — Challenge implementation choices
- **Debuggers** — Investigate and fix issues
- **Security Engineers** — Audit for vulnerabilities
- **Performance Engineers** — Profile and optimize
- **Wiki Reviewers** — Validate documentation quality

**Example**: `security-engineer` audits code for vulnerabilities, checking for OWASP Top 10 issues, injection risks, and authentication weaknesses.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:142-149`

---

## Command Terms (T15-T17)

These terms govern how users invoke workflows and how the system routes requests.

### T15: Command

**Definition**: A slash-prefixed invocation that triggers a workflow. 14 commands exist including `/cook`, `/fix`, `/plan`, `/test`, `/review`, `/debug`, `/docs`, `/design`, `/deploy`, `/report`, `/wiki`, `/brainstorm`, `/ask`, `/code`. Commands are the primary interface between users and the system.

**Command Categories**:

| Category | Commands | Purpose |
|----------|----------|---------|
| Build | `/cook`, `/code` | Implementation |
| Quality | `/fix`, `/test`, `/review`, `/debug` | Validation |
| Planning | `/plan`, `/brainstorm`, `/design` | Strategy |
| Support | `/deploy`, `/docs`, `/wiki` | Operations |
| Information | `/ask`, `/report` | Inquiry |

**Command Syntax**: `/command:variant "parameter"`

**Example**: `/cook:hard "implement OAuth 2.0"` triggers the hard variant of the cook command with the specified parameter.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:152-161`

---

### T16: Router

**Definition**: The system component that maps user input to command workflows. Handles both explicit commands and natural language. The Router is the entry point that interprets user intent.

**Router Capabilities**:
- Parse explicit command syntax
- Map natural language to commands
- Detect variant specifications
- Validate command existence
- Route to appropriate workflow

**Natural Language Mapping Examples**:
- "implement dark mode" → `/cook`
- "fix this bug" → `/fix`
- "write tests" → `/test`
- "review my code" → `/review`

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:164-171`

---

### T17: Dispatch

**Definition**: The act of sending work to an agent. Dispatch can be direct (single agent) or distributed (multiple agents in parallel). Dispatch determines how work is allocated across available agents.

**Dispatch Types**:
- **Direct Dispatch** — Single agent receives task
- **Distributed Dispatch** — Multiple agents work in parallel
- **Sequential Dispatch** — Agents work one after another
- **Team Dispatch** — Golden Triangle receives task

**Example**: Orchestrator dispatches to `backend-engineer` for API implementation, providing requirements, constraints, and deliverable format specifications.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:174-181`

---

## Skill Terms (T18-T21)

These terms define how domain knowledge is organized, resolved, and injected into agent contexts.

### T18: Skill

**Definition**: A domain knowledge module that provides specialized capabilities to agents. Skills are resolved by agent profile and injected before execution. The system includes 1400+ skills organized across multiple domains.

**Skill Characteristics**:
- Domain-specific knowledge module
- Resolved based on agent profile
- Injected before execution
- Tracked in skill matrix
- Fitness scored for relevance

**Example**: `fastapi-expert` skill provides FastAPI patterns to backend agents, including async patterns, Pydantic validation, and OpenAPI generation.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:186-193`

---

### T19: Matrix

**Definition**: The pre-curated collection of skills in `~/.{TOOL}/skills/agent-assistant/matrix-skills/`. Matrix skills are trusted (fitness = 1.0) and fast to resolve. The matrix is the curated subset of skills that have been validated for production use.

**Matrix Structure**:
```
matrix-skills/
├── _index.yaml              — HSOL index, inheritance rules
├── _dynamic.yaml            — Dynamic skill governance
├── backend.yaml             — Backend skills
├── frontend.yaml            — Frontend skills
├── database.yaml            — Database skills
├── security.yaml            — Security skills
└── ...                      — Other domain skills
```

**Matrix vs Dynamic Skills**:
- Matrix skills have trust level 1.0 (validated)
- Dynamic skills have variable trust levels (new/evaluating/validated/promoted)
- Matrix skills resolve faster (no trust calculation)
- Dynamic skills undergo fitness calculation before use

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:196-203`

---

### T20: Profile

**Definition**: The declared domain and category of an agent, used to resolve relevant skills. Example: `profile: "backend:execution"`. Profiles enable precise skill matching between agents and available skills.

**Profile Syntax**: `{domain}:{category}`

**Profile Examples**:
- `backend:execution` — Backend implementation
- `backend:meta` — Backend coordination
- `frontend:execution` — Frontend implementation
- `database:architecture` — Database design
- `security:validation` — Security auditing

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:206-213`

---

### T21: Resolution

**Definition**: The process of determining which skills are relevant for a given agent profile and task context. Resolution matches agent profiles to skill domains and calculates priority scores.

**Resolution Algorithm**:
1. Parse agent profile (domain:category)
2. Scan matrix for matching domains
3. Calculate fitness scores for each match
4. Filter by fitness threshold (0.8)
5. Sort by priority score
6. Inject top skills within context limits

**Example**: Resolution scans matrix for skills matching `backend:execution` profile, finding `nodejs`, `python`, `databases`, `fastapi-expert`, and `docker` skills, then injecting the highest-priority ones.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:216-223`

---

## Platform Terms (T22-T25)

These terms define the AI coding tools that host Agent Assistant.

### T22: Platform

**Definition**: The AI coding tool where Agent Assistant operates. 7 supported platforms: Cursor, Claude Code, GitHub Copilot, Antigravity/Gemini, Codex, Kiro, Qwen. Each platform has distinct installation paths and capabilities.

**Platform Comparison**:

| Platform | Install Path | Subagent Support | Notes |
|----------|--------------|------------------|-------|
| Cursor | `~/.cursor/` | Yes | Primary platform |
| Claude Code | `~/.claude/` | Yes (when available) | Anthropic CLI |
| GitHub Copilot | `~/.copilot/` | Limited | Microsoft's tool |
| Antigravity | `~/.antigravity/` + `~/.gemini/` | Limited | Google's tool |
| Codex | `~/.codex/` | Variable | OpenAI's tool |
| Kiro | `~/.kiro/` | Yes | Kiro AI Editor |
| Qwen | `~/.qwen/` | Yes | Alibaba Qwen Code |

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:228-235`

---

### T23: Cursor

**Definition**: One of 7 supported platforms. Cursor IDE with Agent Assistant installed at `~/.cursor/`. Cursor is the primary platform with full feature support including sub-agent execution.

**Cursor Characteristics**:
- Primary platform for Agent Assistant
- Full TIER 1 sub-agent support
- Rich IDE integration
- Extensive MCP tool support
- Active development community

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:238-243`

---

### T24: Claude Code

**Definition**: One of 7 supported platforms. Anthropic's CLI tool with Agent Assistant installed at `~/.claude/`. Claude Code provides Anthropic's Claude models in a command-line interface.

**Claude Code Characteristics**:
- Anthropic's official CLI
- Strong reasoning capabilities
- Variable sub-agent support
- Markdown-first interaction
- Growing ecosystem

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:246-251`

---

### T25: Codex

**Definition**: One of 7 supported platforms. OpenAI's Codex with Agent Assistant installed at `~/.codex/`. Codex provides OpenAI's GPT models optimized for code generation.

**Codex Characteristics**:
- OpenAI's coding model
- Code-optimized generation
- Variable feature support
- Different capability profile than Claude
- Complementary to other platforms

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:254-259`

---

### T26: Kiro

**Definition**: One of 7 supported platforms. Kiro AI Editor with Agent Assistant installed at `~/.kiro/`. Kiro provides a modern AI-powered code editor with JSON agent configurations.

**Kiro Characteristics**:
- Modern AI code editor
- JSON-based agent configurations
- file:// URI prompt references
- Rich agent and tool support
- Custom MCP server integration

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:262-269`

---

### T27: Qwen

**Definition**: One of 7 supported platforms. Alibaba Qwen Code CLI with Agent Assistant installed at `~/.qwen/`. Qwen Code provides Alibaba's Qwen3-Coder models for terminal-based coding assistance.

**Qwen Characteristics**:
- Alibaba's official coding CLI
- Qwen3-Coder models
- Markdown agent definitions with YAML frontmatter
- Cross-platform skills support
- Growing Chinese AI ecosystem

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:270-277`

---

## Workflow Terms (T28-T35)

These terms define how work flows through the system from request to delivery.

### T28: Workflow

**Definition**: A defined sequence of phases that accomplish a specific goal. 20 workflows catalogued including `/cook`, `/test`, `/review`, `/wiki`. Workflows provide structured execution paths for different task types.

**Workflow Characteristics**:
- Defined phase sequence
- Entry criteria for each phase
- Exit criteria for each phase
- Deliverable production
- Quality gates between phases

**Example**: `/cook:hard` workflow has 6 phases: Requirements → Planning → Implementation → Review → Testing → Delivery.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:263-271`

---

### T29: Actor

**Definition**: An entity that interacts with the Agent Assistant system. 16 actors including end users, orchestrator, agents, and support systems. Actors represent all entities that participate in system operations.

**Actor Categories**:

| Category | Actors | Description |
|----------|--------|-------------|
| Human | End users, developers, operators | Human participants |
| Orchestration | Orchestrator, router | System coordination |
| Execution | 21 specialist agents | Work performers |
| Support | CLI, installer, platform config | Infrastructure |

**Example**: `A5: Backend Engineer` is an execution actor responsible for server-side implementation.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:274-281`

---

### T30: SLA

**Definition**: Service Level Agreement defining expected timing and quality for workflows. Includes response time, completion time, and success rate targets. SLAs establish performance expectations.

**SLA Metrics**:

| Variant | Response Time | Completion Time | Success Rate |
|---------|---------------|-----------------|-------------|
| `:fast` | < 5s | < 30s | 99% |
| `:hard` | < 15s | < 5min | 99.5% |
| `:team` | < 30s | < 15min | 99.9% |

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:284-291`

---

### T31: Mailbox

**Definition**: The append-only communication log for Golden Triangle team phases. Located at `./.reports/{topic}/MAILBOX-{date}.md`. The Mailbox enables asynchronous team collaboration.

**Mailbox Functions**:
- Record task assignments
- Log submission exchanges
- Document review feedback
- Track debate rounds
- Store final approvals

**Mailbox Entry Types**:
- `TASK_ASSIGNMENT` — Initial task distribution
- `SUBMISSION` — Work submission to Reviewer
- `REVIEW` — Reviewer feedback (PASS/FAIL)
- `DEFENSE` — Executor response to feedback
- `ESCALATION` — Dispute escalation to Tech Lead
- `APPROVAL` — Final sign-off

**Example**: Executor posts SUBMISSION to Mailbox; Reviewer posts REVIEW (PASS/FAIL) in response.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:294-301`

---

## Delivery Terms (T32-T33)

These terms define how outputs are produced and approved.

### T32: Deliverable

**Definition**: The output produced by an agent or phase. Must follow defined format and include evidence of requirements fulfillment. Deliverables are the tangible products of system work.

**Deliverable Requirements**:
- Follow defined format (single or chunked)
- Include evidence of requirements fulfillment
- Meet quality standards
- Pass all exit criteria
- Document changes clearly

**Example**: `backend-engineer` produces `API_ENDPOINT.md` deliverable documenting the API implementation with usage examples, error handling, and test coverage.

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:306-313`

---

### T33: Consensus Stamp

**Definition**: The formal indicator that Golden Triangle team members have agreed on output. Format: `✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓`. Output is released only with consensus stamp present.

**Consensus Stamp Requirements**:
- All three roles must sign off
- Tech Lead provides final approval
- Executor confirms deliverable completeness
- Reviewer validates quality
- Stamp must be present before release

**Example**:
```
✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓
```

**Source**: `.documents/business/business-glossary/01-canonical-terms.md:316-323`

---

## Deprecated Terms and Migrations

The following terms are deprecated and should not be used in new documentation. Each entry includes migration guidance.

### D1: "Agentic" (DEPRECATED)

**Status**: Deprecated
**Replacement**: "Orchestrated" or "Agent-coordinated"

**Rationale**: "Agentic" is an overused marketing term lacking precise meaning.

**Migration**:
```markdown
# Before (deprecated)
"This is an agentic workflow."

# After (correct)
"This is an orchestrated workflow."
```

**Source**: `.documents/business/business-glossary/02-synonyms-and-deprecated-terms.md:92-110`

---

### D2: "Sub-Agent" (DEPRECATED in some contexts)

**Status**: Deprecated in favor of "TIER 1 agent"

**Replacement**: "TIER 1 agent" or "isolated agent"

**Rationale**: "Sub-agent" implies hierarchy; TIER 1 is about execution isolation.

**Migration**:
```markdown
# Before (deprecated)
"Use sub-agent for delegation."

# After (correct)
"Use TIER 1 (sub-agent) for delegation."
```

**Source**: `.documents/business/business-glossary/02-synonyms-and-deprecated-terms.md:112-130`

---

### D3: "Task" (Context-dependent)

**Status**: Deprecated in favor of specific terms

**Replacements**:
- Work item: "task" → "deliverable"
- Unit of work: "task" → "assignment"
- To-do item: "task" → "work item"

**Rationale**: "Task" is too generic; specific terms convey intent.

**Source**: `.documents/business/business-glossary/02-synonyms-and-deprecated-terms.md:133-154`

---

### D4: "Team Lead" (DEPRECATED)

**Status**: Deprecated
**Replacement**: "Tech Lead"

**Rationale**: "Team Lead" implies management; "Tech Lead" is technically precise.

**Migration**:
```markdown
# Before (deprecated)
"The team lead coordinates the work."

# After (correct)
"The Tech Lead coordinates the work."
```

**Source**: `.documents/business/business-glossary/02-synonyms-and-deprecated-terms.md:157-174`

---

### D5: "Worker" (DEPRECATED)

**Status**: Deprecated
**Replacement**: "Agent" or "Executor"

**Rationale**: "Worker" is too generic; agent conveys specialization.

**Source**: `.documents/business/business-glossary/02-synonyms-and-deprecated-terms.md:177-194`

---

### D6: "Slot" (DEPRECATED in skill context)

**Status**: Deprecated
**Replacement**: "Profile" or "Skill Profile"

**Rationale**: "Slot" was used in early HSOL drafts; replaced with "Profile".

**Migration**:
```markdown
# Before (deprecated)
"The agent declares its slot."

# After (correct)
"The agent declares its profile."
```

**Source**: `.documents/business/business-glossary/02-synonyms-and-deprecated-terms.md:197-214`

---

### D7: "Master Prompt" (DEPRECATED)

**Status**: Deprecated
**Replacement**: "Orchestration Rules" or "CORE rules"

**Rationale**: "Master Prompt" implies single instruction; Agent Assistant uses modular rules.

**Migration**:
```markdown
# Before (deprecated)
"Load the master prompt first."

# After (correct)
"Load CORE.md first — the single source of truth."
```

**Source**: `.documents/business/business-glossary/02-synonyms-and-deprecated-terms.md:217-234`

---

### D8: "Fast Path" (DEPRECATED)

**Status**: Deprecated
**Replacement**: ":fast variant"

**Rationale**: "Fast path" implies optimization; variant syntax is more precise.

**Migration**:
```markdown
# Before (deprecated)
"Use the fast path for simple tasks."

# After (correct)
"Use the :fast variant for simple tasks."
```

**Source**: `.documents/business/business-glossary/02-synonyms-and-deprecated-terms.md:237-254`

---

## Synonym Reference

The following table maps canonical terms to their accepted synonyms and deprecated alternatives.

### Orchestration Synonyms

| Canonical Term | Synonyms | Deprecated |
|----------------|----------|------------|
| Orchestrator | Coordinator, Controller, Director | — |
| Tier | Execution Tier, Tier Level | — |
| Phase | Stage, Step | — |
| Variant | Mode, Modifier, Suffix | "Fast path" |
| Handoff | Transfer, Delegation, Hand-off | — |
| Consensus | Agreement, Alignment | — |

### Agent Synonyms

| Canonical Term | Synonyms | Deprecated |
|----------------|----------|------------|
| Agent | Specialist, Worker | "Worker" |
| Executor | Builder, Implementer, Developer | — |
| Reviewer | Critic, Validator, Quality Gate | — |
| Tech Lead | Lead, Coordinator, Arbiter | "Team Lead" |
| Team | Triangle, Squad | — |
| Meta Agent | Coordinator, Planner-type | — |
| Execution Agent | Builder Agent, Impl Agent | — |
| Validation Agent | QA Agent, Checker | — |

### Command Synonyms

| Canonical Term | Synonyms | Deprecated |
|----------------|----------|------------|
| Command | Slash Command, Directive | — |
| Router | Router System, Command Router | — |
| Dispatch | Spawn, Invoke, Send | — |

### Skill Synonyms

| Canonical Term | Synonyms | Deprecated |
|----------------|----------|------------|
| Skill | Capability, Expertise, Domain Module | — |
| Matrix | Skill Matrix, Matrix Registry | — |
| Profile | Agent Profile, Skill Profile | "Slot" |
| Resolution | Skill Resolution, Skill Matching | — |

### Platform Synonyms

| Canonical Term | Synonyms | Deprecated |
|----------------|----------|------------|
| Platform | AI Tool, IDE, Coding Assistant | — |
| Cursor | Cursor IDE, Cursor AI | — |
| Claude Code | Claude, Anthropic Code | — |
| Codex | OpenAI Codex, Codex CLI | — |

### Workflow Synonyms

| Canonical Term | Synonyms | Deprecated |
|----------------|----------|------------|
| Workflow | Process, Pipeline, Flow | — |
| Actor | Participant, Stakeholder | — |
| SLA | Service Level, Performance Target | — |
| Mailbox | Communication Log, Message Log | — |

### Delivery Synonyms

| Canonical Term | Synonyms | Deprecated |
|----------------|----------|------------|
| Deliverable | Output, Artifact, Result | — |
| Consensus Stamp | Approval Stamp, Sign-off | — |

---

## Event Types

The system emits events to track operations and enable observability. Events follow a consistent structure with timestamps, payloads, and flow indicators.

### EV1: agent_dispatch

**Definition**: Event fired when Orchestrator delegates work to an agent.

**Payload Fields**:
| Field | Type | Description |
|-------|------|-------------|
| event | string | "agent_dispatch" |
| timestamp | ISO8601 | When dispatched |
| orchestrator | string | Orchestrator session ID |
| targetAgent | string | Agent ID dispatched to |
| tier | enum | TIER_1, TIER_2 |
| task | string | Task description |
| requirements | string[] | Applicable requirements |
| deliverableFormat | enum | single, chunked |

**Flow**: Orchestrator → Agent

**Source**: `.documents/business/business-glossary/03-domain-entities-and-events.md:178-197`

---

### EV2: skill_injection

**Definition**: Event fired when skills are loaded into agent context.

**Payload Fields**:
| Field | Type | Description |
|-------|------|-------------|
| event | string | "skill_injection" |
| timestamp | ISO8601 | When injected |
| agent | string | Agent ID receiving skills |
| skills | string[] | Skill IDs injected |
| source | enum | matrix, dynamic |
| fitness | number | Average fitness score |
| count | number | Number of skills injected |

**Flow**: HSOL → Agent

**Source**: `.documents/business/business-glossary/03-domain-entities-and-events.md:200-218`

---

### EV3: phase_complete

**Definition**: Event fired when a phase finishes execution.

**Payload Fields**:
| Field | Type | Description |
|-------|------|-------------|
| event | string | "phase_complete" |
| timestamp | ISO8601 | When completed |
| workflow | string | Workflow name |
| phase | number | Phase number (1-indexed) |
| phaseName | string | Phase name |
| status | enum | success, partial, failed |
| exitCriteria | CriteriaResult[] | Exit criteria results |
| duration | number | Phase duration in ms |
| deliverable | string | Deliverable path if any |

**Flow**: Phase → Orchestrator

**Source**: `.documents/business/business-glossary/03-domain-entities-and-events.md:221-241`

---

### EV4: command_invoke

**Definition**: Event fired when a user invokes a command.

**Payload Fields**:
| Field | Type | Description |
|-------|------|-------------|
| event | string | "command_invoke" |
| timestamp | ISO8601 | When invoked |
| userId | string | User identifier |
| command | string | Command name |
| variant | string | Variant if specified |
| input | string | User input |
| platform | enum | Platform used |
| routing | enum | explicit, natural_language |

**Flow**: User → Router → Orchestrator

**Source**: `.documents/business/business-glossary/03-domain-entities-and-events.md:244-263`

---

### EV5: team_consensus

**Definition**: Event fired when Golden Triangle reaches consensus.

**Payload Fields**:
| Field | Type | Description |
|-------|------|-------------|
| event | string | "team_consensus" |
| timestamp | ISO8601 | When consensus reached |
| team | string | Team ID |
| round | number | Debate round (1-3) |
| techLeadSign | boolean | Tech Lead sign-off |
| executorSign | boolean | Executor sign-off |
| reviewerSign | boolean | Reviewer sign-off |
| stamp | string | Full consensus stamp |
| deliverable | string | Approved deliverable path |

**Flow**: Tech Lead → Orchestrator

**Source**: `.documents/business/business-glossary/03-domain-entities-and-events.md:266-286`

---

## Domain-to-Code Mapping

This section maps domain terminology to actual file locations and API structures in the codebase.

### Tool Mapping

#### T1: runSubagent Tool

**Platform**: Cursor, Claude Code (when available)
**Domain Term**: TIER 1 execution, Agent dispatch

```typescript
runSubagent(
  agentName: string,    // Domain term: Agent ID
  context: {
    requirements: string,
    task: string,
    constraints: string[],
    deliverableFormat: 'single' | 'chunked',
    skills?: string[]
  }
) → {
  output: string,
  deliverablePath?: string,
  status: 'complete' | 'partial' | 'blocked'
}
```

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:10-41`

#### T2: Read Tool

**Platform**: All platforms
**Domain Term**: Deliverable retrieval, Prior constraint access

```typescript
Read(
  path: string,           // Domain term: Deliverable path
  limit?: number,         // For chunked files
  offset?: number
) → string
```

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:44-66`

#### T3: Write Tool

**Platform**: All platforms
**Domain Term**: Deliverable creation, Output production

```typescript
Write(
  contents: string,
  path: string            // Domain term: Deliverable path
) → void
```

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:69-91`

---

### File Path Mapping

#### F1: rules/AGENTS.md

**Domain Terms**: Agent categories, Agent profiles, Task mapping, Context isolation

**Key Sections**:
```markdown
## AGENT CATEGORIES           → Domain: Meta Agent, Execution Agent, etc.
## TASK → AGENT MAPPING       → Domain: Agent selection rules
## CONTEXT ISOLATION          → Domain: Handoff constraints
## RECURSIVE DELEGATION       → Domain: Meta agent rules
```

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:94-115`

#### F2: matrix-skills/

**Domain Terms**: HSOL Matrix, Skill resolution, Skill injection

**Directory Structure**:
```
matrix-skills/
├── _index.yaml              → Domain: HSOL index, inheritance rules
├── _dynamic.yaml            → Domain: Dynamic skill governance
├── backend.yaml             → Domain: Backend skills
├── frontend.yaml            → Domain: Frontend skills
├── database.yaml            → Domain: Database skills
└── security.yaml            → Domain: Security skills
```

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:118-169`

#### F3: commands/

**Domain Terms**: Command routing, Variant dispatch, Workflow triggers

**Directory Structure**:
```
commands/
├── cook.md                  → Domain: /cook command
├── cook/
│   ├── fast.md             → Domain: :fast variant
│   ├── hard.md             → Domain: :hard variant
│   └── team.md             → Domain: :team variant
├── fix.md
├── plan.md
├── test.md
├── review.md
├── debug.md
├── docs.md
├── design.md
├── deploy.md
├── report.md
├── wiki.md
├── wiki/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── brainstorm.md
├── ask.md
└── code.md
```

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:172-215`

#### F4: agents/teams/

**Domain Terms**: Golden Triangle, Team configuration, Team roles

**Directory Structure**:
```
agents/teams/{team-name}/
├── techlead.md    → Domain: Tech Lead role definition
├── executor.md    → Domain: Executor role definition
└── reviewer.md    → Domain: Reviewer role definition
```

**Example: backend-team/**

```markdown
# techlead.md
## Role: Tech Lead (backend-team)
## Directive: Coordinate backend implementation
## Protocol: Decompose → Coordinate → Arbitrate

# executor.md  
## Role: Executor (backend-team)
## Directive: Implement backend features
## Protocol: Build → Defend → Deliver

# reviewer.md
## Role: Reviewer (backend-team)
## Directive: Quality gate for backend
## Protocol: Challenge → Validate → FAIL/PASS
```

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:218-249`

#### F5: agents/{agent-id}.md

**Domain Terms**: Agent entity, Agent capabilities, Agent profile

**File Structure**:
```markdown
# Backend Engineer

## IDENTITY
backend-engineer

## PROFILE
profile: "backend:execution"

## CAPABILITIES
- REST APIs
- GraphQL
- Microservices
- Security

## CONSTRAINTS
- Never implement frontend
- Always use parameterized queries
- Follow API conventions
```

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:252-279`

---

### Data Structure Mapping

#### D1: Requirements Registry

**Domain Term**: Requirements intake, L2 Requirement Integrity

```markdown
### 📋 Requirements Registry
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| R1 | {extracted} | H/M/L | ⏳ |
| R2 | {extracted} | H/M/L | ✅ |
```

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:282-298`

#### D2: Shared Task List

**Domain Term**: Team task management, Phase assignment

```markdown
## 📋 Shared Task List — {Phase Name}
| ID | Task | Assigned To | Status | Priority | Round |
|----|------|-------------|--------|----------|-------|
| T1 | {task} | executor | ⏳ | H | 1 |
```

**Status Icons**:
| Icon | Domain Term |
|------|-------------|
| ⏳ | Pending |
| 🔄 | In Progress |
| ✅ | Complete + Approved |
| ❌ | Blocked |
| 🔁 | Revision Needed |

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:301-323`

#### D3: Mailbox Entry

**Domain Term**: Team communication, Debate exchange

```markdown
## Exchange #{n}
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `executor` | `reviewer` | SUBMISSION | {time} |

**Content:**
[Submission description]

---

## Exchange #{n+1}
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `reviewer` | `executor` | REVIEW | {time} |

**Status:** ❌ FAIL
**Findings:**
- [Issue 1: severity HIGH — description]
```

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:326-355`

#### D4: Phase Output Format

**Domain Term**: Phase completion, Deliverable format

```markdown
## 🎭 Phase {N}: {name}

### Sub-agent: `{agent}` — {role}     ← TIER 1
### Embodying: `{agent}` — {role}     ← TIER 2

{agent work summary}

### Exit Criteria
- [x] {criterion_1}
- [x] {criterion_2}

### ✅ `{agent}` complete
**Deliverable**: {summary}
```

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:358-380`

#### D5: Consensus Stamp

**Domain Term**: Team consensus, Output approval

```markdown
✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓
```

**Required for**: All :team variant output releases

**Source**: `.documents/business/business-glossary/04-api-term-mapping.md:383-395`

---

## Term Index

| ID | Term | Category | Page Reference |
|----|------|----------|----------------|
| T1 | Orchestrator | Orchestration | Above |
| T2 | Tier | Orchestration | Above |
| T3 | Phase | Orchestration | Above |
| T4 | Variant | Orchestration | Above |
| T5 | Handoff | Orchestration | Above |
| T6 | Consensus | Orchestration | Above |
| T7 | Agent | Agent | Above |
| T8 | Executor | Agent | Above |
| T9 | Reviewer | Agent | Above |
| T10 | Tech Lead | Agent | Above |
| T11 | Team | Agent | Above |
| T12 | Meta Agent | Agent | Above |
| T13 | Execution Agent | Agent | Above |
| T14 | Validation Agent | Agent | Above |
| T15 | Command | Command | Above |
| T16 | Router | Command | Above |
| T17 | Dispatch | Command | Above |
| T18 | Skill | Skill | Above |
| T19 | Matrix | Skill | Above |
| T20 | Profile | Skill | Above |
| T21 | Resolution | Skill | Above |
| T22 | Platform | Platform | Above |
| T23 | Cursor | Platform | Above |
| T24 | Claude Code | Platform | Above |
| T25 | Codex | Platform | Above |
| T26 | Workflow | Workflow | Above |
| T27 | Actor | Workflow | Above |
| T28 | SLA | Workflow | Above |
| T29 | Mailbox | Workflow | Above |
| T30 | Deliverable | Delivery | Above |
| T31 | Consensus Stamp | Delivery | Above |

---

## Evidence Sources

All terminology definitions are traced to authoritative source documents:

- `.documents/business/business-glossary/01-canonical-terms.md` — Orchestration, Agent, Command, Skill, Platform, Workflow, Delivery terms (T1-T31)
- `.documents/business/business-glossary/02-synonyms-and-deprecated-terms.md` — Synonyms, deprecated terms, migration guidance (D1-D8)
- `.documents/business/business-glossary/03-domain-entities-and-events.md` — Entity types (E1-E7), Event types (EV1-EV5)
- `.documents/business/business-glossary/04-api-term-mapping.md` — Tool mapping (T1-T3), File mapping (F1-F5), Data structures (D1-D5)

---

## Related Pages

- [[Agent System]] — 21 specialist agents and their capabilities
- [[Command System]] — 14 commands and routing mechanisms
- [[Team System]] — 18 Golden Triangle team configurations
- [[Skill System]] — 1400+ skills and HSOL resolution
- [[Golden Triangle]] — Three-role collaboration pattern
- [[Tiered Orchestration]] — 5-layer architecture pattern
- [[Command Routing]] — Command to workflow mapping
- [[Entity Relationships]] — How entities interact
