'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reactToString;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reactToString(element) {
  var nodes = [];
  var recursion = function recursion(elmt) {
    _react2.default.Children.forEach(elmt.props.children, function (child) {
      if (_react2.default.isValidElement(child)) {
        recursion(child);
      } else if (typeof child === 'string') {
        nodes.push(child);
      }
    });
  };

  recursion(element);
  return nodes;
}