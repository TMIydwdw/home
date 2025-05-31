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
var apiError_1 = require("@/core/apiError");
var otherWithdrawal_model_1 = __importDefault(require("@/modules/otherWithdrawal/otherWithdrawal.model"));
var withdrawal_enum_1 = require("../withdrawal/withdrawal.enum");
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var user_enum_1 = require("../user/user.enum");
var helpers_1 = __importDefault(require("@/utils/helpers"));
var notification_enum_1 = require("../notification/notification.enum");
var transaction_enum_1 = require("../transaction/transaction.enum");
var OtherWithdrawalService = /** @class */ (function () {
    function OtherWithdrawalService(otherWithdrawalMethodService, userService, transactionService, notificationService) {
        this.otherWithdrawalMethodService = otherWithdrawalMethodService;
        this.userService = userService;
        this.transactionService = transactionService;
        this.notificationService = notificationService;
        this.otherWithdrawalModel = otherWithdrawal_model_1.default;
    }
    OtherWithdrawalService.prototype.create = function (_a) {
        var amount = _a.amount, userId = _a.userId, type = _a.type, account = _a.account, accountName = _a.accountName, accountNumber = _a.accountNumber, bankName = _a.bankName, cashAppTag = _a.cashAppTag, paypalEmail = _a.paypalEmail, routingNumber = _a.routingNumber, swiftCode = _a.swiftCode;
        return __awaiter(this, void 0, void 0, function () {
            var otherWithdrawalMethod, user, otherWithdrawal;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.otherWithdrawalMethodService.fetch({
                            type: type,
                        })];
                    case 1:
                        otherWithdrawalMethod = _b.sent();
                        if (otherWithdrawalMethod.minWithdrawal > amount)
                            throw new apiError_1.BadRequestError('Amount is lower than the min withdrawal of the selected withdrawal method');
                        return [4 /*yield*/, this.userService.fund({ _id: userId }, account, -(amount + otherWithdrawalMethod.fee))];
                    case 2:
                        user = _b.sent();
                        return [4 /*yield*/, this.otherWithdrawalModel.create({
                                fee: otherWithdrawalMethod.fee,
                                user: user,
                                amount: amount,
                                type: type,
                                account: account,
                                accountName: accountName,
                                accountNumber: accountNumber,
                                bankName: bankName,
                                cashAppTag: cashAppTag,
                                paypalEmail: paypalEmail,
                                routingNumber: routingNumber,
                                swiftCode: swiftCode,
                                status: withdrawal_enum_1.WithdrawalStatus.PENDING,
                            })];
                    case 3:
                        otherWithdrawal = _b.sent();
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " just made a withdrawal request of ").concat(helpers_1.default.toCurrency(amount), " awaiting for your approval"), notification_enum_1.NotificationTitle.WITHDRAWAL_REQUEST, user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, otherWithdrawal.populate('user')];
                }
            });
        });
    };
    OtherWithdrawalService.prototype.fetch = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var otherWithdrawal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.otherWithdrawalModel.findOne(query)];
                    case 1:
                        otherWithdrawal = _a.sent();
                        if (!otherWithdrawal)
                            throw new apiError_1.NotFoundError('Withdrawal not found');
                        return [2 /*return*/, otherWithdrawal];
                }
            });
        });
    };
    OtherWithdrawalService.prototype.updateStatus = function (query, status) {
        return __awaiter(this, void 0, void 0, function () {
            var otherWithdrawal, oldStatus, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.otherWithdrawalModel
                            .findOne(query)
                            .populate('user')];
                    case 1:
                        otherWithdrawal = _a.sent();
                        if (!otherWithdrawal)
                            throw new apiError_1.NotFoundError('Withdrawal not found');
                        oldStatus = otherWithdrawal.status;
                        if (oldStatus !== withdrawal_enum_1.WithdrawalStatus.PENDING)
                            throw new apiError_1.BadRequestError('Withdrawal as already been settled');
                        otherWithdrawal.status = status;
                        return [4 /*yield*/, otherWithdrawal.save()];
                    case 2:
                        _a.sent();
                        if (!(status === withdrawal_enum_1.WithdrawalStatus.CANCELLED)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.userService.fund(otherWithdrawal.user._id, otherWithdrawal.account, otherWithdrawal.amount + otherWithdrawal.fee)];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, this.transactionService.create(user, transaction_enum_1.TransactionTitle.WITHDRAWAL_FAILED, otherWithdrawal, otherWithdrawal.amount, user_enum_1.UserEnvironment.LIVE)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.notificationService.create("Your withdrawal of ".concat(helpers_1.default.toCurrency(otherWithdrawal.amount), " was not successful"), notification_enum_1.NotificationTitle.WITHDRAWAL_FAILED, otherWithdrawal, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, user)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 6: return [4 /*yield*/, this.userService.fetch({ _id: otherWithdrawal.user._id })];
                    case 7:
                        user = _a.sent();
                        return [4 /*yield*/, this.transactionService.create(user, transaction_enum_1.TransactionTitle.WITHDRAWAL_SUCCESSFUL, otherWithdrawal, otherWithdrawal.amount, user_enum_1.UserEnvironment.LIVE)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.notificationService.create("Your withdrawal of ".concat(helpers_1.default.toCurrency(otherWithdrawal.amount), " was successful"), notification_enum_1.NotificationTitle.WITHDRAWAL_SUCCESSFUL, otherWithdrawal, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, user)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        otherWithdrawal.status = status;
                        return [4 /*yield*/, otherWithdrawal.save()];
                    case 11:
                        _a.sent();
                        return [2 /*return*/, otherWithdrawal];
                }
            });
        });
    };
    OtherWithdrawalService.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var otherWithdrawal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.otherWithdrawalModel.findOne(filter)];
                    case 1:
                        otherWithdrawal = _a.sent();
                        if (!otherWithdrawal)
                            throw new apiError_1.NotFoundError('Withdrawal not found');
                        return [4 /*yield*/, otherWithdrawal.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, otherWithdrawal];
                }
            });
        });
    };
    OtherWithdrawalService.prototype.fetchAll = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.otherWithdrawalModel
                            .find(query)
                            .sort({ createdAt: -1 })
                            .populate('user')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OtherWithdrawalService.prototype.count = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.otherWithdrawalModel.count(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OtherWithdrawalService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.OTHER_WITHDRAWAL_METHOD_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], OtherWithdrawalService);
    return OtherWithdrawalService;
}());
exports.default = OtherWithdrawalService;
