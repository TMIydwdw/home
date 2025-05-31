"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var asset_enum_1 = require("./asset.enum");
var create = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    symbol: joi_1.default.string().trim().required(),
    logo: joi_1.default.string().trim().required(),
    type: (_a = joi_1.default.string()
        .trim())
        .valid.apply(_a, Object.values(asset_enum_1.AssetType)).required(),
});
var update = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    symbol: joi_1.default.string().trim().required(),
    logo: joi_1.default.string().trim().required(),
    type: (_b = joi_1.default.string()
        .trim())
        .valid.apply(_b, Object.values(asset_enum_1.AssetType)).required(),
});
exports.default = { create: create, update: update };
