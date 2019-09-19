import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import setStatic from 'recompose/setStatic';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';
import NavItem from './NavItem';
import { prefix, getUnhandledProps, defaultProps, ReactChildren } from '../utils';
import { getClassNamePrefix } from '../utils/prefix';
import { NavbarContext } from '../Navbar/Navbar';
import { SidenavContext } from '../Sidenav/Sidenav';

var Nav =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Nav, _React$Component);

  function Nav() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Nav.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        appearance = _this$props.appearance,
        vertical = _this$props.vertical,
        justified = _this$props.justified,
        reversed = _this$props.reversed,
        pullRight = _this$props.pullRight,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["classPrefix", "appearance", "vertical", "justified", "reversed", "pullRight", "className", "children"]);

    var _ref = this.context || {},
        _ref$sidenav = _ref.sidenav,
        sidenav = _ref$sidenav === void 0 ? false : _ref$sidenav,
        _ref$expanded = _ref.expanded,
        expanded = _ref$expanded === void 0 ? false : _ref$expanded,
        _ref$activeKey = _ref.activeKey,
        activeKey = _ref$activeKey === void 0 ? props.activeKey : _ref$activeKey,
        _ref$onSelect = _ref.onSelect,
        onSelect = _ref$onSelect === void 0 ? props.onSelect : _ref$onSelect;

    var addPrefix = prefix(classPrefix);
    var globalClassNamePrefix = getClassNamePrefix();
    var hasWaterline = appearance !== 'default';
    var items = ReactChildren.mapCloneElement(children, function (item) {
      var _item$props = item.props,
          eventKey = _item$props.eventKey,
          active = _item$props.active,
          rest = _objectWithoutPropertiesLoose(_item$props, ["eventKey", "active"]);

      var displayName = _.get(item, ['type', 'displayName']);

      if (displayName === 'NavItem') {
        return _extends({}, rest, {
          onSelect: onSelect,
          hasTooltip: sidenav && !expanded,
          active: _.isUndefined(activeKey) ? active : shallowEqual(activeKey, eventKey)
        });
      } else if (displayName === 'Dropdown') {
        return _extends({}, rest, {
          onSelect: onSelect,
          activeKey: activeKey,
          componentClass: 'li'
        });
      }

      return null;
    });
    var unhandled = getUnhandledProps(Nav, props);
    return React.createElement(NavbarContext.Consumer, null, function (navbar) {
      var _classNames;

      var classes = classNames(classPrefix, addPrefix(appearance), className, (_classNames = {}, _classNames[globalClassNamePrefix + "navbar-nav"] = navbar, _classNames[globalClassNamePrefix + "navbar-right"] = pullRight, _classNames[globalClassNamePrefix + "sidenav-nav"] = sidenav, _classNames[addPrefix('horizontal')] = navbar || !vertical && !sidenav, _classNames[addPrefix('vertical')] = vertical || sidenav, _classNames[addPrefix('justified')] = justified, _classNames[addPrefix('reversed')] = reversed, _classNames));
      return React.createElement("div", _extends({}, unhandled, {
        className: classes
      }), React.createElement("ul", null, items), hasWaterline && React.createElement("div", {
        className: addPrefix('waterline')
      }));
    });
  };

  return Nav;
}(React.Component);

Nav.contextType = SidenavContext;
Nav.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  appearance: PropTypes.oneOf(['default', 'subtle', 'tabs']),
  // Reverse Direction of tabs/subtle
  reversed: PropTypes.bool,
  justified: PropTypes.bool,
  vertical: PropTypes.bool,
  pullRight: PropTypes.bool,
  activeKey: PropTypes.any,
  onSelect: PropTypes.func
};
Nav.defaultProps = {
  appearance: 'default'
};
var EnhancedNav = defaultProps({
  classPrefix: 'nav'
})(Nav);
setStatic('Item', NavItem)(EnhancedNav);
export default EnhancedNav;