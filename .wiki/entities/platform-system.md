---
title: Platform System
type: entity
tags: [platform, multi-platform, cursor, copilot, claude, codex, antigravity, gemini, kiro, qwen]
created: 2026-05-20
updated: 2026-05-20
---

# Platform System

The Platform System provides a multi-platform abstraction layer that allows a single Agent Assistant codebase to operate across 7 different AI assistant platforms. Rather than maintaining separate codebases for each platform, a path placeholder system maps platform-specific locations while the core logic remains shared.

---

## Definition

The multi-platform abstraction is built on two key mechanisms:

1. **Path placeholders** — variables like `{{CURSOR_PATH}}` that resolve to platform-specific paths
2. **Platform configurations** — TOML files per platform with path mappings and instructions

- **Total Platforms**: 7 (Cursor, GitHub Copilot, Claude Code, Antigravity/Gemini, Codex, Kiro, Qwen)
- **Configuration**: TOML format (`code-assistants/{platform}/config.toml`)
- **Path Resolution**: Explicit config → environment variable → file markers → default
- **Source**: `.documents/knowledge-overview/02-tech-stack.md:129-138`, `.documents/knowledge-domain/04-business-rules.md:141-189`

---

## Platform Resolution

Platform resolution maps the `{TOOL}` variable to the appropriate platform-specific paths. The `{TOOL}` placeholder is replaced during installation based on the target platform.

### {TOOL} Variable Mapping

| Platform | {TOOL} Value | Example Path |
|----------|--------------|--------------|
| Cursor | `cursor` | `~/.cursor/skills/agent-assistant/` |
| GitHub Copilot | `copilot` | `~/.copilot/skills/agent-assistant/` |
| Claude Code | `claude` | `~/.claude/skills/agent-assistant/` |
| Gemini/Antigravity | `gemini/antigravity` | `~/.gemini/antigravity/skills/agent-assistant/` |
| Codex | `codex` | `~/.codex/skills/agent-assistant/` |
| Kiro | `kiro` | `~/.kiro/skills/agent-assistant/` |
| Qwen | `qwen` | `~/.qwen/skills/agent-assistant/` |

### Path Placeholder Resolution

All paths in the codebase use placeholders that are resolved at install time:

```
~/.{TOOL}/skills/agent-assistant/commands/  →  ~/.cursor/skills/agent-assistant/commands/
~/.{TOOL}/skills/agent-assistant/rules/     →  ~/.claude/skills/agent-assistant/rules/
~/.{TOOL}/skills/agent-assistant/agents/    →  ~/.codex/skills/agent-assistant/agents/
```

The installer (`cli/install.js`) performs these replacements:

1. Reads source files with `{TOOL}` placeholders
2. Looks up the target platform's `{TOOL}` value
3. Replaces all placeholders with platform-specific paths
4. Writes the resolved files to the target location

**Source**: `rules/CORE.md:36-43`

---

## Platform Reference

| Platform | Base Path | Placeholder | Config File |
|----------|-----------|-------------|-------------|
| Cursor | `~/.cursor/` | `{{CURSOR_PATH}}` | `code-assistants/cursor-assistant/` |
| GitHub Copilot | `~/.copilot/` | `{{COPILOT_PATH}}` | `code-assistants/copilot-assistant/` |
| Claude Code | `~/.claude/` | `{{CLAUDE_PATH}}` | `code-assistants/claude-assistant/` |
| Antigravity/Gemini | `~/.gemini/antigravity/` | `{{ANTIGRAVITY_PATH}}` | `code-assistants/antigravity-assistant/` |
| Codex | `~/.codex/` | `{{CODEX_PATH}}` | `code-assistants/codex-assistant/` |
| Kiro | `~/.kiro/` | `{{KIRO_PATH}}` | `code-assistants/kiro-assistant/` |
| Qwen | `~/.qwen/` | `{{QWEN_PATH}}` | `code-assistants/qwen-assistant/` |
| Kiro | `~/.kiro/` | `{{KIRO_PATH}}` | `code-assistants/kiro-assistant/` |
| Qwen | `~/.qwen/` | `{{QWEN_PATH}}` | `code-assistants/qwen-assistant/` |

---

## Platform Configuration Structure

Each platform has a configuration directory with platform-specific files:

