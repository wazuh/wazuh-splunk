import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { getUnhandledProps, prefix, defaultProps } from '../utils';

var InputSearch =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InputSearch, _React$Component);

  function InputSearch() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChange = function (event) {
      var onChange = _this.props.onChange;
      onChange && onChange(_.get(event, 'target.value'), event);
    };

    return _this;
  }

  var _proto = InputSearch.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        value = _this$props.value,
        Component = _this$props.componentClass,
        children = _this$props.children,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        inputRef = _this$props.inputRef,
        style = _this$props.style,
        rest = _objectWithoutPropertiesLoose(_this$props, ["value", "componentClass", "children", "className", "classPrefix", "inputRef", "style"]);

    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(InputSearch, rest);
    return React.createElement("div", {
      className: classNames(classPrefix, className),
      style: style
    }, React.createElement(Component, _extends({}, unhandled, {
      ref: inputRef,
      className: addPrefix('input'),
      value: value,
      onChange: this.handleChange
    })), children);
  };

  return InputSearch;
}(React.Component);

InputSearch.propTypes = {
  classPrefix: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  inputRef: PropTypes.object,
  componentClass: PropTypes.elementType,
  onChange: PropTypes.func
};
var enhance = defaultProps({
  classPrefix: 'picker-search',
  componentClass: 'input'
});
export default enhance(InputSearch);