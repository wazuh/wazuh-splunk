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

var _BaseOverlay = require('./BaseOverlay');

var _BaseOverlay2 = _interopRequireDefault(_BaseOverlay);

var _Fade = require('../Animation/Fade');

var _Fade2 = _interopRequireDefault(_Fade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overlay = function (_React$Component) {
  _inherits(Overlay, _React$Component);

  function Overlay() {
    _classCallCheck(this, Overlay);

    return _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).apply(this, arguments));
  }

  _createClass(Overlay, [{
    key: 'render',

    /**
     * Note that `handledProps` are generated automatically during
     * build with `babel-plugin-transform-react-flow-handled-props`
     */
    value: function render() {
      var _props = this.props,
          child = _props.children,
          animation = _props.animation,
          transition = _props.transition,
          props = _objectWithoutProperties(_props, ['children', 'animation', 'transition']);

      if (!animation) {
        transition = undefined;
      }

      if (!transition) {
        child = React.Children.only(child);
        child = React.cloneElement(child, {
          className: (0, _classnames2.default)('in', child.props.className)
        });
      }

      return React.createElement(
        _BaseOverlay2.default,
        _extends({}, props, { transition: transition }),
        child
      );
    }
  }]);

  return Overlay;
}(React.Component);

Overlay.defaultProps = {
  animation: true,
  transition: _Fade2.default
};
Overlay.handledProps = ['animation', 'children', 'className', 'container', 'containerPadding', 'onEnter', 'onEntered', 'onEntering', 'onExit', 'onExited', 'onExiting', 'onHide', 'onRendered', 'placement', 'positionRef', 'preventOverflow', 'rootClose', 'shouldUpdatePosition', 'show', 'target', 'transition'];
exports.default = Overlay;