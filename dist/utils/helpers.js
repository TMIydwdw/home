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
var jsdom_1 = __importDefault(require("jsdom"));
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.deepClone = function (data) {
        return data ? JSON.parse(JSON.stringify(data)) : undefined;
    };
    Helpers.randomPickFromArray = function (arrValues) {
        var arrValueIndex = Math.floor(Math.random() * arrValues.length);
        return arrValues[arrValueIndex];
    };
    Helpers.getRandomValue = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    Helpers.toCurrency = function (num) {
        return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };
    Helpers.fromCamelToTitleCase = function (input) {
        var words = input.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
        return words.map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
    };
    Helpers.mask = function (str, startChars, endChars) {
        if (startChars === void 0) { startChars = 1; }
        if (endChars === void 0) { endChars = 1; }
        var firstChars = str.slice(0, startChars);
        var lastChars = str.slice(-endChars);
        var maskedChars = '*'.repeat(str.length - startChars - endChars);
        return "".concat(firstChars).concat(maskedChars).concat(lastChars);
    };
    Helpers.clearHtml = function (body) {
        var dom = new jsdom_1.default.JSDOM(body);
        var links = dom.window.document.querySelectorAll('a[data-link-replace]');
        links.forEach(function (link) {
            var linkText = link.getAttribute('data-link-replace') || '';
            link.innerHTML = linkText;
            link.removeAttribute('href');
        });
        var text = dom.window.document.documentElement.textContent;
        return text || '';
    };
    Helpers.getClassMethods = function (classInstance) {
        var methods = [];
        for (var property in classInstance) {
            if (typeof classInstance[property] === 'function') {
                methods.push(property);
            }
        }
        return methods;
    };
    Helpers.sleepFor = function (time, unit) {
        if (unit === void 0) { unit = 'miniSeconds'; }
        return __awaiter(this, void 0, void 0, function () {
            var miniSec;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        miniSec = unit === 'seconds'
                            ? time * 1000
                            : unit === 'minutes'
                                ? time * 1000 * 60
                                : unit === 'hours'
                                    ? time * 1000 * 60 * 60
                                    : time;
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, miniSec); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Helpers.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (word) { return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(); });
    };
    return Helpers;
}());
exports.default = Helpers;
