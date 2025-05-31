"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (asyncMiddleware) {
    return function (req, res, next) {
        asyncMiddleware(req, res, next).catch(next);
    };
});
