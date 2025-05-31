"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var asset_enum_1 = require("../asset/asset.enum");
var PairSchema = new mongoose_1.Schema({
    assetType: {
        type: String,
        required: true,
        trim: true,
        enum: Object.values(asset_enum_1.AssetType),
    },
    baseAsset: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Asset',
        required: true,
    },
    quoteAsset: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Asset',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret, options) {
            delete ret.__v;
        },
    },
});
var PairModel = (0, mongoose_1.model)('Pair', PairSchema);
exports.default = PairModel;
