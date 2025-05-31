"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var WithdrawalSchema = new mongoose_1.Schema({
    withdrawalMethod: {
        type: mongoose_1.Types.ObjectId,
        ref: 'WithdrawalMethod',
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
    account: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
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
var WithdrawalModel = (0, mongoose_1.model)('Withdrawal', WithdrawalSchema);
exports.default = WithdrawalModel;
