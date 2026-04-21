/**
 * SEO configuration for pages
 * Separated from component for fast-refresh compatibility
 */

export const SITE_URL = 'https://agent-assistant-ten.vercel.app'
export const DEFAULT_IMAGE = '/assets/logo.png'
export const SITE_NAME = 'Agent Assistant'

// Pre-configured SEO for common pages
export const pageSEO = {
  home: {
    title: 'Agent Assistant',
    description: 'Multi-agent orchestration for AI coding assistants with 21 specialist agents, 310+ skills, and 50+ workflows. Multi-agent orchestration for AI coding assistants.',
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
    description: '21 pre-built specialist agents including backend engineers, frontend developers, testers, debuggers, reporter, and more. Each with unique expertise and thinking protocols.',
    pathname: '/features/specialist-agents',
  },
  commands: {
    title: 'Commands & Workflows',
    description: 'Powerful slash commands like /cook, /fix, /test, /review that trigger complete multi-phase development workflows with specialized agents.',
    pathname: '/features/commands-workflows',
  },
  matrixSkills: {
    title: 'Hybrid Skill Orchestration (HSOL)',
    description: 'Matrix + dynamic skills: 310+ curated skills across 19 domains plus on-demand community skills via find-skills. Variant-aware discovery, fitness thresholds, deep knowledge on demand.',
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
    description: 'Interactive architecture diagram showing how Agent Assistant orchestrates 21 specialist agents, 310+ skills, and tiered execution through the Orchestrator Pattern.',
    pathname: '/features/workflow',
  },
  agentTeams: {
    title: 'Agent Teams — Golden Triangle',
    description: 'Adversarial collaboration with 17 specialized teams. Each team has a Tech Lead, Executor, and Reviewer working through structured debate for maximum quality output.',
    pathname: '/features/agent-teams',
  },
} as const
