import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../../components/ui'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO } from '../../components/seo'

// ---------------------------------------------------------------------------
// DATA: Competitive Comparison Matrix
// ---------------------------------------------------------------------------

interface Competitor {
  id: string
  name: string
  category: string
  color: string
}

const competitors: Competitor[] = [
  { id: 'agent-assistant', name: 'Agent Assistant', category: 'Multi-Agent Orchestrator', color: '#00d4ff' },
  { id: 'crewai', name: 'CrewAI', category: 'Multi-Agent Framework', color: '#8844ff' },
  { id: 'metagpt', name: 'MetaGPT', category: 'Multi-Agent Software Dev', color: '#ff8844' },
  { id: 'aider', name: 'Aider', category: 'AI Pair Programming', color: '#ffb347' },
  { id: 'cline', name: 'Cline', category: 'Autonomous VS Code Agent', color: '#00ff88' },
  { id: 'swe-agent', name: 'SWE-Agent', category: 'Software Engineering Agent', color: '#ff4444' },
  { id: 'cursor-rules', name: 'Cursor Rules', category: 'Prompt Configuration', color: '#888888' },
]

interface ComparisonFeature {
  name: string
  category: string
  values: Record<string, string>
}

const comparisonFeatures: ComparisonFeature[] = [
  // --- Agent Architecture ---
  {
    name: 'Specialist agents',
    category: 'Agent Architecture',
    values: {
      'agent-assistant': '21 built-in',
      crewai: 'User-defined',
      metagpt: '5 built-in roles',
      aider: '1 (single agent)',
      cline: '1 (single agent)',
      'swe-agent': '1 (single agent)',
      'cursor-rules': '0 (prompt only)',
    },
  },
  {
    name: 'Agent teams (adversarial)',
    category: 'Agent Architecture',
    values: {
      'agent-assistant': '17 teams built-in',
      crewai: 'User-defined crews',
      metagpt: 'Fixed waterfall team',
      aider: 'No multi-agent',
      cline: 'No multi-agent',
      'swe-agent': 'No multi-agent',
      'cursor-rules': 'No multi-agent',
    },
  },
  {
    name: 'A2A protocol cards',
    category: 'Agent Architecture',
    values: {
      'agent-assistant': '21 JSON cards',
      crewai: 'Agent YAML config',
      metagpt: 'SOP message passing',
      aider: 'No inter-agent',
      cline: 'No inter-agent',
      'swe-agent': 'No inter-agent',
      'cursor-rules': 'No inter-agent',
    },
  },
  {
    name: 'Role-scope enforcement',
    category: 'Agent Architecture',
    values: {
      'agent-assistant': 'Strict per-agent',
      crewai: 'Via role/goal text',
      metagpt: 'Via SOP constraints',
      aider: 'N/A single agent',
      cline: 'N/A single agent',
      'swe-agent': 'N/A single agent',
      'cursor-rules': 'Via prompt rules',
    },
  },
  // --- Skill & Knowledge ---
  {
    name: 'Curated skill library',
    category: 'Skill & Knowledge',
    values: {
      'agent-assistant': '1430+ matrix skills',
      crewai: '50+ built-in tools',
      metagpt: '~10 actions',
      aider: 'Repo-map indexer',
      cline: 'VS Code tools API',
      'swe-agent': '~15 ACI commands',
      'cursor-rules': 'Community rules',
    },
  },
  {
    name: 'Dynamic skill discovery',
    category: 'Skill & Knowledge',
    values: {
      'agent-assistant': '1400+ auto-indexed',
      crewai: 'Manual tool register',
      metagpt: 'Manual action bind',
      aider: 'Auto repo-map scan',
      cline: 'File/terminal auto',
      'swe-agent': 'Fixed ACI set',
      'cursor-rules': 'Manual .cursorrules',
    },
  },
  {
    name: 'Skill domains',
    category: 'Skill & Knowledge',
    values: {
      'agent-assistant': '19 tech domains',
      crewai: 'Uncategorized tools',
      metagpt: 'Software dev only',
      aider: 'Code editing only',
      cline: 'General-purpose',
      'swe-agent': 'Code editing only',
      'cursor-rules': 'Per-project rules',
    },
  },
  {
    name: 'Personas / behavioral profiles',
    category: 'Skill & Knowledge',
    values: {
      'agent-assistant': '6 built-in personas',
      crewai: 'Via backstory field',
      metagpt: '5 role profiles',
      aider: 'Model personality',
      cline: 'Custom sys prompt',
      'swe-agent': 'Fixed agent prompt',
      'cursor-rules': '.cursorrules file',
    },
  },
  // --- Workflow & Execution ---
  {
    name: 'Structured commands',
    category: 'Workflow & Execution',
    values: {
      'agent-assistant': '16 slash commands',
      crewai: 'kickoff() API',
      metagpt: 'CLI: metagpt "..."',
      aider: '20+ /slash cmds',
      cline: 'Natural language',
      'swe-agent': 'CLI run command',
      'cursor-rules': 'Cursor AI chat',
    },
  },
  {
    name: 'Command variants',
    category: 'Workflow & Execution',
    values: {
      'agent-assistant': '45 (:fast/:hard/:team)',
      crewai: 'No variants',
      metagpt: 'No variants',
      aider: 'No variants',
      cline: 'No variants',
      'swe-agent': 'No variants',
      'cursor-rules': 'No variants',
    },
  },
  {
    name: 'Execution topologies',
    category: 'Workflow & Execution',
    values: {
      'agent-assistant': '12 (pipeline, swarm…)',
      crewai: '3 (seq/hier/consen)',
      metagpt: '1 (waterfall SOP)',
      aider: '1 (edit-test loop)',
      cline: '1 (plan-act loop)',
      'swe-agent': '1 (ReAct loop)',
      'cursor-rules': '0 (prompt only)',
    },
  },
  {
    name: 'Tiered execution (:fast/:hard/:team)',
    category: 'Workflow & Execution',
    values: {
      'agent-assistant': '3 tiers per command',
      crewai: 'Single mode',
      metagpt: 'Single mode',
      aider: 'Single mode',
      cline: 'Single mode',
      'swe-agent': 'Single mode',
      'cursor-rules': 'Single mode',
    },
  },
  // --- Quality & Safety ---
  {
    name: 'Quality gate system',
    category: 'Quality & Safety',
    values: {
      'agent-assistant': '5-dim scoring',
      crewai: 'No built-in QA',
      metagpt: 'QA role reviews',
      aider: 'Lint/test hooks',
      cline: 'No built-in QA',
      'swe-agent': 'SWE-bench eval',
      'cursor-rules': 'No built-in QA',
    },
  },
  {
    name: 'Security guardrails',
    category: 'Quality & Safety',
    values: {
      'agent-assistant': '7 OWASP modules',
      crewai: 'No security layer',
      metagpt: 'No security layer',
      aider: 'No security layer',
      cline: 'Human approval gate',
      'swe-agent': 'Docker sandbox',
      'cursor-rules': 'No security layer',
    },
  },
  {
    name: 'Adversarial review (Golden Triangle)',
    category: 'Quality & Safety',
    values: {
      'agent-assistant': '3-role debate',
      crewai: 'No adversarial',
      metagpt: 'QA↔Engineer only',
      aider: 'No adversarial',
      cline: 'No adversarial',
      'swe-agent': 'No adversarial',
      'cursor-rules': 'No adversarial',
    },
  },
  {
    name: 'D4 Safety veto',
    category: 'Quality & Safety',
    values: {
      'agent-assistant': 'Auto-veto on fail',
      crewai: 'No safety veto',
      metagpt: 'No safety veto',
      aider: 'No safety veto',
      cline: 'Manual user reject',
      'swe-agent': 'No safety veto',
      'cursor-rules': 'No safety veto',
    },
  },
  {
    name: 'Violation escalation protocol',
    category: 'Quality & Safety',
    values: {
      'agent-assistant': '3-stage escalation',
      crewai: 'Error retry only',
      metagpt: 'Retry/abort only',
      aider: 'Git revert option',
      cline: 'Undo last action',
      'swe-agent': 'Retry/abort only',
      'cursor-rules': 'No escalation',
    },
  },
  // --- Platform & Integration ---
  {
    name: 'Platform support',
    category: 'Platform & Integration',
    values: {
      'agent-assistant': '6 IDE/CLI platforms',
      crewai: 'Python SDK + CLI',
      metagpt: 'Python SDK + CLI',
      aider: 'CLI + 20 LLM APIs',
      cline: 'VS Code extension',
      'swe-agent': 'CLI + Docker',
      'cursor-rules': 'Cursor IDE only',
    },
  },
  {
    name: 'One-time global install',
    category: 'Platform & Integration',
    values: {
      'agent-assistant': 'npx global install',
      crewai: 'Per-project venv',
      metagpt: 'Per-project venv',
      aider: 'pip global install',
      cline: 'VS Code ext store',
      'swe-agent': 'Docker per-project',
      'cursor-rules': 'Per-project file',
    },
  },
  // --- Context & Efficiency ---
  {
    name: 'Tiered context loading',
    category: 'Context & Efficiency',
    values: {
      'agent-assistant': 'NANO/MICRO/FULL',
      crewai: 'Full load always',
      metagpt: 'Full load always',
      aider: 'Repo-map auto-trim',
      cline: 'Sliding window',
      'swe-agent': '100-line window',
      'cursor-rules': 'Full load always',
    },
  },
  {
    name: 'Context budget management',
    category: 'Context & Efficiency',
    values: {
      'agent-assistant': '3-tier budget ctrl',
      crewai: 'LLM token limit',
      metagpt: 'SharedMemory pool',
      aider: 'Auto repo-map size',
      cline: 'Token truncation',
      'swe-agent': 'Fixed 100-line buf',
      'cursor-rules': 'Model ctx limit',
    },
  },
  {
    name: 'Governance rules engine',
    category: 'Context & Efficiency',
    values: {
      'agent-assistant': '42 rules engine',
      crewai: 'No rules engine',
      metagpt: 'SOP as rules',
      aider: '.aider.conf.yml',
      cline: 'Custom instructions',
      'swe-agent': 'Config YAML',
      'cursor-rules': '.cursorrules file',
    },
  },
]

