"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CurrencySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    symbol: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    logo: {
        type: String,
        required: true,
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
var CurrencyModel = (0, mongoose_1.model)('Currency', CurrencySchema);
exports.default = CurrencyModel;
