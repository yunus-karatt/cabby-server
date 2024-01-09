"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const userRegisterController_1 = __importDefault(require("../../../adapters/controllers/user/userRegisterController"));
exports.userRoute = express_1.default.Router();
exports.userRoute.post("/signup", userRegisterController_1.default.signup);
