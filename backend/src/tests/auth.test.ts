import request from "supertest";
import { faker } from "@faker-js/faker";
import { setUser } from "./testStore";
const assert = require("assert");

describe("POST /api/auth/signup", () => {
  it("should signup successfully and return a token and user data", async () => {
    const signupPayload = {
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password(),
      fullName: faker.person.fullName(),
      grade: Math.floor(Math.random() * (10 - 7 + 1)) + 7
    };

    const response = await request("http://localhost:3000")
      .post("/api/auth/signup")
      .send(signupPayload)
      .expect(200);

    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.message, "Success");

    assert.ok(response.body.data.token);
    assert.ok(response.body.data.user);

    const user = response.body.data.user;
    assert.strictEqual(user.email, signupPayload.email);
    assert.strictEqual(user.fullName, signupPayload.fullName);
    assert.strictEqual(user.grade, signupPayload.grade);
    assert.ok(Date.parse(user.createdAt));
    assert.ok(Date.parse(user.updatedAt));
    setUser({...user, password: signupPayload.password});
  });
});

describe("POST /api/auth/login", () => {
  it("should login successfully and return a token and user data", async () => {
    const loginPayload = {
      email: "2@gmail.com",
      password: "Endgame@2019",
    };

    const response = await request("http://localhost:3000")
      .post("/api/auth/login")
      .send(loginPayload)
      .expect(200);

    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.message, "Success");

    assert.ok(response.body.data.token);
    assert.ok(response.body.data.user);

    const user = response.body.data.user;
    assert.strictEqual(user.email, "2@gmail.com");
    assert.strictEqual(user.fullName, "Vasudeo Gaichor");
    assert.strictEqual(user.grade, 8);
    assert.ok(Date.parse(user.createdAt));
    assert.ok(Date.parse(user.updatedAt));
  });

  it("should return 400 status for invalid credentials", async () => {
    const invalidLoginPayload = {
      email: "invalid@gmail.com",
      password: "WrongPassword",
    };

    const response = await request("http://localhost:3000")
      .post("/api/auth/login")
      .send(invalidLoginPayload)
      .expect(401);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid credentials");
    expect(response.body.data).toBeNull;
  });
});


/*
describe("POST /api.auth/google-auth", () => {
  it("should return an error for an invalid or expired Google authorization code", async () => {
    const invalidGoogleAuthPayload = {
      credential: "invalid-auth-code",
    };

    const response = await request("http://localhost:3000")
      .post("/api/auth/google-auth")
      .send(invalidGoogleAuthPayload)
      .expect(500);

    assert.strictEqual(response.body.success, false);
    assert.strictEqual(response.body.message, "Internal server error");
  });
});
*/