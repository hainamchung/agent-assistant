import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../components/ui'
import { SEO, pageSEO } from '../components/seo'
import { skillDomains, totalSkills } from '../data'
import type { SkillDomain } from '../data'

// Sample contributor data
const contributors = [
  { name: 'NamCH', role: 'Creator & Maintainer', avatar: '👨‍💻' },
  { name: 'Community', role: 'Contributors', avatar: '🌍' },
]

const issueDifficultyVariant = {
  Easy: 'green',
  Medium: 'orange',
  Hard: 'red',
} as const

type IssueDifficulty = 'Easy' | 'Medium' | 'Hard'

// Sample good first issues
const goodFirstIssues: Array<{
  title: string
  description: string
  labels: string[]
  difficulty: IssueDifficulty
}> = [
  { title: 'Add a new Matrix Skill', description: 'Create a skill for a domain not yet covered', labels: ['good first issue', 'skill'], difficulty: 'Easy' },
  { title: 'Improve Documentation', description: 'Add examples to existing docs pages', labels: ['documentation'], difficulty: 'Easy' },
  { title: 'Add Command Variant', description: 'Create a new fast/hard/team variant for a command', labels: ['enhancement'], difficulty: 'Medium' },
  { title: 'Create New Agent', description: 'Define a new specialist agent with profile and skills', labels: ['agent', 'enhancement'], difficulty: 'Medium' },
  { title: 'Fix Browser Automation', description: 'Improve Playwright integration reliability', labels: ['bug', 'testing'], difficulty: 'Hard' },
]

// Contributing paths
const contributingPaths = [
  {
    icon: '🎯',
    title: 'Add a Matrix Skill',
    description: 'Drop a skill file into skills/<domain>/. See skills/README.md for the template.',
    time: '~10 min',
  },
  {
    icon: '🤖',
    title: 'Create a New Agent',
    description: 'Define an agent in agents/ with a profile, responsibilities, and skill matrix.',
    time: '~20 min',
  },
  {
    icon: '⚡',
    title: 'Add a Command Variant',
    description: 'Extend an existing command with a new :variant (fast, hard, or team).',
    time: '~30 min',
  },
  {
    icon: '📖',
    title: 'Improve Documentation',
    description: 'Every wiki page and README section is fair game for improvements.',
    time: '~5 min',
  },
]

export default function Community() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.community} />
      
      {/* Hero Section */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-bg-primary via-bg-secondary to-bg-primary" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge variant="purple" size="lg" className="mb-6">
              Open Source
            </Badge>
            <h1 className="heading-hero mb-6">
              Built by the Community, For the Community
            </h1>
            <p className="text-body text-lg mb-8">
              Agent Assistant grows through contributions. Add skills, create agents, 
              extend commands, or improve documentation — every contribution matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                href="https://github.com/hainamchung/agent-assistant"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                href="https://github.com/hainamchung/agent-assistant/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse Issues
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* GitHub Stats Section */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="Project Stats" 
          description="Help us grow the open source multi-agent orchestration standard."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: '2.1k', label: 'Stars', icon: '⭐' },
            { value: '280+', label: 'Forks', icon: '🍴' },
            { value: '21', label: 'Agents', icon: '🤖' },
            { value: totalSkills.toString(), label: 'Skills', icon: '🛠️' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-text-primary">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contributing Paths */}
      <Section background="primary" spacing="xl">
        <SectionHeader 
          title="How to Contribute" 
          description="Four ways to get started in under 30 minutes."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {contributingPaths.map((path, index) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{path.icon}</div>
                    <div className="flex-1">
                      <h3 className="heading-card mb-2">{path.title}</h3>
                      <p className="text-body mb-4">{path.description}</p>
                      <Badge variant="purple" size="sm">~{path.time}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Matrix Skills Explorer */}
      <Section background="gradient" spacing="xl">
        <SectionHeader 
          title="Matrix Skills" 
          description={`${totalSkills} skills across ${skillDomains.length} domains — and growing.`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillDomains.map((domain: SkillDomain, index: number) => (
            <motion.div
              key={domain.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full hover:border-text-accent transition-colors">
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{domain.icon}</span>
                    <div>
                      <h3 className="heading-card text-base">{domain.name}</h3>
                      <span className="text-sm text-text-muted">{domain.count} skills</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {domain.examples.slice(0, 3).map((skill: string) => (
                      <Badge key={skill} variant="default" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button variant="secondary" href="https://github.com/hainamchung/agent-assistant/tree/main/skills">
            Add Your Own Skill →
          </Button>
        </motion.div>
      </Section>

      {/* Good First Issues */}
      <Section background="secondary" spacing="xl">
        <SectionHeader 
          title="Good First Issues" 
          description="Start here if you're new to the project."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goodFirstIssues.map((issue, index) => (
            <motion.div
              key={issue.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full">
                <CardContent>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="heading-card text-base">{issue.title}</h3>
                    <Badge 
                      variant={issueDifficultyVariant[issue.difficulty]}
                      size="sm"
                    >
                      {issue.difficulty}
                    </Badge>
                  </div>
                  <p className="text-body mb-4">{issue.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {issue.labels.map((label) => (
                      <Badge key={label} variant="default" size="sm">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="primary"
            href="https://github.com/hainamchung/agent-assistant/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22"
            target="_blank"
            rel="noopener noreferrer"
          >
            View All Good First Issues →
          </Button>
        </motion.div>
      </Section>

      {/* Leaderboard / Contributors (Placeholder) */}
      <Section background="primary" spacing="xl">
        <SectionHeader 
          title="Top Contributors" 
          description="Thank you to everyone who has contributed to Agent Assistant."
        />
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent>
              <div className="space-y-4">
                {contributors.map((contributor, index) => (
                  <motion.div
                    key={contributor.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="text-3xl">{contributor.avatar}</div>
                    <div className="flex-1">
                      <h3 className="heading-card">{contributor.name}</h3>
                      <p className="text-sm text-text-muted">{contributor.role}</p>
                    </div>
                    {index === 0 && (
                      <Badge variant="purple" size="sm">Maintainer</Badge>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border-primary text-center">
                <p className="text-text-muted text-sm">
                  Want to be on this list? Submit a PR or open an issue!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="secondary" spacing="lg">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="heading-section mb-6">
            Ready to Contribute?
          </h2>
          <p className="text-body mb-8 text-lg">
            Check out CONTRIBUTING.md for the full guide, or jump straight into 
            any of the issues above.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              href="https://github.com/hainamchung/agent-assistant/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read CONTRIBUTING.md
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              href="https://github.com/hainamchung/agent-assistant/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Discussions
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