const featureCategories = [...new Set(comparisonFeatures.map((f) => f.category))]

// ---------------------------------------------------------------------------
// DATA: By-the-Numbers
// ---------------------------------------------------------------------------

const keyMetrics = [
  { value: '21', label: 'Specialist Agents', detail: 'Domain experts with unique protocols', color: '#00d4ff' },
  { value: '17', label: 'Agent Teams', detail: 'Golden Triangle adversarial review', color: '#ff4444' },
  { value: '1430+', label: 'Matrix Skills', detail: 'Curated across 19 domains', color: '#00ff88' },
  { value: '12', label: 'Topologies', detail: 'Execution patterns for any workflow', color: '#8844ff' },
  { value: '16', label: 'Commands', detail: 'With 45 execution variants', color: '#ffb347' },
  { value: '6', label: 'Platforms', detail: 'Cursor · Claude · Copilot · Codex · AG · Qwen', color: '#ff8844' },
  { value: '7', label: 'Guardrails', detail: 'OWASP-aligned security modules', color: '#ff4444' },
  { value: '42', label: 'Rules', detail: 'Governance & behavior rules engine', color: '#00d4ff' },
]

// ---------------------------------------------------------------------------
// DATA: Internal Quality Scorecard
// ---------------------------------------------------------------------------

