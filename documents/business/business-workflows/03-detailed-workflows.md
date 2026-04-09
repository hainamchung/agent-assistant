# Detailed Workflows

> **Purpose**: Step-by-step workflow flows with decision points for primary workflows.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## BW-001: Feature Build (`/cook`) — Detailed Flow

### :hard Variant (Default)

```
Developer → "/cook implement OAuth 2.0"
    │
    ▼
Orchestrator: Route → /cook:hard
    │
    ▼
Phase 1: RECONNAISSANCE (scouter)
    ├── Scan codebase for relevant patterns
    ├── Identify existing auth infrastructure
    ├── Build evidence-backed intelligence report
    └── Exit: Evidence report with file references
    │
    ▼
Phase 2: PLANNING (planner)
    ├── Decompose feature into implementation tasks
    ├── Assign tasks to agents with file scopes
    ├── Define acceptance criteria per task
    └── Exit: Task plan with agent assignments
    │
    ▼
Phase 3: IMPLEMENTATION (backend-engineer / frontend-engineer)
    ├── Implement tasks per plan
    ├── Follow coding standards from knowledge-standards/
    ├── Apply guardrails (injection-defense, auth-patterns)
    └── Exit: Working code matching acceptance criteria
    │
    ▼
Phase 4: REVIEW (reviewer) [SUB-AGENT]
    ├── Independent code review (5-dimension evaluation)
    ├── Security check (D4)
    ├── Pass/Fail with findings
    └── Exit: Review report with stamp
    │
    ▼
Phase 5: DELIVERY
    ├── Synthesize deliverable to developer
    └── Report: implementation files + review stamp
```

### Decision Points (BW-001)

| Decision | Condition | Path A | Path B |
|----------|-----------|--------|--------|
| Variant selection | User specifies :fast / :team | Route to variant | Default :hard |
| Agent assignment | Task is frontend vs backend | frontend-engineer | backend-engineer |
| Review outcome | Review fails | Return to Phase 3 for fixes | Proceed to delivery |
| D4 security finding | Critical security issue found | Block delivery, escalate | Continue normal flow |

---

## BW-002: Bug Fix (`/fix`) — Detailed Flow

### :hard Variant (Default)

```
Developer → "/fix payment fails on Safari"
    │
    ▼
Orchestrator: Route → /fix:hard
    │
    ▼
Phase 1: RECONNAISSANCE (scouter)
    ├── Locate payment-related files
    ├── Identify browser-specific code
    ├── Map error patterns
    └── Exit: Intelligence report
    │
    ▼
Phase 2: INVESTIGATION (debugger)
    ├── Analyze error conditions
    ├── Identify root cause
    ├── Propose fix strategy
    └── Exit: Root cause analysis + fix proposal
    │
    ▼
Phase 3: IMPLEMENTATION (backend-engineer / frontend-engineer)
    ├── Apply fix per proposal
    ├── Ensure non-regression
    └── Exit: Fixed code
    │
    ▼
Phase 4: VALIDATION (tester) [SUB-AGENT]
    ├── Write regression tests
    ├── Verify fix on target conditions
    └── Exit: Test results
    │
    ▼
Phase 5: REVIEW (reviewer) [SUB-AGENT]
    ├── Verify fix quality
    ├── Check non-regression
    └── Exit: Review stamp
```

---

## BW-005: Documentation (`/docs:business`) — Detailed Flow

```
Developer → "/docs:business"
    │
    ▼
Orchestrator: Route → /docs:business
    │
    ▼
Phase 1: RECONNAISSANCE (scouter)
    ├── Detect business docs state (CREATE/UPDATE/MIGRATE per folder)
    ├── Scan business signals (README, APIs, domain models, features)
    ├── Extract stakeholders, features, workflows, terms
    └── Exit: Business Intelligence Report
    │
    ▼
Phase 2: STRUCTURING (business-analyst)
    ├── Apply INVEST to requirements
    ├── Apply MoSCoW to features
    ├── Canonicalize workflows and glossary
    ├── Build traceability matrix
    └── Exit: Structured Business Pack
    │
    ▼
Phase 3: GENERATION (docs-manager)
    ├── Create 4 business folders with sub-files
    ├── Apply Thinking Protocol per sub-file
    ├── Include Evidence Sources in every file
    └── Exit: 22 files across 4 folders
    │
    ▼
Phase 4: QUALITY REVIEW (project-manager)
    ├── Cross-folder consistency check
    ├── ID traceability verification
    ├── Contradiction detection
    └── Exit: Consistency matrix with pass/fail
```

---

## BW-008: Framework Install — Detailed Flow

```
Developer → "agent-assistant install cursor"
    │
    ▼
CLI: Parse arguments
    │
    ├── Tool specified → proceed
    └── No tool → interactive menu
    │
    ▼
Platform installer (e.g., installCursor)
    ├── Determine target directory (~/.cursor/skills/agent-assistant/)
    ├── Copy: agents/, commands/, rules/, skills/, guardrails/, topologies/, etc.
    ├── Generate platform-specific entry point
    └── Sync filesystem
    │
    ▼
Verification phase
    ├── Count files written vs expected
    ├── Report success/failure
    └── Print summary with statistics
```

---

## BW-010: Orchestrated Execution — Meta Flow

This is the universal execution pattern that all command workflows follow:

```
1. RECEIVE: User input (explicit command or natural language)
2. ROUTE: Match to command + variant (NL tiebreaker → /cook)
3. LOAD: RUNTIME.md tier + command workflow file
4. For EACH phase in workflow:
   a. DETERMINE mode: EMBODY (shared context) or SUB-AGENT (isolated)
   b. DELEGATE to specialist agent
   c. EXECUTE: Agent follows its directive + protocol + constraints
   d. VERIFY: Exit criteria met
   e. WRITE: Deliverable file if required
   f. PROCEED: Next phase
5. SYNTHESIZE: Compile deliverables into final response
6. DELIVER: Present to developer
```

### Error Handling in Meta Flow

| Error Type | Response |
|------------|----------|
| Ambiguous input | Pause, ask for clarification |
| Agent fails exit criteria | Retry or escalate |
| D4 security finding | Block and escalate |
| Model context exhausted | Context decay protocol (soft/hard refresh) |
| Workflow interrupted | Checkpoint saved for resume |

## Evidence Sources

- [commands/cook.md](../../../commands/cook.md) — Feature build router
- [commands/fix.md](../../../commands/fix.md) — Bug fix router
- [commands/docs/business.md](../../../commands/docs/business.md) — Business docs workflow
- [cli/install.js](../../../cli/install.js) — CLI install flow
- [rules/RUNTIME.md](../../../rules/RUNTIME.md) — Meta execution model
