import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from '../Tooltip';
import Whisper from '../Whisper';
import Icon from '../Icon';
import { defaultProps, prefix } from '../utils';

var HelpBlock =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(HelpBlock, _React$Component);

  function HelpBlock() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = HelpBlock.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        tooltip = _this$props.tooltip,
        children = _this$props.children,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "tooltip", "children", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('tooltip')] = tooltip, _classNames));

    if (tooltip) {
      return React.createElement(Whisper, {
        placement: "topEnd",
        speaker: React.createElement(Tooltip, null, children)
      }, React.createElement("span", _extends({
        className: classes
      }, props), React.createElement(Icon, {
        icon: "question-circle2"
      })));
    }

    return React.createElement("span", _extends({}, props, {
      className: classes
    }), children);
  };

  return HelpBlock;
}(React.Component);

HelpBlock.propTypes = {
  className: PropTypes.string,
  tooltip: PropTypes.bool,
  children: PropTypes.node,
  classPrefix: PropTypes.string
};
export default defaultProps({
  classPrefix: 'help-block'
})(HelpBlock);