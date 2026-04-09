import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type WorkflowVariant = 'fast' | 'hard' | 'team'

interface VariantConfig {
  id: WorkflowVariant
  label: string
  tagline: string
  color: string
  agents: number
  phases: string[]
  duration: string
  description: string
  animSpeed: number // seconds per phase animation
}

const VARIANTS: VariantConfig[] = [
  {
    id: 'fast',
    label: ':fast',
    tagline: 'Quick & Direct',
    color: '#00ff88',
    agents: 1,
    phases: ['Execute'],
    duration: '~10s',
    description: 'Single agent, single phase. For clear specs and simple tasks.',
    animSpeed: 0.3,
  },
  {
    id: 'hard',
    label: ':hard',
    tagline: 'Full Pipeline',
    color: '#ffb347',
    agents: 5,
    phases: ['Scout', 'Research', 'Plan', 'Implement', 'Review'],
    duration: '~2min',
    description: 'Multi-phase pipeline with quality gates between each step.',
    animSpeed: 0.6,
  },
  {
    id: 'team',
    label: ':team',
    tagline: 'Adversarial Quality',
    color: '#ff4444',
    agents: 7,
    phases: ['Discover', 'Research', 'Design', 'Plan', 'Implement', 'Test', 'Review'],
    duration: '~5min',
    description: 'Golden Triangle per phase. Output survives adversarial debate before shipping.',
    animSpeed: 0.8,
  },
]

export function WorkflowSpectrum() {
  const [selected, setSelected] = useState<WorkflowVariant>('team')
  const variant = VARIANTS.find(v => v.id === selected)!

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section intro */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-3">
            Choose Your Depth
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            The Workflow Spectrum
          </h2>
          <p className="mt-2 text-text-secondary max-w-lg mx-auto text-sm">
            From lightning-fast to maximum-quality. Same command, different depth.
          </p>
        </motion.div>

        {/* Variant selector */}
        <div className="flex justify-center gap-2 mb-10">
          {VARIANTS.map(v => (
            <button
              key={v.id}
              onClick={() => setSelected(v.id)}
              className={`px-5 py-2.5 rounded-lg font-mono text-sm transition-all duration-200 border ${
                selected === v.id
                  ? 'text-bg-primary font-semibold'
                  : 'text-text-muted hover:text-text-secondary bg-transparent'
              }`}
              style={{
                borderColor: selected === v.id ? v.color : '#1a1a3e',
                backgroundColor: selected === v.id ? v.color : 'transparent',
                color: selected === v.id ? '#080812' : undefined,
              }}
              aria-pressed={selected === v.id}
            >
              /cook{v.label}
            </button>
          ))}
        </div>

        {/* Animated visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {/* Pipeline flow */}
            <div className="relative p-6 md:p-8 rounded-xl border bg-bg-card" style={{ borderColor: `${variant.color}22` }}>
              {/* Header stats */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: variant.color }} />
                  <span className="font-mono text-sm font-semibold" style={{ color: variant.color }}>
                    /cook{variant.label}
                  </span>
                  <span className="text-xs text-text-muted">— {variant.tagline}</span>
                </div>
                <div className="flex gap-4 text-xs text-text-muted font-mono">
                  <span>{variant.agents} agents</span>
                  <span>{variant.phases.length} phases</span>
                  <span>{variant.duration}</span>
                </div>
              </div>

              {/* Phase pipeline */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {/* Start node */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border border-border-primary bg-bg-secondary flex items-center justify-center text-xs text-text-muted">
                    ▶
                  </div>
                  <span className="text-[9px] text-text-muted mt-1 font-mono">Input</span>
                </div>

                {variant.phases.map((phase, i) => (
                  <div key={phase} className="flex items-center gap-2 shrink-0">
                    {/* Connector arrow */}
                    <motion.div
                      className="w-6 h-px"
                      style={{ backgroundColor: variant.color }}
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.2, delay: i * variant.animSpeed }}
                    />

                    {/* Phase node */}
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * variant.animSpeed + 0.1 }}
                    >
                      <motion.div
                        className="px-3 py-2 rounded-lg border text-xs font-mono font-medium text-center min-w-18"
                        style={{
                          borderColor: `${variant.color}44`,
                          color: variant.color,
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 0px ${variant.color}00`,
                            `0 0 12px ${variant.color}33`,
                            `0 0 0px ${variant.color}00`,
                          ],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * variant.animSpeed + 0.3,
                          repeat: Infinity,
                          repeatDelay: variant.phases.length * variant.animSpeed,
                        }}
                      >
                        {phase}
                      </motion.div>

                      {/* Team indicator for :team variant */}
                      {selected === 'team' && (
                        <motion.div
                          className="flex gap-0.5 mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * variant.animSpeed + 0.4 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-agent-meta" title="Tech Lead" />
                          <div className="w-1.5 h-1.5 rounded-full bg-agent-execution" title="Executor" />
                          <div className="w-1.5 h-1.5 rounded-full bg-agent-validation" title="Reviewer" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                ))}

                {/* Connector to output */}
                <motion.div
                  className="w-6 h-px shrink-0"
                  style={{ backgroundColor: variant.color }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.2, delay: variant.phases.length * variant.animSpeed }}
                />

                {/* Output node */}
                <motion.div
                  className="shrink-0 flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: variant.phases.length * variant.animSpeed + 0.2 }}
                >
                  <div
                    className="w-8 h-8 rounded-full border flex items-center justify-center text-xs"
                    style={{ borderColor: variant.color, color: variant.color }}
                  >
                    ✓
                  </div>
                  <span className="text-[9px] mt-1 font-mono" style={{ color: variant.color }}>
                    Done
                  </span>
                </motion.div>
              </div>

              {/* Description */}
              <p className="mt-6 text-xs text-text-muted leading-relaxed">
                {variant.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
