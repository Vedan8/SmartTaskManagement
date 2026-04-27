import { Router } from "express";
import type { Request, Response } from "express";
import { signUpController, getUserController, loginController, getProfileController, updateProfileController} from "../controllers/userController";
import { validateUser,authenticate,isAdmin } from "../middleware/userMiddleware";

const userRoute = Router();

userRoute.post("/auth/register",validateUser, async (req: Request, res: Response) => {
  try {
    await signUpController(req.body);
    res.status(201).send("User Created");
  } catch (err:any) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

userRoute.get("/users",authenticate,isAdmin, async (req: Request, res: Response) => {
  try {
    const data = await getUserController();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(404).send("Error fetching user");
  }
});

userRoute.get("/users/profile",authenticate, async (req: Request, res: Response) => {
  try {
    const user = await getProfileController((req as any).user);
    res.send(user);
  } catch (err:any) {
    console.error(err.message);
    res.status(404).send(err.message);
  }
});

userRoute.put("/users/profile",authenticate,validateUser, async (req: Request, res: Response) => {
  try {
    await updateProfileController(req.body,(req as any).user);
    res.send("User Updated");
  } catch (err:any) {
    console.error(err.message);
    res.status(404).send(err.message);
  }
});

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