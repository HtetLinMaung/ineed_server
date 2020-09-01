import express from "express";
import { editProfile, signup } from "../controllers/AuthController";
import { body } from "express-validator";
import User from "../models/User";
const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .custom((v) => {
        return User.findOne({ email: v }).then((user) => {
          if (user) {
            return Promise.reject("User with this email already existed!");
          }
          return Promise.resolve();
        });
      }),
    body("password").notEmpty().withMessage("Password must not be empty!"),
  ],
  signup
);

router.put(
  "/edit-profile",
  [body("username").notEmpty().withMessage("Username must not be empty!")],
  editProfile
);

export default router;
