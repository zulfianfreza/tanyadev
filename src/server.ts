import express, { Request, Response, Application } from "express";
import cors from "cors";
import connectDB from "./config/db";
import { config } from "./config";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler";
import AuthRouter from "./routes/auth.route";
import UserRouter from "./routes/user.route";
import TechRouter from "./routes/tech.route";
import OrderRouter from "./routes/order.route";
import SkillRouter from "./routes/skill.route";

const app: Application = express();

const v1 = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (_: Request, res: Response) => {
  res.send("Welcome");
});

app.use(`${v1}/auth`, AuthRouter);
app.use(`${v1}/user`, UserRouter);
app.use(`${v1}/tech`, TechRouter);
app.use(`${v1}/order`, OrderRouter);
app.use(`${v1}/skill`, SkillRouter);

app.use(notFound);

app.use(errorHandler);

connectDB.on("open", () => {
  console.log("Database connected");
  app.listen(config.port, () => {
    console.log("Server running on PORT:", config.port);
  });
});
