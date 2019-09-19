import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { shallowEqual } from 'rsuite-utils/lib/utils';
import { getUnhandledProps, prefix } from '../utils';
import { DropdownMenuCheckItem } from '../Picker';
import createUtils from './utils';

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownMenu, _React$Component);

  function DropdownMenu(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.utils = {};
    _this.menus = [];

    _this.handleSelect = function (layer, node, event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          childrenKey = _this$props.childrenKey;
      var children = node[childrenKey];

      var isLeafNode = _.isUndefined(children) || _.isNull(children);

      var items = (children || []).map(function (item) {
        return _extends({}, item, {
          parent: node
        });
      });

      var _this$getCascadeItems = _this.getCascadeItems(items, layer + 1, node, isLeafNode),
          cascadeItems = _this$getCascadeItems.cascadeItems,
          cascadePathItems = _this$getCascadeItems.cascadePathItems;

      onSelect && onSelect(node, cascadeItems, cascadePathItems, event);
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.utils = createUtils(props);
    return _this;
  }

  var _proto = DropdownMenu.prototype;

  _proto.getCascadeItems = function getCascadeItems(items, layer, node, isLeafNode) {
    var _this$props2 = this.props,
        _this$props2$cascadeI = _this$props2.cascadeItems,
        cascadeItems = _this$props2$cascadeI === void 0 ? [] : _this$props2$cascadeI,
        cascadePathItems = _this$props2.cascadePathItems;
    var nextItems = [];
    var nextPathItems = [];

    for (var i = 0; i < cascadeItems.length && i < layer; i += 1) {
      nextItems.push(cascadeItems[i]);

      if (i < layer - 1 && cascadePathItems) {
        nextPathItems.push(cascadePathItems[i]);
      }
    }

    nextPathItems.push(node);

    if (!isLeafNode) {
      nextItems.push(items);
    }

    return {
      cascadeItems: nextItems,
      cascadePathItems: nextPathItems
    };
  };

  _proto.renderCascadeNode = function renderCascadeNode(node, index, layer, focus, uncheckable) {
    var _classNames;

    var _this$props3 = this.props,
        _this$props3$value = _this$props3.value,
        value = _this$props3$value === void 0 ? [] : _this$props3$value,
        valueKey = _this$props3.valueKey,
        labelKey = _this$props3.labelKey,
        childrenKey = _this$props3.childrenKey,
        disabledItemValues = _this$props3.disabledItemValues,
        renderMenuItem = _this$props3.renderMenuItem,
        onCheck = _this$props3.onCheck,
        cascade = _this$props3.cascade;
    var children = node[childrenKey];
    var itemValue = node[valueKey];
    var label = node[labelKey];
    var disabled = disabledItemValues.some(function (disabledValue) {
      return shallowEqual(disabledValue, itemValue);
    }); // Use `value` in keys when If `value` is string or number

    var onlyKey = _.isString(itemValue) || _.isNumber(itemValue) ? itemValue : index;
    var active = value.some(function (v) {
      return v === itemValue;
    });

    if (cascade) {
      active = active || this.utils.isSomeParentChecked(node, value);
    }

    value.some(function (item) {
      return shallowEqual(item, itemValue);
    });
    var classes = classNames((_classNames = {}, _classNames[this.addPrefix('cascader-menu-has-children')] = children, _classNames));
    return React.createElement(DropdownMenuCheckItem, {
      key: layer + "-" + onlyKey,
      disabled: disabled,
      active: active,
      focus: focus,
      value: node,
      className: classes,
      indeterminate: cascade && !active && this.utils.isSomeChildChecked(node, value),
      onSelectItem: this.handleSelect.bind(this, layer, node),
      onCheck: onCheck,
      checkable: !uncheckable
    }, renderMenuItem ? renderMenuItem(label, node) : label, children ? React.createElement("span", {
      className: this.addPrefix('cascader-menu-caret')
    }) : null);
  };

  _proto.renderCascade = function renderCascade() {
    var _this2 = this;

    var _this$props4 = this.props,
        menuWidth = _this$props4.menuWidth,
        menuHeight = _this$props4.menuHeight,
        valueKey = _this$props4.valueKey,
        renderMenu = _this$props4.renderMenu,
        _this$props4$cascadeI = _this$props4.cascadeItems,
        cascadeItems = _this$props4$cascadeI === void 0 ? [] : _this$props4$cascadeI,
        cascadePathItems = _this$props4.cascadePathItems,
        uncheckableItemValues = _this$props4.uncheckableItemValues;
    var styles = {
      width: cascadeItems.length * menuWidth
    };
    var columnStyles = {
      height: menuHeight,
      width: menuWidth
    };
    var cascadeNodes = cascadeItems.map(function (children, layer) {
      var _classNames2;

      var uncheckableCount = 0;
      var onlyKey = layer + "_" + children.length;
      var menu = React.createElement("ul", null, children.map(function (item, index) {
        var uncheckable = uncheckableItemValues.some(function (uncheckableValue) {
          return shallowEqual(uncheckableValue, item[valueKey]);
        });

        if (uncheckable) {
          uncheckableCount++;
        }

        return _this2.renderCascadeNode(item, index, layer, cascadePathItems[layer] && shallowEqual(cascadePathItems[layer][valueKey], item[valueKey]), uncheckable);
      }));
      var parentNode = cascadePathItems[layer - 1];
      var columnClasses = classNames(_this2.addPrefix('cascader-menu-column'), (_classNames2 = {}, _classNames2[_this2.addPrefix('cascader-menu-column-uncheckable')] = uncheckableCount === children.length, _classNames2));
      var node = React.createElement("div", {
        key: onlyKey,
        className: columnClasses,
        ref: function ref(_ref) {
          return _this2.menus[layer] = _ref;
        },
        style: columnStyles
      }, renderMenu ? renderMenu(children, menu, parentNode) : menu);
      return node;
    });
    return React.createElement("div", {
      style: styles
    }, cascadeNodes);
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        className = _this$props5.className,
        rest = _objectWithoutPropertiesLoose(_this$props5, ["className"]);

    var classes = classNames(this.addPrefix('cascader-menu-items'), className);
    var unhandled = getUnhandledProps(DropdownMenu, rest);
    return React.createElement("div", _extends({}, unhandled, {
      className: classes
    }), this.renderCascade());
  };

  return DropdownMenu;
}(React.Component);

DropdownMenu.propTypes = {
  classPrefix: PropTypes.string,
  data: PropTypes.array,
  disabledItemValues: PropTypes.array,
  value: PropTypes.array,
  childrenKey: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  menuWidth: PropTypes.number,
  menuHeight: PropTypes.number,
  className: PropTypes.string,
  cascade: PropTypes.bool,
  cascadeItems: PropTypes.array,
  cascadePathItems: PropTypes.array,
  uncheckableItemValues: PropTypes.array,
  renderMenuItem: PropTypes.func,
  renderMenu: PropTypes.func,
  onSelect: PropTypes.func,
  onCheck: PropTypes.func
};
DropdownMenu.defaultProps = {
  data: [],
  disabledItemValues: [],
  uncheckableItemValues: [],
  cascadeItems: [],
  cascadePathItems: [],
  menuWidth: 156,
  menuHeight: 200,
  childrenKey: 'children',
  valueKey: 'value',
  labelKey: 'label'
};
export default DropdownMenu;