import { vi } from 'vitest'

export const ReactFlow = () => <div data-testid="mock-reactflow" />
export const Background = () => null
export const Controls = () => null
export const MiniMap = () => null
export const Handle = () => null
export const Position = { Top: 'top', Bottom: 'bottom', Left: 'left', Right: 'right' }
export const MarkerType = { Arrow: 'arrow', ArrowClosed: 'arrowclosed' }
export const useNodesState = (nodes: unknown[]) => [nodes, vi.fn(), vi.fn()]
export const useEdgesState = (edges: unknown[]) => [edges, vi.fn(), vi.fn()]
export const useReactFlow = () => ({ fitView: vi.fn(), getNodes: vi.fn(), getEdges: vi.fn() })
export const ReactFlowProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>
