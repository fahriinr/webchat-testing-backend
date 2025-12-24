import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  ATLAS_URI: process.env.ATLAS_URI || "",
  PORT: process.env.PORT || 2045,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};
