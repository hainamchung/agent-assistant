# frontend — Foundation Skill

> **TIER**: 1 | **TRIGGER**: Simple UI changes, single-component fixes, CSS tweaks, HTML updates
> **PURPOSE**: Make targeted frontend changes without breaking the broader system

---

## Trigger Conditions

```
APPLY WHEN:
  □ Fixing a CSS bug (layout, styling, responsiveness)
  □ Adding or modifying a single component
  □ Updating text content or labels
  □ Simple form field changes
  □ Adding/removing a CSS class
  □ Small JavaScript changes (< 20 lines)
  □ Adding simple event handlers

SKIP WHEN:
  □ Multi-component changes (→ professional/frontend)
  □ State management changes (→ professional/frontend)
  □ Routing changes (→ professional/frontend)
  □ Performance issues (→ specialized/performance)
  □ Accessibility fixes (→ professional/frontend)
```

---

## Actions

### Step 1: Locate the Right File

```
□ Is this a React/Vue/Svelte component? (find by component name)
□ Is this a CSS/SCSS file? (find by class name or BEM convention)
□ Is this a template file? (HTML, JSX, Vue SFC)
□ Is this a static file? (images, fonts)
□ Can you find existing patterns for similar changes?
□ Does the component have tests? (verify the fix doesn't break tests)
```

### Step 2: Understand the Component

```
□ What is this component's purpose?
□ What props or state does it use?
□ What side effects does it have? (API calls, events)
□ Is it part of a larger form or flow?
□ What are the existing class names or styles?
□ Is there a design system or component library?
□ What is the existing code style? (follow it)
```

### Step 3: Make the Change

```
□ CSS: use existing class names or follow BEM convention.
□ Props: use correct types, add defaults if needed.
□ Events: follow existing event handler patterns.
□ JSX: match existing code style (quotes, semicolons, formatting).
□ Templates: match existing attribute order and style.

□ Keep changes minimal. Don't refactor adjacent code.
□ Don't change the component API unless necessary.
□ Test the change in the browser if possible.
```

### Step 4: Verify the Change

```
□ Does the change look correct in the browser?
□ Does it work on different screen sizes? (responsive)
□ Does it respect the existing design system?
□ Are there tests for this component? (do they pass)
□ Does the linter pass? (formatting, unused imports)
□ Is there a type checker? (does it pass)
```

---

## Outputs

```
## Frontend Change Summary

### Change Location
File: [path]
Component/Selector: [name]

### What Changed
[Description of the change]

### Verification
□ Visual check in browser: [OK/ISSUE]
□ Responsive test: [OK/ISSUE]
□ Existing tests: [pass/fail/N/A]
□ Linter: [pass/fail]
□ Type check: [pass/fail/N/A]
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Scope | Change is minimal and targeted | Limit scope |
| Pattern | Follows existing code patterns | Adjust to match |
| Tests | Existing tests pass | Fix if broken |
| Responsive | Works on all target screen sizes | Test breakpoints |

---

## Common Mistakes

```
❌ Changing adjacent code that wasn't part of the fix
❌ Not following existing naming conventions
❌ Hardcoding pixel values instead of using variables
❌ Not checking responsiveness
❌ Adding inline styles instead of using existing classes
❌ Breaking existing tests
❌ Not running the linter
```
