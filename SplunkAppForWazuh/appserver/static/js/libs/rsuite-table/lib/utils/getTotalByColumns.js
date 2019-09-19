'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTotalByColumns(columns) {
  var totalFlexGrow = 0;
  var totalWidth = 0;

  var count = function count(items) {
    Array.from(items).forEach(function (column) {
      if (_react2.default.isValidElement(column)) {
        var _column$props = column.props,
            flexGrow = _column$props.flexGrow,
            _column$props$width = _column$props.width,
            width = _column$props$width === undefined ? 0 : _column$props$width;

        totalFlexGrow += flexGrow || 0;
        totalWidth += flexGrow ? 0 : width;
      } else if ((0, _isArray3.default)(column)) {
        count(column);
      }
    });
  };

  if ((0, _isArray3.default)(columns)) {
    count(columns);
  } else if ((0, _isPlainObject3.default)(columns)) {
    var _columns$props = columns.props,
        flexGrow = _columns$props.flexGrow,
        _columns$props$width = _columns$props.width,
        width = _columns$props$width === undefined ? 0 : _columns$props$width;


    totalFlexGrow = flexGrow || 0;
    totalWidth = flexGrow ? 0 : width;
  }

  return {
    totalFlexGrow: totalFlexGrow,
    totalWidth: totalWidth
  };
}

exports.default = getTotalByColumns;