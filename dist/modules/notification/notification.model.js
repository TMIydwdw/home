"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var user_enum_1 = require("../user/user.enum");
var NotificationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
    },
    title: {
        type: String,
        required: true,
        // enum: Object.values(NotificationTitle),
        trim: true,
    },
    object: {
        type: Object,
        required: true,
    },
    forWho: {
        type: Number,
        required: true,
    },
    environment: {
        type: String,
        required: true,
        enum: Object.values(user_enum_1.UserEnvironment),
        trim: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret, options) {
            delete ret.__v;
        },
    },
});
var NotificationModel = (0, mongoose_1.model)('Notification', NotificationSchema);
exports.default = NotificationModel;
