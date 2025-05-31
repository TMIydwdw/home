"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var create = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    host: joi_1.default.string().trim().required(),
    port: joi_1.default.number().positive().required(),
    tls: joi_1.default.boolean().required(),
    secure: joi_1.default.boolean().required(),
    username: joi_1.default.string().trim().required(),
    password: joi_1.default.string().trim().required(),
});
exports.default = { create: create };
