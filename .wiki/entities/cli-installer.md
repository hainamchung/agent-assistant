---
title: CLI Installer
type: entity
tags: [cli, installation, nodejs, setup]
created: 2026-05-20
updated: 2026-05-20
---

# CLI Installer

The CLI Installer is a single-file Node.js application (`cli/install.js`) that sets up Agent Assistant across all configured platforms. It handles path resolution, file copying, and placeholder replacement with no framework dependencies.

---

## Definition

| Property | Value |
|----------|-------|
| **File** | `cli/install.js` |
| **Lines** | 1716 |
| **Language** | Plain JavaScript ES2022+ (no yargs, commander, or other CLI framework) |
| **Dependencies** | Node.js standard library only |
| **Shebang** | `#!/usr/bin/env node` |

**Source**: `cli/install.js:1-24`

---

## Supported Platforms

The installer supports five AI coding assistant platforms:

| Platform | Key | Tool Name | Primary Config Location |
|---------|-----|-----------|------------------------|
| Cursor | `cursor` | Cursor AI Editor | `~/.cursor/` |
| GitHub Copilot | `copilot` | GitHub Copilot in VS Code | `~/.copilot/` |
| Antigravity | `antigravity` | Google Antigravity / Gemini | `~/.gemini/` |
| Claude Code | `claude` | Anthropic Claude CLI | `~/.claude/` |
| Codex | `codex` | OpenAI Codex CLI | `~/.codex/` |

Each platform has unique installation targets documented in the Platform Installation Flow section below.

**Source**: `cli/install.js:50-168`

---

## Entry Point

```bash
node cli/install.js [command] [tool] [options]
```

The installer is invoked as a Node.js script rather than a globally installed CLI tool. This eliminates the need for npx or global installation.

### CLI Arguments

| Argument | Description |
|----------|-------------|
| `command` | `install`, `uninstall`, `list`, or `help` |
| `tool` | Platform key (`cursor`, `copilot`, `antigravity`, `claude`, `codex`) or `all` |
| `--all` | Target flag for all platforms |
| `--help`, `-h` | Show help message |

### Interactive Mode

When invoked without arguments, the installer enters interactive mode:

```
npx agent-assistant install

📋 Select tools to install:

  1. Cursor
  2. GitHub Copilot
  3. Antigravity (Gemini)
  4. Claude Code
  5. Codex
  6. All tools
  0. Cancel

Enter your choice (0-6):
```

**Source**: `cli/install.js:1565-1620`

---

## CLI Usage Examples

### Installation

```bash
# Install for a specific platform
node cli/install.js install cursor
node cli/install.js install copilot
node cli/install.js install antigravity
node cli/install.js install claude
node cli/install.js install codex

# Install for all platforms
node cli/install.js install --all

# Interactive installation (prompts for selection)
node cli/install.js install
```

### Uninstallation

```bash
# Uninstall from a specific platform
node cli/install.js uninstall cursor
node cli/install.js uninstall copilot
node cli/install.js uninstall antigravity
node cli/install.js uninstall claude
node cli/install.js uninstall codex

# Uninstall from all platforms
node cli/install.js uninstall --all
```

### Status

```bash
# List installation status for all platforms
node cli/install.js list
```

**Source**: `cli/install.js:1493-1510`

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `node cli/install.js` | Interactive installation (prompts for platform selection) |
| `node cli/install.js install [tool]` | Install for specific platform |
| `node cli/install.js install --all` | Install for all platforms |
| `node cli/install.js uninstall [tool]` | Remove from specific platform |
| `node cli/install.js uninstall --all` | Remove from all platforms |
| `node cli/install.js list` | List installed platforms with status |
| `node cli/install.js help` | Show help message |

### Help Output

```
Usage: npx agent-assistant <command> [options]

Commands:
  install [tool]     Install for a specific tool (cursor, copilot, antigravity, claude, codex)
  install --all      Install for all supported tools
  uninstall [tool]   Uninstall from a specific tool
  list               List supported tools and installation status
  help               Show this help message

Examples:
  npx agent-assistant install cursor
  npx agent-assistant install --all
  npx agent-assistant uninstall copilot
  npx agent-assistant list
```

