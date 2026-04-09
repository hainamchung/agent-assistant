#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { parseFrontmatter } = require('./lib/parse-frontmatter');

// --- Redaction patterns (dual-layer) ---
const REDACT_FIELD_PATTERN = /key|secret|token|password|credential|api[_-]?key/i;
const REDACT_VALUE_PATTERN = /(ghp_|sk-|AKIA|xox[bpas]-|glpat-)[A-Za-z0-9_\-]{10,}|[A-Za-z0-9+\/]{40,}={0,2}/g;

// --- Safe path validation ---
function safePath(filePath, baseDir) {
  const resolved = path.resolve(filePath);
  const resolvedBase = path.resolve(baseDir);
  if (!resolved.startsWith(resolvedBase + path.sep) && resolved !== resolvedBase) {
    throw new Error(`Path traversal blocked: ${filePath} escapes ${baseDir}`);
  }
  return resolved;
}

// --- Dual-layer redaction ---
function redactSensitive(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') {
    return obj.replace(REDACT_VALUE_PATTERN, '[REDACTED]');
  }
  if (Array.isArray(obj)) {
    return obj.map(item => redactSensitive(item));
  }
  if (typeof obj === 'object') {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      // Layer 1: skip fields whose name matches sensitive pattern
      if (REDACT_FIELD_PATTERN.test(k)) continue;
      // Layer 2: redact values
      result[k] = redactSensitive(v);
    }
    return result;
  }
  return obj;
}

// --- Scan deliverables ---
function scanDeliverables(topicDir, projectRoot) {
  const resolvedTopic = safePath(topicDir, projectRoot);
  const deliverables = [];

  let entries;
  try {
    entries = fs.readdirSync(resolvedTopic, { withFileTypes: true });
  } catch (err) {
    console.error(`Cannot read topic directory: ${resolvedTopic}`);
    process.exit(1);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === 'traces') continue; // skip traces dir

    const subDir = path.join(resolvedTopic, entry.name);
    let files;
    try {
      files = fs.readdirSync(subDir);
    } catch (_) {
      continue;
    }

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const filePath = path.join(subDir, file);

      let stat;
      try {
        stat = fs.statSync(filePath);
      } catch (_) {
        continue;
      }
      if (!stat.isFile()) continue;

      let content;
      try {
        content = fs.readFileSync(filePath, 'utf8');
      } catch (_) {
        continue;
      }

      const frontmatter = parseFrontmatter(content);
      if (!frontmatter) continue;

      deliverables.push({
        path: path.relative(resolvedTopic, filePath),
        subdir: entry.name,
        frontmatter: frontmatter,
        mtime: stat.mtime.toISOString()
      });
    }
  }

  return deliverables;
}

// --- Parse MAILBOX for phase info ---
function parseMailboxPhases(topicDir, projectRoot) {
  const resolvedTopic = safePath(topicDir, projectRoot);
  const phases = [];
  let entries;
  try {
    entries = fs.readdirSync(resolvedTopic);
  } catch (_) {
    return phases;
  }

  const mailboxFiles = entries.filter(f => f.startsWith('MAILBOX') && f.endsWith('.md'));
  const phasePattern = /^##\s+\[([^\]]+)\]\s+(\S+)\s+\|\s+(\S+)/;

  for (const mbFile of mailboxFiles) {
    const mbPath = path.join(resolvedTopic, mbFile);
    let content;
    try {
      content = fs.readFileSync(mbPath, 'utf8');
    } catch (_) {
      continue;
    }

    for (const line of content.split('\n')) {
      const m = line.match(phasePattern);
      if (m) {
        phases.push({ timestamp: m[1], messageType: m[2], agent: m[3] });
      }
    }
  }

  return phases;
}

