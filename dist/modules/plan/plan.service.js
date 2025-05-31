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
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var apiError_1 = require("@/core/apiError");
var plan_model_1 = __importDefault(require("@/modules/plan/plan.model"));
var PlanService = /** @class */ (function () {
    function PlanService(assetService) {
        this.assetService = assetService;
        this.planModel = plan_model_1.default;
    }
    PlanService.prototype.create = function (icon, name, engine, duration, minAmount, maxAmount, dailyPercentageProfit, description, assets) {
        return __awaiter(this, void 0, void 0, function () {
            var assetsArr, _i, assets_1, assetId, assetExist, error_1, plan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assetsArr = [];
                        _i = 0, assets_1 = assets;
                        _a.label = 1;
                    case 1:
                        if (!(_i < assets_1.length)) return [3 /*break*/, 7];
                        assetId = assets_1[_i];
                        assetExist = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.assetService.fetch({
                                _id: assetId,
                            })];
                    case 3:
                        assetExist = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        if (!(error_1 instanceof apiError_1.NotFoundError)) {
                            throw error_1;
                        }
                        return [3 /*break*/, 5];
                    case 5:
                        if (!assetExist)
                            throw new apiError_1.NotFoundError('Some of the selected assets those not exist');
                        assetsArr.push(assetExist);
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [4 /*yield*/, this.planModel.create({
                            icon: icon,
                            name: name,
                            engine: engine,
                            duration: duration,
                            minAmount: minAmount,
                            maxAmount: maxAmount,
                            dailyPercentageProfit: dailyPercentageProfit,
                            potentialPercentageProfit: dailyPercentageProfit * duration,
                            description: description,
                            assets: assetsArr,
                        })];
                    case 8:
                        plan = _a.sent();
                        return [2 /*return*/, plan.populate('assets')];
                }
            });
        });
    };
    PlanService.prototype.update = function (filter, icon, name, engine, duration, minAmount, maxAmount, dailyPercentageProfit, description, assets) {
        return __awaiter(this, void 0, void 0, function () {
            var plan, assetsArr, _i, assets_2, assetId, assetExist, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.planModel.findOne(filter).populate('assets')];
                    case 1:
                        plan = _a.sent();
                        if (!plan)
                            throw new apiError_1.NotFoundError('Plan not found');
                        assetsArr = [];
                        _i = 0, assets_2 = assets;
                        _a.label = 2;
                    case 2:
                        if (!(_i < assets_2.length)) return [3 /*break*/, 8];
                        assetId = assets_2[_i];
                        assetExist = void 0;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.assetService.fetch({
                                _id: assetId,
                            })];
                    case 4:
                        assetExist = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        if (!(error_2 instanceof apiError_1.NotFoundError)) {
                            throw error_2;
                        }
                        return [3 /*break*/, 6];
                    case 6:
                        if (!assetExist)
                            throw new apiError_1.NotFoundError('Some of the selected assets those not exist');
                        assetsArr.push(assetExist);
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8:
                        plan.name = name;
                        plan.icon = icon;
                        plan.engine = engine;
                        plan.duration = duration;
                        plan.minAmount = minAmount;
                        plan.maxAmount = maxAmount;
                        plan.dailyPercentageProfit = dailyPercentageProfit;
                        plan.potentialPercentageProfit = dailyPercentageProfit * duration;
                        plan.description = description;
                        plan.assets = assetsArr;
                        return [4 /*yield*/, plan.save()];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, plan.populate('assets')];
                }
            });
        });
    };
    PlanService.prototype.updateStatus = function (filter, status) {
        return __awaiter(this, void 0, void 0, function () {
            var plan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.planModel.findOne(filter).populate('assets')];
                    case 1:
                        plan = _a.sent();
                        if (!plan)
                            throw new apiError_1.NotFoundError('Plan not found');
                        plan.status = status;
                        return [4 /*yield*/, plan.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, plan];
                }
            });
        });
    };
    PlanService.prototype.fetch = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var plan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.planModel.findOne(filter).populate('assets')];
                    case 1:
                        plan = _a.sent();
                        if (!plan)
                            throw new apiError_1.NotFoundError('Plan not found');
                        return [2 /*return*/, plan];
                }
            });
        });
    };
    PlanService.prototype.count = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.planModel.count(filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PlanService.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var plan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.planModel.findOneAndDelete(filter)];
                    case 1:
                        plan = _a.sent();
                        if (!plan)
                            throw new apiError_1.NotFoundError('Plan not found');
                        return [2 /*return*/, plan];
                }
            });
        });
    };
    PlanService.prototype.fetchAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.planModel.find(filter).populate('assets')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PlanService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.ASSET_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], PlanService);
    return PlanService;
}());
exports.default = PlanService;
