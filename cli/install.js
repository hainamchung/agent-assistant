#!/usr/bin/env node

/**
 * Agent Assistant CLI Installer
 * 
 * Installs the Agent Assistant framework for different AI coding tools:
 * - Cursor
 * - GitHub Copilot
 * - Antigravity (Gemini)
 * - Claude Code
 * - Codex
 * 
 * Usage:
 *   npx agent-assistant install [tool]
 *   npx agent-assistant install --all
 *   npx agent-assistant uninstall [tool]
 *   npx agent-assistant list
 * 
 * Features:
 *   - Real-time progress bar with file count
 *   - Verification phase to ensure all files are written
 *   - Proper file system sync for reliability
 *   - Summary report with statistics
 */

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const readline = require('node:readline');

// ============================================================================
// Configuration
// ============================================================================

const HOME = os.homedir();
const ROOT = path.join(__dirname, '..');

// Platform-specific VS Code prompts folder
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

const TOOLS = {
    cursor: {
        name: 'Cursor',
        description: 'Cursor AI Editor',
        paths: {
            editorHome: path.join(HOME, '.cursor'),
            rules: path.join(HOME, '.cursor', 'rules'),
            skills: path.join(HOME, '.cursor', 'skills'),
            agents: path.join(HOME, '.cursor', 'agents'),
            commands: path.join(HOME, '.cursor', 'commands'),
            agentAssistant: path.join(HOME, '.cursor', 'skills', 'agent-assistant'),
        },
        replacements: {
            '~/.{TOOL}/skills/agent-assistant/': '~/.cursor/skills/agent-assistant/',
            '{TOOL}/agent-assistant/': 'cursor/skills/agent-assistant/',
            '{TOOL}': 'cursor',
            '{HOME}': '~',
            '~/.agent/': '~/.cursor/skills/agent-assistant/'
        },
        assets: {
            rules: path.join(ROOT, 'code-assistants', 'cursor-assistant', 'rules'),
            cursorRules: path.join(ROOT, 'code-assistants', 'cursor-assistant', '.cursorrules'),
        }
    },
    copilot: {
        name: 'GitHub Copilot',
        description: 'GitHub Copilot in VS Code',
        paths: {
            home: path.join(HOME, '.copilot'),
            skills: path.join(HOME, '.copilot', 'skills'),
            commands: path.join(HOME, '.copilot', 'commands'),
            agents: path.join(HOME, '.copilot', 'agents'),
            rules: path.join(HOME, '.copilot', 'rules'),
            agentAssistant: path.join(HOME, '.copilot', 'skills', 'agent-assistant'),
            vsCodePrompts: getVSCodePromptsFolder(),
        },
        replacements: {
            '~/.{TOOL}/skills/agent-assistant/': '~/.copilot/skills/agent-assistant/',
            '{TOOL}/agent-assistant/': 'copilot/skills/agent-assistant/',
            '{TOOL}': 'copilot',
            '{HOME}': '~',
            '~/.agent/': '~/.copilot/skills/agent-assistant/'
        },
        assets: {
            agentFile: path.join(ROOT, 'code-assistants', 'copilot-assistant', 'agent-assistant.agent.md'),
        }
    },
    antigravity: {
        name: 'Antigravity (Gemini)',
        description: 'Google Antigravity / Gemini',
        paths: {
            editorHome: path.join(HOME, '.antigravity'),
            gemini: path.join(HOME, '.gemini'),
            antigravity: path.join(HOME, '.gemini', 'antigravity'),
            skills: path.join(HOME, '.gemini', 'antigravity', 'skills'),
            agents: path.join(HOME, '.antigravity', 'agents'), // User accessible agents
            globalAgents: path.join(HOME, '.gemini', 'agents'), // Global config
            workflows: path.join(HOME, '.antigravity', 'workflows'),
            globalWorkflows: path.join(HOME, '.gemini', 'antigravity', 'global_workflows'),
            agentAssistant: path.join(HOME, '.gemini', 'antigravity', 'skills', 'agent-assistant'),
        },
        replacements: {
            '~/.{TOOL}/skills/agent-assistant/': '~/.gemini/antigravity/skills/agent-assistant/',
            '{TOOL}/agent-assistant/': 'gemini/antigravity/skills/agent-assistant/',
            '{TOOL}': 'gemini/antigravity',
            '{HOME}': '~',
            '~/.agent/': '~/.gemini/antigravity/skills/agent-assistant/'
        },
        assets: {
            geminiMd: path.join(ROOT, 'code-assistants', 'antigravity-assistant', 'GEMINI.md'),
            agentFile: path.join(ROOT, 'code-assistants', 'antigravity-assistant', 'AntigravityGlobal.agent.md'),
        }
    },
    claude: {
        name: 'Claude Code',
        description: 'Anthropic Claude CLI',
        paths: {
            home: path.join(HOME, '.claude'),
            skills: path.join(HOME, '.claude', 'skills'),
            commands: path.join(HOME, '.claude', 'commands'),
            agents: path.join(HOME, '.claude', 'agents'),
            agentAssistant: path.join(HOME, '.claude', 'skills', 'agent-assistant'),
        },
        replacements: {
            '~/.{TOOL}/skills/agent-assistant/': '~/.claude/skills/agent-assistant/',
            '{TOOL}/agent-assistant/': 'claude/skills/agent-assistant/',
            '{TOOL}': 'claude',
            '{HOME}': '~',
            '~/.agent/': '~/.claude/skills/agent-assistant/'
        },
        assets: {
            claudeMd: path.join(ROOT, 'code-assistants', 'claude-assistant', 'CLAUDE.md'),
        }
    },
    codex: {
        name: 'Codex',
        description: 'OpenAI Codex CLI',
        paths: {
            home: path.join(HOME, '.codex'),
            skills: path.join(HOME, '.codex', 'skills'),
            commands: path.join(HOME, '.codex', 'commands'),
            agents: path.join(HOME, '.codex', 'agents'),
            agentAssistant: path.join(HOME, '.codex', 'skills', 'agent-assistant'),
        },
        replacements: {
            '~/.{TOOL}/skills/agent-assistant/': '~/.codex/skills/agent-assistant/',
            '{TOOL}/agent-assistant/': 'codex/skills/agent-assistant/',
            '{TOOL}': 'codex',
            '{HOME}': '~',
            '~/.agent/': '~/.codex/skills/agent-assistant/'
        },
        assets: {
            codexMd: path.join(ROOT, 'code-assistants', 'codex-assistant', 'CODEX.md'),
            configToml: path.join(ROOT, 'code-assistants', 'codex-assistant', 'config.toml'),
            agentTomlDir: path.join(ROOT, 'code-assistants', 'codex-assistant', 'agents'),
            commandSkillsDir: path.join(ROOT, 'code-assistants', 'codex-assistant', 'skills'),
        }
    }
};

// Core directories to copy for agent-assistant framework
// Note: 'workflows' used to exist but was merged into 'rules'
// We copy 'commands' to both 'commands' and 'workflows' for backward compatibility
const CORE_DIRS = ['agents', 'rules', 'documents', 'commands', 'matrix-skills'];

