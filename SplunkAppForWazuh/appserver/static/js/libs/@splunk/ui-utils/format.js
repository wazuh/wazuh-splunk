"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sprintf = sprintf;
exports.abbreviateNumber = abbreviateNumber;
exports.bytesToFileSize = bytesToFileSize;
exports.smartTrim = smartTrim;

var _lodash = require("lodash");

var _i18n = require("./i18n");

var _math = require("./math");

var _sprintf = require("./sprintf");

/**
 * @file
 * Number and String format utilities.
 */

/**
 * Returns a formatted string.
 *
 * ```js
 * const text = sprintf('%1$s %2$s a %3$s', 'Polly', 'wants', 'cracker') // 'Poly wants a cracker'
 * ```
 *
 * #### Format Specfication
 * The placeholders in the format string are marked by `%` and are followed by one or more of these elements, in this order:
 *
 * * An optional number followed by a `$` sign that selects which argument index to use for the value. If not specified, arguments will be placed in the same order as the placeholders in the input string.
 * * An optional `+` sign that forces to preceed the result with a plus or minus sign on numeric values. By default, only the `-` sign is used on negative numbers.
 * * An optional padding specifier that says what character to use for padding (if specified). Possible values are `0` or any other character precedeed by a `'` (single quote). The default is to pad with *spaces*.
 * * An optional `-` sign, that causes `sprintf` to left-align the result of this placeholder. The default is to right-align the result.
 * * An optional number, that says how many characters the result should have. If the value to be returned is shorter than this number, the result will be padded. When used with the `j` (JSON) type specifier, the padding length specifies the tab size used for indentation.
 * * An optional precision modifier, consisting of a `.` (dot) followed by a number, that says how many digits should be displayed for floating point numbers. When used with the `g` type specifier, it specifies the number of significant digits. When used on a string, it causes the result to be truncated.
 * * A type specifier that can be any of:
 *     * `%` — yields a literal `%` character
 *     * `b` — yields an integer as a binary number
 *     * `c` — yields an integer as the character with that ASCII value
 *     * `d` or `i` — yields an integer as a signed decimal number
 *     * `e` — yields a float using scientific notation
 *     * `u` — yields an integer as an unsigned decimal number
 *     * `f` — yields a float as is; see notes on precision above
 *     * `g` — yields a float as is; see notes on precision above
 *     * `o` — yields an integer as an octal number
 *     * `s` — yields a string as is
 *     * `t` — yields `true` or `false`
 *     * `T` — yields the type of the argument<sup><a href="#fn-1" name="fn-ref-1">1</a></sup>
 *     * `v` — yields the primitive value of the specified argument
 *     * `x` — yields an integer as a hexadecimal number (lower-case)
 *     * `X` — yields an integer as a hexadecimal number (upper-case)
 *     * `j` — yields a JavaScript object or array as a JSON encoded string
 *
 * This utility was adapted from [Alexandru's sprintf-js implementation](https://github.com/alexei/sprintf.js).
 *
 * @param {string} fmt - The string to format and insert values into.
 * @param {Any} values - The values to insert into the format string. See specification above.
 * @public
 */
function sprintf(key) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return (0, _sprintf.sprintfFormat)((0, _sprintf.sprintfParse)(key), [key].concat(rest));
}
/**
 * Abbreviates a number by rounding to no more than three decimal places and by appending a
 * suffix: K/M/B. Additionally, the resulting number is formatted using a given locale.
 *
 * Examples:
 *   * `99549` returns `99.5K`
 *   * `1159000` returns `1.16M`
 *   * `9500`, `de-de` returns `9,5K`
 *
 * @param {Number|String} number The number to abbreviate.
 * @param {String} [locale='en-us']
 * @returns {String} The abbreviated and localized number if `number` is positive, the localized
 *  number if negative.
 * @public
 */


