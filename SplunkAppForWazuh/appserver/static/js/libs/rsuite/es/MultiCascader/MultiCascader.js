import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import _ from 'lodash';
import { shallowEqualArray } from 'rsuite-utils/lib/utils';
import { polyfill } from 'react-lifecycles-compat';
import DropdownMenu from './DropdownMenu';
import Checkbox from '../Checkbox';
import createUtils from './utils';
import { flattenTree, getNodeParents } from '../utils/treeUtils';
import { PLACEMENT } from '../constants';
import { defaultProps, prefix, getUnhandledProps, createChainedFunction, withPickerMethods } from '../utils';
import { PickerToggle, MenuWrapper, SearchBar, SelectedElement, PickerToggleTrigger, getToggleWrapperClassName, createConcatChildrenFunction } from '../Picker';

var MultiCascader =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MultiCascader, _React$Component);

  function MultiCascader(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.isControlled = null;
    _this.menuContainerRef = void 0;
    _this.positionRef = void 0;
    _this.triggerRef = void 0;

    _this.handleCheck = function (item, event, checked) {
      var _this$props = _this.props,
          valueKey = _this$props.valueKey,
          onChange = _this$props.onChange,
          cascade = _this$props.cascade,
          uncheckableItemValues = _this$props.uncheckableItemValues;
      var itemValue = item[valueKey];
      var value = [];

      if (cascade) {
        value = MultiCascader.utils.splitValue(item, checked, _this.getValue(), uncheckableItemValues).value;
      } else {
        value = _this.getValue();

        if (checked) {
          value.push(itemValue);
        } else {
          value = value.filter(function (n) {
            return n !== itemValue;
          });
        }
      }

      _this.setState({
        value: value
      });

      onChange && onChange(value, event);
    };

    _this.handleChangeForSearchItem = function (value, checked, event) {
      _this.handleCheck(value, event, checked);
    };

    _this.handleSelect = function (node, cascadeItems, activePaths, event) {
      var _this$props2 = _this.props,
          onSelect = _this$props2.onSelect,
          valueKey = _this$props2.valueKey;

      _this.setState({
        selectNode: node,
        items: cascadeItems,
        activePaths: activePaths
      }, function () {
        if (_this.positionRef.current) {
          _this.positionRef.current.updatePosition();
        }
      });

      onSelect && onSelect(node, activePaths, createConcatChildrenFunction(node, node[valueKey]), event);
    };

    _this.handleSearch = function (searchKeyword, event) {
      var onSearch = _this.props.onSearch;

      _this.setState({
        searchKeyword: searchKeyword
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

    _this.handleClean = function (event) {
      var _this$props3 = _this.props,
          disabled = _this$props3.disabled,
          onChange = _this$props3.onChange,
          data = _this$props3.data;

      if (disabled) {
        return;
      }

      var nextState = {
        items: [data],
        value: [],
        selectNode: null,
        activePaths: []
      };

      _this.setState(nextState, function () {
        onChange && onChange([], event);
      });
    };

    _this.handleEntered = function () {
      var onOpen = _this.props.onOpen;
      onOpen && onOpen();

      _this.setState({
        active: true
      });
    };

    _this.handleExit = function () {
      var onClose = _this.props.onClose;
      onClose && onClose();

      _this.setState({
        searchKeyword: '',
        active: false
      });
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.renderSearchRow = function (item, key) {
      var _extends2, _classNames;

      var _this$props4 = _this.props,
          labelKey = _this$props4.labelKey,
          valueKey = _this$props4.valueKey,
          cascade = _this$props4.cascade,
          _this$props4$disabled = _this$props4.disabledItemValues,
          disabledItemValues = _this$props4$disabled === void 0 ? [] : _this$props4$disabled;
      var searchKeyword = _this.state.searchKeyword;

      var values = _this.getValue();

      var nodes = getNodeParents(item);
      var regx = new RegExp(searchKeyword, 'ig');
      var labelElements = [];
      var a = item[labelKey].split(regx);
      var b = item[labelKey].match(regx);

      for (var i = 0; i < a.length; i++) {
        labelElements.push(a[i]);

        if (b[i]) {
          labelElements.push(React.createElement("strong", {
            key: i
          }, b[i]));
        }
      }

      nodes.push(_extends({}, item, (_extends2 = {}, _extends2[labelKey] = labelElements, _extends2)));
      var active = values.some(function (value) {
        if (cascade) {
          return nodes.some(function (node) {
            return node[valueKey] === value;
          });
        }

        return item[valueKey] === value;
      });
      var disabled = disabledItemValues.some(function (value) {
        return nodes.some(function (node) {
          return node[valueKey] === value;
        });
      });
      var itemClasses = classNames(_this.addPrefix('cascader-row'), (_classNames = {}, _classNames[_this.addPrefix('cascader-row-disabled')] = disabled, _classNames));
      return React.createElement("div", {
        key: key,
        className: itemClasses
      }, React.createElement(Checkbox, {
        disabled: disabled,
        checked: active,
        value: item,
        indeterminate: cascade && !active && MultiCascader.utils.isSomeChildChecked(item, values),
        onChange: _this.handleChangeForSearchItem
      }, React.createElement("span", {
        className: _this.addPrefix('cascader-cols')
      }, nodes.map(function (node, index) {
        return React.createElement("span", {
          key: "col-" + index,
          className: _this.addPrefix('cascader-col')
        }, node[labelKey]);
      }))));
    };

    var _data = props.data,
        _value = props.value,
        defaultValue = props.defaultValue;
    var initState = {
      data: _data,
      searchKeyword: '',
      prevValue: _value,
      value: defaultValue,
      selectNode: null,

      /**
       * 选中值的路径
       */
      activePaths: []
    };
    MultiCascader.utils = createUtils(props);
    var flattenData = flattenTree(_data, props.childrenKey);
    _this.isControlled = !_.isUndefined(_value);
    _this.state = _extends({}, initState, {
      flattenData: flattenData,

      /**
       * 用于展示面板的数据列表，是一个二维的数组
       * 是通过 data 树结构转换成的二维的数组，其中只包含页面上展示的数据
       */
      items: [flattenData.filter(function (item) {
        return !item.parent;
      })]
    }, MultiCascader.getCascadeState(props, flattenData)); // for test

    _this.menuContainerRef = React.createRef();
    _this.positionRef = React.createRef();
    _this.triggerRef = React.createRef();
    return _this;
  }

  MultiCascader.getCascadeState = function getCascadeState(nextProps, flattenData, nextValue) {
    var data = nextProps.data,
        cascade = nextProps.cascade,
        value = nextProps.value,
        defaultValue = nextProps.defaultValue,
        uncheckableItemValues = nextProps.uncheckableItemValues;
    var cascadeValue = nextValue || value || defaultValue || [];

    if (cascade && data) {
      cascadeValue = MultiCascader.utils.transformValue(cascadeValue, flattenData, uncheckableItemValues);
    }

    return {
      value: cascadeValue
    };
  };

  MultiCascader.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var data = nextProps.data,
        valueKey = nextProps.valueKey,
        childrenKey = nextProps.childrenKey;
    var value = nextProps.value || prevState.value || [];
    var prevValue = prevState.prevValue,
        flattenData = prevState.flattenData,
        _prevState$selectNode = prevState.selectNode,
        selectNode = _prevState$selectNode === void 0 ? {} : _prevState$selectNode,
        items = prevState.items;
    var isChangedData = data !== prevState.data;
    var isChangedValue = !shallowEqualArray(prevValue, nextProps.value);

    if (isChangedData || isChangedValue) {
      if (isChangedData) {
        flattenData = flattenTree(data, nextProps.childrenKey);
      }
      /**
       * 如果更新了 data,
       * 首先获取到被点击节点的值 `selectNode`， 然后再拿到新增后的 `newChildren`,
       */


      var nextSelectNode = flattenData.find(function (n) {
        return selectNode && n[valueKey] === selectNode[valueKey];
      });
      var newChildren = (_.get(nextSelectNode, childrenKey) || []).map(function (item) {
        item.parent = nextSelectNode;
        return item;
      });

      if (newChildren.length && items) {
        items[items.length - 1] = newChildren;
      }

      var nextState = _extends({
        selectNode: nextSelectNode,
        flattenData: flattenData,
        data: data,
        items: MultiCascader.utils.getItems(nextSelectNode, flattenData)
      }, MultiCascader.getCascadeState(nextProps, flattenData, value));

      if (isChangedValue) {
        nextState.prevValue = nextProps.value;
      }

      return nextState;
    }

    return null;
  };

  var _proto = MultiCascader.prototype;

  _proto.getValue = function getValue() {
    var value = this.state.value;
    return value || [];
  };

  _proto.getSearchResult = function getSearchResult() {
    var _this$props5 = this.props,
        labelKey = _this$props5.labelKey,
        valueKey = _this$props5.valueKey,
        _this$props5$unchecka = _this$props5.uncheckableItemValues,
        uncheckableItemValues = _this$props5$unchecka === void 0 ? [] : _this$props5$unchecka;
    var _this$state = this.state,
        searchKeyword = _this$state.searchKeyword,
        flattenData = _this$state.flattenData;
    var items = [];
    var result = flattenData.filter(function (item) {
      if (uncheckableItemValues.some(function (value) {
        return item[valueKey] === value;
      })) {
        return false;
      }

      if (item[labelKey].match(new RegExp(searchKeyword, 'i'))) {
        return true;
      }

      return false;
    });

    for (var i = 0; i < result.length; i++) {
      items.push(result[i]);

      if (i === 99) {
        return items;
      }
    }

    return items;
  };

  _proto.renderSearchResultPanel = function renderSearchResultPanel() {
    var locale = this.props.locale;
    var searchKeyword = this.state.searchKeyword;

    if (searchKeyword === '') {
      return null;
    }

    var items = this.getSearchResult();
    return React.createElement("div", {
      className: this.addPrefix('cascader-search-panel')
    }, items.length ? items.map(this.renderSearchRow) : React.createElement("div", {
      className: this.addPrefix('none')
    }, locale.noResultsText));
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this$state2 = this.state,
        items = _this$state2.items,
        activePaths = _this$state2.activePaths,
        searchKeyword = _this$state2.searchKeyword;
    var _this$props6 = this.props,
        renderMenu = _this$props6.renderMenu,
        renderExtraFooter = _this$props6.renderExtraFooter,
        menuClassName = _this$props6.menuClassName,
        menuStyle = _this$props6.menuStyle,
        classPrefix = _this$props6.classPrefix,
        searchable = _this$props6.searchable,
        locale = _this$props6.locale;
    var classes = classNames(this.addPrefix('cascader-menu'), this.addPrefix('multi-cascader-menu'), menuClassName);

    var menuProps = _.pick(this.props, Object.keys(DropdownMenu.propTypes));

    return React.createElement(MenuWrapper, {
      className: classes,
      style: menuStyle
    }, searchable && React.createElement(SearchBar, {
      placeholder: locale.searchPlaceholder,
      onChange: this.handleSearch,
      value: searchKeyword
    }), this.renderSearchResultPanel(), searchKeyword === '' && React.createElement(DropdownMenu, _extends({}, menuProps, {
      classPrefix: classPrefix,
      ref: this.menuContainerRef,
      cascadeItems: items,
      cascadePathItems: activePaths,
      value: this.getValue(),
      onSelect: this.handleSelect,
      onCheck: this.handleCheck,
      renderMenu: renderMenu
    })), renderExtraFooter && renderExtraFooter());
  };

  _proto.render = function render() {
    var _this$props7 = this.props,
        valueKey = _this$props7.valueKey,
        labelKey = _this$props7.labelKey,
        childrenKey = _this$props7.childrenKey,
        placeholder = _this$props7.placeholder,
        renderValue = _this$props7.renderValue,
        disabled = _this$props7.disabled,
        cleanable = _this$props7.cleanable,
        locale = _this$props7.locale,
        toggleComponentClass = _this$props7.toggleComponentClass,
        style = _this$props7.style,
        onEnter = _this$props7.onEnter,
        onExited = _this$props7.onExited,
        onClean = _this$props7.onClean,
        countable = _this$props7.countable,
        cascade = _this$props7.cascade,
        rest = _objectWithoutPropertiesLoose(_this$props7, ["valueKey", "labelKey", "childrenKey", "placeholder", "renderValue", "disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEnter", "onExited", "onClean", "countable", "cascade"]);

    var flattenData = this.state.flattenData;
    var unhandled = getUnhandledProps(MultiCascader, rest);
    var value = this.getValue();
    var selectedItems = flattenData.filter(function (item) {
      return value.some(function (v) {
        return v === item[valueKey];
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
        childrenKey: childrenKey,
        prefix: this.addPrefix,
        cascade: cascade,
        locale: locale
      });

      if (renderValue) {
        selectedElement = renderValue(value, selectedItems, selectedElement);
      }
    }

    var classes = getToggleWrapperClassName('cascader', this.addPrefix, this.props, hasValue);
    return React.createElement("div", {
      className: classes,
      style: style,
      tabIndex: -1,
      role: "menu"
    }, React.createElement(PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: this.positionRef,
      onEnter: createChainedFunction(this.handleEntered, onEnter),
      onExit: createChainedFunction(this.handleExit, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement(PickerToggle, _extends({}, unhandled, {
      componentClass: toggleComponentClass,
      onClean: createChainedFunction(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active
    }), selectedElement || locale.placeholder)));
  };

  return MultiCascader;
}(React.Component);

MultiCascader.propTypes = {
  appearance: PropTypes.oneOf(['default', 'subtle']),
  classPrefix: PropTypes.string,
  cascade: PropTypes.bool,
  data: PropTypes.array,
  disabledItemValues: PropTypes.array,
  className: PropTypes.string,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  containerPadding: PropTypes.number,
  block: PropTypes.bool,
  toggleComponentClass: PropTypes.elementType,
  menuClassName: PropTypes.string,
  menuStyle: PropTypes.object,
  childrenKey: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.array,
  defaultValue: PropTypes.array,
  placeholder: PropTypes.node,
  locale: PropTypes.object,
  cleanable: PropTypes.bool,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  countable: PropTypes.bool,
  placement: PropTypes.oneOf(PLACEMENT),
  menuWidth: PropTypes.number,
  menuHeight: PropTypes.number,
  style: PropTypes.object,
  uncheckableItemValues: PropTypes.array,
  searchable: PropTypes.bool,
  preventOverflow: PropTypes.bool,
  renderMenuItem: PropTypes.func,
  renderMenu: PropTypes.func,
  renderValue: PropTypes.func,
  renderExtraFooter: PropTypes.func,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
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
  onSelect: PropTypes.func
};
MultiCascader.defaultProps = {
  cascade: true,
  appearance: 'default',
  data: [],
  disabledItemValues: [],
  uncheckableItemValues: [],
  childrenKey: 'children',
  valueKey: 'value',
  labelKey: 'label',
  locale: {
    placeholder: 'Select',
    checkAll: 'All',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  },
  cleanable: true,
  searchable: true,
  countable: true,
  placement: 'bottomStart'
};
MultiCascader.utils = {};
polyfill(MultiCascader);
var enhance = compose(defaultProps({
  classPrefix: 'picker'
}), withPickerMethods());
export default enhance(MultiCascader);