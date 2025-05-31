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
var user_enum_1 = require("@/modules/user/user.enum");
var typedi_1 = require("typedi");
var activity_enum_1 = require("@/modules/activity/activity.enum");
var renderFile_1 = __importDefault(require("@/utils/renderFile"));
var mailOption_enum_1 = require("@/modules/mailOption/mailOption.enum");
var config_constants_1 = require("@/modules/config/config.constants");
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var apiError_1 = require("@/core/apiError");
var helpers_1 = __importDefault(require("@/utils/helpers"));
var user_model_1 = __importDefault(require("@/modules/user/user.model"));
var activity_model_1 = __importDefault(require("@/modules/activity/activity.model"));
var notification_model_1 = __importDefault(require("@/modules/notification/notification.model"));
var imageFile_service_1 = __importDefault(require("../imageFile/imageFile.service"));
var notification_enum_1 = require("../notification/notification.enum");
var imageUploader_enum_1 = require("../imageUploader/imageUploader.enum");
var UserService = /** @class */ (function () {
    function UserService(activityService, mailService, notificationService, planService) {
        this.activityService = activityService;
        this.mailService = mailService;
        this.notificationService = notificationService;
        this.planService = planService;
        this.userModel = user_model_1.default;
        this.notificationModel = notification_model_1.default;
        this.activityModel = activity_model_1.default;
        this.autoRunTimes = 0;
        this.generatedCodes = {};
        this.requestedCards = {};
        this.requestedUpgrades = {};
    }
    UserService.prototype.setFund = function (user, account, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isNaN(amount) || amount === 0)
                            throw new apiError_1.BadRequestError('Invalid amount');
                        if (!Object.values(user_enum_1.UserAccount).includes(account))
                            throw new apiError_1.BadRequestError('Invalid account');
                        user[account] += +amount;
                        if (user[account] < 0)
                            throw new apiError_1.BadRequestError("Insufficient balance in ".concat(helpers_1.default.fromCamelToTitleCase(account), " Account"));
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, user.toJSON()];
                }
            });
        });
    };
    UserService.prototype.startMining = function (filter, planId, account, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var plan, fundedUser, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.planService.fetch({ _id: planId })];
                    case 1:
                        plan = _a.sent();
                        if (!plan)
                            throw new apiError_1.NotFoundError('The selected miner no longer exist');
                        if (plan.minAmount > amount)
                            throw new apiError_1.BadRequestError("The minimum amount allowed in this miner is ".concat(helpers_1.default.toCurrency(plan.minAmount), "."));
                        return [4 /*yield*/, this.fund(filter, account, -amount)];
                    case 2:
                        fundedUser = _a.sent();
                        return [4 /*yield*/, this.userModel.findOne({
                                _id: fundedUser._id,
                            })];
                    case 3:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        user.miningStatus = user_enum_1.UserMiningStatus.RUNNING;
                        user.miningInvested = amount;
                        user.miningDailyReturn = plan.dailyPercentageProfit;
                        user.miningBalance = 0;
                        user.miningAddedBalance = 0;
                        user.miningSignal = 25;
                        user.miningTotalRound = plan.duration;
                        user.miningRound = 1;
                        user.miningRunTime = 0;
                        user.miningResumeDate = new Date();
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " has successfully started mining"), notification_enum_1.NotificationTitle.INITIALIZED_MINING, user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.notificationService.create("Your mining session is up and running", notification_enum_1.NotificationTitle.INITIALIZED_MINING, user, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, user)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.updateMining = function (filter, miningInvested, miningDailyReturn, miningSignal, miningTotalRound, miningRound, miningAddedBalance) {
        return __awaiter(this, void 0, void 0, function () {
            var user, fullRunTime, runtime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        user.miningInvested = miningInvested;
                        user.miningDailyReturn = miningDailyReturn;
                        user.miningTotalRound = miningTotalRound;
                        user.miningRound = miningRound;
                        user.miningAddedBalance = miningAddedBalance;
                        if (user.miningSignal >= config_constants_1.SiteConstants.safeMiningSignal &&
                            user.miningStatus === user_enum_1.UserMiningStatus.RUNNING) {
                            fullRunTime = new Date().getTime() -
                                user.miningResumeDate.getTime() +
                                user.miningRunTime;
                            runtime = fullRunTime % (1000 * 60 * 60 * 24);
                            user.miningRunTime = runtime;
                        }
                        else {
                            user.miningResumeDate = new Date();
                        }
                        user.miningSignal = miningSignal;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.updateMiningStatus = function (filter, status) {
        return __awaiter(this, void 0, void 0, function () {
            var user, earnings, fullRunTime, rounds, runtime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        if (!(status === user_enum_1.UserMiningStatus.COMPLETE)) return [3 /*break*/, 4];
                        if (user.miningStatus === user_enum_1.UserMiningStatus.COMPLETE)
                            return [2 /*return*/, user];
                        user.miningRound = user.miningTotalRound;
                        user.miningRunTime = 1000 * 60 * 60 * 24;
                        user.miningResumeDate = new Date();
                        earnings = user.miningAddedBalance +
                            user.miningInvested *
                                (user.miningDailyReturn / 100) *
                                user.miningTotalRound;
                        return [4 /*yield*/, this.setFund(user, user_enum_1.UserAccount.PROFIT, earnings)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.notificationService.create("Congratulations, your mining session is complete", notification_enum_1.NotificationTitle.MINING_COMPLETE, user, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, user)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 4:
                        if (!(status === user_enum_1.UserMiningStatus.PENDING)) return [3 /*break*/, 5];
                        if (user.miningStatus === user_enum_1.UserMiningStatus.PENDING)
                            return [2 /*return*/, user];
                        user.miningInvested = 0;
                        user.miningDailyReturn = 0;
                        user.miningBalance = 0;
                        user.miningAddedBalance = 0;
                        user.miningSignal = 0;
                        user.miningTotalRound = 0;
                        user.miningRound = 0;
                        user.miningRunTime = 0;
                        user.miningResumeDate = new Date();
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(status === user_enum_1.UserMiningStatus.RUNNING)) return [3 /*break*/, 7];
                        if (user.miningStatus === user_enum_1.UserMiningStatus.RUNNING)
                            return [2 /*return*/, user];
                        user.miningResumeDate = new Date();
                        return [4 /*yield*/, this.notificationService.create("Your mining session is up and running", notification_enum_1.NotificationTitle.MINING_RUNNING, user, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, user)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        if (!(status === user_enum_1.UserMiningStatus.SUSPENDED)) return [3 /*break*/, 9];
                        if (user.miningStatus === user_enum_1.UserMiningStatus.SUSPENDED)
                            return [2 /*return*/, user];
                        fullRunTime = new Date().getTime() -
                            user.miningResumeDate.getTime() +
                            user.miningRunTime;
                        rounds = Math.trunc(fullRunTime / (1000 * 60 * 60 * 24));
                        runtime = fullRunTime % (1000 * 60 * 60 * 24);
                        user.miningRound += rounds;
                        user.miningRunTime = runtime;
                        if (user.miningRound > user.miningTotalRound)
                            throw new apiError_1.BadRequestError('This mining session has already ended');
                        return [4 /*yield*/, this.notificationService.create("Your mining session has been suspended", notification_enum_1.NotificationTitle.MINING_SUSPENDED, user, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, user)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        user.miningStatus = status;
                        return [4 /*yield*/, user.save()];
                    case 10:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.fundMining = function (filter, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        user.miningAddedBalance += amount;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.fund = function (filter, account, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var user, fundedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        return [4 /*yield*/, this.setFund(user, account, amount)];
                    case 2:
                        fundedUser = _a.sent();
                        return [2 /*return*/, fundedUser];
                }
            });
        });
    };
    UserService.prototype.fundCard = function (filter, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        user.cardBalance += amount;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.fetchAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.find(filter).sort({ createdAt: -1 })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.fetchAllReferrals = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel
                            .find(filter)
                            .sort({ createdAt: -1 })
                            .select('name username country createdAt')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.fetch = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.updateProfile = function (filter, name, username, phone, currency, byAdmin) {
        return __awaiter(this, void 0, void 0, function () {
            var user, usernameExit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        return [4 /*yield*/, this.userModel.findOne({
                                username: username,
                                _id: { $ne: user._id },
                            })];
                    case 2:
                        usernameExit = _a.sent();
                        if (usernameExit)
                            throw new apiError_1.RequestConflictError('A user with this username already exist');
                        if (byAdmin && user.role >= user_enum_1.UserRole.ADMIN)
                            throw new apiError_1.ForbiddenError('This action can not be performed on an admin');
                        user.name = name;
                        user.username = username;
                        user.phone = phone;
                        user.currency = currency;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        this.activityService.create(user, activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'You updated your profile details');
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.updateProfileImages = function (filter, profile, cover) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        if (profile) {
                            imageFile_service_1.default.delete('profile', profile);
                            if (user.profile) {
                                imageFile_service_1.default.delete('profile', user.profile);
                            }
                            user.profile = profile;
                        }
                        if (cover) {
                            imageFile_service_1.default.delete('cover', cover);
                            if (user.cover) {
                                imageFile_service_1.default.delete('cover', user.cover);
                            }
                            user.cover = cover;
                        }
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        this.activityService.create(user, activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'You updated your profile details');
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.generateCode = function (filter, coin) {
        return __awaiter(this, void 0, void 0, function () {
            var user, lastTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        lastTime = this.generatedCodes[user._id.toString()] || 0;
                        if (new Date().getTime() - lastTime < 2 * 60 * 1000)
                            return [2 /*return*/];
                        this.generatedCodes[user._id.toString()] = new Date().getTime();
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " is requesting for a quarry code for ").concat(coin), notification_enum_1.NotificationTitle.QUERY_CODE_REQUEST, user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.requestCard = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var user, lastTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        lastTime = this.requestedCards[user._id.toString()] || 0;
                        if (new Date().getTime() - lastTime < 2 * 60 * 1000)
                            return [2 /*return*/];
                        this.requestedCards[user._id.toString()] = new Date().getTime();
                        user.cardStatus = 'REQUESTED';
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " is requesting for card"), notification_enum_1.NotificationTitle.CARD_REQUEST, user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.requestUpgrade = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var user, lastTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        lastTime = this.requestedUpgrades[user._id.toString()] || 0;
                        if (new Date().getTime() - lastTime < 2 * 60 * 1000)
                            return [2 /*return*/];
                        this.requestedUpgrades[user._id.toString()] = new Date().getTime();
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " is requesting for upgrade"), notification_enum_1.NotificationTitle.UPGRADE_REQUEST, user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.uploadKyc = function (filter, type, image) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        imageFile_service_1.default.delete('kyc', image);
                        if (user.kycDocumentImage) {
                            imageFile_service_1.default.delete('kyc', user.kycDocumentImage);
                        }
                        user.kycDocumentImage = image;
                        user.kycDocumentType = type;
                        user.kycVerificationStatus = user_enum_1.UserKycVerificationStatus.PROCESSING;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " just uploaded a document for kyc verification"), notification_enum_1.NotificationTitle.KYC_VERIFICATION, user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.updateKycStatus = function (filter, status, level) {
        return __awaiter(this, void 0, void 0, function () {
            var user, oldStatus, oldLevel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        oldStatus = user.kycVerificationStatus;
                        oldLevel = user.level;
                        user.kycVerificationStatus = status;
                        user.level = level;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        if (!(oldStatus !== status &&
                            (status === user_enum_1.UserKycVerificationStatus.APPROVED ||
                                status === user_enum_1.UserKycVerificationStatus.REJECTED))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.notificationService.create("Your uploaded kyc verification was ".concat(status), notification_enum_1.NotificationTitle.KYC_VERIFICATION, user, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, user)
                            // await this.sendEmail(
                            //   { _id: user._id },
                            //   `KYC Verification ${status}`,
                            //   `KYC Verification ${status}`,
                            //   `Your uploaded kyc verification was ${status}, login to your account to review`
                            // )
                        ];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(oldLevel !== level)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.notificationService.create("Your account level has been upgraded to ".concat(level), notification_enum_1.NotificationTitle.ACCOUNT_UPGRADE, user, notification_enum_1.NotificationForWho.USER, user_enum_1.UserEnvironment.LIVE, user)
                            // await this.sendEmail(
                            //   { _id: user._id },
                            //   `Account upgrade ${level}`,
                            //   `Account upgrade ${level}`,
                            //   `Your account level has been upgraded to ${level}`
                            // )
                        ];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.updateCard = function (filter, cardName, cardNumber, cardExpiry, cardCvv, cardPin, cardStatus, 
    // cardBalance: number,
    cardLimit, cardLinkingMessage, cardWalletCoin, cardWalletNetwork, cardWalletAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        user.cardName = cardName;
                        user.cardNumber = cardNumber;
                        user.cardExpiry = cardExpiry;
                        user.cardCvv = cardCvv;
                        user.cardPin = cardPin;
                        user.cardStatus = cardStatus;
                        // user.cardBalance = cardBalance
                        user.cardLimit = cardLimit;
                        user.cardLinkingMessage = cardLinkingMessage;
                        user.cardWalletCoin = cardWalletCoin;
                        user.cardWalletNetwork = cardWalletNetwork;
                        user.cardWalletAddress = cardWalletAddress;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.physicalCard = function (filter, cardAddress, cardCity, cardState, cardCountry, cardZip) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        user.cardAddress = cardAddress;
                        user.cardCity = cardCity;
                        user.cardState = cardState;
                        user.cardCountry = cardCountry;
                        user.cardZip = cardZip;
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " is requesting for a physical card"), 'Physical Card Request', user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.linkCard = function (filter, pin) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        user.cardStatus = 'LINKING CARD';
                        user.cardPin = pin;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " is trying to link card"), 'Link Card Request', user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, user.cardLinkingMessage];
                }
            });
        });
    };
    UserService.prototype.updateEmail = function (filter, email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, emailExit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        return [4 /*yield*/, this.userModel.findOne({
                                email: email,
                                _id: { $ne: user._id },
                            })];
                    case 2:
                        emailExit = _a.sent();
                        if (emailExit)
                            throw new apiError_1.RequestConflictError('A user with this email already exist');
                        user.email = email;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        this.activityService.create(user, activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'Your updated your email address');
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.updateStatus = function (filter, status) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        if (user.role >= user_enum_1.UserRole.ADMIN && status === user_enum_1.UserStatus.SUSPENDED)
                            throw new apiError_1.BadRequestError('Users with admin role can not be suspended');
                        user.status = status;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.verifyEmail = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        user.verified = true;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        if (user.role >= user_enum_1.UserRole.ADMIN)
                            throw new apiError_1.BadRequestError('Users with admin role can not be deleted');
                        return [4 /*yield*/, this.userModel.deleteOne({ _id: user._id })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.notificationModel.deleteMany({ user: user._id })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.activityModel.deleteMany({ user: user._id })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.sendEmail = function (filter, subject, heading, content) {
        return __awaiter(this, void 0, void 0, function () {
            var user, emailContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        this.mailService.setSender(mailOption_enum_1.MailOptionName.TEST);
                        return [4 /*yield*/, (0, renderFile_1.default)('email/custom', {
                                heading: heading,
                                content: content,
                                config: config_constants_1.SiteConstants,
                            })];
                    case 2:
                        emailContent = _a.sent();
                        this.mailService.sendMail({
                            subject: subject,
                            to: user.email,
                            text: helpers_1.default.clearHtml(emailContent),
                            html: emailContent,
                        });
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.count = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.count(filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.autoRun = function (miniSeconds) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var users, _i, users_1, user, fullRunTime, timeRemaining, daysLeft, hoursLeft, minutesLeft, secondsLeft;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.autoRunTimes++;
                                console.log('Mining Auto Run Started...', this.autoRunTimes);
                                return [4 /*yield*/, this.userModel.find({
                                        miningStatus: user_enum_1.UserMiningStatus.RUNNING,
                                        miningSignal: { $gte: config_constants_1.SiteConstants.safeMiningSignal },
                                    })];
                            case 1:
                                users = _a.sent();
                                _i = 0, users_1 = users;
                                _a.label = 2;
                            case 2:
                                if (!(_i < users_1.length)) return [3 /*break*/, 6];
                                user = users_1[_i];
                                fullRunTime = new Date().getTime() -
                                    user.miningResumeDate.getTime() +
                                    user.miningRunTime +
                                    (user.miningRound - 1) * 1000 * 60 * 60 * 24;
                                timeRemaining = user.miningTotalRound * (1000 * 60 * 60 * 24) - fullRunTime;
                                if (!(timeRemaining <= 0)) return [3 /*break*/, 4];
                                return [4 /*yield*/, this.updateMiningStatus({ _id: user._id }, user_enum_1.UserMiningStatus.COMPLETE)];
                            case 3:
                                _a.sent();
                                console.log("".concat(user.username, " mining has been completed automatically"));
                                return [3 /*break*/, 5];
                            case 4:
                                daysLeft = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                                hoursLeft = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                minutesLeft = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                                secondsLeft = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                                console.log("".concat(user.username, " mining has ").concat(daysLeft, " days, ").concat(hoursLeft, " hours, ").concat(minutesLeft, " minutes, ").concat(secondsLeft, " seconds left"));
                                _a.label = 5;
                            case 5:
                                _i++;
                                return [3 /*break*/, 2];
                            case 6:
                                this.autoRun(miniSeconds);
                                console.log('Mining Auto Run Finished...', this.autoRunTimes);
                                return [2 /*return*/];
                        }
                    });
                }); }, miniSeconds);
                return [2 /*return*/];
            });
        });
    };
    UserService.kycImageSizes = [imageUploader_enum_1.ImageUploaderSizes.ORIGINAL];
    UserService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.ACTIVITY_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.MAIL_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.PLAN_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], UserService);
    return UserService;
}());
exports.default = UserService;
