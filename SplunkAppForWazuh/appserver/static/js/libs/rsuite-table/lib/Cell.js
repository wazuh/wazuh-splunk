'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('./constants');

var _utils = require('./utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cell = function (_React$PureComponent) {
  _inherits(Cell, _React$PureComponent);

  function Cell() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Cell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cell.__proto__ || Object.getPrototypeOf(Cell)).call.apply(_ref, [this].concat(args))), _this), _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    }, _this.handleExpandClick = function (event) {
      var _this$props = _this.props,
          onTreeToggle = _this$props.onTreeToggle,
          rowKey = _this$props.rowKey,
          rowIndex = _this$props.rowIndex,
          rowData = _this$props.rowData;

      onTreeToggle && onTreeToggle(rowKey, rowIndex, rowData, event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Cell, [{
    key: 'renderExpandIcon',
    value: function renderExpandIcon() {
      var _props = this.props,
          hasChildren = _props.hasChildren,
          firstColumn = _props.firstColumn,
          rowData = _props.rowData,
          renderTreeToggle = _props.renderTreeToggle;

      var expandButton = React.createElement('i', { className: this.addPrefix('expand-icon') });

      /**
       * 如果用子节点，同时是第一列,则创建一个 icon 用于展开节点
       */
      if (hasChildren && firstColumn) {
        return React.createElement(
          'span',
          {
            role: 'button',
            tabIndex: -1,
            className: this.addPrefix('expand-wrapper'),
            onClick: this.handleExpandClick
          },
          renderTreeToggle ? renderTreeToggle(expandButton, rowData) : expandButton
        );
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props2 = this.props,
          width = _props2.width,
          left = _props2.left,
          height = _props2.height,
          style = _props2.style,
          className = _props2.className,
          firstColumn = _props2.firstColumn,
          lastColumn = _props2.lastColumn,
          isHeaderCell = _props2.isHeaderCell,
          headerHeight = _props2.headerHeight,
          align = _props2.align,
          children = _props2.children,
          rowData = _props2.rowData,
          rowIndex = _props2.rowIndex,
          dataKey = _props2.dataKey,
          renderCell = _props2.renderCell,
          removed = _props2.removed,
          wordWrap = _props2.wordWrap,
          classPrefix = _props2.classPrefix,
          depth = _props2.depth,
          verticalAlign = _props2.verticalAlign,
          rest = _objectWithoutProperties(_props2, ['width', 'left', 'height', 'style', 'className', 'firstColumn', 'lastColumn', 'isHeaderCell', 'headerHeight', 'align', 'children', 'rowData', 'rowIndex', 'dataKey', 'renderCell', 'removed', 'wordWrap', 'classPrefix', 'depth', 'verticalAlign']);

      if (removed) {
        return null;
      }

      var classes = (0, _classnames2.default)(classPrefix, className, (_classNames = {}, _defineProperty(_classNames, this.addPrefix('first'), firstColumn), _defineProperty(_classNames, this.addPrefix('last'), lastColumn), _classNames));

      var nextHeight = isHeaderCell ? headerHeight : height;
      var styles = {
        width: width,
        height: nextHeight,
        zIndex: depth,
        left: left
      };

      var contentStyles = _extends({
        width: width,
        height: nextHeight,
        textAlign: align,
        paddingLeft: firstColumn ? depth * _constants.LAYER_WIDTH + 10 : null
      }, style);

      if (verticalAlign) {
        contentStyles.display = 'table-cell';
        contentStyles.verticalAlign = verticalAlign;
      }

      var contentChildren = (0, _utils.isNullOrUndefined)(children) && rowData ? (0, _get3.default)(rowData, dataKey) : children;

      if (typeof children === 'function') {
        contentChildren = children(rowData, rowIndex);
      }

      var unhandled = (0, _utils.getUnhandledProps)(Cell, rest, ['index', 'fixed', 'resizable', 'flexGrow', 'minWidth', 'sortColumn', 'sortType', 'onSortColumn', 'onColumnResizeEnd', 'onColumnResizeStart', 'onColumnResizeMove', 'colSpan']);

      return React.createElement(
        'div',
        _extends({}, unhandled, { className: classes, style: styles }),
        wordWrap ? React.createElement(
          'div',
          { className: this.addPrefix('content'), style: contentStyles },
          React.createElement(
            'div',
            { className: this.addPrefix('wrap') },
            this.renderExpandIcon(),
            renderCell ? renderCell(contentChildren) : contentChildren
          )
        ) : React.createElement(
          'div',
          { className: this.addPrefix('content'), style: contentStyles },
          this.renderExpandIcon(),
          renderCell ? renderCell(contentChildren) : contentChildren
        )
      );
    }
  }]);

  return Cell;
}(React.PureComponent);

Cell.defaultProps = {
  classPrefix: (0, _utils.defaultClassPrefix)('table-cell'),
  align: 'left',
  headerHeight: 36,
  depth: 0,
  height: 36,
  width: 0,
  left: 0
};
Cell.handledProps = ['align', 'children', 'className', 'classPrefix', 'dataKey', 'depth', 'firstColumn', 'hasChildren', 'headerHeight', 'height', 'isHeaderCell', 'lastColumn', 'left', 'onTreeToggle', 'removed', 'renderCell', 'renderTreeToggle', 'rowData', 'rowIndex', 'rowKey', 'style', 'verticalAlign', 'width', 'wordWrap'];
Cell.propTypes = {
  align: _propTypes2.default.oneOf(['left', 'center', 'right']),
  verticalAlign: _propTypes2.default.oneOf(['top', 'middle', 'bottom']),
  className: _propTypes2.default.string,
  classPrefix: _propTypes2.default.string,
  dataKey: _propTypes2.default.string,
  isHeaderCell: _propTypes2.default.bool,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number,
  left: _propTypes2.default.number,
  headerHeight: _propTypes2.default.number,
  style: _propTypes2.default.object,
  firstColumn: _propTypes2.default.bool,
  lastColumn: _propTypes2.default.bool,
  hasChildren: _propTypes2.default.bool,
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
  rowKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  rowIndex: _propTypes2.default.number,
  rowData: _propTypes2.default.object,
  depth: _propTypes2.default.number.isRequired,
  onTreeToggle: _propTypes2.default.func,
  renderTreeToggle: _propTypes2.default.func,
  renderCell: _propTypes2.default.func,
  wordWrap: _propTypes2.default.bool,
  removed: _propTypes2.default.bool
};
exports.default = Cell;