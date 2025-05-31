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
var funding_enum_1 = require("@/modules/funding/funding.enum");
var transaction_enum_1 = require("@/modules/transaction/transaction.enum");
var notification_enum_1 = require("@/modules/notification/notification.enum");
var referral_enum_1 = require("@/modules/referral/referral.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var apiError_1 = require("@/core/apiError");
var helpers_1 = __importDefault(require("@/utils/helpers"));
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var depositMethod_enum_1 = require("../depositMethod/depositMethod.enum");
var funding_model_1 = __importDefault(require("@/modules/funding/funding.model"));
var FundingService = /** @class */ (function () {
    function FundingService(depositMethodService, userService, transactionService, referralService, notificationService) {
        this.depositMethodService = depositMethodService;
        this.userService = userService;
        this.transactionService = transactionService;
        this.referralService = referralService;
        this.notificationService = notificationService;
        this.fundingModel = funding_model_1.default;
    }
    FundingService.prototype.create = function (depositMethodId, userId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var depositMethod, user, funding;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositMethodService.fetch({
                            _id: depositMethodId,
                            status: depositMethod_enum_1.DepositMethodStatus.ENABLED,
                        })];
                    case 1:
                        depositMethod = _a.sent();
                        if (depositMethod.minDeposit > amount)
                            throw new apiError_1.BadRequestError('Amount is lower than the min funding of the selected funding method');
                        return [4 /*yield*/, this.userService.fetch({ _id: userId })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.fundingModel.create({
                                depositMethod: depositMethod,
                                currency: depositMethod.currency,
                                user: user,
                                amount: amount,
                                fee: depositMethod.fee,
                                status: funding_enum_1.FundingStatus.PENDING,
                            })];
                    case 3:
                        funding = _a.sent();
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " just made a funding request of ").concat(helpers_1.default.toCurrency(amount), " awaiting for your approval"), notification_enum_1.NotificationTitle.FUNDING_MADE, user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, funding.populate('user')];
                    case 5: return [4 /*yield*/, (_a.sent()).populate('depositMethod')];
                    case 6: return [2 /*return*/, (_a.sent()).populate('currency')];
                }
            });
        });
    };
    FundingService.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var funding;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fundingModel.findOne(filter)];
                    case 1:
                        funding = _a.sent();
                        if (!funding)
                            throw new apiError_1.NotFoundError('Funding not found');
                        return [4 /*yield*/, funding.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, funding];
                }
            });
        });
    };
    FundingService.prototype.updateStatus = function (filter, status) {
        return __awaiter(this, void 0, void 0, function () {
            var funding, oldStatus, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fundingModel
                            .findOne(filter)
                            .populate('user')
                            .populate('depositMethod')
                            .populate('currency')];
                    case 1:
                        funding = _a.sent();
                        if (!funding)
                            throw new apiError_1.NotFoundError('Funding not found');
                        oldStatus = funding.status;
                        if (oldStatus !== funding_enum_1.FundingStatus.PENDING)
                            throw new apiError_1.BadRequestError('Funding as already been settled');
                        funding.status = status;
                        return [4 /*yield*/, funding.save()];
                    case 2:
                        _a.sent();
                        if (!(status === funding_enum_1.FundingStatus.APPROVED)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.userService.fund({ _id: funding.user._id }, user_enum_1.UserAccount.MAIN_BALANCE, funding.amount - funding.fee)];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, this.referralService.create(referral_enum_1.ReferralTypes.DEPOSIT, user, funding.amount)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.userService.fetch({ _id: funding.user._id })];
                    case 6:
                        user = _a.sent();
                        _a.label = 7;
                    case 7:
                        if (!(status === funding_enum_1.FundingStatus.CANCELLED)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.notificationService.create("Your funding of ".concat(helpers_1.default.toCurrency(funding.amount), " was not successful"), notification_enum_1.NotificationTitle.FUNDING_FAILED, funding, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, user)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.transactionService.create(user, transaction_enum_1.TransactionTitle.FUNDING_FAILED, funding, funding.amount, user_enum_1.UserEnvironment.LIVE)];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 10:
                        if (!(status === funding_enum_1.FundingStatus.APPROVED)) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.notificationService.create("Your funding of ".concat(helpers_1.default.toCurrency(funding.amount), " was successful"), notification_enum_1.NotificationTitle.FUNDING_SUCCESSFUL, funding, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, user)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, this.transactionService.create(user, transaction_enum_1.TransactionTitle.FUNDING_SUCCESSFUL, funding, funding.amount, user_enum_1.UserEnvironment.LIVE)];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13: return [2 /*return*/, funding];
                }
            });
        });
    };
    FundingService.prototype.fetchAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fundingModel
                            .find(filter)
                            .sort({ createdAt: -1 })
                            .populate('user')
                            .populate('depositMethod')
                            .populate('currency')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FundingService.prototype.count = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fundingModel.count(filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FundingService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.DEPOSIT_METHOD_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.REFERRAL_SERVICE)),
        __param(4, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
    ], FundingService);
    return FundingService;
}());
exports.default = FundingService;
