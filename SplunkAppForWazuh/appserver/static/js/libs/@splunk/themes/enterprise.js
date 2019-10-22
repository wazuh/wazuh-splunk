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
  brandColorL50: '#f5fbf5',
  brandColorL40: '#dff2df',
  brandColorL30: '#bee6be',
  brandColorL20: '#9ed99e',
  brandColorL10: '#7ecd7e',
  brandColor: '#5cc05c',
  brandColorD10: '#49b849',
  brandColorD20: '#40a540',
  brandColorD30: '#389038',
  brandColorD40: '#307b30',
  brandColorD50: '#286728'
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