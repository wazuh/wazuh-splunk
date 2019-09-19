import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { defaultProps, prefix } from '../utils';

var Divider =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Divider, _React$Component);

  function Divider() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Divider.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        vertical = _this$props.vertical,
        Component = _this$props.componentClass,
        className = _this$props.className,
        children = _this$props.children,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["vertical", "componentClass", "className", "children", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('vertical')] = vertical, _classNames[addPrefix('horizontal')] = !vertical, _classNames[addPrefix('with-text')] = !!children, _classNames));
    return React.createElement(Component, _extends({}, props, {
      className: classes
    }), children ? React.createElement("span", {
      className: addPrefix('inner-text')
    }, children) : null);
  };

  return Divider;
}(React.Component);

Divider.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  componentClass: PropTypes.elementType
};
export default defaultProps({
  componentClass: 'div',
  classPrefix: 'divider'
})(Divider);