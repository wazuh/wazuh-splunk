import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';

var SidenavHeader =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SidenavHeader, _React$Component);

  function SidenavHeader() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SidenavHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix"]);

    var classes = classNames(classPrefix, className);
    return React.createElement("div", _extends({}, props, {
      className: classes
    }));
  };

  return SidenavHeader;
}(React.Component);

SidenavHeader.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string
};
export default defaultProps({
  classPrefix: 'sidenav-header'
})(SidenavHeader);