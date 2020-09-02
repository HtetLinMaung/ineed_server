"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (function (req, _res, next) {
    var authHeader = req.get("Authorization");
    if (!authHeader) {
        var error = new Error("Not authenticated!");
        error.statusCode = 401;
        throw error;
    }
    var token = authHeader.split(" ")[1];
    var decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET || "secret");
    }
    catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        var error = new Error("Not authenticated!");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
});
//# sourceMappingURL=is-auth.js.map