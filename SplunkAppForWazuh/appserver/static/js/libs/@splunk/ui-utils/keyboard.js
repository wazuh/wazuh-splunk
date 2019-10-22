"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = isNumber;
exports.isDecimal = isDecimal;
exports.isMinus = isMinus;
exports.isNumeric = isNumeric;
exports.addsCharacter = addsCharacter;
exports.keycode = void 0;

var _keycode = _interopRequireDefault(require("keycode"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file
 * Utilities for handling keyboard events.
 */

/**
 * A utility for mapping key names with their numeric codes. This is an alias for [the third-party
 * library, keycode](https://github.com/timoxley/keycode).
 * @public
 */
var keycode = _keycode.default;
/**
 * Whenever possible this library uses event.key because it has fewer issues than event.keyCode.
 * However, Safari 9.0 and earlier only support it for a few keys, such as Enter, and the QA
 * test suite doesn't provide it.
 */

exports.keycode = keycode;

function isValidKey(key) {
  return (0, _lodash.isUndefined)(key) ? false : key !== 'Unidentified';
}
/**
 * Tests if the event key is a number.
 * @param {Event} event - A keyboard event that includes a key and/or keyCode.
 * @returns {Boolean}
 * @public
 */


function isNumber(_ref) {
  var key = _ref.key,
      keyCode = _ref.keyCode;

  if (isValidKey(key)) {
    var keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    return keys.indexOf(key) >= 0;
  }

  return keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105;
}
/**
 * Tests if the event key is a decimal.
 * @param {Event} event - A keyboard event that includes a key and/or keyCode.
 * @returns {Boolean}
 * @public
 */


function isDecimal(_ref2) {
  var key = _ref2.key,
      keyCode = _ref2.keyCode;

  if (isValidKey(key)) {
    return key === '.' || key === 'Decimal';
  }

  return keyCode === keycode('numpad .') || keyCode === keycode('.');
}
/**
 * Tests if the event key is a minus sign.
 * @param {Event} event - A keyboard event that includes a key and/or keyCode.
 * @returns {Boolean}
 * @public
 */


function isMinus(_ref3) {
  var key = _ref3.key,
      keyCode = _ref3.keyCode;

  if (isValidKey(key)) {
    return key === '-' || key === 'Subtract';
  }

  return keyCode === keycode('numpad -') || keyCode === keycode('-');
}
/**
 * Tests if the event key is a numeric character (number, decimal, or minus).
 * @param {Event} event - A keyboard event that includes a key and/or keyCode.
 * @returns {Boolean}
 * @public
 */


function isNumeric(event) {
  return isNumber(event) || isDecimal(event) || isMinus(event);
}
/**
 * Tests if the event key adds a character. Enter and Tab return false even though they
 * add characters in some situations.
 * Caveat: Safari 9.0 and earlier may return undefined as this cannot be practically
 * determined.
 * @param {Event} event - A keyboard event that includes a key.
 * @returns {Boolean|Undefined}
 * @public
 */


function addsCharacter(_ref4) {
  var key = _ref4.key;

  if (isValidKey(key)) {
    // IE 11 named characters
    var names = ['Add', 'Decimal', 'Divide', 'Multiply', 'Spacebar', 'Subtract']; // If key is one character it's assumed to be inserting a character rather than some other
    // type of action.

    return key.length === 1 || names.indexOf(key) >= 0;
  } // Safari 9.0 and earlier may return undefined


  return undefined;
}