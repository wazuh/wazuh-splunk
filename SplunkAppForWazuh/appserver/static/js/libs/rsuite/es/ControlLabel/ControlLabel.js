import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';
import { FormGroupContext } from '../FormGroup/FormGroup';

var ControlLabel =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ControlLabel, _React$Component);

  function ControlLabel() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ControlLabel.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        srOnly = _this$props.srOnly,
        htmlFor = _this$props.htmlFor,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        rest = _objectWithoutPropertiesLoose(_this$props, ["srOnly", "htmlFor", "className", "classPrefix"]);

    var classes = classNames(classPrefix, className, {
      'sr-only': srOnly
    });
    return React.createElement(FormGroupContext.Consumer, null, function (controlId) {
      return React.createElement("label", _extends({}, rest, {
        htmlFor: htmlFor || controlId,
        className: classes
      }));
    });
  };

  return ControlLabel;
}(React.Component);

ControlLabel.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  classPrefix: PropTypes.string,
  srOnly: PropTypes.bool
};
export default defaultProps({
  classPrefix: 'control-label'
})(ControlLabel);