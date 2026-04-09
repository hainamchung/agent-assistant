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
    description: 'Multi-agent orchestration for AI coding assistants with 21 specialist agents, 1400+ skills, and 60+ workflows across 6 platforms.',
    pathname: '/',
  },
  installation: {
    title: 'Installation Guide',
    description: 'Install Agent Assistant globally and start using specialized agents in all your projects. Quick setup for Cursor, Claude Code, GitHub Copilot, Codex, Antigravity, and Qwen.',
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
    description: 'Matrix + dynamic skills: 1400+ curated skills across 19 domains plus on-demand community skills via find-skills. Variant-aware discovery, fitness thresholds, deep knowledge on demand.',
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
    description: 'Interactive architecture diagram showing how Agent Assistant orchestrates 21 specialist agents, 1400+ skills, and tiered execution through the Orchestrator Pattern.',
    pathname: '/features/workflow',
  },
  agentTeams: {
    title: 'Agent Teams — Golden Triangle',
    description: 'Adversarial collaboration with 17 specialized teams. Each team has a Tech Lead, Executor, and Reviewer working through structured debate for maximum quality output.',
    pathname: '/features/agent-teams',
  },
  benchmarks: {
    title: 'Benchmarks — Agent Assistant vs. The Competition',
    description: 'Feature-by-feature comparison against CrewAI, MetaGPT, Aider, Cline, SWE-Agent, and Cursor Rules across 22 dimensions. 89/100 internal quality score.',
    pathname: '/features/benchmarks',
  },
  topologies: {
    title: 'Execution Topologies',
    description: '12 execution topologies for any workflow shape: pipeline, fan-out, hierarchical, golden triangle, swarm, debate round-robin, and more.',
    pathname: '/features/topologies',
  },
  securityTrust: {
    title: 'Security & Trust',
    description: '8 guardrail modules, 3-tier trust model, D4 safety veto, SHA-256 integrity verification, and OWASP-aligned security across all agent operations.',
    pathname: '/features/security-trust',
  },
} as const
