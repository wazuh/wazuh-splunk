'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toJSX = function toJSX(node, key) {
  return typeof node !== 'undefined' ? _react2.default.createElement(
    'span',
    { key: key },
    node
  ) : null;
};

/**
 * tplTransform('Show {0} data', <i>100</i>);
 * output:
 * Show <span><i>100</i></span> data
 */
toJSX.handledProps = [];

exports.default = function (pattern) {
  for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    data[_key - 1] = arguments[_key];
  }

  return pattern.split(/\{(\d+)\}/).map(function (item, index) {
    return index % 2 ? toJSX(data[+item], index) : toJSX(item, index);
  }).filter(function (item) {
    return item !== '';
  });
};