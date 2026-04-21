import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../components/ui'
import { PageSideDecorations, GradientBackground } from '../components/decorations'
import { SEO, pageSEO } from '../components/seo'
import { 
  docSections, 
  resources, 
  quickReferenceCommands, 
  agentCategorySummary 
} from '../data'

export default function Docs() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.docs} />
      
      {/* Hero Section */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="docs" />
        <PageSideDecorations theme="docs" />
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="cyan" size="lg" className="mb-6">
              Documentation
            </Badge>
            <h1 className="heading-hero mb-6">
              Learn Agent Assistant
            </h1>
            <p className="text-body text-lg mb-8">
              Everything you need to master AI-powered development workflows 
              with specialized agents and intelligent orchestration.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Documentation Sections */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="Documentation" 
          description="Browse by topic to find what you need."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {docSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card hoverable className="h-full">
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{section.icon}</span>
                    <h3 className="heading-card">{section.title}</h3>
                  </div>
                  <p className="text-body mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="text-sm text-text-accent hover:text-text-primary transition-colors flex items-center gap-1"
                        >
                          {link.label}
                          {link.external && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Quick Reference */}
      <Section background="primary" spacing="lg">
        <SectionHeader 
          title="Quick Reference" 
          description="Commonly used commands at a glance."
        />

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-primary">
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Command</th>
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Description</th>
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Variants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quickReferenceCommands.map((row, index) => (
                      <tr 
                        key={row.cmd}
                        className={`border-b border-border-secondary ${index % 2 === 0 ? 'bg-bg-secondary/30' : ''}`}
                      >
                        <td className="py-3 px-4">
                          <code className="text-text-accent">{row.cmd}</code>
                        </td>
                        <td className="py-3 px-4 text-text-secondary">{row.desc}</td>
                        <td className="py-3 px-4">
                          <code className="text-sm text-text-muted">{row.variants}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Agent Summary */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="Agent Summary" 
          description="21 specialist agents organized by function."
        />

        <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agentCategorySummary.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-text-primary">{item.category}</h4>
                    <Badge variant="purple" size="sm">{item.count} agents</Badge>
                  </div>
                  <p className="text-small">{item.examples}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="secondary" href="/features/specialist-agents">
            View All Agents →
          </Button>
        </div>
      </Section>

      {/* Resources */}
      <Section background="gradient" spacing="lg">
        <SectionHeader 
          title="Resources" 
          description="Additional resources and community."
        />

        <div className="max-w-3xl mx-auto grid gap-4 sm:grid-cols-2">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.title}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card hoverable className="h-full">
                <CardContent>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{resource.icon}</span>
                    <h3 className="font-semibold text-text-primary">{resource.title}</h3>
                  </div>
                  <p className="text-small">{resource.description}</p>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="primary" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-6">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/installation">
              Install Agent Assistant
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
