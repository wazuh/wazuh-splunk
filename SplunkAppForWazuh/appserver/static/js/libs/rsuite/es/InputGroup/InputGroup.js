import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';
import compose from 'recompose/compose';
import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';
import { prefix, withStyleProps, defaultProps, createContext } from '../utils';
export var InputGroupContext = createContext(null);

var InputGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InputGroup, _React$Component);

  function InputGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleFocus = function () {
      _this.setState({
        focus: true
      });
    };

    _this.handleBlur = function () {
      _this.setState({
        focus: false
      });
    };

    _this.state = {
      focus: false
    };
    return _this;
  }

  var _proto = InputGroup.prototype;

  _proto.disabledChildren = function disabledChildren() {
    var children = this.props.children;
    return React.Children.map(children, function (item) {
      if (React.isValidElement(item)) {
        return React.cloneElement(item, {
          disabled: true
        });
      }

      return item;
    });
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        disabled = _this$props.disabled,
        inside = _this$props.inside,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "disabled", "inside", "children"]);

    var focus = this.state.focus;
    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('inside')] = inside, _classNames[addPrefix('focus')] = focus, _classNames[addPrefix('disabled')] = disabled, _classNames));
    return React.createElement(InputGroupContext.Provider, {
      value: {
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }
    }, React.createElement("div", _extends({}, props, {
      className: classes
    }), disabled ? this.disabledChildren() : children));
  };

  return InputGroup;
}(React.Component);

InputGroup.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  inside: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node
};
var EnhancedInputGroup = compose(withStyleProps({
  hasSize: true
}), defaultProps({
  classPrefix: 'input-group'
}))(InputGroup);
setStatic('Addon', InputGroupAddon)(EnhancedInputGroup);
setStatic('Button', InputGroupButton)(EnhancedInputGroup);
export default EnhancedInputGroup;