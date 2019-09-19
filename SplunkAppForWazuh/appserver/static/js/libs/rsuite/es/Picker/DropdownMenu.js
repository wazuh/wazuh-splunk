import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getPosition, scrollTop, getHeight } from 'dom-lib';
import classNames from 'classnames';
import { shallowEqual } from 'rsuite-utils/lib/utils';
import { getUnhandledProps, prefix, defaultProps } from '../utils';
import DropdownMenuGroup from './DropdownMenuGroup';

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownMenu, _React$Component);

  function DropdownMenu(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuBodyContainerRef = void 0;
    _this.menuItems = {};

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.handleSelect = function (item, value, event, checked) {
      var onSelect = _this.props.onSelect;
      onSelect && onSelect(value, item, event, checked);
    };

    _this.bindMenuItems = function (disabled, key, ref) {
      if (ref && !disabled) {
        _this.menuItems[key] = ref;
      }
    };

    _this.getItemData = function (itemData) {
      return itemData;
    };

    _this.createMenuItems = function (items, groupId) {
      if (items === void 0) {
        items = [];
      }

      if (groupId === void 0) {
        groupId = 0;
      }

      var _this$props = _this.props,
          activeItemValues = _this$props.activeItemValues,
          focusItemValue = _this$props.focusItemValue,
          valueKey = _this$props.valueKey,
          labelKey = _this$props.labelKey,
          renderMenuItem = _this$props.renderMenuItem,
          renderMenuGroup = _this$props.renderMenuGroup,
          onGroupTitleClick = _this$props.onGroupTitleClick,
          disabledItemValues = _this$props.disabledItemValues,
          group = _this$props.group,
          dropdownMenuItemClassPrefix = _this$props.dropdownMenuItemClassPrefix,
          DropdownMenuItem = _this$props.dropdownMenuItemComponentClass;
      var nextItems = items.map(function (item, index) {
        var value = item[valueKey];
        var label = item[labelKey];

        if (_.isUndefined(label) && _.isUndefined(item.groupTitle)) {
          throw Error("labelKey \"" + labelKey + "\" is not defined in \"data\" : " + index);
        } // Use `value` in keys when If `value` is string or number


        var onlyKey = _.isString(value) || _.isNumber(value) ? value : index;
        /**
         * Render <DropdownMenuGroup>
         * when if `group` is enabled and `itme.children` is array
         */

        if (group && _.isArray(item.children)) {
          return React.createElement(DropdownMenuGroup, {
            classPrefix: _this.addPrefix('group'),
            key: onlyKey,
            title: renderMenuGroup ? renderMenuGroup(item.groupTitle, item) : item.groupTitle,
            onClick: onGroupTitleClick
          }, _this.createMenuItems(item.children, onlyKey));
        } else if (_.isUndefined(value) && !_.isArray(item.children)) {
          throw Error("valueKey \"" + valueKey + "\" is not defined in \"data\" : " + index + " ");
        }

        var disabled = disabledItemValues.some(function (disabledValue) {
          return shallowEqual(disabledValue, value);
        });
        return React.createElement(DropdownMenuItem, {
          classPrefix: dropdownMenuItemClassPrefix,
          getItemData: _this.getItemData.bind(_assertThisInitialized(_this), item),
          key: groupId + "-" + onlyKey,
          disabled: disabled,
          active: !_.isUndefined(activeItemValues) && activeItemValues.some(function (v) {
            return shallowEqual(v, value);
          }),
          focus: !_.isUndefined(focusItemValue) && shallowEqual(focusItemValue, value),
          value: value,
          ref: _this.bindMenuItems.bind(_assertThisInitialized(_this), disabled, groupId + "-" + onlyKey),
          onSelect: _this.handleSelect.bind(_assertThisInitialized(_this), item)
        }, renderMenuItem ? renderMenuItem(label, item) : label);
      });
      return nextItems;
    };

    _this.menuBodyContainerRef = React.createRef();
    return _this;
  }

  var _proto = DropdownMenu.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateScrollPoistion();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!shallowEqual(prevProps.focusItemValue, this.props.focusItemValue)) {
      this.updateScrollPoistion();
    }
  };

  _proto.updateScrollPoistion = function updateScrollPoistion() {
    var container = this.menuBodyContainerRef.current;
    var activeItem = container.querySelector("." + this.addPrefix('item-focus'));

    if (!activeItem) {
      activeItem = container.querySelector("." + this.addPrefix('item-active'));
    }

    if (!activeItem) {
      return;
    }

    var position = getPosition(activeItem, container);
    var sTop = scrollTop(container);
    var sHeight = getHeight(container);

    if (sTop > position.top) {
      scrollTop(container, Math.max(0, position.top - 20));
    } else if (position.top > sTop + sHeight) {
      scrollTop(container, Math.max(0, position.top - sHeight + 32));
    }
  };

  _proto.renderItems = function renderItems() {
    var data = this.props.data;
    this.menuItems = {};
    return this.createMenuItems(data);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        maxHeight = _this$props2.maxHeight,
        className = _this$props2.className,
        style = _this$props2.style,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["maxHeight", "className", "style"]);

    var classes = classNames(this.addPrefix('items'), className);
    var unhandled = getUnhandledProps(DropdownMenu, rest);

    var styles = _extends({}, style, {
      maxHeight: maxHeight
    });

    return React.createElement("div", _extends({}, unhandled, {
      className: classes,
      ref: this.menuBodyContainerRef,
      style: styles
    }), React.createElement("ul", null, this.renderItems()));
  };

  return DropdownMenu;
}(React.Component);

DropdownMenu.propTypes = {
  classPrefix: PropTypes.string,
  data: PropTypes.array,
  group: PropTypes.bool,
  disabledItemValues: PropTypes.array,
  activeItemValues: PropTypes.array,
  focusItemValue: PropTypes.any,
  maxHeight: PropTypes.number,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  renderMenuItem: PropTypes.func,
  renderMenuGroup: PropTypes.func,
  onSelect: PropTypes.func,
  onGroupTitleClick: PropTypes.func,
  dropdownMenuItemComponentClass: PropTypes.elementType,
  dropdownMenuItemClassPrefix: PropTypes.string
};
DropdownMenu.defaultProps = {
  data: [],
  activeItemValues: [],
  disabledItemValues: [],
  maxHeight: 320,
  valueKey: 'value',
  labelKey: 'label'
};
export default defaultProps({
  classPrefix: 'dropdown-menu'
})(DropdownMenu);