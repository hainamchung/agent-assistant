#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.join(PROJECT_ROOT, 'AGENT.template.md');
const PLATFORMS_PATH = path.join(PROJECT_ROOT, 'platforms.json');

const REQUIRED_KEYS = ['PLATFORM_NAME', 'TOOL_PATH', 'BOOT_FILE', 'TIER1_TOOL'];

// Apply platform-specific formatting adjustments based on hints
function applyFormattingHints(content, hints) {
  let output = content;

  // Remove custom XML-style tags if platform doesn't support them
  // Preserve standard HTML tags (details, summary, br, kbd, img, a, etc.)
  if (hints.xml_tags === false) {
    const HTML_TAGS = new Set(['details', 'summary', 'br', 'hr', 'kbd', 'img', 'a', 'b', 'i', 'em', 'strong', 'code', 'pre', 'p', 'div', 'span', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'sup', 'sub']);
    output = output.replace(/<(\/?)([a-z_]+)>/gi, (match, slash, tag) => {
      return HTML_TAGS.has(tag.toLowerCase()) ? match : '';
    });
  }

  return output;
}

try {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`❌ Template not found: ${TEMPLATE_PATH}`);
    process.exit(1);
  }
  if (!fs.existsSync(PLATFORMS_PATH)) {
    console.error(`❌ Platforms config not found: ${PLATFORMS_PATH}`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const platforms = JSON.parse(fs.readFileSync(PLATFORMS_PATH, 'utf8'));

  const generated = [];

  for (const [key, vars] of Object.entries(platforms)) {
    // Validate required keys
    for (const rk of REQUIRED_KEYS) {
      if (!vars[rk]) {
        console.error(`❌ Platform "${key}" missing required key: ${rk}`);
        process.exit(1);
      }
    }

    // Guard against path traversal
    const resolved = path.resolve(PROJECT_ROOT, vars.BOOT_FILE);
    if (!resolved.startsWith(PROJECT_ROOT + path.sep) && resolved !== PROJECT_ROOT) {
      console.error(`❌ Platform "${key}" BOOT_FILE escapes project root: ${vars.BOOT_FILE}`);
      process.exit(1);
    }

    let content = template;
    // Only substitute whitelisted keys to prevent unexpected injection from platforms.json
    for (const placeholder of REQUIRED_KEYS) {
      const value = vars[placeholder];
      if (typeof value === 'string') {
        content = content.split(`{{${placeholder}}}`).join(value);
      }
    }

    // Substitute generation date for version tracking
    const generationDate = new Date().toISOString().split('T')[0];
    content = content.split('{{GENERATION_DATE}}').join(generationDate);

    // Conditionally include Sub-agent Tool row (only when sub_agents is true)
    if (vars.capabilities && vars.capabilities.sub_agents) {
      content = content.split('{{SUB_AGENT_ROW}}').join(`| Sub-agent Tool | \`${vars.TIER1_TOOL}\` |`);
    } else {
      content = content.split('{{SUB_AGENT_ROW}}').join('');
    }

    // Add capabilities summary as HTML comment
    if (vars.capabilities) {
      const caps = vars.capabilities;
      const capsComment = `\n<!-- Platform: sub_agents=${caps.sub_agents ?? 'unknown'}, terminal=${caps.terminal ?? 'unknown'}, file_edit=${caps.file_edit ?? 'unknown'}, web_search=${caps.web_search ?? 'unknown'}, mcp=${caps.mcp ?? 'unknown'} -->\n`;
      content = capsComment + content;
    }

    // Add explanatory comment for generic platform where {TOOL} remains as placeholder
    if (key === 'agent') {
      content = '<!-- {TOOL} is a placeholder — replace with your AI tool\'s path name (e.g., "aider", "continue", "windsurf") -->\n' + content;
    }

    // Apply formatting hints (if present)
    const hints = vars.formatting_hints || {};
    content = applyFormattingHints(content, hints);

    fs.writeFileSync(resolved, content, 'utf8');
    generated.push(vars.BOOT_FILE);
  }

  console.log(`✅ Generated ${generated.length} entry points:`);
  generated.forEach((f) => console.log(`   • ${f}`));
} catch (err) {
  console.error(`❌ Generation failed: ${err.message}`);
  process.exit(1);
}
