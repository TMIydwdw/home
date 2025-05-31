"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var withdrawalMethod_enum_1 = require("./withdrawalMethod.enum");
var create = joi_1.default.object({
    currencyId: joi_1.default.string().trim().required(),
    network: joi_1.default.string().trim().required(),
    fee: joi_1.default.number().min(0).required(),
    minWithdrawal: joi_1.default.number().positive().required(),
});
var update = joi_1.default.object({
    currencyId: joi_1.default.string().trim().required(),
    network: joi_1.default.string().trim().required(),
    fee: joi_1.default.number().min(0).required(),
    minWithdrawal: joi_1.default.number().positive().required(),
});
var updateStatus = joi_1.default.object({
    status: (_a = joi_1.default.string()
        .trim())
        .valid.apply(_a, Object.values(withdrawalMethod_enum_1.WithdrawalMethodStatus)).required(),
});
exports.default = { create: create, update: update, updateStatus: updateStatus };
