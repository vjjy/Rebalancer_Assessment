# Portfolio Rebalancing Assessment - Playwright

This repository contains manual and automated test coverage for the portfolio rebalancing assessment.

## What is covered
- Rebalancing calculation logic for buy/sell/hold output.
- Automated tests using Playwright Test.
- Manual test cases with assumptions and expected outputs.

## Assumptions used
1. target variance = current% - target%.
2. Negative variance means BUY and positive variance means SELL.
3. Default output uses fractional shares rounded to 2 decimals.
4. Optional whole-share mode floors share values.

## Project structure
- src/rebalancer.ts: core calculation logic.
- tests/rebalancer.spec.ts: automated test cases.
- docs/manual-test-cases.md: manual test cases.

## Run locally
1. Install dependencies:
   npm install
2. Run tests:
   npm test
3. Open HTML report:
   npm run report

## Trace viewer
1. Run tests with traces for every test:
   npm run test:trace
2. Open a trace zip in the viewer:
   npm run trace:open -- test-results/<test-folder>/trace.zip

Note: with the current config, failed tests automatically keep traces in the test-results folder.

## Expected assessment scenario output
- IBM: BUY 66.67
- MSFT: HOLD 0
- ORCL: SELL 45.45
- AAPL: HOLD 0
- HD: HOLD 0
