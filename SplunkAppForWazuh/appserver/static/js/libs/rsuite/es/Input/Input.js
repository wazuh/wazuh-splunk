import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import _ from 'lodash';
import { withStyleProps, defaultProps, createChainedFunction, getUnhandledProps } from '../utils';
import { FormPlaintextContext } from '../Form/FormContext';
import { FormGroupContext } from '../FormGroup/FormGroup';
import { InputGroupContext } from '../InputGroup/InputGroup';

var Input =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Input, _React$Component);

  function Input() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChange = function (event) {
      var onChange = _this.props.onChange;

      var nextValue = _.get(event, 'target.value');

      onChange && onChange(nextValue, event);
    };

    _this.handleKeyDown = function (event) {
      var _this$props = _this.props,
          onKeyDown = _this$props.onKeyDown,
          onPressEnter = _this$props.onPressEnter;

      if (event.keyCode === 13) {
        onPressEnter && onPressEnter(event);
      }

      onKeyDown && onKeyDown(event);
    };

    return _this;
  }

  var _proto = Input.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        type = _this$props2.type,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        Component = _this$props2.componentClass,
        onFocus = _this$props2.onFocus,
        onBlur = _this$props2.onBlur,
        disabled = _this$props2.disabled,
        value = _this$props2.value,
        defaultValue = _this$props2.defaultValue,
        inputRef = _this$props2.inputRef,
        id = _this$props2.id,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["type", "className", "classPrefix", "componentClass", "onFocus", "onBlur", "disabled", "value", "defaultValue", "inputRef", "id"]);

    var classes = classNames(classPrefix, className);
    var unhandled = getUnhandledProps(Input, rest);
    var plaintextInput = React.createElement("div", _extends({}, unhandled, {
      className: classes
    }), _.isUndefined(value) ? defaultValue : value);
    var input = React.createElement(FormGroupContext.Consumer, null, function (controlId) {
      return React.createElement(Component, _extends({}, unhandled, {
        ref: inputRef,
        type: type,
        id: id || controlId,
        value: value,
        defaultValue: defaultValue,
        disabled: disabled,
        onKeyDown: _this2.handleKeyDown,
        onFocus: createChainedFunction(onFocus, _.get(_this2.context, 'onFocus')),
        onBlur: createChainedFunction(onBlur, _.get(_this2.context, 'onBlur')),
        className: classes,
        onChange: _this2.handleChange
      }));
    });
    return React.createElement(FormPlaintextContext.Consumer, null, function (plaintext) {
      return plaintext ? plaintextInput : input;
    });
  };

  return Input;
}(React.Component);

Input.contextType = InputGroupContext;
Input.propTypes = {
  type: PropTypes.string,
  componentClass: PropTypes.elementType,
  id: PropTypes.string,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onPressEnter: PropTypes.func
};
Input.defaultProps = {
  type: 'text'
};
export default compose(withStyleProps({
  hasSize: true
}), defaultProps({
  classPrefix: 'input',
  componentClass: 'input'
}))(Input);