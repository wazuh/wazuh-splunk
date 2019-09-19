import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { defaultProps, prefix, withStyleProps } from '../utils';
import { SIZE } from '../constants';

var Avatar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Avatar, _React$Component);

  function Avatar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Avatar.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        children = _this$props.children,
        src = _this$props.src,
        circle = _this$props.circle,
        alt = _this$props.alt,
        rest = _objectWithoutPropertiesLoose(_this$props, ["classPrefix", "className", "children", "src", "circle", "alt"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('circle')] = circle, _classNames));
    return React.createElement("div", _extends({}, rest, {
      className: classes
    }), src ? React.createElement("img", {
      className: addPrefix('image'),
      src: src,
      alt: alt
    }) : children);
  };

  return Avatar;
}(React.Component);

Avatar.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(SIZE),
  src: PropTypes.string,
  circle: PropTypes.bool,
  alt: PropTypes.string
};
export default compose(withStyleProps({
  hasSize: true
}), defaultProps({
  classPrefix: 'avatar'
}))(Avatar);