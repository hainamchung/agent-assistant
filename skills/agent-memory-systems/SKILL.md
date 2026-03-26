---
name: agent-memory-systems
description: "Design and implement memory architectures for AI agents including episodic, semantic, procedural, and working memory. Use when building agents that need conversation persistence, long-term knowledge retrieval, context-aware recall, vector store integration, or memory decay strategies. Covers chunking strategies, embedding selection, and retrieval optimization."
risk: unknown
source: "vibeship-spawner-skills (Apache 2.0)"
date_added: "2026-02-27"
---

# Agent Memory Systems

Build memory architectures that give AI agents persistent, context-aware recall across conversations and tasks.

## Core Memory Types

| Type | Purpose | Storage | Retrieval |
|------|---------|---------|-----------|
| Working | Current task context | In-context window | Direct access |
| Episodic | Past interactions | Vector store | Similarity search |
| Semantic | Factual knowledge | Knowledge graph / vector | Structured query |
| Procedural | Learned workflows | Code / prompts | Pattern match |

## Workflow

1. **Assess memory needs** — determine which memory types the agent requires based on task complexity and conversation length
2. **Choose storage backend** — select vector store (Pinecone, Weaviate, Chroma, pgvector) based on scale, latency, and filtering needs
3. **Design chunking strategy** — break content into retrievable chunks with contextual overlap; test retrieval quality before deploying
4. **Implement retrieval pipeline** — combine embedding similarity with metadata filters and temporal scoring for relevant recall
5. **Add memory management** — implement decay, consolidation, and deduplication to keep memory stores useful over time

## Chunking Strategy

```
Document → Split by semantic boundaries (not fixed size)
        → Add contextual prefix (document title + section heading)
        → Overlap 10-15% between chunks
        → Store metadata: source, timestamp, topic, chunk_index
```

**Test retrieval before deploying:** Run 10-20 representative queries against your chunks. If precision < 80%, adjust chunk size or add contextual prefixes.

## Memory Retrieval Pattern

```
User Query → Generate embedding
           → Filter by metadata (time range, topic, source)
           → Similarity search (top-k)
           → Re-rank by recency + relevance
           → Inject into prompt as context
```

## Anti-Patterns

- **Store everything forever** — memory bloat degrades retrieval quality. Implement decay scoring based on access frequency and age.
- **Single chunk size for all content** — code, prose, and tables need different chunking strategies. Test each content type separately.
- **Skip retrieval testing** — a perfectly chunked store with poor queries returns irrelevant results. Always validate end-to-end.

## When to Use

Use when building agents that need to remember past interactions, maintain knowledge across sessions, implement RAG pipelines, or provide consistent context-aware responses over time.

## Related Skills

Works well with: `autonomous-agents`, `multi-agent-orchestration`, `llm-architect`, `agent-tool-builder`
