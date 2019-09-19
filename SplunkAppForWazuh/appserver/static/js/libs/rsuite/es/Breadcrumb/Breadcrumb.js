import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';
import BreadcrumbItem from './BreadcrumbItem';
import { defaultProps, prefix } from '../utils';

var Breadcrumb =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Breadcrumb, _React$Component);

  function Breadcrumb() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Breadcrumb.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        Component = _this$props.componentClass,
        className = _this$props.className,
        children = _this$props.children,
        separator = _this$props.separator,
        rest = _objectWithoutPropertiesLoose(_this$props, ["classPrefix", "componentClass", "className", "children", "separator"]);

    var items = [];
    var count = React.Children.count(children);
    var addPrefix = prefix(classPrefix);

    if (children) {
      React.Children.forEach(children, function (item, index) {
        items.push(item);

        if (index < count - 1) {
          items.push(React.createElement("li", {
            key: index,
            className: addPrefix('separator')
          }, separator));
        }
      });
    }

    return React.createElement(Component, _extends({}, rest, {
      role: "navigation",
      "aria-label": "breadcrumbs",
      className: classNames(classPrefix, className)
    }), items);
  };

  return Breadcrumb;
}(React.Component);

Breadcrumb.propTypes = {
  separator: PropTypes.node,
  componentClass: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
Breadcrumb.defaultProps = {
  separator: '/'
};
var EnhancedBreadcrumb = defaultProps({
  classPrefix: 'breadcrumb',
  componentClass: 'ol'
})(Breadcrumb);
setStatic('Item', BreadcrumbItem)(EnhancedBreadcrumb);
export default EnhancedBreadcrumb;