"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getFiles = exports.guid = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var guid = function guid(num) {
  if (num === void 0) {
    num = 8;
  }

  return (Math.random() * 1e18).toString(36).slice(0, num).toUpperCase();
};

exports.guid = guid;

var getFiles = function getFiles(event) {
  if (_lodash.default.get(event, 'dataTransfer') && typeof _lodash.default.get(event, 'dataTransfer') === 'object') {
    return _lodash.default.get(event, 'dataTransfer.files');
  }

  if (event.target) {
    return _lodash.default.get(event, 'target.files');
  }

  return [];
};

exports.getFiles = getFiles;