import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { platforms } from '../../data/platforms'

const PLATFORM_ICONS: Record<string, string> = {
  cursor: '⚡',
  claude: '🤖',
  copilot: '🐙',
  antigravity: '🚀',
  codex: '📦',
  qwen: '🔮',
}

export function PlatformSwitcher() {
  const [activePlatform, setActivePlatform] = useState(platforms[0].id)
  const platform = platforms.find(p => p.id === activePlatform)!

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
            One Framework, Every Platform
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            Same Command. Same Quality. Everywhere.
          </h2>
          <p className="mt-2 text-text-secondary max-w-lg mx-auto text-sm">
            Install once globally — works across all your projects and all platforms.
          </p>
        </motion.div>

        {/* Platform tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {platforms.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePlatform(p.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 border ${
                activePlatform === p.id
                  ? 'border-text-accent bg-text-accent/10 text-text-accent'
                  : 'border-border-primary bg-transparent text-text-muted hover:text-text-secondary hover:border-border-accent/30'
              }`}
              aria-pressed={activePlatform === p.id}
            >
              <span>{PLATFORM_ICONS[p.id] || p.icon}</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>

        {/* Platform demo area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Terminal showing platform-specific install + usage */}
            <div className="rounded-lg border border-border-primary bg-bg-card overflow-hidden terminal-glow">
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border-secondary bg-bg-secondary/50">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-red/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-amber/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-green/50" />
                <span className="ml-2 text-[10px] text-text-muted font-mono">{platform.name} — terminal</span>
              </div>

              <div className="p-4 font-mono text-xs space-y-2">
                {/* Install commands */}
                <div className="text-text-muted">
                  <span className="text-text-accent">$</span> {platform.setup[0]}
                </div>
                <div className="text-text-accent">✓ Installed to {platform.installPath}</div>
                <div className="h-px bg-border-secondary my-2" />

                {/* Config file */}
                <div className="text-text-muted">
                  <span className="text-gradient-amber">config:</span> {platform.configFile}
                </div>
                <div className="text-text-muted">
                  <span className="text-gradient-amber">path:</span> {platform.installPath}
                </div>
                <div className="h-px bg-border-secondary my-2" />

                {/* Demo command */}
                <div className="text-text-muted">
                  <span className="text-text-accent">$</span> /cook:team &quot;implement JWT auth&quot;
                </div>
                <div className="text-text-secondary">
                  🔺 Golden Triangle activating on {platform.name}...
                </div>
                <div className="text-text-accent">
                  ✅ Same workflow, same agents, same quality.
                </div>
              </div>
            </div>

            {/* Features panel */}
            <div className="rounded-lg border border-border-primary bg-bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{PLATFORM_ICONS[platform.id] || platform.icon}</span>
                <div>
                  <h3 className="font-mono text-sm font-semibold text-text-primary">{platform.name}</h3>
                  <p className="text-xs text-text-muted">{platform.description}</p>
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-2 mb-4">
                {platform.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-2 text-xs"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="text-text-accent">✓</span>
                    <span className="text-text-secondary">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Steps */}
              <div className="border-t border-border-secondary pt-3">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Setup Steps</p>
                <div className="space-y-1">
                  {platform.steps.map((step, i) => (
                    <motion.div
                      key={step}
                      className="flex items-start gap-2 text-xs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      <span className="text-text-muted shrink-0">{i + 1}.</span>
                      <span className="text-text-secondary">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
