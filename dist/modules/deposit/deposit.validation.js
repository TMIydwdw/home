"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var deposit_enum_1 = require("@/modules/deposit/deposit.enum");
var create = joi_1.default.object({
    depositMethodId: joi_1.default.string().trim().required(),
    amount: joi_1.default.number().positive().required(),
});
var updateStatus = joi_1.default.object({
    status: joi_1.default.string()
        .trim()
        .valid(deposit_enum_1.DepositStatus.APPROVED, deposit_enum_1.DepositStatus.CANCELLED)
        .required(),
});
exports.default = { create: create, updateStatus: updateStatus };