**Source**: `cli/install.js:1493-1510`

---

## Complete Installation Workflow

The installation process follows a systematic 5-phase workflow for each platform.

### Phase 1: Banner and Validation

```
╔═══════════════════════════════════════════════════════════════╗
║   🤖 Agent Assistant Framework Installer                      ║
║   Multi-agent orchestration for AI coding assistants          ║
╚═══════════════════════════════════════════════════════════════╝
```

1. Parse command-line arguments
2. Detect available platforms by checking for installation directories
3. Dispatch to appropriate handler based on command type

**Source**: `cli/install.js:1481-1491`, `cli/install.js:1626-1640`

### Phase 2: Progress Estimation

Before installation begins, the installer estimates total file count:

```
📦 Installing Agent Assistant for Cursor...
   Estimated files: ~500
```

The `estimateInstallFiles()` function counts files across all core directories:
- `agents/`, `rules/`, `documents/`, `commands/`, `matrix-skills/`
- `skills/` directory
- Commands copied twice (for `commands/` and `workflows/` backward compatibility)

**Source**: `cli/install.js:489-520`, `cli/install.js:606-614`

### Phase 3: Platform-Specific Installation

For each selected platform, the installer performs a clean install:

#### Cursor Installation (`installCursor()`)

1. **Editor Config (~/.cursor/)**
   - Copy rules from `code-assistants/cursor-assistant/rules/` to `~/.cursor/rules/`
   - Copy `.cursorrules` as `CURSOR.md` to `~/.cursor/`
   - Copy `AGENT.md`, `CLAUDE.md` to `~/.cursor/`

2. **Extension Brain (~/.cursor/skills/agent-assistant/)**
   - Clean install: remove existing framework first
   - Copy all core directories: `agents/`, `rules/`, `documents/`, `commands/`, `matrix-skills/`
   - Copy `commands/` to `workflows/` for backward compatibility
   - Copy `README.md`

3. **User Skills (~/.cursor/skills/)**
   - Copy skills from `skills/` directory

4. **Native Agents (~/.cursor/agents/)**
   - Copy bundled agents

**Source**: `cli/install.js:606-697`

#### GitHub Copilot Installation (`installCopilot()`)

1. **VS Code Prompts (~/.config/Code/User/prompts/)**
   - Copy `agent-assistant.agent.md` prompt file
   - Platform-specific path: `~/Library/Application Support/Code/User/prompts/` on macOS

2. **Global Config (~/.copilot/)**
   - Copy `COPILOT.md`, `AGENT.md`, `CLAUDE.md`

3. **Core Framework (~/.copilot/skills/agent-assistant/)**
   - Same structure as Cursor

4. **Commands (~/.copilot/commands/)**
   - Copy commands for Copilot suggestions

**Source**: `cli/install.js:699-793`

#### Antigravity (Gemini) Installation (`installAntigravity()`)

1. **Editor Config (~/.antigravity/)**
   - Copy workflows to `~/.antigravity/workflows/`
   - Copy agents to `~/.antigravity/agents/`

2. **Platform Config (~/.gemini/)**
   - Inject content into `GEMINI.md` with marker comments (`<!-- AGENT-ASSISTANT-START -->` to `<!-- AGENT-ASSISTANT-END -->`)
   - Copy `AGENT.md`, `CLAUDE.md`
   - Copy global agents to `~/.gemini/agents/`

3. **Extension Brain (~/.gemini/antigravity/)**
   - Copy global workflows to `~/.gemini/antigravity/global_workflows/`
   - Install core framework to `~/.gemini/antigravity/skills/agent-assistant/`

**Source**: `cli/install.js:795-924`

#### Claude Code Installation (`installClaude()`)

1. **Global Config (~/.claude/)**
   - Copy `CLAUDE.md` from `code-assistants/claude-assistant/`
   - Copy `AGENT.md`

2. **Commands (~/.claude/commands/)**
   - Copy command workflows

