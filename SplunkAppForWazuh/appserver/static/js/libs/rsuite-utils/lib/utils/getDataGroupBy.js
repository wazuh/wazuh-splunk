'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

exports.default = getDataGroupBy;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDataGroupBy() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var key = arguments[1];

  var tempData = {};

  data.forEach(function (item) {
    if (!tempData[item[key]]) {
      tempData[item[key]] = [];
    }
    tempData[item[key]].push((0, _omit3.default)(item, [key]));
  });

  return Object.entries(tempData).map(function (item) {
    return {
      groupTitle: item[0],
      children: item[1]
    };
  });
}