"use strict";
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
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var multerSharpResizer_1 = __importDefault(require("./multerSharpResizer"));
var imageFile_config_1 = __importDefault(require("./imageFile.config"));
var apiError_1 = require("@/core/apiError");
var rimraf_1 = require("rimraf");
var ImageFileService = /** @class */ (function () {
    function ImageFileService() {
    }
    ImageFileService.delete = function (parentFolder, fileFolder) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        filePath = path_1.default.join(process.cwd(), imageFile_config_1.default.uploadTo || 'images', parentFolder, fileFolder);
                        return [4 /*yield*/, (0, rimraf_1.rimraf)(filePath)];
                    case 1:
                        _b.sent();
                        console.log('deleted:', filePath);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    _a = ImageFileService;
    ImageFileService.validate = function (imagesToValidate, maxFileSize, mimeTypes) {
        return function (req, res, next) {
            maxFileSize = maxFileSize || imageFile_config_1.default.maxFileSize;
            mimeTypes = mimeTypes || imageFile_config_1.default.mimeTypes;
            // Setting Defaults
            imagesToValidate.forEach(function (imageToValidate, i) {
                imagesToValidate[i].maxCount =
                    imageToValidate.maxCount || imageFile_config_1.default.maxCount;
            });
            // Multer Fields
            var fields = imagesToValidate.map(function (ele) {
                return {
                    name: ele.name,
                    maxCount: ele.maxCount,
                };
            });
            _a._prepare(maxFileSize, mimeTypes).fields(fields)(req, res, function (err) {
                if (err) {
                    return next(err);
                }
                return next();
            });
        };
    };
    ImageFileService._multerFilter = function (mimeTypes) { return function (req, file, cb) {
        if (!mimeTypes || (mimeTypes && mimeTypes.includes(file.mimetype))) {
            return cb(null, true);
        }
        else
            cb(new apiError_1.BadRequestError('Invalid Image format'), false);
    }; };
    ImageFileService._prepare = function (maxFileSize, mimeTypes) {
        return (0, multer_1.default)({
            storage: multer_1.default.memoryStorage(),
            fileFilter: _a._multerFilter(mimeTypes),
            limits: {
                fileSize: maxFileSize,
            },
        });
    };
    // public resize(imageNameArr: string[], sizesArr: any) {
    ImageFileService.upload = function (imagesToUploadParams) {
        return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
            var imagesToUpload, i, imageToUploadParams, uploadTo, files, uniqueFileFolder, _b, err_1;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 7, , 8]);
                        imagesToUpload = [];
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < imagesToUploadParams.length)) return [3 /*break*/, 5];
                        imageToUploadParams = imagesToUploadParams[i];
                        imagesToUploadParams[i].getFolderName =
                            imageToUploadParams.getFolderName || imageFile_config_1.default.getFolderName;
                        imagesToUploadParams[i].parentFolder =
                            imageToUploadParams.parentFolder || imageToUploadParams.name;
                        imagesToUploadParams[i].resize = imageToUploadParams.resize ||
                            imageFile_config_1.default.resize || [
                            {
                                height: null,
                                width: null,
                                name: 'default',
                            },
                        ];
                        uploadTo = imageFile_config_1.default.uploadTo || 'images';
                        imagesToUploadParams[i].fit =
                            imageToUploadParams.fit || imageFile_config_1.default.fit;
                        imagesToUploadParams[i].background =
                            imageToUploadParams.background || imageFile_config_1.default.background;
                        imagesToUploadParams[i].extension =
                            imageToUploadParams.extension || imageFile_config_1.default.extension;
                        files = req.files;
                        _b = imagesToUploadParams[i].getFolderName;
                        if (!_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, imagesToUploadParams[i].getFolderName(files[imageToUploadParams.name])];
                    case 2:
                        _b = (_c.sent());
                        _c.label = 3;
                    case 3:
                        uniqueFileFolder = (_b) ||
                            crypto.randomUUID();
                        imagesToUpload.push({
                            name: imagesToUploadParams[i].name,
                            uniqueFileFolder: uniqueFileFolder,
                            background: imagesToUploadParams[i].background,
                            fit: imagesToUploadParams[i].fit,
                            extension: imagesToUploadParams[i].extension,
                            filePath: path_1.default.join(process.cwd(), uploadTo, imagesToUploadParams[i].parentFolder, uniqueFileFolder),
                            parentFolder: imagesToUploadParams[i].parentFolder,
                            sizes: imagesToUploadParams[i].resize,
                            url: "".concat(req.protocol, "://").concat(req.get('host'), "/").concat(uploadTo.replace('\\', '/'), "/").concat(imagesToUploadParams[i].parentFolder, "/").concat(uniqueFileFolder),
                        });
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [4 /*yield*/, new multerSharpResizer_1.default(req, imagesToUpload).resize()];
                    case 6:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _c.sent();
                        return [2 /*return*/, next(new Error(err_1))];
                    case 8:
                        next();
                        return [2 /*return*/];
                }
            });
        }); };
    };
    return ImageFileService;
}());
exports.default = ImageFileService;
