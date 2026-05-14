# security-audit — Expert Skill

> **TIER**: 4 | **TRIGGER**: Security-critical systems, compliance requirements, vulnerability assessment
> **PURPOSE**: Comprehensive security analysis where failure has severe consequences

---

## Trigger Conditions

```
APPLY WHEN:
  □ Handling sensitive data (PII, financial, health, credentials)
  □ Regulatory compliance required (SOC2, HIPAA, PCI-DSS, GDPR)
  □ System is publicly exposed (internet-facing)
  □ Security breach would have severe consequences
  □ Authentication/authorization is complex
  □ Cryptographic operations are involved
  □ Third-party integrations with security implications

SKIP WHEN:
  □ Internal tool with no sensitive data (→ specialized/security)
  □ Known security patterns exist (→ specialized/security)
  □ This is a penetration test (→ expert/threat-modeling)
  □ Compliance is checkbox-only (→ specialized/security)
```

---

## Actions

### Step 1: Asset Inventory and Threat Modeling

```
□ What assets need protection? (data, systems, credentials, reputation)
□ What is the attack surface? (endpoints, interfaces, employees, supply chain)
□ Who are the attackers? (script kiddies, insiders, nation-states, competitors)
□ What do they want? (data, money, disruption, reputation)
□ What is the attacker's capability and motivation?
□ What trust boundaries exist?
□ What assumptions are we making about security?
□ What would a security expert say is our weakest point?
```

### Step 2: Security Requirement Analysis

```
□ What compliance frameworks apply?
□ What data classification levels exist?
□ What are the data retention requirements?
□ What are the access control requirements?
□ What are the audit logging requirements?
□ What are the incident response requirements?
□ What are the encryption requirements (at rest, in transit)?
□ What are the key management requirements?
```

### Step 3: Attack Vector Analysis

```
□ Injection: SQL, NoSQL, OS command, LDAP, XSS, CSRF, SSRF
□ Authentication: brute force, credential stuffing, session hijacking
□ Authorization: privilege escalation, horizontal privilege, IDOR
□ Data exposure: leaks, backups, logs, error messages
□ Cryptography: weak algorithms, key management, randomness
□ Infrastructure: misconfigurations, open ports, default credentials
□ Supply chain: dependencies, third-party code, CI/CD
□ Social engineering: phishing, pretexting, insider threats
□ Business logic: race conditions, transaction bypassing
```

### Step 4: Deep-Dive on Critical Paths

```
For each critical security path:
□ What is the attack chain? (step by step)
□ What controls exist at each step?
□ What happens if a control fails?
□ Can an attacker chain multiple failures?
□ What is the detection strategy?
□ What is the response strategy?
□ What is the recovery strategy?
□ What evidence would be left behind?
```

### Step 5: Compliance Mapping

```
For each applicable framework:
□ Which requirements apply?
□ How does the current system address each?
□ What gaps exist?
□ What is the remediation plan?
□ What evidence exists for auditors?
□ What is the compliance timeline?
□ Who owns each control?
```

### Step 6: Security Architecture Review

```
□ Encryption: algorithms, key lengths, key rotation
□ Authentication: factors, password policies, MFA
□ Authorization: model, enforcement point, attribute management
□ Session management: tokens, timeouts, rotation
□ API security: rate limiting, input validation, output encoding
□ Infrastructure: network segmentation, hardening, monitoring
□ Monitoring: SIEM, alerting, anomaly detection
□ Incident response: playbook, escalation, communication
```

---

## Outputs

```
## Security Assessment — Expert Tier

### Asset Inventory
|| Asset | Classification | Owner | Criticality |
||-------|---------------|-------|-------------|
|| [name] | [level] | [owner] | [1-5] |

### Threat Model
|| Threat | Likelihood | Impact | Mitigation | Owner |
||--------|------------|--------|------------|-------|
|| [threat] | [H/M/L] | [H/M/L] | [strategy] | [owner] |

### Attack Surface Analysis
|| Entry Point | Attack Vectors | Controls | Weakness |
||-------------|---------------|----------|----------|
|| [endpoint] | [vectors] | [controls] | [gaps] |

### Compliance Gap Analysis
|| Framework | Requirement | Status | Gap | Remediation |
||-----------|-------------|--------|-----|-------------|
|| [framework] | [req] | [met/partial/gap] | [gap] | [plan] |

### Security Architecture
|| Component | Mechanism | Key Management | Rotation |
|-----------|-----------|-------------|---------|----------|
|| [component] | [mechanism] | [key mgmt] | [rotation] |

### Incident Response Plan
|| Scenario | Detection | Containment | Eradication | Recovery |
||----------|-----------|------------|------------|----------|
|| [incident] | [how] | [steps] | [steps] | [steps] |

### Remediation Roadmap
|| Issue | Severity | Effort | Owner | Deadline |
||-------|----------|--------|-------|----------|
|| [issue] | [CR/H/M/L] | [days] | [owner] | [date] |
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Threat model | All critical assets have threat vectors | Cannot proceed without |
| Attack surface | Every entry point has documented attack vectors | Add analysis |
| Compliance | All applicable requirements mapped | Add gap analysis |
| Encryption | All sensitive data encrypted at rest and in transit | Cannot go live |
| Access control | Least privilege enforced, all paths verified | Security review required |
| Monitoring | Security events are detected and alerted | Cannot go live |
| Incident plan | Runbook exists for top 5 scenarios | Cannot go live |

---

## Common Mistakes

```
❌ Security as an afterthought (bolt-on after design)
❌ Compliance theater (checkboxes without actual security)
❌ Ignoring the insider threat
❌ Over-relying on perimeter security
❌ Not threat-modeling the system
❌ Weak cryptography (MD5, SHA1, DES, small keys)
❌ Hardcoded credentials or secrets
❌ Not rotating credentials/secrets
❌ Overly permissive IAM policies
❌ Not logging security-relevant events
❌ Ignoring supply chain security (dependencies)
```
