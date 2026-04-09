# Validation Gates

> Load when: Phase transitions, quality checkpoints, deliverable reviews.
> Purpose: Define structured verification points that block progression until criteria are satisfied.

---

## Gate Types

### 1. Phase Gate (Workflow Progression)

Checked **between workflow phases**. Prevents advancing to Phase N+1 until Phase N exit criteria pass.

```
GATE: phase
TRIGGER: Phase transition (end of phase N)
PASS CONDITION: All exit criteria for phase N are [x] checked
ON FAIL: HALT progression → list unmet criteria → prompt user decision
```

**Evaluation rules:**
- Each exit criterion must have verifiable evidence (file path, test result, or explicit confirmation)
- "Partial" is treated as FAIL — all-or-nothing
- User can override with explicit `GATE OVERRIDE: {reason}` (logged)

### 2. Quality Gate (Deliverable Acceptance)

Checked **on deliverable submission**. Ensures output meets minimum standards before being accepted.

```
GATE: quality
TRIGGER: Agent produces a deliverable file or code artifact
PASS CONDITION: Deliverable passes all applicable quality checks
ON FAIL: RETURN to producing agent with specific deficiency list
```

**Quality checks** (applied based on deliverable type):

| Deliverable Type | Required Checks |
|-----------------|-----------------|
| Code file | Syntax valid, no lint errors, follows project conventions |
| Markdown rule | Frontmatter present, sections match template, word budget met |
| Agent file | Lint passes (`npm run lint:agents`), required fields present |
| Config/YAML | Valid YAML syntax, schema conformance if schema exists |

### 3. Safety Gate (Risk Mitigation)

Checked **before destructive or irreversible operations**. Requires explicit user confirmation.

```
GATE: safety
TRIGGER: Operation is destructive, irreversible, or affects shared resources
PASS CONDITION: User provides explicit confirmation
ON FAIL: ABORT operation — do not proceed
```

**Triggers include:**
- File deletion, branch deletion, force push
- Database schema changes, production deployments
- Modifications to shared configuration files
- Operations tagged `destructive: true` in command frontmatter

---

## Gate Protocol

When a gate is encountered:

1. **ANNOUNCE**: State the gate type and what is being checked
2. **EVALUATE**: Run all applicable checks
3. **REPORT**: Present pass/fail status for each check
4. **DECIDE**: 
   - All pass → proceed automatically
   - Any fail → halt and present options (fix, override, abort)

### Gate Output Format

```markdown
### 🚦 GATE: {type} — {context}
| # | Check | Status | Evidence |
|---|-------|--------|----------|
| 1 | {check description} | ✅/❌ | {evidence} |

**Result**: PASS / FAIL ({N}/{total} passed)
```

---

## Integration

- **Phase gates** are embedded in command workflow files (e.g., `cook/team.md` defines phase transitions)
- **Quality gates** trigger automatically when deliverables are written to `reports/` or `rules/`
- **Safety gates** trigger based on operation type detection (file operations, terminal commands)
- Gates are logged but do NOT persist to checkpoint files (they are ephemeral checks)
