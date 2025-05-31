"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var joi_1 = require("joi");
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var setup_1 = require("./setup");
var mongoose_1 = __importStar(require("mongoose"));
var csrf_1 = require("@/helpers/csrf");
var apiError_1 = require("@/core/apiError");
var App = /** @class */ (function () {
    function App(controllers, port, isTest, database) {
        var _this = this;
        this.controllers = controllers;
        this.port = port;
        this.isTest = isTest;
        this.database = database;
        this.express = (0, express_1.default)();
        this.beforeStart().then(function () {
            _this.initialiseMiddleware();
            _this.initialiseControllers(controllers);
            _this.initialiseStatic();
            _this.initialiseErrorHandling();
        });
    }
    App.prototype.initialiseMiddleware = function () {
        this.express.use((0, helmet_1.default)({
            crossOriginResourcePolicy: { policy: 'cross-origin' },
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '*'],
                    imgSrc: ["'self'", 'blob:', '*'],
                    connectSrc: ["'self'", '*'],
                    frameSrc: ["'self'", '*'],
                },
            },
        }));
        this.express.use(function (req, res, next) {
            res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
            next();
        });
        this.express.use((0, cors_1.default)({
            origin: [
                'http://localhost:5173',
                'http://localhost:5174',
                'http://localhost:5175',
            ],
            credentials: true,
        }));
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
        this.express.use((0, cookie_parser_1.default)());
        // if (!this.isTest) this.express.use(doubleCsrfProtection)
        this.express.get('/api/token', function (req, res, next) {
            res.json({ token: req.csrfToken && req.csrfToken() });
        });
    };
    App.prototype.initialiseControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.express.use('/api', controller.router);
        });
    };
    App.prototype.initialiseStatic = function () {
        this.express.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
        this.express.use('/css', function (req, res, next) {
            if (req.cookies.request_code == '200') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'admin', 'css'))(req, res, next);
            }
            else if (req.cookies.request_code == '100') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'user', 'css'))(req, res, next);
            }
            else {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'home', 'css'))(req, res, next);
            }
        });
        this.express.use('/assets', function (req, res, next) {
            if (req.cookies.request_code == '200') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'admin', 'assets'))(req, res, next);
            }
            else if (req.cookies.request_code == '100') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'user', 'assets'))(req, res, next);
            }
            else {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'home', 'assets'))(req, res, next);
            }
        });
        this.express.use('/Edge', function (req, res, next) {
            if (req.cookies.request_code == '200') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'admin', 'Edge'))(req, res, next);
            }
            else if (req.cookies.request_code == '100') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'user', 'Edge'))(req, res, next);
            }
            else {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'home', 'Edge'))(req, res, next);
            }
        });
        this.express.use('/img', function (req, res, next) {
            if (req.cookies.request_code == '200') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'admin', 'img'))(req, res, next);
            }
            else if (req.cookies.request_code == '100') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'user', 'img'))(req, res, next);
            }
            else {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'home', 'img'))(req, res, next);
            }
        });
        this.express.use('/images', function (req, res, next) {
            if (req.cookies.request_code == '200') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'admin', 'images'))(req, res, next);
            }
            else if (req.cookies.request_code == '100') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'user', 'images'))(req, res, next);
            }
            else {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'home', 'images'))(req, res, next);
            }
        });
        this.express.use('/icon', function (req, res, next) {
            if (req.cookies.request_code == '200') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'admin', 'icon'))(req, res, next);
            }
            else if (req.cookies.request_code == '100') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'user', 'icon'))(req, res, next);
            }
            else {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'home', 'icon'))(req, res, next);
            }
        });
        this.express.use('/icons', function (req, res, next) {
            if (req.cookies.request_code == '200') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'admin', 'icons'))(req, res, next);
            }
            else if (req.cookies.request_code == '100') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'user', 'icons'))(req, res, next);
            }
            else {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'home', 'icons'))(req, res, next);
            }
        });
        this.express.use('/js', function (req, res, next) {
            if (req.cookies.request_code == '200') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'admin', 'js'))(req, res, next);
            }
            else if (req.cookies.request_code == '100') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'user', 'js'))(req, res, next);
            }
            else {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'home', 'js'))(req, res, next);
            }
        });
        this.express.use('/svg', function (req, res, next) {
            if (req.cookies.request_code == '200') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'admin', 'svg'))(req, res, next);
            }
            else if (req.cookies.request_code == '100') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'user', 'svg'))(req, res, next);
            }
            else {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'home', 'svg'))(req, res, next);
            }
        });
        this.express.use('/Trident', function (req, res, next) {
            if (req.cookies.request_code == '200') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'admin', 'Trident'))(req, res, next);
            }
            else if (req.cookies.request_code == '100') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'user', 'Trident'))(req, res, next);
            }
            else {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'home', 'Trident'))(req, res, next);
            }
        });
        this.express.use('/vendor', function (req, res, next) {
            if (req.cookies.request_code == '200') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'admin', 'vendor'))(req, res, next);
            }
            else if (req.cookies.request_code == '100') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'user', 'vendor'))(req, res, next);
            }
            else {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'home', 'vendor'))(req, res, next);
            }
        });
        this.express.use('/s', function (req, res, next) {
            if (req.cookies.request_code == '200') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'admin', 's'))(req, res, next);
            }
            else if (req.cookies.request_code == '100') {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'user', 's'))(req, res, next);
            }
            else {
                express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'home', 's'))(req, res, next);
            }
        });
        this.express.get(/.*/, function (req, res) {
            if (req.cookies.request_code == '200') {
                res.sendFile(path_1.default.join(__dirname, 'frontend', 'admin', 'index.html'));
            }
            else if (req.cookies.request_code == '100') {
                res.sendFile(path_1.default.join(__dirname, 'frontend', 'user', 'index.html'));
            }
            else {
                res.sendFile(path_1.default.join(__dirname, 'frontend', 'home', 'index.html'));
            }
        });
    };
    App.prototype.initialiseErrorHandling = function () {
        // 404 Error
        this.express.use(function (req, res, next) {
            return next(new apiError_1.NotFoundError('Sorry, the resourse you requested could not be found.'));
        });
        // Catch thrown Errors
        this.express.use(function (err, req, res, next) {
            if (err instanceof apiError_1.ApiError) {
                apiError_1.ApiError.handle(err, res);
            }
            else if (err === csrf_1.invalidCsrfTokenError) {
                apiError_1.ApiError.handle(new apiError_1.InvalidCsrfTokenError(), res);
            }
            else if (err instanceof joi_1.ValidationError) {
                apiError_1.ApiError.handle(new apiError_1.SchemaValidationError(err), res);
            }
            else if (err instanceof mongoose_1.Error.CastError) {
                apiError_1.ApiError.handle(new apiError_1.MongooseCastError(), res);
            }
            else {
                apiError_1.ApiError.notifyDeveloper(err);
                apiError_1.ApiError.handle(new apiError_1.InternalError(), res);
            }
        });
    };
    App.prototype.initialiseDatabaseConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.database)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!this.database.mogodbUri) return [3 /*break*/, 3];
                        return [4 /*yield*/, mongoose_1.default.connect("".concat(this.database.mogodbUri))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        console.log('DB CONNECTED');
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.beforeStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initialiseDatabaseConnection()];
                    case 1:
                        _a.sent();
                        if (!this.isTest) {
                            setup_1.transferSettingsService.fetch({}).catch(function (err) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(err.error instanceof apiError_1.NotFoundError)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, setup_1.transferSettingsService.create(false, 0)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2: throw err;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); });
                            setup_1.referralSettingsService.fetch({}).catch(function (err) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(err.error instanceof apiError_1.NotFoundError)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, setup_1.referralSettingsService.create(10, 5, 15, 10, 10)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2: throw err;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.express.listen(this.port, function () {
            console.log("App listenig on port ".concat(_this.port));
        });
    };
    return App;
}());
exports.default = App;
