/**
 * SEO configuration for pages
 * Separated from component for fast-refresh compatibility
 */

export const SITE_URL = 'https://agent-assistant-ten.vercel.app'
// TODO: Add og:image social card (1200x630px)
// Recommended: /assets/social-card.png (1200x630, <5MB)
// See: reports/github-growth-strategy/visual-asset-specs.md for specs
export const DEFAULT_IMAGE = '/assets/logo.png'
export const SITE_NAME = 'Agent Assistant'

// Pre-configured SEO for common pages
export const pageSEO = {
  home: {
    title: 'Agent Assistant — One AI. A Full Engineering Team.',
    description: 'Turn Claude Code, Cursor, or GitHub Copilot into 21 specialist agents. 85% fewer tokens. 70% fewer bugs. Ship features in hours, not days. Auto-generates wiki documentation from any codebase.',
    pathname: '/',
  },
  installation: {
    title: 'Installation Guide',
    description: 'Install Agent Assistant globally and start using specialized agents in all your projects. Quick setup for Cursor, Claude Code, GitHub Copilot, Codex, and Antigravity.',
    pathname: '/installation',
  },
  docs: {
    title: 'Documentation',
    description: 'Learn Agent Assistant - complete documentation for AI-powered development workflows with specialized agents and intelligent orchestration.',
    pathname: '/docs',
  },
  specialistAgents: {
    title: 'Specialist Agents',
    description: '20 pre-built specialist agents including backend engineers, frontend developers, testers, debuggers, reporter, and more. Each with unique expertise and thinking protocols.',
    pathname: '/features/specialist-agents',
  },
  commands: {
    title: 'Commands & Workflows',
    description: 'Powerful slash commands like /cook, /fix, /test, /review that trigger complete multi-phase development workflows with specialized agents.',
    pathname: '/features/commands-workflows',
  },
  matrixSkills: {
    title: 'Hybrid Skill Orchestration (HSOL)',
    description: 'Matrix + dynamic skills: 78 curated skills across 8 domains plus on-demand community skills via find-skills. Variant-aware discovery, fitness thresholds, deep knowledge on demand.',
    pathname: '/features/matrix-skills',
  },
  multiPlatform: {
    title: 'Multi-Platform Support',
    description: 'Works seamlessly with Cursor, Claude Code, GitHub Copilot, Codex, and Antigravity. One configuration, multiple platforms.',
    pathname: '/features/multi-platform-support',
  },
  oneTimeSetup: {
    title: 'One-Time Setup',
    description: 'Install once, use everywhere. Global configuration that works across all your projects and AI coding assistants.',
    pathname: '/features/one-time-setup',
  },
  qualityGates: {
    title: 'Quality Gates',
    description: 'Built-in quality gates ensure every agent output meets production standards. Automatic verification, testing, and review workflows.',
    pathname: '/features/quality-gates',
  },
  subAgentOrchestration: {
    title: 'Sub-Agent Orchestration',
    description: 'Intelligent orchestration coordinates multiple specialist agents to complete complex tasks. The orchestrator delegates, coordinates, and synthesizes.',
    pathname: '/features/sub-agent-orchestration',
  },
  workflow: {
    title: 'System Architecture',
    description: 'Interactive architecture diagram showing how Agent Assistant orchestrates 21 specialist agents, 78 skills, and tiered execution through the Orchestrator Pattern.',
    pathname: '/features/workflow',
  },
  agentTeams: {
    title: 'Agent Teams — Golden Triangle',
    description: 'Adversarial collaboration with 18 specialized teams. Each team has a Tech Lead, Executor, and Reviewer working through structured debate for maximum quality output.',
    pathname: '/features/agent-teams',
  },
  wikiDocumentation: {
    title: 'AI-Powered Wiki Documentation',
    description: 'Turn any codebase into a comprehensive, machine-readable wiki. Three quality tiers, three specialized agents, and adversarial review ensure every page is accurate, complete, and always current.',
    pathname: '/features/wiki-documentation',
  },
  community: {
    title: 'Community — Agent Assistant',
    description: 'Join the multi-agent orchestration community. Contribute skills, agents, and ideas. Built by developers, for developers.',
    pathname: '/community',
  },
} as const
