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
var fs_1 = __importDefault(require("fs"));
var setup_1 = require("./setup");
var mongoose_1 = __importStar(require("mongoose"));
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
        }));
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
    };
    App.prototype.initialiseControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.express.use('/api', controller.router);
        });
    };
    App.prototype.initialiseStatic = function () {
        // Uploaded content (referenced from DB via /images/...)
        this.express.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
        var homeDir = path_1.default.join(__dirname, 'frontend', 'home');
        var userDir = path_1.default.join(__dirname, 'frontend', 'user');
        var adminDir = path_1.default.join(__dirname, 'frontend', 'admin');
        // Startup diagnostics: the built SPAs must exist where the backend
        // serves them from (`dist/frontend/*` in prod, `src/frontend/*` under
        // ts-node). A missing bundle here means the frontend was not built
        // (or `npm run copy-files` did not copy it) and the app would render
        // blank. Fail loud in the logs instead of serving a broken page.
        for (var _i = 0, _a = [
            ['home', homeDir],
            ['user', userDir],
            ['admin', adminDir],
        ]; _i < _a.length; _i++) {
            var _b = _a[_i], name_1 = _b[0], dir = _b[1];
            try {
                var files = fs_1.default.readdirSync(dir);
                console.log("Serving ".concat(name_1, " SPA from ").concat(dir, " (").concat(files.length, " top-level entries)"));
                if (!files.includes('index.html')) {
                    console.error("Missing index.html for ".concat(name_1, " SPA in ").concat(dir, "!"));
                }
            }
            catch (error) {
                console.error("Cannot serve ".concat(name_1, " SPA: directory missing: ").concat(dir));
            }
        }
        // Path-based SPA serving (no cookies, backend owns the session via JWT):
        //   /       -> home
        //   /user   -> user dashboard
        //   /admin  -> admin dashboard
        // Each frontend is built with its own Vite `base` (/user/, /admin/),
        // so its assets resolve under its own path prefix.
        // Exact base paths are registered before the static mounts so they
        // serve index.html directly (otherwise express.static 301-redirects
        // `/user` -> `/user/` because it maps to a directory).
        this.express.get('/user', function (req, res) {
            res.sendFile(path_1.default.join(userDir, 'index.html'));
        });
        this.express.get('/admin', function (req, res) {
            res.sendFile(path_1.default.join(adminDir, 'index.html'));
        });
        this.express.use('/user', express_1.default.static(userDir));
        this.express.use('/admin', express_1.default.static(adminDir));
        this.express.use('/', express_1.default.static(homeDir));
        // Only page navigations get the SPA shell. Missing static assets must
        // 404 loudly instead of returning index.html with 200 (browsers reject
        // HTML served as CSS/JS and the app renders as a blank page).
        // NOTE: `req.accepts('html')` alone is not enough - browsers request
        // `<script>` tags with `Accept: */*`, which matches anything. So known
        // asset extensions always fall through to the 404 handler. This is safe:
        // no SPA route in these apps ends with one of these extensions (route
        // tokens are hex, never dotted).
        var isMissingAsset = function (req) {
            return /\.(css|js|mjs|map|png|jpe?g|gif|svg|ico|webp|avif|woff2?|ttf|eot|otf|mp4|webm|json|txt|xml)$/i.test(req.path);
        };
        this.express.get('/user/*', function (req, res, next) {
            if (isMissingAsset(req) || !req.accepts('html'))
                return next();
            res.sendFile(path_1.default.join(userDir, 'index.html'));
        });
        this.express.get('/admin/*', function (req, res, next) {
            if (isMissingAsset(req) || !req.accepts('html'))
                return next();
            res.sendFile(path_1.default.join(adminDir, 'index.html'));
        });
        this.express.get('*', function (req, res, next) {
            if (req.path.startsWith('/api'))
                return next();
            if (isMissingAsset(req) || !req.accepts('html'))
                return next();
            res.sendFile(path_1.default.join(homeDir, 'index.html'));
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
