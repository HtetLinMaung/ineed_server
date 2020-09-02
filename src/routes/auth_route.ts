import express from "express";
import { editProfile, login, signup } from "../controllers/AuthController";
import { body } from "express-validator";
import User from "../models/User";
import isAuth from "../middlewares/is-auth";
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
  isAuth,
  [body("username").notEmpty().withMessage("Username must not be empty!")],
  editProfile
);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email!"),
    body("password").notEmpty().withMessage("Password must not be empty!"),
  ],
  login
);

export default router;
