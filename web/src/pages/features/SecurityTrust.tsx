import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../../components/ui'
import { Terminal } from '../../components/terminal'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO } from '../../components/seo'

const guardrails = [
  { name: 'auth-patterns', severity: 'critical', icon: '🔐', description: 'Authentication & authorization pattern enforcement — prevents hardcoded creds, insecure flows.' },
  { name: 'data-privacy', severity: 'critical', icon: '🛡️', description: 'PII handling, data classification, and privacy-by-design pattern enforcement.' },
  { name: 'injection-defense', severity: 'critical', icon: '💉', description: 'SQL injection, XSS, command injection, SSRF prevention — OWASP Top 10 aligned.' },
  { name: 'output-sanitization', severity: 'critical', icon: '🧹', description: 'Ensures all agent outputs are sanitized before presentation — no prompt leaking.' },
  { name: 'io-pipeline', severity: 'warning', icon: '🔄', description: 'Input/output validation pipeline — structured data flow between agents.' },
  { name: 'resource-limits', severity: 'warning', icon: '📊', description: 'Token budget enforcement, context window management, resource quota control.' },
  { name: 'violation-escalation', severity: 'critical', icon: '🚨', description: '3-stage protocol: detection → mitigation → escalation for guardrail violations.' },
]

const trustLevels = [
  { level: 'Core', color: '#00ff88', icon: '✅', description: 'Built-in agents and skills. SHA-256 verified, deeply integrated, always available.', trust: 'Implicit' },
  { level: 'Verified', color: '#00d4ff', icon: '🔒', description: 'Community-contributed but reviewed. Passed security audit and compatibility checks.', trust: 'Earned' },
  { level: 'Community', color: '#ffb347', icon: '⚠️', description: 'User-created extensions. Run in restricted context with limited permissions.', trust: 'Restricted' },
]

const securityLayers = [
  { name: 'D4 Safety Dimension', description: 'Every agent output is scored on security. D4 has veto power — a safety failure overrides all other scores.', icon: '🎯' },
  { name: 'Role-Scope Enforcement', description: 'Agents can only act within their declared scope. Backend engineers cannot modify frontend routes.', icon: '🔒' },
  { name: 'SHA-256 Integrity', description: 'All core skills and agents are fingerprinted. Tampering is detected before execution.', icon: '🔑' },
  { name: 'Quarantine Protocol', description: 'Suspicious patterns trigger quarantine — agent output is isolated and flagged for human review.', icon: '🏥' },
  { name: 'OWASP Alignment', description: 'Security guardrails map directly to OWASP Top 10. Not ad-hoc checklists — systematic coverage.', icon: '📋' },
  { name: 'Prompt Isolation', description: 'Agent prompts are sandboxed. No cross-contamination between agent contexts or user sessions.', icon: '🧱' },
]

const escalationStages = [
  { stage: 1, name: 'Detection', color: '#ffb347', description: 'Pattern matching identifies potential guardrail violation in agent output.', action: 'Flag & log' },
  { stage: 2, name: 'Mitigation', color: '#ff8844', description: 'Automated correction applied — sanitize output, redact sensitive data, or request re-generation.', action: 'Auto-fix' },
  { stage: 3, name: 'Escalation', color: '#ff4444', description: 'Violation persists after mitigation — halt execution, notify user, create incident report.', action: 'Halt & report' },
]

function SeverityBadge({ severity }: { severity: string }) {
  const variant = severity === 'critical' ? 'red' : 'orange'
  return <Badge variant={variant} size="sm">{severity}</Badge>
}

