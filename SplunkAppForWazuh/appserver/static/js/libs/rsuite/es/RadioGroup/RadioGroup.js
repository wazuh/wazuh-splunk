import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';
import { ReactChildren, defaultProps, getUnhandledProps, prefix, createChainedFunction } from '../utils';

var RadioGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(RadioGroup, _React$Component);

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
    return _.isUndefined(value) ? this.state.value : value;
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
        rest = _objectWithoutPropertiesLoose(_this$props, ["className", "inline", "name", "children", "classPrefix", "appearance"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, addPrefix(appearance), className, (_classNames = {}, _classNames[addPrefix('inline')] = inline, _classNames));
    var nextValue = this.getValue();
    var items = ReactChildren.mapCloneElement(children, function (child) {
      if (child.type.displayName === 'Radio') {
        return {
          inline: inline,
          name: name,
          checked: shallowEqual(nextValue, child.props.value),
          onChange: createChainedFunction(_this2.handleChange, child.props.onChange)
        };
      }

      return child.props;
    });
    var unhandled = getUnhandledProps(RadioGroup, rest);
    return React.createElement("div", _extends({}, unhandled, {
      className: classes,
      role: "button"
    }), items);
  };

  return RadioGroup;
}(React.Component);

RadioGroup.propTypes = {
  appearance: PropTypes.oneOf(['default', 'picker']),
  name: PropTypes.string,
  inline: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func
};
RadioGroup.defaultProps = {
  appearance: 'default'
};
export default defaultProps({
  classPrefix: 'radio-group'
})(RadioGroup);