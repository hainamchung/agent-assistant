import { FloatingBadge } from './FloatingBadge'

// Pre-defined badge data with positions and variants
const floatingBadgesData = [
  // Top left area
  { text: 'React', position: 'top-16 left-[8%]', variant: 'cyan' as const, delay: 0 },
  { text: 'TypeScript', position: 'top-28 left-[18%]', variant: 'purple' as const, delay: 0.2 },
  { text: 'Multi-Agent', position: 'top-44 left-[5%]', variant: 'orange' as const, delay: 0.4 },
  
  // Top right area
  { text: '310+ Skills', position: 'top-20 right-[12%]', variant: 'green' as const, delay: 0.6 },
  { text: 'Clean Code', position: 'top-36 right-[20%]', variant: 'cyan' as const, delay: 0.8 },
  { text: 'Debug', position: 'top-52 right-[8%]', variant: 'red' as const, delay: 1.0 },
  
  // Middle area
  { text: 'Auto Docs', position: 'top-1/3 left-[3%]', variant: 'purple' as const, delay: 1.2 },
  { text: 'Unit Test', position: 'top-1/3 right-[5%]', variant: 'green' as const, delay: 1.4 },
  
  // Bottom left area
  { text: 'SOLID', position: 'bottom-40 left-[12%]', variant: 'orange' as const, delay: 1.6 },
  { text: 'DRY', position: 'bottom-28 left-[6%]', variant: 'cyan' as const, delay: 1.8 },
  
  // Bottom right area
  { text: 'YAGNI', position: 'bottom-44 right-[15%]', variant: 'red' as const, delay: 2.0 },
  { text: 'KISS', position: 'bottom-32 right-[6%]', variant: 'purple' as const, delay: 2.2 },
  
  // Additional scattered badges
  { text: 'AI-Powered', position: 'top-2/3 left-[4%]', variant: 'green' as const, delay: 2.4 },
  { text: 'Enterprise', position: 'top-2/3 right-[3%]', variant: 'orange' as const, delay: 2.6 },
]

interface FloatingBadgesContainerProps {
  /** Additional class names for the container */
  className?: string
  /** Custom badges to display (overrides default) */
  badges?: Array<{
    text: string
    position: string
    variant?: 'red' | 'orange' | 'purple' | 'green' | 'cyan' | 'default'
    delay?: number
  }>
  /** Only show on desktop (lg+) */
  desktopOnly?: boolean
}

/**
 * Container for multiple floating badges
 * Creates a decorative background effect for hero sections
 * Hidden from screen readers as it's purely decorative
 */
export function FloatingBadgesContainer({
  className,
  badges = floatingBadgesData,
  desktopOnly = true,
}: FloatingBadgesContainerProps) {
  return (
    <div 
      className={className}
      aria-hidden="true"
    >
      {badges.map((badge) => (
        <div
          key={badge.text}
          className={`absolute ${badge.position} ${desktopOnly ? 'hidden lg:block' : ''}`}
        >
          <FloatingBadge
            variant={badge.variant}
            delay={badge.delay ?? 0}
          >
            {badge.text}
          </FloatingBadge>
        </div>
      ))}
    </div>
  )
}
