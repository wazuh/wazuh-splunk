'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Position = require('./Position');

var _Position2 = _interopRequireDefault(_Position);

var _RootCloseWrapper = require('./RootCloseWrapper');

var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overlay = function (_React$Component) {
  _inherits(Overlay, _React$Component);

  function Overlay(props) {
    _classCallCheck(this, Overlay);

    var _this = _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this, props));

    _this.handleHidden = function () {
      _this.setState({ exited: true });
      var onExited = _this.props.onExited;

      onExited && onExited.apply(undefined, arguments);
    };

    _this.state = { exited: !props.show };
    return _this;
  }

  _createClass(Overlay, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          container = _props.container,
          containerPadding = _props.containerPadding,
          target = _props.target,
          placement = _props.placement,
          shouldUpdatePosition = _props.shouldUpdatePosition,
          rootClose = _props.rootClose,
          children = _props.children,
          Transition = _props.transition,
          show = _props.show,
          onHide = _props.onHide,
          positionRef = _props.positionRef,
          preventOverflow = _props.preventOverflow,
          props = _objectWithoutProperties(_props, ['container', 'containerPadding', 'target', 'placement', 'shouldUpdatePosition', 'rootClose', 'children', 'transition', 'show', 'onHide', 'positionRef', 'preventOverflow']);

      var mountOverlay = show || Transition && !this.state.exited;

      if (!mountOverlay) {
        return null;
      }

      var child = children;

      var positionProps = {
        container: container,
        containerPadding: containerPadding,
        target: target,
        placement: placement,
        shouldUpdatePosition: shouldUpdatePosition,
        preventOverflow: preventOverflow
      };

      child = React.createElement(
        _Position2.default,
        _extends({}, positionProps, { ref: positionRef }),
        child
      );

      if (Transition) {
        var _onExit = props.onExit,
            _onExiting = props.onExiting,
            _onEnter = props.onEnter,
            _onEntering = props.onEntering,
            _onEntered = props.onEntered;

        child = React.createElement(
          Transition,
          {
            'in': show,
            transitionAppear: true,
            onExit: _onExit,
            onExiting: _onExiting,
            onExited: this.handleHidden,
            onEnter: _onEnter,
            onEntering: _onEntering,
            onEntered: _onEntered
          },
          child
        );
      }

      if (rootClose) {
        child = React.createElement(
          _RootCloseWrapper2.default,
          { target: target, onRootClose: onHide },
          child
        );
      }

      return React.createElement(
        _Portal2.default,
        { container: container },
        child
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps) {
      if (nextProps.show) {
        return { exited: false };
      } else if (!nextProps.transition) {
        return { exited: true };
      }
      return null;
    }
  }]);

  return Overlay;
}(React.Component);

Overlay.handledProps = ['children', 'className', 'container', 'containerPadding', 'onEnter', 'onEntered', 'onEntering', 'onExit', 'onExited', 'onExiting', 'onHide', 'onRendered', 'placement', 'positionRef', 'preventOverflow', 'rootClose', 'shouldUpdatePosition', 'show', 'target', 'transition'];


(0, _reactLifecyclesCompat.polyfill)(Overlay);

exports.default = Overlay;