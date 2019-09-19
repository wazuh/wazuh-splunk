'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _isNullOrUndefined = require('../utils/isNullOrUndefined');

var _isNullOrUndefined2 = _interopRequireDefault(_isNullOrUndefined);

var _createChainedFunction = require('../utils/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

var _handleMouseOverOut = require('../utils/handleMouseOverOut');

var _handleMouseOverOut2 = _interopRequireDefault(_handleMouseOverOut);

var _isOneOf = require('../utils/isOneOf');

var _isOneOf2 = _interopRequireDefault(_isOneOf);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var unsupportedCreatePortal = !_reactDom2.default.createPortal;

var OverlayTrigger = function (_React$Component) {
  _inherits(OverlayTrigger, _React$Component);

  function OverlayTrigger(props) {
    _classCallCheck(this, OverlayTrigger);

    var _this = _possibleConstructorReturn(this, (OverlayTrigger.__proto__ || Object.getPrototypeOf(OverlayTrigger)).call(this, props));

    _this.getOverlayTarget = function () {
      return (0, _reactDom.findDOMNode)(_this);
    };

    _this.speaker = null;
    _this.handleMouseOver = null;
    _this.handleMouseOut = null;
    _this.hoverShowDelay = null;
    _this.hoverHideDelay = null;
    _this.target = null;
    _this.mountNode = null;
    _this.enterSpeaker = false;
    _this.enterTrigger = false;

    _this.handleSpeakerMouseEnter = function () {
      _this.enterSpeaker = true;
    };

    _this.handleSpeakerMouseLeave = function () {
      var trigger = _this.props.trigger;

      _this.enterSpeaker = false;
      if (!(0, _isOneOf2.default)('click', trigger) && !(0, _isOneOf2.default)('active', trigger)) {
        _this.handleHide();
      }
    };

    _this.hide = function () {
      _this.setState({ isOverlayShown: false });
    };

    _this.show = function () {
      _this.setState({ isOverlayShown: true });
    };

    _this.handleHide = function () {
      if (!_this.enterSpeaker && !_this.enterTrigger) {
        _this.hide();
      }
    };

    _this.handleToggle = function () {
      if (_this.state.isOverlayShown) {
        _this.handleHide();
      } else {
        _this.show();
      }
    };

    _this.handleDelayedShow = function () {
      var _this$props = _this.props,
          delayShow = _this$props.delayShow,
          delay = _this$props.delay;


      _this.enterTrigger = true;
      if (!(0, _isNullOrUndefined2.default)(_this.hoverHideDelay)) {
        clearTimeout(_this.hoverHideDelay);
        _this.hoverHideDelay = null;
        _this.show();
        return;
      }

      if (_this.state.isOverlayShown) {
        return;
      }

      var nextDelay = !(0, _isNullOrUndefined2.default)(delayShow) ? delayShow : delay;

      if (!nextDelay) {
        _this.show();
        return;
      }

      _this.hoverShowDelay = setTimeout(function () {
        _this.hoverShowDelay = null;
        _this.show();
      }, nextDelay);
    };

    _this.handleDelayedHide = function () {
      var _this$props2 = _this.props,
          delayHide = _this$props2.delayHide,
          delay = _this$props2.delay;

      _this.enterTrigger = false;
      if (!(0, _isNullOrUndefined2.default)(_this.hoverShowDelay)) {
        clearTimeout(_this.hoverShowDelay);
        _this.hoverShowDelay = null;
        return;
      }

      if (!_this.state.isOverlayShown || !(0, _isNullOrUndefined2.default)(_this.hoverHideDelay)) {
        return;
      }

      var nextDelay = !(0, _isNullOrUndefined2.default)(delayHide) ? delayHide : delay;

      if (!nextDelay) {
        _this.handleHide();
        return;
      }

      _this.hoverHideDelay = setTimeout(function () {
        var isOnSpeaker = _this.state.isOnSpeaker;

        if (isOnSpeaker) {
          return;
        }
        clearTimeout(_this.hoverHideDelay);
        _this.hoverHideDelay = null;
        _this.handleHide();
      }, nextDelay);
    };

    _this.handleMouseOver = function (e) {
      return (0, _handleMouseOverOut2.default)(_this.handleDelayedShow, e);
    };
    _this.handleMouseOut = function (e) {
      return (0, _handleMouseOverOut2.default)(_this.handleDelayedHide, e);
    };

    _this.state = {
      isOverlayShown: props.defaultOpen
    };
    return _this;
  }

  _createClass(OverlayTrigger, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (unsupportedCreatePortal) {
        this.mountNode = document.createElement('div');
        this.renderOverlay();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (unsupportedCreatePortal && this.mountNode) {
        this.renderOverlay();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.hoverShowDelay);
      clearTimeout(this.hoverHideDelay);

      if (unsupportedCreatePortal) {
        _reactDom2.default.unmountComponentAtNode(this.mountNode);
        this.mountNode = null;
      }
    }
  }, {
    key: 'getOverlay',
    // eslint-disable-line react/no-find-dom-node

    value: function getOverlay() {
      var _props = this.props,
          open = _props.open,
          speaker = _props.speaker,
          trigger = _props.trigger,
          onHide = _props.onHide;
      var isOverlayShown = this.state.isOverlayShown;

      var overlayProps = _extends({}, (0, _pick3.default)(this.props, _Overlay2.default.handledProps), {
        show: (0, _isUndefined3.default)(open) ? isOverlayShown : open,
        target: this.getOverlayTarget
      });

      if ((0, _isOneOf2.default)('click', trigger)) {
        overlayProps.onHide = (0, _createChainedFunction2.default)(this.hide, onHide);
      } else if ((0, _isOneOf2.default)('active', trigger)) {
        overlayProps.onHide = (0, _createChainedFunction2.default)(this.hide, onHide);
      }

      var speakerProps = {
        onMouseEnter: this.handleSpeakerMouseEnter,
        onMouseLeave: this.handleSpeakerMouseLeave,
        placement: overlayProps.placement
      };

      return React.createElement(
        _Overlay2.default,
        overlayProps,
        React.cloneElement(speaker, speakerProps)
      );
    }
  }, {
    key: 'renderOverlay',
    value: function renderOverlay() {
      if (this.speaker) {
        _reactDom2.default.unstable_renderSubtreeIntoContainer(this, this.speaker, this.mountNode);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          speaker = _props2.speaker,
          onClick = _props2.onClick,
          trigger = _props2.trigger,
          onMouseOver = _props2.onMouseOver,
          onMouseOut = _props2.onMouseOut,
          onFocus = _props2.onFocus,
          onBlur = _props2.onBlur,
          disabled = _props2.disabled;


      var triggerComponent = React.Children.only(children);
      var triggerProps = triggerComponent.props;

      var props = {
        key: 'triggerComponent',
        'aria-describedby': (0, _get3.default)(speaker, ['props', 'id'])
      };

      props.onClick = (0, _createChainedFunction2.default)(triggerProps.onClick, onClick);

      if (!disabled) {
        if ((0, _isOneOf2.default)('click', trigger)) {
          props.onClick = (0, _createChainedFunction2.default)(this.handleToggle, props.onClick);
        }

        if ((0, _isOneOf2.default)('active', trigger)) {
          props.onClick = (0, _createChainedFunction2.default)(this.show, props.onClick);
        }

        if ((0, _isOneOf2.default)('hover', trigger)) {
          props.onMouseOver = (0, _createChainedFunction2.default)(this.handleMouseOver, onMouseOver, triggerProps.onMouseOver);
          props.onMouseOut = (0, _createChainedFunction2.default)(this.handleMouseOut, onMouseOut, triggerProps.onMouseOut);
        }

        if ((0, _isOneOf2.default)('focus', trigger)) {
          props.onFocus = (0, _createChainedFunction2.default)(this.handleDelayedShow, onFocus, triggerProps.onFocus);

          props.onBlur = (0, _createChainedFunction2.default)(this.handleDelayedHide, onBlur, triggerProps.onBlur);
        }
      }

      if (unsupportedCreatePortal) {
        this.speaker = this.getOverlay();
        return React.cloneElement(triggerComponent, props);
      }

      return [React.cloneElement(triggerComponent, props), React.createElement(
        _Portal2.default,
        { key: 'portal' },
        this.getOverlay()
      )];
    }
  }]);

  return OverlayTrigger;
}(React.Component);

OverlayTrigger.defaultProps = {
  trigger: ['hover', 'focus'],
  delayHide: 200,
  placement: 'bottomStart',
  rootClose: true
};
OverlayTrigger.handledProps = ['animation', 'children', 'container', 'containerPadding', 'defaultOpen', 'delay', 'delayHide', 'delayShow', 'disabled', 'onBlur', 'onClick', 'onEnter', 'onEntered', 'onEntering', 'onExit', 'onExited', 'onExiting', 'onFocus', 'onHide', 'onMouseOut', 'onMouseOver', 'open', 'placement', 'preventOverflow', 'rootClose', 'show', 'speaker', 'target', 'transition', 'trigger'];
exports.default = OverlayTrigger;