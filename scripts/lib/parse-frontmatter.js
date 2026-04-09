'use strict';

/**
 * Shared YAML frontmatter parser for agent-assistant markdown files.
 * Extracts key-value pairs from --- delimited YAML blocks.
 *
 * Supports: top-level scalars, inline arrays [a, b], nested objects, array items (- val).
 */

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const yaml = match[1];
  const fields = {};
  let currentKey = null;

  for (const line of yaml.split('\n')) {
    if (line.trim().startsWith('#')) continue;

    // Array item (  - value)
    const arrMatch = line.match(/^(\s+)-\s+(.+)/);
    if (arrMatch && currentKey) {
      if (!Array.isArray(fields[currentKey])) fields[currentKey] = [];
      fields[currentKey].push(arrMatch[2].trim());
      continue;
    }

    // Nested key (  key: value)
    const nestedMatch = line.match(/^(\s+)(\w[\w-]*)\s*:\s*(.+)?/);
    if (nestedMatch && nestedMatch[1].length > 0 && currentKey) {
      if (typeof fields[currentKey] !== 'object' || Array.isArray(fields[currentKey])) {
        fields[currentKey] = {};
      }
      const val = nestedMatch[3] ? nestedMatch[3].trim() : '';
      if (val.startsWith('[') && val.endsWith(']')) {
        fields[currentKey][nestedMatch[2]] = val.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      } else {
        let parsed = val.replace(/^["']|["']$/g, '');
        if (parsed === 'true') parsed = true;
        else if (parsed === 'false') parsed = false;
        else if (/^\d+$/.test(parsed)) parsed = parseInt(parsed, 10);
        fields[currentKey][nestedMatch[2]] = parsed;
      }
      continue;
    }

    // Top-level key: value
    const topMatch = line.match(/^(\w[\w-]*)\s*:\s*(.*)/);
    if (topMatch) {
      currentKey = topMatch[1];
      let val = topMatch[2].trim();
      if (val.startsWith('[') && val.endsWith(']')) {
        fields[currentKey] = val.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      } else if (val === '' || val === '{}') {
        fields[currentKey] = val === '{}' ? {} : val;
      } else {
        let parsed = val.replace(/^["']|["']$/g, '');
        if (parsed === 'true') parsed = true;
        else if (parsed === 'false') parsed = false;
        else if (/^\d+$/.test(parsed)) parsed = parseInt(parsed, 10);
        fields[currentKey] = parsed;
      }
    }
  }

  return fields;
}

module.exports = { parseFrontmatter };
