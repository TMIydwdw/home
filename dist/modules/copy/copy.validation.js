"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var copy_enum_1 = require("@/modules/copy/copy.enum");
var user_enum_1 = require("../user/user.enum");
var create = joi_1.default.object({
    copyTradeId: joi_1.default.string().trim().required(),
    amount: joi_1.default.number().positive().required(),
    account: joi_1.default.string()
        .trim()
        .valid(user_enum_1.UserAccount.MAIN_BALANCE, user_enum_1.UserAccount.REFERRAL_BALANCE, user_enum_1.UserAccount.BONUS_BALANCE)
        .required(),
});
var createDemo = joi_1.default.object({
    copyTradeId: joi_1.default.string().trim().required(),
    amount: joi_1.default.number().positive().required(),
    account: joi_1.default.string().trim().valid(user_enum_1.UserAccount.DEMO_BALANCE).required(),
});
var updateStatus = joi_1.default.object({
    status: (_a = joi_1.default.string()
        .trim())
        .valid.apply(_a, Object.values(copy_enum_1.CopyStatus)).required(),
});
var fund = joi_1.default.object({
    amount: joi_1.default.number().positive().required(),
});
var refill = joi_1.default.object({
    gas: joi_1.default.number().positive().required(),
});
exports.default = { create: create, updateStatus: updateStatus, fund: fund, refill: refill, createDemo: createDemo };
