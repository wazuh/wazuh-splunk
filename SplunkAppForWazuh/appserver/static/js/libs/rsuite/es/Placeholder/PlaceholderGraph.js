import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import classNames from 'classnames';

var PlaceholderGraph =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PlaceholderGraph, _React$Component);

  function PlaceholderGraph() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PlaceholderGraph.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        width = _this$props.width,
        height = _this$props.height,
        style = _this$props.style,
        active = _this$props.active,
        classPrefix = _this$props.classPrefix,
        rest = _objectWithoutPropertiesLoose(_this$props, ["className", "width", "height", "style", "active", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(PlaceholderGraph, rest);
    var classes = classNames(classPrefix, addPrefix('graph'), className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames));
    return React.createElement("div", _extends({
      className: classes,
      style: _extends({
        width: width || '100%',
        height: height
      }, style)
    }, unhandled));
  };

  return PlaceholderGraph;
}(React.Component);

PlaceholderGraph.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  classPrefix: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  active: PropTypes.bool
};
PlaceholderGraph.defaultProps = {
  height: 200
};
export default defaultProps({
  classPrefix: 'placeholder'
})(PlaceholderGraph);