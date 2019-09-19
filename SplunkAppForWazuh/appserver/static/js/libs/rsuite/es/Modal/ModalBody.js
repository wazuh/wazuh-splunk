import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';
import { defaultProps } from '../utils';

var ModalBody =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ModalBody, _React$Component);

  function ModalBody() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalBody.prototype;

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

  return ModalBody;
}(React.Component);

ModalBody.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string
};
var EnhancedModalBody = defaultProps({
  classPrefix: 'modal-body'
})(ModalBody);
export default setDisplayName('ModalBody')(EnhancedModalBody);