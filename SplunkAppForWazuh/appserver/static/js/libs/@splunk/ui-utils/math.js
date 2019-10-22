"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strictParseFloat = strictParseFloat;
exports.roundToDecimal = roundToDecimal;
exports.floorPowerOfTen = floorPowerOfTen;
exports.isLessThanMinSafeInt = isLessThanMinSafeInt;
exports.isGreaterThanMaxSafeInt = isGreaterThanMaxSafeInt;

var _lodash = require("lodash");

/**
 * @file
 * Math and floating point utilities.
 */
var decimalOrScientificRegex = /(^[-+]?[0-9]*[.]?[0-9]*$)|(^[-+]?[0-9][.]?[0-9]*e[-+]?[0-9][0-9]*$)/i;
var minSafeInteger = -9007199254740991; // required as long as we support IE11

var maxSafeInteger = 9007199254740991; // required as long as we support IE11

/**
 * A strict version of `parseFloat` that requires the entire input string to be valid decimal
 * or scientific format.
 *
 * @param {String} string
 * @returns {(Number|NaN)}
 * @public
 */

function strictParseFloat(string) {
  // if the number is not in decimal or scientific format, return NaN explicitly
  // instead of letting JavaScript do its loose parsing
  return !decimalOrScientificRegex.test(string) ? NaN : parseFloat(string);
}
/**
 *
 * Rounds a number to a specific exponent of base 10.
 *
 * Examples:
 *   * `value` 125.678 and `exp` -2 rounds to 125.68
 *   * `value` 125.678 and `exp` -1 rounds to 125.7
 *   * `value` 125.678 and `exp` 0 rounds to 126
 *   * `value` 125.678 and `exp` 1 rounds to 130
 *   * `value` 125.678 and `exp` 2 rounds to 100
 *
 * @param {Number} value
 * @param {Number} [exp=0] Exponent of base 10 of the decimal place to round to.
 * @returns {(Number|NaN)} The rounded number or NaN if `value` is not a Number or `exp` isn't
 *  an integer.
 * @public
 */


function roundToDecimal(value) {
  var exp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return (0, _lodash.round)(value, exp * -1);
}
/**
 * Returns the nearest whole power of ten less or equal to the given number.
 *
 * Examples:
 *   * 10 returns 10
 *   * 11 returns 10
 *   * 99 returns 10
 *   * 100 returns 100
 *
 * @param {Number} number
 * @returns {(Number|NaN)} The result if `number` is positive, `0` if `number` is `0`, `NaN` if
 *  `number` is negative.
 * @public
 */


function floorPowerOfTen(number) {
  return Math.pow(10, Math.floor(Math.log(number) / Math.LN10));
}
/**
 * Determines if the given number is less than the minimum safe integer (-9007199254740991).
 * @param {Number} number
 * @return {Boolean} `true` if the given number is less than the minimum safe integer, `false`
 *  otherwise (or if `number` isn't a Number).
 * @public
 */


function isLessThanMinSafeInt(number) {
  if (!(0, _lodash.isNumber)(number)) {
    return false;
  }

  return number <= minSafeInteger;
}
/**
 * Determines if the given number is greater than the maximum safe integer (9007199254740991).
 * @param {Number} number
 * @return {Boolean} `true` if the given number is greater than the maximum safe integer, `false`
 *  otherwise (or if `number` isn't a Number).
 * @public
 */


function isGreaterThanMaxSafeInt(number) {
  if (!(0, _lodash.isNumber)(number)) {
    return false;
  }

  return number >= maxSafeInteger;
}