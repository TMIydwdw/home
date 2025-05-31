"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TransferSettingsSchema = new mongoose_1.Schema({
    approval: {
        type: Boolean,
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
var TransferSettingsModel = (0, mongoose_1.model)('TransferSettings', TransferSettingsSchema);
exports.default = TransferSettingsModel;
