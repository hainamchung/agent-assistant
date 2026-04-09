# 📚 REFERENCE

> **VERSION**: 2.0 | **LOAD**: Quick lookup | **PURPOSE**: Fast lookup tables for commands, agents, paths

---

## COMMAND TABLE

| Command | Router | Variants |
|---------|--------|----------|
| `/cook` | `cook.md` | `fast`, `hard`, `team` |
| `/fix` | `fix.md` | `fast`, `hard`, `team` |
| `/plan` | `plan.md` | `fast`, `hard`, `team` |
| `/debug` | `debug.md` | `fast`, `hard`, `team` |
| `/test` | `test.md` | `fast`, `hard`, `team` |
| `/review` | `review.md` | `fast`, `hard`, `team` |
| `/docs` | `docs.md` | `core`, `business`, `audit` |
| `/design` | `design.md` | `fast`, `hard`, `team` |
| `/deploy` | `deploy.md` | `check`, `preview`, `production`, `rollback` |
| `/report` | `report.md` | `fast`, `hard`, `team` |
| `/brainstorm` | `brainstorm.md` | `fast`, `hard`, `team` |
| `/ask` | `ask.md` | `fast`, `hard` |
| `/code` | `code.md` | `fast`, `hard`, `team` |
| `/auto` | `auto.md` | — |
| `/quick` | `quick.md` | `fix`, `code`, `review` |
| `/help` | `help.md` | `overview`, `command`, `agents` |

---

## AGENT TABLE

| Agent | Category | Primary Tasks | Execution Mode |
|-------|----------|---------------|:--------------:|
| `tech-lead` | meta | Architecture, orchestration | EMBODY |
| `planner` | meta | Task breakdown, roadmap | EMBODY |
| `backend-engineer` | execution | APIs, services, logic | EMBODY |
| `frontend-engineer` | execution | UI, components, styling | EMBODY |
| `database-architect` | execution | Schema, queries, migrations | EMBODY |
| `mobile-engineer` | execution | iOS, Android, React Native | EMBODY |
| `game-engineer` | execution | Game logic, Unity, Unreal | EMBODY |
| `debugger` | investigation | Bug investigation | EMBODY |
| `performance-engineer` | investigation | Profiling, optimization | EMBODY |
| `tester` | validation | Unit, integration, E2E tests | SUB-AGENT |
| `reviewer` | validation | Code review, PR feedback | SUB-AGENT |
| `security-engineer` | validation | Security audit, pentesting | SUB-AGENT |
| `researcher` | research | External research | SUB-AGENT |
| `scouter` | research | Codebase analysis | SUB-AGENT |
| `brainstormer` | research | Ideas, requirements | SUB-AGENT |
| `designer` | research | UI/UX design | SUB-AGENT |
| `docs-manager` | support | Documentation | EMBODY |
| `devops-engineer` | support | CI/CD, deployment | EMBODY |
| `business-analyst` | support | Business requirements | EMBODY |
| `project-manager` | support | Project coordination | EMBODY |
| `reporter` | support | Reports, summaries | EMBODY |

### Task → Agent Mapping

| Task | Agent |
|------|-------|
| API, backend logic | `backend-engineer` |
| UI, components | `frontend-engineer` |
| Database schema | `database-architect` |
| Security | `security-engineer` |
| Testing | `tester` |
| Code review | `reviewer` |
| Debugging | `debugger` |
| Planning | `planner` |
| Research | `researcher` |
| Codebase analysis | `scouter` |
| Documentation | `docs-manager` |
| Deployment | `devops-engineer` |
| Reports | `reporter` |
| Design | `designer` |
| Brainstorming | `brainstormer` |
| Game development | `game-engineer` |
| Mobile development | `mobile-engineer` |
| Technical leadership | `tech-lead` |
| Business requirements | `business-analyst` |
| Project coordination | `project-manager` |
| Performance profiling | `performance-engineer` |

---

## AGENT FIELD REFERENCE

### voice

Controls how agents adapt their communication style.

