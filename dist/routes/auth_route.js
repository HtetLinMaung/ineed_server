"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AuthController_1 = require("../controllers/AuthController");
var express_validator_1 = require("express-validator");
var User_1 = __importDefault(require("../models/User"));
var router = express_1.default.Router();
router.put("/signup", [
    express_validator_1.body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .custom(function (v) {
        return User_1.default.findOne({ email: v }).then(function (user) {
            if (user) {
                return Promise.reject("User with this email already existed!");
            }
            return Promise.resolve();
        });
    }),
    express_validator_1.body("password").notEmpty().withMessage("Password must not be empty!"),
], AuthController_1.signup);
exports.default = router;
//# sourceMappingURL=auth_route.js.map