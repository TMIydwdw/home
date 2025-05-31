"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TransferSchema = new mongoose_1.Schema({
    fromUser: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    toUser: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    account: {
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
var TransferModel = (0, mongoose_1.model)('Transfer', TransferSchema);
exports.default = TransferModel;
