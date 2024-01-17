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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
exports.getUser = {
    getUserWithMobile: ({ number }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userModel_1.default.findOne({ mobile: number });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getUserWithMail: (mail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userModel_1.default.findOne({ email: mail });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getUserWithId: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userModel_1.default.findOne({ _id: id });
        }
        catch (error) {
            console.log(error);
        }
    })
};
