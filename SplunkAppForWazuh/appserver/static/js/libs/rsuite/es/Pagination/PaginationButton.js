import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SafeAnchor from '../SafeAnchor';
import Ripple from '../Ripple';
import { prefix, defaultProps, getUnhandledProps, createChainedFunction } from '../utils';

var PaginationButton =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PaginationButton, _React$Component);

  function PaginationButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onSelect = _this$props.onSelect,
          eventKey = _this$props.eventKey;

      if (disabled) {
        return;
      }

      onSelect && onSelect(eventKey, event);
    };

    return _this;
  }

  var _proto = PaginationButton.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        active = _this$props2.active,
        disabled = _this$props2.disabled,
        onClick = _this$props2.onClick,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        style = _this$props2.style,
        Component = _this$props2.componentClass,
        children = _this$props2.children,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["active", "disabled", "onClick", "className", "classPrefix", "style", "componentClass", "children"]);

    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(PaginationButton, rest);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames[addPrefix('disabled')] = disabled, _classNames));
    return React.createElement("li", {
      className: classes,
      style: style
    }, React.createElement(Component, _extends({}, unhandled, {
      disabled: disabled,
      onClick: createChainedFunction(onClick, this.handleClick)
    }), children, React.createElement(Ripple, null)));
  };

  return PaginationButton;
}(React.Component);

PaginationButton.propTypes = {
  classPrefix: PropTypes.string,
  eventKey: PropTypes.any,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  className: PropTypes.string,
  componentClass: PropTypes.elementType,
  children: PropTypes.node,
  style: PropTypes.object
};
export default defaultProps({
  classPrefix: 'pagination-btn',
  componentClass: SafeAnchor
})(PaginationButton);