3. **Native Agents (~/.claude/agents/)**
   - Copy bundled agents

4. **Core Framework (~/.claude/skills/agent-assistant/)**
   - Install complete framework

**Source**: `cli/install.js:926-1004`

#### Codex Installation (`installCodex()`)

1. **Global Config (~/.codex/)**
   - Copy `CODEX.md` to both `CODEX.md` and `AGENTS.md` (Codex primary instruction file)
   - Copy `AGENT.md`

2. **TOML Agent Configs (~/.codex/agents/)**
   - Copy `.toml` agent role configurations

3. **Config Merging (`mergeCodexConfig()`)**
   - Merge `features.multi_agent = true` into user's `~/.codex/config.toml`
   - Add `project_doc_fallback_filenames` configuration
   - Insert managed block between markers `# === AGENT-ASSISTANT START ===` and `# === AGENT-ASSISTANT END ===`

4. **Command Skills (~/.codex/skills/)**
   - Copy command skills from `codex-assistant/skills/`

**Source**: `cli/install.js:1006-1079`, `cli/install.js:1075-1179`

### Phase 4: Progress Tracking

The installer displays real-time progress:

```
  ████████████████░░░░░░░░░░░░░  45% (225/500) 2.3s
```

Progress bar features:
- Unicode block characters (`█` and `░`)
- Percentage and file count display
- Elapsed time tracking
- Throttled updates (50ms) for performance
- Non-TTY fallback: only prints at 10% milestones

**Source**: `cli/install.js:268-308`

### Phase 5: Verification and Summary

After copying, the installer verifies each file exists and displays summary:

```
────────────────────────────────────────────────────────────
📊 Installation Summary
────────────────────────────────────────────────────────────
   Tool:        Cursor
   Files:       512 copied
   Duration:    3.45s
   Verified:    512/512 files
────────────────────────────────────────────────────────────
✅ Installation completed successfully!

   📁 Paths:
      Rules:          ~/.cursor/rules/
      Commands:       ~/.cursor/commands/
      Core Framework: ~/.cursor/skills/agent-assistant/
      Skills:         ~/.cursor/skills/
      Native Agents:  ~/.cursor/agents/
```

**Source**: `cli/install.js:526-545`, `cli/install.js:549-600`

---

## Complete Uninstallation Workflow

The uninstallation process removes Agent Assistant while preserving user data.

### Phase 1: Detection

The uninstaller detects installed platforms by checking for the `agentAssistant` path:

```javascript
const installed = fs.existsSync(tool.paths.agentAssistant);
```

**Source**: `cli/install.js:1512-1563`

### Phase 2: Selective Removal

Uninstallation removes:
- Framework directories (`skills/agent-assistant/`)
- Platform-specific config files
- Commands directories
- Native agent folders (bundled agents only)

**Preserves:**
- User-created skills in `skills/` directory
- User-modified configurations

### Phase 3: Bundled Agent Cleanup

Only removes agents from the `BUNDLED_AGENTS` list, preserving user-custom agents:

```javascript
function removeBundledAgents(agentsDir) {
    for (const agentFile of BUNDLED_AGENTS) {
        const agentPath = path.join(agentsDir, agentFile);
        if (fs.existsSync(agentPath)) {
            removeFile(agentPath);
        }
    }
    // Cleanup: Remove agents folder if empty
}
```

Empty agent directories are removed after cleanup.

**Source**: `cli/install.js:1185-1209`

### Platform-Specific Uninstallation

| Platform | Uninstallation Function | Removed Items |
|----------|----------------------|---------------|
| Cursor | `uninstallCursor()` | `~/.cursor/rules/agent-assistant.mdc`, `CURSOR.md`, `AGENT.md`, `CLAUDE.md`, commands, framework, agents |
| Copilot | `uninstallCopilot()` | `~/.config/Code/User/prompts/agent-assistant.agent.md`, `COPILOT.md`, framework, commands, agents |
| Antigravity | `uninstallAntigravity()` | `~/.antigravity/workflows/`, `~/.antigravity/agents/`, `GEMINI.md` content, `~/.gemini/agents/`, `~/.gemini/antigravity/global_workflows/`, framework |
| Claude | `uninstallClaude()` | `CLAUDE.md`, commands, agents, framework |
| Codex | `uninstallCodex()` | `CODEX.md`, `AGENTS.md`, `AGENT.md`, commands, agents, framework |