// Root files to copy
const ROOT_FILES = ['README.md'];

// List of bundled agent names (for cleanup - only remove our agents, keep user-custom)
const BUNDLED_AGENTS = [
    'backend-engineer.md',
    'brainstormer.md',
    'business-analyst.md',
    'database-architect.md',
    'debugger.md',
    'designer.md',
    'devops-engineer.md',
    'docs-manager.md',
    'frontend-engineer.md',
    'game-engineer.md',
    'mobile-engineer.md',
    'performance-engineer.md',
    'planner.md',
    'project-manager.md',
    'researcher.md',
    'reviewer.md',
    'scouter.md',
    'security-engineer.md',
    'tech-lead.md',
    'tester.md',
];

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Progress tracking state
 */
const progressState = {
    total: 0,
    current: 0,
    phase: '',
    errors: [],
    startTime: 0,
    copiedFiles: [],
    removedPaths: [],
    lastDraw: 0,          // Throttle draws
    lastPercent: -1       // Track last drawn percent
};

// Check if stdout is a TTY (interactive terminal)
const isTTY = process.stdout.isTTY;

/**
 * Reset progress state for new operation
 */
function resetProgress() {
    progressState.total = 0;
    progressState.current = 0;
    progressState.phase = '';
    progressState.errors = [];
    progressState.startTime = Date.now();
    progressState.copiedFiles = [];
    progressState.removedPaths = [];
    progressState.lastDraw = 0;
    progressState.lastPercent = -1;
}

/**
 * Count total files in a directory (for progress estimation)
 */
function countFiles(dir) {
    if (!fs.existsSync(dir)) return 0;
    let count = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        if (entry.isSymbolicLink()) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            count += countFiles(fullPath);
        } else {
            count++;
        }
    }
    return count;
}

/**
 * Draw progress bar in terminal (real-time single line update)
 * @param {number} current - Current progress
 * @param {number} total - Total items
 * @param {boolean} force - Force draw regardless of throttle
 */
function drawProgress(current, total, force = false) {
    if (total === 0) return;
    
    const percent = Math.min(100, Math.round((current / total) * 100));
    const now = Date.now();
    
    // Throttle: only draw every 50ms OR when percent changes OR forced
    if (!force && percent === progressState.lastPercent && (now - progressState.lastDraw) < 50) {
        return;
    }
    
    progressState.lastDraw = now;
    progressState.lastPercent = percent;
    
    const width = 40;
    const filled = Math.round((percent / 100) * width);
    const empty = width - filled;
    
    // Unicode progress bar characters
    const filledChar = '█';
    const emptyChar = '░';
    
    const bar = filledChar.repeat(filled) + emptyChar.repeat(empty);
    const stats = `${current.toLocaleString()}/${total.toLocaleString()}`;
    const elapsed = ((now - progressState.startTime) / 1000).toFixed(1);
    
    const line = `  ${bar} ${percent}% (${stats}) ${elapsed}s`;
    
    if (isTTY) {
        // Real TTY: clear line and rewrite on same line
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(line);
    } else {
        // Non-TTY (piped): only print on percent milestones
        if (percent % 10 === 0 && percent !== progressState.lastPercent) {
            console.log(line);
        }
    }
}

/**
 * Update progress counter (no draw - for batch updates)
 */
function updateProgress(phase) {
    progressState.current++;
    progressState.phase = phase;
    drawProgress(progressState.current, progressState.total);
}

/**
 * Complete progress bar and move to next line
 */
function completeProgress() {
    if (progressState.total > 0) {
        drawProgress(progressState.total, progressState.total, true);
        console.log(''); // New line after progress bar
    }
}

/**
 * Log error to progress state
 */
function logError(operation, path, error) {
    progressState.errors.push({
        operation,
        path,
        error: error.message || String(error),
        timestamp: new Date().toISOString()
    });
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function copyWithReplace(src, dest, replacements = {}, trackProgress = true) {
    if (!fs.existsSync(src)) return 0;
    ensureDir(dest);
    let count = 0;

    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        // Skip hidden files and node_modules
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        
        // Skip symbolic links for security (prevents path traversal attacks)
        if (entry.isSymbolicLink()) {
            if (process.env.DEBUG) {
                console.log(`  ⚠️ Skipping symlink: ${entry.name}`);
            }
            continue;
        }

        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            count += copyWithReplace(srcPath, destPath, replacements, trackProgress);
        } else {
            try {
                // Apply replacements for text files
                const textExtensions = ['.md', '.txt', '.json', '.mdc', '.yaml', '.yml', '.toml'];
                const ext = path.extname(entry.name).toLowerCase();

                if (textExtensions.includes(ext)) {
                    let content = fs.readFileSync(srcPath, 'utf8');
                    // Sort keys by length (longer first) to prevent partial replacements
                    const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);
                    for (const search of keys) {
                        content = content.replaceAll(search, replacements[search]);
                    }
                    // Write with fsync for reliability
                    const fd = fs.openSync(destPath, 'w');
                    fs.writeSync(fd, content);
                    fs.fsyncSync(fd);
                    fs.closeSync(fd);
                } else {
                    fs.copyFileSync(srcPath, destPath);
                }
                
                // Track copied file for verification
                progressState.copiedFiles.push(destPath);
                
                // Update progress
                if (trackProgress) {
                    updateProgress(entry.name);
                }
                
                count++;
            } catch (e) {
                logError('copy', srcPath, e);
                if (process.env.DEBUG) {
                    console.warn(`\n  ⚠️ Could not copy ${entry.name}: ${e.message}`);
                }
            }
        }
    }
    return count;
}

function copyFileWithReplace(src, dest, replacements = {}, trackProgress = true) {
    if (!fs.existsSync(src)) return false;

    ensureDir(path.dirname(dest));

    try {
        let content = fs.readFileSync(src, 'utf8');
        const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);
        for (const search of keys) {
            content = content.replaceAll(search, replacements[search]);
        }
        
        // Write with fsync for reliability
        const fd = fs.openSync(dest, 'w');
        fs.writeSync(fd, content);
        fs.fsyncSync(fd);
        fs.closeSync(fd);
        
        // Track copied file for verification
        progressState.copiedFiles.push(dest);
        
        // Update progress
        if (trackProgress) {
            updateProgress(path.basename(dest));
        }
        
        return true;
    } catch (e) {
        logError('copy', src, e);
        if (process.env.DEBUG) {
            console.warn(`\n  ⚠️ Could not copy ${path.basename(src)}: ${e.message}`);
        }
        return false;
    }
}

function removeDir(dir, trackProgress = true) {
    if (fs.existsSync(dir)) {
        try {
            fs.rmSync(dir, { recursive: true, force: true });
            progressState.removedPaths.push(dir);
            if (trackProgress) {
                updateProgress(`Removed ${path.basename(dir)}`);
            }
            return true;
        } catch (e) {
            logError('remove', dir, e);
            return false;
        }
    }
    return false;
}

/**
 * Remove a single file with tracking
 */
