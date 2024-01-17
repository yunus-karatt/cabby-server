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
const userRegistrationUseCase_1 = __importDefault(require("../../../business/useCase/userUseCase/userRegistrationUseCase"));
exports.default = {
    isuserExist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield userRegistrationUseCase_1.default.checkUserExist(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    registerUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return res.json(yield userRegistrationUseCase_1.default.registerUser(req.body, res));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    checkUserWithMail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { mail } = req.body;
            res.json(yield userRegistrationUseCase_1.default.checkUserExistWithMail(mail));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
