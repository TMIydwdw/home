"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var withdrawalMethod_enum_1 = require("./withdrawalMethod.enum");
var WithdrawalMethodSchema = new mongoose_1.Schema({
    currency: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Currency',
        required: true,
    },
    network: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(withdrawalMethod_enum_1.WithdrawalMethodStatus),
        trim: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    minWithdrawal: {
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
var WithdrawalMethodModel = (0, mongoose_1.model)('WithdrawalMethod', WithdrawalMethodSchema);
exports.default = WithdrawalMethodModel;