const benchmarkResults = [
  { name: 'cook:fast', fullName: 'Rapid Implementation', accuracy: 20, efficiency: 20, safety: 20, completeness: 20, communication: 16, total: 96, grade: 'A' },
  { name: 'plan:fast', fullName: 'Rapid Planning', accuracy: 20, efficiency: 20, safety: 20, completeness: 20, communication: 10, total: 90, grade: 'A' },
  { name: 'review:fast', fullName: 'Rapid Code Review', accuracy: 20, efficiency: 20, safety: 20, completeness: 20, communication: 10, total: 90, grade: 'A' },
  { name: 'fix:fast', fullName: 'Rapid Bug Fix', accuracy: 15, efficiency: 20, safety: 20, completeness: 18, communication: 14, total: 86.5, grade: 'B' },
  { name: 'test:fast', fullName: 'Rapid Test Generation', accuracy: 15, efficiency: 20, safety: 20, completeness: 18, communication: 10, total: 82.5, grade: 'B' },
]

const dimensions = [
  { name: 'Accuracy', icon: '🎯', description: 'Correct behavior, no hallucinated APIs or patterns', maxScore: 20, color: '#00d4ff' },
  { name: 'Efficiency', icon: '⚡', description: 'Context budget adherence, minimal token waste', maxScore: 20, color: '#00ff88' },
  { name: 'Safety', icon: '🛡️', description: 'OWASP-aligned security, no unsafe patterns', maxScore: 20, color: '#ff4444' },
  { name: 'Completeness', icon: '📦', description: 'All requirements addressed, edge cases covered', maxScore: 20, color: '#8844ff' },
  { name: 'Communication', icon: '💬', description: 'Clear structure, proper documentation', maxScore: 20, color: '#ffb347' },
]

