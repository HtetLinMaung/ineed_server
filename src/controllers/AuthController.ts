import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IUserCreate } from "../interfaces/IUser";
import { deleteFile } from "../utils";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const userDto: IUserCreate = {
      email: req.body.email,
      password: hashedPassword,
    };
    const user = new User(userDto);
    await user.save();
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET || "secret",
      {
        expiresIn: "1d",
      }
    );
    res.json({ message: "User created successfully", token, status: 1 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editProfile = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    let profileImage: string = req.body.profileImage;
    if (req.file) {
      profileImage = req.file.path.replace("\\", "/");
    }
    if (!profileImage) {
      const error: any = new Error("No file picked.");
      error.statusCode = 422;
      throw error;
    }
    const user: any = await User.findById(req.userId);
    if (!user) {
      const error: any = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }
    if (user.profileImage && user.profileImage != profileImage) {
      deleteFile(user.profileImage);
    }
    user.profileImage = profileImage;
    user.username = req.body.username;
    const result = await user.save();
    res.json({
      message: "Profile updated successfully!",
      data: result,
      status: 1,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const user: any = await User.findOne({ email: req.body.email });
    if (!user) {
      const error: any = new Error("User with this email does not exist!");
      error.statusCode = 404;
      throw error;
    }
    const isEqual = await bcrypt.compare(req.body.password, user.password);
    if (!isEqual) {
      const error: any = new Error("Password is incorrect!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET || "secret",
      {
        expiresIn: "1d",
      }
    );
    res.json({
      id: user._id,
      username: user.username,
      token,
      message: "Login successful!",
      profileImage: user.profileImage,
      status: 1,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
