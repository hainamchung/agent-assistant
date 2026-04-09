'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Check markdown file content for broken local file references.
 * Skips URLs, anchors, and mailto links.
 *
 * @param {string} content - Markdown file content
 * @param {string} filePath - Absolute path of the file being checked
 * @returns {string[]} Array of broken target paths
 */
function findBrokenLinks(content, filePath) {
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  const broken = [];
  const dir = path.dirname(filePath);
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const target = match[2];
    if (target.startsWith('http://') || target.startsWith('https://') || target.startsWith('#') || target.startsWith('mailto:')) {
      continue;
    }
    const resolved = path.resolve(dir, target);
    if (!fs.existsSync(resolved)) {
      broken.push(target);
    }
  }

  return broken;
}

module.exports = { findBrokenLinks };
