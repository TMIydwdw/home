"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var withdrawal_enum_1 = require("../withdrawal/withdrawal.enum");
var create = joi_1.default.object({});
var updateStatus = joi_1.default.object({
    status: (_a = joi_1.default.string()
        .trim())
        .valid.apply(_a, Object.values(withdrawal_enum_1.WithdrawalStatus)).required(),
});
exports.default = { create: create, updateStatus: updateStatus };
