# ai-assist — Professional Skill

> **TIER**: 2 | **TRIGGER**: AI pair programming, code generation, AI review, AI refactoring assistance
> **PURPOSE**: Use AI assistance to amplify productivity without degrading code quality

---

## Trigger Conditions

```
APPLY WHEN:
  □ Using AI to generate code
  □ Using AI to review code
  □ Using AI to explain code
  □ Using AI to refactor code
  □ Using AI to write tests
  □ Using AI to debug issues
  □ Setting up AI coding tools or prompts

SKIP WHEN:
  □ Expert-level LLM system integration (→ expert/llm-integration)
  □ Fine-tuning or training models (→ expert/llm-integration)
  □ RAG system design (→ expert/llm-integration)
  □ Simple autocomplete (→ use it, this is obvious)
```

---

## Actions

### Step 1: Define the AI's Role

```
□ What is the AI good at? (boilerplate, patterns, search, explanation)
□ What is the AI bad at? (context, business logic, edge cases)
□ What does the AI hallucinate? (APIs, versions, edge cases)
□ What is the risk of AI-generated code? (security, correctness)
□ What level of review is needed for AI output?
□ What prompts work best for this codebase?
□ What context does the AI need to be effective?

□ AI is excellent at: boilerplate, idioms, patterns, renaming, formatting.
□ AI is moderate at: test generation, refactoring, explanation.
□ AI is poor at: business logic, security, performance, novel code.
□ AI hallucinates: non-existent APIs, incorrect parameters, wrong versions.
```

### Step 2: Validate AI-Generated Code

```
□ Does the code actually work? (run it, test it)
□ Does it match the codebase's patterns? (style, naming, structure)
□ Does it handle the edge cases? (null, empty, errors)
□ Does it introduce security issues? (injection, secrets)
□ Does it have performance issues? (N+1, memory leaks)
□ Is it tested? (AI-generated code needs tests like all code)
□ Does it have dependencies? (are they safe, are they needed)
□ Is the code readable? (AI code can be cryptic)

□ ALWAYS review AI-generated code before committing.
□ ALWAYS run tests on AI-generated code.
□ AI can write tests, but someone must verify they're testing the right things.
```

### Step 3: Provide Effective Context

```
□ Give the AI: file paths, function names, existing patterns.
□ Give the AI: the goal, not the implementation.
□ Give the AI: examples of similar code in the codebase.
□ Give the AI: constraints (no external APIs, must use existing X).
□ Give the AI: what NOT to do (don't use Y, avoid Z pattern).
□ Give the AI: relevant tests to understand expected behavior.
□ Give the AI: error messages when debugging (AI is good at this).

□ The more context, the better the output.
□ Specific goals > vague requests.
□ "Write me a function" → "Write me a function that validates user input using our existing validateInput() pattern, returning error codes from our ErrorCode enum."
```

### Step 4: Use AI for the Right Tasks

```
□ GOOD: Generate boilerplate, scaffolds, migrations, tests.
□ GOOD: Explain code, refactor for readability, rename variables.
□ GOOD: Find similar patterns in the codebase.
□ GOOD: Write documentation for existing code.
□ GOOD: Debug error messages, find bugs in logic.
□ BAD: Generate business logic without deep review.
□ BAD: Generate security-critical code without security review.
□ BAD: Generate novel algorithms without verification.
□ BAD: Trust AI on version-specific APIs without checking.
```

### Step 5: Review AI Output Thoroughly

```
□ Check the code compiles and runs.
□ Check it matches your codebase's style.
□ Check for hallucinated APIs or wrong function names.
□ Check for security issues (AI doesn't always think security).
□ Check for missing error handling.
□ Check for missing tests.
□ Check for over-engineering (AI can be verbose).
□ Check the code is simple and readable.

□ AI is a junior developer with infinite knowledge and no judgment.
□ Treat AI output as: "here's a starting point, now I'll review it carefully."
```

### Step 6: Improve AI Effectiveness Over Time

```
□ Track which prompts work well and which don't.
□ Build a library of good prompts for recurring tasks.
□ Give AI feedback when it produces poor output.
□ Use AI for learning (understand unfamiliar patterns).
□ Use AI for code review (catch what reviewers miss).
□ Use AI for testing (especially edge cases).
□ Iterate on context: more context = better output.

□ The better the input, the better the output. Invest in context.
□ AI can amplify good developers; it can't replace judgment.
```

---

## Outputs

```
## AI Assistance Usage Report

### Effective Use Cases
|| Task | AI Effectiveness | Review Level | Notes |
||------|------------------|--------------|-------|
|| [task] | [High/Med/Low] | [Level] | [notes] |

### Prompt Patterns That Work
```
[Pattern 1]: [effective prompt]
[Pattern 2]: [effective prompt]
```

### Hallucination Patterns
|| Pattern | Hallucination Type | Mitigation |
||----------|-------------------|-----------|
|| [pattern] | [type] | [mitigation] |

### Review Checklist for AI Output
□ Code compiles
□ Tests pass
□ Matches codebase style
□ No hallucinated APIs
□ Security issues checked
□ Error handling present
□ Tests added
□ Simple and readable
□ Dependencies verified

### Prompt Library (for this codebase)
|| Task | Prompt Template | Effectiveness |
||------|---------------|---------------|
|| [task] | [template] | [1-5] |
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Execution | AI code runs without errors | Test before commit |
| Review | Human reviews all AI output | Cannot commit unreviewed AI code |
| Security | Security-critical AI output has security review | Security review required |
| Testing | AI-generated code is tested | Add tests |
| Hallucination | No hallucinated APIs in AI code | Verify API existence |

---

## Common Mistakes

```
❌ Trusting AI code without review
❌ Using AI for business logic without deep understanding
❌ Not providing enough context for good output
❌ Ignoring hallucinations (AI can make up APIs)
❌ Not testing AI-generated code
❌ Over-relying on AI instead of learning
❌ Using AI for code you don't understand
❌ Not iterating on prompts for better output
❌ Letting AI introduce security issues
❌ Using AI for complex novel algorithms without verification
```
