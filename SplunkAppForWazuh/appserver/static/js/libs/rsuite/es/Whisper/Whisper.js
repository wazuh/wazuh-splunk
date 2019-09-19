import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import { createChainedFunction, placementPolyfill } from '../utils';

var Whisper =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Whisper, _React$Component);

  function Whisper() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Whisper.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        triggerRef = _this$props.triggerRef,
        onOpen = _this$props.onOpen,
        onClose = _this$props.onClose,
        onEntered = _this$props.onEntered,
        onExited = _this$props.onExited,
        _this$props$placement = _this$props.placement,
        placement = _this$props$placement === void 0 ? 'right' : _this$props$placement,
        preventOverflow = _this$props.preventOverflow,
        rest = _objectWithoutPropertiesLoose(_this$props, ["triggerRef", "onOpen", "onClose", "onEntered", "onExited", "placement", "preventOverflow"]);

    return React.createElement(OverlayTrigger, _extends({
      preventOverflow: preventOverflow,
      placement: placementPolyfill(placement),
      onEntered: createChainedFunction(onOpen, onEntered),
      onExited: createChainedFunction(onClose, onExited),
      ref: triggerRef // for test

    }, rest));
  };

  return Whisper;
}(React.Component);

Whisper.propTypes = {
  triggerRef: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onEntered: PropTypes.func,
  onExited: PropTypes.func,
  placement: PropTypes.string,

  /**
   * Prevent floating element overflow
   */
  preventOverflow: PropTypes.bool
};
export default Whisper;