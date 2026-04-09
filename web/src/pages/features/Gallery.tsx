import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Badge, Section } from '../../components/ui'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO } from '../../components/seo'
import { AgentEditor } from '../../components/features'
import galleryData from '../../data/generated/gallery.json'

type GalleryAgent = typeof galleryData.agents[number]
type GalleryCommand = typeof galleryData.commands[number]

const categoryColors: Record<string, 'default' | 'red' | 'orange' | 'purple' | 'green' | 'cyan'> = {
  execution: 'purple',
  meta: 'cyan',
  validation: 'green',
  investigation: 'orange',
  research: 'red',
  support: 'default',
}

export default function Gallery() {
  const [tab, setTab] = useState<'agents' | 'commands'>('agents')
  const [filter, setFilter] = useState('')
  const [editingAgent, setEditingAgent] = useState<GalleryAgent | null>(null)

  const filteredAgents = useMemo(() => {
    if (!filter) return galleryData.agents
    const q = filter.toLowerCase()
    return galleryData.agents.filter(
      (a: GalleryAgent) =>
        a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.description && a.description.toLowerCase().includes(q))
    )
  }, [filter])

  const filteredCommands = useMemo(() => {
    if (!filter) return galleryData.commands
    const q = filter.toLowerCase()
    return galleryData.commands.filter(
      (c: GalleryCommand) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.variants.some((v: string) => v.toLowerCase().includes(q))
    )
  }, [filter])

  const stats = galleryData.stats

  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO
        title="Gallery — Agent Assistant"
        description="Browse all agents and commands in the agent-assistant framework"
      />

      {/* Hero */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="agents" />
        <PageSideDecorations theme="agents" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge variant="cyan" size="lg" className="mb-6">
              Framework Gallery
            </Badge>
            <h1 className="heading-hero mb-6">
              {stats.totalAgents} Agents &middot; {stats.totalCommands} Commands
            </h1>
            <p className="text-body text-lg mb-4">
              Browse the complete catalog of specialist agents and workflow commands.
            </p>
            <div className="flex justify-center gap-4 text-sm text-text-secondary">
              <span>{stats.totalVariants} variants</span>
              <span>&middot;</span>
              <span>{stats.voiceEnabled} voice-enabled</span>
              <span>&middot;</span>
              <span>{stats.guardrailCoverage} with guardrails</span>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Controls */}
      <Section background="secondary" spacing="sm">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setTab('agents')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === 'agents'
                  ? 'bg-bg-accent text-text-primary'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
              }`}
            >
              Agents ({filteredAgents.length})
            </button>
            <button
              onClick={() => setTab('commands')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === 'commands'
                  ? 'bg-bg-accent text-text-primary'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
              }`}
            >
              Commands ({filteredCommands.length})
            </button>
          </div>
          <input
            type="text"
            placeholder="Filter by name, category..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg bg-bg-tertiary border border-border-secondary text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-border-accent"
          />
        </div>
      </Section>

      {/* Agent Grid */}
      {tab === 'agents' && (
        <Section background="primary" spacing="lg">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAgents.map((agent: GalleryAgent, index: number) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group bg-bg-secondary rounded-xl border border-border-secondary p-5 hover:border-border-accent hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-text-primary group-hover:text-text-accent transition-colors">
                    {agent.name}
                  </h3>
                  <Badge
                    variant={categoryColors[agent.category] || 'default'}
                    size="sm"
                  >
                    {agent.category}
                  </Badge>
                </div>

                {agent.description && (
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {agent.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {agent.roleScope && (
                    <span className="text-xs px-2 py-0.5 rounded bg-bg-tertiary text-text-muted">
                      {agent.roleScope}
                    </span>
                  )}
                  {agent.voice && (
                    <span className="text-xs px-2 py-0.5 rounded bg-bg-tertiary text-text-muted">
                      voice ±{(agent.voice as unknown as Record<string, number>).deviation_tolerance ?? 1}
                    </span>
                  )}
                </div>

                {agent.guardrails.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {agent.guardrails.map((g: string) => (
                      <span
                        key={g}
                        className="text-xs px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setEditingAgent(agent)}
                  className="mt-3 w-full px-3 py-1.5 rounded-lg bg-bg-tertiary text-text-secondary text-xs font-medium hover:text-text-primary hover:bg-bg-accent transition-colors"
                >
                  Edit
                </button>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Command Grid */}
      {tab === 'commands' && (
        <Section background="primary" spacing="lg">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCommands.map((cmd: GalleryCommand, index: number) => (
              <motion.div
                key={cmd.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group bg-bg-secondary rounded-xl border border-border-secondary p-5 hover:border-border-accent hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-text-primary group-hover:text-text-accent transition-colors font-mono">
                    /{cmd.name}
                  </h3>
                  <Badge variant="default" size="sm">
                    {cmd.category}
                  </Badge>
                </div>

                {cmd.description && (
                  <p className="text-sm text-text-secondary mb-3">
                    {cmd.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {cmd.variants.map((v: string) => (
                    <span
                      key={v}
                      className="text-xs px-2 py-0.5 rounded bg-bg-tertiary text-text-muted font-mono"
                    >
                      :{v}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {editingAgent && (
        <AgentEditor agent={editingAgent} onClose={() => setEditingAgent(null)} />
      )}
    </main>
  )
}
