"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUser_1 = require("../../../adapters/data-access/repositories/userRepository/getUser");
const saveUser_1 = require("../../../adapters/data-access/repositories/userRepository/saveUser");
const errorHandling_1 = require("../../errors/errorHandling");
const generateToken_1 = require("../../shared/utilities/generateToken");
exports.default = {
    registerUser: (data, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const savedUser = yield (0, saveUser_1.saveUser)(data);
            const user = {
                _id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                mobile: savedUser.mobile,
            };
            if (savedUser) {
                (0, generateToken_1.generateToken)(savedUser._id, res);
            }
            return user;
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }),
    checkUserExist: (mobile) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingUser = yield getUser_1.getUser.getUserWithMobile(mobile);
            if (existingUser) {
                const user = {
                    _id: existingUser._id,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    mobile: existingUser.mobile,
                };
                return user;
            }
            else {
                return null;
            }
        }
        catch (error) { }
    }),
    checkUserExistWithMail: (mail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingUser = yield getUser_1.getUser.getUserWithMail(mail);
            if (existingUser) {
                const user = {
                    _id: existingUser._id,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    mobile: existingUser.mobile,
                };
                return user;
            }
            else {
                return null;
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }),
};
