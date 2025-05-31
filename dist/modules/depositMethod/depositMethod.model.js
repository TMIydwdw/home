"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var depositMethod_enum_1 = require("./depositMethod.enum");
var DepositMethodSchema = new mongoose_1.Schema({
    currency: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Currency',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    network: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(depositMethod_enum_1.DepositMethodStatus),
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
    autoUpdate: {
        type: Boolean,
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
var DepositMethodModel = (0, mongoose_1.model)('DepositMethod', DepositMethodSchema);
exports.default = DepositMethodModel;
