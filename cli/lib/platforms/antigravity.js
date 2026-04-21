/**
 * Antigravity (Gemini) platform installer/uninstaller.
 */

const fs = require('node:fs');
const path = require('node:path');
const { TOOLS, CORE_DIRS, ROOT_FILES, ROOT } = require('../config');
const { resetProgress, progressState, completeProgress, formatNumber, updateProgress } = require('../progress');
const { getEstimatedFileCount, ensureDir, copyWithReplace, copyFileWithReplace, removeDir, removeFile, safeReplaceDir } = require('../fs-utils');
const { printSummary } = require('../ui');

function installAntigravity() {
    const tool = TOOLS.antigravity;
    
    // Reset and estimate progress
    resetProgress();
    progressState.total = Math.round(getEstimatedFileCount() * 1.5); // Antigravity has more destinations
    
    console.log(`\n📦 Installing Agent Assistant for ${tool.name}...`);
    console.log(`   Estimated files: ~${formatNumber(progressState.total)}\n`);

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
            const startIdx = existingContent.indexOf(MARKER_START);
            const endIdx = existingContent.indexOf(MARKER_END);
            if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
                fs.writeFileSync(destFile, existingContent.slice(0, startIdx) + wrappedContent + existingContent.slice(endIdx + MARKER_END.length));
            }
        } else {
            const separator = existingContent.trim() === '' ? '' : '\n\n';
            fs.writeFileSync(destFile, existingContent + separator + wrappedContent);
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

module.exports = { installAntigravity, uninstallAntigravity };
