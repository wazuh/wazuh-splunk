'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

exports.default = handleMouseOverOut;

var _domLib = require('dom-lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleMouseOverOut(handler, event) {
  var target = event.currentTarget;
  var related = event.relatedTarget || (0, _get3.default)(event, ['nativeEvent', 'toElement']);

  if ((!related || related !== target) && !(0, _domLib.contains)(target, related)) {
    handler(event);
  }
}