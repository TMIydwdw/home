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
var depositMethod_enum_1 = require("@/modules/depositMethod/depositMethod.enum");
var apiError_1 = require("@/core/apiError");
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var depositMethod_model_1 = __importDefault(require("@/modules/depositMethod/depositMethod.model"));
var DepositMethodService = /** @class */ (function () {
    function DepositMethodService(currencyService) {
        this.currencyService = currencyService;
        this.depositMethodModel = depositMethod_model_1.default;
    }
    DepositMethodService.prototype.create = function (currencyId, address, network, fee, minDeposit) {
        return __awaiter(this, void 0, void 0, function () {
            var currency, depositMethodExist, depositMethod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (fee >= minDeposit)
                            throw new apiError_1.BadRequestError('Min deposit must be greater than the fee');
                        return [4 /*yield*/, this.currencyService.fetch({ _id: currencyId })];
                    case 1:
                        currency = _a.sent();
                        return [4 /*yield*/, this.depositMethodModel.findOne({
                                currency: currency._id,
                                network: network,
                            })];
                    case 2:
                        depositMethodExist = _a.sent();
                        if (depositMethodExist)
                            throw new apiError_1.RequestConflictError('This deposit method already exist');
                        return [4 /*yield*/, this.depositMethodModel.create({
                                currency: currency,
                                address: address,
                                network: network,
                                fee: fee,
                                minDeposit: minDeposit,
                                status: depositMethod_enum_1.DepositMethodStatus.ENABLED,
                                autoUpdate: true,
                                price: 1,
                            })];
                    case 3:
                        depositMethod = _a.sent();
                        return [2 /*return*/, depositMethod.populate('currency')];
                }
            });
        });
    };
    DepositMethodService.prototype.update = function (query, currencyId, address, network, fee, minDeposit) {
        return __awaiter(this, void 0, void 0, function () {
            var depositMethod, currency, depositMethodExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (fee >= minDeposit)
                            throw new apiError_1.BadRequestError('Min deposit must be greater than the fee');
                        return [4 /*yield*/, this.depositMethodModel.findOne(query)];
                    case 1:
                        depositMethod = _a.sent();
                        if (!depositMethod)
                            throw new apiError_1.NotFoundError('Deposit method not found');
                        return [4 /*yield*/, this.currencyService.fetch({ _id: currencyId })];
                    case 2:
                        currency = _a.sent();
                        return [4 /*yield*/, this.depositMethodModel.findOne({
                                currency: currency._id,
                                network: network,
                                _id: { $ne: depositMethod._id },
                            })];
                    case 3:
                        depositMethodExist = _a.sent();
                        if (depositMethodExist)
                            throw new apiError_1.RequestConflictError('This deposit method already exist');
                        depositMethod.currency = currency;
                        depositMethod.address = address;
                        depositMethod.network = network;
                        depositMethod.fee = fee;
                        depositMethod.minDeposit = minDeposit;
                        return [4 /*yield*/, depositMethod.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, depositMethod.populate('currency')];
                }
            });
        });
    };
    DepositMethodService.prototype.fetch = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var depositMethod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositMethodModel
                            .findOne(query)
                            .populate('currency')];
                    case 1:
                        depositMethod = _a.sent();
                        if (!depositMethod)
                            throw new apiError_1.NotFoundError('Deposit method not found');
                        return [2 /*return*/, depositMethod];
                }
            });
        });
    };
    DepositMethodService.prototype.delete = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var depositMethod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositMethodModel
                            .findOne(query)
                            .populate('currency')];
                    case 1:
                        depositMethod = _a.sent();
                        if (!depositMethod)
                            throw new apiError_1.NotFoundError('Deposit method not found');
                        return [4 /*yield*/, depositMethod.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, depositMethod];
                }
            });
        });
    };
    DepositMethodService.prototype.updateStatus = function (query, status) {
        return __awaiter(this, void 0, void 0, function () {
            var depositMethod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositMethodModel
                            .findOne(query)
                            .populate('currency')];
                    case 1:
                        depositMethod = _a.sent();
                        if (!depositMethod)
                            throw new apiError_1.NotFoundError('Deposit method not found');
                        depositMethod.status = status;
                        return [4 /*yield*/, depositMethod.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, depositMethod];
                }
            });
        });
    };
    DepositMethodService.prototype.updateMode = function (query, autoUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var depositMethod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositMethodModel
                            .findOne(query)
                            .populate('currency')];
                    case 1:
                        depositMethod = _a.sent();
                        if (!depositMethod)
                            throw new apiError_1.NotFoundError('Deposit method not found');
                        depositMethod.autoUpdate = autoUpdate;
                        return [4 /*yield*/, depositMethod.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, depositMethod];
                }
            });
        });
    };
    DepositMethodService.prototype.updatePrice = function (query, price) {
        return __awaiter(this, void 0, void 0, function () {
            var depositMethod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositMethodModel
                            .findOne(query)
                            .populate('currency')];
                    case 1:
                        depositMethod = _a.sent();
                        if (!depositMethod)
                            throw new apiError_1.NotFoundError('Deposit method not found');
                        if (depositMethod.autoUpdate)
                            throw new apiError_1.BadRequestError('Can not update a deposit method price that is on auto update mode');
                        depositMethod.price = price;
                        return [4 /*yield*/, depositMethod.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, depositMethod];
                }
            });
        });
    };
    DepositMethodService.prototype.fetchAll = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositMethodModel
                            .find(query)
                            .sort({ createdAt: -1 })
                            .populate('currency')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DepositMethodService.prototype.count = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositMethodModel.count(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DepositMethodService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.CURRENCY_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], DepositMethodService);
    return DepositMethodService;
}());
exports.default = DepositMethodService;
