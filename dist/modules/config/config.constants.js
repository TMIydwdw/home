"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteConstants = void 0;
var SiteConstants = /** @class */ (function () {
    function SiteConstants() {
    }
    var _a;
    _a = SiteConstants;
    SiteConstants.siteName = 'Trade Mint Index';
    SiteConstants.frontendLink = 'https://trademintindex.com/';
    SiteConstants.siteLink = 'trademintindex.com';
    SiteConstants.siteUrl = 'https://' + _a.siteLink + '/';
    SiteConstants.siteApi = _a.siteUrl + 'api/';
    SiteConstants.siteEmail = 'support@' + _a.siteLink;
    SiteConstants.siteAddress = '';
    SiteConstants.sitePhone = '';
    SiteConstants.siteLogo = _a.siteUrl + 'images/logo.png';
    SiteConstants.mainBalance = 0;
    SiteConstants.referralBalance = 0;
    SiteConstants.demoBalance = 1000;
    SiteConstants.bonusBalance = 50;
    SiteConstants.verifyEmailExpiresTime = 1000 * 60 * 60;
    SiteConstants.resetPasswordExpiresTime = 1000 * 60 * 60;
    SiteConstants.safeMiningSignal = 20;
    return SiteConstants;
}());
exports.SiteConstants = SiteConstants;
