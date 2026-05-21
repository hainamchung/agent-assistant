import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../../components/ui'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO, pageSEO } from '../../components/seo'
import { Terminal } from '../../components/terminal'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const stats = [
  { value: '3', label: 'Quality Variants', icon: '⚡' },
  { value: '9', label: 'Wiki Page Types', icon: '📑' },
  { value: '3', label: 'Specialized Agents', icon: '🤖' },
  { value: '42+', label: 'Knowledge Nodes', icon: '🕸️' },
  { value: '7', label: 'Team Phases', icon: '🔺' },
]

const variants = [
  {
    name: 'fast',
    badge: 'Quick Bootstrap',
    icon: '⚡',
    color: 'green' as const,
    description: 'Streamlined 2-phase generation for small projects. Get essential wiki coverage in minutes.',
    phases: '2 phases',
    coverage: '60% essential',
    output: '3–5 pages',
    useCase: '< 20 files, initial wiki bootstrap',
    commands: ['/wiki:fast', '/wiki:fast add auth module'],
    gradient: 'from-[rgba(0,255,136,0.15)] to-[rgba(0,212,255,0.05)]',
    borderColor: 'border-[rgba(0,255,136,0.25)]',
    iconBg: 'from-[var(--color-gradient-green)] to-[var(--color-gradient-cyan)]',
    pros: ['Fast execution', 'Quick project overview', 'Minimal overhead'],
    cons: ['No review phase', 'Limited coverage'],
  },
  {
    name: 'hard',
    badge: 'Comprehensive',
    icon: '🔬',
    color: 'orange' as const,
    description: 'Deep analysis with 5 structured phases and single-pass review. Thorough coverage for medium-to-large projects.',
    phases: '5 phases',
    coverage: '85% comprehensive',
    output: '15–25 pages',
    useCase: '20–100 files, full documentation',
    commands: ['/wiki:hard', '/wiki:hard analyze entire codebase'],
    gradient: 'from-[rgba(255,136,68,0.15)] to-[rgba(255,68,68,0.05)]',
    borderColor: 'border-[rgba(255,136,68,0.25)]',
    iconBg: 'from-[var(--color-gradient-orange)] to-[var(--color-gradient-red)]',
    pros: ['Deep analysis', 'Single-pass review', '15+ page output'],
    cons: ['Longer execution', 'Single reviewer'],
  },
  {
    name: 'team',
    badge: 'Golden Triangle',
    icon: '🔺',
    color: 'purple' as const,
    description: 'Adversarial collaboration through 7 phases with Tech Lead, Executor, and Reviewer. Maximum quality for mission-critical documentation.',
    phases: '7 phases',
    coverage: '100% perfection',
    output: '30+ pages',
    useCase: '100–500+ files, adversarial review',
    commands: ['/wiki:team', '/wiki:team document full architecture'],
    gradient: 'from-[rgba(136,68,255,0.15)] to-[rgba(0,212,255,0.05)]',
    borderColor: 'border-[rgba(136,68,255,0.25)]',
    iconBg: 'from-[var(--color-gradient-purple)] to-[var(--color-gradient-cyan)]',
    pros: ['100% coverage', 'Adversarial review', 'Debate & consensus'],
    cons: ['Higher overhead', 'More tokens'],
  },
]

const wikiTypes = [
  { name: 'Summaries', icon: '📋', description: 'High-level overviews: project identity, architecture, tech stack, success metrics', color: 'cyan', count: '10' },
  { name: 'Entities', icon: '🏗️', description: 'One page per code entity: functions, classes, modules, API routes, data models', color: 'purple', count: '14' },
  { name: 'Concepts', icon: '💡', description: 'Patterns and principles: Golden Triangle, HSOL, tiered orchestration, business rules', color: 'green', count: '8' },
  { name: 'Decisions', icon: '⚖️', description: 'Architecture decisions with rationale: why choices were made, trade-offs considered', color: 'orange', count: '3' },
  { name: 'Chronicles', icon: '📜', description: 'Step-by-step workflows: getting started, git workflow, onboarding processes', color: 'cyan', count: '2' },
  { name: 'Runbooks', icon: '📖', description: 'Operations guides: testing standards, error handling, SLA, handoffs', color: 'red', count: '4' },
  { name: 'Comparisons', icon: '⚔️', description: 'Trade-off analysis: command variant matrix, technology comparisons', color: 'purple', count: '1' },
  { name: 'Syntheses', icon: '🔗', description: 'Cross-cutting knowledge: entity relationships, glossary index, terminology', color: 'green', count: 'N' },
  { name: 'Postmortems', icon: '🔍', description: 'Incident analysis and learnings: what happened, why, and how to prevent recurrence', color: 'orange', count: 'N' },
]

