import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';

var ButtonToolbar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ButtonToolbar, _React$Component);

  function ButtonToolbar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ButtonToolbar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix"]);

    var classes = classNames(classPrefix, className);
    return React.createElement("div", _extends({
      role: "toolbar",
      className: classes
    }, props));
  };

  return ButtonToolbar;
}(React.Component);

ButtonToolbar.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
export default defaultProps({
  classPrefix: 'btn-toolbar'
})(ButtonToolbar);