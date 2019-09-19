"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _utils = require("../utils");

var _utils2 = require("rsuite-utils/lib/utils");

var _Picker = require("../Picker");

var _constants = require("../constants");

var SelectPicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(SelectPicker, _React$Component);

  function SelectPicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.positionRef = void 0;
    _this.menuContainerRef = void 0;
    _this.searchBarContainerRef = void 0;
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
      return (0, _utils2.filterNodesOfTree)(items, function (item) {
        return _this.shouldDisplay(item[labelKey]);
      });
    };

    _this.getToggleInstance = function () {
      return _this.toggleRef.current;
    };

    _this.getPositionInstance = function () {
      return _this.positionRef.current;
    };

    _this.focusNextMenuItem = function () {
      var valueKey = _this.props.valueKey;

      _this.findNode(function (items, index) {
        var focusItem = items[index + 1];

        if (!_lodash.default.isUndefined(focusItem)) {
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

        if (!_lodash.default.isUndefined(focusItem)) {
          _this.setState({
            focusItemValue: focusItem[valueKey]
          });
        }
      });
    };

    _this.selectFocusMenuItem = function (event) {
      var focusItemValue = _this.state.focusItemValue;
      var _this$props = _this.props,
          data = _this$props.data,
          valueKey = _this$props.valueKey;

      if (!focusItemValue) {
        return;
      } // Find active `MenuItem` by `value`


      var focusItem = (0, _utils2.findNodeOfTree)(data, function (item) {
        return (0, _utils2.shallowEqual)(item[valueKey], focusItemValue);
      });

      _this.setState({
        value: focusItemValue
      }, function () {
        _this.handleSelect(focusItemValue, focusItem, event);

        _this.handleChange(focusItemValue, event);
      });

      _this.handleCloseDropdown();
    };

    _this.handleKeyDown = function (event) {
      var _this$state = _this.state,
          focusItemValue = _this$state.focusItemValue,
          active = _this$state.active; // enter

      if ((!focusItemValue || !active) && event.keyCode === 13) {
        _this.handleToggleDropdown();
      } // delete


      if (event.keyCode === 8 && event.target === _lodash.default.get((0, _assertThisInitialized2.default)(_this), 'toggle.toggle')) {
        _this.handleClean(event);
      }

      if (!_this.menuContainerRef.current) {
        return;
      }

      (0, _Picker.onMenuKeyDown)(event, {
        down: _this.focusNextMenuItem,
        up: _this.focusPrevMenuItem,
        enter: _this.selectFocusMenuItem,
        esc: _this.handleCloseDropdown
      });
    };

    _this.handleItemSelect = function (value, item, event) {
      var nextState = {
        value: value,
        focusItemValue: value
      };

      _this.setState(nextState, function () {
        _this.handleSelect(value, item, event);

        _this.handleChange(value, event);
      });

      _this.handleCloseDropdown();
    };

    _this.handleSelect = function (value, item, event) {
      var onSelect = _this.props.onSelect;
      onSelect && onSelect(value, item, event);

      if (_this.toggleRef.current) {
        _this.toggleRef.current.onFocus();
      }
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
      if (_this.triggerRef.current) {
        _this.triggerRef.current.hide();
      }
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

    _this.handleChange = function (value, event) {
      var onChange = _this.props.onChange;
      onChange && onChange(value, event);
    };

    _this.handleClean = function (event) {
      var _this$props2 = _this.props,
          disabled = _this$props2.disabled,
          cleanable = _this$props2.cleanable;

      if (disabled || !cleanable) {
        return;
      }

      var nextState = {
        value: null,
        focusItemValue: null
      };

      _this.setState(nextState, function () {
        _this.handleChange(null, event);
      });
    };

    _this.handleExit = function () {
      var onClose = _this.props.onClose;

      _this.setState({
        searchKeyword: '',
        active: false
      });

      onClose && onClose();
    };

    _this.handleOpen = function () {
      var onOpen = _this.props.onOpen;

      var value = _this.getValue();

      _this.setState({
        active: true,
        focusItemValue: value
      });

      onOpen && onOpen();
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    var _value = props.value,
        defaultValue = props.defaultValue,
        groupBy = props.groupBy,
        _valueKey = props.valueKey,
        _labelKey = props.labelKey;
    var nextValue = _value || defaultValue;
    _this.state = {
      value: nextValue,
      focusItemValue: nextValue,
      searchKeyword: ''
    };
    _this.positionRef = React.createRef();
    _this.menuContainerRef = React.createRef();
    _this.toggleRef = React.createRef();
    _this.triggerRef = React.createRef(); // for test

    _this.searchBarContainerRef = React.createRef();

    if (groupBy === _valueKey || groupBy === _labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }

    return _this;
  }

  var _proto = SelectPicker.prototype;

  _proto.getValue = function getValue() {
    var value = this.props.value;
    return _lodash.default.isUndefined(value) ? this.state.value : value;
  };

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  _proto.shouldDisplay = function shouldDisplay(label) {
    var searchKeyword = this.state.searchKeyword;

    if (!_lodash.default.trim(searchKeyword)) {
      return true;
    }

    var keyword = searchKeyword.toLocaleLowerCase();

    if (typeof label === 'string' || typeof label === 'number') {
      return ("" + label).toLocaleLowerCase().indexOf(keyword) >= 0;
    } else if (React.isValidElement(label)) {
      var nodes = (0, _utils2.reactToString)(label);
      return nodes.join('').toLocaleLowerCase().indexOf(keyword) >= 0;
    }

    return false;
  };

  _proto.findNode = function findNode(focus) {
    var items = this.getFocusableMenuItems();
    var valueKey = this.props.valueKey;
    var focusItemValue = this.state.focusItemValue;

    for (var i = 0; i < items.length; i += 1) {
      if ((0, _utils2.shallowEqual)(focusItemValue, items[i][valueKey])) {
        focus(items, i);
        return;
      }
    }

    focus(items, -1);
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this2 = this;

    var _this$props3 = this.props,
        data = _this$props3.data,
        labelKey = _this$props3.labelKey,
        groupBy = _this$props3.groupBy,
        searchable = _this$props3.searchable,
        locale = _this$props3.locale,
        renderMenu = _this$props3.renderMenu,
        renderExtraFooter = _this$props3.renderExtraFooter,
        menuClassName = _this$props3.menuClassName,
        menuStyle = _this$props3.menuStyle,
        menuAutoWidth = _this$props3.menuAutoWidth,
        sort = _this$props3.sort;
    var focusItemValue = this.state.focusItemValue;
    var classes = (0, _classnames.default)(this.addPrefix('select-menu'), menuClassName);
    var filteredData = (0, _utils2.filterNodesOfTree)(data, function (item) {
      return _this2.shouldDisplay(item[labelKey]);
    }); // Create a tree structure data when set `groupBy`

    if (groupBy) {
      filteredData = (0, _utils.getDataGroupBy)(filteredData, groupBy, sort);
    } else if (typeof sort === 'function') {
      filteredData = filteredData.sort(sort(false));
    }

    var menuProps = _lodash.default.pick(this.props, Object.keys(_lodash.default.omit(_Picker.DropdownMenu.propTypes, ['className', 'style', 'classPrefix'])));

    var menu = filteredData.length ? React.createElement(_Picker.DropdownMenu, (0, _extends2.default)({}, menuProps, {
      classPrefix: this.addPrefix('select-menu'),
      dropdownMenuItemClassPrefix: this.addPrefix('select-menu-item'),
      dropdownMenuItemComponentClass: _Picker.DropdownMenuItem,
      ref: this.menuContainerRef,
      activeItemValues: [this.getValue()],
      focusItemValue: focusItemValue,
      data: filteredData,
      group: !_lodash.default.isUndefined(groupBy),
      onSelect: this.handleItemSelect
    })) : React.createElement("div", {
      className: this.addPrefix('none')
    }, locale.noResultsText);
    return React.createElement(_Picker.MenuWrapper, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: menuStyle,
      onKeyDown: this.handleKeyDown,
      getToggleInstance: this.getToggleInstance,
      getPositionInstance: this.getPositionInstance
    }, searchable && React.createElement(_Picker.SearchBar, {
      ref: this.searchBarContainerRef,
      placeholder: locale.searchPlaceholder,
      onChange: this.handleSearch,
      value: this.state.searchKeyword
    }), renderMenu ? renderMenu(menu) : menu, renderExtraFooter && renderExtraFooter());
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        data = _this$props4.data,
        valueKey = _this$props4.valueKey,
        labelKey = _this$props4.labelKey,
        placeholder = _this$props4.placeholder,
        renderValue = _this$props4.renderValue,
        disabled = _this$props4.disabled,
        cleanable = _this$props4.cleanable,
        locale = _this$props4.locale,
        toggleComponentClass = _this$props4.toggleComponentClass,
        style = _this$props4.style,
        onEntered = _this$props4.onEntered,
        onExited = _this$props4.onExited,
        onClean = _this$props4.onClean,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props4, ["data", "valueKey", "labelKey", "placeholder", "renderValue", "disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEntered", "onExited", "onClean"]);
    var unhandled = (0, _utils.getUnhandledProps)(SelectPicker, rest);
    var value = this.getValue(); // Find active `MenuItem` by `value`

    var activeItem = (0, _utils2.findNodeOfTree)(data, function (item) {
      return (0, _utils2.shallowEqual)(item[valueKey], value);
    });
    var hasValue = !!activeItem;
    var selectedElement = placeholder;

    if (activeItem && activeItem[labelKey]) {
      selectedElement = activeItem[labelKey];

      if (renderValue) {
        selectedElement = renderValue(value, activeItem, selectedElement);
      }
    }

    var classes = (0, _Picker.getToggleWrapperClassName)('select', this.addPrefix, this.props, hasValue);
    return React.createElement(_Picker.PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: this.positionRef,
      onEntered: (0, _utils.createChainedFunction)(this.handleOpen, onEntered),
      onExit: (0, _utils.createChainedFunction)(this.handleExit, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement("div", {
      className: classes,
      style: style,
      tabIndex: -1,
      role: "menu"
    }, React.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, unhandled, {
      ref: this.toggleRef,
      onClean: (0, _utils.createChainedFunction)(this.handleClean, onClean),
      onKeyDown: this.handleKeyDown,
      componentClass: toggleComponentClass,
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active
    }), selectedElement || locale.placeholder)));
  };

  return SelectPicker;
}(React.Component);

