import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps } from '../utils';

var Popover =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Popover, _React$Component);

  function Popover() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Popover.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        title = _this$props.title,
        children = _this$props.children,
        style = _this$props.style,
        visible = _this$props.visible,
        className = _this$props.className,
        full = _this$props.full,
        onMouseLeave = _this$props.onMouseLeave,
        onMouseEnter = _this$props.onMouseEnter;
    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('full')] = full, _classNames));

    var styles = _extends({
      display: 'block',
      opacity: visible ? 1 : undefined
    }, style);

    return React.createElement("div", {
      onMouseLeave: onMouseLeave,
      onMouseEnter: onMouseEnter,
      className: classes,
      style: styles
    }, React.createElement("div", {
      className: "arrow"
    }), title ? React.createElement("h3", {
      className: addPrefix('title')
    }, title) : null, React.createElement("div", {
      className: addPrefix('content')
    }, children));
  };

  return Popover;
}(React.Component);

Popover.propTypes = {
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.node,
  style: PropTypes.object,
  visible: PropTypes.bool,
  className: PropTypes.string,
  full: PropTypes.bool,
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func
};
export default defaultProps({
  classPrefix: 'popover'
})(Popover);