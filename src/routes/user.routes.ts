import {
  registerUser,
  loginUser,
  findUser,
  getUsers,
} from "@/controllers/user.controller";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search/:userId", findUser);

export default router;
