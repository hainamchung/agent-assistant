# api-design — Professional Skill

> **TIER**: 2 | **TRIGGER**: New API endpoints, REST APIs, GraphQL, WebSocket design, API versioning
> **PURPOSE**: Design APIs that are intuitive, evolvable, secure, and performant

---

## Trigger Conditions

```
APPLY WHEN:
  □ Creating new API endpoints or routes
  □ Designing data exchange formats
  □ Adding API versioning
  □ GraphQL schema design
  □ WebSocket or real-time API design
  □ Public API design (breaking changes matter)
  □ Internal API with multiple consumers

SKIP WHEN:
  □ Distributed system architecture (→ expert/distributed-systems)
  □ New service boundary design (→ specialized/architecture)
  □ Simple CRUD endpoint (→ foundation/backend)
  □ API security hardening (→ specialized/security)
```

---

## Actions

### Step 1: Define the API Contract

```
□ What resource does this API manage? (noun, not verb)
□ Who is the consumer? (internal, external, mobile, third-party)
□ What operations does the consumer need? (CRUD or something else)
□ What is the natural grouping? (by resource, by use case, by actor)
□ Is this a request-response or an event-based API?
□ What is the error model? (when does the consumer get errors?)
□ What is the authentication model? (API key, OAuth, JWT)
□ What is the rate limiting model?
```

### Step 2: Design the Interface

```
□ RESTful or RPC-style? (REST for resources, RPC for actions)
□ URL structure: /resources/{id}/sub-resources (hierarchical)
□ HTTP methods: GET (read), POST (create), PUT/PATCH (update), DELETE (delete)
□ Request format: JSON, form-data, multipart?
□ Response format: JSON, XML? (JSON is the default)
□ Pagination: cursor-based (large datasets) or offset-based (random access)
□ Filtering: query params for known filters, search param for full-text
□ Sorting: sort param with field names and direction
□ Field selection: fields param to reduce payload
```

### Step 3: Design the Data Model

```
□ What is the resource schema? (what fields, what types)
□ Which fields are required vs optional?
□ What are the default values?
□ What are the validation rules?
□ What is the identifier strategy? (UUID, auto-increment, external ID)
□ What fields are read-only? (created_at, updated_at)
□ What fields are admin-only?
□ What fields are computed/derived?
□ What is the relationship to other resources?
□ Are there sub-resources?
```

### Step 4: Handle State Changes and Errors

```
□ Idempotency: can the same request be retried safely?
  - POST: generate idempotency key
  - PUT/PATCH: natural idempotency
  - DELETE: natural idempotency (404 is OK)
□ Optimistic locking: is concurrent update a problem? (ETag/If-Match)
□ Error response format: consistent, machine-readable codes
□ HTTP status codes: 2xx success, 4xx client error, 5xx server error
□ Error codes: machine-readable in addition to human-readable
□ Partial failures: what happens in batch operations?
□ Async operations: how does the consumer know when it's done?
```

### Step 5: Plan for Evolution

```
□ Versioning: how will breaking changes be handled?
  - URL versioning: /v1/, /v2/ (explicit, easy to cache)
  - Header versioning: Accept: application/vnd.api+json (transparent)
  - Deprecation: how long does v1 live after v2 ships?
□ Backwards compatibility: what changes are safe?
  - Adding optional fields to responses: safe
  - Adding required fields to requests: breaking
  - Removing fields from responses: breaking
  - Changing field types: breaking
□ What happens to existing clients when the API changes?
□ How is the changelog communicated?
```

### Step 6: Performance Considerations

```
□ N+1 problem: can the client get all needed data in one call?
□ Batch endpoints: should related operations be batched?
□ Caching: what can be cached? (Cache-Control headers)
□ Compression: gzip/Brotli for large payloads
□ Rate limiting: what limit? (per-user, per-IP, per-key)
□ Payload size: is there a max request/response size?
□ Field expansion: can clients request computed/related fields?
□ Async operations: for long-running operations, return 202 + poll URL
```

---

## Outputs

```
## API Design Document

### Endpoint Summary
|| Method | Path | Description | Auth |
|-------|------|-------------|------|
|| GET | /resources | List | [auth] |
|| POST | /resources | Create | [auth] |
|| GET | /resources/{id} | Get | [auth] |
|| PATCH | /resources/{id} | Update | [auth] |
|| DELETE | /resources/{id} | Delete | [auth] |

### Resource Schema
```json
{
  "id": "string (UUID)",
  "field": { "type": "string", "required": true, "readonly": false },
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

### Error Format
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Human-readable message",
    "details": {}
  }
}
```

### Status Codes
|| Code | When |
||------|------|
|| 200 | Successful GET/PATCH |
|| 201 | Successful POST (created) |
|| 204 | Successful DELETE |
|| 400 | Validation error |
|| 401 | Not authenticated |
|| 403 | Not authorized |
|| 404 | Resource not found |
|| 409 | Conflict |
|| 429 | Rate limited |
|| 500 | Server error |

### Versioning Strategy
[URL / Header approach and deprecation timeline]

### Rate Limits
[Limits and headers]
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Idempotency | Mutating operations are idempotent or keyed | Add idempotency |
| Error codes | Machine-readable error codes in all error responses | Standardize errors |
| Versioning | Breaking changes require new version | Document changes |
| Pagination | Large list endpoints are paginated | Add pagination |
| Auth | All endpoints have appropriate auth | Add auth |
| Type safety | Schema defined (OpenAPI, JSON Schema) | Add schema |

---

## Common Mistakes

```
❌ Using verbs in URLs (POST /createUser instead of POST /users)
❌ Inconsistent naming conventions
❌ Missing pagination on list endpoints
❌ Not making mutating operations idempotent
❌ Leaking internal errors to clients (500s with stack traces)
❌ No rate limiting on public endpoints
❌ Breaking changes without versioning
❌ Over-fetching (no field selection)
❌ Not handling partial failures in batch operations
❌ Missing API documentation
```
