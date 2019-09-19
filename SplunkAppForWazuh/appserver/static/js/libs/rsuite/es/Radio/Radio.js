import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import setDisplayName from 'recompose/setDisplayName';
import { prefix, getUnhandledProps, partitionHTMLProps, defaultProps } from '../utils';

var Radio =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Radio, _React$Component);

  function Radio(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleChange = function (event) {
      var _this$props = _this.props,
          value = _this$props.value,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange;
      var checked = true;

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

  var _proto = Radio.prototype;

  _proto.isChecked = function isChecked() {
    var checked = this.props.checked;
    return _.isUndefined(checked) ? this.state.checked : checked;
  };

  _proto.updateCheckedState = function updateCheckedState(checked, callback) {
    this.setState({
      checked: checked
    }, callback);
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        inline = _this$props2.inline,
        title = _this$props2.title,
        name = _this$props2.name,
        className = _this$props2.className,
        children = _this$props2.children,
        disabled = _this$props2.disabled,
        checked = _this$props2.checked,
        defaultChecked = _this$props2.defaultChecked,
        classPrefix = _this$props2.classPrefix,
        tabIndex = _this$props2.tabIndex,
        inputRef = _this$props2.inputRef,
        onClick = _this$props2.onClick,
        props = _objectWithoutPropertiesLoose(_this$props2, ["inline", "title", "name", "className", "children", "disabled", "checked", "defaultChecked", "classPrefix", "tabIndex", "inputRef", "onClick"]);

    var nextChecked = this.isChecked();
    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('inline')] = inline, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('checked')] = nextChecked, _classNames));
    var unhandled = getUnhandledProps(Radio, props);

    var _partitionHTMLProps = partitionHTMLProps(unhandled),
        htmlInputProps = _partitionHTMLProps[0],
        rest = _partitionHTMLProps[1];

    var input = React.createElement("span", {
      className: addPrefix('wrapper')
    }, React.createElement("input", _extends({}, htmlInputProps, {
      type: "radio",
      checked: checked,
      defaultChecked: defaultChecked,
      ref: inputRef,
      name: name,
      tabIndex: tabIndex,
      disabled: disabled,
      onChange: this.handleChange,
      onClick: function onClick(event) {
        return event.stopPropagation();
      }
    })), React.createElement("span", {
      className: addPrefix('inner')
    }));
    return React.createElement("div", _extends({}, rest, {
      onClick: onClick,
      className: classes
    }), React.createElement("div", {
      className: addPrefix('checker'),
      role: "button"
    }, React.createElement("label", {
      title: title
    }, input, children)));
  };

  return Radio;
}(React.Component);

Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  inline: PropTypes.bool,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  inputRef: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number
};
Radio.defaultProps = {
  tabIndex: 0
};
var EnhancedRadio = defaultProps({
  classPrefix: 'radio'
})(Radio);
export default setDisplayName('Radio')(EnhancedRadio);