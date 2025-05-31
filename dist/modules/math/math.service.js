"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var serviceToken_1 = __importDefault(require("../../core/serviceToken"));
var MathService = /** @class */ (function () {
    function MathService(mathUtility) {
        this.mathUtility = mathUtility;
    }
    /**
     * Get A Random array of numbers that meets a condition
     * @param {number} averageValueOne An Average Range Values to use as a reference
     * @param {number} averageValueTwo An Average Range Values to use as a reference
     * @param {number} spread How far should the lowest value go in relative to zero, 1 will be the length for the lowest value to be zero
     * @param {number} breakpoint How many sub values will be generated to get to the last value
     * @returns {number} An array of Random number that meets a condition
     */
    MathService.prototype._getValues = function (averageValueOne, averageValueTwo, spread, breakpoint) {
        // sanitizing inputs
        breakpoint = Math.abs(Math.ceil(breakpoint)) || 1;
        spread = Math.abs(spread);
        averageValueOne = Math.abs(averageValueOne);
        averageValueTwo = Math.abs(averageValueTwo);
        var minAverageRange = Math.min(averageValueOne, averageValueTwo);
        var maxAverageRange = Math.max(averageValueOne, averageValueTwo);
        // constants
        var difference = Math.abs(minAverageRange * spread);
        var unit = difference / breakpoint;
        // get the smallest and largest possible value
        var min = minAverageRange - difference;
        var max = maxAverageRange + difference;
        // min/max values
        var minAverageRanges = [];
        var maxAverageRanges = [];
        for (var x = 0; x < breakpoint && spread > 0; x++) {
            var minAverageRange_1 = min + unit * x;
            var maxAverageRange_1 = max - unit * (breakpoint - (x + 1));
            minAverageRanges.push(minAverageRange_1);
            maxAverageRanges.push(maxAverageRange_1);
        }
        // values array
        var values = __spreadArray(__spreadArray(__spreadArray([], minAverageRanges, true), [
            minAverageRange,
            maxAverageRange
        ], false), maxAverageRanges, true);
        // console.log('Values: ', values)
        return values;
    };
    /**
     * Get half of the remaining values probability
     * @param {number} breakpoint How many sub values will be generated to get to the last value
     * @param {number} probability It should only be an auguement between 0.5 to 1
     * @returns {number} half of the remaining values probability
     */
    MathService.prototype._getValuesProbability = function (breakpoint, probability) {
        // sanitizing inputs
        breakpoint = Math.abs(Math.ceil(breakpoint)) || 1;
        probability = probability > 1 ? 1 : probability < 0.5 ? 0.5 : probability;
        // values propability
        var valuesProbability = [];
        var remainingProbability = (1 - probability) / 2;
        var probSum = 0;
        for (var x = 0; x < breakpoint; x++) {
            var prob = probability * Math.pow((probability + 1), x);
            valuesProbability.push(prob);
            probSum += prob;
        }
        // console.log('valuesProbability: ', valuesProbability)
        var probUnit = 1 / probSum;
        // set values probability
        for (var i = 0; i < breakpoint; i++) {
            valuesProbability[i] =
                remainingProbability * (probUnit * valuesProbability[i]);
        }
        // console.log('valuesProbability: ', valuesProbability)
        return valuesProbability;
    };
    /**
     * Get The Negative Unit value
     * @param {number} spread How far should the lowest value go in relative to zero, 1 will be the length for the lowest value to be zero
     * @param {number} breakpoint How many unit will be generated to get to the last value
     * @returns {number} The Sum Of Negative Unit value that meets approximatly at zero
     */
    MathService.prototype._getNegativeUnit = function (spread, breakpoint) {
        breakpoint = Math.abs(Math.ceil(breakpoint)) || 1;
        spread = Math.abs(spread);
        spread = spread < 2 ? 2 : spread;
        return ((spread - 1) / spread) * breakpoint;
    };
    // public _old_getNegativeUnit(spread: number, breakpoint: number): number {
    //   let negativeUnit: number = 0
    //   const values = this._getValues(1, 2, spread, breakpoint)
    //   let currNegativeValue, nextNegativeValue
    //   for (let x = 0; x < values.length; x++) {
    //     currNegativeValue = values[x]
    //     nextNegativeValue = values[x + 1]
    //     if (
    //       currNegativeValue < 0 &&
    //       (!nextNegativeValue || nextNegativeValue < 0)
    //     ) {
    //       negativeUnit += 1
    //     } else if (
    //       currNegativeValue < 0 &&
    //       nextNegativeValue &&
    //       nextNegativeValue === 0
    //     ) {
    //       negativeUnit += 1
    //     } else if (
    //       currNegativeValue < 0 &&
    //       nextNegativeValue &&
    //       nextNegativeValue > 0
    //     ) {
    //       negativeUnit +=
    //         (0 - currNegativeValue) / (nextNegativeValue - currNegativeValue)
    //     } else break
    //   }
    //   return negativeUnit
    // }
    /**
     * Get The Rate at which a loss will occur
     * @param {number} spread How far should the lowest value go in relative to zero, 1 will be the length for the lowest value to be zero
     * @param {number} breakpoint How many unit will be generated to get to the last value
     * @param {number} probability The probability of getting the average range value
     * @returns {number} The Rate at which a loss will occur
     */
    MathService.prototype._getPercentageLoss = function (spread, breakpoint, probability) {
        var valuesProbability = this._getValuesProbability(breakpoint, probability);
        var negativeValue = this._getNegativeUnit(spread, breakpoint);
        var negativeValueLeft = negativeValue;
        var lossProb = 0;
        for (var x = 1; x < negativeValue + 1; x++) {
            if (negativeValueLeft < 1) {
                lossProb += negativeValueLeft * valuesProbability[x - 1];
            }
            else {
                lossProb += valuesProbability[x - 1];
            }
            negativeValueLeft--;
        }
        return lossProb;
    };
    /**
     * Get The Dynamic options params to achieve this winRate
     * @param {number} winRate The rate for a win to occure which should be 0.77 to 0.95
     * @returns {object} The Dynamic options params to achieve this winRate
     */
    MathService.prototype.dynamicRangeOptions = function (winRate) {
        winRate = Math.abs(winRate);
        winRate = winRate > 0.95 ? 0.95 : winRate < 0.77 ? 0.77 : winRate;
        var lossRate = 1 - winRate;
        var lowLossRate = lossRate - 0.0001;
        var highLossRate = lossRate + 0.0001;
        var probability = 0.5;
        var spread = 12.5, breakpoint = 1, percentageLoss, statge = 'breakpoint', spreadChange = 1, loopRan = 0;
        while (true) {
            if (loopRan >= 50)
                break;
            loopRan++;
            percentageLoss = this._getPercentageLoss(spread, breakpoint, probability);
            if (percentageLoss >= lowLossRate && percentageLoss <= highLossRate) {
                break;
            }
            if (statge === 'breakpoint') {
                if (percentageLoss > highLossRate) {
                    breakpoint++;
                }
                else if (percentageLoss < lowLossRate) {
                    breakpoint--;
                    statge = 'spread';
                }
                if (breakpoint > 7 || breakpoint < 1) {
                    breakpoint = breakpoint > 7 ? 7 : 1;
                    statge = 'spread';
                }
            }
            else if (statge === 'spread') {
                if (percentageLoss < lowLossRate) {
                    spreadChange = spreadChange / 2;
                    spread += spreadChange;
                }
                else if (percentageLoss > highLossRate) {
                    spreadChange = spreadChange === 1 ? 1 : spreadChange / 2;
                    spread -= spreadChange;
                }
            }
        }
        return { spread: spread, breakpoint: breakpoint, probability: probability };
    };
    /**
     * Get A Random number that meets the condition
     * @param {number} averageValueOne An Average Range Value to use as a reference
     * @param {number} averageValueTwo An Average Range Value to use as a reference
     * @param {number} spread How far should the lowest value go in relative to zero, 1 will be the length for the lowest value to be zero
     * @param {number} breakpoint How many sub values will be generated to get to the last value
     * @param {number} probability The Probability value for the provided averageValueOne and averageValueTwo params, It should only be an auguement between 0.5 to 1
     * @returns {number} A Random number that meets the condition
     */
    MathService.prototype.dynamicRange = function (averageValueOne, averageValueTwo, spread, breakpoint, probability) {
        var values = this._getValues(averageValueOne, averageValueTwo, spread, breakpoint);
        var valuesProbability = this._getValuesProbability(breakpoint, probability);
        // get random values
        var randomValues = this.mathUtility.getRandomNumbersFromArray(values);
        // console.log('randomValues: ', randomValues)
        var remainder = 1 -
            probability -
            valuesProbability.reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0) *
                2;
        // console.log('remainder: ', remainder)
        var accumulatedProbability = 0;
        var finalValuesProbability = __spreadArray(__spreadArray(__spreadArray([], valuesProbability, true), [
            probability + remainder
        ], false), __spreadArray([], valuesProbability, true).reverse(), true).map(function (currentProbability) {
            accumulatedProbability += currentProbability;
            return accumulatedProbability;
        });
        var probabilityPicked = Math.random();
        var probabilityIndex = finalValuesProbability.findIndex(function (currentProbability, i, arr) {
            var prevProbability = arr[i - 1] !== undefined ? arr[i - 1] : 0;
            return (prevProbability < probabilityPicked &&
                probabilityPicked <= currentProbability);
        });
        return randomValues[probabilityIndex];
    };
    MathService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.MATH_UTILITY)),
        __metadata("design:paramtypes", [Object])
    ], MathService);
    return MathService;
}());
exports.default = MathService;
////////////////////////////
///////////////////////////
// EXPERIMENTAL TESTING
////////////////////////////
///////////////////////////
// import MathUtility from './math.utility'
// const mathService = new MathService(new MathUtility())
// const options = mathService.dynamicRangeOptions(0.8)
// const avg1 = 5
// const avg2 = 100
// const sprd = options.spread
// const bkp = options.breakpoint
// const prob = options.probability
// const run = 100000
// const negativeValues = []
// const positiveValues = []
// let sum = 0
// const startTime = new Date().getTime()
// for (let x = 0; x < run; x++) {
//   const curr = mathService.dynamicRange(avg1, avg2, sprd, bkp, prob)
//   sum += curr
//   if (curr > 0) {
//     positiveValues.push(curr)
//   }
//   if (curr < 0) {
//     negativeValues.push(curr)
//   }
// }
// const average = sum / run
// console.log('=====================')
// console.log('negative: ', negativeValues.length / run)
// console.log('Average: ', average)
// console.log('=====================')
// console.log('max: ', positiveValues.length, Math.max(...positiveValues))
// console.log('min: ', negativeValues.length, Math.min(...negativeValues))
// console.log('=====================')
// console.log('Time: ', (new Date().getTime() - startTime) / 1000)
////////////////////////////////////
///////////////////////////////////
// RUN npx ts-node .\math.service.ts
////////////////////////////////////
///////////////////////////////////
