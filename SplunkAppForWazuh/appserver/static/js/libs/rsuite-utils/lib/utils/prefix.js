'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry2 = require('lodash/curry');

var _curry3 = _interopRequireDefault(_curry2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefix(pre, className) {
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
}

exports.default = (0, _curry3.default)(prefix);