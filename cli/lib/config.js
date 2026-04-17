/**
 * Configuration constants for the Agent Assistant CLI installer.
 */

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const HOME = os.homedir();
// __dirname is cli/lib/, so ROOT is two levels up
const ROOT = path.join(__dirname, '..', '..');

// Platform-specific VS Code prompts folder
function getVSCodePromptsFolder() {
    switch (process.platform) {
        case 'win32':
            return path.join(process.env.APPDATA || path.join(HOME, 'AppData', 'Roaming'), 'Code', 'User', 'prompts');
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
            commandSkillsDir: path.join(ROOT, 'code-assistants', 'cursor-assistant', 'skills'),
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
    },
    qwen: {
        name: 'Qwen',
        description: 'Alibaba Qwen Code Assistant',
        paths: {
            home: path.join(HOME, '.qwen'),
            skills: path.join(HOME, '.qwen', 'skills'),
            commands: path.join(HOME, '.qwen', 'commands'),
            agents: path.join(HOME, '.qwen', 'agents'),
            agentAssistant: path.join(HOME, '.qwen', 'skills', 'agent-assistant'),
        },
        replacements: {
            '~/.{TOOL}/skills/agent-assistant/': '~/.qwen/skills/agent-assistant/',
            '{TOOL}/agent-assistant/': 'qwen/skills/agent-assistant/',
            '{TOOL}': 'qwen',
            '{HOME}': '~',
            '~/.agent/': '~/.qwen/skills/agent-assistant/'
        },
        assets: {
            qwenMd: path.join(ROOT, 'code-assistants', 'qwen-assistant', 'QWEN.md'),
        }
    }
};

// Core directories to copy for agent-assistant framework
// Note: 'commands' is copied explicitly per-platform to tool.paths.commands,
// so it is NOT included in CORE_DIRS to avoid 3x copy redundancy.
// The backward compat 'workflows' alias is handled per-platform.
const CORE_DIRS = [
    // Protocol core
    'agents', 'rules',
    // Skill & validation
    'matrix-skills', 'schemas',
    // Safety
    'guardrails',
    // Orchestration
    'topologies', 'personas',
    // Platform adaptation (Sprint 3)
    'platform-packs',
    // Documentation
    'docs', 'documents',
    // Tooling (scripts use __dirname-relative paths → work in installed location)
    'scripts',
];

// Root files to copy
const ROOT_FILES = ['README.md', 'CONTRIBUTING.md'];

// List of bundled agent names (auto-generated from agents/ directory)
// Only .md files are included; teams/ subdirectory is excluded
const BUNDLED_AGENTS = fs.readdirSync(path.join(ROOT, 'agents'))
    .filter(f => f.endsWith('.md') && f !== 'README.md');

module.exports = {
    HOME,
    ROOT,
    getVSCodePromptsFolder,
    TOOLS,
    CORE_DIRS,
    ROOT_FILES,
    BUNDLED_AGENTS,
};
