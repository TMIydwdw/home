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
var user_enum_1 = require("@/modules/user/user.enum");
var user_validation_1 = __importDefault(require("@/modules/user/user.validation"));
var asyncHandler_1 = __importDefault(require("@/helpers/asyncHandler"));
var apiResponse_1 = require("@/core/apiResponse");
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var routePermission_1 = __importDefault(require("@/helpers/routePermission"));
var schemaValidator_1 = __importDefault(require("@/helpers/schemaValidator"));
var baseController_1 = __importDefault(require("@/core/baseController"));
var imageFile_service_1 = __importDefault(require("../imageFile/imageFile.service"));
var apiError_1 = require("@/core/apiError");
var user_service_1 = __importDefault(require("./user.service"));
var imageUploader_1 = __importDefault(require("../imageUploader/imageUploader"));
var notification_enum_1 = require("../notification/notification.enum");
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    function UserController(userService, notificationService) {
        var _this = _super.call(this) || this;
        _this.userService = userService;
        _this.notificationService = notificationService;
        _this.path = '/users';
        _this.imageUploader = new imageUploader_1.default();
        _this.routes = [
            [
                'put',
                "".concat(_this.path, "/update-profile"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                (0, schemaValidator_1.default)(user_validation_1.default.updateProfile),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updateProfile(false).apply(void 0, params);
                },
            ],
            [
                'post',
                "".concat(_this.path, "/generate-code"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                (0, schemaValidator_1.default)(user_validation_1.default.generateCode),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.generateCode.apply(_this, params);
                },
            ],
            [
                'post',
                "".concat(_this.path, "/request-card"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.requestCard.apply(_this, params);
                },
            ],
            [
                'post',
                "".concat(_this.path, "/link-card"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                (0, schemaValidator_1.default)(user_validation_1.default.linkCard),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.linkCard.apply(_this, params);
                },
            ],
            [
                'post',
                "".concat(_this.path, "/request-upgrade"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.requestUpgrade.apply(_this, params);
                },
            ],
            [
                'post',
                "".concat(_this.path, "/update-card-limit/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                (0, schemaValidator_1.default)(user_validation_1.default.updateCard),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updateCardLimit.apply(_this, params);
                },
            ],
            [
                'post',
                "".concat(_this.path, "/update-card-pin/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                (0, schemaValidator_1.default)(user_validation_1.default.updateCard),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updateCardPin.apply(_this, params);
                },
            ],
            [
                'post',
                "".concat(_this.path, "/update-card-status/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                (0, schemaValidator_1.default)(user_validation_1.default.updateCard),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updateCardStatus.apply(_this, params);
                },
            ],
            [
                'post',
                "".concat(_this.path, "/physical-card/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                (0, schemaValidator_1.default)(user_validation_1.default.physicalCard),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.physicalCard.apply(_this, params);
                },
            ],
            [
                'patch',
                "".concat(_this.path, "/boost-signal"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                (0, schemaValidator_1.default)(user_validation_1.default.boostSignal),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.boostSignal(user_enum_1.UserEnvironment.LIVE).apply(void 0, params);
                },
            ],
            [
                'put',
                "".concat(_this.path, "/start-mining"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                (0, schemaValidator_1.default)(user_validation_1.default.startMining),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.startMining.apply(_this, params);
                },
            ],
            [
                'put',
                "".concat(_this.path, "/upload-kyc"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                _this.imageUploader.setNames([{ name: 'kyc', maxCount: 1 }]),
                (0, schemaValidator_1.default)(user_validation_1.default.uploadKyc),
                _this.imageUploader.resize(['kyc'], user_service_1.default.kycImageSizes),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.uploadKyc.apply(_this, params);
                },
            ],
            // [
            //   'put',
            //   `${this.path}/update-profile-images`,
            //   routePermission(UserRole.USER),
            //   ImageFileService.validate([{ name: 'profile' }, { name: 'cover' }]),
            //   ImageFileService.upload([
            //     {
            //       name: 'profile',
            //       resize: UserService.profileImageSizes,
            //     },
            //     { name: 'cover', resize: UserService.coverImageSizes },
            //   ]),
            //   (req, res, next) => {
            //     res.send({})
            //   },
            //   // (...params) => this.updateProfileImages(false)(...params),
            // ],
            [
                'get',
                "".concat(_this.path, "/referred-users"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.getReferredUsers(false).apply(void 0, params);
                },
            ],
            [
                'get',
                "/master".concat(_this.path),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.fetchAll.apply(_this, params);
                },
            ],
            [
                'put',
                "/master".concat(_this.path, "/update-mining/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                (0, schemaValidator_1.default)(user_validation_1.default.updateMining),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updateMining.apply(_this, params);
                },
            ],
            [
                'patch',
                "/master".concat(_this.path, "/update-mining-status/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                (0, schemaValidator_1.default)(user_validation_1.default.updateMiningStatus),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updateMiningStatus.apply(_this, params);
                },
            ],
            [
                'patch',
                "/master".concat(_this.path, "/fund-mining/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                (0, schemaValidator_1.default)(user_validation_1.default.fundMining),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.fundMining.apply(_this, params);
                },
            ],
            [
                'put',
                "/master".concat(_this.path, "/withdrawal/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                (0, schemaValidator_1.default)(user_validation_1.default.withdrawal),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.withdrawal.apply(_this, params);
                },
            ],
            [
                'patch',
                "/master".concat(_this.path, "/fund/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                (0, schemaValidator_1.default)(user_validation_1.default.fundUser),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.fundUser.apply(_this, params);
                },
            ],
            [
                'put',
                "/master".concat(_this.path, "/update-profile/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                (0, schemaValidator_1.default)(user_validation_1.default.updateProfile),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updateProfile(true).apply(void 0, params);
                },
            ],
            [
                'patch',
                "/master".concat(_this.path, "/update-email/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                (0, schemaValidator_1.default)(user_validation_1.default.updateEmail),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updateEmail(true).apply(void 0, params);
                },
            ],
            [
                'patch',
                "/master".concat(_this.path, "/update-status/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                (0, schemaValidator_1.default)(user_validation_1.default.updateStatus),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updateStatus.apply(_this, params);
                },
            ],
            [
                'patch',
                "/master".concat(_this.path, "/update-kyc-status/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                (0, schemaValidator_1.default)(user_validation_1.default.updateKycStatus),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updateKycStatus.apply(_this, params);
                },
            ],
            [
                'patch',
                "/master".concat(_this.path, "/update-card/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                (0, schemaValidator_1.default)(user_validation_1.default.updateCard),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.updateCard.apply(_this, params);
                },
            ],
            [
                'patch',
                "/master".concat(_this.path, "/verify-email/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.verifyEmail.apply(_this, params);
                },
            ],
            [
                'delete',
                "/master".concat(_this.path, "/delete/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.deleteUser.apply(_this, params);
                },
            ],
            [
                'get',
                "/master".concat(_this.path, "/referred-users"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.getReferredUsers(true).apply(void 0, params);
                },
            ],
            [
                'post',
                "/master".concat(_this.path, "/send-email/:userId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                (0, schemaValidator_1.default)(user_validation_1.default.sendEmail),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.sendEmail.apply(_this, params);
                },
            ],
        ];
        _this.fetchAll = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.fetchAll({})];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Users fetched successfully', { users: users }).send(res)];
                }
            });
        }); });
        _this.updateProfile = function (byAdmin) {
            if (byAdmin === void 0) { byAdmin = false; }
            return (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var userId, _a, name, username, phone, currency, user;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = byAdmin ? req.params.userId : req.user._id;
                            _a = req.body, name = _a.name, username = _a.username, phone = _a.phone, currency = _a.currency;
                            return [4 /*yield*/, this.userService.updateProfile({ _id: userId }, name, username, phone, currency, byAdmin)];
                        case 1:
                            user = _b.sent();
                            return [2 /*return*/, new apiResponse_1.SuccessResponse('Profile updated successfully', { user: user }).send(res)];
                    }
                });
            }); });
        };
        _this.updateProfileImages = function (isAdmin) {
            if (isAdmin === void 0) { isAdmin = false; }
            return (0, asyncHandler_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var profileImage, coverImage, userId, _a, profile, cover, responce, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            userId = void 0;
                            _a = req.body, profile = _a.profile, cover = _a.cover;
                            profileImage = profile && profile[0].name;
                            coverImage = cover && cover[0].name;
                            if (isAdmin) {
                                userId = req.params.userId;
                                if (!userId)
                                    throw new apiError_1.NotFoundError('User not found');
                            }
                            else {
                                if (!req.user)
                                    throw new apiError_1.NotFoundError('User not found');
                                userId = req.user._id;
                            }
                            return [4 /*yield*/, this.userService.updateProfileImages(userId, profileImage, coverImage)];
                        case 1:
                            responce = _b.sent();
                            res.status(200).json(responce);
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _b.sent();
                            if (profileImage)
                                imageFile_service_1.default.delete('profile', profileImage);
                            if (coverImage)
                                imageFile_service_1.default.delete('cover', coverImage);
                            next(new apiError_1.InternalError(err_1.message, undefined, err_1.status));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        };
        _this.uploadKyc = (0, asyncHandler_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var kycImage, _a, type, kyc, userId, user, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, type = _a.type, kyc = _a.kyc;
                        if (!kyc)
                            throw new apiError_1.BadRequestError('Image document is required');
                        kycImage = kyc && kyc[0].name;
                        if (!req.user)
                            throw new apiError_1.NotFoundError('User not found');
                        userId = req.user._id;
                        return [4 /*yield*/, this.userService.uploadKyc({ _id: userId }, type, kycImage)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Kyc uploaded successfully', { user: user }).send(res)];
                    case 2:
                        err_2 = _b.sent();
                        if (kycImage)
                            this.imageUploader.delete('kyc', kycImage, user_service_1.default.kycImageSizes);
                        next(new apiError_1.InternalError(err_2.message, undefined, err_2.status));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        _this.updateKycStatus = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, level, userId, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, status = _a.status, level = _a.level;
                        userId = req.params.userId;
                        return [4 /*yield*/, this.userService.updateKycStatus({ _id: userId }, status, level)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Status updated successfully', { user: user }).send(res)];
                }
            });
        }); });
        _this.getUpdateCard = function (body, params) { return __awaiter(_this, void 0, void 0, function () {
            var cardName, cardNumber, cardExpiry, cardCvv, cardPin, cardStatus, 
            // cardBalance,
            cardLimit, cardLinkingMessage, cardWalletCoin, cardWalletNetwork, cardWalletAddress, cardVisibility, userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cardName = body.cardName, cardNumber = body.cardNumber, cardExpiry = body.cardExpiry, cardCvv = body.cardCvv, cardPin = body.cardPin, cardStatus = body.cardStatus, cardLimit = body.cardLimit, cardLinkingMessage = body.cardLinkingMessage, cardWalletCoin = body.cardWalletCoin, cardWalletNetwork = body.cardWalletNetwork, cardWalletAddress = body.cardWalletAddress, cardVisibility = body.cardVisibility;
                        userId = params.userId;
                        return [4 /*yield*/, this.userService.updateCard({ _id: userId }, cardName, cardNumber, cardExpiry, cardCvv, cardPin, cardStatus, 
                            // cardBalance,
                            cardLimit, cardLinkingMessage, cardWalletCoin, cardWalletNetwork, cardWalletAddress, cardVisibility)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        }); };
        _this.updateCard = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUpdateCard(req.body, req.params)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Card updated successfully', { user: user }).send(res)];
                }
            });
        }); });
        _this.updateCardLimit = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUpdateCard(req.body, req.params)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " has updated the card limit"), 'Card Limit Update', user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Card Limit updated successfully', {
                                user: user,
                            }).send(res)];
                }
            });
        }); });
        _this.updateCardPin = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUpdateCard(req.body, req.params)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " has changed the card pin"), 'Card Pin Changed', user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Card Pin updated successfully', {
                                user: user,
                            }).send(res)];
                }
            });
        }); });
        _this.updateCardStatus = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUpdateCard(req.body, req.params)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " has changed the card status"), 'Card Status Changed', user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Card Status updated successfully', {
                                user: user,
                            }).send(res)];
                }
            });
        }); });
        _this.physicalCard = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, cardAddress, cardCity, cardState, cardCountry, cardZip, userId, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, cardAddress = _a.cardAddress, cardCity = _a.cardCity, cardState = _a.cardState, cardCountry = _a.cardCountry, cardZip = _a.cardZip;
                        userId = req.params.userId;
                        return [4 /*yield*/, this.userService.physicalCard({ _id: userId }, cardAddress, cardCity, cardState, cardCountry, cardZip)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Card requested successfully', { user: user }).send(res)];
                }
            });
        }); });
        _this.linkCard = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.user)
                            throw new apiError_1.NotFoundError('User not found');
                        userId = req.user._id;
                        return [4 /*yield*/, this.userService.linkCard({ _id: userId }, req.body.pin)];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, new apiResponse_1.InfoResponse(message, {}).send(res)];
                }
            });
        }); });
        _this.boostSignal = function (environment) {
            return (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, account, signalId, userId, user;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = req.body, account = _a.account, signalId = _a.signalId;
                            userId = req.user._id;
                            return [4 /*yield*/, this.userService.boostSignal(signalId, userId, account, environment)];
                        case 1:
                            user = _b.sent();
                            return [2 /*return*/, new apiResponse_1.SuccessResponse('Signal boosted successfully', {
                                    user: user,
                                }).send(res)];
                    }
                });
            }); });
        };
        _this.updateEmail = function (byAdmin) {
            return (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var userId, email, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = byAdmin ? req.params.userId : req.user._id;
                            email = req.body.email;
                            return [4 /*yield*/, this.userService.updateEmail({ _id: userId }, email)];
                        case 1:
                            user = _a.sent();
                            return [2 /*return*/, new apiResponse_1.SuccessResponse('Email updated successfully', { user: user }).send(res)];
                    }
                });
            }); });
        };
        _this.updateStatus = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var status, userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = req.body.status;
                        userId = req.params.userId;
                        return [4 /*yield*/, this.userService.updateStatus({ _id: userId }, status)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Status updated successfully', { user: user }).send(res)];
                }
            });
        }); });
        _this.generateCode = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var coin, userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coin = req.body.coin;
                        if (!req.user)
                            throw new apiError_1.NotFoundError('User not found');
                        userId = req.user._id;
                        return [4 /*yield*/, this.userService.generateCode({ _id: userId }, coin)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Your request is processing', { user: user }).send(res)];
                }
            });
        }); });
        _this.requestCard = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.user)
                            throw new apiError_1.NotFoundError('User not found');
                        userId = req.user._id;
                        return [4 /*yield*/, this.userService.requestCard({ _id: userId })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Your request is processing', { user: user }).send(res)];
                }
            });
        }); });
        _this.requestUpgrade = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.user)
                            throw new apiError_1.NotFoundError('User not found');
                        userId = req.user._id;
                        return [4 /*yield*/, this.userService.requestUpgrade({ _id: userId })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Your request is processing', { user: user }).send(res)];
                }
            });
        }); });
        _this.deleteUser = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userId;
                        return [4 /*yield*/, this.userService.delete({ _id: userId })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('User deleted successfully', { user: user }).send(res)];
                }
            });
        }); });
        _this.verifyEmail = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userId;
                        return [4 /*yield*/, this.userService.verifyEmail({ _id: userId })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('User email verified successfully', {
                                user: user,
                            }).send(res)];
                }
            });
        }); });
        _this.fundUser = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, _a, account, amount, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = req.params.userId;
                        _a = req.body, account = _a.account, amount = _a.amount;
                        return [4 /*yield*/, this.userService.fund({ _id: userId }, account, amount)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse("User ".concat(amount > 0 ? 'credited' : 'debited', " successfully"), { user: user }).send(res)];
                }
            });
        }); });
        _this.getReferredUsers = function (byAdmin) {
            if (byAdmin === void 0) { byAdmin = false; }
            return (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var users;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!byAdmin) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.userService.fetchAll({})];
                        case 1:
                            users = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.userService.fetchAllReferrals({
                                referred: req.user._id,
                            })];
                        case 3:
                            users = _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, new apiResponse_1.SuccessResponse('Users fetched successfully', { users: users }).send(res)];
                    }
                });
            }); });
        };
        _this.sendEmail = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, _a, subject, heading, content, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = req.params.userId;
                        _a = req.body, subject = _a.subject, heading = _a.heading, content = _a.content;
                        return [4 /*yield*/, this.userService.sendEmail({ _id: userId }, subject, heading, content)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Email successfully sent', { user: user }).send(res)];
                }
            });
        }); });
        _this.startMining = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, _a, planId, account, amount, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = req.user._id;
                        _a = req.body, planId = _a.planId, account = _a.account, amount = _a.amount;
                        return [4 /*yield*/, this.userService.startMining({ _id: userId }, planId, account, amount)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Mining activated successfully', {
                                user: user,
                            }).send(res)];
                }
            });
        }); });
        _this.updateMining = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, _a, miningInvested, miningDailyReturn, miningSignal, miningTotalRound, miningRound, miningAddedBalance, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = req.params.userId;
                        _a = req.body, miningInvested = _a.miningInvested, miningDailyReturn = _a.miningDailyReturn, miningSignal = _a.miningSignal, miningTotalRound = _a.miningTotalRound, miningRound = _a.miningRound, miningAddedBalance = _a.miningAddedBalance;
                        return [4 /*yield*/, this.userService.updateMining({ _id: userId }, miningInvested, miningDailyReturn, miningSignal, miningTotalRound, miningRound, miningAddedBalance)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Mining updated successfully', {
                                user: user,
                            }).send(res)];
                }
            });
        }); });
        _this.updateMiningStatus = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, status, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userId;
                        status = req.body.status;
                        return [4 /*yield*/, this.userService.updateMiningStatus({ _id: userId }, status)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Mining status updated successfully', {
                                user: user,
                            }).send(res)];
                }
            });
        }); });
        _this.fundMining = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, amount, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userId;
                        amount = req.body.amount;
                        return [4 /*yield*/, this.userService.fundMining({ _id: userId }, amount)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Mining funded successfully', {
                                user: user,
                            }).send(res)];
                }
            });
        }); });
        _this.withdrawal = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, _a, withdrawalTokenEnabled, withdrawalToken, withdrawalLock, withdrawalLockMessage, withdrawalMinReferral, withdrawalMinReferralBalance, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = req.params.userId;
                        _a = req.body, withdrawalTokenEnabled = _a.withdrawalTokenEnabled, withdrawalToken = _a.withdrawalToken, withdrawalLock = _a.withdrawalLock, withdrawalLockMessage = _a.withdrawalLockMessage, withdrawalMinReferral = _a.withdrawalMinReferral, withdrawalMinReferralBalance = _a.withdrawalMinReferralBalance;
                        return [4 /*yield*/, this.userService.withdrawal({ _id: userId }, withdrawalTokenEnabled, withdrawalToken, withdrawalLock, withdrawalLockMessage, withdrawalMinReferral, withdrawalMinReferralBalance)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Withdrawal details updated successfully', {
                                user: user,
                            }).send(res)];
                }
            });
        }); });
        _this.initializeRoutes();
        _this.userService.autoRun(1000 * 60 * 10);
        return _this;
    }
    UserController = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __metadata("design:paramtypes", [Object, Object])
    ], UserController);
    return UserController;
}(baseController_1.default));
exports.default = UserController;
