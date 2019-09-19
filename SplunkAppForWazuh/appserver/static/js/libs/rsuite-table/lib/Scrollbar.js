'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domLib = require('dom-lib');

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

var Scrollbar = function (_React$PureComponent) {
  _inherits(Scrollbar, _React$PureComponent);

  function Scrollbar(props) {
    _classCallCheck(this, Scrollbar);

    var _this = _possibleConstructorReturn(this, (Scrollbar.__proto__ || Object.getPrototypeOf(Scrollbar)).call(this, props));

    _this.hanldeMouseDown = function (event) {
      var onMouseDown = _this.props.onMouseDown;


      _this.mouseMoveTracker = _this.getMouseMoveTracker();
      _this.mouseMoveTracker.captureMouseMoves(event);
      _this.setState({
        handlePressed: true
      });
      onMouseDown && onMouseDown(event);
    };

    _this.hanldeDragEnd = function () {
      _this.releaseMouseMoves();
      _this.setState({
        handlePressed: false
      });
    };

    _this.hanldeDragMove = function (deltaX, deltaY, event) {
      var vertical = _this.props.vertical;


      if (!_this.mouseMoveTracker || !_this.mouseMoveTracker.isDragging()) {
        return;
      }
      _this.handleScroll(vertical ? deltaY : deltaX, event);
    };

    _this.hanldeClick = function (event) {
      if (_this.handle && _this.handle.contains(event.target)) {
        return;
      }

      var _this$props = _this.props,
          vertical = _this$props.vertical,
          length = _this$props.length,
          scrollLength = _this$props.scrollLength;
      var barOffset = _this.state.barOffset;

      var offset = vertical ? event.pageY - barOffset.top : event.pageX - barOffset.left;

      var handleWidth = length / scrollLength * length;
      var delta = offset - handleWidth;

      var nextDelta = offset > _this.scrollOffset ? delta - _this.scrollOffset : offset - _this.scrollOffset;
      _this.handleScroll(nextDelta, event);
    };

    _this.scrollOffset = 0;

    _this.bindBarRef = function (ref) {
      _this.bar = ref;
    };

    _this.bindHandleRef = function (ref) {
      _this.handle = ref;
    };

    _this.state = {
      barOffset: {
        top: 0,
        left: 0
      },
      handlePressed: false
    };
    return _this;
  }

  _createClass(Scrollbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initBarOffset();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.releaseMouseMoves();
    }
  }, {
    key: 'onWheelScroll',
    value: function onWheelScroll(delta) {
      var _props = this.props,
          length = _props.length,
          scrollLength = _props.scrollLength;

      var nextDelta = delta / (scrollLength / length);

      this.updateScrollBarPosition(nextDelta);
    }
  }, {
    key: 'getMouseMoveTracker',
    value: function getMouseMoveTracker() {
      return this.mouseMoveTracker || new _domLib.DOMMouseMoveTracker(this.hanldeDragMove, this.hanldeDragEnd, document.body);
    }
  }, {
    key: 'initBarOffset',
    value: function initBarOffset() {
      var _this2 = this;

      setTimeout(function () {
        _this2.bar && _this2.setState({
          barOffset: (0, _domLib.getOffset)(_this2.bar)
        });
      }, 1);
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(delta, event) {
      var _props2 = this.props,
          length = _props2.length,
          scrollLength = _props2.scrollLength,
          onScroll = _props2.onScroll;

      var scrollDelta = delta * (scrollLength / length);

      this.updateScrollBarPosition(delta);
      onScroll && onScroll(scrollDelta, event);
    }
  }, {
    key: 'resetScrollBarPosition',
    value: function resetScrollBarPosition() {
      var forceDelta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.scrollOffset = 0;
      this.updateScrollBarPosition(0, forceDelta);
    }
  }, {
    key: 'updateScrollBarPosition',
    value: function updateScrollBarPosition(delta, forceDelta) {
      var _props3 = this.props,
          vertical = _props3.vertical,
          length = _props3.length,
          scrollLength = _props3.scrollLength;

      var max = scrollLength && length ? length - Math.max(length / scrollLength * length, _constants.SCROLLBAR_MIN_WIDTH + 2) : 0;
      var styles = {};

      if ((0, _isUndefined3.default)(forceDelta)) {
        this.scrollOffset += delta;
        this.scrollOffset = Math.max(this.scrollOffset, 0);
        this.scrollOffset = Math.min(this.scrollOffset, max);
      } else {
        this.scrollOffset = forceDelta || 0;
      }

      if (vertical) {
        (0, _domLib.translateDOMPositionXY)(styles, 0, this.scrollOffset);
      } else {
        (0, _domLib.translateDOMPositionXY)(styles, this.scrollOffset, 0);
      }

      (0, _domLib.addStyle)(this.handle, styles);
    }
  }, {
    key: 'releaseMouseMoves',
    value: function releaseMouseMoves() {
      if (this.mouseMoveTracker) {
        this.mouseMoveTracker.releaseMouseMoves();
        this.mouseMoveTracker = null;
      }
    }

    /**
     * 点击滚动条，然后滚动到指定位置
     */

  }, {
    key: 'render',
    value: function render() {
      var _classNames, _styles;

      var _props4 = this.props,
          vertical = _props4.vertical,
          length = _props4.length,
          scrollLength = _props4.scrollLength,
          classPrefix = _props4.classPrefix,
          className = _props4.className,
          rest = _objectWithoutProperties(_props4, ['vertical', 'length', 'scrollLength', 'classPrefix', 'className']);

      var handlePressed = this.state.handlePressed;

      var addPrefix = (0, _utils.prefix)(classPrefix);
      var classes = (0, _classnames2.default)(classPrefix, className, (_classNames = {}, _defineProperty(_classNames, addPrefix('vertical'), vertical), _defineProperty(_classNames, addPrefix('horizontal'), !vertical), _defineProperty(_classNames, addPrefix('hide'), scrollLength <= length), _defineProperty(_classNames, addPrefix('pressed'), handlePressed), _classNames));

      var styles = (_styles = {}, _defineProperty(_styles, vertical ? 'height' : 'width', length / scrollLength * 100 + '%'), _defineProperty(_styles, vertical ? 'minHeight' : 'minWidth', _constants.SCROLLBAR_MIN_WIDTH), _styles);
      var unhandled = (0, _utils.getUnhandledProps)(Scrollbar, rest);

      return React.createElement(
        'div',
        _extends({}, unhandled, {
          ref: this.bindBarRef,
          className: classes,
          onClick: this.hanldeClick,
          role: 'toolbar'
        }),
        React.createElement('div', {
          ref: this.bindHandleRef,
          className: addPrefix('handle'),
          style: styles,
          onMouseDown: this.hanldeMouseDown,
          role: 'button',
          tabIndex: -1
        })
      );
    }
  }]);

  return Scrollbar;
}(React.PureComponent);

Scrollbar.defaultProps = {
  classPrefix: (0, _utils.defaultClassPrefix)('table-scrollbar'),
  scrollLength: 1,
  length: 1
};
Scrollbar.handledProps = ['className', 'classPrefix', 'length', 'onMouseDown', 'onScroll', 'scrollLength', 'vertical'];
Scrollbar.propTypes = {
  vertical: _propTypes2.default.bool,
  length: _propTypes2.default.number.isRequired,
  scrollLength: _propTypes2.default.number.isRequired,
  className: _propTypes2.default.string,
  classPrefix: _propTypes2.default.string,
  onScroll: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func
};
exports.default = Scrollbar;