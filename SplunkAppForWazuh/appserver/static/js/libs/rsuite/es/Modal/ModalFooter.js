import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';

var ModalFooter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ModalFooter, _React$Component);

  function ModalFooter() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalFooter.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["classPrefix", "className"]);

    var classes = classNames(classPrefix, className);
    return React.createElement("div", _extends({}, props, {
      className: classes
    }));
  };

  return ModalFooter;
}(React.Component);

ModalFooter.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string
};
export default defaultProps({
  classPrefix: 'modal-footer'
})(ModalFooter);