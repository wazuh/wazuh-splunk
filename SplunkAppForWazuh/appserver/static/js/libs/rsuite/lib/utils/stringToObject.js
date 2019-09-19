"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _default = function _default(value, labelKey, valueKey) {
  if (_lodash.default.isObject(value)) {
    return value;
  }

  if (labelKey && valueKey) {
    var _ref;

    return _ref = {}, _ref[labelKey] = value, _ref[valueKey] = value, _ref;
  }

  return null;
};

exports.default = _default;
module.exports = exports.default;