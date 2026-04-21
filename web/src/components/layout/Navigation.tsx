import { useState, useRef, useEffect, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

interface NavItem {
  label: string
  href: string
  external?: boolean
  children?: NavItem[]
}

interface NavigationProps {
  className?: string
}

const FEATURES_ITEMS: NavItem[] = [
  { label: 'One-Time Setup', href: '/features/one-time-setup' },
  { label: 'Sub-Agent Orchestration', href: '/features/sub-agent-orchestration' },
  { label: 'Multi-Platform Support', href: '/features/multi-platform-support' },
  { label: 'Matrix Skills', href: '/features/matrix-skills' },
  { label: 'Specialist Agents', href: '/features/specialist-agents' },
  { label: 'Commands & Workflows', href: '/features/commands-workflows' },
  { label: 'Quality Gates', href: '/features/quality-gates' },
  { label: 'System Architecture', href: '/features/workflow' },
  { label: 'Agent Teams', href: '/features/agent-teams' },
]

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Features',
    href: '/features',
    children: FEATURES_ITEMS,
  },
  { label: 'Installation', href: '/installation' },
  { label: 'Docs', href: '/docs' },
  {
    label: 'GitHub',
    href: 'https://github.com/hainamchung/agent-assistant',
    external: true,
  },
]

const navLinkClasses = `
  relative px-4 py-2
  text-[var(--color-text-secondary)]
  font-medium text-sm
  transition-colors duration-200
  hover:text-[var(--color-text-primary)]
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text-accent)]
  focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
  rounded-md
`

const activeLinkClasses = `
  text-[var(--color-text-accent)]
  after:content-['']
  after:absolute after:bottom-0 after:left-4 after:right-4
  after:h-0.5 after:bg-[var(--color-text-accent)]
  after:rounded-full
`

/**
 * NavLinkItem - Individual navigation link with active state
 */
function NavLinkItem({
  item,
  onClick,
}: {
  item: NavItem
  onClick?: () => void
}) {

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(navLinkClasses, 'inline-flex items-center gap-1.5')}
        onClick={onClick}
      >
        {item.label}
        <svg
          className="w-3.5 h-3.5 opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
        <span className="sr-only">(opens in new tab)</span>
      </a>
    )
  }

  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(navLinkClasses, isActive && activeLinkClasses)
      }
      onClick={onClick}
    >
      {item.label}
    </NavLink>
  )
}

/**
 * DropdownMenu - Accessible dropdown for Features submenu
 */
function DropdownMenu({
  item,
  isOpen,
  onToggle,
  onClose,
}: {
  item: NavItem
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  const isActive =
    item.children?.some(
      (child) =>
        location.pathname === child.href ||
        location.pathname.startsWith(child.href + '/')
    ) ?? false

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        buttonRef.current?.focus()
      }
      if (e.key === 'ArrowDown' && !isOpen) {
        e.preventDefault()
        onToggle()
      }
    },
    [isOpen, onClose, onToggle]
  )

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  return (
    <div ref={dropdownRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          navLinkClasses,
          'inline-flex items-center gap-1.5',
          isActive && 'text-[var(--color-text-accent)]'
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <motion.svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute top-full left-0 mt-2',
              'w-64 py-2',
              'bg-[var(--color-bg-secondary)]',
              'border border-[var(--color-border-primary)]',
              'rounded-lg shadow-xl',
              'z-50'
            )}
            role="menu"
            aria-orientation="vertical"
          >
            {item.children?.map((child) => (
              <NavLink
                key={child.href}
                to={child.href}
                className={({ isActive }) =>
                  cn(
                    'block px-4 py-2.5',
                    'text-sm text-[var(--color-text-secondary)]',
                    'hover:text-[var(--color-text-primary)]',
                    'hover:bg-[var(--color-bg-hover)]',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:bg-[var(--color-bg-hover)]',
                    isActive &&
                      'text-[var(--color-text-accent)] bg-[rgba(0,255,136,0.05)]'
                  )
                }
                onClick={onClose}
                role="menuitem"
              >
                {child.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Navigation - Desktop horizontal navigation menu
 */
export function Navigation({ className }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label))
  }

  const handleDropdownClose = () => {
    setOpenDropdown(null)
  }

  return (
    <nav
      className={cn('hidden md:flex items-center gap-1', className)}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) =>
        item.children ? (
          <DropdownMenu
            key={item.label}
            item={item}
            isOpen={openDropdown === item.label}
            onToggle={() => handleDropdownToggle(item.label)}
            onClose={handleDropdownClose}
          />
        ) : (
          <NavLinkItem key={item.href} item={item} />
        )
      )}
    </nav>
  )
}

// Export for use in MobileMenu
export { NAV_ITEMS, FEATURES_ITEMS }
