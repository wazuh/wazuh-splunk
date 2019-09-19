'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAnimationEnd;
function getAnimationEnd() {
  var style = document.createElement('div').style;
  if ('webkitAnimation' in style) {
    return 'webkitAnimationEnd';
  }

  return 'animationend';
}