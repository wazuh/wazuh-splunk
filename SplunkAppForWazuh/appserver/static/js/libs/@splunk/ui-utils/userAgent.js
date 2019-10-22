"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIE11 = isIE11;

/* eslint-disable import/prefer-default-export */

/**
 * Returns true if the current environment is Internet Explorer 11.
 *
 * @returns {Boolean}
 * @public
 */
function isIE11() {
  return !!navigator.userAgent.match(/Trident\/7\./);
}