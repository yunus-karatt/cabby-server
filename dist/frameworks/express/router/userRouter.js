"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const userRegisterController_1 = __importDefault(require("../../../adapters/controllers/user/userRegisterController"));
exports.userRoute = express_1.default.Router();
exports.userRoute.get('/', (req, res) => res.send("hello world"));
exports.userRoute.post("/userexist", userRegisterController_1.default.isuserExist);
exports.userRoute.post("/register", userRegisterController_1.default.registerUser);
