import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../../components/ui'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO } from '../../components/seo'

const topologies = [
  {
    name: 'Pipeline',
    icon: '➡️',
    description: 'Sequential phase execution — each agent completes before the next starts.',
    bestFor: 'Predictable phased delivery, standard :fast workflows',
    agents: 'Phase-ordered agents',
    color: '#00d4ff',
    pattern: 'A → B → C → D',
  },
  {
    name: 'Fan-Out',
    icon: '🔀',
    description: 'One orchestrator delegates to multiple agents in parallel, then aggregates results.',
    bestFor: 'Parallel exploration, research across multiple domains',
    agents: 'Orchestrator + N workers',
    color: '#00ff88',
    pattern: 'O → [A, B, C] → merge',
  },
  {
    name: 'Hierarchical',
    icon: '🏗️',
    description: 'Multi-level delegation with leads coordinating sub-teams.',
    bestFor: 'Complex features with clear sub-domains',
    agents: 'Lead → sub-leads → workers',
    color: '#8844ff',
    pattern: 'Lead → [Sub₁ → [W₁, W₂], Sub₂ → [W₃]]',
  },
  {
    name: 'Feature Hierarchical',
    icon: '🎯',
    description: 'Specialized hierarchical pattern for feature implementation with domain-aware routing.',
    bestFor: 'Full-stack feature builds with frontend + backend + tests',
    agents: 'Tech-lead → domain engineers',
    color: '#ff8844',
    pattern: 'TL → [FE, BE, DB] → test → review',
  },
  {
    name: 'Golden Triangle',
    icon: '🔺',
    description: 'Adversarial 3-role collaboration — Tech Lead, Executor, Reviewer with debate rounds.',
    bestFor: ':team workflows, critical tasks, security-sensitive code',
    agents: 'Tech Lead + Executor + Reviewer',
    color: '#ff4444',
    pattern: 'TL ↔ Exec ↔ Rev (debate)',
  },
  {
    name: 'Parallel Branch',
    icon: '⚡',
    description: 'Parallel execution of independent branches that merge at convergence points.',
    bestFor: 'Tasks with independent parallel tracks (e.g., frontend + backend simultaneously)',
    agents: 'Branch leads + workers',
    color: '#ffb347',
    pattern: '[Branch₁, Branch₂] → merge → validate',
  },
  {
    name: 'Swarm',
    icon: '🐝',
    description: 'All agents work simultaneously on overlapping aspects, with collective intelligence.',
    bestFor: 'Brainstorming, exploration, creative problem-solving',
    agents: 'N peer agents',
    color: '#00d4ff',
    pattern: '[A, B, C, D] ↔ collective',
  },
  {
    name: 'Round Robin',
    icon: '🔄',
    description: 'Agents take turns processing and improving the same artifact iteratively.',
    bestFor: 'Iterative refinement, document polishing, progressive improvement',
    agents: 'Rotating specialists',
    color: '#8844ff',
    pattern: 'A → B → C → A → B → ...',
  },
  {
    name: 'Debate Round Robin',
    icon: '⚖️',
    description: 'Arguments and counter-arguments in structured rotation with judging.',
    bestFor: 'Architecture decisions, trade-off analysis, adversarial reasoning',
    agents: 'Debaters + judge',
    color: '#ff4444',
    pattern: 'Pro → Con → Pro → Con → Judge',
  },
  {
    name: 'Review Pipeline',
    icon: '👁️',
    description: 'Cascading review with increasingly strict evaluators.',
    bestFor: 'Code review, quality assurance, audit workflows',
    agents: 'Author → Reviewer₁ → Reviewer₂',
    color: '#00ff88',
    pattern: 'Impl → Review → Security → Approve',
  },
  {
    name: 'Audit Pipeline',
    icon: '🔍',
    description: 'Systematic audit with specialized checkers for different concerns.',
    bestFor: 'Security audits, compliance checks, comprehensive code review',
    agents: 'Auditor chain',
    color: '#ff8844',
    pattern: 'Code → Sec → Perf → A11y → Report',
  },
  {
    name: 'Research Fan-Out',
    icon: '🔬',
    description: 'Parallel investigation across multiple information sources with synthesis.',
    bestFor: 'Technology research, best-practice analysis, competitive analysis',
    agents: 'Researchers → synthesizer',
    color: '#ffb347',
    pattern: '[R₁, R₂, R₃] → synthesize → report',
  },
]