function removeFile(filePath, trackProgress = true) {
    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            progressState.removedPaths.push(filePath);
            if (trackProgress) {
                updateProgress(`Removed ${path.basename(filePath)}`);
            }
            return true;
        } catch (e) {
            logError('remove', filePath, e);
            return false;
        }
    }
    return false;
}

function formatNumber(num) {
    return num.toLocaleString();
}

/**
 * Estimate total files for installation
 */
function estimateInstallFiles() {
    let total = 0;
    
    // Count files in core directories
    for (const dir of CORE_DIRS) {
        const srcDir = path.join(ROOT, dir);
        total += countFiles(srcDir);
    }
    
    // Count skills
    const skillsDir = path.join(ROOT, 'skills');
    total += countFiles(skillsDir);
    
    // Count agents
    const agentsDir = path.join(ROOT, 'agents');
    total += countFiles(agentsDir);
    
    // Commands (copied twice - once to commands, once to workflows for backward compat)
    const commandsDir = path.join(ROOT, 'commands');
    total += countFiles(commandsDir) * 2;
    
    // Root files
    total += ROOT_FILES.length;
    
    // Config files (estimate)
    total += 5;
    
    return total;
}

/**
 * Verify installation by checking copied files exist
 * @returns {Object} Verification result
 */
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
    
    return {
        total: progressState.copiedFiles.length,
        verified: verified.length,
        failed: failed.length,
        failedPaths: failed,
        success: failed.length === 0
    };
}

/**
 * Print summary report
 */
function printSummary(toolName, operation = 'install') {
    const duration = ((Date.now() - progressState.startTime) / 1000).toFixed(2);
    const verification = operation === 'install' ? verifyInstallation() : null;
    
    console.log('\n' + '─'.repeat(60));
    console.log(`📊 ${operation === 'install' ? 'Installation' : 'Uninstallation'} Summary`);
    console.log('─'.repeat(60));
    
    if (operation === 'install') {
        console.log(`   Tool:        ${toolName}`);
        console.log(`   Files:       ${formatNumber(progressState.copiedFiles.length)} copied`);
        console.log(`   Duration:    ${duration}s`);
        
        if (verification) {
            console.log(`   Verified:    ${verification.verified}/${verification.total} files`);
            if (verification.failed > 0) {
                console.log(`   ⚠️  Failed:    ${verification.failed} files`);
                verification.failedPaths.slice(0, 5).forEach(p => {
                    console.log(`                 - ${p}`);
                });
                if (verification.failedPaths.length > 5) {
                    console.log(`                 ... and ${verification.failedPaths.length - 5} more`);
                }
            }
        }
    } else {
        console.log(`   Tool:        ${toolName}`);
        console.log(`   Removed:     ${formatNumber(progressState.removedPaths.length)} paths`);
        console.log(`   Duration:    ${duration}s`);
    }
    
    if (progressState.errors.length > 0) {
        console.log(`   ⚠️  Errors:    ${progressState.errors.length}`);
        progressState.errors.slice(0, 3).forEach(e => {
            console.log(`                 - ${e.operation}: ${path.basename(e.path)} (${e.error})`);
        });
        if (progressState.errors.length > 3) {
            console.log(`                 ... and ${progressState.errors.length - 3} more`);
        }
    }
    
    console.log('─'.repeat(60));
    
    if (operation === 'install' && verification && verification.success && progressState.errors.length === 0) {
        console.log('✅ Installation completed successfully!');
    } else if (operation === 'uninstall' && progressState.errors.length === 0) {
        console.log('✅ Uninstallation completed successfully!');
    } else {
        console.log('⚠️  Operation completed with warnings. Check errors above.');
    }
}

// ============================================================================
// Installation Functions
// ============================================================================

function installCursor() {
    const tool = TOOLS.cursor;
    
    // Reset and estimate progress
    resetProgress();
    progressState.total = estimateInstallFiles();
    
    console.log(`\n📦 Installing Agent Assistant for ${tool.name}...`);
    console.log(`   Estimated files: ~${formatNumber(progressState.total)}\n`);

    let total = 0;

    // --- 1. INSTALL EDITOR CONFIG (~/.cursor) ---
    // 1.1 Global MDCs (Rules)
    if (tool.assets.rules && fs.existsSync(tool.assets.rules)) {
        total += copyWithReplace(tool.assets.rules, tool.paths.rules, tool.replacements);
    }

    // 1.2 Global Commands (Suggestions)
    total += copyWithReplace(path.join(ROOT, 'commands'), tool.paths.commands, tool.replacements);

    // --- 1.2 Global Config Files (CURSOR.md, AGENT.md, CLAUDE.md) ---
    // We want CURSOR.md, AGENT.md, CLAUDE.md in ~/.cursor/
    // .cursorrules from extension becomes CURSOR.md
    if (tool.assets.cursorRules && fs.existsSync(tool.assets.cursorRules)) {
        const destFile = path.join(tool.paths.editorHome, 'CURSOR.md');
        if (copyFileWithReplace(tool.assets.cursorRules, destFile, tool.replacements)) total++;
    }

    // AGENT.md, CLAUDE.md
    const globalFiles = ['AGENT.md', 'CLAUDE.md'];
    for (const file of globalFiles) {
        const src = path.join(ROOT, file);
        const dest = path.join(tool.paths.editorHome, file);
        if (fs.existsSync(src)) {
            if (copyFileWithReplace(src, dest, tool.replacements)) total++;
        }
    }

    // --- 2. INSTALL EXTENSION BRAIN (~/.cursor/skills/agent-assistant) ---
    // Clean install - remove old framework
    if (fs.existsSync(tool.paths.agentAssistant)) {
        fs.rmSync(tool.paths.agentAssistant, { recursive: true, force: true });
    }
    ensureDir(tool.paths.agentAssistant);

    // Copy all core directories
    for (const dir of CORE_DIRS) {
        const srcDir = path.join(ROOT, dir);
        if (fs.existsSync(srcDir)) {
            total += copyWithReplace(srcDir, path.join(tool.paths.agentAssistant, dir), tool.replacements);
        }
    }

    // Also copy 'commands' to 'workflows' for backward compatibility
    const commandsSrc = path.join(ROOT, 'commands');
    if (fs.existsSync(commandsSrc)) {
        total += copyWithReplace(commandsSrc, path.join(tool.paths.agentAssistant, 'workflows'), tool.replacements);
    }

    // Copy root files (README.md, etc.)
    for (const file of ROOT_FILES) {
        const srcFile = path.join(ROOT, file);
        if (fs.existsSync(srcFile)) {
            if (copyFileWithReplace(srcFile, path.join(tool.paths.agentAssistant, file), tool.replacements)) {
                total++;
            }
        }
    }

    // --- 3. INSTALL USER SKILLS (~/.cursor/skills/) ---
    total += copyWithReplace(path.join(ROOT, 'skills'), tool.paths.skills, tool.replacements);

    // --- 4. NATIVE SUBAGENT SUPPORT (~/.cursor/agents/) ---
    // Only copy bundled agents (merge/update)
    total += copyWithReplace(path.join(ROOT, 'agents'), tool.paths.agents, tool.replacements);

    // Complete progress bar
    completeProgress();
    
    // Print summary with verification
    printSummary(tool.name, 'install');
    
    console.log(`\n   📁 Paths:`);
    console.log(`      Rules:          ${tool.paths.rules}`);
    console.log(`      Commands:       ${tool.paths.commands}`);
    console.log(`      Core Framework: ${tool.paths.agentAssistant}`);
    console.log(`      Skills:         ${tool.paths.skills}`);
    console.log(`      Native Agents:  ${tool.paths.agents}`);

    return total;
}

