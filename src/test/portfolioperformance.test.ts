
import request from "supertest";
import app from "../app";
import { calculatePortfolioPerformance } from "../portfolio/portfolioPerformance";

describe("Portfolio Performance (AAA)", () => {
  // ===============================
  // UNIT TESTS (Function)
  // ===============================

  test("unit: profit case (AAA)", () => {
    // ARRANGE
    const initialInvestment = 1000;
    const currentValue = 1250;

    // ACT
    const result = calculatePortfolioPerformance(initialInvestment, currentValue);

    // ASSERT
    expect(result.initialInvestment).toBe(1000);
    expect(result.currentValue).toBe(1250);
    expect(result.profitOrLoss).toBe(250);
    expect(result.percentageChange).toBe(25);
    expect(result.performanceSummary).toBe("Solid gain. Keep monitoring your investments.");
  });

  test("unit: loss case (AAA)", () => {
    // ARRANGE
    const initialInvestment = 1000;
    const currentValue = 900;

    // ACT
    const result = calculatePortfolioPerformance(initialInvestment, currentValue);

    // ASSERT
    expect(result.profitOrLoss).toBe(-100);
    expect(result.percentageChange).toBe(-10);
    expect(result.performanceSummary).toBe("Minor loss. Stay calm and review your options.");
  });

  test("unit: no change case (AAA)", () => {
    // ARRANGE
    const initialInvestment = 1000;
    const currentValue = 1000;

    // ACT
    const result = calculatePortfolioPerformance(initialInvestment, currentValue);

    // ASSERT
    expect(result.profitOrLoss).toBe(0);
    expect(result.percentageChange).toBe(0);
    expect(result.performanceSummary).toBe("No change. Your portfolio is holding steady.");
  });

  test("unit: invalid input (initialInvestment 0) (AAA)", () => {
    // ARRANGE
    const initialInvestment = 0;
    const currentValue = 1000;

    // ACT
    const result = calculatePortfolioPerformance(initialInvestment, currentValue);

    // ASSERT
    expect(result.profitOrLoss).toBe(1000);
    expect(result.percentageChange).toBe(0); // because initialInvestment === 0
    expect(result.performanceSummary).toBe(
      "Invalid input. Initial investment must be greater than 0."
    );
  });

  // ===============================
  // API TESTS (Endpoint)
  // ===============================

  test("api: profit case (AAA)", async () => {
    // ARRANGE
    const initialInvestment = 1000;
    const currentValue = 1250;

    // ACT
    const response = await request(app)
      .get("/api/v1/portfolio/performance")
      .query({ initialInvestment, currentValue });

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body.profitOrLoss).toBe(250);
    expect(response.body.percentageChange).toBe(25);
    expect(response.body.performanceSummary).toBe("Solid gain. Keep monitoring your investments.");
  });
});
