"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeBoolean = normalizeBoolean;

/* eslint-disable import/prefer-default-export */

/**
 * This function matches a given value to a predefined list of true and false values, including
 * English words. String comparisons are case insensitive.
 *
 * Returns `true` if the value is:
 * * `true`
 * * `1`
 * * `'1'`
 * * `'yes'`
 * * `'on'`
 * * `'true'`
 *
 * Returns `false` if the value is
 * * `false`
 * * `0`
 * * `'0'`
 * * `'no'`
 * * `'off'`
 * * `'false'`
 *
 * Otherwise returns `undefined`.
 *
 * @param {Boolean|Number|String} value - The value to be evaluated.
 * @returns {Boolean|undefined}
 * @public
 */
function normalizeBoolean(value) {
  var test = typeof value === 'string' ? value.toLowerCase() : value;

  switch (test) {
    case true:
    case 1:
    case '1':
    case 'yes':
    case 'on':
    case 'true':
      return true;

    case false:
    case 0:
    case '0':
    case 'no':
    case 'off':
    case 'false':
      return false;

    default:
      return undefined;
  }
}