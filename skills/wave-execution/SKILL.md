---
name: wave-execution
description: "Dependency-aware parallel execution for speed optimization. Use when implementing plans with multiple independent tasks to maximize parallelization."
---

# Wave-Based Parallel Execution

**Problem**: Sequential execution wastes time on independent tasks.

**Solution**: Group tasks into waves based on dependencies. Execute waves sequentially, tasks within waves in parallel.

---

## When to Use

```
Multiple tasks in implementation plan?
        ↓ YES
WAVE EXECUTION ← APPLY
```

**Use when:**
- 2+ independent tasks in implementation plan
- Tasks have clear dependency relationships
- Parallel execution provides clear speedup
- Subagents available for parallel dispatch

**Don't use when:**
- Single sequential task
- Tasks deeply interdependent (must run sequentially)
- No subagent dispatch capability
- Time not critical (efficiency not priority)

---

## Wave Resolution Algorithm

### Dependency Analysis

```yaml
## TASK DEPENDENCY MATRIX

Tasks:
T1: Create user model
T2: Create user API (depends on T1)
T3: Create auth API (depends on T1)
T4: Create checkout API (depends on T2, T3)
T5: Create payment API (depends on T4)
T6: Create email notification (depends on T2)

Dependency Graph:
T1 → [T2, T3]
T2 → [T4, T6]
T3 → [T4]
T4 → [T5]
T6 → []
```

### Wave Classification

| Wave | Tasks | Reason | Parallel? |
|------|-------|--------|-----------|
| Wave 1 | T1 | No dependencies | No (single task) |
| Wave 2 | T2, T3 | Depend only on T1 | YES |
| Wave 3 | T4, T6 | Depend only on Wave 2 | YES |
| Wave 4 | T5 | Depend on T4 | No (single task) |

### Wave Resolution Output

```markdown
## WAVE RESOLUTION

Wave 1 (Sequential):
└── T1: Create user model

Wave 2 (Parallel):
├── T2: Create user API
└── T3: Create auth API

Wave 3 (Parallel):
├── T4: Create checkout API
└── T6: Create email notification

Wave 4 (Sequential):
└── T5: Create payment API

Total: 6 tasks → 4 waves
Parallelization: 2.0x speedup (vs sequential)
```

---

## Execution Protocol

### Pre-Execution Checklist

```
□ All tasks identified and documented?
□ Dependencies mapped?
□ Wave boundaries determined?
□ File ownership assigned per task?
□ Parallel safety verified (no file conflicts)?
□ Sequential dependencies enforced?
□ Budget allocated per wave?
□ Verification checkpoints set?
```

### Wave Dispatch Template

```markdown
## WAVE {n} DISPATCH: {wave_description}

### TASKS IN THIS WAVE
| Task | Description | Agent | Files | Acceptance |
|------|-------------|-------|-------|------------|
| T{n}.1 | {desc} | {agent} | {files} | {criteria} |
| T{n}.2 | {desc} | {agent} | {files} | {criteria} |
| T{n}.3 | {desc} | {agent} | {files} | {criteria} |

### PARALLEL CONSTRAINTS
- ALL tasks run in PARALLEL
- ALL dependencies completed (verified)
- File ownership: EXCLUSIVE per task

### VERIFICATION
- All tasks must complete before Wave {n+1}
- Any failure blocks next wave
- Integration verified between parallel tasks
```

### Post-Wave Verification

```
□ All Wave {n} tasks complete?
□ Integration between tasks verified?
□ No file conflicts detected?
□ Dependencies for Wave {n+1} satisfied?
□ Quality maintained across parallel tasks?
```

---

## Implementation Pattern

### Plan Structure with Dependencies

```yaml
## PLAN: {feature_name}

Tasks:
- id: T1
  description: Create user model
  depends_on: []
  files: [src/models/user.ts]

- id: T2
  description: Create user API endpoints
  depends_on: [T1]
  files: [src/api/users.ts]

- id: T3
  description: Create auth middleware
  depends_on: [T1]
  files: [src/middleware/auth.ts]

- id: T4
  description: Create user service
  depends_on: [T2]
  files: [src/services/user.ts]
```

### Wave Resolution Code

```markdown
## WAVE RESOLUTION ALGORITHM

Input: tasks[] with depends_on[]

1. Build dependency graph
2. Identify tasks with no dependencies → Wave 1
3. For each remaining task:
   - If all dependencies in previous waves → assign to current wave
   - Else → wait for dependencies
4. Repeat until all tasks assigned

Output: waves[] containing task IDs
```

