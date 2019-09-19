import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';
import NavbarBody from './NavbarBody';
import NavbarHeader from './NavbarHeader';
import { prefix, defaultProps, createContext } from '../utils';
export var NavbarContext = createContext(null);

var Navbar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Navbar, _React$Component);

  function Navbar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Navbar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        Component = _this$props.componentClass,
        hasChildContext = _this$props.hasChildContext,
        classPrefix = _this$props.classPrefix,
        appearance = _this$props.appearance,
        rest = _objectWithoutPropertiesLoose(_this$props, ["className", "componentClass", "hasChildContext", "classPrefix", "appearance"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, addPrefix(appearance), className);
    return React.createElement(NavbarContext.Provider, {
      value: hasChildContext
    }, React.createElement(Component, _extends({}, rest, {
      className: classes,
      role: "navigation"
    })));
  };

  return Navbar;
}(React.Component);

Navbar.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  appearance: PropTypes.oneOf(['default', 'inverse', 'subtle']),
  componentClass: PropTypes.elementType,
  hasChildContext: PropTypes.bool
};
Navbar.defaultProps = {
  hasChildContext: true,
  appearance: 'default'
};
var EnhancedNavbar = defaultProps({
  componentClass: 'div',
  classPrefix: 'navbar'
})(Navbar);
setStatic('Header', NavbarHeader)(EnhancedNavbar);
setStatic('Body', NavbarBody)(EnhancedNavbar);
export default EnhancedNavbar;