### Uninstallation Output

```
🗑️  Uninstalling Agent Assistant from Cursor...
   This will remove the framework while preserving user skills.

────────────────────────────────────────────────────────────
📊 Uninstallation Summary
────────────────────────────────────────────────────────────
   Tool:        Cursor
   Removed:     8 paths
   Duration:    0.23s
────────────────────────────────────────────────────────────
✅ Uninstallation completed successfully!

   ℹ️  User skills preserved at: ~/.cursor/skills/
```

**Source**: `cli/install.js:1211-1475`

---

## Key Functions

### main()

Orchestrates the overall installation process:

```javascript
async function main() {
    const args = process.argv.slice(2);
    const command = args[0]?.toLowerCase();
    const target = args[1]?.toLowerCase();

    printBanner();

    if (!command || command === 'help') {
        printUsage();
        return;
    }

    switch (command) {
        case 'install':
            // Handle install commands
        case 'uninstall':
            // Handle uninstall commands
        case 'list':
            listTools();
    }
}
```

1. Parse command-line arguments
2. Detect available platforms
3. Dispatch to appropriate handler (install, uninstall, list)
4. Track total files and duration

**Source**: `cli/install.js:1626-1713`

### copyWithReplace(src, dest, replacements, trackProgress)

Recursively copies directory contents with text replacement:

1. Recursively traverses source directory
2. Skips hidden files and `node_modules`
3. Skips symbolic links (security measure)
4. For text files (`.md`, `.txt`, `.json`, `.mdc`, `.yaml`, `.yml`, `.toml`):
   - Reads content
   - Applies replacements in length-sorted order
   - Writes with `fsync` for reliability
5. For binary files: direct copy
6. Tracks all copied files for verification

```javascript
function copyWithReplace(src, dest, replacements = {}, trackProgress = true) {
    const textExtensions = ['.md', '.txt', '.json', '.mdc', '.yaml', '.yml', '.toml'];
    // Sort keys by length (longer first) to prevent partial replacements
    const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);
    // Write with fsync for reliability
    const fd = fs.openSync(destPath, 'w');
    fs.writeSync(fd, content);
    fs.fsyncSync(fd);
    fs.closeSync(fd);
}
```

**Source**: `cli/install.js:347-410`

### copyFileWithReplace(src, dest, replacements, trackProgress)

Copies a single file with content replacement and `fsync` write:

```javascript
const fd = fs.openSync(dest, 'w');
fs.writeSync(fd, content);
fs.fsyncSync(fd);
fs.closeSync(fd);
```

**Source**: `cli/install.js:412-446`

### removeDir(dir, trackProgress)

Removes directory recursively with tracking:

```javascript
fs.rmSync(dir, { recursive: true, force: true });
```

**Source**: `cli/install.js:448-463`

### removeFile(filePath, trackProgress)

Removes a single file with tracking:

```javascript
fs.unlinkSync(filePath);
progressState.removedPaths.push(filePath);
```

**Source**: `cli/install.js:465-483`

### mergeCodexConfig(templatePath, userConfigPath)

Merges Codex configuration with user config using marker-based surgical updates:

1. Extracts `project_doc_fallback_filenames` setting
2. Adds `features.multi_agent = true`
3. Inserts agent configurations between managed markers
4. Preserves existing user settings

```javascript
const markerStart = '# === AGENT-ASSISTANT START ===';
const markerEnd = '# === AGENT-ASSISTANT END ===';
// Removes old section, updates user config, appends managed block
```

**Source**: `cli/install.js:1006-1073`

### verifyInstallation()

Verifies all copied files exist on disk:

