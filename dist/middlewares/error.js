"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (err, _req, res, _next) {
    var message = err.message, data = err.data;
    var statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: message, data: data, status: 0 });
});
//# sourceMappingURL=error.js.map