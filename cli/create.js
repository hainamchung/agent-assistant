#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');

const TEMPLATES = {
  agent: path.join(PROJECT_ROOT, 'AGENT-TEMPLATE.md'),
  command: path.join(PROJECT_ROOT, 'COMMAND-TEMPLATE.md'),
};

const TARGETS = {
  agent: path.join(PROJECT_ROOT, 'agents'),
  command: path.join(PROJECT_ROOT, 'commands'),
  topology: path.join(PROJECT_ROOT, 'topologies'),
};

const NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

function create(type, name) {
  if (!TARGETS[type]) {
    console.error(`Error: Unknown type '${type}'. Valid types: ${Object.keys(TARGETS).join(', ')}`);
    process.exit(1);
  }

  if (!NAME_PATTERN.test(name)) {
    console.error('Error: Name must be lowercase alphanumeric with hyphens only');
    process.exit(1);
  }

  const targetPath = path.join(TARGETS[type], `${name}.md`);

  // Prevent path traversal
  if (!targetPath.startsWith(TARGETS[type])) {
    console.error('Error: Invalid name — path traversal detected');
    process.exit(1);
  }

  if (fs.existsSync(targetPath)) {
    console.error(`Error: ${path.relative(PROJECT_ROOT, targetPath)} already exists`);
    process.exit(1);
  }

  if (type === 'topology') {
    // Topology has no template — create minimal structure
    const content = `# ${name} — Topology\n\n> Description of ${name} topology.\n\n## Agent Slots\n| Phase | Agent | Role |\n|-------|-------|------|\n| 1 | {agent} | {role} |\n\n## Phase Structure\n### Phase 1: {name}\n- Entry: {entry criteria}\n- Agent: {agent}\n- Exit: {exit criteria}\n\n## Exit Criteria\n- [ ] {criterion}\n`;
    fs.writeFileSync(targetPath, content, { encoding: 'utf8', flag: 'wx' });
  } else {
    if (!fs.existsSync(TEMPLATES[type])) {
      console.error(`Error: Template not found: ${TEMPLATES[type]}`);
      process.exit(1);
    }
    const template = fs.readFileSync(TEMPLATES[type], 'utf8');
    const content = template
      .replace(/\{NAME\}/g, name)
      .replace(/\{AGENT_NAME\}/g, name)
      .replace(/\{COMMAND_NAME\}/g, name);
    fs.writeFileSync(targetPath, content, { encoding: 'utf8', flag: 'wx' });
  }

  console.log(`✅ Created ${path.relative(PROJECT_ROOT, targetPath)}`);
}

const args = process.argv.slice(2);

if (args.includes('--wizard')) {
  require('./lib/wizard').run().catch((err) => {
    console.error('Wizard error:', err.message);
    process.exit(1);
  });
} else {
  const [type, name] = args;
  if (!type || !name) {
    console.log('Usage: node cli/create.js <type> <name>');
    console.log('       node cli/create.js --wizard');
    console.log('');
    console.log('Types:');
    console.log('  agent     Create a new agent from AGENT-TEMPLATE.md');
    console.log('  command   Create a new command from COMMAND-TEMPLATE.md');
    console.log('  topology  Create a new topology scaffold');
    console.log('');
    console.log('Options:');
    console.log('  --wizard  Launch interactive scaffolding wizard');
    console.log('');
    console.log('Examples:');
    console.log('  node cli/create.js agent my-agent');
    console.log('  node cli/create.js command my-command');
    console.log('  node cli/create.js topology my-topology');
    console.log('  node cli/create.js --wizard');
    process.exit(0);
  }
  create(type, name);
}
