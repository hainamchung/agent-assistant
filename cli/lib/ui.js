/**
 * UI display functions for the CLI installer.
 */

const fs = require('node:fs');
const path = require('node:path');
const { TOOLS } = require('./config');
const { progressState, formatNumber } = require('./progress');

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
  install [tool]     Install for a specific tool (cursor, copilot, antigravity, claude, codex, qwen)
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
            if (key === 'qwen') {
                if (fs.existsSync(path.join(tool.paths.home, 'QWEN.md'))) {
                    details.push('QWEN.md');
                }
            }
            if (details.length > 0) {
                console.log(`               ${' '.padEnd(25)} (${details.join(', ')})`);
            }
        }
    }
    console.log('');
}

module.exports = {
    verifyInstallation,
    printSummary,
    printBanner,
    printUsage,
    listTools,
};
