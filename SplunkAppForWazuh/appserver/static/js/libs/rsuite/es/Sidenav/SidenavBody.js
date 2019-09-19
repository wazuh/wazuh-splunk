import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';

var SidenavBody =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SidenavBody, _React$Component);

  function SidenavBody() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SidenavBody.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["classPrefix", "className"]);

    var classes = classNames(classPrefix, className);
    return React.createElement("div", _extends({}, props, {
      className: classes
    }));
  };

  return SidenavBody;
}(React.Component);

SidenavBody.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string
};
export default defaultProps({
  classPrefix: 'sidenav-body'
})(SidenavBody);