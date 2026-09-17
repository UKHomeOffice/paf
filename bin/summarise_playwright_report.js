'use strict';

const fs = require('node:fs');

function count(output, label) {
  const match = output.match(new RegExp(`(\\d+)\\s+${label}`, 'i'));
  return match ? Number(match[1]) : 0;
}

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error('Usage: node bin/summarise_playwright_report.js <input-text> <output-txt>');
}

let summary;
try {
  const output = fs.readFileSync(inputPath, 'utf8');
  summary = ['Playwright Nightly Summary', `Total: ${count(output, 'passed') + count(output, 'failed') + count(output, 'flaky') + count(output, 'skipped')}`, `Passed: ${count(output, 'passed')}`, `Failed: ${count(output, 'failed')}`, `Flaky: ${count(output, 'flaky')}`, `Skipped: ${count(output, 'skipped')}`].join('\n');
} catch (error) {
  summary = `Playwright Nightly Summary\nUnable to parse run output: ${error.message}`;
}
fs.writeFileSync(outputPath, `${summary}\n`, 'utf8');
console.log(summary);