"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var deposit_enum_1 = require("../deposit/deposit.enum");
var otherDepositMethod_enum_1 = require("../otherDepositMethod/otherDepositMethod.enum");
var OtherDepositSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(deposit_enum_1.DepositStatus),
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(otherDepositMethod_enum_1.OtherDepositMethodType),
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
var OtherDepositModel = (0, mongoose_1.model)('OtherDeposit', OtherDepositSchema);
exports.default = OtherDepositModel;
