import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import - (std. practise is importing routes here after middleware declaration)
import userRouter from "./routes/user.routes.js";

// routes declaration
// explanation: Whenever the user routes to a particular url for eg. "/api/v1/users" then the operation is transfered to the router here "userRouter", which will handle all the other work
app.use("/api/v1/users", userRouter);

// eg. http://localhost:8000/api/v1/users/register

export { app };
