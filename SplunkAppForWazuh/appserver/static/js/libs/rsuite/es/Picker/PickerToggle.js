import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Ripple from '../Ripple';
import { prefix, getUnhandledProps, defaultProps, createChainedFunction } from '../utils';

var PickerToggle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PickerToggle, _React$Component);

  function PickerToggle(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.toggleRef = void 0;

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.handleClean = function (event) {
      var onClean = _this.props.onClean;
      onClean && onClean(event);
      event.stopPropagation();

      _this.handleBlur();
    };

    _this.handleFocus = function () {
      _this.setState({
        active: true
      });
    };

    _this.handleBlur = function () {
      _this.setState({
        active: false
      });
    };

    _this.onFocus = function () {
      if (_this.toggleRef.current && typeof _this.toggleRef.current.focus === 'function') {
        _this.toggleRef.current.focus();
      }
    };

    _this.state = {
      active: false
    };
    _this.toggleRef = React.createRef();
    return _this;
  }

  var _proto = PickerToggle.prototype;

  _proto.renderToggleClean = function renderToggleClean() {
    return React.createElement("span", {
      className: this.addPrefix('clean'),
      role: "button",
      tabIndex: -1,
      onClick: this.handleClean
    }, "\u2715");
  };

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        children = _this$props.children,
        className = _this$props.className,
        hasValue = _this$props.hasValue,
        cleanable = _this$props.cleanable,
        classPrefix = _this$props.classPrefix,
        caret = _this$props.caret,
        active = _this$props.active,
        tabIndex = _this$props.tabIndex,
        rest = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "children", "className", "hasValue", "cleanable", "classPrefix", "caret", "active", "tabIndex"]);

    var defaultClassName = Component === 'a' ? classPrefix : this.addPrefix('custom');
    var classes = classNames(defaultClassName, className, {
      active: active || this.state.active
    });
    var unhandled = getUnhandledProps(PickerToggle, rest);
    return React.createElement(Component, _extends({}, unhandled, {
      role: "combobox",
      tabIndex: tabIndex,
      className: classes,
      ref: this.toggleRef,
      onFocus: createChainedFunction(this.handleFocus, _.get(unhandled, 'onFocus')),
      onBlur: createChainedFunction(this.handleBlur, _.get(unhandled, 'onBlur'))
    }), React.createElement("span", {
      className: this.addPrefix(hasValue ? 'value' : 'placeholder')
    }, children), hasValue && cleanable && this.renderToggleClean(), caret && React.createElement("span", {
      className: this.addPrefix('caret')
    }), React.createElement(Ripple, null));
  };

  return PickerToggle;
}(React.Component);

PickerToggle.propTypes = {
  classPrefix: PropTypes.string,
  hasValue: PropTypes.bool,
  cleanable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  caret: PropTypes.bool,
  componentClass: PropTypes.elementType,
  onClean: PropTypes.func,
  active: PropTypes.bool
};
PickerToggle.defaultProps = {
  componentClass: 'a',
  tabIndex: 0,
  caret: true
};
var enhance = defaultProps({
  classPrefix: 'picker-toggle'
});
export default enhance(PickerToggle);