SelectPicker.propTypes = {
  appearance: _propTypes.default.oneOf(['default', 'subtle']),
  data: _propTypes.default.array,
  locale: _propTypes.default.object,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  container: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  containerPadding: _propTypes.default.number,
  block: _propTypes.default.bool,
  toggleComponentClass: _propTypes.default.elementType,
  menuClassName: _propTypes.default.string,
  menuStyle: _propTypes.default.object,
  menuAutoWidth: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  disabledItemValues: _propTypes.default.array,
  maxHeight: _propTypes.default.number,
  valueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  value: _propTypes.default.any,
  defaultValue: _propTypes.default.any,
  renderMenu: _propTypes.default.func,
  renderMenuItem: _propTypes.default.func,
  renderMenuGroup: _propTypes.default.func,
  renderValue: _propTypes.default.func,
  renderExtraFooter: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onGroupTitleClick: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  onClean: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onHide: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func,

  /**
   * group by key in `data`
   */
  groupBy: _propTypes.default.any,
  sort: _propTypes.default.func,
  placeholder: _propTypes.default.node,
  searchable: _propTypes.default.bool,
  cleanable: _propTypes.default.bool,
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  placement: _propTypes.default.oneOf(_constants.PLACEMENT),
  style: _propTypes.default.object,

  /**
   * Prevent floating element overflow
   */
  preventOverflow: _propTypes.default.bool
};
SelectPicker.defaultProps = {
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
  menuAutoWidth: true,
  placement: 'bottomStart'
};
var enhance = (0, _compose.default)((0, _utils.defaultProps)({
  classPrefix: 'picker'
}), (0, _utils.withPickerMethods)());

var _default = enhance(SelectPicker);

exports.default = _default;
module.exports = exports.default;