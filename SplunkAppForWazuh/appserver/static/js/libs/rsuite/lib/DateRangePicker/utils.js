"use strict";

exports.__esModule = true;
exports.getCalendarDate = getCalendarDate;
exports.TYPE = exports.setTimingMargin = void 0;

var _dateFns = require("date-fns");

var setTimingMargin = function setTimingMargin(date, way) {
  if (way === void 0) {
    way = 'left';
  }

  return way === 'right' ? (0, _dateFns.endOfDay)(date) : (0, _dateFns.startOfDay)(date);
};

exports.setTimingMargin = setTimingMargin;

function getCalendarDate(value) {
  if (value === void 0) {
    value = [];
  }

  var calendarDate = [new Date(), (0, _dateFns.addMonths)(new Date(), 1)]; // Update calendarDate if the value is not null

  if (value[0] && value[1]) {
    var sameMonth = (0, _dateFns.isSameMonth)(value[0], value[1]);
    calendarDate = [value[0], sameMonth ? (0, _dateFns.addMonths)(value[1], 1) : value[1]];
  }

  return calendarDate;
}

var TYPE;
exports.TYPE = TYPE;

(function (TYPE) {
  TYPE["CALENDAR"] = "CALENDAR";
  TYPE["TOOLBAR_BUTTON_OK"] = "TOOLBAR_BUTTON_OK";
  TYPE["TOOLBAR_SHORTCUT"] = "TOOLBAR_SHORTCUT";
})(TYPE || (exports.TYPE = TYPE = {}));