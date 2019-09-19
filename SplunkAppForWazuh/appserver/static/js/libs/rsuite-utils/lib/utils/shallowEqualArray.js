'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shallowEqual = require('./shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shallowEqualArray(a, b) {
  if (a === b) {
    return true;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (var i = 0; i < a.length; i += 1) {
    if (!(0, _shallowEqual2.default)(a[i], b[i])) {
      return false;
    }
  }

  return true;
}

exports.default = shallowEqualArray;