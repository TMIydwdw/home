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
exports.MongooseCastError = exports.SchemaValidationError = exports.InvalidCsrfTokenError = exports.ForbiddenError = exports.NotFoundError = exports.BadRequestError = exports.RequestConflictError = exports.InternalError = exports.UnauthorizedError = exports.ApiError = exports.ErrorType = void 0;
var apiResponse_1 = require("./apiResponse");
var setup_1 = require("./../setup");
var ErrorType;
(function (ErrorType) {
    ErrorType["UNAUTHORIZED"] = "100";
    ErrorType["INTERNAL"] = "101";
    ErrorType["CONFLICT"] = "102";
    ErrorType["NOT_FOUND"] = "103";
    ErrorType["BAD_REQUEST"] = "104";
    ErrorType["FORBIDDEN"] = "105";
    ErrorType["INVALID_CSRF_ERROR"] = "106";
    ErrorType["SCHEMA_VALIDATION_TOKEN"] = "107";
    ErrorType["MONGOOSE_CAST_ERROR"] = "108";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(type, message, description, statusCode, errors) {
        if (message === void 0) { message = 'error'; }
        if (statusCode === void 0) { statusCode = apiResponse_1.StatusCode.DANGER; }
        var _this = _super.call(this, type) || this;
        _this.type = type;
        _this.message = message;
        _this.description = description;
        _this.statusCode = statusCode;
        _this.errors = errors;
        _this.name = 'ApiError';
        Object.setPrototypeOf(_this, ApiError.prototype);
        return _this;
    }
    ApiError.handle = function (err, res) {
        switch (err.type) {
            case ErrorType.UNAUTHORIZED:
                return new apiResponse_1.UnauthorizedResponse(err.type, err.message, err.description, err.statusCode, err.errors).send(res);
            case ErrorType.INTERNAL:
                return new apiResponse_1.InternalErrorResponse(err.type, err.message, err.description, err.statusCode, err.errors).send(res);
            case ErrorType.CONFLICT:
                return new apiResponse_1.RequestConflictResponse(err.type, err.message, err.description, err.statusCode, err.errors).send(res);
            case ErrorType.NOT_FOUND:
                return new apiResponse_1.NotFoundResponse(err.type, err.message, err.description, err.statusCode, err.errors).send(res);
            case ErrorType.BAD_REQUEST:
            case ErrorType.MONGOOSE_CAST_ERROR:
            case ErrorType.SCHEMA_VALIDATION_TOKEN:
                return new apiResponse_1.BadRequestResponse(err.type, err.message, err.description, err.statusCode, err.errors).send(res);
            case ErrorType.FORBIDDEN:
            case ErrorType.INVALID_CSRF_ERROR:
                return new apiResponse_1.ForbiddenResponse(err.type, err.message, err.description, err.statusCode, err.errors).send(res);
            default: {
                var message = 'Something wrong happened.';
                return new apiResponse_1.InternalErrorResponse(ErrorType.INTERNAL, message).send(res);
            }
        }
    };
    ApiError.notifyDeveloper = function (err) {
        if (err)
            console.log('name:', err.name);
        console.log(err);
        return setup_1.sendMailService.sendDeveloperErrorMail(err);
    };
    return ApiError;
}(Error));
exports.ApiError = ApiError;
// export class ServiceError extends Error {
//   public name = 'ServiceError'
//   public error: any
//   constructor(error: any, public message: string = 'error') {
//     let err = error
//     while (true) {
//       if (err instanceof ServiceError) err = err.error
//       else break
//     }
//     super(message)
//     this.error = err
//     Object.setPrototypeOf(this, ServiceError.prototype)
//   }
// }
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message, description, statusCode) {
        if (message === void 0) { message = 'Unauthorized'; }
        if (statusCode === void 0) { statusCode = apiResponse_1.StatusCode.DANGER; }
        var _this = _super.call(this, ErrorType.UNAUTHORIZED, message, description, statusCode) || this;
        _this.name = 'UnauthorizedError';
        Object.setPrototypeOf(_this, UnauthorizedError.prototype);
        return _this;
    }
    return UnauthorizedError;
}(ApiError));
exports.UnauthorizedError = UnauthorizedError;
var InternalError = /** @class */ (function (_super) {
    __extends(InternalError, _super);
    function InternalError(message, description, statusCode) {
        if (message === void 0) { message = 'Something went wrong, please try again later'; }
        if (statusCode === void 0) { statusCode = apiResponse_1.StatusCode.DANGER; }
        var _this = _super.call(this, ErrorType.INTERNAL, message, description, statusCode) || this;
        _this.name = 'InternalError';
        Object.setPrototypeOf(_this, InternalError.prototype);
        return _this;
    }
    return InternalError;
}(ApiError));
exports.InternalError = InternalError;
var RequestConflictError = /** @class */ (function (_super) {
    __extends(RequestConflictError, _super);
    function RequestConflictError(message, description, statusCode) {
        if (message === void 0) { message = 'Resource already exist'; }
        if (statusCode === void 0) { statusCode = apiResponse_1.StatusCode.DANGER; }
        var _this = _super.call(this, ErrorType.CONFLICT, message, description, statusCode) || this;
        _this.name = 'RequestConflictError';
        Object.setPrototypeOf(_this, RequestConflictError.prototype);
        return _this;
    }
    return RequestConflictError;
}(ApiError));
exports.RequestConflictError = RequestConflictError;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(message, description, statusCode) {
        if (message === void 0) { message = 'Invalid request'; }
        if (statusCode === void 0) { statusCode = apiResponse_1.StatusCode.DANGER; }
        var _this = _super.call(this, ErrorType.BAD_REQUEST, message, description, statusCode) || this;
        _this.name = 'BadRequestError';
        Object.setPrototypeOf(_this, BadRequestError.prototype);
        return _this;
    }
    return BadRequestError;
}(ApiError));
exports.BadRequestError = BadRequestError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message, description, statusCode) {
        if (message === void 0) { message = 'Resource not found'; }
        if (statusCode === void 0) { statusCode = apiResponse_1.StatusCode.DANGER; }
        var _this = _super.call(this, ErrorType.NOT_FOUND, message, description, statusCode) || this;
        _this.name = 'NotFoundError';
        Object.setPrototypeOf(_this, NotFoundError.prototype);
        return _this;
    }
    return NotFoundError;
}(ApiError));
exports.NotFoundError = NotFoundError;
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(message, description, statusCode) {
        if (message === void 0) { message = 'Permission denied'; }
        if (statusCode === void 0) { statusCode = apiResponse_1.StatusCode.DANGER; }
        var _this = _super.call(this, ErrorType.FORBIDDEN, message, description, statusCode) || this;
        _this.name = 'ForbiddenError';
        Object.setPrototypeOf(_this, ForbiddenError.prototype);
        return _this;
    }
    return ForbiddenError;
}(ApiError));
exports.ForbiddenError = ForbiddenError;
var InvalidCsrfTokenError = /** @class */ (function (_super) {
    __extends(InvalidCsrfTokenError, _super);
    function InvalidCsrfTokenError() {
        var _this = _super.call(this, ErrorType.INVALID_CSRF_ERROR, 'Invalid request token', undefined, apiResponse_1.StatusCode.DANGER) || this;
        _this.name = 'InvalidCsrfTokenError';
        Object.setPrototypeOf(_this, InvalidCsrfTokenError.prototype);
        return _this;
    }
    return InvalidCsrfTokenError;
}(ApiError));
exports.InvalidCsrfTokenError = InvalidCsrfTokenError;
var SchemaValidationError = /** @class */ (function (_super) {
    __extends(SchemaValidationError, _super);
    function SchemaValidationError(error) {
        var _this = this;
        var errors = [];
        error.details.forEach(function (err) {
            errors.push(err.message);
        });
        _this = _super.call(this, ErrorType.SCHEMA_VALIDATION_TOKEN, errors[0], undefined, apiResponse_1.StatusCode.DANGER, errors) || this;
        _this.name = 'SchemaValidationError';
        Object.setPrototypeOf(_this, SchemaValidationError.prototype);
        return _this;
    }
    return SchemaValidationError;
}(ApiError));
exports.SchemaValidationError = SchemaValidationError;
var MongooseCastError = /** @class */ (function (_super) {
    __extends(MongooseCastError, _super);
    function MongooseCastError(message) {
        if (message === void 0) { message = 'Invalid details, please check and try again'; }
        var _this = _super.call(this, ErrorType.MONGOOSE_CAST_ERROR, message, undefined, apiResponse_1.StatusCode.DANGER) || this;
        _this.name = 'MongooseCastError';
        Object.setPrototypeOf(_this, MongooseCastError.prototype);
        return _this;
    }
    return MongooseCastError;
}(ApiError));
exports.MongooseCastError = MongooseCastError;
