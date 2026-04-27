import express from "express"
import dbConnect from "./config/dbConnect"
import dotenv from "dotenv"
import { userRoute } from "./routes/userRoutes";
import { taskRoute } from "./routes/taskRoutes";

dotenv.config();
const PORT=process.env.PORT
const URI=process.env.URI!

async function start() {
  await dbConnect(URI);

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(userRoute)
  app.use(taskRoute)

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

start();
