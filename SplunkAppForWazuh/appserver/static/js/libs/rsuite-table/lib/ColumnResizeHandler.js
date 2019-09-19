'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clamp2 = require('lodash/clamp');

var _clamp3 = _interopRequireDefault(_clamp2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domLib = require('dom-lib');

var _utils = require('./utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColumnResizeHandler = function (_React$Component) {
  _inherits(ColumnResizeHandler, _React$Component);

  function ColumnResizeHandler(props) {
    _classCallCheck(this, ColumnResizeHandler);

    var _this = _possibleConstructorReturn(this, (ColumnResizeHandler.__proto__ || Object.getPrototypeOf(ColumnResizeHandler)).call(this, props));

    _this.onMove = function (deltaX) {
      if (!_this.isKeyDown) {
        return;
      }

      var _this$props = _this.props,
          onColumnResizeMove = _this$props.onColumnResizeMove,
          columnWidth = _this$props.columnWidth,
          columnLeft = _this$props.columnLeft,
          columnFixed = _this$props.columnFixed;

      _this.cursorDelta += deltaX;
      _this.columnWidth = (0, _clamp3.default)(columnWidth + _this.cursorDelta, 20, 20000);
      onColumnResizeMove && onColumnResizeMove(_this.columnWidth, columnLeft, columnFixed);
    };

    _this.onColumnResizeEnd = function () {
      var onColumnResizeEnd = _this.props.onColumnResizeEnd;

      _this.isKeyDown = false;

      onColumnResizeEnd && onColumnResizeEnd(_this.columnWidth, _this.cursorDelta);

      if (_this.mouseMoveTracker) {
        _this.mouseMoveTracker.releaseMouseMoves();
        _this.mouseMoveTracker = null;
      }
    };

    _this.onColumnResizeMouseDown = function (event) {
      var onColumnResizeStart = _this.props.onColumnResizeStart;


      _this.mouseMoveTracker = _this.getMouseMoveTracker();
      _this.isKeyDown = true;
      _this.cursorDelta = 0;

      var client = {
        clientX: event.clientX,
        clientY: event.clientY,
        preventDefault: function preventDefault() {}
      };

      onColumnResizeStart && onColumnResizeStart(client);
    };

    _this.columnWidth = 0;
    _this.cursorDelta = 0;

    _this.columnWidth = props.columnWidth || 0;
    return _this;
  }

  _createClass(ColumnResizeHandler, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.initialEvent && this.isKeyDown && this.mouseMoveTracker && !this.mouseMoveTracker.isDragging()) {
        this.mouseMoveTracker.captureMouseMoves(nextProps.initialEvent);
      }

      if (nextProps.columnWidth !== this.props.columnWidth) {
        this.columnWidth = nextProps.columnWidth;
      }
      return true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.mouseMoveTracker) {
        this.mouseMoveTracker.releaseMouseMoves();
        this.mouseMoveTracker = null;
      }
    }
  }, {
    key: 'getMouseMoveTracker',
    value: function getMouseMoveTracker() {
      return this.mouseMoveTracker || new _domLib.DOMMouseMoveTracker(this.onMove, this.onColumnResizeEnd, document.body);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$columnLeft = _props.columnLeft,
          columnLeft = _props$columnLeft === undefined ? 0 : _props$columnLeft,
          classPrefix = _props.classPrefix,
          height = _props.height,
          className = _props.className,
          style = _props.style,
          rest = _objectWithoutProperties(_props, ['columnLeft', 'classPrefix', 'height', 'className', 'style']);

      var styles = _extends({
        left: this.columnWidth + columnLeft - 2,
        height: height
      }, style);

      var classes = (0, _classnames2.default)(classPrefix, className);
      var unhandled = (0, _utils.getUnhandledProps)(ColumnResizeHandler, rest);

      return React.createElement('div', _extends({}, unhandled, {
        className: classes,
        style: styles,
        onMouseDown: this.onColumnResizeMouseDown,
        role: 'button',
        tabIndex: -1
      }));
    }
  }]);

  return ColumnResizeHandler;
}(React.Component);

ColumnResizeHandler.defaultProps = {
  classPrefix: (0, _utils.defaultClassPrefix)('table-column-resize-spanner')
};
ColumnResizeHandler.handledProps = ['className', 'classPrefix', 'columnFixed', 'columnLeft', 'columnWidth', 'height', 'initialEvent', 'onColumnResizeEnd', 'onColumnResizeMove', 'onColumnResizeStart', 'style'];
ColumnResizeHandler.propTypes = {
  height: _propTypes2.default.number,
  initialEvent: _propTypes2.default.object,
  columnWidth: _propTypes2.default.number,
  columnLeft: _propTypes2.default.number,
  columnFixed: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  classPrefix: _propTypes2.default.string,
  style: _propTypes2.default.object,
  onColumnResizeStart: _propTypes2.default.func,
  onColumnResizeEnd: _propTypes2.default.func,
  onColumnResizeMove: _propTypes2.default.func
};
exports.default = ColumnResizeHandler;