// ---------------------------------------------------------------------------
// DATA: Architecture Advantages
// ---------------------------------------------------------------------------

const architectureEdges = [
  {
    title: 'Golden Triangle Adversarial Review',
    description: 'Every :team workflow runs Tech Lead + Executor + Reviewer in structured debate. No rubber-stamp approvals — the reviewer is independent and incentivized to find flaws.',
    icon: '🔺',
    unique: true,
  },
  {
    title: '12 Execution Topologies',
    description: 'Pipeline, fan-out, swarm, golden-triangle, debate-round-robin — choose the execution pattern that matches the problem shape. Competitors offer 1–3 at most.',
    icon: '🔀',
    unique: true,
  },
  {
    title: '1430+ Curated Matrix Skills',
    description: 'Skills are not just tools — they\'re domain knowledge packages with fitness scoring, variant-aware discovery, and priority-based injection. No other framework has this.',
    icon: '🧬',
    unique: true,
  },
  {
    title: 'NANO / MICRO / FULL Context Tiers',
    description: 'Agents load exactly the context they need. Simple tasks use NANO (minimal overhead), complex tasks use FULL. Token budget is a first-class concern, not an afterthought.',
    icon: '📊',
    unique: true,
  },
  {
    title: 'D4 Safety Veto Power',
    description: 'Security dimension has override authority. A perfect score on every other dimension still fails if Safety falls below threshold. OWASP-aligned, not ad-hoc.',
    icon: '🛡️',
    unique: true,
  },
  {
    title: 'Zero Per-Project Configuration',
    description: 'Install once globally. Every project gets 21 agents, 1430+ skills, 12 topologies, and 7 guardrails automatically. Competitors require per-project setup and custom agent definitions.',
    icon: '⚡',
    unique: false,
  },
]

// ---------------------------------------------------------------------------
// UI Components
// ---------------------------------------------------------------------------

function getGradeColor(grade: string): string {
  if (grade === 'A') return '#00ff88'
  if (grade === 'B') return '#00d4ff'
  if (grade === 'C') return '#ffb347'
  return '#ff4444'
}

function ScoreBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = (value / max) * 100
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-bg-tertiary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="text-xs font-mono w-10 text-right" style={{ color }}>{value}/{max}</span>
    </div>
  )
}

