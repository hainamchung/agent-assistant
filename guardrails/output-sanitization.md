---
schema-version: "1.0"
name: output-sanitization
version: "1.0"
severity: critical
applies-to: [all]
---

# Output Sanitization Guardrail

## Purpose

Scans agent-generated code for common security anti-patterns before output reaches the user. Catches hardcoded secrets, injection vectors, insecure cryptography, and debug leftovers that could ship to production.

## Rules

### Rule 1: Secrets in Code

- **Trigger**: Output contains hardcoded API keys, passwords, tokens, private keys, or connection strings. Patterns: string literals matching `sk-`, `AKIA`, `AWS_SECRET_ACCESS_KEY`, `ghp_`, `Bearer ey`, `eyJ` (JWT), `-----BEGIN.*KEY-----`, `password = "..."`, `secret: "..."`
- **Severity**: critical
- **Action**: **FLAG** — block output containing the literal secret. Replace with environment variable reference or secret manager lookup.
- **Examples**:
  - ❌ `const API_KEY = "sk-proj-abc123def456"` → FLAG, replace with `process.env.API_KEY`
  - ❌ `db_password = "SuperSecret123!"` → FLAG, replace with `os.environ["DB_PASSWORD"]`
  - ❌ `token: "ghp_xxxxxxxxxxxxxxxxxxxx"` → FLAG, replace with vault/secret manager reference
  - ✅ `const API_KEY = process.env.API_KEY` → PROCEED
  - ✅ `db_password = os.environ.get("DB_PASSWORD")` → PROCEED

### Rule 2: SQL Injection Patterns

- **Trigger**: Generated code builds SQL queries via string concatenation or interpolation with user-supplied variables. Patterns: `"SELECT ... " + variable`, `f"SELECT ... {var}"`, `\`DELETE ... ${input}\``
- **Severity**: high
- **Action**: **FLAG** — warn about SQL injection risk. Output the parameterized/prepared statement version instead.
- **Examples**:
  - ⚠️ `db.query("SELECT * FROM users WHERE id=" + userId)` → FLAG, rewrite as parameterized query
  - ⚠️ `cursor.execute(f"DELETE FROM orders WHERE id={order_id}")` → FLAG, use `cursor.execute("DELETE FROM orders WHERE id=%s", (order_id,))`
  - ✅ `db.query("SELECT * FROM users WHERE id=$1", [userId])` → PROCEED
  - ✅ `cursor.execute("SELECT * FROM users WHERE id=%s", (user_id,))` → PROCEED

### Rule 3: XSS Patterns

- **Trigger**: Generated code inserts user input directly into HTML without escaping or sanitization. Patterns: `innerHTML = userInput`, `document.write(input)`, `dangerouslySetInnerHTML` with raw user data, unescaped template interpolation in HTML context
- **Severity**: high
- **Action**: **FLAG** — warn about cross-site scripting risk. Suggest `textContent`, HTML-encoding libraries, or framework-native escaping.
- **Examples**:
  - ⚠️ `element.innerHTML = userComment` → FLAG, use `element.textContent = userComment`
  - ⚠️ `<div dangerouslySetInnerHTML={{__html: userData}} />` → FLAG, sanitize with DOMPurify first
  - ⚠️ `res.send("<h1>" + userName + "</h1>")` → FLAG, use template engine with auto-escaping
  - ✅ `element.textContent = userComment` → PROCEED
  - ✅ `<div>{userName}</div>` (JSX auto-escapes) → PROCEED

### Rule 4: Command Injection

- **Trigger**: Generated code passes dynamic/user-supplied input to `eval()`, `exec()`, `Function()`, `child_process.exec()`, `os.system()`, `os.popen()`, `subprocess.run(shell=True)`, or equivalent functions without sanitization
- **Severity**: high
- **Action**: **FLAG** — warn about arbitrary code/command execution risk. Suggest safer alternatives: `JSON.parse()` instead of `eval()`, `execFile()` with argument arrays instead of `exec()`, `subprocess.run()` with argument lists instead of shell=True
- **Examples**:
  - ⚠️ `eval(userInput)` → FLAG, never eval user input
  - ⚠️ `exec(f"ls {user_dir}")` in Python → FLAG, use `subprocess.run(["ls", user_dir])`
  - ⚠️ `child_process.exec("git clone " + repoUrl)` → FLAG, use `execFile("git", ["clone", repoUrl])`
  - ✅ `subprocess.run(["ls", validated_dir], shell=False)` → PROCEED
  - ✅ `JSON.parse(jsonString)` → PROCEED

### Rule 5: Insecure Crypto

- **Trigger**: Generated code uses broken or weak cryptographic functions for security-sensitive operations. Patterns: `MD5` or `SHA1` for password hashing, `Math.random()` or `random.random()` for tokens/secrets, DES/RC4 encryption, hardcoded IVs or salts
- **Severity**: medium
- **Action**: **FLAG** — advisory warning. Suggest modern alternatives: bcrypt/scrypt/argon2 for passwords, `crypto.randomBytes()`/`secrets.token_hex()` for tokens, AES-256-GCM for encryption
- **Examples**:
  - ⚠️ `hashlib.md5(password.encode())` → FLAG, use `bcrypt.hashpw()` or `argon2`
  - ⚠️ `const token = Math.random().toString(36)` → FLAG, use `crypto.randomBytes(32).toString('hex')`
  - ⚠️ `SHA1(password + salt)` → FLAG, use bcrypt/scrypt with automatic salting
  - ✅ `bcrypt.hash(password, saltRounds)` → PROCEED
  - ✅ `secrets.token_urlsafe(32)` → PROCEED

### Rule 6: Debug Leftovers

- **Trigger**: Generated code contains debug statements that log sensitive data or expose debug endpoints. Patterns: `console.log(password)`, `console.log(token)`, `print(secret)`, debug routes like `/debug`, `/test-admin`, `DEBUG=True` in production config
- **Severity**: low
- **Action**: **FLAG** — informational warning. Suggest removing debug statements or replacing with proper logging that redacts sensitive fields.
- **Examples**:
  - ⚠️ `console.log("User password:", password)` → FLAG, remove or redact
  - ⚠️ `print(f"Token: {auth_token}")` → FLAG, use structured logging without sensitive data
  - ⚠️ `app.get("/debug/users", ...)` → FLAG, remove debug endpoint or gate behind auth
  - ⚠️ `DEBUG = True` in production config → FLAG, use environment-based config
  - ✅ `logger.info("User authenticated", { userId: user.id })` → PROCEED

## Severity Scale

| Severity | Action | Example |
|----------|--------|---------|
| **CRITICAL** | Block output, require fix | Hardcoded secrets |
| **HIGH** | Flag with fix suggestion | SQL injection patterns |
| **MEDIUM** | Advisory warning | Weak crypto usage |
| **LOW** | Informational | Debug leftovers |

## Escalation

Output sanitization violations escalate as **Severity 2 (Blocking)**.
PII or credential exposure escalates as **Severity 3 (Critical)**.
See `guardrails/violation-escalation.md` for full escalation protocol.
