import dotenv from "dotenv"
dotenv.config();
import express from "express"
import dbConnect from "./config/dbConnect"
import { userRoute } from "./routes/userRoutes";
import { taskRoute } from "./routes/taskRoutes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


const PORT=process.env.PORT
const URI=process.env.URI!

async function start() {
  await dbConnect(URI);

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(userRoute)
  app.use(taskRoute)
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

start();
