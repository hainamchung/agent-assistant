# database — Professional Skill

> **TIER**: 2 | **TRIGGER**: Schema design, query optimization, migration planning, ORM patterns
> **PURPOSE**: Design databases that are fast, consistent, and maintainable

---

## Trigger Conditions

```
APPLY WHEN:
  □ Adding or modifying database tables or columns
  □ Writing complex queries
  □ Database migration planning
  □ Index design decisions
  □ Choosing between SQL and NoSQL
  □ ORM usage patterns
  □ Connection pooling
  □ Transaction boundaries

SKIP WHEN:
  □ Distributed database architecture (→ expert/distributed-systems)
  □ Database security hardening (→ specialized/security)
  □ Schema migration in production (→ devops)
  □ Expert-level query optimization (→ specialized/performance)
```

---

## Actions

### Step 1: Design the Schema

```
□ What entities exist? (name them, define relationships)
□ What is the natural key? (business identifier) vs surrogate key? (UUID, auto)
□ What are the columns? (name, type, constraints)
□ What are the constraints? (NOT NULL, UNIQUE, CHECK, DEFAULT)
□ What are the relationships? (1:1, 1:N, N:N)
□ What is the cardinality of relationships?
□ Are there soft deletes? (deleted_at instead of DELETE)
□ Are there timestamps? (created_at, updated_at)
□ What are the access patterns? (read-heavy, write-heavy, balanced)
□ What are the retention requirements?
□ Normalize until you have a good reason not to.
Denormalize when you have proven performance problems.
```

### Step 2: Design Indexes

```
□ Primary key: unique index on the ID column
□ Foreign keys: indexes on columns used in JOINs
□ WHERE columns: indexes on columns used in filters
□ ORDER BY columns: indexes on columns used in sorting
□ Composite indexes: column order matters (equality first, then range)
□ Partial indexes: for filtered queries (active records only)
□ Avoid over-indexing: each index slows writes.

□ Index on (user_id, created_at) for "get user's recent posts"
□ Index on (email) for "find user by email" (unique)
□ Index on (status) WHERE status = 'active' for "get active records"

□ Don't add indexes "just in case" — wait for performance problems.
```

### Step 3: Write the Migrations

```
□ Is the migration reversible? (up and down)
□ Is it safe to run on a live database with data?
□ Will it lock the table? (add column vs new table + backfill)
□ Is there a rollback plan?
□ Are migrations run in order?
□ Are migrations tested in staging first?
□ Does the migration handle existing data?
□ What's the expected runtime? (1 second? 1 hour?)
□ Can it be broken into smaller steps for large tables?

□ Adding a NOT NULL column: requires default value or default expression.
□ Adding a column with FK: lock order matters.
□ Renaming a column: use add + backfill + drop pattern.
□ Dropping a column: mark deprecated first, wait for deploy cycle.
```

### Step 4: Query Optimization

```
□ Use EXPLAIN ANALYZE to understand query plans.
□ Look for: sequential scans, nested loops, high row estimates.
□ Check indexes are being used.
□ Look for implicit type casts (index on int, query with string).
□ Batch operations instead of N queries in a loop.
□ Use EXISTS instead of IN for subqueries.
□ Use JOIN instead of correlated subquery.
□ Pagination: cursor-based for large datasets.
□ ORM: always check generated SQL. N+1 queries are common.
```

### Step 5: Transaction Design

```
□ What is the transaction boundary?
□ What happens if the transaction fails?
□ Is the transaction too large? (long-running = lock contention)
□ What is the isolation level? (read committed, serializable)
□ Do you need SELECT FOR UPDATE for row-level locking?
□ Are there deadlocks? (lock ordering across tables)
□ Is retry logic needed for deadlocks?
□ Are there read-only transactions? (no locks needed)
□ Long-running batch: process in chunks, commit per chunk.
```

### Step 6: ORM Patterns

```
□ Use transactions for multi-statement operations.
□ Eager loading for known relationships (avoid N+1).
□ Project only needed columns (SELECT * is wasteful).
□ Use find_by_sql only when ORM can't express the query.
□ Scopes for common query patterns (reusable, chainable).
□ Don't use ORM for complex reporting (raw SQL or view).
□ Migrations should be framework-agnostic when possible.
□ Model should validate, DB should enforce (both layers).
```

---

## Outputs

```
## Database Design

### Schema
|| Table | Columns | Primary Key | Indexes | Foreign Keys |
||-------|---------|-------------|---------|--------------|
|| [name] | [cols] | [PK] | [indexes] | [FKs] |

### Indexes
|| Table | Index | Columns | Type | Purpose |
||-------|-------|---------|------|--------|
|| [name] | [idx] | [cols] | [B-tree/Hash] | [purpose] |

### Migrations
|| # | Migration | Direction | Lock Risk | Runtime |
||---|-----------|-----------|-----------|--------|
|| 1 | [desc] | up/down | [risk] | [est] |

### Query Performance
|| Query | Plan | Issue | Fix |
||-------|------|------|-----|
|| [desc] | [seq scan/N+1] | [issue] | [fix] |

### Transaction Boundaries
|| Operation | Isolation | Locking | Retry |
||-----------|-----------|---------|-------|
|| [op] | [level] | [type] | [yes/no] |
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Schema | All columns typed, constrained, documented | Add constraints |
| Indexes | Indexes match actual query patterns | Profile first |
| Migrations | Reversible and tested on data | Add down migration |
| Foreign keys | Cascading relationships explicit | Document behavior |
| Transactions | Boundaries documented | Review locking |
| ORM | No N+1 queries on hot paths | Add eager loading |

---

## Common Mistakes

```
❌ Adding indexes without measuring (premature indexing)
❌ SELECT * in production code (over-fetching)
❌ ORM N+1 queries (not using eager loading)
❌ Untested migrations on production data volume
❌ Long-running transactions (lock contention)
❌ NOT NULL without default on large tables (lock)
❌ Deleting data that should be soft-deleted
❌ No rollback plan for migrations
❌ Foreign keys without indexes (slow joins)
❌ Over-normalization for read-heavy workloads
```