function installCopilot() {
    const tool = TOOLS.copilot;
    
    // Reset and estimate progress
    resetProgress();
    progressState.total = estimateInstallFiles();
    
    console.log(`\n📦 Installing Agent Assistant for ${tool.name}...`);
    console.log(`   Estimated files: ~${formatNumber(progressState.total)}\n`);

    let total = 0;

    // --- 1. INSTALL TO VS CODE PROMPTS & GLOBAL CONFIG ---
    if (tool.assets.agentFile && fs.existsSync(tool.assets.agentFile)) {
        // 1.1 Custom Prompt (VS Code) -> agent-assistant.agent.md
        ensureDir(tool.paths.vsCodePrompts);
        const promptDest = path.join(tool.paths.vsCodePrompts, 'agent-assistant.agent.md');
        if (copyFileWithReplace(tool.assets.agentFile, promptDest, tool.replacements)) {
            total++;
        }
    }

    // --- 1.2 Global Config Files (COPILOT.md, AGENT.md, CLAUDE.md) ---
    ensureDir(tool.paths.home);
    const globalFiles = ['COPILOT.md', 'AGENT.md', 'CLAUDE.md'];
    for (const file of globalFiles) {
        const src = path.join(ROOT, file);
        const dest = path.join(tool.paths.home, file);
        if (fs.existsSync(src)) {
            if (copyFileWithReplace(src, dest, tool.replacements)) {
                total++;
            }
        }
    }

    // --- 2. INSTALL CORE FRAMEWORK (~/.copilot/skills/agent-assistant) ---
    // Clean install - remove old framework
    if (fs.existsSync(tool.paths.agentAssistant)) {
        fs.rmSync(tool.paths.agentAssistant, { recursive: true, force: true });
    }
    ensureDir(tool.paths.agentAssistant);

    // Copy all core directories
    for (const dir of CORE_DIRS) {
        const srcDir = path.join(ROOT, dir);
        if (fs.existsSync(srcDir)) {
            total += copyWithReplace(srcDir, path.join(tool.paths.agentAssistant, dir), tool.replacements);
        }
    }

    // Install commands to ~/.copilot/commands
    if (fs.existsSync(path.join(ROOT, 'commands'))) {
        ensureDir(tool.paths.commands);
        total += copyWithReplace(path.join(ROOT, 'commands'), tool.paths.commands, tool.replacements);
    }

    // Also copy 'commands' to 'workflows' for backward compatibility
    const commandsSrc = path.join(ROOT, 'commands');
    if (fs.existsSync(commandsSrc)) {
        total += copyWithReplace(commandsSrc, path.join(tool.paths.agentAssistant, 'workflows'), tool.replacements);
    }

    // Copy root files (README.md, etc.)
    for (const file of ROOT_FILES) {
        const srcFile = path.join(ROOT, file);
        if (fs.existsSync(srcFile)) {
            if (copyFileWithReplace(srcFile, path.join(tool.paths.agentAssistant, file), tool.replacements)) {
                total++;
            }
        }
    }

    // --- 3. INSTALL USER SKILLS (~/.copilot/skills/) ---
    total += copyWithReplace(path.join(ROOT, 'skills'), tool.paths.skills, tool.replacements);

    // --- 4. NATIVE SUBAGENT SUPPORT (~/.copilot/agents/) ---
    ensureDir(tool.paths.agents);
    total += copyWithReplace(path.join(ROOT, 'agents'), tool.paths.agents, tool.replacements);

    // Complete progress bar
    completeProgress();
    
    // Print summary with verification
    printSummary(tool.name, 'install');
    
    console.log(`\n   📁 Paths:`);
    console.log(`      VS Code Prompts: ${tool.paths.vsCodePrompts}`);
    console.log(`      Global Config:   ${tool.paths.home}`);
    console.log(`      Commands:        ${tool.paths.commands}`);
    console.log(`      Core Framework:  ${tool.paths.agentAssistant}`);
    console.log(`      Skills:          ${tool.paths.skills}`);
    console.log(`      Native Agents:   ${tool.paths.agents}`);

    return total;
}

