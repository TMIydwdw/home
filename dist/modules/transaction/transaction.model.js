"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TransactionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    object: {
        type: Object,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    environment: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
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
var TransactionModel = (0, mongoose_1.model)('Transaction', TransactionSchema);
exports.default = TransactionModel;
