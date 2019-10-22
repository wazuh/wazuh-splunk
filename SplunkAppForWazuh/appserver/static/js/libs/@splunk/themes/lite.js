"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("./base"));

var _mixins = require("./mixins");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * # Brand Colors
 *
 *  @colorSet
 */
var brandColors = {
  brandColorL50: '#fef8f2',
  brandColorL40: '#fde6d2',
  brandColorL30: '#fbcda5',
  brandColorL20: '#f9b479',
  brandColorL10: '#f79b4c',
  brandColor: '#f58220',
  brandColorD10: '#ed740b',
  brandColorD20: '#d2670a',
  brandColorD30: '#b85b09',
  brandColorD40: '#9e4e07',
  brandColorD50: '#844106'
};

var variables = _objectSpread({}, _base.default, brandColors);

var _default = _objectSpread({}, variables, {
  mixins: {
    reset: (0, _mixins.createReset)(variables),
    clearfix: _mixins.clearfix,
    ellipsis: _mixins.ellipsis,
    printWidth100Percent: _mixins.printWidth100Percent,
    printHide: _mixins.printHide,
    printNoBackground: _mixins.printNoBackground,
    printWrapAll: _mixins.printWrapAll
  }
});

exports.default = _default;