function installAntigravity() {
    const tool = TOOLS.antigravity;
    
    // Reset and estimate progress
    resetProgress();
    progressState.total = estimateInstallFiles() * 1.5; // Antigravity has more destinations
    
    console.log(`\n📦 Installing Agent Assistant for ${tool.name}...`);
    console.log(`   Estimated files: ~${formatNumber(Math.round(progressState.total))}\n`);

    let total = 0;

    // --- 1. INSTALL EDITOR CONFIG (~/.antigravity) ---
    // 1.1 Workflows (from commands) -> ~/.antigravity/workflows
    ensureDir(tool.paths.workflows);
    total += copyWithReplace(path.join(ROOT, 'commands'), tool.paths.workflows, tool.replacements);

    // 1.2 Agents -> ~/.antigravity/agents
    ensureDir(tool.paths.agents);
    total += copyWithReplace(path.join(ROOT, 'agents'), tool.paths.agents, tool.replacements);


    // --- 2. INSTALL PLATFORM CONFIG (~/.gemini) ---
    ensureDir(tool.paths.gemini);

    // 2.1 GEMINI.md
    if (tool.assets.geminiMd && fs.existsSync(tool.assets.geminiMd)) {
        const destFile = path.join(tool.paths.gemini, 'GEMINI.md');
        // Simple overwrite or append logic here, simpler than surgical for now to match extension
        const MARKER_START = '<!-- AGENT-ASSISTANT-START -->';
        const MARKER_END = '<!-- AGENT-ASSISTANT-END -->';

        let bundledContent = fs.readFileSync(tool.assets.geminiMd, 'utf8');
        const keys = Object.keys(tool.replacements).sort((a, b) => b.length - a.length);
        for (const search of keys) {
            bundledContent = bundledContent.replaceAll(search, tool.replacements[search]);
        }

        const wrappedContent = `${MARKER_START}\n${bundledContent}\n${MARKER_END}`;
        let existingContent = '';
        if (fs.existsSync(destFile)) existingContent = fs.readFileSync(destFile, 'utf8');

        if (existingContent.includes(MARKER_START)) {
            const regex = new RegExp(`${MARKER_START}[\\s\\S]*?${MARKER_END}`, 'g');
            const fd = fs.openSync(destFile, 'w');
            fs.writeSync(fd, existingContent.replace(regex, wrappedContent));
            fs.fsyncSync(fd);
            fs.closeSync(fd);
        } else {
            const separator = existingContent.trim() === '' ? '' : '\n\n';
            const fd = fs.openSync(destFile, 'w');
            fs.writeSync(fd, existingContent + separator + wrappedContent);
            fs.fsyncSync(fd);
            fs.closeSync(fd);
        }
        progressState.copiedFiles.push(destFile);
        updateProgress('GEMINI.md');
        total++;
    }

    // 2.2 Global Config Files (AGENT.md, CLAUDE.md)
    const globalFiles = ['AGENT.md', 'CLAUDE.md'];
    for (const file of globalFiles) {
        const src = path.join(ROOT, file);
        const dest = path.join(tool.paths.gemini, file);
        if (fs.existsSync(src)) {
            if (copyFileWithReplace(src, dest, tool.replacements)) total++;
        }
    }

    // 2.3 Global Agents (~/.gemini/agents)
    ensureDir(tool.paths.globalAgents);

    // AntigravityGlobal.agent.md
    if (tool.assets.agentFile && fs.existsSync(tool.assets.agentFile)) {
        const destFile = path.join(tool.paths.globalAgents, 'AntigravityGlobal.agent.md');
        if (copyFileWithReplace(tool.assets.agentFile, destFile, tool.replacements)) total++;
    }

    // Other Agents
    total += copyWithReplace(path.join(ROOT, 'agents'), tool.paths.globalAgents, tool.replacements);


    // --- 3. INSTALL EXTENSION BRAIN (~/.gemini/antigravity) ---
    // 3.1 Global Workflows (~/.gemini/antigravity/global_workflows)
    ensureDir(tool.paths.globalWorkflows);
    total += copyWithReplace(path.join(ROOT, 'commands'), tool.paths.globalWorkflows, tool.replacements);

    // 3.2 Core Framework (~/.gemini/antigravity/skills/agent-assistant)
    if (fs.existsSync(tool.paths.agentAssistant)) {
        fs.rmSync(tool.paths.agentAssistant, { recursive: true, force: true });
    }
    ensureDir(tool.paths.agentAssistant);

    for (const dir of CORE_DIRS) {
        const srcDir = path.join(ROOT, dir);
        if (fs.existsSync(srcDir)) {
            total += copyWithReplace(srcDir, path.join(tool.paths.agentAssistant, dir), tool.replacements);
        }
    }

    // Backward compat workflows
    const commandsSrc = path.join(ROOT, 'commands');
    if (fs.existsSync(commandsSrc)) {
        total += copyWithReplace(commandsSrc, path.join(tool.paths.agentAssistant, 'workflows'), tool.replacements);
    }

    for (const file of ROOT_FILES) {
        const srcFile = path.join(ROOT, file);
        if (fs.existsSync(srcFile)) {
            if (copyFileWithReplace(srcFile, path.join(tool.paths.agentAssistant, file), tool.replacements)) total++;
        }
    }

    // 3.3 Skills (~/.gemini/antigravity/skills)
    total += copyWithReplace(path.join(ROOT, 'skills'), tool.paths.skills, tool.replacements);

    // Complete progress bar
    completeProgress();
    
    // Print summary with verification
    printSummary(tool.name, 'install');
    
    console.log(`\n   📁 Paths:`);
    console.log(`      Editor Config:   ${tool.paths.editorHome}`);
    console.log(`      Platform Config: ${tool.paths.gemini}`);
    console.log(`      Extension Brain: ${tool.paths.antigravity}`);

    return total;
}

function installClaude() {
    const tool = TOOLS.claude;
    
    // Reset and estimate progress
    resetProgress();
    progressState.total = estimateInstallFiles();
    
    console.log(`\n📦 Installing Agent Assistant for ${tool.name}...`);
    console.log(`   Estimated files: ~${formatNumber(progressState.total)}\n`);

    let total = 0;

    // --- 1. INSTALL GLOBAL CONFIG (~/.claude) ---
    ensureDir(tool.paths.home);

    // 1.1 Global Config Files (CLAUDE.md, AGENT.md)
    if (tool.assets.claudeMd && fs.existsSync(tool.assets.claudeMd)) {
        const destFile = path.join(tool.paths.home, 'CLAUDE.md');
        if (copyFileWithReplace(tool.assets.claudeMd, destFile, tool.replacements)) total++;
    }
    
    // Copy AGENT.md as well
    const agentMdSrc = path.join(ROOT, 'AGENT.md');
    if (fs.existsSync(agentMdSrc)) {
        const agentMdDest = path.join(tool.paths.home, 'AGENT.md');
        if (copyFileWithReplace(agentMdSrc, agentMdDest, tool.replacements)) total++;
    }

    // 1.2 Commands (~/.claude/commands)
    ensureDir(tool.paths.commands);
    total += copyWithReplace(path.join(ROOT, 'commands'), tool.paths.commands, tool.replacements);

    // 1.3 Native Agents (~/.claude/agents)
    ensureDir(tool.paths.agents);
    total += copyWithReplace(path.join(ROOT, 'agents'), tool.paths.agents, tool.replacements);

    // --- 2. INSTALL CORE FRAMEWORK (~/.claude/skills/agent-assistant) ---
    if (fs.existsSync(tool.paths.agentAssistant)) {
        fs.rmSync(tool.paths.agentAssistant, { recursive: true, force: true });
    }
    ensureDir(tool.paths.agentAssistant);

    for (const dir of CORE_DIRS) {
        const srcDir = path.join(ROOT, dir);
        if (fs.existsSync(srcDir)) {
            total += copyWithReplace(srcDir, path.join(tool.paths.agentAssistant, dir), tool.replacements);
        }
    }

    // Copy backward compat workflows
    const commandsSrc = path.join(ROOT, 'commands');
    if (fs.existsSync(commandsSrc)) {
        total += copyWithReplace(commandsSrc, path.join(tool.paths.agentAssistant, 'workflows'), tool.replacements);
    }

    // Copy root files
    for (const file of ROOT_FILES) {
        const srcFile = path.join(ROOT, file);
        if (fs.existsSync(srcFile)) {
            if (copyFileWithReplace(srcFile, path.join(tool.paths.agentAssistant, file), tool.replacements)) total++;
        }
    }

    // --- 3. INSTALL SKILLS (~/.claude/skills) ---
    total += copyWithReplace(path.join(ROOT, 'skills'), tool.paths.skills, tool.replacements);

    // Complete progress bar
    completeProgress();
    
    // Print summary with verification
    printSummary(tool.name, 'install');
    
    console.log(`\n   📁 Paths:`);
    console.log(`      Home:     ${tool.paths.home}`);
    console.log(`      Commands: ${tool.paths.commands}`);
    console.log(`      Skills:   ${tool.paths.skills}`);

    return total;
}

