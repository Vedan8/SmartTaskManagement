import express from "express";
import cors from "cors";
import { userRoute } from "./routes/userRoutes";
import { taskRoute } from "./routes/taskRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoute);
app.use(taskRoute);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app; 