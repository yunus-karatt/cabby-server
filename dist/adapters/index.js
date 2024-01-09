"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoDB_1 = __importDefault(require("../frameworks/database/mongoDB"));
const http_1 = __importDefault(require("http"));
const dotenv = __importStar(require("dotenv"));
const userRouter_1 = require("../frameworks/express/router/userRouter");
dotenv.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', userRouter_1.userRoute);
if (MONGO_URL) {
    (0, mongoDB_1.default)(MONGO_URL)
        .then(() => {
        server.listen(port, () => console.log(`Server Running on http://localhost:${port}`));
    })
        .catch((error) => {
        console.log(error);
        console.error("Mongodb Connection Error", error.message);
    });
}
else {
    console.log("cannot access the URL from environment");
}
