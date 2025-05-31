"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var activity_enum_1 = require("@/modules/activity/activity.enum");
var ActivitySchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: Object.values(activity_enum_1.ActivityCategory),
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(activity_enum_1.ActivityStatus),
        default: activity_enum_1.ActivityStatus.VISIBLE,
        trim: true,
    },
    forWho: {
        type: String,
        required: true,
        enum: Object.values(activity_enum_1.ActivityForWho),
        trim: true,
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
var ActivityModel = (0, mongoose_1.model)('Activity', ActivitySchema);
exports.default = ActivityModel;
