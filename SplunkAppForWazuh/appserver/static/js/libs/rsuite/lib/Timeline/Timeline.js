"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _TimelineItem = _interopRequireDefault(require("./TimelineItem"));

var _utils = require("../utils");

var Timeline =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Timeline, _React$Component);

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
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children", "componentClass", "classPrefix", "className"]);
    var count = React.Children.count(children);
    return React.createElement(Component, (0, _extends2.default)({
      className: (0, _classnames.default)(classPrefix, className)
    }, rest), _utils.ReactChildren.mapCloneElement(children, function (_child, index) {
      return {
        last: index + 1 === count
      };
    }));
  };

  return Timeline;
}(React.Component);

Timeline.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  componentClass: _propTypes.default.elementType
};
var EnhancedTimeline = (0, _utils.defaultProps)({
  classPrefix: 'timeline',
  componentClass: 'ul'
})(Timeline);
(0, _setStatic.default)('Item', _TimelineItem.default)(EnhancedTimeline);
var _default = EnhancedTimeline;
exports.default = _default;
module.exports = exports.default;