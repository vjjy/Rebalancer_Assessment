export type Action = "BUY" | "SELL" | "HOLD";

export interface SecurityPosition {
  symbol: string;
  targetPercent: number;
  currentPercent: number;
  unitPrice: number;
}

export interface TradeRecommendation {
  symbol: string;
  targetVariancePercent: number;
  action: Action;
  shares: number;
}

export interface RebalanceOptions {
  allowFractionalShares?: boolean;
  precision?: number;
}

export function calculateTrades(
  totalAsset: number,
  positions: SecurityPosition[],
  options: RebalanceOptions = {}
): TradeRecommendation[] {
  if (totalAsset <= 0 || Number.isNaN(totalAsset)) {
    throw new Error("totalAsset must be a positive number");
  }

  const precision = options.precision ?? 2;
  const allowFractionalShares = options.allowFractionalShares ?? true;

  return positions.map((position) => {
    validatePosition(position);

    // Negative variance means current is below target and we need to buy.
    const variance = position.currentPercent - position.targetPercent;
    const deltaAmount = Math.abs((variance / 100) * totalAsset);

    let shares = deltaAmount / position.unitPrice;
    shares = allowFractionalShares
      ? round(shares, precision)
      : Math.floor(shares);

    if (shares === 0) {
      return {
        symbol: position.symbol,
        targetVariancePercent: variance,
        action: "HOLD",
        shares: 0,
      };
    }

    return {
      symbol: position.symbol,
      targetVariancePercent: variance,
      action: variance < 0 ? "BUY" : "SELL",
      shares,
    };
  });
}

function validatePosition(position: SecurityPosition): void {
  if (!position.symbol.trim()) {
    throw new Error("symbol is required");
  }

  if (position.targetPercent < 0 || position.currentPercent < 0) {
    throw new Error("targetPercent and currentPercent must be >= 0");
  }

  if (position.unitPrice <= 0 || Number.isNaN(position.unitPrice)) {
    throw new Error("unitPrice must be a positive number");
  }
}

function round(value: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}
