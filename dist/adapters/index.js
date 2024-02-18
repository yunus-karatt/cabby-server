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
const driverRouter_1 = require("../frameworks/express/router/driverRouter");
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("../frameworks/express/middleware/errorMiddleware");
const adminRouter_1 = require("../frameworks/express/router/adminRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_1 = require("../frameworks/socket/socket");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const reminderCroneJob_1 = require("../frameworks/croneJob/reminderCroneJob");
dotenv.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
app.use((0, cors_1.default)({ origin: "*", credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
}));
app.use('/api', userRouter_1.userRoute);
app.use('/api/driver', driverRouter_1.driverRoutes);
app.use('/api/admin', adminRouter_1.adminRoutes);
(0, socket_1.socketIOServer)(server);
if (MONGO_URL) {
    (0, mongoDB_1.default)(MONGO_URL)
        .then(() => {
        server.listen(port, () => console.log(`Server Running on http://localhost:${port}`));
        (0, reminderCroneJob_1.startReminderCronJob)();
    })
        .catch((error) => {
        console.log(error);
        console.error("Mongodb Connection Error", error.message);
    });
}
else {
    console.log("cannot access the URL from environment");
}
app.use(errorMiddleware_1.errorHandler);
app.use(errorMiddleware_1.notFound);
