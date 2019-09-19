'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefix = exports.defaultClassPrefix = exports.getClassNamePrefix = exports.globalKey = undefined;

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _curry2 = require('lodash/curry');

var _curry3 = _interopRequireDefault(_curry2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalKey = exports.globalKey = 'rs-';
var getClassNamePrefix = exports.getClassNamePrefix = function getClassNamePrefix() {
  if (typeof __RSUITE_CLASSNAME_PREFIX__ !== 'undefined') {
    return __RSUITE_CLASSNAME_PREFIX__;
  }
  return globalKey;
};
var defaultClassPrefix = exports.defaultClassPrefix = function defaultClassPrefix(name) {
  return '' + getClassNamePrefix() + name;
};
var prefix = exports.prefix = (0, _curry3.default)(function (pre, className) {
  if (!pre || !className) {
    return '';
  }

  if ((0, _isArray3.default)(className)) {
    return (0, _classnames2.default)(className.filter(function (name) {
      return !!name;
    }).map(function (name) {
      return pre + '-' + name;
    }));
  }

  return pre + '-' + className;
});