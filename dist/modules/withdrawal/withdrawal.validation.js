"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var withdrawal_enum_1 = require("@/modules/withdrawal/withdrawal.enum");
var user_enum_1 = require("../user/user.enum");
var create = joi_1.default.object({
    withdrawalMethodId: joi_1.default.string().trim().required(),
    address: joi_1.default.string().trim().required(),
    account: joi_1.default.string()
        .trim()
        .valid(user_enum_1.UserAccount.PROFIT, user_enum_1.UserAccount.BONUS_BALANCE)
        .required(),
    amount: joi_1.default.number().positive().required(),
});
var updateStatus = joi_1.default.object({
    status: joi_1.default.string()
        .trim()
        .valid(withdrawal_enum_1.WithdrawalStatus.APPROVED, withdrawal_enum_1.WithdrawalStatus.CANCELLED)
        .required(),
});
exports.default = { create: create, updateStatus: updateStatus };
