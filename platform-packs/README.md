# Platform Adaptation Packs

Per-platform optimization profiles for the agent-assistant framework.

Each pack documents:
- **Capabilities**: What the platform supports (from `platforms.json`)
- **Constraints**: Hard limitations to work around
- **Recommendations**: Best practices for the platform
- **Workarounds**: Alternatives for missing capabilities
- **Skill tier default**: Which RUNTIME.md tier to load

## Available Packs

| Pack | Platform | Default Tier |
|---|---|---|
| `claude-code.md` | Claude Code | full |
| `cursor.md` | Cursor | micro |
| `copilot.md` | GitHub Copilot | full |
| `qwen.md` | Qwen | micro |

## Usage

Platform packs are reference documents. The orchestrator or entry-point generator
can read the `tier-default` from frontmatter to set the initial loading tier.

## Relationship to platforms.json

`platforms.json` defines machine-readable capability flags. Platform packs provide
human-readable guidance and recommendations that supplement those flags.
