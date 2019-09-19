// from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
import canUseDOM from 'dom-lib/lib/query/canUseDOM'; // Internet Explorer 6-11

export var isIE = function isIE() {
  return canUseDOM && /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent);
};
export var isIE10 = function isIE10() {
  return canUseDOM && !!window.navigator.userAgent.match(/MSIE 10.0/);
};
export var isIE11 = function isIE11() {
  return canUseDOM && window.navigator.userAgent.indexOf('Trident') > -1 && window.navigator.userAgent.indexOf('rv:11.0') > -1;
}; // Edge 20+

export var isEdge = function isEdge() {
  return canUseDOM && !isIE() && !!window.styleMedia;
};