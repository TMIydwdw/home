"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var referral_enum_1 = require("./referral.enum");
var ReferralSchema = new mongoose_1.Schema({
    rate: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(referral_enum_1.ReferralTypes),
        trim: true,
    },
    referrer: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
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
var ReferralModel = (0, mongoose_1.model)('Referral', ReferralSchema);
exports.default = ReferralModel;
