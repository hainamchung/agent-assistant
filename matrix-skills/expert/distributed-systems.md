# distributed-systems — Expert Skill

> **TIER**: 4 | **TRIGGER**: Multi-service coordination, consensus, global consistency
> **PURPOSE**: Design and debug distributed systems where CAP theorem trade-offs are real

---

## Trigger Conditions

```
APPLY WHEN:
  □ 2+ services must coordinate on shared data or workflow
  □ Eventual consistency is an acceptable tradeoff (and you're sure)
  □ Need distributed transactions or saga patterns
  □ Multi-region or multi-cloud deployment
  □ Service discovery, load balancing, or circuit breaking needed
  □ Distributed tracing across service boundaries

SKIP WHEN:
  □ Single-service architecture suffices (→ specialized/architecture)
  □ Existing patterns from the codebase apply (→ specialized/architecture)
  □ This is a research problem (→ expert/system-design)
  □ Known framework handles this (→ professional/api-design)
```

---

## Actions

### Step 1: Map the Distributed Topology

```
□ What services exist and what are their trust boundaries?
□ Which data must be consistent? Which can be eventual?
□ What are the network boundaries? (regions, availability zones)
□ Where are the latency-sensitive paths?
□ What happens when each service goes down?
□ What are the fan-out patterns? (1→1, 1→N, N→1, N→N)
□ Are there circular dependencies?
```

### Step 2: Choose Consistency Model

```
□ Does this need strong consistency or is eventual OK?
□ If eventual: what's the maximum acceptable staleness?
□ If strong: is a distributed transaction necessary?
□ Can we use sagas instead of 2PC?
□ What happens under network partition?
□ What does the client see during inconsistency windows?
□ Can we use hedging or retries to hide latency?
```

### Step 3: Design the Communication Pattern

```
□ Synchronous (REST, gRPC) — good for: [use cases]
□ Asynchronous (events, message queues) — good for: [use cases]
□ Hybrid (async with sync callbacks) — good for: [use cases]

For each communication:
□ What is the timeout strategy?
□ What is the retry strategy?
□ What is the circuit breaker strategy?
□ What is the dead letter / poison message strategy?
□ What is the idempotency strategy?
□ What is the ordering guarantee?
□ What is the backpressure strategy?
```

### Step 4: Handle the Hard Cases

```
□ Partial failure: what if one service in a chain fails?
□ Cascade failure: how does failure propagate?
□ Temporal failure: what if a message is delayed 10 minutes?
□ Ordering failure: what if messages arrive out of order?
□ Duplication: what if a message is delivered twice?
□ Lost messages: what if a message is never delivered?
□ Schema evolution: how do services evolve without breaking each other?
□ Version skew: how do we handle rolling deployments with different versions?
```

### Step 5: Implement Observability

```
□ Distributed tracing: every request gets a trace ID that flows through all services
□ Structured logging: every log has trace ID, service name, correlation ID
□ Metrics: latency histograms, error rates, throughput per service
□ Health checks: per-service and end-to-end
□ Dependency maps: what calls what, with SLOs
□ Alerting: burn rate alerting for SLOs
```

### Step 6: Document the Contract

```
□ API contracts: what does each service promise?
□ Data contracts: what does each service assume about shared data?
□ SLO contracts: what latency/availability does each service guarantee?
□ Runbook: how to handle each failure mode
□ Chaos experiments: what to test before production
```

---

## Outputs

```
## Distributed System Design

### Service Map
[All services, their responsibilities, trust boundaries]

### Data Consistency Model
[Per-entity: strong or eventual, justification]

### Communication Patterns
[Per interaction: sync/async, protocol, guarantees]

### Failure Modes and Recovery
|| Scenario | Detection | Recovery |
||----------|-----------|----------|
|| Service down | [method] | [strategy] |
|| Network partition | [method] | [strategy] |
|| Slow service | [method] | [strategy] |
|| Message lost | [method] | [strategy] |

### Observability Stack
|| Component | Tool | What it measures |
||-----------|------|------------------|
|| Tracing | [tool] | [metrics] |
|| Logging | [tool] | [metrics] |
|| Metrics | [tool] | [metrics] |

### SLOs
|| Service | Availability | Latency P99 | Recovery |
||---------|-------------|-------------|----------|
|| [name] | [target] | [target] | [RTO/RPO] |

### Rollout Strategy
[How to deploy changes without breaking the system]

### Rollback Strategy
[How to undo changes if they break]
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| CAP | Consistency model explicitly chosen with justification | Cannot proceed without |
| Partial failure | Every cross-service call has a failure plan | Add circuit breakers |
| Idempotency | Every mutating operation is idempotent | Add idempotency keys |
| Observability | Every service emits trace, logs, metrics | Cannot deploy without |
| Chaos | Top 3 failure modes tested in staging | Cannot promote to prod |
| Rollback | Every change has a tested rollback | Cannot deploy without |

---

## Common Mistakes

```
❌ Assuming the network is reliable
❌ Not handling partial failures (assuming all-or-nothing)
❌ Ignoring the CAP theorem trade-offs
❌ Using distributed transactions when sagas suffice
❌ Not having idempotency on mutating operations
❌ Deploying without distributed tracing
❌ Not testing failure modes (chaos engineering)
❌ Ignoring the client experience during inconsistency
❌ Tight coupling through shared databases
```
