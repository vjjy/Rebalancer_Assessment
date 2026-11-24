import { expect, test } from "@playwright/test";
import { calculateTrades } from "../src/rebalancer";
import {
  ALIGNED_POSITION,
  EXPECTED_ALIGNED_TRADE,
  EXPECTED_ASSESSMENT_TRADES,
  INVALID_PRICE_POSITION,
  INVALID_SYMBOL_POSITION,
  PORTFOLIO_FROM_ASSESSMENT,
  TOTAL_ASSET,
  WHOLE_SHARE_EXPECTED,
} from "./data/rebalancer.data";

test.describe("Portfolio rebalancing assessment", () => {
  test("calculates shares to buy/sell for the provided scenario", async ({}, testInfo) => {
    const result = calculateTrades(TOTAL_ASSET, PORTFOLIO_FROM_ASSESSMENT);

    await testInfo.attach("expected-assessment-output.json", {
      body: Buffer.from(JSON.stringify(EXPECTED_ASSESSMENT_TRADES, null, 2)),
      contentType: "application/json",
    });

    await testInfo.attach("actual-assessment-output.json", {
      body: Buffer.from(JSON.stringify(result, null, 2)),
      contentType: "application/json",
    });

    for (const expectedTrade of EXPECTED_ASSESSMENT_TRADES) {
      await test.step(`Validate ${expectedTrade.symbol} recommendation`, async () => {
        const actualTrade = result.find(
          (trade) => trade.symbol === expectedTrade.symbol
        );

        expect(
          actualTrade,
          `Missing recommendation for ${expectedTrade.symbol}`
        ).toBeDefined();

        expect(
          actualTrade,
          `${expectedTrade.symbol}: expected ${expectedTrade.action} ${expectedTrade.shares} shares`
        ).toMatchObject(expectedTrade);
      });
    }
  });

  test("supports whole-share mode if the product disallows fractional shares", () => {
    const result = calculateTrades(TOTAL_ASSET, PORTFOLIO_FROM_ASSESSMENT, {
      allowFractionalShares: false,
    });

    expect(result.find((r) => r.symbol === "IBM")?.shares).toBe(
      WHOLE_SHARE_EXPECTED.IBM
    );
    expect(result.find((r) => r.symbol === "ORCL")?.shares).toBe(
      WHOLE_SHARE_EXPECTED.ORCL
    );
  });

  test("returns HOLD with zero shares when a position is already aligned", () => {
    const result = calculateTrades(TOTAL_ASSET, ALIGNED_POSITION);

    expect(result[0]).toEqual(EXPECTED_ALIGNED_TRADE);
  });

  test("throws error for invalid input", () => {
    expect(() => calculateTrades(TOTAL_ASSET, INVALID_SYMBOL_POSITION)).toThrow(
      "symbol is required"
    );

    expect(() => calculateTrades(TOTAL_ASSET, INVALID_PRICE_POSITION)).toThrow(
      "unitPrice must be a positive number"
    );

    expect(() => calculateTrades(0, PORTFOLIO_FROM_ASSESSMENT)).toThrow(
      "totalAsset must be a positive number"
    );
  });
});
