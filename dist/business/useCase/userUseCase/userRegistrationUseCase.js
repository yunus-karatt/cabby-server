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
const saveUser_1 = require("../../../adapters/data-access/repositories/userRepository/saveUser");
const errorHandling_1 = require("../../errors/errorHandling");
exports.default = {
    registerUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(data);
            const savedUser = yield (0, saveUser_1.saveUser)(data);
            return true;
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    })
};
