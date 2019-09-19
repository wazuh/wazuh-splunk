import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { prefix, withStyleProps, defaultProps } from '../utils';

var Tag =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Tag, _React$Component);

  function Tag() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tag.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        children = _this$props.children,
        Component = _this$props.componentClass,
        onClose = _this$props.onClose,
        classPrefix = _this$props.classPrefix,
        closable = _this$props.closable,
        className = _this$props.className,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "componentClass", "onClose", "classPrefix", "closable", "className"]);

    var addPrefix = prefix(classPrefix);
    var classes = classnames(classPrefix, className, (_classnames = {}, _classnames[addPrefix('closeable')] = closable, _classnames));
    return React.createElement(Component, _extends({
      className: classes
    }, rest), React.createElement("span", {
      className: addPrefix('text')
    }, children), closable && React.createElement("i", {
      role: "button",
      tabIndex: -1,
      className: addPrefix('icon-close'),
      onClick: onClose
    }));
  };

  return Tag;
}(React.Component);

Tag.propTypes = {
  closable: PropTypes.bool,
  classPrefix: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  componentClass: PropTypes.elementType
};
export default compose(withStyleProps({
  hasColor: true,
  defaultColor: 'default'
}), defaultProps({
  componentClass: 'div',
  classPrefix: 'tag'
}))(Tag);