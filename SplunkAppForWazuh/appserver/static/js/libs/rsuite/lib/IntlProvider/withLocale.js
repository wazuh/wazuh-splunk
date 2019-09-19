"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _recompose = require("recompose");

var _en_GB = _interopRequireDefault(require("./locales/en_GB"));

var _IntlContext = _interopRequireDefault(require("./IntlContext"));

var mergeObject = function mergeObject(list) {
  return list.reduce(function (a, b) {
    a = (0, _extends2.default)({}, a, {}, b);
    return a;
  }, {});
};

function withLocale(combineKeys) {
  if (combineKeys === void 0) {
    combineKeys = [];
  }

  return function (BaseComponent) {
    var factory = React.createFactory(BaseComponent);
    var WithLocale = React.forwardRef(function (props, ref) {
      return React.createElement(_IntlContext.default.Consumer, null, function (messages) {
        var locales = combineKeys.map(function (key) {
          return _lodash.default.get(messages || _en_GB.default, "" + key);
        });
        return factory((0, _extends2.default)({
          ref: ref,
          locale: mergeObject(locales)
        }, props));
      });
    });
    WithLocale.displayName = BaseComponent.displayName;

    if (process.env.NODE_ENV !== 'production') {
      return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, 'withLocale'))(WithLocale);
    }

    return WithLocale;
  };
}

var _default = withLocale;
exports.default = _default;
module.exports = exports.default;