'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { buildSummaryFromResults } = require('../../../bin/summarise_playwright_report');

describe('Playwright report summary', () => {
  it('calculates outcome counts and percentages from Playwright stats', () => {
    const summary = buildSummaryFromResults({
      stats: { expected: 1, unexpected: 1, flaky: 1, skipped: 1 },
      errors: [],
      suites: [{
        specs: [
          { title: 'Scenario one', tests: [{ status: 'expected' }, { status: 'unexpected' }] },
          { title: 'Scenario two', tests: [{ status: 'flaky' }, { status: 'skipped' }] }
        ]
      }]
    });

    expect(summary).to.include('Passed: 25.0% No Of Tests: 1');
    expect(summary).to.include('Failed: 25.0% No Of Tests: 1');
    expect(summary).to.include('Flaky: 25.0% No Of Tests: 1');
    expect(summary).to.include('Skipped: 25.0% No Of Tests: 1');
    expect(summary).to.include('Total Results Reported: 4 of 4');
  });

  it('reports zero tests without dividing by zero', () => {
    const summary = buildSummaryFromResults({
      stats: { expected: 0, unexpected: 0, flaky: 0, skipped: 0 },
      errors: [],
      suites: []
    });

    expect(summary).to.include('Passed: 0.0% No Of Tests: 0');
    expect(summary).to.include('Failed: 0.0% No Of Tests: 0');
    expect(summary).to.include('Total Results Reported: 0 of 0');
    expect(summary).to.include('Results: VALID');
  });

  it('reports missing or invalid stats instead of presenting zero-result success', () => {
    const missing = buildSummaryFromResults({});
    const invalid = buildSummaryFromResults({
      stats: { expected: 2, unexpected: -1, flaky: 0, skipped: 0 },
      errors: [],
      suites: []
    });

    expect(missing).to.include('Results: INVALID (Playwright stats are missing)');
    expect(invalid).to.include('Results: INVALID (Playwright stats.unexpected must be a non-negative integer)');
    expect(invalid).to.include('Passed: N/A No Of Tests: N/A');
  });

  it('marks a discrepancy between reported outcomes and discovered tests as invalid', () => {
    const summary = buildSummaryFromResults({
      stats: { expected: 1, unexpected: 0, flaky: 0, skipped: 0 },
      errors: [],
      suites: [{ specs: [{ title: 'Scenario', tests: [{ status: 'expected' }, { status: 'skipped' }] }] }]
    });

    expect(summary).to.include('Total Results Reported: 1 of 2');
    expect(summary).to.include('Unreported: 1');
    expect(summary).to.include('Results: INVALID');
  });

  it('rejects mismatched outcomes even when totals agree', () => {
    const summary = buildSummaryFromResults({
      stats: { expected: 1, unexpected: 0, flaky: 0, skipped: 0 },
      errors: [],
      suites: [{ specs: [{ title: 'Scenario', tests: [{ status: 'unexpected' }] }] }]
    });

    expect(summary).to.include('Total Results Reported: 1 of 1');
    expect(summary).to.include('Results: INVALID (Playwright statistics do not match test outcomes)');
  });

  it('reports invalid outcomes and Playwright run errors', () => {
    const invalidOutcome = buildSummaryFromResults({
      stats: { expected: 1, unexpected: 0, flaky: 0, skipped: 0 },
      errors: [],
      suites: [{ specs: [{ tests: [{ status: 'unknown' }] }] }]
    });
    const runError = buildSummaryFromResults({
      stats: { expected: 0, unexpected: 0, flaky: 0, skipped: 0 },
      errors: [{ message: 'setup failed' }],
      suites: []
    });

    expect(invalidOutcome).to.include('Results: INVALID (Playwright test suites or outcomes are missing or invalid)');
    expect(runError).to.include('Results: INVALID (1 Playwright run error(s); see build logs)');
  });

  it('writes an invalid summary and exits nonzero for missing or malformed JSON files', () => {
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
