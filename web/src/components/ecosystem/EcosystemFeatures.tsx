import { motion } from 'framer-motion'

interface Feature {
  icon: string
  title: string
  count: string
  description: string
  color: string
  highlights: string[]
}

const FEATURES: Feature[] = [
  {
    icon: '🛡️',
    title: 'Guardrails',
    count: '8 modules',
    description: 'Built-in security policies enforced at every agent execution.',
    color: '#ff4444',
    highlights: ['Auth patterns', 'Injection defense', 'Data privacy', 'Output sanitization', 'Resource limits', 'Violation escalation', 'I/O pipeline'],
  },
  {
    icon: '🔀',
    title: 'Topologies',
    count: '12 patterns',
    description: 'Agent collaboration patterns from simple pipeline to adversarial debate.',
    color: '#8844ff',
    highlights: ['Golden Triangle', 'Fan-out', 'Pipeline', 'Round-robin', 'Hierarchical', 'Swarm', 'Debate', 'Parallel branch'],
  },
  {
    icon: '🧠',
    title: 'Memory & Context',
    count: '8 systems',
    description: 'Multi-tier memory with compression, decay, and cross-project intelligence.',
    color: '#00d4ff',
    highlights: ['Semantic memory', 'Context compression', 'Context decay', 'Context budget', 'Decision trail', 'Handoff compression'],
  },
  {
    icon: '📏',
    title: 'Rules & Governance',
    count: '41 rules',
    description: 'Comprehensive ruleset governing quality, validation, rollback, and evolution.',
    color: '#00ff88',
    highlights: ['Validation gates', 'Quality scorecard', 'Rollback protocol', 'Pattern extraction', 'Fitness routing'],
  },
  {
    icon: '🎭',
    title: 'Personas',
    count: '4 styles',
    description: 'Voice and tone profiles for different contexts — from casual to academic.',
    color: '#ffb347',
    highlights: ['Professional', 'Casual', 'Academic', 'Mentor'],
  },
  {
    icon: '🌐',
    title: 'Multi-Platform',
    count: '6 platforms',
    description: 'One install, every IDE. Cursor, Claude Code, Copilot, Antigravity, Codex, Qwen.',
    color: '#ff8844',
    highlights: ['Hot-reload config', 'Platform packs', 'Shared skills', 'Global install'],
  },
  {
    icon: '🔌',
    title: 'MCP & A2A',
    count: '21 cards',
    description: 'Agent-to-Agent protocol cards + MCP server for tool integration.',
    color: '#00d4ff',
    highlights: ['A2A cards', 'MCP server', 'Tool discovery', 'Capability bundles'],
  },
  {
    icon: '📊',
    title: 'Benchmarks & Evaluation',
    count: 'Continuous',
    description: 'Automated performance benchmarks and quality scorecards per command.',
    color: '#8844ff',
    highlights: ['Scorecard system', 'Token prediction', 'Evaluation framework', 'Baseline tracking'],
  },
]

export function EcosystemFeatures() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section intro */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-3">
            Beyond Agents & Skills
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            Full Production Ecosystem
          </h2>
          <p className="mt-2 text-text-secondary max-w-lg mx-auto text-sm">
            Not just agents — a complete governance, memory, and quality system built for enterprise-grade AI orchestration.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group relative rounded-lg border border-border-primary bg-bg-card p-4 hover:border-border-accent/30 transition-all duration-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              {/* Top row */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{feature.icon}</span>
                <div>
                  <h3 className="font-mono text-xs font-semibold" style={{ color: feature.color }}>
                    {feature.title}
                  </h3>
                  <span className="text-[10px] text-text-muted">{feature.count}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-text-secondary leading-relaxed mb-3">
                {feature.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1">
                {feature.highlights.slice(0, 4).map(h => (
                  <span
                    key={h}
                    className="px-1.5 py-0.5 rounded text-[9px] font-mono border"
                    style={{
                      borderColor: `${feature.color}22`,
                      color: `${feature.color}cc`,
                      backgroundColor: `${feature.color}08`,
                    }}
                  >
                    {h}
                  </span>
                ))}
                {feature.highlights.length > 4 && (
                  <span className="text-[9px] text-text-muted self-center">
                    +{feature.highlights.length - 4} more
                  </span>
                )}
              </div>

              {/* Subtle accent line at top */}
              <div
                className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${feature.color}44, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
