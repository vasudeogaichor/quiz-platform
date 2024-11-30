import request from "supertest";
import { getToken } from "./testStore";
const assert = require("assert");

describe("POST /api/quiz/questions", () => {
  it("Get quiz questions", async () => {
    const token = getToken();
    console.log('token - ', token);
    const response = await request("http://localhost:3000")
      .get("/api/quiz/questions")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.message, "Success");

    assert.ok(response.body.data.attemptId);
    assert.ok(response.body.data.question);
  });
});
