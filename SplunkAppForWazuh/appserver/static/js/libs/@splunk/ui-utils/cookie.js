"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntry = getEntry;

/* eslint-disable import/prefer-default-export */

/**
 * Retrieves the cookie value for the reference name passed in.
 * This may be `null` if the token and/or the reference name is not found in the cookie.
 *
 * For example:
 * ```
 *    const CSRFToken = getEntry('splunkweb_csrf_token_8000');
 * ```
 *
 * @param {String} name Reference to the name in the cookie
 *
 * @returns {String|null} If found, returns the cookie value associated with the name; null otherwise.
 *
 * @public
 *
 */
function getEntry(name) {
  if (typeof document === 'undefined') {
    return null;
  }

  var regex = new RegExp("(^|; ?)".concat(name, "=([^;]+)"));
  var value = null;

  try {
    var match = document.cookie.match(regex);
    value = match ? match[2] : null;
  } catch (e) {// no-op, let `value` remain null
  }

  return value;
}