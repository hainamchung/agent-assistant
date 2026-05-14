# Use Cases

Practical examples of llm-wiki in real software development projects.

## Team Knowledge Management

### 1. Onboarding new developers

Dev mới join team, docs rải rác khắp nơi.

```
/wiki ingest docs/api-spec.pdf --category architecture
/wiki ingest docs/database-erd.png --category design
/wiki ingest confluence-export/ --category product
/wiki compile

/wiki query "How does the payment flow work end-to-end?"
```

**Without wiki:** Read 20 scattered files, ask 5 different people.
**With wiki:** One question, one answer with citations and wikilinks.

### 2. Post-mortem & incident knowledge

```
/wiki ingest postmortem-2026-03-15.md --category operations
/wiki compile

# 3 months later, similar symptoms appear
/wiki query "Have we seen timeout errors on payment gateway before?"
```

→ `wiki/postmortems/payment-gateway-timeout.md` with root cause, fix, and timeline.

**Value:** Team doesn't repeat past mistakes. Institutional memory lives in git, doesn't leave when people do.

### 3. Architecture Decision Records

```
/wiki ingest meeting-notes/2026-03-20-migrate-to-postgres.md --category meetings
/wiki ingest adr/adr-007-database-migration.md --category architecture
/wiki compile

# 6 months later: "why not MongoDB?"
/wiki query "Why did we choose PostgreSQL over MongoDB?"
```

→ `wiki/decisions/database-selection.md` with citations from meeting notes + ADR.

### 4. Cross-domain API documentation

```
/wiki ingest openapi.yaml --category development
/wiki ingest docs/auth-flow.md --category architecture
/wiki ingest docs/rate-limiting.md --category operations
/wiki compile

/wiki query "How do I authenticate and call the /orders endpoint?"
```

**Unlike Swagger:** Wiki connects cross-domain — auth + API + rate limit + known issues in one answer.

### 5. Sprint retrospective accumulation

```
# End of each sprint
/wiki ingest retro-sprint-42.md --category meetings
/wiki compile

# Before sprint planning
/wiki query "What recurring problems have we had in the last 5 sprints?"
```

→ `wiki/chronicles/sprint-retrospectives.md` — "Flaky tests mentioned 4/5 sprints, deployment delays 3/5."

## Feature Development & Investigation

### 6. Investigate feature history before modifying

```
/wiki ingest prd-notification-v1.md --category product           # 2024-Q1
/wiki ingest meeting-notification-redesign.md --category meetings # 2024-Q3
/wiki ingest prd-notification-v2.md --category product           # 2025-Q1
/wiki ingest hotfix-notification-queue.md --category operations   # 2025-Q2
/wiki compile

# Assigned: "Refactor notification retry logic"
/wiki query "What is the history of notification system changes and why?"
```

→ `wiki/chronicles/notification-system.md` — Timeline: polling → WebSocket (polling caused DB load) → queue (WebSocket dropped messages on restart) → backpressure (queue deadlock on burst 1000+ messages).

**Dev learns:** Do NOT remove backpressure logic even though it looks "unnecessary."

### 7. Understand side effects before adding features

```
# PM requests: "Add scheduled messages"
/wiki query "What components are involved in message delivery and what are known limitations?"
```

→ Links to `wiki/entities/message-queue.md`, `wiki/concepts/backpressure-pattern.md`, `wiki/postmortems/notification-queue-deadlock.md`.

**Dev realizes:** Scheduled messages need to bypass rate-limiter but still go through backpressure → avoids a bug nobody on the current team remembers.

### 8. Understand business reasons behind "weird" code

```
/wiki ingest slack-export-payments-channel.md --category meetings
/wiki ingest jira-PAY-234-special-tax-handling.md --category product
/wiki ingest adr-005-tax-rounding.md --category architecture
/wiki compile

# Dev sees: tax rounding uses ROUND_HALF_EVEN instead of ROUND_HALF_UP
/wiki query "Why does payment use banker's rounding for tax calculation?"
```

→ `wiki/decisions/tax-rounding-method.md` — "Legal required EU VAT directive compliance. ROUND_HALF_UP causes 0.01% drift at 100K+ transactions/month. Auditor flagged Q2-2024."

**Dev learns:** Do NOT change rounding method even though unit tests would be "cleaner."

### 9. Impact assessment before refactoring

```
# Dev wants to split monolith user-service into 2 microservices
/wiki query "What other services depend on user-service and what has broken when it changed before?"
```

→ 7 downstream consumers listed, past incident where billing broke due to stale role cache after auth was split out.

**Dev realizes:** Must invalidate billing cache before splitting — avoids repeating old incident.

### 10. Take over feature from departed team member

```
/wiki ingest recommendation-design-doc.md --category architecture
/wiki ingest recommendation-ab-test-results.md --category data
/wiki ingest meeting-recommendation-v2-planning.md --category meetings
/wiki compile

/wiki query "How does recommendation scoring work and what tradeoffs were made?"
```

→ Collaborative filtering + content-based hybrid. Pure CF had cold-start problem (40% worse for new users in AB test). Hybrid adds 50ms latency but +12% conversion — team accepted tradeoff.

**New dev understands WHY, not just WHAT** → modifies the right parts.

## The Pattern

```
Before modifying/adding a feature:

/wiki query "Why does X work this way?"
         │
         ├──► wiki/chronicles/   → history of changes
         ├──► wiki/decisions/    → why decisions were made
         └──► wiki/postmortems/  → what has failed before
                    │
                    ▼
         Dev has full context
         → changes the right thing
         → doesn't break what works
```

**Code tells you WHAT** (current state). **Wiki preserves WHY** (reasoning) and **WHAT FAILED** (lessons learned) — two things git blame can't fully capture.
