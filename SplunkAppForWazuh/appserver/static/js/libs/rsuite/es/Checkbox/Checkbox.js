import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import setDisplayName from 'recompose/setDisplayName';
import { prefix, defaultProps, getUnhandledProps, partitionHTMLProps } from '../utils';

var Checkbox =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Checkbox, _React$Component);

  function Checkbox(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled,
          value = _this$props.value;
      var checked = !_this.isChecked();

      if (disabled) {
        return;
      }

      _this.setState({
        checked: checked
      }, function () {
        onChange && onChange(value, checked, event);
      });
    };

    _this.state = {
      checked: props.defaultChecked
    };
    return _this;
  }

  var _proto = Checkbox.prototype;

  _proto.isChecked = function isChecked() {
    var checked = this.props.checked;
    return _.isUndefined(checked) ? this.state.checked : checked;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        inline = _this$props2.inline,
        disabled = _this$props2.disabled,
        className = _this$props2.className,
        children = _this$props2.children,
        title = _this$props2.title,
        inputRef = _this$props2.inputRef,
        defaultChecked = _this$props2.defaultChecked,
        indeterminate = _this$props2.indeterminate,
        tabIndex = _this$props2.tabIndex,
        classPrefix = _this$props2.classPrefix,
        onClick = _this$props2.onClick,
        onCheckboxClick = _this$props2.onCheckboxClick,
        checkable = _this$props2.checkable,
        props = _objectWithoutPropertiesLoose(_this$props2, ["inline", "disabled", "className", "children", "title", "inputRef", "defaultChecked", "indeterminate", "tabIndex", "classPrefix", "onClick", "onCheckboxClick", "checkable"]);

    var checked = this.isChecked();
    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('inline')] = inline, _classNames[addPrefix('indeterminate')] = indeterminate, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('checked')] = checked, _classNames));
    var unhandled = getUnhandledProps(Checkbox, props);

    var _partitionHTMLProps = partitionHTMLProps(unhandled),
        htmlInputProps = _partitionHTMLProps[0],
        rest = _partitionHTMLProps[1];

    var input = React.createElement("span", {
      className: addPrefix('wrapper'),
      onClick: onCheckboxClick
    }, React.createElement("input", _extends({}, htmlInputProps, {
      defaultChecked: defaultChecked,
      type: "checkbox",
      ref: inputRef,
      tabIndex: tabIndex,
      onClick: function onClick(event) {
        return event.stopPropagation();
      },
      disabled: disabled,
      onChange: this.handleChange
    })), React.createElement("span", {
      className: addPrefix('inner')
    }));
    return React.createElement("div", _extends({}, rest, {
      onClick: onClick,
      className: classes
    }), React.createElement("div", {
      className: addPrefix('checker')
    }, React.createElement("label", {
      title: title
    }, checkable ? input : null, children)));
  };

  return Checkbox;
}(React.Component);

Checkbox.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  inputRef: PropTypes.func,
  value: PropTypes.any,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  tabIndex: PropTypes.number,
  checkable: PropTypes.bool,
  onCheckboxClick: PropTypes.func
};
Checkbox.defaultProps = {
  checkable: true,
  tabIndex: 0
};
var EnhancedCheckBox = defaultProps({
  classPrefix: 'checkbox'
})(Checkbox);
export default setDisplayName('Checkbox')(EnhancedCheckBox);