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
  const passed = count(output, 'passed');
  const failed = count(output, 'failed');
  const flaky = count(output, 'flaky');
  const skipped = count(output, 'skipped');
  const total = passed + failed + flaky + skipped;
  summary = [
    'Playwright Nightly Summary',
    `Total: ${total}`,
    `Passed: ${passed}`,
    `Failed: ${failed}`,
    `Flaky: ${flaky}`,
    `Skipped: ${skipped}`
  ].join('\n');
} catch (error) {
  summary = `Playwright Nightly Summary\nUnable to parse run output: ${error.message}`;
}
fs.writeFileSync(outputPath, `${summary}\n`, 'utf8');
process.stdout.write(`${summary}\n`);
