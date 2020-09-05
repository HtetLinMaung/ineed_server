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
exports.removeNeed = exports.updateNeed = exports.createNeed = exports.findNeed = exports.findNeeds = void 0;
var express_validator_1 = require("express-validator");
var Need_1 = __importDefault(require("../models/Need"));
var User_1 = __importDefault(require("../models/User"));
var socket_1 = __importDefault(require("../socket"));
exports.findNeeds = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var needs, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Need_1.default.find().populate("user")];
            case 1:
                needs = _a.sent();
                res.json({ data: needs, status: 1 });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                if (!err_1.statusCode) {
                    err_1.statusCode = 500;
                }
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findNeed = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var need, error, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Need_1.default.findById(req.params.id)
                        .populate("user")];
            case 1:
                need = _a.sent();
                if (!need) {
                    error = new Error("Not Found!");
                    error.statusCode = 404;
                    throw error;
                }
                res.json({ data: need, status: 1 });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                if (!err_2.statusCode) {
                    err_2.statusCode = 500;
                }
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createNeed = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var io, errors, error, needDto, need, result, user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                io = socket_1.default.getIO();
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed!");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                needDto = {
                    body: req.body.body,
                    header: req.body.header,
                    tags: req.body.tags,
                    user: req.userId,
                };
                need = new Need_1.default(needDto);
                return [4 /*yield*/, need.save()];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, User_1.default.findById(req.userId)];
            case 2:
                user = _a.sent();
                user === null || user === void 0 ? void 0 : user.needs.push(need);
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.save())];
            case 3:
                _a.sent();
                io.emit("needs");
                res.status(201).json({ message: "Created Successfully!", data: result, status: 1 });
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                if (!err_3.statusCode) {
                    err_3.statusCode = 500;
                }
                next(err_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateNeed = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var io, errors, error, need, error, error, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                io = socket_1.default.getIO();
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed!");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, Need_1.default.findById(req.params.id)];
            case 1:
                need = _a.sent();
                if (!need) {
                    error = new Error("Not Found!");
                    error.statusCode = 404;
                    throw error;
                }
                if (req.userId != need.user) {
                    error = new Error("Unauthorized!");
                    error.statusCode = 401;
                    throw error;
                }
                need.header = req.body.header;
                need.body = req.body.body;
                need.tags = req.body.tags;
                need.status = req.body.status ? "Satisfied" : "In progress";
                return [4 /*yield*/, need.save()];
            case 2:
                result = _a.sent();
                io.emit("needs");
                res.json({ message: "Updated Successfully!", data: result, status: 1 });
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                if (!err_4.statusCode) {
                    err_4.statusCode = 500;
                }
                next(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeNeed = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var io, errors, error, need, error, error, user, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                io = socket_1.default.getIO();
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed!");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, Need_1.default.findById(req.params.id)];
            case 1:
                need = _a.sent();
                if (!need) {
                    error = new Error("Not Found!");
                    error.statusCode = 404;
                    throw error;
                }
                if (req.userId != need.user) {
                    error = new Error("Unauthorized!");
                    error.statusCode = 401;
                    throw error;
                }
                return [4 /*yield*/, Need_1.default.findByIdAndRemove(req.params.id)];
            case 2:
                _a.sent();
                return [4 /*yield*/, User_1.default.findById(req.userId)];
            case 3:
                user = _a.sent();
                user.needs.pull(req.params.id);
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                io.emit("needs");
                res.sendStatus(204);
                return [3 /*break*/, 6];
            case 5:
                err_5 = _a.sent();
                if (!err_5.statusCode) {
                    err_5.statusCode = 500;
                }
                next(err_5);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=NeedController.js.map