```
code-assistants/
├── cursor-assistant/
│   ├── .cursorrules          # Cursor rule file (becomes CURSOR.md)
│   └── rules/
│       └── agent-assistant.mdc  # MDC rule definition
├── copilot-assistant/
│   └── agent-assistant.agent.md # VS Code Copilot agent file
├── claude-assistant/
│   └── CLAUDE.md             # Claude Code instruction file
├── antigravity-assistant/
│   ├── GEMINI.md             # Gemini platform config
│   └── AntigravityGlobal.agent.md  # Global agent definition
└── codex-assistant/
    ├── CODEX.md              # Codex instruction file
    ├── config.toml           # Codex TOML configuration
    └── agents/*.toml         # 21 agent role configurations
```

### Platform Configuration Structure

#### Cursor Configuration

| Component | Path | Purpose |
|-----------|------|---------|
| Rule File | `~/.cursor/rules/agent-assistant.mdc` | MDC rule for orchestration |
| Commands | `~/.cursor/commands/` | Command suggestions |
| Core Framework | `~/.cursor/skills/agent-assistant/` | Main framework files |
| Native Agents | `~/.cursor/agents/` | Bundled agent definitions |
| Skills | `~/.cursor/skills/` | User skills directory |

**Cursor-Specific Features**:
- `.cursorrules` file converted to `CURSOR.md` at install
- MDC (`.mdc`) rule format supported
- Command suggestions appear in Cursor's command palette
- Native subagent support via `~/.cursor/agents/`

**Source**: `code-assistants/cursor-assistant/.cursorrules`

#### GitHub Copilot Configuration

| Component | Path | Purpose |
|-----------|------|---------|
| VS Code Prompts | `~/.config/Code/User/prompts/` | Custom prompt definitions |
| Core Framework | `~/.copilot/skills/agent-assistant/` | Main framework files |
| Commands | `~/.copilot/commands/` | Command definitions |
| Native Agents | `~/.copilot/agents/` | Bundled agent definitions |
| Global Config | `~/.copilot/` | Platform root configuration |

**Copilot-Specific Features**:
- Agent files use `.agent.md` format
- Installs to VS Code prompts folder for custom instructions
- Supports GitHub Copilot Chat agent extensions
- Multi-agent orchestration via prompt injection

**Source**: `code-assistants/copilot-assistant/agent-assistant.agent.md`

#### Claude Code Configuration

| Component | Path | Purpose |
|-----------|------|---------|
| Global Config | `~/.claude/CLAUDE.md` | Main instruction file |
| Commands | `~/.claude/commands/` | Slash command definitions |
| Core Framework | `~/.claude/skills/agent-assistant/` | Main framework files |
| Native Agents | `~/.claude/agents/` | Bundled agent definitions |
| Skills | `~/.claude/skills/` | User skills directory |

**Claude Code-Specific Features**:
- Native command support via `~/.claude/commands/`
- Agent system with `~/.claude/agents/` directory
- Global `CLAUDE.md` loaded on every session
- Supports all 21 specialist agents

**Source**: `code-assistants/claude-assistant/CLAUDE.md`

#### Antigravity/Gemini Configuration

| Component | Path | Purpose |
|-----------|------|---------|
| Editor Config | `~/.antigravity/` | User-accessible configurations |
| Platform Config | `~/.gemini/` | Global platform settings |
| Extension Brain | `~/.gemini/antigravity/skills/agent-assistant/` | Main framework |
| Global Workflows | `~/.gemini/antigravity/global_workflows/` | Shared workflows |
| Global Agents | `~/.gemini/agents/` | Global agent definitions |
| User Workflows | `~/.antigravity/workflows/` | User-defined workflows |
| User Agents | `~/.antigravity/agents/` | User-created agents |

**Antigravity-Specific Features**:
- Dual-path architecture: `~/.antigravity/` (user) and `~/.gemini/` (platform)
- GEMINI.md appended to platform config with markers
- Supports both workflow and agent definitions
- Global and user-scoped configurations

**Source**: `code-assistants/antigravity-assistant/GEMINI.md`, `code-assistants/antigravity-assistant/AntigravityGlobal.agent.md`

#### Codex Configuration

