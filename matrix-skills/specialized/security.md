# security — Specialized Skill

> **TIER**: 3 | **TRIGGER**: Auth systems, input validation, secure API design, vulnerability prevention
> **PURPOSE**: Build systems that are secure by design, not secured after the fact

---

## Trigger Conditions

```
APPLY WHEN:
  □ Authentication or authorization is being designed
  □ User input flows to database, shell, or file system
  □ API endpoints are exposed to users or third parties
  □ Session management or token handling
  □ Password or secret storage
  □ File upload or download
  □ Payment or financial data processing
  □ Admin or elevated privileges

SKIP WHEN:
  □ Full security audit needed (→ expert/security-audit)
  □ Distributed security architecture (→ expert/distributed-systems)
  □ Simple validation (→ foundation/debugging)
  □ Known secure patterns exist in codebase (→ follow those patterns)
```

---

## Actions

### Step 1: Identify the Attack Surface

```
□ What user input is untrusted?
□ Where does input enter the system?
□ Where does input leave the system? (output encoding)
□ What are the trust boundaries?
□ Who can call what with what privileges?
□ What happens if authentication fails?
□ What happens if authorization fails?
□ What is logged vs. not logged?
```

### Step 2: Input Validation Strategy

```
□ Validate at the boundary: trust nothing from the client
□ Schema validation: type, length, format, range
□ Sanitization: escape or remove dangerous characters
□ Parameterization: never concatenate user input into queries/commands
□ Allowlist: reject what you don't know vs. allow what you do
□ Normalization: canonicalize before validation (URLs, paths, etc.)
□ File paths: prevent path traversal (../, absolute paths)
□ Types: use strong types, not just strings
```

### Step 3: Authentication Design

```
□ Password storage: bcrypt/argon2 with salt, NEVER plaintext or MD5
□ Password policy: length over complexity, breach checking
□ MFA: TOTP, WebAuthn, SMS (with caveats)
□ Session tokens: secure random, httpOnly cookies, short expiry + refresh
□ API keys: stored hashed, rotated, scoped
□ OAuth/OIDC: PKCE for public clients, state parameter, proper validation
□ Credential stuffing: rate limiting, breach detection
□ Failed login: lockout or progressive delay (not hard lockout)
```

### Step 4: Authorization Design

```
□ Principle of least privilege: grant minimum needed
□ Role hierarchy: simple, flat is better than deep
□ Attribute-based: when RBAC isn't fine-grained enough
□ Ownership: can users access their own data?
□ Horizontal privilege: can user A access user B's data?
□ IDOR prevention: always validate ownership at the data layer
□ API scope: OAuth scopes match actual permissions
□ Admin access: separate from user access, logged
```

### Step 5: Secure Output

```
□ Output encoding: HTML, JavaScript, URL, CSS, XML encoding (context-aware)
□ XSS prevention: CSP headers, httpOnly cookies, sanitize HTML
□ Information disclosure: generic errors to users, details in logs
□ Debug mode: must be disabled in production
□ Stack traces: never exposed to users
□ Sensitive data in URLs: tokens, IDs, tokens (never passwords)
□ HTTP headers: security headers (CSP, HSTS, X-Frame-Options, etc.)
```

### Step 6: Common Vulnerability Checks

```
□ SQL/NoSQL injection: parameterized queries only
□ Command injection: avoid shell commands, use language APIs
□ Path traversal: validate and canonicalize all paths
□ XXE: disable external entities in XML/JSON parsers
□ SSRF: validate URLs, block internal IPs, use allowlists
□ CSRF: CSRF tokens, SameSite cookies
□ Open redirects: validate redirect URLs
□ Race conditions: locking, transactions on sensitive operations
```

---

## Outputs

```
## Security Design

### Attack Surface
|| Entry Point | Input | Risks | Validation |
||-------------|-------|-------|------------|
|| [endpoint] | [input] | [risks] | [strategy] |

### Authentication
|| Mechanism | Implementation | Password Storage | Session |
||-----------|---------------|----------------|--------|
|| [auth] | [how] | [bcrypt/argon2] | [httpOnly+secure] |

### Authorization Matrix
|| Role | Permissions |
||------|-------------|
|| [role] | [permissions list] |

### Security Headers
```
Content-Security-Policy: [policy]
X-Frame-Options: [value]
X-Content-Type-Options: [value]
Strict-Transport-Security: [value]
```

### Security Checklist
□ Input validated at every boundary
□ Output encoded contextually
□ Auth: hashed passwords, secure sessions
□ Authz: least privilege, ownership validated
□ Secrets: env vars, not in code
□ Logs: no sensitive data in logs
□ Errors: generic to users, detailed to logs
□ Dependencies: audited for known vulnerabilities
□ HTTPS: enforced everywhere
□ CORS: scoped to needed origins
□ Rate limiting: on sensitive endpoints
□ Admin: separate access, fully logged
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Input | Every input boundary has validation | Cannot deploy |
| SQL | No string concatenation into queries | Refactor to parameterized |
| Auth | Passwords hashed with bcrypt/argon2 | Refactor before deploy |
| Authz | Ownership validated at data layer | Add IDOR checks |
| Secrets | No secrets in code | Move to env vars |
| Errors | No stack traces to users | Add generic error pages |
| Headers | Security headers set | Add middleware |

---

## Common Mistakes

```
❌ Input validation on the client only
❌ Blacklist filtering (block "script" vs allowlist)
❌ Storing passwords with MD5, SHA1, or no salt
❌ Secrets in source code or version control
❌ SQL concatenation instead of parameterized queries
❌ Not checking object ownership before access
❌ Generic error messages that reveal system info
❌ Missing security headers
❌ Overly permissive CORS
❌ Session fixation after login
❌ Not logging security events
```
