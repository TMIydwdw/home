"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var withdrawal_enum_1 = require("../withdrawal/withdrawal.enum");
var otherWithdrawalMethod_enum_1 = require("../otherWithdrawalMethod/otherWithdrawalMethod.enum");
var OtherWithdrawalSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(withdrawal_enum_1.WithdrawalStatus),
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(otherWithdrawalMethod_enum_1.OtherWithdrawalMethodType),
        trim: true,
    },
    account: {
        type: String,
        required: true,
        trim: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    bankName: {
        type: String,
    },
    accountNumber: {
        type: String,
    },
    accountName: {
        type: String,
    },
    routingNumber: {
        type: String,
    },
    swiftCode: {
        type: String,
    },
    paypalEmail: {
        type: String,
    },
    cashAppTag: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret, options) {
            delete ret.__v;
        },
    },
});
var OtherWithdrawalModel = (0, mongoose_1.model)('OtherWithdrawal', OtherWithdrawalSchema);
exports.default = OtherWithdrawalModel;
