"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tagSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
});
var needSchema = new mongoose_1.Schema({
    tags: [tagSchema],
    header: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "In progress",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.model("need", needSchema);
//# sourceMappingURL=Need.js.map