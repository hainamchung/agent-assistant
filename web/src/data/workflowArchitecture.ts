import type { Node, Edge } from '@xyflow/react'

/**
 * Workflow Architecture Data
 * Based on actual Agent Assistant system architecture from knowledge-architecture/00-index.md
 * 
 * WORKFLOW FLOW:
 * 1. User Request → Command Router (parse /command or natural language)
 * 2. Command Router → Workflow Engine (load workflow file)
 * 3. Workflow Engine → executes phases sequentially, governed by Rule Engine
 * 4. For each phase: Agent Delegator → selects specialist agent
 * 5. Skill Resolver → injects skills from Matrix into agent
 * 6. Tiered Execution → TIER 1 (sub-agent) or TIER 2 (embody)
 * 7. Specialist Agent → executes task with skills
 * 8. Phase Deliverable → stored, passed to next phase
 * 9. Final Deliverables → code, plans, tests, docs
 */

// Node types for custom styling
export type WorkflowNodeType = 
  | 'entry'      // User input
  | 'core'       // Orchestrator components  
  | 'rule'       // Rule engine
  | 'tier'       // Execution tiers
  | 'agent'      // Specialist agents
  | 'skill'      // Matrix skills
  | 'output'     // Deliverables
  | 'phase'      // Phase execution

export interface WorkflowNodeData {
  label: string
  description?: string
  type: WorkflowNodeType
  icon?: string
  items?: string[]
  [key: string]: unknown
}

// Layout constants for clear positioning
// Ultra-wide spacing to prevent edge overlap
const COL = {
  LEFT: -200,      // Far left for Agent Delegator
  MID_LEFT: 200,   // Mid-left for Workflow Engine, TIER 1, Agents
  CENTER: 600,     // Center for main vertical flow
  MID_RIGHT: 1000, // Mid-right for Rule Engine, TIER 2
  RIGHT: 1400,     // Far right for Skill Resolver, Skills
}

const ROW = {
  R1: 0,       // User Request
  R2: 250,     // Command Router
  R3: 500,     // Workflow Engine + Rule Engine (horizontal pair)
  R4: 780,     // Phase Loop Header
  R5: 1060,    // Agent Delegator + Skill Resolver (wide horizontal pair)
  R6: 1400,    // TIER 1 + TIER 2 (horizontal pair)
  R7: 1740,    // Agents + Skills (horizontal pair)
  R8: 2100,    // Phase Deliverable
  R9: 2400,    // Final Deliverables
}

