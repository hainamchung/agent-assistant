# devops — Professional Skill

> **TIER**: 2 | **TRIGGER**: CI/CD pipeline design, containerization, deployment strategy, infrastructure
> **PURPOSE**: Ship reliable software through automated, repeatable, observable deployments

---

## Trigger Conditions

```
APPLY WHEN:
  □ Setting up or modifying CI/CD pipelines
  □ Containerizing an application
  □ Planning a deployment strategy
  □ Configuring infrastructure as code
  □ Setting up monitoring and alerting
  □ Planning a rollback strategy
  □ Environment configuration (dev, staging, prod)

SKIP WHEN:
  □ Expert-level infrastructure design (→ expert/system-design)
  □ Distributed systems (→ expert/distributed-systems)
  □ Security hardening of infra (→ specialized/security)
  □ Simple one-off script (→ foundation/debugging)
```

---

## Actions

### Step 1: Define the Deployment Pipeline

```
□ What stages are needed? (build → test → security → deploy)
□ What is the trigger? (push, PR, tag, schedule)
□ What is the artifact? (docker image, zip, lambda zip)
□ How long should each stage take? (target < 10 min total)
□ What runs in each stage? (lint, unit test, integration test, etc.)
□ Where does the artifact get stored? (registry, artifact store)
□ Who approves production deploys? (automated, manual gate)
□ What rollback mechanism exists?
□ How are secrets managed in the pipeline?
□ What is the branching strategy? (trunk-based, GitFlow)
```

### Step 2: Container Design

```
□ One process per container (PID 1 is the app, not supervisor)
□ Non-root user in container
□ Minimal base image (Alpine, distroless, scratch where possible)
□ Layer caching: put rarely changing deps first
□ No secrets in image (use runtime injection)
□ Health checks: /health endpoint, liveness and readiness
□ Graceful shutdown: handle SIGTERM, drain connections
□ Resource limits: CPU and memory limits set
□ Non-port 80/443 services: use env vars for port
□ Image tags: mutable tags (latest) are risky
```

### Step 3: Deployment Strategy

```
□ Blue-green: good for [zero-downtime, instant rollback, DB migrations]
□ Rolling: good for [stateful services, gradual rollout]
□ Canary: good for [testing with real traffic, gradual exposure]
□ Feature flags: good for [gradual rollout, kill switch, A/B]
□ In-place: good for [immutable infra, stateless services]

□ Blue-green: two environments, switch traffic atomically
□ Canary: 5% → 25% → 100% with monitoring
□ Feature flags: code in prod but gated, instant disable

□ What is the rollback trigger? (error rate, latency, manual)
□ How long does rollback take? (should be < 5 minutes)
□ Are database migrations forward-only? (no rollback of schema)
□ What state survives a rollback? (data? configuration?)
```

### Step 4: Infrastructure as Code

```
□ What IaC tool? (Terraform, Pulumi, CDK, Ansible)
□ State management: how is state stored and locked?
□ Environments: how are dev/staging/prod different?
□ Secrets: never in code, use secret manager or env vars
□ Drift detection: how do you know infra changed manually?
□ Modules: reusable components for common patterns
□ Testing: terraform plan, policy as code, staging apply
□ Approval: who can apply to which environment?
□ Backup: how is state backed up?
□ What happens if state is lost?
```

### Step 5: Observability Setup

```
□ METRICS: what business and technical metrics?
□ LOGGING: what to log, what to redact, where to send?
□ TRACING: distributed traces across services?
□ HEALTH: endpoints, what do they check?
□ ALERTING: what alerts, who gets paged, when?
□ DASHBOARDS: what dashboards, who uses them?
□ SLO/SLA: what are the targets, how are they measured?

□ Alert on symptoms (high error rate, slow latency), not causes.
□ Dashboard for operators (not developers staring at logs).
□ SLO burn rate alerting (you know before you breach).
```

### Step 6: Environment Strategy

```
□ DEV: local development, fast iteration, loose security
□ STAGING: production-like, full testing, pre-deploy gate
□ PROD: production, strict security, monitored

□ Staging should mirror production (same infra, same config, less scale).
□ Feature flags: test in staging before prod rollout.
□ Database: staging should have production-like data volume (anonymized).
□ Environments should differ by configuration, not code.
□ Secrets: different per environment, managed centrally.
```

---

## Outputs

```
## Deployment Architecture

### Pipeline Stages
|| Stage | Steps | Duration | Trigger |
||-------|-------|----------|---------|
|| Build | [steps] | [min] | [trigger] |
|| Test | [steps] | [min] | [trigger] |
|| Deploy | [steps] | [min] | [trigger] |

### Container Configuration
```
Base image: [image]
User: [non-root user]
Port: [env var PORT or 8080]
Health: [endpoint]
Resources: CPU=[limit] Memory=[limit]
```

### Deployment Strategy
|| Environment | Strategy | Rollback | Approval |
||-------------|----------|----------|----------|
|| Dev | [type] | [mechanism] | [who] |
|| Staging | [type] | [mechanism] | [who] |
|| Prod | [type] | [mechanism] | [who] |

### Rollback Plan
|| Scenario | Detection | Rollback | Verification |
||----------|-----------|----------|-------------|
|| [scenario] | [how] | [steps] | [how] |

### Monitoring
|| Metric | Target | Alert | Dashboard |
||--------|--------|-------|----------|
|| [metric] | [SLO] | [threshold] | [link] |
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Pipeline | All stages automated and fast (< 10 min) | Optimize slow stages |
| Artifacts | Immutable, versioned, stored securely | Fix registry |
| Rollback | Tested rollback in staging | Cannot deploy |
| Secrets | No secrets in code or images | Move to vault |
| Health | Containers have health checks | Add probes |
| Monitoring | Key metrics tracked and alerted | Add dashboards |
| IaC | Infrastructure defined in code | Cannot provision manually |

---

## Common Mistakes

```
❌ Long CI pipelines (> 15 min kills productivity)
❌ Mutable tags for container images (latest breaks reproducibility)
❌ Secrets in Docker images or CI configs
❌ No rollback plan tested before deployment
❌ Deploying directly to production without staging
❌ Manual steps in otherwise automated pipeline
❌ No health checks on containers
❌ Alert fatigue from too many alerts
❌ IaC state drift from manual changes
❌ Staging that doesn't mirror production
```
