import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { withStyleProps, defaultProps, prefix } from '../utils';

var ModalDialog =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ModalDialog, _React$Component);

  function ModalDialog() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalDialog.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        children = _this$props.children,
        dialogClassName = _this$props.dialogClassName,
        dialogStyle = _this$props.dialogStyle,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        dialogRef = _this$props.dialogRef,
        props = _objectWithoutPropertiesLoose(_this$props, ["style", "children", "dialogClassName", "dialogStyle", "classPrefix", "className", "dialogRef"]);

    var modalStyle = _extends({
      display: 'block'
    }, style);

    var addPrefix = prefix(classPrefix);
    var dialogClasses = classNames(addPrefix('dialog'), dialogClassName);
    return React.createElement("div", _extends({}, props, {
      title: null,
      role: "dialog",
      ref: dialogRef,
      className: classNames(classPrefix, className),
      style: modalStyle
    }), React.createElement("div", {
      className: dialogClasses,
      style: dialogStyle
    }, React.createElement("div", {
      className: addPrefix('content'),
      role: "document"
    }, children)));
  };

  return ModalDialog;
}(React.Component);

ModalDialog.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  dialogClassName: PropTypes.string,
  style: PropTypes.object,
  dialogStyle: PropTypes.object,
  children: PropTypes.node,
  dialogRef: PropTypes.object
};
export default compose(withStyleProps({
  hasSize: true
}), defaultProps({
  classPrefix: 'modal'
}))(ModalDialog);