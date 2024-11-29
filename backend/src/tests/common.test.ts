const request = require("supertest");
const assert = require("assert");

describe("GET /health", () => {
  it("should return server health status", async () => {
    const response = await request("http://localhost:3000")
      .get("/health")
      .expect(200);

    assert.deepStrictEqual(response.body, {
      status: "UP",
      message: "Server is running successfully",
      timestamp: response.body.timestamp,
    });

    assert.strictEqual(response.body.status, "UP");
    assert.strictEqual(response.body.message, "Server is running successfully");
    assert.ok(Date.parse(response.body.timestamp));
  });
});
