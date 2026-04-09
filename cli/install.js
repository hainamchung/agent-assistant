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
 * - Qwen
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

const readline = require('node:readline');

// ============================================================================
// Module imports
// ============================================================================

const config = require('./lib/config');
const { TOOLS } = config;
const { formatNumber } = require('./lib/progress');
const fsUtils = require('./lib/fs-utils');
const { printBanner, printUsage, listTools } = require('./lib/ui');

// Platform installers
const { installCursor, uninstallCursor } = require('./lib/platforms/cursor');
const { installCopilot, uninstallCopilot } = require('./lib/platforms/copilot');
const { installAntigravity, uninstallAntigravity } = require('./lib/platforms/antigravity');
const { installClaude, uninstallClaude } = require('./lib/platforms/claude');
const { installCodex, uninstallCodex } = require('./lib/platforms/codex');
const { installQwen, uninstallQwen } = require('./lib/platforms/qwen');

// ============================================================================
// CLI Interface
// ============================================================================

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
        console.log('  6. Qwen');
        console.log('  7. All tools');
        console.log('  0. Cancel\n');

        rl.question('Enter your choice (0-7): ', (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function interactiveInstall() {
    const MAX_RETRIES = 3;
    let attempts = 0;
    let choice;

    while (attempts < MAX_RETRIES) {
        choice = await promptToolSelection();

        const installers = {
            '1': ['Cursor', installCursor],
            '2': ['Copilot', installCopilot],
            '3': ['Antigravity', installAntigravity],
            '4': ['Claude', installClaude],
            '5': ['Codex', installCodex],
            '6': ['Qwen', installQwen],
        };

        if (choice === '0') {
            console.log('\n❌ Installation cancelled.\n');
            return;
        }

        if (choice === '7') {
            for (const [name, fn] of Object.values(installers)) {
                try {
                    const count = fn();
                    if (typeof count === 'number') {
                        console.log(`   ✅ ${name}: ${count} files installed`);
                    }
                } catch (err) {
                    console.error(`\n❌ ${name} installation failed: ${err.message}`);
                    if (process.env.DEBUG) console.error(err.stack);
                }
            }
            return;
        }

        if (installers[choice]) {
            const [name, fn] = installers[choice];
            try {
                const count = fn();
                if (typeof count === 'number') {
                    console.log(`   ✅ ${name}: ${count} files installed`);
                }
            } catch (err) {
                console.error(`\n❌ ${name} installation failed: ${err.message}`);
                if (process.env.DEBUG) console.error(err.stack);
            }
            return;
        }

        attempts++;
        if (attempts < MAX_RETRIES) {
            console.log(`\n❌ Invalid choice. Please enter 0-7. (${MAX_RETRIES - attempts} attempt(s) remaining)\n`);
        } else {
            console.log('\n❌ Too many invalid attempts. Exiting.\n');
        }
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
                const allInstallers = [
                    ['Cursor', installCursor],
                    ['Copilot', installCopilot],
                    ['Antigravity', installAntigravity],
                    ['Claude', installClaude],
                    ['Codex', installCodex],
                    ['Qwen', installQwen],
                ];
                for (const [name, fn] of allInstallers) {
                    try {
                        totalFiles += fn();
                    } catch (err) {
                        console.error(`\n❌ ${name} installation failed: ${err.message}`);
                        if (process.env.DEBUG) console.error(err.stack);
                    }
                }
                
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
            } else if (target === 'qwen') {
                installQwen();
            } else if (!target) {
                await interactiveInstall();
            } else {
                console.log(`❌ Unknown tool: ${target}`);
                console.log('   Supported tools: cursor, copilot, antigravity, claude, codex, qwen');
            }
            break;

        case 'uninstall':
            if (target === '--all' || target === 'all') {
                console.log('🗑️  Uninstalling from all tools...\n');
                const allUninstallers = [
                    ['Cursor', uninstallCursor],
                    ['Copilot', uninstallCopilot],
                    ['Antigravity', uninstallAntigravity],
                    ['Claude', uninstallClaude],
                    ['Codex', uninstallCodex],
                    ['Qwen', uninstallQwen],
                ];
                for (const [name, fn] of allUninstallers) {
                    try {
                        fn();
                    } catch (err) {
                        console.error(`\n❌ ${name} uninstallation failed: ${err.message}`);
                        if (process.env.DEBUG) console.error(err.stack);
                    }
                }
                
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
            } else if (target === 'qwen') {
                uninstallQwen();
            } else {
                console.log(`❌ Please specify a tool: cursor, copilot, antigravity, claude, codex, qwen, or --all`);
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

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BUNDLED_AGENTS: config.BUNDLED_AGENTS,
        TOOLS: config.TOOLS,
        CORE_DIRS: config.CORE_DIRS,
        ROOT_FILES: config.ROOT_FILES,
        ensureDir: fsUtils.ensureDir,
        copyWithReplace: fsUtils.copyWithReplace,
        copyFileWithReplace: fsUtils.copyFileWithReplace,
        removeDir: fsUtils.removeDir,
        getEstimatedFileCount: fsUtils.getEstimatedFileCount,
        saveInstallCache: fsUtils.saveInstallCache,
    };
}

// Only run main when executed directly (not required as module)
if (require.main === module) {
    main().catch(console.error);
}