| Component | Path | Purpose |
|-----------|------|---------|
| Global Config | `~/.codex/CODEX.md` | Main instruction file |
| Global Agents | `~/.codex/AGENTS.md` | Codex agent discovery |
| TOML Config | `~/.codex/config.toml` | Native multi-agent config |
| Agent Roles | `~/.codex/agents/*.toml` | 21 agent role definitions |
| Command Skills | `~/.codex/skills/` | Codex-native command skills |
| Core Framework | `~/.codex/skills/agent-assistant/` | Main framework files |
| Commands | `~/.codex/commands/` | Command definitions |

**Codex-Specific Features**:
- **Native multi-agent system** via `config.toml`
- 21 specialist agents registered as TOML configurations
- `max_threads = 6` and `max_depth = 2` for parallel execution
- Command skills in Codex-native format (`agents/openai.yaml`)
- Automatic agent discovery from `~/.codex/AGENTS.md`
- `project_doc_fallback_filenames` for flexible instruction loading

**Agent Roles Defined in config.toml**:

| Agent | TOML Config | Description |
|-------|-------------|-------------|
| `backend-engineer` | `agents/backend-engineer.toml` | Server-side logic, API design |
| `brainstormer` | `agents/brainstormer.toml` | Requirements discovery, ideation |
| `business-analyst` | `agents/business-analyst.toml` | Domain modeling, requirements |
| `database-architect` | `agents/database-architect.toml` | Schema design, optimization |
| `debugger` | `agents/debugger.toml` | Root cause analysis |
| `designer` | `agents/designer.toml` | UI/UX design systems |
| `devops-engineer` | `agents/devops-engineer.toml` | CI/CD, infrastructure |
| `docs-manager` | `agents/docs-manager.toml` | Technical documentation |
| `frontend-engineer` | `agents/frontend-engineer.toml` | UI implementation |
| `game-engineer` | `agents/game-engineer.toml` | Game development |
| `mobile-engineer` | `agents/mobile-engineer.toml` | iOS, Android, React Native |
| `performance-engineer` | `agents/performance-engineer.toml` | Profiling, optimization |
| `planner` | `agents/planner.toml` | Task decomposition |
| `project-manager` | `agents/project-manager.toml` | Project coordination |
| `reporter` | `agents/reporter.toml` | Reporting, analytics |
| `researcher` | `agents/researcher.toml` | Technical research |
| `reviewer` | `agents/reviewer.toml` | Quality assurance |
| `scouter` | `agents/scouter.toml` | Code exploration |
| `security-engineer` | `agents/security-engineer.toml` | Security assessment |
| `tech-lead` | `agents/tech-lead.toml` | Technical leadership |
| `tester` | `agents/tester.toml` | QA, test automation |

**Source**: `code-assistants/codex-assistant/config.toml`, `code-assistants/codex-assistant/CODEX.md`

---

## Path Resolution

Path placeholders are resolved using a priority chain:

1. **Explicit config** — platform-specific `config.toml` specifies exact paths
2. **Environment variable** — `CURSOR_PATH`, `COPILOT_PATH`, `CLAUDE_PATH`, etc. override defaults
3. **File markers** — presence of `.cursor/`, `.copilot/`, `.claude/`, etc. detected automatically
4. **Default** — fallback to standard platform path

### Resolution Priority Table

| Priority | Detection Method | Override Capability |
|----------|-----------------|-------------------|
| 1 (highest) | Explicit config file | Always takes precedence |
| 2 | Environment variable | `CURSOR_PATH=...` style |
| 3 | File system markers | Platform directory exists |
| 4 (lowest) | Default paths | Fallback only |

The resolution happens at install time via `cli/install.js`, which:

1. Detects available platforms
2. Reads platform configurations
3. Replaces all path placeholders with resolved paths
4. Copies files to platform-specific locations

### Path Replacement Rules

Each platform defines replacement rules in `cli/install.js`:

| Pattern | Cursor | Copilot | Claude | Antigravity | Codex |
|---------|--------|---------|--------|------------|-------|
| `~/.{TOOL}/skills/agent-assistant/` | `~/.cursor/skills/agent-assistant/` | `~/.copilot/skills/agent-assistant/` | `~/.claude/skills/agent-assistant/` | `~/.gemini/antigravity/skills/agent-assistant/` | `~/.codex/skills/agent-assistant/` |
| `{TOOL}` | `cursor` | `copilot` | `claude` | `gemini/antigravity` | `codex` |
| `{HOME}` | `~` | `~` | `~` | `~` | `~` |

