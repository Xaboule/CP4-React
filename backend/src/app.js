import express from "express";
const app = express();
import todoRouter from "./routers/todos.router.js";
import cors from "cors";

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
  })
);

app.use(express.json()); // to accept JSON body in POST request

app.use("/todos", todoRouter);

export default app;
