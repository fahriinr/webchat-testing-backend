import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes";
import dotenv from "dotenv";
import dbConnect from "./config/db";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
dbConnect();

app.get("/ping", (req, res) => {
  res.send("ok");
});
app.use("/api/user", userRoute);

export default app;
