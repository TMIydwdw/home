"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var fs = __importStar(require("fs-extra"));
var sharp_1 = __importDefault(require("sharp"));
var cloudinary_1 = require("cloudinary");
var imageUploader_1 = __importDefault(require("./imageUploader"));
var path_1 = __importDefault(require("path"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});
var MulterSharpResizer = /** @class */ (function () {
    function MulterSharpResizer(req, options) {
        var _this = this;
        this.req = req;
        this.options = options;
        this.files = [];
        this.data = [];
        this._imagePaths = [];
        this.options = options || {};
        var finalFilename = {};
        var finalPaths = [];
        Object.keys(this.options.filename).forEach(function (val, i) {
            //@ts-ignore
            if (_this.req.files[val]) {
                //@ts-ignore
                finalFilename[val] = _this.options.filename[val];
                finalPaths.push(_this.options.paths[i]);
            }
        });
        this.options.filename = finalFilename;
        this.options.paths = finalPaths;
    }
    MulterSharpResizer.prototype.isUploadedFile = function (obj) {
        return (obj &&
            typeof obj.name === 'string' &&
            typeof obj.mv === 'function' &&
            typeof obj.data === 'string' &&
            typeof obj.tempFilePath === 'string');
    };
    MulterSharpResizer.prototype.resize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i_1, _loop_1, this_1, _a, _b, _c, _i, p;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.req.files) return [3 /*break*/, 5];
                        if (!!Array.isArray(this.req.files)) return [3 /*break*/, 5];
                        i_1 = 0;
                        _loop_1 = function (p) {
                            var filesArray;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        filesArray = this_1.req.files[p];
                                        return [4 /*yield*/, Promise.all(filesArray.map(function (f, j) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.resizeImage(f, j, p, typeof this.options.filename === 'object'
                                                                ? this.options.filename[p]
                                                                : this.options.filename, i_1++)];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); }))];
                                    case 1:
                                        _e.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a = this.req.files;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 3];
                        p = _c;
                        return [5 /*yield**/, _loop_1(p)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                    case 5:
                        if (!this.req.file) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.resizeImage(this.req.file, 0)]; // provide a value for 'i'
                    case 6: return [2 /*return*/, _d.sent()]; // provide a value for 'i'
                    case 7:
                        if (!this.req.files) return [3 /*break*/, 9];
                        return [4 /*yield*/, Promise.all(this.req.files.map(function (f, i) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.resizeImage(f, i)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    MulterSharpResizer.prototype.getData = function () {
        var _a, _b;
        var _this = this;
        if (this.req.files) {
            if (!Array.isArray(this.req.files)) {
                return this.removeProps(this.getDataWithFields(), 'field');
            }
            else {
                for (var i = 0; i < this.req.files.length - 1; i++) {
                    var files = this.files.splice(0, this.options.sizes.length);
                    (_a = this.data).push.apply(_a, files);
                }
            }
        }
        (_b = this.data).push.apply(_b, this.files);
        return this.data.map(function (f) {
            return _this.renameKeys(_this.options.sizes.map(function (s) { return s.path; }), f);
        });
    };
    MulterSharpResizer.prototype.renameKeys = function (keys, obj) {
        var _this = this;
        return Object.keys(obj).reduce(function (acc, key, index) {
            var _a;
            _this.tmpName = obj[key].name;
            _this.tmpField = obj[key].field;
            delete obj[key].name;
            delete obj[key].field;
            return __assign(__assign(__assign({}, acc), { name: _this.tmpName, field: _this.tmpField }), (_a = {}, _a[keys[index]] = obj[key], _a));
        }, {});
    };
    MulterSharpResizer.prototype.resizeImage = function (f, i, p, filenameParam, index) {
        if (p === void 0) { p = ''; }
        if (filenameParam === void 0) { filenameParam = this.options.filename; }
        if (index === void 0) { index = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.options.sizes.map(function (s, j) {
                            _this.ext = f.mimetype.split('/')[1];
                            if (typeof filenameParam === 'string') {
                                _this.name = "".concat(filenameParam.split(/\.([^.]+)$/)[0]).concat(i !== undefined ? "-".concat(i) : '', ".").concat(_this.ext);
                            }
                            _this.path = path_1.default.join(_this.options.paths[index], s.path);
                            fs.mkdirsSync(_this.path);
                            _this.files.push(__assign(__assign({ name: _this.name || 'unknown' }, (p && { field: p })), { path: path_1.default.join(_this.options.url, s.path, _this.name || 'unknown') }));
                            if (!_this.name)
                                _this.name = 'unknown';
                            _this._imagePaths.push({
                                path: s.path,
                                folder: _this.path,
                                name: _this.name,
                                fullPath: path_1.default.join(_this.path, _this.name),
                            });
                            var finalIndex = _this.options.sizes.length * index + j;
                            // @ts-ignore
                            return (0, sharp_1.default)(f.buffer)
                                .resize(s.width, s.height, _this.options.options)
                                .toFile(path_1.default.join(_this.path, _this.name))
                                .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                var details;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            details = {
                                                path: this._imagePaths[finalIndex].path,
                                                folder: this._imagePaths[finalIndex].folder,
                                                name: this._imagePaths[finalIndex].name,
                                                fullPath: path_1.default.join(this._imagePaths[finalIndex].folder, this._imagePaths[finalIndex].name),
                                            };
                                            return [4 /*yield*/, this.uploadToCloud(details)];
                                        case 1:
                                            _a.sent();
                                            this.deleteTempFile(details);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .catch(function (err) {
                                console.log(err);
                            });
                        }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MulterSharpResizer.prototype.uploadToCloud = function (_a) {
        var folder = _a.folder, name = _a.name, paths = _a.path, fullPath = _a.fullPath;
        return __awaiter(this, void 0, void 0, function () {
            var folders, options, result, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!imageUploader_1.default.externalHosting)
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        folders = folder
                            .split(/[/|\\]+/)
                            .splice(-2)
                            .join('/');
                        options = {
                            use_filename: true,
                            unique_filename: false,
                            overwrite: true,
                            folder: process.env.CLOUDINARY_PROJECT + '/' + folders,
                        };
                        return [4 /*yield*/, cloudinary_1.v2.uploader.upload(fullPath, options)];
                    case 2:
                        result = _b.sent();
                        console.log(result.public_id);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MulterSharpResizer.prototype.deleteTempFile = function (_a) {
        var fullPath = _a.fullPath;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (!imageUploader_1.default.folderAsTemp)
                    return [2 /*return*/];
                fs.access(fullPath, function (err) {
                    if (err) {
                        return;
                    }
                    fs.unlink(fullPath, function (err) {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        console.log('Deleted');
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    MulterSharpResizer.prototype.getDataWithFields = function () {
        var _this = this;
        for (var p in this.req.files) {
            // @ts-ignore
            if (Array.isArray(this.req.files[p])) {
                // @ts-ignore
                for (var i = 0; i < this.req.files[p].length; i++) {
                    // @ts-ignore
                    this.data.push(__assign({}, this.files.splice(0, this.options.sizes.length)));
                }
            }
            else {
                // @ts-ignore
                this.data.push(__assign({}, this.files.splice(0, this.options.sizes.length)));
            }
        }
        return this.groupByFields(this.data.map(function (f) {
            return _this.renameKeys(__assign({}, _this.options.sizes.map(function (s, i) { return s.path; })), f);
        }), 'field');
    };
    MulterSharpResizer.prototype.groupByFields = function (array, prop) {
        return array.reduce(function (r, a) {
            r[a[prop]] = r[a[prop]] || [];
            r[a[prop]].push(a);
            return r;
        }, Object.create(null));
    };
    MulterSharpResizer.prototype.removeProps = function (obj, propToDelete) {
        for (var property in obj) {
            if (typeof obj[property] == 'object') {
                delete obj.property;
                var newData = this.removeProps(obj[property], propToDelete);
                obj[property] = newData;
            }
            else {
                if (property === propToDelete) {
                    delete obj[property];
                }
            }
        }
        return obj;
    };
    return MulterSharpResizer;
}());
exports.default = MulterSharpResizer;
