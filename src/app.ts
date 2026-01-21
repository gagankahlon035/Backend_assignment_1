import express, { Express } from "express"; 
import { calculatePortfolioPerformance } from "./portfolio/portfolioPerformance";


// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

export default app;

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Portfolio performance route
app.get(
  "/api/v1/portfolio/performance",
  (req,res) => {
    const initialInvestment = parseFloat(req.query.initialInvestment as string);
    const currentValue = parseFloat(req.query.currentValue as string);

    if (isNaN(initialInvestment) || isNaN(currentValue)) {
      return res.status(400).json({
        error: "initialInvestment and currentValue must be valid numbers",
      });
    }

    const performance = calculatePortfolioPerformance(
      initialInvestment,
      currentValue
    );

    res.json(performance);
  }
);
