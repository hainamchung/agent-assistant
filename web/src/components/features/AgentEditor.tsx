import { useState, useEffect, useCallback } from 'react'
import { AgentPreview, type EditorState } from './AgentPreview'

const CATEGORIES = ['meta', 'execution', 'investigation', 'validation', 'research', 'support'] as const

interface AgentEditorProps {
  agent: {
    name: string
    category: string
    description?: string
    [key: string]: unknown
  }
  onClose: () => void
}

function toStringArray(val: unknown): string[] {
  if (Array.isArray(val)) return val.map(String)
  if (typeof val === 'string') return val ? [val] : []
  return []
}

function generateFrontmatter(state: EditorState): string {
  const lines: string[] = []
  lines.push(`name: ${state.name}`)
  lines.push(`role: ${state.role}`)
  lines.push(`category: ${state.category}`)
  lines.push(`description: ${state.description}`)
  lines.push(`version: ${state.version}`)

  const arrayField = (label: string, items: string[]) => {
    const filtered = items.filter((s) => s.trim())
    if (filtered.length === 0) {
      lines.push(`${label}: []`)
    } else {
      lines.push(`${label}:`)
      filtered.forEach((item) => lines.push(`  - ${item.trim()}`))
    }
  }

  arrayField('skills', state.skills)
  arrayField('constraints', state.constraints)
  arrayField('handoffs', state.handoffs)
  arrayField('capabilities', state.capabilities)

  return lines.join('\n')
}

function exportAgent(state: EditorState): void {
  const yaml = generateFrontmatter(state)
  const md = `---\n${yaml}\n---\n\n# ${state.name}\n\n${state.directive}`
  const blob = new Blob([md], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${state.name.toLowerCase().replace(/\s+/g, '-')}.md`
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 60000)
}

function initState(agent: AgentEditorProps['agent']): EditorState {
  return {
    name: String(agent.name ?? ''),
    role: String((agent as Record<string, unknown>).role ?? ''),
    category: String(agent.category ?? 'execution'),
    directive: String((agent as Record<string, unknown>).directive ?? ''),
    skills: toStringArray((agent as Record<string, unknown>).skills),
    constraints: toStringArray((agent as Record<string, unknown>).constraints),
    description: String(agent.description ?? ''),
    version: String((agent as Record<string, unknown>).version ?? '1.0.0'),
    handoffs: toStringArray((agent as Record<string, unknown>).handoffs),
    capabilities: toStringArray((agent as Record<string, unknown>).capabilities),
  }
}

const inputClass =
  'w-full px-3 py-2 rounded-lg bg-bg-tertiary border border-border-secondary text-text-primary text-sm focus:outline-none focus:border-border-accent'
const labelClass = 'block text-xs font-medium text-text-secondary mb-1'

/**
 * Modal editor for agent frontmatter with live preview and .md export.
 */
export function AgentEditor({ agent, onClose }: AgentEditorProps) {
  const [state, setState] = useState<EditorState>(() => initState(agent))

  const update = useCallback(
    <K extends keyof EditorState>(key: K, value: EditorState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  // Escape key closes modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Trap focus inside modal
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    return () => prev?.focus()
  }, [])

  const arrayToText = (arr: string[]) => arr.join('\n')
  const textToArray = (text: string) => text.split('\n')

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Edit agent: ${state.name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-bg-primary border border-border-secondary rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Banner */}
        <div className="px-6 py-3 bg-orange-500/10 border-b border-orange-500/20 text-sm text-orange-300 flex items-center gap-2">
          <span aria-hidden="true">⚠️</span>
          <span>Export-based editing — changes are not auto-saved. Use &quot;Export as .md&quot; to download your customized agent file.</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-secondary">
          <h2 className="text-lg font-semibold text-text-primary">
            Edit Agent: {state.name}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => exportAgent(state)}
              className="px-4 py-2 rounded-lg bg-text-accent text-bg-primary text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Export as .md
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-bg-tertiary text-text-secondary text-sm font-medium hover:text-text-primary transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Body: editor + preview */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Editor Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                Fields
              </h3>

              {/* Name */}
              <div>
                <label className={labelClass} htmlFor="agent-name">Name</label>
                <input
                  id="agent-name"
                  className={inputClass}
                  value={state.name}
                  onChange={(e) => update('name', e.target.value)}
                />
              </div>

              {/* Role */}
              <div>
                <label className={labelClass} htmlFor="agent-role">Role</label>
                <input
                  id="agent-role"
                  className={inputClass}
                  value={state.role}
                  onChange={(e) => update('role', e.target.value)}
                />
              </div>

              {/* Category */}
              <div>
                <label className={labelClass} htmlFor="agent-category">Category</label>
                <select
                  id="agent-category"
                  className={inputClass}
                  value={state.category}
                  onChange={(e) => update('category', e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className={labelClass} htmlFor="agent-description">Description</label>
                <textarea
                  id="agent-description"
                  className={inputClass + ' resize-y min-h-15'}
                  rows={2}
                  value={state.description}
                  onChange={(e) => update('description', e.target.value)}
                />
              </div>

              {/* Version */}
              <div>
                <label className={labelClass} htmlFor="agent-version">Version</label>
                <input
                  id="agent-version"
                  className={inputClass}
                  value={state.version}
                  onChange={(e) => update('version', e.target.value)}
                />
              </div>

              {/* Directive */}
              <div>
                <label className={labelClass} htmlFor="agent-directive">Directive</label>
                <textarea
                  id="agent-directive"
                  className={inputClass + ' resize-y min-h-20'}
                  rows={3}
                  value={state.directive}
                  onChange={(e) => update('directive', e.target.value)}
                />
              </div>

              {/* Skills */}
              <div>
                <label className={labelClass} htmlFor="agent-skills">Skills (one per line)</label>
                <textarea
                  id="agent-skills"
                  className={inputClass + ' resize-y min-h-15'}
                  rows={3}
                  value={arrayToText(state.skills)}
                  onChange={(e) => update('skills', textToArray(e.target.value))}
                />
              </div>

              {/* Constraints */}
              <div>
                <label className={labelClass} htmlFor="agent-constraints">Constraints (one per line)</label>
                <textarea
                  id="agent-constraints"
                  className={inputClass + ' resize-y min-h-15'}
                  rows={3}
                  value={arrayToText(state.constraints)}
                  onChange={(e) => update('constraints', textToArray(e.target.value))}
                />
              </div>

              {/* Handoffs */}
              <div>
                <label className={labelClass} htmlFor="agent-handoffs">Handoffs (one per line)</label>
                <textarea
                  id="agent-handoffs"
                  className={inputClass + ' resize-y min-h-15'}
                  rows={3}
                  value={arrayToText(state.handoffs)}
                  onChange={(e) => update('handoffs', textToArray(e.target.value))}
                />
              </div>

              {/* Capabilities */}
              <div>
                <label className={labelClass} htmlFor="agent-capabilities">Capabilities (one per line)</label>
                <textarea
                  id="agent-capabilities"
                  className={inputClass + ' resize-y min-h-15'}
                  rows={3}
                  value={arrayToText(state.capabilities)}
                  onChange={(e) => update('capabilities', textToArray(e.target.value))}
                />
              </div>
            </div>

            {/* Preview Column */}
            <div className="lg:sticky lg:top-0 lg:self-start">
              <AgentPreview state={state} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
