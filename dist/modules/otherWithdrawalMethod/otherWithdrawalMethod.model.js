"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var otherWithdrawalMethod_enum_1 = require("./otherWithdrawalMethod.enum");
var withdrawalMethod_enum_1 = require("../withdrawalMethod/withdrawalMethod.enum");
var OtherWithdrawalMethodSchema = new mongoose_1.Schema({
    status: {
        type: String,
        required: true,
        enum: Object.values(withdrawalMethod_enum_1.WithdrawalMethodStatus),
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(otherWithdrawalMethod_enum_1.OtherWithdrawalMethodType),
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
var OtherWithdrawalMethodModel = (0, mongoose_1.model)('OtherWithdrawalMethod', OtherWithdrawalMethodSchema);
exports.default = OtherWithdrawalMethodModel;
