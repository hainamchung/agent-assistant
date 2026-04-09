'use strict';

const fs = require('fs');
const path = require('path');
const { createInterface, ask, select, multiSelect, confirm } = require('./prompts');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

const CATEGORIES = ['meta', 'execution', 'investigation', 'validation', 'research', 'support'];
const PERSONALITIES = ['professional', 'mentor', 'casual', 'academic'];
const ARTIFACT_TYPES = ['agent', 'command', 'topology', 'skill'];

function targetDir(type) {
  const dirs = {
    agent: path.join(PROJECT_ROOT, 'agents'),
    command: path.join(PROJECT_ROOT, 'commands'),
    topology: path.join(PROJECT_ROOT, 'topologies'),
    skill: path.join(PROJECT_ROOT, 'matrix-skills'),
  };
  return dirs[type];
}

function listExisting(type) {
  const dir = targetDir(type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.yaml'))
    .map((f) => path.basename(f, path.extname(f)));
}

function validateName(type, name) {
  if (!name) return 'Name is required';
  if (!NAME_PATTERN.test(name)) return 'Must be lowercase alphanumeric with hyphens (e.g. my-agent)';
  const existing = listExisting(type);
  if (existing.includes(name)) return `"${name}" already exists in ${type}s/`;
  return null;
}

function sanitizePath(base, name) {
  const ext = base.endsWith('matrix-skills') ? '.yaml' : '.md';
  const resolved = path.join(base, `${name}${ext}`);
  if (!resolved.startsWith(base + path.sep) && resolved !== base) {
    throw new Error('Path traversal detected');
  }
  return resolved;
}

async function agentWizard(rl, name, description) {
  const category = await select(rl, 'Agent category:', CATEGORIES);
  const allAgents = listExisting('agent').filter((a) => a !== name);
  let handoffs = [];
  if (allAgents.length > 0) {
    handoffs = await multiSelect(rl, 'Handoff targets:', allAgents);
  }
  const personality = await select(rl, 'Personality preset:', PERSONALITIES);

  return [
    '---',
    `name: ${name}`,
    `description: "${description.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`,
    `profile: "backend:${category}"`,
    `tools: [read_file, write_file]`,
    `handoffs: [${handoffs.join(', ')}]`,
    'version: "1.0"',
    `category: ${category}`,
    '---',
    '',
    `# ${name}`,
    '',
    `> ${description}`,
    '',
    `## Personality`,
    `preset: ${personality}`,
    '',
    '## Directive',
    `{Define ${name} directive here}`,
    '',
  ].join('\n');
}

async function commandWizard(rl, name, description) {
  const executionMode = await select(rl, 'Execution mode:', ['router', 'execute']);
  const variants = await ask(rl, 'Variants (comma-separated, e.g. fast,hard,team): ', null);
  const variantList = variants ? variants.split(',').map((v) => v.trim()).filter(Boolean) : [];

  return [
    '---',
    'schema-version: "1.0"',
    `description: "${description.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`,
    'version: "1.0"',
    'category: execution',
    `execution-mode: ${executionMode}`,
    '---',
    '',
    `# /${name} — ${name.charAt(0).toUpperCase() + name.slice(1)}`,
    '',
    `> ${description}`,
    '',
    '<task>$ARGUMENTS</task>',
    '',
    variantList.length > 0
      ? '## Variants\n' + variantList.map((v) => `- \`/${name}:${v}\``).join('\n')
      : '',
    '',
  ].join('\n');
}

async function genericWizard(_rl, name, description, type) {
  if (type === 'topology') {
    return `---\nschema-version: "1.0"\nname: ${name}\ndescription: "${description.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"\nstatus: active\n---\n\n# ${name} — Topology\n\n> ${description}\n\n## Semantics\n{Describe execution semantics}\n\n## When to Use\n- {use case}\n`;
  }
  return `# ${name}\n\n> ${description}\n`;
}

async function run() {
  const rl = createInterface();
  try {
    console.log('\n🧙 Agent-Assistant Scaffolding Wizard\n');
    const type = await select(rl, 'What do you want to create?', ARTIFACT_TYPES);
    const name = await ask(rl, `${type} name: `, (v) => validateName(type, v));
    const description = await ask(rl, 'Description: ', (v) => (v ? null : 'Required'));

    let content;
    if (type === 'agent') content = await agentWizard(rl, name, description);
    else if (type === 'command') content = await commandWizard(rl, name, description);
    else content = await genericWizard(rl, name, description, type);

    console.log('\n--- Preview ---');
    console.log(content);
    console.log('--- End Preview ---\n');

    const ok = await confirm(rl, 'Create this file?');
    if (!ok) {
      console.log('Aborted.');
      return;
    }

    const dir = targetDir(type);
    const filePath = sanitizePath(dir, name);
    fs.writeFileSync(filePath, content, { encoding: 'utf8', flag: 'wx' });
    console.log(`✅ Created ${path.relative(PROJECT_ROOT, filePath)}`);
  } finally {
    rl.close();
  }
}

module.exports = { run };