const tierMappings = [
  { tier: ':fast', topologies: ['Pipeline'], description: 'Single sequential flow — minimum ceremony, maximum speed.' },
  { tier: ':hard', topologies: ['Pipeline', 'Fan-Out', 'Review Pipeline', 'Audit Pipeline'], description: 'Quality gates + specialized review agents in sequence and parallel.' },
  { tier: ':team', topologies: ['Golden Triangle', 'Debate Round Robin', 'Hierarchical'], description: 'Adversarial collaboration — every phase runs through debate and consensus.' },
]

export default function Topologies() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO
        title="Execution Topologies — Agent Assistant"
        description="12 execution topologies for any workflow shape: pipeline, fan-out, hierarchical, golden triangle, swarm, debate, and more."
        pathname="/features/topologies"
      />

      {/* Hero */}
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
              Execution Patterns
            </Badge>
            <h1 className="heading-hero mb-6">
              12 Execution Topologies
            </h1>
            <p className="text-body text-lg mb-8">
              Not every task has the same shape. Agent Assistant provides 12 distinct execution patterns
              so workflows can match the structure of the problem, not force problems into a single template.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-4 mt-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {tierMappings.map((tier) => (
              <div key={tier.tier} className="rounded-xl bg-bg-secondary border border-border-secondary px-3 py-3">
                <div className="text-sm font-bold text-text-accent font-mono">{tier.tier}</div>
                <div className="text-[10px] text-text-muted mt-1">{tier.topologies.length} topology</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Topology Grid */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="All Topologies"
          description="Each topology defines how agents collaborate, communicate, and hand off work."
        />

        <div className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topologies.map((topo, i) => (
            <motion.div
              key={topo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="h-full group hover:border-border-accent/30 transition-all duration-300">
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{topo.icon}</span>
                    <h3 className="font-mono text-sm font-semibold" style={{ color: topo.color }}>
                      {topo.name}
                    </h3>
                  </div>
                  <p className="text-body text-sm mb-3">{topo.description}</p>
                  
                  {/* Pattern visualization */}
                  <div className="bg-bg-tertiary rounded-md px-3 py-2 mb-3">
                    <code className="text-[11px] font-mono text-text-accent">{topo.pattern}</code>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs">
                      <span className="text-text-muted">Best for: </span>
                      <span className="text-text-secondary">{topo.bestFor}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-text-muted">Agents: </span>
                      <span className="text-text-secondary">{topo.agents}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Tier → Topology Mapping */}
      <Section background="primary" spacing="lg">
        <SectionHeader
          title="Variant → Topology Mapping"
          description="Each execution tier (:fast, :hard, :team) uses different topologies."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {tierMappings.map((tier, i) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <Badge variant={i === 0 ? 'cyan' : i === 1 ? 'orange' : 'red'} size="lg">
                        {tier.tier}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-body text-sm mb-2">{tier.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tier.topologies.map((t) => (
                          <Badge key={t} variant="default" size="sm">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Why Topologies Matter */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="Why Topologies Matter"
          description="Other frameworks use one shape for everything. That's like using a hammer for every problem."
        />

        <div className="max-w-3xl mx-auto grid gap-4 sm:grid-cols-2">
          {[
            { icon: '🎯', title: 'Problem-Shaped Execution', desc: 'A security audit needs a different flow than a brainstorm. Topologies match the shape of the problem.' },
            { icon: '⚡', title: 'No Wasted Work', desc: 'Pipeline for simple tasks, fan-out for parallel exploration. No overhead when you don\'t need it.' },
            { icon: '🔀', title: 'Composable Per-Phase', desc: 'Commands can override topology per-phase. Phase 1 uses fan-out, Phase 3 uses golden-triangle — in the same workflow.' },
            { icon: '🛡️', title: 'Built-In Quality Patterns', desc: 'Review pipeline, audit pipeline, and golden triangle have quality enforcement baked into the execution model.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="h-full">
                <CardContent>
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="heading-card mb-2">{item.title}</h3>
                  <p className="text-body text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="gradient" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-4">See Topologies in Action</h2>
          <p className="text-body mb-6 max-w-md mx-auto">
            Every :team command activates the Golden Triangle. Try it yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/features/agent-teams">
              Golden Triangle Teams →
            </Button>
            <Button variant="secondary" size="lg" href="/features/commands-workflows">
              Explore Commands
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
