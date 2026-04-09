'use strict';

/**
 * Lightweight YAML parser for simple key-value YAML files (no anchors/aliases/multiline).
 * Supports: scalars, inline arrays, nested objects, boolean, numbers, array items (- val).
 */

function parse(content) {
  const lines = content.split('\n');
  // Stack entries: { parent, key, indent }
  //   parent = the object containing this level's data
  //   key    = the key in parent that holds this level's value
  //   indent = indent level of the key definition
  const root = {};
  const stack = [{ parent: null, key: null, indent: -1, ref: root }];

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, '');
    if (line.trim() === '' || line.trim().startsWith('#') || line.trim() === '---') continue;

    const indent = line.search(/\S/);
    if (indent < 0) continue;

    // Pop stack to find correct parent level
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const current = stack[stack.length - 1];
    const target = current.ref; // The object we're adding keys to at this level

    // Array item: - value
    const arrMatch = line.match(/^(\s*)-\s+(.*)/);
    if (arrMatch) {
      // Convert target into an array on the parent if it's currently an empty object
      if (current.parent && current.key) {
        if (!Array.isArray(current.parent[current.key])) {
          current.parent[current.key] = [];
          current.ref = current.parent[current.key];
        }
        current.parent[current.key].push(parseValue(arrMatch[2].trim()));
      }
      continue;
    }

    // Key-value pair
    const kvMatch = line.match(/^(\s*)([\w][\w_-]*)\s*:\s*(.*)/);
    if (kvMatch) {
      const key = kvMatch[2];
      const rawVal = kvMatch[3].trim();

      if (rawVal === '' || rawVal === '{}') {
        const child = {};
        target[key] = child;
        stack.push({ parent: target, key, indent, ref: child });
      } else if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
        const inner = rawVal.slice(1, -1);
        target[key] = inner.length === 0 ? [] : inner.split(',').map(v => parseValue(v.trim()));
      } else {
        target[key] = parseValue(rawVal);
      }
    }
  }

  return root;
}

function parseValue(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'null' || val === '~') return null;
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }
  if (/^-?\d+(\.\d+)?$/.test(val)) return Number(val);
  return val;
}

module.exports = { parse };
