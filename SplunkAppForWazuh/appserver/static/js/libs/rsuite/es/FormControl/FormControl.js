import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import Input from '../Input';
import ErrorMessage from '../ErrorMessage';
import { getUnhandledProps, defaultProps, prefix } from '../utils';
import { PLACEMENT_8 } from '../constants';
import FormContext, { FormValueContext, FormErrorContext, FormPlaintextContext } from '../Form/FormContext';

var FormControl =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FormControl, _React$Component);

  function FormControl(_props, context) {
    var _this;

    _this = _React$Component.call(this, _props, context) || this;

    _this.handleFieldChange = function (value, event) {
      var _this$props = _this.props,
          name = _this$props.name,
          onChange = _this$props.onChange;
      var onFieldChange = _this.context.onFieldChange;

      var checkTrigger = _this.getCheckTrigger();

      _this.setState({
        value: value
      });

      _this.handleFieldCheck(value, checkTrigger === 'change').then(function (checkResult) {
        _this.setState({
          checkResult: checkResult
        });
      });

      onFieldChange(name, value, event);
      onChange && onChange(value, event);
    };

    _this.handleFieldBlur = function (event) {
      var onBlur = _this.props.onBlur;

      var checkTrigger = _this.getCheckTrigger();

      var value = _this.getValue() || _this.state.value;

      _this.handleFieldCheck(value, checkTrigger === 'blur');

      onBlur && onBlur(event);
    };

    _this.handleFieldCheck = function (value, isCheckTrigger, callback) {
      var _this$props2 = _this.props,
          name = _this$props2.name,
          formValue = _this$props2.formValue,
          checkAsync = _this$props2.checkAsync;
      var _this$context = _this.context,
          onFieldError = _this$context.onFieldError,
          onFieldSuccess = _this$context.onFieldSuccess,
          model = _this$context.model;

      var callbackEvents = function callbackEvents(checkResult) {
        if (isCheckTrigger) {
          if (checkResult.hasError) {
            onFieldError(name, checkResult.errorMessage, callback);
          } else {
            onFieldSuccess(name, callback);
          }
        }

        return checkResult;
      };

      if (checkAsync) {
        return model.checkForFieldAsync(name, value, formValue).then(function (checkResult) {
          return callbackEvents(checkResult);
        });
      }

      return Promise.resolve(callbackEvents(model.checkForField(name, value, formValue)));
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.renderError = function (formError, errorMessage) {
      var _this$props3 = _this.props,
          errorPlacement = _this$props3.errorPlacement,
          name = _this$props3.name;

      if (formError) {
        errorMessage = formError[name];
      }

      return React.createElement(ErrorMessage, {
        show: !!errorMessage,
        className: _this.addPrefix('message-wrapper'),
        placement: errorPlacement
      }, errorMessage);
    };

    _this.renderAccepter = function () {
      var _this$props4 = _this.props,
          name = _this$props4.name,
          Component = _this$props4.accepter,
          props = _objectWithoutPropertiesLoose(_this$props4, ["name", "accepter"]);

      var _this$context$formDef = _this.context.formDefaultValue,
          formDefaultValue = _this$context$formDef === void 0 ? {} : _this$context$formDef;
      var unhandled = getUnhandledProps(FormControl, props);

      var value = _this.getValue();

      var readOnly = _this.getReadOnly();

      if (_.get(Component, 'defaultProps.componentClass') === 'input' && readOnly) {
        unhandled.readOnly = readOnly;
      }

      return React.createElement(Component, _extends({}, unhandled, {
        name: name,
        onChange: _this.handleFieldChange,
        onBlur: _this.handleFieldBlur,
        defaultValue: formDefaultValue[name],
        value: value
      }));
    };

    if (!context || !context.onFieldChange) {
      throw new Error("\n        <FormControl> must be inside a component decorated with <Form>.\n        And need to update React to 16.6.0 +.\n      ");
    }

    var _context$formDefaultV = context.formDefaultValue,
        _formDefaultValue = _context$formDefaultV === void 0 ? {} : _context$formDefaultV;

    var _name = _props.name;
    _this.state = {
      checkResult: {},
      value: _this.getValue(_props) || _formDefaultValue[_name]
    };
    return _this;
  }

  var _proto = FormControl.prototype;

  _proto.getValue = function getValue(props) {
    var _ref = props || this.props,
        formValue = _ref.formValue,
        name = _ref.name,
        value = _ref.value;

    if (!_.isUndefined(value)) {
      return value;
    }

    if (!formValue) {
      return;
    }

    return formValue[name];
  };

  _proto.getCheckTrigger = function getCheckTrigger() {
    var checkTrigger = this.context.checkTrigger;
    return this.props.checkTrigger || checkTrigger;
  };

  _proto.getReadOnly = function getReadOnly() {
    var readOnly = this.context.readOnly;

    if (!_.isUndefined(readOnly)) {
      return readOnly;
    }

    return this.props.readOnly;
  };

  _proto.getPlaintext = function getPlaintext() {
    var plaintext = this.context.plaintext;

    if (!_.isUndefined(plaintext)) {
      return plaintext;
    }

    return this.props.plaintext;
  };

  _proto.checkErrorFromContext = function checkErrorFromContext() {
    var errorFromContext = this.context.errorFromContext;
    var errorMessage = this.props.errorMessage;

    if (typeof errorMessage !== 'undefined') {
      return this.renderError(undefined, errorMessage);
    }

    if (errorFromContext) {
      return React.createElement(FormErrorContext.Consumer, null, this.renderError);
    }

    return null;
  };

  _proto.render = function render() {
    var plaintextDefaultValue = this.props.plaintextDefaultValue;
    var readOnly = this.getReadOnly();
    var plaintext = this.getPlaintext();
    var value = this.getValue();
    var classes = classNames(this.addPrefix('wrapper'), {
      'read-only': readOnly,
      plaintext: plaintext
    });

    if (plaintext && (_.isUndefined(value) || _.isNull(value))) {
      return React.createElement("div", {
        className: classes
      }, React.createElement("div", {
        className: this.addPrefix('default-value')
      }, plaintextDefaultValue));
    }

    return React.createElement("div", {
      className: classes
    }, React.createElement(FormPlaintextContext.Provider, {
      value: plaintext
    }, this.renderAccepter()), this.checkErrorFromContext());
  };

  return FormControl;
}(React.Component);

