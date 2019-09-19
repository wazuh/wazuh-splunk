import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import _ from 'lodash';
import { reactToString, filterNodesOfTree, shallowEqual } from 'rsuite-utils/lib/utils';
import { defaultProps, prefix, getUnhandledProps, createChainedFunction, getDataGroupBy, withPickerMethods } from '../utils';
import IntlProvider from '../IntlProvider';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import { DropdownMenu, DropdownMenuCheckItem as DropdownMenuItem, PickerToggle, getToggleWrapperClassName, onMenuKeyDown, MenuWrapper, SearchBar, SelectedElement, PickerToggleTrigger } from '../Picker';
import { PLACEMENT } from '../constants';

var CheckPicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(CheckPicker, _React$Component);

  function CheckPicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.positionRef = void 0;
    _this.menuContainerRef = void 0;
    _this.toggleRef = void 0;
    _this.triggerRef = void 0;

    _this.getFocusableMenuItems = function () {
      var labelKey = _this.props.labelKey;
      var menuItems = _this.menuContainerRef.current.menuItems;

      if (!menuItems) {
        return [];
      }

      var items = Object.values(menuItems).map(function (item) {
        return item.props.getItemData();
      });
      return filterNodesOfTree(items, function (item) {
        return _this.shouldDisplay(item[labelKey]);
      });
    };

    _this.setStickyItems = function () {
      var _this$props = _this.props,
          sticky = _this$props.sticky,
          data = _this$props.data,
          valueKey = _this$props.valueKey;

      var value = _this.getValue();

      if (!sticky) {
        return;
      }

      var stickyItems = [];

      if (data && value.length) {
        stickyItems = data.filter(function (item) {
          return value.some(function (v) {
            return v === item[valueKey];
          });
        });
      }

      _this.setState({
        stickyItems: stickyItems
      });
    };

    _this.focusNextMenuItem = function () {
      var valueKey = _this.props.valueKey;

      _this.findNode(function (items, index) {
        var focusItem = items[index + 1];

        if (!_.isUndefined(focusItem)) {
          _this.setState({
            focusItemValue: focusItem[valueKey]
          });
        }
      });
    };

    _this.focusPrevMenuItem = function () {
      var valueKey = _this.props.valueKey;

      _this.findNode(function (items, index) {
        var focusItem = items[index - 1];

        if (!_.isUndefined(focusItem)) {
          _this.setState({
            focusItemValue: focusItem[valueKey]
          });
        }
      });
    };

    _this.selectFocusMenuItem = function (event) {
      var value = _this.getValue();

      var _this$props2 = _this.props,
          data = _this$props2.data,
          valueKey = _this$props2.valueKey;
      var focusItemValue = _this.state.focusItemValue;

      if (!focusItemValue) {
        return;
      }

      if (!value.some(function (v) {
        return shallowEqual(v, focusItemValue);
      })) {
        value.push(focusItemValue);
      } else {
        _.remove(value, function (itemVal) {
          return shallowEqual(itemVal, focusItemValue);
        });
      }

      var focusItem = data.find(function (item) {
        return shallowEqual(_.get(item, valueKey), focusItemValue);
      });

      _this.setState({
        value: value
      }, function () {
        _this.handleSelect(value, focusItem, event);

        _this.handleChangeValue(value, event);
      });
    };

    _this.handleKeyDown = function (event) {
      var _this$state = _this.state,
          focusItemValue = _this$state.focusItemValue,
          active = _this$state.active; // enter

      if ((!focusItemValue || !active) && event.keyCode === 13) {
        _this.handleToggleDropdown();
      } // delete


      if (event.keyCode === 8 && event.target === _.get(_assertThisInitialized(_this), 'toggle.toggle')) {
        _this.handleClean(event);
      }

      if (!_this.menuContainerRef.current) {
        return;
      }

      onMenuKeyDown(event, {
        down: _this.focusNextMenuItem,
        up: _this.focusPrevMenuItem,
        enter: _this.selectFocusMenuItem,
        esc: _this.handleCloseDropdown
      });
    };

    _this.handleItemSelect = function (nextItemValue, item, event, checked) {
      var value = _this.getValue();

      if (checked) {
        value.push(nextItemValue);
      } else {
        _.remove(value, function (itemVal) {
          return shallowEqual(itemVal, nextItemValue);
        });
      }

      var nextState = {
        value: value,
        focusItemValue: nextItemValue
      };

      _this.setState(nextState, function () {
        _this.handleSelect(value, item, event);

        _this.handleChangeValue(value, event);
      });
    };

    _this.handleSelect = function (nextItemValue, item, event) {
      var onSelect = _this.props.onSelect;
      onSelect && onSelect(nextItemValue, item, event);
    };

    _this.handleChangeValue = function (value, event) {
      var onChange = _this.props.onChange;
      onChange && onChange(value, event);
    };

    _this.handleSearch = function (searchKeyword, event) {
      var onSearch = _this.props.onSearch;

      _this.setState({
        searchKeyword: searchKeyword,
        focusItemValue: undefined
      });

      onSearch && onSearch(searchKeyword, event);
    };

    _this.handleCloseDropdown = function () {
      var value = _this.getValue();

      if (_this.triggerRef.current) {
        _this.triggerRef.current.hide();
      }

      _this.setState({
        focusItemValue: value ? value[0] : undefined
      });
    };

    _this.handleOpenDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.show();
      }
    };

    _this.handleToggleDropdown = function () {
      var active = _this.state.active;

      if (active) {
        _this.handleCloseDropdown();

        return;
      }

      _this.handleOpenDropdown();
    };

    _this.handleClean = function (event) {
      var _this$props3 = _this.props,
          disabled = _this$props3.disabled,
          cleanable = _this$props3.cleanable;

      if (disabled || !cleanable) {
        return;
      }

      _this.setState({
        value: []
      }, function () {
        _this.handleChangeValue([], event);
      });
    };

    _this.handleExit = function () {
      var onClose = _this.props.onClose;
      onClose && onClose();

      _this.setState({
        searchKeyword: '',
        focusItemValue: null,
        active: false
      });
    };

    _this.handleOpen = function () {
      var onOpen = _this.props.onOpen;
      onOpen && onOpen();

      _this.setState({
        active: true
      });
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.menuContainer = {
      menuItems: null
    };

    _this.getPositionInstance = function () {
      return _this.positionRef.current;
    };

    _this.getToggleInstance = function () {
      return _this.toggleRef.current;
    };

    var _value = props.value,
        defaultValue = props.defaultValue,
        groupBy = props.groupBy,
        _valueKey = props.valueKey,
        _labelKey = props.labelKey;
    var nextValue = _.clone(_value || defaultValue) || [];
    _this.state = {
      value: nextValue,
      // Used to hover the active item  when trigger `onKeydown`
      focusItemValue: nextValue ? nextValue[0] : undefined,
      searchKeyword: ''
    };
    _this.positionRef = React.createRef();
    _this.menuContainerRef = React.createRef();
    _this.toggleRef = React.createRef();
    _this.triggerRef = React.createRef();

    if (groupBy === _valueKey || groupBy === _labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }

    return _this;
  }

  var _proto = CheckPicker.prototype;

  _proto.getValue = function getValue() {
    var value = this.props.value;
    var nextValue = _.isUndefined(value) ? this.state.value : value;
    return _.clone(nextValue) || [];
  };

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  _proto.shouldDisplay = function shouldDisplay(label) {
    var searchKeyword = this.state.searchKeyword;

    if (!_.trim(searchKeyword)) {
      return true;
    }

    var keyword = searchKeyword.toLocaleLowerCase();

    if (typeof label === 'string' || typeof label === 'number') {
      return ("" + label).toLocaleLowerCase().indexOf(keyword) >= 0;
    } else if (React.isValidElement(label)) {
      var nodes = reactToString(label);
      return nodes.join('').toLocaleLowerCase().indexOf(keyword) >= 0;
    }

    return false;
  };

  _proto.findNode = function findNode(focus) {
    var items = this.getFocusableMenuItems();
    var valueKey = this.props.valueKey;
    var focusItemValue = this.state.focusItemValue;

    for (var i = 0; i < items.length; i += 1) {
      if (shallowEqual(focusItemValue, items[i][valueKey])) {
        focus(items, i);
        return;
      }
    }

    focus(items, -1);
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this2 = this;

    var _this$props4 = this.props,
        data = _this$props4.data,
        labelKey = _this$props4.labelKey,
        valueKey = _this$props4.valueKey,
        groupBy = _this$props4.groupBy,
        searchable = _this$props4.searchable,
        renderExtraFooter = _this$props4.renderExtraFooter,
        locale = _this$props4.locale,
        renderMenu = _this$props4.renderMenu,
        menuClassName = _this$props4.menuClassName,
        menuStyle = _this$props4.menuStyle,
        menuAutoWidth = _this$props4.menuAutoWidth,
        sort = _this$props4.sort;
    var _this$state2 = this.state,
        focusItemValue = _this$state2.focusItemValue,
        stickyItems = _this$state2.stickyItems;
    var classes = classNames(this.addPrefix('check-menu'), menuClassName);
    var filteredData = [];
    var filteredStickyItems = [];

    if (stickyItems) {
      filteredStickyItems = filterNodesOfTree(stickyItems, function (item) {
        return _this2.shouldDisplay(item[labelKey]);
      });
      filteredData = filterNodesOfTree(data, function (item) {
        return _this2.shouldDisplay(item[labelKey]) && !stickyItems.some(function (v) {
          return v[valueKey] === item[valueKey];
        });
      });
    } else {
      filteredData = filterNodesOfTree(data, function (item) {
        return _this2.shouldDisplay(item[labelKey]);
      });
    } // Create a tree structure data when set `groupBy`


    if (groupBy) {
      filteredData = getDataGroupBy(filteredData, groupBy, sort);
    } else if (typeof sort === 'function') {
      filteredData = filteredData.sort(sort(false));
    }

    var menuProps = _.pick(this.props, Object.keys(_.omit(DropdownMenu.propTypes, ['className', 'style', 'classPrefix'])));

    var menu = filteredData.length ? React.createElement(DropdownMenu, _extends({}, menuProps, {
      classPrefix: this.addPrefix('check-menu'),
      dropdownMenuItemComponentClass: DropdownMenuItem,
      ref: this.menuContainerRef,
      activeItemValues: this.getValue(),
      focusItemValue: focusItemValue,
      data: [].concat(filteredStickyItems, filteredData),
      group: !_.isUndefined(groupBy),
      onSelect: this.handleItemSelect
    })) : React.createElement("div", {
      className: this.addPrefix('none')
    }, locale.noResultsText);
    return React.createElement(MenuWrapper, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: menuStyle,
      onKeyDown: this.handleKeyDown,
      getToggleInstance: this.getToggleInstance,
      getPositionInstance: this.getPositionInstance
    }, searchable && React.createElement(SearchBar, {
      placeholder: locale.searchPlaceholder,
      onChange: this.handleSearch,
      value: this.state.searchKeyword
    }), renderMenu ? renderMenu(menu) : menu, renderExtraFooter && renderExtraFooter());
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        data = _this$props5.data,
        valueKey = _this$props5.valueKey,
        labelKey = _this$props5.labelKey,
        placeholder = _this$props5.placeholder,
        renderValue = _this$props5.renderValue,
        disabled = _this$props5.disabled,
        cleanable = _this$props5.cleanable,
        locale = _this$props5.locale,
        toggleComponentClass = _this$props5.toggleComponentClass,
        style = _this$props5.style,
        onEnter = _this$props5.onEnter,
        onEntered = _this$props5.onEntered,
        onExited = _this$props5.onExited,
        onClean = _this$props5.onClean,
        countable = _this$props5.countable,
        rest = _objectWithoutPropertiesLoose(_this$props5, ["data", "valueKey", "labelKey", "placeholder", "renderValue", "disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEnter", "onEntered", "onExited", "onClean", "countable"]);

    var unhandled = getUnhandledProps(CheckPicker, rest);
    var value = this.getValue();
    var selectedItems = data.filter(function (item) {
      return value.some(function (val) {
        return shallowEqual(item[valueKey], val);
      });
    }) || [];
    var count = selectedItems.length;
    var hasValue = !!count;
    var selectedElement = placeholder;

    if (count > 0) {
      selectedElement = React.createElement(SelectedElement, {
        selectedItems: selectedItems,
        countable: countable,
        valueKey: valueKey,
        labelKey: labelKey,
        prefix: this.addPrefix
      });

      if (renderValue) {
        selectedElement = renderValue(value, selectedItems, selectedElement);
      }
    }

    var classes = getToggleWrapperClassName('check', this.addPrefix, this.props, hasValue);
    return React.createElement(IntlProvider, {
      locale: locale
    }, React.createElement(PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: this.positionRef,
      onEnter: createChainedFunction(this.setStickyItems, onEnter),
      onEntered: createChainedFunction(this.handleOpen, onEntered),
      onExit: createChainedFunction(this.handleExit, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement("div", {
      className: classes,
      style: style
    }, React.createElement(PickerToggle, _extends({}, unhandled, {
      ref: this.toggleRef,
      onClean: createChainedFunction(this.handleClean, onClean),
      onKeyDown: this.handleKeyDown,
      componentClass: toggleComponentClass,
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active
    }), selectedElement || React.createElement(FormattedMessage, {
      id: "placeholder"
    })))));
  };

  return CheckPicker;
}(React.Component);

