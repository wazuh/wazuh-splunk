import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import _ from 'lodash';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import { placementPolyfill } from '../utils';
var PickerToggleTriggerProps = ['onEntered', 'onExited', 'open', 'defaultOpen', 'disabled', 'onEnter', 'onEntering', 'onExit', 'onExiting', 'onHide', 'container', 'containerPadding', 'preventOverflow'];
var PickerToggleTrigger = React.forwardRef(function (props, ref) {
  var pickerProps = props.pickerProps,
      speaker = props.speaker,
      _props$trigger = props.trigger,
      trigger = _props$trigger === void 0 ? 'click' : _props$trigger,
      open = props.open,
      rest = _objectWithoutPropertiesLoose(props, ["pickerProps", "speaker", "trigger", "open"]);

  var placement = placementPolyfill(pickerProps.placement);
  return React.createElement(OverlayTrigger, _extends({
    trigger: trigger,
    ref: ref,
    open: open,
    placement: placement,
    speaker: speaker
  }, _.pick(pickerProps, PickerToggleTriggerProps), rest));
});
PickerToggleTrigger.displayName = 'PickerToggleTrigger';
export default PickerToggleTrigger;