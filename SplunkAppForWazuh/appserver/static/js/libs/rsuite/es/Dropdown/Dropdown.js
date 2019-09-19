import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import setStatic from 'recompose/setStatic';
import setDisplayName from 'recompose/setDisplayName';
import { RootCloseWrapper } from 'rsuite-utils/lib/Overlay';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
import { createChainedFunction, prefix, isOneOf, getUnhandledProps, defaultProps, placementPolyfill } from '../utils';
import { SidenavContext } from '../Sidenav/Sidenav';
import { PLACEMENT_8 } from '../constants';

var Dropdown =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Dropdown, _React$Component);

  function Dropdown(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.toggle = function (isOpen) {
      var _this$props = _this.props,
          onOpen = _this$props.onOpen,
          onClose = _this$props.onClose,
          onToggle = _this$props.onToggle;
      var open = _.isUndefined(isOpen) ? !_this.getOpen() : isOpen;
      var handleToggle = open ? onOpen : onClose;

      _this.setState({
        open: open
      }, function () {
        handleToggle && handleToggle();
      });

      onToggle && onToggle(open);
    };

    _this.handleClick = function (event) {
      event.preventDefault();

      if (_this.props.disabled) {
        return;
      }

      _this.toggle();
    };

    _this.handleOpenChange = function (event) {
      var eventKey = _this.props.eventKey;

      var onOpenChange = _.get(_this.context, 'onOpenChange');

      onOpenChange && onOpenChange(eventKey, event);
    };

    _this.handleToggleChange = function (eventKey, event) {
      var onOpenChange = _.get(_this.context, 'onOpenChange');

      onOpenChange && onOpenChange(eventKey, event);
    };

    _this.handleMouseEnter = function () {
      if (!_this.props.disabled) {
        _this.toggle(true);
      }
    };

    _this.handleMouseLeave = function () {
      if (!_this.props.disabled) {
        _this.toggle(false);
      }
    };

    _this.handleSelect = function (eventKey, event) {
      var onSelect = _this.props.onSelect;
      onSelect && onSelect(eventKey, event);

      _this.toggle(false);
    };

    _this.state = {
      title: null,
      open: props.open
    };
    return _this;
  }

  var _proto = Dropdown.prototype;

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
        title = _this$props2.title,
        children = _this$props2.children,
        className = _this$props2.className,
        menuStyle = _this$props2.menuStyle,
        disabled = _this$props2.disabled,
        renderTitle = _this$props2.renderTitle,
        classPrefix = _this$props2.classPrefix,
        placement = _this$props2.placement,
        activeKey = _this$props2.activeKey,
        tabIndex = _this$props2.tabIndex,
        toggleClassName = _this$props2.toggleClassName,
        trigger = _this$props2.trigger,
        icon = _this$props2.icon,
        onClick = _this$props2.onClick,
        onMouseEnter = _this$props2.onMouseEnter,
        onMouseLeave = _this$props2.onMouseLeave,
        onContextMenu = _this$props2.onContextMenu,
        eventKey = _this$props2.eventKey,
        Component = _this$props2.componentClass,
        toggleComponentClass = _this$props2.toggleComponentClass,
        noCaret = _this$props2.noCaret,
        style = _this$props2.style,
        props = _objectWithoutPropertiesLoose(_this$props2, ["title", "children", "className", "menuStyle", "disabled", "renderTitle", "classPrefix", "placement", "activeKey", "tabIndex", "toggleClassName", "trigger", "icon", "onClick", "onMouseEnter", "onMouseLeave", "onContextMenu", "eventKey", "componentClass", "toggleComponentClass", "noCaret", "style"]);

    var _ref = this.context || {},
        _ref$openKeys = _ref.openKeys,
        openKeys = _ref$openKeys === void 0 ? [] : _ref$openKeys,
        sidenav = _ref.sidenav,
        expanded = _ref.expanded;

    var menuExpanded = openKeys.some(function (key) {
      return shallowEqual(key, eventKey);
    });
    var addPrefix = prefix(classPrefix);
    var open = this.getOpen();
    var collapsible = sidenav && expanded;
    var unhandled = getUnhandledProps(Dropdown, props);

    var toggleProps = _extends({}, unhandled, {
      onClick: createChainedFunction(this.handleOpenChange, onClick),
      onContextMenu: onContextMenu
    });

    var dropdownProps = {
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    };
    /**
     * Bind event of trigger,
     * not used in  in the expanded state of '<Sidenav>'
     */

    if (!collapsible) {
      if (isOneOf('click', trigger)) {
        toggleProps.onClick = createChainedFunction(this.handleClick, toggleProps.onClick);
      }

      if (isOneOf('contextMenu', trigger)) {
        toggleProps.onContextMenu = createChainedFunction(this.handleClick, onContextMenu);
      }

      if (isOneOf('hover', trigger)) {
        dropdownProps.onMouseEnter = createChainedFunction(this.handleMouseEnter, onMouseEnter);
        dropdownProps.onMouseLeave = createChainedFunction(this.handleMouseLeave, onMouseLeave);
      }
    }

    var Toggle = React.createElement(DropdownToggle, _extends({}, toggleProps, {
      noCaret: noCaret,
      tabIndex: tabIndex,
      className: toggleClassName,
      renderTitle: renderTitle,
      icon: icon,
      componentClass: toggleComponentClass
    }), this.state.title || title);
    var Menu = React.createElement(DropdownMenu, {
      expanded: menuExpanded,
      collapsible: collapsible,
      activeKey: activeKey,
      onSelect: this.handleSelect,
      style: menuStyle,
      onToggle: this.handleToggleChange,
      openKeys: openKeys
    }, children);

    if (open) {
      Menu = React.createElement(RootCloseWrapper, {
        onRootClose: this.toggle
      }, Menu);
    }

    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix("placement-" + _.kebabCase(placementPolyfill(placement)))] = placement, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('no-caret')] = noCaret, _classNames[addPrefix('open')] = open, _classNames[addPrefix(menuExpanded ? 'expand' : 'collapse')] = sidenav, _classNames));
    return React.createElement(Component, _extends({}, dropdownProps, {
      style: style,
      className: classes,
      role: "menu"
    }), Menu, Toggle);
  };

  return Dropdown;
}(React.Component);

Dropdown.contextType = SidenavContext;
Dropdown.propTypes = {
  activeKey: PropTypes.any,
  classPrefix: PropTypes.string,
  trigger: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf(['click', 'hover', 'contextMenu'])]),
  placement: PropTypes.oneOf(PLACEMENT_8),
  title: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  menuStyle: PropTypes.object,
  className: PropTypes.string,
  toggleClassName: PropTypes.string,
  children: PropTypes.node,
  tabIndex: PropTypes.number,
  open: PropTypes.bool,
  eventKey: PropTypes.any,
  componentClass: PropTypes.elementType,
  toggleComponentClass: PropTypes.elementType,
  noCaret: PropTypes.bool,
  style: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  onClick: PropTypes.func,
  renderTitle: PropTypes.func
};
Dropdown.defaultProps = {
  placement: 'bottomStart',
  trigger: 'click',
  tabIndex: 0
};
var EnhancedDropdown = defaultProps({
  componentClass: 'div',
  classPrefix: 'dropdown'
})(Dropdown);
setStatic('Item', DropdownMenuItem)(EnhancedDropdown);
setStatic('Menu', DropdownMenu)(EnhancedDropdown);
export default setDisplayName('Dropdown')(EnhancedDropdown);