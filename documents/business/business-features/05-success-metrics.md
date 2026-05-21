# Success Metrics

> **Section**: Business Features | **File**: 05-success-metrics.md
> **Purpose**: 20 KPIs covering adoption, quality, performance, engagement, and financial metrics

---

## Metric Categories

| Category | Count | Focus |
|----------|-------|-------|
| Adoption | 4 | User growth, activation, retention |
| Quality | 5 | Code quality, review coverage, bug rates |
| Performance | 4 | Speed, token efficiency, reliability |
| Engagement | 4 | Usage patterns, feature adoption |
| Financial | 3 | Cost savings, ROI, efficiency gains |

---

## Adoption Metrics

### A1: User Activation Rate

| Attribute | Value |
|-----------|-------|
| **Metric** | Users completing first successful workflow |
| **Baseline** | N/A (new product) |
| **Target** | 70% within 7 days of install |
| **Measurement** | Count of users with ≥1 workflow completion / total installs |
| **Frequency** | Weekly |

**Calculation**:
```
Activation Rate = (Users with ≥1 completed workflow) / (Total installs) × 100
```

---

### A2: Command Usage Distribution

| Attribute | Value |
|-----------|-------|
| **Metric** | Adoption of all 14 commands |
| **Baseline** | N/A |
| **Target** | 80% of active users use ≥3 different commands |
| **Measurement** | Unique command count per user |
| **Frequency** | Monthly |

---

### A3: Platform Distribution

| Attribute | Value |
|-----------|-------|
| **Metric** | Usage across 7 platforms |
| **Baseline** | N/A |
| **Target** | No single platform >60% of usage |
| **Measurement** | Workflow count per platform |
| **Frequency** | Monthly |

---

### A4: User Retention

| Attribute | Value |
|-----------|-------|
| **Metric** | Users returning after initial activation |
| **Baseline** | N/A |
| **Target** | 60% retained at 30 days, 40% at 90 days |
| **Measurement** | Cohort analysis |
| **Frequency** | Monthly |

---

## Quality Metrics

### Q1: Bug Rate Reduction

| Attribute | Value |
|-----------|-------|
| **Metric** | Bug rate in workflows with Agent Assistant |
| **Baseline** | Pre-Agent Assistant bug rate |
| **Target** | 70% reduction |
| **Measurement** | Bugs per feature / Bugs per feature (baseline) |
| **Frequency** | Per release |

**Calculation**:
```
Bug Reduction = (Baseline bugs - Current bugs) / Baseline bugs × 100
```

---

### Q2: Golden Triangle Pass Rate

| Attribute | Value |
|-----------|-------|
| **Metric** | Team workflows completing with consensus |
| **Baseline** | N/A |
| **Target** | 95% consensus rate |
| **Measurement** | Team workflows with consensus stamp / Total team workflows |
| **Frequency** | Weekly |

---

### Q3: Code Review Coverage

| Attribute | Value |
|-----------|-------|
| **Metric** | Code reviewed by reviewer agent |
| **Baseline** | Manual review coverage (estimate) |
| **Target** | 100% of /cook/:hard and /cook/:team outputs reviewed |
| **Measurement** | Reviewed lines / Total AI-generated lines |
| **Frequency** | Weekly |

---

### Q4: Security Finding Rate

| Attribute | Value |
|-----------|-------|
| **Metric** | Security issues found per workflow |
| **Baseline** | Pre-Agent Assistant rate |
| **Target** | 80% reduction in security findings per release |
| **Measurement** | Security issues / Workflow count |
| **Frequency** | Per release |

---

### Q5: Phase Exit Criteria Compliance

| Attribute | Value |
|-----------|-------|
| **Metric** | Phases completing with all exit criteria met |
| **Baseline** | N/A |
| **Target** | 99% compliance |
| **Measurement** | Phases with all criteria checked / Total phases |
| **Frequency** | Weekly |

---

## Performance Metrics

### P1: Time-to-Production

| Attribute | Value |
|-----------|-------|
| **Metric** | Feature development cycle time |
| **Baseline** | Pre-Agent Assistant average (14 days) |
| **Target** | 70% faster (4 days) |
| **Measurement** | Days from request to production |
| **Frequency** | Per feature |

**Calculation**:
```
Time Improvement = (Baseline time - Current time) / Baseline time × 100
```

---

### P2: Token Cost Reduction

| Attribute | Value |
|-----------|-------|
| **Metric** | Token consumption per task |
| **Baseline** | Naive prompting (no skills) |
| **Target** | 85% reduction |
| **Measurement** | Tokens per workflow |
| **Frequency** | Weekly |

---

### P3: Phase Execution Time

| Attribute | Value |
|-----------|-------|
| **Metric** | Time to complete each variant |
| **Baseline** | N/A |
| **Target** | :fast <2min, :hard <15min, :team <45min |
| **Measurement** | Duration per phase |
| **Frequency** | Per workflow |