| Field | Type | Values | Description |
|-------|------|--------|-------------|
| `voice.adaptation` | boolean | `true` / `false` | Whether agent adapts tone to task context |
| `voice.deviation_tolerance` | integer | `0` or `1` | `0` = strict adherence to personality, `1` = minor adaptation allowed |

**Usage**: Voice settings interact with `personality:` fields. An agent with `adaptation: true` and `deviation_tolerance: 1` will adjust tone (e.g., more formal for security audits, more casual for brainstorming) while staying within personality bounds.

### liaison

Marks agents that connect to external systems beyond the codebase.

| Field | Type | Description |
|-------|------|-------------|
| `liaison` | boolean | `true` if agent interfaces with external systems |
| `liaison_targets` | array | Systems this agent connects to |

**Valid targets**: `human` (user interaction), `ticketing` (Jira, Linear), `ci` (CI/CD pipelines), `monitoring` (Datadog, Grafana), `source-control` (GitHub, GitLab)

**Protocol**: When `liaison: true`, load `rules/LIAISON-PROTOCOL.md` for the full external communication protocol. Liaison agents may produce outputs formatted for external systems (e.g., Jira tickets, PR descriptions).

### priority

Elevates agent invocation priority for safety-critical roles.

| Value | Meaning |
|-------|---------|
| `critical` | Agent takes precedence in conflict resolution; findings block deployment |

Currently assigned to: `security-engineer` only.

---

## NATURAL LANGUAGE DETECTION

| User Says | Detect As |
|-----------|-----------|
| implement, build, create, add | `/cook` |
| fix, bug, error, broken | `/fix` |
| plan, how should, strategy | `/plan` |
| debug, investigate, why | `/debug` |
| test, coverage | `/test` |
| review, PR, check code | `/review` |
| document, readme | `/docs` |
| design, UI, UX | `/design` |
| deploy, release | `/deploy` |
| report, status, summary | `/report` |

---

## DELIVERABLE PATHS

### Single File (≤ 150 lines, < 4 sections)

```yaml
brainstormer:         ./reports/{topic}/brainstorms/BRAINSTORM-{feature}.md
researcher:           ./reports/{topic}/researchers/RESEARCH-{feature}.md
scouter:              ./reports/{topic}/scouts/SCOUT-{feature}.md
designer:             ./reports/{topic}/designs/DESIGN-{feature}.md
planner:              ./reports/{topic}/plans/PLAN-{feature}.md
reporter:             ./reports/{topic}/general/REPORT-{type}-{date}.md
debugger:             ./reports/{topic}/debugs/DEBUG-{issue}.md
tester:               ./reports/{topic}/tests/TEST-{feature}.md
business-analyst:     ./reports/{topic}/requirements/REQ-{feature}.md
performance-engineer: ./reports/{topic}/performance/PERF-{component}.md
reviewer:             ./reports/{topic}/reviews/REVIEW-REPORT-{subject}.md
security-engineer:    ./reports/{topic}/security/SECURITY-{subject}.md
tech-lead:            ./reports/{topic}/decisions/DECISION-{subject}.md
devops-engineer:      ./reports/{topic}/deployments/DEPLOY-{subject}.md
```

### Chunked Folder (> 150 lines OR ≥ 4 sections)

```yaml
brainstormer:         ./reports/{topic}/brainstorms/{feature}/00-index.md + sections
researcher:           ./reports/{topic}/researchers/{feature}/00-index.md + sections
scouter:              ./reports/{topic}/scouts/{feature}/00-index.md + sections
designer:             ./reports/{topic}/designs/{feature}/00-index.md + sections
planner:              ./reports/{topic}/plans/{feature}/00-index.md + sections
reporter:             ./reports/{topic}/general/{type}-{date}/00-index.md + sections
debugger:             ./reports/{topic}/debugs/{issue}/00-index.md + sections
tester:               ./reports/{topic}/tests/{feature}/00-index.md + sections
business-analyst:     ./reports/{topic}/requirements/{feature}/00-index.md + sections
performance-engineer: ./reports/{topic}/performance/{component}/00-index.md + sections
```

> **Rule**: Create `00-index.md` FIRST, then section files SEQUENTIALLY. See `RUNTIME.md > DELIVERABLE SIZE MANAGEMENT`.

