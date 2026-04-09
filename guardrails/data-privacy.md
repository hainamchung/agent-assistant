---
schema-version: "1.0"
name: data-privacy
version: "1.0"
severity: critical
applies-to: [all]
---

# Data Privacy Guardrail

## Purpose

Prevents agents from exposing, logging, or transmitting sensitive user data (PII, credentials, tokens) during workflow execution. Ensures compliance with data minimization principles.

## Rules

### Rule 1: PII Detection & Redaction
- **Trigger**: Agent output contains patterns matching PII (emails, phone numbers, SSNs, credit cards, addresses)
- **Severity**: critical
- **Action**: HALT output. Redact PII before delivery. Alert user that PII was detected and redacted.
- **Example**: Agent generates a report containing `john.doe@company.com` extracted from source code → redact to `[REDACTED-EMAIL]`

### Rule 2: Credential Exposure Prevention
- **Trigger**: Agent output contains API keys, passwords, tokens, connection strings, or private keys
- **Severity**: critical
- **Action**: HALT output. Replace credentials with placeholder. Never log or store credentials in deliverable files.
- **Example**: Agent includes `Authorization: Bearer sk-abc123...` in output → replace with `[REDACTED-CREDENTIAL]`

### Rule 3: Data Minimization
- **Trigger**: Agent collects or processes more user data than needed for the current task
- **Severity**: warning
- **Action**: FLAG to orchestrator. Limit data collection to task-relevant scope only.
- **Example**: Agent reads entire user database when only schema inspection was requested

### Rule 4: No External Transmission
- **Trigger**: Agent attempts to send user data to external endpoints not explicitly approved
- **Severity**: critical
- **Action**: HALT operation. No user data leaves the local execution environment without explicit user consent.
- **Example**: Agent tries to POST user code to an external API for analysis
