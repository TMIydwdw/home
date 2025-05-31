"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var deposit_enum_1 = require("@/modules/deposit/deposit.enum");
var otherDepositMethod_enum_1 = require("../otherDepositMethod/otherDepositMethod.enum");
var create = joi_1.default.object({
    amount: joi_1.default.number().positive().required(),
    type: (_a = joi_1.default.string()
        .trim())
        .valid.apply(_a, Object.values(otherDepositMethod_enum_1.OtherDepositMethodType)).required(),
});
var updateStatus = joi_1.default.object({
    status: joi_1.default.string()
        .trim()
        .valid(deposit_enum_1.DepositStatus.APPROVED, deposit_enum_1.DepositStatus.CANCELLED)
        .required(),
});
exports.default = { create: create, updateStatus: updateStatus };
