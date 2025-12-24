import userModel from "../models/userModel";
import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

const createToken = (_id: string) => {
  const jwtKey = ENV.JWT_SECRET;

  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (
      !validator.isStrongPassword(password, {
        minSymbols: 0,
        minLength: 6,
      })
    ) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashPassword });

    await user.save();

    const token = createToken(user._id.toString());

    return res
      .status(201)
      .json({ message: "User created successfully", user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id.toString());

    return res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const findUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();

    return res.status(200).json({ message: "Users found", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser, loginUser, findUser, getUsers };
