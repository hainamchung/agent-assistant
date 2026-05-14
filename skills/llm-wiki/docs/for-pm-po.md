# For PM/PO — Using the Wiki

This guide explains how to use the wiki without technical jargon.

## What Is This?

A shared knowledge base that your team's AI assistant can read and write. Think of it as a smart shared folder where:
- You drop in documents (meeting notes, specs, reports)
- AI reads and organizes them into wiki pages
- Anyone can ask questions and get answers from the collected knowledge

## How to Add Documents

### Option A: Use your AI tool
Tell your AI: *"Ingest this file into the wiki as a meetings document"* and provide the file.

### Option B: Command line
```bash
python .wiki/scripts/ingest.py my-document.pdf --category meetings \
    --output .wiki/sources/meetings/
```

### Categories
Pick the one that fits:
- **product** — PRDs, feature specs, roadmaps
- **design** — UI/UX specs, wireframes
- **architecture** — System design, API docs
- **development** — Code docs, READMEs
- **operations** — Runbooks, deployment guides
- **meetings** — Meeting notes, standup summaries
- **references** — External articles, research
- **data** — Reports, analytics

## How to Ask Questions

Open your AI tool and ask naturally:
- *"What decisions did we make about the auth system?"*
- *"Summarize all meeting notes from March"*
- *"How does the payment flow work?"*
- *"What are the open action items?"*

The AI searches the wiki and answers. If it discovers something new, it saves a page automatically.

## How to Review Wiki Pages

Wiki pages have a header (frontmatter) that looks like:
```yaml
title: Auth System Overview
type: summary
tags: [auth, security]
citations: ["design-doc-2026-03.md", "security-audit.pdf"]
created: 2026-04-01
updated: 2026-04-07
```

- **type** tells you what kind of page it is (summary, decision, runbook, etc.)
- **citations** references the original documents the page was created from
- **tags** help with searching
- **created/updated** track when the page was created and last modified

## Common Workflows

### "I have meeting notes"
1. Drop the file → AI ingests it
2. Tell AI: "Compile the wiki"
3. AI creates summary + extracts key entities and decisions

### "I need a status update"
Ask AI: *"Give me a digest of all recent activity in the wiki"*

### "I want to check wiki health"
```bash
python .wiki/scripts/stats.py
```
Shows: how many pages, sources, and recent activity.
