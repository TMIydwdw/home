"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityCategory = exports.ActivityForWho = exports.ActivityStatus = void 0;
var ActivityStatus;
(function (ActivityStatus) {
    ActivityStatus["HIDDEN"] = "hidden";
    ActivityStatus["VISIBLE"] = "visible";
})(ActivityStatus = exports.ActivityStatus || (exports.ActivityStatus = {}));
var ActivityForWho;
(function (ActivityForWho) {
    ActivityForWho["ADMIN"] = "admin";
    ActivityForWho["USER"] = "user";
})(ActivityForWho = exports.ActivityForWho || (exports.ActivityForWho = {}));
var ActivityCategory;
(function (ActivityCategory) {
    ActivityCategory["PROFILE"] = "profile";
})(ActivityCategory = exports.ActivityCategory || (exports.ActivityCategory = {}));
