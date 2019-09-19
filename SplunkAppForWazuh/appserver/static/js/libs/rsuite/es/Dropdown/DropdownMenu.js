import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import Collapse from 'rsuite-utils/lib/Animation/Collapse';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';
import setDisplayName from 'recompose/setDisplayName';
import DropdownMenuItem from './DropdownMenuItem';
import Icon from '../Icon';
import Ripple from '../Ripple';
import { createChainedFunction, prefix, ReactChildren, getUnhandledProps, defaultProps } from '../utils';

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownMenu, _React$Component);

  function DropdownMenu() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleToggleChange = function (eventKey, event) {
      var onToggle = _this.props.onToggle;
      onToggle && onToggle(eventKey, event);
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = DropdownMenu.prototype;

  _proto.getMenuItemsAndStatus = function getMenuItemsAndStatus(children) {
    var _this2 = this;

    var hasActiveItem;
    var _this$props = this.props,
        activeKey = _this$props.activeKey,
        onSelect = _this$props.onSelect,
        classPrefix = _this$props.classPrefix,
        _this$props$openKeys = _this$props.openKeys,
        openKeys = _this$props$openKeys === void 0 ? [] : _this$props$openKeys;
    var items = React.Children.map(children, function (item, index) {
      var displayName = _.get(item, ['type', 'displayName']);

      var active;

      if (displayName === 'DropdownMenuItem' || displayName === 'DropdownMenu') {
        active = _this2.isActive(item.props, activeKey);

        if (active) {
          hasActiveItem = true;
        }
      }

      if (displayName === 'DropdownMenuItem') {
        var onItemSelect = item.props.onSelect;
        return React.cloneElement(item, {
          key: index,
          active: active,
          onSelect: createChainedFunction(onSelect, onItemSelect)
        });
      } else if (displayName === 'DropdownMenu') {
        var itemsAndStatus = _this2.getMenuItemsAndStatus(item.props.children);

        var _item$props = item.props,
            icon = _item$props.icon,
            open = _item$props.open,
            trigger = _item$props.trigger,
            pullLeft = _item$props.pullLeft,
            eventKey = _item$props.eventKey,
            title = _item$props.title;
        var expanded = openKeys.some(function (key) {
          return shallowEqual(key, eventKey);
        });
        return React.createElement(DropdownMenuItem, {
          icon: icon,
          open: open,
          trigger: trigger,
          expanded: expanded,
          active: _this2.isActive(item.props, activeKey),
          className: _this2.addPrefix("pull-" + (pullLeft ? 'left' : 'right')),
          pullLeft: pullLeft,
          componentClass: "div",
          submenu: true
        }, React.createElement("div", {
          className: _this2.addPrefix('toggle'),
          onClick: _this2.handleToggleChange.bind(_this2, eventKey),
          role: "menu",
          tabIndex: -1
        }, React.createElement("span", null, title), React.createElement(Icon, {
          className: _this2.addPrefix('toggle-icon'),
          icon: pullLeft ? 'angle-left' : 'angle-right'
        }), React.createElement(Ripple, null)), _this2.renderCollapse(React.createElement("ul", {
          role: "menu",
          className: classPrefix
        }, itemsAndStatus.items), expanded));
      }

      return item;
    });
    return {
      items: items,
      active: hasActiveItem
    };
  };

  _proto.isActive = function isActive(props, activeKey) {
    var _this3 = this;

    if (props.active || !_.isUndefined(activeKey) && shallowEqual(props.eventKey, activeKey)) {
      return true;
    }

    if (ReactChildren.some(props.children, function (child) {
      return _this3.isActive(child.props, activeKey);
    })) {
      return true;
    }

    return props.active;
  };

  _proto.renderCollapse = function renderCollapse(children, expanded) {
    return this.props.collapsible ? React.createElement(Collapse, {
      in: expanded,
      exitedClassName: this.addPrefix('collapse-out'),
      exitingClassName: this.addPrefix('collapsing'),
      enteredClassName: this.addPrefix('collapse-in'),
      enteringClassName: this.addPrefix('collapsing')
    }, children) : children;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        expanded = _this$props2.expanded,
        props = _objectWithoutPropertiesLoose(_this$props2, ["children", "className", "classPrefix", "expanded"]);

    var _this$getMenuItemsAnd = this.getMenuItemsAndStatus(children),
        items = _this$getMenuItemsAnd.items,
        active = _this$getMenuItemsAnd.active;

    var unhandled = getUnhandledProps(DropdownMenu, props);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[this.addPrefix('active')] = active, _classNames));
    return this.renderCollapse(React.createElement("ul", _extends({}, unhandled, {
      className: classes,
      role: "menu"
    }), items), expanded);
  };

  return DropdownMenu;
}(React.Component);

DropdownMenu.propTypes = {
  activeKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
  classPrefix: PropTypes.string,
  pullLeft: PropTypes.bool,
  onSelect: PropTypes.func,
  title: PropTypes.node,
  open: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf(['click', 'hover'])]),
  eventKey: PropTypes.any,
  openKeys: PropTypes.array,
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  onToggle: PropTypes.func
};
var EnhancedDropdownMenu = defaultProps({
  classPrefix: 'dropdown-menu'
})(DropdownMenu);
export default setDisplayName('DropdownMenu')(EnhancedDropdownMenu);