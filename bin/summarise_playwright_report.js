'use strict';

const fs = require('node:fs');

const CATEGORIES = ['expected', 'unexpected', 'flaky', 'skipped'];
const LABELS = {
  expected: 'Passed',
  unexpected: 'Failed',
  flaky: 'Flaky',
  skipped: 'Skipped'
};

function percentage(count, total) {
  return total === 0 ? '0.0%' : `${((count / total) * 100).toFixed(1)}%`;
}

function resultError(reason) {
  return [
    'Service Name: PAF',
    'Service Abbreviation: PAF',
    'Passed: N/A No Of Tests: N/A',
    'Failed: N/A No Of Tests: N/A',
    'Flaky: N/A No Of Tests: N/A',
    'Skipped: N/A No Of Tests: N/A',
    'Total Results Reported: 0 of unknown',
    `Results: INVALID (${reason})`
  ].join('\n');
}

function getTestTitles(suites = [], parentTitles = []) {
  if (!Array.isArray(suites)) {
    return [];
  }

  return suites.flatMap(suite => {
    if (!suite || typeof suite !== 'object') {
      return [];
    }

    const suiteTitles = [...parentTitles, suite.title].filter(title => typeof title === 'string' && title.length > 0);
    const titles = Array.isArray(suite.specs)
      ? suite.specs
        .filter(spec => spec && typeof spec.title === 'string' && spec.title.length > 0)
        .map(spec => [...suiteTitles, spec.title].join(' > '))
      : [];
    return [...titles, ...getTestTitles(suite.suites, suiteTitles)];
  });
}

function countTests(suites) {
  if (!Array.isArray(suites)) {
    return null;
  }

  const counts = Object.fromEntries(CATEGORIES.map(category => [category, 0]));
  for (const suite of suites) {
    if (!suite || typeof suite !== 'object') {
      return null;
    }

    const specs = suite.specs === undefined ? [] : suite.specs;
    const children = suite.suites === undefined ? [] : suite.suites;
    if (!Array.isArray(specs) || !Array.isArray(children)) {
      return null;
    }

    for (const spec of specs) {
      if (!spec || typeof spec !== 'object' || !Array.isArray(spec.tests)) {
        return null;
      }
      for (const test of spec.tests) {
        if (!test || !CATEGORIES.includes(test.status)) {
          return null;
        }
        counts[test.status] += 1;
      }
    }

    const childCounts = countTests(children);
    if (childCounts === null) {
      return null;
    }
    for (const category of CATEGORIES) {
      counts[category] += childCounts[category];
    }
  }
  return counts;
}

function buildSummaryFromResults(results) {
  if (!results || typeof results !== 'object' || Array.isArray(results)) {
    return resultError('results must be a JSON object');
  }
  if (!results.stats || typeof results.stats !== 'object' || Array.isArray(results.stats)) {
    return resultError('Playwright stats are missing');
  }
  const testCounts = countTests(results.suites);
  if (testCounts === null) {
    return resultError('Playwright test suites or outcomes are missing or invalid');
  }
  if (!Array.isArray(results.errors)) {
    return resultError('Playwright run errors are missing or invalid');
  }

  const counts = {};
  for (const category of CATEGORIES) {
    const count = results.stats[category];
    if (!Number.isSafeInteger(count) || count < 0) {
      return resultError(`Playwright stats.${category} must be a non-negative integer`);
    }
    counts[category] = count;
  }

  const reported = CATEGORIES.reduce((sum, category) => sum + counts[category], 0);
  const discovered = CATEGORIES.reduce((sum, category) => sum + testCounts[category], 0);
  if (!Number.isSafeInteger(reported)) {
    return resultError('Playwright result count exceeds the supported integer range');
  }
  if (results.stats.total !== undefined && results.stats.total !== reported) {
    return resultError(`Playwright stats total (${results.stats.total}) does not match reported results (${reported})`);
  }
  const isComplete = CATEGORIES.every(category => counts[category] === testCounts[category]);

  const lines = [
    'Service Name: PAF',
    'Service Abbreviation: PAF',
    ...CATEGORIES.map(category =>
      `${LABELS[category]}: ${percentage(counts[category], discovered)} No Of Tests: ${counts[category]}`),
    `Total Results Reported: ${reported} of ${discovered}`
  ];
  if (isComplete && results.errors.length === 0) {
    lines.push('Results: VALID');
  } else {
    if (!isComplete) {
      lines.push(`Unreported: ${Math.max(0, discovered - reported)}`);
      lines.push('Results: INVALID (Playwright statistics do not match test outcomes)');
    }
    if (results.errors.length > 0) {
      lines.push(`Results: INVALID (${results.errors.length} Playwright run error(s); see build logs)`);
    }
  }

  const titles = getTestTitles(results.suites);
  if (titles.length > 0) {
    lines.push('', 'Test details:', ...titles.map(title => `- ${title}`));
  }

  return lines.join('\n');
}

function main() {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];

  if (!inputPath || !outputPath) {
    process.stderr.write('Usage: node bin/summarise_playwright_report.js <playwright-json> <summary-txt>\n');
    process.exitCode = 1;
    return;
  }

  let summary;
  try {
    summary = buildSummaryFromResults(JSON.parse(fs.readFileSync(inputPath, 'utf8')));
  } catch (error) {
    summary = resultError(`unable to read Playwright results: ${error.message || error}`);
  }

  fs.writeFileSync(outputPath, `${summary}\n`, 'utf8');
  process.stdout.write(`${summary}\n`);
  if (summary.includes('Results: INVALID')) {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { buildSummaryFromResults };
