'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNullOrUndefined;

var _isNull = require('lodash/isNull');

var _isNull2 = _interopRequireDefault(_isNull);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNullOrUndefined(value) {
  return (0, _isNull2.default)(value) || (0, _isUndefined2.default)(value);
}