import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';

var isTrivialHref = function isTrivialHref(href) {
  return !href || href.trim() === '#';
};

var SafeAnchor =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SafeAnchor, _React$Component);

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
        props = _objectWithoutPropertiesLoose(_this$props2, ["componentClass", "tabIndex", "disabled"]);

    if (disabled) {
      tabIndex = -1;
    }

    return React.createElement(Component, _extends({}, props, {
      tabIndex: tabIndex,
      onClick: this.handleClick
    }));
  };

  return SafeAnchor;
}(React.Component);

SafeAnchor.propTypes = {
  href: PropTypes.string,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  componentClass: PropTypes.elementType,
  onClick: PropTypes.func
};
SafeAnchor.defaultProps = {
  componentClass: 'a'
};
export default SafeAnchor;