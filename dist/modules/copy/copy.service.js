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
var copy_enum_1 = require("@/modules/copy/copy.enum");
var transaction_enum_1 = require("@/modules/transaction/transaction.enum");
var notification_enum_1 = require("@/modules/notification/notification.enum");
var referral_enum_1 = require("@/modules/referral/referral.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var apiError_1 = require("@/core/apiError");
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var helpers_1 = __importDefault(require("@/utils/helpers"));
var copy_model_1 = __importDefault(require("@/modules/copy/copy.model"));
var CopyService = /** @class */ (function () {
    function CopyService(copyTradeService, userService, transactionService, notificationService, referralService) {
        this.copyTradeService = copyTradeService;
        this.userService = userService;
        this.transactionService = transactionService;
        this.notificationService = notificationService;
        this.referralService = referralService;
        this.copyModel = copy_model_1.default;
        this.autoRunTimes = 0;
    }
    CopyService.prototype.fetch = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var copy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.copyModel.findOne(filter)];
                    case 1:
                        copy = _a.sent();
                        if (!copy)
                            throw new apiError_1.NotFoundError('Copy not found');
                        return [2 /*return*/, copy];
                }
            });
        });
    };
    CopyService.prototype.create = function (copyTradeId, userId, amount, account, environment) {
        return __awaiter(this, void 0, void 0, function () {
            var copyTrade, user, copy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.copyTradeService.fetch({ _id: copyTradeId })];
                    case 1:
                        copyTrade = _a.sent();
                        if (!copyTrade)
                            throw new apiError_1.NotFoundError('The selected trader no longer exist');
                        if (copyTrade.minAmount > amount || copyTrade.maxAmount < amount)
                            throw new apiError_1.BadRequestError("The amount allowed in this trader is between ".concat(helpers_1.default.toCurrency(copyTrade.minAmount), " and ").concat(helpers_1.default.toCurrency(copyTrade.maxAmount), "."));
                        return [4 /*yield*/, this.userService.fund({ _id: userId }, account, -amount)
                            // Copy Transaction Instance
                        ];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.copyModel.create({
                                copyTrade: copyTrade,
                                user: user,
                                amount: amount,
                                balance: amount,
                                account: account,
                                environment: environment,
                                status: copy_enum_1.CopyStatus.RUNNING,
                                resumeTime: new Date(),
                            })
                            // Referral Transaction Instance
                        ];
                    case 3:
                        copy = _a.sent();
                        if (!(environment === user_enum_1.UserEnvironment.LIVE)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.referralService.create(referral_enum_1.ReferralTypes.INVESTMENT, user, copy.amount)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: 
                    // Transaction Transaction Instance
                    return [4 /*yield*/, this.transactionService.create(user, transaction_enum_1.TransactionTitle.COPY_PURCHASED, copy, amount, environment)
                        // Notification Transaction Instance
                    ];
                    case 6:
                        // Transaction Transaction Instance
                        _a.sent();
                        // Notification Transaction Instance
                        return [4 /*yield*/, this.notificationService.create("Your copy of ".concat(helpers_1.default.toCurrency(amount), " on the ").concat(copyTrade.name, " copyTrade is up and running"), notification_enum_1.NotificationTitle.COPY_PURCHASED, copy, notification_enum_1.NotificationForWho.USER, environment, user)
                            // Admin Notification Transaction Instance
                        ];
                    case 7:
                        // Notification Transaction Instance
                        _a.sent();
                        // Admin Notification Transaction Instance
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " just invested in the ").concat(copyTrade.name, " copyTrade with the sum of ").concat(helpers_1.default.toCurrency(amount), ", on his ").concat(environment, " account"), notification_enum_1.NotificationTitle.COPY_PURCHASED, copy, notification_enum_1.NotificationForWho.ADMIN, environment)];
                    case 8:
                        // Admin Notification Transaction Instance
                        _a.sent();
                        return [4 /*yield*/, copy.populate('user')];
                    case 9: return [4 /*yield*/, (_a.sent()).populate('copyTrade')];
                    case 10: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CopyService.prototype.updateStatus = function (filter, status, sendNotice) {
        var _a;
        if (sendNotice === void 0) { sendNotice = true; }
        return __awaiter(this, void 0, void 0, function () {
            var copy, user, daysRan, balance, account, runTime;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.copyModel
                            .findOne(filter)
                            .populate('user')
                            .populate('copyTrade')];
                    case 1:
                        copy = _b.sent();
                        if (!copy)
                            throw new apiError_1.NotFoundError('Copy not found');
                        copy.status = status;
                        if (!(status === copy_enum_1.CopyStatus.COMPLETED)) return [3 /*break*/, 6];
                        daysRan = ((copy.runTime + new Date().getTime() - copy.resumeTime.getTime()) /
                            1000) *
                            60 *
                            60 *
                            24;
                        balance = ((((_a = copy.copyTrade) === null || _a === void 0 ? void 0 : _a.dailyPercentageProfit) || 100) *
                            daysRan *
                            copy.amount) /
                            100 +
                            (copy.amount + copy.extraProfit);
                        copy.balance = balance;
                        account = copy.account === user_enum_1.UserAccount.DEMO_BALANCE
                            ? user_enum_1.UserAccount.DEMO_BALANCE
                            : user_enum_1.UserAccount.PROFIT;
                        return [4 /*yield*/, this.userService.fund({ _id: copy.user._id }, account, balance)
                            // Transaction Transaction Instance
                        ];
                    case 2:
                        user = _b.sent();
                        // Transaction Transaction Instance
                        return [4 /*yield*/, this.transactionService.create(user, transaction_enum_1.TransactionTitle.COPY_COMPLETED, copy, balance, copy.environment)
                            // Referral Transaction Instance
                        ];
                    case 3:
                        // Transaction Transaction Instance
                        _b.sent();
                        if (!(copy.environment === user_enum_1.UserEnvironment.LIVE)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.referralService.create(referral_enum_1.ReferralTypes.COMPLETED_PACKAGE_EARNINGS, user, balance - copy.amount)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (status === copy_enum_1.CopyStatus.SUSPENDED) {
                            runTime = new Date().getTime() - copy.resumeTime.getTime();
                            copy.runTime += runTime;
                            copy.resumeTime = new Date();
                        }
                        else if (status === copy_enum_1.CopyStatus.RUNNING) {
                            copy.resumeTime = new Date();
                        }
                        _b.label = 7;
                    case 7: return [4 /*yield*/, copy.save()
                        // if (sendNotice) {
                        //   let notificationMessage
                        //   let notificationTitle
                        //   switch (status) {
                        //     case CopyStatus.RUNNING:
                        //       notificationMessage = 'is now running'
                        //       notificationTitle = NotificationTitle.COPY_RUNNING
                        //       break
                        //     case CopyStatus.SUSPENDED:
                        //       notificationMessage = 'has been suspended'
                        //       notificationTitle = NotificationTitle.COPY_SUSPENDED
                        //       break
                        //     case CopyStatus.COMPLETED:
                        //       notificationMessage = 'has been completed'
                        //       notificationTitle = NotificationTitle.COPY_COMPLETED
                        //       break
                        //   }
                        //   // Notification Transaction Instance
                        //   if (notificationMessage && notificationTitle) {
                        //     user = user
                        //       ? user
                        //       : await this.userService.fetch({ _id: copy.user._id })
                        //     await this.notificationService.create(
                        //       `Your copy package ${notificationMessage}`,
                        //       notificationTitle,
                        //       copy,
                        //       NotificationForWho.USER,
                        //       copy.environment,
                        //       user
                        //     )
                        //   }
                        // }
                    ];
                    case 8:
                        _b.sent();
                        // if (sendNotice) {
                        //   let notificationMessage
                        //   let notificationTitle
                        //   switch (status) {
                        //     case CopyStatus.RUNNING:
                        //       notificationMessage = 'is now running'
                        //       notificationTitle = NotificationTitle.COPY_RUNNING
                        //       break
                        //     case CopyStatus.SUSPENDED:
                        //       notificationMessage = 'has been suspended'
                        //       notificationTitle = NotificationTitle.COPY_SUSPENDED
                        //       break
                        //     case CopyStatus.COMPLETED:
                        //       notificationMessage = 'has been completed'
                        //       notificationTitle = NotificationTitle.COPY_COMPLETED
                        //       break
                        //   }
                        //   // Notification Transaction Instance
                        //   if (notificationMessage && notificationTitle) {
                        //     user = user
                        //       ? user
                        //       : await this.userService.fetch({ _id: copy.user._id })
                        //     await this.notificationService.create(
                        //       `Your copy package ${notificationMessage}`,
                        //       notificationTitle,
                        //       copy,
                        //       NotificationForWho.USER,
                        //       copy.environment,
                        //       user
                        //     )
                        //   }
                        // }
                        return [2 /*return*/, copy];
                }
            });
        });
    };
    CopyService.prototype.fund = function (filter, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var copy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.copyModel
                            .findOne(filter)
                            .populate('user')
                            .populate('copyTrade')];
                    case 1:
                        copy = _a.sent();
                        if (!copy)
                            throw new apiError_1.NotFoundError('Copy not found');
                        copy.extraProfit += amount;
                        return [4 /*yield*/, copy.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, copy];
                }
            });
        });
    };
    CopyService.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var copy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.copyModel.findOne(filter)];
                    case 1:
                        copy = _a.sent();
                        if (!copy)
                            throw new apiError_1.NotFoundError('Copy not found');
                        return [4 /*yield*/, this.copyModel.deleteOne({ _id: copy._id })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, copy];
                }
            });
        });
    };
    CopyService.prototype.fetchAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.copyModel
                            .find(filter)
                            .sort({ createdAt: -1 })
                            .populate('user')
                            .populate('copyTrade')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CopyService.prototype.count = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.copyModel.count(filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CopyService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.COPY_TRADE_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __param(4, (0, typedi_1.Inject)(serviceToken_1.default.REFERRAL_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
    ], CopyService);
    return CopyService;
}());
exports.default = CopyService;
