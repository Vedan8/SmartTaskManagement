import request from "supertest";
import app from "../appTest";
import * as taskServices from "../services/taskServices";

jest.mock("../services/taskServices");
jest.mock("../middleware/userMiddleware", () => ({
  authenticate: (req: any, res: any, next: any) => {
    req.user = { id: "mockUserId", username: "tester", role: "user" };
    next();
  },
  validateUser: (req: any, res: any, next: any) => next(),
  isAdmin: (req: any, res: any, next: any) => next(),
}));

describe("Task Endpoints", () => {
  it("GET /tasks should return all tasks for the user", async () => {
    const mockTasks = [{ title: "Test Task", description: "Do something" }];
    (taskServices.getTask as jest.Mock).mockResolvedValue(mockTasks);

    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body[0].title).toBe("Test Task");
  });
});