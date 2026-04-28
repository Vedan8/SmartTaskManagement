import { Router } from "express";
import type { Request, Response } from "express";
import { signUpController, getUserController, loginController, getProfileController, updateProfileController} from "../controllers/userController";
import { validateUser,authenticate,isAdmin } from "../middleware/userMiddleware";

const userRoute = Router();


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *                username: { type: string, example: username }
 *                password: { type: string, example: password }
 */
userRoute.post("/auth/register",validateUser, async (req: Request, res: Response) => {
  try {
    await signUpController(req.body);
    res.status(201).send("User Created");
  } catch (err:any) {
    console.error(err);
    res.status(500).send(err.message);
  }
});



/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
userRoute.get("/users",authenticate,isAdmin, async (req: Request, res: Response) => {
  try {
    const data = await getUserController();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(404).send("Error fetching user");
  }
});



/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Users]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
userRoute.get("/users/profile",authenticate, async (req: Request, res: Response) => {
  try {
    const user = await getProfileController((req as any).user);
    res.send(user);
  } catch (err:any) {
    console.error(err.message);
    res.status(404).send(err.message);
  }
});



/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *                username: { type: string, example: username }
 *                password: { type: string, example: password }
 *     responses:
 *       200:
 *         description: User Updated
 */
userRoute.put("/users/profile",authenticate,validateUser, async (req: Request, res: Response) => {
  try {
    await updateProfileController(req.body,(req as any).user);
    res.send("User Updated");
  } catch (err:any) {
    console.error(err.message);
    res.status(404).send(err.message);
  }
});


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *                username: { type: string, example: username }
 *                password: { type: string, example: password }
 *     responses:
 *       200:
 *         description: Returns JWT token
 */
userRoute.post("/auth/login",validateUser, async (req: Request, res: Response) => {
  try {
    const response=await loginController(req.body)
    res.json({
      token:response
    })
  } catch (err:any) {
    console.error(err);
    res.status(404).send(err.message);
  }
})

export { userRoute };