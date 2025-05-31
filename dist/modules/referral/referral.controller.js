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
var user_enum_1 = require("../user/user.enum");
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var asyncHandler_1 = __importDefault(require("@/helpers/asyncHandler"));
var apiResponse_1 = require("@/core/apiResponse");
var routePermission_1 = __importDefault(require("@/helpers/routePermission"));
var baseController_1 = __importDefault(require("@/core/baseController"));
var ReferralController = /** @class */ (function (_super) {
    __extends(ReferralController, _super);
    function ReferralController(referralService) {
        var _this = _super.call(this) || this;
        _this.referralService = referralService;
        _this.path = '/referral';
        _this.routes = [
            [
                'get',
                "".concat(_this.path, "/earnings"),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.earnings(false).apply(void 0, params);
                },
            ],
            [
                'get',
                "".concat(_this.path),
                (0, routePermission_1.default)(user_enum_1.UserRole.USER),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.fetchAll(false).apply(void 0, params);
                },
            ],
            [
                'get',
                "/master".concat(_this.path, "/earnings/users"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.earnings(true).apply(void 0, params);
                },
            ],
            [
                'get',
                "/master".concat(_this.path, "/leaderboard"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.leaderboard.apply(_this, params);
                },
            ],
            [
                'get',
                "/master".concat(_this.path, "/users"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.fetchAll(true).apply(void 0, params);
                },
            ],
            [
                'delete',
                "/master".concat(_this.path, "/delete/:referralId"),
                (0, routePermission_1.default)(user_enum_1.UserRole.ADMIN),
                function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this.delete.apply(_this, params);
                },
            ],
        ];
        _this.fetchAll = function (byAdmin) {
            return (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var referrals;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!byAdmin) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.referralService.fetchAll({})];
                        case 1:
                            referrals = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.referralService.fetchAll({
                                referrer: req.user._id,
                            })];
                        case 3:
                            referrals = _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, new apiResponse_1.SuccessResponse('Referrals fetched successfully', {
                                referrals: referrals,
                            }).send(res)];
                    }
                });
            }); });
        };
        _this.earnings = function (byAdmin) {
            return (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var referralEarnings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!byAdmin) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.referralService.earnings({})];
                        case 1:
                            referralEarnings = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.referralService.earnings({
                                referrer: req.user._id,
                            })];
                        case 3:
                            referralEarnings = _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, new apiResponse_1.SuccessResponse('Referral earnings fetched successfully', {
                                referralEarnings: referralEarnings,
                            }).send(res)];
                    }
                });
            }); });
        };
        _this.leaderboard = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var referralLeaderboard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.referralService.leaderboard({})];
                    case 1:
                        referralLeaderboard = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Referral leaderboard fetched successfully', {
                                referralLeaderboard: referralLeaderboard,
                            }).send(res)];
                }
            });
        }); });
        _this.delete = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var referralId, referral;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        referralId = req.params.referralId;
                        return [4 /*yield*/, this.referralService.delete({ _id: referralId })];
                    case 1:
                        referral = _a.sent();
                        return [2 /*return*/, new apiResponse_1.SuccessResponse('Referral transcation deleted successfully', {
                                referral: referral,
                            }).send(res)];
                }
            });
        }); });
        _this.initializeRoutes();
        return _this;
    }
    ReferralController = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.REFERRAL_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], ReferralController);
    return ReferralController;
}(baseController_1.default));
exports.default = ReferralController;
