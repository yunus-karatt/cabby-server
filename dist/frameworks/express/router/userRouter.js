"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const userAuthController_1 = __importDefault(require("../../../adapters/controllers/user/userAuthController"));
const userCabController_1 = __importDefault(require("../../../adapters/controllers/user/userCabController"));
const userRideController_1 = __importDefault(require("../../../adapters/controllers/user/userRideController"));
const userAuthMiddleware_1 = require("../middleware/userAuthMiddleware");
exports.userRoute = express_1.default.Router();
// userRoute.get('/profile',)
exports.userRoute.post("/userexist", userAuthController_1.default.isuserExist);
exports.userRoute.post("/register", userAuthController_1.default.registerUser);
exports.userRoute.post("/getuserbymail", userAuthController_1.default.checkUserWithMail);
exports.userRoute.post("/login", userAuthController_1.default.loginWithMobileController);
exports.userRoute.post("/logout", userAuthController_1.default.logoutController);
// cabs
exports.userRoute.get("/list-cabs", userAuthMiddleware_1.protectUser, userCabController_1.default.getCabs);
// Ride
exports.userRoute.get('/getQuickRideData/:id', userAuthMiddleware_1.protectUser, userRideController_1.default.getQuickRideData);
exports.userRoute.get('/get-scheduledride/:userId', userAuthMiddleware_1.protectUser, userRideController_1.default.getScheduledRideByUserId);
// payment
exports.userRoute.post('/payment', userAuthMiddleware_1.protectUser, userRideController_1.default.payment);
exports.userRoute.post('/paymentCapture', userAuthMiddleware_1.protectUser, userRideController_1.default.paymentCapture);
exports.userRoute.get('/getkey', userAuthMiddleware_1.protectUser, userRideController_1.default.getKey);
