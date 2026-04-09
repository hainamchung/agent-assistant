'use strict';

const readline = require('readline');

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function ask(rl, question, validate) {
  return new Promise((resolve) => {
    const prompt = () => {
      rl.question(question, (answer) => {
        const trimmed = answer.trim();
        if (validate) {
          const error = validate(trimmed);
          if (error) {
            console.log(`  ⚠️  ${error}`);
            prompt();
            return;
          }
        }
        resolve(trimmed);
      });
    };
    prompt();
  });
}

function select(rl, question, options) {
  return new Promise((resolve) => {
    console.log(question);
    options.forEach((opt, i) => console.log(`  ${i + 1}. ${opt}`));
    const prompt = () => {
      rl.question('Select [1-' + options.length + ']: ', (answer) => {
        const idx = parseInt(answer, 10) - 1;
        if (idx >= 0 && idx < options.length) {
          resolve(options[idx]);
          return;
        }
        console.log('  ⚠️  Invalid selection');
        prompt();
      });
    };
    prompt();
  });
}

function multiSelect(rl, question, options) {
  return new Promise((resolve) => {
    console.log(question);
    options.forEach((opt, i) => console.log(`  ${i + 1}. ${opt}`));
    const prompt = () => {
      rl.question('Select (comma-separated, e.g. 1,3): ', (answer) => {
        const indices = answer.split(',')
          .map((s) => parseInt(s.trim(), 10) - 1)
          .filter((i) => i >= 0 && i < options.length);
        if (indices.length === 0) {
          console.log('  ⚠️  Select at least one option');
          prompt();
          return;
        }
        resolve([...new Set(indices)].map((i) => options[i]));
      });
    };
    prompt();
  });
}

function confirm(rl, question) {
  return new Promise((resolve) => {
    rl.question(`${question} [y/N]: `, (answer) => {
      resolve(answer.trim().toLowerCase() === 'y');
    });
  });
}

module.exports = { createInterface, ask, select, multiSelect, confirm };
