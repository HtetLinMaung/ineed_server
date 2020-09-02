"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.imageDir = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
exports.imageDir = path_1.default.join("..", __dirname, "images");
exports.deleteFile = function (fileName) {
    fs_1.default.unlink(path_1.default.join(exports.imageDir, fileName), function (err) {
        if (err)
            throw err;
    });
};
//# sourceMappingURL=constants.js.map