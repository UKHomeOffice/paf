'use strict';

const { buildSummaryFromResults } = require('../../../bin/summarise_playwright_report');

describe('Playwright report summary', () => {
  it('calculates outcome counts and percentages from Playwright stats', () => {
    const summary = buildSummaryFromResults({
      stats: { expected: 2, unexpected: 1, flaky: 1, skipped: 0 },
      suites: [{
        specs: [
          { title: 'Scenario one', tests: [{}, {}] },
          { title: 'Scenario two', tests: [{}, {}] }
        ]
      }]
    });

    expect(summary).to.include('Passed: 50.0% No Of Tests: 2');
    expect(summary).to.include('Failed: 25.0% No Of Tests: 1');
    expect(summary).to.include('Flaky: 25.0% No Of Tests: 1');
    expect(summary).to.include('Skipped: 0.0% No Of Tests: 0');
    expect(summary).to.include('Total Results Reported: 4 of 4');
  });

  it('reports zero tests without dividing by zero', () => {
    const summary = buildSummaryFromResults({
      stats: { expected: 0, unexpected: 0, flaky: 0, skipped: 0 },
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
      suites: []
    });

    expect(missing).to.include('Results: INVALID (Playwright stats are missing)');
    expect(invalid).to.include('Results: INVALID (Playwright stats.unexpected must be a non-negative integer)');
    expect(invalid).to.include('Passed: N/A No Of Tests: N/A');
  });

  it('marks a discrepancy between reported outcomes and discovered tests as invalid', () => {
    const summary = buildSummaryFromResults({
      stats: { expected: 1, unexpected: 0, flaky: 0, skipped: 0 },
      suites: [{ specs: [{ title: 'Scenario', tests: [{}, {}] }] }]
    });

    expect(summary).to.include('Total Results Reported: 1 of 2');
    expect(summary).to.include('Unreported: 1');
    expect(summary).to.include('Results: INVALID');
  });
});
