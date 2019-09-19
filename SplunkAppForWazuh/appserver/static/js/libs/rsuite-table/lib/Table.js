'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _eq2 = require('lodash/eq');

var _eq3 = _interopRequireDefault(_eq2);

var _debounce2 = require('lodash/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _flatten2 = require('lodash/flatten');

var _flatten3 = _interopRequireDefault(_flatten2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _intersection2 = require('lodash/intersection');

var _intersection3 = _interopRequireDefault(_intersection2);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _elementResizeEvent = require('element-resize-event');

var _elementResizeEvent2 = _interopRequireDefault(_elementResizeEvent);

var _domLib = require('dom-lib');

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _CellGroup = require('./CellGroup');

var _CellGroup2 = _interopRequireDefault(_CellGroup);

var _Scrollbar = require('./Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _utils = require('./utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ReactChildren = React.Children;
var CELL_PADDING_HEIGHT = 26;
var columnHandledProps = ['align', 'verticalAlign', 'width', 'fixed', 'resizable', 'flexGrow', 'minWidth', 'colSpan'];

var SORT_TYPE = {
  DESC: 'desc',
  ASC: 'asc'
};

var SCROLLBAR_WIDHT = 10;

function findRowKeys(rows, rowKey, expanded) {
  var keys = [];
  for (var i = 0; i < rows.length; i++) {
    var item = rows[i];
    if (item.children) {
      keys.push(item[rowKey]);
      keys = [].concat(_toConsumableArray(keys), _toConsumableArray(findRowKeys(item.children, rowKey)));
    } else if (expanded) {
      keys.push(item[rowKey]);
    }
  }
  return keys;
}

function findAllParents(rowData, rowKey) {
  var parents = [];

  if (!rowData) {
    return parents;
  }

  function findParent(data) {
    if (data) {
      parents.push(data[rowKey]);
      if (data._parent) {
        findParent(data._parent);
      }
    }
  }
  findParent(rowData._parent);
  return parents;
}

function shouldShowRowByExpanded() {
  var expandedRowKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var parentKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var intersectionKeys = (0, _intersection3.default)(expandedRowKeys, parentKeys);
  if (intersectionKeys.length === parentKeys.length) {
    return true;
  }
  return false;
}

function resetLeftForCells(cells) {
  var left = 0;
  var nextCells = [];

  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    var nextCell = React.cloneElement(cell, { left: left });
    left += cell.props.width;
    nextCells.push(nextCell);
  }

  return nextCells;
}

function getRandomKey(index) {
  return '_' + (Math.random() * 1e18).toString(36).slice(0, 5).toUpperCase() + '_' + index;
}

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  _createClass(Table, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      if (props.data !== state.cacheData) {
        return {
          cacheData: props.data,
          data: props.isTree ? (0, _utils.flattenData)(props.data) : props.data
        };
      }
      return null;
    }
  }]);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _initialiseProps.call(_this);

    var width = props.width,
        data = props.data,
        rowKey = props.rowKey,
        defaultExpandAllRows = props.defaultExpandAllRows,
        renderRowExpanded = props.renderRowExpanded,
        defaultExpandedRowKeys = props.defaultExpandedRowKeys,
        _props$children = props.children,
        children = _props$children === undefined ? [] : _props$children,
        isTree = props.isTree,
        defaultSortType = props.defaultSortType;


    var expandedRowKeys = defaultExpandAllRows ? findRowKeys(data, rowKey, (0, _isFunction3.default)(renderRowExpanded)) : defaultExpandedRowKeys || [];

    var shouldFixedColumn = Array.from(children).some(function (child) {
      return child && child.props && child.props.fixed;
    });

    if (isTree && !rowKey) {
      throw new Error('The `rowKey` is required when set isTree');
    }
    _this.state = {
      expandedRowKeys: expandedRowKeys,
      shouldFixedColumn: shouldFixedColumn,
      cacheData: data,
      data: isTree ? (0, _utils.flattenData)(data) : data,
      width: width || 0,
      columnWidth: 0,
      dataKey: 0,
      contentHeight: 0,
      contentWidth: 0,
      tableRowsMaxHeight: [],
      sortType: defaultSortType,
      scrollY: 0,
      isScrolling: false
    };

    _this.scrollY = 0;
    _this.scrollX = 0;
    _this.wheelHandler = new _domLib.WheelHandler(_this._listenWheel, _this.shouldHandleWheelX, _this.shouldHandleWheelY, false);

    _this._cacheChildrenSize = (0, _flatten3.default)(children).length;
    return _this;
  }

  _createClass(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.calculateTableWidth();
      this.calculateTableContextHeight();
      this.calculateRowMaxHeight();
      (0, _elementResizeEvent2.default)(this.table, (0, _debounce3.default)(this.calculateTableWidth, 400));

      var options = { passive: false };

      this.wheelListener = (0, _domLib.on)(this.tableBody, 'wheel', this.wheelHandler.onWheel, options);
      this.touchStartListener = (0, _domLib.on)(this.tableBody, 'touchstart', this.handleTouchStart, options);
      this.touchMoveListener = (0, _domLib.on)(this.tableBody, 'touchmove', this.handleTouchMove, options);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _cacheChildrenSize = (0, _flatten3.default)(nextProps.children || []).length;
      if (_cacheChildrenSize !== this._cacheChildrenSize) {
        this._cacheChildrenSize = _cacheChildrenSize;
        this._cacheCells = null;
      }

      if (this.props.children !== nextProps.children) {
        this._cacheCells = null;
      }

      return !(0, _eq3.default)(this.props, nextProps) || !(0, _isEqual3.default)(this.state, nextState);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.calculateTableContextHeight(prevProps);
      this.calculateTableContentWidth(prevProps);
      this.calculateRowMaxHeight();
      this.updatePosition();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.wheelHandler = null;
      if (this.table) {
        (0, _elementResizeEvent.unbind)(this.table);
      }
      if (this.wheelListener) {
        this.wheelListener.off();
      }

      if (this.touchStartListener) {
        this.touchStartListener.off();
      }

      if (this.touchMoveListener) {
        this.touchMoveListener.off();
      }
    }
  }, {
    key: 'getExpandedRowKeys',
    value: function getExpandedRowKeys() {
      var expandedRowKeys = this.props.expandedRowKeys;

      return (0, _isUndefined3.default)(expandedRowKeys) ? this.state.expandedRowKeys : expandedRowKeys;
    }
  }, {
    key: 'getSortType',
    value: function getSortType() {
      var sortType = this.props.sortType;

      return (0, _isUndefined3.default)(sortType) ? this.state.sortType : sortType;
    }
  }, {
    key: 'getScrollCellGroups',
    value: function getScrollCellGroups() {
      return this.table.querySelectorAll('.' + this.addPrefix('cell-group-scroll'));
    }
  }, {
    key: 'getFixedLeftCellGroups',
    value: function getFixedLeftCellGroups() {
      return this.table.querySelectorAll('.' + this.addPrefix('cell-group-fixed-left'));
    }
  }, {
    key: 'getFixedRightCellGroups',
    value: function getFixedRightCellGroups() {
      return this.table.querySelectorAll('.' + this.addPrefix('cell-group-fixed-right'));
    }

    /**
     * 获取表头高度
     */

  }, {
    key: 'getTableHeaderHeight',
    value: function getTableHeaderHeight() {
      var _props = this.props,
          headerHeight = _props.headerHeight,
          showHeader = _props.showHeader;

      return showHeader ? headerHeight : 0;
    }

    /**
     * 获取 Table 需要渲染的高度
     */

  }, {
    key: 'getTableHeight',
    value: function getTableHeight() {
      var contentHeight = this.state.contentHeight;
      var _props2 = this.props,
          minHeight = _props2.minHeight,
          height = _props2.height,
          autoHeight = _props2.autoHeight,
          data = _props2.data;

      var headerHeight = this.getTableHeaderHeight();

      if (data.length === 0 && autoHeight) {
        return height;
      }

      return autoHeight ? Math.max(headerHeight + contentHeight, minHeight) : height;
    }
  }, {
    key: 'getCells',
    value: function getCells() {
      var _this2 = this;

      if (this._cacheCells) {
        return this._cacheCells;
      }
      var left = 0; // Cell left margin
      var headerCells = []; // Table header cell
      var bodyCells = []; // Table body cell
      var columns = this.props.children;

      if (!columns) {
        this._cacheCells = {
          headerCells: headerCells,
          bodyCells: bodyCells,
          allColumnsWidth: left
        };
        return this._cacheCells;
      }

      var tableWidth = this.state.width;
      var _props3 = this.props,
          sortColumn = _props3.sortColumn,
          rowHeight = _props3.rowHeight,
          showHeader = _props3.showHeader;

      var headerHeight = this.getTableHeaderHeight();

      var _getTotalByColumns = (0, _utils.getTotalByColumns)(columns),
          totalFlexGrow = _getTotalByColumns.totalFlexGrow,
          totalWidth = _getTotalByColumns.totalWidth;

      ReactChildren.forEach(columns, function (column, index) {
        if (React.isValidElement(column)) {
          var columnChildren = column.props.children;
          var _column$props = column.props,
              _width = _column$props.width,
              resizable = _column$props.resizable,
              flexGrow = _column$props.flexGrow,
              minWidth = _column$props.minWidth,
              onResize = _column$props.onResize;


          if (resizable && flexGrow) {
            console.warn('Cannot set \'resizable\' and \'flexGrow\' together in <Column>, column index: ' + index);
          }

          if (columnChildren.length !== 2) {
            throw new Error('Component <HeaderCell> and <Cell> is required, column index: ' + index + ' ');
          }

          var nextWidth = _this2.state[columnChildren[1].props.dataKey + '_' + index + '_width'] || _width || 0;

          if (tableWidth && flexGrow && totalFlexGrow) {
            nextWidth = Math.max((tableWidth - totalWidth) / totalFlexGrow * flexGrow, minWidth || 60);
          }

          var cellProps = _extends({}, (0, _pick3.default)(column.props, columnHandledProps), {
            left: left,
            index: index,
            headerHeight: headerHeight,
            key: index,
            width: nextWidth,
            height: rowHeight,
            firstColumn: index === 0,
            lastColumn: index === columns.length - 1
          });

          if (showHeader && headerHeight) {
            var headerCellProps = {
              dataKey: columnChildren[1].props.dataKey,
              isHeaderCell: true,
              sortable: column.props.sortable,
              onSortColumn: _this2.handleSortColumn,
              sortType: _this2.getSortType(),
              sortColumn: sortColumn,
              flexGrow: flexGrow
            };

            if (resizable) {
              (0, _merge3.default)(headerCellProps, {
                onResize: onResize,
                onColumnResizeEnd: _this2.handleColumnResizeEnd,
                onColumnResizeStart: _this2.handleColumnResizeStart,
                onColumnResizeMove: _this2.handleColumnResizeMove
              });
            }

            headerCells.push(React.cloneElement(columnChildren[0], _extends({}, cellProps, headerCellProps)));
          }

          bodyCells.push(React.cloneElement(columnChildren[1], cellProps));

          left += nextWidth;
        }
      });

      this._cacheCells = {
        headerCells: headerCells,
        bodyCells: bodyCells,
        allColumnsWidth: left
      };

      return this._cacheCells;
    }

    // 处理移动端 Touch 事件,  Start 的时候初始化 x,y


    // 处理移动端 Touch 事件, Move 的时候初始化，更新 scroll


    /**
     * 当用户在 Table 内使用 tab 键，触发了 onScroll 事件，这个时候应该更新滚动条位置
     * Fix: https://github.com/rsuite/rsuite/issues/234
     */

  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      /**
       * 当存在锁定列情况处理
       */
      if (this.state.shouldFixedColumn) {
        this.updatePositionByFixedCell();
      } else {
        var wheelStyle = {};
        var headerStyle = {};
        (0, _domLib.translateDOMPositionXY)(wheelStyle, this.scrollX, this.scrollY);
        (0, _domLib.translateDOMPositionXY)(headerStyle, this.scrollX, 0);

        this.wheelWrapper && (0, _domLib.addStyle)(this.wheelWrapper, wheelStyle);
        this.headerWrapper && (0, _domLib.addStyle)(this.headerWrapper, headerStyle);
      }

      if (this.tableHeader) {
        (0, _utils.toggleClass)(this.tableHeader, this.addPrefix('cell-group-shadow'), this.scrollY < 0);
      }
    }
  }, {
    key: 'updatePositionByFixedCell',
    value: function updatePositionByFixedCell() {
      var wheelGroupStyle = {};
      var wheelStyle = {};
      var scrollGroups = this.getScrollCellGroups();
      var fixedLeftGroups = this.getFixedLeftCellGroups();
      var fixedRightGroups = this.getFixedRightCellGroups();

      var _state = this.state,
          contentWidth = _state.contentWidth,
          width = _state.width;


      (0, _domLib.translateDOMPositionXY)(wheelGroupStyle, this.scrollX, 0);
      (0, _domLib.translateDOMPositionXY)(wheelStyle, 0, this.scrollY);

      var scrollArrayGroups = Array.from(scrollGroups);

      for (var i = 0; i < scrollArrayGroups.length; i++) {
        var group = scrollArrayGroups[i];
        (0, _domLib.addStyle)(group, wheelGroupStyle);
      }

      if (this.wheelWrapper) {
        (0, _domLib.addStyle)(this.wheelWrapper, wheelStyle);
      }

      var leftShadowClassName = this.addPrefix('cell-group-left-shadow');
      var rightShadowClassName = this.addPrefix('cell-group-right-shadow');
      var showLeftShadow = this.scrollX < 0;
      var showRightShadow = width - contentWidth - SCROLLBAR_WIDHT !== this.scrollX;

      (0, _utils.toggleClass)(fixedLeftGroups, leftShadowClassName, showLeftShadow);
      (0, _utils.toggleClass)(fixedRightGroups, rightShadowClassName, showRightShadow);
    }
  }, {
    key: 'shouldRenderExpandedRow',
    value: function shouldRenderExpandedRow(rowData) {
      var _props4 = this.props,
          rowKey = _props4.rowKey,
          renderRowExpanded = _props4.renderRowExpanded,
          isTree = _props4.isTree;

      var expandedRowKeys = this.getExpandedRowKeys() || [];

      return (0, _isFunction3.default)(renderRowExpanded) && !isTree && expandedRowKeys.some(function (key) {
        return key === rowData[rowKey];
      });
    }
  }, {
    key: 'calculateRowMaxHeight',
    value: function calculateRowMaxHeight() {
      var wordWrap = this.props.wordWrap;

      if (wordWrap) {
        var _tableRowsMaxHeight = [];
        var tableRows = Object.entries(this.tableRows);

        for (var i = 0; i < tableRows.length; i++) {
          var _tableRows$i = _slicedToArray(tableRows[i], 2),
              row = _tableRows$i[1];

          if (row) {
            var cells = row.querySelectorAll('.' + this.addPrefix('cell-wrap')) || [];
            var maxHeight = 0;
            var cellArray = Array.from(cells);
            for (var j = 0; j < cellArray.length; j++) {
              var cell = cellArray[j];
              var h = (0, _domLib.getHeight)(cell);
              maxHeight = Math.max(maxHeight, h);
            }
            _tableRowsMaxHeight.push(maxHeight);
          }
        }

        this.setState({ tableRowsMaxHeight: _tableRowsMaxHeight });
      }
    }
  }, {
    key: 'calculateTableContentWidth',
    value: function calculateTableContentWidth(prevProps) {
      var table = this.table;
      var row = table.querySelector('.' + this.addPrefix('row') + ':not(.virtualized)');
      var contentWidth = row ? (0, _domLib.getWidth)(row) : 0;

      this.setState({ contentWidth: contentWidth });
      // 这里 -10 是为了让滚动条不挡住内容部分
      this.minScrollX = -(contentWidth - this.state.width) - SCROLLBAR_WIDHT;

      /**
       * 1.判断 Table 列数是否发生变化
       * 2.判断 Table 内容区域是否宽度有变化
       *
       *
       * 满足 1 和 2 则更新横向滚动条位置
       */

      if ((0, _flatten3.default)(this.props.children).length !== (0, _flatten3.default)(prevProps.children).length && this.state.contentWidth !== contentWidth) {
        this.scrollLeft(0);
      }
    }
  }, {
    key: 'calculateTableContextHeight',
    value: function calculateTableContextHeight(prevProps) {
      var table = this.table;
      var rows = table.querySelectorAll('.' + this.addPrefix('row')) || [];
      var _props5 = this.props,
          height = _props5.height,
          autoHeight = _props5.autoHeight,
          rowHeight = _props5.rowHeight;

      var headerHeight = this.getTableHeaderHeight();
      var contentHeight = rows.length ? Array.from(rows).map(function (row) {
        return (0, _domLib.getHeight)(row) || rowHeight;
      }).reduce(function (x, y) {
        return x + y;
      }) : 0;

      var nextContentHeight = contentHeight - headerHeight;
      this.setState({
        contentHeight: nextContentHeight
      });

      // 如果 data 更新，则更新滚动条位置
      if (prevProps && prevProps.data !== this.props.data) {
        var top = Math.abs(this.scrollY) / nextContentHeight * (height - headerHeight);
        this.scrollbarY.resetScrollBarPosition(top);
      }

      if (!autoHeight) {
        // 这里 -10 是为了让滚动条不挡住内容部分
        this.minScrollY = -(contentHeight - height) - 10;
      }

      // 如果内容区域的高度小于表格的高度，则重置 Y 坐标滚动条
      if (contentHeight < height) {
        this.scrollTop(0);
      }

      // 如果 scrollTop 的值大于可以滚动的范围 ，则重置 Y 坐标滚动条
      // 当 Table 为 virtualized 时， wheel 事件触发每次都会进入该逻辑， 避免在滚动到底部后滚动条重置, +10
      if (Math.abs(this.scrollY) > contentHeight - height + 10) {
        this.scrollTop(0);
      }
    }

    // public method


    // public method

  }, {
    key: 'renderRowData',
    value: function renderRowData(bodyCells, rowData, props, shouldRenderExpandedRow) {
      var _props6 = this.props,
          renderTreeToggle = _props6.renderTreeToggle,
          rowKey = _props6.rowKey,
          wordWrap = _props6.wordWrap,
          isTree = _props6.isTree;

      var hasChildren = isTree && rowData.children && Array.isArray(rowData.children);
      var nextRowKey = typeof rowData[rowKey] !== 'undefined' ? rowData[rowKey] : getRandomKey(props.index);

      var rowProps = {
        rowRef: this.bindTableRowsRef(props.index),
        onClick: this.bindRowClick(rowData),
        key: props.index,
        width: props.rowWidth,
        height: props.rowHeight,
        top: props.top
      };

      var expandedRowKeys = this.getExpandedRowKeys() || [];
      var expanded = expandedRowKeys.some(function (key) {
        return key === rowData[rowKey];
      });
      var cells = [];

      for (var i = 0; i < bodyCells.length; i++) {
        var cell = bodyCells[i];
        cells.push(React.cloneElement(cell, {
          hasChildren: hasChildren,
          rowData: rowData,
          wordWrap: wordWrap,
          renderTreeToggle: renderTreeToggle,
          height: props.rowHeight,
          rowIndex: props.index,
          depth: props.depth,
          onTreeToggle: this.handleTreeToggle,
          rowKey: nextRowKey,
          className: (0, _classnames2.default)(_defineProperty({}, this.addPrefix('cell-expanded'), expanded))
        }));
      }

      return this.renderRow(rowProps, cells, shouldRenderExpandedRow, rowData);
    }
  }, {
    key: 'renderRow',
    value: function renderRow(props, cells, shouldRenderExpandedRow, rowData) {
      var rowClassName = this.props.rowClassName;
      var _state2 = this.state,
          shouldFixedColumn = _state2.shouldFixedColumn,
          width = _state2.width,
          contentWidth = _state2.contentWidth;


      if (typeof rowClassName === 'function') {
        props.className = rowClassName(rowData);
      } else {
        props.className = rowClassName;
      }

      // IF there are fixed columns, add a fixed group
      if (shouldFixedColumn && contentWidth > width) {
        var fixedLeftCells = [];
        var fixedRightCells = [];
        var scrollCells = [];
        var fixedLeftCellGroupWidth = 0;
        var fixedRightCellGroupWidth = 0;

        for (var i = 0; i < cells.length; i++) {
          var cell = cells[i];
          var _cell$props = cell.props,
              fixed = _cell$props.fixed,
              _width2 = _cell$props.width;

          if (fixed === true || fixed === 'left') {
            fixedLeftCells.push(cell);
            fixedLeftCellGroupWidth += _width2;
          } else if (fixed === 'right') {
            fixedRightCells.push(cell);
            fixedRightCellGroupWidth += _width2;
          } else {
            scrollCells.push(cell);
          }
        }

        return React.createElement(
          _Row2.default,
          props,
          fixedLeftCellGroupWidth ? React.createElement(
            _CellGroup2.default,
            {
              fixed: 'left',
              height: props.isHeaderRow ? props.headerHeight : props.height,
              width: fixedLeftCellGroupWidth
            },
            (0, _utils.colSpanCells)(fixedLeftCells)
          ) : null,
          React.createElement(
            _CellGroup2.default,
            null,
            (0, _utils.colSpanCells)(scrollCells)
          ),
          fixedRightCellGroupWidth ? React.createElement(
            _CellGroup2.default,
            {
              fixed: 'right',
              style: { left: width - fixedRightCellGroupWidth - SCROLLBAR_WIDHT },
              height: props.isHeaderRow ? props.headerHeight : props.height,
              width: fixedRightCellGroupWidth
            },
            (0, _utils.colSpanCells)(resetLeftForCells(fixedRightCells))
          ) : null,
          shouldRenderExpandedRow && this.renderRowExpanded(rowData)
        );
      }

      return React.createElement(
        _Row2.default,
        props,
        React.createElement(
          _CellGroup2.default,
          null,
          (0, _utils.colSpanCells)(cells)
        ),
        shouldRenderExpandedRow && this.renderRowExpanded(rowData)
      );
    }
  }, {
    key: 'renderRowExpanded',
    value: function renderRowExpanded(rowData) {
      var _props7 = this.props,
          renderRowExpanded = _props7.renderRowExpanded,
          rowExpandedHeight = _props7.rowExpandedHeight;

      var styles = {
        height: rowExpandedHeight
      };

      if (typeof renderRowExpanded === 'function') {
        return React.createElement(
          'div',
          { className: this.addPrefix('row-expanded'), style: styles },
          renderRowExpanded(rowData)
        );
      }
      return null;
    }
  }, {
    key: 'renderMouseArea',
    value: function renderMouseArea() {
      var headerHeight = this.getTableHeaderHeight();
      var styles = { height: this.getTableHeight() };
      var spanStyles = { height: headerHeight - 1 };

      return React.createElement(
        'div',
        { ref: this.bindMouseAreaRef, className: this.addPrefix('mouse-area'), style: styles },
        React.createElement('span', { style: spanStyles })
      );
    }
  }, {
    key: 'renderTableHeader',
    value: function renderTableHeader(headerCells, rowWidth) {
      var rowHeight = this.props.rowHeight;

      var headerHeight = this.getTableHeaderHeight();
      var rowProps = {
        rowRef: this.bindTableHeaderRef,
        width: rowWidth,
        height: rowHeight,
        headerHeight: headerHeight,
        isHeaderRow: true,
        top: 0
      };

      return React.createElement(
        'div',
        { className: this.addPrefix('header-row-wrapper'), ref: this.bindHeaderWrapperRef },
        this.renderRow(rowProps, headerCells)
      );
    }
  }, {
    key: 'renderTableBody',
    value: function renderTableBody(bodyCells, rowWidth) {
      var _props8 = this.props,
          rowHeight = _props8.rowHeight,
          rowExpandedHeight = _props8.rowExpandedHeight,
          isTree = _props8.isTree,
          setRowHeight = _props8.setRowHeight,
          rowKey = _props8.rowKey,
          wordWrap = _props8.wordWrap,
          virtualized = _props8.virtualized;


      var headerHeight = this.getTableHeaderHeight();
      var _state3 = this.state,
          tableRowsMaxHeight = _state3.tableRowsMaxHeight,
          isScrolling = _state3.isScrolling,
          data = _state3.data;

      var height = this.getTableHeight();
      var bodyStyles = {
        top: headerHeight,
        height: height - headerHeight
      };

      var top = 0; // Row position
      var bodyHeight = 0;
      var topHideHeight = 0;
      var bottomHideHeight = 0;

      this._rows = [];

      if (data) {
        var minTop = Math.abs(this.state.scrollY);
        var maxTop = minTop + height + rowExpandedHeight;

        for (var index = 0; index < data.length; index++) {
          var _rowData = data[index];
          var maxHeight = tableRowsMaxHeight[index];
          var nextRowHeight = maxHeight ? maxHeight + CELL_PADDING_HEIGHT : rowHeight;
          var shouldRenderExpandedRow = this.shouldRenderExpandedRow(_rowData);
          var depth = 0;

          if (shouldRenderExpandedRow) {
            nextRowHeight += rowExpandedHeight;
          }

          if (isTree) {
            var parents = findAllParents(_rowData, rowKey);
            var _expandedRowKeys = this.getExpandedRowKeys();
            depth = parents.length;

            // 树节点如果被关闭，则不渲染
            if (!shouldShowRowByExpanded(_expandedRowKeys, parents)) {
              continue;
            }
          }

          /**
           * 自定义行高
           */
          if (setRowHeight) {
            nextRowHeight = setRowHeight(_rowData) || rowHeight;
          }

          bodyHeight += nextRowHeight;

          var rowProps = {
            index: index,
            top: top,
            rowWidth: rowWidth,
            depth: depth,
            rowHeight: nextRowHeight
          };

          top += nextRowHeight;

          if (virtualized && !wordWrap) {
            if (top + nextRowHeight < minTop) {
              topHideHeight += nextRowHeight;
              continue;
            } else if (top > maxTop) {
              bottomHideHeight += nextRowHeight;
              continue;
            }
          }

          this._rows.push(this.renderRowData(bodyCells, _rowData, rowProps, shouldRenderExpandedRow));
        }
      }

      var wheelStyles = {
        position: 'absolute',
        height: bodyHeight,
        minHeight: height,
        pointerEvents: isScrolling ? 'none' : ''
      };
      var topRowStyles = { height: topHideHeight };
      var bottomRowStyles = { height: bottomHideHeight };

      return React.createElement(
        'div',
        {
          ref: this.bindBodyRef,
          className: this.addPrefix('body-row-wrapper'),
          style: bodyStyles,
          onScroll: this.handleBodyScroll
        },
        React.createElement(
          'div',
          {
            style: wheelStyles,
            className: this.addPrefix('body-wheel-area'),
            ref: this.bindWheelWrapperRef
          },
          topHideHeight ? React.createElement(_Row2.default, { style: topRowStyles, className: 'virtualized' }) : null,
          this._rows,
          bottomHideHeight ? React.createElement(_Row2.default, { style: bottomRowStyles, className: 'virtualized' }) : null
        ),
        this.renderInfo(),
        this.renderScrollbar(),
        this.renderLoading()
      );
    }
  }, {
    key: 'renderInfo',
    value: function renderInfo() {
      if (this._rows.length) {
        return null;
      }
      var _props9 = this.props,
          locale = _props9.locale,
          renderEmpty = _props9.renderEmpty;

      var emptyMessage = React.createElement(
        'div',
        { className: this.addPrefix('body-info') },
        locale.emptyMessage
      );

      return renderEmpty ? renderEmpty(emptyMessage) : emptyMessage;
    }
  }, {
    key: 'renderScrollbar',
    value: function renderScrollbar() {
      var disabledScroll = this.props.disabledScroll;
      var _state4 = this.state,
          contentWidth = _state4.contentWidth,
          contentHeight = _state4.contentHeight;


      var headerHeight = this.getTableHeaderHeight();
      var height = this.getTableHeight();

      if (disabledScroll) {
        return null;
      }

      return React.createElement(
        'div',
        null,
        React.createElement(_Scrollbar2.default, {
          length: this.state.width,
          onScroll: this.handleScrollX,
          scrollLength: contentWidth,
          ref: this.bindScrollbarXRef
        }),
        React.createElement(_Scrollbar2.default, {
          vertical: true,
          length: height - headerHeight,
          scrollLength: contentHeight,
          onScroll: this.handleScrollY,
          ref: this.bindScrollbarYRef
        })
      );
    }

    /**
     *  show loading
     */

  }, {
    key: 'renderLoading',
    value: function renderLoading() {
      var _props10 = this.props,
          locale = _props10.locale,
          loading = _props10.loading,
          loadAnimation = _props10.loadAnimation,
          renderLoading = _props10.renderLoading;


      if (!loadAnimation && !loading) {
        return null;
      }

      var loadingElement = React.createElement(
        'div',
        { className: this.addPrefix('loader-wrapper') },
        React.createElement(
          'div',
          { className: this.addPrefix('loader') },
          React.createElement('i', { className: this.addPrefix('loader-icon') }),
          React.createElement(
            'span',
            { className: this.addPrefix('loader-text') },
            locale.loading
          )
        )
      );

      return renderLoading ? renderLoading(loadingElement) : loadingElement;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames2;

      var _props11 = this.props,
          children = _props11.children,
          className = _props11.className,
          _props11$width = _props11.width,
          width = _props11$width === undefined ? 0 : _props11$width,
          style = _props11.style,
          isTree = _props11.isTree,
          hover = _props11.hover,
          bordered = _props11.bordered,
          cellBordered = _props11.cellBordered,
          wordWrap = _props11.wordWrap,
          classPrefix = _props11.classPrefix,
          loading = _props11.loading,
          showHeader = _props11.showHeader,
          rest = _objectWithoutProperties(_props11, ['children', 'className', 'width', 'style', 'isTree', 'hover', 'bordered', 'cellBordered', 'wordWrap', 'classPrefix', 'loading', 'showHeader']);

      var isColumnResizing = this.state.isColumnResizing;

      var _getCells = this.getCells(),
          headerCells = _getCells.headerCells,
          bodyCells = _getCells.bodyCells,
          allColumnsWidth = _getCells.allColumnsWidth;

      var rowWidth = allColumnsWidth > width ? allColumnsWidth : width;
      var clesses = (0, _classnames2.default)(classPrefix, className, (_classNames2 = {}, _defineProperty(_classNames2, this.addPrefix('word-wrap'), wordWrap), _defineProperty(_classNames2, this.addPrefix('treetable'), isTree), _defineProperty(_classNames2, this.addPrefix('bordered'), bordered), _defineProperty(_classNames2, this.addPrefix('cell-bordered'), cellBordered), _defineProperty(_classNames2, this.addPrefix('column-resizing'), isColumnResizing), _defineProperty(_classNames2, this.addPrefix('hover'), hover), _defineProperty(_classNames2, this.addPrefix('loading'), loading), _classNames2));

      var styles = _extends({
        width: width || 'auto',
        height: this.getTableHeight()
      }, style);

      var unhandled = (0, _utils.getUnhandledProps)(Table, rest);

      return React.createElement(
        'div',
        _extends({}, unhandled, { className: clesses, style: styles, ref: this.bindTableRef }),
        showHeader && this.renderTableHeader(headerCells, rowWidth),
        children && this.renderTableBody(bodyCells, rowWidth),
        showHeader && this.renderMouseArea()
      );
    }
  }]);

  return Table;
}(React.Component);

