"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEnvironment = exports.UserMiningStatus = exports.UserKycVerificationStatus = exports.UserLevel = exports.UserAccount = exports.UserStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["USER"] = 1] = "USER";
    UserRole[UserRole["ADMIN"] = 2] = "ADMIN";
    UserRole[UserRole["SUPER_ADMIN"] = 3] = "SUPER_ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["SUSPENDED"] = "suspended";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var UserAccount;
(function (UserAccount) {
    UserAccount["PROFIT"] = "profit";
    UserAccount["MAIN_BALANCE"] = "mainBalance";
    UserAccount["REFERRAL_BALANCE"] = "referralBalance";
    UserAccount["DEMO_BALANCE"] = "demoBalance";
    UserAccount["BONUS_BALANCE"] = "bonusBalance";
})(UserAccount = exports.UserAccount || (exports.UserAccount = {}));
var UserLevel;
(function (UserLevel) {
    UserLevel["LEVEL_1"] = "Starter";
    UserLevel["LEVEL_2"] = "Premium";
    UserLevel["LEVEL_3"] = "Platinum";
    UserLevel["LEVEL_4"] = "Silver";
    UserLevel["LEVEL_5"] = "Gold";
})(UserLevel = exports.UserLevel || (exports.UserLevel = {}));
var UserKycVerificationStatus;
(function (UserKycVerificationStatus) {
    UserKycVerificationStatus["PENDING"] = "Pending";
    UserKycVerificationStatus["PROCESSING"] = "Processing";
    UserKycVerificationStatus["APPROVED"] = "Approved";
    UserKycVerificationStatus["REJECTED"] = "Rejected";
})(UserKycVerificationStatus = exports.UserKycVerificationStatus || (exports.UserKycVerificationStatus = {}));
var UserMiningStatus;
(function (UserMiningStatus) {
    UserMiningStatus["PENDING"] = "Pending";
    UserMiningStatus["RUNNING"] = "Running";
    UserMiningStatus["SUSPENDED"] = "Suspended";
    UserMiningStatus["COMPLETE"] = "Complete";
})(UserMiningStatus = exports.UserMiningStatus || (exports.UserMiningStatus = {}));
var UserEnvironment;
(function (UserEnvironment) {
    UserEnvironment["DEMO"] = "demo";
    UserEnvironment["LIVE"] = "live";
})(UserEnvironment = exports.UserEnvironment || (exports.UserEnvironment = {}));