**Acceptable Limits**:

| Variant | Target | Maximum |
|---------|--------|---------|
| :fast | 30 seconds | 2 minutes |
| :hard | 5 minutes | 15 minutes |
| :team | 15 minutes | 45 minutes |

---

### P4: Workflow Success Rate

| Attribute | Value |
|-----------|-------|
| **Metric** | Workflows completing without error |
| **Baseline** | N/A |
| **Target** | 99% success rate |
| **Measurement** | Successful workflows / Total workflows |
| **Frequency** | Weekly |

---

## Engagement Metrics

### E1: Daily Active Users (DAU)

| Attribute | Value |
|-----------|-------|
| **Metric** | Unique users with ≥1 workflow per day |
| **Baseline** | N/A |
| **Target** | 100 DAU at 6 months |
| **Measurement** | Count of unique users per day |
| **Frequency** | Daily |

---

### E2: Command Variant Usage

| Attribute | Value |
|-----------|-------|
| **Metric** | Distribution of :fast, :hard, :team variants |
| **Baseline** | N/A |
| **Target** | 60% :fast, 30% :hard, 10% :team |
| **Measurement** | Workflows per variant |
| **Frequency** | Monthly |

---

### E3: Skill Injection Rate

| Attribute | Value |
|-----------|-------|
| **Metric** | Workflows with skills injected |
| **Baseline** | N/A |
| **Target** | 90% of complex tasks inject skills |
| **Measurement** | Workflows with skill loading / Total complex workflows |
| **Frequency** | Weekly |

---

### E4: Wiki Generation Usage

| Attribute | Value |
|-----------|-------|
| **Metric** | Documentation generated via /wiki |
| **Baseline** | N/A |
| **Target** | 50% of new projects generate initial wiki |
| **Measurement** | Wiki generation count / New project count |
| **Frequency** | Monthly |

---

## Financial Metrics

### F1: Development Cost Savings

| Attribute | Value |
|-----------|-------|
| **Metric** | Cost reduction per feature |
| **Baseline** | Average developer cost per feature |
| **Target** | 70% cost reduction |
| **Measurement** | (Baseline cost - Current cost) / Feature count |
| **Frequency** | Per feature |

**Calculation**:
```
Savings = Baseline cost per feature - Agent Assistant cost per feature
ROI = (Savings - Agent Assistant cost) / Agent Assistant cost × 100
```

---

### F2: Token Cost Savings

| Attribute | Value |
|-----------|-------|
| **Metric** | Token cost reduction |
| **Baseline** | Naive prompting token cost |
| **Target** | 85% token cost reduction |
| **Measurement** | Token cost per task |
| **Frequency** | Monthly |

---

### F3: Quality Assurance Cost Reduction

| Attribute | Value |
|-----------|-------|
| **Metric** | QA time saved through automated review |
| **Baseline** | Manual review hours per feature |
| **Target** | 60% reduction in QA time |
| **Measurement** | QA hours / Feature |
| **Frequency** | Per release |

---

## Metric Dashboard Summary

| Metric | Category | Baseline | Target | Current | Status |
|--------|----------|----------|--------|---------|--------|
| A1: Activation Rate | Adoption | N/A | 70% | — | — |
| A2: Command Usage | Adoption | N/A | 80% | — | — |
| A3: Platform Distribution | Adoption | N/A | Balanced | — | — |
| A4: User Retention | Adoption | N/A | 60%/30d | — | — |
| Q1: Bug Rate | Quality | Baseline | -70% | — | — |
| Q2: Triangle Pass Rate | Quality | N/A | 95% | — | — |
| Q3: Review Coverage | Quality | Baseline | 100% | — | — |
| Q4: Security Findings | Quality | Baseline | -80% | — | — |
| Q5: Exit Criteria | Quality | N/A | 99% | — | — |
| P1: Time-to-Production | Performance | 14 days | 4 days | — | — |
| P2: Token Reduction | Performance | Baseline | -85% | — | — |
| P3: Execution Time | Performance | N/A | Variant limits | — | — |
| P4: Success Rate | Performance | N/A | 99% | — | — |
| E1: DAU | Engagement | N/A | 100/6mo | — | — |
| E2: Variant Distribution | Engagement | N/A | 60/30/10 | — | — |
| E3: Skill Injection | Engagement | N/A | 90% | — | — |
| E4: Wiki Usage | Engagement | N/A | 50% | — | — |
| F1: Dev Cost | Financial | Baseline | -70% | — | — |
| F2: Token Cost | Financial | Baseline | -85% | — | — |
| F3: QA Cost | Financial | Baseline | -60% | — | — |

---

## Evidence Sources

- `README.md` — Target metrics (70% faster, 70% bugs, 85% tokens)
- `rules/CORE.md` — Performance targets encoded in execution rules
- `rules/PHASES.md` — Phase timing guidelines
- `rules/AGENTS.md` — Quality gate definitions