---

## DOCUMENTATION PATHS (from /docs:core v2.0 — folder-based)

```yaml
# Each knowledge area is now a FOLDER with 00-index.md + sub-files
overview:     ./documents/knowledge-overview/00-index.md       # + 01~04 sub-files
architecture: ./documents/knowledge-architecture/00-index.md   # + 01~05 sub-files
domain:       ./documents/knowledge-domain/00-index.md         # + 01~04 sub-files
source-base:  ./documents/knowledge-source-base/00-index.md    # + 01~04 sub-files
standards:    ./documents/knowledge-standards/00-index.md       # + 01~04 sub-files

# To get full context: read 00-index.md first, then load specific sub-files
# To get quick overview: read only 00-index.md files
```

---

## RULES FILES

### Rules Map (by functional group)

| Group | Files | Load When |
|-------|-------|-----------|
| **Core** | `RUNTIME.md`, `REFERENCE.md`, `TEAMS-LITE.md`, `SKILLS-LITE.md`, `ERRORS.md` | Always / on-demand per tier |
| **Quality** | `EVALUATION.md`, `QUALITY-SCORECARD.md`, `VALIDATION-GATES.md`, `VALIDATION-RULES.md`, `PREFLIGHT-TEMPLATES.md` | Review/validation phases |
| **Context** | `CONTEXT-BUDGET.md`, `CONTEXT-DECAY.md`, `CONTEXT-COMPRESSION.md`, `HANDOFF-COMPRESSION.md`, `TOKEN-PREDICTION.md` | Context pressure / multi-agent handoff |
| **Memory** | `SEMANTIC-MEMORY.md`, `DECISION-TRAIL.md`, `AGENT-JOURNALS.md` | Decision tracking / cross-session |
| **Recovery** | `DURABLE-EXECUTION.md`, `ROLLBACK.md` | Failures / rollback |
| **Routing** | `FITNESS-ROUTING.md`, `SKILL-COMPOSITION.md`, `SKILL-CONFLICTS.md`, `SKILL-DEGRADATION.md`, `CONDITIONAL-HANDOFFS.md`, `CAPABILITY-BUNDLES.md` | Agent selection / skill chains |
| **Security** | `SKILL-SECURITY.md` | Skill trust verification |
| **Meta** | `EVOLUTION.md`, `TRACE-SCHEMA.md`, `DELIVERABLE-GRAPH.md`, `LIAISON-PROTOCOL.md`, `MCP-SERVER.md`, `VOICE-COHERENCE.md`, `LOCALIZATION.md`, `COMMUNITY-TIERS.md`, `PATTERN-EXTRACTION.md`, `CROSS-PROJECT.md`, `PROJECT-DETECTION.md` | Specialized scenarios |
| **Deprecated** | `RUNTIME-REFERENCE.md` | Archived — use `REFERENCE.md` instead |

### Full Index

| File | Purpose | Load When |
|------|---------|-----------|
| `RUNTIME.md` | Identity, laws, routing, phases, agents | **Always** (tier-aware) |
| `SKILLS-LITE.md` | Tag-based skill resolution | Skill lookups |
| `TEAMS-LITE.md` | Streamlined team review protocol | `:team` variants |
| `ERRORS.md` | Error recovery | Errors occur |
| `REFERENCE.md` | Lookup tables | Quick lookups |
| `FITNESS-ROUTING.md` | Multi-dimensional agent fitness scoring | Agent selection |
| `SKILL-DEGRADATION.md` | Graceful skill tier degradation (T1/T2/T3) | Context budget pressure |
| `CONTEXT-BUDGET.md` | Context window zone management (Green/Yellow/Red/Critical) | Budget monitoring |
| `SKILL-CONFLICTS.md` | Resolution strategies for overlapping skills | ≥2 skills conflict |
| `CAPABILITY-BUNDLES.md` | Pre-configured agent bundles for composite tasks | Bundle matching |
| `LOCALIZATION.md` | Cultural/domain locale adaptation | Persona locale field present |
| `ROLLBACK.md` | Pre-workflow snapshot & rollback protocol | Rollback invoked |
| `HANDOFF-COMPRESSION.md` | 3-tier context compression for agent chains | Multi-agent handoff |
| `TOKEN-PREDICTION.md` | Pre-execution token cost estimation | Cost estimate requested |
| `PATTERN-EXTRACTION.md` | Post-workflow pattern learning | Pattern extraction invoked |
| `COMMUNITY-TIERS.md` | 4-tier contributor trust model | Contributor validation |
| `archive/*` | Full original protocols | Historical reference |

