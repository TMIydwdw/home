"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var signal_enum_1 = require("@/modules/signal/signal.enum");
var SignalSchema = new mongoose_1.Schema({
    status: {
        type: String,
        required: true,
        enum: Object.values(signal_enum_1.SignalStatus),
        default: signal_enum_1.SignalStatus.ACTIVE,
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
    amount: {
        type: Number,
        required: true,
    },
    signalStrength: {
        type: Number,
        required: true,
    },
    dailyPercentageProfit: {
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
var SignalModel = (0, mongoose_1.model)('Signal', SignalSchema);
exports.default = SignalModel;
