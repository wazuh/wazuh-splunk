import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, prefix } from '../utils';

var InputGroupAddon =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InputGroupAddon, _React$Component);

  function InputGroupAddon() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = InputGroupAddon.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        disabled = _this$props.disabled,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "disabled"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('disabled')] = disabled, _classNames));
    return React.createElement("span", _extends({}, props, {
      className: classes
    }));
  };

  return InputGroupAddon;
}(React.Component);

InputGroupAddon.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  disabled: PropTypes.bool
};
export default defaultProps({
  classPrefix: 'input-group-addon'
})(InputGroupAddon);