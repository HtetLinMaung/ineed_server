"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.editProfile = exports.signup = void 0;
var express_validator_1 = require("express-validator");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../models/User"));
var utils_1 = require("../utils");
exports.signup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, hashedPassword, userDto, user, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    console.log("isError");
                    error = new Error("Validation failed!");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 12)];
            case 1:
                hashedPassword = _a.sent();
                userDto = {
                    email: req.body.email,
                    password: hashedPassword,
                };
                user = new User_1.default(userDto);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET || "secret", {
                    expiresIn: "1d",
                });
                res.json({ message: "User created successfully", token: token, status: 1 });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                if (!err_1.statusCode) {
                    err_1.statusCode = 500;
                }
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.editProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, profileImage, error, user, error, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed!");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                profileImage = req.body.profileImage;
                if (req.file) {
                    profileImage = req.file.path.replace("\\", "/");
                }
                if (!profileImage) {
                    error = new Error("No file picked.");
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, User_1.default.findById(req.userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    error = new Error("User not found!");
                    error.statusCode = 404;
                    throw error;
                }
                if (user.profileImage && user.profileImage != profileImage) {
                    utils_1.deleteFile(user.profileImage);
                }
                user.profileImage = profileImage;
                user.username = req.body.username;
                return [4 /*yield*/, user.save()];
            case 2:
                result = _a.sent();
                res.json({
                    message: "Profile updated successfully!",
                    data: result,
                    status: 1,
                });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                if (!err_2.statusCode) {
                    err_2.statusCode = 500;
                }
                next(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, user, error, isEqual, error, token, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed!");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    error = new Error("User with this email does not exist!");
                    error.statusCode = 404;
                    throw error;
                }
                return [4 /*yield*/, bcrypt_1.default.compare(req.body.password, user.password)];
            case 2:
                isEqual = _a.sent();
                if (!isEqual) {
                    error = new Error("Password is incorrect!");
                    error.statusCode = 401;
                    throw error;
                }
                token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET || "secret", {
                    expiresIn: "1d",
                });
                res.json({
                    id: user._id,
                    username: user.username,
                    token: token,
                    message: "Login successful!",
                    profileImage: user.profileImage,
                    status: 1,
                });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                if (!err_3.statusCode) {
                    err_3.statusCode = 500;
                }
                next(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=AuthController.js.map