"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * placementPolyfill('bottomLeft');
 * output 'bottomStart'
 */
var _default = function _default(placement) {
  if (typeof placement === 'string') {
    return placement.replace(/Left|Top/, 'Start').replace(/Right|Bottom/, 'End');
  }

  return placement;
};

exports.default = _default;
module.exports = exports.default;