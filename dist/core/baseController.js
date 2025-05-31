"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var BaseController = /** @class */ (function () {
    function BaseController() {
        this.router = (0, express_1.Router)();
        this.routes = [];
    }
    BaseController.prototype.initializeRoutes = function () {
        var _this = this;
        this.routes.forEach(function (_a) {
            var _b;
            var method = _a[0], path = _a[1], middlewares = _a.slice(2);
            (_b = _this.router)[method].apply(_b, __spreadArray([path], middlewares, false));
        });
    };
    return BaseController;
}());
exports.default = BaseController;
