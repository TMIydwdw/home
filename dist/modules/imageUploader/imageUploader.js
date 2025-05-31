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
var path_1 = __importDefault(require("path"));
var crypto_1 = require("crypto");
var multer_1 = __importDefault(require("multer"));
var multerSharpResizer_1 = __importDefault(require("./multerSharpResizer"));
var fs = __importStar(require("fs-extra"));
var cloudinary_1 = require("cloudinary");
var imageUploader_enum_1 = require("./imageUploader.enum");
var apiError_1 = require("@/core/apiError");
var ImageUploader = /** @class */ (function () {
    function ImageUploader() {
    }
    ImageUploader.prototype._multerFilter = function (req, file, cb) {
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/gif' ||
            file.mimetype === 'image/jpeg') {
            return cb(null, true);
        }
        else
            cb(new apiError_1.BadRequestError('Invalid Image format'), false);
    };
    ImageUploader.prototype._upload = function () {
        return (0, multer_1.default)({
            storage: multer_1.default.memoryStorage(),
            fileFilter: this._multerFilter,
            limits: {
                fileSize: ImageUploader.maxSize,
            },
        });
    };
    ImageUploader.prototype.setNames = function (nameAndMaxCountArr) {
        var _this = this;
        return function (req, res, next) {
            _this._upload().fields(nameAndMaxCountArr)(req, res, function (err) {
                if (err instanceof multer_1.default.MulterError) {
                    console.log(err);
                    return next(new apiError_1.BadRequestError(err.message));
                }
                else if (err) {
                    console.log(err);
                    var error = err.status
                        ? new apiError_1.BadRequestError(err.message)
                        : new Error(err);
                    return next(error);
                }
                next();
            });
        };
    };
    ImageUploader.prototype.resize = function (imageNameArr, sizesArr) {
        var _this = this;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var filename_1, folderArr_1, sizes, uploadPath_1, fileUrl, sharpOptions, resizeObject, getDataUploaded_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        filename_1 = {};
                        folderArr_1 = imageNameArr.slice();
                        imageNameArr.forEach(function (imageName, i) {
                            filename_1[imageName] = "".concat(folderArr_1[i], "-").concat((0, crypto_1.randomUUID)());
                        });
                        sizes = ImageUploader.sizes.filter(function (obj) {
                            if (!sizesArr)
                                return true;
                            if (sizesArr.includes(obj.path))
                                return true;
                        });
                        uploadPath_1 = [];
                        folderArr_1.forEach(function (folder) {
                            uploadPath_1.push(path_1.default.join(ImageUploader.uploadFolder, folder));
                        });
                        fileUrl = "".concat(req.protocol, "://").concat(req.get('host'), "/").concat(ImageUploader.uploadTo, "/").concat(folderArr_1[0]);
                        sharpOptions = {
                            fit: ImageUploader.imageFit,
                            background: ImageUploader.backgroundColor,
                        };
                        resizeObject = new multerSharpResizer_1.default(req, {
                            filename: filename_1,
                            sizes: sizes,
                            paths: uploadPath_1,
                            url: fileUrl,
                            options: sharpOptions,
                        });
                        return [4 /*yield*/, resizeObject.resize()];
                    case 1:
                        _a.sent();
                        getDataUploaded_1 = resizeObject.getData();
                        imageNameArr.forEach(function (imageName) {
                            req.body[imageName] = getDataUploaded_1[imageName];
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, next(new Error(err_1))];
                    case 3:
                        next();
                        return [2 /*return*/];
                }
            });
        }); };
    };
    ImageUploader.prototype.delete = function (folder, filename, sizesArr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('deleted');
                sizesArr.forEach(function (size) {
                    var filePath = path_1.default.join(ImageUploader.uploadFolder, folder, size, filename);
                    if (ImageUploader.externalHosting) {
                        var deleteId = process.env.CLOUDINARY_PROJECT +
                            '/' +
                            folder +
                            '/' +
                            size +
                            '/' +
                            filename.split('.').slice(0, -1).join('.');
                        cloudinary_1.v2.uploader.destroy(deleteId).then(function (res) {
                            console.log(res);
                        });
                    }
                    else {
                        fs.access(filePath, function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            fs.unlink(filePath, function (err) {
                                if (err) {
                                    console.log(err);
                                    throw err;
                                }
                            });
                        });
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ImageUploader.uploadTo = path_1.default.join('src', 'images');
    ImageUploader.uploadFolder = path_1.default.join(process.cwd(), 'src', 'images');
    // Configure only
    ImageUploader.externalHosting = process.env.EXTERNAL_IMAGE_HOST === 'true';
    ImageUploader.imageHost = process.env.IMAGE_HOST;
    ImageUploader.folderAsTemp = process.env.IMAGE_FOLDER_AS_TEMP === 'true';
    ImageUploader.maxSize = 11485760;
    ImageUploader.sizes = [
        { path: imageUploader_enum_1.ImageUploaderSizes.ORIGINAL, width: null, height: null },
        { path: imageUploader_enum_1.ImageUploaderSizes.ITEM_VIEW, width: 1742, height: 980 },
        { path: imageUploader_enum_1.ImageUploaderSizes.ITEM_HERO, width: 940, height: 640 },
        { path: imageUploader_enum_1.ImageUploaderSizes.ITEM_COVER, width: 470, height: 600 },
        { path: imageUploader_enum_1.ImageUploaderSizes.ITEM_CARD, width: 450, height: 450 },
        { path: imageUploader_enum_1.ImageUploaderSizes.ITEM_PROFILE, width: 150, height: 150 },
        { path: imageUploader_enum_1.ImageUploaderSizes.COVER_MAIN, width: 1920, height: 320 },
        { path: imageUploader_enum_1.ImageUploaderSizes.COVER_PROFILE, width: 600, height: 100 },
        { path: imageUploader_enum_1.ImageUploaderSizes.COVER_CARD, width: 340, height: 100 },
        { path: imageUploader_enum_1.ImageUploaderSizes.COVER_MENU, width: 240, height: 42 },
        { path: imageUploader_enum_1.ImageUploaderSizes.PROFILE_MAIN, width: 164, height: 164 },
        { path: imageUploader_enum_1.ImageUploaderSizes.PROFILE_CARD, width: 100, height: 100 },
        { path: imageUploader_enum_1.ImageUploaderSizes.PROFILE_NAV, width: 50, height: 50 },
        { path: imageUploader_enum_1.ImageUploaderSizes.PROFILE_ICON, width: 24, height: 24 },
    ];
    ImageUploader.imageFit = 'cover';
    ImageUploader.backgroundColor = { r: 255, g: 255, b: 255 };
    return ImageUploader;
}());
exports.default = ImageUploader;