// --- Build trace ---
function buildTrace(deliverables, mailboxPhases, command, topicName) {
  const now = new Date().toISOString();

  // Collect agents and timestamps
  const agentSet = new Set();
  const timestamps = [];

  for (const d of deliverables) {
    const fm = d.frontmatter;
    if (fm.agent) agentSet.add(String(fm.agent));
    if (fm.date) timestamps.push(fm.date);
    else timestamps.push(d.mtime);
  }
  for (const mp of mailboxPhases) {
    if (mp.agent) agentSet.add(mp.agent);
  }

  timestamps.sort();
  const started = timestamps.length > 0 ? timestamps[0] : now;
  const completed = timestamps.length > 0 ? timestamps[timestamps.length - 1] : now;

  // Group deliverables by subdir as phases
  const phaseMap = new Map();
  for (const d of deliverables) {
    if (!phaseMap.has(d.subdir)) phaseMap.set(d.subdir, []);
    phaseMap.get(d.subdir).push(d);
  }

  const phases = [];
  let phaseIdx = 0;
  for (const [subdir, items] of phaseMap) {
    phaseIdx++;
    const phaseAgent = items[0].frontmatter.agent || 'unknown';
    agentSet.add(String(phaseAgent));
    const phaseDeliverables = items.map(it => {
      const status = it.frontmatter.status || 'complete';
      return { path: it.path, status: String(status) };
    });
    phases.push({
      name: `Phase ${phaseIdx} — ${subdir}`,
      agent: String(phaseAgent),
      deliverables: phaseDeliverables
    });
  }

  const agents = Array.from(agentSet).filter(a => a && a !== 'unknown');
  const totalDeliverables = deliverables.length;

  // Build frontmatter object and redact
  const traceData = {
    type: 'trace',
    command: command,
    topic: topicName,
    started: started,
    completed: completed,
    total_phases: phases.length,
    total_deliverables: totalDeliverables,
    agents_involved: agents,
    phases: phases
  };

  const redacted = redactSensitive(traceData);

  // Serialize YAML frontmatter
  let yaml = '---\n';
  yaml += `type: ${redacted.type}\n`;
  yaml += `command: "${redacted.command}"\n`;
  yaml += `topic: "${redacted.topic}"\n`;
  yaml += `started: "${redacted.started}"\n`;
  yaml += `completed: "${redacted.completed}"\n`;
  yaml += `total_phases: ${redacted.total_phases}\n`;
  yaml += `total_deliverables: ${redacted.total_deliverables}\n`;
  yaml += 'agents_involved:\n';
  for (const a of redacted.agents_involved) {
    yaml += `  - ${a}\n`;
  }
  yaml += 'phases:\n';
  for (const phase of redacted.phases) {
    yaml += `  - name: "${phase.name}"\n`;
    yaml += `    agent: "${phase.agent}"\n`;
    yaml += '    deliverables:\n';
    for (const d of phase.deliverables) {
      yaml += `      - path: "${d.path}"\n`;
      yaml += `        status: "${d.status}"\n`;
    }
  }
  yaml += '---\n';

  // Build markdown body
  let body = '\n';
  body += `# Trace: ${redacted.command} — ${redacted.topic}\n\n`;
  body += `**Generated**: ${now}\n\n`;
  body += '## Phases\n\n';
  for (const phase of redacted.phases) {
    body += `### ${phase.name}\n`;
    body += `- **Agent**: ${phase.agent}\n`;
    for (const d of phase.deliverables) {
      body += `- **Deliverable**: ${d.path} (${d.status})\n`;
    }
    body += '\n';
  }
  body += '## Summary\n\n';
  body += `- Total phases: ${redacted.total_phases}\n`;
  body += `- Total deliverables: ${redacted.total_deliverables}\n`;
  body += `- Agents involved: ${redacted.agents_involved.join(', ')}\n`;

  return yaml + body;
}

// --- Write trace file ---
function writeTrace(topicDir, command, content, projectRoot) {
  const resolvedTopic = safePath(topicDir, projectRoot);
  const tracesDir = path.join(resolvedTopic, 'traces');
  safePath(tracesDir, projectRoot);

  if (!fs.existsSync(tracesDir)) {
    fs.mkdirSync(tracesDir, { recursive: true });
  }

  const now = new Date();
  const ts = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, '');
  const safeCommand = command.replace(/:/g, '-');
  const filename = `TRACE-${safeCommand}-${ts}.md`;
  const filePath = path.join(tracesDir, filename);
  safePath(filePath, projectRoot);

  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
}

// --- Main ---
function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node scripts/generate-trace.js <topic-dir> [command-name]');
    console.error('Example: node scripts/generate-trace.js reports/improve-project-v2 plan:team');
    process.exit(1);
  }

  const projectRoot = path.resolve(__dirname, '..');
  const topicArg = args[0];
  const command = args[1] || 'unknown';

  // Resolve topic dir relative to project root
  const topicDir = path.isAbsolute(topicArg)
    ? topicArg
    : path.join(projectRoot, topicArg);

  safePath(topicDir, projectRoot);

  const topicName = path.basename(topicDir);

  console.log(`Scanning: ${topicDir}`);
  const deliverables = scanDeliverables(topicDir, projectRoot);
  console.log(`Found ${deliverables.length} deliverables`);

  const mailboxPhases = parseMailboxPhases(topicDir, projectRoot);
  console.log(`Found ${mailboxPhases.length} MAILBOX entries`);

  const content = buildTrace(deliverables, mailboxPhases, command, topicName);
  const outPath = writeTrace(topicDir, command, content, projectRoot);

  console.log(`Trace written: ${outPath}`);
}

main();
