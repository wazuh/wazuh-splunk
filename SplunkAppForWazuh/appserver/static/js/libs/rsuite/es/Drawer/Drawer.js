import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Slide from 'rsuite-utils/lib/Animation/Slide';
import Modal from '../Modal/Modal';
import { prefix, defaultProps } from '../utils';

var Drawer =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Drawer, _React$Component);

  function Drawer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Drawer.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        show = _this$props.show,
        full = _this$props.full,
        className = _this$props.className,
        placement = _this$props.placement,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["show", "full", "className", "placement", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(addPrefix(placement), className, (_classNames = {}, _classNames[addPrefix('full')] = full, _classNames));
    var animationProps = {
      placement: placement
    };
    return React.createElement(Modal, _extends({}, props, {
      drawer: true,
      classPrefix: classPrefix,
      className: classes,
      show: show,
      animation: Slide,
      animationProps: animationProps
    }));
  };

  return Drawer;
}(React.Component);

Drawer.propTypes = {
  classPrefix: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  show: PropTypes.bool,
  full: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};
Drawer.defaultProps = {
  placement: 'right'
};
var EnhancedDrawer = defaultProps({
  classPrefix: 'drawer'
})(Drawer);
export default EnhancedDrawer;