export default function SecurityTrust() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO
        title="Security & Trust — Agent Assistant"
        description="8 guardrail modules, 3-tier trust model, D4 safety veto, SHA-256 integrity, OWASP-aligned security across all agent operations."
        pathname="/features/security-trust"
      />

      {/* Hero */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="agents" />
        <PageSideDecorations theme="agents" />
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="red" size="lg" className="mb-6">
              Defense in Depth
            </Badge>
            <h1 className="heading-hero mb-6">
              Security-First Architecture
            </h1>
            <p className="text-body text-lg mb-8">
              AI agents that write code must be held to the highest security standards. 
              Agent Assistant enforces safety at every layer — from individual guardrails 
              to system-wide trust models.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { value: '8', label: 'Guardrail Modules' },
              { value: '3-Tier', label: 'Trust Model' },
              { value: 'D4', label: 'Safety Veto' },
              { value: 'SHA-256', label: 'Integrity Checks' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-bg-secondary border border-border-secondary px-4 py-4">
                <div className="text-xl font-bold text-text-accent font-mono">{stat.value}</div>
                <div className="text-xs text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Guardrail Modules */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="8 Guardrail Modules"
          description="Composable safety modules that agents reference via frontmatter. Each module targets a specific threat vector."
        />

        <div className="max-w-4xl mx-auto space-y-3">
          {guardrails.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <span className="text-xl shrink-0">{g.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-semibold text-text-primary">{g.name}</span>
                        <SeverityBadge severity={g.severity} />
                      </div>
                      <p className="text-body text-sm">{g.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Trust Levels */}
      <Section background="primary" spacing="lg">
        <SectionHeader
          title="3-Tier Trust Model"
          description="Not all code is created equal. Agent Assistant distinguishes trust levels for agents and skills."
        />

        <div className="max-w-3xl mx-auto grid gap-4 md:grid-cols-3">
          {trustLevels.map((tl, i) => (
            <motion.div
              key={tl.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full text-center" style={{ borderColor: `${tl.color}30` }}>
                <CardContent>
                  <div className="text-3xl mb-3">{tl.icon}</div>
                  <h3 className="font-mono text-sm font-semibold mb-2" style={{ color: tl.color }}>
                    {tl.level}
                  </h3>
                  <p className="text-body text-sm mb-3">{tl.description}</p>
                  <div className="text-xs text-text-muted font-mono">
                    Trust: {tl.trust}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Security Layers */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="Defense in Depth"
          description="Multiple independent security layers — if one fails, others catch the issue."
        />

        <div className="max-w-4xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {securityLayers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card className="h-full">
                <CardContent>
                  <div className="text-2xl mb-3">{layer.icon}</div>
                  <h3 className="heading-card mb-2">{layer.name}</h3>
                  <p className="text-body text-sm">{layer.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Violation Escalation */}
      <Section background="primary" spacing="lg">
        <SectionHeader
          title="3-Stage Escalation Protocol"
          description="Guardrail violations trigger a progressive response — from detection through automated mitigation to hard stop."
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border-primary hidden md:block" />
            
            <div className="space-y-6">
              {escalationStages.map((stage, i) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative"
                >
                  <Card>
                    <CardContent>
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold font-mono shrink-0 relative z-10"
                          style={{ backgroundColor: `${stage.color}20`, color: stage.color }}
                        >
                          {stage.stage}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-mono text-sm font-semibold" style={{ color: stage.color }}>
                              {stage.name}
                            </h3>
                            <Badge variant="default" size="sm">{stage.action}</Badge>
                          </div>
                          <p className="text-body text-sm">{stage.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Example: Guardrail in Agent */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="How Agents Reference Guardrails"
          description="Guardrails are declared in agent frontmatter — automatic enforcement, zero ceremony."
        />

        <div className="max-w-3xl mx-auto">
          <Terminal
            command=""
            title="backend-engineer.md"
            showPrompt={false}
            showCopy={true}
          >
            <div className="space-y-1 text-sm">
              <div className="text-text-muted">---</div>
              <div><span className="text-text-accent">guardrails:</span></div>
              <div className="pl-4"><span className="text-text-secondary">- auth-patterns</span> <span className="text-text-muted"># severity: critical</span></div>
              <div className="pl-4"><span className="text-text-secondary">- injection-defense</span> <span className="text-text-muted"># severity: critical</span></div>
              <div className="pl-4"><span className="text-text-secondary">- data-privacy</span> <span className="text-text-muted"># severity: critical</span></div>
              <div className="pl-4"><span className="text-text-secondary">- output-sanitization</span> <span className="text-text-muted"># severity: critical</span></div>
              <div className="pl-4"><span className="text-text-secondary">- resource-limits</span> <span className="text-text-muted"># severity: warning</span></div>
              <div><span className="text-text-accent">trust-level:</span> <span className="text-text-secondary">core</span></div>
              <div className="text-text-muted">---</div>
            </div>
          </Terminal>
        </div>
      </Section>

      {/* CTA */}
      <Section background="gradient" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-4">Security Without Ceremony</h2>
          <p className="text-body mb-6 max-w-md mx-auto">
            Guardrails are enforced automatically. Install Agent Assistant and 
            every agent output is security-checked from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/installation">
              Get Started →
            </Button>
            <Button variant="secondary" size="lg" href="/features/benchmarks">
              View Benchmark Scores
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
