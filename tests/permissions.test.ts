import request from "supertest";
import app from "../appTest";
import * as jwt from "jsonwebtoken";
import * as userServices from "../services/userServices";

jest.mock("jsonwebtoken");
jest.mock("../services/userServices");
jest.mock("../services/taskServices");

describe("Admin Permission Guardrails", () => {
  beforeAll(() => {
    process.env.TOKEN = "Authorization"; 
    process.env.JWT_SECRET_KEY = "test-secret";
  });

  describe("GET /users (Admin Only)", () => {
    it("should block a regular user and return error message", async () => {
      (jwt.verify as jest.Mock).mockReturnValue({ 
        id: "123", 
        username: "normie", 
        role: "user" 
      });

      const res = await request(app)
        .get("/users")
        .set("Authorization", "valid-looking-token");
      expect(res.text).toContain("Authrization failed");
    });

    it("should allow an admin to access the user list", async () => {
      (jwt.verify as jest.Mock).mockReturnValue({ 
        id: "1", 
        username: "admin_boss", 
        role: "admin" 
      });
      
      (userServices.getUsers as jest.Mock).mockResolvedValue([{ username: "user1" }]);

      const res = await request(app)
        .get("/users")
        .set("Authorization", "valid-admin-token");

      expect(res.statusCode).toBe(200);
      expect(res.body[0].username).toBe("user1");
    });
  });

  describe("GET /alltask (Admin Only)", () => {
    it("should deny access to regular users for all tasks", async () => {
      (jwt.verify as jest.Mock).mockReturnValue({ role: "user" });

      const res = await request(app)
        .get("/alltask")
        .set("Authorization", "some-token");

      expect(res.text).toContain("Authrization failed");
    });
  });
});