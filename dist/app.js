"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// middlewares
var error_1 = __importDefault(require("./middlewares/error"));
// routes
var auth_route_1 = __importDefault(require("./routes/auth_route"));
var app = express_1.default();
var PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/api/auth/", auth_route_1.default);
app.use(error_1.default);
mongoose_1.default
    .connect(process.env.DATABASE || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    app.listen(PORT, function () { return console.log("Server listening on PORT " + PORT); });
})
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=app.js.map