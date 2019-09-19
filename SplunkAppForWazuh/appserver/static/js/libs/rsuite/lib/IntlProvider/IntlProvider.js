"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _IntlContext = _interopRequireDefault(require("./IntlContext"));

var IntlProvider = function IntlProvider(_ref) {
  var locale = _ref.locale,
      children = _ref.children;
  return React.createElement(_IntlContext.default.Provider, {
    value: locale
  }, children);
};

var _default = IntlProvider;
exports.default = _default;
module.exports = exports.default;