function CompactCellValue({ value, isHighlighted }: { value: string; isHighlighted: boolean }) {
  const str = String(value)
  const isNegative = /^(No |0 |N\/A|none)/.test(str)
  const hasNumber = /^\d/.test(str)

  if (isNegative) return <span className="text-text-muted/40 text-[10px]">{str}</span>
  if (isHighlighted) return <span className={`text-xs font-mono font-semibold ${hasNumber ? 'text-text-accent' : 'text-green-400'}`}>{str}</span>
  return <span className="text-xs font-mono text-text-secondary">{str}</span>
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function Benchmarks() {
  const [activeCategory, setActiveCategory] = useState<string>(featureCategories[0])

  const filteredFeatures = comparisonFeatures.filter((f) => f.category === activeCategory)

  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO
        title="Benchmarks — Agent Assistant vs. The Competition"
        description="See how Agent Assistant compares against CrewAI, MetaGPT, Aider, Cline, SWE-Agent, and Cursor Rules across 22 dimensions."
        pathname="/features/benchmarks"
      />

      {/* ============================================================= */}
      {/* HERO — Competitive Positioning */}
      {/* ============================================================= */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="agents" />
        <PageSideDecorations theme="agents" />
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="cyan" size="lg" className="mb-6">
              Competitive Analysis
            </Badge>
            <h1 className="heading-hero mb-6">
              How We Compare
            </h1>
            <p className="text-body text-lg mb-4 max-w-2xl mx-auto">
              Not marketing claims — verifiable feature comparison against the most popular
              multi-agent frameworks and AI coding tools. Check every cell yourself.
            </p>
            <p className="text-xs text-text-muted font-mono">
              22 dimensions &middot; 7 projects &middot; Honest assessment
            </p>
          </motion.div>

          {/* Quick summary badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { label: '21 Agents', sub: 'vs 0–5' },
              { label: '1430+ Skills', sub: 'vs 0' },
              { label: '12 Topologies', sub: 'vs 1–3' },
              { label: '6 Platforms', sub: 'vs 1' },
              { label: '89/100 QA', sub: 'Internal Score' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-bg-secondary border border-border-secondary px-4 py-3 text-center min-w-[110px]"
              >
                <div className="text-sm font-bold text-text-accent font-mono">{item.label}</div>
                <div className="text-[10px] text-text-muted mt-0.5">{item.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ============================================================= */}
      {/* COMPETITIVE COMPARISON MATRIX */}
      {/* ============================================================= */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="Feature-by-Feature Comparison"
          description="Switch categories to see how Agent Assistant stacks up across every dimension."
        />

        {/* Category tabs */}
        <div className="max-w-6xl mx-auto mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {featureCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-text-accent/10 border-text-accent/40 text-text-accent'
                    : 'bg-bg-tertiary border-border-primary text-text-muted hover:text-text-secondary hover:border-border-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <AnimatePresence mode="wait">
                <motion.table
                  key={activeCategory}
                  className="w-full text-sm"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <thead>
                    <tr className="border-b border-border-primary">
                      <th className="text-left p-3 pl-4 text-text-muted font-mono text-[11px] min-w-[180px] sticky left-0 bg-bg-secondary z-10">
                        Feature
                      </th>
                      {competitors.map((c) => (
                        <th
                          key={c.id}
                          className={`text-center p-3 font-mono text-[11px] min-w-[100px] ${
                            c.id === 'agent-assistant' ? 'text-text-accent bg-text-accent/5' : 'text-text-muted'
                          }`}
                        >
                          <div>{c.name}</div>
                          <div className="font-normal text-[9px] text-text-muted mt-0.5">{c.category}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFeatures.map((feat) => (
                      <tr key={feat.name} className="border-b border-border-primary/40 hover:bg-bg-tertiary/30 transition-colors">
                        <td className="p-3 pl-4 text-text-secondary text-xs sticky left-0 bg-bg-secondary z-10">
                          {feat.name}
                        </td>
                        {competitors.map((c) => (
                          <td
                            key={c.id}
                            className={`p-3 text-center ${c.id === 'agent-assistant' ? 'bg-text-accent/5' : ''}`}
                          >
                            <CompactCellValue
                              value={feat.values[c.id]}
                              isHighlighted={c.id === 'agent-assistant'}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </motion.table>
              </AnimatePresence>
            </CardContent>
          </Card>

          <div className="text-[11px] text-text-muted font-mono text-center mt-4">
            <span className="text-text-accent">Highlighted</span> = Agent Assistant &middot; <span className="text-text-muted/40">Dimmed</span> = Not available
          </div>
        </div>
      </Section>

      {/* ============================================================= */}
      {/* BY THE NUMBERS — Visual Metrics */}
      {/* ============================================================= */}
      <Section background="primary" spacing="lg">
        <SectionHeader
          title="By the Numbers"
          description="The raw scale of what Agent Assistant ships out of the box — no configuration needed."
        />

        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {keyMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="h-full text-center group hover:border-border-accent/30 transition-all duration-300">
                <CardContent className="py-6">
                  <div className="text-3xl font-bold font-mono mb-1" style={{ color: metric.color }}>
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-text-primary mb-1">{metric.label}</div>
                  <div className="text-[11px] text-text-muted">{metric.detail}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================================= */}
      {/* INTERNAL QUALITY SCORECARD */}
      {/* ============================================================= */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="Internal Quality Scorecard"
          description="Beyond feature comparison — we measure our own output quality across 5 dimensions with automated scoring."
        />

        {/* Aggregate */}
        <div className="max-w-4xl mx-auto mb-8">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { value: '89/100', label: 'Average Score', color: '#00d4ff' },
              { value: 'B', label: 'Overall Grade', color: '#00d4ff' },
              { value: '5', label: 'Benchmarks', color: '#8844ff' },
              { value: '≥70', label: 'Pass Threshold', color: '#00ff88' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-bg-tertiary border border-border-secondary px-4 py-4 text-center"
              >
                <div className="text-xl font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Per-benchmark cards */}
        <div className="max-w-4xl mx-auto space-y-4">
          {benchmarkResults.map((bench, i) => (
            <motion.div
              key={bench.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex items-center gap-4 p-5 md:w-56 md:border-r border-b md:border-b-0 border-border-primary">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center text-base font-bold font-mono shrink-0"
                        style={{ backgroundColor: `${getGradeColor(bench.grade)}15`, color: getGradeColor(bench.grade) }}
                      >
                        {bench.grade}
                      </div>
                      <div>
                        <div className="font-mono text-sm font-semibold text-text-primary">{bench.name}</div>
                        <div className="text-[11px] text-text-muted">{bench.fullName}</div>
                      </div>
                    </div>
                    <div className="flex-1 p-5 space-y-2">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] text-text-muted font-mono">Score Breakdown</span>
                        <span className="text-sm font-bold font-mono" style={{ color: getGradeColor(bench.grade) }}>
                          {bench.total}/100
                        </span>
                      </div>
                      {dimensions.map((dim) => {
                        const value = bench[dim.name.toLowerCase() as keyof typeof bench] as number
                        return (
                          <div key={dim.name} className="grid grid-cols-[100px_1fr] items-center gap-2">
                            <span className="text-xs text-text-secondary">{dim.icon} {dim.name}</span>
                            <ScoreBar value={value} max={dim.maxScore} color={dim.color} />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================================= */}
      {/* 5-DIMENSION MODEL */}
      {/* ============================================================= */}
      <Section background="primary" spacing="lg">
        <SectionHeader
          title="5-Dimension Evaluation Model"
          description="Most tools ask 'does it work?' We ask five harder questions."
        />

        <div className="max-w-4xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((dim, i) => (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="h-full">
                <CardContent>
                  <div className="text-2xl mb-3">{dim.icon}</div>
                  <h3 className="font-mono text-sm font-semibold mb-2" style={{ color: dim.color }}>
                    {dim.name}
                  </h3>
                  <p className="text-body text-sm">{dim.description}</p>
                  <div className="mt-3 text-xs text-text-muted font-mono">Max: {dim.maxScore} points</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className="h-full border-red-500/30">
              <CardContent>
                <div className="text-2xl mb-3">🚨</div>
                <h3 className="font-mono text-sm font-semibold mb-2 text-red-400">D4 Safety Override</h3>
                <p className="text-body text-sm">
                  Safety has veto power. If D4 score falls below threshold,
                  the entire submission fails regardless of other scores.
                </p>
                <div className="mt-3">
                  <Badge variant="red" size="sm">OWASP-Aligned</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* ============================================================= */}
      {/* WHY WE WIN — Architecture Advantages */}
      {/* ============================================================= */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="Architecture Advantages"
          description="Features competitors can't replicate with configuration alone — these require a different architecture."
        />

        <div className="max-w-4xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {architectureEdges.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className={`h-full ${item.unique ? 'border-text-accent/20' : ''}`}>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{item.icon}</span>
                    {item.unique && <Badge variant="cyan" size="sm">Unique</Badge>}
                  </div>
                  <h3 className="heading-card mb-2">{item.title}</h3>
                  <p className="text-body text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============================================================= */}
      {/* CTA */}
      {/* ============================================================= */}
      <Section background="gradient" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-4">See for Yourself</h2>
          <p className="text-body mb-6 max-w-lg mx-auto">
            Every feature in the comparison table above ships with a single <code className="text-text-accent">npx agent-assistant install</code>. No configuration required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/installation">
              Install Now →
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="https://github.com/hainamchung/agent-assistant"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source on GitHub
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
