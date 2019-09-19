import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';
import Transition from 'rsuite-utils/lib/Animation/Transition';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';
import _ from 'lodash';
import SidenavBody from './SidenavBody';
import SidenavHeader from './SidenavHeader';
import SidenavToggle from './SidenavToggle';
import { prefix, defaultProps, getUnhandledProps, createContext } from '../utils';
export var SidenavContext = createContext(null);

var Sidenav =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Sidenav, _React$Component);

  function Sidenav(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.getOpenKeys = function () {
      var openKeys = _this.props.openKeys;

      if (_.isUndefined(openKeys)) {
        return _this.state.openKeys;
      }

      return openKeys;
    };

    _this.handleSelect = function (eventKey, event) {
      var onSelect = _this.props.onSelect;
      onSelect && onSelect(eventKey, event);
    };

    _this.handleOpenChange = function (eventKey, event) {
      var onOpenChange = _this.props.onOpenChange;

      var find = function find(key) {
        return shallowEqual(key, eventKey);
      };

      var openKeys = _.clone(_this.getOpenKeys()) || [];

      if (openKeys.some(find)) {
        _.remove(openKeys, find);
      } else {
        openKeys.push(eventKey);
      }

      _this.setState({
        openKeys: openKeys
      });

      onOpenChange && onOpenChange(openKeys, event);
    };

    _this.state = {
      openKeys: props.defaultOpenKeys || []
    };
    return _this;
  }

  var _proto = Sidenav.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        appearance = _this$props.appearance,
        expanded = _this$props.expanded,
        activeKey = _this$props.activeKey,
        Component = _this$props.componentClass,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "appearance", "expanded", "activeKey", "componentClass"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, addPrefix(appearance), className);
    var unhandled = getUnhandledProps(Sidenav, props);
    return React.createElement(SidenavContext.Provider, {
      value: {
        expanded: expanded,
        activeKey: activeKey,
        sidenav: true,
        openKeys: this.getOpenKeys(),
        onOpenChange: this.handleOpenChange,
        onSelect: this.handleSelect
      }
    }, React.createElement(Transition, {
      in: expanded,
      timeout: 300,
      exitedClassName: addPrefix('collapse-out'),
      exitingClassName: addPrefix(['collapse-out', 'collapsing']),
      enteredClassName: addPrefix('collapse-in'),
      enteringClassName: addPrefix(['collapse-in', 'collapsing'])
    }, React.createElement(Component, _extends({}, unhandled, {
      className: classes,
      role: "navigation"
    }))));
  };

  return Sidenav;
}(React.Component);

Sidenav.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  appearance: PropTypes.oneOf(['default', 'inverse', 'subtle']),
  defaultOpenKeys: PropTypes.array,
  openKeys: PropTypes.array,
  onOpenChange: PropTypes.func,
  activeKey: PropTypes.any,
  onSelect: PropTypes.func,
  componentClass: PropTypes.elementType
};
Sidenav.defaultProps = {
  appearance: 'default',
  expanded: true
};
var EnhancedSidenav = defaultProps({
  classPrefix: 'sidenav',
  componentClass: 'div'
})(Sidenav);
setStatic('Header', SidenavHeader)(EnhancedSidenav);
setStatic('Body', SidenavBody)(EnhancedSidenav);
setStatic('Toggle', SidenavToggle)(EnhancedSidenav);
export default EnhancedSidenav;