---

## RUNTIME.md TIER REFERENCE

RUNTIME.md uses tiered loading — read §LOADING PROTOCOL to determine which tier to load.

| Tier | Sections | Token Budget |
|------|----------|:------------:|
| NANO | IDENTITY, PATHS, COMMAND ROUTING, LANGUAGE, ORCHESTRATION LAWS, AMBIGUITY HANDLING, PROHIBITIONS, SELF-CHECK | ~850 |
| MICRO | TOPOLOGY DISPATCH, EXECUTION MODEL, EXECUTION LOOP, AGENT CATEGORIES, PHASE EXECUTION, DELIVERABLES, PLATFORM CAPABILITIES | ~1,100 cumulative with NANO |
| FULL | GOLDEN TRIANGLE, SKILLS, LOAD ON DEMAND, WORKFLOW COMPLETION, MAX EMBODIMENT DEPTH | ~2,500 full file |

| Load Level | When | Marker Stop |
|------------|------|-------------|
| NANO only | `/ask`, `/quick`, simple NL question | `<!-- ═══ TIER: NANO ═══ END ═══ -->` |
| NANO + MICRO | `/cook:fast`, `/fix:fast`, standard workflows | `<!-- ═══ TIER: MICRO ═══ END ═══ -->` |
| Full | `:team`, `:hard` variants | Read entire file |

---

## SELF-VERIFICATION CHECKLIST

```
Before every response:
□ DELEGATING (not implementing)? → If no: STOP → find the right agent
□ FOLLOWING workflow phase order? → If no: STOP → resume correct phase
□ RESPONDING in user's language? → If no: STOP → switch language
```

---

## EXECUTION MODEL QUICK CHECK

```
🔍 Execution Mode — Role-Based Hybrid:

  1. Check agent.category:
     → meta, execution, investigation, support → EMBODY (shared context)
     → validation, research → SUB-AGENT (isolated context) + Context Briefing

  2. Platform fallback (sub-agent tool missing):
     → All agents → EMBODY
     → validation/research agents → EMBODY + Anti-Bias Protocol

  ❌ FORBIDDEN: SUB-AGENT for context-dependent agents (execution/meta/investigation/support)
  ❌ FORBIDDEN: EMBODY for independence-dependent agents (validation/research) when sub-agent available
  ❌ FORBIDDEN: Skipping Context Briefing or Anti-Bias Protocol
```

---

## PHASE DEPENDENCY

| Phase | Requires | Produces |
|-------|----------|----------|
| Brainstorm | Request | `BRAINSTORM-*.md` |
| Research | Request | `RESEARCH-*.md` |
| Scout | Request | `SCOUT-*.md` |
| Design | Brainstorm + Scout | `DESIGN-*.md` |
| Plan | Research + Scout | `PLAN-*.md` |
| Implement | **PLAN (mandatory)** | Code |
| Test | Code | Test results |
| Review | Code + Tests | Review verdict |

### Blocking Rules

```
⛔ Implementation REQUIRES plan first
⛔ Design REQUIRES brainstorm/scout first
⛔ Test REQUIRES code to exist
⛔ Review REQUIRES code + tests

✅ IF missing prerequisite → CREATE first, THEN proceed
```

---

## ORCHESTRATION LAWS (Quick Reference)

| # | Law | One-liner |
|---|-----|----------|
| L1 | Single Truth | Entry file → RUNTIME → rest on-demand |
| L2 | Requirement Integrity | 100% fidelity, zero loss |
| L3 | Explicit Loading | State what you loaded |
| L4 | Deep Embodiment | Follow agent's full protocol |
| L5 | Sequential Execution | Phase N before N+1 |
| L6 | Language Compliance | User's lang; files in English |
| L7 | Recursive Delegation | Meta agents never implement |
| L8 | Stateful Handoff | Prior deliverables = locked (escape: factual errors) |
| L9 | Constraint Propagation | Scout→Planner→Impl chain |
| L10 | Deliverable Integrity | Agent files define format |

