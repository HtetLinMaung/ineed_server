"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var io;
exports.default = {
    init: function (httpServer) {
        io = socket_io_1.default(httpServer);
        return io;
    },
    getIO: function () {
        if (!io) {
            throw new Error("Socket.io is not initialized!");
        }
        return io;
    },
};
//# sourceMappingURL=socket.js.map