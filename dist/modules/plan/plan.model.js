"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var plan_enum_1 = require("@/modules/plan/plan.enum");
var mongoose_2 = require("mongoose");
var PlanSchema = new mongoose_1.Schema({
    status: {
        type: String,
        required: true,
        enum: Object.values(plan_enum_1.PlanStatus),
        default: plan_enum_1.PlanStatus.ACTIVE,
        trim: true,
    },
    icon: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    engine: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    minAmount: {
        type: Number,
        required: true,
    },
    maxAmount: {
        type: Number,
        required: true,
    },
    dailyPercentageProfit: {
        type: Number,
        required: true,
    },
    potentialPercentageProfit: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    assets: [
        {
            type: mongoose_2.Types.ObjectId,
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
var PlanModel = (0, mongoose_1.model)('Plan', PlanSchema);
exports.default = PlanModel;
