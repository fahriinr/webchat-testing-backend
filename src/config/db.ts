import mongoose from "mongoose";
import { ENV } from "./env";

const dbConnect = () =>
  mongoose
    .connect(ENV.ATLAS_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));

export default dbConnect;
