Public Allegations Form
------------------------------
Public Allegations Form (PAF) Application built using HOF (Home Office Forms) framework.

## Architecture

The PAF app will send data to an AWS SQS (Simple Queue Service), the [ims-resolver](https://github.com/UKHomeOffice/ims-resolver/) will receive from the queue and attempt to send the data to the IMS system.  The ims-resolver is a github repo supported by the HOF team.  The IMS system is hosted on EBSA hosted by a supplier, Verint.

## IMS API integration

There is some sensitive information about IMS integration.  The documentation of this can be found in an internal repo
https://github.com/UKHomeOffice/ims-integration-documentation

## Getting Started

### Prerequisities

- [Node.js](https://nodejs.org/en/) - Tested against LTS 
- NPM (installed with Node.js) - Works with versions 2 and 3
- [Redis server](http://redis.io/download) running on the default port

### Up & Running

```bash
$ cd paf
$ yarn install
$ yarn run start:dev
```
Then visit: [http://localhost:8080/](http://localhost:8080/)

## Playwright CI

Pull requests on `master` and `feature/*` deploy to the branch environment, run `yarn test:e2e` against its internal URL, and publish a single-file Allure HTML report as a GitHub release asset with a PR comment. The `nightly_e2e_playwright` cron also generates and publishes the report, including after test failures, and posts result counts and percentages to Slack. The report asset link downloads the HTML file; open it in a browser to view it. Playwright's JSON results are used for the summary, with passed, failed, flaky, and skipped outcomes reported separately. Missing or invalid results are reported as invalid rather than as a successful zero-test run.

The summary checks Playwright's aggregate counts against individual test outcomes and flags run-level errors. Percentages use the number of discovered tests, including flaky and skipped tests.

The nightly pipeline installs Java for Allure, then runs token generation and report publication as separate steps after the tests. The Slack notification runs after publication, including when an earlier step fails.

- `HOF_GH_APP_ID`, `HOF_GH_APP_PK`, `HOF_GH_APP_INSTALL_ID` for cloning `UKHomeOfficeForms/hof-services-config` (including promotion and security scans).
- `hof_ukho_gh_app_id`, `hof_ukho_gh_app_pk`, `hof_ukho_gh_app_install_id` for publishing reports to `UKHomeOffice/paf`.
- `SAS_HOF_EMAIL` for the form's E2E test data.

The GitHub App installations need read access to the config repository and contents-write plus issues-write access to PAF for release assets and PR comments. Configure the Drone cron named `nightly_e2e_playwright` on `master` and provide `NIGHTLY_E2E_BASE_URL`, `SAS_HOF_EMAIL`, and `slack_sas_hof_e2e_tests_webhook` for its run and Slack summary. The URL must point to an already deployed, reachable PAF environment. Slack's native message expansion displays longer test-detail summaries; the report link is labelled to make clear that it downloads the single-file HTML asset.