Table.defaultProps = {
  classPrefix: (0, _utils.defaultClassPrefix)('table'),
  data: [],
  defaultSortType: SORT_TYPE.DESC,
  height: 200,
  rowHeight: 46,
  headerHeight: 40,
  minHeight: 0,
  rowExpandedHeight: 100,
  hover: true,
  showHeader: true,
  virtualized: false,
  rowKey: 'key',
  locale: {
    emptyMessage: 'No data found',
    loading: 'Loading...'
  }
};
Table.handledProps = ['autoHeight', 'bodyRef', 'bordered', 'cellBordered', 'children', 'className', 'classPrefix', 'data', 'defaultExpandAllRows', 'defaultExpandedRowKeys', 'defaultSortType', 'disabledScroll', 'expandedRowKeys', 'headerHeight', 'height', 'hover', 'isTree', 'loadAnimation', 'loading', 'locale', 'minHeight', 'onExpandChange', 'onRowClick', 'onScroll', 'onSortColumn', 'onTouchMove', 'onTouchStart', 'renderEmpty', 'renderLoading', 'renderRowExpanded', 'renderTreeToggle', 'rowClassName', 'rowExpandedHeight', 'rowHeight', 'rowKey', 'setRowHeight', 'showHeader', 'sortColumn', 'sortType', 'style', 'virtualized', 'width', 'wordWrap'];
Table.propTypes = {
  width: _propTypes2.default.number,
  data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  height: _propTypes2.default.number.isRequired,
  autoHeight: _propTypes2.default.bool,
  minHeight: _propTypes2.default.number.isRequired,
  rowHeight: _propTypes2.default.number.isRequired,
  headerHeight: _propTypes2.default.number.isRequired,
  setRowHeight: _propTypes2.default.func,
  rowKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  isTree: _propTypes2.default.bool,
  defaultExpandAllRows: _propTypes2.default.bool,
  defaultExpandedRowKeys: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),
  expandedRowKeys: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),
  renderTreeToggle: _propTypes2.default.func,
  renderRowExpanded: _propTypes2.default.func,
  rowExpandedHeight: _propTypes2.default.number,
  locale: _propTypes2.default.object.isRequired,
  style: _propTypes2.default.object,
  sortColumn: _propTypes2.default.string,
  sortType: _propTypes2.default.oneOf(['desc', 'asc']),
  defaultSortType: _propTypes2.default.oneOf(['desc', 'asc']),
  disabledScroll: _propTypes2.default.bool,
  hover: _propTypes2.default.bool.isRequired,
  loading: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  classPrefix: _propTypes2.default.string,
  children: function children() {
    return (typeof (React.ChildrenArray == null ? {} : React.ChildrenArray) === 'function' ? _propTypes2.default.instanceOf(React.ChildrenArray == null ? {} : React.ChildrenArray).isRequired : _propTypes2.default.any.isRequired).apply(this, arguments);
  },
  bordered: _propTypes2.default.bool,
  cellBordered: _propTypes2.default.bool,
  wordWrap: _propTypes2.default.bool,
  onRowClick: _propTypes2.default.func,
  onScroll: _propTypes2.default.func,
  onSortColumn: _propTypes2.default.func,
  onExpandChange: _propTypes2.default.func,
  onTouchStart: _propTypes2.default.func,
  // for tests
  onTouchMove: _propTypes2.default.func,
  // for tests
  bodyRef: function bodyRef() {
    return (typeof (React.ElementRef == null ? {} : React.ElementRef) === 'function' ? _propTypes2.default.instanceOf(React.ElementRef == null ? {} : React.ElementRef) : _propTypes2.default.any).apply(this, arguments);
  },
  loadAnimation: _propTypes2.default.bool,
  showHeader: _propTypes2.default.bool,
  rowClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  virtualized: _propTypes2.default.bool,
  renderEmpty: _propTypes2.default.func,
  renderLoading: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._listenWheel = function (deltaX, deltaY) {
    _this3.handleWheel(deltaX, deltaY);
    if (_this3.scrollbarX) {
      _this3.scrollbarX.onWheelScroll(deltaX);
    }

    if (_this3.scrollbarY) {
      _this3.scrollbarY.onWheelScroll(deltaY);
    }
  };

  this.handleSortColumn = function (dataKey) {
    var _props12 = _this3.props,
        onSortColumn = _props12.onSortColumn,
        sortColumn = _props12.sortColumn;

    var sortType = _this3.getSortType();

    if (sortColumn === dataKey) {
      sortType = sortType === SORT_TYPE.ASC ? SORT_TYPE.DESC : SORT_TYPE.ASC;
      _this3.setState({
        sortType: sortType
      });
    }
    onSortColumn && onSortColumn(dataKey, sortType);
  };

  this._cacheCells = null;
  this._cacheChildrenSize = 0;

  this.handleColumnResizeEnd = function (columnWidth, cursorDelta, dataKey, index) {
    _this3._cacheCells = null;
    _this3.setState(_defineProperty({
      isColumnResizing: false
    }, dataKey + '_' + index + '_width', columnWidth));

    (0, _domLib.addStyle)(_this3.mouseArea, {
      display: 'none'
    });
  };

  this.handleColumnResizeStart = function (width, left, fixed) {
    _this3.setState({
      isColumnResizing: true
    });
    var mouseAreaLeft = width + left;
    var x = fixed ? mouseAreaLeft : mouseAreaLeft + (_this3.scrollX || 0);
    var styles = { display: 'block' };
    (0, _domLib.translateDOMPositionXY)(styles, x, 0);
    (0, _domLib.addStyle)(_this3.mouseArea, styles);
  };

  this.handleColumnResizeMove = function (width, left, fixed) {
    var mouseAreaLeft = width + left;
    var x = fixed ? mouseAreaLeft : mouseAreaLeft + (_this3.scrollX || 0);
    var styles = {};
    (0, _domLib.translateDOMPositionXY)(styles, x, 0);
    (0, _domLib.addStyle)(_this3.mouseArea, styles);
  };

  this.handleTreeToggle = function (rowKey, rowIndex, rowData) {
    var onExpandChange = _this3.props.onExpandChange;

    var expandedRowKeys = _this3.getExpandedRowKeys();

    var open = false;
    var nextExpandedRowKeys = [];

    for (var i = 0; i < expandedRowKeys.length; i++) {
      var key = expandedRowKeys[i];
      if (key === rowKey) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    }

    if (!open) {
      nextExpandedRowKeys.push(rowKey);
    }
    _this3.setState({
      expandedRowKeys: nextExpandedRowKeys
    });
    onExpandChange && onExpandChange(!open, rowData);
  };

  this.handleScrollX = function (delta) {
    _this3.handleWheel(delta, 0);
  };

  this.handleScrollY = function (delta) {
    _this3.handleWheel(0, delta);
  };

  this.disableEventsTimeoutId = null;

  this.handleWheel = function (deltaX, deltaY) {
    var _props13 = _this3.props,
        onScroll = _props13.onScroll,
        virtualized = _props13.virtualized;

    if (!_this3.table) {
      return;
    }

    var nextScrollX = _this3.scrollX - deltaX;
    var nextScrollY = _this3.scrollY - deltaY;

    _this3.scrollY = Math.min(0, nextScrollY < _this3.minScrollY ? _this3.minScrollY : nextScrollY);
    _this3.scrollX = Math.min(0, nextScrollX < _this3.minScrollX ? _this3.minScrollX : nextScrollX);
    _this3.updatePosition();

    onScroll && onScroll(_this3.scrollX, _this3.scrollY);

    if (virtualized) {
      _this3.setState({
        isScrolling: true,
        scrollY: _this3.scrollY
      });

      if (_this3.disableEventsTimeoutId) {
        (0, _utils.cancelAnimationTimeout)(_this3.disableEventsTimeoutId);
      }

      _this3.disableEventsTimeoutId = (0, _utils.requestAnimationTimeout)(_this3.debounceScrollEndedCallback, 150);
    }
  };

  this.debounceScrollEndedCallback = function () {
    _this3.disableEventsTimeoutId = null;
    _this3.setState({
      isScrolling: false
    });
  };

  this.handleTouchStart = function (event) {
    var onTouchStart = _this3.props.onTouchStart;

    var _ref = event.touches ? event.touches[0] : {},
        pageX = _ref.pageX,
        pageY = _ref.pageY;

    _this3.touchX = pageX;
    _this3.touchY = pageY;
    onTouchStart && onTouchStart(event);
  };

  this.handleTouchMove = function (event) {
    event.stopPropagation();
    event.preventDefault();

    var onTouchMove = _this3.props.onTouchMove;

    var _ref2 = event.touches ? event.touches[0] : {},
        nextPageX = _ref2.pageX,
        nextPageY = _ref2.pageY;

    var deltaX = _this3.touchX - nextPageX;
    var deltaY = _this3.touchY - nextPageY;
    _this3.handleWheel(deltaX, deltaY);
    _this3.scrollbarX.onWheelScroll(deltaX);
    _this3.scrollbarY.onWheelScroll(deltaY);
    _this3.touchX = nextPageX;
    _this3.touchY = nextPageY;

    onTouchMove && onTouchMove(event);
  };

  this.handleBodyScroll = function (event) {
    if (event.target !== _this3.tableBody) {
      return;
    }

    var left = (0, _domLib.scrollLeft)(event.target);
    var top = (0, _domLib.scrollTop)(event.target);

    if (top === 0 && left === 0) {
      return;
    }

    _this3._listenWheel(left, top);

    (0, _domLib.scrollLeft)(event.target, 0);
    (0, _domLib.scrollTop)(event.target, 0);
  };

  this.shouldHandleWheelX = function (delta) {
    var _props14 = _this3.props,
        disabledScroll = _props14.disabledScroll,
        loading = _props14.loading;
    var _state5 = _this3.state,
        contentWidth = _state5.contentWidth,
        width = _state5.width;

    if (delta === 0 || disabledScroll || loading) {
      return false;
    }

    if (width && contentWidth <= width) {
      return false;
    }

    return delta >= 0 && _this3.scrollX > _this3.minScrollX || delta < 0 && _this3.scrollX < 0;
  };

  this.shouldHandleWheelY = function (delta) {
    var _props15 = _this3.props,
        disabledScroll = _props15.disabledScroll,
        loading = _props15.loading;

    if (delta === 0 || disabledScroll || loading) {
      return false;
    }
    return delta >= 0 && _this3.scrollY > _this3.minScrollY || delta < 0 && _this3.scrollY < 0;
  };

  this.tableRows = {};
  this.mounted = false;
  this.scrollY = 0;
  this.scrollX = 0;

  this.addPrefix = function (name) {
    return (0, _utils.prefix)(_this3.props.classPrefix)(name);
  };

  this.calculateTableWidth = function () {
    var table = _this3.table;
    if (table) {
      _this3.scrollX = 0;
      _this3.scrollbarX && _this3.scrollbarX.resetScrollBarPosition();
      _this3._cacheCells = null;
      _this3.setState({
        width: (0, _domLib.getWidth)(table)
      });
    }
  };

  this.scrollTop = function () {
    var top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    _this3.scrollY = -top;
    _this3.scrollbarY && _this3.scrollbarY.resetScrollBarPosition(top);

    _this3.setState({
      scrollY: -top
    });
  };

  this.scrollLeft = function () {
    var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    _this3.scrollX = -left;
    _this3.scrollbarX && _this3.scrollbarX.resetScrollBarPosition(left);
    _this3.updatePosition();
  };

  this.bindTableRowsRef = function (index) {
    return function (ref) {
      if (ref) {
        _this3.tableRows[index] = ref;
      }
    };
  };

  this.bindMouseAreaRef = function (ref) {
    _this3.mouseArea = ref;
  };

  this.bindTableHeaderRef = function (ref) {
    _this3.tableHeader = ref;
  };

  this.bindHeaderWrapperRef = function (ref) {
    _this3.headerWrapper = ref;
  };

  this.bindTableRef = function (ref) {
    _this3.table = ref;
  };

  this.bindWheelWrapperRef = function (ref) {
    var bodyRef = _this3.props.bodyRef;

    _this3.wheelWrapper = ref;
    bodyRef && bodyRef(ref);
  };

  this.bindBodyRef = function (ref) {
    _this3.tableBody = ref;
  };

  this.bindScrollbarXRef = function (ref) {
    _this3.scrollbarX = ref;
  };

  this.bindScrollbarYRef = function (ref) {
    _this3.scrollbarY = ref;
  };

  this.bindRowClick = function (rowData) {
    var onRowClick = _this3.props.onRowClick;

    return function (event) {
      onRowClick && onRowClick(rowData, event);
    };
  };

  this._rows = [];
};

exports.default = Table;