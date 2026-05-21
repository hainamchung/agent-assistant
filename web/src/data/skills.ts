export interface SkillDomain {
  name: string
  count: number
  icon: string
  examples: string[]
}

// 8 real domains from ~/.{TOOL}/skills-cursor/ + ~/.{TOOL}/skills/ — total 78 skills
export const skillDomains: SkillDomain[] = [
  { name: 'Frontend', count: 10, icon: '🎨', examples: ['react-expert', 'nextjs-developer', 'angular', 'ui-ux-pro-max'] },
  { name: 'Backend', count: 9, icon: '⚙️', examples: ['fastapi-expert', 'django-pro', 'nodejs-best-practices', 'java-pro'] },
  { name: 'Architecture', count: 6, icon: '🏗️', examples: ['backend-architect', 'database-architect', 'c4-architecture'] },
  { name: 'Quality & DevOps', count: 11, icon: '✅', examples: ['debugging', 'devops-engineer', 'docker-expert', 'security-auditor'] },
  { name: 'Cloud & Infrastructure', count: 8, icon: '☁️', examples: ['cloud-devops', 'cloudflare-expert', 'kubernetes-architect'] },
  { name: 'AI/ML & Data', count: 10, icon: '🤖', examples: ['ai-engineer', 'rag-architect', 'langchain-architecture', 'sql-pro'] },
  { name: 'Productivity & Meta', count: 8, icon: '🛠️', examples: ['app-builder', 'git-pushing', 'wave-execution', 'brainstorming'] },
  { name: 'Cursor Tools', count: 16, icon: '🔌', examples: ['canvas', 'babysit', 'create-skill', 'sdk', 'shell'] },
]

// Skill injection example (backend-engineer) — matrix + optional dynamic
export const skillInjectionExample = {
  agent: 'backend-engineer',
  profile: 'backend:execution',
  domains: ['backend', 'architecture', 'quality', 'data'],
  injectedSkills: [
    'fastapi-expert',
    'python-pro',
    'typescript-expert',
    'sql-pro',
    'docker-expert',
    'cloud-devops',
    'database-architect',
  ],
}

// HSOL: resolution + optional dynamic discovery
export const skillDiscoverySteps = [
  {
    step: 1,
    title: 'Agent Activated',
    description: 'When an agent is invoked, the orchestrator reads its profile and inherited domains.',
    icon: '🎭',
  },
  {
    step: 2,
    title: 'Matrix Resolution',
    description: 'The system loads domain files and resolves matrix skills by relevance and priority (< 10ms).',
    icon: '🔍',
  },
  {
    step: 3,
    title: 'Optional Dynamic Discovery',
    description: 'For hard/team commands, if matrix fitness is below threshold, find-skills can discover community skills.',
    icon: '🌐',
  },
  {
    step: 4,
    title: 'Skill Injection',
    description: 'Matrix skills (and any newly installed dynamic skills) are loaded into the agent context.',
    icon: '💉',
  },
  {
    step: 5,
    title: 'Execution',
    description: 'The agent executes with specialized knowledge from its injected skills.',
    icon: '⚡',
  },
]

// When does dynamic discovery run? (variant × fitness)
export interface HsolDecisionRow {
  scenario: string
  variant: string
  matrixFitness: string
  action: string
}

export const hsolDecisionTable: HsolDecisionRow[] = [
  { scenario: 'Fast path', variant: 'fast', matrixFitness: 'any', action: 'No discovery; matrix only.' },
  { scenario: 'Matrix sufficient', variant: 'hard / team', matrixFitness: '≥ 0.8', action: 'Skip discovery; execute with matrix.' },
  { scenario: 'Matrix adequate', variant: 'hard / team', matrixFitness: '0.75 – 0.8', action: 'Async discovery; recommend for next time.' },
  { scenario: 'Matrix insufficient', variant: 'hard / team', matrixFitness: '< 0.75', action: 'Blocking discovery → install → re-inject → execute with new skill.' },
]

// What makes HSOL unique
export interface HsolUniqueFeature {
  icon: string
  title: string
  description: string
}

export const hsolUniqueFeatures: HsolUniqueFeature[] = [
  {
    icon: '⚡',
    title: 'Sub-10ms Matrix',
    description: 'Pre-curated skills resolve in under 10ms for instant agent readiness.',
  },
  {
    icon: '🌐',
    title: 'Variant-Aware Discovery',
    description: 'Dynamic discovery runs only for hard/team; fast stays fast with no network call.',
  },
  {
    icon: '📐',
    title: 'Fitness Thresholds',
    description: '0.8 = skip discovery; 0.75–0.8 = async; < 0.75 = blocking install for current task.',
  },
  {
    icon: '🔍',
    title: 'find-skills CLI',
    description: 'Search and install community skills: npx skills find [query], npx skills add ... -g -y.',
  },
  {
    icon: '🛡️',
    title: 'Trust Progression',
    description: 'New dynamic skills earn trust; low-trust installs require user confirmation.',
  },
  {
    icon: '♾️',
    title: 'Infinite Ceiling',
    description: '78 curated skills (13 cursor-builtin + 65 custom) plus community skills at skills.sh — no cap on capability.',
  },
]

// find-skills CTA
export const findSkillsCta = {
  title: 'Discover & Install Community Skills',
  description: 'Use the find-skills CLI to search and install skills from the community. Installs apply to your current tool only.',
  searchCommand: 'npx skills find [query]',
  installCommand: 'npx skills add <owner/repo@skill> -g -y',
  browseUrl: 'https://skills.sh/',
}

// Skill benefits (hybrid)
export const skillBenefits = [
  {
    icon: '🧠',
    title: 'Deep Expertise',
    description: 'Matrix skills plus optional community skills give agents curated and cutting-edge knowledge.',
  },
  {
    icon: '⚡',
    title: 'Just-In-Time Loading',
    description: 'Skills are loaded only when needed; dynamic discovery runs only when variant and fitness allow.',
  },
  {
    icon: '🔄',
    title: 'Always Evolving',
    description: 'Matrix stays stable; dynamic layer and trust progression keep capabilities up to date.',
  },
]

// Computed: sum of per-domain counts across 8 real domains
export const getTotalSkills = () => skillDomains.reduce((acc, d) => acc + d.count, 0)
// Real skill total — 78 skills across 8 domains (13 cursor-builtin + 65 custom)
export const totalSkills = 78
export const totalDomains = 8