CheckPicker.propTypes = {
  appearance: PropTypes.oneOf(['default', 'subtle']),
  data: PropTypes.array,
  locale: PropTypes.object,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  containerPadding: PropTypes.number,
  block: PropTypes.bool,
  toggleComponentClass: PropTypes.elementType,
  menuClassName: PropTypes.string,
  menuStyle: PropTypes.object,
  menuAutoWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledItemValues: PropTypes.array,
  maxHeight: PropTypes.number,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  value: PropTypes.array,
  defaultValue: PropTypes.array,
  renderMenu: PropTypes.func,
  renderMenuItem: PropTypes.func,
  renderMenuGroup: PropTypes.func,
  renderValue: PropTypes.func,
  renderExtraFooter: PropTypes.func,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onGroupTitleClick: PropTypes.func,
  onSearch: PropTypes.func,
  onClean: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onHide: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  groupBy: PropTypes.any,
  sort: PropTypes.func,
  placeholder: PropTypes.node,
  searchable: PropTypes.bool,
  cleanable: PropTypes.bool,
  countable: PropTypes.bool,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  placement: PropTypes.oneOf(PLACEMENT),
  style: PropTypes.object,
  sticky: PropTypes.bool,
  preventOverflow: PropTypes.bool
};
CheckPicker.defaultProps = {
  appearance: 'default',
  data: [],
  disabledItemValues: [],
  maxHeight: 320,
  valueKey: 'value',
  labelKey: 'label',
  locale: {
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  },
  searchable: true,
  cleanable: true,
  countable: true,
  menuAutoWidth: true,
  placement: 'bottomStart'
};
var enhance = compose(defaultProps({
  classPrefix: 'picker'
}), withPickerMethods());
export default enhance(CheckPicker);