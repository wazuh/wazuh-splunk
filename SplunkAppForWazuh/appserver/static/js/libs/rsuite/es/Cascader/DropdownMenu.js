import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import { getPosition, scrollTop } from 'dom-lib';
import _ from 'lodash';
import classNames from 'classnames';
import { shallowEqual } from 'rsuite-utils/lib/utils';
import { getUnhandledProps, prefix } from '../utils';
import _stringToObject from '../utils/stringToObject';
import { DropdownMenuItem } from '../Picker';

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownMenu, _React$Component);

  function DropdownMenu() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.menus = [];

    _this.handleSelect = function (layer, node, event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          childrenKey = _this$props.childrenKey;
      var children = node[childrenKey];

      var isLeafNode = _.isUndefined(children) || _.isNull(children);

      var items = (children || []).map(function (item) {
        return _extends({}, _this.stringToObject(item), {
          parent: node
        });
      });

      var _this$getCascadeItems = _this.getCascadeItems(items, layer + 1, node, isLeafNode),
          cascadeItems = _this$getCascadeItems.cascadeItems,
          cascadePathItems = _this$getCascadeItems.cascadePathItems;

      onSelect && onSelect(node, cascadeItems, cascadePathItems, isLeafNode, event);
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = DropdownMenu.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.scrollToActiveItemTop();
  };

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

  _proto.stringToObject = function stringToObject(value) {
    var _this$props3 = this.props,
        labelKey = _this$props3.labelKey,
        valueKey = _this$props3.valueKey;
    return _stringToObject(value, labelKey, valueKey);
  };

  _proto.scrollToActiveItemTop = function scrollToActiveItemTop() {
    var _this2 = this;

    if (!this.menus) {
      return;
    }

    this.menus.forEach(function (menu) {
      if (!menu) {
        return;
      }

      var activeItem = menu.querySelector("." + _this2.addPrefix('item-focus'));

      if (!activeItem) {
        activeItem = menu.querySelector("." + _this2.addPrefix('item-active'));
      }

      if (activeItem) {
        var position = getPosition(activeItem, menu);
        scrollTop(menu, position.top);
      }
    });
  };

  _proto.renderCascadeNode = function renderCascadeNode(node, index, layer, focus) {
    var _this$props4 = this.props,
        activeItemValue = _this$props4.activeItemValue,
        valueKey = _this$props4.valueKey,
        labelKey = _this$props4.labelKey,
        childrenKey = _this$props4.childrenKey,
        disabledItemValues = _this$props4.disabledItemValues,
        renderMenuItem = _this$props4.renderMenuItem;
    var children = node[childrenKey];
    var value = node[valueKey];
    var label = node[labelKey];
    var disabled = disabledItemValues.some(function (disabledValue) {
      return shallowEqual(disabledValue, value);
    }); // Use `value` in keys when If `value` is string or number

    var onlyKey = _.isString(value) || _.isNumber(value) ? value : index;
    return React.createElement(DropdownMenuItem, {
      classPrefix: this.addPrefix('item'),
      key: layer + "-" + onlyKey,
      disabled: disabled,
      active: !_.isUndefined(activeItemValue) && shallowEqual(activeItemValue, value),
      focus: focus,
      value: node,
      className: children ? this.addPrefix('has-children') : undefined,
      onSelect: this.handleSelect.bind(this, layer)
    }, renderMenuItem ? renderMenuItem(label, node) : label, children ? React.createElement("span", {
      className: this.addPrefix('caret')
    }) : null);
  };

  _proto.renderCascade = function renderCascade() {
    var _this3 = this;

    var _this$props5 = this.props,
        menuWidth = _this$props5.menuWidth,
        menuHeight = _this$props5.menuHeight,
        valueKey = _this$props5.valueKey,
        renderMenu = _this$props5.renderMenu,
        _this$props5$cascadeI = _this$props5.cascadeItems,
        cascadeItems = _this$props5$cascadeI === void 0 ? [] : _this$props5$cascadeI,
        cascadePathItems = _this$props5.cascadePathItems;
    var styles = {
      width: cascadeItems.length * menuWidth
    };
    var cascadeNodes = cascadeItems.map(function (children, layer) {
      var onlyKey = layer + "_" + children.length;
      var menu = React.createElement("ul", null, children.map(function (item, index) {
        return _this3.renderCascadeNode(item, index, layer, cascadePathItems[layer] && shallowEqual(cascadePathItems[layer][valueKey], item[valueKey]));
      }));
      var parentNode = cascadePathItems[layer - 1];
      var node = React.createElement("div", {
        key: onlyKey,
        className: _this3.addPrefix('column'),
        ref: function ref(_ref) {
          _this3.menus[layer] = _ref;
        },
        style: {
          height: menuHeight,
          width: menuWidth
        }
      }, renderMenu ? renderMenu(children, menu, parentNode) : menu);
      return node;
    });
    return React.createElement("div", {
      style: styles
    }, cascadeNodes);
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        className = _this$props6.className,
        rest = _objectWithoutPropertiesLoose(_this$props6, ["className"]);

    var classes = classNames(this.addPrefix('items'), className);
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
  activeItemValue: PropTypes.any,
  childrenKey: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  menuWidth: PropTypes.number,
  menuHeight: PropTypes.number,
  className: PropTypes.string,
  renderMenuItem: PropTypes.func,
  renderMenu: PropTypes.func,
  onSelect: PropTypes.func,
  cascadeItems: PropTypes.array,
  cascadePathItems: PropTypes.array
};
DropdownMenu.defaultProps = {
  data: [],
  disabledItemValues: [],
  cascadeItems: [],
  cascadePathItems: [],
  menuWidth: 120,
  menuHeight: 200,
  childrenKey: 'children',
  valueKey: 'value',
  labelKey: 'label'
};
DropdownMenu.handledProps = [];
export default DropdownMenu;