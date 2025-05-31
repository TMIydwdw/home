"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var copyTrade_enum_1 = require("@/modules/copyTrade/copyTrade.enum");
var CopyTradeSchema = new mongoose_1.Schema({
    status: {
        type: String,
        required: true,
        enum: Object.values(copyTrade_enum_1.CopyTradeStatus),
        default: copyTrade_enum_1.CopyTradeStatus.ACTIVE,
        trim: true,
    },
    icon: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    minAmount: {
        type: Number,
        required: true,
    },
    maxAmount: {
        type: Number,
        required: true,
    },
    dailyPercentageProfit: {
        type: Number,
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
var CopyTradeModel = (0, mongoose_1.model)('CopyTrade', CopyTradeSchema);
exports.default = CopyTradeModel;