function abbreviateNumber(number) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-us';
  var value = (0, _lodash.toNumber)(number);

  if (value <= 1000) {
    return value.toLocaleString(locale);
  }

  if (value < 10000) {
    return sprintf((0, _i18n._)('%sK'), (0, _math.roundToDecimal)(value / 1000, -2).toLocaleString(locale));
  }

  if (value < 100000) {
    return sprintf((0, _i18n._)('%sK'), (0, _math.roundToDecimal)(value / 1000, -1).toLocaleString(locale));
  }

  if (value < 999500) {
    return sprintf((0, _i18n._)('%sK'), (0, _math.roundToDecimal)(value / 1000, 0).toLocaleString(locale));
  }

  if (value < 10000000) {
    return sprintf((0, _i18n._)('%sM'), (0, _math.roundToDecimal)(value / 1000000, -2).toLocaleString(locale));
  }

  if (value < 100000000) {
    return sprintf((0, _i18n._)('%sM'), (0, _math.roundToDecimal)(value / 1000000, -1).toLocaleString(locale));
  }

  if (value < 999500000) {
    return sprintf((0, _i18n._)('%sM'), (0, _math.roundToDecimal)(value / 1000000, 0).toLocaleString(locale));
  }

  if (value < 10000000000) {
    return sprintf((0, _i18n._)('%sB'), (0, _math.roundToDecimal)(value / 1000000000, -2).toLocaleString(locale));
  }

  if (value < 100000000000) {
    return sprintf((0, _i18n._)('%sB'), (0, _math.roundToDecimal)(value / 1000000000, -1).toLocaleString(locale));
  }

  return sprintf((0, _i18n._)('%sB'), (0, _math.roundToDecimal)(value / 1000000000, 0).toLocaleString(locale));
}
/**
 * Abbreviates a number by rounding to no more than two decimal places and by converting to
 * binary prefixes (B/KB/MB/GB/TB). Additionally, the resulting number is formatted using a
 * given locale.
 *
 * Examples:
 *   * `100` returns `100 B`
 *   * `1200` returns `1.17 KB`
 *   * `96619136`, `de-de` returns `92,14 MB`
 *
 * @param  {Number|String} bytes The number of bytes to abbreviate.
 * @param  {String} [locale='en-us']
 * @throws {RangeError} If `bytes` is less than zero.
 * @return {String} The abbreviated and localized number.
 * @public
 */


function bytesToFileSize(bytes) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-us';
  var kbFileSize = (bytes || 0) / 1024;

  if (kbFileSize < 0) {
    throw new RangeError('bytes must be >= 0');
  }

  if (Math.floor(kbFileSize) === 0) {
    return sprintf((0, _i18n._)('%s B'), bytes.toLocaleString(locale));
  }

  var mbFileSize = kbFileSize / 1024;

  if (Math.floor(mbFileSize) === 0) {
    return sprintf((0, _i18n._)('%s KB'), (0, _math.roundToDecimal)(kbFileSize, -2).toLocaleString(locale));
  }

  var gbFileSize = mbFileSize / 1024;

  if (Math.floor(gbFileSize) === 0) {
    return sprintf((0, _i18n._)('%s MB'), (0, _math.roundToDecimal)(mbFileSize, -2).toLocaleString(locale));
  }

  var tbFileSize = gbFileSize / 1024;

  if (Math.floor(tbFileSize) === 0) {
    return sprintf((0, _i18n._)('%s GB'), (0, _math.roundToDecimal)(gbFileSize, -2).toLocaleString(locale));
  }

  return sprintf((0, _i18n._)('%s TB'), (0, _math.roundToDecimal)(tbFileSize, -2).toLocaleString(locale));
}
/**
 * Trim a String by replacing characters in the middle with an ellipsis.
 *
 * Examples:
 *   * `1234567890`, `7` returns `123...7890`
 *   * `1234567890`, `10` returns `1234567890`
 *   * `1234567890`, `50` returns `1234567890`
 *   * `1234567890`, `2`, `{ precomposed: true }` returns `1…0`
 *
 * @param {String} string The input string.
 * @param {Number} maxCharsFromString How many characters to take from `string`.
 * @param {Object} [options] * `precomposed`: Use one ellipsis character (…)
 *  instead of three periods. Defaults to `false`.
 * @return {String} The trimmed result. Note that the total length might be up to three characters
 *  more than `maxCharsFromString`. If `string` is falsy or if `maxCharsFromString` is less than 1,
 *  `string` is returned.
 * @public
 */


function smartTrim(string, maxCharsFromString) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$precomposed = _ref.precomposed,
      precomposed = _ref$precomposed === void 0 ? false : _ref$precomposed;

  if (!string || maxCharsFromString < 1 || string.length <= maxCharsFromString) {
    return string;
  }

  var ellipsis = precomposed ? '…' : '...';

  if (maxCharsFromString === 1) {
    return "".concat(string[0]).concat(ellipsis);
  }

  var midpoint = Math.ceil(string.length / 2);
  var toRemove = string.length - maxCharsFromString;
  var lstrip = Math.ceil(toRemove / 2);
  var rstrip = toRemove - lstrip;
  return "".concat(string.substring(0, midpoint - lstrip)).concat(ellipsis).concat(string.substring(midpoint + rstrip));
}