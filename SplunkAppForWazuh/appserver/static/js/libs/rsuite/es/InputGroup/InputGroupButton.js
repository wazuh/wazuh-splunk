import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import classNames from 'classnames';
import { defaultProps } from '../utils';
import Button from '../Button';

var InputGroupButton =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InputGroupButton, _React$Component);

  function InputGroupButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = InputGroupButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix"]);

    return React.createElement(Button, _extends({
      componentClass: "a"
    }, props, {
      className: classNames(classPrefix, className)
    }));
  };

  return InputGroupButton;
}(React.Component);

export default defaultProps({
  classPrefix: 'input-group-btn'
})(InputGroupButton);