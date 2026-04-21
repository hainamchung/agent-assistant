import { motion } from 'framer-motion'

// Decoration themes for different pages
export type DecorationTheme = 
  | 'installation'
  | 'docs'
  | 'commands'
  | 'agents'
  | 'platforms'
  | 'orchestration'
  | 'setup'
  | 'quality'
  | 'skills'

interface DecorationItem {
  text: string
  icon?: string
  color: string
}

interface DecorationConfig {
  left: DecorationItem[]
  right: DecorationItem[]
  codeLeft: string[]
  codeRight: string[]
}

// Theme configurations
const themeConfigs: Record<DecorationTheme, DecorationConfig> = {
  installation: {
    left: [
      { text: 'npm install', icon: '📦', color: '#ff4444' },
      { text: 'git clone', icon: '🔗', color: '#ff8844' },
      { text: 'curl -fsSL', icon: '⬇️', color: '#8844ff' },
      { text: 'brew install', icon: '🍺', color: '#00d4ff' },
    ],
    right: [
      { text: 'Quick Setup', icon: '⚡', color: '#00ff88' },
      { text: 'Auto Config', icon: '⚙️', color: '#8844ff' },
      { text: 'Cross Platform', icon: '🌐', color: '#ff8844' },
      { text: 'One Command', icon: '✨', color: '#00d4ff' },
    ],
    codeLeft: ['--global', '-g', '--save'],
    codeRight: ['PATH', 'HOME', 'CONFIG'],
  },
  docs: {
    left: [
      { text: 'Quick Start', icon: '🚀', color: '#00ff88' },
      { text: 'API Reference', icon: '📖', color: '#8844ff' },
      { text: 'Tutorials', icon: '📚', color: '#ff8844' },
      { text: 'Examples', icon: '💡', color: '#00d4ff' },
    ],
    right: [
      { text: 'Guides', icon: '📋', color: '#ff4444' },
      { text: 'Best Practices', icon: '✅', color: '#00ff88' },
      { text: 'FAQ', icon: '❓', color: '#8844ff' },
      { text: 'Changelog', icon: '📝', color: '#ff8844' },
    ],
    codeLeft: ['README', 'DOCS', 'GUIDE'],
    codeRight: ['.md', '.mdx', 'docs/'],
  },
  commands: {
    left: [
      { text: '/cook', icon: '👨‍🍳', color: '#ff4444' },
      { text: '/fix', icon: '🔧', color: '#ff8844' },
      { text: '/plan', icon: '📋', color: '#8844ff' },
      { text: '/debug', icon: '🐛', color: '#00d4ff' },
    ],
    right: [
      { text: '/test', icon: '🧪', color: '#00ff88' },
      { text: '/review', icon: '👀', color: '#8844ff' },
      { text: '/docs', icon: '📖', color: '#ff8844' },
      { text: '/deploy', icon: '🚀', color: '#ff4444' },
    ],
    codeLeft: [':fast', ':hard', ':auto'],
    codeRight: ['run', 'exec', 'call'],
  },
  agents: {
    left: [
      { text: 'Backend', icon: '⚙️', color: '#ff4444' },
      { text: 'Frontend', icon: '🎨', color: '#ff8844' },
      { text: 'Tester', icon: '🧪', color: '#00ff88' },
      { text: 'Debugger', icon: '🔍', color: '#00d4ff' },
    ],
    right: [
      { text: 'Planner', icon: '📋', color: '#8844ff' },
      { text: 'Reviewer', icon: '👀', color: '#ff8844' },
      { text: 'DevOps', icon: '🔄', color: '#00ff88' },
      { text: 'Security', icon: '🔒', color: '#ff4444' },
    ],
    codeLeft: ['agent', 'role', 'task'],
    codeRight: ['skill', 'spec', 'work'],
  },
  platforms: {
    left: [
      { text: 'Cursor', icon: '🖱️', color: '#8844ff' },
      { text: 'Claude', icon: '🤖', color: '#ff8844' },
      { text: 'Copilot', icon: '✈️', color: '#00d4ff' },
      { text: 'Windsurf', icon: '🏄', color: '#00ff88' },
    ],
    right: [
      { text: 'VSCode', icon: '💻', color: '#00d4ff' },
      { text: 'JetBrains', icon: '🧠', color: '#ff4444' },
      { text: 'Neovim', icon: '📝', color: '#00ff88' },
      { text: 'Terminal', icon: '⌨️', color: '#8844ff' },
    ],
    codeLeft: ['IDE', 'editor', 'tool'],
    codeRight: ['plugin', 'ext', 'add-on'],
  },
  orchestration: {
    left: [
      { text: 'Delegate', icon: '📤', color: '#8844ff' },
      { text: 'Coordinate', icon: '🔗', color: '#ff8844' },
      { text: 'Route', icon: '🔀', color: '#00d4ff' },
      { text: 'Verify', icon: '✅', color: '#00ff88' },
    ],
    right: [
      { text: 'Tier 1', icon: '🥇', color: '#ff4444' },
      { text: 'Tier 2', icon: '🥈', color: '#ff8844' },
      { text: 'Handoff', icon: '🤝', color: '#8844ff' },
      { text: 'Context', icon: '📋', color: '#00d4ff' },
    ],
    codeLeft: ['spawn', 'await', 'emit'],
    codeRight: ['sync', 'async', 'flow'],
  },
  setup: {
    left: [
      { text: 'One Time', icon: '1️⃣', color: '#00ff88' },
      { text: 'Auto Sync', icon: '🔄', color: '#8844ff' },
      { text: 'Zero Config', icon: '⚡', color: '#ff8844' },
      { text: 'Portable', icon: '📦', color: '#00d4ff' },
    ],
    right: [
      { text: 'Global', icon: '🌍', color: '#ff4444' },
      { text: 'Local', icon: '📁', color: '#ff8844' },
      { text: 'Shared', icon: '🔗', color: '#8844ff' },
      { text: 'Secure', icon: '🔒', color: '#00ff88' },
    ],
    codeLeft: ['init', 'setup', 'boot'],
    codeRight: ['load', 'start', 'run'],
  },
  quality: {
    left: [
      { text: 'Linting', icon: '🔍', color: '#ff8844' },
      { text: 'Testing', icon: '🧪', color: '#00ff88' },
      { text: 'Security', icon: '🔒', color: '#ff4444' },
      { text: 'Coverage', icon: '📊', color: '#8844ff' },
    ],
    right: [
      { text: 'CI/CD', icon: '🔄', color: '#00d4ff' },
      { text: 'Pre-commit', icon: '✋', color: '#ff8844' },
      { text: 'Review', icon: '👀', color: '#8844ff' },
      { text: 'Deploy', icon: '🚀', color: '#00ff88' },
    ],
    codeLeft: ['check', 'lint', 'test'],
    codeRight: ['pass', 'fail', 'skip'],
  },
  skills: {
    left: [
      { text: 'React', icon: '⚛️', color: '#00d4ff' },
      { text: 'TypeScript', icon: '📘', color: '#8844ff' },
      { text: 'Python', icon: '🐍', color: '#00ff88' },
      { text: 'Node.js', icon: '💚', color: '#ff8844' },
    ],
    right: [
      { text: 'AWS', icon: '☁️', color: '#ff8844' },
      { text: 'Docker', icon: '🐳', color: '#00d4ff' },
      { text: 'GraphQL', icon: '◈', color: '#ff4444' },
      { text: 'Database', icon: '🗄️', color: '#8844ff' },
    ],
    codeLeft: ['310+', 'skills', 'tools'],
    codeRight: ['match', 'load', 'use'],
  },
}

