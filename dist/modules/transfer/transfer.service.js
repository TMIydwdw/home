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
var transfer_enum_1 = require("@/modules/transfer/transfer.enum");
var transaction_enum_1 = require("@/modules/transaction/transaction.enum");
var notification_enum_1 = require("@/modules/notification/notification.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var apiError_1 = require("@/core/apiError");
var helpers_1 = __importDefault(require("@/utils/helpers"));
var transfer_model_1 = __importDefault(require("@/modules/transfer/transfer.model"));
var TransferService = /** @class */ (function () {
    function TransferService(transferSettingsService, userService, transactionService, notificationService) {
        this.transferSettingsService = transferSettingsService;
        this.userService = userService;
        this.transactionService = transactionService;
        this.notificationService = notificationService;
        this.transferModel = transfer_model_1.default;
    }
    TransferService.prototype.create = function (fromUserId, toUserUsername, account, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var transferSettings, fee, status, toUser, fromUser, transfer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transferSettingsService.fetch({})];
                    case 1:
                        transferSettings = _a.sent();
                        fee = transferSettings.fee;
                        status = !transferSettings.approval
                            ? transfer_enum_1.TransferStatus.SUCCESSFUL
                            : transfer_enum_1.TransferStatus.PENDING;
                        return [4 /*yield*/, this.userService.fetch({ username: toUserUsername })];
                    case 2:
                        toUser = _a.sent();
                        if (toUser._id.toString() === fromUserId.toString())
                            throw new apiError_1.BadRequestError('You can not transfer to your own account');
                        return [4 /*yield*/, this.userService.fund({ _id: fromUserId }, account, -(amount + fee))];
                    case 3:
                        fromUser = _a.sent();
                        if (!(status === transfer_enum_1.TransferStatus.SUCCESSFUL)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.userService.fund({ _id: toUser._id }, user_enum_1.UserAccount.MAIN_BALANCE, amount)];
                    case 4:
                        // toUser instance
                        toUser = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.transferModel.create({
                            fromUser: fromUser,
                            toUser: toUser,
                            account: account,
                            amount: amount,
                            fee: fee,
                            status: status,
                        })];
                    case 6:
                        transfer = _a.sent();
                        if (!(status === transfer_enum_1.TransferStatus.SUCCESSFUL)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.transactionService.create(fromUser, transaction_enum_1.TransactionTitle.TRANSFER_SENT, transfer, amount, user_enum_1.UserEnvironment.LIVE)
                            // fromUser notification instance
                        ];
                    case 7:
                        _a.sent();
                        // fromUser notification instance
                        return [4 /*yield*/, this.notificationService.create("Your transfer of ".concat(helpers_1.default.toCurrency(amount), " to ").concat(toUserUsername, " was successful."), notification_enum_1.NotificationTitle.TRANSFER_SENT, transfer, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, fromUser)
                            // toUser transaction instance
                        ];
                    case 8:
                        // fromUser notification instance
                        _a.sent();
                        // toUser transaction instance
                        return [4 /*yield*/, this.transactionService.create(toUser, transaction_enum_1.TransactionTitle.TRANSFER_RECEIVED, transfer, amount, user_enum_1.UserEnvironment.LIVE)
                            // toUser notification instance
                        ];
                    case 9:
                        // toUser transaction instance
                        _a.sent();
                        // toUser notification instance
                        return [4 /*yield*/, this.notificationService.create("".concat(fromUser.username, " just sent you ").concat(helpers_1.default.toCurrency(amount), "."), notification_enum_1.NotificationTitle.TRANSFER_RECEIVED, transfer, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, toUser)
                            // admin notification instance
                        ];
                    case 10:
                        // toUser notification instance
                        _a.sent();
                        // admin notification instance
                        return [4 /*yield*/, this.notificationService.create("".concat(fromUser.username, " just made a successful transfer of ").concat(helpers_1.default.toCurrency(amount), " to ").concat(toUser.username), notification_enum_1.NotificationTitle.TRANSFER_SENT, transfer, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 11:
                        // admin notification instance
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 12: 
                    // fromUser transaction instance
                    return [4 /*yield*/, this.transactionService.create(fromUser, transaction_enum_1.TransactionTitle.TRANSFER_SENT, transfer, amount, user_enum_1.UserEnvironment.LIVE)
                        // fromUser notification instance
                    ];
                    case 13:
                        // fromUser transaction instance
                        _a.sent();
                        // fromUser notification instance
                        return [4 /*yield*/, this.notificationService.create("Your transfer of ".concat(helpers_1.default.toCurrency(amount), " to ").concat(toUserUsername, " is ongoing."), notification_enum_1.NotificationTitle.TRANSFER_SENT, transfer, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, fromUser)
                            // admin notification instance
                        ];
                    case 14:
                        // fromUser notification instance
                        _a.sent();
                        // admin notification instance
                        return [4 /*yield*/, this.notificationService.create("".concat(fromUser.username, " just made a transfer request of ").concat(helpers_1.default.toCurrency(amount), " to ").concat(toUser.username, " awaiting for your approver"), notification_enum_1.NotificationTitle.TRANSFER_SENT, fromUser, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 15:
                        // admin notification instance
                        _a.sent();
                        _a.label = 16;
                    case 16: return [4 /*yield*/, transfer.populate('toUser')];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, transfer.populate('fromUser')];
                    case 18:
                        _a.sent();
                        return [2 /*return*/, transfer];
                }
            });
        });
    };
    TransferService.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var transfer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transferModel.findOne(filter)];
                    case 1:
                        transfer = _a.sent();
                        if (!transfer)
                            throw new apiError_1.NotFoundError('Transfer not found');
                        return [4 /*yield*/, transfer.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, transfer];
                }
            });
        });
    };
    TransferService.prototype.updateStatus = function (filter, status) {
        return __awaiter(this, void 0, void 0, function () {
            var transfer, fromUser, toUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transferModel
                            .findOne(filter)
                            .populate('toUser')
                            .populate('fromUser')];
                    case 1:
                        transfer = _a.sent();
                        if (!transfer)
                            throw new apiError_1.NotFoundError('Transfer not found');
                        if (transfer.status !== transfer_enum_1.TransferStatus.PENDING)
                            throw new apiError_1.BadRequestError('Transfer as already been settled');
                        transfer.status = status;
                        return [4 /*yield*/, transfer.save()];
                    case 2:
                        _a.sent();
                        if (!(status === transfer_enum_1.TransferStatus.REVERSED)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.userService.fund(transfer.fromUser._id, transfer.account, transfer.amount + transfer.fee)
                            // Add toUser transaction instance
                        ];
                    case 3:
                        // Add fromUser Instance
                        fromUser = _a.sent();
                        // Add toUser transaction instance
                        return [4 /*yield*/, this.transactionService.create(fromUser, transaction_enum_1.TransactionTitle.TRANSFER_REVERSED, transfer, transfer.amount, user_enum_1.UserEnvironment.LIVE)];
                    case 4:
                        // Add toUser transaction instance
                        _a.sent();
                        return [4 /*yield*/, this.notificationService.create("Your transfer of ".concat(helpers_1.default.toCurrency(transfer.amount), " was not successful"), notification_enum_1.NotificationTitle.TRANSFER_REVERSED, transfer, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, fromUser)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 6: return [4 /*yield*/, this.userService.fetch({ _id: transfer.fromUser._id })
                        // Add toUser instance
                    ];
                    case 7:
                        fromUser = _a.sent();
                        return [4 /*yield*/, this.userService.fund(transfer.toUser._id, user_enum_1.UserAccount.MAIN_BALANCE, transfer.amount)
                            // Add toUser transaction instance
                        ];
                    case 8:
                        toUser = _a.sent();
                        // Add toUser transaction instance
                        return [4 /*yield*/, this.transactionService.create(toUser, transaction_enum_1.TransactionTitle.TRANSFER_RECEIVED, transfer, transfer.amount, user_enum_1.UserEnvironment.LIVE)
                            // Add toUser notification instance
                        ];
                    case 9:
                        // Add toUser transaction instance
                        _a.sent();
                        // Add toUser notification instance
                        return [4 /*yield*/, this.notificationService.create("".concat(fromUser.username, " just sent you ").concat(helpers_1.default.toCurrency(transfer.amount), "."), notification_enum_1.NotificationTitle.TRANSFER_RECEIVED, transfer, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, toUser)];
                    case 10:
                        // Add toUser notification instance
                        _a.sent();
                        _a.label = 11;
                    case 11: return [2 /*return*/, transfer];
                }
            });
        });
    };
    TransferService.prototype.fetch = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var transfer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transferModel
                            .findOne(filter)
                            .populate('toUser')
                            .populate('fromUser')];
                    case 1:
                        transfer = _a.sent();
                        if (!transfer)
                            throw new apiError_1.NotFoundError('Transfer not found');
                        return [2 /*return*/, transfer];
                }
            });
        });
    };
    TransferService.prototype.fetchAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var transfers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transferModel
                            .find(filter)
                            .sort({
                            updatedAt: -1,
                        })
                            .populate('toUser')
                            .populate('fromUser')];
                    case 1:
                        transfers = _a.sent();
                        return [2 /*return*/, transfers];
                }
            });
        });
    };
    TransferService.prototype.count = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transferModel.count(filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TransferService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.TRANSFER_SETTINGS_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], TransferService);
    return TransferService;
}());
exports.default = TransferService;
