"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var plan_enum_1 = require("@/modules/plan/plan.enum");
var create = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    engine: joi_1.default.string().trim().required(),
    duration: joi_1.default.number().positive().required(),
    minAmount: joi_1.default.number().positive().required(),
    maxAmount: joi_1.default.number().positive().required(),
    dailyPercentageProfit: joi_1.default.number().positive().required(),
    description: joi_1.default.string().trim().required(),
    assets: joi_1.default.array().items(joi_1.default.string().trim()).min(1).unique().required(),
});
var update = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    engine: joi_1.default.string().trim().required(),
    duration: joi_1.default.number().positive().required(),
    minAmount: joi_1.default.number().positive().required(),
    maxAmount: joi_1.default.number().positive().required(),
    dailyPercentageProfit: joi_1.default.number().positive().required(),
    description: joi_1.default.string().trim().required(),
    assets: joi_1.default.array().items(joi_1.default.string().trim()).min(1).unique().required(),
});
var updateStatus = joi_1.default.object({
    status: (_a = joi_1.default.string()
        .trim())
        .valid.apply(_a, Object.values(plan_enum_1.PlanStatus)).required(),
});
exports.default = { create: create, update: update, updateStatus: updateStatus };
