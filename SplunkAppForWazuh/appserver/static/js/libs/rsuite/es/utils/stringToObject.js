import _ from 'lodash';
export default (function (value, labelKey, valueKey) {
  if (_.isObject(value)) {
    return value;
  }

  if (labelKey && valueKey) {
    var _ref;

    return _ref = {}, _ref[labelKey] = value, _ref[valueKey] = value, _ref;
  }

  return null;
});