### Dispatch Execution

```markdown
## PARALLEL DISPATCH EXECUTION

For each wave:
1. Verify all dependencies complete
2. Dispatch all tasks in wave simultaneously
3. Wait for all tasks to complete
4. Verify integration
5. Proceed to next wave

For each task in wave:
- Spawn subagent with fresh context
- Include: task, files, acceptance criteria
- Exclude: other parallel task context
```

---

## File Conflict Prevention

### Critical Rule

```
█ ONE TASK → ONE FILE OWNER → NO SHARED FILES █
```

### Conflict Detection

```markdown
## FILE OWNERSHIP MATRIX

| File | Task Owner | Conflicts |
|------|-----------|----------|
| src/models/user.ts | T1 | None |
| src/api/users.ts | T2 | None |
| src/middleware/auth.ts | T3 | None |
| src/services/user.ts | T4 | None |
| src/types/index.ts | SHARED | ❌ CONFLICT |

Resolution: T1 creates types, T2/T3/T4 import only
```

### Resolution Strategies

| Conflict Type | Solution |
|--------------|----------|
| Shared types | Task with fewest deps creates |
| Shared utils | Extract to separate task |
| Config files | Sequential ownership |
| Test files | Match implementation ownership |

---

## Quality Assurance

### Parallel Task Quality

| Quality Dimension | Target | Check |
|-----------------|--------|-------|
| Context isolation | 100% | No cross-task context |
| File ownership | Exclusive | No shared files |
| Integration | Verified | Post-wave checks |
| Consistency | Stable | Same patterns across tasks |

### Wave Integration Verification

```markdown
## INTEGRATION VERIFICATION

After each wave:
□ All tasks completed successfully?
□ Task outputs integrate correctly?
□ No import/dependency errors?
□ Types consistent across tasks?
□ Tests pass within wave?

Before next wave:
□ Previous wave dependencies satisfied?
□ API contracts maintained?
□ Data flow consistent?
```

---

## Speed Metrics

| Metric | Sequential | Wave Parallel | Improvement |
|--------|------------|--------------|-------------|
| 6 tasks | 6 × T | 4 × T | 1.5x |
| 10 tasks | 10 × T | 5 × T | 2.0x |
| 20 tasks | 20 × T | 8 × T | 2.5x |
| 50 tasks | 50 × T | 15 × T | 3.3x |

**Formula**: Speedup = N_tasks / N_waves

---

## Integration with Fresh Context

### Parallel + Isolated = Optimal

```markdown
## DISPATCH WITH WAVE + FRESH CONTEXT

Wave 2 (T2, T3 parallel):
├── T2: Fresh context → Create user API
│   └── User model from T1 (read-only)
│   └── Fresh isolated workspace
│
└── T3: Fresh context → Create auth middleware
    └── User model from T1 (read-only)
    └── Fresh isolated workspace

Both tasks:
- Have fresh context (no pollution)
- Run in parallel (speed)
- Have exclusive file ownership
- Are independent (no conflicts)
```

---

## Anti-Patterns to Avoid

### ❌ SHARED FILE CONFLICT

```markdown
BAD:
├── T2: Create user API
│   └── edits: src/models/user.ts ❌ CONFLICT
└── T3: Create auth middleware
    └── edits: src/models/user.ts ❌ CONFLICT

GOOD:
├── T2: Create user API
│   └── creates: src/api/users.ts ✓
└── T3: Create auth middleware
    └── creates: src/middleware/auth.ts ✓
```

### ❌ CIRCULAR DEPENDENCIES

```markdown
BAD:
T2 depends on T3
T3 depends on T2
→ DEADLOCK

GOOD:
T1 → T2 → T3 → T4
→ Linear dependency
```

### ❌ EXCESSIVE PARALLELIZATION

```markdown
BAD: 50 tasks in 1 wave
→ Coordination overhead
→ Context pollution risk
→ Integration complexity

GOOD: 50 tasks in 10 waves of 5
→ Manageable parallelism
→ Clear checkpoints
→ Quality maintained
```

---

## Success Criteria

- [ ] Dependency declaration in plan structure
- [ ] Wave resolution algorithm implemented
- [ ] File ownership matrix enforced
- [ ] Parallel dispatch capability verified
- [ ] Integration checkpoints established
- [ ] Quality metrics tracked
- [ ] Speed improvement measured
