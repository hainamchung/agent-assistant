# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |
| < latest| :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within Agent Assistant, please create a private security advisory via GitHub's Security Advisories feature:

https://github.com/hainamchung/agent-assistant/security/advisories/new

Please include:

- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes (optional)

**Response time**: We aim to acknowledge within 48 hours and provide a timeline for remediation.

## Security Best Practices for Users

- Keep your `~/.cursor/`, `~/.claude/`, and similar config directories out of version control
- Never commit API keys or credentials to repositories
- Review the agents and skills you install — they execute code on your behalf
- Use the `:fast` variant for low-risk operations, `:team` for critical workflows

## Scope

This policy covers the Agent Assistant CLI, the web application, and the skill/matrix system. Third-party skills from the community are contributed by the community and should be reviewed before use.
