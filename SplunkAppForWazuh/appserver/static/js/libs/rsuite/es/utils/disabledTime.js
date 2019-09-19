import _ from 'lodash';
import { getHours, getMinutes, getSeconds } from 'date-fns';
export var calendarOnlyProps = ['disabledHours', 'disabledMinutes', 'disabledSeconds', 'hideHours', 'hideHours', 'hideMinutes', 'hideSeconds'];
export default function disabledTime(props, date) {
  if (!date) {
    return false;
  }

  var calendarProps = _.pick(props, calendarOnlyProps);

  return Object.keys(calendarProps).some(function (key) {
    if (/(Hours)/.test(key)) {
      return calendarProps[key](getHours(date), date);
    }

    if (/(Minutes)/.test(key)) {
      return calendarProps[key](getMinutes(date), date);
    }

    if (/(Seconds)/.test(key)) {
      return calendarProps[key](getSeconds(date), date);
    }

    return false;
  });
}