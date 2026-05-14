# performance — Specialized Skill

> **TIER**: 3 | **TRIGGER**: Performance optimization, profiling, bottleneck identification, scalability
> **PURPOSE**: Make systems fast and scalable, not just "working correctly"

---

## Trigger Conditions

```
APPLY WHEN:
  □ Response time exceeds acceptable SLA
  □ Memory usage growing unbounded
  □ CPU utilization unexpectedly high
  □ Database queries are slow
  □ System fails under load
  □ Designing for high throughput
  □ Optimizing a hot path (critical performance path)
  □ Choosing between algorithms with different complexity

SKIP WHEN:
  □ Expert-level system design (→ expert/distributed-systems)
  □ Profiling shows the bottleneck (→ this skill to fix it)
  □ New architecture needed (→ expert/system-design)
  □ Simple optimization (< 5 LOC) (→ foundation/debugging)
  □ Performance testing (→ professional/testing)
```

---

## Actions

### Step 1: Define Performance Goals

```
□ What is the current performance? (baseline measurement)
□ What is the target performance? (SLA, user expectation)
□ What is the acceptable P50, P95, P99 latency?
□ What is the expected load? (concurrent users, data size)
□ Is this latency-sensitive or throughput-sensitive?
□ What does "slow" mean in business terms? (revenue, engagement)
□ What is the performance budget? (time to optimize)
□ What metrics matter? (latency, throughput, memory, CPU, cost)
```

### Step 2: Profile and Identify Bottlenecks

```
□ Where is time actually spent? (profiling, not guessing)
□ Is it CPU-bound? (computation, algorithm)
□ Is it I/O-bound? (disk, network, database)
□ Is it memory-bound? (allocation, GC, leaks)
□ Is it lock-bound? (contention, serialization)
□ Is it external? (third-party API, downstream)

Top bottlenecks:
□ What are the top 3 slowest operations?
□ What are the top 3 most frequent operations?
□ What operation has the highest total time?
□ Where is memory allocated most?
□ Where is time spent waiting?
```

### Step 3: Measure Before Changing

```
□ What is the baseline performance before optimization?
□ What measurement confirms the bottleneck exists?
□ What measurement will prove the optimization worked?
□ What is the measurement overhead? (don't distort by measuring)
□ Can you isolate the bottleneck in a test?
□ Is the bottleneck reproducible?
□ What is the variance in measurements?
```

### Step 4: Optimize in Order of Impact

```
PRIORITY ORDER:
1. Algorithmic: O(n²) → O(n log n) or O(n) (usually biggest wins)
2. Architectural: wrong data structure, unnecessary work, caching
3. Caching: compute once, reuse many times
4. Database: add index, rewrite query, denormalize
5. Concurrency: parallelize independent work
6. Low-level: language tricks, memory layout (last resort)

For each optimization:
□ What specifically is being optimized?
□ What is the measured impact?
□ What is the cost? (complexity, memory, code clarity)
□ What breaks? (what other code depends on this)
□ What else becomes slower? (optimize for one path, hurt another)
□ Is this premature optimization? (measure first)
```

### Step 5: Database Optimization

```
□ Query analysis: EXPLAIN ANALYZE on every slow query
□ Indexes: add for WHERE, JOIN, ORDER BY columns
□ N+1: batch queries or eager load relationships
□ Over-fetching: SELECT only needed columns
□ Write efficiency: batch inserts/updates
□ Connection pooling: right pool size
□ Query caching: only for truly static data
□ Denormalization: trade storage for read speed
□ Pagination: never load unlimited rows
□ Partitioning: split large tables by time or shard key
□ ORM queries: inspect generated SQL, optimize
```

### Step 6: Caching Strategy

```
□ What to cache: results that are expensive to compute and frequently read
□ Cache invalidation: how do you know when to evict?
□ Cache-aside: app checks cache, misses → compute → store
□ Write-through: writes go to cache and store atomically
□ Read-through: cache fetches from store on miss
□ TTL-based: time-based expiration
□ Version-based: invalidation on version change

Pitfalls:
□ Caching data that's cheap to compute (waste memory)
□ Caching data that changes constantly (stale data)
□ Not measuring cache hit rate
□ Not having cache failure fallback
□ Distributed cache inconsistency
□ Memory pressure from unbounded cache
```

### Step 7: Load Testing

```
□ What load are you testing? (concurrent users, data size)
□ What metrics are you measuring? (latency, throughput, errors)
□ Can you reproduce the production load pattern?
□ What is the breaking point?
□ Where does it fail under load? (bottleneck shifts)
□ Does it recover after load drops?
□ Is the test realistic? (don't test with mock data at 1M rows)
□ Did the optimization actually help under load?
```

---

## Outputs

```
## Performance Analysis

### Baseline
|| Metric | Before | Target | Gap |
||--------|--------|--------|-----|
|| P50 latency | [ms] | [ms] | [%] |
|| P99 latency | [ms] | [ms] | [%] |
|| Throughput | [rps] | [rps] | [%] |
|| Memory | [MB] | [MB] | [%] |

### Bottleneck Identification
|| Location | Type | Impact | Evidence |
||----------|------|--------|---------|
|| [code] | [CPU/IO/Memory/Lock] | [impact] | [profile] |

### Optimizations Applied
|| # | Change | Before | After | Effort |
||---|--------|--------|-------|--------|
|| 1 | [desc] | [ms] | [ms] | [h] |
|| 2 | [desc] | [ms] | [ms] | [h] |

### Load Test Results
|| Scenario | Load | P99 | RPS | Errors |
||----------|------|-----|-----|--------|
|| [name] | [N] | [ms] | [N] | [%] |

### Cache Hit Rates
|| Cache | Hit Rate | Miss Cost | Hit Benefit |
||-------|----------|-----------|-------------|
|| [name] | [%] | [ms] | [ms] |
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Baseline | Performance measured before any changes | Measure first |
| Bottleneck | Root cause identified, not symptom | Profile, don't guess |
| Impact | Each change shows measurable improvement | Revert if no impact |
| Load test | System meets SLA under load | Optimize further |
| No regression | Optimization doesn't slow other paths | Benchmark thoroughly |
| Invalidation | Cache invalidation tested | Add tests |

---

## Common Mistakes

```
❌ Optimizing without measuring (premature optimization)
❌ Guessing instead of profiling
❌ Optimizing the wrong thing (N+1 while worrying about algorithm)
❌ Optimizing code that's rarely executed
❌ Trading CPU for memory (or vice versa) without measuring
❌ Cache invalidation bugs (stale data in production)
❌ Not load testing after optimization
❌ Over-optimizing (making code unreadable for < 5% gain)
❌ Ignoring database queries (usually the biggest bottleneck)
❌ Not checking query plans (EAFP with EXPLAIN)
```
