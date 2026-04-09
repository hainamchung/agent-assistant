#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { parseFrontmatter } = require('./lib/parse-frontmatter');

// --- SafePath ---

function safePath(base, target) {
  const resolvedBase = path.resolve(base);
  const resolved = path.resolve(base, target);
  if (!resolved.startsWith(resolvedBase + path.sep) && resolved !== resolvedBase) {
    throw new Error(`Path traversal detected: ${target}`);
  }
  return resolved;
}

// --- File Scanner ---

function scanFiles(topicDir) {
  const results = [];

  function walk(dir) {
    const safeDir = safePath(topicDir, dir);
    let entries;
    try {
      entries = fs.readdirSync(safeDir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const rel = path.relative(topicDir, path.join(safeDir, entry.name));
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const fullPath = safePath(topicDir, rel);
        const content = fs.readFileSync(fullPath, 'utf8');
        results.push({ path: rel, content });
      }
    }
  }

  walk('.');
  return results;
}

// --- Link Extractor ---

function extractLinks(content, filePath) {
  const links = [];
  const body = content.replace(/^---\n[\s\S]*?\n---/, '');

  // Markdown links: [text](path/to/file.md)
  const mdLinkRe = /\[([^\]]*)\]\(([^)]+\.md)\)/g;
  let m;
  while ((m = mdLinkRe.exec(body)) !== null) {
    links.push({ target: m[2], type: 'requires' });
  }

  // Backtick-wrapped paths: `path/to/file.md`
  const btRe = /`([^`]+\.md)`/g;
  while ((m = btRe.exec(body)) !== null) {
    links.push({ target: m[1], type: 'requires' });
  }

  return links;
}

// --- Graph Builder ---

function buildGraph(files, topicDir) {
  const nodes = new Map();
  const edges = [];
  const seen = new Set();

  function addEdge(source, target, type) {
    const key = `${source}|${target}|${type}`;
    if (seen.has(key)) return;
    seen.add(key);
    edges.push({ source, target, type });
  }

  function ensureNode(filePath) {
    if (!nodes.has(filePath)) {
      nodes.set(filePath, { path: filePath, type: '', agent: '', phase: '' });
    }
  }

  // Build nodes from scanned files
  for (const file of files) {
    const fm = parseFrontmatter(file.content);
    nodes.set(file.path, {
      path: file.path,
      type: (fm && fm.type) || '',
      agent: (fm && fm.agent) || '',
      phase: (fm && fm.phase) || '',
    });

    if (fm) {
      // Frontmatter relationship fields
      const reqFields = ['requires', 'depends_on'];
      for (const field of reqFields) {
        const val = fm[field];
        if (val) {
          const targets = Array.isArray(val) ? val : [val];
          for (const t of targets) {
            ensureNode(t);
            addEdge(file.path, t, 'requires');
          }
        }
      }

      if (fm.validates) {
        const targets = Array.isArray(fm.validates) ? fm.validates : [fm.validates];
        for (const t of targets) {
          ensureNode(t);
          addEdge(file.path, t, 'validates');
        }
      }

      if (fm.extends) {
        const targets = Array.isArray(fm.extends) ? fm.extends : [fm.extends];
        for (const t of targets) {
          ensureNode(t);
          addEdge(file.path, t, 'extends');
        }
      }

      // Trace file: extract produces edges from phases
      if (fm.type === 'trace' && fm.phases) {
        const phases = Array.isArray(fm.phases) ? fm.phases : [];
        for (const phase of phases) {
          if (phase && phase.deliverables) {
            const deliverables = Array.isArray(phase.deliverables)
              ? phase.deliverables : [phase.deliverables];
            for (const d of deliverables) {
              const dPath = (typeof d === 'string') ? d : (d && d.path);
              if (dPath) {
                ensureNode(dPath);
                addEdge(file.path, dPath, 'produces');
              }
            }
          }
        }
      }
    }

    // Body references
    const bodyLinks = extractLinks(file.content, file.path);
    for (const link of bodyLinks) {
      // Only include references to .md files — skip URLs and absolute paths
      if (link.target.startsWith('http') || path.isAbsolute(link.target)) continue;
      ensureNode(link.target);
      addEdge(file.path, link.target, link.type);
    }
  }

  return { nodes, edges };
}

// --- Orphan Detection ---

function detectOrphans(graph) {
  const incoming = new Set();
  for (const edge of graph.edges) {
    incoming.add(edge.target);
  }
  const orphans = [];
  for (const [nodePath] of graph.nodes) {
    if (!incoming.has(nodePath)) {
      orphans.push(nodePath);
    }
  }
  return orphans;
}

// --- Mermaid Generator ---

function generateMermaid(graph) {
  const lines = ['flowchart TD'];
  const idMap = new Map();
  let counter = 0;

  function nodeId(p) {
    if (!idMap.has(p)) {
      idMap.set(p, `n${counter++}`);
    }
    return idMap.get(p);
  }

  for (const [nodePath] of graph.nodes) {
    const id = nodeId(nodePath);
    const label = nodePath.replace(/"/g, '#quot;');
    lines.push(`  ${id}["${label}"]`);
  }

  for (const edge of graph.edges) {
    const src = nodeId(edge.source);
    const tgt = nodeId(edge.target);
    lines.push(`  ${src} -->|${edge.type}| ${tgt}`);
  }

  return lines.join('\n');
}

// --- Report Generator ---

function generateReport(graph, orphans, topic) {
  const now = new Date().toISOString();
  const totalNodes = graph.nodes.size;
  const totalEdges = graph.edges.length;

  const edgeCounts = { produces: 0, requires: 0, validates: 0, extends: 0 };
  for (const edge of graph.edges) {
    if (edgeCounts[edge.type] !== undefined) edgeCounts[edge.type]++;
  }

  const linkedCount = totalNodes - orphans.length;
  const coverage = totalNodes > 0
    ? ((linkedCount / totalNodes) * 100).toFixed(1)
    : '0.0';

  const mermaid = generateMermaid(graph);

  const edgeTable = graph.edges.length > 0
    ? graph.edges.map(e => `| ${e.source} | ${e.target} | ${e.type} |`).join('\n')
    : '| (none) | — | — |';

  const orphanList = orphans.length > 0
    ? orphans.map(o => `  - ${o}`).join('\n')
    : '  (none)';

  return `# Deliverable Linkage Graph — ${topic}

