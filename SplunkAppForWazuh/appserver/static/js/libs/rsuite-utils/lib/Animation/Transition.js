'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var _domLib = require('dom-lib');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _getAnimationEnd = require('../utils/getAnimationEnd');

var _getAnimationEnd2 = _interopRequireDefault(_getAnimationEnd);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UNMOUNTED = exports.UNMOUNTED = 0;
var EXITED = exports.EXITED = 1;
var ENTERING = exports.ENTERING = 2;
var ENTERED = exports.ENTERED = 3;
var EXITING = exports.EXITING = 4;

function noop() {}

var Transition = function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition(props) {
    _classCallCheck(this, Transition);

    var _this = _possibleConstructorReturn(this, (Transition.__proto__ || Object.getPrototypeOf(Transition)).call(this, props));

    _this.animationEventListener = null;
    _this.instanceElement = null;
    _this.nextCallback = null;
    _this.needsUpdate = null;


    var initialStatus = void 0;
    if (props.in) {
      initialStatus = props.transitionAppear ? EXITED : ENTERED;
    } else {
      initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
    }

    _this.state = {
      status: initialStatus
    };

    _this.nextCallback = null;
    return _this;
  }
  /**
   * Note that `handledProps` are generated automatically during
   * build with `babel-plugin-transform-react-flow-handled-props`
   */


  _createClass(Transition, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.transitionAppear && this.props.in) {
        this.performEnter(this.props);
      }
    }
  }, {
    key: 'getSnapshotBeforeUpdate',
    value: function getSnapshotBeforeUpdate() {
      if (!this.props.in || !this.props.unmountOnExit) {
        this.needsUpdate = true;
      }
      return null;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var status = this.state.status;
      var unmountOnExit = this.props.unmountOnExit;


      if (unmountOnExit && status === EXITED) {
        if (this.props.in) {
          this.performEnter(this.props);
        } else {
          /*eslint-disable*/
          if (this.instanceElement) {
            this.setState({ status: UNMOUNTED });
          }
        }
        return;
      }

      if (this.needsUpdate) {
        this.needsUpdate = false;

        if (this.props.in) {
          if (status === EXITING || status === EXITED) {
            this.performEnter(this.props);
          }
        } else if (status === ENTERING || status === ENTERED) {
          this.performExit(this.props);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cancelNextCallback();
      this.instanceElement = null;
    }
  }, {
    key: 'onTransitionEnd',
    value: function onTransitionEnd(node, handler) {
      this.setNextCallback(handler);

      if (this.animationEventListener) {
        this.animationEventListener.off();
      }

      if (node) {
        var _props = this.props,
            _timeout = _props.timeout,
            _animation = _props.animation;

        this.animationEventListener = (0, _domLib.on)(node, _animation ? (0, _getAnimationEnd2.default)() : _domLib.transition.end, this.nextCallback);
        if (_timeout !== null) {
          setTimeout(this.nextCallback, _timeout);
        }
      } else {
        setTimeout(this.nextCallback, 0);
      }
    }
  }, {
    key: 'setNextCallback',
    value: function setNextCallback(callback) {
      var _this2 = this;

      var active = true;

      this.nextCallback = function (event) {
        if (!active) {
          return;
        }

        if (event) {
          if (_this2.instanceElement === event.target) {
            callback(event);
            active = false;
            _this2.nextCallback = null;
          }
          return;
        }

        callback(event);
        active = false;
        _this2.nextCallback = null;
      };

      this.nextCallback.cancel = function () {
        active = false;
      };

      return this.nextCallback;
    }
  }, {
    key: 'performEnter',
    value: function performEnter(props) {
      var _this3 = this;

      var _ref = props || this.props,
          onEnter = _ref.onEnter,
          onEntering = _ref.onEntering,
          onEntered = _ref.onEntered;

      this.cancelNextCallback();
      var node = (0, _reactDom.findDOMNode)(this);

      this.instanceElement = node;
      onEnter(node);

      this.safeSetState({ status: ENTERING }, function () {
        onEntering(node);
        _this3.onTransitionEnd(node, function () {
          _this3.safeSetState({ status: ENTERED }, function () {
            onEntered(node);
          });
        });
      });
    }
  }, {
    key: 'performExit',
    value: function performExit(props) {
      var _this4 = this;

      var _ref2 = props || this.props,
          onExit = _ref2.onExit,
          onExiting = _ref2.onExiting,
          onExited = _ref2.onExited;

      this.cancelNextCallback();
      var node = (0, _reactDom.findDOMNode)(this);

      this.instanceElement = node;
      onExit(node);

      this.safeSetState({ status: EXITING }, function () {
        onExiting(node);

        _this4.onTransitionEnd(node, function () {
          _this4.safeSetState({ status: EXITED }, function () {
            onExited(node);
          });
        });
      });
    }
  }, {
    key: 'cancelNextCallback',
    value: function cancelNextCallback() {
      if (this.nextCallback !== null) {
        this.nextCallback.cancel();
        this.nextCallback = null;
      }
    }
  }, {
    key: 'safeSetState',
    value: function safeSetState(nextState, callback) {
      if (this.instanceElement) {
        this.setState(nextState, this.setNextCallback(callback));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var status = this.state.status;

      if (status === UNMOUNTED) {
        return null;
      }

      var _props2 = this.props,
          children = _props2.children,
          className = _props2.className,
          exitedClassName = _props2.exitedClassName,
          enteringClassName = _props2.enteringClassName,
          enteredClassName = _props2.enteredClassName,
          exitingClassName = _props2.exitingClassName,
          rest = _objectWithoutProperties(_props2, ['children', 'className', 'exitedClassName', 'enteringClassName', 'enteredClassName', 'exitingClassName']);

      var childProps = (0, _omit3.default)(rest, Transition.handledProps);

      var transitionClassName = void 0;
      if (status === EXITED) {
        transitionClassName = exitedClassName;
      } else if (status === ENTERING) {
        transitionClassName = enteringClassName;
      } else if (status === ENTERED) {
        transitionClassName = enteredClassName;
      } else if (status === EXITING) {
        transitionClassName = exitingClassName;
      }

      var child = React.Children.only(children);

      return React.cloneElement(child, _extends({}, childProps, {
        className: (0, _classnames2.default)(child.props.className, className, transitionClassName)
      }));
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.in && nextProps.unmountOnExit) {
        if (prevState.status === UNMOUNTED) {
          // Start enter transition in componentDidUpdate.
          return { status: EXITED };
        }
      }
      return null;
    }
  }]);

  return Transition;
}(React.Component);

Transition.displayName = 'Transition';
Transition.defaultProps = {
  timeout: 1000,

  onEnter: noop,
  onEntering: noop,
  onEntered: noop,

  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.handledProps = ['animation', 'children', 'className', 'enteredClassName', 'enteringClassName', 'exitedClassName', 'exitingClassName', 'in', 'onEnter', 'onEntered', 'onEntering', 'onExit', 'onExited', 'onExiting', 'timeout', 'transitionAppear', 'unmountOnExit'];


(0, _reactLifecyclesCompat.polyfill)(Transition);

exports.default = Transition;