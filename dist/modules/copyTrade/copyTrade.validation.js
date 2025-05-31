"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var copyTrade_enum_1 = require("@/modules/copyTrade/copyTrade.enum");
var create = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    minAmount: joi_1.default.number().positive().required(),
    maxAmount: joi_1.default.number().positive().required(),
    dailyPercentageProfit: joi_1.default.number().positive().required(),
});
var update = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    minAmount: joi_1.default.number().positive().required(),
    maxAmount: joi_1.default.number().positive().required(),
    dailyPercentageProfit: joi_1.default.number().positive().required(),
});
var updateStatus = joi_1.default.object({
    status: (_a = joi_1.default.string()
        .trim())
        .valid.apply(_a, Object.values(copyTrade_enum_1.CopyTradeStatus)).required(),
});
exports.default = { create: create, update: update, updateStatus: updateStatus };
