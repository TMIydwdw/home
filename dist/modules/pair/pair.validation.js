"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var asset_enum_1 = require("../asset/asset.enum");
var create = joi_1.default.object({
    assetType: (_a = joi_1.default.string()
        .trim())
        .valid.apply(_a, Object.values(asset_enum_1.AssetType)).required(),
    baseAssetId: joi_1.default.string().trim().required(),
    quoteAssetId: joi_1.default.string().trim().required(),
});
var update = joi_1.default.object({
    assetType: (_b = joi_1.default.string()
        .trim())
        .valid.apply(_b, Object.values(asset_enum_1.AssetType)).required(),
    baseAssetId: joi_1.default.string().trim().required(),
    quoteAssetId: joi_1.default.string().trim().required(),
});
exports.default = { create: create, update: update };
