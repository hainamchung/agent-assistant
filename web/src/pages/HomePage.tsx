import { motion } from 'framer-motion'
import { Button, Section, SectionHeader } from '../components/ui'
import { NeuralNetwork } from '../components/neural-network'
import { TerminalAnimated } from '../components/terminal'
import { MetricCard, PlatformBadge, PlatformGrid, FeatureCard } from '../components/features'
import { HeroSideDecorations } from '../components/hero'
import { GradientBackground } from '../components/decorations'
import { SEO, pageSEO } from '../components/seo'
import { heroMetrics, quickStats, featureCards, platformBadges } from '../data'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.home} />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 overflow-hidden">
        {/* Animated Gradient Background */}
        <GradientBackground theme="home" />

        {/* Side Decorations - Commands & Features */}
        <HeroSideDecorations />

        {/* Neural Network Visualization (behind content) */}
        <div 
          className="absolute inset-0 z-[1] pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-full h-full max-w-6xl mx-auto opacity-60 md:opacity-70 [&_circle[tabindex]]:pointer-events-auto">
            <NeuralNetwork 
              metrics={heroMetrics}
              animationDelay={0.5}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          {/* Logo */}
          <motion.img
            src="/assets/logo.svg"
            alt="Agent Assistant Logo"
            className="mx-auto mb-6 h-20 w-20 md:h-24 md:w-24"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          {/* Main heading */}
          <h1 className="heading-hero mb-6">
            Multi-agent orchestration for AI coding assistants
          </h1>

          {/* Tagline */}
          <p className="mb-8 text-xl text-text-secondary md:text-2xl max-w-3xl mx-auto">
            A collection of <span className="text-text-accent font-semibold">21 Agents</span>,{' '}
            <span className="text-gradient-orange font-semibold">1400+ Skills</span>, and{' '}
            <span className="text-gradient-purple font-semibold">50+ Workflows</span> that transform 
            your AI assistant into a specialized development team.
          </p>

          {/* Terminal Install Command with Animation */}
          <motion.div
            className="mx-auto mb-8 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <TerminalAnimated
              command="npm install -g @namch/agent-assistant"
              speed={40}
              delay={1000}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button 
              className="w-[202px]"
              variant="primary" 
              size="lg"
              href="/installation"
            >
              Get Started →
            </Button>
            
            <Button 
              variant="secondary" 
              className="w-[202px]"
              size="lg"
              href="https://github.com/anthropics/agent-assistant"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="h-14 w-8 rounded-full border-2 border-border-primary p-1"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="mx-auto h-2 w-1 rounded-full bg-text-accent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Stats Section with Animated Metrics */}
      <Section background="secondary" spacing="lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MetricCard
                value={stat.value}
                label={stat.label}
              />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Features Section */}
      <Section id="features" background="primary" spacing="xl">
        <SectionHeader 
          title="Why Agent Assistant?" 
          description="Everything you need to orchestrate AI-powered development workflows with specialized agents."
        />
        
        <div className="grid gap-6 md:grid-cols-2">
          {featureCards.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard
                emoji={feature.emoji}
                title={feature.title}
                description={feature.description}
                href={feature.href}
                badge={feature.badge}
                badgeVariant="purple"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button variant="secondary" href="/features/one-time-setup">
            Explore All Features →
          </Button>
        </motion.div>
      </Section>

      {/* Supported Platforms Section */}
      <Section background="gradient" spacing="lg">
        <SectionHeader 
          title="Works With Your Favorite Tools" 
          description="Agent Assistant integrates seamlessly with all major AI coding assistants."
        />
        
        <PlatformGrid>
          {platformBadges.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <PlatformBadge
                name={platform.name}
                emoji={platform.emoji}
                status={platform.status}
              />
            </motion.div>
          ))}
        </PlatformGrid>
      </Section>

      {/* CTA Section */}
      <Section background="secondary" spacing="xl">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="heading-section mb-6">
            Ready to Transform Your Development Workflow?
          </h2>
          <p className="text-body mb-8 text-lg">
            Join developers who are already using Agent Assistant to ship faster, 
            with fewer bugs, and dramatically lower token costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/installation">
              Install Now
            </Button>
            <Button variant="secondary" size="lg" href="/docs">
              Read the Docs
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
