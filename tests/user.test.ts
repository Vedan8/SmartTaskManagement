import request from "supertest";
import app from "../appTest";
import * as userServices from "../services/userServices";

jest.mock("../services/userServices");

describe("User Auth Endpoints", () => {
  
  describe("POST /auth/register", () => {
    it("should register a new user and return 201", async () => {
      (userServices.signUp as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .post("/auth/register")
        .send({
          username: "testuser",
          password: "password123"
        });

      expect(res.statusCode).toBe(201);
      expect(res.text).toBe("User Created");
    });

    it("should return 400 if validation fails", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send({
          username: "",
        });

      expect(res.statusCode).toBe(400);
    });
  });

  describe("POST /auth/login", () => {
    it("should return a token on successful login", async () => {
      const fakeToken = "mocked-jwt-token";
      (userServices.login as jest.Mock).mockResolvedValue(fakeToken);

      const res = await request(app)
        .post("/auth/login")
        .send({
          username: "testuser",
          password: "password123"
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token", fakeToken);
    });
  });
});