"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var update = joi_1.default.object({
    approval: joi_1.default.boolean().required(),
    fee: joi_1.default.number().min(0).required(),
});
exports.default = { update: update };