```javascript
function verifyInstallation() {
    const verified = [];
    const failed = [];
    for (const filePath of progressState.copiedFiles) {
        if (fs.existsSync(filePath)) {
            verified.push(filePath);
        } else {
            failed.push(filePath);
        }
    }
    return { verified, failed, success: failed.length === 0 };
}
```

**Source**: `cli/install.js:526-545`

### listTools()

Lists all supported tools with installation status:

```
📋 Supported Tools:

  cursor        Cursor AI Editor           ✅ Installed
  copilot      GitHub Copilot in VS Code  ⬚ Not installed
  antigravity  Antigravity (Gemini)        ✅ Installed
  claude       Claude Code                 ⬚ Not installed
  codex        Codex CLI                   ⬚ Not installed
```

**Source**: `cli/install.js:1512-1563`

### estimateInstallFiles()

Estimates total files for installation progress bar:

```javascript
function estimateInstallFiles() {
    let total = 0;
    // Count files in core directories
    for (const dir of CORE_DIRS) { ... }
    // Count skills, agents, commands (2x for backward compat)
    // Add config files estimate
    return total;
}
```

**Source**: `cli/install.js:489-520`

---

## Path Replacement Tokens

The installer resolves platform-specific paths using token replacement:

| Token | Cursor | Copilot | Antigravity | Claude | Codex |
|-------|--------|---------|-------------|--------|-------|
| `~/.{TOOL}/skills/agent-assistant/` | `~/.cursor/skills/agent-assistant/` | `~/.copilot/skills/agent-assistant/` | `~/.gemini/antigravity/skills/agent-assistant/` | `~/.claude/skills/agent-assistant/` | `~/.codex/skills/agent-assistant/` |
| `{TOOL}/agent-assistant/` | `cursor/skills/agent-assistant/` | `copilot/skills/agent-assistant/` | `gemini/antigravity/skills/agent-assistant/` | `claude/skills/agent-assistant/` | `codex/skills/agent-assistant/` |
| `{TOOL}` | `cursor` | `copilot` | `gemini/antigravity` | `claude` | `codex` |
| `{HOME}` | `~` | `~` | `~` | `~` | `~` |
| `~/.agent/` | `~/.cursor/skills/agent-assistant/` | `~/.copilot/skills/agent-assistant/` | `~/.gemini/antigravity/skills/agent-assistant/` | `~/.claude/skills/agent-assistant/` | `~/.codex/skills/agent-assistant/` |

Replacements are sorted by length (longer first) to prevent partial replacements.

**Source**: `cli/install.js:50-168`

---

## Core Directories

The installer copies these directories to each platform's framework folder:

| Directory | Description |
|-----------|-------------|
| `agents/` | Bundled agent definitions (21 agents) |
| `rules/` | Rule files (.mdc) for Cursor |
| `documents/` | Knowledge documentation |
| `commands/` | Command workflows and suggestions |
| `matrix-skills/` | Skill matrix definitions |

Additionally, `commands/` is copied to `workflows/` for backward compatibility.

**Source**: `cli/install.js:170-176`

---

## Bundled Agents

The following agents are installed as part of the framework:

