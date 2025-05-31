"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var otherDepositMethod_enum_1 = require("./otherDepositMethod.enum");
var OtherDepositMethodSchema = new mongoose_1.Schema({
    status: {
        type: String,
        required: true,
        enum: Object.values(otherDepositMethod_enum_1.OtherDepositMethodStatus),
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(otherDepositMethod_enum_1.OtherDepositMethodType),
        trim: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    minDeposit: {
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
var OtherDepositMethodModel = (0, mongoose_1.model)('OtherDepositMethod', OtherDepositMethodSchema);
exports.default = OtherDepositMethodModel;
