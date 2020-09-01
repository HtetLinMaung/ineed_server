"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: String,
    needs: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "need",
        },
    ],
}, {
    timestamps: true,
});
exports.default = mongoose_1.model("user", userSchema);
//# sourceMappingURL=User.js.map