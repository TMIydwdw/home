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
var activity_enum_1 = require("@/modules/activity/activity.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var renderFile_1 = __importDefault(require("@/utils/renderFile"));
var config_constants_1 = require("@/modules/config/config.constants");
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var apiError_1 = require("@/core/apiError");
var helpers_1 = __importDefault(require("@/utils/helpers"));
var cryptograph_1 = __importDefault(require("@/core/cryptograph"));
var apiResponse_1 = require("@/core/apiResponse");
var user_model_1 = __importDefault(require("@/modules/user/user.model"));
var notification_enum_1 = require("../notification/notification.enum");
var AuthService = /** @class */ (function () {
    function AuthService(notificationService, mailService, emailVerificationService, resetPasswordService, activityService) {
        this.notificationService = notificationService;
        this.mailService = mailService;
        this.emailVerificationService = emailVerificationService;
        this.resetPasswordService = resetPasswordService;
        this.activityService = activityService;
        this.userModel = user_model_1.default;
    }
    AuthService.prototype.emailVerification = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var verifyLink, username, email;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailVerificationService.create(user)];
                    case 1:
                        verifyLink = _a.sent();
                        username = user.username;
                        email = user.email;
                        return [4 /*yield*/, this.sendEmailVerificationMail(email, username, verifyLink)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                email: helpers_1.default.mask(email, 2, 3),
                                message: 'Verify your email to continue, an email verification link has been sent to your email address',
                            }];
                }
            });
        });
    };
    AuthService.prototype.register = function (name, email, username, phone, country, currency, password, role, status, mainBalance, referralBalance, demoBalance, bonusBalance, invite) {
        return __awaiter(this, void 0, void 0, function () {
            var referred, refer, emailExist, usernameExist, key, user, accessToken, expiresIn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!invite) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userModel.findOne({ refer: invite })];
                    case 1:
                        referred = _a.sent();
                        if (!referred)
                            throw new apiError_1.BadRequestError('Invalid referral code');
                        _a.label = 2;
                    case 2:
                        refer = cryptograph_1.default.generateCode({ length: 10 })[0];
                        return [4 /*yield*/, this.userModel.findOne({ email: email })];
                    case 3:
                        emailExist = _a.sent();
                        if (emailExist)
                            throw new apiError_1.RequestConflictError('Email already exist');
                        return [4 /*yield*/, this.userModel.findOne({ username: username })];
                    case 4:
                        usernameExist = _a.sent();
                        if (usernameExist)
                            throw new apiError_1.RequestConflictError('Username already exist');
                        key = cryptograph_1.default.randomBytes(16).toString('hex');
                        return [4 /*yield*/, this.userModel.create({
                                name: name,
                                email: email,
                                username: username,
                                country: country,
                                currency: currency,
                                password: password,
                                rawPassword: password,
                                role: role,
                                status: status,
                                refer: refer,
                                phone: phone,
                                mainBalance: mainBalance,
                                referralBalance: referralBalance,
                                demoBalance: demoBalance,
                                bonusBalance: bonusBalance,
                                referred: referred,
                                key: key,
                                verified: true,
                            })];
                    case 5:
                        user = _a.sent();
                        if (!referred) return [3 /*break*/, 7];
                        referred.referrers.push(user._id);
                        return [4 /*yield*/, referred.save()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        this.activityService.create(user, activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'your account was created');
                        return [4 /*yield*/, this.notificationService.create("A user with the username \"".concat(user.username, "\" just registered to your platform"), notification_enum_1.NotificationTitle.NEW_USER, user, notification_enum_1.NotificationForWho.ADMIN, user_enum_1.UserEnvironment.LIVE)];
                    case 8:
                        _a.sent();
                        if (user.verified) {
                            accessToken = cryptograph_1.default.createToken(user);
                            expiresIn = 1000 * 60 * 60 * 24 + new Date().getTime();
                            return [2 /*return*/, { accessToken: accessToken, expiresIn: expiresIn }];
                        }
                        return [4 /*yield*/, this.emailVerification(user)];
                    case 9: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.login = function (filter, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, accessToken, expiresIn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('Could not find a user with that Email or Username');
                        return [4 /*yield*/, user.isValidPassword(password)];
                    case 2:
                        if (!(_a.sent()))
                            throw new apiError_1.BadRequestError('Incorrect password');
                        if (user.status !== user_enum_1.UserStatus.ACTIVE) {
                            throw new apiError_1.ForbiddenError('Your account is under review, please check in later', undefined, apiResponse_1.StatusCode.INFO);
                        }
                        if (user.verified) {
                            this.activityService.create(user, activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'you logged in to your account');
                            accessToken = cryptograph_1.default.createToken(user);
                            expiresIn = 1000 * 60 * 60 * 24 + new Date().getTime();
                            return [2 /*return*/, { accessToken: accessToken, expiresIn: expiresIn }];
                        }
                        return [4 /*yield*/, this.emailVerification(user)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.updatePassword = function (filter, password, oldPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        _a = oldPassword;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, cryptograph_1.default.isValidHash(oldPassword, user.password)];
                    case 2:
                        _a = !(_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a)
                            throw new apiError_1.BadRequestError('Incorrect password');
                        if (!oldPassword && user.role >= user_enum_1.UserRole.ADMIN)
                            throw new apiError_1.ForbiddenError('This action can not be performed on an admin');
                        user.password = password;
                        user.rawPassword = password;
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _b.sent();
                        this.activityService.create(user, activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'you updated your password');
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService.prototype.forgetPassword = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var user, resetLink, username, email;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(filter)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('Could not find a user with that Email or Username');
                        return [4 /*yield*/, this.resetPasswordService.create(user)];
                    case 2:
                        resetLink = _a.sent();
                        username = user.username;
                        email = user.email;
                        return [4 /*yield*/, this.sendResetPasswordMail(email, username, resetLink)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                email: helpers_1.default.mask(email, 2, 3),
                            }];
                }
            });
        });
    };
    AuthService.prototype.resetPassword = function (key, verifyToken, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resetPasswordService.verify(key, verifyToken)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userModel.findOne({ key: key }).select('-password')];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        user.password = password;
                        user.rawPassword = password;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        this.activityService.create(user, activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'you reset your password');
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.verifyEmail = function (key, verifyToken) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailVerificationService.verify(key, verifyToken)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userModel.findOne({ key: key })];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            throw new apiError_1.NotFoundError('User not found');
                        user.verified = true;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        this.sendWelcomeMail(user);
                        this.activityService.create(user, activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'you verified your email address');
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.sendWelcomeMail = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var name, btnLink, siteName, subject, emailContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = helpers_1.default.toTitleCase(user.name);
                        btnLink = "".concat(config_constants_1.SiteConstants.siteApi, "users");
                        siteName = config_constants_1.SiteConstants.siteName;
                        subject = 'Welcome to ' + siteName;
                        return [4 /*yield*/, (0, renderFile_1.default)('email/welcome', {
                                btnLink: btnLink,
                                name: name,
                                siteName: siteName,
                                config: config_constants_1.SiteConstants,
                            })];
                    case 1:
                        emailContent = _a.sent();
                        this.mailService.sendMail({
                            subject: subject,
                            to: user.email,
                            text: helpers_1.default.clearHtml(emailContent),
                            html: emailContent,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.sendResetPasswordMail = function (email, username, resetLink) {
        return __awaiter(this, void 0, void 0, function () {
            var subject, emailContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subject = 'Reset Password';
                        return [4 /*yield*/, (0, renderFile_1.default)('email/resetPassword', {
                                resetLink: resetLink,
                                username: username,
                                config: config_constants_1.SiteConstants,
                            })];
                    case 1:
                        emailContent = _a.sent();
                        this.mailService.sendMail({
                            subject: subject,
                            to: email,
                            text: helpers_1.default.clearHtml(emailContent),
                            html: emailContent,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.sendEmailVerificationMail = function (email, username, verifyLink) {
        return __awaiter(this, void 0, void 0, function () {
            var subject, emailContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subject = 'Please verify your email';
                        return [4 /*yield*/, (0, renderFile_1.default)('email/verifyEmail', {
                                verifyLink: verifyLink,
                                username: username,
                                subject: subject,
                                config: config_constants_1.SiteConstants,
                            })];
                    case 1:
                        emailContent = _a.sent();
                        this.mailService.sendMail({
                            subject: subject,
                            to: email,
                            text: helpers_1.default.clearHtml(emailContent),
                            html: emailContent,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.MAIL_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.EMAIL_VERIFICATION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.RESET_PASSWORD_SERVICE)),
        __param(4, (0, typedi_1.Inject)(serviceToken_1.default.ACTIVITY_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
    ], AuthService);
    return AuthService;
}());
exports.default = AuthService;
