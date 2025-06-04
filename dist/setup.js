"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fundingController = exports.depositController = exports.otherWithdrawalMethodController = exports.withdrawalMethodController = exports.otherDepositMethodController = exports.depositMethodController = exports.currencyController = exports.referralController = exports.referralSettingsController = exports.configController = exports.mailOptionController = exports.signalController = exports.copyTradeController = exports.planController = exports.userController = exports.authController = exports.sendMailController = exports.authService = exports.copyService = exports.investmentService = exports.otherWithdrawalService = exports.withdrawalService = exports.otherDepositService = exports.fundingService = exports.depositService = exports.transferService = exports.referralService = exports.userService = exports.otherWithdrawalMethodService = exports.withdrawalMethodService = exports.otherDepositMethodService = exports.depositMethodService = exports.transactionService = exports.transferSettingsService = exports.referralSettingsService = exports.signalService = exports.copyTradeService = exports.planService = exports.pairService = exports.sendMailService = exports.assetService = exports.currencyService = exports.emailVerificationService = exports.resetPasswordService = exports.activityService = exports.notificationService = exports.mailService = exports.mailOptionService = exports.mathService = exports.mathUtility = void 0;
exports.controllers = exports.pairController = exports.notificationController = exports.copyController = exports.investmentController = exports.assetController = exports.transferController = exports.transferSettingsController = exports.transactionController = exports.activityController = exports.otherWithdrawalController = exports.withdrawalController = exports.otherDepositController = void 0;
require("reflect-metadata");
var typedi_1 = require("typedi");
var plan_service_1 = __importDefault(require("@/modules/plan/plan.service"));
var mailOption_service_1 = __importDefault(require("@/modules/mailOption/mailOption.service"));
var plan_controller_1 = __importDefault(require("@/modules/plan/plan.controller"));
var user_controller_1 = __importDefault(require("@/modules/user/user.controller"));
var mailOption_controller_1 = __importDefault(require("@/modules/mailOption/mailOption.controller"));
var user_service_1 = __importDefault(require("@/modules/user/user.service"));
var serviceToken_1 = __importDefault(require("@/core/serviceToken"));
var mail_service_1 = __importDefault(require("@/modules/mail/mail.service"));
var config_controller_1 = __importDefault(require("@/modules/config/config.controller"));
var auth_service_1 = __importDefault(require("@/modules/auth/auth.service"));
var auth_controller_1 = __importDefault(require("@/modules/auth/auth.controller"));
var referralSettings_service_1 = __importDefault(require("@/modules/referralSettings/referralSettings.service"));
var referralSettings_controller_1 = __importDefault(require("@/modules/referralSettings/referralSettings.controller"));
var notification_service_1 = __importDefault(require("@/modules/notification/notification.service"));
var referral_service_1 = __importDefault(require("@/modules/referral/referral.service"));
var emailVerification_service_1 = __importDefault(require("@/modules/emailVerification/emailVerification.service"));
var resetPassword_service_1 = __importDefault(require("@/modules/resetPassword/resetPassword.service"));
var sendMail_service_1 = __importDefault(require("@/modules/sendMail/sendMail.service"));
var sendMail_controller_1 = __importDefault(require("@/modules/sendMail/sendMail.controller"));
var activity_service_1 = __importDefault(require("@/modules/activity/activity.service"));
var referral_controller_1 = __importDefault(require("@/modules/referral/referral.controller"));
var currency_service_1 = __importDefault(require("@/modules/currency/currency.service"));
var currency_controller_1 = __importDefault(require("@/modules/currency/currency.controller"));
var depositMethod_service_1 = __importDefault(require("@/modules/depositMethod/depositMethod.service"));
var depositMethod_controller_1 = __importDefault(require("@/modules/depositMethod/depositMethod.controller"));
var withdrawalMethod_service_1 = __importDefault(require("@/modules/withdrawalMethod/withdrawalMethod.service"));
var withdrawalMethod_controller_1 = __importDefault(require("@/modules/withdrawalMethod/withdrawalMethod.controller"));
var transaction_service_1 = __importDefault(require("@/modules/transaction/transaction.service"));
var deposit_service_1 = __importDefault(require("@/modules/deposit/deposit.service"));
var deposit_controller_1 = __importDefault(require("@/modules/deposit/deposit.controller"));
var withdrawal_service_1 = __importDefault(require("@/modules/withdrawal/withdrawal.service"));
var withdrawal_controller_1 = __importDefault(require("@/modules/withdrawal/withdrawal.controller"));
var activity_controller_1 = __importDefault(require("@/modules/activity/activity.controller"));
var transaction_controller_1 = __importDefault(require("@/modules/transaction/transaction.controller"));
var transferSettings_service_1 = __importDefault(require("@/modules/transferSettings/transferSettings.service"));
var transfer_service_1 = __importDefault(require("@/modules/transfer/transfer.service"));
var transferSettings_controller_1 = __importDefault(require("@/modules/transferSettings/transferSettings.controller"));
var transfer_controller_1 = __importDefault(require("@/modules/transfer/transfer.controller"));
var asset_service_1 = __importDefault(require("@/modules/asset/asset.service"));
var asset_controller_1 = __importDefault(require("@/modules/asset/asset.controller"));
var investment_service_1 = __importDefault(require("@/modules/investment/investment.service"));
var investment_controller_1 = __importDefault(require("@/modules/investment/investment.controller"));
var notification_controller_1 = __importDefault(require("@/modules/notification/notification.controller"));
var pair_service_1 = __importDefault(require("@/modules/pair/pair.service"));
var pair_controller_1 = __importDefault(require("@/modules/pair/pair.controller"));
var math_service_1 = __importDefault(require("@/modules/math/math.service"));
var math_utility_1 = __importDefault(require("@/modules/math/math.utility"));
var otherDepositMethod_service_1 = __importDefault(require("./modules/otherDepositMethod/otherDepositMethod.service"));
var otherDepositMethod_controller_1 = __importDefault(require("./modules/otherDepositMethod/otherDepositMethod.controller"));
var otherDeposit_service_1 = __importDefault(require("./modules/otherDeposit/otherDeposit.service"));
var otherDeposit_controller_1 = __importDefault(require("./modules/otherDeposit/otherDeposit.controller"));
var otherWithdrawal_service_1 = __importDefault(require("./modules/otherWithdrawal/otherWithdrawal.service"));
var otherWithdrawalMethod_service_1 = __importDefault(require("./modules/otherWithdrawalMethod/otherWithdrawalMethod.service"));
var otherWithdrawalMethod_controller_1 = __importDefault(require("./modules/otherWithdrawalMethod/otherWithdrawalMethod.controller"));
var otherWithdrawal_controller_1 = __importDefault(require("./modules/otherWithdrawal/otherWithdrawal.controller"));
var funding_service_1 = __importDefault(require("./modules/funding/funding.service"));
var funding_controller_1 = __importDefault(require("./modules/funding/funding.controller"));
var copyTrade_service_1 = __importDefault(require("./modules/copyTrade/copyTrade.service"));
var copyTrade_controller_1 = __importDefault(require("./modules/copyTrade/copyTrade.controller"));
var copy_service_1 = __importDefault(require("./modules/copy/copy.service"));
var copy_controller_1 = __importDefault(require("./modules/copy/copy.controller"));
var signal_service_1 = __importDefault(require("./modules/signal/signal.service"));
var signal_controller_1 = __importDefault(require("./modules/signal/signal.controller"));
exports.mathUtility = typedi_1.Container.get(math_utility_1.default);
typedi_1.Container.set(serviceToken_1.default.MATH_UTILITY, exports.mathUtility);
exports.mathService = typedi_1.Container.get(math_service_1.default);
typedi_1.Container.set(serviceToken_1.default.MATH_SERVICE, exports.mathService);
exports.mailOptionService = typedi_1.Container.get(mailOption_service_1.default);
typedi_1.Container.set(serviceToken_1.default.MAIL_OPTION_SERVICE, exports.mailOptionService);
exports.mailService = typedi_1.Container.get(mail_service_1.default);
typedi_1.Container.set(serviceToken_1.default.MAIL_SERVICE, exports.mailService);
exports.notificationService = typedi_1.Container.get(notification_service_1.default);
typedi_1.Container.set(serviceToken_1.default.NOTIFICATION_SERVICE, exports.notificationService);
exports.activityService = typedi_1.Container.get(activity_service_1.default);
typedi_1.Container.set(serviceToken_1.default.ACTIVITY_SERVICE, exports.activityService);
exports.resetPasswordService = typedi_1.Container.get(resetPassword_service_1.default);
typedi_1.Container.set(serviceToken_1.default.RESET_PASSWORD_SERVICE, exports.resetPasswordService);
exports.emailVerificationService = typedi_1.Container.get(emailVerification_service_1.default);
typedi_1.Container.set(serviceToken_1.default.EMAIL_VERIFICATION_SERVICE, exports.emailVerificationService);
exports.currencyService = typedi_1.Container.get(currency_service_1.default);
typedi_1.Container.set(serviceToken_1.default.CURRENCY_SERVICE, exports.currencyService);
exports.assetService = typedi_1.Container.get(asset_service_1.default);
typedi_1.Container.set(serviceToken_1.default.ASSET_SERVICE, exports.assetService);
exports.sendMailService = typedi_1.Container.get(sendMail_service_1.default);
typedi_1.Container.set(serviceToken_1.default.SEND_MAIL_SERVICE, exports.sendMailService);
exports.pairService = typedi_1.Container.get(pair_service_1.default);
typedi_1.Container.set(serviceToken_1.default.PAIR_SERVICE, exports.pairService);
exports.planService = typedi_1.Container.get(plan_service_1.default);
typedi_1.Container.set(serviceToken_1.default.PLAN_SERVICE, exports.planService);
exports.copyTradeService = typedi_1.Container.get(copyTrade_service_1.default);
typedi_1.Container.set(serviceToken_1.default.COPY_TRADE_SERVICE, exports.copyTradeService);
exports.signalService = typedi_1.Container.get(signal_service_1.default);
typedi_1.Container.set(serviceToken_1.default.SIGNAL_SERVICE, exports.signalService);
exports.referralSettingsService = typedi_1.Container.get(referralSettings_service_1.default);
typedi_1.Container.set(serviceToken_1.default.REFERRAL_SETTINGS_SERVICE, exports.referralSettingsService);
exports.transferSettingsService = typedi_1.Container.get(transferSettings_service_1.default);
typedi_1.Container.set(serviceToken_1.default.TRANSFER_SETTINGS_SERVICE, exports.transferSettingsService);
exports.transactionService = typedi_1.Container.get(transaction_service_1.default);
typedi_1.Container.set(serviceToken_1.default.TRANSACTION_SERVICE, exports.transactionService);
exports.depositMethodService = typedi_1.Container.get(depositMethod_service_1.default);
typedi_1.Container.set(serviceToken_1.default.DEPOSIT_METHOD_SERVICE, exports.depositMethodService);
exports.otherDepositMethodService = typedi_1.Container.get(otherDepositMethod_service_1.default);
typedi_1.Container.set(serviceToken_1.default.OTHER_DEPOSIT_METHOD_SERVICE, exports.otherDepositMethodService);
exports.withdrawalMethodService = typedi_1.Container.get(withdrawalMethod_service_1.default);
typedi_1.Container.set(serviceToken_1.default.WITHDRAWAL_METHOD_SERVICE, exports.withdrawalMethodService);
exports.otherWithdrawalMethodService = typedi_1.Container.get(otherWithdrawalMethod_service_1.default);
typedi_1.Container.set(serviceToken_1.default.OTHER_WITHDRAWAL_METHOD_SERVICE, exports.otherWithdrawalMethodService);
exports.userService = typedi_1.Container.get(user_service_1.default);
typedi_1.Container.set(serviceToken_1.default.USER_SERVICE, exports.userService);
exports.referralService = typedi_1.Container.get(referral_service_1.default);
typedi_1.Container.set(serviceToken_1.default.REFERRAL_SERVICE, exports.referralService);
exports.transferService = typedi_1.Container.get(transfer_service_1.default);
typedi_1.Container.set(serviceToken_1.default.TRANSFER_SERVICE, exports.transferService);
exports.depositService = typedi_1.Container.get(deposit_service_1.default);
typedi_1.Container.set(serviceToken_1.default.DEPOSIT_SERVICE, exports.depositService);
exports.fundingService = typedi_1.Container.get(funding_service_1.default);
typedi_1.Container.set(serviceToken_1.default.FUNDING_SERVICE, exports.fundingService);
exports.otherDepositService = typedi_1.Container.get(otherDeposit_service_1.default);
typedi_1.Container.set(serviceToken_1.default.OTHER_DEPOSIT_SERVICE, exports.otherDepositService);
exports.withdrawalService = typedi_1.Container.get(withdrawal_service_1.default);
typedi_1.Container.set(serviceToken_1.default.WITHDRAWAL_SERVICE, exports.withdrawalService);
exports.otherWithdrawalService = typedi_1.Container.get(otherWithdrawal_service_1.default);
typedi_1.Container.set(serviceToken_1.default.OTHER_WITHDRAWAL_SERVICE, exports.otherWithdrawalService);
exports.investmentService = typedi_1.Container.get(investment_service_1.default);
typedi_1.Container.set(serviceToken_1.default.INVESTMENT_SERVICE, exports.investmentService);
exports.copyService = typedi_1.Container.get(copy_service_1.default);
typedi_1.Container.set(serviceToken_1.default.COPY_SERVICE, exports.copyService);
exports.authService = typedi_1.Container.get(auth_service_1.default);
typedi_1.Container.set(serviceToken_1.default.AUTH_SERVICE, exports.authService);
exports.sendMailController = typedi_1.Container.get(sendMail_controller_1.default);
exports.authController = typedi_1.Container.get(auth_controller_1.default);
exports.userController = typedi_1.Container.get(user_controller_1.default);
exports.planController = typedi_1.Container.get(plan_controller_1.default);
exports.copyTradeController = typedi_1.Container.get(copyTrade_controller_1.default);
exports.signalController = typedi_1.Container.get(signal_controller_1.default);
exports.mailOptionController = typedi_1.Container.get(mailOption_controller_1.default);
exports.configController = typedi_1.Container.get(config_controller_1.default);
exports.referralSettingsController = typedi_1.Container.get(referralSettings_controller_1.default);
exports.referralController = typedi_1.Container.get(referral_controller_1.default);
exports.currencyController = typedi_1.Container.get(currency_controller_1.default);
exports.depositMethodController = typedi_1.Container.get(depositMethod_controller_1.default);
exports.otherDepositMethodController = typedi_1.Container.get(otherDepositMethod_controller_1.default);
exports.withdrawalMethodController = typedi_1.Container.get(withdrawalMethod_controller_1.default);
exports.otherWithdrawalMethodController = typedi_1.Container.get(otherWithdrawalMethod_controller_1.default);
exports.depositController = typedi_1.Container.get(deposit_controller_1.default);
exports.fundingController = typedi_1.Container.get(funding_controller_1.default);
exports.otherDepositController = typedi_1.Container.get(otherDeposit_controller_1.default);
exports.withdrawalController = typedi_1.Container.get(withdrawal_controller_1.default);
exports.otherWithdrawalController = typedi_1.Container.get(otherWithdrawal_controller_1.default);
exports.activityController = typedi_1.Container.get(activity_controller_1.default);
exports.transactionController = typedi_1.Container.get(transaction_controller_1.default);
exports.transferSettingsController = typedi_1.Container.get(transferSettings_controller_1.default);
exports.transferController = typedi_1.Container.get(transfer_controller_1.default);
exports.assetController = typedi_1.Container.get(asset_controller_1.default);
exports.investmentController = typedi_1.Container.get(investment_controller_1.default);
exports.copyController = typedi_1.Container.get(copy_controller_1.default);
exports.notificationController = typedi_1.Container.get(notification_controller_1.default);
exports.pairController = typedi_1.Container.get(pair_controller_1.default);
exports.controllers = [
    exports.referralSettingsController,
    exports.sendMailController,
    exports.authController,
    exports.userController,
    exports.planController,
    exports.copyTradeController,
    exports.signalController,
    exports.mailOptionController,
    exports.configController,
    exports.referralController,
    exports.currencyController,
    exports.depositMethodController,
    exports.withdrawalMethodController,
    exports.depositController,
    exports.fundingController,
    exports.withdrawalController,
    exports.activityController,
    exports.transactionController,
    exports.transferSettingsController,
    exports.transferController,
    exports.assetController,
    exports.investmentController,
    exports.copyController,
    exports.notificationController,
    exports.pairController,
    exports.otherDepositMethodController,
    exports.otherDepositController,
    exports.otherWithdrawalMethodController,
    exports.otherWithdrawalController,
];
