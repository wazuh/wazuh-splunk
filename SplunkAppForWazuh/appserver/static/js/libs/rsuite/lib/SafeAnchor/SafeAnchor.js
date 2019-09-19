"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var isTrivialHref = function isTrivialHref(href) {
  return !href || href.trim() === '#';
};

var SafeAnchor =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(SafeAnchor, _React$Component);

  function SafeAnchor() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          href = _this$props.href,
          onClick = _this$props.onClick;

      if (disabled || isTrivialHref(href)) {
        event.preventDefault();
      }

      if (disabled) {
        event.stopPropagation();
        return;
      }

      onClick && onClick(event);
    };

    return _this;
  }

  var _proto = SafeAnchor.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        Component = _this$props2.componentClass,
        tabIndex = _this$props2.tabIndex,
        disabled = _this$props2.disabled,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["componentClass", "tabIndex", "disabled"]);

    if (disabled) {
      tabIndex = -1;
    }

    return React.createElement(Component, (0, _extends2.default)({}, props, {
      tabIndex: tabIndex,
      onClick: this.handleClick
    }));
  };

  return SafeAnchor;
}(React.Component);

SafeAnchor.propTypes = {
  href: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  tabIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  componentClass: _propTypes.default.elementType,
  onClick: _propTypes.default.func
};
SafeAnchor.defaultProps = {
  componentClass: 'a'
};
var _default = SafeAnchor;
exports.default = _default;
module.exports = exports.default;