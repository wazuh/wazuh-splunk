import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { polyfill } from 'react-lifecycles-compat';
import { on } from 'dom-lib';
import InputGroup from '../InputGroup/InputGroup';
import InputGroupAddon from '../InputGroup/InputGroupAddon';
import Input from '../Input';
import Button from '../Button';
import Icon from '../Icon';
import { prefix, defaultProps, getUnhandledProps, partitionHTMLProps, createChainedFunction } from '../utils';

var isFloat = function isFloat(value) {
  return /(^-?|^\+?|^\d?)\d*\.\d+$/.test(value + '');
};

function getDecimalLength(value) {
  if (isFloat(value)) {
    return value.toString().split('.')[1].length;
  }

  return 0;
}

function decimals() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  var lengths = values.map(getDecimalLength);
  return Math.max.apply(Math, lengths);
}

function getButtonStatus(value, min, max) {
  var status = {
    disabledUpButton: false,
    disabledDownButton: false
  };

  if (typeof value !== 'undefined' && value !== null) {
    status.disabledUpButton = +value >= max;
    status.disabledDownButton = +value <= min;
  }

  return status;
}

var InputNumber =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InputNumber, _React$Component);

  function InputNumber(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.input = null;
    _this.inputWheelListener = null;

    _this.bindInputRef = function (ref) {
      _this.input = ref;
    };

    _this.handleOnChange = function (value, event) {
      if (!/^-?(?:\d+)?(\.)?(\d+)*$/.test(value) && value !== '') {
        return;
      }

      var isUnControl = _.isUndefined(_this.props.value);

      _this.handleValue(value, event, isUnControl);
    };

    _this.handleBlur = function (event) {
      var targetValue = Number.parseFloat(_.get(event, 'target.value'));

      _this.handleValue(_this.getSafeValue(targetValue), event);
    };

    _this.handleWheel = function (event) {
      var _this$props = _this.props,
          onWheel = _this$props.onWheel,
          disabled = _this$props.disabled;

      if (!disabled && event.target === document.activeElement) {
        event.preventDefault();
        var delta = _.get(event, 'wheelDelta') || -event.deltaY || -_.get(event, 'detail');

        if (delta > 0) {
          _this.handleMinus(event);
        }

        if (delta < 0) {
          _this.handlePlus(event);
        }
      }

      onWheel && onWheel(event);
    };

    _this.handlePlus = function (event) {
      var step = _this.props.step;
      var value = +(_this.getValue() || 0);
      var bit = decimals(value, step);
      var nextValue = (value + step).toFixed(bit);

      _this.handleValue(_this.getSafeValue(nextValue), event);
    };

    _this.handleMinus = function (event) {
      var step = _this.props.step;
      var value = +(_this.getValue() || 0);
      var bit = decimals(value, step);
      var nextValue = (value - step).toFixed(bit);

      _this.handleValue(_this.getSafeValue(nextValue), event);
    };

    var _value = props.value,
        defaultValue = props.defaultValue,
        max = props.max,
        min = props.min;

    var _getButtonStatus = getButtonStatus(_.isUndefined(_value) ? defaultValue : _value, min, max),
        disabledUpButton = _getButtonStatus.disabledUpButton,
        disabledDownButton = _getButtonStatus.disabledDownButton;

    _this.state = {
      value: defaultValue,
      disabledUpButton: disabledUpButton,
      disabledDownButton: disabledDownButton
    };
    return _this;
  }

  InputNumber.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    if (typeof nextProps.value !== 'undefined') {
      var value = nextProps.value,
          min = nextProps.min,
          max = nextProps.max;
      return getButtonStatus(value, min, max);
    }

    return null;
  };

  var _proto = InputNumber.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.input) {
      this.inputWheelListener = on(this.input, 'wheel', this.handleWheel, {
        passive: false
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.inputWheelListener) {
      this.inputWheelListener.off();
    }
  };

  _proto.getValue = function getValue() {
    var value = this.props.value;
    return _.isUndefined(value) ? this.state.value : value;
  };

  _proto.getSafeValue = function getSafeValue(value) {
    var _this$props2 = this.props,
        max = _this$props2.max,
        min = _this$props2.min;

    if (!Number.isNaN(value)) {
      if (+value > max) {
        value = max;
      }

      if (+value < min) {
        value = min;
      }
    } else {
      value = '';
    }

    return value;
  };

  _proto.handleValue = function handleValue(currentValue, event, input) {
    var value = this.state.value;
    var _this$props3 = this.props,
        onChange = _this$props3.onChange,
        min = _this$props3.min,
        max = _this$props3.max;

    if (currentValue !== value) {
      this.setState(_extends({}, getButtonStatus(currentValue, min, max), {
        value: currentValue
      }));

      if (!input && onChange) {
        onChange(currentValue, event);
      }
    }
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        disabled = _this$props4.disabled,
        size = _this$props4.size,
        prefixElement = _this$props4.prefix,
        postfix = _this$props4.postfix,
        className = _this$props4.className,
        classPrefix = _this$props4.classPrefix,
        step = _this$props4.step,
        buttonAppearance = _this$props4.buttonAppearance,
        props = _objectWithoutPropertiesLoose(_this$props4, ["disabled", "size", "prefix", "postfix", "className", "classPrefix", "step", "buttonAppearance"]);

    var _this$state = this.state,
        disabledUpButton = _this$state.disabledUpButton,
        disabledDownButton = _this$state.disabledDownButton;
    var value = this.getValue();
    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className);
    var unhandled = getUnhandledProps(InputNumber, props);

    var _partitionHTMLProps = partitionHTMLProps(unhandled),
        htmlInputProps = _partitionHTMLProps[0],
        rest = _partitionHTMLProps[1];

    return React.createElement(InputGroup, _extends({}, rest, {
      className: classes,
      disabled: disabled,
      size: size
    }), prefixElement && React.createElement(InputGroupAddon, null, prefixElement), React.createElement(Input, _extends({}, htmlInputProps, {
      type: "text",
      autoComplete: "off",
      step: step,
      inputRef: this.bindInputRef,
      onChange: this.handleOnChange,
      onBlur: createChainedFunction(this.handleBlur, _.get(htmlInputProps, 'onBlur')),
      value: _.isNil(value) ? '' : "" + value,
      disabled: disabled
    })), React.createElement("span", {
      className: addPrefix('btn-group-vertical')
    }, React.createElement(Button, {
      appearance: buttonAppearance,
      className: addPrefix('touchspin-up'),
      onClick: this.handlePlus,
      disabled: disabledUpButton || disabled
    }, React.createElement(Icon, {
      icon: "arrow-up-line"
    })), React.createElement(Button, {
      appearance: buttonAppearance,
      className: addPrefix('touchspin-down'),
      onClick: this.handleMinus,
      disabled: disabledDownButton || disabled
    }, React.createElement(Icon, {
      icon: "arrow-down-line"
    }))), postfix && React.createElement(InputGroupAddon, null, postfix));
  };

  return InputNumber;
}(React.Component);

InputNumber.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  prefix: PropTypes.node,
  postfix: PropTypes.node,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  buttonAppearance: PropTypes.oneOf(['default', 'primary', 'link', 'subtle', 'ghost']),
  onWheel: PropTypes.func,
  onChange: PropTypes.func
};
InputNumber.defaultProps = {
  min: -Infinity,
  max: Infinity,
  step: 1,
  buttonAppearance: 'subtle'
};
polyfill(InputNumber);
export default defaultProps({
  classPrefix: 'input-number'
})(InputNumber);