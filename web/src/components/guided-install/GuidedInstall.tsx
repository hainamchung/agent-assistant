import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { platforms } from '../../data/platforms'

const STEPS = [
  { id: 1, label: 'Install', icon: '📦', description: 'One command to install globally' },
  { id: 2, label: 'Platform', icon: '⚡', description: 'Detects your IDE automatically' },
  { id: 3, label: 'First Command', icon: '🚀', description: 'Run your first command' },
  { id: 4, label: 'Output', icon: '✅', description: 'See the result' },
]

export function GuidedInstall() {
  const [step, setStep] = useState(1)
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0].id)

  const platform = platforms.find(p => p.id === selectedPlatform)!

  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section intro */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-3">
            Get Started in 60 Seconds
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            From Zero to <span className="text-text-accent">/cook:team</span>
          </h2>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  step === s.id
                    ? 'bg-text-accent/10 text-text-accent border border-text-accent/30'
                    : step > s.id
                      ? 'text-text-accent/60'
                      : 'text-text-muted'
                }`}
              >
                <span>{step > s.id ? '✓' : s.icon}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-4 h-px mx-1 transition-colors ${
                    step > s.id ? 'bg-text-accent/40' : 'bg-border-primary'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-xl border border-border-primary bg-bg-card overflow-hidden">
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border-secondary bg-bg-secondary/50">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-red/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-amber/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-green/50" />
                <span className="ml-2 text-[10px] text-text-muted font-mono">
                  Step {step}: {STEPS[step - 1].description}
                </span>
              </div>

              <div className="p-5 font-mono text-xs space-y-2 min-h-36">
                {step === 1 && (
                  <>
                    <div className="text-text-muted mb-3">
                      <span className="text-gradient-amber"># Install globally via npx</span>
                    </div>
                    <div>
                      <span className="text-text-accent">$</span>{' '}
                      <span className="text-text-primary">npx agent-assistant install</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-text-secondary"
                    >
                      ⠼ Detecting platforms...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-text-accent"
                    >
                      ✓ Installed to ~/.agent-assistant/skills/
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="text-text-accent"
                    >
                      ✓ Symlinked to {platforms.length} platforms
                    </motion.div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="text-text-muted mb-3">
                      <span className="text-gradient-amber"># Platforms detected — select yours:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {platforms.map(p => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedPlatform(p.id)}
                          className={`px-3 py-1.5 rounded border transition-all text-xs ${
                            selectedPlatform === p.id
                              ? 'border-text-accent text-text-accent bg-text-accent/5'
                              : 'border-border-primary text-text-muted hover:border-border-accent/30'
                          }`}
                        >
                          {p.icon} {p.name}
                        </button>
                      ))}
                    </div>
                    <div className="text-text-secondary">
                      <span className="text-gradient-amber">config:</span> {platform.configFile}
                    </div>
                    <div className="text-text-secondary">
                      <span className="text-gradient-amber">path:</span> {platform.installPath}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="text-text-muted mb-3">
                      <span className="text-gradient-amber"># Your first command:</span>
                    </div>
                    <div>
                      <span className="text-text-accent">$</span>{' '}
                      <span className="text-text-primary">/cook:team &quot;implement user authentication&quot;</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-text-secondary"
                    >
                      🔺 Golden Triangle activating...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-text-secondary"
                    >
                      📋 Phase 1/7: Discovery — tech-lead analyzing scope
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-text-muted"
                    >
                      ⠴ Working on {platform.name}...
                    </motion.div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="text-text-muted mb-3">
                      <span className="text-gradient-amber"># Result:</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-text-accent"
                    >
                      ✅ All 7 phases complete
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-text-secondary space-y-1"
                    >
                      <div>📁 12 files created/modified</div>
                      <div>🧪 Tests: 24 passed, 0 failed</div>
                      <div>🔍 Adversarial review: all challenges resolved</div>
                      <div>📊 Quality score: 94/100</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-3 text-text-accent font-semibold"
                    >
                      Ready to ship. 🚀
                    </motion.div>
                  </>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-4 py-2 rounded-lg font-mono text-xs text-text-muted border border-border-primary hover:border-border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(Math.min(4, step + 1))}
                disabled={step === 4}
                className="px-4 py-2 rounded-lg font-mono text-xs text-text-accent border border-text-accent/30 bg-text-accent/5 hover:bg-text-accent/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
