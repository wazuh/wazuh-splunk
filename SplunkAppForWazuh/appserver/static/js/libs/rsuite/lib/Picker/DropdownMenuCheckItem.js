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

var _utils = require("../utils");

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _classnames = _interopRequireDefault(require("classnames"));

var DropdownMenuCheckItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DropdownMenuCheckItem, _React$Component);

  function DropdownMenuCheckItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChange = function (value, checked, event) {
      var onSelect = _this.props.onSelect;
      onSelect && onSelect(value, event, checked);
    };

    _this.handleCheck = function (event) {
      var _this$props = _this.props,
          value = _this$props.value,
          disabled = _this$props.disabled,
          onCheck = _this$props.onCheck,
          active = _this$props.active;

      if (!disabled && onCheck) {
        onCheck(value, event, !active);
      }
    };

    _this.handleSelectItem = function (event) {
      var _this$props2 = _this.props,
          value = _this$props2.value,
          disabled = _this$props2.disabled,
          onSelectItem = _this$props2.onSelectItem,
          active = _this$props2.active;

      if (!disabled && onSelectItem) {
        onSelectItem(value, event, !active);
      }
    };

    return _this;
  }

  var _proto = DropdownMenuCheckItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props3 = this.props,
        value = _this$props3.value,
        active = _this$props3.active,
        onKeyDown = _this$props3.onKeyDown,
        disabled = _this$props3.disabled,
        focus = _this$props3.focus,
        children = _this$props3.children,
        className = _this$props3.className,
        classPrefix = _this$props3.classPrefix,
        checkable = _this$props3.checkable,
        indeterminate = _this$props3.indeterminate,
        Component = _this$props3.componentClass,
        CheckboxItem = _this$props3.checkboxComponentClass,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["value", "active", "onKeyDown", "disabled", "focus", "children", "className", "classPrefix", "checkable", "indeterminate", "componentClass", "checkboxComponentClass"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var unhandled = (0, _utils.getUnhandledProps)(DropdownMenuCheckItem, rest);
    var checkboxItemClasses = (0, _classnames.default)(classPrefix, (_classNames = {}, _classNames[addPrefix('focus')] = focus, _classNames));
    return React.createElement(Component, (0, _extends2.default)({}, unhandled, {
      className: className,
      role: "menuitem",
      tabIndex: -1
    }), React.createElement(CheckboxItem, {
      value: value,
      role: "presentation",
      disabled: disabled,
      checked: active,
      checkable: checkable,
      indeterminate: indeterminate,
      className: checkboxItemClasses,
      onKeyDown: disabled ? null : onKeyDown,
      onChange: this.handleChange,
      onClick: this.handleSelectItem,
      onCheckboxClick: this.handleCheck
    }, children));
  };

  return DropdownMenuCheckItem;
}(React.Component);

DropdownMenuCheckItem.propTypes = {
  classPrefix: _propTypes.default.string,
  active: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  checkable: _propTypes.default.bool,
  indeterminate: _propTypes.default.bool,
  value: _propTypes.default.any,
  onSelect: _propTypes.default.func,
  onCheck: _propTypes.default.func,
  onSelectItem: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  focus: _propTypes.default.bool,
  title: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  getItemData: _propTypes.default.func,
  checkboxComponentClass: _propTypes.default.elementType
};
DropdownMenuCheckItem.defaultProps = {
  checkable: true,
  componentClass: 'li',
  checkboxComponentClass: _Checkbox.default
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'check-item'
})(DropdownMenuCheckItem);

exports.default = _default;
module.exports = exports.default;