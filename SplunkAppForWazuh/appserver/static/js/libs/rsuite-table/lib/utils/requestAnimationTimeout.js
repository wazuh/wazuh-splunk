'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAnimationTimeout = exports.cancelAnimationTimeout = undefined;

var _requestAnimationFramePolyfill = require('dom-lib/lib/animation/requestAnimationFramePolyfill');

var _requestAnimationFramePolyfill2 = _interopRequireDefault(_requestAnimationFramePolyfill);

var _cancelAnimationFramePolyfill = require('dom-lib/lib/animation/cancelAnimationFramePolyfill');

var _cancelAnimationFramePolyfill2 = _interopRequireDefault(_cancelAnimationFramePolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cancelAnimationTimeout = exports.cancelAnimationTimeout = function cancelAnimationTimeout(frame) {
  return (0, _cancelAnimationFramePolyfill2.default)(frame.id);
};

/**
 * Recursively calls requestAnimationFrame until a specified delay has been met or exceeded.
 * When the delay time has been reached the function you're timing out will be called.
 *
 * Credit: Joe Lambert (https://gist.github.com/joelambert/1002116#file-requesttimeout-js)
 */
var requestAnimationTimeout = exports.requestAnimationTimeout = function requestAnimationTimeout(callback, delay) {
  var start = void 0;
  // wait for end of processing current event handler, because event handler may be long
  Promise.resolve().then(function () {
    start = Date.now();
  });

  var timeout = function timeout() {
    if (Date.now() - start >= delay) {
      callback.call();
    } else {
      frame.id = (0, _requestAnimationFramePolyfill2.default)(timeout);
    }
  };

  var frame = {
    id: (0, _requestAnimationFramePolyfill2.default)(timeout)
  };

  return frame;
};