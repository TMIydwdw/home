"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var user_enum_1 = require("../user/user.enum");
var copy_enum_1 = require("./copy.enum");
var CopySchema = new mongoose_1.Schema({
    copyTrade: {
        type: mongoose_1.Types.ObjectId,
        ref: 'CopyTrade',
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
        enum: Object.values(copy_enum_1.CopyStatus),
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
    runTime: {
        type: Number,
        required: true,
        default: 0,
    },
    resumeTime: {
        required: true,
        type: Date,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret, options) {
            delete ret.__v;
        },
    },
});
var CopyModel = (0, mongoose_1.model)('Copy', CopySchema);
exports.default = CopyModel;
