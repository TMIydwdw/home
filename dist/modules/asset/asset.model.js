"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var asset_enum_1 = require("./asset.enum");
var AssetSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    symbol: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    logo: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: Object.values(asset_enum_1.AssetType),
        default: asset_enum_1.AssetType.CRYPTO,
        trim: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret, options) {
            delete ret.__v;
        },
    },
});
var AssetModel = (0, mongoose_1.model)('Asset', AssetSchema);
exports.default = AssetModel;