function mergeCodexConfig(templatePath, userConfigPath) {
    // Read template
    const template = fs.readFileSync(templatePath, 'utf8');

    // Read existing user config or empty string
    let userConfig = '';
    if (fs.existsSync(userConfigPath)) {
        userConfig = fs.readFileSync(userConfigPath, 'utf8');
    }

    // Our marker: lines between start and end markers
    const markerStart = '# === AGENT-ASSISTANT START ===';
    const markerEnd = '# === AGENT-ASSISTANT END ===';

    // Remove old agent-assistant sections from user config
    const startIdx = userConfig.indexOf(markerStart);
    const endIdx = userConfig.indexOf(markerEnd);
    if (startIdx !== -1 && endIdx !== -1) {
        userConfig = userConfig.substring(0, startIdx).trimEnd() + '\n' +
                    userConfig.substring(endIdx + markerEnd.length).trimStart();
    }

    // Update or add project_doc_fallback_filenames in user config
    const docFallback = 'project_doc_fallback_filenames = ["AGENT.md", "CODEX.md", "AGENTS.md", ".agents.md"]';
    if (userConfig.includes('project_doc_fallback_filenames')) {
        userConfig = userConfig.replace(/project_doc_fallback_filenames\s*=\s*\[.*?\]/s, docFallback);
    } else {
        // Prepend before first section header or at end of top-level keys
        const firstSection = userConfig.indexOf('\n[');
        if (firstSection !== -1) {
            userConfig = userConfig.substring(0, firstSection) + '\n' + docFallback + '\n' + userConfig.substring(firstSection);
        } else {
            userConfig = userConfig.trimEnd() + '\n' + docFallback + '\n';
        }
    }

    // Build our managed block
    let managedBlock = `\n${markerStart}\n`;
    managedBlock += '# Managed by Agent Assistant — do not edit manually\n\n';

    // Add [features] if not present
    if (!userConfig.includes('[features]')) {
        managedBlock += '[features]\nmulti_agent = true\n\n';
    } else if (!userConfig.includes('multi_agent')) {
        // Need to add multi_agent to existing [features]
        userConfig = userConfig.replace('[features]', '[features]\nmulti_agent = true');
    }

    // Add agents config (always from template)
    // Extract everything from [agents] onward in template
    const agentsSectionMatch = template.match(/(\[agents\][\s\S]*)/);
    if (agentsSectionMatch) {
        managedBlock += agentsSectionMatch[1] + '\n';
    }

    managedBlock += `${markerEnd}\n`;

    // Append managed block to user config
    const finalConfig = userConfig.trimEnd() + '\n' + managedBlock;

    // Write with fsync
    const fd = fs.openSync(userConfigPath, 'w');
    fs.writeSync(fd, finalConfig);
    fs.fsyncSync(fd);
    fs.closeSync(fd);

    return true;
}

function installCodex() {
    const tool = TOOLS.codex;
    
    // Reset and estimate progress
    resetProgress();
    progressState.total = estimateInstallFiles();
    
    console.log(`\n📦 Installing Agent Assistant for ${tool.name}...`);
    console.log(`   Estimated files: ~${formatNumber(progressState.total)}\n`);

    let total = 0;

    // --- 1. INSTALL GLOBAL CONFIG (~/.codex) ---
    ensureDir(tool.paths.home);

    // 1.1 Global Config Files (AGENTS.md, CODEX.md, AGENT.md)
    if (tool.assets.codexMd && fs.existsSync(tool.assets.codexMd)) {
        const destFile = path.join(tool.paths.home, 'CODEX.md');
        if (copyFileWithReplace(tool.assets.codexMd, destFile, tool.replacements)) total++;

        // Codex discovers global instructions from ~/.codex/AGENTS.md.
        const agentsDestFile = path.join(tool.paths.home, 'AGENTS.md');
        if (copyFileWithReplace(tool.assets.codexMd, agentsDestFile, tool.replacements)) total++;
    }
    
    // Copy AGENT.md as well
    const agentMdSrc = path.join(ROOT, 'AGENT.md');
    if (fs.existsSync(agentMdSrc)) {
        const agentMdDest = path.join(tool.paths.home, 'AGENT.md');
        if (copyFileWithReplace(agentMdSrc, agentMdDest, tool.replacements)) total++;
    }

    // 1.2 Codex-native TOML agent configs (~/.codex/agents/)
    ensureDir(tool.paths.agents);
    if (tool.assets.agentTomlDir && fs.existsSync(tool.assets.agentTomlDir)) {
        total += copyWithReplace(tool.assets.agentTomlDir, tool.paths.agents, tool.replacements);
        console.log(`   ✅ Installed ${fs.readdirSync(tool.assets.agentTomlDir).filter(f => f.endsWith('.toml')).length} Codex agent roles (TOML)`);
    }

    // 1.3 Merge config.toml (agents + features into user config)
    if (tool.assets.configToml && fs.existsSync(tool.assets.configToml)) {
        const userConfigPath = path.join(tool.paths.home, 'config.toml');
        if (mergeCodexConfig(tool.assets.configToml, userConfigPath)) {
            total++;
            console.log(`   ✅ Merged agent config into ${userConfigPath}`);
        }
    }

    // 1.4 Commands (~/.codex/commands — for backward compat)
    ensureDir(tool.paths.commands);
    total += copyWithReplace(path.join(ROOT, 'commands'), tool.paths.commands, tool.replacements);

    // --- 2. INSTALL CORE FRAMEWORK (~/.codex/skills/agent-assistant) ---
    if (fs.existsSync(tool.paths.agentAssistant)) {
        fs.rmSync(tool.paths.agentAssistant, { recursive: true, force: true });
    }
    ensureDir(tool.paths.agentAssistant);

    for (const dir of CORE_DIRS) {
        const srcDir = path.join(ROOT, dir);
        if (fs.existsSync(srcDir)) {
            total += copyWithReplace(srcDir, path.join(tool.paths.agentAssistant, dir), tool.replacements);
        }
    }

    // Copy backward compat workflows
    const commandsSrc = path.join(ROOT, 'commands');
    if (fs.existsSync(commandsSrc)) {
        total += copyWithReplace(commandsSrc, path.join(tool.paths.agentAssistant, 'workflows'), tool.replacements);
    }

    // Copy root files
    for (const file of ROOT_FILES) {
        const srcFile = path.join(ROOT, file);
        if (fs.existsSync(srcFile)) {
            if (copyFileWithReplace(srcFile, path.join(tool.paths.agentAssistant, file), tool.replacements)) total++;
        }
    }

    // --- 3. INSTALL SKILLS (~/.codex/skills) ---
    total += copyWithReplace(path.join(ROOT, 'skills'), tool.paths.skills, tool.replacements);

    // 3.1 Install Codex-specific command skills (from codex-assistant/skills/)
    if (tool.assets.commandSkillsDir && fs.existsSync(tool.assets.commandSkillsDir)) {
        total += copyWithReplace(tool.assets.commandSkillsDir, tool.paths.skills, tool.replacements);
        const cmdSkillCount = fs.readdirSync(tool.assets.commandSkillsDir)
            .filter(f => fs.statSync(path.join(tool.assets.commandSkillsDir, f)).isDirectory()).length;
        console.log(`   ✅ Installed ${cmdSkillCount} command skills (Codex-native)`);
    }

    // Complete progress bar
    completeProgress();
    
    // Print summary with verification
    printSummary(tool.name, 'install');
    
    console.log(`\n   📁 Paths:`);
    console.log(`      Home:      ${tool.paths.home}`);
    console.log(`      Agents:    ${tool.paths.agents} (TOML configs)`);
    console.log(`      Commands:  ${tool.paths.commands}`);
    console.log(`      Skills:    ${tool.paths.skills}`);
    console.log(`      Framework: ${tool.paths.agentAssistant}`);

    return total;
}

