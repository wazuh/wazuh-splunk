import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';

var NavbarBody =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NavbarBody, _React$Component);

  function NavbarBody() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = NavbarBody.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "classPrefix", "className"]);

    var classes = classNames(classPrefix, className);
    return React.createElement("div", _extends({}, props, {
      className: classes
    }), children);
  };

  return NavbarBody;
}(React.Component);

NavbarBody.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};
export default defaultProps({
  classPrefix: 'navbar-body'
})(NavbarBody);