# llm-integration — Expert Skill

> **TIER**: 4 | **TRIGGER**: LLM API integration, RAG systems, agentic AI, fine-tuning decisions
> **PURPOSE**: Design production-ready LLM-integrated systems where quality, cost, and latency matter

---

## Trigger Conditions

```
APPLY WHEN:
  □ Integrating LLMs as a core system component (not just a feature)
  □ Building RAG (Retrieval Augmented Generation) systems
  □ Designing multi-agent systems with LLM orchestration
  □ Making fine-tuning vs. prompting vs. RAG decisions
  □ LLM output quality is a product requirement
  □ Cost and latency are production constraints
  □ Hallucination risk is a real concern
  □ Regulatory constraints on AI output exist

SKIP WHEN:
  □ One-off LLM call with low quality requirements (→ professional/ai-assist)
  □ Simple prompt template (→ professional/api-design)
  □ Existing LLM patterns exist in codebase (→ follow those patterns)
  □ This is pure ML research (→ expert/research)
```

---

## Actions

### Step 1: Define the LLM's Role in the System

```
□ What decision or output does the LLM make?
□ What happens if the LLM is wrong? (risk severity)
□ What happens if the LLM is slow? (latency budget)
□ What happens if the LLM is expensive? (cost budget)
□ Is the LLM's output user-facing or internal?
□ How often does this run? (volume)
□ Can the LLM's output be reviewed before use?
□ Is the LLM working alone or as part of a pipeline?
□ What is the failure mode? (wrong, slow, expensive, silent)
```

### Step 2: Choose the Approach

```
□ PROMPTING: Best when [task is simple, examples are available, model is strong]
□ FEW-SHOT: Best when [task needs examples, format matters, context is key]
□ CHAIN-OF-THOUGHT: Best when [reasoning matters, multi-step logic]
□ RAG: Best when [knowledge is in documents, grounding matters, hallucination risk]
□ FINE-TUNING: Best when [specific style, many examples, latency/cost critical]
□ AGENTIC: Best when [multi-step, tool use, dynamic planning]

For each option:
□ What evidence says this approach works for our task?
□ What is the failure mode specific to this approach?
□ What is the cost per call at our volume?
□ What is the latency at our SLA?
□ How do we handle failures?
□ What is the iteration speed for improvements?
```

### Step 3: Design the Prompt Architecture

```
□ System prompt: what is the LLM's persona and constraints?
□ Few-shot examples: are these representative and diverse?
□ Input format: structured or unstructured? (structured is usually better)
□ Output format: JSON schema, markdown, free text? (structured is usually better)
□ Context window: how much can we fit? (budget carefully)
□ Chain-of-thought: where is reasoning needed vs. pattern matching?
□ Hallucination mitigation: what grounding, citations, or constraints exist?
□ Safety filters: what outputs are unacceptable?
```

### Step 4: Design for Production

```
□ Cost: How do we minimize tokens while maintaining quality?
□ Latency: Async? Streaming? Caching? (semantic cache?)
□ Reliability: What if the LLM API is down? (fallback model, cache, human)
□ Consistency: What if the same input gives different outputs? (seeding)
□ Observability: How do we know the LLM is working? (quality metrics)
□ Versioning: How do we track which prompt version produced which output?
□ A/B testing: How do we compare prompt versions in production?
□ Rollback: If a new prompt is worse, how do we revert?
□ Rate limiting: Per-user? Per-endpoint? (cost control)
```

### Step 5: Implement RAG (if applicable)

```
□ Data pipeline: how does knowledge get into the retrieval store?
□ Chunking: what size and overlap? (affects retrieval quality)
□ Embedding: which model? (quality vs. cost vs. speed)
□ Retrieval: vector search, BM25, hybrid? (and why)
□ Re-ranking: is retrieved context ranked by relevance?
□ Grounding: how does the LLM use retrieved context? (prompt injection risk)
□ Freshness: how often is the knowledge base updated?
□ Quality: how do we measure retrieval quality? (recall, precision)
□ Hallucination: what prevents the LLM from ignoring context?
```

### Step 6: Quality Assurance

```
□ Evaluation dataset: curated examples with expected outputs
□ Automated metrics: BLEU, ROUGE, or better (learned metrics)
□ Human evaluation: for subjective quality
□ Regression suite: what breaks when we change the prompt?
□ Adversarial testing: what inputs break the LLM?
□ Red-teaming: what outputs are harmful?
□ Drift detection: how do we know quality is degrading over time?
□ Cost monitoring: how do we know if cost is ballooning?
```

---

## Outputs

```
## LLM Integration Design

### System Role
[What the LLM does in the system, what happens if it fails]

### Approach Selection
|| Approach | Chosen | Rationale | Trade-offs |
||----------|--------|-----------|-----------|
|| Prompting | [Y/N] | [reason] | [trade-offs] |
|| Few-shot | [Y/N] | [reason] | [trade-offs] |
|| RAG | [Y/N] | [reason] | [trade-offs] |
|| Fine-tuning | [Y/N] | [reason] | [trade-offs] |

### Prompt Architecture
```
System prompt: [summary]
Few-shot: [N] examples
Input format: [structure]
Output format: [schema]
Context: [window budget]
```

### Quality Baselines
|| Metric | Target | Measurement |
||--------|--------|-------------|
|| [metric] | [target] | [method] |

### Cost Model
|| Component | Cost/Call | Volume | Total/Month |
||-----------|-----------|--------|-------------|
|| [component] | [$] | [N] | [$] |

### Latency Budget
|| Path | Target P99 | Strategy |
||------|-----------|----------|
|| [path] | [ms] | [async/streaming/caching] |

### Fallback Strategy
|| Failure Mode | Detection | Fallback |
||--------------|-----------|----------|
|| [mode] | [method] | [strategy] |

### Evaluation Dataset
[N] examples covering: [coverage areas]
Current quality: [metrics]
Regression threshold: [metrics]
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Approach | Documented rationale for chosen approach | Cannot proceed without |
| Prompt | Tested with evaluation dataset | Cannot deploy without |
| Cost | Estimated at volume within budget | Redesign or cut scope |
| Latency | Meets SLA or has async fallback | Cannot deploy sync |
| Reliability | Fallback exists for API failure | Cannot deploy without |
| Observability | Quality metrics tracked in production | Add monitoring |
| Safety | Red-teaming done, outputs filtered | Security review required |
| Versioning | Prompt versions tracked with outputs | Cannot iterate safely |

---

## Common Mistakes

```
❌ Treating LLM output as always correct
❌ Not designing for LLM API failures
❌ Ignoring token cost at scale
❌ Not evaluating prompts before deployment
❌ Prompt injection vulnerabilities in RAG
❌ Using unstructured outputs when structured is easier
❌ Not having fallback when LLM is unavailable
❌ Ignoring hallucination risk in user-facing outputs
❌ Not tracking which prompt version produced what output
❌ Assuming the LLM understands intent without examples
❌ Overloading the context window with irrelevant content
❌ Not testing with adversarial inputs
```
