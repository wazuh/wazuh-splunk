import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SafeAnchor from '../SafeAnchor';
import { defaultProps, prefix } from '../utils';

var BreadcrumbItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(BreadcrumbItem, _React$Component);

  function BreadcrumbItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = BreadcrumbItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        href = _this$props.href,
        classPrefix = _this$props.classPrefix,
        title = _this$props.title,
        target = _this$props.target,
        Component = _this$props.componentClass,
        className = _this$props.className,
        style = _this$props.style,
        active = _this$props.active,
        rest = _objectWithoutPropertiesLoose(_this$props, ["href", "classPrefix", "title", "target", "componentClass", "className", "style", "active"]);

    var addPrefix = prefix(classPrefix);
    var linkProps = {
      href: href,
      title: title,
      target: target
    };
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames));
    return React.createElement("li", {
      style: style,
      className: classes
    }, active ? React.createElement("span", rest) : React.createElement(Component, _extends({}, rest, linkProps)));
  };

  return BreadcrumbItem;
}(React.Component);

BreadcrumbItem.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  href: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.string,
  classPrefix: PropTypes.string,
  componentClass: PropTypes.elementType
};
var enhance = defaultProps({
  classPrefix: 'breadcrumb-item',
  componentClass: SafeAnchor
});
export default enhance(BreadcrumbItem);