"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var socket_1 = __importDefault(require("./socket"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// middlewares
var error_1 = __importDefault(require("./middlewares/error"));
// routes
var auth_route_1 = __importDefault(require("./routes/auth_route"));
var need_route_1 = __importDefault(require("./routes/need_route"));
var utils_1 = require("./utils");
var app = express_1.default();
var PORT = process.env.PORT || 3000;
var fileStorage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "images");
    },
    filename: function (_req, file, cb) {
        cb(null, uuid_1.v4() + "_" + file.originalname);
    },
});
var fileFilter = function (_req, file, cb) {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use(express_1.default.json());
app.use(multer_1.default({ storage: fileStorage, fileFilter: fileFilter }).single("profileImage"));
app.use("/images", express_1.default.static(path_1.default.join(utils_1.rootDir, "images")));
mongoose_1.default
    .connect(process.env.DATABASE || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(function () {
    var server = app.listen(PORT, function () { return console.log("Server listening on PORT " + PORT); });
    var io = socket_1.default.init(server);
    io.on("connection", function (socket) {
        console.log(socket);
    });
    app.use("/api/auth/", auth_route_1.default);
    app.use("/api/needs/", need_route_1.default);
    app.use(error_1.default);
})
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=app.js.map