// ============================================================================
// Uninstall Functions
// ============================================================================

function removeBundledAgents(agentsDir) {
    if (!fs.existsSync(agentsDir)) return 0;

    let removed = 0;
    for (const agentFile of BUNDLED_AGENTS) {
        const agentPath = path.join(agentsDir, agentFile);
        if (fs.existsSync(agentPath)) {
            if (removeFile(agentPath)) {
                removed++;
            }
        }
    }

    // Cleanup: Remove agents folder if empty
    try {
        const remaining = fs.readdirSync(agentsDir);
        if (remaining.length === 0) {
            removeDir(agentsDir, false);
        }
    } catch (e) {
        // Ignore
    }

    return removed;
}

function uninstallCursor() {
    const tool = TOOLS.cursor;
    
    // Reset progress - estimate items to remove
    resetProgress();
    progressState.total = 10; // Approximate count of remove operations
    
    console.log(`\n🗑️  Uninstalling Agent Assistant from ${tool.name}...`);
    console.log(`   This will remove the framework while preserving user skills.\n`);

    let removed = 0;

    // 1. Remove Rules & Global Configs
    const filesToRemove = [
        path.join(tool.paths.rules, 'agent-assistant.mdc'),
        path.join(tool.paths.editorHome, 'CURSOR.md'),
        path.join(tool.paths.editorHome, 'AGENT.md'),
        path.join(tool.paths.editorHome, 'CLAUDE.md')
    ];

    for (const file of filesToRemove) {
        if (removeFile(file)) {
            removed++;
        }
    }

    // 2. Remove Commands (Entire folder)
    if (removeDir(tool.paths.commands)) {
        removed++;
    }

    // 3. Remove Core Framework
    if (removeDir(tool.paths.agentAssistant)) {
        removed++;
    }

    // 4. Remove Native Agents (Entire folder)
    if (removeDir(tool.paths.agents)) {
        removed++;
    }

    // Complete progress bar
    completeProgress();
    
    // Print summary
    printSummary(tool.name, 'uninstall');
    
    console.log(`\n   ℹ️  User skills preserved at: ${tool.paths.skills}`);

    return removed;
}

function uninstallCopilot() {
    const tool = TOOLS.copilot;
    
    // Reset progress
    resetProgress();
    progressState.total = 10;
    
    console.log(`\n🗑️  Uninstalling Agent Assistant from ${tool.name}...`);
    console.log(`   This will remove the framework while preserving user skills.\n`);

    let removed = 0;

    // 1. Remove from VS Code Prompts
    const promptFile = path.join(tool.paths.vsCodePrompts, 'agent-assistant.agent.md');
    if (removeFile(promptFile)) {
        removed++;
    }

    // 2. Remove core framework
    if (removeDir(tool.paths.agentAssistant)) {
        removed++;
    }

    // 3. Remove commands
    if (removeDir(tool.paths.commands)) {
        removed++;
    }

    // 4. Remove Global Config Files
    const globalFiles = ['AGENT.md', 'COPILOT.md', 'CLAUDE.md'];
    for (const file of globalFiles) {
        const filePath = path.join(tool.paths.home, file);
        if (removeFile(filePath)) {
            removed++;
        }
    }

    // 5. Remove native agents (Entire folder)
    if (removeDir(tool.paths.agents)) {
        removed++;
    }

    // Complete progress bar
    completeProgress();
    
    // Print summary
    printSummary(tool.name, 'uninstall');
    
    console.log(`\n   ℹ️  User skills preserved at: ${tool.paths.skills}`);

    return removed;
}

function uninstallAntigravity() {
    const tool = TOOLS.antigravity;
    
    // Reset progress
    resetProgress();
    progressState.total = 12;
    
    console.log(`\n🗑️  Uninstalling Agent Assistant from ${tool.name}...`);
    console.log(`   This will remove the framework while preserving user skills.\n`);

    let removed = 0;

    // 1. Remove Editor Config (~/.antigravity)
    // 1.1 Remove Workflows (~/.antigravity/workflows/)
    if (removeDir(tool.paths.workflows)) {
        removed++;
    }

    // 1.2 Remove Agents (~/.antigravity/agents/)
    if (removeDir(tool.paths.agents)) {
        removed++;
    }


    // 2. Remove Platform Config (~/.gemini)
    // 2.1 Remove GEMINI.md, AGENT.md, CLAUDE.md
    const globalFiles = ["GEMINI.md", "AGENT.md", "CLAUDE.md"];
    for (const file of globalFiles) {
        const filePath = path.join(tool.paths.gemini, file);
        if (removeFile(filePath)) {
            removed++;
        }
    }

    // 2.2 Remove Global Agents Folder (~/.gemini/agents/)
    if (removeDir(tool.paths.globalAgents)) {
        removed++;
    }

    // 3. Remove Extension Brain (~/.gemini/antigravity)
    // 3.1 Remove Global Workflows (~/.gemini/antigravity/global_workflows)
    if (removeDir(tool.paths.globalWorkflows)) {
        removed++;
    }

    // 3.2 Remove Core Framework (~/.gemini/antigravity/skills/agent-assistant)
    if (removeDir(tool.paths.agentAssistant)) {
        removed++;
    }

    // Complete progress bar
    completeProgress();
    
    // Print summary
    printSummary(tool.name, 'uninstall');
    
    console.log(`\n   ℹ️  User skills preserved at: ${tool.paths.skills}`);

    return removed;
}

function uninstallClaude() {
    const tool = TOOLS.claude;
    
    // Reset progress
    resetProgress();
    progressState.total = 6;
    
    console.log(`\n🗑️  Uninstalling Agent Assistant from ${tool.name}...`);
    console.log(`   This will remove the framework while preserving user skills.\n`);

    let removed = 0;

    // 1. Remove Global Config
    const claudeMd = path.join(tool.paths.home, 'CLAUDE.md');
    if (removeFile(claudeMd)) {
        removed++;
    }

    // 2. Remove Commands
    if (removeDir(tool.paths.commands)) {
        removed++;
    }

    // 3. Remove Native Agents
    if (removeDir(tool.paths.agents)) {
        removed++;
    }

    // 4. Remove Core Framework
    if (removeDir(tool.paths.agentAssistant)) {
        removed++;
    }

    // Complete progress bar
    completeProgress();
    
    // Print summary
    printSummary(tool.name, 'uninstall');
    
    console.log(`\n   ℹ️  User skills preserved at: ${tool.paths.skills}`);

    return removed;
}

