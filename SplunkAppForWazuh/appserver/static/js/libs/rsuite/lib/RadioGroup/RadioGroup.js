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

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowEqual = _interopRequireDefault(require("rsuite-utils/lib/utils/shallowEqual"));

var _utils = require("../utils");

var RadioGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(RadioGroup, _React$Component);

  function RadioGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleChange = function (nextValue, _itemChecked, event) {
      var onChange = _this.props.onChange;

      _this.setState({
        value: nextValue
      });

      onChange && onChange(nextValue, event);
    };

    _this.state = {
      value: props.defaultValue
    };
    return _this;
  }

  var _proto = RadioGroup.prototype;

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
        children = _this$props.children,
        classPrefix = _this$props.classPrefix,
        appearance = _this$props.appearance,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "inline", "name", "children", "classPrefix", "appearance"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, addPrefix(appearance), className, (_classNames = {}, _classNames[addPrefix('inline')] = inline, _classNames));
    var nextValue = this.getValue();

    var items = _utils.ReactChildren.mapCloneElement(children, function (child) {
      if (child.type.displayName === 'Radio') {
        return {
          inline: inline,
          name: name,
          checked: (0, _shallowEqual.default)(nextValue, child.props.value),
          onChange: (0, _utils.createChainedFunction)(_this2.handleChange, child.props.onChange)
        };
      }

      return child.props;
    });

    var unhandled = (0, _utils.getUnhandledProps)(RadioGroup, rest);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes,
      role: "button"
    }), items);
  };

  return RadioGroup;
}(React.Component);

RadioGroup.propTypes = {
  appearance: _propTypes.default.oneOf(['default', 'picker']),
  name: _propTypes.default.string,
  inline: _propTypes.default.bool,
  value: _propTypes.default.any,
  defaultValue: _propTypes.default.any,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  onChange: _propTypes.default.func
};
RadioGroup.defaultProps = {
  appearance: 'default'
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'radio-group'
})(RadioGroup);

exports.default = _default;
module.exports = exports.default;