FormControl.contextType = FormContext;
FormControl.propTypes = {
  name: PropTypes.string,
  checkTrigger: PropTypes.oneOf(['change', 'blur', 'none']),
  checkAsync: PropTypes.bool,
  accepter: PropTypes.elementType,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  classPrefix: PropTypes.string,
  errorMessage: PropTypes.node,
  errorPlacement: PropTypes.oneOf(PLACEMENT_8),
  formValue: PropTypes.object,
  readOnly: PropTypes.bool,
  plaintext: PropTypes.bool,
  plaintextDefaultValue: PropTypes.node,
  value: PropTypes.any
};
FormControl.defaultProps = {
  accepter: Input,
  errorPlacement: 'bottomStart',
  plaintextDefaultValue: '--'
};

var FormControlWrapper =
/*#__PURE__*/
function (_React$Component2) {
  _inheritsLoose(FormControlWrapper, _React$Component2);

  function FormControlWrapper() {
    return _React$Component2.apply(this, arguments) || this;
  }

  var _proto2 = FormControlWrapper.prototype;

  _proto2.render = function render() {
    var _this2 = this;

    return React.createElement(FormValueContext.Consumer, null, function (formValue) {
      return React.createElement(FormControl, _extends({}, _this2.props, {
        formValue: formValue
      }));
    });
  };

  return FormControlWrapper;
}(React.Component);

var EnhancedFormControl = defaultProps({
  classPrefix: 'form-control'
})(FormControlWrapper);
export default EnhancedFormControl;