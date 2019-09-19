'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isNull2 = require('lodash/isNull');

var _isNull3 = _interopRequireDefault(_isNull2);

exports.default = isNullOrUndefined;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNullOrUndefined(value) {
  return (0, _isNull3.default)(value) || (0, _isUndefined3.default)(value);
}