import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { prefix, getUnhandledProps, defaultProps } from '../utils';
import MonthDropdownItem from './MonthDropdownItem';
import { getYear, getMonth, getDaysInMonth } from 'date-fns';
var monthMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var defaultHeight = 221;
var defaultWidth = 256;

function getRowHeight(count) {
  return function (_ref) {
    var index = _ref.index;

    if (index === 0 || count - 1 === index) {
      return 75 + 1;
    }

    return 75;
  };
}

var MonthDropdown =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(MonthDropdown, _React$PureComponent);

  function MonthDropdown() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.getRowCount = function () {
      var limitEndYear = _this.props.limitEndYear;
      return getYear(new Date()) + limitEndYear;
    };

    _this.list = null;

    _this.bindListRef = function (ref) {
      _this.list = ref;
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.rowRenderer = function (_ref2) {
      var _classNames;

      var index = _ref2.index,
          key = _ref2.key,
          style = _ref2.style;
      var _this$props = _this.props,
          date = _this$props.date,
          onSelect = _this$props.onSelect;
      var selectedMonth = getMonth(date);
      var selectedYear = getYear(date);
      var year = index + 1;
      var isSelectedYear = year === selectedYear;

      var count = _this.getRowCount();

      var titleClassName = classNames(_this.addPrefix('year'), (_classNames = {}, _classNames[_this.addPrefix('year-active')] = isSelectedYear, _classNames));
      var rowClassName = classNames(_this.addPrefix('row'), {
        'first-row': index === 0,
        'last-row': index === count - 1
      });
      return React.createElement("div", {
        className: rowClassName,
        key: key,
        style: style
      }, React.createElement("div", {
        className: titleClassName
      }, year), React.createElement("div", {
        className: _this.addPrefix('list')
      }, monthMap.map(function (item, month) {
        return React.createElement(MonthDropdownItem, {
          date: date,
          onSelect: onSelect,
          disabled: _this.disabledMonth(year, month),
          active: isSelectedYear && month === selectedMonth,
          key: month + "_" + item,
          month: month + 1,
          year: year
        });
      })));
    };

    return _this;
  }

  var _proto = MonthDropdown.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.list) {
      this.list.forceUpdateGrid();
    }
  };

  _proto.disabledMonth = function disabledMonth(year, month) {
    var disabledMonth = this.props.disabledMonth;

    if (disabledMonth) {
      var days = getDaysInMonth(new Date(year, month)); // If all dates in a month are disabled, disable the current month

      for (var i = 1; i <= days; i++) {
        if (!disabledMonth(new Date(year, month, i))) {
          return false;
        }
      }

      return true;
    }

    return false;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        classPrefix = _this$props2.classPrefix,
        className = _this$props2.className,
        date = _this$props2.date,
        show = _this$props2.show,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["classPrefix", "className", "date", "show"]);

    var unhandled = getUnhandledProps(MonthDropdown, rest);
    var count = this.getRowCount();
    var classes = classNames(classPrefix, className, {
      show: show
    });
    return React.createElement("div", _extends({}, unhandled, {
      className: classes
    }), React.createElement("div", {
      className: this.addPrefix('content')
    }, React.createElement("div", {
      className: this.addPrefix('scroll')
    }, React.createElement(AutoSizer, {
      defaultHeight: defaultHeight,
      defaultWidth: defaultWidth
    }, function (_ref3) {
      var height = _ref3.height,
          width = _ref3.width;
      return React.createElement(List, {
        className: _this2.addPrefix('row-wrapper'),
        ref: _this2.bindListRef,
        width: width || defaultWidth,
        height: height || defaultHeight,
        rowHeight: getRowHeight(count),
        rowCount: count,
        scrollToIndex: getYear(date),
        rowRenderer: _this2.rowRenderer
      });
    }))));
  };

  return MonthDropdown;
}(React.PureComponent);

MonthDropdown.propTypes = {
  date: PropTypes.instanceOf(Date),
  limitEndYear: PropTypes.number,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  show: PropTypes.bool,
  onSelect: PropTypes.func,
  disabledMonth: PropTypes.func
};
MonthDropdown.defaultProps = {
  show: false,
  limitEndYear: 5,
  date: new Date()
};
var enhance = defaultProps({
  classPrefix: 'calendar-month-dropdown'
});
export default enhance(MonthDropdown);