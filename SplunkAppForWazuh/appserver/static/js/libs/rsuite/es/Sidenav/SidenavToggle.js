import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButton from '../IconButton';
import Icon from '../Icon';
import { defaultProps } from '../utils';

var SidenavToggle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SidenavToggle, _React$Component);

  function SidenavToggle() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleToggle = function (event) {
      var _this$props = _this.props,
          onToggle = _this$props.onToggle,
          expanded = _this$props.expanded;
      onToggle && onToggle(!expanded, event);
    };

    return _this;
  }

  var _proto = SidenavToggle.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        expanded = _this$props2.expanded,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props2, ["expanded", "className", "classPrefix"]);

    var classes = classNames(classPrefix, className, {
      collapsed: !expanded
    });
    return React.createElement("div", _extends({}, props, {
      className: classes
    }), React.createElement(IconButton, {
      appearance: "default",
      icon: React.createElement(Icon, {
        icon: expanded ? 'angle-right' : 'angle-left'
      }),
      onClick: this.handleToggle
    }));
  };

  return SidenavToggle;
}(React.Component);

SidenavToggle.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func
};
export default defaultProps({
  classPrefix: 'sidenav-toggle'
})(SidenavToggle);