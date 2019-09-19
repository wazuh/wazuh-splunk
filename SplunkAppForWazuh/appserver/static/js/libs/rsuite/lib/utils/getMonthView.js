"use strict";

exports.__esModule = true;
exports.default = getMonthView;

var _dateFns = require("date-fns");

/**
 * Get all weeks of this month
 * @params monthDate
 * @return date[]
 */
function getMonthView(monthDate, isoWeek) {
  var firstDayOfMonth = (0, _dateFns.getDay)(monthDate);
  var distance = 0 - firstDayOfMonth;

  if (isoWeek) {
    distance = 1 - firstDayOfMonth;

    if (firstDayOfMonth === 0) {
      distance = -6;
    }
  }

  var firstWeekendDate = (0, _dateFns.addDays)(monthDate, distance);
  var weeks = [firstWeekendDate];
  var nextWeekendDate = (0, _dateFns.addDays)(firstWeekendDate, 7);
  weeks.push(nextWeekendDate);

  while (weeks.length < 6) {
    nextWeekendDate = (0, _dateFns.addDays)(nextWeekendDate, 7);
    weeks.push(nextWeekendDate);
  }

  return weeks;
}

module.exports = exports.default;