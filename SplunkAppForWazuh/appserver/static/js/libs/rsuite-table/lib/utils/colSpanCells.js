'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isNullOrUndefined = require('./isNullOrUndefined');

var _isNullOrUndefined2 = _interopRequireDefault(_isNullOrUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cloneCell(Cell, props) {
  return _react2.default.cloneElement(Cell, props);
}

function colSpanCells(cells) {
  var nextCells = [];
  for (var i = 0; i < cells.length; i += 1) {
    var _cells$i$props = cells[i].props,
        width = _cells$i$props.width,
        colSpan = _cells$i$props.colSpan;
    /**
     * 如果存在 colSpan 属性，就去找它的下一个 Cell,
     * 看看值是否是 isNullOrUndefined，，如果为空这可以合并这个单元格
     */

    if (colSpan) {
      var nextWidth = width;
      for (var j = 0; j < colSpan; j += 1) {
        var nextCell = cells[i + j];
        if (nextCell) {
          var _nextCell$props = nextCell.props,
              rowData = _nextCell$props.rowData,
              dataKey = _nextCell$props.dataKey,
              children = _nextCell$props.children,
              colSpanWidth = _nextCell$props.width,
              isHeaderCell = _nextCell$props.isHeaderCell;

          if (rowData && (0, _isNullOrUndefined2.default)((0, _get3.default)(rowData, dataKey)) || isHeaderCell && (0, _isNullOrUndefined2.default)(children)) {
            nextWidth += colSpanWidth;
            cells[i + j] = cloneCell(nextCell, {
              removed: true
            });
          }
        }
      }

      nextCells.push(cloneCell(cells[i], {
        width: nextWidth
      }));
      /* eslint-disable */
      continue;
    }
    nextCells.push(cells[i]);
  }
  return nextCells;
}

exports.default = colSpanCells;