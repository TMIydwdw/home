"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var funding_enum_1 = require("./funding.enum");
var FundingSchema = new mongoose_1.Schema({
    depositMethod: {
        type: mongoose_1.Types.ObjectId,
        ref: 'DepositMethod',
        required: true,
    },
    currency: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Currency',
        required: true,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(funding_enum_1.FundingStatus),
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    fee: {
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
var FundingModel = (0, mongoose_1.model)('Funding', FundingSchema);
exports.default = FundingModel;
