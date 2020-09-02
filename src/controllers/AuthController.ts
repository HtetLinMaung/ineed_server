import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/User";
import { IUserCreate } from "../interfaces/IUser";
import jwt from "jsonwebtoken";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    const result = await user.save();
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET || "secret",
      {
        expiresIn: "1d",
      },
    );
    res.json({ message: "User created successfully", data: result, token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty) {
//         const error: any = new Error("Validation failed!");
//         error.data = errors.array();
//         error.statusCode = 422;
//         throw error;
//       }
//     } catch (err) {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     }
//   }
