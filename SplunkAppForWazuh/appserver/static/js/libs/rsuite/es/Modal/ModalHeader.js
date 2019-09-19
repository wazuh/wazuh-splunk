import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createChainedFunction, defaultProps, prefix } from '../utils';
import { ModalContext } from './Modal';

var ModalHeader =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ModalHeader, _React$Component);

  function ModalHeader() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        onHide = _this$props.onHide,
        className = _this$props.className,
        closeButton = _this$props.closeButton,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["classPrefix", "onHide", "className", "closeButton", "children"]);

    var classes = classNames(classPrefix, className);
    var addPrefix = prefix(classPrefix);
    var buttonElement = React.createElement(ModalContext.Consumer, null, function (context) {
      return React.createElement("button", {
        type: "button",
        className: addPrefix('close'),
        "aria-label": "Close",
        onClick: createChainedFunction(onHide, context ? context.onModalHide : null)
      }, React.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7"));
    });
    return React.createElement("div", _extends({}, props, {
      className: classes
    }), closeButton && buttonElement, children);
  };

  return ModalHeader;
}(React.Component);

ModalHeader.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  closeButton: PropTypes.bool,
  children: PropTypes.node,
  onHide: PropTypes.func
};
ModalHeader.defaultProps = {
  closeButton: true
};
export default defaultProps({
  classPrefix: 'modal-header'
})(ModalHeader);