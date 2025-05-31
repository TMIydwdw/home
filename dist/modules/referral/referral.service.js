"use strict";
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
var referral_model_1 = __importDefault(require("@/modules/referral/referral.model"));
var notification_enum_1 = require("@/modules/notification/notification.enum");
var transaction_enum_1 = require("@/modules/transaction/transaction.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var mongoose_1 = require("mongoose");
var apiError_1 = require("@/core/apiError");
var helpers_1 = __importDefault(require("@/utils/helpers"));
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var ReferralService = /** @class */ (function () {
    function ReferralService(notificationService, referralSettingsService, userService, transactionService) {
        this.notificationService = notificationService;
        this.referralSettingsService = referralSettingsService;
        this.userService = userService;
        this.transactionService = transactionService;
        this.referralModel = referral_model_1.default;
    }
    ReferralService.prototype.findAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.referralModel
                            .find(filter)
                            .populate('user')
                            .populate('referrer')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReferralService.prototype._calcAmountEarn = function (type, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var referralSettings, rate, earn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.referralSettingsService.fetch({})];
                    case 1:
                        referralSettings = _a.sent();
                        if (!referralSettings)
                            throw new apiError_1.NotFoundError('Referral settings not found');
                        rate = referralSettings[type];
                        earn = (rate / 100) * amount;
                        return [2 /*return*/, { earn: earn, rate: rate }];
                }
            });
        });
    };
    ReferralService.prototype.create = function (type, user, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var userReferrerId, _a, earn, rate, userReferrer, error_1, referral, message, title, forWho, adminMessage;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userReferrerId = user.referred;
                        if (!userReferrerId || !(0, mongoose_1.isValidObjectId)(userReferrerId))
                            return [2 /*return*/];
                        return [4 /*yield*/, this._calcAmountEarn(type, amount)];
                    case 1:
                        _a = _b.sent(), earn = _a.earn, rate = _a.rate;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.userService.fund({ _id: userReferrerId }, user_enum_1.UserAccount.REFERRAL_BALANCE, earn)];
                    case 3:
                        userReferrer = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        if (!(error_1 instanceof apiError_1.NotFoundError))
                            throw error_1;
                        return [3 /*break*/, 5];
                    case 5:
                        if (!userReferrer)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.referralModel.create({
                                rate: rate,
                                type: type,
                                referrer: userReferrer,
                                user: user,
                                amount: earn,
                            })];
                    case 6:
                        referral = _b.sent();
                        message = "Your referral account has been credited with ".concat(helpers_1.default.toCurrency(earn), ", from ").concat(user.username, " ").concat(helpers_1.default.fromCamelToTitleCase(type), " of ").concat(helpers_1.default.toCurrency(amount));
                        title = notification_enum_1.NotificationTitle.REFERRAL_EARNINGS;
                        forWho = notification_enum_1.NotificationForWho.USER;
                        return [4 /*yield*/, this.notificationService.create(message, title, referral, forWho, user_enum_1.UserEnvironment.LIVE, userReferrer)];
                    case 7:
                        _b.sent();
                        adminMessage = "".concat(userReferrer.username, " referral account has been credited with ").concat(helpers_1.default.toCurrency(earn), ", from ").concat(user.username, " ").concat(type, " of ").concat(helpers_1.default.toCurrency(amount));
                        return [4 /*yield*/, this.notificationService.create(adminMessage, title, referral, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, this.transactionService.create(userReferrer, transaction_enum_1.TransactionTitle.REFERRAL_EARNINGS, referral, earn, user_enum_1.UserEnvironment.LIVE)];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, referral.populate('user')];
                    case 10: return [2 /*return*/, (_b.sent()).populate('referrer')];
                }
            });
        });
    };
    ReferralService.prototype.fetchAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findAll(filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReferralService.prototype.earnings = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var referralTransactions, referralEarnings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findAll(filter)];
                    case 1:
                        referralTransactions = _a.sent();
                        referralEarnings = [];
                        referralTransactions.forEach(function (transaction) {
                            var index = referralEarnings.findIndex(function (obj) { return obj.user._id.toString() === transaction.user._id.toString(); });
                            if (index !== -1) {
                                referralEarnings[index].earnings += transaction.amount;
                            }
                            else {
                                referralEarnings.push({
                                    user: transaction.user,
                                    earnings: transaction.amount,
                                    referrer: transaction.referrer,
                                });
                            }
                        });
                        return [2 /*return*/, referralEarnings];
                }
            });
        });
    };
    ReferralService.prototype.leaderboard = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var referralTransactions, referralLeaderboard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findAll(filter)];
                    case 1:
                        referralTransactions = _a.sent();
                        referralLeaderboard = [];
                        referralTransactions.forEach(function (transaction) {
                            var index = referralLeaderboard.findIndex(function (obj) { return obj.user._id.toString() === transaction.referrer._id.toString(); });
                            if (index !== -1) {
                                referralLeaderboard[index].earnings += transaction.amount;
                            }
                            else {
                                referralLeaderboard.push({
                                    user: transaction.referrer,
                                    earnings: transaction.amount,
                                });
                            }
                        });
                        return [2 /*return*/, referralLeaderboard];
                }
            });
        });
    };
    ReferralService.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var referral;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.referralModel
                            .findOne(filter)
                            .populate('user')
                            .populate('referrer')];
                    case 1:
                        referral = _a.sent();
                        if (!referral)
                            throw new apiError_1.NotFoundError('Referral transcation not found');
                        return [4 /*yield*/, referral.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, referral];
                }
            });
        });
    };
    ReferralService.prototype.count = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.referralModel.count(filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReferralService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.REFERRAL_SETTINGS_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], ReferralService);
    return ReferralService;
}());
exports.default = ReferralService;
