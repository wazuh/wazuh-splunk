import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';
import TimelineItem from './TimelineItem';
import { defaultProps, ReactChildren } from '../utils';

var Timeline =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Timeline, _React$Component);

  function Timeline() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Timeline.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        Component = _this$props.componentClass,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "componentClass", "classPrefix", "className"]);

    var count = React.Children.count(children);
    return React.createElement(Component, _extends({
      className: classNames(classPrefix, className)
    }, rest), ReactChildren.mapCloneElement(children, function (_child, index) {
      return {
        last: index + 1 === count
      };
    }));
  };

  return Timeline;
}(React.Component);

Timeline.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  componentClass: PropTypes.elementType
};
var EnhancedTimeline = defaultProps({
  classPrefix: 'timeline',
  componentClass: 'ul'
})(Timeline);
setStatic('Item', TimelineItem)(EnhancedTimeline);
export default EnhancedTimeline;