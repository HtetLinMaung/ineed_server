"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var NeedController_1 = require("../controllers/NeedController");
var is_auth_1 = __importDefault(require("../middlewares/is-auth"));
var router = express_1.default.Router();
router.route("/").get(is_auth_1.default, NeedController_1.findNeeds).post(is_auth_1.default, [
    express_validator_1.body("header").notEmpty().withMessage("Header must not be empty!"),
    express_validator_1.body("body").notEmpty().withMessage("Body must not be empty!"),
    express_validator_1.body("tags").isArray(),
], NeedController_1.createNeed);
router.route("/:id").get(is_auth_1.default, NeedController_1.findNeed).put(is_auth_1.default, [
    express_validator_1.body("header").notEmpty().withMessage("Header must not be empty!"),
    express_validator_1.body("body").notEmpty().withMessage("Body must not be empty!"),
    express_validator_1.body("tags").isArray(),
    express_validator_1.body("status").isBoolean(),
], NeedController_1.updateNeed).delete(is_auth_1.default, NeedController_1.removeNeed);
exports.default = router;
//# sourceMappingURL=need_route.js.map