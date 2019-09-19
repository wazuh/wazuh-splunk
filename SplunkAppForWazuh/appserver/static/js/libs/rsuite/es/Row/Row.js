import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, ReactChildren } from '../utils';

var Row =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Row, _React$Component);

  function Row() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Row.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        gutter = _this$props.gutter,
        children = _this$props.children,
        Component = _this$props.componentClass,
        classPrefix = _this$props.classPrefix,
        style = _this$props.style,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "gutter", "children", "componentClass", "classPrefix", "style"]);

    var classes = classNames(classPrefix, className);

    if (typeof gutter !== 'undefined') {
      var padding = gutter / 2;
      var cols = ReactChildren.mapCloneElement(children, function (child) {
        return _extends({}, child.props, {
          style: _extends({}, child.props.style, {
            paddingLeft: padding,
            paddingRight: padding
          })
        });
      });

      var styles = _extends({}, style, {
        marginLeft: -padding,
        marginRight: -padding
      });

      return React.createElement(Component, _extends({}, props, {
        className: classes,
        style: styles
      }), cols);
    }

    return React.createElement(Component, _extends({}, props, {
      className: classes,
      style: style
    }), children);
  };

  return Row;
}(React.Component);

Row.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  gutter: PropTypes.number,
  style: PropTypes.object,
  componentClass: PropTypes.elementType,
  children: PropTypes.node
};
export default defaultProps({
  classPrefix: 'row',
  componentClass: 'div'
})(Row);