| Category | Agents |
|----------|--------|
| Engineering | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer` |
| Architecture | `database-architect`, `security-engineer` |
| Operations | `devops-engineer`, `performance-engineer` |
| Planning | `planner`, `project-manager`, `business-analyst` |
| Quality | `tester`, `reviewer`, `debugger` |
| Documentation | `docs-manager`, `wiki-architect`, `wiki-extractor`, `wiki-reviewer` |
| Research | `researcher`, `scouter`, `reporter` |
| Design | `designer` |
| Creative | `brainstormer` |

**Source**: `cli/install.js:178-204`

---

## Features

### Progress Tracking

The installer reports progress throughout the installation process, showing which files are being copied and which platforms are being configured.

### fsync Reliability

Files are written with `fsync` to ensure data is flushed to disk before the installer reports success:

```javascript
const fd = fs.openSync(destPath, 'w');
fs.writeSync(fd, content);
fs.fsyncSync(fd);
fs.closeSync(fd);
```

This prevents partial installations from appearing complete.

### Path Replacement

The installer replaces path placeholders (e.g., `{{CURSOR_PATH}}`) with the actual resolved paths for each platform. This enables the same source files to work across all platforms.

### Graceful Platform Detection

If a platform directory doesn't exist, the installer skips it rather than failing. This allows installation across any subset of platforms.

### Security: Symlink Blocking

The installer skips symbolic links to prevent path traversal attacks:

```javascript
if (entry.isSymbolicLink()) {
    if (process.env.DEBUG) {
        console.log(`  ⚠️ Skipping symlink: ${entry.name}`);
    }
    continue;
}
```

### Verification Phase

Post-installation verification confirms all files were written successfully, reporting any failures with file paths.

### Clean Install Pattern

Each platform installation performs a clean install by removing the existing framework directory before copying new files:

```javascript
if (fs.existsSync(tool.paths.agentAssistant)) {
    fs.rmSync(tool.paths.agentAssistant, { recursive: true, force: true });
}
ensureDir(tool.paths.agentAssistant);
```

### Backward Compatibility

The installer maintains backward compatibility by:
- Copying `commands/` to both `commands/` and `workflows/` directories
- Supporting platform aliases (e.g., `gemini` for `antigravity`, `claude-code` for `claude`)

**Source**: `cli/install.js:1662-1667`

---

## Platform Installation Flow (Summary)

```
1. Detect available platforms
   → Check ~/.cursor/, ~/.copilot/, ~/.claude/, ~/.antigravity/, ~/.codex/
2. Read platform configurations
   → Load code-assistants/{platform}/config.toml
3. Resolve path placeholders
   → Replace {{*_PATH}} with actual paths
4. Copy files to each platform
   → agents/, rules/, commands/, skills/, matrix-skills/
5. Verify installation
   → Confirm all files written to disk
6. Report status
   → Per-platform success/failure with statistics
```

---

## Error Handling

Errors are collected and displayed in the summary:

```javascript
function logError(operation, path, error) {
    progressState.errors.push({
        operation,
        path,
        error: error.message || String(error),
        timestamp: new Date().toISOString()
    });
}
```

The installer continues operation on individual file errors, reporting them in the final summary rather than aborting. This design ensures partial installations complete successfully even if individual files fail.

### Error Output Example

```
────────────────────────────────────────────────────────────
📊 Installation Summary
────────────────────────────────────────────────────────────
   Tool:        Cursor
   Files:       510 copied
   Duration:    3.12s
   Verified:    509/510 files
   ⚠️  Failed:    1 files
                 - ~/.cursor/skills/agent-assistant/README.md
────────────────────────────────────────────────────────────
⚠️  Operation completed with warnings. Check errors above.
```

**Source**: `cli/install.js:329-339`, `cli/install.js:581-599`

---

## VS Code Prompts Path Resolution

The installer automatically detects the correct VS Code prompts folder based on the operating system:

```javascript
function getVSCodePromptsFolder() {
    switch (process.platform) {
        case 'win32':
            return path.join(process.env.APPDATA || '', 'Code', 'User', 'prompts');
        case 'darwin':
            return path.join(HOME, 'Library', 'Application Support', 'Code', 'User', 'prompts');
        default:
            return path.join(HOME, '.config', 'Code', 'User', 'prompts');
    }
}
```

| Platform | Path |
|----------|------|
| Windows | `%APPDATA%\Code\User\prompts\` |
| macOS | `~/Library/Application Support/Code/User/prompts/` |
| Linux | `~/.config/Code/User/prompts/` |

**Source**: `cli/install.js:38-48`

---

## Related Pages

- [[Platform System]] — Multi-platform path placeholder system
- [[Getting Started]] — Using the CLI installer
- [[Entry Points]] — Application entry points overview
- [[Command System]] — Command workflow definitions
- [[Agent System]] — Agent definitions and types
- [[Skill System]] — Skill architecture
- [[Configuration Reference]] — Platform configuration details
- [[Skill Tier Reference]] — Agent execution tiers and routing
