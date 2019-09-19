import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import Button from '../Button';
import { prefix, defaultProps } from '../utils';

var IconButton =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(IconButton, _React$Component);

  function IconButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = IconButton.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        icon = _this$props.icon,
        placement = _this$props.placement,
        children = _this$props.children,
        circle = _this$props.circle,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["icon", "placement", "children", "circle", "classPrefix", "className"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, addPrefix("placement-" + placement), (_classNames = {}, _classNames[addPrefix('circle')] = circle, _classNames[addPrefix('with-text')] = !_.isUndefined(children), _classNames));
    return React.createElement(Button, _extends({}, props, {
      className: classes
    }), icon, children);
  };

  return IconButton;
}(React.Component);

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.object,
  classPrefix: PropTypes.string,
  circle: PropTypes.bool,
  children: PropTypes.node,
  placement: PropTypes.oneOf(['left', 'right'])
};
IconButton.defaultProps = {
  placement: 'left'
};
export default defaultProps({
  classPrefix: 'btn-icon'
})(IconButton);