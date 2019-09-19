import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { prefix, defaultProps, withStyleProps } from '../utils';

var TimelineItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TimelineItem, _React$Component);

  function TimelineItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TimelineItem.prototype;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props = this.props,
        children = _this$props.children,
        Component = _this$props.componentClass,
        classPrefix = _this$props.classPrefix,
        last = _this$props.last,
        className = _this$props.className,
        dot = _this$props.dot,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "componentClass", "classPrefix", "last", "className", "dot"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('last')] = last, _classNames));
    return React.createElement(Component, _extends({
      className: classes
    }, rest), React.createElement("span", {
      className: addPrefix('tail')
    }), React.createElement("span", {
      className: classNames(addPrefix('dot'), (_classNames2 = {}, _classNames2[addPrefix('custom-dot')] = !!dot, _classNames2))
    }, dot), React.createElement("div", {
      className: addPrefix('content')
    }, children));
  };

  return TimelineItem;
}(React.Component);

TimelineItem.propTypes = {
  last: PropTypes.bool,
  dot: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  componentClass: PropTypes.elementType
};
export default compose(withStyleProps({
  hasColor: true
}), defaultProps({
  componentClass: 'li',
  classPrefix: 'timeline-item'
}))(TimelineItem);