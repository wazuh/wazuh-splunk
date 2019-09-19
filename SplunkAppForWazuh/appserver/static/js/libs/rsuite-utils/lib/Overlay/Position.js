'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domLib = require('dom-lib');

var _overlayPositionUtils = require('../utils/overlayPositionUtils');

var _overlayPositionUtils2 = _interopRequireDefault(_overlayPositionUtils);

var _shallowEqual = require('../utils/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Position = function (_React$Component) {
  _inherits(Position, _React$Component);

  function Position(props) {
    _classCallCheck(this, Position);

    var _this = _possibleConstructorReturn(this, (Position.__proto__ || Object.getPrototypeOf(Position)).call(this, props));

    _this.lastTarget = false;
    _this.needsFlush = null;
    _this.container = null;
    _this.containerScrollListener = null;

    _this.updatePosition = function () {
      var placementChanged = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var target = _this.getTargetSafe();
      var _this$props = _this.props,
          shouldUpdatePosition = _this$props.shouldUpdatePosition,
          placement = _this$props.placement,
          containerPadding = _this$props.containerPadding;

      /**
       * 如果 target 没有变化，同时不允许更新位置，placement 位置也没有改变，则返回
       */

      if (target === _this.lastTarget && !shouldUpdatePosition && !placementChanged) {
        return;
      }

      _this.lastTarget = target;

      if (!target) {
        _this.setState({
          positionLeft: 0,
          positionTop: 0,
          arrowOffsetLeft: null,
          arrowOffsetTop: null
        });
        return;
      }

      /* eslint-disable */
      var overlay = (0, _reactDom.findDOMNode)(_this);
      var container = (0, _domLib.getContainer)(_this.props.container, (0, _domLib.ownerDocument)(_this).body);
      var nextPosition = _overlayPositionUtils2.default.calcOverlayPosition(placement, overlay, target, container, containerPadding);

      _this.container = container;
      _this.setState(nextPosition);
    };

    _this.state = {
      positionLeft: 0,
      positionTop: 0,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };
    return _this;
  }

  _createClass(Position, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updatePosition(false);
      if (this.container && this.props.preventOverflow) {
        this.containerScrollListener = (0, _domLib.on)(this.container.tagName === 'BODY' ? window : this.container, 'scroll', this.updatePosition);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (!(0, _shallowEqual2.default)(nextProps, this.props)) {
        this.needsFlush = true;
        return true;
      }

      if (!(0, _shallowEqual2.default)(nextState, this.state)) {
        return true;
      }

      return false;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.needsFlush) {
        this.needsFlush = false;
        this.updatePosition(prevProps.placement !== this.props.placement);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.lastTarget = null;
      if (this.containerScrollListener) {
        this.containerScrollListener.off();
      }
    }
  }, {
    key: 'getTargetSafe',
    value: function getTargetSafe() {
      var target = this.props.target;

      if (!target) {
        return null;
      }

      var targetSafe = target(this.props);

      if (!targetSafe) {
        return null;
      }

      return targetSafe;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          rest = _objectWithoutProperties(_props, ['children', 'className']);

      var _state = this.state,
          positionLeft = _state.positionLeft,
          positionTop = _state.positionTop,
          positionClassName = _state.positionClassName,
          arrowPosition = _objectWithoutProperties(_state, ['positionLeft', 'positionTop', 'positionClassName']);

      var child = React.Children.only(children);

      return React.cloneElement(child, _extends({}, (0, _omit3.default)(rest, ['target', 'container', 'containerPadding', 'preventOverflow']), arrowPosition, {
        positionLeft: positionLeft,
        positionTop: positionTop,
        className: (0, _classnames2.default)(className, positionClassName, child.props.className),
        style: _extends({}, child.props.style, {
          left: positionLeft,
          top: positionTop
        })
      }));
    }
  }]);

  return Position;
}(React.Component);

Position.displayName = 'Position';
Position.defaultProps = {
  containerPadding: 0,
  placement: 'right',
  shouldUpdatePosition: false
};
Position.handledProps = ['children', 'className', 'container', 'containerPadding', 'placement', 'preventOverflow', 'shouldUpdatePosition', 'target'];
exports.default = Position;