/**
 * GitHub Copilot platform installer/uninstaller.
 */

const fs = require('node:fs');
const path = require('node:path');
const { TOOLS, CORE_DIRS, ROOT_FILES, ROOT } = require('../config');
const { resetProgress, progressState, completeProgress, formatNumber } = require('../progress');
const { getEstimatedFileCount, ensureDir, copyWithReplace, copyFileWithReplace, removeDir, removeFile, safeReplaceDir } = require('../fs-utils');
const { printSummary } = require('../ui');

function installCopilot() {
    const tool = TOOLS.copilot;
    
    // Reset and estimate progress
    resetProgress();
    progressState.total = getEstimatedFileCount();
    
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

    // --- 1.2 Global Config Files (COPILOT.md, AGENT.md) ---
    ensureDir(tool.paths.home);
    const globalFiles = ['COPILOT.md', 'AGENT.md'];
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
    // Atomic install: copy to temp dir → swap → cleanup (crash-safe)
    total += safeReplaceDir(tool.paths.agentAssistant, (tempDir) => {
        let count = 0;
        for (const dir of CORE_DIRS) {
            const srcDir = path.join(ROOT, dir);
            if (fs.existsSync(srcDir)) {
                count += copyWithReplace(srcDir, path.join(tempDir, dir), tool.replacements);
            }
        }
        const commandsSrc = path.join(ROOT, 'commands');
        if (fs.existsSync(commandsSrc)) {
            count += copyWithReplace(commandsSrc, path.join(tempDir, 'commands'), tool.replacements);
        }
        for (const file of ROOT_FILES) {
            const srcFile = path.join(ROOT, file);
            if (fs.existsSync(srcFile)) {
                if (copyFileWithReplace(srcFile, path.join(tempDir, file), tool.replacements)) count++;
            }
        }
        return count;
    });

    // Install commands to ~/.copilot/commands
    if (fs.existsSync(path.join(ROOT, 'commands'))) {
        ensureDir(tool.paths.commands);
        total += copyWithReplace(path.join(ROOT, 'commands'), tool.paths.commands, tool.replacements);
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
    const globalFiles = ['AGENT.md', 'COPILOT.md'];
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

module.exports = { installCopilot, uninstallCopilot };
