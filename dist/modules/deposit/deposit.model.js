"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var deposit_enum_1 = require("./deposit.enum");
var DepositSchema = new mongoose_1.Schema({
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
        enum: Object.values(deposit_enum_1.DepositStatus),
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
var DepositModel = (0, mongoose_1.model)('Deposit', DepositSchema);
exports.default = DepositModel;