const wikiAgents = [
  {
    name: 'wiki-architect',
    role: 'Knowledge Architect',
    icon: '👑',
    color: 'purple' as const,
    responsibilities: [
      'Decompose codebase into entity categories',
      'Design wiki taxonomy and page hierarchy',
      'Create detailed generation plans per page',
      'Arbitrate disputes between Executor and Reviewer',
    ],
    tagline: 'Plans before generation. Structures before content.',
    gradient: 'from-[var(--color-gradient-red)] to-[var(--color-gradient-purple)]',
    shadow: 'shadow-[rgba(136,68,255,0.25)]',
  },
  {
    name: 'wiki-extractor',
    role: 'Code Intelligence Analyst',
    icon: '🔍',
    color: 'green' as const,
    responsibilities: [
      'Extract complete, accurate knowledge from source code',
      'Generate wiki pages with verified source citations',
      'Build bidirectional wikilinks between related pages',
      'Defend implementation against reviewer challenges',
    ],
    tagline: 'Verify from code. Never guess. Cite sources.',
    gradient: 'from-[var(--color-gradient-green)] to-[var(--color-gradient-cyan)]',
    shadow: 'shadow-[rgba(0,255,136,0.25)]',
  },
  {
    name: 'wiki-reviewer',
    role: 'Quality Gatekeeper',
    icon: '🛡️',
    color: 'orange' as const,
    responsibilities: [
      'Verify source citations and link resolution',
      'Challenge descriptions that do not match code',
      'Validate completeness across all 5 dimensions',
      'Ensure no orphaned pages or broken references',
    ],
    tagline: 'Guardian of wiki quality. Accuracy over completeness.',
    gradient: 'from-[var(--color-gradient-orange)] to-[var(--color-gradient-red)]',
    shadow: 'shadow-[rgba(255,136,68,0.25)]',
  },
]

const commonOperations = [
  { cmd: 'setup', description: 'First-time wiki initialization in a project', icon: '🚀' },
  { cmd: 'init', description: 'Initialize wiki directory structure', icon: '📁' },
  { cmd: 'ingest', description: 'Parse a document into wiki source', icon: '📥' },
  { cmd: 'compile', description: 'AI-generate wiki pages from sources', icon: '⚙️' },
  { cmd: 'query', description: 'Search wiki and answer questions', icon: '🔎' },
  { cmd: 'lint', description: 'Health check on wiki quality', icon: '✅' },
  { cmd: 'status', description: 'Wiki statistics and coverage report', icon: '📊' },
  { cmd: 'graph', description: 'Generate knowledge graph visualization', icon: '🕸️' },
]

const pipelineSteps = [
  {
    step: 1,
    title: 'Ingest',
    description: 'Parse source files into wiki sources. Skips sensitive files (.env, credentials, secrets).',
    icon: '📥',
    badge: 'Source Analysis',
    command: '/wiki ingest src/api/auth.ts',
    color: 'cyan',
  },
  {
    step: 2,
    title: 'Extract',
    description: 'Deep code analysis. Identify entities, relationships, patterns, and integration points.',
    icon: '🔍',
    badge: 'Entity Mapping',
    command: '/wiki compile',
    color: 'green',
  },
  {
    step: 3,
    title: 'Generate',
    description: 'Create wiki pages with frontmatter, content, and verified wikilinks to related pages.',
    icon: '📝',
    badge: 'Page Creation',
    command: '→ 54 wiki pages generated',
    color: 'purple',
  },
  {
    step: 4,
    title: 'Lint',
    description: 'Validate frontmatter, check for orphaned pages, verify no broken links, score quality.',
    icon: '✅',
    badge: 'Quality Gate',
    command: '/wiki lint',
    color: 'orange',
  },
  {
    step: 5,
    title: 'Graph',
    description: 'Auto-generate Mermaid knowledge graph. 42 nodes, ~175 edges across 7 categories.',
    icon: '🕸️',
    badge: 'Knowledge Graph',
    command: '/wiki graph',
    color: 'red',
  },
  {
    step: 6,
    title: 'Query',
    description: 'Search and retrieve knowledge from the wiki. Ask questions, get answers with citations.',
    icon: '🔎',
    badge: 'Knowledge Retrieval',
    command: '/wiki query "How does auth work?"',
    color: 'cyan',
  },
]

