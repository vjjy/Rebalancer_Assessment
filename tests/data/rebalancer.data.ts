import { SecurityPosition, TradeRecommendation } from "../../src/rebalancer";

export const TOTAL_ASSET = 100000;

export const PORTFOLIO_FROM_ASSESSMENT: SecurityPosition[] = [
  { symbol: "IBM", targetPercent: 20, currentPercent: 10, unitPrice: 150 },
  { symbol: "MSFT", targetPercent: 20, currentPercent: 20, unitPrice: 90 },
  { symbol: "ORCL", targetPercent: 20, currentPercent: 30, unitPrice: 220 },
  { symbol: "AAPL", targetPercent: 20, currentPercent: 20, unitPrice: 450 },
  { symbol: "HD", targetPercent: 20, currentPercent: 20, unitPrice: 70 },
];

export const EXPECTED_ASSESSMENT_TRADES: TradeRecommendation[] = [
  { symbol: "IBM", targetVariancePercent: -10, action: "BUY", shares: 66.67 },
  { symbol: "MSFT", targetVariancePercent: 0, action: "HOLD", shares: 0 },
  { symbol: "ORCL", targetVariancePercent: 10, action: "SELL", shares: 45.45 },
  { symbol: "AAPL", targetVariancePercent: 0, action: "HOLD", shares: 0 },
  { symbol: "HD", targetVariancePercent: 0, action: "HOLD", shares: 0 },
];

export const WHOLE_SHARE_EXPECTED = {
  IBM: 66,
  ORCL: 45,
};

export const ALIGNED_POSITION: SecurityPosition[] = [
  { symbol: "NFLX", targetPercent: 15, currentPercent: 15, unitPrice: 500 },
];

export const EXPECTED_ALIGNED_TRADE: TradeRecommendation = {
  symbol: "NFLX",
  targetVariancePercent: 0,
  action: "HOLD",
  shares: 0,
};

export const INVALID_SYMBOL_POSITION: SecurityPosition[] = [
  { symbol: "", targetPercent: 15, currentPercent: 15, unitPrice: 500 },
];

export const INVALID_PRICE_POSITION: SecurityPosition[] = [
  { symbol: "IBM", targetPercent: 20, currentPercent: 10, unitPrice: 0 },
];
