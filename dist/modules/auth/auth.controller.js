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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var auth_validation_1 = __importDefault(require("@/modules/auth/auth.validation"));
var user_enum_1 = require("@/modules/user/user.enum");
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var config_constants_1 = require("../config/config.constants");
var asyncHandler_1 = __importDefault(require("@/helpers/asyncHandler"));
var apiResponse_1 = require("@/core/apiResponse");
var schemaValidator_1 = __importDefault(require("@/helpers/schemaValidator"));
var routePermission_1 = __importDefault(require("@/helpers/routePermission"));
var baseController_1 = __importDefault(require("@/core/baseController"));
var AuthController = /** @class */ (function (_super) {
    __extends(AuthController, _super);
    function AuthController(authService) {
        var _this = _super.call(this) || this;
        _this.authService = authService;
        _this.path = '/authentication';
        _this.routes = [
            [
                'post',
                "".concat(_this.path, "/register"),
                (0, schemaValidator_1.default)(auth_validation_1.default.register),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.register.apply(_this, params);
                },
            ],
            [
                'post',
                "".concat(_this.path, "/login"),
                (0, schemaValidator_1.default)(auth_validation_1.default.login),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.login.apply(_this, params);
                },
            ],
            [
                'get',
                "".concat(_this.path, "/user"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.user.apply(_this, params);
                },
            ],
            [
                'patch',
                "".concat(_this.path, "/update-password"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                (0, schemaValidator_1.default)(auth_validation_1.default.updatePassword),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updatePassword(false).apply(void 0, params);
                },
            ],
            [
                'post',
                "".concat(_this.path, "/forget-password"),
                (0, schemaValidator_1.default)(auth_validation_1.default.forgetPassword),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.forgetPassword.apply(_this, params);
                },
            ],
            [
                'patch',
                "".concat(_this.path, "/reset-password"),
                (0, schemaValidator_1.default)(auth_validation_1.default.resetPassword),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.resetPassword.apply(_this, params);
                },
            ],
            [
                'patch',
                "".concat(_this.path, "/verify-email"),
                (0, schemaValidator_1.default)(auth_validation_1.default.verifyEmail),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.verifyEmail.apply(_this, params);
                },
            ],
            [
                'patch',
                "/master".concat(_this.path, "/update-password/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                (0, schemaValidator_1.default)(auth_validation_1.default.updateUserPassword),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updatePassword(true).apply(void 0, params);
                },
            ],
        ];
        _this.register = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name, email, username, phone, country, currency, password, invite, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, username = _a.username, phone = _a.phone, country = _a.country, currency = _a.currency, password = _a.password, invite = _a.invite;
                        return [4 /*yield*/, this.authService.register(name, email, username, phone, country, currency, password, user_enum_1.UserRole.USER, user_enum_1.UserStatus.ACTIVE, config_constants_1.SiteConstants.mainBalance, config_constants_1.SiteConstants.referralBalance, config_constants_1.SiteConstants.demoBalance, config_constants_1.SiteConstants.bonusBalance, invite)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse(
                            // @ts-ignore
                            response.message || 'Login successfully', response, '', 
                            // @ts-ignore
                            response.message ? apiResponse_1.StatusCode.INFO : apiResponse_1.StatusCode.SUCCESS).send(res)];
                }
            });
        }); });
        _this.login = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, account, password, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, account = _a.account, password = _a.password;
                        return [4 /*yield*/, this.authService.login({ $or: [{ username: account }, { email: account }] }, password)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse(
                            // @ts-ignore
                            response.message || 'Login successfully', response, '', 
                            // @ts-ignore
                            response.message ? apiResponse_1.StatusCode.INFO : apiResponse_1.StatusCode.SUCCESS).send(res)];
                }
            });
        }); });
        _this.user = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new apiResponse_1.SuccessResponse('', { user: req.user }).send(res)];
            });
        }); });
        _this.updatePassword = function (byAdmin) {
            if (byAdmin === void 0) { byAdmin = false; }
            return (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var user, password;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            password = req.body.password;
                            if (!byAdmin) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.authService.updatePassword({ _id: req.params.userId }, password)];
                        case 1:
                            user = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.authService.updatePassword({ _id: req.user._id }, password, req.body.oldPassword)];
                        case 3:
                            user = _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, new apiResponse_1.SuccessResponse('Password updated successfully', {
                                user: user,
                            }).send(res)];
                    }
                });
            }); });
        };
        _this.forgetPassword = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var account, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        account = req.body.account;
                        return [4 /*yield*/, this.authService.forgetPassword({
                                $or: [{ username: account }, { email: account }],
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('A reset password link has been sent to your email address', { response: response }, undefined, apiResponse_1.StatusCode.INFO).send(res)];
                }
            });
        }); });
        _this.resetPassword = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, password, key, verifyToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, password = _a.password, key = _a.key, verifyToken = _a.verifyToken;
                        return [4 /*yield*/, this.authService.resetPassword(key, verifyToken, password)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Password updated successfully').send(res)];
                }
            });
        }); });
        _this.verifyEmail = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, key, verifyToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, key = _a.key, verifyToken = _a.verifyToken;
                        return [4 /*yield*/, this.authService.verifyEmail(key, verifyToken)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Email successfully verified').send(res)];
                }
            });
        }); });
        _this.initializeRoutes();
        return _this;
    }
    AuthController = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.AUTH_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], AuthController);
    return AuthController;
}(baseController_1.default));
exports.default = AuthController;
