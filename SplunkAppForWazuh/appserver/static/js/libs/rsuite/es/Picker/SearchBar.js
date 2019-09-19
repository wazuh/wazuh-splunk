import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps, getUnhandledProps } from '../utils';

var SearchBar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SearchBar, _React$Component);

  function SearchBar() {
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

  var _proto = SearchBar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        value = _this$props.value,
        children = _this$props.children,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        placeholder = _this$props.placeholder,
        rest = _objectWithoutPropertiesLoose(_this$props, ["value", "children", "className", "classPrefix", "placeholder"]);

    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(SearchBar, rest);
    return React.createElement("div", _extends({}, unhandled, {
      className: classNames(classPrefix, className)
    }), React.createElement("input", {
      className: addPrefix('input'),
      value: value,
      onChange: this.handleChange,
      placeholder: placeholder
    }), children);
  };

  return SearchBar;
}(React.Component);

SearchBar.propTypes = {
  classPrefix: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func
};
var enhance = defaultProps({
  classPrefix: 'picker-search-bar'
});
export default enhance(SearchBar);