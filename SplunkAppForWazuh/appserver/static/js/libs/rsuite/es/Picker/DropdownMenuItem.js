import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, getUnhandledProps, defaultProps } from '../utils';

var DropdownMenuItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownMenuItem, _React$Component);

  function DropdownMenuItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          value = _this$props.value,
          disabled = _this$props.disabled,
          onSelect = _this$props.onSelect;
      event.preventDefault();

      if (!disabled && onSelect) {
        onSelect(value, event);
      }
    };

    return _this;
  }

  var _proto = DropdownMenuItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        active = _this$props2.active,
        onKeyDown = _this$props2.onKeyDown,
        disabled = _this$props2.disabled,
        focus = _this$props2.focus,
        children = _this$props2.children,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["active", "onKeyDown", "disabled", "focus", "children", "className", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames[addPrefix('focus')] = focus, _classNames[addPrefix('disabled')] = disabled, _classNames));
    var unhandled = getUnhandledProps(DropdownMenuItem, rest);
    return React.createElement("li", _extends({}, unhandled, {
      className: className,
      role: "menuitem"
    }), React.createElement("a", {
      className: classes,
      tabIndex: -1,
      role: "presentation",
      onKeyDown: disabled ? null : onKeyDown,
      onClick: this.handleClick
    }, children));
  };

  return DropdownMenuItem;
}(React.Component);

DropdownMenuItem.propTypes = {
  classPrefix: PropTypes.string.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onSelect: PropTypes.func,
  onKeyDown: PropTypes.func,
  focus: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  getItemData: PropTypes.func
};
export default defaultProps({
  classPrefix: 'dropdown-menu-item'
})(DropdownMenuItem);