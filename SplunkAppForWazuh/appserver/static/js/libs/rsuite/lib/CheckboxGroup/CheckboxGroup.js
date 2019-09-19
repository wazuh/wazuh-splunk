"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowEqual = _interopRequireDefault(require("rsuite-utils/lib/utils/shallowEqual"));

var _utils = require("../utils");

var CheckboxGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(CheckboxGroup, _React$Component);

  function CheckboxGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleChange = function (itemValue, itemChecked, event) {
      var nextValue = _lodash.default.cloneDeep(_this.getValue()) || [];
      var onChange = _this.props.onChange;

      if (itemChecked) {
        nextValue.push(itemValue);
      } else {
        _lodash.default.remove(nextValue, function (i) {
          return (0, _shallowEqual.default)(i, itemValue);
        });
      }

      _this.setState({
        value: nextValue
      });

      onChange && onChange(nextValue, event);
    };

    _this.state = {
      value: props.defaultValue || []
    };
    return _this;
  }

  var _proto = CheckboxGroup.prototype;

  _proto.getValue = function getValue() {
    var value = this.props.value;
    return _lodash.default.isUndefined(value) ? this.state.value : value;
  };

  _proto.render = function render() {
    var _classNames,
        _this2 = this;

    var _this$props = this.props,
        className = _this$props.className,
        inline = _this$props.inline,
        name = _this$props.name,
        value = _this$props.value,
        children = _this$props.children,
        classPrefix = _this$props.classPrefix,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "inline", "name", "value", "children", "classPrefix"]);
    var nextValue = this.getValue() || [];
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('inline')] = inline, _classNames));
    var checkedKey = _lodash.default.isUndefined(value) ? 'defaultChecked' : 'checked';

    var items = _utils.ReactChildren.mapCloneElement(children, function (child) {
      if (child.type.displayName === 'Checkbox') {
        var _extends2;

        return (0, _extends3.default)({}, child.props, (_extends2 = {
          name: name,
          inline: inline
        }, _extends2[checkedKey] = nextValue.some(function (i) {
          return i === child.props.value;
        }), _extends2.onChange = (0, _utils.createChainedFunction)(_this2.handleChange, child.props.onChange), _extends2));
      }

      return child.props;
    });

    var unhandled = (0, _utils.getUnhandledProps)(CheckboxGroup, props);
    return React.createElement("div", (0, _extends3.default)({}, unhandled, {
      role: "group",
      className: classes
    }), items);
  };

  return CheckboxGroup;
}(React.Component);

CheckboxGroup.propTypes = {
  name: _propTypes.default.string,
  className: _propTypes.default.string,
  inline: _propTypes.default.bool,
  value: _propTypes.default.array,
  defaultValue: _propTypes.default.array,
  onChange: _propTypes.default.func,
  children: _propTypes.default.array,
  classPrefix: _propTypes.default.string
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'checkbox-group'
})(CheckboxGroup);

exports.default = _default;
module.exports = exports.default;