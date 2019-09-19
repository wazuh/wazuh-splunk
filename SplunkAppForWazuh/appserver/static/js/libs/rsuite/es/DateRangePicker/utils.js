import { startOfDay, endOfDay, addMonths, isSameMonth } from 'date-fns';
export var setTimingMargin = function setTimingMargin(date, way) {
  if (way === void 0) {
    way = 'left';
  }

  return way === 'right' ? endOfDay(date) : startOfDay(date);
};
export function getCalendarDate(value) {
  if (value === void 0) {
    value = [];
  }

  var calendarDate = [new Date(), addMonths(new Date(), 1)]; // Update calendarDate if the value is not null

  if (value[0] && value[1]) {
    var sameMonth = isSameMonth(value[0], value[1]);
    calendarDate = [value[0], sameMonth ? addMonths(value[1], 1) : value[1]];
  }

  return calendarDate;
}
export var TYPE;

(function (TYPE) {
  TYPE["CALENDAR"] = "CALENDAR";
  TYPE["TOOLBAR_BUTTON_OK"] = "TOOLBAR_BUTTON_OK";
  TYPE["TOOLBAR_SHORTCUT"] = "TOOLBAR_SHORTCUT";
})(TYPE || (TYPE = {}));