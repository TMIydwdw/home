"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var create = joi_1.default.object({
    deposit: joi_1.default.number().positive().required(),
    stake: joi_1.default.number().positive().required(),
    winnings: joi_1.default.number().positive().required(),
    investment: joi_1.default.number().positive().required(),
    completedPackageEarnings: joi_1.default.number().positive().required(),
});
var update = joi_1.default.object({
    deposit: joi_1.default.number().positive().required(),
    stake: joi_1.default.number().positive().required(),
    winnings: joi_1.default.number().positive().required(),
    investment: joi_1.default.number().positive().required(),
    completedPackageEarnings: joi_1.default.number().positive().required(),
});
exports.default = { create: create, update: update };
