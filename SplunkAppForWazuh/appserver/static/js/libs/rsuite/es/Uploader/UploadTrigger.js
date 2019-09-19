import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Ripple from '../Ripple';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import { getUnhandledProps, defaultProps, prefix } from '../utils';

var Button = function Button(props) {
  return React.createElement("button", _extends({}, props, {
    type: "button"
  }));
};

var UploadTrigger =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(UploadTrigger, _React$Component);

  function UploadTrigger(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.inputRef = void 0;

    _this.handleClick = function () {
      !_this.props.disabled && _this.inputRef.current.click();
    };

    _this.inputRef = React.createRef();
    return _this;
  }

  var _proto = UploadTrigger.prototype;

  _proto.getInputInstance = function getInputInstance() {
    return this.inputRef.current;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        name = _this$props.name,
        accept = _this$props.accept,
        multiple = _this$props.multiple,
        disabled = _this$props.disabled,
        onChange = _this$props.onChange,
        children = _this$props.children,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        Component = _this$props.componentClass,
        rest = _objectWithoutPropertiesLoose(_this$props, ["name", "accept", "multiple", "disabled", "onChange", "children", "classPrefix", "className", "componentClass"]);

    var unhandled = getUnhandledProps(UploadTrigger, rest);
    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('disabled')] = disabled, _classNames));

    var buttonProps = _extends({}, unhandled, {
      className: addPrefix('btn'),
      onClick: this.handleClick
    });

    var trigger = children ? React.cloneElement(React.Children.only(children), buttonProps) : React.createElement(Component, buttonProps, React.createElement(FormattedMessage, {
      id: "upload"
    }), React.createElement(Ripple, null));
    return React.createElement("div", {
      className: classes
    }, React.createElement("input", {
      type: "file",
      name: name,
      multiple: multiple,
      disabled: disabled,
      accept: accept,
      ref: this.inputRef,
      onChange: onChange
    }), trigger);
  };

  return UploadTrigger;
}(React.Component);

UploadTrigger.propTypes = {
  name: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  componentClass: PropTypes.elementType
};
export default defaultProps({
  componentClass: Button,
  classPrefix: 'uploader-trigger'
})(UploadTrigger);