**Source**: `cli/install.js:50-168`

---

## Platform Detection

Platform detection follows this priority:

```
1. Check for explicit config file
   → code-assistants/{platform}/config.toml exists
2. Check environment variables
   → CURSOR_PATH, COPILOT_PATH, CLAUDE_PATH, ANTIGRAVITY_PATH, CODEX_PATH
3. Check file markers
   → ~/.cursor/, ~/.copilot/, ~/.claude/, ~/.gemini/, ~/.codex/
4. Fall back to defaults
   → Use standard platform paths
```

If a platform directory doesn't exist, the system gracefully skips it rather than failing. This allows the same codebase to work across any subset of platforms.

### Detection Methods by Platform

| Platform | File Marker | Environment Variable |
|----------|-------------|---------------------|
| Cursor | `~/.cursor/` | `CURSOR_PATH` |
| GitHub Copilot | `~/.copilot/` | `COPILOT_PATH` |
| Claude Code | `~/.claude/` | `CLAUDE_PATH` |
| Antigravity/Gemini | `~/.gemini/` | `ANTIGRAVITY_PATH` |
| Codex | `~/.codex/` | `CODEX_PATH` |

---

## Installation Across Platforms

The CLI installer (`cli/install.js`) handles multi-platform installation:

```bash
# Install to all detected platforms
node cli/install.js

# Install to specific platform
node cli/install.js cursor
node cli/install.js copilot
node cli/install.js antigravity
node cli/install.js claude
node cli/install.js codex

# List installed platforms
node cli/install.js list

# Uninstall from all platforms
node cli/install.js uninstall --all

# Uninstall from specific platform
node cli/install.js uninstall cursor
```

### Installation Process Per Platform

For each platform:

1. **Detect** if platform is available (check directory exists)
2. **Read** platform configuration and replacement rules
3. **Resolve** all path placeholders using platform-specific mappings
4. **Copy** files to platform-specific paths with replacements applied
5. **Verify** all files were written correctly
6. **Report** installation status

### Installation Summary by Platform

| Platform | Key Destinations | Special Handling |
|----------|-----------------|------------------|
| Cursor | `~/.cursor/rules/`, `~/.cursor/commands/`, `~/.cursor/skills/agent-assistant/` | MDC rule conversion |
| Copilot | `~/.config/Code/User/prompts/`, `~/.copilot/skills/agent-assistant/` | VS Code prompt injection |
| Claude | `~/.claude/commands/`, `~/.claude/skills/agent-assistant/` | Native command support |
| Antigravity | `~/.gemini/`, `~/.antigravity/`, `~/.gemini/antigravity/skills/` | Dual-path installation |
| Codex | `~/.codex/agents/`, `~/.codex/skills/`, `~/.codex/config.toml` | TOML merge, agent registration |

**Source**: `.documents/knowledge-source-base/02-entry-points.md:16-80`, `cli/install.js:606-1179`

---

## Platform-Specific Features Comparison

| Feature | Cursor | Copilot | Claude | Antigravity | Codex |
|---------|:------:|:-------:|:------:|:-----------:|:-----:|
| Native Rules Format | MDC | `.agent.md` | `CLAUDE.md` | `GEMINI.md` | `CODEX.md` |
| Command System | Suggestions | Prompts | Native Commands | Workflows | Skills |
| Agent Format | `.md` | `.agent.md` | `.md` | `.agent.md` | `.toml` |
| Multi-Agent Native | Via agents/ | Via prompts | Via agents/ | Via agents/ | Via config.toml |
| Subagent Tool | `runSubagent` | Agent spawning | Agent system | Agent system | `spawn` |
| Skill System | Skills folder | Skills folder | Skills folder | Skills folder | Skills + TOML |
| Max Parallel Agents | 2-3 | Platform limited | 2-3 | 2-3 | 6 |
| Max Agent Depth | 1 | Platform limited | 1 | 1 | 2 |

---

## Related Pages

- [[CLI Installer]] — The installer that handles multi-platform setup
- [[Configuration Reference]] — Platform configuration files and options
- [[Agent System]] — Multi-agent orchestration system
- [[Command System]] — Slash commands and routing
- [[Rule System]] — Orchestration rules and protocols
