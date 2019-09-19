import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { ReactChildren, getUnhandledProps, defaultProps, prefix } from '../utils';

var PanelGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PanelGroup, _React$Component);

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
      return prefix(_this.props.classPrefix)(name);
    };

    _this.renderPanel = function (child, index) {
      if (!React.isValidElement(child)) {
        return child;
      }

      var accordion = _this.props.accordion;

      var activeKey = _this.getActiveKey();

      var props = {
        key: child.key ? child.key : index,
        ref: _.get(child, 'ref')
      };

      if (accordion) {
        return _extends({}, props, {
          headerRole: 'tab',
          panelRole: 'tabpanel',
          collapsible: true,
          expanded: _.isUndefined(activeKey) ? child.props.expanded : child.props.eventKey === activeKey,
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
    return _.isUndefined(activeKey) ? this.state.activeKey : activeKey;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        accordion = _this$props.accordion,
        bordered = _this$props.bordered,
        classPrefix = _this$props.classPrefix,
        children = _this$props.children,
        rest = _objectWithoutPropertiesLoose(_this$props, ["className", "accordion", "bordered", "classPrefix", "children"]);

    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[this.addPrefix('accordion')] = accordion, _classNames[this.addPrefix('bordered')] = bordered, _classNames));
    var unhandled = getUnhandledProps(PanelGroup, rest);
    return React.createElement("div", _extends({}, unhandled, {
      role: accordion ? 'tablist' : undefined,
      className: classes
    }), ReactChildren.mapCloneElement(children, this.renderPanel));
  };

  return PanelGroup;
}(React.Component);

PanelGroup.propTypes = {
  accordion: PropTypes.bool,
  activeKey: PropTypes.any,
  bordered: PropTypes.bool,
  defaultActiveKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  onSelect: PropTypes.func
};
export default defaultProps({
  classPrefix: 'panel-group'
})(PanelGroup);