const teamPhases = [
  { phase: 'P1', title: 'Architecture Scout', icon: '🔍', badge: '7 phases', description: 'Deep codebase analysis across all layers: entry points, routing, business logic, data access, infrastructure.' },
  { phase: 'P2', title: 'Entity Extraction', icon: '🏗️', badge: 'catalog', description: 'Extract all entities with full metadata: name, type, file location, purpose, parameters, relationships.' },
  { phase: 'P3', title: 'Taxonomy Design', icon: '🗺️', badge: 'structure', description: 'Design wiki structure. Map entities to page types. Define cross-references and generation priorities.' },
  { phase: 'P4', title: 'Generation Plan', icon: '📋', badge: 'plan', description: 'Create detailed per-page plans. Map source files, define content structure, set generation order.' },
  { phase: 'P5', title: 'Page Generation', icon: '📝', badge: 'execute', description: 'Generate all wiki pages following the plan. Every page passes through Golden Triangle review.' },
  { phase: 'P6', title: 'Peer Review', icon: '🔎', badge: 'adversarial', description: 'Adversarial quality check. Find gaps, inaccuracies, missing cross-references. Debate every finding.' },
  { phase: 'P7', title: 'Refinement', icon: '✨', badge: 'consensus', description: 'Address review findings. Polish every page. Achieve full consensus across all three agents.' },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getStepGradient(color: string): string {
  switch (color) {
    case 'cyan': return 'from-[var(--color-gradient-cyan)] to-[var(--color-gradient-purple)]'
    case 'green': return 'from-[var(--color-gradient-green)] to-[var(--color-gradient-cyan)]'
    case 'purple': return 'from-[var(--color-gradient-purple)] to-[var(--color-gradient-red)]'
    case 'orange': return 'from-[var(--color-gradient-orange)] to-[var(--color-gradient-red)]'
    default: return 'from-[var(--color-gradient-red)] to-[var(--color-gradient-purple)]'
  }
}

function getVariantShadow(name: string): string {
  if (name === 'fast') return 'shadow-[rgba(0,255,136,0.25)]'
  if (name === 'hard') return 'shadow-[rgba(255,136,68,0.25)]'
  return 'shadow-[rgba(136,68,255,0.25)]'
}

function getStatGradient(color: string): string {
  switch (color) {
    case 'cyan': return 'from-[var(--color-gradient-cyan)] to-[var(--color-gradient-purple)]'
    case 'purple': return 'from-[var(--color-gradient-purple)] to-[var(--color-gradient-red)]'
    case 'green': return 'from-[var(--color-gradient-green)] to-[var(--color-gradient-cyan)]'
    case 'orange': return 'from-[var(--color-gradient-orange)] to-[var(--color-gradient-red)]'
    default: return 'from-[var(--color-gradient-red)] to-[var(--color-gradient-purple)]'
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function WikiDocumentation() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.wikiDocumentation} />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="agents" />
        <PageSideDecorations theme="agents" />
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="purple" size="lg" className="mb-6">
              New Feature
            </Badge>
            <h1 className="heading-hero mb-6">
              AI-Powered Documentation
            </h1>
            <p className="text-body text-lg mb-8">
              Turn any codebase into a comprehensive, machine-readable wiki. Three quality tiers,
              three specialized agents, and an adversarial review system ensure every page is
              accurate, complete, and always current.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-secondary)] px-4 py-4"
              >
                <span className="text-2xl block mb-1">{stat.icon}</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-cyan)] bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="block text-xs text-[var(--color-text-muted)] mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── How It Works ───────────────────────────────────────────── */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="The Documentation Pipeline"
          description="From raw source code to searchable knowledge base in six automated steps."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {pipelineSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card hoverable className="h-full">
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStepGradient(step.color)} flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <div>
                      <Badge variant={step.color as 'cyan' | 'green' | 'purple' | 'orange' | 'red'} size="sm">{step.badge}</Badge>
                      <h3 className="heading-card mt-1">Step {step.step}: {step.title}</h3>
                    </div>
                  </div>
                  <p className="text-body text-sm mb-4">{step.description}</p>
                  <div className="p-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-secondary)]">
                    <code className="text-[var(--color-text-accent)] font-mono text-xs">{step.command}</code>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Three Variants ─────────────────────────────────────────── */}
      <Section background="primary" spacing="lg">
        <SectionHeader
          title="Three Quality Tiers"
          description="Choose the right level of documentation depth for your project size and quality requirements."
        />

        <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
          {variants.map((variant, index) => (
            <motion.div
              key={variant.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className={`h-full rounded-2xl bg-gradient-to-br ${variant.gradient} border ${variant.borderColor} p-6 flex flex-col`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={variant.color} size="md">{variant.badge}</Badge>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${variant.iconBg} flex items-center justify-center shadow-lg ${getVariantShadow(variant.name)}`}>
                    <span className="text-3xl">{variant.icon}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="heading-card mb-2">
                  <code className="text-[var(--color-text-accent)] font-mono text-xl">/wiki:{variant.name}</code>
                </h3>
                <p className="text-body text-sm mb-6 flex-1">{variant.description}</p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="text-center p-2 rounded-lg bg-[var(--color-bg-primary)] bg-opacity-50">
                    <div className="text-lg font-bold text-text-primary">{variant.phases}</div>
                    <div className="text-xs text-text-muted">Phases</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-[var(--color-bg-primary)] bg-opacity-50">
                    <div className="text-lg font-bold text-text-primary">{variant.coverage}</div>
                    <div className="text-xs text-text-muted">Coverage</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-[var(--color-bg-primary)] bg-opacity-50">
                    <div className="text-lg font-bold text-text-primary">{variant.output}</div>
                    <div className="text-xs text-text-muted">Output</div>
                  </div>
                </div>

                {/* Use case */}
                <div className="mb-5 p-3 rounded-lg bg-[var(--color-bg-primary)] bg-opacity-40 border border-[var(--color-border-secondary)]">
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Best for</p>
                  <p className="text-sm text-text-secondary">{variant.useCase}</p>
                </div>

                {/* Pros */}
                <div className="mb-3">
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Pros</p>
                  {variant.pros.map((pro) => (
                    <div key={pro} className="flex items-center gap-2 mb-1">
                      <span className="text-[var(--color-text-accent)]">✓</span>
                      <span className="text-sm text-text-secondary">{pro}</span>
                    </div>
                  ))}
                </div>

                {/* Cons */}
                <div className="mb-5">
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Trade-offs</p>
                  {variant.cons.map((con) => (
                    <div key={con} className="flex items-center gap-2 mb-1">
                      <span className="text-[var(--color-gradient-orange)]">△</span>
                      <span className="text-sm text-text-secondary">{con}</span>
                    </div>
                  ))}
                </div>

                {/* Command examples */}
                <div className="space-y-2">
                  {variant.commands.map((cmd) => (
                    <div
                      key={cmd}
                      className="p-2 rounded-lg bg-[var(--color-bg-primary)] bg-opacity-60 border border-[var(--color-border-secondary)]"
                    >
                      <code className="text-[var(--color-text-accent)] font-mono text-xs">{cmd}</code>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── 9 Wiki Types ───────────────────────────────────────────── */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="9 Wiki Page Types"
          description="Every knowledge domain gets its own page type, from high-level summaries to deep entity references."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wikiTypes.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card hoverable className="h-full">
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{type.icon}</span>
                    <Badge variant={type.color as 'cyan' | 'green' | 'purple' | 'orange' | 'red'} size="sm">
                      {type.count === 'N' ? 'dynamic' : `${type.count} pages`}
                    </Badge>
                  </div>
                  <h3 className="heading-card mb-2">{type.name}</h3>
                  <p className="text-body text-sm">{type.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Golden Triangle ─────────────────────────────────────────── */}
      <Section background="primary" spacing="lg">
        <SectionHeader
          title="The :team Variant — Golden Triangle"
          description="Three specialized agents, seven phases, and adversarial debate. Quality through collaboration, not consensus."
        />

        {/* Triangle visual */}
        <motion.div
          className="max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card variant="elevated">
            <CardContent>
              <div className="relative py-8">
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 600 340"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <line x1="300" y1="55" x2="105" y2="275" stroke="rgba(136,68,255,0.2)" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="300" y1="55" x2="495" y2="275" stroke="rgba(255,136,68,0.2)" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="105" y1="275" x2="495" y2="275" stroke="rgba(0,255,136,0.2)" strokeWidth="2" strokeDasharray="6 4" />
                  <text x="180" y="155" fill="rgba(136,68,255,0.45)" fontSize="10" textAnchor="middle" transform="rotate(-55 180 155)">delegates</text>
                  <text x="420" y="155" fill="rgba(255,136,68,0.45)" fontSize="10" textAnchor="middle" transform="rotate(55 420 155)">reviews</text>
                  <text x="300" y="300" fill="rgba(0,255,136,0.45)" fontSize="10" textAnchor="middle">mailbox ↔ debate</text>
                </svg>

                <div className="flex flex-col items-center gap-16 relative z-10">
                  {/* Tech Lead */}
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--color-gradient-red)] to-[var(--color-gradient-purple)] flex items-center justify-center mb-3 shadow-lg shadow-[rgba(136,68,255,0.25)]">
                      <span className="text-3xl">👑</span>
                    </div>
                    <Badge variant="purple" size="md" className="mb-2">wiki-architect</Badge>
                    <p className="text-sm text-[var(--color-text-secondary)] max-w-[200px]">
                      Decomposes · Arbitrates · Synthesizes
                    </p>
                  </motion.div>

                  {/* Executor & Reviewer */}
                  <div className="flex justify-between w-full max-w-lg">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 }}
                    >
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--color-gradient-green)] to-[var(--color-gradient-cyan)] flex items-center justify-center mb-3 shadow-lg shadow-[rgba(0,255,136,0.25)]">
                        <span className="text-3xl">🔍</span>
                      </div>
                      <Badge variant="green" size="md" className="mb-2">wiki-extractor</Badge>
                      <p className="text-sm text-[var(--color-text-secondary)] max-w-[180px]">
                        Extracts · Generates · Defends
                      </p>
                    </motion.div>

                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 }}
                    >
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--color-gradient-orange)] to-[var(--color-gradient-red)] flex items-center justify-center mb-3 shadow-lg shadow-[rgba(255,136,68,0.25)]">
                        <span className="text-3xl">🛡️</span>
                      </div>
                      <Badge variant="orange" size="md" className="mb-2">wiki-reviewer</Badge>
                      <p className="text-sm text-[var(--color-text-secondary)] max-w-[180px]">
                        Challenges · Validates · Approves
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Agent cards */}
              <div className="grid gap-4 sm:grid-cols-3 mt-6">
                {wikiAgents.map((agent) => (
                  <div
                    key={agent.name}
                    className={`p-4 rounded-xl bg-gradient-to-br ${agent.gradient} bg-opacity-10 border border-[var(--color-border-secondary)]`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{agent.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{agent.name}</p>
                        <p className="text-xs text-text-muted">{agent.role}</p>
                      </div>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {agent.responsibilities.slice(0, 2).map((r) => (
                        <li key={r} className="text-xs text-text-secondary flex items-start gap-1">
                          <span className="text-text-accent shrink-0">•</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-text-muted italic">"{agent.tagline}"</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 7 Phases */}
        <SectionHeader
          title="7 Phases of Team Wiki Generation"
          description="Every phase follows the Golden Triangle loop: Tech Lead decomposes, Executor implements, Reviewer challenges."
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-gradient-purple)] via-[var(--color-gradient-cyan)] to-[var(--color-gradient-orange)] hidden md:block" />

            <div className="space-y-6">
              {teamPhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-gradient-purple)] to-[var(--color-gradient-cyan)] flex items-center justify-center shadow-lg shadow-[rgba(136,68,255,0.2)]">
                        <span className="text-2xl">{phase.icon}</span>
                      </div>
                    </div>

                    <Card className="flex-1">
                      <CardContent>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm font-bold text-[var(--color-text-accent)]">{phase.phase}</span>
                          <Badge variant="purple" size="sm">{phase.badge}</Badge>
                          <h3 className="heading-card">{phase.title}</h3>
                        </div>
                        <p className="text-body text-sm">{phase.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}

              {/* Consensus */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0 z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-gradient-green)] to-[var(--color-gradient-cyan)] flex items-center justify-center shadow-lg shadow-[rgba(0,255,136,0.2)]">
                      <span className="text-2xl">✅</span>
                    </div>
                  </div>
                  <div className="flex-1 p-6 rounded-xl bg-gradient-to-r from-[rgba(0,255,136,0.1)] to-[rgba(0,212,255,0.05)] border border-border-accent">
                    <h3 className="heading-card text-[var(--color-text-accent)] mb-2">100% Consensus Achieved</h3>
                    <p className="text-body">Every page challenged, defended, and verified. Ship with confidence — the wiki survives adversarial scrutiny.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Common Operations ───────────────────────────────────────── */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="Wiki Operations"
          description="Beyond generation — query, lint, and maintain your wiki with built-in commands."
        />

        <div className="max-w-3xl mx-auto">
          {/* Terminal examples */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Terminal
              command={[
                '/wiki ingest src/auth/service.ts --category development',
                '/wiki compile',
                '/wiki lint',
                '/wiki graph',
                '/wiki query "How does JWT refresh token work?"',
              ]}
              title="Agent Assistant — Wiki Operations"
            />
          </motion.div>

          {/* Operations grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {commonOperations.map((op, index) => (
              <motion.div
                key={op.cmd}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card hoverable className="h-full">
                  <CardContent>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{op.icon}</span>
                      <code className="text-[var(--color-text-accent)] font-mono text-sm">/wiki {op.cmd}</code>
                    </div>
                    <p className="text-body text-sm">{op.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Knowledge Graph ─────────────────────────────────────────── */}
      <Section background="primary" spacing="lg">
        <SectionHeader
          title="Knowledge Graph"
          description="Auto-generated Mermaid visualization. 42 nodes, ~175 edges, bidirectional wikilinks across 7 categories."
        />

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card variant="elevated">
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                {[
                  { label: 'Total Nodes', value: '42', color: 'cyan' },
                  { label: 'Total Edges', value: '~175', color: 'purple' },
                  { label: 'Categories', value: '7', color: 'green' },
                  { label: 'Top Referenced', value: 'Golden Triangle', color: 'orange' },
                  { label: 'Most Connected', value: 'Agent System', color: 'red' },
                  { label: 'Coverage', value: '100%', color: 'cyan' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border-secondary)]"
                  >
                    <div className={`text-xl font-bold bg-gradient-to-r ${getStatGradient(stat.color)} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-text-muted mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Category legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Summaries', color: '#0288d1', bg: 'bg-[#0288d1]' },
                  { label: 'Entities', color: '#7b1fa2', bg: 'bg-[#7b1fa2]' },
                  { label: 'Concepts', color: '#388e3c', bg: 'bg-[#388e3c]' },
                  { label: 'Decisions', color: '#00695c', bg: 'bg-[#00695c]' },
                  { label: 'Chronicles', color: '#616161', bg: 'bg-[#616161]' },
                  { label: 'Runbooks', color: '#f9a825', bg: 'bg-[#f9a825]' },
                  { label: 'Comparisons', color: '#f57c00', bg: 'bg-[#f57c00]' },
                ].map((cat) => (
                  <div key={cat.label} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${cat.bg}`} />
                    <span className="text-xs text-text-secondary">{cat.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

      {/* ── Why Wiki ───────────────────────────────────────────────── */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="Why AI-Powered Wiki?"
        />

        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
          {[
            {
              icon: '📚',
              title: 'Codebase to Knowledge Base',
              description: 'Transform every function, class, and module into searchable, cross-referenced wiki pages. New developers onboard in hours, not weeks.',
              color: 'cyan',
            },
            {
              icon: '🔍',
              title: 'Query Instead of Search',
              description: 'Ask natural language questions and get answers with verified source citations. "How does the auth flow work?" — instant answer with file references.',
              color: 'green',
            },
            {
              icon: '♻️',
              title: 'Always Current',
              description: 'Every wiki page is generated from live source code. Run /wiki compile to regenerate after refactors. No more outdated documentation.',
              color: 'purple',
            },
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hoverable className="h-full">
                <CardContent>
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h3 className="heading-card mb-2">{benefit.title}</h3>
                  <p className="text-body">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <Section background="gradient" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-6">Start Documenting Smarter</h2>
          <p className="text-body text-lg mb-8 max-w-xl mx-auto">
            From a single <code className="text-[var(--color-text-accent)]">/wiki:fast</code> bootstrap to a full
            Golden Triangle adversarial review — choose the quality tier that matches your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/features/agent-teams">
              See Golden Triangle Teams →
            </Button>
            <Button variant="secondary" size="lg" href="/features/commands-workflows">
              View All Commands
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
