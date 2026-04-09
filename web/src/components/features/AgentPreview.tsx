import { useMemo } from 'react'

export interface EditorState {
  name: string
  role: string
  category: string
  directive: string
  skills: string[]
  constraints: string[]
  description: string
  version: string
  handoffs: string[]
  capabilities: string[]
}

interface AgentPreviewProps {
  state: EditorState
}

function formatYaml(state: EditorState): string {
  const lines: string[] = []
  lines.push(`name: ${state.name}`)
  lines.push(`role: ${state.role}`)
  lines.push(`category: ${state.category}`)
  lines.push(`description: ${state.description}`)
  lines.push(`version: ${state.version}`)

  const arrayField = (label: string, items: string[]) => {
    if (items.length === 0 || (items.length === 1 && items[0] === '')) {
      lines.push(`${label}: []`)
    } else {
      lines.push(`${label}:`)
      items.forEach((item) => {
        if (item.trim()) lines.push(`  - ${item.trim()}`)
      })
    }
  }

  arrayField('skills', state.skills)
  arrayField('constraints', state.constraints)
  arrayField('handoffs', state.handoffs)
  arrayField('capabilities', state.capabilities)

  return lines.join('\n')
}

/**
 * Live preview of agent frontmatter + markdown body.
 * Renders YAML as plain formatted text (no dangerouslySetInnerHTML).
 */
export function AgentPreview({ state }: AgentPreviewProps) {
  const yaml = useMemo(() => formatYaml(state), [state])

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wider">
        Preview
      </h3>
      <div
        className="flex-1 overflow-auto rounded-lg bg-bg-tertiary border border-border-secondary p-4 font-mono text-sm text-text-primary whitespace-pre-wrap"
        role="region"
        aria-label="Agent file preview"
      >
        <span className="text-text-muted">---</span>
        {'\n'}
        {yaml.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {'\n'}
          </span>
        ))}
        <span className="text-text-muted">---</span>
        {'\n\n'}
        <span className="text-text-accent font-bold">{'# '}{state.name}</span>
        {'\n\n'}
        <span>{state.directive}</span>
      </div>
    </div>
  )
}