**Generated**: ${now}
**Total Nodes**: ${totalNodes}
**Total Edges**: ${totalEdges}

## Mermaid Graph

\`\`\`mermaid
${mermaid}
\`\`\`

## Edge List

| Source | Target | Type |
|--------|--------|------|
${edgeTable}

## Summary Statistics

- **Nodes**: ${totalNodes}
- **Edges by type**:
  - produces: ${edgeCounts.produces}
  - requires: ${edgeCounts.requires}
  - validates: ${edgeCounts.validates}
  - extends: ${edgeCounts.extends}
- **Orphan deliverables**: ${orphans.length} (zero incoming edges)
${orphanList}

## Completeness Metric

coverage = ${linkedCount} / ${totalNodes} × 100 = **${coverage}%**
`;
}

// --- Main ---

function main() {
  const topicArg = process.argv[2];
  if (!topicArg) {
    console.error('Usage: node scripts/generate-linkage.js <topic-dir>');
    console.error('Example: node scripts/generate-linkage.js reports/improve-project-v2');
    process.exit(1);
  }

  const projectRoot = path.resolve(__dirname, '..');
  const topicDir = safePath(projectRoot, topicArg);

  if (!fs.existsSync(topicDir) || !fs.statSync(topicDir).isDirectory()) {
    console.error(`Error: topic directory not found: ${topicDir}`);
    process.exit(1);
  }

  const topic = path.basename(topicDir);

  // Scan and build
  const files = scanFiles(topicDir);
  const graph = buildGraph(files, topicDir);
  const orphans = detectOrphans(graph);
  const report = generateReport(graph, orphans, topic);

  // Write output
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const graphsDir = safePath(topicDir, 'graphs');
  if (!fs.existsSync(graphsDir)) {
    fs.mkdirSync(graphsDir, { recursive: true });
  }
  const outPath = safePath(graphsDir, `LINKAGE-${timestamp}.md`);
  fs.writeFileSync(outPath, report, 'utf8');

  console.log(`Linkage graph written to: ${path.relative(projectRoot, outPath)}`);
  console.log(`  Nodes: ${graph.nodes.size}`);
  console.log(`  Edges: ${graph.edges.length}`);
  console.log(`  Orphans: ${orphans.length}`);

  const linkedCount = graph.nodes.size - orphans.length;
  const coverage = graph.nodes.size > 0
    ? ((linkedCount / graph.nodes.size) * 100).toFixed(1)
    : '0.0';
  console.log(`  Coverage: ${coverage}%`);
}

main();
