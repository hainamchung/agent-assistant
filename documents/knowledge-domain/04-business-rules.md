# Business Rules

> **File**: `documents/knowledge-domain/04-business-rules.md`
> **Purpose**: Validation rules for command routing, variant selection, skill resolution, and platform path resolution

---

## Overview

Business rules govern how Agent Assistant processes requests, routes commands, selects variants, resolves skills, and handles platform paths.

---

## Rule Category 1: Command Routing Rules

### Rule BR-001: Command Parsing

**Statement**: Commands must be parsed to extract base command, variant, and parameters.

**Format**: `/command:variant parameter`

| Component | Format | Example |
|-----------|--------|---------|
| Base | `/` + word | `/cook` |
| Variant | `:` + word | `:fast`, `:hard`, `:team` |
| Parameters | Free text | `build login form` |

**Valid Examples**:
```
/cook                     → command: cook, variant: fast, params: ""
/cook:fast                → command: cook, variant: fast, params: ""
/cook:hard build auth     → command: cook, variant: hard, params: "build auth"
/fix:team critical bug    → command: fix, variant: team, params: "critical bug"
```

### Rule BR-002: Command Validation

**Statement**: Only valid commands are accepted.

**Valid Commands**: `/cook`, `/code`, `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/deploy`, `/report`, `/wiki`, `/brainstorm`, `/ask`

**Invalid Behavior**: Commands not in the list are rejected with an error message.

### Rule BR-003: Unknown Command Handling

**Statement**: Unknown commands trigger a helpful error message.

**Error Message Template**: `Unknown command: {command}. Valid commands: {list}`

---

## Rule Category 2: Variant Selection Rules

### Rule BR-010: Default Variant

**Statement**: If no variant is specified, `fast` is the default.

| Input | Interpreted As |
|-------|----------------|
| `/cook` | `/cook:fast` |
| `/fix` | `/fix:fast` |
| `/plan` | `/plan:fast` |

### Rule BR-011: Variant Availability

**Statement**: All commands support all three variants.

| Variant | Agent Count | Description |
|---------|-------------|-------------|
| `fast` | 2-3 | Quick execution |
| `hard` | 5-8 | Complex with quality gates |
| `team` | Golden Triangle | Adversarial review |

### Rule BR-012: Variant Selection Criteria

**Statement**: Users should select variants based on task complexity.

| Criteria | Recommended Variant |
|----------|---------------------|
| Simple fix, single file | `fast` |
| Multiple files, integration | `hard` |
| Critical system, security | `team` |
| Unknown complexity | Start with `fast`, escalate if needed |

### Rule BR-013: Variant Escalation

**Statement**: If `fast` fails or is insufficient, escalate to `hard` or `team`.

```
fast fails → hard
hard fails → team
```

---

## Rule Category 3: Skill Resolution Rules

### Rule BR-020: HSOL Skill Injection

**Statement**: Skills are automatically injected based on task context.

**Process**:
1. Analyze current file and command type
2. Match against skill domains
3. Rank by relevance
4. Inject within context limits

### Rule BR-021: Skill Tier Priority

**Statement**: Skills are selected from tiers in priority order.

| Priority | Tier | Always Included |
|----------|------|-----------------|
| 1 | foundation | Yes |
| 2 | professional | If domain matches |
| 3 | specialized | If explicit match |
| 4 | expert | Only if requested |

### Rule BR-022: Context Window Limits

**Statement**: Total injected skills must fit within context window.

| Context Window | Max Skills |
|---------------|------------|
| Small (< 32K) | 10-15 skills |
| Medium (32K-64K) | 20-30 skills |
| Large (64K+) | 50+ skills |

### Rule BR-023: Skill Relevance Scoring

**Statement**: Skills are ranked by relevance to current task.

**Scoring Factors**:
- Domain match (0-40 points)
- Tag match (0-30 points)
- File extension match (0-20 points)
- Recent use (0-10 points)

---

## Rule Category 4: Platform Path Resolution Rules

### Rule BR-030: Platform Path Variables

**Statement**: Path variables are resolved based on current platform.

