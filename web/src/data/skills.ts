export interface SkillDomain {
  name: string
  count: number
  icon: string
  examples: string[]
}

// 19 domains from matrix-skills/_index.yaml v1.1 — total 1400 skills
export const skillDomains: SkillDomain[] = [
  { name: 'Backend', count: 32, icon: '⚙️', examples: ['fastapi-expert', 'django-expert', 'nodejs-best-practices'] },
  { name: 'Frontend', count: 22, icon: '🎨', examples: ['react-expert', 'vue-expert', 'nextjs-developer'] },
  { name: 'Architecture', count: 9, icon: '🏗️', examples: ['microservices-architect', 'api-designer', 'database-optimizer'] },
  { name: 'Quality', count: 21, icon: '✅', examples: ['playwright-expert', 'code-review', 'debugging'] },
  { name: 'Security', count: 35, icon: '🔒', examples: ['api-security-best-practices', 'secure-code-guardian', 'vulnerability-scanner'] },
  { name: 'Design', count: 10, icon: '🎯', examples: ['ui-design-system', 'frontend-design', 'aesthetic'] },
  { name: 'Planning', count: 12, icon: '📑', examples: ['brainstorming', 'plan-writing', 'sequential-thinking'] },
  { name: 'DevOps', count: 22, icon: '🔧', examples: ['docker-expert', 'kubernetes-specialist', 'terraform-engineer'] },
  { name: 'Data', count: 7, icon: '📊', examples: ['pandas-pro', 'sql-pro', 'postgres-pro'] },
  { name: 'Performance', count: 1, icon: '⚡', examples: ['performance-profiling'] },
  { name: 'Research', count: 11, icon: '🔍', examples: ['docs-seeker', 'research', 'tavily-web'] },
  { name: 'Mobile', count: 8, icon: '📱', examples: ['react-native-expert', 'flutter-expert', 'swift-expert'] },
  { name: 'Gaming', count: 3, icon: '🎮', examples: ['game-developer', '2d-games', '3d-games'] },
  { name: 'Management', count: 4, icon: '📋', examples: ['agile-product-owner', 'product-manager-toolkit', 'jira-issues'] },
  { name: 'AI/ML', count: 40, icon: '🤖', examples: ['prompt-engineering', 'rag-implementation', 'llm-app-patterns'] },
  { name: 'Cloud', count: 11, icon: '☁️', examples: ['aws-serverless-eda', 'azure-functions', 'gcp-cloud-run'] },
  { name: 'Languages', count: 17, icon: '📝', examples: ['typescript-pro', 'python-pro', 'golang-pro'] },
  { name: 'Tools', count: 41, icon: '🛠️', examples: ['git-pushing', 'chrome-devtools', 'repomix'] },
  { name: 'MCP & Agents', count: 8, icon: '🔌', examples: ['mcp-builder', 'langgraph', 'crewai'] },
]

// Skill injection example (backend-engineer) — matrix + optional dynamic
export const skillInjectionExample = {
  agent: 'backend-engineer',
  profile: 'backend:execution',
  domains: ['backend', 'architecture', 'quality', 'data', 'languages'],
  injectedSkills: [
    'fastapi-expert',
    'django-expert',
    'nodejs-best-practices',
    'python-pro',
    'typescript-pro',
    'postgres-pro',
    'prisma-expert',
    'api-designer',
    'database-optimizer',
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
    description: 'Matrix (1400+) plus community skills at skills.sh — no cap on capability.',
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

export const getTotalSkills = () => skillDomains.reduce((acc, d) => acc + d.count, 0)
// Framework total from matrix-skills/_index.yaml
export const totalSkills = 1400
export const totalDomains = 19
