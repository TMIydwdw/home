"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var MathUtility = /** @class */ (function () {
    function MathUtility() {
    }
    /**
     * To get a random number between the two provided numbers
     * @param {number} num1
     * @param {number} num2
     * @returns {number} a random number between the two provided numbers
     */
    MathUtility.prototype.getRandomNumberFromRange = function (num1, num2) {
        var min = Math.min(num1, num2);
        var max = Math.max(num1, num2);
        return Math.random() * (max - min) + min;
    };
    /**
     * To get an array of random numbers between each consecutive numbers in the provided numbers params
     * @param {number} numbers
     * @returns {number} an array of random numbers between each consecutive numbers in the provided numbers params
     */
    MathUtility.prototype.getRandomNumbersFromArray = function (numbers) {
        var randomValues = [];
        for (var i = 0; i < numbers.length - 1; i++) {
            var value = this.getRandomNumberFromRange(numbers[i], numbers[i + 1]);
            randomValues.push(value);
        }
        return randomValues;
    };
    MathUtility = __decorate([
        (0, typedi_1.Service)()
    ], MathUtility);
    return MathUtility;
}());
exports.default = MathUtility;