| Variable | Platform | Default Path |
|----------|----------|--------------|
| `{{CURSOR_PATH}}` | Cursor | `~/.cursor/` |
| `{{COPILOT_PATH}}` | GitHub Copilot | `~/.copilot/` |
| `{{CLAUDE_PATH}}` | Claude Code | `~/.claude/` |
| `{{ANTIGRAVITY_PATH}}` | Antigravity | `~/.antigravity/` + `~/.gemini/` |
| `{{CODEX_PATH}}` | Codex | `~/.codex/` |
| `{{KIRO_PATH}}` | Kiro | `~/.kiro/` |
| `{{QWEN_PATH}}` | Qwen | `~/.qwen/` |

### Rule BR-031: Path Replacement

**Statement**: Path variables are replaced before file operations.

**Example**:
```javascript
// Before replacement
source: "{{CURSOR_PATH}}/agents/backend-engineer.md"
platform: "cursor"

// After replacement
source: "~/.{TOOL}/agents/backend-engineer.md"
```

### Rule BR-032: Path Validation

**Statement**: Target paths must be writable.

**Validation Steps**:
1. Check directory exists
2. Check write permission
3. Create directory if missing
4. Fail gracefully if not writable

### Rule BR-033: Platform Detection

**Statement**: Platform is auto-detected from environment.

| Detection Method | Priority |
|-----------------|----------|
| Explicit config | 1 (highest) |
| Environment variable | 2 |
| File system markers | 3 |
| Default to first found | 4 (lowest) |

---

## Rule Category 5: Agent Selection Rules

### Rule BR-040: Agent Assignment

**Statement**: Commands assign agents based on command type and variant.

**Default Assignments**:
| Command | Fast | Hard | Team |
|---------|------|------|------|
| `/cook` | 2 agents | 5 agents | Golden Triangle |
| `/fix` | debugger | debugger + reviewer | Golden Triangle |
| `/test` | tester | tester + reviewer | Golden Triangle |
| `/review` | reviewer | reviewer + security | Golden Triangle |

### Rule BR-041: Agent Override

**Statement**: Users can override default agent selection.

**Syntax**: `/command:variant @agent1 @agent2`

**Example**:
```
/cook:hard @backend-engineer @database-architect
```

### Rule BR-042: Agent Constraints

**Statement**: Agents must exist in the agent registry.

**Validation**: Every referenced agent must have a corresponding file in `agents/`.

---

## Rule Category 6: Team Coordination Rules

### Rule BR-050: Golden Triangle Roles

**Statement**: Every team variant uses exactly three roles.

| Role | Responsibility |
|------|----------------|
| Tech Lead | Architecture, decisions, coordination |
| Executor | Implementation |
| Reviewer | Quality assurance |

### Rule BR-051: Sequential Execution

**Statement**: Golden Triangle executes in phases.

```
Tech Lead → Executor → Reviewer → (loop if issues) → Complete
```

### Rule BR-052: Review Iteration

**Statement**: Reviewer can request changes up to 3 times.

**Loop Limit**: `maxIterations = 3`

**Post-Limit Action**: Escalate to human review

---

## Rule Category 7: Error Handling Rules

### Rule BR-060: Error Classification

**Statement**: Errors are classified by severity.

| Severity | Action | Example |
|----------|--------|---------|
| Warning | Log and continue | Missing skill |
| Error | Retry and fail | Agent crash |
| Critical | Stop immediately | Security vulnerability |

### Rule BR-061: Retry Policy

**Statement**: Failed agents are retried with exponential backoff.

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | 1 second |
| 3 | 2 seconds |
| 4+ | Stop and fail |

### Rule BR-062: Error Propagation

**Statement**: Errors propagate to parent unless handled.

```
Agent error → Team error → Command error → User notification
```

---

## Evidence Sources

- `rules/CORE.md` — Core orchestration rules
- `rules/PHASES.md` — Phase definitions
- `rules/AGENTS.md` — Agent selection
- `rules/SKILLS.md` — Skill injection
- `rules/TEAMS.md` — Team coordination
- `rules/ERRORS.md` — Error handling
- `commands/` — Command definitions
- `agents/` — Agent files
