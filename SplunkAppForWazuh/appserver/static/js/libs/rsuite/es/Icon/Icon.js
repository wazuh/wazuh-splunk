import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, prefix } from '../utils';

var Icon =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Icon, _React$Component);

  function Icon() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Icon.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        icon = _this$props.icon,
        size = _this$props.size,
        fixedWidth = _this$props.fixedWidth,
        spin = _this$props.spin,
        pulse = _this$props.pulse,
        rotate = _this$props.rotate,
        flip = _this$props.flip,
        stack = _this$props.stack,
        inverse = _this$props.inverse,
        svgStyle = _this$props.svgStyle,
        Component = _this$props.componentClass,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "icon", "size", "fixedWidth", "spin", "pulse", "rotate", "flip", "stack", "inverse", "svgStyle", "componentClass"]);

    var addPrefix = prefix(classPrefix);
    var isSvgIcon = typeof icon === 'object' && icon.id && icon.viewBox;
    var classes = classNames(className, classPrefix, (_classNames = {}, _classNames[addPrefix(typeof icon === 'string' ? icon : '')] = !isSvgIcon, _classNames[addPrefix('fw')] = fixedWidth, _classNames[addPrefix('spin')] = spin, _classNames[addPrefix('pulse')] = pulse, _classNames[addPrefix("size-" + (size || ''))] = size, _classNames[addPrefix("flip-" + (flip || ''))] = flip, _classNames[addPrefix("rotate-" + (rotate || ''))] = rotate, _classNames[addPrefix("stack-" + (stack || ''))] = stack, _classNames[addPrefix('inverse')] = inverse, _classNames));

    if (isSvgIcon) {
      var svgIcon = icon;
      return React.createElement(Component, _extends({}, props, {
        className: classes
      }), React.createElement("svg", {
        style: svgStyle,
        viewBox: svgIcon.viewBox
      }, React.createElement("use", {
        xlinkHref: "#" + svgIcon.id
      })));
    }

    return React.createElement(Component, _extends({}, props, {
      className: classes
    }));
  };

  return Icon;
}(React.Component);

Icon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  componentClass: PropTypes.elementType,
  size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
  flip: PropTypes.oneOf(['horizontal', 'vertical']),
  stack: PropTypes.oneOf(['1x', '2x']),
  rotate: PropTypes.number,
  fixedWidth: PropTypes.bool,
  svgStyle: PropTypes.object,
  spin: PropTypes.bool,
  pulse: PropTypes.bool,
  inverse: PropTypes.bool
};
export default defaultProps({
  componentClass: 'i',
  classPrefix: 'icon'
})(Icon);