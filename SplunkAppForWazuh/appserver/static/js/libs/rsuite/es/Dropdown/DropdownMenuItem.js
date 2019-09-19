import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { setDisplayName } from 'recompose';
import SafeAnchor from '../SafeAnchor';
import { prefix, isOneOf, createChainedFunction, defaultProps, getUnhandledProps } from '../utils';
import { SidenavContext } from '../Sidenav/Sidenav';

var DropdownMenuItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownMenuItem, _React$Component);

  function DropdownMenuItem(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.toggle = function (_event, isOpen) {
      var open = _.isUndefined(isOpen) ? !_this.getOpen() : isOpen;

      _this.setState({
        open: open
      });
    };

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          eventKey = _this$props.eventKey,
          disabled = _this$props.disabled,
          onClick = _this$props.onClick;

      if (disabled) {
        event.preventDefault();
        return;
      }

      onSelect && onSelect(eventKey, event);
      onClick && onClick(event);
    };

    _this.handleMouseOver = function (event) {
      _this.toggle(event, true);
    };

    _this.handleMouseOut = function (event) {
      _this.toggle(event, false);
    };

    _this.state = {
      open: props.open
    };
    return _this;
  }

  var _proto = DropdownMenuItem.prototype;

  _proto.getOpen = function getOpen() {
    var open = this.props.open;

    if (_.isUndefined(open)) {
      return this.state.open;
    }

    return open;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        children = _this$props2.children,
        divider = _this$props2.divider,
        panel = _this$props2.panel,
        active = _this$props2.active,
        disabled = _this$props2.disabled,
        className = _this$props2.className,
        submenu = _this$props2.submenu,
        style = _this$props2.style,
        classPrefix = _this$props2.classPrefix,
        tabIndex = _this$props2.tabIndex,
        pullLeft = _this$props2.pullLeft,
        icon = _this$props2.icon,
        trigger = _this$props2.trigger,
        expanded = _this$props2.expanded,
        Component = _this$props2.componentClass,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["children", "divider", "panel", "active", "disabled", "className", "submenu", "style", "classPrefix", "tabIndex", "pullLeft", "icon", "trigger", "expanded", "componentClass"]);

    var unhandled = getUnhandledProps(DropdownMenuItem, rest);
    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix(expanded ? 'expand' : 'collapse')] = submenu && _.get(this.context, 'sidenav'), _classNames[addPrefix('submenu')] = submenu, _classNames[addPrefix('open')] = this.getOpen(), _classNames[addPrefix('active')] = active, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix("pull-" + (pullLeft ? 'left' : 'right'))] = pullLeft, _classNames[addPrefix('with-icon')] = icon, _classNames));
    var itemProps = {};
    var itemToggleProps = {
      onClick: this.handleClick
    };

    if (isOneOf('hover', trigger) && submenu && !_.get(this.context, 'expanded')) {
      itemProps.onMouseOver = this.handleMouseOver;
      itemProps.onMouseOut = this.handleMouseOut;
    }

    if (isOneOf('click', trigger) && submenu) {
      itemToggleProps.onClick = createChainedFunction(this.handleClick, this.toggle);
    }

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

    return React.createElement("li", _extends({}, itemProps, {
      style: style,
      role: "presentation",
      className: classes
    }), React.createElement(Component, _extends({}, unhandled, itemToggleProps, {
      className: addPrefix('content'),
      tabIndex: tabIndex
    }), icon && React.cloneElement(icon, {
      className: addPrefix('menu-icon')
    }), children));
  };

  return DropdownMenuItem;
}(React.Component);

DropdownMenuItem.contextType = SidenavContext;
DropdownMenuItem.propTypes = {
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf(['click', 'hover'])]),
  open: PropTypes.bool,
  expanded: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  pullLeft: PropTypes.bool,
  submenu: PropTypes.bool,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  eventKey: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  tabIndex: PropTypes.number,
  componentClass: PropTypes.elementType
};
DropdownMenuItem.defaultProps = {
  tabIndex: -1,
  trigger: 'hover'
};
var EnhancedDropdownMenuItem = defaultProps({
  classPrefix: 'dropdown-item',
  componentClass: SafeAnchor
})(DropdownMenuItem);
export default setDisplayName('DropdownMenuItem')(EnhancedDropdownMenuItem);