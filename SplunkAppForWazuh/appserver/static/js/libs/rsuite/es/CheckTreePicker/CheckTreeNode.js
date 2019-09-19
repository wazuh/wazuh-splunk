import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { reactToString } from 'rsuite-utils/lib/utils';
import { defaultProps, prefix } from '../utils';
import { CHECK_STATE, TREE_NODE_PADDING, TREE_NODE_ROOT_PADDING } from '../constants';
import DropdownMenuCheckItem from '../Picker/DropdownMenuCheckItem';

var TreeCheckNode =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TreeCheckNode, _React$Component);

  function TreeCheckNode() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleTreeToggle = function (event) {
      var _this$props = _this.props,
          onTreeToggle = _this$props.onTreeToggle,
          layer = _this$props.layer,
          nodeData = _this$props.nodeData; // 异步加载数据自定义loading图标时，阻止原生冒泡，不触发 document.click

      if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
        event.nativeEvent.stopImmediatePropagation();
      }

      onTreeToggle && onTreeToggle(nodeData, layer, event);
    };

    _this.handleSelect = function (_value, event) {
      var _this$props2 = _this.props,
          onSelect = _this$props2.onSelect,
          disabled = _this$props2.disabled,
          uncheckable = _this$props2.uncheckable,
          nodeData = _this$props2.nodeData,
          checkState = _this$props2.checkState;

      if (disabled || uncheckable) {
        return;
      }

      var isChecked = false;

      if (checkState === CHECK_STATE.UNCHECK || checkState === CHECK_STATE.INDETERMINATE) {
        isChecked = true;
      }

      if (checkState === CHECK_STATE.CHECK) {
        isChecked = false;
      }

      var nextNodeData = _extends({}, nodeData, {
        check: isChecked
      });

      onSelect && onSelect(nextNodeData, event);
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.renderIcon = function () {
      var _classNames;

      var _this$props3 = _this.props,
          expand = _this$props3.expand,
          onRenderTreeIcon = _this$props3.onRenderTreeIcon,
          hasChildren = _this$props3.hasChildren,
          nodeData = _this$props3.nodeData;
      var expandIconClasses = classNames(_this.addPrefix('expand-icon'), 'icon', (_classNames = {}, _classNames[_this.addPrefix('expanded')] = expand, _classNames));
      var expandIcon = React.createElement("i", {
        className: expandIconClasses
      });

      if (typeof onRenderTreeIcon === 'function') {
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
          focus = _this$props4.focus,
          onRenderTreeNode = _this$props4.onRenderTreeNode,
          label = _this$props4.label,
          layer = _this$props4.layer,
          disabled = _this$props4.disabled,
          uncheckable = _this$props4.uncheckable,
          checkState = _this$props4.checkState;
      return React.createElement(DropdownMenuCheckItem, {
        componentClass: "div",
        active: checkState === CHECK_STATE.CHECK,
        indeterminate: checkState === CHECK_STATE.INDETERMINATE,
        focus: focus,
        checkable: !uncheckable,
        disabled: disabled,
        "data-layer": layer,
        "data-key": nodeData.refKey,
        className: _this.addPrefix('label'),
        title: _this.getTitle(),
        onSelect: _this.handleSelect
      }, typeof onRenderTreeNode === 'function' ? onRenderTreeNode(nodeData) : label);
    };

    return _this;
  }

  var _proto = TreeCheckNode.prototype;

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
        visible = _this$props5.visible,
        layer = _this$props5.layer,
        disabled = _this$props5.disabled,
        allUncheckable = _this$props5.allUncheckable,
        innerRef = _this$props5.innerRef;
    var classes = classNames(className, classPrefix, (_classNames2 = {
      'text-muted': disabled
    }, _classNames2[this.addPrefix('all-uncheckable')] = !!allUncheckable, _classNames2));
    var styles = {
      paddingLeft: layer * TREE_NODE_PADDING + TREE_NODE_ROOT_PADDING
    };
    return visible ? React.createElement("div", {
      style: _extends({}, style, {}, styles),
      className: classes,
      ref: innerRef
    }, this.renderIcon(), this.renderLabel()) : null;
  };

  return TreeCheckNode;
}(React.Component);

TreeCheckNode.propTypes = {
  classPrefix: PropTypes.string,
  visible: PropTypes.bool,
  style: PropTypes.object,
  label: PropTypes.any,
  layer: PropTypes.number,
  value: PropTypes.any,
  focus: PropTypes.bool,
  expand: PropTypes.bool,
  nodeData: PropTypes.object,
  disabled: PropTypes.bool,
  checkState: PropTypes.oneOf([CHECK_STATE.UNCHECK, CHECK_STATE.CHECK, CHECK_STATE.INDETERMINATE]),
  hasChildren: PropTypes.bool,
  uncheckable: PropTypes.bool,
  allUncheckable: PropTypes.bool,
  innerRef: PropTypes.func,
  onTreeToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onRenderTreeIcon: PropTypes.func,
  onRenderTreeNode: PropTypes.func
};
TreeCheckNode.defaultProps = {
  visible: true
};
export default defaultProps({
  classPrefix: 'check-tree-node'
})(TreeCheckNode);