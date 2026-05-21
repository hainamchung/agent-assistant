# Detailed Workflows

> **Section**: Business Workflows | **File**: 03-detailed-workflows.md
> **Purpose**: Step-by-step flows for all 14 commands plus 3 implicit workflows

---

## /cook — Feature Development

### Flow: /cook:fast

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Requirements Intake                                      │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse user request                                          │
│ 1.2. Extract feature scope                                       │
│ 1.3. Create Requirements Registry (R1, R2, ...)                 │
│ 1.4. Verify requirements completeness                            │
│ 1.5. Lock requirements as immutable                              │
│                                                                  │
│ EXIT CRITERIA: Requirements Registry complete with all R IDs     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Implementation                                          │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Select agent based on task type                             │
│ 2.2. Analyze skills (Complex → resolve, Simple → skip)          │
│ 2.3. Inject relevant skills                                     │
│ 2.4. Delegate to TIER 1 (sub-agent) or TIER 2 (embody)         │
│ 2.5. Implement feature                                           │
│ 2.6. Verify implementation against requirements                  │
│                                                                  │
│ EXIT CRITERIA: Code written, matches requirements                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Delivery                                                │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Format output per agent format                              │
│ 3.2. Include deliverable path                                    │
│ 3.3. Verify scope compliance                                     │
│ 3.4. Complete workflow                                           │
│                                                                  │
│ EXIT CRITERIA: Deliverable ready                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Flow: /cook:hard

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Requirements Intake (Enhanced)                          │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse user request                                         │
│ 1.2. Extract ALL requirements (L2: 100% fidelity)              │
│ 1.3. Create Requirements Registry with priorities               │
│ 1.4. Identify ambiguities → ASK user for clarification         │
│ 1.5. Lock requirements as immutable                             │
│                                                                  │
│ EXIT CRITERIA: All requirements parsed, ambiguities resolved    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Planning                                                │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Delegate to planner agent                                   │
│ 2.2. Scout codebase for relevant patterns                        │
│ 2.3. Create implementation plan with milestones                  │
│ 2.4. Estimate effort per milestone                               │
│ 2.5. Identify dependencies                                       │
│ 2.6. Verify plan covers all requirements                         │
│                                                                  │
│ EXIT CRITERIA: Plan approved, milestones defined                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Implementation                                          │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Execute milestones in order                                 │
│ 3.2. For each milestone:                                        │
│     3.2.1. Select appropriate agent                              │
│     3.2.2. Inject relevant skills                               │
│     3.2.3. Implement milestone                                   │
│     3.2.4. Self-verify against plan                             │
│ 3.3. Track progress in Requirements Registry                     │
│ 3.4. Lock each milestone upon completion                         │
│                                                                  │
│ EXIT CRITERIA: All milestones complete, requirements verified    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 4: Review                                                  │
├─────────────────────────────────────────────────────────────────┤
│ 4.1. Delegate to reviewer agent                                  │
│ 4.2. Review code for:                                            │
│     - Correctness                                                │
│     - Security                                                   │
│     - Performance                                                │
│     - Standards compliance                                       │
│ 4.3. Document findings                                           │
│ 4.4. If FAIL: return to Phase 3 with fixes                      │
│ 4.5. If PASS: proceed                                            │
│                                                                  │
│ EXIT CRITERIA: Review PASS or issues resolved                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 5: Testing                                                 │
├─────────────────────────────────────────────────────────────────┤
│ 5.1. Delegate to tester agent                                     │
│ 5.2. Generate tests based on requirements                        │
│ 5.3. Ensure coverage meets threshold                             │
│ 5.4. Run tests                                                   │
│ 5.5. If failures: return to Phase 3                            │
│                                                                  │
│ EXIT CRITERIA: Tests passing, coverage adequate                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 6: Delivery                                                │
├─────────────────────────────────────────────────────────────────┤
│ 6.1. Verify all requirements met (trace to evidence)             │
│ 6.2. Verify all acceptance criteria met                          │
│ 6.3. Complete workflow with summary                              │
│                                                                  │
│ EXIT CRITERIA: Workflow complete, all criteria verified          │
└─────────────────────────────────────────────────────────────────┘
```

### Flow: /cook:team

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Requirements Intake + Team Setup                        │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse requirements (as /cook:hard)                         │
│ 1.2. Select team configuration (backend, frontend, fullstack)     │
│ 1.3. Initialize Mailbox: ./reports/{topic}/MAILBOX-{date}.md  │
│ 1.4. Spawn Golden Triangle: Tech Lead + Executor + Reviewer    │
│                                                                  │
│ EXIT CRITERIA: Requirements locked, team spawned, Mailbox ready │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Tech Lead Decomposition                                 │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Tech Lead reads all requirements                            │
│ 2.2. Decompose into tasks (T1, T2, ...)                        │
│ 2.3. Publish Shared Task List                                   │
│ 2.4. Post TASK_ASSIGNMENT to Mailbox                            │
│ 2.5. Assign tasks to Executor                                   │
│                                                                  │
│ EXIT CRITERIA: Task list published, assignments clear           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Executor Implementation + Review Cycle                  │
├─────────────────────────────────────────────────────────────────┤
│ FOR each task:                                                  │
│ 3.1. Executor implements task                                    │
│ 3.2. Executor posts SUBMISSION to Mailbox                        │
│ 3.3. Reviewer reads submission                                   │
│ 3.4. Reviewer posts REVIEW (PASS/FAIL) to Mailbox               │
│ 3.5. IF FAIL:                                                   │
│     3.5.1. Executor reads findings                              │
│     3.5.2. Executor FIXES or DEFENDS (with evidence)           │
│     3.5.3. Reviewer re-checks                                   │
│     3.5.4. Repeat until PASS or Round 3                        │
│ 3.6. IF Round 3 without agreement: Tech Lead arbitrates        │
│                                                                  │
│ EXIT CRITERIA: All tasks PASS or arbitrated                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 4: Consensus + Delivery                                    │
├─────────────────────────────────────────────────────────────────┤
│ 4.1. Tech Lead reads ALL Mailbox exchanges                      │
│ 4.2. Tech Lead synthesizes approved output                       │
│ 4.3. Tech Lead posts DECISION with consensus stamp:            │
│     "✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓"       │
│ 4.4. Complete workflow with validated deliverable                │
│                                                                  │
│ EXIT CRITERIA: Consensus stamp present, output validated         │
└─────────────────────────────────────────────────────────────────┘
```

