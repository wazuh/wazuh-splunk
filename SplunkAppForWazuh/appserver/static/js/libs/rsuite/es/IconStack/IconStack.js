import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, prefix } from '../utils';

var IconStack =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(IconStack, _React$Component);

  function IconStack() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = IconStack.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        size = _this$props.size,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "size", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix("size-" + (size || ''))] = size, _classNames));
    return React.createElement("span", _extends({}, props, {
      className: classes
    }));
  };

  return IconStack;
}(React.Component);

IconStack.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x'])
};
export default defaultProps({
  classPrefix: 'icon-stack'
})(IconStack);