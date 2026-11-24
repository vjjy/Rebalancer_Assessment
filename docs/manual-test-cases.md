# Manual Test Cases - Portfolio Rebalancing

## Scope
Validate that the application correctly calculates target variance and outputs the number of shares to buy/sell for each security.

## Assumptions
1. Total asset value is provided in USD.
2. target variance = current% - target%.
3. Negative variance means BUY, positive variance means SELL, zero means HOLD.
4. By default, application supports fractional shares up to 2 decimals.
5. If whole-share mode is enabled, shares are floored to avoid over-trading.

## Reference Input (Assessment Scenario)
- Total asset: 100000
- Securities:
  - IBM: target 20, current 10, price 150
  - MSFT: target 20, current 20, price 90
  - ORCL: target 20, current 30, price 220
  - AAPL: target 20, current 20, price 450
  - HD: target 20, current 20, price 70

## Expected Output (Fractional Mode)
- IBM: BUY 66.67
- MSFT: HOLD 0
- ORCL: SELL 45.45
- AAPL: HOLD 0
- HD: HOLD 0

## Manual Test Cases

### TC-01 Happy Path - Mixed BUY/SELL/HOLD
Steps:
1. Open the rebalancing application.
2. Enter Total Asset as 100000.
3. Enter these rows:
  IBM target 20 current 10 price 150
  MSFT target 20 current 20 price 90
  ORCL target 20 current 30 price 220
  AAPL target 20 current 20 price 450
  HD target 20 current 20 price 70
4. Keep fractional mode enabled.
5. Click Calculate or Submit.

Expected Result:
1. IBM shows BUY 66.67.
2. MSFT shows HOLD 0.
3. ORCL shows SELL 45.45.
4. AAPL shows HOLD 0.
5. HD shows HOLD 0.
6. No validation error appears.

### TC-02 All Positions Already Aligned
Steps:
1. Open the application.
2. Enter Total Asset as 100000.
3. For all securities, set current% equal to target%.
4. Click Calculate or Submit.

Expected Result:
1. Every security action is HOLD.
2. Shares to buy or sell is 0 for every row.

### TC-03 Only BUY Recommendations
Steps:
1. Open the application.
2. Enter a valid Total Asset value.
3. For every security, set current% less than target%.
4. Keep valid unit prices greater than 0.
5. Click Calculate or Submit.

Expected Result:
1. Every row action is BUY.
2. Shares value is greater than 0 for each row.
3. No row shows SELL.

### TC-04 Only SELL Recommendations
Steps:
1. Open the application.
2. Enter a valid Total Asset value.
3. For every security, set current% greater than target%.
4. Keep valid unit prices greater than 0.
5. Click Calculate or Submit.

Expected Result:
1. Every row action is SELL.
2. Shares value is greater than 0 for each row.
3. No row shows BUY.

### TC-05 Whole-Share Mode
Steps:
1. Open the application.
2. Enter the assessment input dataset.
3. Enable whole-share mode.
4. Click Calculate or Submit.

Expected Result:
1. IBM shares is 66.
2. ORCL shares is 45.
3. Other securities are HOLD with 0 shares.
4. Output has no decimal share values.

### TC-06 Invalid Total Asset
Steps:
1. Open the application.
2. Enter Total Asset as 0.
3. Enter valid security rows.
4. Click Calculate or Submit.
5. Repeat with a negative total asset.

Expected Result:
1. Validation error is displayed for Total Asset.
2. Calculation is blocked until corrected.

### TC-07 Invalid Unit Price
Steps:
1. Open the application.
2. Enter valid Total Asset and percentages.
3. Set one security unit price to 0.
4. Click Calculate or Submit.
5. Repeat with a negative unit price.

Expected Result:
1. Validation error is displayed for unit price.
2. Calculation is blocked until corrected.

### TC-08 Blank Symbol
Steps:
1. Open the application.
2. Enter valid Total Asset, percentages, and prices.
3. Keep one security symbol blank.
4. Click Calculate or Submit.

Expected Result:
1. Validation error is displayed for symbol.
2. Calculation is blocked until corrected.

### TC-09 Decimal Precision
Steps:
1. Open the application.
2. Enter values that produce long decimal shares.
3. Keep fractional mode enabled.
4. Click Calculate or Submit.

Expected Result:
1. Shares are rounded to configured precision.
2. Rounding is consistent across all rows.

### TC-10 Performance Sanity
Steps:
1. Open the application.
2. Load or enter 1000 security rows with valid data.
3. Click Calculate or Submit.
4. Measure response time.

Expected Result:
1. Calculation completes within acceptable time.
2. Application remains responsive.
3. No crash or unhandled error occurs.
