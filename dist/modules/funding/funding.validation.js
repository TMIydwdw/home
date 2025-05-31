"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var funding_enum_1 = require("@/modules/funding/funding.enum");
var create = joi_1.default.object({
    depositMethodId: joi_1.default.string().trim().required(),
    amount: joi_1.default.number().positive().required(),
});
var updateStatus = joi_1.default.object({
    status: joi_1.default.string()
        .trim()
        .valid(funding_enum_1.FundingStatus.APPROVED, funding_enum_1.FundingStatus.CANCELLED)
        .required(),
});
exports.default = { create: create, updateStatus: updateStatus };
