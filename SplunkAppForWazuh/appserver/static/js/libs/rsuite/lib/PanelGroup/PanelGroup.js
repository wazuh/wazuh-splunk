"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var PanelGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PanelGroup, _React$Component);

  function PanelGroup(_props) {
    var _this;

    _this = _React$Component.call(this, _props) || this;

    _this.handleSelect = function (activeKey, event) {
      var onSelect = _this.props.onSelect;

      _this.setState({
        activeKey: activeKey
      });

      onSelect && onSelect(activeKey, event);
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.renderPanel = function (child, index) {
      if (!React.isValidElement(child)) {
        return child;
      }

      var accordion = _this.props.accordion;

      var activeKey = _this.getActiveKey();

      var props = {
        key: child.key ? child.key : index,
        ref: _lodash.default.get(child, 'ref')
      };

      if (accordion) {
        return (0, _extends2.default)({}, props, {
          headerRole: 'tab',
          panelRole: 'tabpanel',
          collapsible: true,
          expanded: _lodash.default.isUndefined(activeKey) ? child.props.expanded : child.props.eventKey === activeKey,
          onSelect: _this.handleSelect
        });
      }

      return props;
    };

    _this.state = {
      activeKey: _props.defaultActiveKey
    };
    return _this;
  }

  var _proto = PanelGroup.prototype;

  _proto.getActiveKey = function getActiveKey() {
    var activeKey = this.props.activeKey;
    return _lodash.default.isUndefined(activeKey) ? this.state.activeKey : activeKey;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        accordion = _this$props.accordion,
        bordered = _this$props.bordered,
        classPrefix = _this$props.classPrefix,
        children = _this$props.children,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "accordion", "bordered", "classPrefix", "children"]);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[this.addPrefix('accordion')] = accordion, _classNames[this.addPrefix('bordered')] = bordered, _classNames));
    var unhandled = (0, _utils.getUnhandledProps)(PanelGroup, rest);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      role: accordion ? 'tablist' : undefined,
      className: classes
    }), _utils.ReactChildren.mapCloneElement(children, this.renderPanel));
  };

  return PanelGroup;
}(React.Component);

PanelGroup.propTypes = {
  accordion: _propTypes.default.bool,
  activeKey: _propTypes.default.any,
  bordered: _propTypes.default.bool,
  defaultActiveKey: _propTypes.default.any,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  onSelect: _propTypes.default.func
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'panel-group'
})(PanelGroup);

exports.default = _default;
module.exports = exports.default;