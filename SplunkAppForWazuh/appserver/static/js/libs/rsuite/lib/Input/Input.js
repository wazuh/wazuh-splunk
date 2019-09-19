"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../utils");

var _FormContext = require("../Form/FormContext");

var _FormGroup = require("../FormGroup/FormGroup");

var _InputGroup = require("../InputGroup/InputGroup");

var Input =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Input, _React$Component);

  function Input() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChange = function (event) {
      var onChange = _this.props.onChange;

      var nextValue = _lodash.default.get(event, 'target.value');

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
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["type", "className", "classPrefix", "componentClass", "onFocus", "onBlur", "disabled", "value", "defaultValue", "inputRef", "id"]);
    var classes = (0, _classnames.default)(classPrefix, className);
    var unhandled = (0, _utils.getUnhandledProps)(Input, rest);
    var plaintextInput = React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes
    }), _lodash.default.isUndefined(value) ? defaultValue : value);
    var input = React.createElement(_FormGroup.FormGroupContext.Consumer, null, function (controlId) {
      return React.createElement(Component, (0, _extends2.default)({}, unhandled, {
        ref: inputRef,
        type: type,
        id: id || controlId,
        value: value,
        defaultValue: defaultValue,
        disabled: disabled,
        onKeyDown: _this2.handleKeyDown,
        onFocus: (0, _utils.createChainedFunction)(onFocus, _lodash.default.get(_this2.context, 'onFocus')),
        onBlur: (0, _utils.createChainedFunction)(onBlur, _lodash.default.get(_this2.context, 'onBlur')),
        className: classes,
        onChange: _this2.handleChange
      }));
    });
    return React.createElement(_FormContext.FormPlaintextContext.Consumer, null, function (plaintext) {
      return plaintext ? plaintextInput : input;
    });
  };

  return Input;
}(React.Component);

Input.contextType = _InputGroup.InputGroupContext;
Input.propTypes = {
  type: _propTypes.default.string,
  componentClass: _propTypes.default.elementType,
  id: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  inputRef: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onPressEnter: _propTypes.default.func
};
Input.defaultProps = {
  type: 'text'
};

var _default = (0, _compose.default)((0, _utils.withStyleProps)({
  hasSize: true
}), (0, _utils.defaultProps)({
  classPrefix: 'input',
  componentClass: 'input'
}))(Input);

exports.default = _default;
module.exports = exports.default;