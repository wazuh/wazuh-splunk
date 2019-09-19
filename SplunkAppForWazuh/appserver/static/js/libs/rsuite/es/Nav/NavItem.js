import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';
import SafeAnchor from '../SafeAnchor';
import Tooltip from '../Tooltip';
import Whisper from '../Whisper';
import Ripple from '../Ripple';
import { createChainedFunction, defaultProps, prefix, getUnhandledProps } from '../utils';

var addTooltip = function addTooltip(children, tip) {
  return React.createElement(Whisper, {
    speaker: React.createElement(Tooltip, null, tip),
    placement: "right"
  }, children);
};

var NavItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NavItem, _React$Component);

  function NavItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          disabled = _this$props.disabled,
          eventKey = _this$props.eventKey;

      if (onSelect && !disabled) {
        onSelect(eventKey, event);
      }
    };

    return _this;
  }

  var _proto = NavItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        active = _this$props2.active,
        disabled = _this$props2.disabled,
        onClick = _this$props2.onClick,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        style = _this$props2.style,
        children = _this$props2.children,
        icon = _this$props2.icon,
        tabIndex = _this$props2.tabIndex,
        hasTooltip = _this$props2.hasTooltip,
        divider = _this$props2.divider,
        panel = _this$props2.panel,
        Component = _this$props2.componentClass,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["active", "disabled", "onClick", "className", "classPrefix", "style", "children", "icon", "tabIndex", "hasTooltip", "divider", "panel", "componentClass"]);

    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(NavItem, rest);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames[addPrefix('disabled')] = disabled, _classNames));

    if (divider) {
      return React.createElement("li", {
        role: "separator",
        style: style,
        className: classNames(addPrefix('divider'), className)
      });
    }

    if (panel) {
      return React.createElement("li", {
        style: style,
        className: classNames(addPrefix('panel'), className)
      }, children);
    }

    var item = React.createElement(Component, _extends({}, unhandled, {
      role: "button",
      tabIndex: tabIndex,
      className: addPrefix('content'),
      disabled: disabled,
      onClick: createChainedFunction(onClick, this.handleClick)
    }), icon, React.createElement("span", {
      className: addPrefix('text')
    }, children), React.createElement(Ripple, null));
    return React.createElement("li", {
      role: "presentation",
      className: classes,
      style: style
    }, hasTooltip ? addTooltip(item, children) : item);
  };

  return NavItem;
}(React.Component);

NavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  icon: PropTypes.node,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  eventKey: PropTypes.any,
  tabIndex: PropTypes.number,
  hasTooltip: PropTypes.bool,
  componentClass: PropTypes.elementType
};
NavItem.defaultProps = {
  tabIndex: 0
};
var EnhancedNavItem = defaultProps({
  classPrefix: 'nav-item',
  componentClass: SafeAnchor
})(NavItem);
export default setDisplayName('NavItem')(EnhancedNavItem);