"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var user_enum_1 = require("../user/user.enum");
var investment_enum_1 = require("./investment.enum");
var InvestmentSchema = new mongoose_1.Schema({
    plan: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Plan',
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
        enum: Object.values(user_enum_1.UserAccount),
        trim: true,
    },
    environment: {
        type: String,
        required: true,
        enum: Object.values(user_enum_1.UserEnvironment),
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(investment_enum_1.InvestmentStatus),
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    extraProfit: {
        type: Number,
        required: true,
        default: 0,
    },
    expectedRunTime: {
        type: Number,
        required: true,
    },
    runTime: {
        type: Number,
        required: true,
        default: 0,
    },
    resumeTime: {
        required: true,
        type: Date,
    },
    assets: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Asset',
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret, options) {
            delete ret.__v;
        },
    },
});
var InvestmentModel = (0, mongoose_1.model)('Investment', InvestmentSchema);
exports.default = InvestmentModel;
