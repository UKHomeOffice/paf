'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { buildSummary } = require('../../../bin/summarise_playwright_report');

describe('Playwright report summary', () => {
  it('reports passed, failed, flaky and skipped tests as separate outcomes', () => {
    const report = {
      stats: { expected: 1, unexpected: 1, flaky: 1, skipped: 1 },
      errors: [],
      suites: [{ specs: [{ title: 'Scenarios', tests: [
        { status: 'expected' }, { status: 'unexpected' }, { status: 'flaky' }, { status: 'skipped' }
      ] }] }]
    };
    const summary = buildSummary(report);
    expect(summary).to.include('Service Name: PAF');
    expect(summary).to.include('Passed: 25.0% No Of Tests: 1');
    expect(summary).to.include('Failed: 25.0% No Of Tests: 1');
    expect(summary).to.include('Flaky: 25.0% No Of Tests: 1');
    expect(summary).to.include('Skipped: 25.0% No Of Tests: 1');
    expect(summary).to.include('Total Results Reported: 4 of 4');
  });

  it('reports zero tests without dividing by zero', () => {
    const summary = buildSummary({
      stats: { expected: 0, unexpected: 0, flaky: 0, skipped: 0 },
      suites: [],
      errors: []
    });
    expect(summary).to.include('Passed: 0.0% No Of Tests: 0');
    expect(summary).to.include('Total Results Reported: 0 of 0');
    expect(summary).to.include('Results: VALID');
  });

  it('flags invalid or inconsistent statistics and run-level errors', () => {
    expect(buildSummary({})).to.include('Results: INVALID');
    const report = {
      stats: { expected: 1, unexpected: 0, flaky: 0, skipped: 0 },
      errors: [],
      suites: [{ specs: [{ tests: [{ status: 'unexpected' }] }] }]
    };
    expect(buildSummary(report)).to.include('Results: INVALID (Playwright statistics do not match test outcomes)');
    report.suites[0].specs[0].tests.push({ status: 'skipped' });
    expect(buildSummary(report)).to.include('Total Results Reported: 1 of 2');
    expect(buildSummary(report)).to.include('Results: INVALID');
    report.suites[0].specs[0].tests.pop();
    report.stats.expected = -1;
    expect(buildSummary(report)).to.include('Results: INVALID (stats.expected must be a non-negative integer)');
    report.stats.expected = 0;
    report.stats.unexpected = 1;
    report.errors.push({ message: 'setup failure' });
    expect(buildSummary(report)).to.include('Results: INVALID (1 Playwright run error(s); see build logs)');
    report.suites[0].specs[0].tests[0].status = 'unknown';
    expect(buildSummary(report)).to.include('Results: INVALID (test outcomes are missing or invalid)');
  });

  it('writes an invalid summary and exits nonzero for missing or malformed JSON', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'paf-summary-test-'));
    try {
      const input = path.join(directory, 'results.json');
      const output = path.join(directory, 'summary.txt');
      const script = path.resolve(__dirname, '../../../bin/summarise_playwright_report.js');
      for (const contents of [null, '{']) {
        if (contents !== null) {
          fs.writeFileSync(input, contents);
        }
        const result = spawnSync(process.execPath, [script, input, output], { encoding: 'utf8' });
        expect(result.status).to.equal(1);
        expect(fs.readFileSync(output, 'utf8')).to.include('Results: INVALID (unable to read Playwright results:');
      }
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });
});
