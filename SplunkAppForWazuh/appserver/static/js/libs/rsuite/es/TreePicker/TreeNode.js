import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { reactToString } from 'rsuite-utils/lib/utils';
import { hasClass } from 'dom-lib';
import { TREE_NODE_PADDING, TREE_NODE_ROOT_PADDING } from '../constants';
import { defaultProps, prefix } from '../utils';

var TreeNode =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TreeNode, _React$Component);

  function TreeNode() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.handleTreeToggle = function (event) {
      var _this$props = _this.props,
          onTreeToggle = _this$props.onTreeToggle,
          layer = _this$props.layer,
          nodeData = _this$props.nodeData; // 异步加载数据自定义loading图标时，阻止原生冒泡，不触发 document.click

      if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
        event.nativeEvent.stopImmediatePropagation && event.nativeEvent.stopImmediatePropagation();
      }

      onTreeToggle && onTreeToggle(nodeData, layer, event);
    };

    _this.handleSelect = function (event) {
      var _this$props2 = _this.props,
          onSelect = _this$props2.onSelect,
          layer = _this$props2.layer,
          disabled = _this$props2.disabled,
          nodeData = _this$props2.nodeData;

      if (disabled) {
        return;
      }

      if (event.target instanceof HTMLElement) {
        if (hasClass(event.target.parentNode, _this.addPrefix('expand-icon-wrapper'))) {
          return;
        }
      }

      onSelect && onSelect(nodeData, layer, event);
    };

    _this.renderIcon = function () {
      var _classNames;

      var _this$props3 = _this.props,
          expand = _this$props3.expand,
          onRenderTreeIcon = _this$props3.onRenderTreeIcon,
          hasChildren = _this$props3.hasChildren,
          nodeData = _this$props3.nodeData;
      var classes = classNames(_this.addPrefix('expand-icon'), 'icon', (_classNames = {}, _classNames[_this.addPrefix('expanded')] = !!expand, _classNames));
      var expandIcon = React.createElement("i", {
        className: classes
      });

      if (nodeData !== undefined && typeof onRenderTreeIcon === 'function') {
        var customIcon = onRenderTreeIcon(nodeData);
        expandIcon = customIcon !== null ? React.createElement("div", {
          className: _this.addPrefix('custom-icon')
        }, customIcon) : expandIcon;
      }

      return hasChildren ? React.createElement("div", {
        role: "button",
        tabIndex: -1,
        "data-ref": nodeData.refKey,
        className: _this.addPrefix('expand-icon-wrapper'),
        onClick: _this.handleTreeToggle
      }, expandIcon) : null;
    };

    _this.renderLabel = function () {
      var _this$props4 = _this.props,
          nodeData = _this$props4.nodeData,
          onRenderTreeNode = _this$props4.onRenderTreeNode,
          label = _this$props4.label,
          layer = _this$props4.layer;
      var key = nodeData ? nodeData.refKey : '';
      return React.createElement("span", {
        className: _this.addPrefix('label'),
        title: _this.getTitle(),
        "data-layer": layer,
        "data-key": key,
        role: "button",
        tabIndex: -1,
        onClick: _this.handleSelect
      }, onRenderTreeNode ? onRenderTreeNode(nodeData) : label);
    };

    return _this;
  }

  var _proto = TreeNode.prototype;

  _proto.getTitle = function getTitle() {
    var label = this.props.label;

    if (typeof label === 'string') {
      return label;
    } else if (React.isValidElement(label)) {
      var nodes = reactToString(label);
      return nodes.join('');
    }
  };

  _proto.render = function render() {
    var _classNames2;

    var _this$props5 = this.props,
        style = _this$props5.style,
        className = _this$props5.className,
        classPrefix = _this$props5.classPrefix,
        active = _this$props5.active,
        layer = _this$props5.layer,
        disabled = _this$props5.disabled,
        visible = _this$props5.visible,
        innerRef = _this$props5.innerRef;
    var classes = classNames(className, classPrefix, (_classNames2 = {
      'text-muted': disabled
    }, _classNames2[this.addPrefix('disabled')] = disabled, _classNames2[this.addPrefix('active')] = active, _classNames2));
    var styles = {
      paddingLeft: layer * TREE_NODE_PADDING + TREE_NODE_ROOT_PADDING
    };
    return visible ? React.createElement("div", {
      style: _extends({}, style, {}, styles),
      className: classes,
      ref: innerRef
    }, this.renderIcon(), this.renderLabel()) : null;
  };

  return TreeNode;
}(React.Component);

TreeNode.propTypes = {
  layer: PropTypes.number,
  value: PropTypes.any,
  label: PropTypes.any,
  expand: PropTypes.bool,
  active: PropTypes.bool,
  visible: PropTypes.bool,
  nodeData: PropTypes.any,
  disabled: PropTypes.bool,
  hasChildren: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  style: PropTypes.object,
  innerRef: PropTypes.func,
  onTreeToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onRenderTreeIcon: PropTypes.func,
  onRenderTreeNode: PropTypes.func
};
TreeNode.defaultProps = {
  visible: true
};
export default defaultProps({
  classPrefix: 'tree-node'
})(TreeNode);