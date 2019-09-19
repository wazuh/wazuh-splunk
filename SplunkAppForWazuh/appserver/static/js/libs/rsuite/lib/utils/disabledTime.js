"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = disabledTime;
exports.calendarOnlyProps = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _dateFns = require("date-fns");

var calendarOnlyProps = ['disabledHours', 'disabledMinutes', 'disabledSeconds', 'hideHours', 'hideHours', 'hideMinutes', 'hideSeconds'];
exports.calendarOnlyProps = calendarOnlyProps;

function disabledTime(props, date) {
  if (!date) {
    return false;
  }

  var calendarProps = _lodash.default.pick(props, calendarOnlyProps);

  return Object.keys(calendarProps).some(function (key) {
    if (/(Hours)/.test(key)) {
      return calendarProps[key]((0, _dateFns.getHours)(date), date);
    }

    if (/(Minutes)/.test(key)) {
      return calendarProps[key]((0, _dateFns.getMinutes)(date), date);
    }

    if (/(Seconds)/.test(key)) {
      return calendarProps[key]((0, _dateFns.getSeconds)(date), date);
    }

    return false;
  });
}