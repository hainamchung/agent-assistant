/**
 * Codex platform installer/uninstaller.
 */

const fs = require('node:fs');
const path = require('node:path');
const { TOOLS, CORE_DIRS, ROOT_FILES, ROOT } = require('../config');
const { resetProgress, progressState, completeProgress, formatNumber } = require('../progress');
const { getEstimatedFileCount, ensureDir, copyWithReplace, copyFileWithReplace, removeDir, removeFile, safeReplaceDir } = require('../fs-utils');
const { printSummary } = require('../ui');

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
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
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

    fs.writeFileSync(userConfigPath, finalConfig);

    return true;
}

function installCodex() {
    const tool = TOOLS.codex;
    
    // Reset and estimate progress
    resetProgress();
    progressState.total = getEstimatedFileCount();
    
    console.log(`\n📦 Installing Agent Assistant for ${tool.name}...`);
    console.log(`   Estimated files: ~${formatNumber(progressState.total)}\n`);

    let total = 0;

    // --- 1. INSTALL GLOBAL CONFIG (~/.codex) ---
    ensureDir(tool.paths.home);

    // 1.1 CODEX.md (Codex primary instruction file)
    if (tool.assets.codexMd && fs.existsSync(tool.assets.codexMd)) {
        const destFile = path.join(tool.paths.home, 'CODEX.md');
        if (copyFileWithReplace(tool.assets.codexMd, destFile, tool.replacements)) total++;
    }

    // 1.2 AGENT.md (shared across platforms)
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

module.exports = { installCodex, uninstallCodex, mergeCodexConfig };
