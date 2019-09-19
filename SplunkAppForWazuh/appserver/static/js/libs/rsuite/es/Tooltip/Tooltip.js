import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps } from '../utils';

var Tooltip =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Tooltip, _React$Component);

  function Tooltip() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tooltip.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        positionLeft = _this$props.positionLeft,
        positionTop = _this$props.positionTop,
        classPrefix = _this$props.classPrefix,
        children = _this$props.children,
        style = _this$props.style,
        visible = _this$props.visible,
        onMouseLeave = _this$props.onMouseLeave,
        onMouseEnter = _this$props.onMouseEnter;
    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className);

    var styles = _extends({
      left: positionLeft,
      top: positionTop,
      opacity: visible ? 1 : undefined
    }, style);

    return React.createElement("div", {
      role: "tooltip",
      className: classes,
      style: styles,
      onMouseLeave: onMouseLeave,
      onMouseEnter: onMouseEnter
    }, React.createElement("div", {
      className: addPrefix('arrow')
    }), React.createElement("div", {
      className: addPrefix('inner')
    }, children));
  };

  return Tooltip;
}(React.Component);

Tooltip.propTypes = {
  positionLeft: PropTypes.number,
  positionTop: PropTypes.number,
  visible: PropTypes.bool,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func
};
export default defaultProps({
  classPrefix: 'tooltip'
})(Tooltip);