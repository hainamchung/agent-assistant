---
schema-version: "1.0"
name: auth-patterns
version: "1.0"
severity: critical
applies-to: [execution]
---

# Authentication & Authorization Patterns Guardrail

## Purpose

Ensures agents follow secure authentication and authorization patterns when generating code that handles user identity, sessions, or access control.

## Rules

### Rule 1: No Hardcoded Credentials
- **Trigger**: Generated code contains hardcoded passwords, API keys, tokens, or secrets
- **Severity**: critical
- **Action**: HALT. Replace with environment variable references or secret management patterns.
- **Example**: `const API_KEY = "sk-abc123"` → `const API_KEY = process.env.API_KEY`

### Rule 2: Secure Session Management
- **Trigger**: Generated code implements session handling without secure defaults
- **Severity**: warning
- **Action**: FLAG. Ensure sessions use: secure cookies (HttpOnly, Secure, SameSite), cryptographic session IDs, proper expiration.
- **Example**: Session cookie missing `HttpOnly` flag → add `httpOnly: true`

### Rule 3: Input Validation at Auth Boundaries
- **Trigger**: Authentication endpoints accept unvalidated input
- **Severity**: critical
- **Action**: HALT. Add input validation/sanitization before processing credentials.
- **Example**: Login endpoint passes raw user input to SQL query → require parameterized queries

### Rule 4: Principle of Least Privilege
- **Trigger**: Generated code grants broader access than required
- **Severity**: warning
- **Action**: FLAG. Review access scope. Default to minimal required permissions.
- **Example**: Database connection uses root user → suggest dedicated service account with restricted permissions

### Rule 5: No Sensitive Data in Logs
- **Trigger**: Generated logging code includes passwords, tokens, or PII
- **Severity**: critical
- **Action**: HALT. Remove sensitive data from log statements. Use structured logging with redaction.
- **Example**: `log.info("Login attempt", { password: req.body.password })` → remove password field
