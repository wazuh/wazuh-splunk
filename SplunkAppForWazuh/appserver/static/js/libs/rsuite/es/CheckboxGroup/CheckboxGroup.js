import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';
import { ReactChildren, getUnhandledProps, defaultProps, prefix, createChainedFunction } from '../utils';

var CheckboxGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(CheckboxGroup, _React$Component);

  function CheckboxGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleChange = function (itemValue, itemChecked, event) {
      var nextValue = _.cloneDeep(_this.getValue()) || [];
      var onChange = _this.props.onChange;

      if (itemChecked) {
        nextValue.push(itemValue);
      } else {
        _.remove(nextValue, function (i) {
          return shallowEqual(i, itemValue);
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
    return _.isUndefined(value) ? this.state.value : value;
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
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "inline", "name", "value", "children", "classPrefix"]);

    var nextValue = this.getValue() || [];
    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('inline')] = inline, _classNames));
    var checkedKey = _.isUndefined(value) ? 'defaultChecked' : 'checked';
    var items = ReactChildren.mapCloneElement(children, function (child) {
      if (child.type.displayName === 'Checkbox') {
        var _extends2;

        return _extends({}, child.props, (_extends2 = {
          name: name,
          inline: inline
        }, _extends2[checkedKey] = nextValue.some(function (i) {
          return i === child.props.value;
        }), _extends2.onChange = createChainedFunction(_this2.handleChange, child.props.onChange), _extends2));
      }

      return child.props;
    });
    var unhandled = getUnhandledProps(CheckboxGroup, props);
    return React.createElement("div", _extends({}, unhandled, {
      role: "group",
      className: classes
    }), items);
  };

  return CheckboxGroup;
}(React.Component);

CheckboxGroup.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  inline: PropTypes.bool,
  value: PropTypes.array,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
  children: PropTypes.array,
  classPrefix: PropTypes.string
};
export default defaultProps({
  classPrefix: 'checkbox-group'
})(CheckboxGroup);