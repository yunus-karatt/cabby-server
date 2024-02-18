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
    getUserWithMobile: ({ mobile }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userModel_1.default.findOne({ mobile });
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
    }),
    getAllUserWithLimit: (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userModel_1.default.find().skip((skip - 1) * limit).limit(limit);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getUserCount: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userModel_1.default.find().countDocuments();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getUserBySearch: (query, page) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const regexQuery = { $or: [
                    { firstName: { $regex: new RegExp(query, 'i') } },
                    { lastName: { $regex: new RegExp(query, 'i') } }
                ] };
            const count = yield userModel_1.default.find(regexQuery).countDocuments();
            const user = yield userModel_1.default.find(regexQuery).skip((page - 1) * 10).limit(10);
            return { count, user };
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
