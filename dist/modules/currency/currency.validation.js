"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var create = joi_1.default.object({
    name: joi_1.default.string().trim().required().lowercase(),
    symbol: joi_1.default.string().trim().required().lowercase(),
    logo: joi_1.default.string().trim().required(),
});
exports.default = { create: create };
