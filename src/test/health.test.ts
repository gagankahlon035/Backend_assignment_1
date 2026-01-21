import request from "supertest";
import app from "../app";

describe("Health Check Endpoint", () => {
  it("should return API health status", async () => {
    // Act
    const response = await request(app).get("/api/v1/health");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "OK");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("version");
  });
});