interface LeftBadgeProps {
  item: DecorationItem
  index: number
}

function LeftBadge({ item, index }: LeftBadgeProps) {
  const yPosition = 20 + index * 18
  const delay = index * 0.2

  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-secondary/70 backdrop-blur-sm border border-border-primary/40"
      style={{ 
        left: '2%',
        top: `${yPosition}%`,
        boxShadow: `0 0 15px ${item.color}15`,
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        x: 0,
      }}
      transition={{
        opacity: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
        x: {
          duration: 0.5,
          delay: delay + 0.3,
        },
      }}
    >
      {item.icon && <span className="text-sm">{item.icon}</span>}
      <span 
        className="font-mono text-xs font-medium"
        style={{ color: item.color }}
      >
        {item.text}
      </span>
    </motion.div>
  )
}

interface RightBadgeProps {
  item: DecorationItem
  index: number
}

function RightBadge({ item, index }: RightBadgeProps) {
  const yPosition = 22 + index * 17
  const delay = index * 0.2 + 0.1

  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-secondary/70 backdrop-blur-sm border border-border-primary/40"
      style={{ 
        right: '2%',
        top: `${yPosition}%`,
        boxShadow: `0 0 15px ${item.color}15`,
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        x: 0,
      }}
      transition={{
        opacity: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
        x: {
          duration: 0.5,
          delay: delay + 0.3,
        },
      }}
    >
      {item.icon && <span className="text-sm">{item.icon}</span>}
      <span 
        className="font-mono text-xs font-medium"
        style={{ color: item.color }}
      >
        {item.text}
      </span>
    </motion.div>
  )
}

