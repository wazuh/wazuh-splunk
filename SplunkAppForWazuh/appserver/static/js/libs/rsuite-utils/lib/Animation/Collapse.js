'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _capitalize2 = require('lodash/capitalize');

var _capitalize3 = _interopRequireDefault(_capitalize2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domLib = require('dom-lib');

var _Transition = require('./Transition');

var _Transition2 = _interopRequireDefault(_Transition);

var _createChainedFunction = require('../utils/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var triggerBrowserReflow = function triggerBrowserReflow(node) {
  return (0, _get3.default)(node, 'offsetHeight');
};

var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function defaultGetDimensionValue(dimension, elem) {
  var value = (0, _get3.default)(elem, 'offset' + (0, _capitalize3.default)(dimension));
  var margins = MARGINS[dimension];

  return value + parseInt((0, _domLib.getStyle)(elem, margins[0]), 10) + parseInt((0, _domLib.getStyle)(elem, margins[1]), 10);
}

function getScrollDimensionValue(elem, dimension) {
  var value = (0, _get3.default)(elem, 'scroll' + (0, _capitalize3.default)(dimension));
  return value + 'px';
}

var Collapse = function (_React$Component) {
  _inherits(Collapse, _React$Component);

  function Collapse() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Collapse);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call.apply(_ref, [this].concat(args))), _this), _this.handleEnter = function (elem) {
      var dimension = _this.dimension();
      (0, _domLib.addStyle)(elem, dimension, 0);
    }, _this.handleEntering = function (elem) {
      var dimension = _this.dimension();
      (0, _domLib.addStyle)(elem, dimension, getScrollDimensionValue(elem, dimension));
    }, _this.handleEntered = function (elem) {
      var dimension = _this.dimension();
      (0, _domLib.addStyle)(elem, dimension, 'auto');
    }, _this.handleExit = function (elem) {
      var dimension = _this.dimension();
      var getDimensionValue = _this.props.getDimensionValue;

      var value = getDimensionValue ? getDimensionValue(dimension, elem) : 0;
      (0, _domLib.addStyle)(elem, dimension, value + 'px');
    }, _this.handleExiting = function (elem) {
      var dimension = _this.dimension();
      triggerBrowserReflow(elem);
      (0, _domLib.addStyle)(elem, dimension, 0);
    }, _this.transition = null, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Collapse, [{
    key: 'getTransitionInstance',


    // for testing
    value: function getTransitionInstance() {
      return this.transition;
    }

    /* -- Collapsing -- */

  }, {
    key: 'dimension',
    value: function dimension() {
      var dimension = this.props.dimension;


      return typeof dimension === 'function' ? dimension() : dimension;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          dimension = _props.dimension,
          getDimensionValue = _props.getDimensionValue,
          role = _props.role,
          className = _props.className,
          onExited = _props.onExited,
          onEnter = _props.onEnter,
          onEntering = _props.onEntering,
          onEntered = _props.onEntered,
          onExit = _props.onExit,
          onExiting = _props.onExiting,
          props = _objectWithoutProperties(_props, ['dimension', 'getDimensionValue', 'role', 'className', 'onExited', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting']);

      var enter = (0, _createChainedFunction2.default)(this.handleEnter, onEnter);
      var entering = (0, _createChainedFunction2.default)(this.handleEntering, onEntering);
      var entered = (0, _createChainedFunction2.default)(this.handleEntered, onEntered);
      var exit = (0, _createChainedFunction2.default)(this.handleExit, onExit);
      var exiting = (0, _createChainedFunction2.default)(this.handleExiting, onExiting);

      return React.createElement(_Transition2.default, _extends({}, props, {
        ref: function ref(_ref2) {
          _this2.transition = _ref2;
        },
        'aria-expanded': role ? this.props.in : null,
        className: (0, _classnames2.default)(className, { width: this.dimension() === 'width' }),
        onEnter: enter,
        onEntering: entering,
        onEntered: entered,
        onExit: exit,
        onExiting: exiting,
        onExited: onExited
      }));
    }
  }]);

  return Collapse;
}(React.Component);

Collapse.displayName = 'Collapse';
Collapse.defaultProps = {
  timeout: 300,
  dimension: 'height',
  exitedClassName: 'collapse',
  exitingClassName: 'collapsing',
  enteredClassName: 'collapse in',
  enteringClassName: 'collapsing',
  getDimensionValue: defaultGetDimensionValue
};
Collapse.handledProps = ['className', 'dimension', 'enteredClassName', 'enteringClassName', 'exitedClassName', 'exitingClassName', 'getDimensionValue', 'in', 'onEnter', 'onEntered', 'onEntering', 'onExit', 'onExited', 'onExiting', 'role', 'timeout'];
exports.default = Collapse;