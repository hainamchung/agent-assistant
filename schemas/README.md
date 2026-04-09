# Contract Schemas

Cross-phase contract definitions that ensure interface consistency between agents.

## Usage

Contracts are created by the `planner` agent during planning phases and consumed by implementation agents as hard constraints.

## Schema Format

See `contract-example.yaml` for the full schema with examples covering:
- **API contracts**: REST endpoint definitions
- **Database contracts**: Table/column definitions
- **Component contracts**: Props and events

## Contract Fields

| Field | Required | Type | Description |
|-------|:--------:|------|-------------|
| `contract-version` | ✅ | string | Schema version (e.g., `"1.0"`) |
| `task` | ✅ | string | Task identifier this contract belongs to |
| `type` | ✅ | string | Contract type: `api`, `database`, `component` |
| `interfaces` | ✅ | array | List of interface definitions |
| `constraints` | ❌ | array | Additional constraints for implementation |
| `dependencies` | ❌ | array | Other contracts this depends on |

## File Naming

```
reports/{topic}/CONTRACTS-{task}.yaml
```
