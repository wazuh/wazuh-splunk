"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("rsuite-utils/lib/utils");

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _IntlProvider = _interopRequireDefault(require("../IntlProvider"));

var _FormattedMessage = _interopRequireDefault(require("../IntlProvider/FormattedMessage"));

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var _stringToObject2 = _interopRequireDefault(require("../utils/stringToObject"));

var _treeUtils = require("../utils/treeUtils");

var _utils2 = require("./utils");

var _utils3 = require("../utils");

var _Picker = require("../Picker");

var _constants = require("../constants");

var Cascader =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Cascader, _React$Component);

  function Cascader(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.triggerRef = void 0;
    _this.containerRef = void 0;
    _this.positionRef = void 0;
    _this.menuContainerRef = void 0;

    _this.handleSelect = function (node, cascadeItems, activePaths, isLeafNode, event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onSelect = _this$props.onSelect,
          valueKey = _this$props.valueKey;

      var prevValue = _this.getValue();

      var value = node[valueKey];
      onSelect && onSelect(node, activePaths, (0, _Picker.createConcatChildrenFunction)(node, value), event);
      /**
       * 只有在叶子节点的时候才当做是可以选择的值
       * 一个节点的 children 为 null 或者 undefined 的是就是叶子节点
       */

      if (isLeafNode) {
        _this.handleCloseDropdown();

        var nextState = (0, _extends3.default)({
          selectNode: node
        }, (0, _utils2.getDerivedStateForCascade)(_this.props, _this.state, value));

        if (typeof _this.props.value === 'undefined') {
          nextState.value = value;
        }

        _this.setState(nextState);

        if (!(0, _utils.shallowEqual)(value, prevValue)) {
          onChange && onChange(value, event);
        }

        return;
      }

      _this.setState({
        selectNode: node,
        items: cascadeItems,
        tempActivePaths: activePaths
      }, function () {
        var updatePosition = _lodash.default.get(_this.positionRef, 'current.updatePosition');

        if (typeof updatePosition === 'function') {
          updatePosition();
        }
      });
    };

    _this.handleSearchRowSelect = function (item, event) {
      var _this$props2 = _this.props,
          valueKey = _this$props2.valueKey,
          onChange = _this$props2.onChange,
          onSelect = _this$props2.onSelect;
      var value = item[valueKey];

      _this.handleCloseDropdown();

      var nextState = (0, _extends3.default)({}, (0, _utils2.getDerivedStateForCascade)(_this.props, _this.state, value), {
        selectNode: item,
        searchKeyword: '',
        value: value
      });

      _this.setState(nextState);

      onSelect && onSelect(item, null, null, event);
      onChange && onChange(value, event);
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
        value: null,
        selectNode: null,
        activePaths: [],
        tempActivePaths: []
      };

      _this.setState(nextState, function () {
        onChange && onChange(null, event);
      });
    };

    _this.handleSearch = function (searchKeyword, event) {
      var onSearch = _this.props.onSearch;

      _this.setState({
        searchKeyword: searchKeyword
      });

      onSearch && onSearch(searchKeyword, event);
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
      return (0, _utils3.prefix)(_this.props.classPrefix)(name);
    };

    _this.renderSearchRow = function (item, key) {
      var _classNames;

      var _this$props4 = _this.props,
          labelKey = _this$props4.labelKey,
          valueKey = _this$props4.valueKey,
          _this$props4$disabled = _this$props4.disabledItemValues,
          disabledItemValues = _this$props4$disabled === void 0 ? [] : _this$props4$disabled;
      var searchKeyword = _this.state.searchKeyword;
      var regx = new RegExp(searchKeyword, 'ig');
      var nodes = (0, _treeUtils.getNodeParents)(item);
      nodes.push(item);
      nodes = nodes.map(function (node) {
        var _extends2;

        var labelElements = [];
        var a = node[labelKey].split(regx);
        var b = node[labelKey].match(regx);

        for (var i = 0; i < a.length; i++) {
          labelElements.push(a[i]);

          if (b && b[i]) {
            labelElements.push(React.createElement("strong", {
              key: i
            }, b[i]));
          }
        }

        return (0, _extends3.default)({}, node, (_extends2 = {}, _extends2[labelKey] = labelElements, _extends2));
      });
      var disabled = disabledItemValues.some(function (value) {
        return nodes.some(function (node) {
          return node[valueKey] === value;
        });
      });
      var itemClasses = (0, _classnames.default)(_this.addPrefix('cascader-row'), (_classNames = {}, _classNames[_this.addPrefix('cascader-row-disabled')] = disabled, _classNames));
      return React.createElement("div", {
        key: key,
        className: itemClasses,
        onClick: function onClick(event) {
          if (!disabled) {
            _this.handleSearchRowSelect(item, event);
          }
        }
      }, nodes.map(function (node, index) {
        return React.createElement("span", {
          key: "col-" + index,
          className: _this.addPrefix('cascader-col')
        }, node[labelKey]);
      }));
    };

    var initState = {
      searchKeyword: '',
      selectNode: null,
      data: props.data,
      value: props.defaultValue,

      /**
       * 选中值的路径
       */
      activePaths: [],

      /**
       * 用于展示面板的数据列表，是一个二维的数组
       * 是通过 data 树结构转换成的二维的数组，其中只包含页面上展示的数据
       */
      items: []
    };
    _this.state = (0, _extends3.default)({}, initState, {}, (0, _utils2.getDerivedStateForCascade)(props, initState), {
      flattenData: (0, _treeUtils.flattenTree)(props.data)
    });
    _this.triggerRef = React.createRef();
    _this.containerRef = React.createRef();
    _this.positionRef = React.createRef(); // for test

    _this.menuContainerRef = React.createRef();
    return _this;
  }

  Cascader.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        data = nextProps.data,
        labelKey = nextProps.labelKey,
        valueKey = nextProps.valueKey;

    if (data !== prevState.data) {
      // First get the value of the clicked node `selectNodeValue`, and then get the new `newChildren`.
      var selectNodeValue = _lodash.default.get(prevState, ['selectNode', valueKey]);

      if (selectNodeValue) {
        var newChildren = _lodash.default.get((0, _utils.findNodeOfTree)(data, function (item) {
          return (0, _utils.shallowEqual)(item[valueKey], selectNodeValue);
        }), 'children') || [];
        return (0, _extends3.default)({}, (0, _utils2.getDerivedStateForCascade)(nextProps, prevState, selectNodeValue, newChildren.map(function (item) {
          return (0, _stringToObject2.default)(item, labelKey, valueKey);
        })), {
          data: data,
          flattenData: (0, _treeUtils.flattenTree)(data)
        });
      }

      return (0, _extends3.default)({}, (0, _utils2.getDerivedStateForCascade)(nextProps, prevState), {
        flattenData: (0, _treeUtils.flattenTree)(data),
        data: data
      });
    }

    if (typeof value !== 'undefined' && !(0, _utils.shallowEqual)(value, prevState.value)) {
      return (0, _extends3.default)({}, (0, _utils2.getDerivedStateForCascade)(nextProps, prevState), {
        value: value
      });
    }

    return null;
  };

  var _proto = Cascader.prototype;

  _proto.getValue = function getValue(nextProps) {
    var _ref = nextProps || this.props,
        value = _ref.value;

    return _lodash.default.isUndefined(value) ? this.state.value : value;
  };

  /**
   * 在 data 对象中的数据类型是字符串比如: ['foo']
   * 通过这个行数可以把值转换成 [{name:'foo':value:'foo'}]
   */
  _proto.stringToObject = function stringToObject(value) {
    var _this$props5 = this.props,
        labelKey = _this$props5.labelKey,
        valueKey = _this$props5.valueKey;
    return (0, _stringToObject2.default)(value, labelKey, valueKey);
  };

  _proto.someKeyword = function someKeyword(item) {
    var labelKey = this.props.labelKey;
    var searchKeyword = this.state.searchKeyword;

    if (item[labelKey].match(new RegExp(searchKeyword, 'i'))) {
      return true;
    }

    if (item.parent && this.someKeyword(item.parent)) {
      return true;
    }

    return false;
  };

  _proto.getSearchResult = function getSearchResult() {
    var _this2 = this;

    var childrenKey = this.props.childrenKey;
    var flattenData = this.state.flattenData;
    var items = [];
    var result = flattenData.filter(function (item) {
      if (item[childrenKey]) {
        return false;
      }

      return _this2.someKeyword(item);
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
    var _this$state = this.state,
        items = _this$state.items,
        tempActivePaths = _this$state.tempActivePaths,
        activePaths = _this$state.activePaths,
        searchKeyword = _this$state.searchKeyword;
    var _this$props6 = this.props,
        renderMenu = _this$props6.renderMenu,
        renderExtraFooter = _this$props6.renderExtraFooter,
        menuClassName = _this$props6.menuClassName,
        menuStyle = _this$props6.menuStyle,
        searchable = _this$props6.searchable,
        locale = _this$props6.locale;
    var classes = (0, _classnames.default)(this.addPrefix('cascader-menu'), menuClassName);

    var menuProps = _lodash.default.pick(this.props, Object.keys(_lodash.default.omit(_DropdownMenu.default.propTypes, ['classPrefix'])));

    return React.createElement(_Picker.MenuWrapper, {
      className: classes,
      style: menuStyle
    }, searchable && React.createElement(_Picker.SearchBar, {
      placeholder: locale.searchPlaceholder,
      onChange: this.handleSearch,
      value: searchKeyword
    }), this.renderSearchResultPanel(), searchKeyword === '' && React.createElement(_DropdownMenu.default, (0, _extends3.default)({}, menuProps, {
      classPrefix: this.addPrefix('cascader-menu'),
      ref: this.menuContainerRef,
      cascadeItems: items,
      cascadePathItems: tempActivePaths || activePaths,
      activeItemValue: this.getValue(),
      onSelect: this.handleSelect,
      renderMenu: renderMenu
    })), renderExtraFooter && renderExtraFooter());
  };

  _proto.render = function render() {
    var _this$props7 = this.props,
        valueKey = _this$props7.valueKey,
        labelKey = _this$props7.labelKey,
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
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props7, ["valueKey", "labelKey", "placeholder", "renderValue", "disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEnter", "onExited", "onClean"]);
    var _this$state2 = this.state,
        activePaths = _this$state2.activePaths,
        active = _this$state2.active;
    var unhandled = (0, _utils3.getUnhandledProps)(Cascader, rest);
    var value = this.getValue();
    var hasValue = !!value;
    var activeItemLabel = placeholder;

    if (activePaths.length > 0) {
      activeItemLabel = [];
      activePaths.forEach(function (item, index) {
        var key = item[valueKey] || item[labelKey];
        activeItemLabel.push(React.createElement("span", {
          key: key
        }, item[labelKey]));

        if (index < activePaths.length - 1) {
          activeItemLabel.push(React.createElement("span", {
            className: "separator",
            key: key + "-separator"
          }, ' / '));
        }
      });

      if (renderValue) {
        activeItemLabel = renderValue(value, activePaths, activeItemLabel);
      }
    }

    var classes = (0, _Picker.getToggleWrapperClassName)('cascader', this.addPrefix, this.props, hasValue);
    return React.createElement(_IntlProvider.default, {
      locale: locale
    }, React.createElement("div", {
      className: classes,
      style: style,
      tabIndex: -1,
      role: "menu",
      ref: this.containerRef
    }, React.createElement(_Picker.PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: this.positionRef,
      onEnter: (0, _utils3.createChainedFunction)(this.handleEntered, onEnter),
      onExit: (0, _utils3.createChainedFunction)(this.handleExit, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement(_Picker.PickerToggle, (0, _extends3.default)({}, unhandled, {
      componentClass: toggleComponentClass,
      onClean: (0, _utils3.createChainedFunction)(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: active
    }), activeItemLabel || React.createElement(_FormattedMessage.default, {
      id: "placeholder"
    })))));
  };

  return Cascader;
}(React.Component);

Cascader.propTypes = {
  appearance: _propTypes.default.oneOf(['default', 'subtle']),
  classPrefix: _propTypes.default.string,
  data: _propTypes.default.array,
  className: _propTypes.default.string,
  container: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  containerPadding: _propTypes.default.number,
  block: _propTypes.default.bool,
  toggleComponentClass: _propTypes.default.elementType,
  menuClassName: _propTypes.default.string,
  menuStyle: _propTypes.default.object,
  childrenKey: _propTypes.default.string,
  valueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  renderMenu: _propTypes.default.func,
  renderValue: _propTypes.default.func,
  renderExtraFooter: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  value: _propTypes.default.any,
  defaultValue: _propTypes.default.any,
  placeholder: _propTypes.default.string,
  onChange: _propTypes.default.func,
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
  onSelect: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  locale: _propTypes.default.object,
  cleanable: _propTypes.default.bool,
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  placement: _propTypes.default.oneOf(_constants.PLACEMENT),
  renderMenuItem: _propTypes.default.func,
  menuWidth: _propTypes.default.number,
  menuHeight: _propTypes.default.number,
  disabledItemValues: _propTypes.default.array,
  style: _propTypes.default.object,
  searchable: _propTypes.default.bool,
  preventOverflow: _propTypes.default.bool
};
Cascader.defaultProps = {
  appearance: 'default',
  data: [],
  disabledItemValues: [],
  childrenKey: 'children',
  valueKey: 'value',
  labelKey: 'label',
  locale: {
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  },
  cleanable: true,
  searchable: true,
  placement: 'bottomStart'
};
(0, _reactLifecyclesCompat.polyfill)(Cascader);
var enhance = (0, _compose.default)((0, _utils3.defaultProps)({
  classPrefix: 'picker'
}), (0, _utils3.withPickerMethods)());

var _default = enhance(Cascader);

exports.default = _default;
module.exports = exports.default;