"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var activity_enum_1 = require("@/modules/activity/activity.enum");
var typedi_1 = require("typedi");
var apiError_1 = require("@/core/apiError");
var activity_model_1 = __importDefault(require("./activity.model"));
var ActivityService = /** @class */ (function () {
    function ActivityService() {
        this.activityModel = activity_model_1.default;
    }
    ActivityService.prototype.create = function (user, forWho, category, message) {
        return __awaiter(this, void 0, void 0, function () {
            var activity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.activityModel.create({
                            user: user,
                            category: category,
                            message: message,
                            forWho: forWho,
                        })];
                    case 1:
                        activity = _a.sent();
                        return [2 /*return*/, activity.populate('user')];
                }
            });
        });
    };
    ActivityService.prototype.fetchAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var activities;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.activityModel.find(filter).populate('user')];
                    case 1:
                        activities = _a.sent();
                        return [2 /*return*/, activities];
                }
            });
        });
    };
    ActivityService.prototype.hide = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var activity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.activityModel.findOne(filter).populate('user')];
                    case 1:
                        activity = _a.sent();
                        if (!activity)
                            throw new apiError_1.NotFoundError('Activity not found');
                        activity.status = activity_enum_1.ActivityStatus.HIDDEN;
                        return [4 /*yield*/, activity.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, activity];
                }
            });
        });
    };
    ActivityService.prototype.hideAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var activities, _i, activities_1, activity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.activityModel.find(filter).populate('user')];
                    case 1:
                        activities = _a.sent();
                        if (!activities.length)
                            throw new apiError_1.NotFoundError('No Activities found');
                        _i = 0, activities_1 = activities;
                        _a.label = 2;
                    case 2:
                        if (!(_i < activities_1.length)) return [3 /*break*/, 5];
                        activity = activities_1[_i];
                        activity.status = activity_enum_1.ActivityStatus.HIDDEN;
                        return [4 /*yield*/, activity.save()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ActivityService.prototype.count = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.activityModel.count(filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ActivityService.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var activity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.activityModel.findOne(filter).populate('user')];
                    case 1:
                        activity = _a.sent();
                        if (!activity)
                            throw new apiError_1.NotFoundError('Activity not found');
                        return [4 /*yield*/, this.activityModel.deleteOne({ _id: activity._id })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, activity];
                }
            });
        });
    };
    ActivityService.prototype.deleteAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var activities, _i, activities_2, activity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.activityModel.find(filter).populate('user')];
                    case 1:
                        activities = _a.sent();
                        if (!activities.length)
                            throw new apiError_1.NotFoundError('No Activities found');
                        _i = 0, activities_2 = activities;
                        _a.label = 2;
                    case 2:
                        if (!(_i < activities_2.length)) return [3 /*break*/, 5];
                        activity = activities_2[_i];
                        return [4 /*yield*/, this.activityModel.deleteOne({ _id: activity._id })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ActivityService = __decorate([
        (0, typedi_1.Service)()
    ], ActivityService);
    return ActivityService;
}());
exports.default = ActivityService;
