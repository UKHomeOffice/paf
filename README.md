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

Pull requests on `master` and `feature/*` deploy to the branch environment, run `yarn test:e2e` against its internal URL, and publish a single-file Allure report as a GitHub release asset with a PR comment. The `nightly_e2e_playwright` cron also generates and publishes an Allure report after successful or failed tests, and sends a Slack summary. Report links download the HTML file; open it in a browser to view it. Each build retains its own asset so earlier report links remain usable.

The Slack notification's short preview shows the report title, “Nightly Playwright Tests,” and the test outcome as `Status: Passed` or `Status: Failed`. Expanding the native Slack attachment shows the full report, including Drone status, branch and environment URL, the separate `Test Status`, outcome percentages, and the report link. Test status is based on the Playwright run exit code, not Drone's overall build status; it is failed when the run exits unsuccessfully or its exit code is unavailable or invalid. The attachment color bar is green for passed tests and red for failed tests. The summary contains no individual test details. Passed, failed, flaky, and skipped are separate outcomes, and percentages use the number of discovered tests. Missing or invalid results and run-level errors are flagged. Slack provides its native “Show more” / “Show less” behavior for the attachment; no separate button is required.

Configure the following Drone secrets before enabling this flow:

- `HOF_GH_APP_ID`, `HOF_GH_APP_PK`, `HOF_GH_APP_INSTALL_ID` for cloning `UKHomeOfficeForms/hof-services-config` (including promotion and security scans).
- `hof_ukho_gh_app_id`, `hof_ukho_gh_app_pk`, `hof_ukho_gh_app_install_id` for publishing reports to `UKHomeOffice/paf`.
- `SAS_HOF_EMAIL` for the form's E2E test data.

The GitHub App installations need read access to the config repository and contents-write plus issues-write access to PAF for release assets and PR comments. Configure the Drone cron named `nightly_e2e_playwright` on `master` and provide `NIGHTLY_E2E_BASE_URL`, `SAS_HOF_EMAIL`, `hof_ukho_gh_app_id`, `hof_ukho_gh_app_pk`, `hof_ukho_gh_app_install_id`, and `slack_sas_hof_e2e_tests_webhook` for its run, report publication, and Slack summary. The URL must point to an already deployed, reachable PAF environment. Drone installs Java for Allure report generation. If the run produces no Allure results, no report is published; check the build logs.