function FloatingCode({ code, x, y, delay }: { code: string; x: number; y: number; delay: number }) {
  return (
    <motion.span
      className="absolute hidden xl:block font-mono text-[10px] text-text-tertiary/20 select-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.1, 0.25, 0.1],
        y: [0, -3, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {code}
    </motion.span>
  )
}

function VerticalLine({ side, color }: { side: 'left' | 'right'; color: string }) {
  return (
    <motion.div
      className={`absolute hidden lg:block w-[1px] h-24 ${side === 'left' ? 'left-[12%]' : 'right-[12%]'} top-[35%]`}
      style={{
        background: `linear-gradient(to bottom, transparent, ${color}30, transparent)`,
      }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ 
        scaleY: 1, 
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        scaleY: { duration: 0.8, delay: side === 'left' ? 0.5 : 0.7 },
        opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: side === 'left' ? 1 : 1.2 },
      }}
    />
  )
}

function FloatingDot({ x, y, delay, color }: { x: number; y: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute hidden lg:block w-1 h-1 rounded-full"
      style={{ 
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 0.5, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  )
}

interface PageSideDecorationsProps {
  theme: DecorationTheme
  className?: string
}

export function PageSideDecorations({ theme, className = '' }: PageSideDecorationsProps) {
  const config = themeConfigs[theme]
  const colors = config.left.map(i => i.color)

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {/* Left badges */}
      {config.left.map((item, index) => (
        <LeftBadge key={item.text} item={item} index={index} />
      ))}
      
      {/* Right badges */}
      {config.right.map((item, index) => (
        <RightBadge key={item.text} item={item} index={index} />
      ))}
      
      {/* Floating code - left */}
      {config.codeLeft.map((code, i) => (
        <FloatingCode 
          key={code} 
          code={code} 
          x={4 + i * 3} 
          y={30 + i * 25} 
          delay={i * 0.4} 
        />
      ))}
      
      {/* Floating code - right */}
      {config.codeRight.map((code, i) => (
        <FloatingCode 
          key={code} 
          code={code} 
          x={90 - i * 3} 
          y={35 + i * 22} 
          delay={i * 0.4 + 0.2} 
        />
      ))}
      
      {/* Vertical lines */}
      <VerticalLine side="left" color={colors[0] || '#8844ff'} />
      <VerticalLine side="right" color={colors[1] || '#00ff88'} />
      
      {/* Floating dots */}
      <FloatingDot x={6} y={45} delay={0} color={colors[0] || '#8844ff'} />
      <FloatingDot x={94} y={50} delay={0.8} color={colors[1] || '#00ff88'} />
      <FloatingDot x={8} y={70} delay={1.6} color={colors[2] || '#ff8844'} />
      <FloatingDot x={92} y={65} delay={2.4} color={colors[3] || '#00d4ff'} />
    </div>
  )
}
