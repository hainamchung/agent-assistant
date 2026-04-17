/**
 * Cursor platform installer/uninstaller.
 */

const fs = require('node:fs');
const path = require('node:path');
const { TOOLS, CORE_DIRS, ROOT_FILES, ROOT } = require('../config');
const { resetProgress, progressState, completeProgress, formatNumber } = require('../progress');
const { getEstimatedFileCount, ensureDir, copyWithReplace, copyFileWithReplace, removeDir, removeFile, safeReplaceDir } = require('../fs-utils');
const { printSummary } = require('../ui');

function installCursor() {
    const tool = TOOLS.cursor;
    
    // Reset and estimate progress
    resetProgress();
    progressState.total = getEstimatedFileCount();
    
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

    // --- 1.2 Global Config Files (CURSOR.md) ---
    // CURSOR.md from .cursorrules — Cursor's native instruction file
    if (tool.assets.cursorRules && fs.existsSync(tool.assets.cursorRules)) {
        const destFile = path.join(tool.paths.editorHome, 'CURSOR.md');
        if (copyFileWithReplace(tool.assets.cursorRules, destFile, tool.replacements)) total++;
    }

    // --- 2. INSTALL EXTENSION BRAIN (~/.cursor/skills/agent-assistant) ---
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

    // --- 3. INSTALL USER SKILLS (~/.cursor/skills/) ---
    total += copyWithReplace(path.join(ROOT, 'skills'), tool.paths.skills, tool.replacements);

    // 3.1 Install Cursor-specific command skills (from cursor-assistant/skills/)
    if (tool.assets.commandSkillsDir && fs.existsSync(tool.assets.commandSkillsDir)) {
        total += copyWithReplace(tool.assets.commandSkillsDir, tool.paths.skills, tool.replacements);
        const cmdSkillCount = fs.readdirSync(tool.assets.commandSkillsDir)
            .filter(f => fs.statSync(path.join(tool.assets.commandSkillsDir, f)).isDirectory()).length;
        console.log(`   ✅ Installed ${cmdSkillCount} command skills (Cursor-native)`);
    }

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

module.exports = { installCursor, uninstallCursor };