// Define all nodes based on actual project architecture
export const workflowNodes: Node<WorkflowNodeData>[] = [
  // ═══════════════════════════════════════════════════════════════
  // ROW 1: ENTRY POINT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'user',
    type: 'custom',
    position: { x: COL.CENTER, y: ROW.R1 },
    data: {
      label: 'User Request',
      description: 'Natural language or /command',
      type: 'entry',
      icon: '👤',
      items: ['/cook:hard "add auth"', '/fix "login broken"', '"implement dark mode"'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ROW 2: COMMAND DETECTION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'command-router',
    type: 'custom',
    position: { x: COL.CENTER, y: ROW.R2 },
    data: {
      label: 'Command Router',
      description: 'Detects command type, loads workflow file',
      type: 'core',
      icon: '🔀',
      items: ['/cook → cook.md', '/fix → fix.md', 'NL → auto-detect'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ROW 3: ORCHESTRATION CORE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'workflow-engine',
    type: 'custom',
    position: { x: COL.MID_LEFT, y: ROW.R3 },
    data: {
      label: 'Workflow Engine',
      description: 'Executes phases in sequence',
      type: 'core',
      icon: '⚙️',
      items: ['Phase 1 → Phase 2 → ...', 'Verify exit criteria', 'No phase skipping'],
    },
  },
  {
    id: 'rule-engine',
    type: 'custom',
    position: { x: COL.MID_RIGHT, y: ROW.R3 },
    data: {
      label: 'Rule Engine',
      description: 'Governs all orchestration behavior',
      type: 'rule',
      icon: '📜',
      items: ['ORCHESTRATION-LAWS', 'EXECUTION-PROTOCOL', 'ADAPTIVE-EXECUTION'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ROW 4: PHASE LOOP INDICATOR
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'phase-loop',
    type: 'custom',
    position: { x: COL.CENTER, y: ROW.R4 },
    data: {
      label: 'FOR EACH PHASE',
      description: 'Research → Scout → Plan → Implement → Test → Review',
      type: 'phase',
      icon: '🔄',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ROW 5: DELEGATION & SKILL RESOLUTION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'agent-delegator',
    type: 'custom',
    position: { x: COL.LEFT, y: ROW.R5 },
    data: {
      label: 'Agent Delegator',
      description: 'Selects specialist for this phase',
      type: 'core',
      icon: '🎯',
      items: ['Phase 1 → researcher', 'Phase 2 → scouter', 'Phase 3 → planner'],
    },
  },
  {
    id: 'skill-resolver',
    type: 'custom',
    position: { x: COL.RIGHT, y: ROW.R5 },
    data: {
      label: 'Skill Resolver',
      description: 'Resolves skills from Matrix',
      type: 'skill',
      icon: '🔍',
      items: ['Agent profile → domains', 'Fitness threshold', 'Variant-aware'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ROW 6: TIERED EXECUTION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tier-1',
    type: 'custom',
    position: { x: COL.MID_LEFT, y: ROW.R6 },
    data: {
      label: 'TIER 1: Sub-Agent',
      description: 'MANDATORY when tool available',
      type: 'tier',
      icon: '🚀',
      items: ['Isolated context', 'Fresh memory', 'runSubagent()'],
    },
  },
  {
    id: 'tier-2',
    type: 'custom',
    position: { x: COL.MID_RIGHT, y: ROW.R6 },
    data: {
      label: 'TIER 2: Embody',
      description: 'FALLBACK only when TIER 1 fails',
      type: 'tier',
      icon: '🎭',
      items: ['Shared context', 'Read agent file', 'Transform into agent'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ROW 7: EXECUTION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'agents',
    type: 'custom',
    position: { x: COL.MID_LEFT, y: ROW.R7 },
    data: {
      label: '21 Specialist Agents',
      description: 'Domain experts execute tasks',
      type: 'agent',
      icon: '👥',
      items: ['tech-lead', 'backend-engineer', 'frontend-engineer', 'tester', 'reviewer', '+15 more'],
    },
  },
  {
    id: 'matrix-skills',
    type: 'custom',
    position: { x: COL.RIGHT, y: ROW.R7 },
    data: {
      label: '78 Matrix Skills',
      description: 'Injected into agents at runtime',
      type: 'skill',
      icon: '📚',
      items: ['8 domains', 'cursor tools, frontend, backend', 'ai-ml, cloud, quality', '+more...'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ROW 8: PHASE OUTPUT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'phase-deliverable',
    type: 'custom',
    position: { x: COL.CENTER, y: ROW.R8 },
    data: {
      label: 'Phase Deliverable',
      description: 'Stored & passed to next phase',
      type: 'output',
      icon: '📄',
      items: ['RESEARCH-{feature}.md', 'SCOUT-{feature}.md', 'PLAN-{feature}.md'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ROW 9: FINAL OUTPUT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'deliverables',
    type: 'custom',
    position: { x: COL.CENTER, y: ROW.R9 },
    data: {
      label: 'Final Deliverables',
      description: 'All phases complete → output',
      type: 'output',
      icon: '📦',
      items: ['Code changes', './.reports/{topic}/', './.documents/', 'Tests & docs'],
    },
  },
]

// Define edges (connections) showing data flow
// REDESIGNED: Minimize crossing with clear visual separation
export const workflowEdges: Edge[] = [
  // ═══════════════════════════════════════════════════════════════
  // MAIN VERTICAL FLOW (CENTER COLUMN)
  // ═══════════════════════════════════════════════════════════════
  
  // 1. User Request → Command Router (straight down)
  {
    id: 'e-user-command',
    source: 'user',
    target: 'command-router',
    animated: true,
    style: { stroke: '#00d4ff', strokeWidth: 3 },
    label: '1. Input',
    type: 'default',
  },

  // 2. Command Router → Workflow Engine (diagonal left)
  {
    id: 'e-command-workflow',
    source: 'command-router',
    target: 'workflow-engine',
    animated: true,
    style: { stroke: '#ff4444', strokeWidth: 3 },
    label: '2. Route',
    type: 'smoothstep',
  },

  // 3. Workflow Engine → Phase Loop (diagonal right-down)
  {
    id: 'e-workflow-phase',
    source: 'workflow-engine',
    target: 'phase-loop',
    animated: true,
    style: { stroke: '#ff4444', strokeWidth: 3 },
    label: '4. Phases',
    type: 'smoothstep',
  },

  // 8. Agents → Phase Deliverable (diagonal right-down)
  {
    id: 'e-agents-phase-output',
    source: 'agents',
    target: 'phase-deliverable',
    animated: true,
    style: { stroke: '#00ff88', strokeWidth: 3 },
    label: '8. Output',
    type: 'smoothstep',
  },

  // 9. Phase Deliverable → Final Deliverables (straight down)
  {
    id: 'e-phase-final',
    source: 'phase-deliverable',
    target: 'deliverables',
    animated: true,
    style: { stroke: '#00ff88', strokeWidth: 4 },
    label: '9. Complete',
    type: 'default',
  },

  // ═══════════════════════════════════════════════════════════════
  // HORIZONTAL RELATIONSHIPS (NO VERTICAL OVERLAP)
  // ═══════════════════════════════════════════════════════════════
  
  // Rule Engine governs Workflow (horizontal at R3)
  {
    id: 'e-workflow-rules',
    source: 'workflow-engine',
    target: 'rule-engine',
    style: { stroke: '#ff8844', strokeWidth: 2, strokeDasharray: '8,4' },
    label: '3. Govern',
    type: 'straight',
  },

  // Phase Loop → Agent Delegator (diagonal left-down)
  {
    id: 'e-phase-delegator',
    source: 'phase-loop',
    target: 'agent-delegator',
    animated: true,
    style: { stroke: '#ff4444', strokeWidth: 2 },
    label: '5. Select',
    type: 'smoothstep',
  },

  // Phase Loop → Skill Resolver (diagonal right-down)
  {
    id: 'e-phase-resolver',
    source: 'phase-loop',
    target: 'skill-resolver',
    animated: true,
    style: { stroke: '#8844ff', strokeWidth: 2 },
    label: '6. Resolve',
    type: 'smoothstep',
  },

  // ═══════════════════════════════════════════════════════════════
  // TIER EXECUTION PATHS (CLEAR SEPARATION)
  // ═══════════════════════════════════════════════════════════════
  
  // Agent Delegator → TIER 1 (straight down)
  {
    id: 'e-delegator-tier1',
    source: 'agent-delegator',
    target: 'tier-1',
    animated: true,
    style: { stroke: '#00ff88', strokeWidth: 4 },
    label: 'PRIMARY',
    type: 'default',
  },

  // Agent Delegator → TIER 2 (curved right)
  {
    id: 'e-delegator-tier2',
    source: 'agent-delegator',
    target: 'tier-2',
    style: { stroke: '#666666', strokeWidth: 2, strokeDasharray: '8,4' },
    label: 'FALLBACK',
    type: 'smoothstep',
  },

  // TIER 1 → Agents (straight down)
  {
    id: 'e-tier1-agents',
    source: 'tier-1',
    target: 'agents',
    animated: true,
    style: { stroke: '#00ff88', strokeWidth: 3 },
    type: 'default',
  },

  // TIER 2 → Agents (curved left)
  {
    id: 'e-tier2-agents',
    source: 'tier-2',
    target: 'agents',
    style: { stroke: '#666666', strokeWidth: 2, strokeDasharray: '8,4' },
    type: 'smoothstep',
  },

  // ═══════════════════════════════════════════════════════════════
  // SKILL INJECTION PATH (FAR RIGHT - NO CROSSING)
  // ═══════════════════════════════════════════════════════════════
  
  // Skill Resolver → Matrix Skills (straight down)
  {
    id: 'e-resolver-matrix',
    source: 'skill-resolver',
    target: 'matrix-skills',
    animated: true,
    style: { stroke: '#8844ff', strokeWidth: 3 },
    type: 'default',
  },

  // Matrix Skills → Agents (horizontal left)
  {
    id: 'e-matrix-agents',
    source: 'matrix-skills',
    target: 'agents',
    animated: true,
    style: { stroke: '#8844ff', strokeWidth: 2 },
    label: '7. Inject',
    type: 'smoothstep',
  },

  // ═══════════════════════════════════════════════════════════════
  // LOOP BACK (CURVED FAR RIGHT TO AVOID ALL PATHS)
  // ═══════════════════════════════════════════════════════════════
  
  // Phase Deliverable → Phase Loop (loop back)
  {
    id: 'e-phase-loop-back',
    source: 'phase-deliverable',
    target: 'phase-loop',
    style: { 
      stroke: '#ff8844', 
      strokeWidth: 2, 
      strokeDasharray: '12,6' 
    },
    label: 'Next',
    type: 'smoothstep',
  },
]

// Node type descriptions for legend
export const nodeTypeLegend: { type: WorkflowNodeType; label: string; color: string; description: string }[] = [
  {
    type: 'entry',
    label: 'Entry Point',
    color: '#00d4ff',
    description: 'User input via natural language or slash commands',
  },
  {
    type: 'core',
    label: 'Orchestrator',
    color: '#ff4444',
    description: 'Core coordination components that delegate work',
  },
  {
    type: 'rule',
    label: 'Rule Engine',
    color: '#ff8844',
    description: 'Governance protocols enforcing orchestration laws',
  },
  {
    type: 'tier',
    label: 'Execution Tier',
    color: '#00ff88',
    description: 'TIER 1 (sub-agent) or TIER 2 (embody) execution',
  },
  {
    type: 'agent',
    label: 'Specialist Agent',
    color: '#ff8844',
    description: '20 domain experts (backend, frontend, tester, etc.)',
  },
  {
    type: 'skill',
    label: 'Matrix Skills',
    color: '#8844ff',
    description: '78 skills across 8 domains injected at runtime',
  },
  {
    type: 'phase',
    label: 'Phase Loop',
    color: '#ffcc00',
    description: 'Workflow continues to next phase until completion',
  },
  {
    type: 'output',
    label: 'Deliverables',
    color: '#00ff88',
    description: 'Final output: code, plans, tests, documentation',
  },
]

// Key architectural concepts
export const architectureConcepts = [
  {
    title: 'Orchestrator Pattern',
    description: 'Central brain that coordinates all work. Never implements directly—only delegates, verifies, and synthesizes.',
    icon: '🧠',
  },
  {
    title: 'Tiered Execution',
    description: 'TIER 1 (sub-agent with isolated context) is mandatory when available. TIER 2 (embody with shared context) is fallback only.',
    icon: '⚡',
  },
  {
    title: 'Phase-Based Workflows',
    description: 'All commands execute as sequential phases: Research → Scout → Plan → Implement → Test → Review.',
    icon: '📋',
  },
  {
    title: 'Matrix Skill Discovery',
    description: 'Instead of hardcoded skills, agents declare profiles. System resolves and injects 78 skills at runtime from 8 curated domains.',
    icon: '🎯',
  },
]
