'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _ColumnResizeHandler = require('./ColumnResizeHandler');

var _ColumnResizeHandler2 = _interopRequireDefault(_ColumnResizeHandler);

var _utils = require('./utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderCell = function (_React$PureComponent) {
  _inherits(HeaderCell, _React$PureComponent);

  _createClass(HeaderCell, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.width !== prevState.width || nextProps.flexGrow !== prevState.flexGrow) {
        return {
          width: nextProps.width,
          flexGrow: nextProps.flexGrow,
          columnWidth: (0, _utils.isNullOrUndefined)(nextProps.flexGrow) ? nextProps.width : 0
        };
      }

      return null;
    }
  }]);

  function HeaderCell(props) {
    _classCallCheck(this, HeaderCell);

    var _this = _possibleConstructorReturn(this, (HeaderCell.__proto__ || Object.getPrototypeOf(HeaderCell)).call(this, props));

    _this.handleColumnResizeStart = function (event) {
      var _this$props = _this.props,
          left = _this$props.left,
          fixed = _this$props.fixed,
          onColumnResizeStart = _this$props.onColumnResizeStart;


      _this.setState({ initialEvent: event });
      onColumnResizeStart && onColumnResizeStart(_this.state.columnWidth, left, !!fixed);
    };

    _this.handleColumnResizeEnd = function (columnWidth, cursorDelta) {
      var _this$props2 = _this.props,
          dataKey = _this$props2.dataKey,
          index = _this$props2.index,
          onColumnResizeEnd = _this$props2.onColumnResizeEnd,
          onResize = _this$props2.onResize;

      _this.setState({ columnWidth: columnWidth });
      onColumnResizeEnd && onColumnResizeEnd(columnWidth, cursorDelta, dataKey, index);
      onResize && onResize(columnWidth, dataKey);
    };

    _this.handleClick = function () {
      var _this$props3 = _this.props,
          sortable = _this$props3.sortable,
          dataKey = _this$props3.dataKey,
          onSortColumn = _this$props3.onSortColumn;

      if (sortable && onSortColumn) {
        onSortColumn(dataKey);
      }
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.state = {
      width: props.width,
      flexGrow: props.flexGrow,
      columnWidth: (0, _utils.isNullOrUndefined)(props.flexGrow) ? props.width : 0
    };
    return _this;
  }

  _createClass(HeaderCell, [{
    key: 'renderResizeSpanner',
    value: function renderResizeSpanner() {
      var _props = this.props,
          resizable = _props.resizable,
          left = _props.left,
          onColumnResizeMove = _props.onColumnResizeMove,
          fixed = _props.fixed,
          headerHeight = _props.headerHeight;
      var _state = this.state,
          columnWidth = _state.columnWidth,
          initialEvent = _state.initialEvent;


      if (!resizable) {
        return null;
      }

      return React.createElement(_ColumnResizeHandler2.default, {
        columnWidth: columnWidth,
        columnLeft: left,
        columnFixed: !!fixed,
        height: headerHeight ? headerHeight - 1 : undefined,
        initialEvent: initialEvent,
        onColumnResizeMove: onColumnResizeMove,
        onColumnResizeStart: this.handleColumnResizeStart,
        onColumnResizeEnd: this.handleColumnResizeEnd
      });
    }
  }, {
    key: 'renderSortColumn',
    value: function renderSortColumn() {
      var _props2 = this.props,
          sortable = _props2.sortable,
          sortColumn = _props2.sortColumn,
          _props2$sortType = _props2.sortType,
          sortType = _props2$sortType === undefined ? '' : _props2$sortType,
          dataKey = _props2.dataKey;


      if (sortable) {
        var iconClasses = (0, _classnames2.default)(this.addPrefix('icon-sort'), _defineProperty({}, this.addPrefix('icon-sort-' + sortType), sortColumn === dataKey));
        return React.createElement(
          'span',
          { className: this.addPrefix('sort-wrapper') },
          React.createElement('i', { className: iconClasses })
        );
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          className = _props3.className,
          width = _props3.width,
          dataKey = _props3.dataKey,
          headerHeight = _props3.headerHeight,
          children = _props3.children,
          left = _props3.left,
          sortable = _props3.sortable,
          classPrefix = _props3.classPrefix,
          rest = _objectWithoutProperties(_props3, ['className', 'width', 'dataKey', 'headerHeight', 'children', 'left', 'sortable', 'classPrefix']);

      var classes = (0, _classnames2.default)(classPrefix, className, _defineProperty({}, this.addPrefix('sortable'), sortable));
      var unhandled = (0, _utils.getUnhandledProps)(HeaderCell, rest);

      return React.createElement(
        'div',
        { className: classes },
        React.createElement(
          _Cell2.default,
          _extends({}, unhandled, {
            width: width,
            dataKey: dataKey,
            left: left,
            headerHeight: headerHeight,
            isHeaderCell: true,
            onClick: this.handleClick
          }),
          children,
          this.renderSortColumn()
        ),
        this.renderResizeSpanner()
      );
    }
  }]);

  return HeaderCell;
}(React.PureComponent);

HeaderCell.defaultProps = {
  classPrefix: (0, _utils.defaultClassPrefix)('table-cell-header')
};
HeaderCell.handledProps = ['children', 'className', 'classPrefix', 'dataKey', 'fixed', 'flexGrow', 'headerHeight', 'index', 'left', 'onColumnResizeEnd', 'onColumnResizeMove', 'onColumnResizeStart', 'onResize', 'onSortColumn', 'resizable', 'sortColumn', 'sortType', 'sortable', 'width'];
HeaderCell.propTypes = {
  width: _propTypes2.default.number,
  dataKey: _propTypes2.default.string,
  left: _propTypes2.default.number,
  className: _propTypes2.default.string,
  classPrefix: _propTypes2.default.string,
  headerHeight: _propTypes2.default.number,
  children: _propTypes2.default.node,


  // self props
  index: _propTypes2.default.number,
  sortColumn: _propTypes2.default.string,
  sortType: _propTypes2.default.oneOf(['desc', 'asc']),
  sortable: _propTypes2.default.bool,
  resizable: _propTypes2.default.bool,
  onColumnResizeStart: _propTypes2.default.func,
  onColumnResizeEnd: _propTypes2.default.func,
  onResize: _propTypes2.default.func,
  onColumnResizeMove: _propTypes2.default.func,
  onSortColumn: _propTypes2.default.func,
  flexGrow: _propTypes2.default.number,
  fixed: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.oneOf(['left']), _propTypes2.default.oneOf(['right'])])
};


(0, _reactLifecyclesCompat.polyfill)(HeaderCell);

exports.default = HeaderCell;