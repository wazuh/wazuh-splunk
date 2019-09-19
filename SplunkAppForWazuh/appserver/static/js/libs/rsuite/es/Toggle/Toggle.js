import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { prefix, withStyleProps, defaultProps, getUnhandledProps } from '../utils';

var Toggle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Toggle, _React$Component);

  function Toggle(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled;
      var checked = !_this.getCheckedStatus();

      if (disabled) {
        return;
      }

      _this.setState({
        checked: checked
      });

      onChange && onChange(checked, event);
    };

    _this.state = {
      checked: props.defaultChecked
    };
    return _this;
  }

  var _proto = Toggle.prototype;

  _proto.getCheckedStatus = function getCheckedStatus() {
    var checked = this.props.checked;
    return typeof checked === 'undefined' ? this.state.checked : checked;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        className = _this$props2.className,
        checkedChildren = _this$props2.checkedChildren,
        unCheckedChildren = _this$props2.unCheckedChildren,
        classPrefix = _this$props2.classPrefix,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["disabled", "className", "checkedChildren", "unCheckedChildren", "classPrefix"]);

    var checked = this.getCheckedStatus();
    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('checked')] = checked, _classNames[addPrefix('disabled')] = disabled, _classNames));
    var inner = checked ? checkedChildren : unCheckedChildren;
    var unhandled = getUnhandledProps(Toggle, rest);
    return React.createElement("span", _extends({}, unhandled, {
      className: classes,
      role: "button",
      tabIndex: -1,
      onClick: this.handleChange
    }), React.createElement("span", {
      className: addPrefix('inner')
    }, inner));
  };

  return Toggle;
}(React.Component);

Toggle.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  checkedChildren: PropTypes.node,
  unCheckedChildren: PropTypes.node,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func
};
export default compose(withStyleProps({
  hasSize: true
}), defaultProps({
  classPrefix: 'btn-toggle'
}))(Toggle);