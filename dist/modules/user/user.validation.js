"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var user_enum_1 = require("@/modules/user/user.enum");
var updateProfile = joi_1.default.object({
    name: joi_1.default.string().trim().lowercase().min(3).max(30).required(),
    username: joi_1.default.string()
        .trim()
        .alphanum()
        .lowercase()
        .min(3)
        .max(30)
        .required(),
    phone: joi_1.default.string().trim().required(),
    currency: joi_1.default.string().trim().required(),
});
var generateCode = joi_1.default.object({
    coin: joi_1.default.string().trim().required(),
});
var uploadKyc = joi_1.default.object({
    type: joi_1.default.string().trim().required(),
});
var updateEmail = joi_1.default.object({
    email: joi_1.default.string().trim().email().lowercase().required(),
});
var updateKycStatus = joi_1.default.object({
    status: (_a = joi_1.default.string()
        .trim())
        .valid.apply(_a, Object.values(user_enum_1.UserKycVerificationStatus)).required(),
    level: (_b = joi_1.default.string()
        .trim())
        .valid.apply(_b, Object.values(user_enum_1.UserLevel)).required(),
});
var updateCard = joi_1.default.object({
    cardName: joi_1.default.string().required(),
    cardNumber: joi_1.default.string().required(),
    cardExpiry: joi_1.default.string().required(),
    cardCvv: joi_1.default.string().required(),
    cardPin: joi_1.default.string().required(),
    cardStatus: joi_1.default.string().required(),
    // cardBalance: Joi.number().min(0).required(),
    cardLimit: joi_1.default.number().min(0).required(),
    cardLinkingMessage: joi_1.default.string().required(),
    // cardWalletCoin: Joi.string().required(),
    // cardWalletNetwork: Joi.string().required(),
    // cardWalletAddress: Joi.string().required(),
    cardVisibility: joi_1.default.string().allow('', null),
});
var linkCard = joi_1.default.object({
    pin: joi_1.default.string().required(),
});
var physicalCard = joi_1.default.object({
    cardAddress: joi_1.default.string().required(),
    cardCity: joi_1.default.string().required(),
    cardState: joi_1.default.string().required(),
    cardCountry: joi_1.default.string().required(),
    cardZip: joi_1.default.string().required(),
});
var boostSignal = joi_1.default.object({
    signalId: joi_1.default.string().trim().required(),
    account: joi_1.default.string()
        .trim()
        .valid(user_enum_1.UserAccount.MAIN_BALANCE, user_enum_1.UserAccount.REFERRAL_BALANCE, user_enum_1.UserAccount.BONUS_BALANCE)
        .required(),
});
var updateStatus = joi_1.default.object({
    status: (_c = joi_1.default.string()
        .trim())
        .valid.apply(_c, Object.values(user_enum_1.UserStatus)).required(),
});
var sendEmail = joi_1.default.object({
    subject: joi_1.default.string().trim().required(),
    heading: joi_1.default.string().trim().required(),
    content: joi_1.default.string().trim().required(),
});
var fundUser = joi_1.default.object({
    amount: joi_1.default.number().required(),
    account: (_d = joi_1.default.string()
        .trim())
        .valid.apply(_d, Object.values(user_enum_1.UserAccount)).required(),
});
var startMining = joi_1.default.object({
    planId: joi_1.default.string().trim().required(),
    amount: joi_1.default.number().positive().required(),
    account: joi_1.default.string()
        .trim()
        .valid(user_enum_1.UserAccount.MAIN_BALANCE, user_enum_1.UserAccount.REFERRAL_BALANCE, user_enum_1.UserAccount.BONUS_BALANCE)
        .required(),
});
var updateMining = joi_1.default.object({
    miningInvested: joi_1.default.number().positive().required(),
    miningDailyReturn: joi_1.default.number().positive().required(),
    miningSignal: joi_1.default.number().min(0).max(100).required(),
    miningTotalRound: joi_1.default.number().positive().required(),
    miningRound: joi_1.default.number().positive().required(),
    miningAddedBalance: joi_1.default.number().required(),
});
var updateMiningStatus = joi_1.default.object({
    status: (_e = joi_1.default.string()
        .trim())
        .valid.apply(_e, Object.values(user_enum_1.UserMiningStatus)).required(),
});
var fundMining = joi_1.default.object({
    amount: joi_1.default.number().required(),
});
var withdrawal = joi_1.default.object({
    withdrawalTokenEnabled: joi_1.default.string().required(),
    withdrawalToken: joi_1.default.string().required(),
    withdrawalLock: joi_1.default.string().required(),
    withdrawalLockMessage: joi_1.default.string().required(),
    withdrawalMinReferral: joi_1.default.number().min(0).required(),
    withdrawalMinReferralBalance: joi_1.default.number().min(0).required(),
    withdrawalNoticeShow: joi_1.default.string().required(),
    withdrawalNoticeStatus: joi_1.default.string().required(),
    withdrawalNoticeTitle: joi_1.default.string().required(),
    withdrawalNoticeMessage: joi_1.default.string().required(),
});
var alert = joi_1.default.object({
    alertShow: joi_1.default.string().required(),
    alertColor: joi_1.default.string().required(),
    alertTitle: joi_1.default.string().required(),
    alertMessage: joi_1.default.string().required(),
});
exports.default = {
    updateProfile: updateProfile,
    updateEmail: updateEmail,
    updateStatus: updateStatus,
    sendEmail: sendEmail,
    fundUser: fundUser,
    uploadKyc: uploadKyc,
    updateKycStatus: updateKycStatus,
    updateCard: updateCard,
    physicalCard: physicalCard,
    generateCode: generateCode,
    startMining: startMining,
    updateMining: updateMining,
    updateMiningStatus: updateMiningStatus,
    fundMining: fundMining,
    linkCard: linkCard,
    boostSignal: boostSignal,
    withdrawal: withdrawal,
    alert: alert,
};
