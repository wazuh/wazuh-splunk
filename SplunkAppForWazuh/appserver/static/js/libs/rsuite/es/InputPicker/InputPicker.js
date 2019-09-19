import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import compose from 'recompose/compose';
import { getWidth } from 'dom-lib';
import { reactToString, filterNodesOfTree, findNodeOfTree, shallowEqual } from 'rsuite-utils/lib/utils';
import { defaultProps, prefix, getUnhandledProps, createChainedFunction, tplTransform, getDataGroupBy, withPickerMethods } from '../utils';
import { DropdownMenu, DropdownMenuItem, DropdownMenuCheckItem, getToggleWrapperClassName, onMenuKeyDown, PickerToggle, MenuWrapper, PickerToggleTrigger } from '../Picker';
import InputAutosize from './InputAutosize';
import InputSearch from './InputSearch';
import Tag from '../Tag';
import { PLACEMENT } from '../constants';

var InputPicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InputPicker, _React$Component);

  InputPicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data && !shallowEqual(nextProps.data, prevState.data)) {
      return {
        data: nextProps.data,
        focusItemValue: _.get(nextProps, "data.0." + nextProps.valueKey)
      };
    }

    return null;
  };

  function InputPicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuContainerRef = void 0;
    _this.positionRef = void 0;
    _this.toggleWrapperRef = void 0;
    _this.toggleRef = void 0;
    _this.triggerRef = void 0;
    _this.inputRef = void 0;

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

    _this.getToggleInstance = function () {
      return _this.toggleRef.current;
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

    _this.handleKeyDown = function (event) {
      if (!_this.menuContainerRef.current) {
        return;
      }

      var multi = _this.props.multi;
      onMenuKeyDown(event, {
        down: _this.focusNextMenuItem,
        up: _this.focusPrevMenuItem,
        enter: multi ? _this.selectFocusMenuCheckItem : _this.selectFocusMenuItem,
        esc: _this.handleCloseDropdown,
        del: multi ? _this.removeLastItem : _this.handleClean
      });
    };

    _this.handleClick = function () {
      _this.focusInput();
    };

    _this.selectFocusMenuItem = function (event) {
      var _this$state = _this.state,
          focusItemValue = _this$state.focusItemValue,
          searchKeyword = _this$state.searchKeyword;
      var _this$props = _this.props,
          valueKey = _this$props.valueKey,
          data = _this$props.data,
          disabledItemValues = _this$props.disabledItemValues;

      if (!focusItemValue || !data) {
        return;
      } // If the value is disabled in this option, it is returned.


      if (disabledItemValues && disabledItemValues.some(function (item) {
        return item === focusItemValue;
      })) {
        return;
      } // Find active `MenuItem` by `value`


      var focusItem = findNodeOfTree(_this.getAllData(), function (item) {
        return shallowEqual(item[valueKey], focusItemValue);
      });

      if (!focusItem && focusItemValue === searchKeyword) {
        focusItem = _this.createOption(searchKeyword);
      }

      _this.setState({
        value: focusItemValue,
        searchKeyword: ''
      });

      _this.handleSelect(focusItemValue, focusItem, event);

      _this.handleChange(focusItemValue, event);

      _this.handleCloseDropdown();
    };

    _this.selectFocusMenuCheckItem = function (event) {
      var _this$props2 = _this.props,
          valueKey = _this$props2.valueKey,
          disabledItemValues = _this$props2.disabledItemValues;
      var focusItemValue = _this.state.focusItemValue;

      var value = _this.getValue();

      var data = _this.getAllData();

      if (!focusItemValue || !data) {
        return;
      } // If the value is disabled in this option, it is returned.


      if (disabledItemValues && disabledItemValues.some(function (item) {
        return item === focusItemValue;
      })) {
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

      if (!focusItem) {
        focusItem = _this.createOption(focusItemValue);
      }

      _this.setState({
        value: value,
        searchKeyword: ''
      }, _this.updatePosition);

      _this.handleSelect(value, focusItem, event);

      _this.handleChange(value, event);
    };

    _this.handleItemSelect = function (value, item, event) {
      var nextState = {
        value: value,
        focusItemValue: value,
        searchKeyword: ''
      };

      _this.setState(nextState);

      _this.handleSelect(value, item, event);

      _this.handleChange(value, event);

      _this.handleCloseDropdown();
    };

    _this.handleCheckItemSelect = function (nextItemValue, item, event, checked) {
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
        searchKeyword: '',
        focusItemValue: nextItemValue
      };

      _this.setState(nextState, _this.updatePosition);

      _this.handleSelect(value, item, event);

      _this.handleChange(value, event);

      _this.focusInput();
    };

    _this.handleSelect = function (value, item, event) {
      var _this$props3 = _this.props,
          onSelect = _this$props3.onSelect,
          creatable = _this$props3.creatable;
      var newData = _this.state.newData;
      onSelect && onSelect(value, item, event);

      if (creatable && item.create) {
        delete item.create;

        _this.setState({
          newData: newData.concat(item)
        });
      }
    };

    _this.handleSearch = function (searchKeyword, event) {
      var _this$props4 = _this.props,
          onSearch = _this$props4.onSearch,
          labelKey = _this$props4.labelKey,
          valueKey = _this$props4.valueKey;
      var filteredData = filterNodesOfTree(_this.getAllData(), function (item) {
        return _this.shouldDisplay(item[labelKey], searchKeyword);
      });
      var nextState = {
        searchKeyword: searchKeyword,
        focusItemValue: filteredData.length ? filteredData[0][valueKey] : searchKeyword
      };

      _this.setState(nextState, _this.updatePosition);

      onSearch && onSearch(searchKeyword, event);
    };

    _this.handleOpenDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.show();
      }
    };

    _this.handleCloseDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.hide();
      }
    };

    _this.handleChange = function (value, event) {
      var onChange = _this.props.onChange;
      onChange && onChange(value, event);
    };

    _this.handleClean = function (event) {
      var _this$props5 = _this.props,
          disabled = _this$props5.disabled,
          onClean = _this$props5.onClean;
      var searchKeyword = _this.state.searchKeyword;

      if (disabled || searchKeyword !== '') {
        return;
      }

      var nextState = {
        value: null,
        focusItemValue: null,
        searchKeyword: ''
      };

      _this.setState(nextState, function () {
        _this.handleChange(null, event);

        _this.updatePosition();
      });

      onClean && onClean(event);
    };

    _this.handleEntered = function () {
      var onOpen = _this.props.onOpen;
      onOpen && onOpen();
    };

    _this.handleExited = function () {
      var _this$props6 = _this.props,
          onClose = _this$props6.onClose,
          multi = _this$props6.multi;

      var value = _this.getValue();

      var nextState = {
        focusItemValue: multi ? _.get(value, 0) : value
      };

      if (multi) {
        /**
         在多选的情况下, 当 searchKeyword 过长，在 focus 的时候会导致内容换行。
         把 searchKeyword 清空是为了，Menu 在展开时候位置正确。
         */
        nextState.searchKeyword = '';
      }

      onClose && onClose();

      _this.setState(nextState);
    };

    _this.handleEnter = function () {
      _this.focusInput();

      _this.setState({
        open: true
      });
    };

    _this.handleExit = function () {
      _this.blurInput();

      _this.setState({
        open: false
      });
    };

    _this.handleRemoveItemByTag = function (tag, event) {
      event.stopPropagation();

      var value = _this.getValue();

      _.remove(value, function (itemVal) {
        return shallowEqual(itemVal, tag);
      });

      _this.setState({
        value: value
      }, _this.updatePosition);

      _this.handleChange(value, event);
    };

    _this.removeLastItem = function (event) {
      var tagName = _.get(event, 'target.tagName');

      if (tagName !== 'INPUT') {
        _this.focusInput();

        return;
      }

      if (tagName === 'INPUT' && _.get(event, 'target.value')) {
        return;
      }

      var value = _this.getValue();

      value.pop();

      _this.setState({
        value: value
      }, _this.updatePosition);

      _this.handleChange(value, event);
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.renderMenuItem = function (label, item) {
      var _this$props7 = _this.props,
          locale = _this$props7.locale,
          renderMenuItem = _this$props7.renderMenuItem;
      var newLabel = item.create ? React.createElement("span", null, tplTransform(locale.createOption, label)) : label;
      return renderMenuItem ? renderMenuItem(newLabel, item) : newLabel;
    };

    var defaultValue = props.defaultValue,
        groupBy = props.groupBy,
        _valueKey = props.valueKey,
        _labelKey = props.labelKey,
        defaultOpen = props.defaultOpen,
        _multi = props.multi,
        _data = props.data;

    var _value = _multi ? defaultValue || [] : defaultValue;

    var _focusItemValue = _multi ? _.get(_value, 0) : defaultValue;

    _this.state = {
      data: _data,
      value: _value,
      focusItemValue: _focusItemValue,
      searchKeyword: '',
      newData: [],
      open: defaultOpen,
      maxWidth: 100
    };

    if (groupBy === _valueKey || groupBy === _labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }

    _this.menuContainerRef = React.createRef();
    _this.positionRef = React.createRef();
    _this.toggleWrapperRef = React.createRef();
    _this.toggleRef = React.createRef();
    _this.triggerRef = React.createRef();
    _this.inputRef = React.createRef();
    return _this;
  }

  var _proto = InputPicker.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.toggleWrapperRef.current) {
      var maxWidth = getWidth(this.toggleWrapperRef.current);
      this.setState({
        maxWidth: maxWidth
      });
    }
  };

  _proto.getValue = function getValue() {
    var _this$props8 = this.props,
        value = _this$props8.value,
        multi = _this$props8.multi;
    var nextValue = _.isUndefined(value) ? this.state.value : value;

    if (multi) {
      return _.clone(nextValue) || [];
    }

    return nextValue;
  };

  _proto.getAllData = function getAllData() {
    var data = this.props.data;
    var newData = this.state.newData;
    return [].concat(data, newData);
  };

  _proto.getAllDataAndCache = function getAllDataAndCache() {
    var cacheData = this.props.cacheData;
    var data = this.getAllData();
    return [].concat(data, cacheData);
  };

  _proto.getLabelByValue = function getLabelByValue(value) {
    var _this$props9 = this.props,
        renderValue = _this$props9.renderValue,
        placeholder = _this$props9.placeholder,
        valueKey = _this$props9.valueKey,
        labelKey = _this$props9.labelKey; // Find active `MenuItem` by `value`

    var activeItem = findNodeOfTree(this.getAllDataAndCache(), function (item) {
      return shallowEqual(item[valueKey], value);
    });
    var displayElement = placeholder;

    if (_.get(activeItem, labelKey)) {
      displayElement = _.get(activeItem, labelKey);

      if (renderValue) {
        displayElement = renderValue(value, activeItem, displayElement);
      }
    }

    return {
      isValid: !!activeItem,
      displayElement: displayElement
    };
  };

  _proto.createOption = function createOption(value) {
    var _ref2;

    var _this$props10 = this.props,
        valueKey = _this$props10.valueKey,
        labelKey = _this$props10.labelKey,
        groupBy = _this$props10.groupBy,
        locale = _this$props10.locale;

    if (groupBy) {
      var _ref;

      return _ref = {
        create: true
      }, _ref[groupBy] = locale.newItem, _ref[valueKey] = value, _ref[labelKey] = value, _ref;
    }

    return _ref2 = {
      create: true
    }, _ref2[valueKey] = value, _ref2[labelKey] = value, _ref2;
  };

  _proto.focusInput = function focusInput() {
    var input = this.getInput();
    if (!input) return;
    input.focus();
  };

  _proto.blurInput = function blurInput() {
    var input = this.getInput();
    if (!input) return;
    input.blur();
  };

  _proto.getInput = function getInput() {
    var multi = this.props.multi;

    if (multi) {
      return this.inputRef.current.getInputInstance();
    }

    return this.inputRef.current;
  };

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  _proto.shouldDisplay = function shouldDisplay(label, searchKeyword) {
    var word = typeof searchKeyword === 'undefined' ? this.state.searchKeyword : searchKeyword;

    if (!_.trim(word)) {
      return true;
    }

    var keyword = word.toLocaleLowerCase();

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

  _proto.updatePosition = function updatePosition() {
    if (this.positionRef.current) {
      this.positionRef.current.updatePosition(true);
    }
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this2 = this;

    var _this$props11 = this.props,
        labelKey = _this$props11.labelKey,
        groupBy = _this$props11.groupBy,
        locale = _this$props11.locale,
        renderMenu = _this$props11.renderMenu,
        renderExtraFooter = _this$props11.renderExtraFooter,
        menuClassName = _this$props11.menuClassName,
        menuStyle = _this$props11.menuStyle,
        menuAutoWidth = _this$props11.menuAutoWidth,
        creatable = _this$props11.creatable,
        valueKey = _this$props11.valueKey,
        multi = _this$props11.multi,
        sort = _this$props11.sort;
    var _this$state2 = this.state,
        focusItemValue = _this$state2.focusItemValue,
        searchKeyword = _this$state2.searchKeyword;
    var menuClassPrefix = this.addPrefix(multi ? 'check-menu' : 'select-menu');
    var classes = classNames(menuClassPrefix, menuClassName);
    var allData = this.getAllData();
    var filteredData = filterNodesOfTree(allData, function (item) {
      return _this2.shouldDisplay(item[labelKey]);
    });

    if (creatable && searchKeyword && !findNodeOfTree(allData, function (item) {
      return item[valueKey] === searchKeyword;
    })) {
      filteredData = [].concat(filteredData, [this.createOption(searchKeyword)]);
    } // Create a tree structure data when set `groupBy`


    if (groupBy) {
      filteredData = getDataGroupBy(filteredData, groupBy, sort);
    } else if (typeof sort === 'function') {
      filteredData = filteredData.sort(sort(false));
    }

    var menuProps = _.pick(this.props, Object.keys(_.omit(DropdownMenu.propTypes, ['className', 'style', 'classPrefix'])));

    var value = this.getValue();
    var menu = filteredData.length ? React.createElement(DropdownMenu, _extends({}, menuProps, {
      classPrefix: menuClassPrefix,
      dropdownMenuItemClassPrefix: multi ? undefined : menuClassPrefix + "-item",
      dropdownMenuItemComponentClass: multi ? DropdownMenuCheckItem : DropdownMenuItem,
      ref: this.menuContainerRef,
      activeItemValues: multi ? value : [value],
      focusItemValue: focusItemValue,
      data: filteredData,
      group: !_.isUndefined(groupBy),
      onSelect: multi ? this.handleCheckItemSelect : this.handleItemSelect,
      renderMenuItem: this.renderMenuItem
    })) : React.createElement("div", {
      className: this.addPrefix('none')
    }, locale.noResultsText);
    return React.createElement(MenuWrapper, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: menuStyle,
      getToggleInstance: this.getToggleInstance,
      onKeyDown: this.handleKeyDown
    }, renderMenu ? renderMenu(menu) : menu, renderExtraFooter && renderExtraFooter());
  };

  _proto.renderSingleValue = function renderSingleValue() {
    var value = this.getValue();
    return this.getLabelByValue(value);
  };

  _proto.renderMultiValue = function renderMultiValue() {
    var _this3 = this;

    var _this$props12 = this.props,
        multi = _this$props12.multi,
        disabled = _this$props12.disabled;

    if (!multi) {
      return null;
    }

    var tags = this.getValue() || [];
    return tags.map(function (tag) {
      var _this3$getLabelByValu = _this3.getLabelByValue(tag),
          isValid = _this3$getLabelByValu.isValid,
          displayElement = _this3$getLabelByValu.displayElement;

      if (!isValid) {
        return null;
      }

      return React.createElement(Tag, {
        key: tag,
        closable: !disabled,
        title: typeof displayElement === 'string' ? displayElement : undefined,
        onClose: _this3.handleRemoveItemByTag.bind(_this3, tag)
      }, displayElement);
    }).filter(function (item) {
      return item !== null;
    });
  };

  _proto.renderInputSearch = function renderInputSearch() {
    var _this$props13 = this.props,
        multi = _this$props13.multi,
        onBlur = _this$props13.onBlur,
        onFocus = _this$props13.onFocus;
    var props = {
      onBlur: onBlur,
      onFocus: onFocus,
      componentClass: 'input',
      inputRef: this.inputRef
    };

    if (multi) {
      props.componentClass = InputAutosize; // 52 = 55 (right padding)  - 2 (border) - 6 (left padding)

      props.inputStyle = {
        maxWidth: this.state.maxWidth - 63
      };
    }

    return React.createElement(InputSearch, _extends({}, props, {
      onChange: this.handleSearch,
      value: this.state.open ? this.state.searchKeyword : ''
    }));
  };

  _proto.render = function render() {
    var _getToggleWrapperClas;

    var _this$props14 = this.props,
        disabled = _this$props14.disabled,
        cleanable = _this$props14.cleanable,
        locale = _this$props14.locale,
        toggleComponentClass = _this$props14.toggleComponentClass,
        style = _this$props14.style,
        onEnter = _this$props14.onEnter,
        onEntered = _this$props14.onEntered,
        onExit = _this$props14.onExit,
        onExited = _this$props14.onExited,
        onClean = _this$props14.onClean,
        searchable = _this$props14.searchable,
        multi = _this$props14.multi,
        rest = _objectWithoutPropertiesLoose(_this$props14, ["disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEnter", "onEntered", "onExit", "onExited", "onClean", "searchable", "multi"]);

    var unhandled = getUnhandledProps(InputPicker, rest);

    var _this$renderSingleVal = this.renderSingleValue(),
        isValid = _this$renderSingleVal.isValid,
        displayElement = _this$renderSingleVal.displayElement;

    var tagElements = this.renderMultiValue();
    var hasValue = multi ? !!_.get(tagElements, 'length') : isValid;
    var classes = getToggleWrapperClassName('input', this.addPrefix, this.props, hasValue, (_getToggleWrapperClas = {}, _getToggleWrapperClas[this.addPrefix('tag')] = multi, _getToggleWrapperClas[this.addPrefix('focused')] = this.state.open, _getToggleWrapperClas));
    var searching = !!this.state.searchKeyword && this.state.open;
    var displaySearchInput = searchable && !disabled;
    return React.createElement(PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: this.positionRef,
      trigger: "active",
      onEnter: createChainedFunction(this.handleEnter, onEnter),
      onEntered: createChainedFunction(this.handleEntered, onEntered),
      onExit: createChainedFunction(this.handleExit, onExit),
      onExited: createChainedFunction(this.handleExited, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement("div", {
      className: classes,
      style: style,
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick,
      ref: this.toggleWrapperRef
    }, React.createElement(PickerToggle, _extends({}, unhandled, {
      tabIndex: null,
      ref: this.toggleRef,
      componentClass: toggleComponentClass,
      onClean: this.handleClean,
      cleanable: cleanable && !disabled,
      hasValue: hasValue
    }), searching || multi && hasValue ? null : displayElement || locale.placeholder), React.createElement("div", {
      className: this.addPrefix('tag-wrapper')
    }, tagElements, displaySearchInput && this.renderInputSearch())));
  };

  return InputPicker;
}(React.Component);

InputPicker.propTypes = {
  data: PropTypes.array,
  cacheData: PropTypes.array,
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
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.node,
  searchable: PropTypes.bool,
  cleanable: PropTypes.bool,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  placement: PropTypes.oneOf(PLACEMENT),
  style: PropTypes.object,
  creatable: PropTypes.bool,
  multi: PropTypes.bool,
  preventOverflow: PropTypes.bool,
  groupBy: PropTypes.any,
  sort: PropTypes.func,
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
  onExited: PropTypes.func
};
InputPicker.defaultProps = {
  data: [],
  cacheData: [],
  disabledItemValues: [],
  maxHeight: 320,
  valueKey: 'value',
  labelKey: 'label',
  locale: {
    placeholder: 'Select',
    noResultsText: 'No results found',
    newItem: 'New item',
    createOption: 'Create option "{0}"'
  },
  searchable: true,
  cleanable: true,
  menuAutoWidth: true,
  placement: 'bottomStart'
};
var enhance = compose(defaultProps({
  classPrefix: 'picker'
}), withPickerMethods());
export default enhance(InputPicker);