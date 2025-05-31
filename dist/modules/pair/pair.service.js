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
var pair_model_1 = __importDefault(require("@/modules/pair/pair.model"));
var PairService = /** @class */ (function () {
    function PairService(assetService) {
        this.assetService = assetService;
        this.pairModel = pair_model_1.default;
    }
    PairService.prototype.fetch = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var pair;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pairModel
                            .findOne(query)
                            .populate('baseAsset')
                            .populate('quoteAsset')];
                    case 1:
                        pair = _a.sent();
                        if (!pair)
                            throw new apiError_1.NotFoundError('Pair not found');
                        return [2 /*return*/, pair];
                }
            });
        });
    };
    PairService.prototype.create = function (assetType, baseAssetId, quoteAssetId) {
        return __awaiter(this, void 0, void 0, function () {
            var baseAsset, quoteAsset, pairExist, pair;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.assetService.fetch({
                            _id: baseAssetId,
                            type: assetType,
                        })];
                    case 1:
                        baseAsset = _a.sent();
                        if (!baseAsset)
                            throw new apiError_1.NotFoundError('Base Asset not found');
                        if (baseAssetId.toString() === quoteAssetId.toString())
                            throw new apiError_1.RequestConflictError('Base and quote assets can not be thesame');
                        return [4 /*yield*/, this.assetService.fetch({
                                _id: quoteAssetId,
                                type: assetType,
                            })];
                    case 2:
                        quoteAsset = _a.sent();
                        if (!quoteAsset)
                            throw new apiError_1.NotFoundError('Quote Asset not found');
                        return [4 /*yield*/, this.pairModel.findOne({
                                baseAsset: baseAsset,
                                quoteAsset: quoteAsset,
                                assetType: assetType,
                            })];
                    case 3:
                        pairExist = _a.sent();
                        if (pairExist)
                            throw new apiError_1.RequestConflictError('Pair already exist');
                        return [4 /*yield*/, this.pairModel.create({
                                assetType: assetType,
                                baseAsset: baseAsset,
                                quoteAsset: quoteAsset,
                            })];
                    case 4:
                        pair = _a.sent();
                        return [4 /*yield*/, pair.populate('baseAsset')];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, pair.populate('quoteAsset')];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, pair];
                }
            });
        });
    };
    PairService.prototype.update = function (filter, assetType, baseAssetId, quoteAssetId) {
        return __awaiter(this, void 0, void 0, function () {
            var pair, pairExist, baseAsset, quoteAsset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pairModel.findOne(filter)];
                    case 1:
                        pair = _a.sent();
                        if (!pair)
                            throw new apiError_1.NotFoundError('Pair not found');
                        return [4 /*yield*/, this.pairModel.findOne({
                                $and: [
                                    { _id: { $ne: pair._id } },
                                    { assetType: assetType },
                                    { baseAsset: baseAssetId },
                                    { quoteAsset: quoteAssetId },
                                ],
                            })];
                    case 2:
                        pairExist = _a.sent();
                        if (pairExist)
                            throw new apiError_1.RequestConflictError('Pair already exist');
                        return [4 /*yield*/, this.assetService.fetch({
                                _id: baseAssetId,
                                type: assetType,
                            })];
                    case 3:
                        baseAsset = _a.sent();
                        if (!baseAsset)
                            throw new apiError_1.NotFoundError('Base Asset not found');
                        return [4 /*yield*/, this.assetService.fetch({
                                _id: quoteAssetId,
                                type: assetType,
                            })];
                    case 4:
                        quoteAsset = _a.sent();
                        if (!quoteAsset)
                            throw new apiError_1.NotFoundError('Quote Asset not found');
                        pair.assetType = assetType;
                        pair.baseAsset = baseAsset;
                        pair.quoteAsset = quoteAsset;
                        return [4 /*yield*/, pair.save()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, pair];
                }
            });
        });
    };
    PairService.prototype.fetchAll = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pairModel
                            .find(query)
                            .populate('baseAsset')
                            .populate('quoteAsset')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PairService.prototype.count = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pairModel.count(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PairService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.ASSET_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], PairService);
    return PairService;
}());
exports.default = PairService;