---

## SCHEMA VERSION RULES

| Version Bump | When | Example |
|:------------:|------|--------|
| Minor (1.0 → 1.1) | New optional field added | Adding `personality:` to agents |
| Major (1.0 → 2.0) | Required field added, field removed, or semantics changed | Making `capabilities:` required |

**Rules**:
- `schema-version:` is ALWAYS the first field after `---`
- Unknown versions: WARN, don't fail
- Missing `schema-version`: treat as "1.0" (backward compatible)
- Linter (21.1) validates presence and format

---

## EXPANDED NL DETECTION

> Loaded on-demand when NL routing needs extended pattern matching.

| Pattern Group | Keywords / Phrases | Route | Confidence |
|---------------|-------------------|-------|:----------:|
| Build/Create | implement, build, create, add, develop, scaffold, make a, set up, initialize | `/cook` | HIGH |
| Fix/Repair | fix, bug, error, broken, crash, failing, not working, exception, issue with | `/fix` | HIGH |
| Plan/Strategy | plan, strategy, approach, roadmap, breakdown, how should we, steps to | `/plan` | HIGH |
| Debug/Investigate | debug, investigate, why does, trace, root cause, what's causing | `/debug` | HIGH |
| Test/Verify | test, coverage, unit test, integration test, verify, validate, assert | `/test` | HIGH |
| Review/Quality | review, PR, check code, code quality, look at my, audit | `/review` | HIGH |
| Document | document, readme, spec, API docs, write docs, JSDoc, docstring | `/docs` | HIGH |
| Design/UI | design, UI, UX, mockup, wireframe, layout, component design | `/design` | HIGH |
| Deploy/Release | deploy, release, ship, publish, push to prod, CI/CD | `/deploy` | HIGH |
| Report/Status | report, status, summary, overview, progress | `/report` | HIGH |
| Brainstorm/Explore | brainstorm, ideas, explore, what if, possibilities, alternatives | `/brainstorm` | HIGH |
| Ask/Question | question, how does, what is, explain, why, tell me about | `/ask` | HIGH |
| Code/Generate | code, snippet, generate, write a function, example of | `/code` | HIGH |
| Ambiguous/Vague | help, do, make, want, need, can you, please, I'd like | `/cook` | LOW |
| Multi-intent | "fix and deploy", "plan then implement" | First detected command | LOW |

---

## Persona Override

IF `persona:` specified in project config or command prefix:
  → Validate name matches `^[a-z0-9-]+$` (reject path traversal attempts)
  → Load `personas/{name}.yaml` → override agent personality fields.
  Default: `professional`.

---

## ORCHESTRATION DEPTH

| Level | Trigger | Phases | Agents | Skip |
|-------|---------|:------:|:------:|------|
| Nano | `/ask`, `/quick`, NL question, task < 50 words | 1 | 1 | Scout, Research, Review |
| Micro | `:fast` variants | 2-4 | 1-3 | Team assembly, Golden Triangle |
| Full | `:hard`, `:team` variants | 4-7 | 3-7 | Nothing — full protocol |

---

## Execution Summary (optional enrichment for Workflow Completion)

| Phase | Agent | Duration | Files Created | Files Modified | Status |
|-------|-------|----------|---------------|----------------|--------|

**Sources**: Duration from `_trace.md` (if present, else "—"). File counts from tool usage.

---

## PHASE RECOVERY PROTOCOL

> Consolidated from RUNTIME-REFERENCE.md — single lookup target.

On phase FAILURE:

| Step | Action |
|:----:|--------|
| 1 | CAPTURE error context: what failed, error description, partial output |
| 2 | RETRY phase once with error context appended to agent instructions |
| 3 | IF retry succeeds → continue to next phase normally |
| 4 | IF retry fails → HALT with `RECOVERY_FAILED` status |