function uninstallCodex() {
    const tool = TOOLS.codex;
    
    // Reset progress
    resetProgress();
    progressState.total = 6;
    
    console.log(`\n🗑️  Uninstalling Agent Assistant from ${tool.name}...`);
    console.log(`   This will remove the framework while preserving user skills.\n`);

    let removed = 0;

    // 1. Remove Global Config
    const codexMd = path.join(tool.paths.home, 'CODEX.md');
    if (removeFile(codexMd)) {
        removed++;
    }

    // Remove AGENTS.md (Codex primary instruction file)
    const agentsMd = path.join(tool.paths.home, 'AGENTS.md');
    if (removeFile(agentsMd)) {
        removed++;
    }

    // Remove AGENT.md
    const agentMd = path.join(tool.paths.home, 'AGENT.md');
    if (removeFile(agentMd)) {
        removed++;
    }

    // 2. Remove Commands
    if (removeDir(tool.paths.commands)) {
        removed++;
    }

    // 3. Remove Native Agents
    if (removeDir(tool.paths.agents)) {
        removed++;
    }

    // 4. Remove Core Framework
    if (removeDir(tool.paths.agentAssistant)) {
        removed++;
    }

    // Complete progress bar
    completeProgress();
    
    // Print summary
    printSummary(tool.name, 'uninstall');
    
    console.log(`\n   ℹ️  User skills preserved at: ${tool.paths.skills}`);

    return removed;
}

// ============================================================================
// CLI Interface
// ============================================================================

function printBanner() {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🤖 Agent Assistant Framework Installer                      ║
║                                                               ║
║   Multi-agent orchestration for AI coding assistants          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`);
}

function printUsage() {
    console.log(`
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
`);
}

function listTools() {
    console.log('\n📋 Supported Tools:\n');

    for (const [key, tool] of Object.entries(TOOLS)) {
        // Check for the agentAssistant path which all tools now have
        const installed = fs.existsSync(tool.paths.agentAssistant);
        const status = installed ? '✅ Installed' : '⬚ Not installed';

        console.log(`  ${key.padEnd(12)} ${tool.name.padEnd(25)} ${status}`);

        if (installed) {
            // Show installation details
            const details = [];
            if (key === 'cursor') {
                if (fs.existsSync(path.join(tool.paths.rules, 'agent-assistant.mdc'))) {
                    details.push('rules');
                }
            }
            if (key === 'copilot') {
                if (fs.existsSync(path.join(tool.paths.vsCodePrompts, 'agent-assistant.agent.md'))) {
                    details.push('VS Code prompts');
                }
            }
            if (key === 'antigravity') {
                const geminiPath = path.join(tool.paths.gemini, 'GEMINI.md');
                if (fs.existsSync(geminiPath)) {
                    const content = fs.readFileSync(geminiPath, 'utf8');
                    if (content.includes('AGENT-ASSISTANT-START')) {
                        details.push('GEMINI.md');
                    }
                }
            }
            if (key === 'claude') {
                if (fs.existsSync(path.join(tool.paths.home, 'CLAUDE.md'))) {
                    details.push('CLAUDE.md');
                }
            }
            if (key === 'codex') {
                if (fs.existsSync(path.join(tool.paths.home, 'AGENTS.md'))) {
                    details.push('AGENTS.md');
                }
                if (fs.existsSync(path.join(tool.paths.home, 'CODEX.md'))) {
                    details.push('CODEX.md');
                }
            }
            if (details.length > 0) {
                console.log(`               ${' '.padEnd(25)} (${details.join(', ')})`);
            }
        }
    }
    console.log('');
}

async function promptToolSelection() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        console.log('\n📋 Select tools to install:\n');
        console.log('  1. Cursor');
        console.log('  2. GitHub Copilot');
        console.log('  3. Antigravity (Gemini)');
        console.log('  4. Claude Code');
        console.log('  5. Codex');
        console.log('  6. All tools');
        console.log('  0. Cancel\n');

        rl.question('Enter your choice (0-6): ', (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function interactiveInstall() {
    const choice = await promptToolSelection();

    switch (choice) {
        case '1':
            installCursor();
            break;
        case '2':
            installCopilot();
            break;
        case '3':
            installAntigravity();
            break;
        case '4':
            installClaude();
            break;
        case '5':
            installCodex();
            break;
        case '6':
            installCursor();
            installCopilot();
            installAntigravity();
            installClaude();
            installCodex();
            break;
        case '0':
            console.log('\n❌ Installation cancelled.\n');
            break;
        default:
            console.log('\n❌ Invalid choice. Please enter 0-6.\n');
    }
}

// ============================================================================
// Main Entry Point
// ============================================================================

async function main() {
    const args = process.argv.slice(2);
    const command = args[0]?.toLowerCase();
    const target = args[1]?.toLowerCase();

    printBanner();

    if (!command || command === 'help' || command === '--help' || command === '-h') {
        printUsage();
        return;
    }

    const startTime = Date.now();
    let totalFiles = 0;

    switch (command) {
        case 'install':
            if (target === '--all' || target === 'all') {
                console.log('🚀 Installing for all supported tools...');
                console.log('   This may take a moment. Progress will be shown for each tool.\n');
                totalFiles += installCursor();
                totalFiles += installCopilot();
                totalFiles += installAntigravity();
                totalFiles += installClaude();
                totalFiles += installCodex();
                
                const duration = ((Date.now() - startTime) / 1000).toFixed(2);
                console.log('\n' + '═'.repeat(60));
                console.log('🎉 All installations complete!');
                console.log(`   Total files: ${formatNumber(totalFiles)}`);
                console.log(`   Total time:  ${duration}s`);
                console.log('═'.repeat(60) + '\n');
            } else if (target === 'cursor') {
                installCursor();
            } else if (target === 'copilot') {
                installCopilot();
            } else if (target === 'antigravity' || target === 'gemini') {
                installAntigravity();
            } else if (target === 'claude' || target === 'claude-code') {
                installClaude();
            } else if (target === 'codex') {
                installCodex();
            } else if (!target) {
                await interactiveInstall();
            } else {
                console.log(`❌ Unknown tool: ${target}`);
                console.log('   Supported tools: cursor, copilot, antigravity, claude, codex');
            }
            break;

        case 'uninstall':
            if (target === '--all' || target === 'all') {
                console.log('🗑️  Uninstalling from all tools...\n');
                uninstallCursor();
                uninstallCopilot();
                uninstallAntigravity();
                uninstallClaude();
                uninstallCodex();
                
                const duration = ((Date.now() - startTime) / 1000).toFixed(2);
                console.log('\n' + '═'.repeat(60));
                console.log('✅ All uninstallations complete!');
                console.log(`   Total time: ${duration}s`);
                console.log('═'.repeat(60) + '\n');
            } else if (target === 'cursor') {
                uninstallCursor();
            } else if (target === 'copilot') {
                uninstallCopilot();
            } else if (target === 'antigravity' || target === 'gemini') {
                uninstallAntigravity();
            } else if (target === 'claude' || target === 'claude-code') {
                uninstallClaude();
            } else if (target === 'codex') {
                uninstallCodex();
            } else {
                console.log(`❌ Please specify a tool: cursor, copilot, antigravity, claude, codex, or --all`);
            }
            break;

        case 'list':
            listTools();
            break;

        default:
            console.log(`❌ Unknown command: ${command}`);
            printUsage();
    }
}

main().catch(console.error);
