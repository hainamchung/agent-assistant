import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SEO, pageSEO } from '../components/seo'
import { BootSequence } from '../components/boot'
import { AnimatedBackground } from '../components/background'
import { MissionControlHero } from '../components/mission-control'
import { GoldenTriangle } from '../components/golden-triangle'
import { SkillsGalaxy } from '../components/skills-galaxy'
import { WorkflowSpectrum } from '../components/workflow-spectrum'
import { PlatformSwitcher } from '../components/platform-switcher'
import { GuidedInstall } from '../components/guided-install'
import { SectionDivider } from '../components/section-divider'
import { EcosystemFeatures } from '../components/ecosystem'
import { Button } from '../components/ui'

export default function HomePage() {
  const [booted, setBooted] = useState(false)

  const handleBootComplete = useCallback(() => setBooted(true), [])

  return (
    <main className="min-h-screen bg-bg-primary relative">
      <SEO {...pageSEO.home} />

      {/* Full-page animated canvas background */}
      <AnimatedBackground />

      {/* Boot Sequence Preloader */}
      <AnimatePresence>
        {!booted && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {booted && (
        <>
          {/* Section 1: Mission Control Hero — Agent Network + Interactive Terminal */}
          <MissionControlHero />

          <SectionDivider />

          {/* Section 2: Golden Triangle — Adversarial collaboration visualization */}
          <GoldenTriangle />

          <SectionDivider color="#8844ff" />

          {/* Section 3: Skills Galaxy — 1400+ skills star field */}
          <SkillsGalaxy />

          <SectionDivider color="#00d4ff" />

          {/* Section 4: Workflow Spectrum — :fast / :hard / :team comparison */}
          <WorkflowSpectrum />

          <SectionDivider color="#ff4444" />

          {/* Section 5: Platform Switcher — Cross-platform demo */}
          <PlatformSwitcher />

          <SectionDivider color="#ffb347" />

          {/* Section 6: Ecosystem Features — guardrails, topologies, memory, rules etc. */}
          <EcosystemFeatures />

          <SectionDivider color="#00ff88" />

          {/* Section 7: Guided Install — 4-step getting started wizard */}
          <GuidedInstall />

          <SectionDivider />

          {/* Footer CTA */}
          <section className="py-20 px-4 text-center">
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">
              Ready to Ship?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Transform your AI assistant into a development team.
            </h2>
            <p className="text-text-secondary text-sm mb-8 max-w-md mx-auto">
              21 agents. 1400+ skills. 12 topologies. 8 guardrails. 6 platforms. One command.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" size="lg" href="/installation">
                Get Started →
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="https://github.com/hainamchung/agent-assistant"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Button>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
