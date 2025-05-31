"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var register = joi_1.default.object({
    name: joi_1.default.string().trim().lowercase().min(3).max(30).required(),
    username: joi_1.default.string()
        .trim()
        .alphanum()
        .lowercase()
        .min(3)
        .max(30)
        .required(),
    email: joi_1.default.string().trim().email().lowercase().required(),
    phone: joi_1.default.string().trim().required(),
    country: joi_1.default.string().trim().lowercase().required(),
    currency: joi_1.default.string().trim().required(),
    invite: joi_1.default.string().trim().allow(null, '').optional(),
    password: joi_1.default.string().trim().min(8).required(),
    confirmPassword: joi_1.default.any()
        .valid(joi_1.default.ref('password'))
        .required()
        .label('Confirm Password')
        .options({ messages: { 'any.only': 'Password does not match' } }),
});
var login = joi_1.default.object({
    account: joi_1.default.alternatives()
        .required()
        .try(joi_1.default.string().trim().email().lowercase().required(), joi_1.default.string().trim().alphanum().min(3).lowercase().max(30))
        .options({
        messages: { 'alternatives.match': 'Invalid email or username' },
    }),
    password: joi_1.default.string().trim().required(),
});
var updatePassword = joi_1.default.object({
    oldPassword: joi_1.default.string().trim().min(8).required(),
    password: joi_1.default.string().trim().min(8).required(),
    confirmPassword: joi_1.default.any()
        .valid(joi_1.default.ref('password'))
        .required()
        .label('Confirm Password')
        .options({ messages: { 'any.only': 'Password does not match' } }),
});
var updateUserPassword = joi_1.default.object({
    password: joi_1.default.string().trim().min(8).required(),
    confirmPassword: joi_1.default.any()
        .valid(joi_1.default.ref('password'))
        .required()
        .label('Confirm Password')
        .options({ messages: { 'any.only': 'Password does not match' } }),
});
var forgetPassword = joi_1.default.object({
    account: joi_1.default.alternatives()
        .try(joi_1.default.string().trim().email().lowercase().required(), joi_1.default.string().trim().alphanum().min(3).lowercase().max(30).required())
        .options({
        messages: { 'alternatives.match': 'Invalid email or username' },
    }),
});
var resetPassword = joi_1.default.object({
    key: joi_1.default.string().trim().required(),
    verifyToken: joi_1.default.string().trim().required().label('Verify Token'),
    password: joi_1.default.string().trim().min(8).required(),
    confirmPassword: joi_1.default.any()
        .valid(joi_1.default.ref('password'))
        .required()
        .label('Confirm Password')
        .options({ messages: { 'any.only': 'Password does not match' } }),
});
var verifyEmail = joi_1.default.object({
    key: joi_1.default.string().trim().required(),
    verifyToken: joi_1.default.string().trim().required().label('Verify Token'),
});
exports.default = {
    register: register,
    login: login,
    updatePassword: updatePassword,
    updateUserPassword: updateUserPassword,
    forgetPassword: forgetPassword,
    resetPassword: resetPassword,
    verifyEmail: verifyEmail,
};
