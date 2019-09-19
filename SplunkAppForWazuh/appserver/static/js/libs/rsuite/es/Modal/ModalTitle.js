import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';

var ModalTitle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ModalTitle, _React$Component);

  function ModalTitle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalTitle.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "children"]);

    var classes = classNames(classPrefix, className);
    return React.createElement("h4", _extends({}, props, {
      className: classes
    }), children);
  };

  return ModalTitle;
}(React.Component);

ModalTitle.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node
};
export default defaultProps({
  classPrefix: 'modal-title'
})(ModalTitle);