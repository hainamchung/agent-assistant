# Durable Execution — Checkpoint-Resume Protocol

> **VERSION**: 1.0 | **LOAD**: On-demand from §LOAD ON DEMAND | **PURPOSE**: Enable workflow persistence across sessions

---

## Checkpoint Schema

```json
{
  "schema_version": "1.0",
  "command": "{cook|fix|plan|...}",
  "variant": "{fast|hard|team}",
  "task": "{feature-name}",
  "topic": "{report-topic}",
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601",
  "ttl_seconds": 86400,
  "status": "in-progress|completed|stale",
  "current_phase": 3,
  "completed_phases": [
    {
      "phase": 1,
      "name": "Requirements & Discovery",
      "deliverables": ["reports/{topic}/brainstorms/BRAINSTORM-feature.md"],
      "completed_at": "ISO-8601"
    }
  ],
  "context_snapshot": {
    "topic": "{report topic}",
    "agents_used": ["researcher", "scouter"],
    "key_decisions": ["Used pipeline topology", "Selected React for frontend"],
    "journal_entries_written": true
  }
}
```

**Constraints**:
- File size: ≤ 5KB per checkpoint
- Encoding: UTF-8 JSON
- Schema version: Always `"1.0"` (bump on breaking changes)

---

## Checkpoint Write Protocol

**Trigger**: End of each phase, after consensus stamp (for `:team`) or phase completion (for `:fast`/`:hard`).

**Location**: `.agent-assistant/checkpoints/{command}-{task}.checkpoint.json`

**Steps**:

1. Construct checkpoint JSON from current workflow state
2. Write to checkpoint file path (create directory if needed)
3. Validate file size ≤ 5KB (trim `context_snapshot.key_decisions` if needed)
4. Signal: `💾 Checkpoint saved: Phase {N} complete`

**Write rules**:
- Overwrite existing checkpoint for same command-task pair
- Include all completed phase data + deliverable paths
- Include `journal_entries_written` in context snapshot (if journals active)
- NEVER include sensitive data (credentials, tokens, API keys)

---

## Resume Protocol

### Resume Detection (On Workflow Start)

Before Phase 1 of any `:team`, `:hard`, or `:fast` command:

1. Check: Does `.agent-assistant/checkpoints/{command}-*.checkpoint.json` exist?
2. If YES and not expired (check TTL):
   - Display: `🔄 Found checkpoint for {command} at Phase {N}. Resume? (y/n)`
   - If user confirms: Load checkpoint → skip completed phases
   - If user declines: Archive old checkpoint → start fresh
3. If NO or expired: Start fresh (auto-archive expired)

### State Restoration

When resuming from checkpoint:

1. Read checkpoint JSON
2. Validate schema version compatibility
3. Display: `🔄 Resuming {command} from Phase {N+1}. Phases 1-{N} already complete.`
4. List completed phase deliverables (for context rebuilding)
5. Load deliverable files as context for current phase
6. Journal read: Agent reads own journal if journals active
7. Proceed with normal phase execution from Phase {N+1}

### Opt-in/Opt-out

- `:team` and `:hard` commands: Checkpoints enabled by default
- `:fast` commands: Checkpoints disabled by default (override with `--checkpoint`)
- User can disable for any command with `--no-checkpoint` flag
- Per-command config: Commands can set `checkpoint: false` in frontmatter to disable

---

## Stale Checkpoint Management

**TTL (Time-To-Live)**:
- Default: 86,400 seconds (24 hours)
- Configurable per command via frontmatter: `checkpoint_ttl: 3600`

**Expiry behavior**:
- On detection of expired checkpoint: Move to `.agent-assistant/checkpoints/archive/`
- Archive naming: `{original-name}.{expired-timestamp}.json`
- Archive pruning: Keep last 5 entries per command, delete oldest

**Manual management**: Use `scripts/checkpoint-manager.js` CLI utility.

---

## Platform Considerations

- File-based protocol: Works on all 5 platforms (Cursor, Copilot, Claude, Gemini, Codex)
- No runtime dependency: Pure JSON file I/O
- Directory `.agent-assistant/` is `.gitignore`d — checkpoints are local-only
- Cross-session: Checkpoints persist across conversations/sessions on same machine
- Path safety: All checkpoint paths validated to stay within `.agent-assistant/`
