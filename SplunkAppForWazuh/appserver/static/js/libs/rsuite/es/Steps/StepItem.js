import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps } from '../utils';

var StepItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(StepItem, _React$Component);

  function StepItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = StepItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        style = _this$props.style,
        itemWidth = _this$props.itemWidth,
        status = _this$props.status,
        icon = _this$props.icon,
        stepNumber = _this$props.stepNumber,
        description = _this$props.description,
        title = _this$props.title,
        rest = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "style", "itemWidth", "status", "icon", "stepNumber", "description", "title"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(className, classPrefix, (_classNames = {}, _classNames[addPrefix("status-" + status)] = status, _classNames[addPrefix('custom')] = icon, _classNames));

    var styles = _extends({
      width: itemWidth
    }, style);

    var contentNode = React.createElement("div", {
      className: addPrefix('content')
    }, title && React.createElement("div", {
      className: addPrefix('title')
    }, title), description && React.createElement("div", {
      className: addPrefix('description')
    }, description));
    var iconNode = React.createElement("span", {
      className: addPrefix(['icon', "icon-" + status])
    }, stepNumber);

    if (icon) {
      iconNode = React.createElement("span", {
        className: addPrefix('icon')
      }, icon);
    }

    return React.createElement("div", _extends({}, rest, {
      className: classes,
      style: styles
    }), React.createElement("div", {
      className: addPrefix('tail')
    }), React.createElement("div", {
      className: addPrefix(['icon-wrapper', icon ? 'custom-icon' : ''])
    }, iconNode), contentNode);
  };

  return StepItem;
}(React.Component);

StepItem.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  style: PropTypes.object,
  itemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.oneOf(['finish', 'wait', 'process', 'error']),
  icon: PropTypes.object,
  stepNumber: PropTypes.number,
  description: PropTypes.node,
  title: PropTypes.node
};
export default defaultProps({
  classPrefix: 'steps-item'
})(StepItem);