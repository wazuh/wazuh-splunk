define(function (require, exports, module) {
  "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gettext = gettext;
exports._ = _;
exports.setSharedTranslator = setSharedTranslator;
exports.resetSharedTranslator = resetSharedTranslator;

/**
 * @file
 * Internationalization / translation utility. The exported `gettext` (and its alias `_`) uses
 * a shared translator function that's set to `window.gettext` by default. If `window.gettext` isn't
 * available the identify function is used, turning `gettext` and `_` into no-ops.
 *
 * Caution is advised when using `setSharedTranslator` and `resetSharedTranslator`. Always restore
 * the translator after changing it, and never assume that the translator hasn't been changed by
 * external code during long-running operations.
 *
 * If used in combination with Splunk, `window.gettext` is provided by default. Using the `gettext`
 * and `_` syntax ensures that messages can be extracted and a catalog file can be generated
 * automatically.
 */
var internalTranslator;
/**
 * Translates text using the shared translator. By default this is `window.gettext` if it's available,
 *  the identify function is used otherwise.
 * @param {String} text The text to translate.
 * @return {String} The translated text.
 * @public
 */

function gettext() {
  return internalTranslator.apply(void 0, arguments);
}
/**
 * This is an alias for `gettext`.
 * @param {String} text The text to translate.
 * @return {String} The translated text.
 * @public
 */


function _() {
  return internalTranslator.apply(void 0, arguments);
}
/**
 * Sets the shared translator. It will be used by all subsequent calls of `gettext` and `_`.
 * @param {function} newTranslator - A function that returns the translated string.
 * @public
 */


function setSharedTranslator(newTranslator) {
  internalTranslator = newTranslator;
}
/**
 * Resets the shared translator to `window.gettext` if available, the identify function otherwise.
 * This function is invoked automatically during module load.
 * @public
 */


function resetSharedTranslator() {
  setSharedTranslator(typeof window !== 'undefined' && window.gettext || function (message) {
    return message;
  });
}

resetSharedTranslator();

});