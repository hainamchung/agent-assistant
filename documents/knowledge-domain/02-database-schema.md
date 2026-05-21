# Database Schema

> **File**: `documents/knowledge-domain/02-database-schema.md`

---

## Status: Not Applicable

**Not applicable to this project** — Agent Assistant is a CLI framework with no persistent data store. All configuration is file-based.

---

## Rationale

Agent Assistant uses **file-based configuration** instead of a traditional database for the following reasons:

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| **No Database** | Simplicity and portability |
| **File-Based** | All configs are Markdown/JSON/YAML files |
| **Git-Friendly** | All configs version-controlled |
| **AI-Compatible** | Text formats are LLM-friendly |
| **Zero Setup** | No database installation required |

---

## Configuration Storage

All persistent data is stored in files:

### Configuration Files

| Type | Location | Format |
|------|----------|--------|
| Package | `package.json` | JSON |
| Release | `.releaserc.json` | JSON |
| Agent Definitions | `agents/*.md` | Markdown + YAML frontmatter |
| Rule Definitions | `rules/*.md` | Markdown |
| Command Definitions | `commands/*.md` | Markdown |
| Platform Configs | `code-assistants/*/` | TOML, JSON, Markdown |
| Web Config | `web/package.json` | JSON |

### No Database Dependencies

```
┌─────────────────────────────────────────┐
│          Agent Assistant                │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │     File-Based Configuration     │  │
│  │                                   │  │
│  │  agents/*.md     ← Agent defs   │  │
│  │  rules/*.md      ← Rules        │  │
│  │  commands/*.md   ← Commands     │  │
│  │  skills/*.md     ← Skills       │  │
│  │  package.json    ← NPM config   │  │
│  └─────────────────────────────────┘  │
│                                         │
│           No Database                   │
└─────────────────────────────────────────┘
```

### Advantages

| Advantage | Description |
|-----------|-------------|
| **Portability** | Works on any system with Node.js |
| **Simplicity** | No DB server to install or maintain |
| **Version Control** | Full history in Git |
| **Collaboration** | Standard Git workflows |
| **Offline Support** | No network required |

### Limitations

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| No queries | Limited data retrieval | Use grep/find tools |
| No transactions | No atomic operations | Manual coordination |
| No real-time sync | No multi-user real-time | Git-based sync |
| No ACID | Potential conflicts | Git merge strategies |

---

## Alternative: In-Memory State

For runtime state, Agent Assistant uses in-memory JavaScript objects:

```javascript
// Runtime state (in-memory only)
const state = {
  agents: new Map(),
  commands: new Map(),
  skills: new Map(),
  teams: new Map(),
  platform: null
};
```

### State Lifecycle

1. **Load** — Read files into memory at startup
2. **Execute** — Use in-memory state during execution
3. **Persist** — Write changes back to files when needed
4. **Release** — Clear state on shutdown

### No Persistence Requirements

| State Type | Persistence | Reason |
|------------|-------------|--------|
| Agent definitions | File | Loaded at startup |
| Command definitions | File | Loaded at startup |
| Skill registry | File | Loaded at startup |
| Rule definitions | File | Loaded at startup |
| Execution context | Memory | Ephemeral |
| User input | Memory | Ephemeral |

---

## Future Considerations

| Consideration | Status | Notes |
|---------------|--------|-------|
| SQLite for cache | Pending | Optional performance cache |
| JSON database | Pending | For larger deployments |
| Distributed state | Pending | Future multi-agent coordination |

---

## Evidence Sources

- `package.json` — NPM configuration (JSON)
- `.releaserc.json` — Release configuration (JSON)
- `agents/` — Agent definitions (Markdown)
- `rules/` — Rule definitions (Markdown)
- `commands/` — Command definitions (Markdown)
- `code-assistants/` — Platform configurations (various formats)
