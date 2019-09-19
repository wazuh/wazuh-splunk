import DateRangePicker from './DateRangePicker';
import withLocale from '../IntlProvider/withLocale';
import * as utils from './disabledDateUtils';
var EnhancedDateRangePicker = withLocale(['DateRangePicker'])(DateRangePicker);
Object.keys(utils).forEach(function (key) {
  if (key !== '__esModule') {
    EnhancedDateRangePicker[key] = utils[key];
  }
});
export default EnhancedDateRangePicker;