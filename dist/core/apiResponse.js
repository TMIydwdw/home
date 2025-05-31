"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessCreatedResponse = exports.SuccessResponse = exports.InfoResponse = exports.InternalErrorResponse = exports.ForbiddenResponse = exports.UnauthorizedResponse = exports.RequestConflictResponse = exports.BadRequestResponse = exports.NotFoundResponse = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode["SUCCESS"] = "1000";
    StatusCode["INFO"] = "1001";
    StatusCode["WARNING"] = "1002";
    StatusCode["DANGER"] = "1003";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatus[ResponseStatus["SUCCESS_CREATED"] = 201] = "SUCCESS_CREATED";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["CONFLICT"] = 409] = "CONFLICT";
    ResponseStatus[ResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatus[ResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(ResponseStatus || (ResponseStatus = {}));
var ApiResponse = /** @class */ (function () {
    function ApiResponse(statusCode, status, message, description, data, errors, errorType) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        this.description = description;
        this.data = data;
        this.errors = errors;
        this.errorType = errorType;
    }
    ApiResponse.prototype.send = function (res) {
        return res.status(this.status).json({
            status: this.statusCode,
            message: this.message,
            description: this.description,
            data: this.data,
            errors: this.errors,
            errorType: this.errorType,
        });
    };
    return ApiResponse;
}());
var NotFoundResponse = /** @class */ (function (_super) {
    __extends(NotFoundResponse, _super);
    function NotFoundResponse(errorType, message, description, statusCode, errors) {
        return _super.call(this, statusCode || StatusCode.DANGER, ResponseStatus.NOT_FOUND, message, description, undefined, errors, errorType) || this;
    }
    return NotFoundResponse;
}(ApiResponse));
exports.NotFoundResponse = NotFoundResponse;
var BadRequestResponse = /** @class */ (function (_super) {
    __extends(BadRequestResponse, _super);
    function BadRequestResponse(errorType, message, description, statusCode, errors) {
        return _super.call(this, statusCode || StatusCode.DANGER, ResponseStatus.BAD_REQUEST, message, description, undefined, errors, errorType) || this;
    }
    return BadRequestResponse;
}(ApiResponse));
exports.BadRequestResponse = BadRequestResponse;
var RequestConflictResponse = /** @class */ (function (_super) {
    __extends(RequestConflictResponse, _super);
    function RequestConflictResponse(errorType, message, description, statusCode, errors) {
        return _super.call(this, statusCode || StatusCode.DANGER, ResponseStatus.CONFLICT, message, description, undefined, errors, errorType) || this;
    }
    return RequestConflictResponse;
}(ApiResponse));
exports.RequestConflictResponse = RequestConflictResponse;
var UnauthorizedResponse = /** @class */ (function (_super) {
    __extends(UnauthorizedResponse, _super);
    function UnauthorizedResponse(errorType, message, description, statusCode, errors) {
        return _super.call(this, statusCode || StatusCode.DANGER, ResponseStatus.UNAUTHORIZED, message, description, undefined, errors, errorType) || this;
    }
    return UnauthorizedResponse;
}(ApiResponse));
exports.UnauthorizedResponse = UnauthorizedResponse;
var ForbiddenResponse = /** @class */ (function (_super) {
    __extends(ForbiddenResponse, _super);
    function ForbiddenResponse(errorType, message, description, statusCode, errors) {
        return _super.call(this, statusCode || StatusCode.DANGER, ResponseStatus.FORBIDDEN, message, description, undefined, errors, errorType) || this;
    }
    return ForbiddenResponse;
}(ApiResponse));
exports.ForbiddenResponse = ForbiddenResponse;
var InternalErrorResponse = /** @class */ (function (_super) {
    __extends(InternalErrorResponse, _super);
    function InternalErrorResponse(errorType, message, description, statusCode, errors) {
        return _super.call(this, statusCode || StatusCode.DANGER, ResponseStatus.INTERNAL_ERROR, message, description, undefined, errors, errorType) || this;
    }
    return InternalErrorResponse;
}(ApiResponse));
exports.InternalErrorResponse = InternalErrorResponse;
var InfoResponse = /** @class */ (function (_super) {
    __extends(InfoResponse, _super);
    function InfoResponse(message, data, description, statusCode) {
        return _super.call(this, statusCode || StatusCode.INFO, ResponseStatus.SUCCESS, message, description, data) || this;
    }
    return InfoResponse;
}(ApiResponse));
exports.InfoResponse = InfoResponse;
var SuccessResponse = /** @class */ (function (_super) {
    __extends(SuccessResponse, _super);
    function SuccessResponse(message, data, description, statusCode) {
        return _super.call(this, statusCode || StatusCode.SUCCESS, ResponseStatus.SUCCESS, message, description, data) || this;
    }
    return SuccessResponse;
}(ApiResponse));
exports.SuccessResponse = SuccessResponse;
var SuccessCreatedResponse = /** @class */ (function (_super) {
    __extends(SuccessCreatedResponse, _super);
    function SuccessCreatedResponse(message, data, description, statusCode) {
        return _super.call(this, statusCode || StatusCode.SUCCESS, ResponseStatus.SUCCESS_CREATED, message, description, data) || this;
    }
    return SuccessCreatedResponse;
}(ApiResponse));
exports.SuccessCreatedResponse = SuccessCreatedResponse;