```
RECOVERY_FAILED:
  Phase: {N} — {name}
  Agent: {agent}
  Error: {description}
  Attempted: 1 retry with error context
  Status: HALTED — manual intervention required
  Deliverables so far: {list of completed phase outputs}
```

**Rules**:
- Maximum 1 retry per phase (no retry loops)
- Retry includes error context from first failure
- RECOVERY_FAILED preserves `_checkpoint.md` for later manual resume
- ⚠️ Review `_checkpoint.md` for sensitive data (credentials, tokens, internal paths) before sharing or committing to version control
- RECOVERY_FAILED deletes `_working.md` (cleanup)

---

## WORKING MEMORY

> Consolidated from RUNTIME-REFERENCE.md — single lookup target.

- At workflow start: CREATE `_working.md` in report directory (`./reports/{topic}/`)
- At workflow start: CREATE `_trace.md` (append-only execution trace)
- Trace row: `| {#} | {HH:MM:SS} | {agent} | {phase} | {action} | {status} |`
- During phases: agents APPEND entries as `- [{HH:MM}] [{agent-name}]: {content}`
- At workflow end: DELETE `_working.md`
- At workflow end: DELETE `_trace.md` on success; PRESERVE on failure
- Max: 500 lines recommended; summarize oldest entries if exceeded
- On RECOVERY_FAILED: DELETE `_working.md` during cleanup

---

## PLATFORM CAPABILITIES

> Consolidated from RUNTIME-REFERENCE.md — single lookup target.

### Platform Resolution

Replace `{TOOL}` in path templates with your platform prefix:

| Platform | {TOOL} | Example Path |
|----------|--------|--------------|
| Cursor | `cursor` | `~/.cursor/skills/agent-assistant/` |
| GitHub Copilot | `copilot` | `~/.copilot/skills/agent-assistant/` |
| Claude Code | `claude` | `~/.claude/skills/agent-assistant/` |
| Gemini/Antigravity | `gemini/antigravity` | `~/.gemini/antigravity/skills/agent-assistant/` |
| Qwen | `qwen` | `~/.qwen/skills/agent-assistant/` |
| Codex | `codex` | `~/.codex/skills/agent-assistant/` |
| Generic / Other | `{TOOL}` | `~/.{TOOL}/skills/agent-assistant/` |

> **Note**: For Gemini/Antigravity, `{TOOL}` = `gemini/antigravity` (contains a slash).

| Platform | Sub-agent | File I/O | Terminal | Web |
|----------|-----------|----------|----------|-----|
| Cursor | ❌ | ✅ | ✅ | ❌ |
| GitHub Copilot | ✅* | ✅ | ✅ | ✅* |
| Claude Code | ✅ | ✅ | ✅ | ❌ |
| Gemini | ❌ | ✅ | ✅ | ❌ |
| Codex | ❌ | ✅ | ✅ | ❌ |
| Qwen | ❌ | ✅ | ✅ | ❌ |

*Platform-dependent. Check at runtime via Tool Discovery.

### Dynamic Capability Check

Read `platforms.json` → current platform → `capabilities` object.
IF capability is `false`:
  → Use `adapter_hints.tool_alternatives[capability]` for fallback
  → Log: "⚠️ {capability} unavailable — using alternative"

---

## PLATFORM DEGRADATION

| Platform Capability | Mode | Compensation |
|---------------------|:----:|--------------|
| Sub-agent tool available | Role-Based Hybrid | Full — optimal per category |
| Sub-agent tool missing | All EMBODY | Anti-Bias Protocol for evaluators/researchers |
| Limited context window | All EMBODY | Checkpoint-based handoff + compressed briefings |

---

## TOPOLOGY INVENTORY

`topologies/` contains **12** protocol files:

**5 Base Topologies**: `pipeline`, `fan-out`, `hierarchical`, `round-robin`, `swarm`

**7 Specialized Variants**: `audit-pipeline`, `debate-round-robin`, `feature-hierarchical`, `golden-triangle`, `parallel-branch`, `research-fan-out`, `review-pipeline`

Most commonly used: `pipeline` (default), `fan-out`, `hierarchical`. `golden-triangle` powers all `:team` variants.
