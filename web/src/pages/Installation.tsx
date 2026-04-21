import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../components/ui'
import { Terminal } from '../components/terminal'
import { PageSideDecorations, GradientBackground } from '../components/decorations'
import { SEO, pageSEO } from '../components/seo'
import { platforms, prerequisites, quickStartCommands } from '../data'

type PlatformId = 'cursor' | 'claude' | 'copilot' | 'antigravity' | 'codex'

export default function Installation() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>('cursor')
  const platform = platforms.find(p => p.id === selectedPlatform)!

  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.installation} />
      
      {/* Hero Section */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="installation" />
        <PageSideDecorations theme="installation" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge variant="green" size="lg" className="mb-6">
              Get Started
            </Badge>
            <h1 className="heading-hero mb-6">
              Installation
            </h1>
            <p className="text-body text-lg mb-8">
              Install Agent Assistant globally and start using specialized agents 
              in all your projects. Takes less than a minute.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Prerequisites */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="Prerequisites" 
          description="Make sure you have these installed before proceeding."
        />

        <div className="max-w-2xl mx-auto">
          <div className="grid gap-4 sm:grid-cols-3">
            {prerequisites.map((prereq, index) => (
              <motion.div
                key={prereq.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent>
                    <div className="text-3xl mb-2">{prereq.icon}</div>
                    <h3 className="font-semibold text-text-primary">{prereq.name}</h3>
                    <p className="text-small">{prereq.version}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Global Installation */}
      <Section background="primary" spacing="xl">
        <SectionHeader 
          title="Step 1: Global Installation" 
          description="Install Agent Assistant globally with npm."
        />

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Terminal
            command={[
              'npm install -g @namch/agent-assistant',
            ]}
            title="Installation"
          />
          
          <div className="mt-6">
            <Terminal
              command="agent-assistant --version"
              title="Verify"
            >
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-text-muted select-none mr-2">$</span>
                  <code className="text-[#00ff88]">agent-assistant --version</code>
                </div>
                <div className="text-gradient-green">
                  ✓ Agent Assistant v1.0.0 installed
                </div>
              </div>
            </Terminal>
          </div>
        </motion.div>
      </Section>

      {/* Platform Setup */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="Step 2: Platform Setup" 
          description="Select your AI coding assistant for specific instructions."
        />

        {/* Platform Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id as PlatformId)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-200
                  flex items-center gap-2 min-h-[44px]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent
                  ${selectedPlatform === p.id
                    ? 'bg-gradient-to-r from-gradient-red to-gradient-purple text-white'
                    : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-border-primary'
                  }
                `}
              >
                <span>{p.icon}</span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Platform Content */}
        <motion.div
          key={selectedPlatform}
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{platform.icon}</span>
                <div>
                  <h3 className="heading-card">{platform.name}</h3>
                  <Badge variant="green" size="sm">Full Support</Badge>
                </div>
              </div>

              <div className="grid mb-6">
                <p className="text-small text-text-accent mb-2">Install:</p>
                <code className="text-sm text-[#00ff88] bg-bg-primary px-3 py-2 rounded block overflow-x-auto">
                  {platform.setup[0]}
                </code>
              </div>
              <div className="grid mb-6">
                <p className="text-small text-text-accent mb-2">Uninstall:</p>
                <code className="text-sm text-[#00ff88] bg-bg-primary px-3 py-2 rounded block overflow-x-auto">
                  {platform.setup[1]}
                </code>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-small text-text-accent mb-2">Config Path:</p>
                  <code className="text-sm text-text-secondary bg-bg-primary px-3 py-2 rounded block overflow-x-auto">
                    {platform.installPath}
                  </code>
                </div>
                <div>
                  <p className="text-small text-text-accent mb-2">Config File:</p>
                  <code className="text-sm text-text-secondary bg-bg-primary px-3 py-2 rounded block overflow-x-auto">
                    {platform.configFile}
                  </code>
                </div>
              </div>

              <div>
                <p className="text-small text-text-accent mb-3">Setup Steps:</p>
                <ol className="space-y-2">
                  {platform.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-gradient-red to-gradient-purple flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="text-body">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

      {/* Verification */}
      <Section background="primary" spacing="lg">
        <SectionHeader 
          title="Step 3: Verify Installation" 
          description="Make sure everything is working correctly."
        />

        <div className="max-w-3xl mx-auto mb-6">
          <Terminal
            command="/cook add a hello world endpoint"
            title="Test Command"
          >
            <div className="space-y-2">
              <div className="flex">
                <span className="text-text-muted select-none mr-2">$</span>
                <code className="text-[#00ff88]">Who are you?</code>
              </div>
              <div className="text-gradient-green mt-2">
                I am Agent Assistant, your multi-agent orchestrator.
              </div>
            </div>
          </Terminal>
        </div>
        <div className="max-w-3xl mx-auto">
          <Terminal
            command="/cook add a hello world endpoint"
            title="Test Command"
          >
            <div className="space-y-2">
              <div className="flex">
                <span className="text-text-muted select-none mr-2">$</span>
                <code className="text-[#00ff88]">/cook add a hello world endpoint</code>
              </div>
              <div className="text-gradient-green mt-2">
                ✓ Orchestrator detected Agent Assistant<br />
                ✓ Loading specialist agents...<br />
                ✓ Ready to execute workflow
              </div>
            </div>
          </Terminal>
        </div>
      </Section>

      {/* Quick Start */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="Quick Start" 
          description="Try these commands to get started."
        />

        <div className="max-w-3xl mx-auto grid gap-4 md:grid-cols-2">
          {quickStartCommands.map((item, index) => (
            <motion.div
              key={item.cmd}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card hoverable>
                <CardContent>
                  <code className="text-text-accent block mb-2">{item.cmd}</code>
                  <p className="text-small">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-6">Need Help?</h2>
          <p className="text-body mb-8 max-w-xl mx-auto">
            Check out the documentation for detailed guides, or view the source on GitHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/docs">
              Read the Docs
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              href="https://github.com/anthropics/agent-assistant"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
