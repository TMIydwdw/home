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
var investment_enum_1 = require("@/modules/investment/investment.enum");
var transaction_enum_1 = require("@/modules/transaction/transaction.enum");
var notification_enum_1 = require("@/modules/notification/notification.enum");
var referral_enum_1 = require("@/modules/referral/referral.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var apiError_1 = require("@/core/apiError");
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var helpers_1 = __importDefault(require("@/utils/helpers"));
var investment_model_1 = __importDefault(require("@/modules/investment/investment.model"));
var InvestmentService = /** @class */ (function () {
    function InvestmentService(planService, userService, transactionService, notificationService, referralService) {
        this.planService = planService;
        this.userService = userService;
        this.transactionService = transactionService;
        this.notificationService = notificationService;
        this.referralService = referralService;
        this.investmentModel = investment_model_1.default;
        this.autoRunTimes = 0;
    }
    InvestmentService.prototype.fetch = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var investment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.investmentModel.findOne(filter)];
                    case 1:
                        investment = _a.sent();
                        if (!investment)
                            throw new apiError_1.NotFoundError('Investment not found');
                        return [2 /*return*/, investment];
                }
            });
        });
    };
    InvestmentService.prototype.create = function (planId, userId, amount, account, environment) {
        return __awaiter(this, void 0, void 0, function () {
            var plan, user, investment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.planService.fetch({ _id: planId })];
                    case 1:
                        plan = _a.sent();
                        if (!plan)
                            throw new apiError_1.NotFoundError('The selected miner no longer exist');
                        if (plan.minAmount > amount || plan.maxAmount < amount)
                            throw new apiError_1.BadRequestError("The amount allowed in this miner is between ".concat(helpers_1.default.toCurrency(plan.minAmount), " and ").concat(helpers_1.default.toCurrency(plan.maxAmount), "."));
                        return [4 /*yield*/, this.userService.fund({ _id: userId }, account, -amount)
                            // Investment Transaction Instance
                        ];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.investmentModel.create({
                                plan: plan,
                                user: user,
                                expectedRunTime: 1000 * 60 * 60 * 24 * plan.duration,
                                amount: amount,
                                balance: amount,
                                account: account,
                                environment: environment,
                                status: investment_enum_1.InvestmentStatus.RUNNING,
                                resumeTime: new Date(),
                                assets: plan.assets,
                            })
                            // Referral Transaction Instance
                        ];
                    case 3:
                        investment = _a.sent();
                        if (!(environment === user_enum_1.UserEnvironment.LIVE)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.referralService.create(referral_enum_1.ReferralTypes.INVESTMENT, user, investment.amount)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: 
                    // Transaction Transaction Instance
                    return [4 /*yield*/, this.transactionService.create(user, transaction_enum_1.TransactionTitle.INVESTMENT_PURCHASED, investment, amount, environment)
                        // Notification Transaction Instance
                    ];
                    case 6:
                        // Transaction Transaction Instance
                        _a.sent();
                        // Notification Transaction Instance
                        return [4 /*yield*/, this.notificationService.create("Your investment of ".concat(helpers_1.default.toCurrency(amount), " on the ").concat(plan.name, " plan is up and running"), notification_enum_1.NotificationTitle.INVESTMENT_PURCHASED, investment, notification_enum_1.NotificationForWho.USER, environment, user)
                            // Admin Notification Transaction Instance
                        ];
                    case 7:
                        // Notification Transaction Instance
                        _a.sent();
                        // Admin Notification Transaction Instance
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " just invested in the ").concat(plan.name, " plan with the sum of ").concat(helpers_1.default.toCurrency(amount), ", on his ").concat(environment, " account"), notification_enum_1.NotificationTitle.INVESTMENT_PURCHASED, investment, notification_enum_1.NotificationForWho.ADMIN, environment)];
                    case 8:
                        // Admin Notification Transaction Instance
                        _a.sent();
                        return [4 /*yield*/, investment.populate('user')];
                    case 9: return [4 /*yield*/, (_a.sent()).populate('assets')];
                    case 10: return [2 /*return*/, (_a.sent()).populate('plan')];
                }
            });
        });
    };
    InvestmentService.prototype.updateStatus = function (filter, status, sendNotice) {
        var _a;
        if (sendNotice === void 0) { sendNotice = true; }
        return __awaiter(this, void 0, void 0, function () {
            var investment, user, balance, account, runTime, notificationMessage, notificationTitle, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.investmentModel
                            .findOne(filter)
                            .populate('user')
                            .populate('plan')
                            .populate('assets')];
                    case 1:
                        investment = _c.sent();
                        if (!investment)
                            throw new apiError_1.NotFoundError('Investment not found');
                        investment.status = status;
                        if (!(status === investment_enum_1.InvestmentStatus.COMPLETED)) return [3 /*break*/, 6];
                        balance = ((((_a = investment.plan) === null || _a === void 0 ? void 0 : _a.potentialPercentageProfit) || 100) *
                            investment.amount) /
                            100 +
                            (investment.amount + investment.extraProfit);
                        investment.balance = balance;
                        account = investment.account === user_enum_1.UserAccount.DEMO_BALANCE
                            ? user_enum_1.UserAccount.DEMO_BALANCE
                            : user_enum_1.UserAccount.PROFIT;
                        return [4 /*yield*/, this.userService.fund({ _id: investment.user._id }, account, balance)
                            // Transaction Transaction Instance
                        ];
                    case 2:
                        user = _c.sent();
                        // Transaction Transaction Instance
                        return [4 /*yield*/, this.transactionService.create(user, transaction_enum_1.TransactionTitle.INVESTMENT_COMPLETED, investment, balance, investment.environment)
                            // Referral Transaction Instance
                        ];
                    case 3:
                        // Transaction Transaction Instance
                        _c.sent();
                        if (!(investment.environment === user_enum_1.UserEnvironment.LIVE)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.referralService.create(referral_enum_1.ReferralTypes.COMPLETED_PACKAGE_EARNINGS, user, balance - investment.amount)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (status === investment_enum_1.InvestmentStatus.SUSPENDED) {
                            runTime = new Date().getTime() - investment.resumeTime.getTime();
                            investment.runTime += runTime;
                            investment.resumeTime = new Date();
                        }
                        else if (status === investment_enum_1.InvestmentStatus.RUNNING) {
                            investment.resumeTime = new Date();
                        }
                        _c.label = 7;
                    case 7: return [4 /*yield*/, investment.save()];
                    case 8:
                        _c.sent();
                        if (!sendNotice) return [3 /*break*/, 13];
                        notificationMessage = void 0;
                        notificationTitle = void 0;
                        switch (status) {
                            case investment_enum_1.InvestmentStatus.RUNNING:
                                notificationMessage = 'is now running';
                                notificationTitle = notification_enum_1.NotificationTitle.INVESTMENT_RUNNING;
                                break;
                            case investment_enum_1.InvestmentStatus.SUSPENDED:
                                notificationMessage = 'has been suspended';
                                notificationTitle = notification_enum_1.NotificationTitle.INVESTMENT_SUSPENDED;
                                break;
                            case investment_enum_1.InvestmentStatus.COMPLETED:
                                notificationMessage = 'has been completed';
                                notificationTitle = notification_enum_1.NotificationTitle.INVESTMENT_COMPLETED;
                                break;
                        }
                        if (!(notificationMessage && notificationTitle)) return [3 /*break*/, 13];
                        if (!user) return [3 /*break*/, 9];
                        _b = user;
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.userService.fetch({ _id: investment.user._id })];
                    case 10:
                        _b = _c.sent();
                        _c.label = 11;
                    case 11:
                        user = _b;
                        return [4 /*yield*/, this.notificationService.create("Your investment package ".concat(notificationMessage), notificationTitle, investment, notification_enum_1.NotificationForWho.USER, investment.environment, user)];
                    case 12:
                        _c.sent();
                        _c.label = 13;
                    case 13: return [2 /*return*/, investment];
                }
            });
        });
    };
    InvestmentService.prototype.fund = function (filter, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var investment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.investmentModel
                            .findOne(filter)
                            .populate('user')
                            .populate('plan')
                            .populate('assets')];
                    case 1:
                        investment = _a.sent();
                        if (!investment)
                            throw new apiError_1.NotFoundError('Investment not found');
                        investment.extraProfit += amount;
                        return [4 /*yield*/, investment.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, investment];
                }
            });
        });
    };
    InvestmentService.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var investment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.investmentModel.findOne(filter)];
                    case 1:
                        investment = _a.sent();
                        if (!investment)
                            throw new apiError_1.NotFoundError('Investment not found');
                        return [4 /*yield*/, this.investmentModel.deleteOne({ _id: investment._id })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, investment];
                }
            });
        });
    };
    InvestmentService.prototype.fetchAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.investmentModel
                            .find(filter)
                            .sort({ createdAt: -1 })
                            .populate('user')
                            .populate('plan')
                            .populate('assets')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestmentService.prototype.autoRun = function (miniSeconds) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var investments, _i, investments_1, investment, runTime, timeRemaining, daysLeft, hoursLeft, minutesLeft, secondsLeft;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.autoRunTimes++;
                                console.log('Investment Auto Run Started...', this.autoRunTimes);
                                return [4 /*yield*/, this.investmentModel.find({
                                        status: investment_enum_1.InvestmentStatus.RUNNING,
                                    })];
                            case 1:
                                investments = _a.sent();
                                _i = 0, investments_1 = investments;
                                _a.label = 2;
                            case 2:
                                if (!(_i < investments_1.length)) return [3 /*break*/, 6];
                                investment = investments_1[_i];
                                runTime = investment.runTime +
                                    (new Date().getTime() - new Date(investment.resumeTime).getTime());
                                timeRemaining = investment.expectedRunTime - runTime;
                                if (!(timeRemaining <= 0)) return [3 /*break*/, 4];
                                return [4 /*yield*/, this.updateStatus({ _id: investment._id }, investment_enum_1.InvestmentStatus.COMPLETED)];
                            case 3:
                                _a.sent();
                                console.log("Investment ".concat(investment._id, " has been completed automatically"));
                                return [3 /*break*/, 5];
                            case 4:
                                daysLeft = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                                hoursLeft = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                minutesLeft = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                                secondsLeft = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                                console.log("Investment ".concat(investment._id, " has ").concat(daysLeft, " days, ").concat(hoursLeft, " hours, ").concat(minutesLeft, " minutes, ").concat(secondsLeft, " seconds left"));
                                _a.label = 5;
                            case 5:
                                _i++;
                                return [3 /*break*/, 2];
                            case 6:
                                this.autoRun(miniSeconds);
                                console.log('Investment Auto Run Finished...', this.autoRunTimes);
                                return [2 /*return*/];
                        }
                    });
                }); }, miniSeconds);
                return [2 /*return*/];
            });
        });
    };
    InvestmentService.prototype.count = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.investmentModel.count(filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestmentService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.PLAN_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __param(4, (0, typedi_1.Inject)(serviceToken_1.default.REFERRAL_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
    ], InvestmentService);
    return InvestmentService;
}());
exports.default = InvestmentService;
