import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';
import { defaultProps, prefix } from '../utils';

var Sidebar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Sidebar, _React$Component);

  function Sidebar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Sidebar.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        collapsible = _this$props.collapsible,
        width = _this$props.width,
        style = _this$props.style,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "collapsible", "width", "style"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('collapse')] = collapsible, _classNames));

    var styles = _extends({
      flex: "0 0 " + width + "px",
      width: width
    }, style);

    return React.createElement("div", _extends({}, props, {
      className: classes,
      style: styles
    }));
  };

  return Sidebar;
}(React.Component);

Sidebar.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  collapsible: PropTypes.bool,
  style: PropTypes.object
};
Sidebar.defaultProps = {
  width: 260
};
var EnhancedSidebar = defaultProps({
  classPrefix: 'sidebar'
})(Sidebar);
export default setDisplayName('Sidebar')(EnhancedSidebar);