---

## /fix — Bug Fix

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Issue Investigation                                     │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse error description                                     │
│ 1.2. Gather error context (logs, reproduction steps)              │
│ 1.3. Delegate to debugger agent                                  │
│ 1.4. Investigate root cause                                      │
│ 1.5. Document findings                                          │
│                                                                  │
│ EXIT CRITERIA: Root cause identified                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Fix Implementation                                      │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Propose fix based on root cause                            │
│ 2.2. Implement fix                                               │
│ 2.3. Verify fix addresses root cause                             │
│ 2.4. Check for side effects                                     │
│                                                                  │
│ EXIT CRITERIA: Fix implemented, root cause addressed             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Verification                                            │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Verify original issue resolved                             │
│ 3.2. Run existing tests                                         │
│ 3.3. Complete workflow                                           │
│                                                                  │
│ EXIT CRITERIA: Issue resolved, tests passing                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## /test — Test Generation

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Test Planning                                           │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse feature context                                       │
│ 1.2. Identify test scenarios                                    │
│ 1.3. Determine test types (unit, integration, E2E)              │
│ 1.4. Set coverage targets                                       │
│                                                                  │
│ EXIT CRITERIA: Test plan defined                                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Test Generation                                         │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Generate tests per plan                                     │
│ 2.2. Include edge cases                                         │
│ 2.3. Document test rationale                                    │
│ 2.4. Verify test syntax                                         │
│                                                                  │
│ EXIT CRITERIA: Tests generated                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Review + Execution                                      │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Execute tests                                               │
│ 3.2. Review coverage report                                     │
│ 3.3. If coverage < target: add tests                             │
│ 3.4. Complete workflow                                           │
│                                                                  │
│ EXIT CRITERIA: Tests passing, coverage adequate                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## /plan — Implementation Planning

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Scouting                                                │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse feature concept                                       │
│ 1.2. Delegate to scouter agent                                  │
│ 1.3. Explore codebase for relevant patterns                      │
│ 1.4. Map dependencies                                           │
│ 1.5. Document findings                                           │
│                                                                  │
│ EXIT CRITERIA: Codebase context understood                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Planning                                                │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Create implementation plan                                  │
│ 2.2. Break into milestones with dependencies                    │
│ 2.3. Estimate effort per milestone                              │
│ 2.4. Identify risks and mitigations                             │
│ 2.5. Define acceptance criteria per milestone                    │
│                                                                  │
│ EXIT CRITERIA: Plan complete with milestones                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Review                                                  │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Review plan against requirements                            │
│ 3.2. Verify feasibility                                         │
│ 3.3. Refine if needed                                           │
│ 3.4. Complete workflow                                           │
│                                                                  │
│ EXIT CRITERIA: Plan approved                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## /review — Code Review

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Review                                                  │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse code to review                                        │
│ 1.2. Analyze for:                                                │
│     - Correctness                                                │
│     - Security vulnerabilities                                   │
│     - Performance issues                                         │
│     - Standards compliance                                       │
│     - Edge cases                                                │
│ 1.3. Document findings                                          │
│                                                                  │
│ EXIT CRITERIA: Review complete, findings documented             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Report                                                  │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Compile findings                                            │
│ 2.2. Prioritize by severity                                     │
│ 2.3. Provide recommendations                                     │
│ 2.4. Complete workflow                                           │
│                                                                  │
│ EXIT CRITERIA: Report complete                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## /debug — Debugging

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Investigation                                           │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse error description                                     │
│ 1.2. Gather context (stack traces, logs, reproduction)           │
│ 1.3. Reproduce error if possible                                 │
│ 1.4. Trace execution flow                                        │
│                                                                  │
│ EXIT CRITERIA: Error reproducible or context gathered            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Analysis                                                │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Identify root cause                                        │
│ 2.2. Trace backward to source                                   │
│ 2.3. Document failure chain                                      │
│ 2.4. Propose fix strategy                                        │
│                                                                  │
│ EXIT CRITERIA: Root cause identified                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Report                                                  │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Document root cause                                         │
│ 3.2. Provide fix proposal                                        │
│ 3.3. Suggest prevention measures                                │
│ 3.4. Complete workflow                                           │
│                                                                  │
│ EXIT CRITERIA: Report complete with fix proposal                │
└─────────────────────────────────────────────────────────────────┘
```

---

## /wiki — Wiki Generation

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Extraction                                              │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Parse project structure                                      │
│ 1.2. Analyze code for entities                                  │
│ 1.3. Extract relationships                                       │
│ 1.4. Map API contracts                                          │
│ 1.5. Document findings                                           │
│                                                                  │
│ EXIT CRITERIA: Project entities extracted                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Organization                                            │
├─────────────────────────────────────────────────────────────────┤
│ 2.1. Design wiki structure                                       │
│ 2.2. Create folder hierarchy                                     │
│ 2.3. Define navigation                                          │
│ 2.4. Plan content per section                                    │
│                                                                  │
│ EXIT CRITERIA: Wiki structure defined                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Generation                                              │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Generate index pages (00-index.md pattern)                 │
│ 3.2. Generate content pages                                      │
│ 3.3. Ensure cross-references valid                              │
│ 3.4. Verify links and navigation                                 │
│                                                                  │
│ EXIT CRITERIA: Wiki pages generated                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## /deploy — Deployment

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Pre-deployment Check                                    │
├─────────────────────────────────────────────────────────────────┤
│ 1.1. Verify build passes                                        │
│ 1.2. Run security scan                                          │
│ 1.3. Check dependencies                                         │
│ 1.4. Validate configuration                                      │
│                                                                  │
│ EXIT CRITERIA: Pre-deployment checks pass                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Deployment (varies by variant)                          │
├─────────────────────────────────────────────────────────────────┤
│ :check → Verify deployment readiness                            │
│ :preview → Deploy to preview environment                        │
│ :production → Deploy to production                              │
│                                                                  │
│ EXIT CRITERIA: Deployment variant complete                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Verification                                            │
├─────────────────────────────────────────────────────────────────┤
│ 3.1. Verify deployment successful                               │
│ 3.2. Run smoke tests                                             │
│ 3.3. Monitor for errors                                          │
│ 3.4. Complete workflow                                           │
│                                                                  │
│ EXIT CRITERIA: Deployment verified                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Evidence Sources

- `rules/CORE.md` — Command routing, execution loop
- `rules/PHASES.md` — Phase execution, output formats
- `rules/TEAMS.md` — Golden Triangle communication
- `commands/` — Command workflow implementations
