import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import _ from 'lodash';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/commonjs/CellMeasurer';
import { polyfill } from 'react-lifecycles-compat';
import { shallowEqual } from 'rsuite-utils/lib/utils';
import TreeNode from './TreeNode';
import { defaultProps, prefix, defaultClassPrefix, getUnhandledProps, createChainedFunction, withPickerMethods } from '../utils';
import { flattenTree, shouldDisplay, getNodeParents, shouldShowNodeByExpanded, getVirtualLisHeight, treeDeprecatedWarning, hasVisibleChildren, compareArray, getExpandAll, getExpandItemValues, getExpandState } from '../utils/treeUtils';
import { PickerToggle, getToggleWrapperClassName, onMenuKeyDown, MenuWrapper, SearchBar, PickerToggleTrigger, createConcatChildrenFunction } from '../Picker';
import { PLACEMENT } from '../constants'; // default value for virtualized

var defaultHeight = 360;
var defaultWidth = 200;

var TreePicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TreePicker, _React$Component);

  function TreePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuRef = void 0;
    _this.treeViewRef = void 0;
    _this.positionRef = void 0;
    _this.listRef = void 0;
    _this.triggerRef = void 0;
    _this.toggleRef = void 0;

    _this.getFocusableMenuItems = function () {
      var filterData = _this.state.filterData;
      var _this$props = _this.props,
          childrenKey = _this$props.childrenKey,
          _this$props$disabledI = _this$props.disabledItemValues,
          disabledItemValues = _this$props$disabledI === void 0 ? [] : _this$props$disabledI,
          valueKey = _this$props.valueKey;
      var items = [];

      var loop = function loop(nodes) {
        nodes.forEach(function (node) {
          var disabled = disabledItemValues.some(function (disabledItem) {
            return shallowEqual(disabledItem, node[valueKey]);
          });

          if (!disabled) {
            items.push(node);

            if (!getExpandState(node, _this.props)) {
              return;
            }

            if (node[childrenKey]) {
              loop(node[childrenKey]);
            }
          }
        });
      };

      loop(filterData);
      return items;
    };

    _this.getElementByDataKey = function (dataKey) {
      var ele = _this.nodeRefs[dataKey];

      if (ele instanceof Element) {
        return ele.querySelector("." + _this.addTreePrefix('node-label'));
      }

      return null;
    };

    _this.nodes = {};
    _this.node = null;
    _this.tempNode = [];
    _this.cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 20
    });
    _this.nodeRefs = {};

    _this.bindNodeRefs = function (refKey, ref) {
      _this.nodeRefs[refKey] = ref;
    };

    _this.getPositionInstance = function () {
      return _this.positionRef.current;
    };

    _this.getToggleInstance = function () {
      return _this.toggleRef.current;
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.addTreePrefix = function (name) {
      return prefix(defaultClassPrefix('tree'))(name);
    };

    _this.selectActiveItem = function (event) {
      var _this$getActiveItem = _this.getActiveItem(),
          nodeData = _this$getActiveItem.nodeData,
          layer = _this$getActiveItem.layer;

      _this.handleSelect(nodeData, +layer, event);
    };

    _this.focusNextItem = function () {
      var _this$getItemsAndActi = _this.getItemsAndActiveIndex(),
          items = _this$getItemsAndActi.items,
          activeIndex = _this$getItemsAndActi.activeIndex;

      if (items.length === 0) {
        return;
      }

      var nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;

      var node = _this.getElementByDataKey(items[nextIndex].refKey);

      if (node !== null && typeof node.focus === 'function') {
        node.focus();
      }
    };

    _this.focusPreviousItem = function () {
      var _this$getItemsAndActi2 = _this.getItemsAndActiveIndex(),
          items = _this$getItemsAndActi2.items,
          activeIndex = _this$getItemsAndActi2.activeIndex;

      if (items.length === 0) {
        return;
      }

      var prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      prevIndex = prevIndex >= 0 ? prevIndex : 0;

      var node = _this.getElementByDataKey(items[prevIndex].refKey);

      if (node !== null && typeof node.focus === 'function') {
        node.focus();
      }
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

    _this.handleToggle = function (nodeData) {
      var _this$props2 = _this.props,
          valueKey = _this$props2.valueKey,
          onExpand = _this$props2.onExpand,
          expandItemValues = _this$props2.expandItemValues;

      var nextExpandItemValues = _this.toggleExpand(nodeData, !nodeData.expand);

      if (_.isUndefined(expandItemValues)) {
        _this.unserializeLists('expand', nextExpandItemValues);

        _this.setState({
          expandItemValues: nextExpandItemValues
        });
      }

      onExpand && onExpand(nextExpandItemValues, nodeData, createConcatChildrenFunction(nodeData, nodeData[valueKey]));
    };

    _this.handleSelect = function (nodeData, layer, event) {
      var _this$props3 = _this.props,
          valueKey = _this$props3.valueKey,
          onChange = _this$props3.onChange,
          onSelect = _this$props3.onSelect,
          value = _this$props3.value;
      _this.node = nodeData;

      if (_.isUndefined(value)) {
        _this.setState({
          activeNode: nodeData,
          selectedValue: nodeData[valueKey]
        });
      }

      onChange && onChange(nodeData[valueKey], event);
      onSelect && onSelect(nodeData, layer, event);

      _this.handleCloseDropdown();

      if (_this.toggleRef.current) {
        _this.toggleRef.current.onFocus();
      }
    };

    _this.handleKeyDown = function (event) {
      onMenuKeyDown(event, {
        down: _this.focusNextItem,
        up: _this.focusPreviousItem,
        enter: _this.selectActiveItem,
        del: _this.handleClean
      });
    };

    _this.handleToggleKeyDown = function (event) {
      var _this$state = _this.state,
          activeNode = _this$state.activeNode,
          active = _this$state.active; // enter

      if ((!activeNode || !active) && event.keyCode === 13) {
        _this.handleToggleDropdown();
      } // delete


      if (event.keyCode === 8) {
        _this.handleClean(event);
      }

      if (!_this.treeViewRef.current) {
        return;
      }

      if (event.target instanceof HTMLElement) {
        var className = event.target.className;

        if (className.includes(_this.addPrefix('toggle')) || className.includes(_this.addPrefix('toggle-custom')) || className.includes(_this.addPrefix('search-bar-input'))) {
          onMenuKeyDown(event, {
            down: _this.focusNextItem
          });
        }
      }
    };

    _this.handleSearch = function (value, event) {
      var filterData = _this.state.filterData;
      var _this$props4 = _this.props,
          onSearch = _this$props4.onSearch,
          searchKeyword = _this$props4.searchKeyword;

      if (_.isUndefined(searchKeyword)) {
        _this.setState({
          searchKeyword: value,
          filterData: _this.getFilterData(filterData, value)
        });
      }

      onSearch && onSearch(value, event);
    };

    _this.handleClean = function (event) {
      var onChange = _this.props.onChange;

      _this.setState({
        activeNode: null,
        selectedValue: null
      });

      _this.node = null;
      onChange && onChange(null, event);
    };

    _this.handleOnOpen = function () {
      var activeNode = _this.state.activeNode;
      var onOpen = _this.props.onOpen;

      if (activeNode) {
        var node = _this.getElementByDataKey(activeNode.refKey);

        if (node !== null && typeof node.focus === 'function') {
          node.focus();
        }
      }

      onOpen && onOpen();

      _this.setState({
        active: true
      });
    };

    _this.handleOnClose = function () {
      var filterData = _this.state.filterData;
      var _this$props5 = _this.props,
          searchKeyword = _this$props5.searchKeyword,
          onClose = _this$props5.onClose;

      if (_.isUndefined(searchKeyword)) {
        _this.setState({
          searchKeyword: '',
          filterData: _this.getFilterData(filterData, '')
        });
      }

      onClose && onClose();

      _this.setState({
        active: false
      });
    };

    _this.measureRowRenderer = function (nodes) {
      return function (_ref) {
        var key = _ref.key,
            index = _ref.index,
            style = _ref.style,
            parent = _ref.parent;
        var node = nodes[index];
        return React.createElement(CellMeasurer, {
          cache: _this.cache,
          columnIndex: 0,
          key: key,
          rowIndex: index,
          parent: parent
        }, function () {
          return _this.renderVirtualNode(node, {
            key: key,
            style: style
          });
        });
      };
    };

    var _value = props.value,
        data = props.data,
        _valueKey = props.valueKey,
        _props$searchKeyword = props.searchKeyword,
        _searchKeyword = _props$searchKeyword === void 0 ? '' : _props$searchKeyword;

    var nextData = [].concat(data);

    var _nextExpandItemValues = getExpandItemValues(props);

    _this.flattenNodes(nextData);

    _this.unserializeLists('expand', _nextExpandItemValues, props);

    _this.state = {
      data: data,
      value: _value,
      selectedValue: _this.getValue(props),
      expandAll: getExpandAll(props),
      filterData: _this.getFilterData(nextData, _searchKeyword, props),
      activeNode: _this.getActiveNode(_this.getValue(props), _valueKey),
      searchKeyword: _searchKeyword,
      expandItemValues: _this.serializeList('expand')
    };
    _this.treeViewRef = React.createRef();
    _this.positionRef = React.createRef();
    _this.listRef = React.createRef();
    _this.triggerRef = React.createRef();
    _this.toggleRef = React.createRef(); // for test

    _this.menuRef = React.createRef();
    treeDeprecatedWarning(props, ['expandAll']);
    return _this;
  }

  var _proto = TreePicker.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var activeNode = this.state.activeNode;
    this.focusNode(activeNode);
  };

  TreePicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        data = nextProps.data,
        expandAll = nextProps.expandAll,
        searchKeyword = nextProps.searchKeyword,
        expandItemValues = nextProps.expandItemValues;
    var nextState = {};

    if (_.isArray(data) && _.isArray(prevState.data) && prevState.data !== data) {
      nextState.data = data;
    }

    if (!shallowEqual(value, prevState.value)) {
      nextState.value = value;
      nextState.selectedValue = value;
    }

    if (compareArray(expandItemValues, prevState.expandItemValues)) {
      nextState.expandItemValues = expandItemValues;
    }

    if (!_.isUndefined(searchKeyword) && searchKeyword !== prevState.searchKeyword) {
      nextState.searchKeyword = searchKeyword;
    }

    if (expandAll !== prevState.expandAll) {
      nextState.expandAll = expandAll;
    }

    return Object.keys(nextState).length ? nextState : null;
  };

  _proto.componentDidUpdate = function componentDidUpdate(_prevProps, prevState) {
    this.updateDataChange(prevState);
    this.updateValueChange(prevState);
    this.updateExpandItemValuesChange(prevState);
    this.updateSearchKeywordChange(prevState);

    if (this.listRef.current) {
      this.listRef.current.forceUpdateGrid();
    }
  };

  _proto.updateDataChange = function updateDataChange(prevState) {
    var _this$state2 = this.state,
        searchKeyword = _this$state2.searchKeyword,
        expandItemValues = _this$state2.expandItemValues;
    var data = this.props.data;

    if (prevState.data !== data) {
      var nextData = [].concat(data);
      this.flattenNodes(nextData);
      var filterData = this.getFilterData(nextData, searchKeyword);
      var activeNode = this.getActiveNode(this.getValue());
      this.focusNode(activeNode);
      this.unserializeLists('expand', expandItemValues);
      this.setState({
        data: nextData,
        filterData: filterData,
        activeNode: activeNode
      });
    }
  };

  _proto.updateValueChange = function updateValueChange(prevState) {
    var _this$props6 = this.props,
        value = _this$props6.value,
        valueKey = _this$props6.valueKey;

    if (!shallowEqual(prevState.value, value)) {
      var activeNode = null;

      if (this.node === null) {
        activeNode = this.getActiveNode(value);
      }

      if (value !== null && this.node !== null) {
        activeNode = shallowEqual(this.node[valueKey], value) ? this.node : this.getActiveNode(value);
      }

      var nextState = {
        value: value,
        activeNode: activeNode
      };

      if (value === null) {
        nextState.activeNode = null;
        this.node = null;
      }

      if (activeNode !== null) {
        this.focusNode(activeNode);
      }

      this.setState(nextState);
    }
  };

  _proto.updateExpandItemValuesChange = function updateExpandItemValuesChange(prevState) {
    var expandItemValues = this.props.expandItemValues;

    if (compareArray(expandItemValues, prevState.expandItemValues)) {
      this.unserializeLists('expand', expandItemValues);
      this.setState({
        expandItemValues: expandItemValues
      });
    }
  };

  _proto.updateSearchKeywordChange = function updateSearchKeywordChange(prevState) {
    var filterData = this.state.filterData;

    if (!_.isUndefined(this.props.searchKeyword) && prevState.searchKeyword !== this.props.searchKeyword) {
      this.setState({
        filterData: this.getFilterData(filterData, this.props.searchKeyword)
      });
    }
  };

  _proto.getValue = function getValue(props) {
    if (props === void 0) {
      props = this.props;
    }

    var _props = props,
        value = _props.value,
        defaultValue = _props.defaultValue;
    return !_.isUndefined(value) ? value : defaultValue;
  };

  _proto.getActiveNode = function getActiveNode(value, valueKey) {
    var _this2 = this;

    if (valueKey === void 0) {
      valueKey = this.props.valueKey;
    }

    var activeNode = null;

    if (!_.isUndefined(value)) {
      Object.keys(this.nodes).forEach(function (refKey) {
        if (shallowEqual(_this2.nodes[refKey][valueKey], value)) {
          activeNode = _this2.nodes[refKey];
        }
      });
    }

    return activeNode;
  };

  _proto.getActiveElementOption = function getActiveElementOption(options, value) {
    var childrenKey = this.props.childrenKey;

    for (var i = 0; i < options.length; i += 1) {
      if (options[i].value === value) {
        return options[i];
      } else if (options[i][childrenKey] && options[i][childrenKey].length) {
        var active = this.getActiveElementOption(options[i][childrenKey], value);

        if (!_.isEmpty(active)) {
          return active;
        }
      }
    }

    return {};
  };

  _proto.getItemsAndActiveIndex = function getItemsAndActiveIndex() {
    var items = this.getFocusableMenuItems();
    var activeIndex = -1;
    items.forEach(function (item, index) {
      if (document.activeElement !== null) {
        if (item.refKey === document.activeElement.getAttribute('data-key')) {
          activeIndex = index;
        }
      }
    });
    return {
      items: items,
      activeIndex: activeIndex
    };
  };

  _proto.getActiveItem = function getActiveItem() {
    var nodeData = {};
    var activeItem = document.activeElement;

    if (activeItem !== null) {
      var _$get = _.get(activeItem, 'dataset'),
          key = _$get.key,
          layer = _$get.layer;

      var activeNode = this.nodes[key];

      if (activeNode) {
        nodeData = activeNode;
      }

      return {
        nodeData: nodeData,
        layer: layer
      };
    }

    return {};
  };

  _proto.getFilterData = function getFilterData(data, word, props) {
    if (word === void 0) {
      word = '';
    }

    var _ref2 = props || this.props,
        labelKey = _ref2.labelKey,
        childrenKey = _ref2.childrenKey;

    var setVisible = function setVisible(nodes) {
      if (nodes === void 0) {
        nodes = [];
      }

      return nodes.forEach(function (item) {
        item.visible = shouldDisplay(item[labelKey], word);

        if (_.isArray(item[childrenKey])) {
          setVisible(item[childrenKey]);
          item[childrenKey].forEach(function (child) {
            if (child.visible) {
              item.visible = child.visible;
            }
          });
        }
      });
    };

    if (!_.isUndefined(word)) {
      setVisible(data);
    }

    return data;
  };

  _proto.getFlattenTreeData = function getFlattenTreeData(nodes) {
    var _this3 = this;

    var expandItemValues = this.state.expandItemValues;
    var _this$props7 = this.props,
        childrenKey = _this$props7.childrenKey,
        valueKey = _this$props7.valueKey;
    return flattenTree(nodes, childrenKey, function (node) {
      var formatted = {};
      var curNode = _this3.nodes[node.refKey];
      var parentKeys = getNodeParents(curNode, 'parentNode', valueKey);

      if (curNode) {
        formatted = _extends({}, node, {
          expand: curNode.expand,
          layer: curNode.layer,
          parentNode: curNode.parentNode,
          showNode: shouldShowNodeByExpanded(expandItemValues, parentKeys)
        });
      }

      return formatted;
    });
  };

  _proto.focusNode = function focusNode(activeNode) {
    var inline = this.props.inline;

    if (activeNode && inline) {
      var node = this.getElementByDataKey(activeNode.refKey);

      if (node !== null && typeof node.focus === 'function') {
        node.focus();
      }
    }
  };

  _proto.flattenNodes = function flattenNodes(nodes, props, ref, parentNode, layer) {
    var _this4 = this;

    if (ref === void 0) {
      ref = '0';
    }

    if (layer === void 0) {
      layer = 0;
    }

    var _ref3 = props || this.props,
        labelKey = _ref3.labelKey,
        valueKey = _ref3.valueKey,
        childrenKey = _ref3.childrenKey;

    if (!Array.isArray(nodes) || nodes.length === 0) {
      return [];
    }

    nodes.map(function (node, index) {
      var _this4$nodes$refKey;

      var refKey = ref + "-" + index;
      node.refKey = refKey;
      _this4.nodes[refKey] = (_this4$nodes$refKey = {
        layer: layer
      }, _this4$nodes$refKey[labelKey] = node[labelKey], _this4$nodes$refKey[valueKey] = node[valueKey], _this4$nodes$refKey.expand = getExpandState(node, props || _this4.props), _this4$nodes$refKey.refKey = refKey, _this4$nodes$refKey);

      if (parentNode) {
        _this4.nodes[refKey].parentNode = parentNode;
      }

      _this4.flattenNodes(node[childrenKey], props, refKey, _this4.nodes[refKey], layer + 1);
    });
  };

  _proto.serializeList = function serializeList(key, nodes) {
    if (nodes === void 0) {
      nodes = this.nodes;
    }

    var valueKey = this.props.valueKey;
    var list = [];
    Object.keys(nodes).forEach(function (refKey) {
      if (nodes[refKey][key]) {
        list.push(nodes[refKey][valueKey]);
      }
    });
    return list;
  };

  _proto.unserializeLists = function unserializeLists(key, value, props) {
    var _this5 = this;

    if (value === void 0) {
      value = [];
    }

    if (props === void 0) {
      props = this.props;
    }

    var _props2 = props,
        valueKey = _props2.valueKey;
    var expandAll = getExpandAll(props);
    Object.keys(this.nodes).forEach(function (refKey) {
      _this5.nodes[refKey][key] = false;

      if (value.length) {
        value.forEach(function (value) {
          if (shallowEqual(_this5.nodes[refKey][valueKey], value)) {
            _this5.nodes[refKey][key] = true;
          }
        });
      } else {
        _this5.nodes[refKey][key] = expandAll;
      }
    });
  };

  _proto.toggleExpand = function toggleExpand(node, isExpand) {
    var valueKey = this.props.valueKey;
    var expandItemValues = new Set(this.serializeList('expand'));

    if (isExpand) {
      expandItemValues.add(node[valueKey]);
    } else {
      expandItemValues.delete(node[valueKey]);
    }

    return Array.from(expandItemValues);
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this$props8 = this.props,
        _this$props8$height = _this$props8.height,
        height = _this$props8$height === void 0 ? defaultHeight : _this$props8$height,
        searchable = _this$props8.searchable,
        searchKeyword = _this$props8.searchKeyword,
        renderExtraFooter = _this$props8.renderExtraFooter,
        locale = _this$props8.locale,
        renderMenu = _this$props8.renderMenu,
        menuStyle = _this$props8.menuStyle,
        virtualized = _this$props8.virtualized,
        menuClassName = _this$props8.menuClassName,
        menuAutoWidth = _this$props8.menuAutoWidth;
    var keyword = !_.isUndefined(searchKeyword) ? searchKeyword : this.state.searchKeyword;
    var classes = classNames(menuClassName, this.addPrefix('tree-menu'));
    var styles = virtualized ? _extends({
      height: height
    }, menuStyle) : menuStyle;
    return React.createElement(MenuWrapper, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: styles,
      ref: this.menuRef,
      getToggleInstance: this.getToggleInstance,
      getPositionInstance: this.getPositionInstance
    }, searchable ? React.createElement(SearchBar, {
      placeholder: locale.searchPlaceholder,
      key: "searchBar",
      onChange: this.handleSearch,
      value: keyword
    }) : null, renderMenu ? renderMenu(this.renderTree()) : this.renderTree(), renderExtraFooter && renderExtraFooter());
  };

  _proto.renderNode = function renderNode(node, index, layer) {
    var _this6 = this;

    var _this$state3 = this.state,
        selectedValue = _this$state3.selectedValue,
        searchKeyword = _this$state3.searchKeyword;

    if (!node.visible) {
      return null;
    }

    var _this$props9 = this.props,
        _this$props9$disabled = _this$props9.disabledItemValues,
        disabledItemValues = _this$props9$disabled === void 0 ? [] : _this$props9$disabled,
        valueKey = _this$props9.valueKey,
        labelKey = _this$props9.labelKey,
        childrenKey = _this$props9.childrenKey,
        renderTreeNode = _this$props9.renderTreeNode,
        renderTreeIcon = _this$props9.renderTreeIcon;
    var refKey = node.refKey;
    var expand = this.nodes[node.refKey].expand;
    var key = _.isString(node[valueKey]) || _.isNumber(node[valueKey]) ? node[valueKey] : refKey;
    var children = node[childrenKey]; // 当用户进行搜索时，hasChildren的判断要变成判断是否存在 visible 为 true 的子节点

    var visibleChildren = _.isUndefined(searchKeyword) || searchKeyword.length === 0 ? !!children : hasVisibleChildren(node, childrenKey);
    var props = {
      value: node[valueKey],
      label: node[labelKey],
      index: index,
      layer: layer,
      expand: expand,
      parent: parent,
      active: shallowEqual(node[valueKey], selectedValue),
      visible: node.visible,
      children: children,
      nodeData: _extends({}, node, {
        expand: expand
      }),
      disabled: disabledItemValues.filter(function (disabledItem) {
        return shallowEqual(disabledItem, node[valueKey]);
      }).length > 0,
      hasChildren: visibleChildren,
      onSelect: this.handleSelect,
      onTreeToggle: this.handleToggle,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };

    if (props.hasChildren) {
      var _classNames;

      layer += 1;
      var expandALlState = this.nodes[node.refKey].expand; // 是否展开树节点且子节点不为空

      var openClass = this.addTreePrefix('open');
      var childrenClass = classNames(this.addTreePrefix('node-children'), (_classNames = {}, _classNames[openClass] = expandALlState && visibleChildren, _classNames));
      var nodes = children || [];
      return React.createElement("div", {
        className: childrenClass,
        key: key,
        ref: this.bindNodeRefs.bind(this, refKey)
      }, React.createElement(TreeNode, props), React.createElement("div", {
        className: this.addTreePrefix('children')
      }, nodes.map(function (child, i) {
        return _this6.renderNode(child, i, layer);
      })));
    }

    return React.createElement(TreeNode, _extends({
      key: key,
      innerRef: this.bindNodeRefs.bind(this, refKey)
    }, props));
  };

  _proto.renderVirtualNode = function renderVirtualNode(node, options) {
    var selectedValue = this.state.selectedValue;
    var _this$props10 = this.props,
        _this$props10$disable = _this$props10.disabledItemValues,
        disabledItemValues = _this$props10$disable === void 0 ? [] : _this$props10$disable,
        valueKey = _this$props10.valueKey,
        labelKey = _this$props10.labelKey,
        childrenKey = _this$props10.childrenKey,
        renderTreeNode = _this$props10.renderTreeNode,
        renderTreeIcon = _this$props10.renderTreeIcon;
    var key = options.key,
        style = options.style;
    var layer = node.layer,
        refKey = node.refKey,
        expand = node.expand,
        showNode = node.showNode;

    if (!node.visible) {
      return null;
    }

    var children = node[childrenKey];
    var props = {
      style: style,
      value: node[valueKey],
      label: node[labelKey],
      layer: layer,
      expand: expand,
      active: shallowEqual(node[valueKey], selectedValue),
      visible: node.visible,
      nodeData: node,
      disabled: disabledItemValues.filter(function (disabledItem) {
        return shallowEqual(disabledItem, node[valueKey]);
      }).length > 0,
      children: children,
      hasChildren: !!children,
      onSelect: this.handleSelect,
      onTreeToggle: this.handleToggle,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };
    return showNode && React.createElement(TreeNode, _extends({
      key: key,
      innerRef: this.bindNodeRefs.bind(this, refKey)
    }, props));
  };

  _proto.renderTree = function renderTree() {
    var _classNames2,
        _this7 = this;

    var filterData = this.state.filterData;
    var _this$props11 = this.props,
        height = _this$props11.height,
        _this$props11$classNa = _this$props11.className,
        className = _this$props11$classNa === void 0 ? '' : _this$props11$classNa,
        inline = _this$props11.inline,
        style = _this$props11.style,
        locale = _this$props11.locale,
        virtualized = _this$props11.virtualized;
    var layer = 0;
    var classes = classNames(defaultClassPrefix('tree'), (_classNames2 = {}, _classNames2[className] = inline, _classNames2));
    var nodes = [];

    if (!virtualized) {
      nodes = filterData.map(function (dataItem, index) {
        return _this7.renderNode(dataItem, index, layer);
      });

      if (!nodes.some(function (v) {
        return v !== null;
      })) {
        return React.createElement("div", {
          className: this.addPrefix('none')
        }, locale.noResultsText);
      }
    } else {
      nodes = this.getFlattenTreeData(filterData).filter(function (n) {
        return n.showNode && n.visible;
      });

      if (!nodes.length) {
        return React.createElement("div", {
          className: this.addPrefix('none')
        }, locale.noResultsText);
      }
    } // 当未定义 height 且 设置了 virtualized 为 true，treeHeight 设置默认高度


    var treeHeight = _.isUndefined(height) && virtualized ? defaultHeight : height;
    var styles = inline ? _extends({
      height: treeHeight
    }, style) : {};
    var ListHeight = getVirtualLisHeight(inline, treeHeight);
    return React.createElement("div", {
      ref: this.treeViewRef,
      className: classes,
      style: styles,
      onKeyDown: this.handleKeyDown
    }, React.createElement("div", {
      className: this.addTreePrefix('nodes')
    }, virtualized ? React.createElement(AutoSizer, {
      defaultHeight: ListHeight,
      defaultWidth: defaultWidth
    }, function (_ref4) {
      var height = _ref4.height,
          width = _ref4.width;
      return React.createElement(List, {
        ref: _this7.listRef,
        width: width || defaultWidth,
        height: height || ListHeight,
        rowHeight: 36,
        rowCount: nodes.length,
        rowRenderer: _this7.measureRowRenderer(nodes)
      });
    }) : nodes));
  };

  _proto.render = function render() {
    var _this$props12 = this.props,
        inline = _this$props12.inline,
        locale = _this$props12.locale,
        disabled = _this$props12.disabled,
        toggleComponentClass = _this$props12.toggleComponentClass,
        placeholder = _this$props12.placeholder,
        cleanable = _this$props12.cleanable,
        renderValue = _this$props12.renderValue,
        valueKey = _this$props12.valueKey,
        labelKey = _this$props12.labelKey,
        onEntered = _this$props12.onEntered,
        onExited = _this$props12.onExited,
        onClean = _this$props12.onClean,
        style = _this$props12.style,
        rest = _objectWithoutPropertiesLoose(_this$props12, ["inline", "locale", "disabled", "toggleComponentClass", "placeholder", "cleanable", "renderValue", "valueKey", "labelKey", "onEntered", "onExited", "onClean", "style"]);

    var activeNode = this.state.activeNode;
    var classes = getToggleWrapperClassName('tree', this.addPrefix, this.props, !!activeNode);
    var selectedElement = placeholder;
    var hasValue = !!activeNode;

    if (hasValue) {
      selectedElement = activeNode && activeNode[labelKey];

      if (renderValue && activeNode) {
        selectedElement = renderValue(activeNode[valueKey], activeNode, selectedElement);
      }
    }

    var unhandled = getUnhandledProps(TreePicker, rest);

    if (inline) {
      return this.renderTree();
    }

    return React.createElement(PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: this.positionRef,
      onEntered: createChainedFunction(this.handleOnOpen, onEntered),
      onExit: createChainedFunction(this.handleOnClose, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement("div", {
      className: classes,
      style: style
    }, React.createElement(PickerToggle, _extends({}, unhandled, {
      ref: this.toggleRef,
      onKeyDown: this.handleToggleKeyDown,
      onClean: createChainedFunction(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      componentClass: toggleComponentClass,
      hasValue: hasValue,
      active: this.state.active
    }), selectedElement || locale.placeholder)));
  };

  return TreePicker;
}(React.Component);

TreePicker.propTypes = {
  appearance: PropTypes.oneOf(['default', 'subtle']),
  data: PropTypes.array,
  open: PropTypes.bool,
  style: PropTypes.object,
  block: PropTypes.bool,
  value: PropTypes.any,
  height: PropTypes.number,
  inline: PropTypes.bool,
  locale: PropTypes.object,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  placement: PropTypes.oneOf(PLACEMENT),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  expandAll: PropTypes.bool,
  cleanable: PropTypes.bool,
  virtualized: PropTypes.bool,
  searchable: PropTypes.bool,
  classPrefix: PropTypes.string,
  childrenKey: PropTypes.string,
  placeholder: PropTypes.node,
  defaultOpen: PropTypes.bool,
  defaultValue: PropTypes.any,
  menuStyle: PropTypes.object,
  menuClassName: PropTypes.string,
  menuAutoWidth: PropTypes.bool,
  searchKeyword: PropTypes.string,
  defaultExpandAll: PropTypes.bool,
  containerPadding: PropTypes.number,
  disabledItemValues: PropTypes.array,
  expandItemValues: PropTypes.array,
  defaultExpandItemValues: PropTypes.array,
  toggleComponentClass: PropTypes.elementType,
  onOpen: PropTypes.func,
  onExit: PropTypes.func,
  onEnter: PropTypes.func,
  onClose: PropTypes.func,
  onHide: PropTypes.func,
  onSearch: PropTypes.func,
  onClean: PropTypes.func,
  onChange: PropTypes.func,
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
  onExited: PropTypes.func,
  onEntered: PropTypes.func,
  onExiting: PropTypes.func,
  onEntering: PropTypes.func,
  renderMenu: PropTypes.func,
  renderValue: PropTypes.func,
  renderTreeNode: PropTypes.func,
  renderTreeIcon: PropTypes.func,
  renderExtraFooter: PropTypes.func
};
TreePicker.defaultProps = {
  locale: {
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  },
  inline: false,
  valueKey: 'value',
  labelKey: 'label',
  cleanable: true,
  placement: 'bottomStart',
  searchable: true,
  appearance: 'default',
  childrenKey: 'children',
  virtualized: false,
  menuAutoWidth: true
};
polyfill(TreePicker);
export default compose(defaultProps({
  classPrefix: 'picker'
}), withPickerMethods())(TreePicker);