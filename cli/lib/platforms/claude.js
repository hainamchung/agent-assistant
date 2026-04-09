/**
 * Claude Code platform installer/uninstaller.
 */

const fs = require('node:fs');
const path = require('node:path');
const { TOOLS, CORE_DIRS, ROOT_FILES, ROOT } = require('../config');
const { resetProgress, progressState, completeProgress, formatNumber } = require('../progress');
const { getEstimatedFileCount, ensureDir, copyWithReplace, copyFileWithReplace, removeDir, removeFile, safeReplaceDir } = require('../fs-utils');
const { printSummary } = require('../ui');

function installClaude() {
    const tool = TOOLS.claude;
    
    // Reset and estimate progress
    resetProgress();
    progressState.total = getEstimatedFileCount();
    
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

module.exports = { installClaude, uninstallClaude };
