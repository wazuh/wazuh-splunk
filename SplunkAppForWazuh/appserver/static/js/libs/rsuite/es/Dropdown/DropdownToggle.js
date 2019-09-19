import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Ripple from '../Ripple';
import Button from '../Button';
import { prefix, defaultProps } from '../utils';

var DorpdownToggle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DorpdownToggle, _React$Component);

  function DorpdownToggle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = DorpdownToggle.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        renderTitle = _this$props.renderTitle,
        children = _this$props.children,
        icon = _this$props.icon,
        noCaret = _this$props.noCaret,
        Component = _this$props.componentClass,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "renderTitle", "children", "icon", "noCaret", "componentClass"]);

    var addPrefix = prefix(classPrefix);

    if (renderTitle) {
      return React.createElement("span", _extends({}, props, {
        className: classNames(classPrefix, addPrefix('custom-title'), className)
      }), renderTitle(children), React.createElement(Ripple, null));
    }

    var buttonProps = {};

    if (Component === Button) {
      buttonProps = {
        componentClass: 'a',
        appearance: 'subtle'
      };
    }

    return React.createElement(Component, _extends({}, buttonProps, props, {
      className: classNames(classPrefix, className)
    }), icon, children, noCaret ? null : React.createElement("span", {
      className: addPrefix('caret')
    }));
  };

  return DorpdownToggle;
}(React.Component);

DorpdownToggle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
  classPrefix: PropTypes.string,
  noCaret: PropTypes.bool,
  componentClass: PropTypes.elementType,
  renderTitle: PropTypes.func
};
export default defaultProps({
  componentClass: Button,
  classPrefix: 'dropdown-toggle'
})(DorpdownToggle);