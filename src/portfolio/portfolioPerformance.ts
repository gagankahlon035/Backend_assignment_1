/**
 * The shape of the portfolio performance response.
 */
export interface PortfolioPerformanceResult {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

/**
 * Calculates portfolio profit/loss, percentage change, and summary message.
 * No if-statements are used (ternary only).
 */
export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number
): PortfolioPerformanceResult {
  const profitOrLoss = currentValue - initialInvestment;

  const percentageChange =
    initialInvestment === 0 ? 0 : (profitOrLoss / initialInvestment) * 100;

  const performanceSummary =
    initialInvestment <= 0
      ? "Invalid input. Initial investment must be greater than 0."
      : percentageChange >= 30
      ? "Excellent performance! Your investments are doing great."
      : percentageChange >= 10
      ? "Solid gain. Keep monitoring your investments."
      : percentageChange > 0
      ? "Modest gain. Your portfolio is growing slowly."
      : percentageChange === 0
      ? "No change. Your portfolio is holding steady."
      : percentageChange >= -10
      ? "Minor loss. Stay calm and review your options."
      : "Significant loss. Review your portfolio strategy.";

  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange,
    performanceSummary,
  };
}
