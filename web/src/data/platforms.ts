export type PlatformStatus = 'full' | 'partial' | 'coming-soon'

export interface Platform {
  id: string
  name: string
  icon: string
  description: string
  status: PlatformStatus
  configFile: string
  installPath: string
  features: string[]
  steps: string[]
  setup: string[]
}

export const platforms: Platform[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    icon: '⚡',
    description: 'Full integration with Cursor IDE through .cursorrules and custom rules.',
    status: 'full',
    configFile: '.cursor/rules/agent-assistant.mdc',
    installPath: '~/.cursor/skills/agent-assistant/',
    features: [
      'Custom agent rules',
      'Skill auto-discovery',
      'Command workflows',
      'Sub-agent orchestration',
    ],
    steps: [
      'Install Agent Assistant globally',
      'Restart Cursor IDE',
      'Agent Assistant auto-discovers from global path',
      'Start using /cook, /fix, /test commands',
    ],
    setup: [
      'agent-assistant install cursor',
      'agent-assistant uninstall cursor',
    ]
  },
  {
    id: 'claude',
    name: 'Claude Code',
    icon: '🤖',
    description: 'Native support through CLAUDE.md for seamless Claude integration.',
    status: 'full',
    configFile: 'CLAUDE.md',
    installPath: '~/.claude/skills/agent-assistant/',
    features: [
      'Native Claude support',
      'CLAUDE.md configuration',
      'Full skill library',
      'Orchestration laws',
    ],
    steps: [
      'Install Agent Assistant globally',
      'CLAUDE.md is auto-detected in projects',
      'Global config applies to all projects',
      'Use slash commands in any project',
    ],
    setup: [
      'agent-assistant install claude',
      'agent-assistant uninstall claude',
    ]
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    icon: '🐙',
    description: 'Works with GitHub Copilot through agent-assistant.agent.md files.',
    status: 'full',
    configFile: 'agent-assistant.agent.md',
    installPath: '~/.copilot/skills/agent-assistant/',
    features: [
      'Copilot agents',
      'Workspace integration',
      'Custom instructions',
      'Skill injection',
    ],
    steps: [
      'Install Agent Assistant globally',
      'Agent files are auto-detected',
      'Works with Copilot Chat',
      'Full orchestration support',
    ],
    setup: [
      'agent-assistant install copilot',
      'agent-assistant uninstall copilot',
    ]
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    icon: '🚀',
    description: 'Full support for Antigravity through GEMINI.md configuration.',
    status: 'full',
    configFile: 'GEMINI.md',
    installPath: '~/.antigravity/skills/agent-assistant/',
    features: [
      'Gemini integration',
      'Global configuration',
      'Agent workflows',
      'Matrix skills',
    ],
    steps: [
      'Install Agent Assistant globally',
      'GEMINI.md is auto-detected',
      'Global configuration applies',
      'Use all commands and workflows',
    ],
    setup: [
      'agent-assistant install antigravity',
      'agent-assistant uninstall antigravity',
    ]
  },
  {
    id: 'codex',
    name: 'Codex',
    icon: '💻',
    description: 'Full support for OpenAI Codex through AGENTS.md (primary) and CODEX.md compatibility.',
    status: 'full',
    configFile: 'AGENTS.md + CODEX.md',
    installPath: '~/.codex/skills/agent-assistant/',
    features: [
      'Codex integration',
      'CODEX.md configuration',
      'Full skill library',
      'Orchestration laws',
    ],
    steps: [
      'Install Agent Assistant globally',
      'CODEX.md is auto-detected in projects',
      'Global config applies to all projects',
      'Use slash commands in any project',
    ],
    setup: [
      'agent-assistant install codex',
      'agent-assistant uninstall codex',
    ]
  },
]

// Platform comparison features
export const platformComparisonFeatures = [
  { feature: 'Agent Orchestration', cursor: true, claude: true, copilot: true, antigravity: true, codex: true },
  { feature: 'Skill Injection', cursor: true, claude: true, copilot: true, antigravity: true, codex: true },
  { feature: 'Command Workflows', cursor: true, claude: true, copilot: true, antigravity: true, codex: true },
  { feature: 'Quality Gates', cursor: true, claude: true, copilot: true, antigravity: true, codex: true },
  { feature: 'Global Config', cursor: true, claude: true, copilot: true, antigravity: true, codex: true },
  { feature: 'Sub-agent Invocation', cursor: true, claude: true, copilot: true, antigravity: true, codex: true },
]

// Simplified platform data for badges
export const platformBadges = platforms.map(p => ({
  name: p.name,
  emoji: p.icon,
  status: p.status,
}))

// Get platform by ID
export const getPlatformById = (id: string) => platforms.find(p => p.id === id)

// Total platforms count
export const totalPlatforms = platforms.length
