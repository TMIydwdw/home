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
var config_constants_1 = require("@/modules/config/config.constants");
var nodemailer_1 = __importDefault(require("nodemailer"));
var typedi_1 = require("typedi");
var apiError_1 = require("@/core/apiError");
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var MailService = /** @class */ (function () {
    function MailService(mailOptionService) {
        this.mailOptionService = mailOptionService;
        var _a = process.env, SMTP_HOST = _a.SMTP_HOST, SMTP_PORT = _a.SMTP_PORT, SMTP_TLS = _a.SMTP_TLS, SMTP_SECURE = _a.SMTP_SECURE, SMTP_USERNAME = _a.SMTP_USERNAME, SMTP_PASSWORD = _a.SMTP_PASSWORD;
        this.username = SMTP_USERNAME;
        this.transporter = nodemailer_1.default.createTransport({
            // @ts-ignore
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_SECURE,
            auth: {
                user: SMTP_USERNAME,
                pass: SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: SMTP_TLS,
            },
        });
    }
    // CONFIGURE TRANSPORTER
    MailService.prototype.setSender = function (sender) {
        return __awaiter(this, void 0, void 0, function () {
            var mailOption;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mailOptionService.fetch({ name: sender })];
                    case 1:
                        mailOption = _a.sent();
                        if (!mailOption)
                            throw new apiError_1.NotFoundError('Mail option not found');
                        this.username = mailOption.username;
                        this.transporter = nodemailer_1.default.createTransport({
                            host: mailOption.host,
                            port: mailOption.port,
                            secure: mailOption.secure,
                            auth: {
                                user: mailOption.username,
                                pass: mailOption.password,
                            },
                            tls: {
                                rejectUnauthorized: mailOption.tls,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //SEND MAIL
    MailService.prototype.sendMail = function (details) {
        return __awaiter(this, void 0, void 0, function () {
            var info, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.transporter.sendMail({
                                from: "".concat(config_constants_1.SiteConstants.siteName, " <").concat(this.username, ">"),
                                to: details.to,
                                subject: details.subject,
                                text: details.text,
                                html: details.html,
                            })];
                    case 1:
                        info = _a.sent();
                        console.log('Message sent: %s', info.messageId);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //VERIFY CONNECTION
    MailService.prototype.verifyConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.transporter.verify()];
            });
        });
    };
    //CREATE TRANSPORTER
    MailService.prototype.getTransporter = function () {
        return this.transporter;
    };
    MailService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.MAIL_OPTION_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], MailService);
    return MailService;
}());
exports.default = MailService;
