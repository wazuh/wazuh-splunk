"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGUID = createGUID;
exports.createDOMID = createDOMID;

/**
 * Creates a Globally Unique Identifier in the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
 * where each x is replaced with a hexadecimal digit from 0 to f, and y is replaced with a
 * hexadecimal digit from 8 to b. This is not compatible with DOM ids, which must
 * start with a letter.
 *
 * @returns {String}
 * @public
 */
function createGUID() {
  var template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return template.replace(/[xy]/g, function (char) {
    var random = Math.floor(Math.random() * 16);
    var value = char === 'x' ? random : random % 4 + 8;
    return value.toString(16);
  });
}
/**
 * Creates a Globally Unique Identifier prefixed with one or more letters to create a valid DOM id.
 *
 * @param {String} [prefix=id] A prefix, which must start with a letter and may only contain
 * letters, digits, hyphens and underscores.
 * @returns {String}
 * @public
 */


function createDOMID() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id';

  if (prefix.match(/^[a-zA-Z][\w-]*$/)) {
    return "".concat(prefix, "-").concat(createGUID());
  }

  throw new Error('createDOMID: Prefix must start with a letter and may only contain letters, digits, hyphens and underscores');
}